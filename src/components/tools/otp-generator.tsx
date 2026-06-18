"use client";

import { useState, useEffect, useCallback } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const otpHelp = [
  { title: "功能说明", items: ["生成基于时间的一次性密码 (TOTP)", "每 30 秒自动刷新"] },
  { title: "使用方法", items: ["输入密钥 (Base32 编码)", "查看当前 OTP 码", "倒计时显示剩余时间"] },
];

function base32Decode(input: string): Uint8Array {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const cleaned = input.replace(/[^A-Z2-7]/gi, "").toUpperCase();
  let bits = "";
  for (const char of cleaned) {
    const val = alphabet.indexOf(char);
    if (val !== -1) bits += val.toString(2).padStart(5, "0");
  }
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  }
  return bytes;
}

async function generateTOTP(secret: string, timeStep: number = 30): Promise<string> {
  const key = base32Decode(secret);
  const time = Math.floor(Date.now() / 1000 / timeStep);
  const timeBytes = new Uint8Array(8);
  let temp = time;
  for (let i = 7; i >= 0; i--) {
    timeBytes[i] = temp & 0xff;
    temp = Math.floor(temp / 256);
  }

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key.buffer as ArrayBuffer,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, timeBytes);
  const hash = new Uint8Array(signature);
  const offset = hash[hash.length - 1] & 0x0f;
  const otp =
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);

  return (otp % 1000000).toString().padStart(6, "0");
}

export function OTPGenerator() {
  const [secret, setSecret] = useState("");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [error, setError] = useState("");

  const refreshOTP = useCallback(async () => {
    if (!secret) {
      setOtp("");
      return;
    }
    try {
      const code = await generateTOTP(secret);
      setOtp(code);
      setError("");
    } catch {
      setError("无效的密钥格式");
      setOtp("");
    }
  }, [secret]);

  useEffect(() => {
    refreshOTP();
  }, [refreshOTP]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      setTimeLeft(30 - (now % 30));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 30) refreshOTP();
  }, [timeLeft, refreshOTP]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(otp);
  };

  const progress = (timeLeft / 30) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">OTP/TOTP 生成器</h2>
          <InlineHelp content={otpHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          生成基于时间的一次性密码 (TOTP)
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">密钥 (Base32)</label>
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="input-apple mt-1 font-mono"
          placeholder="JBSWY3DPEHPK3PXP"
        />
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-xl text-sm">
          {error}
        </div>
      )}

      {otp && (
        <div className="p-6 glass rounded-xl text-center space-y-4">
          <p className="text-sm text-muted-foreground">当前 OTP 码</p>
          <div className="flex items-center justify-center gap-4">
            <p className="text-4xl font-mono font-bold tracking-[0.3em]">{otp}</p>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              复制
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>刷新倒计时</span>
              <span className="font-mono">{timeLeft}s</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="p-4 glass rounded-xl">
        <h3 className="text-sm font-medium mb-2">关于 TOTP</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>- TOTP 是基于时间的一次性密码算法</li>
          <li>- 常用于双重认证 (2FA)</li>
          <li>- 密钥需以 Base32 格式输入</li>
          <li>- 每 30 秒生成新码</li>
        </ul>
      </div>
    </div>
  );
}
