import { TableSkeleton } from "@/components/dashboard";

export default function DomainsLoading() {
  const columns = ["Domain", "Created At", "Verification Status"];
  return <TableSkeleton rows={6} columns={columns} isMultiple />;
}
