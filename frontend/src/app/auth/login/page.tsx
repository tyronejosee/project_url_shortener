"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import useLogin from "@/hooks/use-login";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { email, password, isLoading, error, onChange, onSubmit } = useLogin();

  return (
    <main className="mx-auto p-4">
      <section className="max-w-lg mx-auto p-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Sign in to access all the features of the service.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-9">
            <Input
              isRequired
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={onChange}
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
              isRequired
              type={isVisible ? "text" : "password"}
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="********"
              value={password}
              onChange={onChange}
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
      </section>
    </main>
  );
}
