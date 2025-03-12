"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SidebarList } from "@/components/common";

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
        "relative z-40 transition-all duration-300 ease-in-out bg-white border-r border-neutral-300 p-5 flex flex-col h-screen",
        isOpen ? "w-56" : "w-20"
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

      <div className="h-20 bg-neutral-50 rounded-xl w-full"></div>

      <SidebarList isOpen={isOpen} />

      {/* Footer */}
      {/* <footer className="pb-4 flex items-center">
        <div className="flex items-center">
          <div className="w-6 flex-shrink-0">
            <Settings size={20} className="flex-shrink-0" />
          </div>
          <span
            className={clsx(
              "ml-3 transition-all overflow-hidden",
              isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
            )}
          >
            Made with ♥️ by Tyrone Jose
          </span>
        </div>
      </footer> */}
    </aside>
  );
}
