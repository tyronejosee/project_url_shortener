"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const domainsStats = [
  { domain: "example.com", clicks: 1000 },
  { domain: "example.org", clicks: 500 },
  { domain: "example.net", clicks: 1500 },
  { domain: "techhub.io", clicks: 1200 },
  { domain: "startuplabs.ai", clicks: 800 },
];

const deviceStats = [
  { name: "Unknown", value: 5 },
  { name: "PC", value: 2 },
  { name: "Mobile", value: 6 },
  { name: "Tablet", value: 1 },
  { name: "TV", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B9A0BB"];

export default function GlobalStatsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center">
        Global Click Statistics
      </h1>

      <div className="border border-neutral-300 rounded-2xl p-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={domainsStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="domain" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clicks" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {["Devices", "Browser", "OS"].map((title, index) => (
          <figure
            key={index}
            className="border border-neutral-300 rounded-2xl w-full p-6"
          >
            <h2 className="text-3xl font-bold text-center">{title}</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={deviceStats}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={150}
                  innerRadius={50}
                  fill="#8884d8"
                >
                  {deviceStats.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS[idx % COLORS.length]}
                    />
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
        ))}
      </div>
    </div>
  );
}
