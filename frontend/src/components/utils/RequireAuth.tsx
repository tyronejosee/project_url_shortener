"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import useAuthStore from "@/store/auth";

interface Props {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const { isAuthenticated, isLoading, verify } = useAuthStore();

  useEffect(() => {
    verify();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        Loading...
        {/* Spinner here */}
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
