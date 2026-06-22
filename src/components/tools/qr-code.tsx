"use client";

import { useState, useRef } from "react";
import { InlineHelp } from "@/components/ui/inline-help";
import QRCodeLib from "qrcode-generator";

const qrHelp = [
  { title: "功能说明", items: ["生成标准 QR 码 SVG 图片", "支持下载为 SVG 文件"] },
  { title: "使用方法", items: ["输入文本或 URL", "点击「生成 QR 码」", "点击「下载 SVG」保存"] },
];

function generateQRSVG(text: string): string {
  const qr = QRCodeLib(0, "M");
  qr.addData(text);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const cellSize = 4;
  const padding = cellSize * 4;
  const size = moduleCount * cellSize + padding * 2;

  const rects: string[] = [];
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (qr.isDark(row, col)) {
        rects.push(`<rect x="${padding + col * cellSize}" y="${padding + row * cellSize}" width="${cellSize}" height="${cellSize}" fill="black"/>`);
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="white"/>${rects.join("")}</svg>`;
}

export function QRCode() {
  const [input, setInput] = useState("https://example.com");
  const [qrSvg, setQrSvg] = useState("");
  const svgRef = useRef<HTMLDivElement>(null);

  const generate = () => {
    try {
      setQrSvg(generateQRSVG(input));
    } catch {
      setQrSvg("");
    }
  };

  const downloadSVG = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (qrSvg) navigator.clipboard.writeText(qrSvg);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">QR 码生成器</h2>
          <InlineHelp content={qrHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          将文本或 URL 转换为标准 QR 码 SVG 图片
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">输入文本或 URL</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          className="input-apple mt-1 font-mono"
          placeholder="https://example.com"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={generate} disabled={!input} className="btn-primary disabled:opacity-50">
          生成 QR 码
        </button>
        <button onClick={downloadSVG} disabled={!qrSvg} className="btn-secondary disabled:opacity-50">
          下载 SVG
        </button>
        <button onClick={copyToClipboard} disabled={!qrSvg} className="btn-secondary disabled:opacity-50">
          复制
        </button>
      </div>

      {qrSvg && (
        <div className="flex justify-center p-8 glass rounded-xl">
          <div ref={svgRef} dangerouslySetInnerHTML={{ __html: qrSvg }} />
        </div>
      )}

      {!qrSvg && (
        <div className="p-8 glass rounded-xl text-center text-sm text-muted-foreground">
          点击「生成 QR 码」查看结果
        </div>
      )}
    </div>
  );
}
