"use client";

import { useState } from "react";
import { JsonTool } from "@/components/tools/json-tool";
import { EncodingTool } from "@/components/tools/encoding-tool";
import { TimestampTool } from "@/components/tools/timestamp-tool";
import { PasswordGenerator } from "@/components/tools/password-generator";
import { HashCalculator } from "@/components/tools/hash-calculator";
import { UUIDGenerator } from "@/components/tools/uuid-generator";
import { JWTDecoder } from "@/components/tools/jwt-decoder";
import { HMACGenerator } from "@/components/tools/hmac-generator";
import { PasswordStrength } from "@/components/tools/password-strength";
import { ColorConverter } from "@/components/tools/color-converter";
import { CaseConverter } from "@/components/tools/case-converter";
import { YamlJson } from "@/components/tools/yaml-json";
import { MarkdownHtml } from "@/components/tools/markdown-html";
import { URLParser } from "@/components/tools/url-parser";
import { OTPGenerator } from "@/components/tools/otp-generator";
import { MimeReference } from "@/components/tools/mime-reference";
import { UAParser } from "@/components/tools/ua-parser";
import { JsonDiff } from "@/components/tools/json-diff";
import { SQLPrettify } from "@/components/tools/sql-prettify";
import { ChmodCalculator } from "@/components/tools/chmod-calculator";
import { DockerConverter } from "@/components/tools/docker-converter";
import { RegexTester } from "@/components/tools/regex-tester";
import { SubnetCalculator } from "@/components/tools/subnet-calculator";
import { MACGenerator } from "@/components/tools/mac-generator";
import { LoremIpsum } from "@/components/tools/lorem-ipsum";
import { TextStatistics } from "@/components/tools/text-statistics";
import { TextDiff } from "@/components/tools/text-diff";
import { QRCode } from "@/components/tools/qr-code";
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
];

const categories = [
  {
    name: "数据格式",
    tools: [
      { id: "json", name: "JSON 格式化", icon: "{}", component: JsonTool },
      { id: "yaml-json", name: "YAML ↔ JSON", icon: "📄", component: YamlJson },
      { id: "sql", name: "SQL 美化", icon: "🗃️", component: SQLPrettify },
      { id: "markdown", name: "Markdown → HTML", icon: "📝", component: MarkdownHtml },
    ],
  },
  {
    name: "编码加密",
    tools: [
      { id: "encoding", name: "编解码", icon: "🔄", component: EncodingTool },
      { id: "hash", name: "哈希计算", icon: "#", component: HashCalculator },
      { id: "hmac", name: "HMAC 生成", icon: "🔐", component: HMACGenerator },
      { id: "jwt", name: "JWT 解码", icon: "🎫", component: JWTDecoder },
      { id: "qr", name: "二维码生成", icon: "📱", component: QRCode },
    ],
  },
  {
    name: "生成器",
    tools: [
      { id: "uuid", name: "UUID 生成", icon: "🆔", component: UUIDGenerator },
      { id: "password", name: "密码生成", icon: "🔑", component: PasswordGenerator },
      { id: "strength", name: "密码强度", icon: "💪", component: PasswordStrength },
      { id: "otp", name: "OTP 生成", icon: "🔢", component: OTPGenerator },
      { id: "mac", name: "MAC 地址", icon: "🖥️", component: MACGenerator },
      { id: "lorem", name: "Lorem Ipsum", icon: "📄", component: LoremIpsum },
    ],
  },
  {
    name: "转换器",
    tools: [
      { id: "timestamp", name: "时间戳转换", icon: "⏰", component: TimestampTool },
      { id: "color", name: "颜色转换", icon: "🎨", component: ColorConverter },
      { id: "case", name: "大小写转换", icon: "Aa", component: CaseConverter },
      { id: "chmod", name: "chmod 计算", icon: "🔒", component: ChmodCalculator },
      { id: "docker", name: "Docker 转换", icon: "🐳", component: DockerConverter },
    ],
  },
  {
    name: "Web 工具",
    tools: [
      { id: "url", name: "URL 解析", icon: "🔗", component: URLParser },
      { id: "ua", name: "UA 解析", icon: "🌐", component: UAParser },
      { id: "mime", name: "MIME 参考", icon: "📋", component: MimeReference },
      { id: "json-diff", name: "JSON Diff", icon: "🔍", component: JsonDiff },
    ],
  },
  {
    name: "网络工具",
    tools: [
      { id: "subnet", name: "子网计算器", icon: "📡", component: SubnetCalculator },
      { id: "regex", name: "正则测试", icon: "✏️", component: RegexTester },
    ],
  },
  {
    name: "文本工具",
    tools: [
      { id: "text-stat", name: "文本统计", icon: "📊", component: TextStatistics },
      { id: "text-diff", name: "文本对比", icon: "📝", component: TextDiff },
    ],
  },
];

const allTools = categories.flatMap((c) => c.tools);

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState("json");
  const [activeCategory, setActiveCategory] = useState("数据格式");

  const ActiveComponent = allTools.find((t) => t.id === activeTool)?.component;
  const currentCategory = categories.find((c) => c.name === activeCategory);

  return (
    <SubPageLayout
      title="数据处理"
      subtitle="常用数据处理工具集合"
      helpContent={helpContent}
      tabs={
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                setActiveCategory(cat.name);
                setActiveTool(cat.tools[0].id);
              }}
              className={`px-3 py-1.5 rounded-lg text-[12px] transition-all ${
                activeCategory === cat.name
                  ? "bg-[#0a84ff]/15 text-[#0a84ff]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      }
    >
      {/* Sub tabs */}
      <div className="flex flex-wrap gap-1 mb-4">
        {currentCategory?.tools.map((tool) => (
          <TabButton
            key={tool.id}
            active={activeTool === tool.id}
            onClick={() => setActiveTool(tool.id)}
            icon={<span className="text-sm font-mono">{tool.icon}</span>}
          >
            {tool.name}
          </TabButton>
        ))}
      </div>

      {/* Tool Content */}
      <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </SubPageLayout>
  );
}
