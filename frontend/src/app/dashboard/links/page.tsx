import type { Metadata } from "next";
import { auth } from "@/auth";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import LinksContainer from "./container";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Links - ${COMPANY_NAME}`,
  description: "Manage your Links.",
};

export default async function LinksPage() {
  const session = await auth();

  const res = await fetch(`${API_URL}api/urls`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Error fetching urls");
  const urls = await res.json();

  return (
    <main className="flex flex-col gap-3">
      <LinksContainer urls={urls} />
    </main>
  );
}
