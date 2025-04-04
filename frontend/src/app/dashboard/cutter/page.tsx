import { auth } from "@/auth";
import CutterContainer from "./container";
import { API_URL } from "@/config/constants";

export default async function CutterPage() {
  const session = await auth();

  const res = await fetch(`${API_URL}api/groups`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Error fetching groups");
  const groups = await res.json();

  return (
    <main className="max-w-screen-md mx-auto p-6">
      <h1 className="text-4xl font-bold text-center pb-10">URL Cutter</h1>
      <CutterContainer groups={groups} />
    </main>
  );
}
