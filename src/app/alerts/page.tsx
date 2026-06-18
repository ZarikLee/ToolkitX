"use client";

import { useState, useEffect } from "react";
import { SubPageLayout } from "@/components/layout/sub-page-layout";
import { InlineHelp } from "@/components/ui/inline-help";

const helpContent = [
  { title: "功能说明", items: ["集中展示所有告警信息", "按严重级别分类管理", "支持确认和解决告警"] },
  { title: "使用方法", items: ["查看顶部的告警统计卡片", "点击告警条目查看详情", "点击确认/解决按钮处理告警"] },
];

interface Alert {
  id: string;
  type: string;
  severity: string;
  title: string;
  message: string;
  resolved: boolean;
  metadata: any;
  createdAt: number;
}

interface AlertRule {
  id: string;
  name: string;
  type: string;
  condition: string;
  threshold: number;
  severity: string;
  enabled: boolean;
  cooldown: number;
  lastFired: number | null;
  createdAt: number;
}

const severityColors: Record<string, string> = {
  critical: "#ff453a",
  warning: "#ff9f0a",
  info: "#0a84ff",
};

const severityLabels: Record<string, string> = {
  critical: "严重",
  warning: "警告",
  info: "信息",
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [rules, setRules] = useState<AlertRule[]>([]);
  const [tab, setTab] = useState<"alerts" | "rules">("alerts");
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("active");
  const [loading, setLoading] = useState(true);
  const [showAddRule, setShowAddRule] = useState(false);
  const [newRule, setNewRule] = useState({ name: "", type: "cpu", condition: ">", threshold: 90, severity: "warning", cooldown: 300 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [alertsRes, rulesRes] = await Promise.all([
        fetch("/api/alerts?limit=100"),
        fetch("/api/alert-rules"),
      ]);
      if (alertsRes.ok) {
        const data = await alertsRes.json();
        setAlerts(data.alerts);
      }
      if (rulesRes.ok) {
        const data = await rulesRes.json();
        setRules(data.rules);
      }
    } catch {}
    setLoading(false);
  };

  const resolveAlert = async (id: string) => {
    try {
      await fetch("/api/alerts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, resolved: true }),
      });
      setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, resolved: true } : a)));
    } catch {}
  };

  const deleteAlert = async (id: string) => {
    try {
      await fetch(`/api/alerts?id=${id}`, { method: "DELETE" });
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    } catch {}
  };

  const addRule = async () => {
    try {
      const res = await fetch("/api/alert-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRule),
      });
      if (res.ok) {
        setShowAddRule(false);
        setNewRule({ name: "", type: "cpu", condition: ">", threshold: 90, severity: "warning", cooldown: 300 });
        loadData();
      }
    } catch {}
  };

  const toggleRule = async (id: string, enabled: boolean) => {
    try {
      await fetch("/api/alert-rules", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, enabled }),
      });
      setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled } : r)));
    } catch {}
  };

  const deleteRule = async (id: string) => {
    try {
      await fetch(`/api/alert-rules?id=${id}`, { method: "DELETE" });
      setRules((prev) => prev.filter((r) => r.id !== id));
    } catch {}
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filter === "active") return !a.resolved;
    if (filter === "resolved") return a.resolved;
    return true;
  });

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const criticalCount = activeAlerts.filter((a) => a.severity === "critical").length;
  const warningCount = activeAlerts.filter((a) => a.severity === "warning").length;
  const infoCount = activeAlerts.filter((a) => a.severity === "info").length;

  return (
    <SubPageLayout
      title="告警中心"
      subtitle="集中管理和响应所有告警"
      helpContent={helpContent}
      tabs={
        <>
          <button
            onClick={() => setTab("alerts")}
            className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
              tab === "alerts" ? "bg-[#0a84ff]/15 text-[#0a84ff]" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            告警列表
          </button>
          <button
            onClick={() => setTab("rules")}
            className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
              tab === "rules" ? "bg-[#0a84ff]/15 text-[#0a84ff]" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            告警规则
          </button>
        </>
      }
    >
      {tab === "alerts" && (
        <div className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-[#ff453a]/20 bg-[#ff453a]/[0.04]">
              <div className="text-[24px] font-bold text-[#ff453a]">{criticalCount}</div>
              <div className="text-[12px] text-muted-foreground">严重</div>
            </div>
            <div className="p-4 rounded-xl border border-[#ff9f0a]/20 bg-[#ff9f0a]/[0.04]">
              <div className="text-[24px] font-bold text-[#ff9f0a]">{warningCount}</div>
              <div className="text-[12px] text-muted-foreground">警告</div>
            </div>
            <div className="p-4 rounded-xl border border-[#0a84ff]/20 bg-[#0a84ff]/[0.04]">
              <div className="text-[24px] font-bold text-[#0a84ff]">{infoCount}</div>
              <div className="text-[12px] text-muted-foreground">信息</div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06] w-fit">
            {(["all", "active", "resolved"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-md text-[12px] transition-all ${
                  filter === f ? "bg-white/[0.1] text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "全部" : f === "active" ? "活跃" : "已解决"}
              </button>
            ))}
          </div>

          {/* Alert List */}
          {loading && <div className="text-[13px] text-muted-foreground">加载中...</div>}
          {!loading && filteredAlerts.length === 0 && (
            <div className="text-[13px] text-muted-foreground py-8 text-center">
              {filter === "active" ? "没有活跃告警" : "暂无告警记录"}
            </div>
          )}
          <div className="space-y-2">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border bg-white/[0.02] transition-all ${
                  alert.resolved ? "border-white/[0.04] opacity-60" : "border-white/[0.06]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: severityColors[alert.severity] || "#8e8e93" }}
                    />
                    <div>
                      <div className="text-[13px] font-medium">{alert.title}</div>
                      <div className="text-[12px] text-muted-foreground mt-0.5">{alert.message}</div>
                      <div className="text-[11px] text-muted-foreground/60 mt-1">
                        {new Date(alert.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {!alert.resolved && (
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="px-2.5 py-1 rounded-lg text-[11px] bg-[#30d158]/10 text-[#30d158] hover:bg-[#30d158]/20 transition-all"
                      >
                        解决
                      </button>
                    )}
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] transition-all"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "rules" && (
        <div className="space-y-4">
          <button
            onClick={() => setShowAddRule(true)}
            className="btn-apple bg-[#0a84ff] text-white text-[13px]"
          >
            + 新建规则
          </button>

          {showAddRule && (
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  placeholder="规则名称"
                  className="input-apple text-[13px]"
                />
                <select
                  value={newRule.type}
                  onChange={(e) => setNewRule({ ...newRule, type: e.target.value })}
                  className="input-apple text-[13px]"
                >
                  <option value="cpu">CPU 使用率</option>
                  <option value="memory">内存使用率</option>
                  <option value="disk">磁盘使用率</option>
                  <option value="load">系统负载</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <select
                  value={newRule.condition}
                  onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                  className="input-apple text-[13px]"
                >
                  <option value=">">大于</option>
                  <option value="<">小于</option>
                  <option value=">=">大于等于</option>
                  <option value="<=">小于等于</option>
                </select>
                <input
                  type="number"
                  value={newRule.threshold}
                  onChange={(e) => setNewRule({ ...newRule, threshold: parseFloat(e.target.value) })}
                  className="input-apple text-[13px]"
                />
                <select
                  value={newRule.severity}
                  onChange={(e) => setNewRule({ ...newRule, severity: e.target.value })}
                  className="input-apple text-[13px]"
                >
                  <option value="critical">严重</option>
                  <option value="warning">警告</option>
                  <option value="info">信息</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={addRule} className="btn-apple bg-[#0a84ff] text-white text-[12px] px-3 py-1">
                  创建
                </button>
                <button onClick={() => setShowAddRule(false)} className="btn-apple bg-white/[0.06] text-[12px] px-3 py-1">
                  取消
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {rules.map((rule) => (
              <div key={rule.id} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: severityColors[rule.severity] }}
                    />
                    <div>
                      <div className="text-[13px] font-medium">{rule.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {rule.type} {rule.condition} {rule.threshold} · {rule.enabled ? "启用" : "禁用"}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => toggleRule(rule.id, !rule.enabled)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
                        rule.enabled
                          ? "bg-[#30d158]/10 text-[#30d158]"
                          : "bg-white/[0.04] text-muted-foreground"
                      }`}
                    >
                      {rule.enabled ? "启用" : "禁用"}
                    </button>
                    <button
                      onClick={() => deleteRule(rule.id)}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] transition-all"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {rules.length === 0 && !loading && (
              <div className="text-[13px] text-muted-foreground py-8 text-center">暂无告警规则</div>
            )}
          </div>
        </div>
      )}
    </SubPageLayout>
  );
}
