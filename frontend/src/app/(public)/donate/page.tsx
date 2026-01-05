import { KoFiWidget } from "@/components/branding";
import { COMPANY_NAME } from "@/config/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Donate - ${COMPANY_NAME}`,
  description: "Donate to support the development of this project and help us grow.",
};

export default function DonatePage() {
  return (
    <main className="flex-1 max-w-screen-lg mx-auto p-6 w-full">
      <section className="max-w-lg mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Donate</h1>
        <p className="text-center text-gray-500 mb-12">
          Your support is greatly appreciated and helps us to continue developing and improving this
          project.
        </p>
      </section>
      <KoFiWidget />
    </main>
  );
}
