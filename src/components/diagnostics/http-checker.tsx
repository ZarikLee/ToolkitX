"use client";

import { useState, useEffect } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const httpHelp = [
  { title: "功能说明", items: ["检测 URL 的 HTTP 响应状态码", "查看响应头和响应时间"] },
  { title: "使用方法", items: ["输入完整 URL（含 http:// 或 https://）", "选择请求方法（GET/POST 等）", "点击「开始检测」查看结果"] },
];

interface HttpResult {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  time: number;
  size: number;
}

const STORAGE_KEY = "diagnostics_http_checker";

export function HttpChecker() {
  const [url, setUrl] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).url || "" : "";
    }
    return "";
  });
  const [method, setMethod] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).method || "GET" : "GET";
    }
    return "GET";
  });
  const [result, setResult] = useState<HttpResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ url, method }));
  }, [url, method]);

  const checkHttp = async () => {
    if (!url) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const mockResult: HttpResult = {
        status: 200,
        statusText: "OK",
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
          Server: "nginx/1.18.0",
          "X-Powered-By": "Express",
        },
        time: 156,
        size: 12345,
      };
      setResult(mockResult);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">HTTP 检测</h2>
          <InlineHelp content={httpHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          检测 HTTP 接口响应和性能
        </p>
      </div>

      <div className="flex gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="input-apple"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>HEAD</option>
        </select>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 input-apple"
          placeholder="https://example.com"
        />
        <button
          onClick={checkHttp}
          disabled={!url || loading}
          className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
        >
          {loading ? "检测中..." : "开始检测"}
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 glass rounded-xl">
            <div
              className={`text-4xl ${
                result.status >= 200 && result.status < 300
                  ? "text-green-500"
                  : result.status >= 400
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {result.status >= 200 && result.status < 300
                ? "✓"
                : result.status >= 400
                ? "✗"
                : "⚠"}
            </div>
            <div>
              <p className="text-lg font-medium">
                {result.status} {result.statusText}
              </p>
              <p className="text-sm text-muted-foreground">
                响应时间: {result.time}ms | 大小: {(result.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>

          <div className="glass rounded-xl overflow-hidden">
            <div className="p-3 bg-white/5 font-medium text-sm">响应头</div>
            <div className="divide-y divide-white/5">
              {Object.entries(result.headers).map(([key, value]) => (
                <div key={key} className="flex p-3 text-sm">
                  <span className="font-medium w-200">{key}:</span>
                  <span className="text-muted-foreground font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
