"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const cronHelp = [
  { title: "功能说明", items: ["可视化配置 cron 定时任务", "自动生成人类可读的时间描述", "支持常用表达式一键填入"] },
  { title: "使用步骤", items: ["点击常用表达式快速填入时间", "或手动填写分/时/日/月/周", "输入要执行的命令", "生成后复制到 crontab -e 中"] },
];

const cronPresets = [
  { name: "每分钟", cron: "* * * * *" },
  { name: "每小时", cron: "0 * * * *" },
  { name: "每天凌晨2点", cron: "0 2 * * *" },
  { name: "每天上午9点", cron: "0 9 * * *" },
  { name: "每周一上午9点", cron: "0 9 * * 1" },
  { name: "每月1号凌晨2点", cron: "0 2 1 * *" },
  { name: "工作日每天9点", cron: "0 9 * * 1-5" },
];

export function CronGenerator() {
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("2");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [command, setCommand] = useState("");
  const [generated, setGenerated] = useState("");
  const [explanation, setExplanation] = useState("");

  const cronToHuman = (min: string, hr: string, dom: string, mon: string, dow: string) => {
    let desc = "在";

    if (mon !== "*") desc += ` ${mon}月`;
    if (dom !== "*") desc += ` ${dom}号`;
    if (dow !== "*") {
      const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      if (dow.includes("-")) {
        const [start, end] = dow.split("-");
        desc += ` ${days[parseInt(start)]}到${days[parseInt(end)]}`;
      } else {
        desc += ` ${days[parseInt(dow)]}`;
      }
    }

    if (hr === "*" && min === "*") {
      desc += " 每分钟";
    } else if (hr === "*") {
      desc += ` 每小时的第 ${min} 分钟`;
    } else {
      desc += ` ${hr}:${min.padStart(2, "0")}`;
    }

    return desc;
  };

  const applyPreset = (preset: (typeof cronPresets)[0]) => {
    const parts = preset.cron.split(" ");
    setMinute(parts[0]);
    setHour(parts[1]);
    setDayOfMonth(parts[2]);
    setMonth(parts[3]);
    setDayOfWeek(parts[4]);
  };

  const generateConfig = () => {
    const cronLine = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} ${command || "# your command here"}`;
    const desc = cronToHuman(minute, hour, dayOfMonth, month, dayOfWeek);
    setExplanation(desc);
    setGenerated(cronLine);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">Cron 定时任务生成器</h2>
          <InlineHelp content={cronHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          可视化配置 cron 表达式，自动翻译成人类可读的时间描述
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">快速预设</h3>
        <div className="flex flex-wrap gap-2">
          {cronPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        <div>
          <label className="text-sm font-medium">分钟</label>
          <input
            type="text"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="input-apple mt-1"
            placeholder="*"
          />
          <p className="text-xs text-muted-foreground mt-1">0-59</p>
        </div>
        <div>
          <label className="text-sm font-medium">小时</label>
          <input
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="input-apple mt-1"
            placeholder="*"
          />
          <p className="text-xs text-muted-foreground mt-1">0-23</p>
        </div>
        <div>
          <label className="text-sm font-medium">日</label>
          <input
            type="text"
            value={dayOfMonth}
            onChange={(e) => setDayOfMonth(e.target.value)}
            className="input-apple mt-1"
            placeholder="*"
          />
          <p className="text-xs text-muted-foreground mt-1">1-31</p>
        </div>
        <div>
          <label className="text-sm font-medium">月</label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input-apple mt-1"
            placeholder="*"
          />
          <p className="text-xs text-muted-foreground mt-1">1-12</p>
        </div>
        <div>
          <label className="text-sm font-medium">周几</label>
          <input
            type="text"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="input-apple mt-1"
            placeholder="*"
          />
          <p className="text-xs text-muted-foreground mt-1">0-6</p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">要执行的命令</label>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="input-apple mt-1"
          placeholder="/usr/bin/node /opt/myapp/cron.js"
        />
      </div>

      <button
        onClick={generateConfig}
        className="btn-primary"
      >
        生成配置
      </button>

      {generated && (
        <div className="space-y-4">
          <div className="p-4 glass rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">含义：</p>
            <p className="text-lg">{explanation}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Cron 表达式</h3>
              <button
                onClick={() => copyToClipboard(generated)}
                className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                复制
              </button>
            </div>
            <pre className="p-4 glass rounded-xl text-sm overflow-x-auto">
              {generated}
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">添加到 crontab</h3>
            <pre className="p-4 glass rounded-xl text-sm overflow-x-auto">
              {`# 编辑 crontab
crontab -e

# 添加以下行
${generated}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
