"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import LearnLayout, { TutorialSidebar } from "@/components/learn/layout";
import { getCategoryById } from "@/data/tutorials";
import { getTutorialContent } from "@/data/tutorials/content";

const difficultyConfig = {
  beginner: { label: "入门", color: "var(--tertiary)", bg: "color-mix(in srgb, var(--tertiary) 10%, transparent)" },
  intermediate: { label: "进阶", color: "var(--primary)", bg: "color-mix(in srgb, var(--border-glow) 10%, transparent)" },
  advanced: { label: "高级", color: "var(--error)", bg: "color-mix(in srgb, var(--error) 10%, transparent)" },
};

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
        <main className="flex-1 min-w-0 overflow-y-auto px-6 py-8 max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-8 font-['Geist'] text-[14px]" style={{ color: "var(--outline)" }}>
            <Link href="/learn" className="hover:text-[var(--primary)] transition-colors">文库</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <Link href={`/learn/${categoryId}`} className="hover:text-[var(--primary)] transition-colors">{category.name}</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span className="text-[var(--primary)]">{tutorial.title}</span>
          </div>

          {/* Header */}
          <section className="mb-16">
            <h1 className="text-[32px] font-bold mb-4" style={{ color: "var(--primary)" }}>{tutorial.title}</h1>
            <p className="text-[18px] max-w-2xl mb-8" style={{ color: "var(--on-surface-variant)" }}>
              {tutorial.description}
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--outline-variant)]" style={{ background: "var(--surface-container-high)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                <span className="font-['Geist'] text-[12px]" style={{ color: "var(--outline)" }}>{tutorial.readTime}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--outline-variant)]" style={{ background: "var(--surface-container-high)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--tertiary)" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span className="font-['Geist'] text-[12px]" style={{ color: "var(--outline)" }}>EXP: +450</span>
              </div>
              <span className="tag-neon" style={{ color: difficultyConfig[tutorial.difficulty].color, borderColor: `${difficultyConfig[tutorial.difficulty].color}40`, background: difficultyConfig[tutorial.difficulty].bg }}>
                {difficultyConfig[tutorial.difficulty].label}
              </span>
            </div>
            <div className="progress-beam w-full mt-6" />
          </section>

          {/* Content */}
          {content ? (
            <article className="space-y-12">
              {content.sections.map((section, i) => (
                <Section key={i} section={section} index={i} />
              ))}

              {/* Quiz */}
              {content.quiz && content.quiz.length > 0 && (
                <QuizSection quiz={content.quiz} />
              )}

              {/* Next Lesson CTA */}
              {nextTutorial && (
                <div className="pt-8 border-t border-[var(--outline-variant)]">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-['Geist'] tracking-[0.15em] uppercase" style={{ color: "var(--outline)" }}>下一节</span>
                      <span className="font-['Geist'] text-[var(--primary)]">{nextTutorial.title}</span>
                    </div>
                    <Link
                      href={`/learn/${categoryId}/${nextTutorial.slug}`}
                      className="flex items-center gap-3 px-8 py-4 border-2 border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-[var(--surface-container-lowest)] transition-all group"
                    >
                      下一节: {nextTutorial.title}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              )}
            </article>
          ) : (
            <div className="glass-card p-16 text-center">
              <p className="font-['Geist'] text-[14px]" style={{ color: "var(--outline)" }}>本教程内容正在编写中...</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--outline-variant)]">
            {prevTutorial ? (
              <Link
                href={`/learn/${categoryId}/${prevTutorial.slug}`}
                className="flex items-center gap-3 px-5 py-3 glass-card group"
              >
                <ChevronLeft className="h-5 w-5 text-[var(--outline)] group-hover:text-[var(--primary)] transition-colors" />
                <div className="text-left">
                  <div className="text-[10px] font-['Geist'] tracking-widest uppercase" style={{ color: "var(--outline)" }}>上一篇</div>
                  <div className="text-[14px] font-medium group-hover:text-[var(--primary)] transition-colors" style={{ color: "var(--primary)" }}>{prevTutorial.title}</div>
                </div>
              </Link>
            ) : <div />}
            {nextTutorial ? (
              <Link
                href={`/learn/${categoryId}/${nextTutorial.slug}`}
                className="flex items-center gap-3 px-5 py-3 glass-card group"
              >
                <div className="text-right">
                  <div className="text-[10px] font-['Geist'] tracking-widest uppercase" style={{ color: "var(--outline)" }}>下一篇</div>
                  <div className="text-[14px] font-medium group-hover:text-[var(--primary)] transition-colors" style={{ color: "var(--primary)" }}>{nextTutorial.title}</div>
                </div>
                <ChevronRight className="h-5 w-5 text-[var(--outline)] group-hover:text-[var(--primary)] transition-colors" />
              </Link>
            ) : <div />}
          </div>
        </main>
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
      {/* Section Heading */}
      <h2 className="text-[24px] font-semibold mb-4 section-heading" style={{ color: "var(--primary)" }}>
        {String(index + 1).padStart(2, "0")}. {section.title}
      </h2>

      {/* Content Text */}
      <div className="text-[16px] leading-[1.8] whitespace-pre-wrap mb-6" style={{ color: "var(--on-surface-variant)" }}>
        {section.content}
      </div>

      {/* Code Block - Terminal Style */}
      {section.code && (
        <div className="relative group mb-6">
          <div className="absolute -inset-0.5 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000" style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--border-glow) 20%, transparent), transparent)" }} />
          <div className="relative rounded-xl border border-[var(--outline-variant)] overflow-hidden code-glow code-block" style={{ background: "var(--surface-container-lowest)" }}>
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--outline-variant)]" style={{ background: "var(--surface-container-highest)" }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "color-mix(in srgb, var(--error) 50%, transparent)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "color-mix(in srgb, var(--tertiary) 50%, transparent)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "color-mix(in srgb, var(--border-glow) 50%, transparent)" }} />
              </div>
              <span className="font-['Geist'] text-[12px] uppercase tracking-[0.15em]" style={{ color: "var(--outline)" }}>
                {section.language || "code"}
              </span>
              <button
                onClick={copyCode}
                className="font-['Geist'] text-[12px] flex items-center gap-1 transition-colors"
                style={{ color: copied ? "var(--tertiary)" : "var(--outline)" }}
              >
                {copied ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                    已复制
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    复制
                  </>
                )}
              </button>
            </div>
            {/* Code Content */}
            <pre className="p-6 font-['Geist'] text-[14px] leading-relaxed overflow-x-auto" style={{ color: "var(--on-surface)" }}>
              <code className="whitespace-pre">{section.code}</code>
            </pre>
            {/* Scanline overlay on hover */}
            <div className="code-block-scanline" />
          </div>
        </div>
      )}

      {/* Tip Box */}
      {section.tip && (
        <div className="flex gap-3 mb-6 tip-box">
          <Lightbulb className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "var(--tertiary)" }} />
          <span className="text-[14px]" style={{ color: "var(--tertiary)" }}>{section.tip}</span>
        </div>
      )}

      {/* Warning Box */}
      {section.warning && (
        <div className="flex gap-3 mb-6 warning-box">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "var(--error)" }} />
          <span className="text-[14px]" style={{ color: "var(--error)" }}>{section.warning}</span>
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
    <div className="mt-12 pt-8 border-t border-[var(--outline-variant)]">
      <h2 className="text-[24px] font-semibold mb-6 section-heading flex items-center gap-3" style={{ color: "var(--primary)" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        知识测验
      </h2>

      <div className="glass-card p-6">
        {/* Score */}
        <div className="flex items-center gap-4 mb-6 font-['Geist'] text-[12px]">
          <span style={{ color: "var(--outline)" }}>第 {current + 1}/{quiz.length} 题</span>
          <span style={{ color: "var(--tertiary)" }}>正确 {score.correct}</span>
          <span style={{ color: "var(--outline)" }}>总题 {score.total}</span>
        </div>

        <p className="text-[16px] font-medium mb-6" style={{ color: "var(--primary)" }}>{q.question}</p>

        <div className="space-y-3 mb-6">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`quiz-option w-full font-['Geist'] text-[14px] ${
                showResult && i === q.answer
                  ? "correct"
                  : showResult && i === selected && i !== q.answer
                    ? "wrong"
                    : selected === i
                      ? "selected"
                      : ""
              }`}
            >
              <span className="font-bold mr-3" style={{ color: showResult && i === q.answer ? "var(--tertiary)" : showResult && i === selected ? "var(--error)" : selected === i ? "var(--primary)" : "var(--outline)" }}>
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`p-4 mb-6 text-[14px] ${selected === q.answer ? "tip-box" : "warning-box"}`}>
            <div className="flex items-center gap-2 mb-1 font-bold">
              {selected === q.answer ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              {selected === q.answer ? "正确！" : "回答错误"}
            </div>
            <p style={{ color: "var(--on-surface-variant)" }}>{q.explanation}</p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className="neon-btn disabled:opacity-40 disabled:cursor-not-allowed"
            >
              提交答案
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="neon-btn"
            >
              下一题
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
