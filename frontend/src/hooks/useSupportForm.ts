"use client"

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createSupport } from "@/services/supportService";
import { FeedbackForm } from "@/interfaces/feedback";

export function useSupportForm() {
  const router = useRouter();
  const [form, setForm] = useState<FeedbackForm>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await createSupport(form);
      toast.success("Thanks for your support!");
      router.push("/dashboard");
    } catch (error) {
      setError(`Error ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}
