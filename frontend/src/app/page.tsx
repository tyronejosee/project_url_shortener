"use client";

import { useEffect, useState } from "react";
import { HeroSection, Sponsors, UrlList } from "@/components/branding";
import { URLShortenerForm } from "@/components/urls";
import { AnimatedContent } from "@/components/animated";
import type { URLRead } from "@/types";

export default function Home() {
  const [urls, setUrls] = useState<URLRead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLinks = JSON.parse(localStorage.getItem("urls") || "[]");
      const sortedLinks = storedLinks.sort((a: URLRead, b: URLRead) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
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
    <main className="flex-1 relative isolate overflow-hidden py-24 sm:py-20">
      <HeroSection />
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
      <Sponsors />
    </main>
  );
}
