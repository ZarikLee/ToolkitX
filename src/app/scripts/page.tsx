"use client";

import { useState } from "react";
import { pythonScripts } from "@/data/python-scripts";
import { sqlScripts } from "@/data/sql-scripts";
import { shellScripts } from "@/data/shell-scripts";
import { ScriptDetail } from "@/components/scripts/script-detail";
import { AiScriptGenerator } from "@/components/scripts/ai-script-generator";
import { SubPageLayout } from "@/components/layout/sub-page-layout";
import { TabButton } from "@/components/ui/tab-button";

const helpContent = [
  {
    title: "如何使用脚本库",
    items: [
      "点击上方标签页切换语言（Python / SQL / Shell）",
      "浏览脚本卡片，点击任意脚本查看完整代码",
      "在弹窗中点击「复制」将代码复制到剪贴板",
      "点击「下载」可直接下载为对应后缀的文件",
    ],
  },
  {
    title: "SQL 建表生成器",
    items: [
      "切换到「SQL」标签页后，点击「建表生成器」",
      "输入表名和字段信息，支持设置主键、默认值、注释",
      "点击「生成 SQL」即可获得完整的 CREATE TABLE 语句",
    ],
  },
  {
    title: "AI 脚本生成",
    items: [
      "切换到「AI 生成」标签页，用自然语言描述需求",
      "例如：「写一个 Python 脚本，监控服务器 CPU」",
      "AI 会生成完整脚本，包含注释和使用说明",
      "可以继续追问，让 AI 修改或补充功能",
    ],
  },
];

type Category = "python" | "sql" | "shell" | "ai";

const categories = [
  { id: "python" as Category, name: "Python", count: 15 },
  { id: "sql" as Category, name: "SQL", count: 15 },
  { id: "shell" as Category, name: "Shell", count: 15 },
  { id: "ai" as Category, name: "AI 生成", count: 0 },
];

export default function ScriptsPage() {
  const [category, setCategory] = useState<Category>("python");
  const [selectedScript, setSelectedScript] = useState<string | null>(null);

  const getScripts = () => {
    switch (category) {
      case "python":
        return pythonScripts;
      case "sql":
        return sqlScripts;
      case "shell":
        return shellScripts;
      default:
        return [];
    }
  };

  const scripts = getScripts();
  const script = scripts.find((s) => s.id === selectedScript);

  return (
    <SubPageLayout
      title="脚本库"
      subtitle="运维常用脚本模板，一键复制使用"
      helpContent={helpContent}
      tabs={
        <>
          {categories.map((cat) => (
            <TabButton
              key={cat.id}
              active={category === cat.id}
              onClick={() => {
                setCategory(cat.id);
                setSelectedScript(null);
              }}
            >
              {cat.name}
              {cat.count > 0 && (
                <span className="ml-1 text-[11px] text-muted-foreground/60">
                  {cat.count}
                </span>
              )}
            </TabButton>
          ))}
        </>
      }
    >
      {category === "ai" ? (
        <AiScriptGenerator />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {scripts.map((script, i) => (
            <div
              key={script.id}
              onClick={() => setSelectedScript(script.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 animate-fade-in ${
                selectedScript === script.id
                  ? "border-[#0a84ff]/40 bg-[#0a84ff]/[0.06] shadow-[0_0_0_1px_rgba(10,132,255,0.1)]"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1]"
              }`}
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <h3 className="text-[14px] font-medium tracking-tight">
                {script.name}
              </h3>
              <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
                {script.description}
              </p>
              <div className="flex gap-1.5 mt-2.5">
                {script.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] bg-white/[0.06] text-muted-foreground rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {script && (
        <ScriptDetail
          script={script}
          onClose={() => setSelectedScript(null)}
        />
      )}
    </SubPageLayout>
  );
}
