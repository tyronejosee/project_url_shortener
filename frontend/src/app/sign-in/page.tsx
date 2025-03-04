"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Eye, EyeClosed } from "lucide-react";
import Cookies from "js-cookie";
import useFetchData from "@/hooks/useFetchData";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [fetchDataParams, setFetchDataParams] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const { data, loading, error: fetchError } = useFetchData<{
    access: string;
    refresh: string;
  }>({
    url: fetchDataParams ? "api/tokens/create" : "",
    method: "POST",
    body: fetchDataParams ? { email, password } : undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFetchDataParams({ email, password });
    setTriggerFetch(true);
  };

  useEffect(() => {
    if (data?.access && data?.refresh) {
      Cookies.set("access_token", data.access, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refresh_token", data.refresh, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      window.location.href = "/dashboard";
    }
  }, [data]);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    }
  }, [fetchError]);

  return (
    <main className="mx-auto p-4">
      <section className="max-w-lg mx-auto p-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Sign in to access all the features of the service.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-9">
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
            <Button type="submit" color="primary" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
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
