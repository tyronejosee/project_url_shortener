"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@heroui/react";
import { usePathname } from "next/navigation";

import useLogout from "@/hooks/use-logout";
import { useUser } from "@/hooks/use-user";
import { getFirstLetter } from "@/lib/utils";

export default function Header() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop();

  const { handleLogout } = useLogout();

  return (
    <header className="z-10 bg-white/50 backdrop-blur-sm border-b-2 border-neutral-200 p-4 flex justify-between items-center">
      <div className="ml-8 text-3xl font-bold">
        {lastSegment
          ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
          : "Home"}
      </div>
      {isLoading ? (
        <Skeleton className="rounded-xl w-32 h-12" />
      ) : (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" size="lg" className="px-4">
              <div className="text-xs flex flex-col text-right">
                <span className="text-primary font-semibold">
                  {user?.username}
                </span>
                <span>{user?.plan}</span>
              </div>
              <Avatar
                size="sm"
                radius="full"
                name={getFirstLetter(user?.username || "User")}
                className="bg-primary text-white text-xl"
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Example with disabled actions"
            // disabledKeys={["logout",]}
          >
            <DropdownItem key="logout" onPress={handleLogout}>
              Log out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </header>
  );
}
