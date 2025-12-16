import { useRouter } from "next/navigation";
import { API_URL } from "@/config/constants";
import { useUser } from "./use-user";

export default function useLogout() {
  const router = useRouter();
  const { fetchUser } = useUser();

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}api/tokens/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
