"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import LearnLayout from "@/components/learn/layout";
import { categories, type TutorialCategory } from "@/data/tutorials";

export default function LearnPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const totalTutorials = categories.reduce((sum, c) => sum + c.tutorials.length, 0);

  return (
    <LearnLayout>
      <div className="learn-neon">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden border-b border-[var(--outline-variant)]">
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            {/* Status Badge */}
            <div className="inline-block px-4 py-1.5 border border-[rgba(0,240,255,0.3)] rounded-full mb-8" style={{ background: "rgba(0,240,255,0.05)" }}>
              <span className="font-['JetBrains_Mono'] text-[12px] text-[var(--neon-primary)] tracking-[0.2em]">系统状态: 在线</span>
            </div>

            <h1 className="text-[48px] font-extrabold leading-tight mb-6 neon-text-glow" style={{ letterSpacing: "-0.02em" }}>
              准备好初始化了吗？
            </h1>
            <p className="text-[18px] leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: "var(--on-surface-variant)" }}>
              通过沉浸式模拟和AI驱动的成长路径，掌握现代运维核心技术架构。{totalTutorials} 篇教程 · 涵盖 {categories.length} 个技术领域。
            </p>

            {/* Glowing Search Bar */}
            <div className="relative max-w-xl mx-auto group">
              <div className="absolute -inset-1 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" style={{ background: "rgba(0,240,255,0.2)" }} />
              <div className="relative flex items-center p-4 rounded-lg border border-[var(--outline-variant)]" style={{ background: "var(--surface-container-high)", backdropFilter: "blur(16px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neon-primary)" strokeWidth="2" className="mr-4 shrink-0">
                  <polyline points="4,17 10,11 4,5" /><line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="开始输入路径... (例如 grep, JOIN, Docker)"
                  className="bg-transparent border-none w-full outline-none text-[16px] placeholder:text-[var(--outline-variant)]"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--neon-primary)" }}
                  onKeyDown={e => {
                    if (e.key === "Enter" && search.trim()) {
                      // Trigger filter
                    }
                  }}
                />
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <span className="text-[12px] font-['JetBrains_Mono'] text-[var(--outline-variant)]">按下</span>
                  <kbd className="px-2 py-1 rounded text-[12px] font-['JetBrains_Mono'] text-[var(--neon-primary)] border border-[var(--outline-variant)]" style={{ background: "rgba(59,73,75,0.2)" }}>
                    ENTER
                  </kbd>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Fade */}
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[var(--terminal-black)] to-transparent" />
        </section>

        {/* Category Filter */}
        <section className="py-6 px-6 max-w-[1440px] mx-auto border-b border-[var(--outline-variant)]">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 font-['JetBrains_Mono'] text-[12px] border transition-all ${
                !selectedCategory
                  ? "bg-[var(--neon-primary)] text-[var(--terminal-black)] border-[var(--neon-primary)] font-bold"
                  : "border-[var(--outline-variant)] text-[var(--on-surface-variant)] hover:border-[var(--neon-primary)] hover:text-[var(--neon-primary)]"
              }`}
            >
              全部
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`px-4 py-2 font-['JetBrains_Mono'] text-[12px] border transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[var(--neon-primary)] text-[var(--terminal-black)] border-[var(--neon-primary)] font-bold"
                    : "border-[var(--outline-variant)] text-[var(--on-surface-variant)] hover:border-[var(--neon-primary)] hover:text-[var(--neon-primary)]"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Paths Grid */}
        <section className="py-20 px-6 max-w-[1440px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[32px] font-bold mb-2">精选路径</h2>
              <div className="progress-beam w-24" />
            </div>
            <span className="font-['JetBrains_Mono'] text-[14px] text-[var(--neon-primary)]">
              共 {filteredCategories.length} 个分类
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-20">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" className="mx-auto mb-4">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <p className="text-[14px] font-['JetBrains_Mono']" style={{ color: "var(--text-muted)" }}>没有找到相关教程</p>
            </div>
          )}
        </section>

        {/* Stats */}
        <section className="py-20 px-6 max-w-[1440px] mx-auto text-center border-t border-[var(--outline-variant)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div>
              <div className="stat-value">{totalTutorials}</div>
              <div className="stat-label mt-2">实验协议</div>
            </div>
            <div>
              <div className="stat-value">{categories.length}</div>
              <div className="stat-label mt-2">技术领域</div>
            </div>
            <div>
              <div className="stat-value">24/7</div>
              <div className="stat-label mt-2">AI 导师</div>
            </div>
            <div>
              <div className="stat-value">99.9%</div>
              <div className="stat-label mt-2">同步运行时间</div>
            </div>
          </div>
        </section>
      </div>
    </LearnLayout>
  );
}

function CategoryCard({ category }: { category: TutorialCategory }) {
  return (
    <Link href={`/learn/${category.id}`}>
      <div className="glass-card p-6 flex flex-col h-full relative overflow-hidden group cursor-pointer">
        <div className="scanline opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="mb-6 flex justify-between items-start">
          <div className="w-12 h-12 flex items-center justify-center rounded border border-[rgba(0,240,255,0.2)]" style={{ background: "rgba(0,240,255,0.1)" }}>
            <span className="text-[20px]">{category.icon}</span>
          </div>
          <span className="tag-neon" style={{ color: "var(--neon-tertiary)", borderColor: "rgba(162,239,0,0.3)" }}>
            {category.tutorials.length} 个模块
          </span>
        </div>

        <h3 className="text-[24px] font-semibold mb-3" style={{ color: "var(--neon-primary)" }}>{category.name}</h3>
        <p className="text-[16px] leading-relaxed mb-8 flex-grow" style={{ color: "var(--on-surface-variant)" }}>
          {category.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-['JetBrains_Mono'] text-[12px]" style={{ color: "var(--text-muted)" }}>
            {category.tutorials.length} 篇教程
          </span>
          <div className="w-8 h-8 flex items-center justify-center border border-[var(--outline-variant)] rounded-full group-hover:border-[var(--neon-primary)] group-hover:text-[var(--neon-primary)] transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
