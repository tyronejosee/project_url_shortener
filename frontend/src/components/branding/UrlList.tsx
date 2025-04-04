"use client";

import { URLRead } from "@/types";
import { Button, Snippet } from "@heroui/react";

type Props = {
  urls: URLRead[];
  loading: boolean;
  setUrls: React.Dispatch<React.SetStateAction<URLRead[]>>;
};

export default function UrlList({ urls, setUrls }: Props) {
  const handleClearUrls = () => {
    localStorage.removeItem("urls");
    setUrls([]);
  };

  return (
    <section className="mt-16 max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Shortened Links</h2>
        {urls.length > 0 && (
          <Button color="danger" variant="light" onPress={handleClearUrls}>
            Clear All
          </Button>
        )}
      </div>
      {urls.length === 0 ? (
        <div className="flex justify-center items-center border border-neutral-300 rounded-xl w-full h-40">
          <span>No saved links.</span>
        </div>
      ) : (
        <ul className="mt-6 divide-y-2 divide-dashed divide-neutral-300">
          {urls.map((url, index) => (
            <li
              key={url.id || index}
              className="flex items-center justify-between py-2 pl-6 pr-1"
            >
              <a
                href={url.url}
                className="text-sm text-primary hover:underline"
                target="_blank"
              >
                {url.url}
              </a>
              <Snippet symbol className="bg-transparent">
                <a
                  href={url.alias}
                  className="text-primary text-sm font-bold hover:underline"
                  target="_blank"
                >
                  {url.alias}
                </a>
              </Snippet>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
