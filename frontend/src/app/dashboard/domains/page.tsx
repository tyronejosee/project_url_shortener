"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@heroui/react";
import { domains } from "@/config/constants";

export default function DomainsPage() {
  return (
    <main className="flex flex-col gap-3">
      <Table
        aria-label="Domains Table"
        color="primary"
        selectionMode="single"
        radius="lg"
        shadow="none"
        className="border border-neutral-300 rounded-xl"
      >
        <TableHeader>
          <TableColumn>Domain</TableColumn>
          <TableColumn>Links</TableColumn>
          <TableColumn>Clicks</TableColumn>
          <TableColumn>Verification Status</TableColumn>
        </TableHeader>
        <TableBody>
          {domains.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.domain}</TableCell>
              <TableCell>{item.links}</TableCell>
              <TableCell>{item.clicks}</TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  color={
                    item.verification_status === "Pending"
                      ? "default"
                      : item.verification_status === "Failed"
                        ? "danger"
                        : item.verification_status === "Verified"
                          ? "success"
                          : "default"
                  }
                  variant="flat"
                >
                  {item.verification_status}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
