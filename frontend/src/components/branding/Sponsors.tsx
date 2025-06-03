"use client";

import { Image } from "@heroui/react";
import { InfiniteSlider } from "@/components/animated";

export default function Sponsors() {
  const sponsors = [
    {
      name: "Cal",
      logo: "/sponsors/cal.svg",
      url: "https://cal.com/",
    },
    {
      name: "Framer",
      logo: "/sponsors/framer.svg",
      url: "https://framer.com/",
    },
    {
      name: "Hashnode",
      logo: "/sponsors/hashnode.svg",
      url: "https://hashnode.com/",
    },
    {
      name: "Hubermanlab",
      logo: "/sponsors/hubermanlab.svg",
      url: "https://hubermanlab.com/",
    },
    {
      name: "Perplexity",
      logo: "/sponsors/perplexity.svg",
      url: "https://perplexity.ai/",
    },
  ];

  return (
    <InfiniteSlider gap={16} reverse>
      {sponsors.map((sponsor) => (
        <a
          key={sponsor.name}
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            className="h-[80px] bg-neutral-50 border border-neutral-200"
          />
        </a>
      ))}
    </InfiniteSlider>
  );
}
