"use client";

import { Button } from "@heroui/react";

interface Props {
  children: React.ReactNode;
  onPress?: () => Promise<void>;
}

export default function SocialButton({ children, onPress }: Props) {
  return (
    <Button size="lg" variant="bordered" onPress={onPress}>
      <span className="flex justify-start items-center">{children}</span>
    </Button>
  );
}
