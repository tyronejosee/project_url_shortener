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

export default function LoginPage() {
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
    <main className="mx-auto p-4">
      <section className="max-w-lg mx-auto p-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Sign in to access all the features of the service.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-9">
            <Input
              label="Email"
              labelPlacement="outside"
              placeholder="you@example.com"
              isInvalid={!!errors.email?.message}
              color={errors.email?.message ? "danger" : "default"}
              errorMessage={errors.email?.message}
              {...register("email", { required: true })}
            />
            <Input
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
              type={isVisible ? "text" : "password"}
              label="Password"
              labelPlacement="outside"
              placeholder="********"
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
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
        <SocialButtons />
      </section>
    </main>
  );
}
