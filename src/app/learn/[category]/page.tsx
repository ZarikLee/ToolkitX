"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Clock, Play } from "lucide-react";
import LearnLayout, { TutorialSidebar, RightSidebar } from "@/components/learn/layout";
import { getCategoryById } from "@/data/tutorials";
import { notFound } from "next/navigation";

const difficultyColors = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};
const difficultyLabels = { beginner: "入门", intermediate: "进阶", advanced: "高级" };

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = use(params);
  const category = getCategoryById(categoryId);
  if (!category) return notFound();

  return (
    <LearnLayout>
      <div className="flex">
        {/* Sidebar */}
        <TutorialSidebar category={category} />

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-[800px] mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-[12px]">
              <Link href="/learn" className="text-blue-600 hover:text-blue-800">
                知识库
              </Link>
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <span className="text-gray-700 font-medium">{category.name}</span>
            </div>

            {/* Category Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[24px]">{category.icon}</span>
                <h1 className="text-[24px] font-bold text-gray-800">{category.name}</h1>
              </div>
              <p className="text-gray-500 text-[13px]">{category.description}</p>
              <p className="text-gray-400 text-[12px] mt-1">{category.tutorials.length} 篇教程</p>
            </div>

            {/* Tutorial List */}
            <div className="space-y-2">
              {category.tutorials.map((tutorial, i) => (
                <Link
                  key={tutorial.slug}
                  href={`/learn/${categoryId}/${tutorial.slug}`}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-bold text-blue-600">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-[12px] text-gray-500 mt-0.5">{tutorial.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 text-[10px] rounded ${difficultyColors[tutorial.difficulty]}`}>
                      {difficultyLabels[tutorial.difficulty]}
                    </span>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px]">{tutorial.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </LearnLayout>
  );
}
