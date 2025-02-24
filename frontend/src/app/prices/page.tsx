import PricingPlans from "@/components/home/pricing-plans/PricingPlans";

export default function PricesPage() {
  return (
    <main className="max-w-screen-lg mx-auto p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center">Pricing Plans</h1>
      <p className="text-gray-600 mt-2 text-center">
        Choose the plan that best suits your needs.
      </p>
      <PricingPlans />
    </main>
  );
}
