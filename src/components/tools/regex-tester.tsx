"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const regexHelp = [
  { title: "功能说明", items: ["测试正则表达式", "高亮显示匹配结果", "支持多种标志"] },
  { title: "使用方法", items: ["输入正则表达式", "输入测试字符串", "查看匹配结果"] },
];

interface Match {
  value: string;
  index: number;
  groups?: string[];
}

export function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [testString, setTestString] = useState("Contact us at support@example.com or sales@test.org");
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState("");

  const testRegex = () => {
    try {
      const flagStr = Object.entries(flags)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join("");

      const regex = new RegExp(pattern, flagStr);
      const results: Match[] = [];

      if (flags.g) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          results.push({
            value: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (!regex.global) break;
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          results.push({
            value: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(results);
      setError("");
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  };

  const highlightMatches = () => {
    if (matches.length === 0) return testString;

    const flagStr = Object.entries(flags)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join("");
    const regex = new RegExp(pattern, flagStr);

    return testString.replace(regex, (match) => `<mark class="bg-yellow-500/30 text-yellow-200 px-0.5 rounded">${match}</mark>`);
  };

  const toggleFlag = (flag: "g" | "i" | "m") => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">正则表达式测试器</h2>
          <InlineHelp content={regexHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          测试正则表达式并高亮显示匹配结果
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">正则表达式</label>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="input-apple mt-1 font-mono"
          placeholder="\\b\\w+@\\w+\\.\\w+\\b"
        />
      </div>

      <div>
        <label className="text-sm font-medium">标志</label>
        <div className="flex gap-2 mt-1">
          {(["g", "i", "m"] as const).map((flag) => (
            <button
              key={flag}
              onClick={() => toggleFlag(flag)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                flags[flag]
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {flag}
            </button>
          ))}
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
          <span>g: 全局匹配</span>
          <span>i: 忽略大小写</span>
          <span>m: 多行模式</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">测试字符串</label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="input-apple mt-1 font-mono"
          rows={4}
          placeholder="输入要测试的字符串"
        />
      </div>

      <button
        onClick={testRegex}
        disabled={!pattern}
        className="btn-primary disabled:opacity-50"
      >
        测试
      </button>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-xl text-sm">
          {error}
        </div>
      )}

      {matches.length > 0 && (
        <div className="space-y-4">
          <div className="p-4 glass rounded-xl">
            <h3 className="text-sm font-medium mb-2">高亮匹配</h3>
            <p
              className="text-sm font-mono"
              dangerouslySetInnerHTML={{ __html: highlightMatches() }}
            />
          </div>

          <div className="p-4 glass rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">匹配结果 ({matches.length})</h3>
            </div>
            <div className="space-y-2">
              {matches.map((match, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <div>
                    <span className="text-xs text-muted-foreground">匹配 {i + 1}: </span>
                    <span className="font-mono text-sm">{match.value}</span>
                    <span className="text-xs text-muted-foreground ml-2">(位置 {match.index})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {matches.length === 0 && !error && (
        <div className="p-4 glass rounded-xl text-center text-sm text-muted-foreground">
          点击「测试」查看匹配结果
        </div>
      )}
    </div>
  );
}
