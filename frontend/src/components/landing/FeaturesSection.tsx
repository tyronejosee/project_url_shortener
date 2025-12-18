"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { BarChart3, Globe, Link2, Lock, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Custom branded links",
    description:
      "Create memorable URLs with your own brand and custom domain for better recognition.",
  },
  {
    icon: BarChart3,
    title: "Real-time analytics",
    description:
      "Track clicks, locations, devices, and more with interactive, real-time dashboards.",
  },
  {
    icon: Lock,
    title: "Secure links",
    description: "SSL protection, optional passwords, and scheduled expiration for full control.",
  },
  {
    icon: Zap,
    title: "Blazing-fast speed",
    description: "Ultra-fast redirects powered by a global CDN for the best user experience.",
  },
  {
    icon: Globe,
    title: "Global reach",
    description: "Servers in 150+ countries ensuring instant redirects anywhere in the world.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first experience",
    description:
      "Manage your links from any device with our fully responsive and mobile-ready platform.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-4 py-20">
      <header className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Everything you need to manage links
        </h2>
        <p className="text-lg text-muted-foreground text-balance leading-relaxed">
          Professional tools built for modern teams that need full control over their digital links.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card
              key={feature.title}
              className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors"
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </CardHeader>

              <CardBody className="pt-2">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardBody>
            </Card>
          );
        })}
      </section>
    </section>
  );
}
