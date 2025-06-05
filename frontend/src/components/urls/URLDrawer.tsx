"use client";

import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Button,
  Input,
  Tooltip,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import type { URLForm, URLResponse } from "@/types";
import { privacyItems } from "@/config/constants";

type Props = {
  editingURL: URLResponse | null;
  control: Control<URLForm>;
  errors: FieldErrors<URLForm>;
  onSubmit: (data: URLForm) => void;
  handleSubmit: UseFormHandleSubmit<URLForm>;
  register: UseFormRegister<URLForm>;
  onClose: () => void;
  toggleVisibility: () => void;
  isOpen: boolean;
  loading: boolean;
  isSubmitting: boolean;
  isPlanAllowed: boolean;
  isVisible: boolean;
};

export default function URLDrawer({
  editingURL,
  control,
  errors,
  onSubmit,
  handleSubmit,
  register,
  onClose,
  toggleVisibility,
  isOpen,
  loading,
  isSubmitting,
  isPlanAllowed,
  isVisible,
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
          {editingURL ? "Update Url" : "Add New Url"}{" "}
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <Input
              label="URL"
              labelPlacement="outside"
              size="lg"
              placeholder="https://www.example.com"
              isInvalid={!!errors.url}
              errorMessage={errors.url?.message}
              {...register("url")}
            />
            <div className="flex space-x-6">
              <Tooltip content="Not available for this plan.">
                <div
                  className={clsx(
                    "w-full",
                    !isPlanAllowed && "pointer-events-none opacity-60",
                  )}
                >
                  <Input
                    type={isVisible ? "text" : "password"}
                    size="lg"
                    label={isPlanAllowed ? "Password" : "Password (*)"}
                    labelPlacement="outside"
                    placeholder="********"
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <Eye className="text-default-400 pointer-events-none" />
                        ) : (
                          <EyeClosed className="text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    {...register("password")}
                  />
                </div>
              </Tooltip>
              <Controller
                name="privacy"
                control={control}
                render={({ field }) => (
                  <Select
                    isDisabled={!isPlanAllowed}
                    size="lg"
                    label={isPlanAllowed ? "Privacy" : "Privacy (*)"}
                    labelPlacement="outside"
                    placeholder="Select a Privacy"
                    selectedKeys={
                      field.value ? new Set([field.value]) : new Set()
                    }
                    onSelectionChange={(keys) =>
                      field.onChange(Array.from(keys)[0])
                    }
                    items={privacyItems}
                    isInvalid={!!errors.privacy}
                    errorMessage={errors.privacy?.message}
                  >
                    {(item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    )}
                  </Select>
                )}
              />
            </div>
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
                : editingURL
                  ? "Update"
                  : "Save"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
