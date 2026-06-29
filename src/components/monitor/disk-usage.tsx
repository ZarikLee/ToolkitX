"use client";

interface DiskUsageProps {
  disks: { fs: string; size: string; used: string; avail: string; usePercent: string; mountpoint: string }[];
}

export function DiskUsage({ disks }: DiskUsageProps) {
  const getColor = (percent: number) => {
    if (percent < 60) return "#30d158";
    if (percent < 85) return "#ff9f0a";
    return "#ff453a";
  };

  return (
    <div className="p-4 rounded-xl border border-white/15 bg-white/5">
      <h3 className="text-[11px] text-muted-foreground/50 uppercase tracking-wider mb-3">
        磁盘使用
      </h3>
      <div className="space-y-3">
        {disks.map((disk, i) => {
          const percent = parseFloat(disk.usePercent) || 0;
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-mono text-foreground/70">
                    {disk.mountpoint}
                  </span>
                  <span className="text-[10px] text-muted-foreground/30 font-mono">
                    {disk.fs}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground/50">
                  {disk.used} / {disk.size}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${percent}%`,
                    background: getColor(percent),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
