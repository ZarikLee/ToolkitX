"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ServerManager, SavedServer } from "@/components/ui/server-manager";
import { LogFilters } from "@/components/log-viewer/log-filters";
import { LogViewer } from "@/components/log-viewer/log-viewer";
import { SubPageLayout } from "@/components/layout/sub-page-layout";

const helpContent = [
  {
    title: "如何使用日志查看",
    items: [
      "从下拉列表选择已保存的服务器，或点击 + 添加新服务器",
      "选择常用日志文件或输入自定义路径",
      "点击「开始查看」建立 SSH 连接并开始实时传输日志",
      "日志会自动滚动到最新内容",
    ],
  },
  {
    title: "搜索和过滤",
    items: [
      "在搜索框输入关键词，实时高亮匹配内容",
      "点击级别按钮（ERROR / WARN / INFO / DEBUG）过滤日志",
      "点击暂停按钮可停止自动滚动，方便阅读",
      "点击清空按钮清除当前所有日志行",
    ],
  },
  {
    title: "支持的日志路径",
    items: [
      "/var/log/syslog - 系统日志",
      "/var/log/auth.log - 认证日志",
      "/var/log/nginx/access.log - Nginx 访问日志",
      "也支持自定义任意日志文件路径",
    ],
  },
];

const COMMON_LOGS = [
  { path: "/var/log/syslog", name: "系统日志" },
  { path: "/var/log/auth.log", name: "认证日志" },
  { path: "/var/log/nginx/access.log", name: "Nginx 访问日志" },
  { path: "/var/log/nginx/error.log", name: "Nginx 错误日志" },
  { path: "/var/log/mysql/error.log", name: "MySQL 错误日志" },
  { path: "/var/log/postgresql/postgresql.log", name: "PostgreSQL 日志" },
  { path: "/var/log/docker.log", name: "Docker 日志" },
  { path: "/var/log/cron.log", name: "Cron 日志" },
  { path: "/var/log/kern.log", name: "内核日志" },
  { path: "/var/log/dmesg", name: "dmesg" },
];

export default function LogViewerPage() {
  const [server, setServer] = useState<SavedServer | null>(null);
  const [logFile, setLogFile] = useState("");
  const [customLog, setCustomLog] = useState("");
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [paused, setPaused] = useState(false);
  const [lines, setLines] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const [showLogDropdown, setShowLogDropdown] = useState(false);

  const handleStart = () => {
    if (!server) return;
    const path = customLog || logFile;
    if (!path) return;
    setLogFile(path);
    setConnected(true);
    setLines([]);
  };

  const handleStop = () => {
    setConnected(false);
    setLines([]);
  };

  return (
    <SubPageLayout
      title="日志查看"
      subtitle="SSH 实时查看服务器日志，支持搜索过滤"
      helpContent={helpContent}
      tabs={<></>}
    >
      <div className="space-y-4">
        {/* Server + Log File Selection */}
        <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] space-y-3">
          <h3 className="text-[12px] font-medium text-muted-foreground/60 uppercase tracking-wider">
            选择服务器和日志文件
          </h3>

          <ServerManager
            onSelect={setServer}
            selectedId={server?.id}
            showSelect
          />

          {/* Log File Selector */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <button
                onClick={() => !connected && setShowLogDropdown(!showLogDropdown)}
                disabled={connected}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-left transition-colors hover:bg-white/[0.06] disabled:opacity-50"
              >
                <span className={logFile ? "text-foreground truncate" : "text-muted-foreground/40"}>
                  {logFile || "选择日志文件"}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
              </button>

              {showLogDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLogDropdown(false)} />
                  <div className="absolute left-0 right-0 top-full mt-1 z-50 glass-heavy rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden max-h-64 overflow-y-auto animate-scale-in">
                    {COMMON_LOGS.map((log) => (
                      <button
                        key={log.path}
                        onClick={() => {
                          setLogFile(log.path);
                          setCustomLog("");
                          setShowLogDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-left hover:bg-white/[0.06] transition-colors"
                      >
                        <span className="text-foreground font-mono text-[12px] truncate">{log.path}</span>
                        <span className="text-muted-foreground/40 text-[11px] shrink-0 ml-2">{log.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <input
              type="text"
              value={customLog}
              onChange={(e) => setCustomLog(e.target.value)}
              placeholder="自定义路径..."
              disabled={connected}
              className="flex-1 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] font-mono text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/40 disabled:opacity-50"
            />

            {!connected ? (
              <button
                onClick={handleStart}
                disabled={!server || (!logFile && !customLog)}
                className="btn-primary shrink-0"
              >
                开始查看
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="px-4 py-2.5 rounded-xl bg-[#ff453a] hover:bg-[#ff453a]/90 text-white text-[13px] font-medium transition-all duration-200 active:scale-[0.98] shrink-0"
              >
                停止
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        {connected && (
          <LogFilters
            search={search}
            onSearchChange={setSearch}
            levelFilter={levelFilter}
            onLevelFilterChange={setLevelFilter}
            paused={paused}
            onPauseToggle={() => setPaused(!paused)}
            onClear={() => setLines([])}
            lineCount={lines.length}
          />
        )}

        {/* Log Viewer */}
        {connected && server && (
          <LogViewer
            server={server}
            logFile={logFile}
            search={search}
            levelFilter={levelFilter}
            paused={paused}
          />
        )}

        {/* Placeholder */}
        {!connected && (
          <div className="flex flex-col items-center justify-center h-64 rounded-2xl border border-dashed border-white/[0.06] text-muted-foreground/20 text-[13px] gap-2">
            <p>选择服务器和日志文件后点击「开始查看」</p>
            <p className="text-[11px] text-muted-foreground/15">或点击上方 + 添加新服务器</p>
          </div>
        )}
      </div>
    </SubPageLayout>
  );
}
