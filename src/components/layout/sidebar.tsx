"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Settings2,
  FileCode,
  ScrollText,
  Search,
  Wrench,
  Terminal,
  Globe,
  FileText,
  Activity,
  Shield,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navigation = [
  { name: "配置生成器", href: "/config-generator", icon: FileCode },
  { name: "脚本库", href: "/scripts", icon: ScrollText },
  { name: "诊断工具", href: "/diagnostics", icon: Search },
  { name: "数据处理", href: "/tools", icon: Wrench },
  { name: "在线终端", href: "/terminal", icon: Terminal },
  { name: "API 测试", href: "/api-tester", icon: Globe },
  { name: "日志查看", href: "/log-viewer", icon: FileText },
  { name: "服务器监控", href: "/monitor", icon: Activity },
  { name: "配置漂移", href: "/drift", icon: Shield },
  { name: "告警中心", href: "/alerts", icon: Bell },
];

const bottomNavigation = [
  { name: "设置", href: "/settings", icon: Settings2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex h-full flex-col glass-heavy transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        collapsed ? "w-[72px]" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center px-5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#0a84ff] to-[#5e5ce6] shadow-[0_2px_8px_rgba(10,132,255,0.3)] group-hover:shadow-[0_2px_12px_rgba(10,132,255,0.4)] transition-shadow duration-300">
            <span className="text-white text-sm font-bold tracking-tight">X</span>
          </div>
          {!collapsed && (
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              ToolkitX
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "ml-auto p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all duration-200",
            collapsed && "mx-auto mt-3"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-3 py-3 overflow-y-auto">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              title={collapsed ? item.name : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200",
                isActive
                  ? "bg-white/[0.08] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors duration-200",
                  isActive ? "text-[#0a84ff]" : "text-muted-foreground"
                )}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/[0.06] px-3 py-3">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={collapsed ? item.name : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200",
                isActive
                  ? "bg-white/[0.08] text-foreground"
                  : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors duration-200",
                  isActive ? "text-[#0a84ff]" : "text-muted-foreground"
                )}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
