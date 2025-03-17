"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { addToast } from "@heroui/react";

export default function useResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/users/reset_password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok) {
        addToast({
          title: "Reset link sent.",
          description:
            "Please check your email inbox for the password reset link and follow the instructions to reset your password.",
        });
      }

    } catch (error) {
      setError(`Error ${error}`);

    } finally {
      setIsLoading(false);
    }
  };

  return { email, isLoading, onChange, onSubmit };
}
