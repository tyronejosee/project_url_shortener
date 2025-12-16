"use server";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";

export async function deleteDomainById(id: string) {
  try {
    await fetcher(`${API_URL}api/domains/${id}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
