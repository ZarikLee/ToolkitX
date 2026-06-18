"use client";

import { useState } from "react";
import { PortScanner } from "@/components/diagnostics/port-scanner";
import { DnsChecker } from "@/components/diagnostics/dns-checker";
import { SslChecker } from "@/components/diagnostics/ssl-checker";
import { HttpChecker } from "@/components/diagnostics/http-checker";
import { Traceroute } from "@/components/diagnostics/traceroute";
import { DiagnosticReport } from "@/components/diagnostics/diagnostic-report";
import { SubPageLayout } from "@/components/layout/sub-page-layout";
import { TabButton } from "@/components/ui/tab-button";

const helpContent = [
  {
    title: "如何使用诊断工具",
    items: [
      "选择上方的标签页切换诊断类型",
      "在输入框中输入目标地址（IP、域名或 URL）",
      "点击对应的检测按钮，等待结果返回",
      "结果会以表格或卡片形式展示，包含详细指标",
    ],
  },
  {
    title: "各工具说明",
    items: [
      "端口扫描：输入 IP 或域名，扫描常用端口的开放状态",
      "DNS 检查：输入域名，查看 A/MX/NS/TXT 等 DNS 记录",
      "SSL 证书：输入域名，检查证书有效期和颁发者信息",
      "HTTP 检测：输入 URL，检测 HTTP 响应状态码和响应头",
      "路由追踪：输入 IP 或域名，追踪数据包经过的路由节点",
      "诊断报告：选择多个诊断项，一键生成综合报告",
    ],
  },
  {
    title: "注意事项",
    items: [
      "部分功能需要服务器端执行（如端口扫描、路由追踪）",
      "诊断结果仅供参考，实际环境可能存在防火墙限制",
    ],
  },
];

const tools = [
  { id: "port", name: "端口扫描", icon: "🔌", component: PortScanner },
  { id: "dns", name: "DNS 检查", icon: "🌐", component: DnsChecker },
  { id: "ssl", name: "SSL 证书", icon: "🔐", component: SslChecker },
  { id: "http", name: "HTTP 检测", icon: "📡", component: HttpChecker },
  { id: "trace", name: "路由追踪", icon: "🗺️", component: Traceroute },
  { id: "report", name: "诊断报告", icon: "📊", component: DiagnosticReport },
];

export default function DiagnosticsPage() {
  const [activeTool, setActiveTool] = useState("port");

  const ActiveComponent = tools.find((t) => t.id === activeTool)?.component;

  return (
    <SubPageLayout
      title="诊断工具"
      subtitle="网络和服务诊断，快速定位问题"
      helpContent={helpContent}
      tabs={
        <>
          {tools.map((tool) => (
            <TabButton
              key={tool.id}
              active={activeTool === tool.id}
              onClick={() => setActiveTool(tool.id)}
              icon={<span className="text-sm">{tool.icon}</span>}
            >
              {tool.name}
            </TabButton>
          ))}
        </>
      }
    >
      <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </SubPageLayout>
  );
}
