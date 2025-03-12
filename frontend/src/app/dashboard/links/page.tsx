"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/react";
import { linksList } from "@/config/constants";
import { Chip } from "@heroui/chip";

export default function LinksPage() {
  return (
    <div className="flex flex-col gap-3">
      <Table
        aria-label="Domains Table"
        color="primary"
        selectionMode="multiple"
        radius="lg"
        shadow="none"
        className="border border-neutral-300 rounded-xl"
      >
        <TableHeader>
          <TableColumn>URL</TableColumn>
          <TableColumn>Transitions</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Deactivation Date</TableColumn>
          <TableColumn>Group</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Password</TableColumn>
        </TableHeader>
        <TableBody>
          {linksList.map((link) => (
            <TableRow key={link.id}>
              <TableCell>{link.url}</TableCell>
              <TableCell>{link.transitions}</TableCell>
              <TableCell>{link.date}</TableCell>
              <TableCell>{link.deactivation_date}</TableCell>
              <TableCell>{link.group}</TableCell>
              <TableCell>
              <Chip
                  size="sm"
                  color={
                    link.type === "public"
                      ? "success"
                      : "default"
                  }
                  variant="flat"
                >
                  {link.type}
                </Chip>
              </TableCell>
              <TableCell>{link.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
