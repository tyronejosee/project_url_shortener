"use client";

import { Input, Textarea, Button } from "@heroui/react";
import { useFeedbackForm } from "@/hooks/useFeedbackForm";

export default function FeedbackPage() {
  const { form, loading, error, handleChange, handleSubmit } = useFeedbackForm();

  return (
    <div className="mx-auto p-4">
      <section className="max-w-lg mx-auto p-6 rounded-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">
          Support, Feedback
        </h1>
        <p className="text-center mb-8 text-neutral-500">
          Have a question? We will be happy to help you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-10">
            <Input
              isRequired
              label="Name"
              type="text"
              labelPlacement="outside"
              placeholder="Joe Doe"
              name="name"
              value={form.name}
              onChange={handleChange}
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
          </div>
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
          <Button
            type="submit"
            color="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </form>
      </section>
    </div>
  );
}
