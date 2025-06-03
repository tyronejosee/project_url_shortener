"use server";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";

export async function getPlans() {
  try {
    const res = await fetcher(`${API_URL}api/plans`, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Error fetching plans");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
