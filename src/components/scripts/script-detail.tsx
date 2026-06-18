"use client";

import { useState } from "react";
import { Script } from "@/data/python-scripts";

interface ScriptDetailProps {
  script: Script;
  onClose: () => void;
}

export function ScriptDetail({ script, onClose }: ScriptDetailProps) {
  const [showHelp, setShowHelp] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script.code);
  };

  const downloadScript = () => {
    const ext = script.tags.includes("Shell") ? ".sh" :
                script.tags.includes("SQL") ? ".sql" : ".py";
    
    const blob = new Blob([script.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${script.id}${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
    >
      <div
        className="glass-heavy rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-[0_16px_48px_rgba(0,0,0,0.5)] animate-scale-in mx-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-[16px] font-semibold tracking-tight">
                {script.name}
              </h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                {script.description}
              </p>
            </div>
            {script.help && script.help.length > 0 && (
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="flex items-center justify-center w-6 h-6 rounded-full text-[#0a84ff] hover:bg-[#0a84ff]/10 transition-colors shrink-0"
                title="使用帮助"
              >
                <span className="text-xs font-semibold">?</span>
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-all duration-200 text-xs"
          >
            ✕
          </button>
        </div>

        {/* Help Panel */}
        {showHelp && script.help && (
          <div className="px-6 py-4 bg-[#0a84ff]/[0.04] border-b border-white/[0.06]">
            <div className="flex gap-6">
              {script.help.map((section, i) => (
                <div key={i} className="flex-1">
                  <h4 className="text-[11px] font-medium text-[#0a84ff] uppercase tracking-wider mb-1.5">
                    {section.title}
                  </h4>
                  <ul className="space-y-1">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-[12px] text-muted-foreground flex gap-1.5 leading-relaxed"
                      >
                        <span className="text-[#0a84ff]/40 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex gap-1.5 mb-4">
            {script.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] bg-white/[0.06] text-muted-foreground rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <pre className="p-4 bg-black/40 rounded-xl text-[13px] font-mono overflow-x-auto border border-white/[0.04] leading-relaxed">
            {script.code}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-6 pb-5">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white rounded-xl text-[13px] font-medium transition-all duration-200 active:scale-[0.98]"
          >
            复制代码
          </button>
          <button
            onClick={downloadScript}
            className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] text-foreground rounded-xl text-[13px] font-medium transition-all duration-200 active:scale-[0.98]"
          >
            下载文件
          </button>
        </div>
      </div>
    </div>
  );
}
