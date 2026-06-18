"use client";

import { useState, useRef } from "react";
import { RequestBuilder, RequestBuilderRef } from "@/components/api-tester/request-builder";
import { ResponseViewer } from "@/components/api-tester/response-viewer";
import { SubPageLayout } from "@/components/layout/sub-page-layout";
import { Clock, Trash2, ArrowUpRight, FileCode } from "lucide-react";
import { apiPost, apiDelete, apiGet, isLoginRequired } from "@/lib/api";

const helpContent = [
  {
    title: "如何使用 API 测试工具",
    items: [
      "输入请求名称（可选），方便在历史记录中识别",
      "选择 HTTP 方法（GET / POST / PUT / DELETE 等）",
      "输入请求 URL，支持 http 和 https",
      "在 Headers 标签页添加请求头（默认已添加 Content-Type）",
      "在 Body 标签页输入请求体（JSON 格式）",
      "点击「发送」或按 ⌘/Ctrl + Enter 发送请求",
    ],
  },
  {
    title: "响应查看",
    items: [
      "状态码：颜色区分 2xx 绿色 / 3xx 黄色 / 4xx/5xx 红色",
      "响应时间：显示请求耗时（毫秒）",
      "响应大小：自动格式化为 B / KB / MB",
      "Body 标签：自动格式化 JSON 响应",
      "Headers 标签：查看所有响应头",
    ],
  },
  {
    title: "请求历史",
    items: [
      "每次请求自动保存到历史记录",
      "点击历史条目可快速复用该请求",
      "支持单条删除和清空全部",
      "最多保存最近 50 条记录",
    ],
  },
];

interface HistoryEntry {
  id: string;
  name: string;
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  body: string;
  status: number;
  time: number;
  timestamp: number;
}

const HISTORY_KEY = "api_test_history";

export default function ApiTesterPage() {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [selectedHistory, setSelectedHistory] = useState<HistoryEntry | null>(null);
  const builderRef = useRef<RequestBuilderRef>(null);

  const loadHistory = async () => {
    if (isLoginRequired()) return;
    try {
      const data = await apiGet<HistoryEntry[]>("/api/api-history");
      setHistory(data);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
    } catch {}
  };

  const handleSend = async (config: {
    name: string;
    method: string;
    url: string;
    headers: { key: string; value: string }[];
    body: string;
  }) => {
    setLoading(true);
    setResponse(null);
    setError(undefined);

    try {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Request failed");
      } else {
        setResponse(data);

        const entry: HistoryEntry = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          name: config.name || `${config.method} ${config.url.replace(/https?:\/\//, "").split("/")[0]}`,
          method: config.method,
          url: config.url,
          headers: config.headers,
          body: config.body,
          status: data.status,
          time: data.time,
          timestamp: Date.now(),
        };

        // Save to database if logged in
        if (!isLoginRequired()) {
          try {
            await apiPost("/api/api-history", {
              name: entry.name,
              method: entry.method,
              url: entry.url,
              headers: entry.headers,
              body: entry.body,
              status: entry.status,
              time: entry.time,
            });
          } catch {}
        }

        const newHistory = [entry, ...history].slice(0, 50);
        setHistory(newHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (entry: HistoryEntry) => {
    setSelectedHistory(entry);
  };

  const clearHistory = async () => {
    if (!isLoginRequired()) {
      try {
        await apiDelete("/api/api-history");
      } catch {}
    }
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  };

  const removeHistory = async (id: string) => {
    if (!isLoginRequired()) {
      try {
        await apiDelete("/api/api-history", id);
      } catch {}
    }
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "text-[#30d158]";
      case "POST": return "text-[#ff9f0a]";
      case "PUT": return "text-[#0a84ff]";
      case "DELETE": return "text-[#ff453a]";
      case "PATCH": return "text-[#bf5af2]";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-[#30d158]";
    if (status >= 300 && status < 400) return "text-[#ff9f0a]";
    if (status >= 400) return "text-[#ff453a]";
    return "text-muted-foreground";
  };

  return (
    <SubPageLayout
      title="API 测试"
      subtitle="HTTP 请求测试，支持 REST API 调试"
      helpContent={helpContent}
      tabs={<></>}
    >
      <div className="flex gap-4 min-h-[calc(100vh-12rem)]">
        {/* History Sidebar */}
        <div className="w-72 shrink-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <span className="text-[12px] font-medium text-muted-foreground/60 uppercase tracking-wider">
              历史记录
            </span>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-[11px] text-muted-foreground/40 hover:text-[#ff453a] transition-colors"
              >
                清空
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground/20">
                <Clock className="h-6 w-6 mb-2" />
                <p className="text-[12px]">暂无历史</p>
              </div>
            ) : (
              <div className="p-2 space-y-0.5">
                {history.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => handleSelectHistory(entry)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      selectedHistory?.id === entry.id
                        ? "bg-white/[0.08] border border-white/[0.08]"
                        : "hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono font-bold w-10 shrink-0 ${getMethodColor(entry.method)}`}>
                        {entry.method}
                      </span>
                      <span className={`text-[11px] font-mono ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </span>
                      <span className="text-[10px] text-muted-foreground/30 shrink-0">
                        {entry.time}ms
                      </span>
                    </div>
                    <p className="text-[12px] text-foreground/70 truncate font-mono">
                      {entry.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground/30 truncate font-mono mt-0.5">
                      {entry.url.replace(/https?:\/\//, "")}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4 min-w-0">
          <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <RequestBuilder
              ref={builderRef}
              onSend={handleSend}
              loading={loading}
              initialName={selectedHistory?.name}
              initialMethod={selectedHistory?.method}
              initialUrl={selectedHistory?.url}
              initialHeaders={selectedHistory?.headers}
              initialBody={selectedHistory?.body}
            />
          </div>

          <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <h3 className="text-[12px] font-medium text-muted-foreground/60 uppercase tracking-wider mb-4">
              响应
            </h3>
            <ResponseViewer response={response} error={error} />
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
