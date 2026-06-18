"use client";

import { useState } from "react";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = "plaintext",
  readOnly = false,
  height = "400px",
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const extensions: Record<string, string> = {
      javascript: ".js",
      typescript: ".ts",
      python: ".py",
      bash: ".sh",
      sql: ".sql",
      json: ".json",
      yaml: ".yml",
      nginx: ".conf",
      dockerfile: "Dockerfile",
    };

    const ext = extensions[language] || ".txt";
    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-black/20">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <span className="text-[11px] text-muted-foreground/60 uppercase tracking-wider font-medium">
          {language}
        </span>
        <div className="flex gap-1">
          <button
            onClick={copyToClipboard}
            className="px-2.5 py-1 text-[11px] font-medium bg-white/[0.06] hover:bg-white/[0.1] text-foreground rounded-md transition-all duration-200"
          >
            {copied ? "已复制" : "复制"}
          </button>
          <button
            onClick={download}
            className="px-2.5 py-1 text-[11px] font-medium bg-white/[0.06] hover:bg-white/[0.1] text-foreground rounded-md transition-all duration-200"
          >
            下载
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        className="w-full p-4 font-mono text-[13px] bg-transparent resize-none focus:outline-none text-foreground/90 leading-relaxed"
        style={{ height, minHeight: "200px" }}
        spellCheck={false}
      />
    </div>
  );
}
