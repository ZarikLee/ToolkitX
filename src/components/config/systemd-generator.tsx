"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const systemdHelp = [
  { title: "功能说明", items: ["生成 systemd .service 服务配置文件", "同时生成 systemctl 部署命令"] },
  { title: "使用步骤", items: ["填写服务名称、启动命令、工作目录等", "点击「生成配置」", "将 .service 文件保存到 /etc/systemd/system/", "执行 systemctl daemon-reload && systemctl start 服务名"] },
];

export function SystemdGenerator() {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [workingDir, setWorkingDir] = useState("");
  const [execStart, setExecStart] = useState("");
  const [user, setUser] = useState("root");
  const [envVars, setEnvVars] = useState("");
  const [restart, setRestart] = useState("always");
  const [generated, setGenerated] = useState("");
  const [systemctlCommands, setSystemctlCommands] = useState("");

  const generateConfig = () => {
    const envSection = envVars
      .split("\n")
      .filter((e) => e.trim())
      .map((e) => `Environment=${e.trim()}`)
      .join("\n");

    const config = `[Unit]
Description=${description || serviceName}
After=network.target

[Service]
Type=simple
User=${user}
WorkingDirectory=${workingDir || "/opt/" + serviceName}
ExecStart=${execStart || "/usr/bin/node server.js"}${envSection ? "\n" + envSection : ""}
Restart=${restart}
RestartSec=10

[Install]
WantedBy=multi-user.target`;

    const commands = `# 将文件保存到 /etc/systemd/system/${serviceName || "myservice"}.service
# 然后执行以下命令:

sudo systemctl daemon-reload
sudo systemctl enable ${serviceName || "myservice"}
sudo systemctl start ${serviceName || "myservice"}

# 查看状态:
sudo systemctl status ${serviceName || "myservice"}

# 查看日志:
sudo journalctl -u ${serviceName || "myservice"} -f`;

    setGenerated(config);
    setSystemctlCommands(commands);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">Systemd 服务生成器</h2>
          <InlineHelp content={systemdHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          填写参数，生成 .service 文件和 systemctl 命令
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">服务名称 *</label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="input-apple mt-1"
            placeholder="myapp"
          />
        </div>
        <div>
          <label className="text-sm font-medium">描述</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-apple mt-1"
            placeholder="My Application"
          />
        </div>
        <div>
          <label className="text-sm font-medium">工作目录</label>
          <input
            type="text"
            value={workingDir}
            onChange={(e) => setWorkingDir(e.target.value)}
            className="input-apple mt-1"
            placeholder="/opt/myapp"
          />
          <p className="text-xs text-muted-foreground mt-1">
            默认: /opt/服务名称
          </p>
        </div>
        <div>
          <label className="text-sm font-medium">启动命令 *</label>
          <input
            type="text"
            value={execStart}
            onChange={(e) => setExecStart(e.target.value)}
            className="input-apple mt-1"
            placeholder="/usr/bin/node server.js"
          />
        </div>
        <div>
          <label className="text-sm font-medium">运行用户</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="input-apple mt-1"
            placeholder="root"
          />
        </div>
        <div>
          <label className="text-sm font-medium">重启策略</label>
          <select
            value={restart}
            onChange={(e) => setRestart(e.target.value)}
            className="input-apple mt-1"
          >
            <option value="always">always</option>
            <option value="on-failure">on-failure</option>
            <option value="on-abnormal">on-abnormal</option>
            <option value="no">no</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium">
            环境变量（每行一个）
          </label>
          <textarea
            value={envVars}
            onChange={(e) => setEnvVars(e.target.value)}
            className="input-apple mt-1"
            rows={3}
            placeholder="NODE_ENV=production&#10;PORT=3000"
          />
          <p className="text-xs text-muted-foreground mt-1">
            格式: KEY=VALUE，每行一个
          </p>
        </div>
      </div>

      <button
        onClick={generateConfig}
        disabled={!serviceName || !execStart}
        className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
      >
        生成配置
      </button>

      {generated && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">.service 文件</h3>
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
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">部署命令</h3>
              <button
                onClick={() => copyToClipboard(systemctlCommands)}
                className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                复制
              </button>
            </div>
            <pre className="p-4 glass rounded-xl text-sm overflow-x-auto">
              {systemctlCommands}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
