"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Send, Loader2, Info, AlertTriangle, CheckCircle, Megaphone } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const types = [
  { value: "info", label: "通知", icon: Info, color: "text-[#0a84ff]" },
  { value: "warning", label: "警告", icon: AlertTriangle, color: "text-[#ff9f0a]" },
  { value: "update", label: "更新", icon: CheckCircle, color: "text-[#30d158]" },
];

export default function AdminMessagesPage() {
  const { toast } = useToast();
  const [type, setType] = useState("info");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ id: string; title: string; type: string; createdAt: number }[]>([]);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((d) => setMessages(d.messages || []))
      .catch(() => {});
  }, []);

  const handleSend = async () => {
    if (!title.trim() || !content.trim()) {
      toast("请填写标题和内容", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, type }),
      });
      if (res.ok) {
        toast("消息已发送");
        setTitle("");
        setContent("");
        // refresh
        const r = await fetch("/api/messages");
        const d = await r.json();
        setMessages(d.messages || []);
      } else {
        const data = await res.json();
        toast(data.error || "发送失败", "error");
      }
    } catch {
      toast("网络错误", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除该消息？")) return;
    try {
      await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast("已删除");
    } catch {
      toast("删除失败", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-foreground">
      <div className="sticky top-0 z-50 h-14 flex items-center px-4 border-b border-white/[0.04] bg-[#000000]/80 backdrop-blur-xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-[13px]">首页</span>
        </Link>
        <div className="flex items-center gap-2 ml-4">
          <Megaphone className="h-4 w-4 text-[#0a84ff]" />
          <span className="text-[15px] font-medium">消息广播</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <div className="glass-card rounded-2xl p-6 space-y-5">
          <h3 className="text-[15px] font-medium">发送广播消息</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-2 block">类型</label>
              <div className="flex gap-2">
                {types.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.value}
                      onClick={() => setType(t.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 ${
                        type === t.value
                          ? "bg-[#0a84ff] text-white"
                          : "bg-white/[0.04] border border-white/[0.06] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className={`h-3 w-3 ${type === t.value ? "text-white" : t.color}`} />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">标题</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
                placeholder="消息标题"
              />
            </div>
            <div>
              <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">内容</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors resize-none h-32"
                placeholder="消息内容..."
              />
            </div>
            <button
              onClick={handleSend}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white text-[13px] font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              发送广播
            </button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-[15px] font-medium">历史消息</h3>
          <div className="space-y-2">
            {messages.length === 0 ? (
              <p className="text-[13px] text-muted-foreground/30 py-8 text-center">暂无消息</p>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${m.type === "info" ? "bg-[#0a84ff]" : m.type === "warning" ? "bg-[#ff9f0a]" : "bg-[#30d158]"}`} />
                    <span className="text-[13px]">{m.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-muted-foreground/40">{new Date(m.createdAt).toLocaleString("zh-CN")}</span>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="text-[11px] text-[#ff453a]/60 hover:text-[#ff453a] transition-colors"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
