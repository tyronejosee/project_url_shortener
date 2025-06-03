import { TableSkeleton } from "@/components/dashboard";

export default function GroupsLoading() {
  const columns = [
    "Name",
    "Alias",
    "Description",
    "Created At",
    "Updated At",
    "Is Active",
    "Actions",
  ];
  return <TableSkeleton rows={6} columns={columns} isMultiple />;
}
