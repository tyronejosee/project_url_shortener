"use client";

import { signOut, useSession } from "next-auth/react";

export default function useLogout() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/tokens/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({ refresh: session?.refreshToken }),
    });
    await signOut({ callbackUrl: "/auth/login" });
  };

  return { handleLogout };
}
