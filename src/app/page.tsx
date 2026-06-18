"use client";

import Link from "next/link";
import {
  FileCode,
  ScrollText,
  Search,
  Wrench,
  Terminal,
  Globe,
  FileText,
  Activity,
} from "lucide-react";

const tools = [
  {
    name: "配置生成器",
    description: "引导式生成 Docker Compose、Nginx、Systemd 等配置文件",
    href: "/config-generator",
    icon: FileCode,
    gradient: "from-[#0a84ff] to-[#5e5ce6]",
    glow: "rgba(10, 132, 255, 0.15)",
  },
  {
    name: "脚本库",
    description: "Python/SQL/Shell 脚本模板 + AI 生成",
    href: "/scripts",
    icon: ScrollText,
    gradient: "from-[#30d158] to-[#34c759]",
    glow: "rgba(48, 209, 88, 0.15)",
  },
  {
    name: "诊断工具",
    description: "端口探测、DNS 查询、SSL 检查、路径追踪",
    href: "/diagnostics",
    icon: Search,
    gradient: "from-[#bf5af2] to-[#5e5ce6]",
    glow: "rgba(191, 90, 242, 0.15)",
  },
  {
    name: "数据处理",
    description: "JSON/YAML 转换、编码解码、时间戳、哈希计算",
    href: "/tools",
    icon: Wrench,
    gradient: "from-[#ff9f0a] to-[#ff375f]",
    glow: "rgba(255, 159, 10, 0.15)",
  },
  {
    name: "在线终端",
    description: "SSH 连接 + 命令库 + 命令笔记本",
    href: "/terminal",
    icon: Terminal,
    gradient: "from-[#64d2ff] to-[#0a84ff]",
    glow: "rgba(100, 210, 255, 0.15)",
  },
  {
    name: "API 测试",
    description: "HTTP 请求测试，支持 REST API 调试",
    href: "/api-tester",
    icon: Globe,
    gradient: "from-[#ff375f] to-[#bf5af2]",
    glow: "rgba(255, 55, 95, 0.15)",
  },
  {
    name: "日志查看",
    description: "SSH 实时查看服务器日志，搜索过滤",
    href: "/log-viewer",
    icon: FileText,
    gradient: "from-[#ff9f0a] to-[#30d158]",
    glow: "rgba(255, 159, 10, 0.15)",
  },
  {
    name: "服务器监控",
    description: "CPU/内存/磁盘实时监控仪表盘",
    href: "/monitor",
    icon: Activity,
    gradient: "from-[#40c8e0] to-[#0a84ff]",
    glow: "rgba(64, 200, 224, 0.15)",
  },
];

export default function HomePage() {
  return (
    <main className="flex-1 overflow-auto relative">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12 relative z-10">
        {/* Hero */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-gradient text-[42px] font-bold tracking-tight mb-4">
            ToolkitX
          </h1>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-lg">
            运维工具箱 + AI 助手，一站式解决日常运维需求
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <Link
              key={tool.name}
              href={tool.href}
              className={`group relative p-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] animate-fade-in stagger-${i + 1}`}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${tool.glow}, transparent 60%)`,
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-9 h-9 rounded-[10px] bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-[0_2px_8px_${tool.glow}]`}
                  >
                    <tool.icon className="h-4.5 w-4.5 text-white" />
                  </div>
                  <span className="text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-300 text-sm translate-x-1 group-hover:translate-x-0">
                    →
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold tracking-tight mb-1">
                  {tool.name}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
