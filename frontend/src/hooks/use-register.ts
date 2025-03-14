"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";

export default function useRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        addToast({
          title: "Verify your account.",
          description: "Please check your email to verify your account.",
        });
        router.push("/auth/login");
      } else {
        if (data.email) {
          setErrors((prev) => ({ ...prev, email: data.email }));
        }
        if (data.username) {
          setErrors((prev) => ({ ...prev, username: data.username }));
        }
        if (data.password) {
          setErrors((prev) => ({ ...prev, password: data.password }));
        }
        if (data.re_password) {
          setErrors((prev) => ({ ...prev, re_password: data.re_password }));
        }
        if (data.non_field_errors) {
          setErrors((prev) => ({
            ...prev,
            non_field_errors: data.non_field_errors,
          }));
        }
      }
    } catch {
      setErrors({ general: ["Something went wrong"] });
    } finally {
      setIsLoading(false);
    }
  };

  return { ...formData, isLoading, errors, onChange, onSubmit };
}
