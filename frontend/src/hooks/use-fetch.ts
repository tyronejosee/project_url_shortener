import { useSession } from "next-auth/react";

export const useFetch = () => {
  const { data: session } = useSession();

  const fetchClient = async (url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        ...(session && { Authorization: `Bearer ${session.accessToken}` }),
      },
    });
  };

  return fetchClient;
};
