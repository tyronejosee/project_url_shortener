"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { UserRound } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <HeroUIProvider>
      <ToastProvider
        toastProps={{
          radius: "lg",
          variant: "bordered",
          timeout: 5000,
          classNames: {
            base: "absolute z-[9999] w-72 h-20 bottom-6 right-6",
          },
          icon: <UserRound />
        }}
        maxVisibleToasts={4}
      />
      {children}
    </HeroUIProvider>
  );
}
