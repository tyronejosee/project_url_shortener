"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/icons";
import { useUser } from "@/hooks/use-user";

export default function Navigation() {
  const { user } = useUser();

  const pathname = usePathname();
  const ignoredRoutes = ["/dashboard", "/auth/google", "/auth/facebook"];
  const isIgnoredRoute = ignoredRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isIgnoredRoute) return null;

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href={"/"}>
          <Logo size="size-8" />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/plans">Plans</Link>
        </NavbarItem>

        {user ? (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/dashboard"
                variant="solid"
              >
                Dashboard
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="/auth/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/register"
                variant="solid"
              >
                Register
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
