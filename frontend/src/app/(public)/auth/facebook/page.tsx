"use client";

import useSocialAuth from "@/hooks/useSocialAuth";
import { DashboardSkeleton } from "@/components/dashboard";

export default function FacebookPage() {
  useSocialAuth("facebook");
  return <DashboardSkeleton />;
}
