"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import { createGroup, deleteGroup, updateGroup } from "@/services/groupService";
import { formatDate } from "@/utils/formatDate";
import { GroupRead, GroupWrite } from "@/types";

type Props = {
  groups: GroupRead[];
};

export default function GroupTable({ groups }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newGroup, setNewGroup] = useState({
    name: "",
    alias: "",
    description: "",
  });
  const [editingGroup, setEditingGroup] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGroup({ ...newGroup, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editingGroup) {
        await updateGroup(editingGroup.id, newGroup as GroupWrite);
      } else {
        await createGroup(newGroup as GroupWrite);
      }
      onClose();
      setNewGroup({ name: "", alias: "", description: "" });
      setEditingGroup(null);
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (group: GroupRead) => {
    setEditingGroup(group);
    setNewGroup({
      name: group.name,
      alias: group.alias,
      description: group.description,
    });
    onOpen();
  };

  const handleAddClick = () => {
    setEditingGroup(null);
    setNewGroup({ name: "", alias: "", description: "" });
    onOpen();
  };

  const handleDeleteClick = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este grupo?")) {
      try {
        await deleteGroup(id);
        router.refresh();
      } catch (error) {
        console.error("Error al eliminar el grupo:", error);
      }
    }
  };

  return (
    <div>
      <Button onPress={handleAddClick} color="primary">
        Add Group
      </Button>

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
                <TableCell>{formatDate(group.created_at)}</TableCell>
                <TableCell>{formatDate(group.updated_at)}</TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    color={group.is_available ? "success" : "danger"}
                    variant="flat"
                  >
                    {group.is_available ? "Active" : "Inactive"}
                  </Chip>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    color="warning"
                    onPress={() => handleEditClick(group)}
                  >
                    Update
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onPress={() => handleDeleteClick(group.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent="No rows to display.">{[]}</TableBody>
        )}
      </Table>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {editingGroup ? "Update Group" : "Add New Group"}{" "}
          </ModalHeader>
          <ModalBody>
            <Input
              isRequired
              label="Name"
              labelPlacement="outside"
              type="text"
              name="name"
              placeholder="Name group"
              value={newGroup.name}
              onChange={handleInputChange}
            />
            <Textarea
              isRequired
              label="Description"
              labelPlacement="outside"
              name="description"
              value={newGroup.description}
              onChange={handleInputChange}
              placeholder="Enter your description"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : editingGroup ? "Update" : "Save"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
