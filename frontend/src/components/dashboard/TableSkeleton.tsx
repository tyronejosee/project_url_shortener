"use client";

import { Skeleton } from "@heroui/react";

type Props = {
  rows: number;
  columns: string[];
  isMultiple?: boolean;
};

export default function TableSkeleton({ rows, columns, isMultiple }: Props) {
  return (
    <div className="rounded-xl border border-neutral-300 overflow-hidden p-4 w-full">
      <div className="flex items-center bg-default-100 px-4 py-3 rounded-xl w-full">
        {/* Checkbox */}
        <div className="w-6 mr-4">
          <Skeleton className="h-5 w-5 rounded-md" />
        </div>

        {/* Column headers */}
        {columns.map((_, i) => (
          <div key={i} className="flex-1 px-10">
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
        ))}
      </div>

      {/* Rows */}
      <div>
        {[...Array(rows)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-center px-4 py-3 hover:bg-default-50 transition-colors w-full mt-2"
          >
            {/* Checkbox */}
            {isMultiple && (
              <div className="w-6 mr-4">
                <Skeleton className="h-5 w-5 rounded-md" />
              </div>
            )}

            {/* Columns */}
            {columns.map((_, colIndex) => (
              <div key={colIndex} className="flex-1 px-10">
                <Skeleton className="h-5 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
