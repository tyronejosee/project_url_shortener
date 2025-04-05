"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Input } from "@heroui/react";

export default function DonatePage() {
  const [amount, setAmount] = useState("");

  return (
    <main className="max-w-screen-lg mx-auto py-6 px-6 grid grid-col-1 md:grid-cols-2 gap-4">
      <figure className="hidden md:block overflow-hidden rounded-2xl border border-neutral-300">
        <Image
          src="/img/donate.webp"
          alt="Donate"
          width={480}
          height={640}
          className="pointer-events-none select-none"
        />
      </figure>
      <section className="rounded-2xl p-6 w-full text-center border border-neutral-300">
        <h1 className="text-4xl font-bold text-center">Donate</h1>
        <p className="text-gray-600 mb-6">
          Every donation helps us move forward.
        </p>
        <form className="space-y-4">
          <Input
            isRequired
            label="Amount (USD)"
            type="Number"
            variant="bordered"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            color="primary"
            className="w-full"
            // onClick={handleDonate}
          >
            Donate
          </Button>
        </form>
      </section>
    </main>
  );
}
