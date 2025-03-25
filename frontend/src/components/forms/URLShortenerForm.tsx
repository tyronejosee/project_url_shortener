"use client";

import { useURLShortenerForm } from "@/hooks/useURLShortenerForm";
import { Button, Input } from "@heroui/react";

export default function URLShortenerForm() {
  const { form, loading, error, handleChange, handleSubmit } =
    useURLShortenerForm();

  return (
    <div className="mt-2 mb-24 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-xl flex gap-x-4">
        <Input
          isRequired
          name="url"
          type="url"
          variant="bordered"
          size="lg"
          radius="lg"
          placeholder="https://www.example.com"
          value={form.url}
          onChange={handleChange}
          className="placeholder-slate-900"
        />
        <Button type="submit" color="primary" size="lg">
          {loading ? "Cutting..." : "Cut"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
