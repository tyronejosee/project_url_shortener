"use client";

import { ClickDate } from "@/interfaces/url";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  clicks: ClickDate[];
}

export default function BarChartGraphic({ clicks }: Props) {
  return (
    <div className="border border-neutral-300 rounded-2xl p-6">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={clicks}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="clicks" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
