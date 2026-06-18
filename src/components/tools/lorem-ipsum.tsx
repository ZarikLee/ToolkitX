"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const loremHelp = [
  { title: "功能说明", items: ["生成 Lorem Ipsum 占位文本", "支持按段落、句子或单词生成"] },
  { title: "使用方法", items: ["选择生成类型", "设置数量", "点击「生成」", "复制生成的文本"] },
];

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum",
];

const typeLabels: Record<string, string> = {
  paragraphs: "段落",
  sentences: "句子",
  words: "单词",
};

function generateWords(count: number): string {
  return Array.from({ length: count }, () =>
    loremWords[Math.floor(Math.random() * loremWords.length)]
  ).join(" ");
}

function generateSentences(count: number): string {
  return Array.from({ length: count }, () => {
    const sentenceLength = Math.floor(Math.random() * 10) + 5;
    const sentence = generateWords(sentenceLength);
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
  }).join(" ");
}

function generateParagraphs(count: number): string {
  return Array.from({ length: count }, () => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3;
    return generateSentences(sentenceCount);
  }).join("\n\n");
}

export function LoremIpsum() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const generate = () => {
    switch (type) {
      case "paragraphs":
        setOutput(generateParagraphs(count));
        break;
      case "sentences":
        setOutput(generateSentences(count));
        break;
      case "words":
        setOutput(generateWords(count));
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">Lorem Ipsum 生成器</h2>
          <InlineHelp content={loremHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          生成 Lorem Ipsum 占位文本
        </p>
      </div>

      <div className="flex gap-4">
        <div>
          <label className="text-sm font-medium">生成类型</label>
          <div className="flex gap-2 mt-1">
            {(["paragraphs", "sentences", "words"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  type === t
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {typeLabels[t]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">数量</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="input-apple font-mono w-20"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={generate}
          className="btn-apple bg-primary text-primary-foreground"
        >
          生成
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="btn-apple bg-white/5 hover:bg-white/10 disabled:opacity-50"
        >
          复制
        </button>
      </div>

      {output && (
        <div className="p-4 glass rounded-xl">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {output}
          </p>
        </div>
      )}
    </div>
  );
}
