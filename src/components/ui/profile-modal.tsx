"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

interface ProfileModalProps {
  user: UserInfo | null;
  onClose: () => void;
  onUpdate: (user: UserInfo) => void;
}

export function ProfileModal({ user, onClose, onUpdate }: ProfileModalProps) {
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast("用户名不能为空", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.error || "保存失败", "error");
      } else {
        toast("资料已保存");
        onUpdate(data.user);
        onClose();
      }
    } catch {
      toast("网络错误", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword) {
      toast("请输入当前密码", "error");
      return;
    }
    if (!newPassword) {
      toast("请输入新密码", "error");
      return;
    }
    if (newPassword.length < 6) {
      toast("新密码至少需要 6 个字符", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast("两次输入的密码不一致", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.error || "修改失败", "error");
      } else {
        toast("密码修改成功");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      toast("网络错误", "error");
    } finally {
      setLoading(false);
    }
  };

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
    >
      <div className="glass-heavy rounded-2xl w-full max-w-md shadow-[0_16px_48px_rgba(0,0,0,0.5)] animate-scale-in max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] shrink-0">
          <h3 className="text-[17px] font-semibold tracking-tight">个人资料</h3>
          <button
            onClick={onClose}
            className="btn-close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col items-center py-6 shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0a84ff] to-[#bf5af2] flex items-center justify-center text-white text-[22px] font-semibold">
            {getInitial()}
          </div>
          <p className="text-[14px] font-medium mt-3">{user?.name}</p>
          <p className="text-[12px] text-muted-foreground/50">{user?.email}</p>
        </div>

        <div className="flex border-b border-white/[0.06] shrink-0">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-2.5 text-[13px] font-medium transition-colors ${
              activeTab === "profile"
                ? "text-foreground border-b-2 border-[#0a84ff]"
                : "text-muted-foreground/50 hover:text-foreground"
            }`}
          >
            基本信息
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex-1 py-2.5 text-[13px] font-medium transition-colors ${
              activeTab === "password"
                ? "text-foreground border-b-2 border-[#0a84ff]"
                : "text-muted-foreground/50 hover:text-foreground"
            }`}
          >
            修改密码
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto flex-1">
          {activeTab === "profile" ? (
            <div className="space-y-4">
              <div>
                <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                  用户名
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
                  placeholder="你的名字"
                />
              </div>
              <div>
                <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                  邮箱
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                  注册时间
                </label>
                <div className="px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[13px] text-muted-foreground/50">
                  {user?.id ? new Date().toLocaleDateString("zh-CN") : "-"}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                  当前密码
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2.5 pr-10 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
                    placeholder="输入当前密码"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-muted-foreground/60"
                  >
                    {showCurrent ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                  新密码
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2.5 pr-10 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
                    placeholder="至少 6 个字符"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-muted-foreground/60"
                  >
                    {showNew ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                  确认新密码
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
                  placeholder="再次输入新密码"
                />
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/[0.06] shrink-0">
          <button
            onClick={activeTab === "profile" ? handleSaveProfile : handleChangePassword}
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {activeTab === "profile" ? "保存修改" : "修改密码"}
          </button>
        </div>
      </div>
    </div>
  );
}
