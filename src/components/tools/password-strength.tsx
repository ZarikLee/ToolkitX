"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const strengthHelp = [
  { title: "功能说明", items: ["分析密码强度", "计算熵值和破解时间估算"] },
  { title: "使用方法", items: ["输入密码", "查看强度评级", "查看详细分析"] },
];

interface StrengthResult {
  score: number;
  label: string;
  color: string;
  entropy: number;
  crackTime: string;
}

function analyzePassword(password: string): StrengthResult {
  if (!password) {
    return { score: 0, label: "请输入密码", color: "text-muted-foreground", entropy: 0, crackTime: "-" };
  }

  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 33;

  const entropy = password.length * Math.log2(charsetSize || 1);
  const guessesPerSecond = 1e10;
  const totalGuesses = Math.pow(2, entropy);
  const seconds = totalGuesses / guessesPerSecond;

  let crackTime: string;
  if (seconds < 1) crackTime = "瞬间";
  else if (seconds < 60) crackTime = Math.floor(seconds) + " 秒";
  else if (seconds < 3600) crackTime = Math.floor(seconds / 60) + " 分钟";
  else if (seconds < 86400) crackTime = Math.floor(seconds / 3600) + " 小时";
  else if (seconds < 31536000) crackTime = Math.floor(seconds / 86400) + " 天";
  else if (seconds < 31536000 * 1000) crackTime = Math.floor(seconds / 31536000) + " 年";
  else if (seconds < 31536000 * 1e6) crackTime = Math.floor(seconds / 31536000 / 1000) + " 千年";
  else crackTime = "数百万年+";

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  let label: string;
  let color: string;
  if (score <= 1) { label = "非常弱"; color = "text-red-500"; }
  else if (score <= 2) { label = "弱"; color = "text-orange-500"; }
  else if (score <= 3) { label = "一般"; color = "text-yellow-500"; }
  else if (score <= 4) { label = "强"; color = "text-green-400"; }
  else { label = "非常强"; color = "text-green-500"; }

  return { score, label, color, entropy: Math.round(entropy * 10) / 10, crackTime };
}

export function PasswordStrength() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const result = analyzePassword(password);
  const strengthPercent = (result.score / 6) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">密码强度分析器</h2>
          <InlineHelp content={strengthHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          分析密码强度、计算熵值和估算破解时间
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">输入密码</label>
        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-apple font-mono w-full pr-16"
            placeholder="输入要分析的密码"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground"
          >
            {showPassword ? "隐藏" : "显示"}
          </button>
        </div>
      </div>

      {password && (
        <div className="space-y-4">
          <div className="p-4 glass rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">强度</span>
              <span className={`text-sm font-medium ${result.color}`}>{result.label}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  result.score <= 1 ? "bg-red-500" :
                  result.score <= 2 ? "bg-orange-500" :
                  result.score <= 3 ? "bg-yellow-500" :
                  result.score <= 4 ? "bg-green-400" : "bg-green-500"
                }`}
                style={{ width: `${strengthPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 glass rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">熵值</p>
              <p className="text-lg font-mono font-medium">{result.entropy} bits</p>
            </div>
            <div className="p-4 glass rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">破解时间 (100亿次/秒)</p>
              <p className="text-lg font-mono font-medium">{result.crackTime}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className={`p-2 rounded-lg ${password.length >= 8 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {password.length >= 8 ? "✓" : "✗"} 8+ 字符
            </div>
            <div className={`p-2 rounded-lg ${/[a-z]/.test(password) && /[A-Z]/.test(password) ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {/[a-z]/.test(password) && /[A-Z]/.test(password) ? "✓" : "✗"} 大小写
            </div>
            <div className={`p-2 rounded-lg ${/[0-9]/.test(password) ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {/[0-9]/.test(password) ? "✓" : "✗"} 数字
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
