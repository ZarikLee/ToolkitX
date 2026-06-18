"use client";

import { useState, useEffect } from "react";
import { SubPageLayout } from "@/components/layout/sub-page-layout";

const helpContent = [
  { title: "功能说明", items: ["监控 SSL 证书有效期", "证书即将过期时自动提醒", "支持多域名证书管理"] },
  { title: "使用方法", items: ["点击「添加证书」输入域名和端口", "点击「检查」刷新所有证书状态", "证书状态颜色: 绿色安全 / 黄色预警 / 红色过期"] },
];

interface Certificate {
  id: string;
  domain: string;
  port: number;
  label: string;
  status: "valid" | "expiring" | "expired";
  daysLeft: number;
  issuer: string;
  notAfter: number;
  lastChecked: number;
}

const statusColors: Record<string, string> = {
  valid: "#30d158",
  expiring: "#ff9f0a",
  expired: "#ff453a",
};

const statusLabels: Record<string, string> = {
  valid: "有效",
  expiring: "即将过期",
  expired: "已过期",
};

export default function CertsPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ domain: "", port: "443", label: "" });

  useEffect(() => {
    loadCerts();
  }, []);

  const loadCerts = async () => {
    try {
      const res = await fetch("/api/certs");
      if (res.ok) {
        const data = await res.json();
        setCerts(data.certs);
      }
    } catch {}
    setLoading(false);
  };

  const addCert = async () => {
    if (!form.domain.trim()) return;
    try {
      const res = await fetch("/api/certs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: form.domain.trim(),
          port: parseInt(form.port) || 443,
          label: form.label.trim() || form.domain.trim(),
        }),
      });
      if (res.ok) {
        setForm({ domain: "", port: "443", label: "" });
        setShowAdd(false);
        loadCerts();
      }
    } catch {}
  };

  const deleteCert = async (id: string) => {
    try {
      await fetch(`/api/certs?id=${id}`, { method: "DELETE" });
      setCerts((prev) => prev.filter((c) => c.id !== id));
    } catch {}
  };

  const checkAll = async () => {
    setChecking(true);
    try {
      await fetch("/api/certs/check", { method: "POST" });
      loadCerts();
    } catch {}
    setChecking(false);
  };

  const getDaysColor = (days: number) => {
    if (days > 30) return "#30d158";
    if (days > 7) return "#ff9f0a";
    return "#ff453a";
  };

  return (
    <SubPageLayout
      title="证书监控"
      subtitle="监控 SSL 证书有效期，避免证书过期"
      helpContent={helpContent}
      tabs={<></>}
    >
      <div className="space-y-4">
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdd(true)}
            className="btn-apple bg-[#0a84ff] text-white text-[13px] px-3 py-1.5"
          >
            + 添加证书
          </button>
          <button
            onClick={checkAll}
            disabled={checking}
            className="btn-apple btn-secondary text-[13px] px-3 py-1.5"
          >
            {checking ? "检查中..." : "检查全部"}
          </button>
        </div>

        {/* Add form */}
        {showAdd && (
          <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                value={form.domain}
                onChange={(e) => setForm({ ...form, domain: e.target.value })}
                placeholder="域名 (如 example.com)"
                className="input-apple text-[13px]"
              />
              <input
                type="number"
                value={form.port}
                onChange={(e) => setForm({ ...form, port: e.target.value })}
                placeholder="端口"
                className="input-apple text-[13px]"
              />
              <input
                type="text"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="备注标签 (可选)"
                className="input-apple text-[13px]"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={addCert} className="btn-apple bg-[#0a84ff] text-white text-[12px] px-3 py-1">
                添加
              </button>
              <button onClick={() => setShowAdd(false)} className="btn-apple btn-secondary text-[12px] px-3 py-1">
                取消
              </button>
            </div>
          </div>
        )}

        {/* Cert list */}
        {loading && <div className="text-[13px] text-muted-foreground">加载中...</div>}
        {!loading && certs.length === 0 && (
          <div className="text-[13px] text-muted-foreground py-8 text-center">暂无监控证书</div>
        )}
        {!loading && certs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {certs.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[14px] font-medium">{cert.label}</div>
                    <div className="text-[12px] text-muted-foreground font-mono mt-0.5">
                      {cert.domain}:{cert.port}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCert(cert.id)}
                    className="px-2 py-0.5 text-[11px] text-muted-foreground/40 hover:text-[#ff453a] transition-colors"
                  >
                    删除
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: statusColors[cert.status] }}
                    />
                    <span className="text-[12px]" style={{ color: statusColors[cert.status] }}>
                      {statusLabels[cert.status]}
                    </span>
                  </div>
                  <span
                    className="text-[20px] font-bold"
                    style={{ color: getDaysColor(cert.daysLeft) }}
                  >
                    {cert.daysLeft}
                  </span>
                  <span className="text-[11px] text-muted-foreground">天</span>
                </div>

                <div className="text-[11px] text-muted-foreground/60">
                  <div>颁发者: {cert.issuer}</div>
                  <div className="mt-0.5">
                    过期时间: {new Date(cert.notAfter).toLocaleDateString()}
                  </div>
                  <div className="mt-0.5">
                    上次检查: {new Date(cert.lastChecked).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SubPageLayout>
  );
}
