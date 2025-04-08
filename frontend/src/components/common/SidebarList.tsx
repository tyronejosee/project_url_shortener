"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  ChartNoAxesColumn,
  Scissors,
  Link as Link2,
  Globe,
  Folder,
  Gem,
  HeartHandshake,
  LogOut,
  MousePointer2,
} from "lucide-react";

type Props = {
  isOpen: boolean;
};

const sidebarItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <ChartNoAxesColumn size={20} className="flex-shrink-0" />,
  },
  {
    href: "/dashboard/cutter",
    label: "Cutter",
    icon: <Scissors size={20} className="flex-shrink-0" />,
  },
  {
    href: "/dashboard/links",
    label: "Links",
    icon: <Link2 size={20} className="flex-shrink-0" />,
  },
  {
    href: "/dashboard/clicks",
    label: "Clicks",
    icon: <MousePointer2 size={20} className="flex-shrink-0" />,
  },
  {
    href: "/dashboard/domains",
    label: "Domains",
    icon: <Globe size={20} className="flex-shrink-0" />,
  },
  {
    href: "/dashboard/groups",
    label: "Groups",
    icon: <Folder size={20} className="flex-shrink-0" />,
  },
  {
    href: "/dashboard/prices",
    label: "Prices",
    icon: <Gem size={20} className="flex-shrink-0" />,
  },
  {
    href: "/dashboard/support",
    label: "Support",
    icon: <HeartHandshake size={20} className="flex-shrink-0" />,
  },
  {
    href: "/dashboard/logout",
    label: "Logout",
    icon: <LogOut size={20} className="flex-shrink-0" />,
  },
];

export default function SidebarList({ isOpen }: Props) {
  const pathname = usePathname();

  return (
    <ul className="flex-1 mt-4 space-y-2">
      {sidebarItems.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <li key={index}>
            <Link
              href={item.href}
              className={clsx(
                "flex items-center p-2 rounded-xl relative",
                isActive ? "bg-primary text-white" : "hover:bg-gray-100",
              )}
            >
              <div className="w-6 flex-shrink-0">{item.icon}</div>
              <span
                className={clsx(
                  "ml-3 overflow-hidden",
                  isOpen ? "opacity-100 w-auto" : "opacity-0 w-0",
                )}
              >
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
