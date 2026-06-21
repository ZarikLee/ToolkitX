"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const caseHelp = [
  { title: "功能说明", items: ["转换文本大小写格式", "支持多种命名规范"] },
  { title: "使用方法", items: ["输入原始文本", "查看各格式转换结果", "点击复制按钮使用"] },
];

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

function toPascalCase(str: string): string {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/_$/, "");
}

function toKebabCase(str: string): string {
  return toSnakeCase(str).replace(/_/g, "-");
}

function toConstantCase(str: string): string {
  return toSnakeCase(str).toUpperCase();
}

export function CaseConverter() {
  const [input, setInput] = useState("");

  const formats = [
    { label: "lowercase", value: input.toLowerCase() },
    { label: "UPPERCASE", value: input.toUpperCase() },
    { label: "Title Case", value: toTitleCase(input) },
    { label: "camelCase", value: toCamelCase(input) },
    { label: "PascalCase", value: toPascalCase(input) },
    { label: "snake_case", value: toSnakeCase(input) },
    { label: "kebab-case", value: toKebabCase(input) },
    { label: "CONSTANT_CASE", value: toConstantCase(input) },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">大小写转换器</h2>
          <InlineHelp content={caseHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          在多种文本大小写格式间转换
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">输入文本</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-apple mt-1 font-mono"
          rows={4}
          placeholder="输入要转换的文本"
        />
      </div>

      {input && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">转换结果</h3>
          <div className="space-y-2">
            {formats.map((format) => (
              <div
                key={format.label}
                className="flex items-center justify-between p-3 glass rounded-xl"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-muted-foreground">{format.label}</span>
                  <p className="text-sm font-mono break-all mt-1">{format.value}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(format.value)}
                  className="ml-2 px-3 py-1 text-sm btn-ghost shrink-0"
                >
                  复制
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
