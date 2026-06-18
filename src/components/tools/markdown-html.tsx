"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const markdownHelp = [
  { title: "功能说明", items: ["将 Markdown 转换为 HTML", "实时预览渲染效果"] },
  { title: "使用方法", items: ["在左侧输入 Markdown", "右侧实时预览 HTML", "点击「复制 HTML」使用"] },
];

function markdownToHtml(md: string): string {
  let html = md;

  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/`(.*?)`/g, "<code>$1</code>");
  html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");

  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />');

  html = html.replace(/^\s*-\s(.*$)/gm, "<li>$1</li>");
  html = html.replace(/^\s*\d+\.\s(.*$)/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>\n${match}</ul>`);

  html = html.replace(/^```(\w*)\n([\s\S]*?)```/gm, "<pre><code class=\"language-$1\">$2</code></pre>");

  html = html.replace(/^---$/gm, "<hr />");
  html = html.replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>");

  html = html.replace(/\n\n/g, "</p><p>");
  html = "<p>" + html + "</p>";
  html = html.replace(/<p><\/p>/g, "");

  return html;
}

export function MarkdownHtml() {
  const [input, setInput] = useState("# Hello World\n\nThis is **bold** and *italic*.\n\n- Item 1\n- Item 2\n- Item 3\n\n`code here`");
  const [output, setOutput] = useState("");

  const convert = () => {
    setOutput(markdownToHtml(input));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">Markdown → HTML 转换器</h2>
          <InlineHelp content={markdownHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          将 Markdown 转换为 HTML 并实时预览
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Markdown 输入</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-apple mt-1 font-mono"
            rows={15}
            placeholder="# Heading"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">HTML 预览</label>
            <button
              onClick={copyToClipboard}
              disabled={!output}
              className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              复制 HTML
            </button>
          </div>
          {output ? (
            <div
              className="input-apple mt-1 p-4 prose prose-sm max-w-none h-[360px] overflow-auto"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          ) : (
            <textarea
              readOnly
              className="input-apple mt-1 font-mono bg-white/5"
              rows={15}
              placeholder="点击「转换」查看 HTML"
            />
          )}
        </div>
      </div>

      <button
        onClick={convert}
        disabled={!input}
        className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
      >
        转换
      </button>

      {output && (
        <div className="p-4 glass rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">HTML 源码</h3>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              复制
            </button>
          </div>
          <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
