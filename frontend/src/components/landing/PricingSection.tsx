import { EmptyList } from "../common";
import { PricingPlans } from "../branding";
import { PlanResponse } from "@/types";

type PricingSectionProps = {
  plans: PlanResponse[];
};

export function PricingSection({ plans }: PricingSectionProps) {
  const renderPlans = () => {
    if (plans.length === 0) return <EmptyList type="plans" />;
    return <PricingPlans plans={plans} />;
  };

  return (
    <section id="pricing" className="max-w-6xl mx-auto px-4 py-20">
      <header className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Pricing Plans</h2>
        <p className="text-lg text-muted-foreground text-balance leading-relaxed">
          Choose the plan that best suits your needs.
        </p>
      </header>
      {renderPlans()}
    </section>
  );
}
