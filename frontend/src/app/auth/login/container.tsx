"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import { SocialButtons } from "@/components/common";
import { loginAction } from "@/actions/auth-action";
import { loginSchema } from "@/lib/zod";
import { LoginForm } from "@/types";

export default function LoginContainer() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const response = await loginAction({
      email: data.email,
      password: data.password,
    });

    if (response.error) {
      setError(response.error);
      setIsLoading(false);
    } else {
      setError(null);
      router.push("/dashboard");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-12">
          <Input
            type="email"
            size="lg"
            label="Email"
            labelPlacement="outside"
            placeholder="you@example.com"
            isInvalid={!!errors.email?.message}
            color={errors.email?.message ? "danger" : "default"}
            errorMessage={errors.email?.message}
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
            color={errors.password?.message ? "danger" : "default"}
            errorMessage={errors.password?.message}
            {...register("password", { required: true })}
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              href="/forgot-password"
              className="font-medium text-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            size="lg"
            color="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
      <SocialButtons />
    </>
  );
}
