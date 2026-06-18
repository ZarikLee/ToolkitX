"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { RefreshCw } from "lucide-react";
import { ServerManager, SavedServer } from "@/components/ui/server-manager";
import { SystemOverview } from "@/components/monitor/system-overview";
import { DiskUsage } from "@/components/monitor/disk-usage";
import { ProcessList } from "@/components/monitor/process-list";
import { NetworkStats } from "@/components/monitor/network-stats";
import { SubPageLayout } from "@/components/layout/sub-page-layout";

interface MonitorData {
  cpu: { usage: number; cores: number; model: string };
  memory: { total: number; used: number; free: number; percent: number };
  disk: { fs: string; size: string; used: string; avail: string; usePercent: string; mountpoint: string }[];
  uptime: string;
  hostname: string;
  os: string;
  load: number[];
  processes: { pid: string; user: string; cpu: string; mem: string; command: string }[];
  network: { iface: string; rxBytes: number; txBytes: number }[];
}

const helpContent = [
  {
    title: "如何使用服务器监控",
    items: [
      "从下拉列表选择已保存的服务器，或点击 + 添加新服务器",
      "选择刷新频率（1秒 / 5秒 / 10秒 / 30秒）",
      "系统会通过 SSH 自动采集服务器指标",
      "点击刷新按钮可手动触发一次采集",
    ],
  },
  {
    title: "监控指标",
    items: [
      "CPU 使用率：基于 top 命令采样",
      "内存使用率：基于 free 命令",
      "负载均衡：1/5/15 分钟平均负载",
      "磁盘使用：各分区使用情况",
      "进程列表：CPU/内存占用 Top 10",
      "网络流量：各网卡收发字节数",
    ],
  },
];

const INTERVALS = [
  { value: 1000, label: "1s" },
  { value: 5000, label: "5s" },
  { value: 10000, label: "10s" },
  { value: 30000, label: "30s" },
];

const emptyData: MonitorData = {
  cpu: { usage: 0, cores: 0, model: "N/A" },
  memory: { total: 0, used: 0, free: 0, percent: 0 },
  disk: [],
  uptime: "N/A",
  hostname: "N/A",
  os: "N/A",
  load: [],
  processes: [],
  network: [],
};

