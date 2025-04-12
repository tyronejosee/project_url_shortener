"use client";

import { useState } from "react";
import { Button, Switch } from "@heroui/react";
import { useSession } from "next-auth/react";
import { Check, InfinityIcon, X } from "lucide-react";
import { PlanResponse } from "@/types";

type Props = {
  plans: PlanResponse[];
};

export default function PricingPlans({ plans }: Props) {
  const { data: session } = useSession();
  const [selectedPlan, setSelectedPlan] = useState<string>(
    session?.user?.plan || "Basic Plan",
  );
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  return (
    <section>
      <Switch
        isSelected={isAnnual}
        onValueChange={setIsAnnual}
        color="primary"
      ></Switch>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.name;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.name)}
              className={`cursor-pointer space-y-4 border rounded-2xl p-6 text-center transition ${
                isSelected
                  ? "border-primary ring-4 ring-primary"
                  : "border-neutral-300"
              }`}
            >
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <p className="text-3xl font-bold">
                {isAnnual ? plan.price_annual : plan.price_monthly}
              </p>
              {!!isAnnual && (
                <p className="text-sm text-green-600">{plan.discount_annual}</p>
              )}
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
              <Button color="primary" className="w-full">
                Choose Plan
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
