"use client";

import { Button, ButtonGroup } from "@heroui/react";
import { SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import type { URLResponse } from "@/types";
import { AnimatedContent } from "../animated";
import { UrlList } from "../branding";
import { URLShortenerForm } from "../urls";

export function HeroSection() {
  const [urls, setUrls] = useState<URLResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLinks = JSON.parse(localStorage.getItem("urls") || "[]");
      const sortedLinks = storedLinks.sort((a: URLResponse, b: URLResponse) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      setUrls(sortedLinks);
      setLoading(false);
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <section id="hero" className="max-w-6xl mx-auto px-4 py-20 text-center flex flex-col gap-12">
      <header className="flex flex-col gap-4 max-w-md mx-auto">
        <ButtonGroup variant="faded" size="sm" radius="lg">
          <Button>Introducing Short Conversions</Button>
          <Button endContent={<SquareArrowOutUpRight size={12} />}>Read More</Button>
        </ButtonGroup>
        <h1 className="tracking-tight inline font-semibold text-4xl lg:text-6xl">
          Short links with{" "}
          <span className="tracking-tight inline font-semibold from-primary to-[#FF6CAB] text-4xl lg:text-6xl bg-clip-text text-transparent bg-linear-to-b">
            superpowers
          </span>
        </h1>
        <p className="w-full my-2 text-medium lg:text-large font-normal text-default-500 max-w-full mt-4 md:w-full text-center flex justify-center items-center">
          Shortener url is the open-source link management platform for modern marketing teams
        </p>
        <div className="flex justify-center gap-2">
          <Button color="primary" size="lg">
            Start for free
          </Button>
          <Button variant="bordered" size="lg">
            Get a demo
          </Button>
        </div>
      </header>

      <URLShortenerForm />

      {urls.length > 0 && (
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          config={{ tension: 80, friction: 20 }}
          initialOpacity={0.0}
          animateOpacity
          scale={1.0}
          threshold={0.2}
        >
          <UrlList urls={urls} loading={loading} setUrls={setUrls} />
        </AnimatedContent>
      )}
    </section>
  );
}
