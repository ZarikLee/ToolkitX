"use client";

import { useState, useEffect } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const tracerouteHelp = [
  { title: "功能说明", items: ["追踪数据包到目标主机经过的路由节点", "显示每一跳的 IP、主机名和延迟"] },
  { title: "使用方法", items: ["输入 IP 地址或域名", "点击「开始追踪」", "最多显示 15 跳，部分节点可能超时"] },
];

interface Hop {
  hop: string;
  host: string;
  times: string[];
}

const STORAGE_KEY = "diagnostics_traceroute";

export function Traceroute() {
  const [host, setHost] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).host || "" : "";
    }
    return "";
  });
  const [hops, setHops] = useState<Hop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ host }));
  }, [host]);

  const traceRoute = async () => {
    if (!host) return;

    setLoading(true);
    setHops([]);
    setError(null);

    try {
      const res = await fetch("/api/diagnostics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ type: "trace", target: host }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "追踪失败");
      setHops(data.result.hops);
    } catch (err) {
      setError(err instanceof Error ? err.message : "追踪失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">路由追踪</h2>
          <InlineHelp content={tracerouteHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          追踪数据包到目标主机的路由路径
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          className="flex-1 input-apple"
          placeholder="example.com 或 8.8.8.8"
        />
        <button
          onClick={traceRoute}
          disabled={!host || loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? "追踪中..." : "开始追踪"}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {hops.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">路由路径</h3>
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-2 text-left">跳数</th>
                  <th className="p-2 text-left">主机名/IP</th>
                  <th className="p-2 text-left">延迟 (ms)</th>
                </tr>
              </thead>
              <tbody>
                {hops.map((hop) => (
                  <tr key={hop.hop} className="border-t border-white/5">
                    <td className="p-2 font-mono">{hop.hop}</td>
                    <td className="p-2 font-mono text-xs break-all">{hop.host || "-"}</td>
                    <td className="p-2 font-mono text-xs">
                      {hop.times?.join(" / ") || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            显示 {hops.length} 跳
          </p>
        </div>
      )}
    </div>
  );
}
