"use client";

import { Button, ButtonGroup, Chip } from "@heroui/react";
import { Link2, SquareArrowOutUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-2xl text-center space-y-6">
      <div className="max-w-sm mx-auto">
        <ButtonGroup variant="faded" size="sm" radius="lg">
          <Button>Introducing Dub Conversions</Button>
          <Button endContent={<SquareArrowOutUpRight size={12} />}>
            Read More
          </Button>
        </ButtonGroup>
        <h2 className="text-6xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mt-4">
          Short links with superpowers
        </h2>
        <p className="mt-6 text-lg text-gray-600">
          Shortener url is the open-source link management platform for modern
          marketing teams
        </p>
      </div>
      <div className="flex justify-center gap-2">
        <Button color="primary">Start for free</Button>
        <Button color="default">Get a demo</Button>
      </div>
      <Chip
        size="sm"
        color="default"
        variant="faded"
        startContent={<Link2 size={18} />}
      >
        Try it out
      </Chip>
    </section>
  );
}
