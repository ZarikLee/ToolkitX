"use client";

import { useTheme } from "@/components/layout/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-8 h-8 rounded-md text-[var(--outline)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container-high)] transition-all duration-200"
      title="切换主题"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">切换主题</span>
    </button>
  );
}
