"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { categories, type TutorialCategory } from "@/data/tutorials";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function LearnLayout({ children, category }: { children: React.ReactNode; category?: TutorialCategory }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Header - fixed height */}
      <header className="border-b h-14 flex items-center" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between gap-4 w-full">
          <Link href="/" className="shrink-0">
            <span className="text-xl font-bold" style={{ color: "var(--on-surface)" }}>ToolkitX</span>
          </Link>
          {category && <HeaderSearch activeCategory={category} />}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      {children}
    </div>
  );
}

// Search bar component (shown on category/tutorial pages)
export function HeaderSearch({ activeCategory }: { activeCategory?: TutorialCategory }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentResults = useMemo(() => {
    if (!query || !activeCategory) return [];
    const q = query.toLowerCase();
    return activeCategory.tutorials.filter(t =>
      t.title.toLowerCase().includes(q) || t.tags.some(tg => tg.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [query, activeCategory]);

  const allResults = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    const results: Array<{ cat: TutorialCategory; slug: string; title: string }> = [];
    for (const cat of categories) {
      for (const t of cat.tutorials) {
        if (t.title.toLowerCase().includes(q) || t.tags.some(tg => tg.toLowerCase().includes(q))) {
          results.push({ cat, slug: t.slug, title: t.title });
          if (results.length >= 5) break;
        }
      }
      if (results.length >= 5) break;
    }
    return results;
  }, [query]);

  return (
    <div ref={ref} className="relative flex-1 max-w-md">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded border" style={{ background: "var(--surface-container-low)", borderColor: "var(--outline-variant)" }}>
        <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--outline)" }} />
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="搜索教程..."
          className="bg-transparent border-none outline-none w-full text-sm"
          style={{ color: "var(--on-surface)" }}
        />
      </div>
      {open && query.length >= 2 && (
        <div className="absolute top-full mt-1 left-0 right-0 rounded-lg border shadow-lg z-50 max-h-80 overflow-y-auto" style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
          {activeCategory && currentResults.length > 0 && (
            <>
              <div className="px-3 py-1.5 text-xs font-semibold" style={{ color: "var(--secondary)", background: "color-mix(in srgb, var(--secondary) 8%, transparent)" }}>
                {activeCategory.icon} {activeCategory.name} · 本技术
              </div>
              {currentResults.map(t => (
                <button
                  key={t.slug}
                  onClick={() => { router.push(`/learn/${activeCategory.id}/${t.slug}`); setOpen(false); setQuery(""); }}
                  className="w-full text-left px-3 py-2 text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--on-surface)" }}
                >
                  {t.title}
                  <span className="ml-2 text-xs" style={{ color: "var(--outline)" }}>{t.description.slice(0, 30)}...</span>
                </button>
              ))}
            </>
          )}
          {allResults.length > 0 && (
            <>
              <div className="px-3 py-1.5 text-xs font-semibold" style={{ color: "var(--outline)", background: "var(--surface-container-low)" }}>
                全部技术搜索结果
              </div>
              {allResults.map(r => (
                <button
                  key={r.cat.id + r.slug}
                  onClick={() => { router.push(`/learn/${r.cat.id}/${r.slug}`); setOpen(false); setQuery(""); }}
                  className="w-full text-left px-3 py-2 text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--on-surface)" }}
                >
                  <span className="w-4 h-4 rounded inline-flex items-center justify-center text-[8px] font-bold mr-1.5" style={{ background: r.cat.color, color: "#fff" }}>{r.cat.icon}</span>
                  {r.title}
                  <span className="ml-2 text-xs" style={{ color: "var(--outline)" }}>{r.cat.name}</span>
                </button>
              ))}
            </>
          )}
          {currentResults.length === 0 && allResults.length === 0 && (
            <div className="px-3 py-3 text-sm text-center" style={{ color: "var(--outline)" }}>没有找到相关教程</div>
          )}
        </div>
      )}
    </div>
  );
}

// Category horizontal nav bar (shown on category and tutorial pages)
export function CategoryNav({ activeId }: { activeId?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeId || !containerRef.current) return;
    const el = containerRef.current.querySelector(`[data-cat="${activeId}"]`) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center" });
    }
  }, [activeId]);

  return (
    <nav className="border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
      <div ref={containerRef} className="max-w-[1400px] mx-auto px-3 py-1.5 flex items-center gap-0.5 overflow-x-auto">
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/learn/${cat.id}`}
            data-cat={cat.id}
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
