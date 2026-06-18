"use client";

import { useState, useEffect, useRef } from "react";
import { User, LogOut, Settings, ChevronDown, Bell, MessageSquare, Send, X, Loader2, Shield, Info, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProfileModal } from "./profile-modal";
import { useToast } from "@/hooks/use-toast";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string | null;
}

interface Message {
  id: string;
  title: string;
  content: string;
  type: string;
  read: boolean;
  createdAt: number;
  isFeedback?: boolean;
  userName?: string;
  feedbackId?: string;
  status?: string;
  reply?: string | null;
}

export function UserMenu() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [detailMsg, setDetailMsg] = useState<Message | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user) setUser(data.user);
      }
    } catch {}
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
        setUnreadCount(data.unreadCount);
      }
    } catch {}
  };
  const fetchMessagesRef = useRef(fetchMessages);
  fetchMessagesRef.current = fetchMessages;

  useEffect(() => {
    const guest = document.cookie.includes("toolkitx_guest=1") || localStorage.getItem("toolkitx_guest") === "1";
    setIsGuest(guest);
    if (!guest) {
      fetchUser();
      fetchMessagesRef.current();
      const timer = setInterval(() => fetchMessagesRef.current(), 5000);
      setMounted(true);
      return () => clearInterval(timer);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showDropdown && !isGuest) fetchMessages();
  }, [showDropdown, isGuest]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAsRead = async (messageId?: string) => {
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageId ? { messageId } : { markAll: true }),
      });
      fetchMessages();
    } catch {}
  };

  const handleLogout = async () => {
    if (isGuest) {
      localStorage.clear();
      document.cookie = "toolkitx_guest=; path=/; max-age=0";
      router.push("/login");
      router.refresh();
      return;
    }
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const getInitial = () => {
    if (isGuest) return "G";
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const openDetail = (msg: Message) => {
    setDetailMsg(msg);
    if (!msg.read) markAsRead(msg.id);
  };

  if (!mounted) return null;

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all duration-200 relative"
        >
          <div className={`w-8 h-8 rounded-full ${isGuest ? "bg-white/[0.08]" : "bg-gradient-to-br from-[#0a84ff] to-[#bf5af2]"} flex items-center justify-center text-white text-[13px] font-semibold shrink-0`}>
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              getInitial()
            )}
          </div>
          {!isGuest && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#ff453a] text-white text-[10px] font-bold px-1 leading-none">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
          <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground/60 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-72 glass-heavy rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden animate-scale-in z-50">
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-medium truncate">{isGuest ? "游客" : user?.name || "用户"}</p>
                {!isGuest && user?.role === "admin" && (
                  <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#0a84ff]/15 text-[#0a84ff] text-[10px] font-semibold">
                    <Shield className="h-2.5 w-2.5" />
                    Admin
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground/50 truncate mt-0.5">
                {isGuest ? "退出后数据将被清除" : user?.email}
              </p>
            </div>

            <div className="p-1.5">
              {!isGuest && (
                <>
                  <button
                    onClick={() => { setShowMessages(true); setShowDropdown(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-foreground/80 hover:bg-white/[0.06] hover:text-foreground transition-all duration-200"
                  >
                    <div className="relative">
                      <Bell className="h-3.5 w-3.5 text-muted-foreground/50" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff453a]" />
                      )}
                    </div>
                    消息中心
                    {unreadCount > 0 && (
                      <span className="ml-auto text-[11px] text-[#ff453a] font-medium">{unreadCount} 条未读</span>
                    )}
                  </button>
                  <button
                    onClick={() => { setShowFeedback(true); setShowDropdown(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-foreground/80 hover:bg-white/[0.06] hover:text-foreground transition-all duration-200"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-muted-foreground/50" />
                    意见反馈
                  </button>
                  <button
                    onClick={() => { setShowProfile(true); setShowDropdown(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-foreground/80 hover:bg-white/[0.06] hover:text-foreground transition-all duration-200"
                  >
                    <User className="h-3.5 w-3.5 text-muted-foreground/50" />
                    个人资料
                  </button>
                </>
              )}
              {isGuest && (
                <button
                  onClick={() => { setShowFeedback(true); setShowDropdown(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-foreground/80 hover:bg-white/[0.06] hover:text-foreground transition-all duration-200"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground/50" />
                  意见反馈
                </button>
              )}
              {!isGuest && (
                <Link
                  href="/settings"
                  onClick={() => setShowDropdown(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-foreground/80 hover:bg-white/[0.06] hover:text-foreground transition-all duration-200"
                >
                  <Settings className="h-3.5 w-3.5 text-muted-foreground/50" />
                  设置
                </Link>
              )}
              {!isGuest && user?.role === "admin" && (
                <Link
                  href="/admin/messages"
                  onClick={() => setShowDropdown(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-[#0a84ff] hover:bg-[#0a84ff]/10 transition-all duration-200"
                >
                  <Shield className="h-3.5 w-3.5" />
                  管理面板
                </Link>
              )}
            </div>

            <div className="p-1.5 border-t border-white/[0.06]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-[#ff453a]/80 hover:bg-[#ff453a]/10 hover:text-[#ff453a] transition-all duration-200"
              >
                <LogOut className="h-3.5 w-3.5" />
                {isGuest ? "退出游客模式" : "退出登录"}
              </button>
            </div>
          </div>
        )}
      </div>

      {showProfile && !isGuest && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfile(false)}
          onUpdate={(updated) => setUser(updated)}
        />
      )}

      {showMessages && !isGuest && (
        <MessagesPanel
          messages={messages}
          isAdmin={user?.role === "admin"}
          onClose={() => setShowMessages(false)}
          onRead={markAsRead}
          onRefresh={fetchMessages}
          onOpenDetail={openDetail}
        />
      )}

      {detailMsg && (
        <MessageDetailModal
          message={detailMsg}
          isAdmin={user?.role === "admin"}
          onClose={() => setDetailMsg(null)}
          onRefresh={fetchMessages}
        />
      )}

      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
          isGuest={isGuest}
        />
      )}
    </>
  );
}

function MessagesPanel({ messages, isAdmin, onClose, onRead, onRefresh, onOpenDetail }: {
  messages: Message[];
  isAdmin: boolean;
  onClose: () => void;
  onRead: (messageId?: string) => void;
  onRefresh: () => void;
  onOpenDetail: (msg: Message) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const getTypeIcon = (msg: Message) => {
    if (msg.isFeedback) return <MessageSquare className="h-4 w-4 text-[#ff9f0a]" />;
    if (msg.type === "warning") return <AlertTriangle className="h-4 w-4 text-[#ff9f0a]" />;
    if (msg.type === "update") return <CheckCircle className="h-4 w-4 text-[#30d158]" />;
    return <Info className="h-4 w-4 text-[#0a84ff]" />;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="glass-heavy rounded-2xl w-[400px] shadow-[0_16px_48px_rgba(0,0,0,0.5)] animate-scale-in flex flex-col" style={{ height: "min(75vh, 580px)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] shrink-0">
          <h3 className="text-[17px] font-semibold tracking-tight">消息中心</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onRead()}
              className="text-[12px] text-[#0a84ff] hover:text-[#0a84ff]/80 transition-colors"
            >
              全部已读
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-all duration-200 text-sm"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-3 space-y-1.5">
          {messages.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground/30">
              <Bell className="h-8 w-8 mx-auto mb-3 opacity-50" />
              <p className="text-[13px]">暂无消息</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer transition-all duration-150 hover:bg-white/[0.04] ${
                  msg.read
                    ? "border-white/[0.04] bg-white/[0.01]"
                    : msg.isFeedback
                      ? "border-[#ff9f0a]/20 bg-[#ff9f0a]/[0.04]"
                      : "border-[#0a84ff]/20 bg-[#0a84ff]/[0.04]"
                }`}
                onClick={() => onOpenDetail(msg)}
              >
                <div className="shrink-0 mt-0.5">
                  {getTypeIcon(msg)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-[13px] truncate ${msg.read ? "font-normal text-foreground/60" : "font-medium"}`}>
                      {msg.title}
                    </p>
                    <span className="text-[10px] text-muted-foreground/30 shrink-0 ml-2">{formatTime(msg.createdAt)}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground/40 truncate mt-0.5">{msg.content}</p>
                </div>
                {!msg.read && (
                  <div className={`w-2 h-2 rounded-full shrink-0 ${msg.isFeedback ? "bg-[#ff9f0a]" : "bg-[#0a84ff]"}`} />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function MessageDetailModal({ message, isAdmin, onClose, onRefresh }: {
  message: Message;
  isAdmin: boolean;
  onClose: () => void;
  onRefresh: () => void;
}) {
  const { toast } = useToast();
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setReplying(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId: message.id, reply: replyText }),
      });
      if (res.ok) {
        toast("回复已发送");
        setReplyText("");
        onRefresh();
        onClose();
      }
    } catch {
      toast("回复失败", "error");
    } finally {
      setReplying(false);
    }
  };

  const getTypeInfo = () => {
    if (message.isFeedback) {
      const typeMap: Record<string, string> = { suggestion: "功能建议", bug: "Bug 反馈", other: "其他" };
      return { label: typeMap[message.type] || message.type, color: "text-[#ff9f0a]", bg: "bg-[#ff9f0a]/10" };
    }
    if (message.type === "warning") return { label: "警告", color: "text-[#ff9f0a]", bg: "bg-[#ff9f0a]/10" };
    if (message.type === "update") return { label: "更新", color: "text-[#30d158]", bg: "bg-[#30d158]/10" };
    return { label: "通知", color: "text-[#0a84ff]", bg: "bg-[#0a84ff]/10" };
  };

  const typeInfo = getTypeInfo();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 10000 }}>
      <div className="glass-heavy rounded-2xl w-full max-w-md shadow-[0_16px_48px_rgba(0,0,0,0.5)] animate-scale-in flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${typeInfo.bg} ${typeInfo.color}`}>
              {typeInfo.label}
            </span>
            {message.isFeedback && message.userName && (
              <span className="text-[11px] text-muted-foreground/40">来自 {message.userName}</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-all duration-200 text-sm shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-4 overflow-y-auto flex-1">
          <h4 className="text-[15px] font-semibold mb-1">{message.title}</h4>
          <p className="text-[11px] text-muted-foreground/40 mb-4">{new Date(message.createdAt).toLocaleString("zh-CN")}</p>
          <p className="text-[13px] text-muted-foreground/70 leading-relaxed whitespace-pre-wrap">{message.content}</p>

          {message.isFeedback && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  message.status === "replied" ? "bg-[#30d158]/15 text-[#30d158]" : "bg-[#ff9f0a]/15 text-[#ff9f0a]"
                }`}>
                  {message.status === "replied" ? "已回复" : "待处理"}
                </span>
              </div>

              {message.reply && (
                <div className="bg-[#30d158]/[0.06] border border-[#30d158]/20 rounded-xl px-4 py-3">
                  <p className="text-[11px] text-[#30d158] font-medium mb-1.5">管理员回复</p>
                  <p className="text-[13px] text-muted-foreground/70 leading-relaxed whitespace-pre-wrap">{message.reply}</p>
                </div>
              )}

              {isAdmin && !message.reply && (
                <div className="space-y-2">
                  <label className="text-[12px] text-muted-foreground/50">回复反馈</label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors resize-none h-20"
                    placeholder="输入回复内容..."
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {isAdmin && message.isFeedback && !message.reply && (
          <div className="px-6 py-3 border-t border-white/[0.06] shrink-0">
            <button
              onClick={handleReply}
              disabled={replying || !replyText.trim()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white text-[13px] font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
            >
              {replying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              发送回复
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FeedbackModal({ onClose, isGuest }: { onClose: () => void; isGuest: boolean }) {
  const { toast } = useToast();
  const [type, setType] = useState("suggestion");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast("请填写标题和内容", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, title, content }),
      });
      if (res.ok) {
        toast("反馈已提交，感谢您的建议");
        onClose();
      } else {
        const data = await res.json();
        if (isGuest && res.status === 401) {
          toast("游客无法提交反馈，请先登录", "error");
        } else {
          toast(data.error || "提交失败", "error");
        }
      }
    } catch {
      toast("网络错误", "error");
    } finally {
      setLoading(false);
    }
  };

  const types = [
    { value: "suggestion", label: "功能建议" },
    { value: "bug", label: "Bug 反馈" },
    { value: "other", label: "其他" },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="glass-heavy rounded-2xl w-full max-w-md shadow-[0_16px_48px_rgba(0,0,0,0.5)] animate-scale-in max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] shrink-0">
          <h3 className="text-[17px] font-semibold tracking-tight">意见反馈</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-all duration-200 text-sm"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
          {isGuest && (
            <div className="text-[12px] text-[#ff9f0a] bg-[#ff9f0a]/10 px-3 py-2 rounded-lg">
              游客提交的反馈不会关联到账号，登录后可追踪回复
            </div>
          )}
          <div>
            <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">类型</label>
            <div className="flex gap-2">
              {types.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 ${
                    type === t.value
                      ? "bg-[#0a84ff] text-white"
                      : "bg-white/[0.04] border border-white/[0.06] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
              placeholder="简要描述"
            />
          </div>
          <div>
            <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">详细内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors resize-none h-28"
              placeholder="请详细描述您遇到的问题或建议..."
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/[0.06] shrink-0">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white text-[13px] font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            提交反馈
          </button>
        </div>
      </div>
    </div>
  );
}

function formatTime(ts: number) {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 60000) return "刚刚";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
  return d.toLocaleDateString("zh-CN");
}
