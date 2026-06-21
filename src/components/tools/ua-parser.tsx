"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const uaHelp = [
  { title: "功能说明", items: ["解析 User-Agent 字符串", "识别浏览器、操作系统和设备类型"] },
  { title: "使用方法", items: ["粘贴 User-Agent 字符串", "查看解析结果", "点击复制各项信息"] },
];

interface UAResult {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: string;
}

function parseUA(ua: string): UAResult {
  let browser = "Unknown";
  let browserVersion = "";
  let os = "Unknown";
  let osVersion = "";
  let device = "Desktop";

  // Browser
  if (ua.includes("Firefox")) {
    browser = "Firefox";
    const match = ua.match(/Firefox\/([\d.]+)/);
    browserVersion = match ? match[1] : "";
  } else if (ua.includes("Edg/")) {
    browser = "Edge";
    const match = ua.match(/Edg\/([\d.]+)/);
    browserVersion = match ? match[1] : "";
  } else if (ua.includes("Chrome")) {
    browser = "Chrome";
    const match = ua.match(/Chrome\/([\d.]+)/);
    browserVersion = match ? match[1] : "";
  } else if (ua.includes("Safari") && ua.includes("Version/")) {
    browser = "Safari";
    const match = ua.match(/Version\/([\d.]+)/);
    browserVersion = match ? match[1] : "";
  } else if (ua.includes("Opera") || ua.includes("OPR/")) {
    browser = "Opera";
    const match = ua.match(/(?:Opera|OPR)\/([\d.]+)/);
    browserVersion = match ? match[1] : "";
  }

  // OS
  if (ua.includes("Windows")) {
    os = "Windows";
    const match = ua.match(/Windows NT ([\d.]+)/);
    osVersion = match ? match[1] : "";
  } else if (ua.includes("Mac OS X")) {
    os = "macOS";
    const match = ua.match(/Mac OS X ([\d_]+)/);
    osVersion = match ? match[1].replace(/_/g, ".") : "";
  } else if (ua.includes("Linux")) {
    os = "Linux";
  } else if (ua.includes("Android")) {
    os = "Android";
    const match = ua.match(/Android ([\d.]+)/);
    osVersion = match ? match[1] : "";
  } else if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) {
    os = "iOS";
    const match = ua.match(/OS ([\d_]+)/);
    osVersion = match ? match[1].replace(/_/g, ".") : "";
  }

  // Device
  if (ua.includes("Mobile") || ua.includes("Android")) {
    device = "Mobile";
  } else if (ua.includes("iPad") || ua.includes("Tablet")) {
    device = "Tablet";
  }

  return { browser, browserVersion, os, osVersion, device };
}

export function UAParser() {
  const [ua, setUA] = useState(navigator.userAgent);
  const [result, setResult] = useState<UAResult | null>(null);

  const parse = () => {
    setResult(parseUA(ua));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const fields = [
    { label: "浏览器", value: result ? `${result.browser} ${result.browserVersion}`.trim() : "" },
    { label: "操作系统", value: result ? `${result.os} ${result.osVersion}`.trim() : "" },
    { label: "设备类型", value: result?.device || "" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">User-Agent 解析器</h2>
          <InlineHelp content={uaHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          解析 User-Agent 字符串，识别浏览器和设备信息
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">User-Agent 字符串</label>
        <textarea
          value={ua}
          onChange={(e) => setUA(e.target.value)}
          className="input-apple mt-1 font-mono"
          rows={3}
          placeholder="Mozilla/5.0..."
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={parse}
          disabled={!ua}
          className="btn-primary disabled:opacity-50"
        >
          解析
        </button>
        <button
          onClick={() => { setUA(navigator.userAgent); setResult(null); }}
          className="btn-apple btn-secondary"
        >
          使用当前 UA
        </button>
      </div>

      {result && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">解析结果</h3>
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between p-3 glass rounded-xl"
            >
              <div className="flex-1 min-w-0">
                <span className="text-xs text-muted-foreground">{field.label}</span>
                <p className="text-sm font-medium mt-1">{field.value}</p>
              </div>
              {field.value && (
                <button
                  onClick={() => copyToClipboard(field.value)}
                  className="ml-2 px-3 py-1 text-sm btn-ghost shrink-0"
                >
                  复制
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
