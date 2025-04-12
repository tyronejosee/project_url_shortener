"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { Logo } from "@/components/icons";

export default function Navigation() {
  const { data: session } = useSession();

  const pathname = usePathname();
  const ignoredRoutes = ["/dashboard", "/auth/google", "/auth/facebook"];
  const isIgnoredRoute = ignoredRoutes.some((route) =>
    pathname.startsWith(route),
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
        <NavbarItem className="hidden lg:flex">
          <Link href="/prices">Prices</Link>
        </NavbarItem>

        {session?.user ? (
          <>
            <NavbarItem className="hidden lg:flex">
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
            <NavbarItem className="hidden lg:flex">
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
