import { auth } from "@/auth";

export const fetcher = async (url: string, options: RequestInit = {}) => {
  const session = await auth();

  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { Authorization: `Bearer ${session.accessToken}` }),
    },
  });
};
