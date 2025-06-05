import { HeaderSkeleton, PricingPlansSkeleton } from "@/components/branding";

export default function PlansLoading() {
  return (
    <main className="flex-1 max-w-screen-lg mx-auto p-6 w-full">
      <HeaderSkeleton />
      <PricingPlansSkeleton />
    </main>
  );
}
