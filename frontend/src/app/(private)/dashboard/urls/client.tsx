"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure, addToast, Chip } from "@heroui/react";
import { SquarePenIcon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createURL, deleteURLByAlias } from "@/actions/urls";
import { DeleteModal, Table } from "@/components/common";
import { URLDrawer } from "@/components/urls";
import { urlSchema } from "@/lib/zod";
import type {
  URLForm,
  URLResponse,
  TableAction,
  TableColumn,
  CellRendererProps,
} from "@/types";
import { capitalize } from "@/lib/utils";

type Props = {
  urls: URLResponse[];
};

export default function URLsPageClient({ urls }: Props) {
  // Hooks
  const router = useRouter();
  const { data: session } = useSession();
  const plan = session?.user?.plan;
  const isPlanAllowed = plan === "Basic Plan" || plan === "Premium Plan";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  // States
  const [editingURL, setEditingURL] = useState<URLResponse | null>(null);
  const [URLToDelete, setURLToDelete] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<URLForm>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
      group: "",
      privacy: "public",
      password: "",
    },
  });

  // Functions
  const openEditModal = (url: URLResponse) => {
    setEditingURL(url);
    reset({
      url: url.url,
      group: url.group,
      privacy: url.privacy,
    });
    onOpen();
  };

  const openAddModal = () => {
    setEditingURL(null);
    reset({
      url: "",
      group: "",
      privacy: "public",
      password: "",
    });
    onOpen();
  };

  const onSubmit = async (data: URLForm) => {
    setLoading(true);
    try {
      const payload = {
        url: data.url,
        group: data.group,
        privacy: data.privacy,
        password: data.password,
      };

      // ! if (editingURL) await updateURLById(editingURL.id);
      await createURL(payload);

      router.refresh();
      onClose();
      setEditingURL(null);
    } catch (error) {
      console.error("Submit error:", error);
      addToast({ title: "Error", description: "Error submitting form." });
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleDelete = (id: string) => {
    setURLToDelete(id);
    onConfirmOpen();
  };

  const confirmDelete = async () => {
    if (!URLToDelete) return;
    setLoading(true);
    try {
      await deleteURLByAlias(URLToDelete);
      router.refresh();
      addToast({
        title: "Deleted",
        description: "Url deleted successfully.",
      });
    } catch (error) {
      console.error("Delete error:", error);
      addToast({ title: "Error", description: "Failed to delete url." });
    } finally {
      setURLToDelete(null);
      setLoading(false);
      onConfirmClose();
    }
  };

  // Constants
  const columns: TableColumn[] = [
    { name: "Url", uid: "url", sortable: true },
    { name: "Alias", uid: "alias" },
    { name: "Created At", uid: "created_at", sortable: true },
    { name: "Updated At", uid: "updated_at", sortable: true },
    { name: "Group", uid: "group", sortable: true },
    { name: "Type", uid: "privacy", sortable: true },
    { name: "Password", uid: "password" },
  ];

  const actions: TableAction<URLResponse>[] = [
    {
      key: "update",
      label: "Update url",
      icon: <SquarePenIcon size={18} />,
      shortcut: "⌘U",
      onAction: (url) => openEditModal(url),
    },
    {
      key: "delete",
      label: "Delete url",
      icon: <Trash2 size={18} />,
      color: "danger",
      shortcut: "⌘D",
      onAction: (url) => handleDelete(url.id),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Table */}
      <Table
        title="Urls table"
        data={urls}
        columns={columns}
        actions={actions}
        searchPlaceholder="Search by url, alias..."
        searchKeys={["url", "alias"]}
        defaultRowsPerPage={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        addButton={{ label: "Add Url", onAdd: () => openAddModal() }}
        cellRenderer={({
          columnKey,
          value,
        }: CellRendererProps<URLResponse>) => {
          switch (columnKey) {
            case "created_at":
              return new Date(value as string).toLocaleDateString();
            case "updated_at":
              return new Date(value as string).toLocaleDateString();
            case "privacy":
              return (
                <Chip
                  size="sm"
                  color={value === "public" ? "success" : "default"}
                  variant="flat"
                >
                  {capitalize(value)}
                </Chip>
              );
            default:
              return String(value ?? "");
          }
        }}
      />

      {/* Drawer */}
      <URLDrawer
        editingURL={editingURL}
        control={control}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        onClose={onClose}
        toggleVisibility={toggleVisibility}
        isOpen={isOpen}
        loading={loading}
        isSubmitting={isSubmitting}
        isPlanAllowed={isPlanAllowed}
        isVisible={isVisible}
      />

      {/* Delete Modal */}
      <DeleteModal
        loading={loading}
        isConfirmOpen={isConfirmOpen}
        onConfirmClose={onConfirmClose}
        confirmDelete={confirmDelete}
        title="Delete Url"
        description="Are you sure you want to delete this url? This action cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
}
