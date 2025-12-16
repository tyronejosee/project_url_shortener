import { useEffect } from "react";

import { useAuthStore } from "@/store/auth-store";

export function useUser() {
  const { user, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    if (!user && isLoading) {
      fetchUser();
    }
  }, [user, isLoading, fetchUser]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    fetchUser,
  };
}
