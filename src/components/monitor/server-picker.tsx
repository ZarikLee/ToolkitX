"use client";

import { useState, useEffect } from "react";
import { Server, ChevronDown, RefreshCw } from "lucide-react";

interface SavedServer {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKey?: string;
}

interface ServerPickerProps {
  onSelect: (server: SavedServer) => void;
  onRefresh: () => void;
  selected: SavedServer | null;
  loading: boolean;
  interval: number;
  onIntervalChange: (ms: number) => void;
}

const INTERVALS = [
  { value: 1000, label: "1s" },
  { value: 5000, label: "5s" },
  { value: 10000, label: "10s" },
  { value: 30000, label: "30s" },
];

export function ServerPicker({
  onSelect,
  onRefresh,
  selected,
  loading,
  interval,
  onIntervalChange,
}: ServerPickerProps) {
  const [servers, setServers] = useState<SavedServer[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("quick_servers");
    if (stored) {
      setServers(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Server Selector */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-[13px] transition-colors hover:bg-white/15"
        >
          <Server className="h-3.5 w-3.5 text-muted-foreground/40" />
          {selected ? (
            <span className="text-foreground">{selected.name}</span>
          ) : (
            <span className="text-muted-foreground/40">选择服务器</span>
          )}
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40" />
        </button>

        {showDropdown && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
            <div className="absolute left-0 top-full mt-1 z-50 glass-heavy rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden min-w-[200px] animate-scale-in">
              {servers.length === 0 ? (
                <div className="px-4 py-3 text-[12px] text-muted-foreground/40">
                  暂无服务器
                </div>
              ) : (
                servers.map((server) => (
                  <button
                    key={server.id}
                    onClick={() => {
                      onSelect(server);
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-left hover:bg-white/15 transition-colors"
                  >
                    <Server className="h-3.5 w-3.5 text-muted-foreground/40" />
                    <span className="text-foreground">{server.name}</span>
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Interval Selector */}
      <div className="flex gap-1 p-1 rounded-lg bg-white/10 border border-white/15">
        {INTERVALS.map((item) => (
          <button
            key={item.value}
            onClick={() => onIntervalChange(item.value)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200 ${
              interval === item.value
                ? "bg-white/25 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        disabled={!selected || loading}
        className="p-2 rounded-xl text-muted-foreground/40 hover:text-foreground hover:bg-white/15 disabled:opacity-30 transition-all duration-200"
        title="手动刷新"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
      </button>

      {/* Status */}
      {selected && (
        <div className="flex items-center gap-1.5 text-[11px]">
          <div className={`w-1.5 h-1.5 rounded-full ${loading ? "bg-[#ff9f0a] animate-pulse" : "bg-[#30d158]"}`} />
          <span className="text-muted-foreground/40">
            {selected.host}
          </span>
        </div>
      )}
    </div>
  );
}
