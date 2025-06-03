import NextAuth from "next-auth";
import { jwtDecode } from "jwt-decode";
import authConfig from "@/auth.config";
import { API_URL } from "./config/constants";
import type { JWT } from "next-auth/jwt";

async function refreshAccessToken(token: JWT) {
  try {
    const res = await fetch(`${API_URL}api/tokens/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });

    const apiData = await res.json();
    if (!res.ok) {
      throw apiData;
    }

    const decodedToken = jwtDecode(apiData.access);

    if (!decodedToken?.exp) {
      throw new Error("Access token is missing expiration time.");
    }
    const newAccessTokenExpires = decodedToken?.exp * 1000;

    return {
      ...token,
      accessToken: apiData.access,
      refreshToken: apiData.refresh || token.refreshToken,
      accessTokenExpires: newAccessTokenExpires,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        const decodedToken = jwtDecode(user.accessToken);

        if (!decodedToken?.exp) {
          throw new Error("Access token is missing expiration time.");
        }

        const accessTokenExpires = decodedToken?.exp * 1000;

        return {
          ...token,
          id: user.id || "",
          email: user.email || "",
          username: user.username || "",
          slug: user.slug,
          plan: user.plan,
          is_active: user.is_active,
          is_staff: user.is_staff,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.slug = token.slug;
        session.user.plan = token.plan;
        session.user.is_active = token.is_active;
        session.user.is_staff = token.is_staff;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
