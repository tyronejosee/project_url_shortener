"use client";

import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { API_URL } from "@/config/constants";
import { urlshortenerSchema } from "@/lib/zod";
import type { URLForm } from "@/types";

export default function URLShortenerForm() {
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<URLForm>({
    resolver: zodResolver(urlshortenerSchema),
  });

  const onSubmit = async (data: URLForm) => {
    try {
      const res = await fetch(`${API_URL}api/urls/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res) throw new Error("Server error");
      const urlData = await res.json();

      const storedUrls = JSON.parse(localStorage.getItem("urls") || "[]");
      const newUrls = [...storedUrls, urlData];
      localStorage.setItem("urls", JSON.stringify(newUrls));
      window.dispatchEvent(new Event("storage"));

      reset();
    } catch (error) {
      setApiError(`${error}`);
    }
  };

  return (
    <div className="mt-2 mb-24 flex justify-center px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl flex gap-x-4"
      >
        <Input
          type="url"
          variant="bordered"
          size="lg"
          radius="lg"
          placeholder="https://www.example.com"
          className="placeholder-slate-900"
          isInvalid={!!errors.url?.message}
          color={errors.url?.message ? "danger" : "default"}
          errorMessage={errors.url?.message}
          classNames={{ label: "pb-20", input: "outline-none" }}
          {...register("url")}
        />
        {apiError && <p className="text-red-500">{apiError}</p>}
        <Button type="submit" color="primary" size="lg">
          {isSubmitting ? "Cutting..." : "Cut"}
        </Button>
      </form>
    </div>
  );
}
