"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench } from "lucide-react";
import { categories, type TutorialCategory } from "@/data/tutorials";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 flex items-center justify-center rounded" style={{ background: "var(--secondary)", color: "var(--on-secondary)" }}>
              <Wrench className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold" style={{ color: "var(--on-surface)" }}>ToolkitX</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      {children}
    </div>
  );
}

// Category horizontal nav bar (shown on category and tutorial pages)
export function CategoryNav({ activeId }: { activeId?: string }) {
  return (
    <nav className="border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
      <div className="max-w-[1400px] mx-auto px-3 py-1.5 flex items-center gap-0.5 overflow-x-auto">
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/learn/${cat.id}`}
            className="flex items-center gap-1 px-1.5 py-1 text-[11px] font-medium rounded shrink-0 transition-colors"
            style={{
              color: activeId === cat.id ? "var(--on-secondary)" : "var(--on-surface-variant)",
              background: activeId === cat.id ? "var(--secondary)" : "transparent",
            }}
          >
            <span className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold shrink-0" style={{ background: activeId === cat.id ? "rgba(255,255,255,0.2)" : cat.color, color: activeId === cat.id ? "inherit" : "#fff" }}>
              {cat.icon}
            </span>
            {cat.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// Tutorial list sidebar (left column on category/tutorial pages)
export function TutorialSidebar({
  category,
  currentSlug,
}: {
  category: TutorialCategory;
  currentSlug?: string;
}) {
  return (
    <aside className="w-56 shrink-0 hidden lg:block">
      <div className="sticky top-4 rounded-lg border overflow-hidden" style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
        <div className="px-3 py-2.5 text-sm font-semibold border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-low)", color: "var(--on-surface)" }}>
          <span className="w-5 h-5 rounded inline-flex items-center justify-center text-[10px] font-bold mr-1.5" style={{ background: category.color, color: "#fff" }}>{category.icon}</span>
          {category.name}
        </div>
        <div className="py-1 max-h-[calc(100vh-120px)] overflow-y-auto">
          {category.tutorials.map(tutorial => (
            <Link
              key={tutorial.slug}
              href={`/learn/${category.id}/${tutorial.slug}`}
              className="flex items-center gap-2 px-3 py-2 text-[13px] transition-colors"
              style={{
                color: tutorial.slug === currentSlug ? "var(--secondary)" : "var(--on-surface-variant)",
                background: tutorial.slug === currentSlug ? "color-mix(in srgb, var(--secondary) 8%, transparent)" : "transparent",
                fontWeight: tutorial.slug === currentSlug ? 600 : 400,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tutorial.slug === currentSlug ? "var(--secondary)" : "var(--outline-variant)" }} />
              <span className="truncate">{tutorial.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
