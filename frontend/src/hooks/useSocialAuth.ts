"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addToast } from "@heroui/react";
import { API_URL } from "@/config/constants";
// import { signIn } from "next-auth/react";

export default function useSocialAuth(provider: "google-oauth2" | "facebook") {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (!state || !code) return;

    const authenticate = async () => {
      try {
        const res = await fetch(
          `${API_URL}api/socials/o/${provider}/?state=${encodeURIComponent(
            state
          )}&code=${encodeURIComponent(code)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );
        // const data = await res.json();

        if (res.status == 201) {
          // await signIn("OAuth2 Credentials", {
          //   accessToken: data.access,
          //   refreshToken: data.refresh,
          //   redirect: false,
          // });
          addToast({
            title: "Logged in!",
            description: "You have successfully logged in.",
          });
          router.push("/dashboard");
        } else {
          throw new Error("Failed to log in");
        }
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
        // router.push("/auth/login");
      }
    };

    authenticate();
  }, [searchParams, provider, router]);
}
