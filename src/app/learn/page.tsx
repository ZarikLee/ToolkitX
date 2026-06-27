"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, BookOpen, Code, Terminal, Database, Server, Globe, Layers, Zap, ArrowRight, ChevronRight } from "lucide-react";
import { categories, type TutorialCategory } from "@/data/tutorials";

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-500 border-red-500/20",
};

const difficultyLabels = { beginner: "入门", intermediate: "进阶", advanced: "高级" };

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
    <div className="max-w-[1400px] mx-auto px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-[42px] font-bold mb-3">
          <span className="bg-gradient-to-r from-[#0a84ff] to-[#bf5af2] bg-clip-text text-transparent">
            技术知识库
          </span>
        </h1>
        <p className="text-muted-foreground text-[15px] mb-6">
          系统化学习运维、数据库、编程知识，配套在线模拟练习
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#0a84ff]" />
            <span className="text-[13px] text-muted-foreground">{totalTutorials} 篇教程</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#bf5af2]" />
            <span className="text-[13px] text-muted-foreground">{categories.length} 个分类</span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-[#30d158]" />
            <span className="text-[13px] text-muted-foreground">在线练习</span>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索教程... 例如：grep、JOIN、Docker"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[14px] placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
            !selectedCategory ? "bg-[#0a84ff] text-white" : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] border border-white/[0.06]"
          }`}
        >
          全部
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
              selectedCategory === cat.id ? "bg-[#0a84ff] text-white" : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] border border-white/[0.06]"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map(cat => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-20 text-muted-foreground/40">
          <Search className="h-12 w-12 mx-auto mb-4" />
          <p className="text-[14px]">没有找到相关教程</p>
        </div>
      )}
    </div>
  );
}

function CategoryCard({ category }: { category: TutorialCategory }) {
  return (
    <div className="glass rounded-2xl overflow-hidden hover:bg-white/[0.03] transition-all group">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-[20px]`}>
            {category.icon}
          </div>
          <div>
            <h3 className="text-[15px] font-semibold">{category.name}</h3>
            <p className="text-[11px] text-muted-foreground/50">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Tutorial List */}
      <div className="px-5 pb-4">
        <div className="space-y-1">
          {category.tutorials.slice(0, 6).map((tutorial, i) => (
            <Link
              key={tutorial.slug}
              href={`/learn/${category.id}/${tutorial.slug}`}
              className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.04] transition-all group/item"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] text-muted-foreground/30 w-4">{i + 1}.</span>
                <span className="text-[12px] text-foreground/70 truncate group-hover/item:text-foreground transition-colors">
                  {tutorial.title}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`px-1.5 py-0.5 text-[9px] rounded border ${difficultyColors[tutorial.difficulty]}`}>
                  {difficultyLabels[tutorial.difficulty]}
                </span>
                <ChevronRight className="h-3 w-3 text-muted-foreground/30 opacity-0 group-hover/item:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
        {category.tutorials.length > 6 && (
          <Link
            href={`/learn/${category.id}`}
            className="flex items-center justify-center gap-1 mt-3 py-2 text-[12px] text-[#0a84ff] hover:text-[#0a84ff]/80 transition-colors"
          >
            查看全部 {category.tutorials.length} 篇
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
