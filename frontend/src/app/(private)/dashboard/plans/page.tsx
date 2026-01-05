import { getPlans } from "@/actions/plans";
import { EmptyList } from "@/components/common";
import { PricingPlans } from "@/components/branding";
import { COMPANY_NAME } from "@/config/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Plans - ${COMPANY_NAME}`,
  description: "Explore our pricing plans and choose the one that best suits your needs.",
};

export default async function PlansPage() {
  const plans = await getPlans();

  const renderPlans = () => {
    if (plans.length === 0) return <EmptyList type="plans" />;
    return <PricingPlans plans={plans} />;
  };

  return <main>{renderPlans()}</main>;
}
