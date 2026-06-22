"use client";

import Link from "next/link";
import { InlineHelp } from "@/components/ui/inline-help";

interface HelpSection {
  title: string;
  items: string[];
}

interface SubPageLayoutProps {
  title: string;
  subtitle?: string;
  helpContent?: HelpSection[];
  tabs?: React.ReactNode;
  children: React.ReactNode;
}

export function SubPageLayout({
  title,
  subtitle,
  helpContent,
  tabs,
  children,
}: SubPageLayoutProps) {
  return (
    <main className="flex-1 min-h-0 relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 md:px-8 md:py-8 h-full overflow-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2 animate-fade-in">
          <Link
            href="/"
            className="btn-close"
            title="返回首页"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 12L6 8l4-4" />
            </svg>
          </Link>
          <h1 className="text-[22px] font-bold tracking-tight">{title}</h1>
          {helpContent && <InlineHelp content={helpContent} />}
        </div>
        {subtitle && (
          <p className="text-muted-foreground text-[13px] mb-8 animate-fade-in">
            {subtitle}
          </p>
        )}

        {/* Tabs */}
        {tabs && (
          <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-6 w-fit animate-fade-in">
            {tabs}
          </div>
        )}

        {/* Content */}
        <div className="animate-fade-in">{children}</div>
      </div>
    </main>
  );
}
