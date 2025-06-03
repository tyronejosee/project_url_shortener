import { COMPANY_NAME } from "@/config/constants";
import SupportPageClient from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Support - ${COMPANY_NAME}`,
  description: "Need help or want to share feedback? We're here to assist you.",
};

export default function SupportPage() {
  return (
    <main className="max-w-screen-md mx-auto p-6">
      <SupportPageClient />
    </main>
  );
}
