"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { API_URL } from "@/config/constants";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@/hooks/use-user";

export function useSocialAuth(provider: "google-oauth2" | "facebook"): void {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchClient } = useFetch();
  const { fetchUser } = useUser();

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (!state || !code) return;

    const authenticate = async () => {
      try {
        const formBody = new URLSearchParams({ state, code }).toString();

        const res = await fetchClient(`${API_URL}api/socials/o/${provider}/`, {
          method: "POST",
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
