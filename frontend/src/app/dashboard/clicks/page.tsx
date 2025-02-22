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
import { clicks } from "@/config/constants";

export default function ClicksPage() {
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
          <TableColumn>Date</TableColumn>
          <TableColumn>Country</TableColumn>
          <TableColumn>IP</TableColumn>
          <TableColumn>Device</TableColumn>
          <TableColumn>OS</TableColumn>
          <TableColumn>Browser</TableColumn>
        </TableHeader>
        <TableBody>
          {clicks.map((click) => (
            <TableRow key={click.id}>
              <TableCell>{click.url}</TableCell>
              <TableCell>{click.date}</TableCell>
              <TableCell>{click.country}</TableCell>
              <TableCell>{click.ip}</TableCell>
              <TableCell>{click.device}</TableCell>
              <TableCell>{click.os}</TableCell>
              <TableCell>{click.browser}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
