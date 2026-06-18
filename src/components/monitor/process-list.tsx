"use client";

interface ProcessListProps {
  processes: { pid: string; user: string; cpu: string; mem: string; command: string }[];
}

export function ProcessList({ processes }: ProcessListProps) {
  return (
    <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <h3 className="text-[11px] text-muted-foreground/50 uppercase tracking-wider mb-3">
        进程列表 (Top 10)
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-muted-foreground/40 border-b border-white/[0.04]">
              <th className="text-left py-1.5 font-medium">PID</th>
              <th className="text-left py-1.5 font-medium">用户</th>
              <th className="text-right py-1.5 font-medium">CPU%</th>
              <th className="text-right py-1.5 font-medium">MEM%</th>
              <th className="text-left py-1.5 font-medium pl-4">命令</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((proc, i) => (
              <tr
                key={i}
                className="border-b border-white/[0.02] hover:bg-white/[0.02]"
              >
                <td className="py-1.5 font-mono text-foreground/50">{proc.pid}</td>
                <td className="py-1.5 text-foreground/60">{proc.user}</td>
                <td className="py-1.5 text-right font-mono">
                  <span className={parseFloat(proc.cpu) > 50 ? "text-[#ff453a]" : "text-foreground/60"}>
                    {proc.cpu}
                  </span>
                </td>
                <td className="py-1.5 text-right font-mono">
                  <span className={parseFloat(proc.mem) > 50 ? "text-[#ff453a]" : "text-foreground/60"}>
                    {proc.mem}
                  </span>
                </td>
                <td className="py-1.5 font-mono text-foreground/40 pl-4 max-w-[300px] truncate" title={proc.command}>
                  {proc.command}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
