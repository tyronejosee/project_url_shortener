"use client";

import { Button, Card } from "@heroui/react";
import { Download, Smartphone } from "lucide-react";

export function QRCodeSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <article>
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-sm text-accent font-medium">Dynamic QR codes</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            From digital to physical in seconds
          </h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Generate custom QR codes for your short links. Perfect for printed materials, events,
            packaging, and more.
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div>
                <div className="font-medium mb-1">Full customization</div>
                <div className="text-sm text-muted-foreground">
                  Add your logo, brand colors, and unique designs
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div>
                <div className="font-medium mb-1">Dynamic codes</div>
                <div className="text-sm text-muted-foreground">
                  Update the destination without reprinting the QR code
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div>
                <div className="font-medium mb-1">Built-in analytics</div>
                <div className="text-sm text-muted-foreground">
                  Track every scan with location and device data
                </div>
              </div>
            </li>
          </ul>
        </article>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-8 lg:p-12">
          <div className="aspect-square bg-background rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.25_0_0)_1px,transparent_1px),linear-gradient(180deg,oklch(0.25_0_0)_1px,transparent_1px)] bg-size-[20px_20px]" />
            <div className="relative z-10 w-48 h-48 bg-foreground rounded-lg flex items-center justify-center">
              <Smartphone className="w-16 h-16 text-background" />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="bordered" className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              PNG
            </Button>
            <Button variant="bordered" className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              SVG
            </Button>
            <Button variant="bordered" className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
