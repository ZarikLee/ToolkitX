"use client";

import { useState, useEffect } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const sslHelp = [
  { title: "功能说明", items: ["检查 SSL 证书有效期和颁发者", "显示证书剩余天数和安全状态"] },
  { title: "使用方法", items: ["输入域名（不含 https://）", "点击「检查 SSL」查看证书信息", "剩余天数 < 30 天会显示告警"] },
];

interface SslInfo {
  issuer: string;
  subject: string;
  validFrom: string;
  validTo: string;
  daysLeft: number;
}

const STORAGE_KEY = "diagnostics_ssl_checker";

export function SslChecker() {
  const [domain, setDomain] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).domain || "" : "";
    }
    return "";
  });
  const [sslInfo, setSslInfo] = useState<SslInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ domain }));
  }, [domain]);

  const checkSsl = async () => {
    if (!domain) return;
    setLoading(true);
    setSslInfo(null);
    setError("");

    try {
      const res = await fetch("/api/diagnostics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ type: "ssl", target: domain }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "检查失败");

      const cert = data.result?.certificate;
      if (!cert || !cert.validTo) throw new Error("无法获取证书信息");

      const validTo = new Date(cert.validTo);
      const now = new Date();
      const daysLeft = Math.ceil((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      setSslInfo({
        issuer: cert.issuer || "未知",
        subject: cert.subject || domain,
        validFrom: cert.validFrom || "未知",
        validTo: cert.validTo,
        daysLeft,
      });
    } catch (e: any) {
      setError(e.message || "检查失败");
    }
    setLoading(false);
  };

  const getStatusColor = (days: number) => {
    if (days > 30) return "text-green-500";
    if (days > 7) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">SSL 证书检查</h2>
          <InlineHelp content={sslHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          检查 SSL 证书的有效性和详细信息
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && checkSsl()}
          className="flex-1 input-apple"
          placeholder="example.com"
        />
        <button
          onClick={checkSsl}
          disabled={!domain || loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? "检查中..." : "检查 SSL"}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      {sslInfo && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 glass rounded-xl">
            <div className={`text-4xl ${getStatusColor(sslInfo.daysLeft)}`}>
              {sslInfo.daysLeft > 30 ? "✓" : sslInfo.daysLeft > 7 ? "⚠" : "✗"}
            </div>
            <div>
              <p className="text-lg font-medium">
                证书{sslInfo.daysLeft > 30 ? "有效" : sslInfo.daysLeft > 7 ? "即将过期" : "已过期"}
              </p>
              <p className={`text-sm ${getStatusColor(sslInfo.daysLeft)}`}>
                剩余 {sslInfo.daysLeft} 天
              </p>
            </div>
          </div>

          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-t border-white/5">
                  <td className="p-3 bg-white/5 font-medium">颁发者</td>
                  <td className="p-3">{sslInfo.issuer}</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="p-3 bg-white/5 font-medium">使用者</td>
                  <td className="p-3">{sslInfo.subject}</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="p-3 bg-white/5 font-medium">生效日期</td>
                  <td className="p-3">{sslInfo.validFrom}</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="p-3 bg-white/5 font-medium">过期日期</td>
                  <td className="p-3">{sslInfo.validTo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
