"use server";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";

export async function deleteURLByAlias(alias: string) {
  try {
    const res = await fetcher(`${API_URL}api/urls/${alias}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Error deleting url");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
