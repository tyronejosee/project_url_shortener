"use server";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";
import type { URLForm } from "@/types";

export async function createURL(data: URLForm) {
  try {
    const res = await fetcher(`${API_URL}api/urls/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error creating url");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
