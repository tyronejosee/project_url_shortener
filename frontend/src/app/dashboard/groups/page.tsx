"use client"

import { GroupTable } from "@/components/dashboard";
import useGroup from "@/hooks/useGroup";
import { useEffect } from "react";

export default function GroupsPage() {
  const { groups, isLoading, errors, fetchGroups } = useGroup();

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <main className="flex flex-col gap-3">
      {isLoading && <p>Loading groups...</p>}
      <GroupTable groups={groups} />
    </main>
  );
}
