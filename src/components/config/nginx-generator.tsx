"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const nginxHelp = [
  { title: "功能说明", items: ["生成 Nginx 反向代理、静态站点、负载均衡配置", "支持一键添加 SSL 证书配置"] },
  { title: "使用步骤", items: ["选择配置类型（反向代理/静态站点/负载均衡）", "填写域名、端口等参数", "点击「生成配置」预览结果", "复制到服务器 /etc/nginx/conf.d/ 目录"] },
];

type ConfigType = "reverse-proxy" | "static" | "load-balancer";

export function NginxGenerator() {
  const [configType, setConfigType] = useState<ConfigType>("reverse-proxy");
  const [serverName, setServerName] = useState("");
  const [targetPort, setTargetPort] = useState("");
  const [targetUpstreams, setTargetUpstreams] = useState("");
  const [enableSsl, setEnableSsl] = useState(false);
  const [generated, setGenerated] = useState("");

  const generateConfig = () => {
    let config = "";

    if (configType === "reverse-proxy") {
      config = `server {
    listen 80;
    server_name ${serverName || "example.com"};

    location / {
        proxy_pass http://127.0.0.1:${targetPort || "8080"};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`;
    } else if (configType === "static") {
      config = `server {
    listen 80;
    server_name ${serverName || "example.com"};
    root /var/www/${serverName || "example.com"};
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}`;
    } else if (configType === "load-balancer") {
      const upstreams = targetUpstreams
        .split("\n")
        .filter((u) => u.trim())
        .map((u) => `        server ${u.trim()};`)
        .join("\n");

      config = `upstream backend {
${upstreams || "        server 127.0.0.1:8080;\n        server 127.0.0.1:8081;"}
}

server {
    listen 80;
    server_name ${serverName || "example.com"};

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`;
    }

    if (enableSsl) {
      config += `

server {
    listen 443 ssl;
    server_name ${serverName || "example.com"};

    ssl_certificate /etc/nginx/ssl/${serverName || "example.com"}.crt;
    ssl_certificate_key /etc/nginx/ssl/${serverName || "example.com"}.key;

    location / {
        proxy_pass http://127.0.0.1:${targetPort || "8080"};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`;
    }

    setGenerated(config);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">Nginx 配置生成器</h2>
          <InlineHelp content={nginxHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          选择配置类型，填写参数后生成 Nginx 配置
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">配置类型</h3>
        <div className="flex gap-2">
          {[
            { id: "reverse-proxy", name: "反向代理" },
            { id: "static", name: "静态站点" },
            { id: "load-balancer", name: "负载均衡" },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setConfigType(type.id as ConfigType)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                configType === type.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">域名</label>
          <input
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            className="input-apple mt-1"
            placeholder="example.com"
          />
          <p className="text-xs text-muted-foreground mt-1">
            服务器名称，如 example.com
          </p>
        </div>

        {configType !== "load-balancer" && (
          <div>
            <label className="text-sm font-medium">目标端口</label>
            <input
              type="text"
              value={targetPort}
              onChange={(e) => setTargetPort(e.target.value)}
              className="input-apple mt-1"
              placeholder="8080"
            />
            <p className="text-xs text-muted-foreground mt-1">
              后端服务监听的端口
            </p>
          </div>
        )}

        {configType === "load-balancer" && (
          <div>
            <label className="text-sm font-medium">
              后端服务器列表（每行一个）
            </label>
            <textarea
              value={targetUpstreams}
              onChange={(e) => setTargetUpstreams(e.target.value)}
              className="input-apple mt-1"
              rows={4}
              placeholder="192.168.1.10:8080&#10;192.168.1.11:8080&#10;192.168.1.12:8080"
            />
            <p className="text-xs text-muted-foreground mt-1">
              格式: IP:端口，每行一个
            </p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="enableSsl"
            checked={enableSsl}
            onChange={(e) => setEnableSsl(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="enableSsl" className="text-sm">
            启用 SSL（需要证书文件）
          </label>
        </div>
      </div>

      <button
        onClick={generateConfig}
        className="btn-primary"
      >
        生成配置
      </button>

      {generated && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">生成的配置</h3>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              复制
            </button>
          </div>
          <pre className="p-4 glass rounded-xl text-sm overflow-x-auto">
            {generated}
          </pre>
        </div>
      )}
    </div>
  );
}
