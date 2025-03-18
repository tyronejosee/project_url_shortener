"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import useRegister from "@/hooks/use-register";
import { SocialButtons } from "@/components/common";

export default function SignUp() {
  const {
    username,
    email,
    password,
    re_password,
    isLoading,
    errors,
    onChange,
    onSubmit,
  } = useRegister();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <main className="mx-auto p-4">
      <section className="max-w-lg mx-auto p-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Sign up to access all the features of the service.
        </p>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-9">
            <Input
              isRequired
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Joe Doe"
              value={username}
              onChange={onChange}
              color={errors.username ? "danger" : "default"}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">
                {errors.username.join(", ")}
              </p>
            )}

            <Input
              isRequired
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={onChange}
              color={errors.email ? "danger" : "default"}
              errorMessage={errors.email ? errors.email.join(", ") : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.join(", ")}</p>
            )}

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
              isRequired
              type={isVisible ? "text" : "password"}
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="********"
              value={password}
              onChange={onChange}
              color={errors.password ? "danger" : "default"}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.join(", ")}
              </p>
            )}

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
              isRequired
              type={isVisible ? "text" : "password"}
              label="Confirm Password"
              labelPlacement="outside"
              name="re_password"
              placeholder="********"
              value={re_password}
              onChange={onChange}
              color={errors.re_password ? "danger" : "default"}
            />
            {errors.re_password && (
              <p className="text-red-500 text-sm">
                {errors.re_password.join(", ")}
              </p>
            )}
          </div>

          {errors.non_field_errors && (
            <div className="text-red-500 text-sm">
              {errors.non_field_errors.join(", ")}
            </div>
          )}
          {errors.general && (
            <div className="text-red-500 text-sm">
              {errors.general.join(", ")}
            </div>
          )}

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
      </section>
    </main>
  );
}
