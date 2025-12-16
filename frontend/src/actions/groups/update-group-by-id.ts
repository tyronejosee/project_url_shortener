"use server";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";
import type { GroupForm } from "@/types";

export async function updateGroupById(id: string, data: GroupForm) {
  try {
    await fetcher(`${API_URL}api/groups/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
