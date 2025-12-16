"use client";

import clsx from "clsx";
import {
  ChartNoAxesColumn,
  Folder,
  Gem,
  Globe,
  HeartHandshake,
  Link as Link2,
  MousePointer2,
  Scissors,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useUser } from "@/hooks/use-user";

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
    href: "/dashboard/urls",
    label: "Urls",
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
    restrictedPlans: ["Premium Plan"],
  },
  {
    href: "/dashboard/groups",
    label: "Groups",
    icon: <Folder size={20} className="flex-shrink-0" />,
    restrictedPlans: ["Basic Plan", "Premium Plan"],
  },
  {
    href: "/dashboard/plans",
    label: "Plans",
    icon: <Gem size={20} className="flex-shrink-0" />,
    restrictedPlans: ["Premium Plan"],
  },
  {
    href: "/dashboard/support",
    label: "Support",
    icon: <HeartHandshake size={20} className="flex-shrink-0" />,
  },
];

export default function SidebarList({ isOpen }: Props) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <ul className="flex-1 mt-4 space-y-2">
      {sidebarItems.map((item, index) => {
        const isPlanAllowed = item.restrictedPlans
          ? item.restrictedPlans.includes(user?.plan || "")
          : true;

        const isActive = pathname === item.href;

        return (
          <li key={index}>
            <Link
              href={item.href}
              className={clsx(
                "flex items-center p-2 rounded-xl relative",
                isActive ? "bg-primary text-white" : "hover:bg-gray-100",
                !isPlanAllowed && "text-gray-500 cursor-not-allowed",
                !isPlanAllowed && "pointer-events-none"
              )}
            >
              <div className="w-6">{item.icon}</div>
              <span
                className={clsx(
                  "overflow-hidden",
                  isOpen ? "ml-2 opacity-100 w-auto" : "opacity-0 w-0"
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
