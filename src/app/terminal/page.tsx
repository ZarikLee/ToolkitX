'use client';

import Link from 'next/link';
import { TerminalTabs } from '@/components/terminal/terminal-tabs';
import { InlineHelp } from '@/components/ui/inline-help';

const helpContent = [
  {
    title: "如何使用终端",
    items: [
      "点击「+」新建终端标签页，可同时打开多个连接",
      "点击「连接」输入服务器信息（IP、端口、用户名、密码）",
      "连接成功后即可在终端中执行命令",
      "支持多标签页切换，每个标签页独立会话",
    ],
  },
  {
    title: "快捷功能",
    items: [
      "快速命令库：预置常用运维命令，一键执行",
      "命令笔记本：自动记录执行过的命令，支持收藏",
      "会话快照：保存当前会话的命令列表，随时恢复",
      "服务器列表：保存常用服务器，快速连接",
    ],
  },
  {
    title: "快捷键",
    items: [
      "Tab 键：命令自动补全",
      "上下方向键：浏览历史命令",
      "Ctrl+C：中断当前命令",
      "Ctrl+L：清屏",
    ],
  },
];

export default function TerminalPage() {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex items-center gap-3 px-6 py-3 border-b border-white/[0.06] shrink-0">
        <Link
          href="/"
          className="flex items-center justify-center w-8 h-8 rounded-[10px] bg-white/[0.06] hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-all duration-200"
          title="返回首页"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
        </Link>
        <h1 className="text-[14px] font-medium tracking-tight">在线终端</h1>
        <InlineHelp content={helpContent} />
      </div>
      <div className="flex-1 min-h-0">
        <TerminalTabs />
      </div>
    </div>
  );
}
