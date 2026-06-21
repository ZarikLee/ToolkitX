"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const jsonDiffHelp = [
  { title: "功能说明", items: ["比较两个 JSON 对象的差异", "高亮显示新增、删除和修改的内容"] },
  { title: "使用方法", items: ["在左侧输入原始 JSON", "在右侧输入修改后的 JSON", "点击「比较」查看差异"] },
];

interface DiffResult {
  path: string;
  type: "added" | "removed" | "changed";
  oldValue?: any;
  newValue?: any;
}

function deepDiff(obj1: any, obj2: any, path = ""): DiffResult[] {
  const results: DiffResult[] = [];

  if (obj1 === obj2) return results;

  if (typeof obj1 !== typeof obj2 || Array.isArray(obj1) !== Array.isArray(obj2)) {
    results.push({ path: path || "(root)", type: "changed", oldValue: obj1, newValue: obj2 });
    return results;
  }

  if (typeof obj1 !== "object" || obj1 === null || obj2 === null) {
    if (obj1 !== obj2) {
      results.push({ path: path || "(root)", type: "changed", oldValue: obj1, newValue: obj2 });
    }
    return results;
  }

  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  for (const key of allKeys) {
    const newPath = path ? `${path}.${key}` : key;
    if (!(key in obj1)) {
      results.push({ path: newPath, type: "added", newValue: obj2[key] });
    } else if (!(key in obj2)) {
      results.push({ path: newPath, type: "removed", oldValue: obj1[key] });
    } else {
      results.push(...deepDiff(obj1[key], obj2[key], newPath));
    }
  }

  return results;
}

export function JsonDiff() {
  const [input1, setInput1] = useState('{\n  "name": "John",\n  "age": 30\n}');
  const [input2, setInput2] = useState('{\n  "name": "Jane",\n  "age": 30,\n  "email": "jane@example.com"\n}');
  const [diffs, setDiffs] = useState<DiffResult[]>([]);
  const [error, setError] = useState("");

  const compare = () => {
    try {
      const json1 = JSON.parse(input1);
      const json2 = JSON.parse(input2);
      setDiffs(deepDiff(json1, json2));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setDiffs([]);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "added": return "text-green-400 bg-green-500/10";
      case "removed": return "text-red-400 bg-red-500/10";
      case "changed": return "text-yellow-400 bg-yellow-500/10";
      default: return "";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "added": return "+ 新增";
      case "removed": return "- 删除";
      case "changed": return "~ 修改";
      default: return type;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">JSON 差异比较</h2>
          <InlineHelp content={jsonDiffHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          比较两个 JSON 对象的差异
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">原始 JSON</label>
          <textarea
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            className="input-apple mt-1 font-mono"
            rows={10}
            placeholder="{}"
          />
        </div>
        <div>
          <label className="text-sm font-medium">修改后 JSON</label>
          <textarea
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            className="input-apple mt-1 font-mono"
            rows={10}
            placeholder="{}"
          />
        </div>
      </div>

      <button
        onClick={compare}
        disabled={!input1 || !input2}
        className="btn-primary disabled:opacity-50"
      >
        比较
      </button>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-xl text-sm">
          {error}
        </div>
      )}

      {diffs.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">差异 ({diffs.length} 处)</h3>
          <div className="space-y-1 max-h-[400px] overflow-auto">
            {diffs.map((diff, i) => (
              <div
                key={i}
                className={`flex items-start justify-between p-3 rounded-xl ${getTypeColor(diff.type)}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{getTypeLabel(diff.type)}</span>
                    <span className="text-sm font-mono">{diff.path}</span>
                  </div>
                  {diff.type === "changed" && (
                    <div className="mt-1 text-xs space-y-1">
                      <p className="text-red-400">- {JSON.stringify(diff.oldValue)}</p>
                      <p className="text-green-400">+ {JSON.stringify(diff.newValue)}</p>
                    </div>
                  )}
                  {diff.type === "added" && (
                    <p className="mt-1 text-xs text-green-400">+ {JSON.stringify(diff.newValue)}</p>
                  )}
                  {diff.type === "removed" && (
                    <p className="mt-1 text-xs text-red-400">- {JSON.stringify(diff.oldValue)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {diffs.length === 0 && !error && (
        <div className="p-4 glass rounded-xl text-center text-sm text-muted-foreground">
          点击「比较」查看差异
        </div>
      )}
    </div>
  );
}
