import { TableSkeleton } from "@/components/dashboard";

export default function UrlsLoading() {
  const columns = ["URL", "Alias", "Created At", "Updated At", "Group", "Type", "Password"];
  return <TableSkeleton rows={6} columns={columns} isMultiple />;
}
