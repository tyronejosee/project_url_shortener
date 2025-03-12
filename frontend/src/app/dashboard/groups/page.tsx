import { GroupTable } from "@/components/dashboard";
import { getGroups } from "@/services/groupService";

export default async function GroupsPage() {
  const groups = await getGroups();

  return (
    <main className="flex flex-col gap-3">
      <GroupTable groups={groups} />
    </main>
  );
}
