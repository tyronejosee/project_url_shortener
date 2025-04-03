"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAuthHeaders(): Promise<Headers> {
  const headers = new Headers();
  const cookieHeader = (await cookies()).toString();
  if (cookieHeader) headers.set("Cookie", cookieHeader);
  return headers;
}

async function parseResponse(response: Response) {
  const isJSON = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJSON ? await response.json().catch(() => ({})) : {};

  if (response.ok) return response.status === 204 ? { success: true } : data;

  return {
    success: false,
    error: data.detail || `Error ${response.status}`,
  };
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  try {
    const headers = await getAuthHeaders();
    if (!headers.has("Content-Type") && options.body)
      headers.set("Content-Type", "application/json");

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });

    return await parseResponse(response);
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
