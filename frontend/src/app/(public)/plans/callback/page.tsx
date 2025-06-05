"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getMe } from "@/actions/auth";
import { PricingPlansLoading } from "@/components/branding";

export default function CallbackPage() {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const { update } = useSession();

  // Effects
  useEffect(() => {
    const order_id = searchParams.get("order_id");
    const email = searchParams.get("email");
    if (!order_id || !email) return;

    async function syncPlan() {
      const user = await getMe();
      if (user) {
        await update({ plan: user.plan });
      }
      router.push("/dashboard");
    }

    syncPlan();
  }, [searchParams, router, update]);

  return <PricingPlansLoading />;
}
