import { apiFetch } from "./api";
import { SupportForm } from "@/types";

export async function createSupport(data: SupportForm) {
  const response = await apiFetch("api/support", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
}
