"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.className = saved;
    } else {
      document.documentElement.className = "light";
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [countdown]);

  const handleSendCode = async () => {
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      setError("请输入正确的手机号");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "发送失败");
        return;
      }
      setCodeSent(true);
      setCountdown(60);
    } catch {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !code) {
      setError("请输入手机号和验证码");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Clear old session cookies
      document.cookie = "toolkitx_guest=; path=/; max-age=0";
      localStorage.removeItem("toolkitx_guest");

      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "验证失败");
        return;
      }
      // Force full page reload to ensure new session is picked up
      window.location.href = "/";
    } catch {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    document.cookie = "toolkitx_guest=1; path=/; max-age=86400";
    localStorage.setItem("toolkitx_guest", "1");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="aurora-blob aurora-blob-4" />
      </div>

      <div className="w-full max-w-sm mx-4 relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-gradient text-[48px] font-bold tracking-tight">
            ToolkitX
          </h1>
          <p className="text-muted-foreground text-[13px] mt-2">
            运维工具箱 + AI 助手
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-[16px] font-semibold mb-5">登录 / 注册</h2>

          <form onSubmit={handleVerify} className="space-y-4">
            {/* Phone Input */}
            <div className="flex gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 11));
                  setCodeSent(false);
                  setCode("");
                }}
                placeholder="手机号"
                required
                maxLength={11}
                className="input-apple flex-1"
              />
            </div>

            {/* Code Input + Send Button */}
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="验证码"
                required
                maxLength={6}
                className="input-apple flex-1"
                disabled={!codeSent}
              />
              <button
                type="button"
                onClick={handleSendCode}
                disabled={countdown > 0 || loading || !/^1[3-9]\d{9}$/.test(phone)}
                className="px-4 py-2 rounded-xl btn-secondary text-[13px] font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {countdown > 0 ? `${countdown}s` : "获取验证码"}
              </button>
            </div>

            {error && (
              <div className="text-[12px] text-[#ff453a] bg-[#ff453a]/10 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !codeSent || code.length !== 6}
              className="btn-primary w-full py-2.5"
            >
              {loading ? "验证中..." : "登录 / 注册"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.06]" />
            </div>
            <div className="relative flex justify-center text-[12px]">
              <span className="px-3 text-muted-foreground/40">或</span>
            </div>
          </div>

          <button
            onClick={handleGuest}
            className="w-full py-2.5 rounded-xl btn-secondary text-[14px] font-medium transition-all duration-200 active:scale-[0.98]"
          >
            游客访问
          </button>

          <p className="mt-4 text-center text-[11px] text-muted-foreground/40">
            首次登录自动创建账号
          </p>
        </div>
      </div>
    </div>
  );
}
