"use client";

import { use } from "react";
import Link from "next/link";
import LearnLayout, { TutorialSidebar, RightSidebar } from "@/components/learn/layout";
import { getCategoryById } from "@/data/tutorials";
import { notFound } from "next/navigation";

const difficultyConfig = {
  beginner: { label: "入门", color: "var(--neon-tertiary)", bg: "rgba(162,239,0,0.1)" },
  intermediate: { label: "进阶", color: "var(--neon-primary)", bg: "rgba(0,240,255,0.1)" },
  advanced: { label: "高级", color: "var(--neon-danger)", bg: "rgba(255,0,85,0.1)" },
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = use(params);
  const category = getCategoryById(categoryId);
  if (!category) return notFound();

  return (
    <LearnLayout>
      <div className="learn-neon flex">
        {/* Left Sidebar */}
        <TutorialSidebar category={category} />

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto px-6 py-8 max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-8 font-['JetBrains_Mono'] text-[14px]" style={{ color: "var(--text-muted)" }}>
            <Link href="/learn" className="hover:text-[var(--neon-primary)] transition-colors">文库</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span className="text-[var(--neon-primary)]">{category.name}</span>
          </div>

          {/* Category Header */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded border border-[rgba(0,240,255,0.2)]" style={{ background: "rgba(0,240,255,0.1)" }}>
                <span className="text-[24px]">{category.icon}</span>
              </div>
              <div>
                <h1 className="text-[32px] font-bold" style={{ color: "var(--neon-primary)" }}>{category.name}</h1>
                <p className="font-['JetBrains_Mono'] text-[12px]" style={{ color: "var(--text-muted)" }}>
                  {category.description} · {category.tutorials.length} 个模块
                </p>
              </div>
            </div>
            <div className="progress-beam w-full mt-6" />
          </section>

          {/* Tutorial List */}
          <article className="space-y-6">
            {category.tutorials.map((tutorial, i) => {
              const diff = difficultyConfig[tutorial.difficulty];
              return (
                <Link
                  key={tutorial.slug}
                  href={`/learn/${categoryId}/${tutorial.slug}`}
                  className="glass-card flex items-center gap-5 p-5 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded flex items-center justify-center shrink-0 border border-[var(--outline-variant)]" style={{ background: "var(--surface-container)" }}>
                    <span className="font-['JetBrains_Mono'] text-[12px] font-bold" style={{ color: "var(--neon-primary)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[16px] font-semibold mb-1 group-hover:text-[var(--neon-primary)] transition-colors" style={{ color: "var(--neon-primary)" }}>
                      {tutorial.title}
                    </h3>
                    <p className="text-[14px] line-clamp-1" style={{ color: "var(--on-surface-variant)" }}>
                      {tutorial.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="tag-neon" style={{ color: diff.color, borderColor: `${diff.color}40`, background: diff.bg }}>
                      {diff.label}
                    </span>
                    <div className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                      <span className="font-['JetBrains_Mono'] text-[11px]">{tutorial.readTime}</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--outline)] group-hover:text-[var(--neon-primary)] group-hover:translate-x-1 transition-all">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </article>
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </LearnLayout>
  );
}
