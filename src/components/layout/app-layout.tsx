"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/sidebar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { incrementVisitCount } from "@/lib/visit-counter";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [visits] = useState(() => incrementVisitCount());

  return (
    <div className="flex min-h-screen bg-background flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center justify-between border-b border-white/15 px-6">
            <Link href="/?mode=tools" className="text-sm font-bold" style={{ color: "var(--secondary)" }}>← 工具箱</Link>
            <ThemeToggle />
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </div>
      <footer className="border-t sticky bottom-0 z-10" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
        <div className="px-6 py-1.5 flex items-center justify-between text-xs" style={{ color: "var(--outline)" }}>
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: "var(--secondary)" }}>ToolkitX</span>
            <span>·</span>
            <span>访问量：{visits}</span>
          </div>
          <span>&copy; 2026 ToolkitX</span>
        </div>
      </footer>
    </div>
  );
}
