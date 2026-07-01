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
import LearnLayout, { CategoryNav, TutorialSidebar } from "@/components/learn/layout";
import { getCategoryById } from "@/data/tutorials";
import { getTutorialContent } from "@/data/tutorials/content";

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
    <LearnLayout category={category}>
      {/* Top Nav: All categories */}
      <CategoryNav activeId={categoryId} />

      <div className="flex">
        {/* Left Sidebar: Tutorials for this category */}
        <TutorialSidebar category={category} currentSlug={slug} />

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-6 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--on-surface)" }}>{tutorial.title}</h1>
            <p className="text-sm mb-3" style={{ color: "var(--on-surface-variant)" }}>{tutorial.description}</p>
            <div className="flex items-center gap-3 text-xs" style={{ color: "var(--outline)" }}>
              <span>{tutorial.readTime}</span>
              <span>·</span>
              <span style={{ color: "var(--secondary)" }}>{tutorial.difficulty === "beginner" ? "入门" : tutorial.difficulty === "intermediate" ? "进阶" : "高级"}</span>
            </div>
          </div>

          {/* Content */}
          {content ? (
            <article className="space-y-10">
              {content.sections.map((section, i) => (
                <Section key={i} section={section} index={i} />
              ))}

              {/* Quiz */}
              {content.quiz && content.quiz.length > 0 && (
                <QuizSection quiz={content.quiz} />
              )}

              {/* Next Lesson CTA */}
              {nextTutorial && (
                <div className="pt-6 border-t" style={{ borderColor: "var(--outline-variant)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs" style={{ color: "var(--outline)" }}>下一节</span>
                      <p className="text-sm font-medium" style={{ color: "var(--on-surface)" }}>{nextTutorial.title}</p>
                    </div>
                    <Link
                      href={`/learn/${categoryId}/${nextTutorial.slug}`}
                      className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium"
                      style={{ background: "var(--secondary)", color: "var(--on-secondary)" }}
                    >
                      下一节 <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </article>
          ) : (
            <div className="rounded-lg border p-12 text-center" style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
              <p className="text-sm" style={{ color: "var(--outline)" }}>本教程内容正在编写中...</p>
            </div>
          )}

          {/* Prev/Next Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: "var(--outline-variant)" }}>
            {prevTutorial ? (
              <Link
                href={`/learn/${categoryId}/${prevTutorial.slug}`}
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--on-surface-variant)" }}
              >
                <ChevronLeft className="w-4 h-4" />
                <div>
                  <div className="text-xs" style={{ color: "var(--outline)" }}>上一篇</div>
                  <div className="font-medium" style={{ color: "var(--on-surface)" }}>{prevTutorial.title}</div>
                </div>
              </Link>
            ) : <div />}
            {nextTutorial ? (
              <Link
                href={`/learn/${categoryId}/${nextTutorial.slug}`}
                className="flex items-center gap-2 text-sm text-right"
                style={{ color: "var(--on-surface-variant)" }}
              >
                <div>
                  <div className="text-xs" style={{ color: "var(--outline)" }}>下一篇</div>
                  <div className="font-medium" style={{ color: "var(--on-surface)" }}>{nextTutorial.title}</div>
                </div>
                <ChevronRight className="w-4 h-4" />
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
      <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--on-surface)" }}>
        {String(index + 1).padStart(2, "0")}. {section.title}
      </h2>

      <div className="text-sm leading-relaxed whitespace-pre-wrap mb-4" style={{ color: "var(--on-surface-variant)" }}>
        {section.content}
      </div>

      {section.code && (
        <div className="rounded-lg border overflow-hidden mb-4" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
          <div className="flex items-center justify-between px-3 py-1.5 border-b" style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-low)" }}>
            <span className="text-xs" style={{ color: "var(--outline)" }}>{section.language || "code"}</span>
            <button
              onClick={copyCode}
              className="text-xs flex items-center gap-1 transition-colors"
              style={{ color: copied ? "var(--tertiary)" : "var(--outline)" }}
            >
              {copied ? "已复制" : "复制"}
            </button>
          </div>
          <pre className="p-4 text-sm leading-relaxed overflow-x-auto font-mono" style={{ color: "var(--on-surface)" }}>
            <code className="whitespace-pre">{section.code}</code>
          </pre>
        </div>
      )}

      {section.tip && (
        <div className="flex gap-2 p-3 rounded text-sm mb-4" style={{ background: "color-mix(in srgb, var(--tertiary) 10%, transparent)", color: "var(--tertiary)" }}>
          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
          {section.tip}
        </div>
      )}

      {section.warning && (
        <div className="flex gap-2 p-3 rounded text-sm mb-4" style={{ background: "color-mix(in srgb, var(--error) 10%, transparent)", color: "var(--error)" }}>
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          {section.warning}
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
  const [wrongAnswers, setWrongAnswers] = useState<Array<{ question: string; userAnswer: number; correctAnswer: number; explanation: string }>>([]);
  const [finished, setFinished] = useState(false);

  const q = quiz[current];
  const lastQuestion = current === quiz.length - 1;

  const handleSelect = (i: number) => {
    if (showResult) return;
    setSelected(i);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowResult(true);
    const isCorrect = selected === q.answer;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    if (!isCorrect) {
      setWrongAnswers(prev => [...prev, {
        question: q.question,
        userAnswer: selected,
        correctAnswer: q.answer,
        explanation: q.explanation,
      }]);
    }
  };

  const handleNext = () => {
    if (lastQuestion) {
      setFinished(true);
    } else {
      setCurrent(prev => prev + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  if (finished) {
    return (
      <div className="pt-6 border-t" style={{ borderColor: "var(--outline-variant)" }}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--on-surface)" }}>知识测验</h2>
        <div className="rounded-lg border p-4" style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
          <div className="text-center mb-4">
            <p className="text-xl font-bold mb-1" style={{ color: "var(--on-surface)" }}>
              {score.correct}/{score.total} 正确
            </p>
            <p className="text-sm" style={{ color: "var(--outline)" }}>
              {score.correct === score.total ? "全部答对，太强了！" :
               score.correct >= score.total * 0.7 ? "还不错，继续加油！" :
               "多复习一下，下次会更好！"}
            </p>
          </div>
          {wrongAnswers.length > 0 && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--outline-variant)" }}>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--error)" }}>
                错题回顾 ({wrongAnswers.length} 题)
              </h3>
              <div className="space-y-3">
                {wrongAnswers.map((w, i) => (
                  <div key={i} className="p-3 rounded text-sm" style={{ background: "color-mix(in srgb, var(--error) 6%, transparent)", color: "var(--on-surface)" }}>
                    <p className="font-medium mb-1">{i + 1}. {w.question}</p>
                    <p className="mb-1">
                      <span style={{ color: "var(--error)" }}>你的答案：{String.fromCharCode(65 + w.userAnswer)}. {quiz.find(q => q.question === w.question)?.options[w.userAnswer]}</span>
                    </p>
                    <p className="mb-1">
                      <span style={{ color: "var(--tertiary)" }}>正确答案：{String.fromCharCode(65 + w.correctAnswer)}. {quiz.find(q => q.question === w.question)?.options[w.correctAnswer]}</span>
                    </p>
                    <p style={{ color: "var(--outline)" }}>{w.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {wrongAnswers.length === 0 && (
            <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: "var(--outline-variant)", color: "var(--tertiary)" }}>
              <CheckCircle className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm font-medium">完美！没有错题。</p>
            </div>
          )}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => { setCurrent(0); setSelected(null); setShowResult(false); setFinished(false); setWrongAnswers([]); setScore({ correct: 0, total: 0 }); }}
              className="px-4 py-2 rounded text-sm font-medium"
              style={{ background: "var(--secondary)", color: "var(--on-secondary)" }}
            >
              重新测验
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6 border-t" style={{ borderColor: "var(--outline-variant)" }}>
      <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--on-surface)" }}>知识测验</h2>

      <div className="rounded-lg border p-4" style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
        <div className="flex items-center gap-3 mb-4 text-xs" style={{ color: "var(--outline)" }}>
          <span>第 {current + 1}/{quiz.length} 题</span>
          <span style={{ color: "var(--tertiary)" }}>正确 {score.correct}</span>
        </div>

        <p className="text-sm font-medium mb-4" style={{ color: "var(--on-surface)" }}>{q.question}</p>

        <div className="space-y-2 mb-4">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="w-full text-left text-sm p-2.5 rounded border transition-colors"
              style={{
                borderColor: showResult && i === q.answer ? "var(--tertiary)" :
                  showResult && i === selected && i !== q.answer ? "var(--error)" :
                  selected === i ? "var(--secondary)" : "var(--outline-variant)",
                background: showResult && i === q.answer ? "color-mix(in srgb, var(--tertiary) 10%, transparent)" :
                  showResult && i === selected && i !== q.answer ? "color-mix(in srgb, var(--error) 10%, transparent)" :
                  selected === i ? "color-mix(in srgb, var(--secondary) 10%, transparent)" : "transparent",
                color: "var(--on-surface)",
              }}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>

        {showResult && (
          <div
            className="p-3 rounded text-sm mb-4"
            style={{
              background: selected === q.answer ? "color-mix(in srgb, var(--tertiary) 10%, transparent)" : "color-mix(in srgb, var(--error) 10%, transparent)",
              color: selected === q.answer ? "var(--tertiary)" : "var(--error)",
            }}
          >
            <div className="flex items-center gap-1 mb-1 font-bold">
              {selected === q.answer ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {selected === q.answer ? "正确！" : "回答错误"}
            </div>
            <p style={{ color: "var(--on-surface-variant)" }}>{q.explanation}</p>
          </div>
        )}

        <div className="flex justify-end">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className="px-4 py-2 rounded text-sm font-medium disabled:opacity-40"
              style={{ background: "var(--secondary)", color: "var(--on-secondary)" }}
            >
              提交答案
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded text-sm font-medium"
              style={{ background: "var(--secondary)", color: "var(--on-secondary)" }}
            >
               {lastQuestion ? "查看结果" : "下一题"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
