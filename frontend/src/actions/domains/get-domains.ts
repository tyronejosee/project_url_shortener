"use server";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";

export async function getDomains() {
  try {
    const res = await fetcher(`${API_URL}api/domains`, {
      method: "GET",
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Error fetching domains");
    if (data?.detail) return [];
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
