"use client";

import { useState, useEffect } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const hashHelp = [
  { title: "功能说明", items: ["计算文本的哈希值", "支持 SHA-1/SHA-256/SHA-512 算法"] },
  { title: "使用方法", items: ["在输入框输入文本", "点击「计算哈希」", "下方显示各算法的结果", "点击「复制」使用哈希值"] },
];

type HashType = "md5" | "sha1" | "sha256" | "sha512";

const STORAGE_KEY = "tools_hash";

export function HashCalculator() {
  const [input, setInput] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).input || "" : "";
    }
    return "";
  });
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ input }));
  }, [input]);

  const calculateHash = async (algorithm: string, data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const buffer = await crypto.subtle.digest(algorithm, encoder.encode(data));
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const calculateAll = async () => {
    if (!input) return;

    const algorithms: HashType[] = ["md5", "sha1", "sha256", "sha512"];
    const results: Record<string, string> = {};

    for (const algo of algorithms) {
      try {
        if (algo === "md5") {
          results[algo] = "浏览器不支持 MD5，请使用 SHA-256";
        } else {
          results[algo] = await calculateHash(algo, input);
        }
      } catch {
        results[algo] = "计算失败";
      }
    }

    setHashes(results);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">哈希计算器</h2>
          <InlineHelp content={hashHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          计算文本的 MD5、SHA-1、SHA-256、SHA-512 哈希值
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">输入文本</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-apple mt-1 font-mono"
          rows={5}
          placeholder="输入要计算哈希的文本"
        />
      </div>

      <button
        onClick={calculateAll}
        disabled={!input}
        className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
      >
        计算哈希
      </button>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">计算结果</h3>
          <div className="space-y-2">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div
                key={algo}
                className="flex items-center justify-between p-3 glass rounded-xl"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium uppercase">{algo}</span>
                  <p className="text-sm font-mono text-muted-foreground break-all mt-1">
                    {hash}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(hash)}
                  className="ml-2 px-3 py-1 text-sm btn-ghost"
                >
                  复制
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 glass rounded-xl">
        <h3 className="text-sm font-medium mb-2">关于哈希算法</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>- MD5: 已不安全，不推荐用于密码存储</li>
          <li>- SHA-1: 已不安全，不推荐用于证书签名</li>
          <li>- SHA-256: 推荐使用，广泛应用于数字签名</li>
          <li>- SHA-512: 最安全，适用于高安全要求场景</li>
        </ul>
      </div>
    </div>
  );
}
