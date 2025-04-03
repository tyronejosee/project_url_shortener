"use server";

import { AuthError } from "next-auth";
import { loginSchema, registerSchema } from "@/lib/zod";
import { z } from "zod";
import { signIn } from "@/auth";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Error 500" };
  }
};

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success) {
      return {
        error: "Invalid data",
      };
    }

    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/users`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include",
    //     body: JSON.stringify({ email: data.email, password: data.password }),
    //   });
    //   const apiData = await res.json();

    // Validate if the user already exists
    // Error handling for duplicate user creation

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Error 500" };
  }
};
