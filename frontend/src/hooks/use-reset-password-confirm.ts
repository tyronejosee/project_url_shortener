"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useResetPasswordConfirm(uid: string, token: string) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/users/reset_password_confirm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid, token, ...formData }),
        }
      );

      if (res.ok) {
        toast.success("Password reset successful");
        router.push("/auth/login");
      } else {
        toast.error("Password reset failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { ...formData, isLoading, onChange, onSubmit };
}
