"use client";

import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";

interface ResponseViewerProps {
  response: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: string;
    time: number;
    size: number;
  } | null;
  error?: string;
}

export function ResponseViewer({ response, error }: ResponseViewerProps) {
  const [activeTab, setActiveTab] = useState<"body" | "headers">("body");

  if (error) {
    return (
      <div className="p-4 rounded-xl border border-[#ff453a]/20 bg-[#ff453a]/[0.06]">
        <p className="text-[13px] text-[#ff453a]">{error}</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground/30 text-[13px]">
        发送请求后查看响应结果
      </div>
    );
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-[#30d158]";
    if (status >= 300 && status < 400) return "text-[#ff9f0a]";
    if (status >= 400 && status < 500) return "text-[#ff453a]";
    if (status >= 500) return "text-[#ff375f]";
    return "text-muted-foreground";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatJson = (text: string) => {
    try {
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      return text;
    }
  };

  return (
    <div className="space-y-3">
      {/* Status Bar */}
      <div className="flex items-center gap-4 text-[12px]">
        <span className={`font-mono font-semibold ${getStatusColor(response.status)}`}>
          {response.status} {response.statusText}
        </span>
        <span className="text-muted-foreground/50">
          {response.time}ms
        </span>
        <span className="text-muted-foreground/50">
          {formatSize(response.size)}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-white/10 border border-white/15 w-fit">
        <button
          onClick={() => setActiveTab("body")}
          className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 ${
            activeTab === "body"
              ? "bg-white/25 text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Body
        </button>
        <button
          onClick={() => setActiveTab("headers")}
          className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 ${
            activeTab === "headers"
              ? "bg-white/25 text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Headers
          <span className="ml-1.5 text-[10px] text-muted-foreground/60">
            {Object.keys(response.headers).length}
          </span>
        </button>
      </div>

      {/* Body */}
      {activeTab === "body" && (
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <CopyButton text={response.body} />
          </div>
          <pre className="p-4 pr-20 rounded-xl bg-black/30 border border-white/10 text-[12px] font-mono text-foreground/80 overflow-auto max-h-[400px] leading-relaxed">
            {formatJson(response.body)}
          </pre>
        </div>
      )}

      {/* Headers */}
      {activeTab === "headers" && (
        <div className="p-4 rounded-xl bg-black/30 border border-white/10">
          <div className="space-y-1.5">
            {Object.entries(response.headers).map(([key, value]) => (
              <div key={key} className="flex gap-2 text-[12px] font-mono">
                <span className="text-[#0a84ff] shrink-0">{key}:</span>
                <span className="text-foreground/60 break-all">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
