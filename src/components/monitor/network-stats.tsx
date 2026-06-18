"use client";

interface NetworkStatsProps {
  network: { iface: string; rxBytes: number; txBytes: number }[];
}

export function NetworkStats({ network }: NetworkStatsProps) {
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  return (
    <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <h3 className="text-[11px] text-muted-foreground/50 uppercase tracking-wider mb-3">
        网络流量
      </h3>
      <div className="space-y-2">
        {network.map((net, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0"
          >
            <span className="text-[12px] font-mono text-foreground/60">{net.iface}</span>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground/30">接收</p>
                <p className="text-[12px] font-mono text-[#30d158]">
                  {formatBytes(net.rxBytes)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground/30">发送</p>
                <p className="text-[12px] font-mono text-[#0a84ff]">
                  {formatBytes(net.txBytes)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
