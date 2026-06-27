"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, ChevronRight, CheckCircle, Code, Play } from "lucide-react";
import { categories, getCategoryById } from "@/data/tutorials";
import { getTutorialContent } from "@/data/tutorials/content";
import { notFound } from "next/navigation";

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-500",
  intermediate: "bg-yellow-500/10 text-yellow-500",
  advanced: "bg-red-500/10 text-red-500",
};

const difficultyLabels = { beginner: "入门", intermediate: "进阶", advanced: "高级" };

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = use(params);
  const category = getCategoryById(categoryId);

  if (!category) return notFound();

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-[13px]">
        <Link href="/learn" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          知识库
        </Link>
        <ChevronRight className="h-3 w-3 text-muted-foreground/30" />
        <span className="text-foreground font-medium">{category.name}</span>
      </div>

      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-[24px]`}>
            {category.icon}
          </div>
          <div>
            <h1 className="text-[28px] font-bold">{category.name}</h1>
            <p className="text-muted-foreground text-[14px]">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-[12px] text-muted-foreground/50">{category.tutorials.length} 篇教程</span>
        </div>
      </div>

      {/* Tutorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {category.tutorials.map((tutorial, i) => {
          const content = getTutorialContent(categoryId, tutorial.slug);
          const hasQuiz = content && content.quiz && content.quiz.length > 0;

          return (
            <Link
              key={tutorial.slug}
              href={`/learn/${categoryId}/${tutorial.slug}`}
              className="glass rounded-xl p-4 hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0a84ff]/20 to-[#bf5af2]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[12px] font-bold text-[#0a84ff]">{i + 1}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[14px] font-medium group-hover:text-[#0a84ff] transition-colors truncate">
                      {tutorial.title}
                    </h3>
                    <span className={`px-1.5 py-0.5 text-[9px] rounded ${difficultyColors[tutorial.difficulty]} shrink-0`}>
                      {difficultyLabels[tutorial.difficulty]}
                    </span>
                  </div>
                  <p className="text-[12px] text-muted-foreground/50 line-clamp-2">{tutorial.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground/30" />
                      <span className="text-[10px] text-muted-foreground/40">{tutorial.readTime}</span>
                    </div>
                    {hasQuiz && (
                      <div className="flex items-center gap-1">
                        <Play className="h-3 w-3 text-green-500/50" />
                        <span className="text-[10px] text-green-500/50">含练习</span>
                      </div>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-[#0a84ff] transition-colors shrink-0 mt-2" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