export default function MonitorPage() {
  const [server, setServer] = useState<SavedServer | null>(null);
  const [data, setData] = useState<MonitorData>(emptyData);
  const [loading, setLoading] = useState(false);
  const [interval, setInterval_] = useState(5000);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchStats = useCallback(async (sel: SavedServer) => {
    setLoading(true);
    setError(null);

    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const ws = new WebSocket(`${protocol}//${window.location.host}/api/ssh`);

      const commands = [
        `top -bn1 | head -5`,
        `free -m | grep Mem`,
        `df -h | grep -E "^/dev/"`,
        `uptime`,
        `hostname`,
        `cat /etc/os-release | head -2`,
        `cat /proc/loadavg`,
        `ps aux --sort=-%cpu | head -11 | tail -10`,
        `cat /proc/net/dev | grep -v lo`,
      ];

      const results: Record<string, string> = {};
      let completed = 0;

      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: "connect",
          host: sel.host,
          port: sel.port,
          username: sel.username,
          password: sel.password,
          privateKey: sel.privateKey,
        }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if (msg.type === "connected") {
          for (const cmd of commands) {
            ws.send(JSON.stringify({
              type: "exec",
              command: cmd,
              requestId: cmd,
              host: sel.host,
              port: sel.port,
              username: sel.username,
              password: sel.password,
              privateKey: sel.privateKey,
            }));
          }
        }

        if (msg.type === "exec_result") {
          results[msg.requestId] = msg.stdout;
          completed++;

          if (completed >= commands.length) {
            try {
              const parsed = parseMonitorOutput(results);
              setData(parsed);
            } catch (e) {
              setError("解析监控数据失败");
            }
            setLoading(false);
            ws.send(JSON.stringify({ type: "disconnect" }));
            ws.close();
          }
        }

        if (msg.type === "exec_error") {
          setError(msg.error);
          setLoading(false);
          ws.close();
        }
      };

      ws.onerror = () => {
        setError("WebSocket 连接失败");
        setLoading(false);
      };
    } catch (e) {
      setError("采集失败");
      setLoading(false);
    }
  }, []);

  const parseMonitorOutput = (results: Record<string, string>): MonitorData => {
    const topLines = results[`top -bn1 | head -5`]?.split("\n") || [];
    let cpuUsage = 0;
    let cpuCores = 0;
    let cpuModel = "Unknown";
    for (const line of topLines) {
      if (line.includes("Cpu(s)")) {
        const match = line.match(/(\d+\.?\d*)\s*id/);
        if (match) cpuUsage = 100 - parseFloat(match[1]);
      }
      if (line.includes("cpu cores")) {
        const match = line.match(/:\s*(\d+)/);
        if (match) cpuCores = parseInt(match[1]);
      }
      if (line.includes("model name")) {
        const match = line.match(/:\s*(.+)/);
        if (match) cpuModel = match[1].trim();
      }
    }

    const freeLine = results[`free -m | grep Mem`]?.trim() || "";
    const freeParts = freeLine.split(/\s+/);
    const memTotal = parseInt(freeParts[1]) || 0;
    const memUsed = parseInt(freeParts[2]) || 0;
    const memFree = parseInt(freeParts[3]) || 0;
    const memPercent = memTotal > 0 ? (memUsed / memTotal) * 100 : 0;

    const dfLines = results[`df -h | grep -E "^/dev/"`]?.split("\n") || [];
    const disks = dfLines
      .filter((l) => l.trim())
      .map((line) => {
        const parts = line.split(/\s+/);
        return {
          fs: parts[0],
          size: parts[1],
          used: parts[2],
          avail: parts[3],
          usePercent: parts[4],
          mountpoint: parts[5],
        };
      });

    const uptimeLine = results[`uptime`]?.trim() || "";
    const uptimeMatch = uptimeLine.match(/up\s+(.+?),\s+\d+\s+user/);
    const uptime = uptimeMatch ? uptimeMatch[1].trim() : "N/A";

    const hostname = results[`hostname`]?.trim() || "N/A";

    const osLine = results[`cat /etc/os-release | head -2`]?.trim() || "";
    const osMatch = osLine.match(/PRETTY_NAME="(.+)"/);
    const os = osMatch ? osMatch[1] : osLine.split("\n")[0]?.replace("NAME=", "").replace(/"/g, "") || "N/A";

    const loadLine = results[`cat /proc/loadavg`]?.trim() || "";
    const loadParts = loadLine.split(/\s+/);
    const load = [parseFloat(loadParts[0]) || 0, parseFloat(loadParts[1]) || 0, parseFloat(loadParts[2]) || 0];

    const procLines = results[`ps aux --sort=-%cpu | head -11 | tail -10`]?.split("\n") || [];
    const processes = procLines
      .filter((l) => l.trim())
      .map((line) => {
        const parts = line.split(/\s+/);
        return {
          pid: parts[1],
          user: parts[0],
          cpu: parts[2],
          mem: parts[3],
          command: parts.slice(10).join(" ").substring(0, 80),
        };
      });

    const netLines = results[`cat /proc/net/dev | grep -v lo`]?.split("\n") || [];
    const network = netLines
      .filter((l) => l.trim())
      .map((line) => {
        const parts = line.trim().split(/[\s:]+/);
        return {
          iface: parts[0],
          rxBytes: parseInt(parts[1]) || 0,
          txBytes: parseInt(parts[9]) || 0,
        };
      });

    return {
      cpu: { usage: cpuUsage, cores: cpuCores, model: cpuModel },
      memory: { total: memTotal, used: memUsed, free: memFree, percent: memPercent },
      disk: disks,
      uptime,
      hostname,
      os,
      load,
      processes,
      network,
    };
  };

  useEffect(() => {
    if (server) {
      fetchStats(server);
      timerRef.current = setInterval(() => fetchStats(server), interval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [server, interval, fetchStats]);

  return (
    <SubPageLayout
      title="服务器监控"
      subtitle="CPU / 内存 / 磁盘实时监控仪表盘"
      helpContent={helpContent}
      tabs={<></>}
    >
      <div className="space-y-4">
        {/* Server Picker + Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <ServerManager
              onSelect={setServer}
              selectedId={server?.id}
              showSelect
              compact
            />
          </div>

          {/* Interval Selector */}
          <div className="flex gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            {INTERVALS.map((item) => (
              <button
                key={item.value}
                onClick={() => setInterval_(item.value)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200 ${
                  interval === item.value
                    ? "bg-white/[0.1] text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => server && fetchStats(server)}
            disabled={!server || loading}
            className="p-2 rounded-xl text-muted-foreground/40 hover:text-foreground hover:bg-white/[0.06] disabled:opacity-30 transition-all duration-200"
            title="手动刷新"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>

          {/* Status */}
          {server && (
            <div className="flex items-center gap-1.5 text-[11px]">
              <div className={`w-1.5 h-1.5 rounded-full ${loading ? "bg-[#ff9f0a] animate-pulse" : "bg-[#30d158]"}`} />
              <span className="text-muted-foreground/40">{server.host}</span>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-xl border border-[#ff453a]/20 bg-[#ff453a]/[0.06] text-[13px] text-[#ff453a]">
            {error}
          </div>
        )}

        {/* Dashboard */}
        {server && (
          <div className="space-y-4 animate-fade-in">
            <SystemOverview {...data} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <DiskUsage disks={data.disk} />
              <NetworkStats network={data.network} />
            </div>
            <ProcessList processes={data.processes} />
          </div>
        )}

        {/* Placeholder */}
        {!server && (
          <div className="flex flex-col items-center justify-center h-64 rounded-2xl border border-dashed border-white/[0.06] text-muted-foreground/20 text-[13px] gap-2">
            <p>选择服务器后开始监控</p>
            <p className="text-[11px] text-muted-foreground/15">或点击上方 + 添加新服务器</p>
          </div>
        )}
      </div>
    </SubPageLayout>
  );
}
