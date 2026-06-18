"use client";

import { useState, useEffect } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const encodingHelp = [
  { title: "功能说明", items: ["Base64 编码/解码", "URL 编码/解码", "HTML 实体转义/反转义"] },
  { title: "使用方法", items: ["选择编码类型（Base64/URL/HTML）", "在左侧输入文本", "点击「编码」或「解码」", "结果在右侧显示"] },
];

type EncodingType = "base64" | "url" | "html";

const STORAGE_KEY = "tools_encoding";

export function EncodingTool() {
  const [input, setInput] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).input || "" : "";
    }
    return "";
  });
  const [output, setOutput] = useState("");
  const [encodingType, setEncodingType] = useState<EncodingType>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).encodingType || "base64" : "base64";
    }
    return "base64";
  });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ input, encodingType }));
  }, [input, encodingType]);

  const encode = () => {
    try {
      let result = "";
      if (encodingType === "base64") {
        result = btoa(unescape(encodeURIComponent(input)));
      } else if (encodingType === "url") {
        result = encodeURIComponent(input);
      } else if (encodingType === "html") {
        result = input
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }
      setOutput(result);
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const decode = () => {
    try {
      let result = "";
      if (encodingType === "base64") {
        result = decodeURIComponent(escape(atob(input)));
      } else if (encodingType === "url") {
        result = decodeURIComponent(input);
      } else if (encodingType === "html") {
        result = input
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'");
      }
      setOutput(result);
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
          <h2 className="text-lg font-semibold">编解码工具</h2>
          <InlineHelp content={encodingHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          Base64、URL、HTML 编码和解码
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">编码类型</label>
        <div className="flex gap-2 mt-1">
          {(["base64", "url", "html"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setEncodingType(type)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                encodingType === type
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">输入</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-apple mt-1 font-mono"
            rows={10}
            placeholder="输入要编码/解码的文本"
          />
        </div>
        <div>
          <label className="text-sm font-medium">输出</label>
          <textarea
            value={output}
            readOnly
            className="input-apple mt-1 font-mono bg-white/5"
            rows={10}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={encode}
          className="btn-apple bg-primary text-primary-foreground"
        >
          编码
        </button>
        <button
          onClick={decode}
          className="btn-apple bg-white/5 hover:bg-white/10"
        >
          解码
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="btn-apple bg-white/5 hover:bg-white/10 disabled:opacity-50"
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
