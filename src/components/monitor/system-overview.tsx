"use client";

interface SystemOverviewProps {
  cpu: { usage: number; cores: number; model: string };
  memory: { total: number; used: number; free: number; percent: number };
  uptime: string;
  hostname: string;
  os: string;
  load: number[];
}

function GaugeBar({ percent, color }: { percent: number; color: string }) {
  return (
    <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${Math.min(percent, 100)}%`,
          background: color,
        }}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  percent,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  percent?: number;
  color: string;
}) {
  return (
    <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] text-muted-foreground/50 uppercase tracking-wider">
          {label}
        </span>
        {percent !== undefined && (
          <span className="text-[12px] font-mono font-medium" style={{ color }}>
            {percent.toFixed(1)}%
          </span>
        )}
      </div>
      <p className="text-[20px] font-bold tracking-tight mb-0.5">{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground/40">{sub}</p>}
      {percent !== undefined && (
        <div className="mt-3">
          <GaugeBar percent={percent} color={color} />
        </div>
      )}
    </div>
  );
}

export function SystemOverview({
  cpu,
  memory,
  uptime,
  hostname,
  os,
  load,
}: SystemOverviewProps) {
  const getCpuColor = (usage: number) => {
    if (usage < 50) return "#30d158";
    if (usage < 80) return "#ff9f0a";
    return "#ff453a";
  };

  const getMemColor = (percent: number) => {
    if (percent < 60) return "#0a84ff";
    if (percent < 85) return "#ff9f0a";
    return "#ff453a";
  };

  const formatMemory = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
    return `${mb} MB`;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        label="CPU"
        value={`${cpu.usage.toFixed(1)}%`}
        sub={`${cpu.cores} 核心 · ${cpu.model}`}
        percent={cpu.usage}
        color={getCpuColor(cpu.usage)}
      />
      <StatCard
        label="内存"
        value={`${memory.percent.toFixed(1)}%`}
        sub={`${formatMemory(memory.used)} / ${formatMemory(memory.total)}`}
        percent={memory.percent}
        color={getMemColor(memory.percent)}
      />
      <StatCard
        label="负载"
        value={load.length > 0 ? load[0].toFixed(2) : "N/A"}
        sub={load.length >= 3 ? `${load[0].toFixed(1)} / ${load[1].toFixed(1)} / ${load[2].toFixed(1)}` : ""}
        color="#bf5af2"
      />
      <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-muted-foreground/50 uppercase tracking-wider">
            系统
          </span>
        </div>
        <p className="text-[13px] font-medium mb-0.5 truncate" title={hostname}>
          {hostname}
        </p>
        <p className="text-[11px] text-muted-foreground/40 truncate" title={os}>
          {os}
        </p>
        <p className="text-[11px] text-muted-foreground/40 mt-1">
          运行 {uptime}
        </p>
      </div>
    </div>
  );
}
