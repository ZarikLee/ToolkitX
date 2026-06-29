"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { categories, type TutorialCategory } from "@/data/tutorials";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-[var(--outline-variant)]" style={{ background: "color-mix(in srgb, var(--background) 80%, transparent)" }}>
        <div className="flex justify-between items-center w-full px-6 h-16 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-[24px] font-bold tracking-tighter" style={{ color: "var(--secondary)" }}>
              ToolkitX
            </Link>
            <div className="hidden md:flex gap-6 items-center">
              <Link
                href="/learn"
                className={`font-['Geist'] text-[12px] font-medium border-b-2 pb-1 transition-colors tracking-[0.05em] ${
                  pathname === "/learn"
                    ? "border-[var(--secondary)]"
                    : "border-transparent hover:text-[var(--on-surface)]"
                }`}
                style={{ color: pathname === "/learn" ? "var(--secondary)" : "var(--on-surface-variant)" }}
              >
                文库
              </Link>
              <Link
                href="/tools"
                className="font-['Geist'] text-[12px] tracking-[0.05em] transition-colors hover:text-[var(--on-surface)]"
                style={{ color: "var(--on-surface-variant)" }}
              >
                工具箱
              </Link>
              <Link
                href="/"
                className="font-['Geist'] text-[12px] tracking-[0.05em] transition-colors hover:text-[var(--on-surface)]"
                style={{ color: "var(--on-surface-variant)" }}
              >
                首页
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--outline-variant)] transition-all focus-within:border-[var(--secondary)]" style={{ background: "var(--surface-container-low)" }}>
              <Search className="h-4 w-4" style={{ color: "var(--on-surface-variant)" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索教程..."
                className="bg-transparent border-none text-[12px] w-48 outline-none font-['Geist']"
                style={{ color: "var(--on-surface)" }}
                onKeyDown={e => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/learn?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded border border-[var(--outline-variant)] font-['Geist']" style={{ color: "var(--outline)", background: "var(--surface-container)" }}>
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-16 bottom-0 w-72 border-r border-[var(--outline-variant)] p-6 overflow-y-auto" style={{ background: "var(--surface-container-lowest)" }}>
            <div className="space-y-1">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/learn/${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-[13px] transition-all rounded ${
                    pathname.startsWith(`/learn/${cat.id}`)
                      ? "font-semibold"
                      : "hover:bg-[var(--surface-container-high)]"
                  }`}
                  style={{
                    color: pathname.startsWith(`/learn/${cat.id}`) ? "var(--secondary)" : "var(--on-surface-variant)",
                  }}
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="mt-[80px] border-t border-[var(--outline-variant)]" style={{ background: "var(--background)" }}>
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-8 max-w-[1440px] mx-auto gap-8">
          <div className="mb-4 md:mb-0">
            <span className="font-['Geist'] text-[14px] font-bold" style={{ color: "var(--secondary)" }}>
              ToolkitX
            </span>
          </div>
          <div className="flex gap-8">
            <Link href="/learn" className="hover:text-[var(--secondary)] font-['Geist'] text-[12px] tracking-[0.05em] transition-colors" style={{ color: "var(--outline)" }}>文库</Link>
            <Link href="/tools" className="hover:text-[var(--secondary)] font-['Geist'] text-[12px] tracking-[0.05em] transition-colors" style={{ color: "var(--outline)" }}>工具箱</Link>
            <Link href="/" className="hover:text-[var(--secondary)] font-['Geist'] text-[12px] tracking-[0.05em] transition-colors" style={{ color: "var(--outline)" }}>首页</Link>
          </div>
          <div className="text-[10px] font-['Geist'] tracking-[0.05em]" style={{ color: "var(--outline)" }}>
            &copy; 2026 ToolkitX
          </div>
        </div>
      </footer>
    </div>
  );
}

// Left Sidebar for tutorial pages
export function TutorialSidebar({
  category,
  currentSlug,
}: {
  category: TutorialCategory;
  currentSlug?: string;
}) {
  return (
    <aside className="h-[calc(100vh-64px)] w-72 sticky top-16 hidden lg:flex flex-col border-r border-[var(--outline-variant)] py-8 overflow-y-auto shrink-0" style={{ background: "var(--surface-container-lowest)" }}>
      <div className="px-6 mb-8">
        <Link href={`/learn/${category.id}`} className="flex items-center gap-3 mb-2 group">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[var(--outline-variant)]" style={{ background: "var(--surface-container)" }}>
            <span className="text-[18px]">{category.icon}</span>
          </div>
          <div>
            <p className="text-[14px] font-semibold transition-all" style={{ color: "var(--secondary)" }}>{category.name}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-['Geist']" style={{ color: "var(--outline)" }}>
              {category.tutorials.length} 个模块
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-1 space-y-0">
        {category.tutorials.map((tutorial) => (
          <Link
            key={tutorial.slug}
            href={`/learn/${category.id}/${tutorial.slug}`}
            className={`flex items-center justify-between gap-3 py-3 px-6 transition-all ${
              tutorial.slug === currentSlug
                ? "border-l-4"
                : "border-l-4 border-transparent hover:bg-[var(--surface-container-high)]"
            }`}
            style={{
              color: tutorial.slug === currentSlug ? "var(--secondary)" : "var(--on-surface-variant)",
              borderLeftColor: tutorial.slug === currentSlug ? "var(--secondary)" : "transparent",
              background: tutorial.slug === currentSlug ? "color-mix(in srgb, var(--secondary) 10%, transparent)" : undefined,
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                {tutorial.slug === currentSlug ? (
                  <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" />
                ) : (
                  <path d="M20 6L9 17l-5-5" />
                )}
              </svg>
              <span className="text-[13px] truncate font-['Geist']">{tutorial.title}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-6 mt-auto py-4 border-t border-[var(--outline-variant)]">
        <Link
          href={`/learn/${category.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 border border-[var(--outline-variant)] font-['Geist'] text-[12px] tracking-[0.05em] hover:bg-[var(--surface-container-high)] transition-all rounded"
          style={{ color: "var(--secondary)" }}
        >
          返回目录
        </Link>
      </div>
    </aside>
  );
}

// Right Sidebar with quick links
export function RightSidebar() {
  return (
    <aside className="w-64 h-[calc(100vh-64px)] sticky top-16 hidden xl:block border-l border-[var(--outline-variant)] p-6 shrink-0" style={{ background: "var(--surface-container-lowest)" }}>
      <h5 className="font-['Geist'] text-[11px] mb-6 tracking-[0.1em] uppercase" style={{ color: "var(--outline)" }}>
        快速导航
      </h5>

      <div className="space-y-6">
        {/* Quick Links */}
        <div>
          <h6 className="font-['Geist'] text-[11px] mb-3 uppercase tracking-[0.15em]" style={{ color: "var(--secondary)" }}>
            在线工具
          </h6>
          <div className="space-y-2">
            {[
              { name: "JSON 格式化", href: "/tools?tool=json" },
              { name: "Base64 编解码", href: "/tools?tool=encoding" },
              { name: "正则表达式测试", href: "/tools?tool=regex" },
              { name: "时间戳转换", href: "/tools?tool=timestamp" },
              { name: "密码生成器", href: "/tools?tool=password" },
              { name: "QR 码生成", href: "/tools?tool=qr" },
            ].map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block text-[12px] hover:text-[var(--secondary)] transition-colors font-['Geist']"
                style={{ color: "var(--on-surface-variant)" }}
              >
                · {tool.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Reference Links */}
        <div>
          <h6 className="font-['Geist'] text-[11px] mb-3 uppercase tracking-[0.15em]" style={{ color: "var(--secondary)" }}>
            常用参考
          </h6>
          <div className="space-y-2">
            {[
              { name: "Linux 命令大全", href: "/learn/linux" },
              { name: "SQL 语法速查", href: "/learn/sql" },
              { name: "Docker 命令参考", href: "/learn/docker" },
              { name: "Git 常用命令", href: "/learn/git" },
              { name: "Nginx 配置参考", href: "/learn/nginx" },
            ].map(ref => (
              <Link
                key={ref.href}
                href={ref.href}
                className="block text-[12px] hover:text-[var(--secondary)] transition-colors font-['Geist']"
                style={{ color: "var(--on-surface-variant)" }}
              >
                · {ref.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="p-4 rounded-lg border border-[var(--outline-variant)]" style={{ background: "var(--surface-container-high)" }}>
          <h6 className="font-['Geist'] text-[11px] mb-3 flex items-center gap-2 uppercase tracking-[0.1em]" style={{ color: "var(--secondary)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
            状态
          </h6>
          <ul className="text-[10px] font-['Geist'] space-y-2" style={{ color: "var(--outline)" }}>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--green)" }}>[OK]</span>
              <span>教程已同步</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--green)" }}>[OK]</span>
              <span>188+ 个教程就绪</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--secondary)" }}>[..]</span>
              <span>在线模式激活</span>
            </li>
          </ul>
        </div>

        <div className="text-[10px] font-['Geist'] space-y-1" style={{ color: "var(--outline)" }}>
          <p>技术支持 ToolkitX</p>
          <p>&copy; 2026 ToolkitX</p>
        </div>
      </div>
    </aside>
  );
}
