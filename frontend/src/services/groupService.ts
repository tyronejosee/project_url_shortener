import { apiFetch } from "./api";
import { GroupWrite } from "@/types";

export async function getGroupById(id: string) {
  return apiFetch(`api/groups/${id}`, { method: "GET" });
}

export async function createGroup(data: GroupWrite) {
  const response = await apiFetch("api/groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
}

export async function updateGroup(id: string, data: GroupWrite) {
  const response = await apiFetch(`api/groups/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
}

export async function deleteGroup(id: string) {
  const response = await apiFetch(`api/groups/${id}`, {
    method: "DELETE",
  });
  return response;
}
