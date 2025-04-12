import type { Metadata } from "next";
import { PricingPlans } from "@/components/branding";
import { API_URL, COMPANY_NAME } from "@/config/constants";
import { fetcher } from "@/lib/fetcher";

export const metadata: Metadata = {
  title: `Prices - ${COMPANY_NAME}`,
  description:
    "Explore our pricing plans and choose the one that best suits your needs.",
};

export default async function PricesPage() {
  try {
    const res = await fetcher(`${API_URL}api/plans`, {
      method: "GET",
    });

    const plans = await res.json();
    if (!res.ok) throw new Error(`Error: ${plans.detail} (${res.status})`);

    return (
      <main className="flex-1 max-w-screen-lg mx-auto p-6 w-full">
        <div className="py-6">
          <h1 className="text-4xl font-bold text-center">Pricing Plans</h1>
          <p className="text-gray-600 mt-2 text-center">
            Choose the plan that best suits your needs.
          </p>
        </div>
        <PricingPlans plans={plans} />
      </main>
    );
  } catch (error) {
    throw error;
  }
}
