"use client";

import { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Skeleton,
  Avatar,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import useLogout from "@/hooks/use-logout";
import { getFirstLetter } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop();

  const { handleLogout } = useLogout();
  const isLoading = status === "loading";

  useEffect(() => {
    update();
  }, []);

  return (
    <header className="z-10 bg-white/50 backdrop-blur-sm border-b border-neutral-300 p-4 flex justify-between items-center">
      <div className="ml-8 text-3xl font-bold">
        {lastSegment
          ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
          : "Home"}
      </div>
      {isLoading ? (
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4">
            <div className="flex flex-col gap-1 justify-center">
              <Skeleton className="flex rounded-full w-36 h-4" />
              <Skeleton className="flex rounded-full w-36 h-4" />
            </div>
            <Button onPress={handleLogout}>Log out</Button>
            <Skeleton className="flex rounded-full w-10 h-10" />
          </div>
        </div>
      ) : (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" size="lg" className="px-4">
              <div className="text-xs flex flex-col text-right">
                <span className="text-primary font-semibold">
                  {session?.user?.username}
                </span>
                <span>{session?.user?.plan}</span>
              </div>
              <Avatar
                size="sm"
                radius="full"
                name={getFirstLetter(session?.user?.username || "User")}
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
