"use client";

import { Button, ButtonGroup, Chip } from "@heroui/react";
import { Link2, SquareArrowOutUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-2xl text-center space-y-6 px-6 lg:px-8">
      <div className="flex flex-col max-w-md mx-auto gap-4">
        <ButtonGroup variant="faded" size="sm" radius="lg">
          <Button>Introducing Short Conversions</Button>
          <Button endContent={<SquareArrowOutUpRight size={12} />}>
            Read More
          </Button>
        </ButtonGroup>
        <h1 className="tracking-tight inline font-semibold text-4xl lg:text-6xl">
          Short links with{" "}
          <span className="tracking-tight inline font-semibold from-primary to-[#FF6CAB] text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b">
            superpowers
          </span>
        </h1>
        <p className="w-full my-2 text-medium lg:text-large font-normal text-default-500 max-w-full mt-4 md:w-full text-center flex justify-center items-center">
          Shortener url is the open-source link management platform for modern
          marketing teams
        </p>
      </div>
      <div className="flex justify-center gap-2">
        <Button color="primary" size="lg">
          Start for free
        </Button>
        <Button variant="bordered" size="lg">
          Get a demo
        </Button>
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
