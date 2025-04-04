import NextAuth from "next-auth";
import authConfig from "@/auth-config";
import { API_URL } from "./config/constants";

async function refreshAccessToken(token: { refreshToken: string }) {
  try {
    const res = await fetch(`${API_URL}api/tokens/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });

    if (!res.ok) throw new Error("Refresh token failed");
    const apiData = await res.json();

    return {
      accessToken: apiData.access,
      refreshToken: apiData.refresh ?? token.refreshToken,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
    };
  } catch (error) {
    console.error("Refresh access token failed", error);
    return null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || "";
        token.email = user.email || "";
        token.username = user.username || "";
        token.slug = user.slug || "";
        token.plan = user.plan || "";
        token.is_active = user.is_active || false;
        token.is_staff = user.is_staff || false;
        token.accessToken = user.accessToken || "";
        token.refreshToken = user.refreshToken || "";
        token.expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24 hours
      }

      if (Date.now() > token.expiresAt) {
        const refreshedTokens = await refreshAccessToken(token);
        if (refreshedTokens) {
          return {
            ...token,
            ...refreshedTokens,
            id: token.id || "",
            accessToken: refreshedTokens.accessToken || "",
            refreshToken:
              refreshedTokens.refreshToken || token.refreshToken || "",
            expiresAt:
              refreshedTokens.expiresAt ||
              token.expiresAt ||
              Date.now() + 1000 * 60 * 15,
          };
        } else {
          return {
            id: "",
            email: "",
            username: "",
            slug: "",
            plan: "",
            is_active: false,
            is_staff: false,
            accessToken: "",
            refreshToken: "",
            expiresAt: 0,
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.slug = token.slug;
      session.user.plan = token.plan;
      session.user.is_active = token.is_active;
      session.user.is_staff = token.is_staff;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
