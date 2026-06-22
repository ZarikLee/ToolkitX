"use client";

import { useState, useEffect } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const jsonHelp = [
  { title: "功能说明", items: ["格式化 JSON 字符串（美化/压缩）", "验证 JSON 格式是否正确"] },
  { title: "使用方法", items: ["在左侧粘贴 JSON 字符串", "点击「格式化」美化或「压缩」缩小", "格式化后的结果在右侧显示"] },
];

const STORAGE_KEY = "tools_json";

export function JsonTool() {
  const [input, setInput] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).input || "" : "";
    }
    return "";
  });
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ input }));
  }, [input]);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">JSON 格式化</h2>
          <InlineHelp content={jsonHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          格式化、压缩、验证 JSON 数据
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">输入</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-apple mt-1 font-mono"
            rows={15}
            placeholder='{"key": "value"}'
          />
        </div>
        <div>
          <label className="text-sm font-medium">输出</label>
          <textarea
            value={output}
            readOnly
            className="input-apple mt-1 font-mono bg-white/5"
            rows={15}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={format}
          className="btn-primary"
        >
          格式化
        </button>
        <button
          onClick={minify}
          className="btn-secondary"
        >
          压缩
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="btn-secondary disabled:opacity-50"
        >
          复制
        </button>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-xl text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
