"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Users, Settings, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@heroui/button";

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
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-neutral-300 p-5 flex flex-col relative`}
    >
      {/* Toggle Button */}
      <button
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
        className="bg-white p-2 rounded-md border border-neutral-300 absolute top-4 -right-3 z-10"
      >
        {isOpen ? (
          <ArrowLeft color="black" size={24} className="cursor-pointer" />
        ) : (
          <ArrowRight color="black" size={24} className="cursor-pointer" />
        )}
      </button>

      {/* Logo or Title */}
      <h2
        className={`text-2xl font-bold mb-8 transition-all duration-300 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* URL Shortener */}
      </h2>

      {/* Links */}
      <ul className="space-y-4 flex-1">
        <li className="flex items-center space-x-2">
          <Home size={20} className="transition-all duration-200" />
          <Link
            href="/dashboard"
            className="hover:text-blue-300 transition-all duration-200"
          >
            {isOpen ? "Dashboard" : ""}
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <Users size={20} className="transition-all duration-200" />
          <Link
            href="/users"
            className="hover:text-blue-300 transition-all duration-200"
          >
            {isOpen ? "Users" : ""}
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <Settings size={20} className="transition-all duration-200" />
          <Link
            href="/settings"
            className="hover:text-blue-300 transition-all duration-200"
          >
            {isOpen ? "Settings" : ""}
          </Link>
        </li>
      </ul>

      {/* Footer */}
      {isOpen && (
        <footer className="mt-8 text-sm text-gray-400">
          <p>Made with ♥️ by Tyrone Jose</p>
        </footer>
      )}
    </aside>
  );
};
