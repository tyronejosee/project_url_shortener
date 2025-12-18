import { getPlans } from "@/actions/plans";
import { Sponsors } from "@/components/branding";
import { AnalyticsSection } from "@/components/landing/AnalyticsSection";
import { BrandedLinksSection } from "@/components/landing/BrandedLinksSection";
import { CTASection } from "@/components/landing/CTASection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { QRCodeSection } from "@/components/landing/QRCodeSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";

export default async function Home() {
  const plans = await getPlans();

  return (
    <main className="flex-1 relative isolate overflow-hidden">
      <HeroSection />
      <Sponsors />
      <FeaturesSection />
      <AnalyticsSection />
      <QRCodeSection />
      <BrandedLinksSection />
      <TestimonialsSection />
      <PricingSection plans={plans} />
      <FAQSection />
      <CTASection />
    </main>
  );
}
