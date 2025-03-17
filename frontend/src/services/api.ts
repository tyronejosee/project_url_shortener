"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAuthHeaders(): Promise<Headers> {
  const headers = new Headers();

  if (typeof window === "undefined") {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    if (cookieHeader) {
      headers.set("Cookie", cookieHeader);
    }
  }

  return headers;
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshResponse = await fetch(`${BASE_URL}api/tokens/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return refreshResponse.ok;
}

async function handleResponse(response: Response, options: RequestInit) {
  switch (response.status) {
    case 200:
      if (options.method === "GET") return await response.json();
      break;
    case 201:
      if (options.method === "POST") return await response.json();
      break;
    case 204:
      if (options.method === "DELETE") return { success: true };
      break;
    case 400:
      if (options.method === "POST") return await response.json();
      break;
    default:
      return handleError(response);
  }
}

async function handleError(response: Response) {
  let errorMessage = `HTTP ${response.status}`;
  try {
    const error = await response.json();
    errorMessage = error.detail || error.message || errorMessage;
  } catch {}
  return { success: false, error: errorMessage };
}

export async function apiFetch(url: string, options: RequestInit = {}, retry = true) {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
      credentials: "include",
    });

    if (response.status === 401 && retry) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return apiFetch(url, options, false);
      } else {
        return { success: false, error: "Session expired" };
      }
    }

    return await handleResponse(response, options);
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, error: (error as Error).message };
  }
}
