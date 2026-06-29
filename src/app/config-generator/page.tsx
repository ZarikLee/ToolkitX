"use client";

import { useState } from "react";
import { DockerComposeGenerator } from "@/components/config/docker-compose-generator";
import { NginxGenerator } from "@/components/config/nginx-generator";
import { SystemdGenerator } from "@/components/config/systemd-generator";
import { CronGenerator } from "@/components/config/cron-generator";
import { AiConfigGenerator } from "@/components/config/ai-config-generator";
import { SubPageLayout } from "@/components/layout/sub-page-layout";
import { TabButton } from "@/components/ui/tab-button";

const helpContent = [
  {
    title: "如何使用配置生成器",
    items: [
      "选择上方的标签页切换不同配置类型（Docker Compose / Nginx / Systemd / Cron）",
      "在表单中填写参数，带有中文提示说明每个字段的含义",
      "点击「生成配置」按钮，即可在下方预览生成的配置文件",
      "点击「复制」将配置复制到剪贴板，粘贴到服务器对应文件中",
    ],
  },
  {
    title: "AI 生成",
    items: [
      "切换到「AI 生成」标签页，用自然语言描述你想要的配置",
      "例如：「帮我写一个 Docker Compose，包含 MySQL 和 Redis」",
      "AI 会根据你的描述自动生成完整配置",
      "可以在此基础上继续追问，让 AI 调整配置细节",
    ],
  },
  {
    title: "小技巧",
    items: [
      "每个输入框下方都有灰色提示文字，说明格式和示例",
      "Cron 生成器支持点击「常用表达式」快速填入",
      "Nginx 生成器支持 SSL 证书一键添加",
    ],
  },
];

const generators = [
  { id: "docker", name: "Docker Compose", component: DockerComposeGenerator },
  { id: "nginx", name: "Nginx", component: NginxGenerator },
  { id: "systemd", name: "Systemd", component: SystemdGenerator },
  { id: "cron", name: "Cron", component: CronGenerator },
  { id: "ai", name: "AI 生成", component: AiConfigGenerator },
];

export default function ConfigGeneratorPage() {
  const [activeGenerator, setActiveGenerator] = useState("docker");

  const ActiveComponent = generators.find(
    (g) => g.id === activeGenerator
  )?.component;

  return (
    <SubPageLayout
      title="配置生成器"
      subtitle="选择模板，填写参数，一键生成配置文件"
      helpContent={helpContent}
      tabs={
        <>
          {generators.map((gen) => (
            <TabButton
              key={gen.id}
              active={activeGenerator === gen.id}
              onClick={() => setActiveGenerator(gen.id)}
            >
              {gen.name}
            </TabButton>
          ))}
        </>
      }
    >
      <div className="p-6 rounded-2xl border border-white/15 bg-white/5">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </SubPageLayout>
  );
}
