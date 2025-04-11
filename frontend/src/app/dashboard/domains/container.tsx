"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  addToast,
} from "@heroui/react";
import { DomainRequest, DomainResponse } from "@/types";
import { Plus } from "lucide-react";
import { domainSchema } from "@/lib/zod";
import { formatDate } from "@/lib/dates";
import { API_URL } from "@/config/constants";

type Props = {
  domains: DomainResponse[];
};

export default function DomainsContainer({ domains }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DomainRequest>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domain: "",
    },
  });

  const openAddModal = () => {
    reset({ domain: "" });
    onOpen();
  };

  const onSubmit = async (data: DomainRequest) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}api/domains`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      onClose();
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

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-500">
          Total {domains.length} domains
        </p>
        <Button
          onPress={openAddModal}
          color="primary"
          endContent={<Plus size={18} />}
        >
          Add Domain
        </Button>
      </header>

      <Table
        aria-label="Domains Table"
        radius="lg"
        color="primary"
        shadow="none"
        selectionMode="multiple"
        className="border border-neutral-300 rounded-xl"
      >
        <TableHeader>
          <TableColumn>Domain</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Verification Status</TableColumn>
        </TableHeader>
        {domains && domains.length > 0 ? (
          <TableBody>
            {domains.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.domain}</TableCell>
                <TableCell>{formatDate(item.created_at)}</TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    color={
                      item.status === "Pending"
                        ? "default"
                        : item.status === "Failed"
                          ? "danger"
                          : item.status === "Verified"
                            ? "success"
                            : "default"
                    }
                    variant="flat"
                  >
                    {item.status}
                  </Chip>
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
            Add New Domain
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Input
                label="Domain"
                labelPlacement="outside"
                type="text"
                placeholder="https://example.com"
                isInvalid={!!errors.domain}
                errorMessage={errors.domain?.message}
                {...register("domain")}
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
                {loading || isSubmitting ? "Saving..." : "Save"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
