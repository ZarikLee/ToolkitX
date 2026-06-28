"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { categories, type TutorialCategory } from "@/data/tutorials";
import "@/app/learn/neon.css";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="learn-neon">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-[var(--outline-variant)]" style={{ background: "var(--surface-glass)", boxShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
        <div className="flex justify-between items-center w-full px-6 h-16 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/learn" className="text-[32px] font-black tracking-tighter neon-text-glow" style={{ color: "var(--neon-primary)", textShadow: "0 0 8px rgba(0,240,255,0.6)" }}>
              NEON_LABS
            </Link>
            <div className="hidden md:flex gap-6 items-center">
              <Link
                href="/learn"
                className={`font-['JetBrains_Mono'] text-[14px] font-bold border-b-2 pb-1 transition-colors ${
                  pathname === "/learn"
                    ? "text-[var(--neon-primary)] border-[var(--neon-primary)]"
                    : "text-[var(--on-surface-variant)] hover:text-[var(--neon-primary)] border-transparent"
                }`}
                style={{ letterSpacing: "0.05em" }}
              >
                文库
              </Link>
              <Link
                href="/tools"
                className="font-['JetBrains_Mono'] text-[14px] text-[var(--on-surface-variant)] hover:text-[var(--neon-primary)] transition-colors"
                style={{ letterSpacing: "0.05em" }}
              >
                模拟
              </Link>
              <Link
                href="/tools"
                className="font-['JetBrains_Mono'] text-[14px] text-[var(--on-surface-variant)] hover:text-[var(--neon-primary)] transition-colors"
                style={{ letterSpacing: "0.05em" }}
              >
                工具箱
              </Link>
              <Link
                href="/tools"
                className="font-['JetBrains_Mono'] text-[14px] text-[var(--on-surface-variant)] hover:text-[var(--neon-primary)] transition-colors"
                style={{ letterSpacing: "0.05em" }}
              >
                社区
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--outline-variant)] search-glow transition-all focus-within:border-[var(--neon-primary)]" style={{ background: "var(--surface-container-low)" }}>
              <Search className="h-4 w-4 text-[var(--on-surface-variant)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索协议..."
                className="bg-transparent border-none text-[14px] w-48 outline-none placeholder:text-[var(--text-muted)]"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--neon-primary)" }}
                onKeyDown={e => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/learn?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded text-[var(--text-muted)] border border-[var(--outline-variant)]" style={{ fontFamily: "'JetBrains Mono', monospace", background: "rgba(59,73,75,0.3)" }}>
                ⌘K
              </kbd>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-[var(--on-surface-variant)] hover:bg-[rgba(57,56,62,0.2)] rounded-lg transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </button>
              <button className="p-2 text-[var(--on-surface-variant)] hover:bg-[rgba(57,56,62,0.2)] rounded-lg transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-16 bottom-0 w-72 bg-[var(--terminal-black)] border-r border-[var(--outline-variant)] p-6 overflow-y-auto">
            <div className="space-y-1">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/learn/${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 font-['JetBrains_Mono'] text-[14px] transition-all ${
                    pathname.startsWith(`/learn/${cat.id}`)
                      ? "sidebar-active text-[var(--neon-primary)]"
                      : "text-[var(--on-surface-variant)] hover:bg-[rgba(53,52,58,0.5)]"
                  }`}
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
      <footer className="neon-footer mt-[80px]">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-8 max-w-[1440px] mx-auto gap-8">
          <div className="mb-4 md:mb-0">
            <span className="font-['JetBrains_Mono'] text-[var(--neon-primary)] text-[14px] font-bold">
              NEON_LABS // 未发现关机序列
            </span>
          </div>
          <div className="flex gap-8">
            <Link href="/learn" className="text-[var(--text-muted)] hover:text-[var(--neon-tertiary)] font-['JetBrains_Mono'] text-[14px] transition-colors">文库</Link>
            <Link href="/tools" className="text-[var(--text-muted)] hover:text-[var(--neon-tertiary)] font-['JetBrains_Mono'] text-[14px] transition-colors">工具箱</Link>
            <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--neon-tertiary)] font-['JetBrains_Mono'] text-[14px] transition-colors">首页</Link>
          </div>
          <div className="text-[10px] text-[var(--text-muted)] font-['JetBrains_Mono']">
            © 2026 NEON_LABS
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
    <aside className="h-[calc(100vh-64px)] w-72 sticky top-16 hidden lg:flex flex-col bg-[var(--terminal-black)] border-r border-[var(--outline-variant)] py-8 overflow-y-auto shrink-0">
      <div className="px-6 mb-8">
        <Link href={`/learn/${category.id}`} className="flex items-center gap-3 mb-2 group">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[rgba(0,240,255,0.3)]" style={{ background: "var(--surface-container)" }}>
            <span className="text-[18px]">{category.icon}</span>
          </div>
          <div>
            <p className="font-['JetBrains_Mono'] text-[14px] text-[var(--neon-primary)] group-hover:neon-text-glow transition-all">{category.name}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {category.tutorials.length} 个模块
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-1 space-y-0">
        {category.tutorials.map((tutorial, i) => (
          <Link
            key={tutorial.slug}
            href={`/learn/${category.id}/${tutorial.slug}`}
            className={`flex items-center justify-between gap-3 py-3 px-6 transition-all ${
              tutorial.slug === currentSlug
                ? "sidebar-active bg-[rgba(0,240,255,0.1)] text-[var(--neon-primary)]"
                : "text-[var(--on-surface-variant)] hover:bg-[rgba(53,52,58,0.5)] border-l-4 border-transparent"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                {tutorial.slug === currentSlug ? (
                  <circle cx="12" cy="12" r="10" className="text-[var(--neon-primary)]" fill="currentColor" fillOpacity="0.2" />
                ) : (
                  <path d="M20 6L9 17l-5-5" />
                )}
              </svg>
              <span className="font-['JetBrains_Mono'] text-[14px] truncate">{tutorial.title}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-6 mt-auto py-4 border-t border-[rgba(59,73,75,0.3)]">
        <Link
          href={`/learn/${category.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 border border-[var(--outline-variant)] text-[var(--neon-primary)] font-['JetBrains_Mono'] text-[14px] hover:bg-[rgba(0,240,255,0.1)] transition-all rounded-lg"
        >
          返回目录
        </Link>
      </div>
    </aside>
  );
}

// Right Sidebar with telemetry
export function RightSidebar() {
  return (
    <aside className="w-64 h-[calc(100vh-64px)] sticky top-16 hidden xl:block border-l border-[var(--outline-variant)] p-6 shrink-0" style={{ background: "rgba(14,14,19,0.3)" }}>
      <h5 className="font-['JetBrains_Mono'] text-[12px] text-[var(--text-muted)] mb-6 tracking-tighter">
        模拟遥测 (TELEMETRY)
      </h5>

      <div className="space-y-6">
        {/* Quick Links */}
        <div>
          <h6 className="font-['JetBrains_Mono'] text-[11px] text-[var(--neon-primary)] mb-3 uppercase tracking-[0.15em]">
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
                className="block text-[12px] text-[var(--on-surface-variant)] hover:text-[var(--neon-primary)] transition-colors font-['JetBrains_Mono']"
              >
                · {tool.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Reference Links */}
        <div>
          <h6 className="font-['JetBrains_Mono'] text-[11px] text-[var(--neon-primary)] mb-3 uppercase tracking-[0.15em]">
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
                className="block text-[12px] text-[var(--on-surface-variant)] hover:text-[var(--neon-primary)] transition-colors font-['JetBrains_Mono']"
              >
                · {ref.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Latest */}
        <div className="p-4 rounded-lg border border-[var(--outline-variant)]" style={{ background: "var(--surface-container-high)" }}>
          <h6 className="font-['JetBrains_Mono'] text-[12px] text-[var(--neon-primary)] mb-3 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
            最近日志
          </h6>
          <ul className="text-[10px] font-['JetBrains_Mono'] text-[var(--text-muted)] space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[var(--neon-tertiary)]">[OK]</span>
              <span>文库已同步</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--neon-tertiary)]">[OK]</span>
              <span>119 个教程就绪</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--neon-primary)]">[..]</span>
              <span>在线模式激活</span>
            </li>
          </ul>
        </div>

        <div className="text-[10px] text-[var(--text-muted)] font-['JetBrains_Mono'] space-y-1">
          <p>技术支持 ToolkitX</p>
          <p>© 2026 NEON_LABS</p>
        </div>
      </div>
    </aside>
  );
}
