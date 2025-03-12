"use client";

import { Button, Skeleton, Avatar } from "@heroui/react";
import useLogout from "@/hooks/use-logout";
import useAuthStore from "@/store/auth";
import { getFirstLetter } from "@/utils/getFirstLetter";

export default function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const { handleLogout } = useLogout();

  return (
    <header className="z-30 bg-white/50 backdrop-blur-sm border-b border-neutral-300 p-4 flex justify-between items-center">
      <div className="ml-8 text-xl font-semibold">URL Shortener</div>
      {user && isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <Button onPress={handleLogout} color="primary">
            Log Out
          </Button>
          <div className="flex text-sm space-x-4">
            <div className="flex flex-col text-right">
              <span>@{user.username}</span>
              <span>{user.plan}</span>
            </div>
            <Avatar
              isBordered
              radius="full"
              name={getFirstLetter(user.username)}
              className="bg-primary text-white text-xl"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4">
            <div className="flex flex-col gap-1 justify-center">
            <Skeleton className="flex rounded-full w-36 h-4" />
            <Skeleton className="flex rounded-full w-36 h-4" />
            </div>
            <Skeleton className="flex rounded-full w-10 h-10" />
          </div>
        </div>
      )}
    </header>
  );
};
