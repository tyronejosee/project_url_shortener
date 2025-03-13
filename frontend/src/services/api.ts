"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(url: string, options: RequestInit = {}) {
  try {
    const headers = new Headers(options.headers || {});

    if (typeof window === "undefined") {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore.toString();
      if (cookieHeader) {
        headers.set("Cookie", cookieHeader);
      }
    }

    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
      credentials: "include",
    });

    if (response.status === 200 && options.method === "GET") {
      return await response.json();
    }

    if (response.status === 201 && options.method === "POST") {
      return await response.json();
    }

    if (response.status === 204 && options.method === "DELETE") {
      return { success: true };
    }

    if (response.status === 400 && options.method === "POST") {
      return await response.json();
    }

    let errorMessage = `HTTP ${response.status}`;
    try {
      const error = await response.json();
      errorMessage = error.detail || error.message || errorMessage;
    } catch {}
    return { success: false, error: errorMessage };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, error: (error as Error).message };
  }
}
