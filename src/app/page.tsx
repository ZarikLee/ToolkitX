"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Terminal,
  ChevronRight,
  ArrowRight,
  Star,
  Clock,
  Zap,
  Code,
  Database,
  Globe,
  Shield,
  Cpu,
  FileCode,
  Layers,
} from "lucide-react";
import { categories, type TutorialCategory } from "@/data/tutorials";
import { getVisitCount, incrementVisitCount } from "@/lib/visit-counter";

const allTools = [
  { name: "在线终端", description: "SSH 连接 + 命令库", href: "/terminal", icon: Terminal, category: "运维" },
  { name: "诊断工具", description: "端口探测、DNS、SSL", href: "/diagnostics", icon: Search, category: "运维" },
  { name: "JSON 格式化", description: "JSON 格式化、压缩、校验", href: "/tools?tool=json", icon: Code, category: "数据格式" },
  { name: "编解码", description: "Base64、URL 编码/解码", href: "/tools?tool=encoding", icon: Shield, category: "编码加密" },
  { name: "时间戳转换", description: "Unix 时间戳与日期互转", href: "/tools?tool=timestamp", icon: Clock, category: "转换器" },
  { name: "服务器监控", description: "CPU/内存/磁盘实时监控", href: "/monitor", icon: Cpu, category: "运维" },
  { name: "日志查看", description: "SSH 实时查看服务器日志", href: "/log-viewer", icon: FileCode, category: "运维" },
  { name: "哈希计算", description: "MD5、SHA-1、SHA-256", href: "/tools?tool=hash", icon: Shield, category: "编码加密" },
  { name: "密码生成器", description: "安全随机密码生成", href: "/tools?tool=password", icon: Shield, category: "编码加密" },
  { name: "正则测试", description: "正则表达式在线测试", href: "/tools?tool=regex", icon: Code, category: "开发" },
  { name: "QR 码生成", description: "二维码生成器", href: "/tools?tool=qr", icon: Globe, category: "转换器" },
  { name: "配置生成器", description: "Docker Compose、Nginx 配置", href: "/config-generator", icon: Layers, category: "运维" },
  { name: "批量操作", description: "批量服务器命令执行", href: "/batch", icon: Terminal, category: "运维" },
  { name: "证书管理", description: "SSL 证书检查与管理", href: "/certs", icon: Shield, category: "运维" },
  { name: "知识库", description: "100+ 教程 · 在线练习", href: "/learn", icon: BookOpen, category: "学习" },
];

