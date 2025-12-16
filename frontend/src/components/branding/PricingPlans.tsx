"use client";

import { Button, Switch } from "@heroui/react";
import { Check, InfinityIcon, TestTubeDiagonal, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import type { PlanResponse } from "@/types";

type Props = {
  plans: PlanResponse[];
};

export default function PricingPlans({ plans }: Props) {
  // Hooks
  const pathname = usePathname();
  const { user } = useUser();

  // States
  const [selectedPlan, setSelectedPlan] = useState<string>(
    user?.plan || "Basic Plan"
  );
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  // Constants
  const topClass = pathname?.includes("/dashboard/plans")
    ? "top-0 py-0"
    : "top-16 py-4";

  return (
    <section>
      <nav
        className={cn(
          "z-10 sticky w-full flex items-center justify-center gap-4 mb-4 bg-white/50 backdrop-blur-xl",
          topClass
        )}
      >
        <span>Monthly</span>
        <Switch
          isSelected={isAnnual}
          onValueChange={setIsAnnual}
          color="primary"
        ></Switch>
        <span>Annual</span>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.name;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.name)}
              className={`cursor-pointer space-y-4 border rounded-2xl p-6 text-center transition ${
                isSelected
                  ? "border-primary outline outline-4 outline-primary"
                  : "border-neutral-300 outline-none"
              }`}
            >
              <h2 className="flex items-center justify-center gap-2 text-2xl font-semibold">
                {plan.name}
                {plan.is_test_mode && (
                  <TestTubeDiagonal size={18} className="text-red-600" />
                )}
              </h2>
              <div className="flex items-center justify-center gap-2">
                <p className="text-3xl font-bold">
                  {isAnnual ? plan.price_annual : plan.price_monthly}
                </p>
                {!!isAnnual && (
                  <p className="text-xs text-green-600">
                    {plan.discount_annual}
                  </p>
                )}
              </div>
              <ul className="mt-4 space-y-1 text-gray-600 text-left">
                <li className="flex w-full justify-between">
                  <span>Links per month</span>
                  <span>
                    {plan.links_per_month === 1000000 ? (
                      <InfinityIcon size={18} />
                    ) : (
                      plan.links_per_month
                    )}
                  </span>
                </li>
                <li className="flex w-full justify-between">
                  <span>API links per month</span>
                  {plan.api_links_per_month === 1000000 ? (
                    <InfinityIcon size={18} />
                  ) : (
                    plan.api_links_per_month
                  )}
                </li>
                <li className="flex w-full justify-between">
                  <span>Link lifetime</span>
                  {plan.link_lifetime === "infinity" ? (
                    <InfinityIcon size={18} />
                  ) : (
                    plan.link_lifetime
                  )}
                </li>
                <li className="flex w-full justify-between">
                  <span>Analytics duration</span>
                  <span>{plan.analytics_duration}</span>
                </li>
                {plan.plan_features.map((feature) => (
                  <li key={feature.id} className="flex w-full justify-between">
                    <p>{feature.name}</p>
                    <p>
                      {feature.quantity > 0 ? (
                        feature.quantity
                      ) : feature.is_active ? (
                        <Check size={18} />
                      ) : (
                        <X size={18} />
                      )}
                    </p>
                  </li>
                ))}
              </ul>
              {plan.checkout_url && (
                <Button
                  as={Link}
                  href={plan.checkout_url}
                  target="_blank"
                  color="primary"
                  className="z-0 w-full"
                >
                  Get Plan
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
