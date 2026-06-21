"use client";

import { useState, useEffect } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const timestampHelp = [
  { title: "功能说明", items: ["Unix 时间戳与日期时间互转", "显示当前实时时间戳"] },
  { title: "使用方法", items: ["输入时间戳点击「转换」得到日期", "选择日期时间点击「转换」得到时间戳", "时间戳单位为秒（10位）"] },
];

export function TimestampTool() {
  const [timestamp, setTimestamp] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [convertedDateTime, setConvertedDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = () => {
    try {
      const ts = parseInt(timestamp);
      const date = new Date(ts * 1000);
      setConvertedDateTime(date.toLocaleString());
    } catch {
      setConvertedDateTime("无效的时间戳");
    }
  };

  const dateToTimestamp = () => {
    try {
      const date = new Date(dateTime);
      setConvertedDateTime(Math.floor(date.getTime() / 1000).toString());
    } catch {
      setConvertedDateTime("无效的日期时间");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTimestamp = (ts: number) => {
    const date = new Date(ts * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">时间戳转换</h2>
          <InlineHelp content={timestampHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          Unix 时间戳和日期时间互转
        </p>
      </div>

      <div className="p-4 glass rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">当前时间戳</p>
            <p className="text-2xl font-mono font-bold">{currentTimestamp}</p>
          </div>
          <button
            onClick={() => copyToClipboard(currentTimestamp.toString())}
            className="px-3 py-1 text-sm btn-ghost"
          >
            复制
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {formatTimestamp(currentTimestamp)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">时间戳 → 日期时间</h3>
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="input-apple font-mono"
            placeholder="1704067200"
          />
          <button
            onClick={timestampToDate}
            className="w-full btn-primary"
          >
            转换
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">日期时间 → 时间戳</h3>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="input-apple"
          />
          <button
            onClick={dateToTimestamp}
            className="w-full btn-primary"
          >
            转换
          </button>
        </div>
      </div>

      {convertedDateTime && (
        <div className="p-4 glass rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">转换结果</p>
              <p className="text-lg font-mono">{convertedDateTime}</p>
            </div>
            <button
              onClick={() => copyToClipboard(convertedDateTime)}
              className="px-3 py-1 text-sm btn-ghost"
            >
              复制
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-medium">常用时间戳</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 glass rounded-lg">
            <span className="text-muted-foreground">今天 00:00:00:</span>{" "}
            <span className="font-mono">
              {Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000)}
            </span>
          </div>
          <div className="p-2 glass rounded-lg">
            <span className="text-muted-foreground">今天 23:59:59:</span>{" "}
            <span className="font-mono">
              {Math.floor(new Date(new Date().setHours(23, 59, 59, 999)).getTime() / 1000)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
