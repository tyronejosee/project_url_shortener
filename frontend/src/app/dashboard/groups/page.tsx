import { auth } from "@/auth";
// import { GroupTable } from "@/components/dashboard";
import { API_URL } from "@/config/constants";
import GroupsContainer from "./container";

export const dynamic = "force-dynamic";

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
