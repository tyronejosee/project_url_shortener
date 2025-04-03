import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error: string | null }>;
  logout: () => Promise<void>;
  verify: () => Promise<void>;
  getUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: true,
      user: null,

      login: async (email, password) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/tokens/create`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
              credentials: "include",
            }
          );

          const data = await res.json();

          if (res.ok) {
            set({ isAuthenticated: true });
            await useAuthStore.getState().getUser();
            return { success: true, error: null };
          } else {
            set({ isAuthenticated: false });
            return {
              success: false,
              error: data.detail || "Invalid credentials",
            };
          }
        } catch {
          set({ isAuthenticated: false });
          return { success: false, error: "Something went wrong" };
        }
      },

      logout: async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/tokens/logout`, {
          method: "POST",
          credentials: "include",
        });

        set({ isAuthenticated: false, user: null });
      },

      verify: async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/tokens/verify`,
            {
              method: "POST",
              credentials: "include",
            }
          );

          set({ isAuthenticated: res.ok });
          if (res.ok) await useAuthStore.getState().getUser();
        } catch {
          set({ isAuthenticated: false, user: null });
        } finally {
          set({ isLoading: false });
        }
      },

      getUser: async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/users/me`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (res.ok) {
            const userData = await res.json();
            set({ user: userData });
          } else {
            set({ user: null });
          }
        } catch {
          set({ user: null });
        }
      },
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
