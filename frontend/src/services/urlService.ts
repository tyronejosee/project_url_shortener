import { apiFetch } from "./api";
import { URLWriteMinimal } from "@/types";

export async function createShorten(data: URLWriteMinimal) {
  const response = await apiFetch("api/urls/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
}
