"use client";

import { useEffect, useState } from "react";
import { HeroSection, UrlList } from "@/components/branding";
import { URLShortenerForm } from "@/components/forms";
import { URLRead } from "@/interfaces/url";

export default function Home() {
  const [urls, setUrls] = useState<URLRead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLinks = JSON.parse(localStorage.getItem("urls") || "[]");
      const sortedLinks = storedLinks.sort((a: URLRead, b: URLRead) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      setUrls(sortedLinks);
      setLoading(false)
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <HeroSection />
      <URLShortenerForm />
      <UrlList urls={urls} loading={loading} setUrls={setUrls} />
    </section>
  );
}
