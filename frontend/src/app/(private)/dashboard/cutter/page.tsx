import { fetcher } from "@/lib/fetcher";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import CutterContainer from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Cutter - ${COMPANY_NAME}`,
  description: "Manage your URL groups.",
};

export default async function CutterPage() {
  try {
    const res = await fetcher(`${API_URL}api/groups`, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Error fetching groups");
    const groups = await res.json();

    return (
      <main className="max-w-screen-md mx-auto p-6">
        <CutterContainer groups={groups} />
      </main>
    );
  } catch (error) {
    throw error;
  }
}
