"use server";

import { API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";
import type { Session } from "next-auth";

export async function deleteGroupById(id: string, session: Session | null) {
  try {
    await fetcher(`${API_URL}api/groups/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
