import { apiFetch } from "./api";
import { GroupWrite } from "@/interfaces/group";

export async function getGroups() {
  const response = await apiFetch(`api/groups`, {
    method: "GET",
    credentials: "include",
  });
  return response;
}

export async function createGroup(data: GroupWrite) {
  const response = await apiFetch(`api/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return response;
}

export async function getGroupById(id: string) {
  const response = await apiFetch(`api/groups/${id}`, {
    method: "GET",
    credentials: "include",
  });
  return response;
}

export async function updateGroup(id: string, data: GroupWrite) {
  const response = await apiFetch(`api/groups/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return response;
}

export async function deleteGroup(id: string) {
  const response = await apiFetch(`api/groups/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response;
}
