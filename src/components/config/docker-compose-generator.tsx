"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const dockerComposeHelp = [
  { title: "功能说明", items: ["可视化构建 Docker Compose 配置", "支持常用服务模板一键添加", "自动生成 YAML 格式配置文件"] },
  { title: "使用步骤", items: ["点击上方常用服务按钮快速添加", "填写服务名称、镜像、端口等信息", "点击「生成配置」预览结果", "复制配置到服务器的 docker-compose.yml"] },
];

interface Service {
  name: string;
  image: string;
  ports: string;
  volumes: string;
  envVars: string;
}

const commonServices = [
  { name: "MySQL", image: "mysql:8.0", defaultPort: "3306" },
  { name: "PostgreSQL", image: "postgres:15", defaultPort: "5432" },
  { name: "Redis", image: "redis:7-alpine", defaultPort: "6379" },
  { name: "Nginx", image: "nginx:alpine", defaultPort: "80" },
  { name: "MongoDB", image: "mongo:6", defaultPort: "27017" },
  { name: "Elasticsearch", image: "elasticsearch:8.10.0", defaultPort: "9200" },
];

export function DockerComposeGenerator() {
  const [services, setServices] = useState<Service[]>([]);
  const [generated, setGenerated] = useState("");

  const addService = (template?: (typeof commonServices)[0]) => {
    const newService: Service = {
      name: template?.name.toLowerCase() || "",
      image: template?.image || "",
      ports: template ? `${template.defaultPort}:${template.defaultPort}` : "",
      volumes: "",
      envVars: "",
    };
    setServices([...services, newService]);
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const generateConfig = () => {
    const config: any = { version: "3.8", services: {} };

    services.forEach((svc) => {
      if (!svc.name || !svc.image) return;

      const serviceConfig: any = { image: svc.image };

      if (svc.ports) {
        serviceConfig.ports = svc.ports.split(",").map((p) => p.trim());
      }

      if (svc.volumes) {
        serviceConfig.volumes = svc.volumes.split(",").map((v) => v.trim());
      }

      if (svc.envVars) {
        serviceConfig.environment = svc.envVars
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean);
      }

      config.services[svc.name] = serviceConfig;
    });

    const yaml = `version: '${config.version}'
services:
${Object.entries(config.services)
  .map(
    ([name, config]: [string, any]) =>
      `  ${name}:
    image: ${config.image}${config.ports ? `\n    ports:\n${config.ports.map((p: string) => `      - "${p}"`).join("\n")}` : ""}${config.volumes ? `\n    volumes:\n${config.volumes.map((v: string) => `      - ${v}`).join("\n")}` : ""}${config.environment ? `\n    environment:\n${config.environment.map((e: string) => `      - ${e}`).join("\n")}` : ""}`
  )
  .join("\n\n")}`;

    setGenerated(yaml);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">Docker Compose 生成器</h2>
          <InlineHelp content={dockerComposeHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          选择常用服务或手动添加，填写参数后生成配置
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">快速添加常用服务</h3>
        <div className="flex flex-wrap gap-2">
          {commonServices.map((svc) => (
            <button
              key={svc.name}
              onClick={() => addService(svc)}
              className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              + {svc.name}
            </button>
          ))}
          <button
            onClick={() => addService()}
            className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            + 自定义服务
          </button>
        </div>
      </div>

      {services.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">服务配置</h3>
          {services.map((service, index) => (
            <div key={index} className="glass rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">服务 {index + 1}</span>
                <button
                  onClick={() => removeService(index)}
                  className="text-sm text-destructive hover:underline"
                >
                  删除
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">
                    服务名称 *
                  </label>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => updateService(index, "name", e.target.value)}
                    className="input-apple mt-1"
                    placeholder="mysql"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    镜像 *
                  </label>
                  <input
                    type="text"
                    value={service.image}
                    onChange={(e) => updateService(index, "image", e.target.value)}
                    className="input-apple mt-1"
                    placeholder="mysql:8.0"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    端口映射{" "}
                    <span className="text-muted-foreground/60">
                      (如: 3306:3306)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={service.ports}
                    onChange={(e) => updateService(index, "ports", e.target.value)}
                    className="input-apple mt-1"
                    placeholder="3306:3306"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    数据卷{" "}
                    <span className="text-muted-foreground/60">
                      (如: /data/mysql:/var/lib/mysql)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={service.volumes}
                    onChange={(e) => updateService(index, "volumes", e.target.value)}
                    className="input-apple mt-1"
                    placeholder="/data/mysql:/var/lib/mysql"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground">
                    环境变量{" "}
                    <span className="text-muted-foreground/60">
                      (如: MYSQL_ROOT_PASSWORD=123456)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={service.envVars}
                    onChange={(e) => updateService(index, "envVars", e.target.value)}
                    className="input-apple mt-1"
                    placeholder="MYSQL_ROOT_PASSWORD=123456, MYSQL_DATABASE=mydb"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={generateConfig}
          disabled={services.length === 0}
          className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
        >
          生成配置
        </button>
      </div>

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
