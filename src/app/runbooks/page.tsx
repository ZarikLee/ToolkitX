"use client";

import { useState, useEffect } from "react";
import { SubPageLayout } from "@/components/layout/sub-page-layout";
import { TabButton } from "@/components/ui/tab-button";

const helpContent = [
  { title: "功能说明", items: ["创建和管理自动化运维流程", "支持命令执行、人工确认、等待等步骤", "一键执行自动化流程"] },
  { title: "使用方法", items: ["点击「新建流程」创建自动化流程", "在流程编辑器中添加和排列步骤", "点击「执行」运行流程"] },
];

interface RunbookStep {
  id: string;
  type: "command" | "confirm" | "wait";
  content: string;
  label: string;
}

interface Runbook {
  id: string;
  title: string;
  description: string;
  triggerType: "manual" | "schedule" | "webhook";
  steps: RunbookStep[];
  enabled: boolean;
  createdAt: number;
}

const triggerLabels: Record<string, string> = {
  manual: "手动触发",
  schedule: "定时触发",
  webhook: "Webhook 触发",
};

const stepTypeLabels: Record<string, string> = {
  command: "执行命令",
  confirm: "人工确认",
  wait: "等待延迟",
};

export default function RunbooksPage() {
  const [runbooks, setRunbooks] = useState<Runbook[]>([]);
  const [selected, setSelected] = useState<Runbook | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    triggerType: "manual" as "manual" | "schedule" | "webhook",
  });

  useEffect(() => {
    loadRunbooks();
  }, []);

  const loadRunbooks = async () => {
    try {
      const res = await fetch("/api/runbooks");
      if (res.ok) {
        const data = await res.json();
        setRunbooks(data.runbooks);
      }
    } catch {}
    setLoading(false);
  };

  const addRunbook = async () => {
    if (!form.title.trim()) return;
    try {
      const res = await fetch("/api/runbooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, steps: [] }),
      });
      if (res.ok) {
        resetForm();
        loadRunbooks();
      }
    } catch {}
  };

  const updateRunbook = async () => {
    if (!selected || !form.title.trim()) return;
    try {
      const res = await fetch("/api/runbooks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, ...form }),
      });
      if (res.ok) {
        resetForm();
        setSelected(null);
        loadRunbooks();
      }
    } catch {}
  };

  const deleteRunbook = async (id: string) => {
    try {
      await fetch(`/api/runbooks?id=${id}`, { method: "DELETE" });
      setRunbooks((prev) => prev.filter((r) => r.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {}
  };

  const toggleEnabled = async (id: string, enabled: boolean) => {
    try {
      await fetch("/api/runbooks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, enabled }),
      });
      setRunbooks((prev) => prev.map((r) => (r.id === id ? { ...r, enabled } : r)));
    } catch {}
  };

  const addStep = (type: RunbookStep["type"]) => {
    if (!selected) return;
    const newStep: RunbookStep = {
      id: Date.now().toString(36),
      type,
      content: "",
      label: stepTypeLabels[type],
    };
    const updated = { ...selected, steps: [...selected.steps, newStep] };
    setSelected(updated);
    setRunbooks((prev) => prev.map((r) => (r.id === selected.id ? updated : r)));
  };

  const updateStep = (stepId: string, content: string) => {
    if (!selected) return;
    const updated = {
      ...selected,
      steps: selected.steps.map((s) => (s.id === stepId ? { ...s, content } : s)),
    };
    setSelected(updated);
    setRunbooks((prev) => prev.map((r) => (r.id === selected.id ? updated : r)));
  };

  const removeStep = (stepId: string) => {
    if (!selected) return;
    const updated = { ...selected, steps: selected.steps.filter((s) => s.id !== stepId) };
    setSelected(updated);
    setRunbooks((prev) => prev.map((r) => (r.id === selected.id ? updated : r)));
  };

  const moveStep = (stepId: string, direction: "up" | "down") => {
    if (!selected) return;
    const idx = selected.steps.findIndex((s) => s.id === stepId);
    if (idx === -1) return;
    const newSteps = [...selected.steps];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= newSteps.length) return;
    [newSteps[idx], newSteps[swapIdx]] = [newSteps[swapIdx], newSteps[idx]];
    const updated = { ...selected, steps: newSteps };
    setSelected(updated);
    setRunbooks((prev) => prev.map((r) => (r.id === selected.id ? updated : r)));
  };

  const executeRunbook = async () => {
    if (!selected) return;
    setExecuting(true);
    try {
      await fetch("/api/runbooks/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id }),
      });
    } catch {}
    setExecuting(false);
  };

  const resetForm = () => {
    setForm({ title: "", description: "", triggerType: "manual" });
    setShowForm(false);
  };

  return (
    <SubPageLayout
      title="自动化流程"
      subtitle="创建和管理 Runbook 自动化运维流程"
      helpContent={helpContent}
      tabs={<></>}
    >
      <div className="flex gap-4 h-full">
        {/* Left: list */}
        <div className="w-80 shrink-0 border-r border-white/[0.06] pr-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="btn-apple bg-[#0a84ff] text-white text-[13px] px-3 py-1.5"
            >
              + 新建流程
            </button>
          </div>

          {showForm && (
            <div className="mb-4 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-2">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="流程名称"
                className="input-apple text-[13px]"
              />
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="描述"
                className="input-apple text-[13px] resize-none h-16"
              />
              <select
                value={form.triggerType}
                onChange={(e) => setForm({ ...form, triggerType: e.target.value as any })}
                className="input-apple text-[13px]"
              >
                <option value="manual">手动触发</option>
                <option value="schedule">定时触发</option>
                <option value="webhook">Webhook 触发</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={selected ? updateRunbook : addRunbook}
                  className="btn-apple bg-[#0a84ff] text-white text-[12px] px-3 py-1"
                >
                  {selected ? "更新" : "创建"}
                </button>
                <button onClick={resetForm} className="btn-apple bg-white/[0.06] text-[12px] px-3 py-1">
                  取消
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto space-y-1.5">
            {loading && <div className="text-[13px] text-muted-foreground">加载中...</div>}
            {!loading && runbooks.length === 0 && (
              <div className="text-[13px] text-muted-foreground">暂无自动化流程</div>
            )}
            {runbooks.map((rb) => (
              <div
                key={rb.id}
                onClick={() => setSelected(rb)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selected?.id === rb.id
                    ? "bg-[#0a84ff]/10 border border-[#0a84ff]/30"
                    : "bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium truncate">{rb.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEnabled(rb.id, !rb.enabled);
                    }}
                    className={`w-8 h-[18px] rounded-full transition-all relative ${
                      rb.enabled ? "bg-[#30d158]" : "bg-white/[0.1]"
                    }`}
                  >
                    <div
                      className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white transition-all ${
                        rb.enabled ? "left-[14px]" : "left-[2px]"
                      }`}
                    />
                  </button>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 truncate">{rb.description}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="px-1.5 py-0.5 text-[10px] bg-white/[0.06] text-muted-foreground rounded-md">
                    {triggerLabels[rb.triggerType]}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">{rb.steps.length} 个步骤</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: editor */}
        <div className="flex-1 overflow-auto pl-4">
          {!selected && !showForm && (
            <div className="h-full flex items-center justify-center text-muted-foreground text-[13px]">
              选择左侧流程查看详情
            </div>
          )}

          {selected && !showForm && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-medium">{selected.title}</h3>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{selected.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={executeRunbook}
                    disabled={executing || selected.steps.length === 0}
                    className="btn-apple bg-[#30d158] text-white text-[12px] px-3 py-1.5 disabled:opacity-40"
                  >
                    {executing ? "执行中..." : "执行"}
                  </button>
                  <button
                    onClick={() => {
                      setForm({
                        title: selected.title,
                        description: selected.description,
                        triggerType: selected.triggerType,
                      });
                      setShowForm(true);
                    }}
                    className="btn-apple bg-white/[0.06] text-[12px] px-3 py-1.5"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => deleteRunbook(selected.id)}
                    className="btn-apple bg-[#ff453a]/10 text-[#ff453a] text-[12px] px-3 py-1.5"
                  >
                    删除
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                <span>触发方式: {triggerLabels[selected.triggerType]}</span>
                <span>·</span>
                <span>{selected.steps.length} 个步骤</span>
              </div>

              {/* Step builder */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[13px] font-medium">步骤列表</h4>
                  <div className="flex gap-1">
                    <button
                      onClick={() => addStep("command")}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-[#0a84ff]/10 text-[#0a84ff] hover:bg-[#0a84ff]/20 transition-all"
                    >
                      + 命令
                    </button>
                    <button
                      onClick={() => addStep("confirm")}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-[#ff9f0a]/10 text-[#ff9f0a] hover:bg-[#ff9f0a]/20 transition-all"
                    >
                      + 确认
                    </button>
                    <button
                      onClick={() => addStep("wait")}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-white/[0.06] text-muted-foreground hover:bg-white/[0.1] transition-all"
                    >
                      + 等待
                    </button>
                  </div>
                </div>

                {selected.steps.length === 0 ? (
                  <div className="text-[12px] text-muted-foreground py-6 text-center border border-dashed border-white/[0.08] rounded-xl">
                    点击上方按钮添加步骤
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selected.steps.map((step, idx) => (
                      <div
                        key={step.id}
                        className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-start gap-3"
                      >
                        <div className="text-[11px] text-muted-foreground/40 mt-1 shrink-0 w-5 text-center">
                          {idx + 1}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 text-[10px] rounded-md ${
                                step.type === "command"
                                  ? "bg-[#0a84ff]/10 text-[#0a84ff]"
                                  : step.type === "confirm"
                                  ? "bg-[#ff9f0a]/10 text-[#ff9f0a]"
                                  : "bg-white/[0.06] text-muted-foreground"
                              }`}
                            >
                              {stepTypeLabels[step.type]}
                            </span>
                          </div>
                          {step.type === "wait" ? (
                            <input
                              type="number"
                              value={step.content}
                              onChange={(e) => updateStep(step.id, e.target.value)}
                              placeholder="秒数"
                              className="input-apple text-[12px] w-32"
                            />
                          ) : (
                            <textarea
                              value={step.content}
                              onChange={(e) => updateStep(step.id, e.target.value)}
                              placeholder={step.type === "command" ? "输入要执行的命令..." : "确认提示信息..."}
                              className="input-apple text-[12px] resize-none h-16 font-mono"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-1 shrink-0">
                          <button
                            onClick={() => moveStep(step.id, "up")}
                            disabled={idx === 0}
                            className="px-1.5 py-0.5 text-[10px] text-muted-foreground/40 hover:text-foreground disabled:opacity-20 transition-all"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveStep(step.id, "down")}
                            disabled={idx === selected.steps.length - 1}
                            className="px-1.5 py-0.5 text-[10px] text-muted-foreground/40 hover:text-foreground disabled:opacity-20 transition-all"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => removeStep(step.id)}
                            className="px-1.5 py-0.5 text-[10px] text-[#ff453a]/60 hover:text-[#ff453a] transition-all"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </SubPageLayout>
  );
}
