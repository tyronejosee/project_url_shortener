"use client";

import useSocialAuth from "@/hooks/useSocialAuth";
import { DashboardSkeleton } from "@/components/dashboard";

export default function GooglePage() {
  useSocialAuth("google-oauth2");
  return <DashboardSkeleton />;
}
