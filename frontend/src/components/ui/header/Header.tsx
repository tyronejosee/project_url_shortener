"use client";

import { Badge } from "@heroui/badge";
import { Avatar } from "@heroui/avatar";

export const Header = () => {
  return (
    <header className="z-30 bg-white/50 backdrop-blur-sm border-b border-neutral-300 p-4 flex justify-between items-center">
      <div className="ml-8 text-xl font-semibold">URL Shortener</div>
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-gray-200 rounded-full">Settings</button>
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
