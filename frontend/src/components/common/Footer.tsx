"use client";

import Link from "next/link";
import { links } from "@/config/constants";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) return null;

  return (
    <footer className="mt-auto py-8 border-t border-t-neutral-300">
      <div className="max-w-screen-xl mx-auto px-6 space-y-4">
        <div className="flex justify-center">
          <div className="flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center">
          <p>
            &copy; {new Date().getFullYear()} URL Shortener. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
