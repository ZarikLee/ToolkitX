"use client";

import { cn } from "@/lib/utils";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function TabButton({ active, onClick, children, icon }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200",
        active
          ? "bg-white/[0.1] text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
          : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
      )}
    >
      {icon}
      {children}
    </button>
  );
}
