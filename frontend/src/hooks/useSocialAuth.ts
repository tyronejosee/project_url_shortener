"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addToast } from "@heroui/react";
import useAuthStore from "@/store/auth";

export default function useSocialAuth(provider: "google-oauth2" | "facebook") {
  const { verify } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (!state || !code) return;

    const authenticate = async () => {
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }api/socials/o/${provider}/?state=${encodeURIComponent(
            state
          )}&code=${encodeURIComponent(code)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            credentials: "include",
          }
        );

        if (res.status == 201) {
          verify();
          addToast({
            title: "Logged in!",
            description: "You have successfully logged in.",
          });
          router.push("/dashboard");
        } else {
          throw new Error("Failed to log in");
        }
      } catch (error) {
        console.error(error.message || "Something went wrong");
        router.push("/auth/login");
      }
    };

    authenticate();
  }, [searchParams, provider, verify, router]);
}
