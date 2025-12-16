import type { Metadata } from "next";

// import { auth } from "@/auth";
import { getDomains } from "@/actions/domains";
import { COMPANY_NAME } from "@/config/constants";

import DomainsPageClient from "./client";

export const metadata: Metadata = {
  title: `Domains - ${COMPANY_NAME}`,
  description: "Manage your URL domains.",
};

export default async function DomainsPage() {
  // TODO: Add auth check
  // const session = await auth();
  // if (!session || !["Premium Plan"].includes(session.user.plan || "")) {
  //   redirect("/dashboard");
  // }
  const domains = await getDomains();

  return (
    <main className="flex flex-col gap-3">
      <DomainsPageClient domains={domains} />
    </main>
  );
}
