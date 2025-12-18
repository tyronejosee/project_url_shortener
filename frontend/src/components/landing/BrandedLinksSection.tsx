"use client";

import { Button, Card } from "@heroui/react";
import { Crown, Shield, Sparkles } from "lucide-react";

export function BrandedLinksSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-8 order-2 lg:order-1">
          <div className="space-y-6">
            <div className="p-4 bg-content2 rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Generic link:</div>
              <div className="font-mono text-sm">linkshort.io/x4k2p9</div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-accent" />
              <Sparkles className="w-6 h-6 text-accent mx-auto" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-accent" />
            </div>

            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="text-sm text-accent mb-2">Branded link:</div>
              <div className="font-mono text-lg font-medium">your-brand.link/summer-promo</div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">3.2x</div>
                <div className="text-xs text-muted-foreground">More clicks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">67%</div>
                <div className="text-xs text-muted-foreground">Higher trust</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">89%</div>
                <div className="text-xs text-muted-foreground">Brand recognition</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="order-1 lg:order-2">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-sm text-accent font-medium">Branded links</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Your brand in every link
          </h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Build instant trust with custom domains that reflect your identity. Memorable links your
            customers recognize and trust.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="font-medium mb-1">Custom domain</div>
                <div className="text-sm text-muted-foreground">
                  Use your own domain or choose one from our premium collection
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="font-medium mb-1">SSL included</div>
                <div className="text-sm text-muted-foreground">
                  All links are secured with HTTPS for maximum security and trust
                </div>
              </div>
            </div>
          </div>

          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Explore premium domains
          </Button>
        </div>
      </section>
    </section>
  );
}
