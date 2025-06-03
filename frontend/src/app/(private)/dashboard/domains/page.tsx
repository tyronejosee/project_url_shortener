import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { fetcher } from "@/lib/fetcher";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import DomainsPageClient from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Domains - ${COMPANY_NAME}`,
  description: "Manage your URL domains.",
};

export default async function DomainsPage() {
  const session = await auth();
  if (!session || !["Premium Plan"].includes(session.user.plan || "")) {
    redirect("/dashboard");
  }

  try {
    const res = await fetcher(`${API_URL}api/domains`, {
      method: "GET",
    });

    const domains = await res.json();
    if (!res.ok) throw new Error(`Error: ${domains.detail} (${res.status})`);

    return (
      <main className="flex flex-col gap-3">
        <DomainsPageClient domains={domains} />
      </main>
    );
  } catch (error) {
    throw error;
  }
}
