"use client";

import { Button, Input, Textarea, addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { API_URL } from "@/config/constants";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@/hooks/use-user";
import { feedbackSchema } from "@/lib/zod";
import type { FeedbackForm } from "@/types";

export default function FeedbackPageClient() {
  // Hooks
  const router = useRouter();
  const { user } = useUser();
  const { fetchClient } = useFetch();

  // States
  const [apiError, setApiError] = useState<string | null>(null);

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: user?.username || "",
      email: user?.email || "",
      message: "",
    },
  });

  // Actions
  const onSubmit = async (data: FeedbackForm) => {
    try {
      await fetchClient(`${API_URL}api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      addToast({
        title: "Thank you for your feedback!",
        description:
          "We appreciate your feedback and will use it to continuously improve. Your opinion is valuable to us.",
      });

      reset();
      router.push("/");
    } catch (error) {
      setApiError(`${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-12">
        <Input
          type="text"
          size="lg"
          label="Name"
          labelPlacement="outside"
          placeholder="Joe Doe"
          isInvalid={!!errors.name?.message}
          color={errors.name?.message ? "danger" : "default"}
          errorMessage={errors.name?.message}
          {...register("name")}
        />
        <Input
          type="email"
          size="lg"
          label="Email"
          labelPlacement="outside"
          placeholder="you@example.com"
          isInvalid={!!errors.email?.message}
          color={errors.email?.message ? "danger" : "default"}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
      </div>
      <Textarea
        type="textarea"
        size="lg"
        label="Message"
        labelPlacement="outside"
        placeholder="Your message here..."
        isInvalid={!!errors.message?.message}
        color={errors.message?.message ? "danger" : "default"}
        errorMessage={errors.message?.message}
        {...register("message")}
      />
      {apiError && <p className="text-red-500">{apiError}</p>}
      <div className="flex justify-start gap-2">
        <Button type="submit" size="lg" color="primary" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  );
}
