"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { IFeedbackForm } from "@/interfaces/feedback.interface";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
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
      <section className="max-w-lg mx-auto p-6 rounded-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">
          Support, Feedback
        </h1>
        <p className="text-center mb-8 text-neutral-500">
          Have a question? We will be happy to help you.
        </p>
        {submitted ? (
          <p className="text-green-600">Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-10">
              <Input
                isRequired
                label="Name"
                type="text"
                labelPlacement="outside"
                placeholder="Joe Doe"
                onChange={handleChange}
              />
              <Input
                isRequired
                label="Email"
                type="email"
                labelPlacement="outside"
                placeholder="you@example.com"
                onChange={handleChange}
              />
            </div>
            <Textarea
              isRequired
              label="Message"
              type="textarea"
              labelPlacement="outside"
              placeholder="Your message here..."
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
