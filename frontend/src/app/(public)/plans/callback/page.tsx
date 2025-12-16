"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { PricingPlansLoading } from "@/components/branding";
import { useUser } from "@/hooks/use-user";

export default function CallbackPage() {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchUser } = useUser();

  // Effects
  useEffect(() => {
    const order_id = searchParams.get("order_id");
    const email = searchParams.get("email");
    if (!order_id || !email) return;

    async function syncPlan() {
      await fetchUser();
      router.push("/dashboard");
    }

    syncPlan();
  }, [searchParams, router, fetchUser]);

  return <PricingPlansLoading />;
}
