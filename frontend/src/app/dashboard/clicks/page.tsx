import type { Metadata } from "next";
import { fetcher } from "@/lib/fetcher";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import ClicksContainer from "./container";

export const metadata: Metadata = {
  title: `Clicks - ${COMPANY_NAME}`,
  description: "Clicks on your URLs.",
};

export default async function ClicksPage() {
  const res = await fetcher(`${API_URL}api/clicks`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Error fetching clicks");
  const clicks = await res.json();

  return (
    <main className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span>Total {clicks.length} Clicks</span>
      </div>
      <ClicksContainer clicks={clicks} />
    </main>
  );
}
