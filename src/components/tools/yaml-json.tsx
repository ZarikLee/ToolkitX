"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const yamlJsonHelp = [
  { title: "功能说明", items: ["YAML 和 JSON 格式互转", "验证格式正确性"] },
  { title: "使用方法", items: ["选择转换方向", "在输入框粘贴内容", "点击「转换」"] },
];

type Direction = "yaml-to-json" | "json-to-yaml";

function yamlToJson(yaml: string): string {
  const lines = yaml.split("\n");
  const result: Record<string, any> = {};
  let currentKey = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const indent = line.length - line.trimStart().length;
    const colonIndex = trimmed.indexOf(":");

    if (colonIndex > 0) {
      const key = trimmed.slice(0, colonIndex).trim();
      const value = trimmed.slice(colonIndex + 1).trim();

      if (value) {
        if (value === "true") result[key] = true;
        else if (value === "false") result[key] = false;
        else if (value === "null") result[key] = null;
        else if (!isNaN(Number(value))) result[key] = Number(value);
        else result[key] = value.replace(/^["']|["']$/g, "");
      } else {
        result[key] = {};
        currentKey = key;
      }
    } else if (currentKey && /^\d+\./.test(trimmed)) {
      if (!Array.isArray(result[currentKey])) result[currentKey] = [];
      result[currentKey].push(trimmed.replace(/^\d+\.\s*/, "").replace(/^["']|["']$/g, ""));
    }
  }

  return JSON.stringify(result, null, 2);
}

function jsonToYaml(json: string): string {
  const obj = JSON.parse(json);
  const yaml: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === null) {
      yaml.push(`${key}: null`);
    } else if (typeof value === "boolean") {
      yaml.push(`${key}: ${value}`);
    } else if (typeof value === "number") {
      yaml.push(`${key}: ${value}`);
    } else if (typeof value === "object" && Array.isArray(value)) {
      yaml.push(`${key}:`);
      value.forEach((item, i) => {
        yaml.push(`  - ${typeof item === "string" ? `"${item}"` : item}`);
      });
    } else if (typeof value === "object") {
      yaml.push(`${key}:`);
      for (const [k, v] of Object.entries(value as Record<string, any>)) {
        yaml.push(`  ${k}: ${typeof v === "string" ? `"${v}"` : v}`);
      }
    } else {
      yaml.push(`${key}: "${value}"`);
    }
  }

  return yaml.join("\n");
}

export function YamlJson() {
  const [direction, setDirection] = useState<Direction>("yaml-to-json");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      if (direction === "yaml-to-json") {
        setOutput(yamlToJson(input));
      } else {
        setOutput(jsonToYaml(input));
      }
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">YAML ↔ JSON 转换器</h2>
          <InlineHelp content={yamlJsonHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          YAML 和 JSON 格式互转
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">转换方向</label>
        <div className="flex gap-2 mt-1">
          {([
            { value: "yaml-to-json", label: "YAML → JSON" },
            { value: "json-to-yaml", label: "JSON → YAML" },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setDirection(opt.value); setOutput(""); setError(""); }}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                direction === opt.value
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">输入</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-apple mt-1 font-mono"
            rows={15}
            placeholder={direction === "yaml-to-json" ? "key: value" : '{"key": "value"}'}
          />
        </div>
        <div>
          <label className="text-sm font-medium">输出</label>
          <textarea
            value={output}
            readOnly
            className="input-apple mt-1 font-mono bg-white/5"
            rows={15}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={convert}
          disabled={!input}
          className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
        >
          转换
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="btn-apple bg-white/5 hover:bg-white/10 disabled:opacity-50"
        >
          复制
        </button>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-xl text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
