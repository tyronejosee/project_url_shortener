"use client";

import Cookies from "js-cookie";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Avatar } from "@heroui/avatar";

export const Header = () => {
  const handleLogout = () => {
    Cookies.remove("access_token");
    window.location.reload();
  };

  return (
    <header className="z-30 bg-white/50 backdrop-blur-sm border-b border-neutral-300 p-4 flex justify-between items-center">
      <div className="ml-8 text-xl font-semibold">URL Shortener</div>
      <div className="flex items-center space-x-4">
        <Button onPress={handleLogout} color="primary">
          Log Out
        </Button>
        <Badge color="danger" content="5" shape="circle">
          <Avatar
            isBordered
            radius="full"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
        </Badge>
      </div>
    </header>
  );
};
