import type { Metadata } from "next";
import FeedbackContainer from "./container";
import { COMPANY_NAME } from "@/config/constants";

export const metadata: Metadata = {
  title: `Feedback - ${COMPANY_NAME}`,
  description: "Need help or want to share feedback? We're here to assist you.",
};

export default function FeedbackPage() {
  return (
    <main className="flex-1 max-w-screen-lg mx-auto p-6 w-full">
      <section className="max-w-lg mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-2">
          Support, Feedback
        </h1>
        <p className="text-center mb-8 text-neutral-500">
          Have a question? We will be happy to help you.
        </p>
        <FeedbackContainer />
      </section>
    </main>
  );
}
