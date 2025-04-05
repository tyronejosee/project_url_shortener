import type { Metadata } from "next";
import { auth } from "@/auth";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import ClicksContainer from "./container";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Clicks - ${COMPANY_NAME}`,
  description: "Clicks on your URLs.",
};

export default async function ClicksPage() {
  const session = await auth();

  const res = await fetch(`${API_URL}api/clicks`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
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
