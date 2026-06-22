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

function ToolsContent() {
  const searchParams = useSearchParams();
  const toolParam = searchParams.get("tool");
  const Component = toolParam ? toolMap[toolParam] : null;

  // Standalone tool mode — just render the tool, nothing else
  if (Component) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 md:px-8 md:py-8">
          <Component />
        </div>
      </div>
    );
  }

  // No tool param — shouldn't happen since homepage links all have ?tool=
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-muted-foreground text-[14px]">请选择一个工具</div>
    </div>
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
