"use client";

import { useState, useEffect } from "react";
import { Server, ChevronDown } from "lucide-react";

interface SavedServer {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
}

interface ServerSelectorProps {
  onSelect: (server: SavedServer, logFile: string) => void;
  disabled?: boolean;
}

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

export function ServerSelector({ onSelect, disabled }: ServerSelectorProps) {
  const [servers, setServers] = useState<SavedServer[]>([]);
  const [selectedServer, setSelectedServer] = useState<SavedServer | null>(null);
  const [selectedLog, setSelectedLog] = useState("");
  const [customLog, setCustomLog] = useState("");
  const [showServerDropdown, setShowServerDropdown] = useState(false);
  const [showLogDropdown, setShowLogDropdown] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("quick_servers");
    if (stored) {
      setServers(JSON.parse(stored));
    }
  }, []);

  const handleConnect = () => {
    if (!selectedServer) return;
    const logPath = customLog || selectedLog;
    if (!logPath) return;
    onSelect(selectedServer, logPath);
  };

  return (
    <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] space-y-3">
      <h3 className="text-[12px] font-medium text-muted-foreground/60 uppercase tracking-wider">
        选择服务器和日志文件
      </h3>

      {/* Server Selector */}
      <div className="relative">
        <button
          onClick={() => !disabled && setShowServerDropdown(!showServerDropdown)}
          disabled={disabled}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-left transition-colors hover:bg-white/[0.06] disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <Server className="h-3.5 w-3.5 text-muted-foreground/40" />
            {selectedServer ? (
              <span className="text-foreground">
                {selectedServer.name} ({selectedServer.host})
              </span>
            ) : (
              <span className="text-muted-foreground/40">选择服务器</span>
            )}
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40" />
        </button>

        {showServerDropdown && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowServerDropdown(false)}
            />
            <div className="absolute left-0 right-0 top-full mt-1 z-50 glass-heavy rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden animate-scale-in">
              {servers.length === 0 ? (
                <div className="px-4 py-3 text-[12px] text-muted-foreground/40">
                  暂无保存的服务器，请先在终端模块添加
                </div>
              ) : (
                servers.map((server) => (
                  <button
                    key={server.id}
                    onClick={() => {
                      setSelectedServer(server);
                      setShowServerDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-left hover:bg-white/[0.06] transition-colors"
                  >
                    <Server className="h-3.5 w-3.5 text-muted-foreground/40" />
                    <span className="text-foreground">{server.name}</span>
                    <span className="text-muted-foreground/40 text-[11px]">
                      {server.host}
                    </span>
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Log File Selector */}
      <div className="relative">
        <button
          onClick={() => !disabled && setShowLogDropdown(!showLogDropdown)}
          disabled={disabled}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-left transition-colors hover:bg-white/[0.06] disabled:opacity-50"
        >
          <span className={selectedLog ? "text-foreground" : "text-muted-foreground/40"}>
            {selectedLog || "选择日志文件"}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40" />
        </button>

        {showLogDropdown && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowLogDropdown(false)}
            />
            <div className="absolute left-0 right-0 top-full mt-1 z-50 glass-heavy rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden max-h-64 overflow-y-auto animate-scale-in">
              {COMMON_LOGS.map((log) => (
                <button
                  key={log.path}
                  onClick={() => {
                    setSelectedLog(log.path);
                    setCustomLog("");
                    setShowLogDropdown(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-left hover:bg-white/[0.06] transition-colors"
                >
                  <span className="text-foreground font-mono text-[12px]">
                    {log.path}
                  </span>
                  <span className="text-muted-foreground/40 text-[11px]">
                    {log.name}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Custom Log Path */}
      <input
        type="text"
        value={customLog}
        onChange={(e) => setCustomLog(e.target.value)}
        placeholder="或输入自定义日志路径..."
        disabled={disabled}
        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] font-mono text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/40 disabled:opacity-50"
      />

      {/* Connect Button */}
      <button
        onClick={handleConnect}
        disabled={disabled || !selectedServer || (!selectedLog && !customLog)}
        className="btn-primary"
      >
        {disabled ? "连接中..." : "开始查看"}
      </button>
    </div>
  );
}
