import { API_URL } from "@/config/constants";
import { auth } from "@/auth";
import LinksContainer from "./container";

export const dynamic = "force-dynamic";

export default async function LinksPage() {
  const session = await auth();

  const res = await fetch(`${API_URL}api/urls`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Error fetching urls");
  const urls = await res.json();

  return (
    <div className="flex flex-col gap-3">
      <LinksContainer urls={urls} />
    </div>
  );
}
