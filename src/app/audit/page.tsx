"use client";

import { useState, useEffect } from "react";
import { SubPageLayout } from "@/components/layout/sub-page-layout";
import { TabButton } from "@/components/ui/tab-button";

const helpContent = [
  { title: "功能说明", items: ["记录所有操作审计日志", "支持按操作类型、资源、时间筛选", "可导出 CSV 格式日志"] },
  { title: "使用方法", items: ["使用顶部筛选器过滤日志", "点击「导出 CSV」下载日志文件", "开启自动刷新实时监控"] },
];

interface AuditLog {
  id: string;
  createdAt: number;
  userId: string;
  action: string;
  resource: string;
  detail: string;
}

const actionTypes = [
  { value: "all", label: "全部" },
  { value: "login", label: "登录" },
  { value: "execute", label: "执行命令" },
  { value: "create", label: "创建" },
  { value: "update", label: "更新" },
  { value: "delete", label: "删除" },
  { value: "deploy", label: "部署" },
];

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("all");
  const [resourceFilter, setResourceFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(loadLogs, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const loadLogs = async () => {
    try {
      const params = new URLSearchParams();
      if (actionFilter !== "all") params.set("action", actionFilter);
      if (resourceFilter) params.set("resource", resourceFilter);
      if (dateFrom) params.set("startDate", dateFrom);
      if (dateTo) params.set("endDate", dateTo);
      const res = await fetch(`/api/audit?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch {}
    setLoading(false);
  };

  const exportCsv = () => {
    const headers = ["时间", "用户", "操作", "资源", "详情"];
    const rows = logs.map((log) => [
      new Date(log.createdAt).toLocaleString(),
      log.userId || "-",
      log.action,
      log.resource,
      log.detail,
    ]);
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SubPageLayout
      title="审计日志"
      subtitle="记录和审查所有系统操作日志"
      helpContent={helpContent}
      tabs={<></>}
    >
      <div className="space-y-4">
        {/* Filter bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="input-apple text-[13px] w-32"
          >
            {actionTypes.map((at) => (
              <option key={at.value} value={at.value}>
                {at.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={resourceFilter}
            onChange={(e) => setResourceFilter(e.target.value)}
            placeholder="资源筛选..."
            className="input-apple text-[13px] w-40"
          />
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="input-apple text-[13px] w-40"
          />
          <span className="text-[12px] text-muted-foreground">至</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="input-apple text-[13px] w-40"
          />
          <button onClick={loadLogs} className="btn-secondary text-[12px] px-3 py-1.5">
            筛选
          </button>
          <div className="flex-1" />
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-1.5 rounded-lg text-[12px] transition-all ${
              autoRefresh ? "bg-[#30d158]/10 text-[#30d158]" : "bg-white/15 text-muted-foreground"
            }`}
          >
            {autoRefresh ? "自动刷新中" : "自动刷新"}
          </button>
          <button onClick={exportCsv} className="btn-secondary text-[12px] px-3 py-1.5">
            导出 CSV
          </button>
        </div>

        {/* Log table */}
        {loading && <div className="text-[13px] text-muted-foreground">加载中...</div>}
        {!loading && logs.length === 0 && (
          <div className="text-[13px] text-muted-foreground py-8 text-center">暂无审计记录</div>
        )}
        {!loading && logs.length > 0 && (
          <div className="rounded-xl border border-white/15 overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-white/10 border-b border-white/15">
                  <th className="text-left px-4 py-2.5 text-[11px] text-muted-foreground/60 uppercase tracking-wider font-medium">
                    时间
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] text-muted-foreground/60 uppercase tracking-wider font-medium">
                    用户
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] text-muted-foreground/60 uppercase tracking-wider font-medium">
                    操作
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] text-muted-foreground/60 uppercase tracking-wider font-medium">
                    资源
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] text-muted-foreground/60 uppercase tracking-wider font-medium">
                    详情
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 font-medium">{log.userId || "-"}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-1.5 py-0.5 text-[11px] bg-white/15 rounded-md">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[12px] text-muted-foreground">{log.resource}</td>
                    <td className="px-4 py-2.5 text-muted-foreground max-w-xs truncate">{log.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SubPageLayout>
  );
}
