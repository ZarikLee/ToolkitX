"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface LogViewerProps {
  server: { host: string; port: number; username: string; password?: string; privateKey?: string };
  logFile: string;
  search: string;
  levelFilter: string;
  paused: boolean;
}

interface LogLine {
  id: number;
  text: string;
  level: string;
}

export function LogViewer({ server, logFile, search, levelFilter, paused }: LogViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [lines, setLines] = useState<LogLine[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lineIdRef = useRef(0);

  const detectLevel = (text: string): string => {
    const upper = text.toUpperCase();
    if (upper.includes("ERROR") || upper.includes("FATAL") || upper.includes("CRITICAL")) return "error";
    if (upper.includes("WARN")) return "warn";
    if (upper.includes("INFO")) return "info";
    if (upper.includes("DEBUG")) return "debug";
    return "info";
  };

  const connect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${protocol}//${window.location.host}/api/ssh`);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "tail_start",
        host: server.host,
        port: server.port,
        username: server.username,
        password: server.password,
        privateKey: server.privateKey,
        file: logFile,
        lines: 200,
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "tail_connected":
          setConnected(true);
          setError(null);
          break;
        case "tail_data":
          const newLines = data.data.split("\n").filter((l: string) => l.trim());
          setLines((prev) => {
            const appended = newLines.map((text: string) => ({
              id: lineIdRef.current++,
              text,
              level: detectLevel(text),
            }));
            const combined = [...prev, ...appended];
            return combined.slice(-2000);
          });
          break;
        case "tail_error":
          setError(data.error);
          break;
      }
    };

    ws.onclose = () => {
      setConnected(false);
    };

    ws.onerror = () => {
      setError("WebSocket 连接失败");
      setConnected(false);
    };
  }, [server, logFile]);

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({ type: "tail_stop" }));
        wsRef.current.close();
      }
    };
  }, [connect]);

  // Auto-scroll
  useEffect(() => {
    if (!paused && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, paused]);

  // Filter lines
  const filteredLines = lines.filter((line) => {
    if (search && !line.text.toLowerCase().includes(search.toLowerCase())) return false;
    if (levelFilter !== "all" && line.level !== levelFilter) return false;
    return true;
  });

  const getLevelStyle = (level: string) => {
    switch (level) {
      case "error": return "text-[#ff453a]";
      case "warn": return "text-[#ff9f0a]";
      case "info": return "text-foreground/70";
      case "debug": return "text-muted-foreground/40";
      default: return "text-foreground/70";
    }
  };

  const highlightSearch = (text: string) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={i} className="bg-[#ff9f0a]/30 text-foreground rounded px-0.5">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (!connected && !error) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground/30">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-[#0a84ff]/30 border-t-[#0a84ff] rounded-full animate-spin" />
          <span className="text-[13px]">正在连接...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl border border-[#ff453a]/20 bg-[#ff453a]/[0.06]">
        <p className="text-[13px] text-[#ff453a]">{error}</p>
        <button
          onClick={connect}
          className="mt-2 text-[12px] text-[#0a84ff] hover:underline"
        >
          重试
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-22rem)] overflow-auto rounded-xl bg-black/40 border border-white/10 font-mono text-[12px] leading-relaxed"
    >
      {filteredLines.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground/20">
          等待日志数据...
        </div>
      ) : (
        <div className="p-3 space-y-0.5">
          {filteredLines.map((line) => (
            <div
              key={line.id}
              className={`flex gap-2 hover:bg-white/5 px-2 py-0.5 rounded ${getLevelStyle(line.level)}`}
            >
              <span className="text-muted-foreground/20 shrink-0 select-none">
                {String(line.id + 1).padStart(4, "0")}
              </span>
              <span className="flex-1 whitespace-pre-wrap break-all">
                {highlightSearch(line.text)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
