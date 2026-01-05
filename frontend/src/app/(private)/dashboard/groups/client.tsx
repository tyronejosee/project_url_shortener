"use client";

import { addToast, Chip, useDisclosure } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePenIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createGroup, deleteGroupById, updateGroupById } from "@/actions/groups";
import { DeleteModal, Table } from "@/components/common";
import { GroupDrawer } from "@/components/groups";
import { useUser } from "@/hooks/use-user";
import { groupSchema } from "@/lib/zod";
import type {
  CellRendererProps,
  GroupForm,
  GroupResponse,
  TableAction,
  TableColumn,
} from "@/types";

type Props = {
  groups: GroupResponse[];
};

export default function GroupsPageClient({ groups }: Props) {
  // Hooks
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

  // States
  const [editingGroup, setEditingGroup] = useState<GroupResponse | null>(null);
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GroupForm>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Functions
  const openEditModal = (group: GroupResponse) => {
    setEditingGroup(group);
    reset({
      name: group.name,
      description: group.description,
    });
    onOpen();
  };

  const openAddModal = () => {
    setEditingGroup(null);
    reset({
      name: "",
      description: "",
    });
    onOpen();
  };

  const onSubmit = async (data: GroupForm) => {
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        description: data.description,
      };

      if (editingGroup) await updateGroupById(editingGroup.id, payload);
      else await createGroup(payload);

      router.refresh();
      onClose();
      setEditingGroup(null);
    } catch (error) {
      console.error("Submit error:", error);
      addToast({ title: "Error", description: "Error submitting form." });
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleDelete = (id: string) => {
    setGroupToDelete(id);
    onConfirmOpen();
  };

  const confirmDelete = async () => {
    if (!groupToDelete) return;
    setLoading(true);
    try {
      await deleteGroupById(groupToDelete);
      router.refresh();
      addToast({
        title: "Deleted",
        description: "Resource deleted successfully.",
      });
    } catch (error) {
      console.error("Delete error:", error);
      addToast({ title: "Error", description: "Failed to delete group." });
    } finally {
      setGroupToDelete(null);
      setLoading(false);
      onConfirmClose();
    }
  };

  // Constants
  const columns: TableColumn[] = [
    { name: "Name", uid: "name", sortable: true },
    { name: "Alias", uid: "alias", sortable: true },
    { name: "Description", uid: "description" },
    { name: "Created At", uid: "created_at", sortable: true },
    { name: "Updated At", uid: "updated_at", sortable: true },
    { name: "Is Available", uid: "is_available" },
  ];

  const actions: TableAction<GroupResponse>[] = [
    {
      key: "update",
      label: "Update group",
      icon: <SquarePenIcon size={18} />,
      shortcut: "⌘U",
      onAction: (group) => openEditModal(group),
    },
    {
      key: "delete",
      label: "Delete group",
      icon: <Trash2 size={18} />,
      color: "danger",
      shortcut: "⌘D",
      onAction: (group) => handleDelete(group.id),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Table */}
      <Table
        title="Groups table"
        data={groups}
        columns={columns}
        actions={actions}
        searchPlaceholder="Search by name..."
        searchKeys={["name"]}
        defaultRowsPerPage={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        addButton={{ label: "Add Group", onAdd: () => openAddModal() }}
        cellRenderer={({ columnKey, value }: CellRendererProps<GroupResponse>) => {
          switch (columnKey) {
            case "created_at":
              return new Date(value as string).toLocaleDateString();
            case "updated_at":
              return new Date(value as string).toLocaleDateString();
            case "is_available":
              return (
                <Chip size="sm" color={value ? "success" : "danger"} variant="flat">
                  {value === true ? "Active" : "Inactive"}
                </Chip>
              );
            default:
              return String(value ?? "");
          }
        }}
      />

      {/* Drawer */}
      <GroupDrawer
        editingGroup={editingGroup}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        onClose={onClose}
        isOpen={isOpen}
        loading={loading}
        isSubmitting={isSubmitting}
      />

      {/* Delete Modal */}
      <DeleteModal
        loading={loading}
        isConfirmOpen={isConfirmOpen}
        onConfirmClose={onConfirmClose}
        confirmDelete={confirmDelete}
        title="Delete Resource"
        description="Are you sure you want to delete this resource? This action cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
}
