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
  addToast,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { formatDate } from "@/lib/dates";
import { GroupForm, GroupResponse } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupSchema } from "@/lib/zod";
import { useSession } from "next-auth/react";
import { API_URL } from "@/config/constants";
import { EllipsisVertical, Plus, SquarePenIcon, Trash2 } from "lucide-react";

type Props = {
  groups: GroupResponse[];
};

export default function GroupsContainer({ groups }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingGroup, setEditingGroup] = useState<GroupResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GroupForm>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      alias: "",
      description: "",
    },
  });

  const openEditModal = (group: GroupResponse) => {
    setEditingGroup(group);
    reset({
      name: group.name,
      alias: group.alias,
      description: group.description,
    });
    onOpen();
  };

  const openAddModal = () => {
    setEditingGroup(null);
    reset({ name: "", alias: "", description: "" });
    onOpen();
  };

  const onSubmit = async (data: GroupForm) => {
    setLoading(true);
    try {
      if (editingGroup) {
        await fetch(`${API_URL}api/groups/${editingGroup.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        await fetch(`${API_URL}api/groups`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
      onClose();
      setEditingGroup(null);
      router.refresh();
    } catch (error) {
      console.error("Submit error:", error);
      addToast({
        title: "Error",
        description: "An error occurred while submitting the form.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (confirm("Are you sure you want to delete this group?")) {
      try {
        await fetch(`${API_URL}api/groups/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        router.refresh();
      } catch (error) {
        console.error("Error deleting group:", error);
        addToast({
          title: "Error",
          description: "An error occurred while deleting the group.",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-500">
          Total {groups.length} groups
        </p>
        <Button
          onPress={openAddModal}
          color="primary"
          endContent={<Plus size={18} />}
        >
          Add Group
        </Button>
      </header>

      <Table
        aria-label="Groups Table"
        radius="lg"
        color="primary"
        shadow="none"
        selectionMode="multiple"
        className="border border-neutral-300 rounded-xl"
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Alias</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Updated At</TableColumn>
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
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light">
                        <EllipsisVertical size={18} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Group actions">
                      <DropdownItem
                        key="update"
                        shortcut="⌘U"
                        startContent={<SquarePenIcon size={18} />}
                        onPress={() => openEditModal(group)}
                      >
                        Update group
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        shortcut="⌘D"
                        startContent={<Trash2 size={18} />}
                        onPress={() => handleDeleteClick(group.id)}
                      >
                        Delete group
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Input
                label="Name"
                labelPlacement="outside"
                type="text"
                placeholder="Name group"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                {...register("name")}
              />
              <Textarea
                label="Description"
                labelPlacement="outside"
                type="textarea"
                placeholder="Enter your description"
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message}
                {...register("description")}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting
                  ? "Saving..."
                  : editingGroup
                    ? "Update"
                    : "Save"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
