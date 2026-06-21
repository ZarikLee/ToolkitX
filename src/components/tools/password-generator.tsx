"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const passwordHelp = [
  { title: "功能说明", items: ["生成安全的随机密码", "可自定义长度和字符类型"] },
  { title: "使用方法", items: ["调整密码长度滑块", "勾选需要包含的字符类型", "点击「生成密码」", "点击「复制」使用密码"] },
];

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let chars = "";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      chars = "abcdefghijklmnopqrstuvwxyz";
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const getStrength = () => {
    if (length >= 16 && includeUppercase && includeLowercase && includeNumbers && includeSymbols) {
      return { text: "非常强", color: "text-green-500" };
    }
    if (length >= 12 && includeUppercase && includeLowercase && includeNumbers) {
      return { text: "强", color: "text-green-400" };
    }
    if (length >= 8 && includeUppercase && includeLowercase) {
      return { text: "中等", color: "text-yellow-500" };
    }
    return { text: "弱", color: "text-red-500" };
  };

  const strength = getStrength();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">密码生成器</h2>
          <InlineHelp content={passwordHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          生成安全的随机密码
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">密码长度</label>
            <span className="text-sm font-mono">{length}</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>8</span>
            <span>64</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">包含字符</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "大写字母 (A-Z)", checked: includeUppercase, onChange: setIncludeUppercase },
              { label: "小写字母 (a-z)", checked: includeLowercase, onChange: setIncludeLowercase },
              { label: "数字 (0-9)", checked: includeNumbers, onChange: setIncludeNumbers },
              { label: "特殊符号 (!@#$)", checked: includeSymbols, onChange: setIncludeSymbols },
            ].map((option) => (
              <label
                key={option.label}
                className="flex items-center gap-2 p-2 glass rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={(e) => option.onChange(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={generatePassword}
        className="w-full btn-apple bg-primary text-primary-foreground"
      >
        生成密码
      </button>

      {password && (
        <div className="space-y-3">
          <div className="p-4 glass rounded-xl">
            <div className="flex items-center justify-between">
              <p className="font-mono text-lg break-all">{password}</p>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 text-sm btn-ghost"
              >
                复制
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">强度:</span>
            <span className={`text-sm font-medium ${strength.color}`}>
              {strength.text}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
