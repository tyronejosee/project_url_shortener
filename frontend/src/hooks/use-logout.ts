"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth";

export default function useLogout() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return { handleLogout };
}
