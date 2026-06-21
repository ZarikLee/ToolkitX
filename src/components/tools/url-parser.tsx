"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const urlHelp = [
  { title: "功能说明", items: ["解析 URL 各部分组成", "显示查询参数"] },
  { title: "使用方法", items: ["粘贴 URL", "自动解析各部分", "查看解析结果"] },
];

interface URLParts {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  params: Record<string, string>;
}

function parseUrl(url: string): URLParts | null {
  try {
    const parsed = new URL(url);
    const params: Record<string, string> = {};
    parsed.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return {
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash,
      params,
    };
  } catch {
    return null;
  }
}

export function URLParser() {
  const [url, setUrl] = useState("https://example.com:8080/path/page?q=search&lang=en#section");
  const [result, setResult] = useState<URLParts | null>(null);
  const [error, setError] = useState("");

  const parse = () => {
    const parsed = parseUrl(url);
    if (parsed) {
      setResult(parsed);
      setError("");
    } else {
      setResult(null);
      setError("无效的 URL 格式");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const fields = [
    { label: "协议", value: result?.protocol },
    { label: "主机名", value: result?.hostname },
    { label: "端口", value: result?.port || "(默认)" },
    { label: "路径", value: result?.pathname },
    { label: "查询字符串", value: result?.search || "(无)" },
    { label: "哈希", value: result?.hash || "(无)" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">URL 解析器</h2>
          <InlineHelp content={urlHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          解析 URL 各部分组成，查看查询参数
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">输入 URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-apple mt-1 font-mono"
          placeholder="https://example.com/path?q=search"
        />
      </div>

      <button
        onClick={parse}
        disabled={!url}
        className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
      >
        解析
      </button>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-xl text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">解析结果</h3>
            {fields.map((field) => (
              <div
                key={field.label}
                className="flex items-center justify-between p-3 glass rounded-xl"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-muted-foreground">{field.label}</span>
                  <p className="text-sm font-mono break-all mt-1">{field.value}</p>
                </div>
                {field.value && field.value !== "(无)" && field.value !== "(默认)" && (
                  <button
                    onClick={() => copyToClipboard(field.value!)}
                    className="ml-2 px-3 py-1 text-sm btn-ghost shrink-0"
                  >
                    复制
                  </button>
                )}
              </div>
            ))}
          </div>

          {Object.keys(result.params).length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">查询参数</h3>
              {Object.entries(result.params).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 glass rounded-xl"
                >
                  <div>
                    <span className="text-sm font-mono text-blue-400">{key}</span>
                    <span className="text-sm text-muted-foreground mx-2">=</span>
                    <span className="text-sm font-mono">{value}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value)}
                    className="px-3 py-1 text-sm btn-ghost"
                  >
                    复制
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
