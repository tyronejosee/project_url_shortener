"use client";

import { API_URL } from "@/config/constants";
import { addToast } from "@heroui/react";

export default async function continueWithSocialAuth(
  provider: string,
  redirect: string,
) {
  try {
    const url = `${API_URL}api/socials/o/${provider}/?redirect_uri=${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_REDIRECT_URL
        : "http://localhost:3000"
    }/auth/${redirect}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 200 && typeof window !== "undefined") {
      window.location.replace(data.authorization_url);
    } else {
      addToast({
        title: "Something went wrong",
      });
    }
  } catch (error) {
    addToast({
      title: `${error}`,
    });
  }
}
