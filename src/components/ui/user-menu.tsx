"use client";

import { useState, useEffect, useRef } from "react";
import { User, LogOut, Settings, ChevronDown, Moon, Sun, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProfileModal } from "./profile-modal";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUser();
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    setTheme(saved || "dark");
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user) setUser(data.user);
      }
    } catch {}
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.className = next;
    localStorage.setItem("theme", next);
    fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: next }),
    }).catch(() => {});
  };

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  if (!mounted) return null;

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0a84ff] to-[#bf5af2] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              getInitial()
            )}
          </div>
          <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground/60 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-56 glass-heavy rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden animate-scale-in z-50">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <p className="text-[13px] font-medium truncate">{user?.name || "用户"}</p>
              <p className="text-[11px] text-muted-foreground/50 truncate mt-0.5">{user?.email}</p>
            </div>

            {/* Menu Items */}
            <div className="p-1.5">
              <button
                onClick={() => { setShowProfile(true); setShowDropdown(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-foreground/80 hover:bg-white/[0.06] hover:text-foreground transition-all duration-200"
              >
                <User className="h-3.5 w-3.5 text-muted-foreground/50" />
                个人资料
              </button>
              <Link
                href="/settings"
                onClick={() => setShowDropdown(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-foreground/80 hover:bg-white/[0.06] hover:text-foreground transition-all duration-200"
              >
                <Settings className="h-3.5 w-3.5 text-muted-foreground/50" />
                设置
              </Link>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-foreground/80 hover:bg-white/[0.06] hover:text-foreground transition-all duration-200"
              >
                {theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5 text-muted-foreground/50" />
                ) : (
                  <Moon className="h-3.5 w-3.5 text-muted-foreground/50" />
                )}
                {theme === "dark" ? "亮色主题" : "暗色主题"}
              </button>
            </div>

            {/* Logout */}
            <div className="p-1.5 border-t border-white/[0.06]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-[#ff453a]/80 hover:bg-[#ff453a]/10 hover:text-[#ff453a] transition-all duration-200"
              >
                <LogOut className="h-3.5 w-3.5" />
                退出登录
              </button>
            </div>
          </div>
        )}
      </div>

      {showProfile && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfile(false)}
          onUpdate={(updated) => setUser(updated)}
        />
      )}
    </>
  );
}
