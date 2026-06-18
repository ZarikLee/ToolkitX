"use client";

import { useState, useEffect } from "react";
import { SubPageLayout } from "@/components/layout/sub-page-layout";
import { ServerManager, SavedServer } from "@/components/ui/server-manager";

const helpContent = [
  { title: "功能说明", items: ["对多台服务器批量执行命令", "实时查看每台服务器的执行结果", "支持历史记录回溯"] },
  { title: "使用方法", items: ["在服务器选择器中选择目标服务器组", "在命令输入框输入要执行的命令", "点击「执行」按钮运行批量操作"] },
];

interface BatchResult {
  serverId: string;
  serverName: string;
  host: string;
  output: string;
  exitCode: number;
  status: "success" | "error" | "pending";
}

interface BatchHistory {
  id: string;
  command: string;
  serverCount: number;
  successCount: number;
  timestamp: number;
}

export default function BatchPage() {
  const [selectedServers, setSelectedServers] = useState<SavedServer[]>([]);
  const [command, setCommand] = useState("");
  const [results, setResults] = useState<BatchResult[]>([]);
  const [executing, setExecuting] = useState(false);
  const [history, setHistory] = useState<BatchHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await fetch("/api/batch/history");
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history);
      }
    } catch {}
  };

  const executeBatch = async () => {
    if (!command.trim() || selectedServers.length === 0) return;
    setExecuting(true);
    setResults(
      selectedServers.map((s) => ({
        serverId: s.id,
        serverName: s.name,
        host: s.host,
        output: "",
        exitCode: -1,
        status: "pending" as const,
      }))
    );

    try {
      const res = await fetch("/api/batch/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          command: command.trim(),
          serverIds: selectedServers.map((s) => s.id),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setResults(data.results);
        loadHistory();
      }
    } catch {}
    setExecuting(false);
  };

  const toggleServer = (server: SavedServer) => {
    setSelectedServers((prev) => {
      const exists = prev.find((s) => s.id === server.id);
      if (exists) return prev.filter((s) => s.id !== server.id);
      return [...prev, server];
    });
  };

  return (
    <SubPageLayout
      title="批量操作"
      subtitle="对多台服务器批量执行运维命令"
      helpContent={helpContent}
      tabs={<></>}
    >
      <div className="space-y-4">
        {/* Server selector */}
        <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <div className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-2">目标服务器</div>
          <ServerManager
            onSelect={toggleServer}
            selectedId={selectedServers.map((s) => s.id).join(",")}
            showSelect
            compact
          />
          {selectedServers.length > 0 && (
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {selectedServers.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] bg-[#0a84ff]/10 text-[#0a84ff] rounded-md"
                >
                  {s.name}
                  <button
                    onClick={() => toggleServer(s)}
                    className="hover:text-[#ff453a] transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Command input */}
        <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <div className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-2">执行命令</div>
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="输入要执行的命令..."
            className="input-apple text-[13px] font-mono resize-none h-20 w-full"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-[11px] text-muted-foreground">
              将在 {selectedServers.length} 台服务器上执行
            </span>
            <button
              onClick={executeBatch}
              disabled={executing || !command.trim() || selectedServers.length === 0}
              className="btn-apple bg-[#0a84ff] text-white text-[13px] px-4 py-1.5 disabled:opacity-40"
            >
              {executing ? "执行中..." : "执行"}
            </button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[13px] font-medium">执行结果</h4>
              <span className="text-[11px] text-muted-foreground">
                {results.filter((r) => r.status === "success").length}/{results.length} 成功
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {results.map((result) => (
                <div
                  key={result.serverId}
                  className={`p-3 rounded-xl border transition-all ${
                    result.status === "success"
                      ? "border-[#30d158]/20 bg-[#30d158]/[0.04]"
                      : result.status === "error"
                      ? "border-[#ff453a]/20 bg-[#ff453a]/[0.04]"
                      : "border-white/[0.06] bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-medium">{result.serverName}</span>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        result.status === "success"
                          ? "bg-[#30d158]"
                          : result.status === "error"
                          ? "bg-[#ff453a]"
                          : "bg-[#ff9f0a] animate-pulse"
                      }`}
                    />
                  </div>
                  <div className="text-[11px] text-muted-foreground/60 font-mono mb-2">{result.host}</div>
                  {result.output && (
                    <pre className="text-[11px] font-mono text-muted-foreground bg-black/20 rounded-lg p-2 overflow-auto max-h-32 whitespace-pre-wrap">
                      {result.output}
                    </pre>
                  )}
                  {result.status === "pending" && (
                    <div className="text-[11px] text-muted-foreground/40">等待中...</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        <div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {showHistory ? "收起历史" : "查看历史记录"}
          </button>
          {showHistory && (
            <div className="mt-3 space-y-2">
              {history.length === 0 ? (
                <div className="text-[12px] text-muted-foreground py-4 text-center">暂无历史记录</div>
              ) : (
                history.map((h) => (
                  <div key={h.id} className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[12px] text-muted-foreground">{h.command}</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground/60">
                        {new Date(h.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1">
                      {h.serverCount} 台服务器 · {h.successCount} 成功
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </SubPageLayout>
  );
}
