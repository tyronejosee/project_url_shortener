"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import useRegister from "@/hooks/use-register";
import { SocialButtons } from "@/components/common";

export default function RegisterContainer() {
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
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-12">
          <Input
            type="text"
            size="lg"
            name="username"
            label="Username"
            labelPlacement="outside"
            placeholder="Joe Doe"
            color={errors.username ? "danger" : "default"}
            value={username}
            onChange={onChange}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.join(", ")}</p>
          )}

          <Input
            type="email"
            size="lg"
            name="email"
            label="Email"
            labelPlacement="outside"
            placeholder="you@example.com"
            onChange={onChange}
            color={errors.email ? "danger" : "default"}
            errorMessage={errors.email ? errors.email.join(", ") : ""}
            value={email}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.join(", ")}</p>
          )}

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
            color={errors.password ? "danger" : "default"}
            value={password}
            name="password"
            onChange={onChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.join(", ")}</p>
          )}

          <Input
            type={isVisible ? "text" : "password"}
            size="lg"
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="********"
            value={re_password}
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
            color={errors.re_password ? "danger" : "default"}
            name="re_password"
            onChange={onChange}
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
    </>
  );
}
