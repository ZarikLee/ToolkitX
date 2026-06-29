"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Wrench } from "lucide-react";
import { categories, type TutorialCategory } from "@/data/tutorials";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 flex items-center justify-center rounded" style={{ background: "var(--secondary)", color: "var(--on-secondary)" }}>
              <Wrench className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold" style={{ color: "var(--on-surface)" }}>ToolkitX</span>
          </Link>
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 px-3 py-2 rounded border" style={{ background: "var(--surface-container-low)", borderColor: "var(--outline-variant)" }}>
              <Search className="w-4 h-4 shrink-0" style={{ color: "var(--outline)" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索教程..."
                className="bg-transparent border-none outline-none w-full text-sm"
                style={{ color: "var(--on-surface)" }}
                onKeyDown={e => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/learn?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
        <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-1 overflow-x-auto">
          <Link href="/" className="px-3 py-2.5 text-sm font-medium shrink-0 border-b-2 border-transparent hover:opacity-80" style={{ color: "var(--on-surface-variant)" }}>
            首页
          </Link>
          <Link href="/learn" className="px-3 py-2.5 text-sm font-medium shrink-0 border-b-2" style={{ color: "var(--secondary)", borderColor: "var(--secondary)" }}>
            教程
          </Link>
          <Link href="/tools" className="px-3 py-2.5 text-sm font-medium shrink-0 border-b-2 border-transparent hover:opacity-80" style={{ color: "var(--on-surface-variant)" }}>
            工具箱
          </Link>
          <Link href="/terminal" className="px-3 py-2.5 text-sm font-medium shrink-0 border-b-2 border-transparent hover:opacity-80" style={{ color: "var(--on-surface-variant)" }}>
            终端
          </Link>
          <Link href="/monitor" className="px-3 py-2.5 text-sm font-medium shrink-0 border-b-2 border-transparent hover:opacity-80" style={{ color: "var(--on-surface-variant)" }}>
            监控
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex gap-4">
        {/* Left Sidebar */}
        <aside className="w-44 shrink-0 hidden lg:block">
          <div className="sticky top-4 rounded-lg border overflow-hidden" style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
            <div className="px-3 py-2.5 text-sm font-semibold border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-low)", color: "var(--on-surface)" }}>
              全部教程
            </div>
            <div className="py-1">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/learn/${cat.id}`}
                  className="flex items-center gap-2 px-3 py-2 text-[13px] transition-colors border-l-3 border-transparent"
                  style={{
                    color: pathname.startsWith(`/learn/${cat.id}`) ? "var(--secondary)" : "var(--on-surface-variant)",
                    background: pathname.startsWith(`/learn/${cat.id}`) ? "color-mix(in srgb, var(--secondary) 8%, transparent)" : "transparent",
                    borderLeftColor: pathname.startsWith(`/learn/${cat.id}`) ? "var(--secondary)" : "transparent",
                    fontWeight: pathname.startsWith(`/learn/${cat.id}`) ? 600 : 400,
                  }}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t mt-8" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
        <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: "var(--outline)" }}>
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: "var(--secondary)" }}>ToolkitX</span>
            <span>·</span>
            <span>技术知识库 & 运维工具箱</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/learn" className="hover:opacity-80">教程</Link>
            <Link href="/tools" className="hover:opacity-80">工具</Link>
            <Link href="/terminal" className="hover:opacity-80">终端</Link>
          </div>
          <div>&copy; 2026 ToolkitX</div>
        </div>
      </footer>
    </div>
  );
}

// Left Sidebar for tutorial detail pages
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
        <Link href={`/learn/${category.id}`} className="flex items-center gap-2 px-3 py-2.5 border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-low)" }}>
          <span className="text-base">{category.icon}</span>
          <span className="text-sm font-semibold" style={{ color: "var(--on-surface)" }}>{category.name}</span>
        </Link>
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
        <div className="px-3 py-2 border-t" style={{ borderColor: "var(--outline-variant)" }}>
          <Link href={`/learn/${category.id}`} className="text-[12px] hover:opacity-80" style={{ color: "var(--secondary)" }}>
            返回目录 →
          </Link>
        </div>
      </div>
    </aside>
  );
}
