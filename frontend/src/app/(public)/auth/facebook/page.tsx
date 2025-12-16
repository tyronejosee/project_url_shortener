"use client";

import AuthLoading from "@/components/common/AuthLoading";
import useSocialAuth from "@/hooks/useSocialAuth";

export default function FacebookPage() {
  useSocialAuth("facebook");
  return <AuthLoading />;
}
