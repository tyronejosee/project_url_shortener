"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { IFeedbackForm } from "@/interfaces/feedback.interface";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

export default function FeedbackPage() {
  const [form, setForm] = useState<IFeedbackForm>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="mx-auto p-4">
      <section className="max-w-md mx-auto p-6 rounded-2xl border border-neutral-300 hover:shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-2">Support, Feedback</h1>
        <p className="text-center mb-8 text-neutral-500">
          Have a question? We will be happy to help you.
        </p>
        {submitted ? (
          <p className="text-green-600">Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              isRequired
              label="Your name"
              type="text"
              variant="bordered"
              // value={form.name}
              onChange={handleChange}
            />
            <Input
              isRequired
              label="Email"
              type="email"
              variant="bordered"
              // value={form.email}
              onChange={handleChange}
            />
            <Input
              isRequired
              label="Message"
              type="textarea"
              variant="bordered"
              // value={form.email}
              onChange={handleChange}
            />
            <Button type="submit" color="primary" className="w-full">
              Send
            </Button>
          </form>
        )}
      </section>
    </div>
  );
}
