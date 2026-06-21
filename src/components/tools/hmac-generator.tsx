"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const hmacHelp = [
  { title: "功能说明", items: ["生成 HMAC 消息认证码", "支持 SHA-256、SHA-512、MD5 算法"] },
  { title: "使用方法", items: ["输入消息文本", "输入密钥", "选择算法", "点击「生成 HMAC」"] },
];

type Algorithm = "SHA-256" | "SHA-512";

export function HMACGenerator() {
  const [message, setMessage] = useState("");
  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-256");
  const [hmac, setHmac] = useState("");
  const [error, setError] = useState("");

  const generateHMAC = async () => {
    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const messageData = encoder.encode(message);

      const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: algorithm },
        false,
        ["sign"]
      );

      const signature = await crypto.subtle.sign("HMAC", key, messageData);
      const hashArray = Array.from(new Uint8Array(signature));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

      setHmac(hashHex);
      setError("");
    } catch (e: any) {
      setError(e.message);
      setHmac("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hmac);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">HMAC 生成器</h2>
          <InlineHelp content={hmacHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          使用密钥生成 HMAC 消息认证码
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">消息</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-apple mt-1 font-mono"
          rows={4}
          placeholder="输入要认证的消息"
        />
      </div>

      <div>
        <label className="text-sm font-medium">密钥</label>
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="input-apple mt-1 font-mono"
          placeholder="输入密钥"
        />
      </div>

      <div>
        <label className="text-sm font-medium">算法</label>
        <div className="flex gap-2 mt-1">
          {(["SHA-256", "SHA-512"] as const).map((algo) => (
            <button
              key={algo}
              onClick={() => setAlgorithm(algo)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                algorithm === algo
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {algo}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generateHMAC}
        disabled={!message || !secret}
        className="btn-primary disabled:opacity-50"
      >
        生成 HMAC
      </button>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-xl text-sm">
          {error}
        </div>
      )}

      {hmac && (
        <div className="p-4 glass rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">HMAC 结果</h3>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 text-sm btn-ghost"
            >
              复制
            </button>
          </div>
          <p className="text-sm font-mono text-muted-foreground break-all">
            {hmac}
          </p>
        </div>
      )}

      <div className="p-4 glass rounded-xl">
        <h3 className="text-sm font-medium mb-2">关于 HMAC</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>- HMAC 结合密钥和哈希函数提供消息认证</li>
          <li>- 常用于 API 签名、Token 验证</li>
          <li>- 密钥越长越安全，建议至少 32 字节</li>
        </ul>
      </div>
    </div>
  );
}
