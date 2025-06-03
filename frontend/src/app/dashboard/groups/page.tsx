import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getGroups } from "@/actions/groups";
import { COMPANY_NAME } from "@/config/constants";
import GroupsPageClient from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Groups - ${COMPANY_NAME}`,
  description: "Manage your URL groups.",
};

export default async function GroupsPage() {
  const session = await auth();
  if (
    !session ||
    !["Basic Plan", "Premium Plan"].includes(session.user.plan || "")
  ) {
    redirect("/dashboard");
  }
  const groups = await getGroups();

  return (
    <main className="flex flex-col gap-3">
      <GroupsPageClient groups={groups} />
    </main>
  );
}
