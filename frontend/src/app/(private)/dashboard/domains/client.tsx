"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast, Chip, useDisclosure } from "@heroui/react";
import { SquarePenIcon, Trash2 } from "lucide-react";
import {
  createDomain,
  deleteDomainById,
  updateDomainById,
} from "@/actions/domains";
import { DeleteModal, Table } from "@/components/common";
import { DomainDrawer } from "@/components/domains";
import { domainSchema } from "@/lib/zod";
import type {
  CellRendererProps,
  TableColumn,
  DomainResponse,
  TableAction,
  DomainForm,
} from "@/types";
import { capitalize } from "@/lib/utils";

type Props = {
  domains: DomainResponse[];
};

export default function DomainsPageClient({ domains }: Props) {
  // Hooks
  const router = useRouter();
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  // States
  const [editingDomain, setEditingDomain] = useState<DomainResponse | null>(
    null,
  );
  const [domainToDelete, setDomainToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DomainForm>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domain: "",
    },
  });

  // Functions
  const openEditModal = (domain: DomainResponse) => {
    setEditingDomain(domain);
    reset({
      domain: domain.domain,
    });
    onOpen();
  };

  const openAddModal = () => {
    setEditingDomain(null);
    reset({
      domain: "",
    });
    onOpen();
  };

  const onSubmit = async (data: DomainForm) => {
    setLoading(true);
    try {
      const payload = {
        domain: data.domain,
      };

      if (editingDomain)
        await updateDomainById(editingDomain.id, payload, session);
      else await createDomain(payload, session);

      router.refresh();
      onClose();
      setEditingDomain(null);
    } catch (error) {
      console.error("Submit error:", error);
      addToast({ title: "Error", description: "Error submitting form." });
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleDelete = (id: string) => {
    setDomainToDelete(id);
    onConfirmOpen();
  };

  const confirmDelete = async () => {
    if (!domainToDelete) return;
    setLoading(true);
    try {
      await deleteDomainById(domainToDelete, session);
      router.refresh();
      addToast({
        title: "Deleted",
        description: "Resource deleted successfully.",
      });
    } catch (error) {
      console.error("Delete error:", error);
      addToast({ title: "Error", description: "Failed to delete domain." });
    } finally {
      setDomainToDelete(null);
      setLoading(false);
      onConfirmClose();
    }
  };

  // Constants
  const columns: TableColumn[] = [
    { name: "Domain", uid: "domain", sortable: true },
    { name: "Created At", uid: "created_at", sortable: true },
    { name: "Verification Status", uid: "status", sortable: true },
  ];

  const actions: TableAction<DomainResponse>[] = [
    {
      key: "update",
      label: "Update domain",
      icon: <SquarePenIcon size={18} />,
      shortcut: "⌘U",
      onAction: (group) => openEditModal(group),
    },
    {
      key: "delete",
      label: "Delete domain",
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
        title="Domains table"
        data={domains}
        columns={columns}
        actions={actions}
        searchPlaceholder="Search by domain..."
        searchKeys={["domain"]}
        defaultRowsPerPage={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        addButton={{ label: "Add Domain", onAdd: () => openAddModal() }}
        cellRenderer={({
          columnKey,
          value,
        }: CellRendererProps<DomainResponse>) => {
          switch (columnKey) {
            case "created_at":
              return new Date(value as string).toLocaleDateString();
            case "status":
              return (
                <Chip
                  size="sm"
                  color={
                    value === "verified"
                      ? "success"
                      : value === "failed"
                        ? "danger"
                        : "default"
                  }
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
      <DomainDrawer
        editingDomain={editingDomain}
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
        title="Delete Domain"
        description="Are you sure you want to delete this domain? This action cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
}
