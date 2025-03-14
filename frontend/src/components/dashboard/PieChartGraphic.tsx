"use client";

import { ClickType } from "@/interfaces/url";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B9A0BB"];

interface Props {
  title: string;
  types: ClickType[];
}

export default function PieChartGraphic({ title, types }: Props) {
  return (
    <figure className="border border-neutral-300 rounded-2xl w-full p-6">
      <h2 className="text-3xl font-bold text-center">{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={types}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            innerRadius={50}
            fill="#8884d8"
          >
            {types.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            iconSize={15}
          />
        </PieChart>
      </ResponsiveContainer>
    </figure>
  );
}
