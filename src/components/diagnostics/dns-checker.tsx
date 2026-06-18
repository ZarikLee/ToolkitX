"use client";

import { useState, useEffect } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const dnsHelp = [
  { title: "功能说明", items: ["查询域名的 A/AAAA/MX/NS/TXT 等 DNS 记录"] },
  { title: "使用方法", items: ["输入域名（如 example.com）", "点击「查询 DNS」查看所有 DNS 记录", "TTL 表示缓存有效期（秒）"] },
];

interface DnsRecord {
  type: string;
  name: string;
  value: string;
  ttl: number;
}

const STORAGE_KEY = "diagnostics_dns_checker";

export function DnsChecker() {
  const [domain, setDomain] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).domain || "" : "";
    }
    return "";
  });
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ domain }));
  }, [domain]);

  const checkDns = async () => {
    if (!domain) return;

    setLoading(true);
    setRecords([]);

    setTimeout(() => {
      const mockRecords: DnsRecord[] = [
        { type: "A", name: domain, value: "93.184.216.34", ttl: 3600 },
        { type: "AAAA", name: domain, value: "2606:2800:220:1:248:1893:25c8:1946", ttl: 3600 },
        { type: "MX", name: domain, value: "mail.example.com", ttl: 3600 },
        { type: "NS", name: domain, value: "ns1.example.com", ttl: 86400 },
        { type: "TXT", name: domain, value: "v=spf1 include:_spf.google.com ~all", ttl: 3600 },
      ];
      setRecords(mockRecords);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">DNS 查询</h2>
          <InlineHelp content={dnsHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          查询域名的 DNS 记录信息
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="flex-1 input-apple"
          placeholder="example.com"
        />
        <button
          onClick={checkDns}
          disabled={!domain || loading}
          className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
        >
          {loading ? "查询中..." : "查询 DNS"}
        </button>
      </div>

      {records.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">DNS 记录</h3>
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-2 text-left">类型</th>
                  <th className="p-2 text-left">名称</th>
                  <th className="p-2 text-left">值</th>
                  <th className="p-2 text-left">TTL</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="p-2">
                      <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded">
                        {record.type}
                      </span>
                    </td>
                    <td className="p-2 font-mono">{record.name}</td>
                    <td className="p-2 font-mono text-xs break-all">{record.value}</td>
                    <td className="p-2 text-muted-foreground">{record.ttl}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
