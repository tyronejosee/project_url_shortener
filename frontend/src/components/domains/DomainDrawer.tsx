"use client";

import {
  Input,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Button,
} from "@heroui/react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import type { DomainResponse, DomainForm } from "@/types";

type Props = {
  editingDomain: DomainResponse | null;
  errors: FieldErrors<DomainForm>;
  onSubmit: (data: DomainForm) => void;
  handleSubmit: UseFormHandleSubmit<DomainForm>;
  register: UseFormRegister<DomainForm>;
  onClose: () => void;
  isOpen: boolean;
  loading: boolean;
  isSubmitting: boolean;
};

export default function DomainDrawer({
  editingDomain,
  errors,
  onSubmit,
  handleSubmit,
  register,
  onClose,
  isOpen,
  loading,
  isSubmitting,
}: Props) {
  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onClose}
      size="lg"
      backdrop="blur"
      classNames={{
        base: "bg-white border-l-2 border-neutral-200",
      }}
    >
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1">
          {editingDomain ? "Update Domain" : "Add New Domain"}{" "}
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <Input
              label="Name"
              labelPlacement="outside"
              type="url"
              placeholder="https://example.com"
              isInvalid={!!errors.domain}
              errorMessage={errors.domain?.message}
              {...register("domain")}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button size="sm" variant="bordered" onPress={onClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={loading || isSubmitting}
              className="bg-primary text-white font-medium"
            >
              {loading || isSubmitting
                ? "Saving..."
                : editingDomain
                  ? "Update"
                  : "Save"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
