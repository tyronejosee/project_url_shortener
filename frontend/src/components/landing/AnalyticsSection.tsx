"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { Globe2, MousePointer, TrendingUp, Users } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const clickData = [
  { name: "Mon", clicks: 245 },
  { name: "Tue", clicks: 312 },
  { name: "Wed", clicks: 278 },
  { name: "Thu", clicks: 389 },
  { name: "Fri", clicks: 456 },
  { name: "Sat", clicks: 298 },
  { name: "Sun", clicks: 201 },
];

const locationData = [
  { country: "Spain", clicks: 1245 },
  { country: "Mexico", clicks: 892 },
  { country: "Argentina", clicks: 673 },
  { country: "Colombia", clicks: 589 },
  { country: "Chile", clicks: 777 },
];

export function AnalyticsSection() {
  return (
    <section id="analytics" className="max-w-6xl mx-auto px-4 py-20">
      <header className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Analytics that drive decisions
        </h2>
        <p className="text-lg text-muted-foreground text-balance leading-relaxed">
          Understand your audience with detailed data on every click, geographic location, device,
          and traffic source.
        </p>
      </header>

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">Total clicks</h2>
              <MousePointer className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardBody>
            <div className="text-3xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-green-500">+18.2%</span> vs. last week
            </p>
          </CardBody>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">Unique visitors</h2>
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardBody>
            <div className="text-3xl font-bold">8,234</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-green-500">+12.5%</span> vs. last week
            </p>
          </CardBody>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">Countries</h2>
              <Globe2 className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardBody>
            <div className="text-3xl font-bold">47</div>
            <p className="text-xs text-muted-foreground mt-1">Across 6 continents</p>
          </CardBody>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">Conversion rate</h2>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardBody>
            <div className="text-3xl font-bold">24.8%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-green-500">+3.1%</span> vs. last week
            </p>
          </CardBody>
        </Card>
      </section>

      <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <h3>Clicks per day</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={clickData}>
                <XAxis dataKey="name" stroke="oklch(0.65 0 0)" />
                <YAxis stroke="oklch(0.65 0 0)" />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#8a2be2"
                  strokeWidth={2}
                  dot={{ fill: "#8a2be2", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <h3>Top 5 countries</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={locationData} layout="vertical">
                <XAxis type="number" stroke="oklch(0.65 0 0)" />
                <YAxis dataKey="country" type="category" stroke="oklch(0.65 0 0)" width={80} />
                <Bar dataKey="clicks" fill="#8a2be2" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </section>
    </section>
  );
}
