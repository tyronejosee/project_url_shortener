import { apiFetch } from "./api";
import { FeedbackForm } from "@/types";

export async function createFeedback(data: FeedbackForm) {
  const response = await apiFetch("api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
}
