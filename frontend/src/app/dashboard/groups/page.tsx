"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { groups } from "@/config/constants";
import { Chip } from "@heroui/chip";

export default function GroupsPage() {
  return (
    <div className="flex flex-col gap-3">
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
          <TableColumn>Description</TableColumn>
          <TableColumn>Links</TableColumn>
          <TableColumn>Is Active</TableColumn>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group.description}</TableCell>
              <TableCell>{group.links}</TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  color={group.is_active ? "success" : "danger"}
                  variant="flat"
                >
                  {group.is_active ? "Active" : "Inactive"}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
