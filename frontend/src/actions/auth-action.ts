"use server";

import { cookies } from "next/headers";
import { z } from "zod";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";
import { loginSchema, registerSchema } from "@/lib/zod";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    const res = await fetcher(`${API_URL}api/tokens/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.detail || "Invalid credentials" };
    }

    const setCookieHeader = res.headers.getSetCookie();
    if (setCookieHeader) {
      const cookieStore = await cookies();
      setCookieHeader.forEach((cookieString) => {
        const [nameValue, ...opts] = cookieString.split("; ");
        const [name, value] = nameValue.split("=");

        const cookieOptions: any = {};
        opts.forEach((opt) => {
          const [k, v] = opt.split("=");
          if (k.toLowerCase() === "path") cookieOptions.path = v;
          if (k.toLowerCase() === "httponly") cookieOptions.httpOnly = true;
          if (k.toLowerCase() === "secure") cookieOptions.secure = true;
          if (k.toLowerCase() === "samesite") cookieOptions.sameSite = v.toLowerCase();
          if (k.toLowerCase() === "max-age") cookieOptions.maxAge = parseInt(v);
          if (k.toLowerCase() === "expires") cookieOptions.expires = new Date(v);
        });

        if (name === "access" || name === "refresh") {
          cookieStore.set(name, value, {
            path: cookieOptions.path || "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: cookieOptions.sameSite || "lax",
            maxAge: cookieOptions.maxAge,
          });
        }
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Internal Server Error" };
  }
};

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success) {
      return {
        error: "Invalid data",
      };
    }

    const res = await fetcher(`${API_URL}api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        re_password: data.re_password,
      }),
    });
    const apiData = await res.json();

    if (!res.ok) {
      const firstError = Object.values(apiData)[0];
      const errorMessage = Array.isArray(firstError) ? firstError[0] : "Registration failed";
      return {
        error: errorMessage as string,
      };
    }

    return await loginAction({ email: data.email, password: data.password });
  } catch (error) {
    console.error("Register error:", error);
    return { error: "Internal Server Error" };
  }
};
