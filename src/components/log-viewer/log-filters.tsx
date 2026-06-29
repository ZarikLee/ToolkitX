"use client";

import { Search, Pause, Play, Trash2 } from "lucide-react";

interface LogFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  levelFilter: string;
  onLevelFilterChange: (value: string) => void;
  paused: boolean;
  onPauseToggle: () => void;
  onClear: () => void;
  lineCount: number;
}

const LEVELS = [
  { value: "all", label: "全部" },
  { value: "error", label: "ERROR", color: "text-[#ff453a]" },
  { value: "warn", label: "WARN", color: "text-[#ff9f0a]" },
  { value: "info", label: "INFO", color: "text-[#30d158]" },
  { value: "debug", label: "DEBUG", color: "text-muted-foreground" },
];

export function LogFilters({
  search,
  onSearchChange,
  levelFilter,
  onLevelFilterChange,
  paused,
  onPauseToggle,
  onClear,
  lineCount,
}: LogFiltersProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/30" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="搜索日志内容..."
          className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-[12px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/40"
        />
      </div>

      {/* Level Filter */}
      <div className="flex gap-1 p-1 rounded-lg bg-white/10 border border-white/15">
        {LEVELS.map((level) => (
          <button
            key={level.value}
            onClick={() => onLevelFilterChange(level.value)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200 ${
              levelFilter === level.value
                ? "bg-white/25 text-foreground"
                : level.color || "text-muted-foreground hover:text-foreground"
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={onPauseToggle}
          className={`p-1.5 rounded-lg transition-all duration-200 ${
            paused
              ? "text-[#ff9f0a] hover:bg-[#ff9f0a]/10"
              : "text-muted-foreground/40 hover:text-foreground hover:bg-white/15"
          }`}
          title={paused ? "继续" : "暂停"}
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
        <button
          onClick={onClear}
          className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-[#ff453a] hover:bg-[#ff453a]/10 transition-all duration-200"
          title="清空"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Line Count */}
      <span className="text-[11px] text-muted-foreground/30 font-mono">
        {lineCount} 行
      </span>
    </div>
  );
}
