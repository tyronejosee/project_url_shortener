import { useRouter } from "next/navigation";
import { API_URL } from "@/config/constants";
import { useUser } from "@/hooks/use-user";
import { useFetch } from "@/hooks/use-fetch";

export function useLogout(): { handleLogout: () => Promise<void> } {
  const router = useRouter();
  const { fetchUser } = useUser();
  const { fetchClient } = useFetch();

  const handleLogout = async () => {
    try {
      await fetchClient(`${API_URL}api/tokens/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      await fetchUser();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      router.push("/auth/login");
      router.refresh();
    }
  };

  return { handleLogout };
}
