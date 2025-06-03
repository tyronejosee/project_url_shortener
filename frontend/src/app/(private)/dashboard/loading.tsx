"use client";

import { Skeleton } from "@heroui/react";

export default function DashboardSkeleton() {
  return (
    <main className="space-y-6">
      {/* Header */}
      <div className="flex justify-center">
        <Skeleton className="h-10 w-64 rounded-xl" />
      </div>

      {/* BarChart Skeleton */}
      <div className="border border-neutral-300 rounded-2xl p-6">
        <Skeleton className="w-full h-[400px] rounded-xl" />
      </div>

      {/* PieChart Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Devices PieChart */}
        <figure className="border border-neutral-300 rounded-2xl w-full p-6">
          <div className="flex justify-center mb-4">
            <Skeleton className="h-8 w-32 rounded-xl" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-64 h-64 rounded-full" />
          </div>
          <div className="flex justify-center mt-4 gap-2">
            <Skeleton className="h-4 w-16 rounded-xl" />
            <Skeleton className="h-4 w-16 rounded-xl" />
            <Skeleton className="h-4 w-16 rounded-xl" />
          </div>
        </figure>

        {/* Browsers PieChart */}
        <figure className="border border-neutral-300 rounded-2xl w-full p-6">
          <div className="flex justify-center mb-4">
            <Skeleton className="h-8 w-32 rounded-xl" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-64 h-64 rounded-full" />
          </div>
          <div className="flex justify-center mt-4 gap-2">
            <Skeleton className="h-4 w-16 rounded-xl" />
            <Skeleton className="h-4 w-16 rounded-xl" />
            <Skeleton className="h-4 w-16 rounded-xl" />
          </div>
        </figure>

        {/* OSs PieChart */}
        <figure className="border border-neutral-300 rounded-2xl w-full p-6">
          <div className="flex justify-center mb-4">
            <Skeleton className="h-8 w-32 rounded-xl" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-64 h-64 rounded-full" />
          </div>
          <div className="flex justify-center mt-4 gap-2">
            <Skeleton className="h-4 w-16 rounded-xl" />
            <Skeleton className="h-4 w-16 rounded-xl" />
            <Skeleton className="h-4 w-16 rounded-xl" />
          </div>
        </figure>
      </div>
    </main>
  );
}
