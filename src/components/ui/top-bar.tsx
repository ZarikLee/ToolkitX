"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { UserMenu } from "./user-menu";

export function TopBar() {
  const pathname = usePathname();
  if (pathname === "/login") return null;

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-8 z-50 flex items-center gap-2">
      <ThemeToggle />
      <UserMenu />
    </div>
  );
}
