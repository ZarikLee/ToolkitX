"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const dockerHelp = [
  { title: "功能说明", items: ["将 docker run 命令转换为 docker-compose.yml", "支持常见参数解析"] },
  { title: "使用方法", items: ["粘贴 docker run 命令", "点击「转换」", "复制生成的 compose 配置"] },
];

function parseDockerRun(command: string): Record<string, any> {
  const compose: Record<string, any> = {
    version: "3.8",
    services: {
      app: {
        image: "",
        ports: [],
        environment: [],
        volumes: [],
        restart: "unless-stopped",
      },
    },
  };

  const parts = command.replace(/docker run/g, "").trim().split(/\s+/);
  let i = 0;

  while (i < parts.length) {
    const part = parts[i];

    if (part === "-d" || part === "--detach") {
      // Detached mode, already default in compose
    } else if (part === "--name") {
      i++;
      compose.services.app.container_name = parts[i];
    } else if (part === "-p" || part === "--publish") {
      i++;
      compose.services.app.ports.push(parts[i]);
    } else if (part === "-e" || part === "--env") {
      i++;
      compose.services.app.environment.push(parts[i]);
    } else if (part === "-v" || part === "--volume") {
      i++;
      compose.services.app.volumes.push(parts[i]);
    } else if (part === "--rm") {
      compose.services.app.stdin_open = true;
    } else if (part === "-it" || part === "-i" || part === "-t") {
      compose.services.app.stdin_open = true;
      compose.services.app.tty = true;
    } else if (part === "--network") {
      i++;
      compose.services.app.networks = [parts[i]];
    } else if (part === "--restart") {
      i++;
      compose.services.app.restart = parts[i];
    } else if (!part.startsWith("-") && !compose.services.app.image) {
      compose.services.app.image = part;
    }

    i++;
  }

  if (compose.services.app.ports.length === 0) delete compose.services.app.ports;
  if (compose.services.app.environment.length === 0) delete compose.services.app.environment;
  if (compose.services.app.volumes.length === 0) delete compose.services.app.volumes;

  return compose;
}

function yamlStringify(obj: any, indent = 0): string {
  const spaces = "  ".repeat(indent);
  let result = "";

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      result += `${spaces}${key}:\n${yamlStringify(value, indent + 1)}`;
    } else if (Array.isArray(value)) {
      result += `${spaces}${key}:\n`;
      for (const item of value) {
        result += `${spaces}  - ${item}\n`;
      }
    } else {
      result += `${spaces}${key}: ${typeof value === "string" ? value : value}\n`;
    }
  }

  return result;
}

export function DockerConverter() {
  const [input, setInput] = useState('docker run -d --name myapp -p 8080:80 -e NODE_ENV=production -v /data:/app/data nginx:latest');
  const [output, setOutput] = useState("");

  const convert = () => {
    const compose = parseDockerRun(input);
    setOutput(yamlStringify(compose));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">Docker Run → Compose 转换器</h2>
          <InlineHelp content={dockerHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          将 docker run 命令转换为 docker-compose.yml 配置
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">docker run 命令</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-apple mt-1 font-mono"
          rows={4}
          placeholder="docker run -d --name myapp -p 8080:80 nginx"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={convert}
          disabled={!input}
          className="btn-primary disabled:opacity-50"
        >
          转换
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="btn-apple btn-secondary disabled:opacity-50"
        >
          复制
        </button>
      </div>

      {output && (
        <div className="p-4 glass rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">docker-compose.yml</h3>
          </div>
          <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
