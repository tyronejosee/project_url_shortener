import { BarChartGraphic, PieChartGraphic } from "@/components/dashboard";
import { getClicksSummary } from "@/services/urlService";

export default async function GlobalStatsPage() {
  const data = await getClicksSummary();

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
