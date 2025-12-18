"use client";

import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.92_0.05_220),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Start optimizing your links today
          </h2>
          <p className="text-xl text-muted-foreground mb-10 text-balance leading-relaxed">
            Join thousands of companies already improving their digital presence with smart links
            and powerful analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" color="primary">
              Create free account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="faded">
              View live demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • 2-minute setup • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
