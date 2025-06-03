import { getClicks } from "@/actions/urls";
import { COMPANY_NAME } from "@/config/constants";
import ClicksPageClient from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Clicks - ${COMPANY_NAME}`,
  description: "Clicks on your URLs.",
};

export default async function ClicksPage() {
  const clicks = await getClicks();

  return (
    <main className="flex flex-col gap-3">
      <ClicksPageClient clicks={clicks} />
    </main>
  );
}
