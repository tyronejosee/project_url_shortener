"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { SidebarList } from "@/components/common";
import { Logo } from "../icons";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const savedSidebarState = localStorage.getItem("sidebarState");
    if (savedSidebarState) {
      setIsOpen(JSON.parse(savedSidebarState));
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebarState", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <aside
      className={clsx(
        "relative z-20 transition-all duration-300 ease-in-out bg-white border-r border-neutral-300 p-5 flex flex-col h-screen",
        isOpen ? "w-56" : "w-20",
      )}
    >
      {/* Button */}
      <button
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
        className="bg-white p-1 rounded-md border border-neutral-300 absolute top-4 -right-4 z-50 outline-none focus:ring-0"
      >
        {isOpen ? <ArrowLeft size={24} /> : <ArrowRight size={24} />}
      </button>

      {/* Logo */}
      <Link
        href={"/"}
        className="h-10 bg-neutral-50 rounded-xl w-full flex items-center justify-center"
      >
        <Logo size="size-8" />
        <span
          className={clsx(
            "overflow-hidden transition-all duration-500 ease-in-out font-bold text-primary",
            isOpen ? "ml-2 opacity-100 w-auto delay-200" : "opacity-0 w-0",
          )}
        >
          UrlShortener
        </span>
      </Link>
      <SidebarList isOpen={isOpen} />

      {/* Footer */}
      <footer className="pb-4 flex items-center">
        <Link
          href={"https://github.com/tyronejosee"}
          target="_blank"
          className={clsx(
            "flex justify-center items-center p-2 rounded-xl relative border border-neutral-300 w-full h-10",
          )}
        >
          <div
            className={clsx(
              "absolute inset-0 flex justify-center items-center transition-opacity duration-300",
              isOpen ? "opacity-0" : "opacity-100",
            )}
          >
            <Heart size={24} />
          </div>
          <span
            className={clsx(
              "absolute inset-0 flex justify-center items-center text-xs line-clamp-1 transition-opacity duration-300 hover:underline",
              isOpen ? "opacity-100" : "opacity-0",
            )}
          >
            Made with ♥️ by Tyrone
          </span>
        </Link>
      </footer>
    </aside>
  );
}
