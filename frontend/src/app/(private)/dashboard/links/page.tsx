import { fetcher } from "@/lib/fetcher";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import LinksPageClient from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Links - ${COMPANY_NAME}`,
  description: "Manage your Links.",
};

export default async function LinksPage() {
  const res = await fetcher(`${API_URL}api/urls`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Error fetching urls");
  const urls = await res.json();

  return (
    <main className="flex flex-col gap-3">
      <LinksPageClient urls={urls} />
    </main>
  );
}
