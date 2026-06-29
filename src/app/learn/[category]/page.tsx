"use client";

import { use } from "react";
import Link from "next/link";
import LearnLayout, { CategoryNav, TutorialSidebar } from "@/components/learn/layout";
import { getCategoryById } from "@/data/tutorials";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = use(params);
  const category = getCategoryById(categoryId);
  if (!category) return notFound();

  return (
    <LearnLayout>
      {/* Top Nav: All categories */}
      <CategoryNav activeId={categoryId} />

      <div className="flex">
        {/* Left Sidebar: Tutorials for this category */}
        <TutorialSidebar category={category} />

        {/* Main Content: Category intro */}
        <main className="flex-1 min-w-0 px-6 py-6">
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{category.icon}</span>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--on-surface)" }}>{category.name}</h1>
              <p className="text-sm" style={{ color: "var(--outline)" }}>{category.description} · {category.tutorials.length} 篇教程</p>
            </div>
          </div>

          {/* Quick start */}
          <div className="rounded-lg border p-4 mb-6" style={{ background: "var(--surface-container-low)", borderColor: "var(--outline-variant)" }}>
            <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
              从左侧选择教程开始学习，或点击下方链接进入第一篇。
            </p>
            <Link
              href={`/learn/${categoryId}/${category.tutorials[0]?.slug}`}
              className="inline-block mt-3 px-4 py-2 rounded text-sm font-medium"
              style={{ background: "var(--secondary)", color: "var(--on-secondary)" }}
            >
              开始学习 →
            </Link>
          </div>

          {/* Tutorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.tutorials.map((tutorial, i) => (
              <Link
                key={tutorial.slug}
                href={`/learn/${categoryId}/${tutorial.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg border transition-colors hover:opacity-80"
                style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}
              >
                <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: "var(--surface-container)", color: "var(--secondary)" }}>
                  <span className="text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium truncate" style={{ color: "var(--on-surface)" }}>{tutorial.title}</h3>
                  <p className="text-xs truncate" style={{ color: "var(--outline)" }}>{tutorial.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </LearnLayout>
  );
}
