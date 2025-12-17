import { API_KEY } from "@/config/constants";

export function useFetch() {
  const fetchClient = async (url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: { ...options?.headers, "X-API-KEY": API_KEY },
      credentials: "include",
    });
  };

  return { fetchClient };
}
