"use client";

import { useState, useEffect } from "react";
import { SubPageLayout } from "@/components/layout/sub-page-layout";
import { TabButton } from "@/components/ui/tab-button";

const helpContent = [
  { title: "功能说明", items: ["集中管理故障知识库", "快速检索故障症状与解决方案", "支持按严重程度分类"] },
  { title: "使用方法", items: ["点击「添加条目」录入新知识", "在搜索栏输入关键词快速查找", "点击卡片查看完整解决方案"] },
];

interface KnowledgeEntry {
  id: string;
  title: string;
  symptom: string;
  cause: string;
  solution: string;
  tags: string[];
  severity: "critical" | "warning" | "info";
  usageCount: number;
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

export default function KedbPage() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<KnowledgeEntry | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    symptom: "",
    cause: "",
    solution: "",
    tags: "",
    severity: "warning" as "critical" | "warning" | "info",
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const res = await fetch("/api/kedb");
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries);
      }
    } catch {}
    setLoading(false);
  };

  const addEntry = async () => {
    if (!form.title.trim()) return;
    try {
      const res = await fetch("/api/kedb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        resetForm();
        loadEntries();
      }
    } catch {}
  };

  const updateEntry = async () => {
    if (!selected || !form.title.trim()) return;
    try {
      const res = await fetch("/api/kedb", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selected.id,
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        resetForm();
        setSelected(null);
        loadEntries();
      }
    } catch {}
  };

  const deleteEntry = async (id: string) => {
    try {
      await fetch(`/api/kedb?id=${id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((e) => e.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {}
  };

  const resetForm = () => {
    setForm({ title: "", symptom: "", cause: "", solution: "", tags: "", severity: "warning" });
    setShowForm(false);
  };

  const startEdit = (entry: KnowledgeEntry) => {
    setForm({
      title: entry.title,
      symptom: entry.symptom,
      cause: entry.cause,
      solution: entry.solution,
      tags: entry.tags.join(", "),
      severity: entry.severity,
    });
    setSelected(entry);
    setShowForm(true);
  };

  const filtered = entries.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.symptom.toLowerCase().includes(search.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <SubPageLayout
      title="故障知识库"
      subtitle="集中管理故障诊断知识，快速定位问题"
      helpContent={helpContent}
      tabs={<></>}
    >
      <div className="flex gap-4 h-full">
        {/* Left: list */}
        <div className="w-80 shrink-0 border-r border-white/[0.06] pr-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索知识条目..."
              className="input-apple text-[13px] flex-1"
            />
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="btn-apple bg-[#0a84ff] text-white text-[13px] px-3 py-1.5"
            >
              + 添加
            </button>
          </div>

          {showForm && (
            <div className="mb-4 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-2">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="标题"
                className="input-apple text-[13px]"
              />
              <textarea
                value={form.symptom}
                onChange={(e) => setForm({ ...form, symptom: e.target.value })}
                placeholder="症状描述"
                className="input-apple text-[13px] resize-none h-16"
              />
              <textarea
                value={form.cause}
                onChange={(e) => setForm({ ...form, cause: e.target.value })}
                placeholder="原因分析"
                className="input-apple text-[13px] resize-none h-16"
              />
              <textarea
                value={form.solution}
                onChange={(e) => setForm({ ...form, solution: e.target.value })}
                placeholder="解决方案"
                className="input-apple text-[13px] resize-none h-16"
              />
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="标签 (逗号分隔)"
                className="input-apple text-[13px]"
              />
              <select
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: e.target.value as any })}
                className="input-apple text-[13px]"
              >
                <option value="critical">严重</option>
                <option value="warning">警告</option>
                <option value="info">信息</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={selected ? updateEntry : addEntry}
                  className="btn-apple bg-[#0a84ff] text-white text-[12px] px-3 py-1"
                >
                  {selected ? "更新" : "创建"}
                </button>
                <button onClick={resetForm} className="btn-apple btn-secondary text-[12px] px-3 py-1">
                  取消
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto space-y-1.5">
            {loading && <div className="text-[13px] text-muted-foreground">加载中...</div>}
            {!loading && filtered.length === 0 && (
              <div className="text-[13px] text-muted-foreground">暂无知识条目</div>
            )}
            {filtered.map((entry) => (
              <div
                key={entry.id}
                onClick={() => setSelected(entry)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selected?.id === entry.id
                    ? "bg-[#0a84ff]/10 border border-[#0a84ff]/30"
                    : "bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: severityColors[entry.severity] }}
                  />
                  <span className="text-[13px] font-medium truncate">{entry.title}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 truncate">{entry.symptom}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className="px-1.5 py-0.5 text-[10px] rounded-md"
                    style={{
                      backgroundColor: `${severityColors[entry.severity]}15`,
                      color: severityColors[entry.severity],
                    }}
                  >
                    {severityLabels[entry.severity]}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">使用 {entry.usageCount} 次</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: detail */}
        <div className="flex-1 overflow-auto pl-4">
          {!selected && !showForm && (
            <div className="h-full flex items-center justify-center text-muted-foreground text-[13px]">
              选择左侧条目查看详情
            </div>
          )}

          {selected && !showForm && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-medium">{selected.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="px-2 py-0.5 text-[11px] rounded-md"
                      style={{
                        backgroundColor: `${severityColors[selected.severity]}15`,
                        color: severityColors[selected.severity],
                      }}
                    >
                      {severityLabels[selected.severity]}
                    </span>
                    <span className="text-[11px] text-muted-foreground">使用 {selected.usageCount} 次</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(selected)}
                    className="btn-apple btn-secondary text-[12px] px-3 py-1.5"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => deleteEntry(selected.id)}
                    className="btn-apple bg-[#ff453a]/10 text-[#ff453a] text-[12px] px-3 py-1.5"
                  >
                    删除
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1">症状</div>
                <div className="text-[13px]">{selected.symptom}</div>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1">原因</div>
                <div className="text-[13px]">{selected.cause}</div>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1">解决方案</div>
                <div className="text-[13px] whitespace-pre-wrap">{selected.solution}</div>
              </div>

              <div>
                <div className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5">标签</div>
                <div className="flex gap-1.5 flex-wrap">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[11px] bg-white/[0.06] text-muted-foreground rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SubPageLayout>
  );
}
