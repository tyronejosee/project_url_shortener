"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth";
import { addToast } from "@heroui/react";

export default function useLogin() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const { success, error } = await login(formData.email, formData.password);
    if (error) {
      setError(error);
    }
    if (success) {
      addToast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      router.push("/dashboard");
    }
    setIsLoading(false);
  };

  return { ...formData, isLoading, error, onChange, onSubmit };
}
