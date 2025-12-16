"use client";

import AuthLoading from "@/components/common/AuthLoading";
import useSocialAuth from "@/hooks/useSocialAuth";

export default function GooglePage() {
  useSocialAuth("google-oauth2");
  return <AuthLoading />;
}
