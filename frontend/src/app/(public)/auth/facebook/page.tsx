"use client";

import AuthLoading from "@/components/common/AuthLoading";
import { useSocialAuth } from "@/hooks/use-social-auth";

export default function FacebookPage() {
  useSocialAuth("facebook");
  return <AuthLoading />;
}
