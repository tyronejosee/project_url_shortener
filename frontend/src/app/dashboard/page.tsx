import { BarChartGraphic, PieChartGraphic } from "@/components/dashboard";
import { auth } from "@/auth";

export default async function GlobalStatsPage() {
  const session = await auth();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/clicks/summary`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) return <p>Something went wrong</p>;
  const data = await res.json();
  console.log("Stats hereee", data);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center">
        Global Click Statistics
      </h1>
      <BarChartGraphic clicks={data.clicks} />
      <div className="grid grid-cols-3 gap-6">
        <PieChartGraphic title="Devices" types={data.device} />
        <PieChartGraphic title="Browsers" types={data.browser} />
        <PieChartGraphic title="OSs" types={data.os} />
      </div>
    </div>
  );
}