type Mode = "knowledge" | "tools";

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("knowledge");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    setVisitCount(incrementVisitCount());
  }, []);

  const filteredCategories = useMemo(() => {
    if (!search && !selectedCategory) return categories;
    const q = search.toLowerCase();
    return categories
      .map(cat => ({
        ...cat,
        tutorials: cat.tutorials.filter(
          t =>
            (!selectedCategory || cat.id === selectedCategory) &&
            (t.title.toLowerCase().includes(q) ||
              t.description.toLowerCase().includes(q) ||
              t.tags.some(tag => tag.toLowerCase().includes(q)))
        ),
      }))
      .filter(cat => cat.tutorials.length > 0);
  }, [search, selectedCategory]);

  const filteredTools = useMemo(() => {
    if (!search) return allTools;
    const q = search.toLowerCase();
    return allTools.filter(
      t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }, [search]);

  const totalTutorials = categories.reduce((sum, c) => sum + c.tutorials.length, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-[var(--outline-variant)]" style={{ background: "color-mix(in srgb, var(--background) 80%, transparent)", backdropFilter: "blur(12px)" }}>
        <nav className="flex justify-between items-center h-16 px-6 md:px-16 w-full max-w-[1280px] mx-auto">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-[24px] font-bold tracking-tighter" style={{ color: "var(--secondary)" }}>
              ToolkitX
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              <Link href="/" className="font-['Geist'] text-[12px] tracking-[0.05em] font-medium transition-colors" style={{ color: "var(--secondary)", borderBottom: "2px solid var(--secondary)", paddingBottom: "2px" }}>
                知识库
              </Link>
              <Link href="/learn" className="font-['Geist'] text-[12px] tracking-[0.05em] font-medium transition-colors hover:text-[var(--on-surface)]" style={{ color: "var(--on-surface-variant)" }}>
                教程
              </Link>
              <Link href="/tools" className="font-['Geist'] text-[12px] tracking-[0.05em] font-medium transition-colors hover:text-[var(--on-surface)]" style={{ color: "var(--on-surface-variant)" }}>
                工具箱
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="mode-toggle">
              <button className={mode === "knowledge" ? "active" : ""} onClick={() => setMode("knowledge")}>
                知识版
              </button>
              <button className={mode === "tools" ? "active" : ""} onClick={() => setMode("tools")}>
                工具版
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {mode === "knowledge" ? (
          <KnowledgeMode
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filteredCategories={filteredCategories}
            totalTutorials={totalTutorials}
          />
        ) : (
          <ToolsMode search={search} setSearch={setSearch} filteredTools={filteredTools} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--outline-variant)]" style={{ background: "var(--background)" }}>
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-6 md:px-16 w-full max-w-[1280px] mx-auto gap-6">
          <div className="flex flex-col gap-2 mb-4 md:mb-0">
            <div className="text-[24px] font-bold tracking-tighter" style={{ color: "var(--secondary)" }}>ToolkitX</div>
            <p className="font-['Geist'] text-[12px] tracking-[0.05em]" style={{ color: "var(--on-surface-variant)" }}>
              技术知识库 & 运维工具箱 · {totalTutorials} 篇教程 · 37+ 工具
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 text-center md:text-left">
            <div className="flex flex-col gap-3">
              <p className="font-['Geist'] text-[12px] uppercase tracking-[0.1em] font-medium" style={{ color: "var(--on-surface)" }}>学习</p>
              <Link href="/learn" className="font-['Geist'] text-[12px] transition-colors hover:text-[var(--secondary)]" style={{ color: "var(--on-surface-variant)" }}>全部教程</Link>
              <Link href="/learn/linux" className="font-['Geist'] text-[12px] transition-colors hover:text-[var(--secondary)]" style={{ color: "var(--on-surface-variant)" }}>Linux</Link>
              <Link href="/learn/python" className="font-['Geist'] text-[12px] transition-colors hover:text-[var(--secondary)]" style={{ color: "var(--on-surface-variant)" }}>Python</Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-['Geist'] text-[12px] uppercase tracking-[0.1em] font-medium" style={{ color: "var(--on-surface)" }}>工具</p>
              <Link href="/terminal" className="font-['Geist'] text-[12px] transition-colors hover:text-[var(--secondary)]" style={{ color: "var(--on-surface-variant)" }}>在线终端</Link>
              <Link href="/diagnostics" className="font-['Geist'] text-[12px] transition-colors hover:text-[var(--secondary)]" style={{ color: "var(--on-surface-variant)" }}>诊断工具</Link>
              <Link href="/tools" className="font-['Geist'] text-[12px] transition-colors hover:text-[var(--secondary)]" style={{ color: "var(--on-surface-variant)" }}>更多工具</Link>
            </div>
          </div>
          <div className="font-['Geist'] text-[10px] uppercase tracking-[0.1em]" style={{ color: "var(--outline)" }}>
            &copy; 2026 ToolkitX · 访问量：{visitCount}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============ Knowledge Mode ============ */
function KnowledgeMode({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  filteredCategories,
  totalTutorials,
}: {
  search: string;
  setSearch: (s: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (c: string | null) => void;
  filteredCategories: TutorialCategory[];
  totalTutorials: number;
}) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex flex-col items-center justify-center overflow-hidden border-b border-[var(--outline-variant)]">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="font-['Geist'] text-[12px] uppercase tracking-[0.3em] mb-6 block" style={{ color: "var(--secondary)" }}>
            System Protocol v4.0
          </span>
          <h1 className="text-[48px] md:text-[84px] font-semibold leading-none mb-8" style={{ letterSpacing: "-0.02em", color: "var(--on-surface)" }}>
            工程卓越的<br />数字基石
          </h1>
          <p className="text-[16px] leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: "var(--on-surface-variant)" }}>
            ToolkitX 提供执行级的技术学习体验。通过精密的课程架构与极致的交互逻辑，重塑现代开发知识体系。共 {totalTutorials} 篇教程，覆盖 {categories.length} 个技术领域。
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <div className="flex items-center p-4 border border-[var(--outline-variant)] focus-within:border-[var(--secondary)] transition-all" style={{ background: "var(--surface-container-low)" }}>
              <Search className="h-5 w-5 mr-3" style={{ color: "var(--on-surface-variant)" }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="搜索教程... (例如 Linux, grep, JOIN, Docker)"
                className="bg-transparent border-none outline-none w-full text-[16px]"
                style={{ color: "var(--on-surface)", fontFamily: "'Inter', sans-serif" }}
              />
              <kbd className="text-[10px] px-2 py-1 border border-[var(--outline-variant)] ml-3 font-['Geist']" style={{ color: "var(--outline)", background: "var(--surface-container)" }}>
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ChevronRight className="h-6 w-6 rotate-90" style={{ color: "var(--on-surface-variant)" }} />
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 px-6 md:px-16 max-w-[1280px] mx-auto border-b border-[var(--outline-variant)]">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 font-['Geist'] text-[12px] tracking-[0.05em] uppercase border transition-all ${
              !selectedCategory
                ? "border-[var(--secondary)] font-bold"
                : "border-[var(--outline-variant)] hover:border-[var(--secondary)]"
            }`}
            style={{
              background: !selectedCategory ? "var(--secondary)" : "transparent",
              color: !selectedCategory ? "var(--on-secondary)" : "var(--on-surface-variant)",
            }}
          >
            全部
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`px-4 py-2 font-['Geist'] text-[12px] tracking-[0.05em] uppercase border transition-all ${
                selectedCategory === cat.id
                  ? "border-[var(--secondary)] font-bold"
                  : "border-[var(--outline-variant)] hover:border-[var(--secondary)]"
              }`}
              style={{
                background: selectedCategory === cat.id ? "var(--secondary)" : "transparent",
                color: selectedCategory === cat.id ? "var(--on-secondary)" : "var(--on-surface-variant)",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6 md:px-16 max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[32px] font-semibold mb-2" style={{ color: "var(--on-surface)" }}>核心探索路径</h2>
            <p style={{ color: "var(--on-surface-variant)" }}>精选架构范式，助力突破性增长。</p>
          </div>
          <span className="font-['Geist'] text-[12px] tracking-[0.05em] uppercase" style={{ color: "var(--secondary)" }}>
            {filteredCategories.length} 个分类
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-12 w-12 mx-auto mb-4" style={{ color: "var(--outline)" }} />
            <p className="text-[14px] font-['Geist']" style={{ color: "var(--outline)" }}>没有找到相关教程</p>
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="py-16 px-6 md:px-16 max-w-[1280px] mx-auto border-t border-[var(--outline-variant)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-[48px] font-semibold leading-none mb-2" style={{ color: "var(--secondary)", letterSpacing: "-0.02em" }}>{totalTutorials}+</div>
            <div className="font-['Geist'] text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--outline)" }}>技术教程</div>
          </div>
          <div>
            <div className="text-[48px] font-semibold leading-none mb-2" style={{ color: "var(--secondary)", letterSpacing: "-0.02em" }}>{categories.length}</div>
            <div className="font-['Geist'] text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--outline)" }}>技术领域</div>
          </div>
          <div>
            <div className="text-[48px] font-semibold leading-none mb-2" style={{ color: "var(--secondary)", letterSpacing: "-0.02em" }}>37+</div>
            <div className="font-['Geist'] text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--outline)" }}>运维工具</div>
          </div>
          <div>
            <div className="text-[48px] font-semibold leading-none mb-2" style={{ color: "var(--secondary)", letterSpacing: "-0.02em" }}>24/7</div>
            <div className="font-['Geist'] text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--outline)" }}>在线访问</div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============ Tools Mode ============ */
function ToolsMode({
  search,
  setSearch,
  filteredTools,
}: {
  search: string;
  setSearch: (s: string) => void;
  filteredTools: typeof allTools;
}) {
  const toolCategories = [...new Set(allTools.map(t => t.category))];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden border-b border-[var(--outline-variant)]">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="font-['Geist'] text-[12px] uppercase tracking-[0.3em] mb-6 block" style={{ color: "var(--secondary)" }}>
            Developer Toolbox
          </span>
          <h1 className="text-[48px] md:text-[64px] font-semibold leading-none mb-8" style={{ letterSpacing: "-0.02em", color: "var(--on-surface)" }}>
            运维工具箱
          </h1>
          <p className="text-[16px] leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: "var(--on-surface-variant)" }}>
            {allTools.length} 款在线工具，覆盖终端、诊断、编码、格式化等运维场景。
          </p>
          <div className="max-w-xl mx-auto">
            <div className="flex items-center p-4 border border-[var(--outline-variant)] focus-within:border-[var(--secondary)] transition-all" style={{ background: "var(--surface-container-low)" }}>
              <Search className="h-5 w-5 mr-3" style={{ color: "var(--on-surface-variant)" }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="搜索工具..."
                className="bg-transparent border-none outline-none w-full text-[16px]"
                style={{ color: "var(--on-surface)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tools by Category */}
      <section className="py-16 px-6 md:px-16 max-w-[1280px] mx-auto">
        {toolCategories.map(cat => (
          <div key={cat} className="mb-12">
            <h3 className="text-[24px] font-semibold mb-6" style={{ color: "var(--on-surface)" }}>{cat}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools
                .filter(t => t.category === cat)
                .map(tool => (
                  <Link key={tool.href} href={tool.href}>
                    <div className="card-apple p-6 h-full group cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 flex items-center justify-center border border-[var(--outline-variant)]" style={{ background: "var(--surface-container)" }}>
                          <tool.icon className="h-5 w-5" style={{ color: "var(--secondary)" }} />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-[var(--secondary)] transition-colors" style={{ color: "var(--on-surface)" }}>{tool.name}</h4>
                          <p className="text-[12px]" style={{ color: "var(--outline)" }}>{tool.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

/* ============ Category Card ============ */
function CategoryCard({ category }: { category: TutorialCategory }) {
  const iconMap: Record<string, React.ReactNode> = {
    linux: <Terminal className="h-6 w-6" />,
    sql: <Database className="h-6 w-6" />,
    docker: <Layers className="h-6 w-6" />,
    git: <FileCode className="h-6 w-6" />,
    nginx: <Globe className="h-6 w-6" />,
    python: <Code className="h-6 w-6" />,
    javascript: <Zap className="h-6 w-6" />,
    shell: <Terminal className="h-6 w-6" />,
    network: <Globe className="h-6 w-6" />,
    redis: <Database className="h-6 w-6" />,
  };

  return (
    <Link href={`/learn/${category.id}`}>
      <div className="card-apple p-8 h-full flex flex-col group cursor-pointer">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 flex items-center justify-center border border-[var(--outline-variant)]" style={{ background: "var(--surface-container)" }}>
            <span style={{ color: "var(--secondary)" }}>{iconMap[category.id] || <BookOpen className="h-6 w-6" />}</span>
          </div>
          <span className="neon-tag">{category.tutorials.length} 个模块</span>
        </div>

        <h3 className="text-[24px] font-semibold mb-3" style={{ color: "var(--on-surface)" }}>{category.name}</h3>
        <p className="text-[14px] leading-relaxed mb-8 flex-grow" style={{ color: "var(--on-surface-variant)" }}>
          {category.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-['Geist'] text-[12px]" style={{ color: "var(--outline)" }}>
            {category.tutorials.length} 篇教程
          </span>
          <div className="w-8 h-8 flex items-center justify-center border border-[var(--outline-variant)] group-hover:border-[var(--secondary)] group-hover:text-[var(--secondary)] transition-all">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
