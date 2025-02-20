"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Eye, EyeClosed } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <main className="max-w-screen-lg mx-auto p-6 flex justify-center">
      <section className="w-full max-w-md p-8 rounded-2xl border border-neutral-300">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Sign in to access all the features of the service.
        </p>

        <form
          // onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-9">
            <Input
              isRequired
              // isDisabled={isLoading}
              label="Email"
              value={email}
              labelPlacement="outside"
              name="username"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
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
              // isDisabled={isLoading}
              type={isVisible ? "text" : "password"}
              label="Password"
              value={password}
              labelPlacement="outside"
              name="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

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
            <Button type="submit" color="primary" className="w-full">
              Sign In
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
