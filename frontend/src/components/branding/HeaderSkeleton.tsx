"use client";

import { Skeleton } from "@heroui/react";

export default function HeaderSkeleton() {
  return (
    <div className="py-6">
      <div className="flex justify-center">
        <Skeleton className="h-10 w-64 rounded-md" />
      </div>
      <div className="flex justify-center mt-2">
        <Skeleton className="h-5 w-80 rounded-md" />
      </div>
    </div>
  );
}
