"use client";

import { useState, useEffect } from "react";
import { SubPageLayout } from "@/components/layout/sub-page-layout";
import { InlineHelp } from "@/components/ui/inline-help";

const helpContent = [
  { title: "功能说明", items: ["监控服务器上的配置文件变更", "检测配置漂移并记录历史", "支持查看变更差异"] },
  { title: "使用方法", items: ["点击「添加文件」输入配置文件路径", "点击「检测」按钮触发漂移检查", "点击文件查看详细信息和变更历史"] },
];

interface Baseline {
  id: string;
  filePath: string;
  fileName: string;
  hash: string;
  enabled: boolean;
  lastCheck: number;
  createdAt: number;
  hasDrift: boolean;
  lastDrift: { id: string; detectedAt: number } | null;
}

interface DriftRecord {
  id: string;
  oldHash: string;
  newHash: string;
  oldContent: string;
  newContent: string;
  detectedAt: number;
}

export default function DriftPage() {
  const [baselines, setBaselines] = useState<Baseline[]>([]);
  const [selected, setSelected] = useState<Baseline | null>(null);
  const [drifts, setDrifts] = useState<DriftRecord[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("");
  const [checking, setChecking] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBaselines();
  }, []);

  const loadBaselines = async () => {
    try {
      const res = await fetch("/api/drift");
      if (res.ok) {
        const data = await res.json();
        setBaselines(data.baselines);
      }
    } catch {}
    setLoading(false);
  };

  const addBaseline = async () => {
    if (!filePath.trim()) return;
    try {
      const res = await fetch("/api/drift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: filePath.trim(), fileName: fileName.trim() || undefined }),
      });
      if (res.ok) {
        setFilePath("");
        setFileName("");
        setShowAdd(false);
        loadBaselines();
      }
    } catch {}
  };

  const removeBaseline = async (id: string) => {
    try {
      await fetch(`/api/drift?id=${id}`, { method: "DELETE" });
      setBaselines((prev) => prev.filter((b) => b.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {}
  };

  const checkDrift = async (id?: string) => {
    setChecking(true);
    try {
      await fetch("/api/drift/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baselineId: id }),
      });
      loadBaselines();
    } catch {}
    setChecking(false);
  };

  const loadDrifts = async (baselineId: string) => {
    try {
      const res = await fetch(`/api/drift/history?baselineId=${baselineId}`);
      if (res.ok) {
        const data = await res.json();
        setDrifts(data.drifts);
      }
    } catch {}
  };

  const selectBaseline = (b: Baseline) => {
    setSelected(b);
    loadDrifts(b.id);
  };

  return (
    <SubPageLayout
      title="配置漂移检测"
      subtitle="监控配置文件变更，及时发现异常"
      helpContent={helpContent}
      tabs={<></>}
    >
      <div className="flex gap-4 h-full">
        {/* Left: file list */}
        <div className="w-80 shrink-0 border-r border-white/15 pr-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setShowAdd(true)}
              className="btn-primary text-[13px]"
            >
              + 添加文件
            </button>
            <button
              onClick={() => checkDrift()}
              disabled={checking}
              className="btn-secondary text-[13px] px-3 py-1.5"
            >
              {checking ? "检测中..." : "全部检测"}
            </button>
          </div>

          {showAdd && (
            <div className="mb-4 p-3 rounded-xl border border-white/15 bg-white/5 space-y-2">
              <input
                type="text"
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
                placeholder="文件路径 (如 /etc/nginx/nginx.conf)"
                className="input-apple text-[13px]"
              />
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="备注名称 (可选)"
                className="input-apple text-[13px]"
              />
              <div className="flex gap-2">
                <button onClick={addBaseline} className="btn-primary text-[12px]">
                  确认
                </button>
                <button onClick={() => setShowAdd(false)} className="btn-secondary text-[12px] px-3 py-1">
                  取消
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto space-y-1.5">
            {loading && <div className="text-[13px] text-muted-foreground">加载中...</div>}
            {!loading && baselines.length === 0 && (
              <div className="text-[13px] text-muted-foreground">暂无监控文件</div>
            )}
            {baselines.map((b) => (
              <div
                key={b.id}
                onClick={() => selectBaseline(b)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selected?.id === b.id
                    ? "bg-[#0a84ff]/10 border border-[#0a84ff]/30"
                    : "bg-white/5 border border-white/15 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      b.hasDrift ? "bg-[#ff9f0a]" : "bg-[#30d158]"
                    }`}
                  />
                  <span className="text-[13px] font-medium truncate">{b.fileName}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 truncate">{b.filePath}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: detail */}
        <div className="flex-1 overflow-auto pl-4">
          {!selected && (
            <div className="h-full flex items-center justify-center text-muted-foreground text-[13px]">
              选择左侧文件查看详情
            </div>
          )}

          {selected && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-medium">{selected.fileName}</h3>
                  <p className="text-[12px] text-muted-foreground">{selected.filePath}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => checkDrift(selected.id)}
                    disabled={checking}
                    className="btn-secondary text-[12px] px-3 py-1.5"
                  >
                    检测
                  </button>
                  <button
                    onClick={() => removeBaseline(selected.id)}
                    className="btn-apple bg-[#ff453a]/10 text-[#ff453a] text-[12px] px-3 py-1.5"
                  >
                    删除
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/15 bg-white/5">
                <div className="text-[12px] text-muted-foreground mb-1">状态</div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      selected.hasDrift ? "bg-[#ff9f0a]" : "bg-[#30d158]"
                    }`}
                  />
                  <span className="text-[13px]">
                    {selected.hasDrift ? "检测到漂移" : "正常"}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-[13px] font-medium mb-2">变更历史</h4>
                {drifts.length === 0 ? (
                  <div className="text-[12px] text-muted-foreground">暂无变更记录</div>
                ) : (
                  <div className="space-y-2">
                    {drifts.map((d) => (
                      <div
                        key={d.id}
                        className="p-3 rounded-xl border border-white/15 bg-white/5"
                      >
                        <div className="text-[12px] text-muted-foreground">
                          {new Date(d.detectedAt).toLocaleString()}
                        </div>
                        <div className="text-[11px] font-mono text-muted-foreground mt-1">
                          <span className="text-[#ff453a]">-</span> {d.oldHash.slice(0, 16)}...
                          <br />
                          <span className="text-[#30d158]">+</span> {d.newHash.slice(0, 16)}...
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
