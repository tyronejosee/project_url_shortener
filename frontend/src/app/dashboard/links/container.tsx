"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Lock } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { URLRead } from "@/types";

type Props = {
  urls: URLRead[];
};

export default function LinksContainer({ urls }: Props) {
  return (
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
        <TableColumn>Alias</TableColumn>
        <TableColumn>Created at</TableColumn>
        <TableColumn>Updated at</TableColumn>
        <TableColumn>Group</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Password</TableColumn>
      </TableHeader>
      {urls && urls.length > 0 ? (
        <TableBody>
          {urls.map((url) => (
            <TableRow key={url.id}>
              <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                {url.url}
              </TableCell>
              <TableCell>{url.alias}</TableCell>
              <TableCell>{formatDate(url.created_at)}</TableCell>
              <TableCell>{formatDate(url.updated_at)}</TableCell>
              <TableCell>{url.group}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={
                      url.privacy === "public"
                        ? "size-3 rounded-full bg-green-500"
                        : "size-3 rounded-full bg-red-500"
                    }
                  ></div>
                  {url.privacy}
                </div>
              </TableCell>
              <TableCell>
                {url.privacy === "private" ? (
                  <Lock size={18} className="text-red-600" />
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent="No rows to display.">{[]}</TableBody>
      )}
    </Table>
  );
}
