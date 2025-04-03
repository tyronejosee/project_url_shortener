"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { createShorten } from "@/services/urlService";
import { URLWriteMinimal } from "@/types";

export function useURLShortenerForm() {
  const [form, setForm] = useState<URLWriteMinimal>({ url: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await createShorten(form);
      if (!response) throw new Error("Server error");
      setForm({ url: "" });
      const storedUrls = JSON.parse(localStorage.getItem("urls") || "[]");
      const newUrls = [...storedUrls, response];
      localStorage.setItem("urls", JSON.stringify(newUrls));
      window.dispatchEvent(new Event("storage"));
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
