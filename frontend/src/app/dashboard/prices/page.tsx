import type { Metadata } from "next";
import { PricingPlans } from "@/components/branding";
import { COMPANY_NAME } from "@/config/constants";

export const metadata: Metadata = {
  title: `Prices - ${COMPANY_NAME}`,
  description:
    "Explore our pricing plans and choose the one that best suits your needs.",
};

export default function PricesSPage() {
  return <PricingPlans />;
}
