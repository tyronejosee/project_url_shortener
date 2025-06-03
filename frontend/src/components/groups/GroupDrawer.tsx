"use client";

import {
  Input,
  Textarea,
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
import type { GroupResponse, GroupForm } from "@/types";

type Props = {
  editingGroup: GroupResponse | null;
  errors: FieldErrors<GroupForm>;
  onSubmit: (data: GroupForm) => void;
  handleSubmit: UseFormHandleSubmit<GroupForm>;
  register: UseFormRegister<GroupForm>;
  onClose: () => void;
  isOpen: boolean;
  loading: boolean;
  isSubmitting: boolean;
};

export default function GroupDrawer({
  editingGroup,
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
          {editingGroup ? "Update Group" : "Add New Group"}{" "}
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
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
                : editingGroup
                  ? "Update"
                  : "Save"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
