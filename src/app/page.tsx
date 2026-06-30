"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Terminal,
  Code,
  Database,
  Globe,
  Shield,
  Cpu,
  FileCode,
  Layers,
  BookOpen,
  Wrench,
  Clock,
} from "lucide-react";
import { categories } from "@/data/tutorials";
import { getVisitCount, incrementVisitCount } from "@/lib/visit-counter";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const toolLinks = [
  { name: "在线终端", href: "/terminal", icon: Terminal },
  { name: "诊断工具", href: "/diagnostics", icon: Search },
  { name: "服务器监控", href: "/monitor", icon: Cpu },
  { name: "日志查看", href: "/log-viewer", icon: FileCode },
  { name: "配置生成器", href: "/config-generator", icon: Layers },
  { name: "批量操作", href: "/batch", icon: Terminal },
  { name: "证书管理", href: "/certs", icon: Shield },
  { name: "JSON 格式化", href: "/tools?tool=json", icon: Code },
  { name: "编解码", href: "/tools?tool=encoding", icon: Shield },
  { name: "时间戳转换", href: "/tools?tool=timestamp", icon: Clock },
  { name: "哈希计算", href: "/tools?tool=hash", icon: Shield },
  { name: "密码生成器", href: "/tools?tool=password", icon: Shield },
  { name: "正则测试", href: "/tools?tool=regex", icon: Code },
  { name: "QR 码生成", href: "/tools?tool=qr", icon: Globe },
];

const iconMap: Record<string, React.ReactNode> = {
  linux: <Terminal className="w-5 h-5" />,
  sql: <Database className="w-5 h-5" />,
  docker: <Layers className="w-5 h-5" />,
  git: <FileCode className="w-5 h-5" />,
  nginx: <Globe className="w-5 h-5" />,
  python: <Code className="w-5 h-5" />,
  javascript: <Code className="w-5 h-5" />,
  shell: <Terminal className="w-5 h-5" />,
  network: <Globe className="w-5 h-5" />,
  redis: <Database className="w-5 h-5" />,
  frontend: <Code className="w-5 h-5" />,
  backend: <Code className="w-5 h-5" />,
  ai: <Cpu className="w-5 h-5" />,
  mobile: <Globe className="w-5 h-5" />,
  languages: <FileCode className="w-5 h-5" />,
  fundamentals: <BookOpen className="w-5 h-5" />,
};

