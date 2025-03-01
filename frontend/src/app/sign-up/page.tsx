"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Eye, EyeClosed } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<{
    username?: string;
    email?: string;
    general?: string;
  } | null>(null);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError({ general: "The passwords do not match." });
      return;
    }

    const userData = {
      username: name,
      email,
      password,
      re_password: confirmPassword,
    };

    try {
      const registerResponse = await fetch("http://localhost:8050/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        if (errorData.username) {
          setError({ username: errorData.username[0] });
        } else if (errorData.email) {
          setError({ email: errorData.email[0] });
        } else {
          setError({
            general: errorData.detail || "Error creating the account.",
          });
        }
        return;
      }

      const loginData = { email, password };
      const loginResponse = await fetch(
        "http://localhost:8050/api/tokens/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        setError({ general: errorData.detail || "Error logging in" });
        return;
      }

      const loginDataResponse = await loginResponse.json();

      Cookies.set("access_token", loginDataResponse.access, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("refresh_token", loginDataResponse.refresh, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      router.push("/dashboard");
    } catch (err) {
      setError({ general: "Error connecting to the server." });
      console.error(err);
    }
  };

  return (
    <main className="mx-auto p-4">
      <section className="max-w-lg mx-auto p-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Sign up to access all the features of the service.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-9">
            <Input
              isRequired
              label="Username"
              value={name}
              labelPlacement="outside"
              name="name"
              placeholder="Joe Doe"
              onChange={(e) => setName(e.target.value)}
              color={error?.username ? "danger" : "default"}
            />
            {error?.username && (
              <p className="text-red-500 text-sm">{error.username}</p>
            )}

            <Input
              isRequired
              label="Email"
              value={email}
              labelPlacement="outside"
              name="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              color={error?.email ? "danger" : "default"}
              errorMessage={error?.email || ""}
            />
            {error?.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
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

          {error?.general && (
            <p className="text-red-500 text-center">{error.general}</p>
          )}

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
  );
}
