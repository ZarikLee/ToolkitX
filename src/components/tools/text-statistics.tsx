"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const statsHelp = [
  { title: "功能说明", items: ["统计文本信息", "显示字符数、单词数、行数等", "估算阅读时间"] },
  { title: "使用方法", items: ["粘贴或输入文本", "查看实时统计信息"] },
];

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  lines: number;
  paragraphs: number;
  readingTime: string;
}

function analyzeText(text: string): TextStats {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
  const lines = text ? text.split("\n").length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;

  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);
  const readingTime = minutes < 1 ? "不到 1 分钟" : `${minutes} 分钟`;

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    lines,
    paragraphs,
    readingTime,
  };
}

export function TextStatistics() {
  const [input, setInput] = useState("");
  const stats = analyzeText(input);

  const statItems = [
    { label: "字符数", value: stats.characters.toLocaleString() },
    { label: "字符数 (不含空格)", value: stats.charactersNoSpaces.toLocaleString() },
    { label: "单词数", value: stats.words.toLocaleString() },
    { label: "句子数", value: stats.sentences.toLocaleString() },
    { label: "行数", value: stats.lines.toLocaleString() },
    { label: "段落数", value: stats.paragraphs.toLocaleString() },
    { label: "阅读时间", value: stats.readingTime },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">文本统计分析</h2>
          <InlineHelp content={statsHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          分析文本的字符、单词、句子等统计信息
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">输入文本</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-apple mt-1"
          rows={8}
          placeholder="粘贴或输入要分析的文本..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {statItems.map((item) => (
          <div key={item.label} className="p-4 glass rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
            <p className="text-xl font-mono font-medium">{item.value}</p>
          </div>
        ))}
      </div>

      {input && (
        <div className="p-4 glass rounded-xl">
          <h3 className="text-sm font-medium mb-3">文本分布</h3>
          <div className="space-y-2 text-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">字母</span>
                <span>{((input.match(/[a-zA-Z]/g) || []).length / input.length * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-blue-500"
                  style={{ width: `${(input.match(/[a-zA-Z]/g) || []).length / input.length * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">数字</span>
                <span>{((input.match(/[0-9]/g) || []).length / input.length * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-green-500"
                  style={{ width: `${(input.match(/[0-9]/g) || []).length / input.length * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">空格</span>
                <span>{((input.match(/\s/g) || []).length / input.length * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-yellow-500"
                  style={{ width: `${(input.match(/\s/g) || []).length / input.length * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">特殊字符</span>
                <span>{((input.match(/[^a-zA-Z0-9\s]/g) || []).length / input.length * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-red-500"
                  style={{ width: `${(input.match(/[^a-zA-Z0-9\s]/g) || []).length / input.length * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
