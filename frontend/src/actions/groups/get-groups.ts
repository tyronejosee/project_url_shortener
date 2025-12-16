"use server";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";

export async function getGroups() {
  try {
    const res = await fetcher(`${API_URL}api/groups`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Error fetching groups");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
