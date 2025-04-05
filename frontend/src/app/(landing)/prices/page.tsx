import type { Metadata } from "next";
import { PricingPlans } from "@/components/branding";
import { COMPANY_NAME } from "@/config/constants";

export const metadata: Metadata = {
  title: `Prices - ${COMPANY_NAME}`,
  description:
    "Explore our pricing plans and choose the one that best suits your needs.",
};

export default function PricesPage() {
  return (
    <main className="flex-1 max-w-screen-lg mx-auto p-6 w-full">
      <div className="py-6">
        <h1 className="text-4xl font-bold text-center">Pricing Plans</h1>
        <p className="text-gray-600 mt-2 text-center">
          Choose the plan that best suits your needs.
        </p>
      </div>
      <PricingPlans />
    </main>
  );
}
