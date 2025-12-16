import { cookies } from "next/headers";

export const fetcher = async (url: string, options: RequestInit = {}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access")?.value;

  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(accessToken && { Cookie: `access=${accessToken}` }),
    },
  });
};
