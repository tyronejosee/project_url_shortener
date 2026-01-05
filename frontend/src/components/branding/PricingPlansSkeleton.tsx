"use client";

import { Skeleton } from "@heroui/react";

type Props = {
  cards?: number;
};

export default function PricingPlansSkeleton({ cards = 3 }: Props) {
  return (
    <section>
      {/* Switch */}
      <div className="z-10 sticky top-16 w-full flex items-center justify-center gap-4 py-4 mb-4 bg-white/50 backdrop-blur-xl">
        <span>Monthly</span>
        <Skeleton className="h-6 w-12 rounded-full" />
        <span>Annual</span>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {[...Array(cards)].map((_, i) => (
          <div key={i} className="space-y-4 border border-neutral-300 rounded-2xl p-6 text-center">
            {/* Name */}
            <div className="flex items-center justify-center gap-2">
              <Skeleton className="h-6 w-32 rounded-md" />
            </div>

            {/* Price */}
            <div className="flex items-center justify-center gap-2">
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>

            {/* Features */}
            <ul className="mt-4 space-y-2 text-left">
              {[...Array(4)].map((_, j) => (
                <li key={j} className="flex w-full justify-between">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-4 w-10 rounded-md" />
                </li>
              ))}
              {[...Array(7)].map((_, j) => (
                <li key={`feature-${j}`} className="flex w-full justify-between">
                  <Skeleton className="h-4 w-36 rounded-md" />
                  <Skeleton className="h-4 w-5 rounded-full" />
                </li>
              ))}
            </ul>

            {/* Button */}
            <Skeleton className="h-8 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </section>
  );
}
