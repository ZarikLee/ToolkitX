"use client";

import { useState, useEffect } from "react";
import { Clock, Trash2, ArrowUpRight } from "lucide-react";

interface HistoryEntry {
  id: string;
  method: string;
  url: string;
  status: number;
  time: number;
  timestamp: number;
}

interface RequestHistoryProps {
  onSelect: (entry: HistoryEntry) => void;
}

export function RequestHistory({ onSelect }: RequestHistoryProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("api_test_history");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("api_test_history");
    setHistory([]);
  };

  const removeEntry = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    localStorage.setItem("api_test_history", JSON.stringify(updated));
    setHistory(updated);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "text-[#30d158]";
      case "POST": return "text-[#ff9f0a]";
      case "PUT": return "text-[#0a84ff]";
      case "DELETE": return "text-[#ff453a]";
      case "PATCH": return "text-[#bf5af2]";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-[#30d158]";
    if (status >= 300 && status < 400) return "text-[#ff9f0a]";
    if (status >= 400) return "text-[#ff453a]";
    return "text-muted-foreground";
  };

  const formatTime = (timestamp: number) => {
    const d = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 60000) return "刚刚";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
    return d.toLocaleDateString("zh-CN");
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground/30">
        <Clock className="h-8 w-8 mb-2" />
        <p className="text-[12px]">暂无请求历史</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] text-muted-foreground/50 uppercase tracking-wider">
          最近 {history.length} 条
        </span>
        <button
          onClick={clearHistory}
          className="text-[11px] text-muted-foreground/40 hover:text-[#ff453a] transition-colors"
        >
          清空
        </button>
      </div>
      {history.map((entry) => (
        <div
          key={entry.id}
          className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
          onClick={() => onSelect(entry)}
        >
          <span className={`text-[11px] font-mono font-semibold w-12 shrink-0 ${getMethodColor(entry.method)}`}>
            {entry.method}
          </span>
          <span className="flex-1 text-[12px] font-mono text-foreground/60 truncate">
            {entry.url}
          </span>
          <span className={`text-[11px] font-mono ${getStatusColor(entry.status)}`}>
            {entry.status}
          </span>
          <span className="text-[10px] text-muted-foreground/30 shrink-0">
            {entry.time}ms
          </span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(entry);
              }}
              className="p-1 rounded text-muted-foreground/40 hover:text-[#0a84ff] transition-colors"
            >
              <ArrowUpRight className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeEntry(entry.id);
              }}
              className="p-1 rounded text-muted-foreground/40 hover:text-[#ff453a] transition-colors"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function saveToHistory(entry: {
  method: string;
  url: string;
  status: number;
  time: number;
}) {
  const stored = localStorage.getItem("api_test_history");
  const history: HistoryEntry[] = stored ? JSON.parse(stored) : [];
  const newEntry: HistoryEntry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    ...entry,
    timestamp: Date.now(),
  };
  history.unshift(newEntry);
  if (history.length > 50) history.pop();
  localStorage.setItem("api_test_history", JSON.stringify(history));
}
