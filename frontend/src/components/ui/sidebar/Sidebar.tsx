"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, ChartNoAxesColumn, Scissors, Link as Link2, Globe, Folder, Gem, HeartHandshake, LogOut, MousePointer2 } from "lucide-react";

export const Sidebar = () => {
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

      {/* Links */}
      <ul className="flex-1 mt-4 space-y-2">
        {[
          { href: "/dashboard/analytics", label: "Analytics", icon: <ChartNoAxesColumn size={20} className="flex-shrink-0" /> },
          { href: "/dashboard/cutter", label: "Cutter", icon: <Scissors size={20} className="flex-shrink-0" /> },
          { href: "/dashboard/links", label: "Links", icon: <Link2 size={20} className="flex-shrink-0" /> },
          { href: "/dashboard/clicks", label: "Clicks", icon: <MousePointer2 size={20} className="flex-shrink-0" /> },
          { href: "/dashboard/domains", label: "Domains", icon: <Globe size={20} className="flex-shrink-0" /> },
          { href: "/dashboard/groups", label: "Groups", icon: <Folder size={20} className="flex-shrink-0" /> },
          { href: "/dashboard/prices", label: "Prices", icon: <Gem size={20} className="flex-shrink-0" /> },
          { href: "/dashboard/support", label: "Support", icon: <HeartHandshake size={20} className="flex-shrink-0" /> },
          { href: "/dashboard/logout", label: "Logout", icon: <LogOut size={20} className="flex-shrink-0" /> },
        ].map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-all"
            >
              <div className="w-6 flex-shrink-0">{item.icon}</div>
              <span
                className={clsx(
                  "ml-3 transition-all overflow-hidden",
                  isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                )}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

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
};
