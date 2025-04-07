import type { Metadata } from "next";
import { BarChartGraphic, PieChartGraphic } from "@/components/dashboard";
import { fetcher } from "@/lib/fetcher";
import { API_URL, COMPANY_NAME } from "@/config/constants";

export const metadata: Metadata = {
  title: `Dashboard - ${COMPANY_NAME}`,
  description: "Dashboard to monitor your URLs and track your clicks.",
};

export default async function DashboardPage() {
  const res = await fetcher(`${API_URL}api/clicks/summary`, {
    method: "GET",
  });

  if (!res.ok) return <p>Something went wrong</p>;
  const data = await res.json();

  return (
    <main className="space-y-6">
      <h1 className="text-4xl font-bold text-center">
        Global Click Statistics
      </h1>
      <BarChartGraphic clicks={data.clicks} />
      <div className="grid grid-cols-3 gap-6">
        <PieChartGraphic title="Devices" types={data.device} />
        <PieChartGraphic title="Browsers" types={data.browser} />
        <PieChartGraphic title="OSs" types={data.os} />
      </div>
    </main>
  );
}
