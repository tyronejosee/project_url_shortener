import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { groups } from "@/config/constants";
import { IURLGroup } from "@/interfaces/url-group.interface";

interface Props {
  groups: IURLGroup[];
}

export const GroupTable = ({ groups }: Props) => {
  return (
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
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
      )}
    </Table>
  );
};
