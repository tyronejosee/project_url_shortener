"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";

export default function useResetPasswordConfirm(uid: string, token: string) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/users/reset_password_confirm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid, token, ...formData }),
        },
      );

      if (res.ok) {
        addToast({
          title: "Password reset successful",
          description: "Your password has been successfully changed.",
        });
        router.push("/auth/login");
      }
    } catch (error) {
      setError(`Error ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { ...formData, isLoading, onChange, onSubmit };
}
