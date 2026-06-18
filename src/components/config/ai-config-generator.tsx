"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const examplePrompts = [
  "帮我写一个 Docker Compose，包含 MySQL 和 Redis",
  "生成一个 Nginx 反向代理配置，域名是 api.example.com，后端端口 3000",
  "写一个 systemd 服务，运行 Node.js 应用",
  "生成一个 cron 任务，每天凌晨 3 点备份数据库",
];

export function AiConfigGenerator() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "config",
          prompt: input,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "请求失败");
      }

      const aiMessage: Message = { role: "assistant", content: data.result };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        role: "assistant",
        content: `⚠️ 请求失败：${err.message}\n\n请检查网络连接后重试。`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const useExample = (example: string) => {
    setInput(example);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-semibold mb-2">AI 配置生成</h2>
        <p className="text-sm text-muted-foreground">
          描述您的需求，AI 帮您生成配置文件
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">试试这些示例</h3>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => useExample(prompt)}
              className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {prompt.slice(0, 30)}...
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              输入您的需求，AI 将为您生成配置
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5"
                }`}
              >
                <pre className="whitespace-pre-wrap text-sm font-sans">{msg.content}</pre>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 rounded-xl p-3">
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/8 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 input-apple"
              placeholder="描述您需要的配置..."
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
