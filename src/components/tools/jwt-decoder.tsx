"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const jwtHelp = [
  { title: "功能说明", items: ["解码 JWT Token 的 Header 和 Payload", "显示签名信息"] },
  { title: "使用方法", items: ["粘贴 JWT Token", "自动解码并显示各部分", "点击「复制」使用 JSON 数据"] },
];

export function JWTDecoder() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");

  const decode = () => {
    try {
      const parts = token.trim().split(".");
      if (parts.length < 2) {
        throw new Error("无效的 JWT 格式");
      }

      const headerJson = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payloadJson = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

      setHeader(JSON.stringify(headerJson, null, 2));
      setPayload(JSON.stringify(payloadJson, null, 2));
      setSignature(parts[2] || "(无签名)");
      setError("");
    } catch (e: any) {
      setError(e.message);
      setHeader("");
      setPayload("");
      setSignature("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">JWT 解码器</h2>
          <InlineHelp content={jwtHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          解码 JWT Token 的 Header、Payload 和 Signature
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="input-apple mt-1 font-mono"
          rows={4}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        />
      </div>

      <button
        onClick={decode}
        disabled={!token}
        className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
      >
        解码
      </button>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-xl text-sm">
          {error}
        </div>
      )}

      {(header || payload || signature) && (
        <div className="space-y-4">
          <div className="p-4 glass rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-400">Header</h3>
              <button
                onClick={() => copyToClipboard(header)}
                className="px-3 py-1 text-sm btn-ghost"
              >
                复制
              </button>
            </div>
            <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap overflow-x-auto">
              {header}
            </pre>
          </div>

          <div className="p-4 glass rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-green-400">Payload</h3>
              <button
                onClick={() => copyToClipboard(payload)}
                className="px-3 py-1 text-sm btn-ghost"
              >
                复制
              </button>
            </div>
            <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap overflow-x-auto">
              {payload}
            </pre>
          </div>

          <div className="p-4 glass rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-yellow-400">Signature</h3>
              <button
                onClick={() => copyToClipboard(signature)}
                className="px-3 py-1 text-sm btn-ghost"
              >
                复制
              </button>
            </div>
            <pre className="text-sm font-mono text-muted-foreground break-all">
              {signature}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
