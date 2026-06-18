"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body = mode === "login" ? { email, password } : { email, name, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "操作失败");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      <div className="w-full max-w-sm mx-4 relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-gradient text-[32px] font-bold tracking-tight">
            ToolkitX
          </h1>
          <p className="text-muted-foreground text-[13px] mt-2">
            运维工具箱 + AI 助手
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-[16px] font-semibold mb-5">
            {mode === "login" ? "登录" : "注册"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="邮箱"
                required
                className="input-apple w-full"
              />
            </div>

            {mode === "register" && (
              <div className="animate-fade-in">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="用户名"
                  required
                  className="input-apple w-full"
                />
              </div>
            )}

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="密码"
                required
                minLength={6}
                className="input-apple w-full"
              />
            </div>

            {error && (
              <div className="text-[12px] text-[#ff453a] bg-[#ff453a]/10 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white text-[14px] font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "请稍候..." : mode === "login" ? "登录" : "注册"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
              }}
              className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {mode === "login" ? "没有账号？立即注册" : "已有账号？立即登录"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
