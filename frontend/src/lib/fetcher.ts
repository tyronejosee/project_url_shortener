import { cookies } from "next/headers";

import { API_KEY } from "@/config/constants";

export const fetcher = async (url: string, options: RequestInit = {}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access")?.value;

  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(accessToken && { Cookie: `access=${accessToken}` }),
      "X-API-KEY": API_KEY,
    },
    credentials: "include",
  });
};
