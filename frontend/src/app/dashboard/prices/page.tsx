import type { Metadata } from "next";
import { PricingPlans } from "@/components/branding";
import { fetcher } from "@/lib/fetcher";
import { API_URL, COMPANY_NAME } from "@/config/constants";

export const metadata: Metadata = {
  title: `Prices - ${COMPANY_NAME}`,
  description:
    "Explore our pricing plans and choose the one that best suits your needs.",
};

export default async function PricesSPage() {
  try {
    const res = await fetcher(`${API_URL}api/plans`, {
      method: "GET",
    });

    const plans = await res.json();
    if (!res.ok) throw new Error(`Error: ${plans.detail} (${res.status})`);

    return <PricingPlans plans={plans} />;
  } catch (error) {
    throw error;
  }
}
