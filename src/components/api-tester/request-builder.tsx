"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Plus, Trash2, Save } from "lucide-react";

interface RequestBuilderProps {
  onSend: (config: {
    name: string;
    method: string;
    url: string;
    headers: { key: string; value: string }[];
    body: string;
  }) => void;
  loading: boolean;
  initialName?: string;
  initialMethod?: string;
  initialUrl?: string;
  initialHeaders?: { key: string; value: string }[];
  initialBody?: string;
}

export interface RequestBuilderRef {
  getState: () => {
    name: string;
    method: string;
    url: string;
    headers: { key: string; value: string }[];
    body: string;
  };
}

const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"];

const METHOD_COLORS: Record<string, string> = {
  GET: "text-[#30d158]",
  POST: "text-[#ff9f0a]",
  PUT: "text-[#0a84ff]",
  DELETE: "text-[#ff453a]",
  PATCH: "text-[#bf5af2]",
  HEAD: "text-[#64d2ff]",
  OPTIONS: "text-muted-foreground",
};

export const RequestBuilder = forwardRef<RequestBuilderRef, RequestBuilderProps>(
  function RequestBuilder(
    { onSend, loading, initialName, initialMethod, initialUrl, initialHeaders, initialBody },
    ref
  ) {
    const [name, setName] = useState(initialName || "");
    const [method, setMethod] = useState(initialMethod || "GET");
    const [url, setUrl] = useState(initialUrl || "https://");
    const [headers, setHeaders] = useState<{ key: string; value: string }[]>(
      initialHeaders || [{ key: "Content-Type", value: "application/json" }]
    );
    const [body, setBody] = useState(initialBody || "");
    const [activeTab, setActiveTab] = useState<"headers" | "body">("headers");

    useEffect(() => {
      if (initialName !== undefined) setName(initialName);
      if (initialMethod !== undefined) setMethod(initialMethod);
      if (initialUrl !== undefined) setUrl(initialUrl);
      if (initialHeaders !== undefined) setHeaders(initialHeaders);
      if (initialBody !== undefined) setBody(initialBody);
    }, [initialName, initialMethod, initialUrl, initialHeaders, initialBody]);

    useImperativeHandle(ref, () => ({
      getState: () => ({ name, method, url, headers, body }),
    }));

    const addHeader = () => setHeaders([...headers, { key: "", value: "" }]);
    const removeHeader = (i: number) => setHeaders(headers.filter((_, idx) => idx !== i));
    const updateHeader = (i: number, field: "key" | "value", value: string) => {
      const updated = [...headers];
      updated[i][field] = value;
      setHeaders(updated);
    };

    const handleSend = () => onSend({ name, method, url, headers, body });
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSend();
    };

    return (
      <div className="space-y-3">
        {/* Request Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="请求名称（可选）"
          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[14px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/40 transition-colors"
        />

        {/* URL Bar */}
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className={`appearance-none px-3 py-2.5 pr-8 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[13px] font-mono font-bold outline-none focus:border-[#0a84ff]/50 ${METHOD_COLORS[method]}`}
            >
              {METHODS.map((m) => (
                <option key={m} value={m} className="bg-[#1c1c1e] text-foreground">
                  {m}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="text-muted-foreground/40">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://api.example.com/endpoint"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[13px] font-mono text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-[#0a84ff]/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={loading || !url}
            className="px-6 py-2.5 rounded-xl bg-[#0a84ff] hover:bg-[#0a84ff]/90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-semibold transition-all duration-200 active:scale-[0.97]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                发送中
              </span>
            ) : (
              "发送"
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06] w-fit">
          <button
            onClick={() => setActiveTab("headers")}
            className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 ${
              activeTab === "headers"
                ? "bg-white/[0.1] text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Headers
            {headers.filter((h) => h.key).length > 0 && (
              <span className="ml-1.5 text-[10px] text-muted-foreground/60">
                {headers.filter((h) => h.key).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("body")}
            className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 ${
              activeTab === "body"
                ? "bg-white/[0.1] text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Body
          </button>
        </div>

        {/* Headers Panel */}
        {activeTab === "headers" && (
          <div className="space-y-2">
            {headers.map((header, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) => updateHeader(i, "key", e.target.value)}
                  placeholder="Header name"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[12px] font-mono text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/40"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) => updateHeader(i, "value", e.target.value)}
                  placeholder="Value"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[12px] font-mono text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/40"
                />
                <button
                  onClick={() => removeHeader(i)}
                  className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-[#ff453a] hover:bg-[#ff453a]/10 transition-all duration-200"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={addHeader}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-200"
            >
              <Plus className="h-3.5 w-3.5" />
              添加 Header
            </button>
          </div>
        )}

        {/* Body Panel */}
        {activeTab === "body" && (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='{\n  "key": "value"\n}'
            className="w-full h-48 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] font-mono text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/40 resize-none leading-relaxed"
          />
        )}

        <p className="text-[11px] text-muted-foreground/40">
          按 ⌘/Ctrl + Enter 发送请求
        </p>
      </div>
    );
  }
);
