import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { fetcher } from "@/lib/fetcher";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import GroupsContainer from "./container";

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

  try {
    const res = await fetcher(`${API_URL}api/groups`, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Error fetching groups");
    const groups = await res.json();

    return (
      <main className="flex flex-col gap-3">
        <GroupsContainer groups={groups} />
      </main>
    );
  } catch (error) {
    throw error;
  }
}
