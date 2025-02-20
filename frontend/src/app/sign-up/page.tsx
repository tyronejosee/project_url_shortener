"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Eye, EyeClosed } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <main className="max-w-screen-lg mx-auto p-6 flex justify-center">
        <section className="w-full max-w-md bg-white p-8 rounded-2xl border border-neutral-300">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Create an Account
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Sign up to access all the features of the service.
          </p>
          <form
            // onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-9">
              <Input
                isRequired
                label="Name"
                value={name}
                labelPlacement="outside"
                name="name"
                placeholder="Joe Doe"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                isRequired
                label="Email"
                value={email}
                labelPlacement="outside"
                name="email"
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
                type={isVisible ? "text" : "password"}
                label="Password"
                value={password}
                labelPlacement="outside"
                name="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
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
                label="Confirm Password"
                value={confirmPassword}
                labelPlacement="outside"
                name="confirm-password"
                placeholder="********"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Button type="submit" color="primary" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
