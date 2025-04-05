import type { Metadata } from "next";
import { auth } from "@/auth";
import CutterContainer from "./container";
import { API_URL, COMPANY_NAME } from "@/config/constants";

export const metadata: Metadata = {
  title: `Cutter - ${COMPANY_NAME}`,
  description: "Manage your URL groups.",
};

export default async function CutterPage() {
  const session = await auth();

  const res = await fetch(`${API_URL}api/groups`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Error fetching groups");
  const groups = await res.json();

  return (
    <main className="max-w-screen-md mx-auto p-6">
      <CutterContainer groups={groups} />
    </main>
  );
}
