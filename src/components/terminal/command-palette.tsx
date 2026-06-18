"use client";

import { useState } from "react";

interface Command {
  id: string;
  name: string;
  command: string;
  category: string;
  description: string;
}

const defaultCommands: Command[] = [
  { id: "1", name: "查看系统信息", command: "uname -a && cat /etc/os-release", category: "系统", description: "查看系统内核和发行版信息" },
  { id: "2", name: "查看 CPU 信息", command: "lscpu | head -15", category: "系统", description: "查看 CPU 型号和核心数" },
  { id: "3", name: "查看内存使用", command: "free -h", category: "系统", description: "查看内存使用情况" },
  { id: "4", name: "查看磁盘使用", command: "df -h", category: "系统", description: "查看磁盘空间使用" },
  { id: "5", name: "查看磁盘 IO", command: "iostat -x 1 3", category: "系统", description: "查看磁盘 IO 性能" },
  { id: "6", name: "查看网络连接", command: "ss -tlnp", category: "网络", description: "查看监听的端口" },
  { id: "7", name: "查看路由表", command: "ip route", category: "网络", description: "查看路由表信息" },
  { id: "8", name: "查看进程列表", command: "ps aux --sort=-%cpu | head -20", category: "进程", description: "查看 CPU 占用最高的进程" },
  { id: "9", name: "查看内存占用", command: "ps aux --sort=-%mem | head -20", category: "进程", description: "查看内存占用最高的进程" },
  { id: "10", name: "查看 Docker 容器", command: "docker ps -a", category: "Docker", description: "查看所有 Docker 容器" },
  { id: "11", name: "查看 Docker 镜像", command: "docker images", category: "Docker", description: "查看 Docker 镜像列表" },
  { id: "12", name: "查看系统日志", command: "journalctl -n 50", category: "日志", description: "查看最近 50 条系统日志" },
  { id: "13", name: "查看登录记录", command: "last -n 10", category: "安全", description: "查看最近 10 次登录" },
  { id: "14", name: "查看计划任务", command: "crontab -l", category: "定时", description: "查看当前用户的计划任务" },
  { id: "15", name: "查看服务状态", command: "systemctl list-units --type=service --state=running", category: "服务", description: "查看运行中的服务" },
];

interface CommandPaletteProps {
  onExecute: (command: string) => void;
}

export function CommandPalette({ onExecute }: CommandPaletteProps) {
  const [commands, setCommands] = useState<Command[]>(defaultCommands);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCommand, setNewCommand] = useState({ name: "", command: "", category: "自定义", description: "" });

  const categories = [...new Set(commands.map((c) => c.category))];

  const filteredCommands = commands.filter((cmd) => {
    const matchesSearch =
      cmd.name.toLowerCase().includes(search.toLowerCase()) ||
      cmd.command.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || cmd.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addCommand = () => {
    if (!newCommand.name || !newCommand.command) return;
    setCommands([
      ...commands,
      { ...newCommand, id: Date.now().toString() },
    ]);
    setNewCommand({ name: "", command: "", category: "自定义", description: "" });
    setShowAddModal(false);
  };

  const deleteCommand = (id: string) => {
    setCommands(commands.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">快速命令库</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1 text-sm bg-muted rounded hover:bg-muted/80"
        >
          + 添加命令
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border rounded text-sm"
          placeholder="搜索命令..."
        />
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="px-3 py-2 border rounded text-sm"
        >
          <option value="">全部分类</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredCommands.map((cmd) => (
          <div
            key={cmd.id}
            className="flex items-center justify-between p-3 border rounded hover:bg-muted/50"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{cmd.name}</span>
                <span className="px-2 py-0.5 text-xs bg-muted rounded">
                  {cmd.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{cmd.description}</p>
              <code className="text-xs text-primary mt-1 block">{cmd.command}</code>
            </div>
            <div className="flex gap-1 ml-2">
              <button
                onClick={() => onExecute(cmd.command)}
                className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded"
              >
                执行
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(cmd.command)}
                className="px-3 py-1 text-sm bg-muted rounded hover:bg-muted/80"
              >
                复制
              </button>
              {cmd.category === "自定义" && (
                <button
                  onClick={() => deleteCommand(cmd.id)}
                  className="px-3 py-1 text-sm text-destructive hover:bg-destructive/10 rounded"
                >
                  删除
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">添加自定义命令</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">命令名称</label>
                <input
                  type="text"
                  value={newCommand.name}
                  onChange={(e) => setNewCommand({ ...newCommand, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded text-sm"
                  placeholder="我的命令"
                />
              </div>
              <div>
                <label className="text-sm font-medium">命令</label>
                <input
                  type="text"
                  value={newCommand.command}
                  onChange={(e) => setNewCommand({ ...newCommand, command: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded text-sm font-mono"
                  placeholder="ls -la"
                />
              </div>
              <div>
                <label className="text-sm font-medium">描述</label>
                <input
                  type="text"
                  value={newCommand.description}
                  onChange={(e) => setNewCommand({ ...newCommand, description: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded text-sm"
                  placeholder="命令描述"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={addCommand}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium"
              >
                添加
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-muted rounded text-sm font-medium hover:bg-muted/80"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
