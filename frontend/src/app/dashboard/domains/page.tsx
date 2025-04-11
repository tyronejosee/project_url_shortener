import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { fetcher } from "@/lib/fetcher";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import DomainsContainer from "./container";

export const metadata: Metadata = {
  title: `Domains - ${COMPANY_NAME}`,
  description: "Manage your URL domains.",
};

export default async function DomainsPage() {
  const session = await auth();
  if (
    !session ||
    !["Basic Plan", "Premium Plan"].includes(session.user.plan || "")
  ) {
    redirect("/dashboard");
  }

  try {
    const res = await fetcher(`${API_URL}api/domains`, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Error fetching domains");
    const domains = await res.json();

    return (
      <main className="flex flex-col gap-3">
        <DomainsContainer domains={domains} />
      </main>
    );
  } catch (error) {
    throw error;
  }
}
