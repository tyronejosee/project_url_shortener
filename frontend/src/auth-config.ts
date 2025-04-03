import { loginSchema } from "@/lib/zod";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

export default {
  providers: [
    Credentials({
      name: "Django Auth",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { data, success } = loginSchema.safeParse(credentials);
          if (!success) throw new Error("Invalid credentials");

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/tokens/create`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: data.email,
                password: data.password,
              }),
            }
          );

          if (!res.ok) throw new Error("Invalid credentials");
          const apiData = await res.json();

          const userRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/users/me`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                Authorization: `Bearer ${apiData.access}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!userRes.ok) throw new Error("Invalid credentials");
          const user = await userRes.json();

          return {
            id: user.id,
            email: user.email,
            username: user.username,
            slug: user.slug,
            plan: user.plan,
            is_active: user.is_active,
            is_staff: user.is_staff,
            accessToken: apiData.access,
            refreshToken: apiData.refresh,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
