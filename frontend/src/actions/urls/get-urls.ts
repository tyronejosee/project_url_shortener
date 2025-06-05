"use server";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";

export async function getURLs() {
  try {
    const res = await fetcher(`${API_URL}api/urls`, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Error fetching urls");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
