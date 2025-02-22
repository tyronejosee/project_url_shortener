"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/table";
import { domains } from "@/config/constants";

export default function DomainsPage() {
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
          <TableColumn>#</TableColumn>
          <TableColumn>Domain</TableColumn>
          <TableColumn>Links</TableColumn>
          <TableColumn>Clicks</TableColumn>
          <TableColumn>Verification Status</TableColumn>
        </TableHeader>
        <TableBody>
          {domains.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.domain}</TableCell>
              <TableCell>{item.links}</TableCell>
              <TableCell>{item.clicks}</TableCell>
              <TableCell>{item.verificationStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
