"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, Button, addToast } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema } from "@/lib/zod";
import { API_URL } from "@/config/constants";
import { FeedbackForm } from "@/types";

export default function FeedbackPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: session?.user?.username || "",
      email: session?.user?.email || "",
      message: "",
    },
  });

  const onSubmit = async (data: FeedbackForm) => {
    try {
      await fetch(`${API_URL}api/feedback`, {
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
    <div className="mx-auto p-4">
      <section className="max-w-lg mx-auto p-6 rounded-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">
          Support, Feedback
        </h1>
        <p className="text-center mb-8 text-neutral-500">
          Have a question? We will be happy to help you.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-10">
            <Input
              isRequired
              label="Name"
              type="text"
              labelPlacement="outside"
              placeholder="Joe Doe"
              isInvalid={!!errors.name?.message}
              color={errors.name?.message ? "danger" : "default"}
              errorMessage={errors.name?.message}
              {...register("name")}
            />
            <Input
              isRequired
              label="Email"
              type="email"
              labelPlacement="outside"
              placeholder="you@example.com"
              isInvalid={!!errors.email?.message}
              color={errors.email?.message ? "danger" : "default"}
              errorMessage={errors.email?.message}
              {...register("email")}
            />
          </div>
          <Textarea
            isRequired
            label="Message"
            type="textarea"
            labelPlacement="outside"
            placeholder="Your message here..."
            isInvalid={!!errors.message?.message}
            color={errors.message?.message ? "danger" : "default"}
            errorMessage={errors.message?.message}
            {...register("message")}
          />
          {apiError && <p className="text-red-500">{apiError}</p>}
          <Button
            type="submit"
            color="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </form>
      </section>
    </div>
  );
}
