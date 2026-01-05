"use client";

import { Table } from "@/components/common";
import type { ClickResponse, CellRendererProps, TableColumn } from "@/types";

type Props = {
  clicks: ClickResponse[];
};

export default function ClicksPageClient({ clicks }: Props) {
  // Constants
  const columns: TableColumn[] = [
    { name: "URL", uid: "url", sortable: true },
    { name: "IP Address", uid: "ip_address", sortable: true },
    { name: "Device", uid: "device", sortable: true },
    { name: "OS", uid: "os", sortable: true },
    { name: "Browser", uid: "browser", sortable: true },
    { name: "Created At", uid: "created_at", sortable: true },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Table */}
      <Table
        title="Clicks table"
        data={clicks}
        columns={columns}
        searchPlaceholder="Search by url..."
        searchKeys={["url"]}
        defaultRowsPerPage={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        cellRenderer={({ columnKey, value }: CellRendererProps<ClickResponse>) => {
          switch (columnKey) {
            case "created_at":
              return new Date(value as string).toLocaleDateString();
            default:
              return String(value ?? "");
          }
        }}
      />
    </div>
  );
}
