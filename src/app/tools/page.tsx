"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

const toolMap: Record<string, React.ComponentType> = {
  json: JsonTool,
  "yaml-json": YamlJson,
  sql: SQLPrettify,
  markdown: MarkdownHtml,
  encoding: EncodingTool,
  hash: HashCalculator,
  hmac: HMACGenerator,
  jwt: JWTDecoder,
  qr: QRCode,
  uuid: UUIDGenerator,
  password: PasswordGenerator,
  strength: PasswordStrength,
  otp: OTPGenerator,
  mac: MACGenerator,
  lorem: LoremIpsum,
  timestamp: TimestampTool,
  color: ColorConverter,
  case: CaseConverter,
  chmod: ChmodCalculator,
  docker: DockerConverter,
  url: URLParser,
  ua: UAParser,
  mime: MimeReference,
  "json-diff": JsonDiff,
  subnet: SubnetCalculator,
  regex: RegexTester,
  "text-stat": TextStatistics,
  "text-diff": TextDiff,
};

const toolNames: Record<string, string> = {
  json: "JSON 格式化",
  "yaml-json": "YAML ↔ JSON",
  sql: "SQL 美化",
  markdown: "Markdown → HTML",
  encoding: "编解码",
  hash: "哈希计算",
  hmac: "HMAC 生成",
  jwt: "JWT 解码",
  qr: "二维码生成",
  uuid: "UUID 生成",
  password: "密码生成",
  strength: "密码强度",
  otp: "OTP 生成",
  mac: "MAC 地址",
  lorem: "Lorem Ipsum",
  timestamp: "时间戳转换",
  color: "颜色转换",
  case: "大小写转换",
  chmod: "chmod 计算",
  docker: "Docker 转换",
  url: "URL 解析",
  ua: "UA 解析",
  mime: "MIME 参考",
  "json-diff": "JSON Diff",
  subnet: "子网计算器",
  regex: "正则测试",
  "text-stat": "文本统计",
  "text-diff": "文本对比",
};

function ToolsContent() {
  const searchParams = useSearchParams();
  const toolParam = searchParams.get("tool");
  const Component = toolParam ? toolMap[toolParam] : null;
  const toolName = toolParam ? toolNames[toolParam] || toolParam : "数据处理工具";

  // Standalone tool mode — with back button, no tabs
  if (Component) {
    return (
      <SubPageLayout title={toolName} subtitle="">
        <Component />
      </SubPageLayout>
    );
  }

  return (
    <SubPageLayout title="数据处理" subtitle="常用数据处理工具集合">
      <div className="text-muted-foreground text-[14px] text-center py-12">
        请选择一个工具
      </div>
    </SubPageLayout>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center">
        <div className="text-muted-foreground text-[14px]">加载中...</div>
      </div>
    }>
      <ToolsContent />
    </Suspense>
  );
}
