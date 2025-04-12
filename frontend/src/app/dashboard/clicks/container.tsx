"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { formatDate } from "@/lib/dates";
import { ClickResponse } from "@/types";

type Props = {
  clicks: ClickResponse[];
};

export default function ClicksContainer({ clicks }: Props) {
  return (
    <Table
      aria-label="Clicks Table"
      color="primary"
      selectionMode="single"
      radius="lg"
      shadow="none"
      className="border border-neutral-300 rounded-xl"
    >
      <TableHeader>
        <TableColumn>URL</TableColumn>
        <TableColumn>IP</TableColumn>
        <TableColumn>Device</TableColumn>
        <TableColumn>OS</TableColumn>
        <TableColumn>Browser</TableColumn>
        <TableColumn>Created At</TableColumn>
      </TableHeader>
      <TableBody>
        {clicks.map((click) => (
          <TableRow key={click.id}>
            <TableCell>{click.url}</TableCell>
            <TableCell>{click.ip_address}</TableCell>
            <TableCell>{click.device}</TableCell>
            <TableCell>{click.os}</TableCell>
            <TableCell>{click.browser}</TableCell>
            <TableCell>{formatDate(click.created_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
