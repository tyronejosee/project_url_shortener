"use client";

import { Card, Skeleton } from "@heroui/react";

type Props = {
  rows?: number;
};

export default function TableSkeleton({ rows = 10 }: Props) {
  return (
    <Card
      className="w-full space-y-4 p-4 border border-neutral-300 rounded-xl"
      radius="lg"
      shadow="none"
    >
      <Skeleton className="h-10 w-full rounded-xl" />{" "}
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full rounded-xl" />
      ))}
    </Card>
  );
}
