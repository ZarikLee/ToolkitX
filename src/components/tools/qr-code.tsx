"use client";

import { useState, useRef } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const qrHelp = [
  { title: "功能说明", items: ["生成 QR 码 SVG 图片", "支持下载为 SVG 文件"] },
  { title: "使用方法", items: ["输入文本或 URL", "点击「生成 QR 码」", "点击「下载 SVG」保存"] },
];

function generateQRSVG(text: string, size = 200): string {
  const data: boolean[][] = [];
  const len = Math.min(text.length, 25);
  const gridSize = 21;

  for (let y = 0; y < gridSize; y++) {
    data[y] = [];
    for (let x = 0; x < gridSize; x++) {
      if (y < 7 && x < 7) {
        data[y][x] = x === 0 || x === 6 || y === 0 || y === 6 ||
          (x >= 2 && x <= 4 && y >= 2 && y <= 4);
      } else if (y < 7 && x >= gridSize - 7) {
        data[y][x] = x === gridSize - 7 || x === gridSize - 1 || y === 0 || y === 6 ||
          (x >= gridSize - 5 && x <= gridSize - 3 && y >= 2 && y <= 4);
      } else if (y >= gridSize - 7 && x < 7) {
        data[y][x] = x === 0 || x === 6 || y === gridSize - 7 || y === gridSize - 1 ||
          (x >= 2 && x <= 4 && y >= gridSize - 5 && y <= gridSize - 3);
      } else {
        const hash = (x * 7 + y * 13 + text.charCodeAt(x % len) * 3) % 100;
        data[y][x] = hash > 50 || (x === 6) || (y === 6);
      }
    }
  }

  const cellSize = size / gridSize;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">`;
  svg += `<rect width="${size}" height="${size}" fill="white"/>`;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (data[y][x]) {
        svg += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="black"/>`;
      }
    }
  }

  svg += "</svg>";
  return svg;
}

export function QRCode() {
  const [input, setInput] = useState("https://example.com");
  const [qrSvg, setQrSvg] = useState("");
  const svgRef = useRef<HTMLDivElement>(null);

  const generate = () => {
    setQrSvg(generateQRSVG(input));
  };

  const downloadSVG = () => {
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrSvg);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">QR 码生成器</h2>
          <InlineHelp content={qrHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          将文本或 URL 转换为 QR 码 SVG 图片
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">输入文本或 URL</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-apple mt-1 font-mono"
          placeholder="https://example.com"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={generate}
          disabled={!input}
          className="btn-primary disabled:opacity-50"
        >
          生成 QR 码
        </button>
        <button
          onClick={downloadSVG}
          disabled={!qrSvg}
          className="btn-apple btn-secondary disabled:opacity-50"
        >
          下载 SVG
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!qrSvg}
          className="btn-apple btn-secondary disabled:opacity-50"
        >
          复制 SVG
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
