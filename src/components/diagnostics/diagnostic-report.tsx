"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";
import { CopyButton } from "@/components/ui/copy-button";

const reportHelp = [
  { title: "功能说明", items: ["一键对目标执行多种诊断", "生成综合诊断报告", "支持导出 Markdown 格式"] },
  { title: "使用方法", items: ["输入目标 IP 或域名", "选择要执行的诊断项目", "点击「生成报告」查看综合结果"] },
];

interface DiagnosticResult {
  type: string;
  target: string;
  result: any;
  timestamp: number;
  error?: string;
}

const diagnosticTypes = [
  { id: "ping", name: "Ping 测试", icon: "📡" },
  { id: "port", name: "端口扫描", icon: "🔌" },
  { id: "dns", name: "DNS 查询", icon: "🌐" },
  { id: "ssl", name: "SSL 证书", icon: "🔐" },
  { id: "http", name: "HTTP 检测", icon: "🌍" },
  { id: "trace", name: "路由追踪", icon: "🗺️" },
];

function formatResult(r: DiagnosticResult): string {
  const lines: string[] = [`## ${r.type.toUpperCase()} - ${r.target}`, ""];

  if (r.error) {
    lines.push(`❌ Error: ${r.error}`);
    return lines.join("\n");
  }

  switch (r.type) {
    case "ping": {
      const s = r.result.stats;
      lines.push(`Packet Loss: ${r.result.packetLoss}`);
      if (s) {
        lines.push(`RTT: min=${s.min}ms avg=${s.avg}ms max=${s.max}ms`);
      }
      break;
    }
    case "port": {
      lines.push("| Port | Status |");
      lines.push("|------|--------|");
      for (const p of r.result.ports) {
        lines.push(`| ${p.port} | ${p.status} |`);
      }
      break;
    }
    case "dns": {
      lines.push(`Record Type: ${r.result.type}`);
      lines.push("Records:");
      for (const rec of r.result.records) {
        lines.push(`- ${rec}`);
      }
      break;
    }
    case "ssl": {
      const c = r.result.certificate;
      if (c.validFrom) lines.push(`Valid From: ${c.validFrom}`);
      if (c.validTo) lines.push(`Valid To: ${c.validTo}`);
      if (c.subject) lines.push(`Subject: ${c.subject}`);
      if (c.issuer) lines.push(`Issuer: ${c.issuer}`);
      break;
    }
    case "http": {
      if (r.result.error) {
        lines.push(`Error: ${r.result.error}`);
      } else {
        lines.push(`Status: ${r.result.status} ${r.result.statusText}`);
        lines.push(`Latency: ${r.result.latency}ms`);
      }
      break;
    }
    case "trace": {
      lines.push("| Hop | Host | Times |");
      lines.push("|-----|------|-------|");
      for (const h of r.result.hops) {
        lines.push(`| ${h.hop} | ${h.host} | ${h.times.join(", ")} |`);
      }
      break;
    }
  }

  return lines.join("\n");
}

export function DiagnosticReport() {
  const [target, setTarget] = useState("");
  const [selected, setSelected] = useState<string[]>(["ping", "port", "dns", "ssl", "http"]);
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState("");

  const toggleType = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const generateReport = async () => {
    if (!target.trim() || selected.length === 0) return;
    setRunning(true);
    setResults([]);

    const allResults: DiagnosticResult[] = [];

    for (let i = 0; i < selected.length; i++) {
      const type = selected[i];
      setProgress(`${diagnosticTypes.find((t) => t.id === type)?.name} (${i + 1}/${selected.length})...`);

      try {
        const res = await fetch("/api/diagnostics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, target: target.trim() }),
        });

        if (res.ok) {
          const data = await res.json();
          allResults.push(data);
        } else {
          allResults.push({ type, target: target.trim(), result: null, timestamp: Date.now(), error: "Request failed" });
        }
      } catch {
        allResults.push({ type, target: target.trim(), result: null, timestamp: Date.now(), error: "Network error" });
      }

      setResults([...allResults]);
    }

    setRunning(false);
    setProgress("");
  };

  const generateMarkdown = (): string => {
    const lines: string[] = [
      `# Diagnostic Report`,
      `**Target:** ${target}`,
      `**Time:** ${new Date().toISOString()}`,
      "",
      "---",
      "",
    ];
    for (const r of results) {
      lines.push(formatResult(r));
      lines.push("");
    }
    return lines.join("\n");
  };

  return (
    <div className="space-y-6">
      <InlineHelp content={reportHelp} />

      <div className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">目标地址</label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="IP 地址或域名"
            className="input-apple"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">诊断项目</label>
          <div className="flex flex-wrap gap-2">
            {diagnosticTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => toggleType(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] transition-all ${
                  selected.includes(t.id)
                    ? "bg-[#0a84ff]/15 text-[#0a84ff] border border-[#0a84ff]/30"
                    : "bg-white/10 text-muted-foreground border border-white/15 hover:bg-white/20"
                }`}
              >
                <span>{t.icon}</span>
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateReport}
          disabled={!target.trim() || selected.length === 0 || running}
          className="btn-primary"
        >
          {running ? progress : "生成报告"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-medium">诊断结果</h3>
            <CopyButton text={generateMarkdown()} />
          </div>

          <div className="grid gap-3">
            {results.map((r, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-white/15 bg-white/5 space-y-2"
              >
                <div className="flex items-center gap-2 text-[13px] font-medium">
                  <span>{diagnosticTypes.find((t) => t.id === r.type)?.icon}</span>
                  <span>{diagnosticTypes.find((t) => t.id === r.type)?.name}</span>
                  {r.error && <span className="text-[#ff453a] text-[12px]">Failed</span>}
                </div>
                <pre className="text-[12px] text-muted-foreground whitespace-pre-wrap font-mono">
                  {r.error ? r.error : JSON.stringify(r.result, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
