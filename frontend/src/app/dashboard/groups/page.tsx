import type { Metadata } from "next";
import { auth } from "@/auth";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import GroupsContainer from "./container";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Groups - ${COMPANY_NAME}`,
  description: "Manage your URL groups.",
};

export default async function GroupsPage() {
  const session = await auth();

  const res = await fetch(`${API_URL}api/groups`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Error fetching urls");
  const groups = await res.json();

  return (
    <main className="flex flex-col gap-3">
      <GroupsContainer groups={groups} />
    </main>
  );
}
