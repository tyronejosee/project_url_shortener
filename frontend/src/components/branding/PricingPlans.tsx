"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { plans } from "@/config/constants";

export default function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {plans.map((plan, index) => {
        const isSelected = selectedPlan === plan.name;
        return (
          <div
            key={index}
            onClick={() => setSelectedPlan(plan.name)}
            className={`cursor-pointer space-y-4 border rounded-2xl p-6 text-center transition ${
              isSelected
                ? "border-primary ring-4 ring-primary"
                : "border-neutral-300"
            }`}
          >
            <h2 className="text-2xl font-semibold">{plan.name}</h2>
            <p className="text-3xl font-bold">{plan.price}</p>
            <p className="text-gray-500">{plan.annual}</p>
            <ul className="mt-4 space-y-1 text-gray-600 text-left">
              {Object.entries(plan.features).map(([key, value], i) => (
                <li key={i} className="flex items-center space-x-2">
                  {value === true
                    ? "✅"
                    : value === false
                      ? "❌"
                      : `✅ ${value}`}
                  <span>{key}</span>
                </li>
              ))}
            </ul>
            <Button color="primary" className="w-full">
              Choose Plan
            </Button>
          </div>
        );
      })}
    </section>
  );
}
