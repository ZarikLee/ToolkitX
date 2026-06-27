"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  FileCode,
  ScrollText,
  Search,
  Terminal,
  Globe,
  FileText,
  Activity,
  Clock,
  Lock,
  Hash,
  Key,
  Fingerprint,
  Palette,
  Type,
  ArrowRightLeft,
  Link2,
  QrCode,
  IdCard,
  Shield,
  Timer,
  Network,
  TerminalSquare,
  Database,
  FileDiff,
  Binary,
  Scissors,
  Braces,
  Container,
  ShieldCheck,
  Regex,
  Globe2,
  FileSearch,
  FileCode2,
  Star,
  BookOpen,
} from "lucide-react";

const allTools = [
  {
    name: "在线终端",
    description: "SSH 连接 + 命令库",
    href: "/terminal",
    icon: Terminal,
    gradient: "from-[#64d2ff] to-[#0a84ff]",
    glow: "rgba(100, 210, 255, 0.15)",
    category: "运维",
    tags: ["ssh", "终端", "命令"],
    hot: true,
  },
  {
    name: "诊断工具",
    description: "端口探测、DNS、SSL、路径追踪",
    href: "/diagnostics",
    icon: Search,
    gradient: "from-[#bf5af2] to-[#5e5ce6]",
    glow: "rgba(191, 90, 242, 0.15)",
    category: "运维",
    tags: ["端口", "dns", "ssl", "诊断"],
    hot: true,
  },
  {
    name: "知识库",
    description: "Linux / SQL / 故障排查",
    href: "/knowledge",
    icon: BookOpen,
    gradient: "from-[#30d158] to-[#0a84ff]",
    glow: "rgba(48, 209, 88, 0.15)",
    category: "运维",
    tags: ["知识", "linux", "sql", "排查"],
  },
  {
    name: "JSON 格式化",
    description: "JSON 格式化、压缩、校验",
    href: "/tools?tool=json",
    icon: Braces,
    gradient: "from-[#ff9f0a] to-[#ff375f]",
    glow: "rgba(255, 159, 10, 0.15)",
    category: "数据格式",
    tags: ["json", "格式化", "压缩", "校验"],
  },
  {
    name: "编解码",
    description: "Base64、URL 编码/解码",
    href: "/tools?tool=encoding",
    icon: Lock,
    gradient: "from-[#64d2ff] to-[#0a84ff]",
    glow: "rgba(100, 210, 255, 0.15)",
    category: "编码加密",
    tags: ["base64", "url", "编码", "解码"],
  },
  {
    name: "时间戳转换",
    description: "Unix 时间戳 ↔ 日期",
    href: "/tools?tool=timestamp",
    icon: Clock,
    gradient: "from-[#ff9f0a] to-[#30d158]",
    glow: "rgba(255, 159, 10, 0.15)",
    category: "转换器",
    tags: ["时间戳", "timestamp", "日期"],
  },
  {
    name: "服务器监控",
    description: "CPU/内存/磁盘实时监控",
    href: "/monitor",
    icon: Activity,
    gradient: "from-[#40c8e0] to-[#0a84ff]",
    glow: "rgba(64, 200, 224, 0.15)",
    category: "运维",
    tags: ["监控", "cpu", "内存", "磁盘"],
  },
  {
    name: "日志查看",
    description: "SSH 实时查看服务器日志",
    href: "/log-viewer",
    icon: FileText,
    gradient: "from-[#ff9f0a] to-[#30d158]",
    glow: "rgba(255, 159, 10, 0.15)",
    category: "运维",
    tags: ["日志", "log", "查看"],
  },
  {
    name: "API 测试",
    description: "REST API 调试工具",
    href: "/api-tester",
    icon: Globe,
    gradient: "from-[#ff375f] to-[#bf5af2]",
    glow: "rgba(255, 55, 95, 0.15)",
    category: "运维",
    tags: ["api", "http", "rest", "调试"],
  },
  {
    name: "哈希计算",
    description: "MD5、SHA-1、SHA-256",
    href: "/tools?tool=hash",
    icon: Hash,
    gradient: "from-[#ff375f] to-[#bf5af2]",
    glow: "rgba(255, 55, 95, 0.15)",
    category: "编码加密",
    tags: ["md5", "sha", "哈希", "hash"],
  },
  {
    name: "配置生成器",
    description: "Docker Compose、Nginx、Systemd 配置",
    href: "/config-generator",
    icon: FileCode,
    gradient: "from-[#0a84ff] to-[#5e5ce6]",
    glow: "rgba(10, 132, 255, 0.15)",
    category: "运维",
    tags: ["docker", "nginx", "systemd", "配置"],
  },
  {
    name: "JWT 解码",
    description: "JWT Token 解析查看",
    href: "/tools?tool=jwt",
    icon: Fingerprint,
    gradient: "from-[#bf5af2] to-[#5e5ce6]",
    glow: "rgba(191, 90, 242, 0.15)",
    category: "编码加密",
    tags: ["jwt", "token", "解码"],
  },
  {
    name: "chmod 计算",
    description: "文件权限计算器",
    href: "/tools?tool=chmod",
    icon: Lock,
    gradient: "from-[#64d2ff] to-[#0a84ff]",
    glow: "rgba(100, 210, 255, 0.15)",
    category: "转换器",
    tags: ["chmod", "权限", "计算"],
  },
  {
    name: "密码生成",
    description: "安全随机密码生成",
    href: "/tools?tool=password",
    icon: Key,
    gradient: "from-[#64d2ff] to-[#0a84ff]",
    glow: "rgba(100, 210, 255, 0.15)",
    category: "生成器",
    tags: ["密码", "password", "生成"],
  },
  {
    name: "SQL 美化",
    description: "SQL 语句格式化",
    href: "/tools?tool=sql",
    icon: Database,
    gradient: "from-[#30d158] to-[#34c759]",
    glow: "rgba(48, 209, 88, 0.15)",
    category: "数据格式",
    tags: ["sql", "格式化", "美化"],
  },
  {
    name: "脚本库",
    description: "Python/SQL/Shell 脚本模板 + AI",
    href: "/scripts",
    icon: ScrollText,
    gradient: "from-[#30d158] to-[#34c759]",
    glow: "rgba(48, 209, 88, 0.15)",
    category: "运维",
    tags: ["python", "sql", "shell", "脚本"],
  },
  {
    name: "YAML ↔ JSON",
    description: "YAML 与 JSON 互转",
    href: "/tools?tool=yaml-json",
    icon: ArrowRightLeft,
    gradient: "from-[#0a84ff] to-[#5e5ce6]",
    glow: "rgba(10, 132, 255, 0.15)",
    category: "数据格式",
    tags: ["yaml", "json", "转换"],
  },
  {
    name: "正则测试",
    description: "正则表达式测试",
    href: "/tools?tool=regex",
    icon: Regex,
    gradient: "from-[#30d158] to-[#34c759]",
    glow: "rgba(48, 209, 88, 0.15)",
    category: "文本工具",
    tags: ["正则", "regex", "测试"],
  },
  {
    name: "子网计算器",
    description: "IPv4 子网划分计算",
    href: "/tools?tool=subnet",
    icon: Network,
    gradient: "from-[#64d2ff] to-[#0a84ff]",
    glow: "rgba(100, 210, 255, 0.15)",
    category: "网络工具",
    tags: ["子网", "subnet", "ipv4", "计算"],
  },
  {
    name: "Docker 转换",
    description: "docker run → compose",
    href: "/tools?tool=docker",
    icon: Container,
    gradient: "from-[#30d158] to-[#34c759]",
    glow: "rgba(48, 209, 88, 0.15)",
    category: "转换器",
    tags: ["docker", "compose", "转换"],
  },
  {
    name: "URL 解析",
    description: "URL 各部分解析",
    href: "/tools?tool=url",
    icon: Link2,
    gradient: "from-[#bf5af2] to-[#5e5ce6]",
    glow: "rgba(191, 90, 242, 0.15)",
    category: "Web 工具",
    tags: ["url", "解析", "链接"],
  },
  {
    name: "密码强度",
    description: "密码强度分析评估",
    href: "/tools?tool=strength",
    icon: ShieldCheck,
    gradient: "from-[#ff375f] to-[#bf5af2]",
    glow: "rgba(255, 55, 95, 0.15)",
    category: "生成器",
    tags: ["密码", "强度", "分析"],
  },
  {
    name: "文本对比",
    description: "文本差异对比",
    href: "/tools?tool=text-diff",
    icon: Scissors,
    gradient: "from-[#ff9f0a] to-[#30d158]",
    glow: "rgba(255, 159, 10, 0.15)",
    category: "文本工具",
    tags: ["文本", "diff", "对比", "差异"],
  },
  {
    name: "Markdown → HTML",
    description: "Markdown 转 HTML",
    href: "/tools?tool=markdown",
    icon: FileCode2,
    gradient: "from-[#bf5af2] to-[#5e5ce6]",
    glow: "rgba(191, 90, 242, 0.15)",
    category: "数据格式",
    tags: ["markdown", "html", "转换"],
  },
  {
    name: "HMAC 生成",
    description: "HMAC-SHA256/512 签名",
    href: "/tools?tool=hmac",
    icon: Key,
    gradient: "from-[#ff9f0a] to-[#30d158]",
    glow: "rgba(255, 159, 10, 0.15)",
    category: "编码加密",
    tags: ["hmac", "签名", "sha256"],
  },
  {
    name: "二维码生成",
    description: "文本/URL 生成二维码",
    href: "/tools?tool=qr",
    icon: QrCode,
    gradient: "from-[#30d158] to-[#34c759]",
    glow: "rgba(48, 209, 88, 0.15)",
    category: "生成器",
    tags: ["二维码", "qr", "生成"],
  },
  {
    name: "UUID 生成",
    description: "UUID v1/v4 批量生成",
    href: "/tools?tool=uuid",
    icon: IdCard,
    gradient: "from-[#0a84ff] to-[#5e5ce6]",
    glow: "rgba(10, 132, 255, 0.15)",
    category: "生成器",
    tags: ["uuid", "生成", "批量"],
  },
  {
    name: "OTP 生成",
    description: "TOTP 动态验证码",
    href: "/tools?tool=otp",
    icon: Timer,
    gradient: "from-[#ff9f0a] to-[#30d158]",
    glow: "rgba(255, 159, 10, 0.15)",
    category: "生成器",
    tags: ["otp", "totp", "验证码"],
  },
  {
    name: "MAC 地址",
    description: "随机 MAC 地址生成",
    href: "/tools?tool=mac",
    icon: Network,
    gradient: "from-[#30d158] to-[#34c759]",
    glow: "rgba(48, 209, 88, 0.15)",
    category: "生成器",
    tags: ["mac", "地址", "生成"],
  },
  {
    name: "颜色转换",
    description: "HEX/RGB/HSL 互转",
    href: "/tools?tool=color",
    icon: Palette,
    gradient: "from-[#ff375f] to-[#bf5af2]",
    glow: "rgba(255, 55, 95, 0.15)",
    category: "转换器",
    tags: ["颜色", "color", "hex", "rgb", "hsl"],
  },
  {
    name: "大小写转换",
    description: "8种大小写格式转换",
    href: "/tools?tool=case",
    icon: Type,
    gradient: "from-[#0a84ff] to-[#5e5ce6]",
    glow: "rgba(10, 132, 255, 0.15)",
    category: "转换器",
    tags: ["大小写", "case", "转换"],
  },
  {
    name: "UA 解析",
    description: "User-Agent 解析",
    href: "/tools?tool=ua",
    icon: Globe2,
    gradient: "from-[#ff9f0a] to-[#ff375f]",
    glow: "rgba(255, 159, 10, 0.15)",
    category: "Web 工具",
    tags: ["ua", "user-agent", "解析"],
  },
  {
    name: "MIME 参考",
    description: "MIME 类型速查表",
    href: "/tools?tool=mime",
    icon: FileCode2,
    gradient: "from-[#0a84ff] to-[#5e5ce6]",
    glow: "rgba(10, 132, 255, 0.15)",
    category: "Web 工具",
    tags: ["mime", "类型", "参考"],
  },
  {
    name: "JSON Diff",
    description: "JSON 对比差异",
    href: "/tools?tool=json-diff",
    icon: FileDiff,
    gradient: "from-[#ff375f] to-[#bf5af2]",
    glow: "rgba(255, 55, 95, 0.15)",
    category: "Web 工具",
    tags: ["json", "diff", "对比", "差异"],
  },
  {
    name: "文本统计",
    description: "字符/单词/句子统计",
    href: "/tools?tool=text-stat",
    icon: Binary,
    gradient: "from-[#bf5af2] to-[#5e5ce6]",
    glow: "rgba(191, 90, 242, 0.15)",
    category: "文本工具",
    tags: ["文本", "统计", "字符", "单词"],
  },
  {
    name: "Lorem Ipsum",
    description: "占位文本生成",
    href: "/tools?tool=lorem",
    icon: FileText,
    gradient: "from-[#bf5af2] to-[#5e5ce6]",
    glow: "rgba(191, 90, 242, 0.15)",
    category: "生成器",
    tags: ["lorem", "ipsum", "占位", "文本"],
  },
  {
    name: "配置漂移",
    description: "配置文件变更检测",
    href: "/drift",
    icon: FileDiff,
    gradient: "from-[#ff9f0a] to-[#ff375f]",
    glow: "rgba(255, 159, 10, 0.15)",
    category: "运维",
    tags: ["配置", "漂移", "变更"],
  },
  {
    name: "告警中心",
    description: "告警聚合与管理",
    href: "/alerts",
    icon: Shield,
    gradient: "from-[#ff375f] to-[#bf5af2]",
    glow: "rgba(255, 55, 95, 0.15)",
    category: "运维",
    tags: ["告警", "alert", "管理"],
  },
  {
    name: "故障知识库",
    description: "KEDB 故障诊断知识",
    href: "/kedb",
    icon: Database,
    gradient: "from-[#bf5af2] to-[#5e5ce6]",
    glow: "rgba(191, 90, 242, 0.15)",
    category: "运维",
    tags: ["知识库", "kedb", "故障"],
  },
  {
    name: "自动化流程",
    description: "Runbook 自动化执行",
    href: "/runbooks",
    icon: Timer,
    gradient: "from-[#30d158] to-[#34c759]",
    glow: "rgba(48, 209, 88, 0.15)",
    category: "运维",
    tags: ["runbook", "自动化", "流程"],
  },
  {
    name: "批量操作",
    description: "多服务器命令执行",
    href: "/batch",
    icon: TerminalSquare,
    gradient: "from-[#64d2ff] to-[#0a84ff]",
    glow: "rgba(100, 210, 255, 0.15)",
    category: "运维",
    tags: ["批量", "多服务器", "执行"],
  },
  {
    name: "证书监控",
    description: "SSL 证书过期监控",
    href: "/certs",
    icon: ShieldCheck,
    gradient: "from-[#30d158] to-[#34c759]",
    glow: "rgba(48, 209, 88, 0.15)",
    category: "运维",
    tags: ["证书", "ssl", "监控"],
  },
  {
    name: "审计日志",
    description: "操作审计与合规",
    href: "/audit",
    icon: FileSearch,
    gradient: "from-[#ff9f0a] to-[#30d158]",
    glow: "rgba(255, 159, 10, 0.15)",
    category: "运维",
    tags: ["审计", "日志", "合规"],
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("toolkitx_favorites");
      if (saved) {
        setFavorites(new Set(JSON.parse(saved)));
      }
    } catch {}
  }, []);

  // Restore scroll position from sessionStorage
  useEffect(() => {
    const scrollContainer = document.querySelector("main");
    if (!scrollContainer) return;
    const saved = sessionStorage.getItem("home_scroll_pos");
    if (saved) {
      scrollContainer.scrollTop = parseInt(saved, 10);
    }
    const handleScroll = () => {
      sessionStorage.setItem("home_scroll_pos", scrollContainer.scrollTop.toString());
    };
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFavorite = (toolName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(toolName)) {
        next.delete(toolName);
      } else {
        next.add(toolName);
      }
      try {
        localStorage.setItem("toolkitx_favorites", JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  const filteredTools = useMemo(() => {
    let tools = allTools;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query) ||
          tool.tags.some((tag) => tag.includes(query))
      );
    }
    // Sort: favorited tools first
    return [...tools].sort((a, b) => {
      const aFav = favorites.has(a.name) ? 1 : 0;
      const bFav = favorites.has(b.name) ? 1 : 0;
      return bFav - aFav;
    });
  }, [searchQuery, favorites]);

  return (
    <main className="flex-1 overflow-auto relative">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="aurora-blob aurora-blob-4" />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-8 relative z-10">
        {/* Hero */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-gradient text-[42px] font-bold tracking-tight mb-3">
            ToolkitX
          </h1>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-lg mb-6">
            运维工具箱 + AI 助手，一站式解决日常运维需求
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索工具... (支持名称、描述、标签模糊搜索)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[14px] placeholder:text-muted-foreground/40 focus:outline-none focus:border-[#0a84ff]/50 focus:bg-white/[0.06] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tools Grid - 5 columns */}
        <div className="grid gap-3 grid-cols-5">
          {filteredTools.map((tool, i) => (
            <Link
              key={tool.name}
              href={tool.href}
              className={`group relative p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] animate-fade-in ${
                i < 5 ? `stagger-${i + 1}` : ""
              }`}
            >
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${tool.glow}, transparent 60%)`,
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-sm`}
                  >
                    <tool.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[11px] text-muted-foreground/50 font-medium flex-1">
                    {tool.category}
                  </span>
                  {"hot" in tool && tool.hot && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold bg-gradient-to-r from-[#ff375f] to-[#ff9f0a] text-white rounded-md shadow-sm">
                      HOT
                    </span>
                  )}
                  <button
                    onClick={(e) => toggleFavorite(tool.name, e)}
                    className="p-1 rounded-md hover:bg-white/[0.1] transition-all"
                  >
                    <Star
                      className={`h-3.5 w-3.5 transition-all ${
                        favorites.has(tool.name)
                          ? "fill-[#ff9f0a] text-[#ff9f0a]"
                          : "text-muted-foreground/30 hover:text-muted-foreground/60"
                      }`}
                    />
                  </button>
                </div>
                <h3 className="text-[13px] font-semibold tracking-tight mb-0.5">
                  {tool.name}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground/40 text-[14px]">
              没有找到匹配的工具
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-[#0a84ff] text-[13px] hover:underline"
            >
              清除搜索
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
