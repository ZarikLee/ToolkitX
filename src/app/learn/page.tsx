"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
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
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-[32px] font-bold text-gray-800 mb-2">
            技术知识库
          </h1>
          <p className="text-gray-500 text-[14px] mb-6">
            共 {totalTutorials} 篇教程 · 涵盖 {categories.length} 个技术领域 · 配套在线练习
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="搜索教程... 例如：grep、JOIN、Docker"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-[13px] placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
              !selectedCategory
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            全部
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
          <div className="text-center py-16 text-gray-400">
            <Search className="h-10 w-10 mx-auto mb-3" />
            <p className="text-[13px]">没有找到相关教程</p>
          </div>
        )}
      </div>
    </LearnLayout>
  );
}

function CategoryCard({ category }: { category: TutorialCategory }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <Link href={`/learn/${category.id}`} className="flex items-center gap-2.5 group">
          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center text-[16px]`}>
            {category.icon}
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {category.name}
            </h3>
            <p className="text-[11px] text-gray-500">{category.description}</p>
          </div>
        </Link>
      </div>

      {/* Tutorial List */}
      <div className="px-4 py-3">
        <div className="space-y-0.5">
          {category.tutorials.slice(0, 8).map((tutorial, i) => (
            <Link
              key={tutorial.slug}
              href={`/learn/${category.id}/${tutorial.slug}`}
              className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] text-gray-400 w-4">{i + 1}.</span>
                <span className="text-[12px] text-gray-600 truncate group-hover:text-blue-600 transition-colors">
                  {tutorial.title}
                </span>
              </div>
              <ChevronRight className="h-3 w-3 text-gray-300 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
        {category.tutorials.length > 8 && (
          <Link
            href={`/learn/${category.id}`}
            className="flex items-center justify-center gap-1 mt-2 py-1.5 text-[11px] text-blue-600 hover:text-blue-800 transition-colors"
          >
            查看全部 {category.tutorials.length} 篇
            <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
