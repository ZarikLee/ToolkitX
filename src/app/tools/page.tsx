"use client";

import { useState } from "react";
import { JsonTool } from "@/components/tools/json-tool";
import { EncodingTool } from "@/components/tools/encoding-tool";
import { TimestampTool } from "@/components/tools/timestamp-tool";
import { PasswordGenerator } from "@/components/tools/password-generator";
import { HashCalculator } from "@/components/tools/hash-calculator";
import { SubPageLayout } from "@/components/layout/sub-page-layout";
import { TabButton } from "@/components/ui/tab-button";

const helpContent = [
  {
    title: "如何使用数据处理工具",
    items: [
      "点击上方标签页选择工具类型",
      "在输入区域粘贴或输入数据",
      "点击操作按钮（格式化、编码、计算等）",
      "结果会显示在输出区域，点击「复制」即可使用",
    ],
  },
  {
    title: "各工具说明",
    items: [
      "JSON 格式化：粘贴 JSON 字符串，一键格式化或压缩",
      "编解码：支持 Base64、URL 编码/解码、HTML 转义",
      "时间戳转换：Unix 时间戳与日期时间互相转换",
      "密码生成：自定义长度和字符类型，生成安全密码",
      "哈希计算：计算文本的 MD5 / SHA-1 / SHA-256 / SHA-512",
    ],
  },
];

const tools = [
  { id: "json", name: "JSON 格式化", icon: "{}", component: JsonTool },
  { id: "encoding", name: "编解码", icon: "🔄", component: EncodingTool },
  { id: "timestamp", name: "时间戳转换", icon: "⏰", component: TimestampTool },
  { id: "password", name: "密码生成", icon: "🔑", component: PasswordGenerator },
  { id: "hash", name: "哈希计算", icon: "#", component: HashCalculator },
];

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState("json");

  const ActiveComponent = tools.find((t) => t.id === activeTool)?.component;

  return (
    <SubPageLayout
      title="数据处理"
      subtitle="常用数据处理工具集合"
      helpContent={helpContent}
      tabs={
        <>
          {tools.map((tool) => (
            <TabButton
              key={tool.id}
              active={activeTool === tool.id}
              onClick={() => setActiveTool(tool.id)}
              icon={<span className="text-sm font-mono">{tool.icon}</span>}
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