type Mode = "knowledge" | "tools";

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("knowledge");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    setVisitCount(incrementVisitCount());
  }, []);

  const filteredCategories = useMemo(() => {
    if (!search && !activeCategory) return categories;
    const q = search.toLowerCase();
    return categories
      .map(cat => ({
        ...cat,
        tutorials: cat.tutorials.filter(
          t =>
            (!activeCategory || cat.id === activeCategory) &&
            (t.title.toLowerCase().includes(q) ||
              t.description.toLowerCase().includes(q) ||
              t.tags.some(tag => tag.toLowerCase().includes(q)))
        ),
      }))
      .filter(cat => cat.tutorials.length > 0);
  }, [search, activeCategory]);

  const totalTutorials = categories.reduce((sum, c) => sum + c.tutorials.length, 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
        <div className="w-full px-4 py-3 flex items-center justify-between gap-4">
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
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={mode === "knowledge" ? "搜索教程..." : "搜索工具..."}
                className="bg-transparent border-none outline-none w-full text-sm"
                style={{ color: "var(--on-surface)" }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded border overflow-hidden" style={{ borderColor: "var(--outline-variant)" }}>
              <button
                onClick={() => setMode("knowledge")}
                className="px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  background: mode === "knowledge" ? "var(--secondary)" : "transparent",
                  color: mode === "knowledge" ? "var(--on-secondary)" : "var(--on-surface-variant)",
                }}
              >
                知识库
              </button>
              <button
                onClick={() => setMode("tools")}
                className="px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  background: mode === "tools" ? "var(--secondary)" : "transparent",
                  color: mode === "tools" ? "var(--on-secondary)" : "var(--on-surface-variant)",
                }}
              >
                工具箱
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
        <div className="w-full px-4 flex items-center gap-1">
          <Link href="/" className="px-3 py-2.5 text-sm font-medium border-b-2" style={{ color: "var(--secondary)", borderColor: "var(--secondary)" }}>
            首页
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-4 py-4 flex gap-4">
        {/* Left Sidebar - only in knowledge mode */}
        {mode === "knowledge" && (
          <aside className="w-44 shrink-0 hidden lg:block">
            <div className="sticky top-4 rounded-lg border overflow-hidden" style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
              <div className="px-3 py-2.5 text-sm font-semibold border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-low)", color: "var(--on-surface)" }}>
                全部教程
              </div>
              <div className="py-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-[13px] transition-colors border-l-3 border-transparent"
                    style={{
                      color: activeCategory === cat.id ? "var(--secondary)" : "var(--on-surface-variant)",
                      background: activeCategory === cat.id ? "color-mix(in srgb, var(--secondary) 8%, transparent)" : "transparent",
                      borderLeftColor: activeCategory === cat.id ? "var(--secondary)" : "transparent",
                      fontWeight: activeCategory === cat.id ? 600 : 400,
                    }}
                  >
                    <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: cat.color, color: "#fff" }}>{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {mode === "knowledge" ? (
            <>
              {/* Mobile category filter */}
              <div className="lg:hidden flex gap-1.5 overflow-x-auto pb-3 mb-3">
                <button
                  onClick={() => setActiveCategory(null)}
                  className="px-3 py-1.5 text-xs font-medium rounded border shrink-0"
                  style={{
                    background: !activeCategory ? "var(--secondary)" : "var(--surface-container-low)",
                    color: !activeCategory ? "var(--on-secondary)" : "var(--on-surface-variant)",
                    borderColor: !activeCategory ? "var(--secondary)" : "var(--outline-variant)",
                  }}
                >
                  全部
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                    className="px-3 py-1.5 text-xs font-medium rounded border shrink-0"
                    style={{
                      background: activeCategory === cat.id ? "var(--secondary)" : "var(--surface-container-low)",
                      color: activeCategory === cat.id ? "var(--on-secondary)" : "var(--on-surface-variant)",
                      borderColor: activeCategory === cat.id ? "var(--secondary)" : "var(--outline-variant)",
                    }}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>

              {/* Tutorial sections */}
              {filteredCategories.map(cat => (
                <div key={cat.id} className="mb-4">
                  <div className="rounded-lg border overflow-hidden" style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-low)" }}>
                      <span className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold" style={{ background: cat.color, color: "#fff" }}>{cat.icon}</span>
                      <h2 className="text-sm font-semibold" style={{ color: "var(--on-surface)" }}>{cat.name}</h2>
                      <span className="ml-auto text-xs" style={{ color: "var(--outline)" }}>{cat.tutorials.length} 篇</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                      {cat.tutorials.map(tutorial => (
                        <Link
                          key={tutorial.slug}
                          href={`/learn/${cat.id}/${tutorial.slug}`}
                          className="flex items-center gap-3 px-4 py-3 border-b border-r transition-colors hover:opacity-80"
                          style={{ borderColor: "var(--outline-variant)" }}
                        >
                          <div className="w-9 h-9 rounded flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: cat.color, color: "#fff" }}>
                            {cat.icon}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[13px] font-medium truncate" style={{ color: "var(--on-surface)" }}>{tutorial.title}</h4>
                            <p className="text-[11px] truncate" style={{ color: "var(--outline)" }}>{tutorial.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {filteredCategories.length === 0 && (
                <div className="text-center py-16">
                  <Search className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--outline)" }} />
                  <p className="text-sm" style={{ color: "var(--outline)" }}>没有找到相关教程</p>
                </div>
              )}
            </>
          ) : (
            /* Tools Mode */
            <div className="rounded-lg border overflow-hidden" style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-low)" }}>
                <Wrench className="w-5 h-5" style={{ color: "var(--secondary)" }} />
                <h2 className="text-sm font-semibold" style={{ color: "var(--on-surface)" }}>在线工具</h2>
                <span className="ml-auto text-xs" style={{ color: "var(--outline)" }}>{toolLinks.length} 款</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {toolLinks
                  .filter(t => !search || t.name.toLowerCase().includes(search.toLowerCase()))
                  .map(tool => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="flex items-center gap-3 px-4 py-3 border-b border-r transition-colors hover:opacity-80"
                      style={{ borderColor: "var(--outline-variant)" }}
                    >
                      <div className="w-9 h-9 rounded flex items-center justify-center shrink-0" style={{ background: "var(--surface-container)", color: "var(--secondary)" }}>
                        <tool.icon className="w-4 h-4" />
                      </div>
                      <span className="text-[13px] font-medium" style={{ color: "var(--on-surface)" }}>{tool.name}</span>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t mt-8" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
        <div className="w-full px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: "var(--outline)" }}>
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: "var(--secondary)" }}>ToolkitX</span>
            <span>·</span>
            <span>{totalTutorials} 篇教程 · {toolLinks.length}+ 工具</span>
          </div>
          <div>&copy; 2026 ToolkitX · 访问量：{visitCount}</div>
        </div>
      </footer>
    </div>
  );
}
