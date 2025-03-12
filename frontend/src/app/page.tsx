"use client";

import { Button, Input, Snippet } from "@heroui/react";

export default function Home() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      {/* Main Container */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Shorten your links in seconds
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Turn long URLs into short, shareable links. Fast, secure, and free.
        </p>
      </div>

      {/* URL Shortener Form */}
      <div className="mt-10 flex justify-center">
        <form className="w-full max-w-xl flex gap-x-4">
          <Input
            name="URL"
            type="url"
            placeholder="https://www.example.com"
            variant="bordered"
            size="lg"
            radius="lg"
            className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="animate-bounce hover:animate-none"
          >
            Cut
          </Button>
        </form>
      </div>

      {/* List of Shortened URLs */}
      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Shortened Links
        </h2>
        <ul className="mt-6 space-y-4">
          <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <a
              href="https://short.ly/abc123"
              className="text-blue-600 font-medium hover:underline"
              target="_blank"
            >
              https://www.long-example.com
            </a>
            <Snippet symbol className="bg-transparent">
              <a
                href="https://short.ly/abc123"
                className="text-blue-600 font-bold hover:underline"
                target="_blank"
              >
                https://short.ly/abc123
              </a>
            </Snippet>
          </li>
        </ul>
      </section>
    </section>
  );
}
