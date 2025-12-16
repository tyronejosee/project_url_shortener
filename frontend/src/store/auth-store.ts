import { create } from "zustand";

import { API_URL } from "@/config/constants";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  setUser: (user) => set({ user, isLoading: false }),

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}api/users/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        set({ user: data, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set({ error: "Failed to fetch user", isLoading: false, user: null });
    }
  },
}));
