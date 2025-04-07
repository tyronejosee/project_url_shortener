import type { Metadata } from "next";
import { fetcher } from "@/lib/fetcher";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import GroupsContainer from "./container";

export const metadata: Metadata = {
  title: `Groups - ${COMPANY_NAME}`,
  description: "Manage your URL groups.",
};

export default async function GroupsPage() {
  const res = await fetcher(`${API_URL}api/groups`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Error fetching urls");
  const groups = await res.json();

  return (
    <main className="flex flex-col gap-3">
      <GroupsContainer groups={groups} />
    </main>
  );
}
