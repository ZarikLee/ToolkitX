"use client";

import { useState, useEffect } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const portHelp = [
  { title: "功能说明", items: ["扫描目标主机的常用端口开放状态", "识别端口对应的服务名称"] },
  { title: "使用方法", items: ["输入 IP 地址或域名", "点击「常用端口」加载预设端口列表", "点击「开始扫描」查看结果"] },
];

interface PortResult {
  port: number;
  status: "open" | "closed" | "filtered";
  service?: string;
}

const commonPorts = [
  21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995,
  3306, 5432, 6379, 8080, 8443, 27017,
];

const portServices: Record<number, string> = {
  21: "FTP",
  22: "SSH",
  23: "Telnet",
  25: "SMTP",
  53: "DNS",
  80: "HTTP",
  110: "POP3",
  143: "IMAP",
  443: "HTTPS",
  993: "IMAPS",
  995: "POP3S",
  3306: "MySQL",
  5432: "PostgreSQL",
  6379: "Redis",
  8080: "HTTP-Alt",
  8443: "HTTPS-Alt",
  27017: "MongoDB",
};

const STORAGE_KEY = "diagnostics_port_scanner";

export function PortScanner() {
  const [host, setHost] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).host || "" : "";
    }
    return "";
  });
  const [portRange, setPortRange] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).portRange || "22,80,443,3306,6379,8080" : "22,80,443,3306,6379,8080";
    }
    return "22,80,443,3306,6379,8080";
  });
  const [results, setResults] = useState<PortResult[]>([]);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ host, portRange }));
  }, [host, portRange]);

  const scanPorts = async () => {
    if (!host) return;

    setScanning(true);
    setResults([]);
    setError(null);

    const ports = portRange
      .split(",")
      .map((p: string) => parseInt(p.trim()))
      .filter((p: number) => !isNaN(p));

    try {
      const res = await fetch("/api/diagnostics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ type: "port", target: host, options: { ports } }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "扫描失败");
      const enriched = data.result.ports.map((p: PortResult) => ({
        ...p,
        service: p.service || portServices[p.port] || "Unknown",
      }));
      setResults(enriched);
    } catch (err) {
      setError(err instanceof Error ? err.message : "扫描失败");
    } finally {
      setScanning(false);
    }
  };

  const scanCommonPorts = () => {
    setPortRange(commonPorts.join(","));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">端口扫描</h2>
          <InlineHelp content={portHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          扫描目标主机开放的端口和服务
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">目标主机 *</label>
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="input-apple mt-1"
            placeholder="192.168.1.100 或 example.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium">端口范围</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={portRange}
              onChange={(e) => setPortRange(e.target.value)}
              className="flex-1 input-apple"
              placeholder="22,80,443 或 1-1024"
            />
            <button
              onClick={scanCommonPorts}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              常用端口
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={scanPorts}
        disabled={!host || scanning}
        className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
      >
        {scanning ? "扫描中..." : "开始扫描"}
      </button>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">扫描结果</h3>
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-2 text-left">端口</th>
                  <th className="p-2 text-left">状态</th>
                  <th className="p-2 text-left">服务</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.port} className="border-t border-white/5">
                    <td className="p-2 font-mono">{result.port}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          result.status === "open"
                            ? "bg-green-500/20 text-green-500"
                            : result.status === "closed"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {result.status}
                      </span>
                    </td>
                    <td className="p-2 text-muted-foreground">
                      {result.service}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            开放端口: {results.filter((r) => r.status === "open").length} / {results.length}
          </p>
        </div>
      )}
    </div>
  );
}
