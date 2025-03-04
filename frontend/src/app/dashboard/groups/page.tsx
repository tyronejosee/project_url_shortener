import { fetchData } from "@/lib/api";
import { GroupTable } from "@/components";

export default async function GroupsPage() {
  const groups = await fetchData({
    endpoint: "api/groups",
    method: "GET",
  });

  return (
    <div className="flex flex-col gap-3">
      {/* <GroupTable groups={groups} /> */}
    </div>
  );
}
