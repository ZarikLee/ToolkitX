"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  Copy,
  Check,
  Play,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import LearnLayout, { TutorialSidebar, RightSidebar } from "@/components/learn/layout";
import { getCategoryById } from "@/data/tutorials";
import { getTutorialContent } from "@/data/tutorials/content";

const difficultyColors = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};
const difficultyLabels = { beginner: "入门", intermediate: "进阶", advanced: "高级" };

export default function TutorialPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categoryId, slug } = use(params);
  const category = getCategoryById(categoryId);
  if (!category) return null;

  const tutorial = category.tutorials.find(t => t.slug === slug);
  if (!tutorial) return null;

  const content = getTutorialContent(categoryId, slug);
  const currentIndex = category.tutorials.findIndex(t => t.slug === slug);
  const prevTutorial = currentIndex > 0 ? category.tutorials[currentIndex - 1] : null;
  const nextTutorial = currentIndex < category.tutorials.length - 1 ? category.tutorials[currentIndex + 1] : null;

  return (
    <LearnLayout>
      <div className="flex">
        {/* Left Sidebar */}
        <TutorialSidebar category={category} currentSlug={slug} />

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-[780px] mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4 text-[12px]">
              <Link href="/learn" className="text-blue-600 hover:text-blue-800">知识库</Link>
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <Link href={`/learn/${categoryId}`} className="text-blue-600 hover:text-blue-800">{category.name}</Link>
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <span className="text-gray-700">{tutorial.title}</span>
            </div>

            {/* Title */}
            <h1 className="text-[24px] font-bold text-gray-800 mb-2">{tutorial.title}</h1>
            <p className="text-gray-500 text-[13px] mb-4">{tutorial.description}</p>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <span className={`px-2 py-0.5 text-[10px] rounded ${difficultyColors[tutorial.difficulty]}`}>
                {difficultyLabels[tutorial.difficulty]}
              </span>
              <div className="flex items-center gap-1 text-gray-400">
                <Clock className="h-3 w-3" />
                <span className="text-[11px]">{tutorial.readTime}</span>
              </div>
            </div>

            {/* Content */}
            {content ? (
              <div className="space-y-8">
                {content.sections.map((section, i) => (
                  <Section key={i} section={section} index={i} />
                ))}

                {/* Quiz */}
                {content.quiz && content.quiz.length > 0 && (
                  <QuizSection quiz={content.quiz} />
                )}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center">
                <p className="text-gray-400 text-[13px]">本教程内容正在编写中...</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
              {prevTutorial ? (
                <Link
                  href={`/learn/${categoryId}/${prevTutorial.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-[12px]"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-400" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400">上一篇</div>
                    <div className="text-gray-700 font-medium">{prevTutorial.title}</div>
                  </div>
                </Link>
              ) : <div />}
              {nextTutorial ? (
                <Link
                  href={`/learn/${categoryId}/${nextTutorial.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-[12px]"
                >
                  <div className="text-right">
                    <div className="text-[10px] text-gray-400">下一篇</div>
                    <div className="text-gray-700 font-medium">{nextTutorial.title}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              ) : <div />}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </LearnLayout>
  );
}

function Section({
  section,
  index,
}: {
  section: { title: string; content: string; code?: string; language?: string; tip?: string; warning?: string };
  index: number;
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (section.code) {
      navigator.clipboard.writeText(section.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <h2 className="text-[18px] font-bold text-gray-800 mb-3 flex items-center gap-2">
        <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-[11px] text-blue-600 font-bold">
          {index + 1}
        </span>
        {section.title}
      </h2>

      <div className="text-[14px] leading-[1.8] text-gray-600 whitespace-pre-wrap mb-4">
        {section.content}
      </div>

      {section.code && (
        <div className="mb-4">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 rounded-t-lg">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">{section.language || "code"}</span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
              {copied ? "已复制" : "复制"}
            </button>
          </div>
          <pre className="p-4 bg-gray-900 rounded-b-lg overflow-x-auto">
            <code className="text-[13px] font-mono text-gray-200 leading-relaxed whitespace-pre">
              {section.code}
            </code>
          </pre>
        </div>
      )}

      {section.tip && (
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-[13px] text-blue-700 flex gap-2 mb-4">
          <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />
          <span>{section.tip}</span>
        </div>
      )}

      {section.warning && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-[13px] text-red-700 flex gap-2 mb-4">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
          <span>{section.warning}</span>
        </div>
      )}
    </div>
  );
}

function QuizSection({
  quiz,
}: {
  quiz: { question: string; options: string[]; answer: number; explanation: string }[];
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const q = quiz[current];

  const handleSelect = (i: number) => {
    if (showResult) return;
    setSelected(i);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (selected === q.answer ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    setCurrent(prev => (prev + 1) % quiz.length);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="mt-8">
      <h2 className="text-[18px] font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Play className="h-5 w-5 text-blue-600" />
        知识测验
      </h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Score */}
        <div className="flex items-center gap-4 mb-4 text-[12px]">
          <span className="text-gray-500">第 {current + 1}/{quiz.length} 题</span>
          <span className="text-green-600">正确 {score.correct}</span>
          <span className="text-gray-400">总题 {score.total}</span>
        </div>

        <p className="text-[14px] font-medium text-gray-800 mb-4">{q.question}</p>

        <div className="space-y-2 mb-4">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-lg text-[13px] transition-all border ${
                showResult && i === q.answer
                  ? "bg-green-50 border-green-300 text-green-700"
                  : showResult && i === selected && i !== q.answer
                    ? "bg-red-50 border-red-300 text-red-700"
                    : selected === i
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`p-3 rounded-lg mb-4 text-[13px] ${
            selected === q.answer
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}>
            <div className="flex items-center gap-1.5 mb-1">
              {selected === q.answer ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <span className="font-medium">{selected === q.answer ? "正确！" : "回答错误"}</span>
            </div>
            <p className="text-gray-600">{q.explanation}</p>
          </div>
        )}

        <div className="flex justify-end gap-2">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-[12px] font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              提交答案
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-[12px] font-medium hover:bg-blue-700 transition-colors"
            >
              下一题
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
