import type { Metadata } from "next";
import CutterContainer from "./container";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";

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
