"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, Button, addToast } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supportSchema } from "@/lib/zod";
import { API_URL } from "@/config/constants";
import { SupportForm } from "@/types";

export default function SupportPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SupportForm>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: session?.user?.username || "",
      email: session?.user?.email || "",
      message: "",
    },
  });

  const onSubmit = async (data: SupportForm) => {
    try {
      await fetch(`${API_URL}api/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      addToast({
        title: "Thank you for your support!",
        description:
          "We appreciate your support and will use it to continuously improve. Your opinion is valuable to us.",
      });

      reset();
      router.push("/dashboard");
    } catch (error) {
      setApiError(`${error}`);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h1 className="text-4xl font-bold text-center pb-10">Support</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-9">
          <Input
            label="Username"
            labelPlacement="outside"
            size="lg"
            type="text"
            placeholder="joe.doe"
            isInvalid={!!errors.name?.message}
            color={errors.name?.message ? "danger" : "default"}
            errorMessage={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Email"
            labelPlacement="outside"
            size="lg"
            type="email"
            placeholder="you@example.com"
            isInvalid={!!errors.email?.message}
            color={errors.email?.message ? "danger" : "default"}
            errorMessage={errors.email?.message}
            {...register("email")}
          />
          <Textarea
            label="Message"
            labelPlacement="outside"
            size="lg"
            type="textarea"
            placeholder="Your message here..."
            isInvalid={!!errors.message?.message}
            color={errors.message?.message ? "danger" : "default"}
            errorMessage={errors.message?.message}
            {...register("message")}
          />
        </div>
        {apiError && <p className="text-red-500">{apiError}</p>}
        <Button type="submit" color="primary" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
