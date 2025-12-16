"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { API_URL } from "@/config/constants";

import { useUser } from "./use-user";

export default function useSocialAuth(provider: "google-oauth2" | "facebook") {
  const router = useRouter();
  const { fetchUser } = useUser();
  const searchParams = useSearchParams();

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (!state || !code) return;

    const authenticate = async () => {
      try {
        const formBody = new URLSearchParams({ state, code }).toString();

        const res = await fetch(`${API_URL}api/socials/o/${provider}/`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formBody,
        });

        if (res.ok) {
          router.push("/dashboard");
          router.refresh();
          await fetchUser();
        } else {
          throw new Error("Failed to log in");
        }
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
        router.push("/auth/login");
      }
    };

    authenticate();
  }, [searchParams, provider, router, fetchUser]);
}
