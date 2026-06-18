"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const mimeHelp = [
  { title: "功能说明", items: ["常见 MIME 类型参考表", "按分类搜索和筛选"] },
  { title: "使用方法", items: ["在搜索框输入关键词", "点击分类标签筛选", "查看 MIME 类型和扩展名"] },
];

const mimeTypes: Record<string, { type: string; extensions: string[] }[]> = {
  "application": [
    { type: "application/json", extensions: [".json"] },
    { type: "application/xml", extensions: [".xml"] },
    { type: "application/pdf", extensions: [".pdf"] },
    { type: "application/zip", extensions: [".zip"] },
    { type: "application/gzip", extensions: [".gz"] },
    { type: "application/javascript", extensions: [".js"] },
    { type: "application/typescript", extensions: [".ts"] },
    { type: "application/x-www-form-urlencoded", extensions: [] },
    { type: "multipart/form-data", extensions: [] },
    { type: "application/octet-stream", extensions: [] },
    { type: "application/sql", extensions: [".sql"] },
    { type: "application/graphql", extensions: [".graphql"] },
  ],
  "text": [
    { type: "text/plain", extensions: [".txt"] },
    { type: "text/html", extensions: [".html", ".htm"] },
    { type: "text/css", extensions: [".css"] },
    { type: "text/csv", extensions: [".csv"] },
    { type: "text/markdown", extensions: [".md"] },
    { type: "text/xml", extensions: [".xml"] },
    { type: "text/javascript", extensions: [".js"] },
    { type: "text/yaml", extensions: [".yaml", ".yml"] },
  ],
  "image": [
    { type: "image/png", extensions: [".png"] },
    { type: "image/jpeg", extensions: [".jpg", ".jpeg"] },
    { type: "image/gif", extensions: [".gif"] },
    { type: "image/svg+xml", extensions: [".svg"] },
    { type: "image/webp", extensions: [".webp"] },
    { type: "image/avif", extensions: [".avif"] },
    { type: "image/x-icon", extensions: [".ico"] },
    { type: "image/bmp", extensions: [".bmp"] },
  ],
  "audio": [
    { type: "audio/mpeg", extensions: [".mp3"] },
    { type: "audio/wav", extensions: [".wav"] },
    { type: "audio/ogg", extensions: [".ogg"] },
    { type: "audio/mp4", extensions: [".m4a"] },
    { type: "audio/webm", extensions: [".webm"] },
    { type: "audio/flac", extensions: [".flac"] },
  ],
  "video": [
    { type: "video/mp4", extensions: [".mp4"] },
    { type: "video/webm", extensions: [".webm"] },
    { type: "video/ogg", extensions: [".ogv"] },
    { type: "video/quicktime", extensions: [".mov"] },
    { type: "video/x-msvideo", extensions: [".avi"] },
    { type: "video/x-matroska", extensions: [".mkv"] },
  ],
  "font": [
    { type: "font/woff", extensions: [".woff"] },
    { type: "font/woff2", extensions: [".woff2"] },
    { type: "font/ttf", extensions: [".ttf"] },
    { type: "font/otf", extensions: [".otf"] },
  ],
};

export function MimeReference() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Object.keys(mimeTypes);

  const filteredTypes = categories
    .filter((cat) => !activeCategory || cat === activeCategory)
    .flatMap((cat) =>
      mimeTypes[cat]
        .filter(
          (item) =>
            item.type.toLowerCase().includes(search.toLowerCase()) ||
            item.extensions.some((ext) => ext.toLowerCase().includes(search.toLowerCase()))
        )
        .map((item) => ({ ...item, category: cat }))
    );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">MIME 类型参考</h2>
          <InlineHelp content={mimeHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          常见 MIME 类型快速参考和搜索
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">搜索</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-apple mt-1"
          placeholder="搜索 MIME 类型或扩展名..."
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
            !activeCategory
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-1 max-h-[400px] overflow-auto">
        {filteredTypes.map((item) => (
          <div
            key={item.type}
            className="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-muted-foreground">
                  {item.category}
                </span>
                <span className="text-sm font-mono">{item.type}</span>
              </div>
              {item.extensions.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {item.extensions.join(", ")}
                </p>
              )}
            </div>
            <button
              onClick={() => copyToClipboard(item.type)}
              className="ml-2 px-2 py-1 text-xs rounded-lg bg-white/5 hover:bg-white/10 transition-colors shrink-0"
            >
              复制
            </button>
          </div>
        ))}
      </div>

      <div className="text-sm text-muted-foreground">
        共 {filteredTypes.length} 个 MIME 类型
      </div>
    </div>
  );
}
