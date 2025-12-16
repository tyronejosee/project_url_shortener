"use server";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";
import type { GroupForm } from "@/types";

export async function createGroup(data: GroupForm) {
  try {
    await fetcher(`${API_URL}api/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
