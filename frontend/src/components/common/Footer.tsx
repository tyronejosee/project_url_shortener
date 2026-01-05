"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/config/constants";

export default function Footer() {
  const pathname = usePathname();
  const ignoredRoutes = ["/dashboard", "/auth/google", "/auth/facebook"];
  const isIgnoredRoute = ignoredRoutes.some((route) => pathname.startsWith(route));
  if (isIgnoredRoute) return null;

  return (
    <footer className="mt-auto py-8 border-t border-t-neutral-300">
      <div className="max-w-screen-sm mx-auto px-6 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center mx-auto text-center">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary hover:underline">
              {link.name}
            </Link>
          ))}
        </div>
        <div className="text-center text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
