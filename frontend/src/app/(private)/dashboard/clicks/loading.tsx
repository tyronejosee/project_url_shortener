import { TableSkeleton } from "@/components/dashboard";

export default function ClicksLoading() {
  const columns = ["URL", "IP", "Device", "OS", "Browser", "Created At"];
  return <TableSkeleton rows={6} columns={columns} />;
}
