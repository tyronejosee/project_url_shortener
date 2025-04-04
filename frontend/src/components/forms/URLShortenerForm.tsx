"use client";

import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { URLForm } from "@/types";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "@/config/constants";
import { urlshortenerSchema } from "@/lib/zod";

export default function URLShortenerForm() {
  const { data: session } = useSession();
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
        headers: {
          Authorization: `Bearer ${session?.accessToken}` || "",
          "Content-Type": "application/json",
        },
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
    <div className="mt-2 mb-24 flex justify-center">
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
