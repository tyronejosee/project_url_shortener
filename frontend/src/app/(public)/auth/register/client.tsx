"use client";

import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { registerAction } from "@/actions/auth-action";
import { SocialButtons } from "@/components/common";
import { useUser } from "@/hooks/use-user";
import { registerSchema } from "@/lib/zod";
import type { RegisterForm } from "@/types";

export default function RegisterPageClient() {
  const router = useRouter();
  const { fetchUser } = useUser();

  // States
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Handlers
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  // Actions
  const onSubmit = async (data: RegisterForm) => {
    setApiError(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password", data.password);

    const response = await registerAction({
      username: data.username,
      email: data.email,
      password: data.password,
      re_password: data.re_password,
    });

    if (response.error) {
      setApiError(response.error);
      setIsLoading(false);
      return;
    }

    setApiError(null);
    await fetchUser();
    router.push("/dashboard");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-12">
          <Input
            type="text"
            size="lg"
            label="Username"
            labelPlacement="outside"
            placeholder="Joe Doe"
            color={errors.username ? "danger" : "default"}
            isInvalid={!!errors.username?.message}
            errorMessage={errors.username?.message}
            classNames={{ label: "pb-20", input: "outline-none" }}
            {...register("username", { required: true })}
          />

          <Input
            type="email"
            size="lg"
            label="Email"
            labelPlacement="outside"
            placeholder="you@example.com"
            isInvalid={!!errors.email?.message}
            color={errors.email ? "danger" : "default"}
            errorMessage={errors.email?.message}
            classNames={{ label: "pb-20", input: "outline-none" }}
            {...register("email", { required: true })}
          />
          <Input
            type={isVisible ? "text" : "password"}
            size="lg"
            label="Password"
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
            isInvalid={!!errors.password?.message}
            color={errors.password ? "danger" : "default"}
            errorMessage={errors.password?.message}
            classNames={{ label: "pb-20", input: "outline-none" }}
            {...register("password", { required: true })}
          />

          <Input
            type={isVisible ? "text" : "password"}
            size="lg"
            label="Confirm Password"
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
            isInvalid={!!errors.re_password?.message}
            color={errors.re_password ? "danger" : "default"}
            errorMessage={errors.re_password?.message}
            classNames={{ label: "pb-20", input: "outline-none" }}
            {...register("re_password", { required: true })}
          />
        </div>

        {apiError && <p className="text-red-500 text-center">{apiError}</p>}

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            size="lg"
            color="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
      <SocialButtons />
    </>
  );
}
