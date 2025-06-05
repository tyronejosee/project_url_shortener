"use server";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";

export async function getMe() {
  try {
    const res = await fetcher(`${API_URL}api/users/me`, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Error fetching data");
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
