import { COMPANY_NAME } from "@/config/constants";
import { getURLs } from "@/actions/urls";
import LinksPageClient from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Urls - ${COMPANY_NAME}`,
  description: "Manage your Links.",
};

export default async function URLsPage() {
  const urls = await getURLs();

  return (
    <main className="flex flex-col gap-3">
      <LinksPageClient urls={urls} />
    </main>
  );
}
