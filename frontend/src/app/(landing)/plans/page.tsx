import { getPlans } from "@/actions/plans";
import { PricingPlans } from "@/components/branding";
import { EmptyList } from "@/components/common";
import { COMPANY_NAME } from "@/config/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Plans - ${COMPANY_NAME}`,
  description:
    "Explore our pricing plans and choose the one that best suits your needs.",
};

export default async function PlansPage() {
  const plans = await getPlans();

  const renderPlans = () => {
    if (plans.length === 0) return <EmptyList type="plans" />;
    return <PricingPlans plans={plans} />;
  };

  return (
    <main className="flex-1 max-w-screen-lg mx-auto p-6 w-full">
      <div className="py-6">
        <h1 className="text-4xl font-bold text-center">Pricing Plans</h1>
        <p className="text-gray-600 mt-2 text-center">
          Choose the plan that best suits your needs.
        </p>
      </div>
      {renderPlans()}
    </main>
  );
}
