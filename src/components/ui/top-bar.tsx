"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { UserMenu } from "./user-menu";

export function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (!isHome) return null;

  return (
    <div className="fixed top-14 right-8 z-50 flex items-center gap-2">
      <ThemeToggle />
      <UserMenu />
    </div>
  );
}
