"use client";

import { Input, Textarea, Button } from "@heroui/react";
import { useSupportForm } from "@/hooks/useSupportForm";

export default function SupportPage() {
  const { form, loading, error, handleChange, handleSubmit } = useSupportForm();

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h1 className="text-4xl font-bold text-center pb-10">Support</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          isRequired
          label="Name"
          type="text"
          labelPlacement="outside"
          placeholder="Joe Doe"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="pb-6"
        />
        <Input
          isRequired
          label="Email"
          type="email"
          labelPlacement="outside"
          placeholder="you@example.com"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Textarea
          isRequired
          label="Message"
          type="textarea"
          labelPlacement="outside"
          placeholder="Your message here..."
          name="message"
          value={form.message}
          onChange={handleChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" color="primary" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
