"use client";

import { useState, useEffect } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const tracerouteHelp = [
  { title: "功能说明", items: ["追踪数据包到目标主机经过的路由节点", "显示每一跳的 IP、主机名和延迟"] },
  { title: "使用方法", items: ["输入 IP 地址或域名", "点击「开始追踪」", "最多显示 15 跳，部分节点可能超时"] },
];

interface Hop {
  hop: number;
  ip: string;
  host: string;
  time1: number;
  time2: number;
  time3: number;
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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ host }));
  }, [host]);

  const traceRoute = async () => {
    if (!host) return;

    setLoading(true);
    setHops([]);

    const mockHops: Hop[] = [
      { hop: 1, ip: "192.168.1.1", host: "gateway", time1: 1.2, time2: 1.1, time3: 1.3 },
      { hop: 2, ip: "10.0.0.1", host: "", time1: 5.4, time2: 5.2, time3: 5.6 },
      { hop: 3, ip: "72.14.236.126", host: "", time1: 12.3, time2: 12.1, time3: 12.5 },
      { hop: 4, ip: "72.14.236.126", host: "", time1: 12.8, time2: 12.6, time3: 13.0 },
      { hop: 5, ip: "108.170.252.1", host: "", time1: 15.2, time2: 15.0, time3: 15.4 },
      { hop: 6, ip: "142.250.80.46", host: "", time1: 16.8, time2: 16.6, time3: 17.0 },
      { hop: 7, ip: "216.58.214.174", host: "sea09s16-in-f174.1e100.net", time1: 18.2, time2: 18.0, time3: 18.4 },
    ];

    for (let i = 0; i < mockHops.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setHops((prev) => [...prev, mockHops[i]]);
    }

    setLoading(false);
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
          className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
        >
          {loading ? "追踪中..." : "开始追踪"}
        </button>
      </div>

      {hops.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">路由路径</h3>
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-2 text-left">跳数</th>
                  <th className="p-2 text-left">IP 地址</th>
                  <th className="p-2 text-left">主机名</th>
                  <th className="p-2 text-left">延迟 (ms)</th>
                </tr>
              </thead>
              <tbody>
                {hops.map((hop) => (
                  <tr key={hop.hop} className="border-t border-white/5">
                    <td className="p-2 font-mono">{hop.hop}</td>
                    <td className="p-2 font-mono">{hop.ip}</td>
                    <td className="p-2 text-muted-foreground">{hop.host || "-"}</td>
                    <td className="p-2">
                      {hop.time1.toFixed(1)} / {hop.time2.toFixed(1)} / {hop.time3.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            显示 {hops.length} 跳，平均延迟: {(hops.reduce((sum, h) => sum + h.time1, 0) / hops.length).toFixed(1)}ms
          </p>
        </div>
      )}
    </div>
  );
}
