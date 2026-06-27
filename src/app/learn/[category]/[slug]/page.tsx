"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Clock,
  Copy,
  Check,
  Play,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { categories, getCategoryById } from "@/data/tutorials";
import { getTutorialContent, type TutorialContent } from "@/data/tutorials/content";

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-500 border-red-500/20",
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
    <div className="flex h-[calc(100vh-57px)]">
      {/* Sidebar */}
      <aside className="w-[260px] border-r border-white/[0.06] overflow-y-auto shrink-0 hidden lg:block">
        <div className="p-4">
          <Link href={`/learn/${categoryId}`} className="flex items-center gap-1.5 text-[12px] text-muted-foreground/60 hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="h-3 w-3" />
            {category.icon} {category.name}
          </Link>

          <div className="space-y-0.5">
            {category.tutorials.map((t, i) => (
              <Link
                key={t.slug}
                href={`/learn/${categoryId}/${t.slug}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-all ${
                  t.slug === slug
                    ? "bg-[#0a84ff]/10 text-[#0a84ff] font-medium"
                    : "text-muted-foreground/60 hover:bg-white/[0.04] hover:text-foreground"
                }`}
              >
                <span className="w-4 text-[10px] text-muted-foreground/30 shrink-0">{i + 1}</span>
                <span className="truncate">{t.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[800px] mx-auto px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-[12px]">
            <Link href="/learn" className="text-muted-foreground/50 hover:text-foreground transition-colors">知识库</Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/30" />
            <Link href={`/learn/${categoryId}`} className="text-muted-foreground/50 hover:text-foreground transition-colors">{category.name}</Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/30" />
            <span className="text-foreground/70">{tutorial.title}</span>
          </div>

          {/* Title */}
          <h1 className="text-[26px] font-bold mb-2">{tutorial.title}</h1>
          <p className="text-muted-foreground text-[13px] mb-4">{tutorial.description}</p>

          <div className="flex items-center gap-3 mb-8">
            <span className={`px-2 py-0.5 text-[10px] rounded border ${difficultyColors[tutorial.difficulty]}`}>
              {difficultyLabels[tutorial.difficulty]}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground/40">
              <Clock className="h-3 w-3" />
              <span className="text-[11px]">{tutorial.readTime}</span>
            </div>
          </div>

          {/* Content Sections */}
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
            <div className="glass rounded-xl p-8 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground/20" />
              <p className="text-muted-foreground/50 text-[13px]">本教程内容正在编写中...</p>
              <p className="text-muted-foreground/30 text-[11px] mt-1">敬请期待</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/[0.06]">
            {prevTutorial ? (
              <Link
                href={`/learn/${categoryId}/${prevTutorial.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-all text-[12px]"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <div className="text-left">
                  <div className="text-muted-foreground/40 text-[10px]">上一篇</div>
                  <div className="text-foreground/70">{prevTutorial.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextTutorial ? (
              <Link
                href={`/learn/${categoryId}/${nextTutorial.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-all text-[12px]"
              >
                <div className="text-right">
                  <div className="text-muted-foreground/40 text-[10px]">下一篇</div>
                  <div className="text-foreground/70">{nextTutorial.title}</div>
                </div>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({ section, index }: { section: { title: string; content: string; code?: string; language?: string; tip?: string; warning?: string }; index: number }) {
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
      <h2 className="text-[18px] font-semibold mb-3 flex items-center gap-2">
        <span className="w-6 h-6 rounded-md bg-[#0a84ff]/10 flex items-center justify-center text-[11px] text-[#0a84ff] font-bold">
          {index + 1}
        </span>
        {section.title}
      </h2>

      <div className="text-[13px] leading-relaxed text-foreground/70 whitespace-pre-wrap mb-4">
        {section.content}
      </div>

      {section.code && (
        <div className="relative mb-4">
          <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0a] rounded-t-xl border border-white/[0.06] border-b-0">
            <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider">{section.language || "code"}</span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1 text-[10px] text-muted-foreground/40 hover:text-foreground/60 transition-colors"
            >
              {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              {copied ? "已复制" : "复制"}
            </button>
          </div>
          <pre className="p-4 bg-[#0a0a0a] rounded-b-xl border border-white/[0.06] border-t-0 overflow-x-auto">
            <code className="text-[12px] font-mono text-foreground/70 leading-relaxed whitespace-pre">
              {section.code}
            </code>
          </pre>
        </div>
      )}

      {section.tip && (
        <div className="p-3 rounded-xl bg-[#0a84ff]/5 border border-[#0a84ff]/10 text-[12px] text-[#0a84ff]/80 flex gap-2 mb-4">
          <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{section.tip}</span>
        </div>
      )}

      {section.warning && (
        <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-[12px] text-red-500/80 flex gap-2 mb-4">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{section.warning}</span>
        </div>
      )}
    </div>
  );
}

function QuizSection({ quiz }: { quiz: { question: string; options: string[]; answer: number; explanation: string }[] }) {
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
      <h2 className="text-[18px] font-semibold mb-4 flex items-center gap-2">
        <Play className="h-5 w-5 text-[#0a84ff]" />
        知识测验
      </h2>

      <div className="glass rounded-xl p-6">
        {/* Score */}
        <div className="flex items-center gap-4 mb-4 text-[12px]">
          <span className="text-muted-foreground/50">第 {current + 1}/{quiz.length} 题</span>
          <span className="text-green-500">正确 {score.correct}</span>
          <span className="text-muted-foreground/40">总题 {score.total}</span>
        </div>

        <p className="text-[14px] font-medium mb-4">{q.question}</p>

        <div className="space-y-2 mb-4">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-xl text-[13px] transition-all border ${
                showResult && i === q.answer
                  ? "bg-green-500/10 border-green-500/30 text-green-500"
                  : showResult && i === selected && i !== q.answer
                    ? "bg-red-500/10 border-red-500/30 text-red-500"
                    : selected === i
                      ? "bg-[#0a84ff]/10 border-[#0a84ff]/30 text-[#0a84ff]"
                      : "bg-white/[0.02] border-white/[0.06] text-foreground/70 hover:bg-white/[0.04]"
              }`}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`p-3 rounded-xl mb-4 text-[12px] ${
            selected === q.answer
              ? "bg-green-500/10 border border-green-500/20 text-green-500"
              : "bg-red-500/10 border border-red-500/20 text-red-500"
          }`}>
            <div className="flex items-center gap-1.5 mb-1">
              {selected === q.answer ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
              <span className="font-medium">{selected === q.answer ? "正确！" : "回答错误"}</span>
            </div>
            <p className="text-foreground/50">{q.explanation}</p>
          </div>
        )}

        <div className="flex justify-end gap-2">
          {!showResult ? (
            <button onClick={handleSubmit} disabled={selected === null} className="btn-primary text-[12px] disabled:opacity-50">
              提交答案
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary text-[12px]">
              下一题
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
