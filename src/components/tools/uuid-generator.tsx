"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const uuidHelp = [
  { title: "功能说明", items: ["生成 UUID v1 或 v4", "批量生成多个 UUID"] },
  { title: "使用方法", items: ["选择 UUID 版本", "选择生成数量", "点击「生成 UUID」", "点击「复制」使用结果"] },
];

type UUIDVersion = "v1" | "v4";

function generateV4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateV1(): string {
  const now = Date.now();
  const timeHex = now.toString(16).padStart(12, "0");
  const clockSeq = Math.floor(Math.random() * 0x3fff).toString(16).padStart(4, "0");
  const node = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
  ).join("");
  return `${timeHex.slice(4, 12)}-${timeHex.slice(0, 4)}-1${timeHex.slice(0, 3)}-${clockSeq}-${node}`;
}

export function UUIDGenerator() {
  const [version, setVersion] = useState<UUIDVersion>("v4");
  const [count, setCount] = useState(1);
  const [uuids, setUUIDs] = useState<string[]>([]);

  const generate = () => {
    const generator = version === "v4" ? generateV4 : generateV1;
    setUUIDs(Array.from({ length: count }, generator));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">UUID 生成器</h2>
          <InlineHelp content={uuidHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          生成 UUID v1 或 v4 唯一标识符
        </p>
      </div>

      <div className="flex gap-4">
        <div>
          <label className="text-sm font-medium">版本</label>
          <div className="flex gap-2 mt-1">
            {(["v1", "v4"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVersion(v)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  version === v
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {v.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">数量</label>
          <div className="flex gap-2 mt-1">
            {[1, 5, 10, 20].map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  count === n
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full btn-primary"
      >
        生成 UUID
      </button>

      {uuids.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">生成结果</h3>
            <button
              onClick={copyAll}
              className="px-3 py-1 text-sm btn-ghost"
            >
              复制全部
            </button>
          </div>
          <div className="space-y-2">
            {uuids.map((uuid, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 glass rounded-xl"
              >
                <p className="font-mono text-sm break-all">{uuid}</p>
                <button
                  onClick={() => copyToClipboard(uuid)}
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
