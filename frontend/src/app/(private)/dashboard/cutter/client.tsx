"use client";

import {
  addToast,
  Button,
  Input,
  Select,
  SelectItem,
  Tooltip,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { API_URL, privacyItems } from "@/config/constants";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@/hooks/use-user";
import { urlSchema } from "@/lib/zod";
import type { GroupResponse, URLForm } from "@/types";

type Props = {
  groups: GroupResponse[];
};

export default function CutterPageClient({ groups }: Props) {
  // Hooks
  // Hooks
  const fetchClient = useFetch();
  const { user } = useUser();
  const plan = user?.plan;
  const isPlanAllowed = plan === "Basic Plan" || plan === "Premium Plan";

  // States
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

  // Actions
  const onSubmit = async (data: URLForm) => {
    setLoading(true);
    try {
      await fetchClient(`${API_URL}api/urls/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      reset();
      addToast({
        title: "Success",
        description: "URL created successfully.",
      });
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

  // Handlers
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              !isPlanAllowed && "pointer-events-none opacity-60"
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
              selectedKeys={field.value ? new Set([field.value]) : new Set()}
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
              items={privacyItems}
              isInvalid={!!errors.privacy}
              errorMessage={errors.privacy?.message}
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
          )}
        />
      </div>
      <div className="flex space-x-6">
        <Controller
          name="group"
          control={control}
          render={({ field }) => (
            <Select
              isDisabled={!isPlanAllowed}
              size="lg"
              label={isPlanAllowed ? "Group" : "Group (*)"}
              labelPlacement="outside"
              placeholder="Select a Group"
              selectedKeys={field.value ? new Set([field.value]) : new Set()}
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
              items={groups}
              isInvalid={!!errors.group}
              errorMessage={errors.group?.message}
            >
              {(group) => <SelectItem key={group.id}>{group.name}</SelectItem>}
            </Select>
          )}
        />
      </div>
      <div className="flex justify-start">
        <Button size="lg" color="primary" type="submit">
          {loading || isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
