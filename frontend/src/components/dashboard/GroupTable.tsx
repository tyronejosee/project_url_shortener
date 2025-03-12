"use client"

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@heroui/react";
import { GroupRead } from "@/interfaces/group";

interface Props {
  groups: GroupRead[];
}

export default function GroupTable({ groups }: Props) {

  return (
    <div>
      <Table
        aria-label="Groups Table"
        color="primary"
        selectionMode="single"
        radius="lg"
        shadow="none"
        className="border border-neutral-300 rounded-xl"
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Alias</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Created at</TableColumn>
          <TableColumn>Updated at</TableColumn>
          <TableColumn>Is Active</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        {groups && groups.length > 0 ? (
          <TableBody emptyContent="No rows to display.">
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.alias}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>{group.created_at}</TableCell>
                <TableCell>{group.updated_at}</TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    color={group.is_available ? "success" : "danger"}
                    variant="flat"
                  >
                    {group.is_available ? "Active" : "Inactive"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <button
                    className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Actualizar
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Eliminar
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent="No rows to display.">{[]}</TableBody>
        )}
      </Table>
    </div>
  );
};
