"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const textDiffHelp = [
  { title: "功能说明", items: ["比较两段文本的差异", "高亮显示新增和删除内容"] },
  { title: "使用方法", items: ["在左侧输入原始文本", "在右侧输入修改后文本", "查看差异结果"] },
];

interface DiffLine {
  type: "equal" | "added" | "removed";
  content: string;
}

function computeDiff(text1: string, text2: string): DiffLine[] {
  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");
  const result: DiffLine[] = [];

  const maxLen = Math.max(lines1.length, lines2.length);

  for (let i = 0; i < maxLen; i++) {
    const line1 = lines1[i];
    const line2 = lines2[i];

    if (line1 === line2) {
      result.push({ type: "equal", content: line1 || "" });
    } else {
      if (line1 !== undefined) {
        result.push({ type: "removed", content: line1 });
      }
      if (line2 !== undefined) {
        result.push({ type: "added", content: line2 });
      }
    }
  }

  return result;
}

export function TextDiff() {
  const [text1, setText1] = useState("Hello World\nThis is a test\nKeep this line\nGoodbye");
  const [text2, setText2] = useState("Hello World\nThis is a modified test\nNew line added\nGoodbye!");
  const [diffs, setDiffs] = useState<DiffLine[]>([]);
  const [showDiff, setShowDiff] = useState(false);

  const compare = () => {
    setDiffs(computeDiff(text1, text2));
    setShowDiff(true);
  };

  const addedCount = diffs.filter((d) => d.type === "added").length;
  const removedCount = diffs.filter((d) => d.type === "removed").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">文本差异比较</h2>
          <InlineHelp content={textDiffHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          比较两段文本的差异，高亮显示修改内容
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">原始文本</label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="input-apple mt-1 font-mono"
            rows={10}
            placeholder="输入原始文本"
          />
        </div>
        <div>
          <label className="text-sm font-medium">修改后文本</label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="input-apple mt-1 font-mono"
            rows={10}
            placeholder="输入修改后文本"
          />
        </div>
      </div>

      <button
        onClick={compare}
        className="btn-primary"
      >
        比较
      </button>

      {showDiff && (
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-400">+{addedCount} 新增</span>
            <span className="text-red-400">-{removedCount} 删除</span>
          </div>

          <div className="p-4 glass rounded-xl font-mono text-sm overflow-x-auto">
            {diffs.map((diff, i) => (
              <div
                key={i}
                className={`flex ${
                  diff.type === "added"
                    ? "bg-green-500/10 text-green-400"
                    : diff.type === "removed"
                    ? "bg-red-500/10 text-red-400"
                    : ""
                }`}
              >
                <span className="w-8 text-right pr-2 text-muted-foreground select-none shrink-0">
                  {diff.type === "added" ? "+" : diff.type === "removed" ? "-" : " "}
                </span>
                <span className="whitespace-pre-wrap">{diff.content || " "}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!showDiff && (
        <div className="p-4 glass rounded-xl text-center text-sm text-muted-foreground">
          点击「比较」查看差异
        </div>
      )}
    </div>
  );
}
