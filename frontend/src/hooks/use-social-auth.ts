"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuthStore from "@/store/auth";
import { toast } from "react-toastify";

export default function useSocialAuth(provider: "google" | "facebook") {
  const { verify } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (state && code) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/o/${provider}/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            verify();
            toast.success("Logged in");
            router.push("/dashboard");
          } else {
            toast.error("Failed to log in");
            router.push("/auth/login");
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
          router.push("/auth/login");
        });
    }
  }, []);
}
