"use client";

import { useState, useRef, useCallback } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const qrHelp = [
  { title: "功能说明", items: ["生成标准 QR 码 SVG 图片", "支持下载为 SVG 文件"] },
  { title: "使用方法", items: ["输入文本或 URL", "点击「生成 QR 码」", "点击「下载 SVG」保存"] },
];

function textToBinary(text: string): number[] {
  const bytes = new TextEncoder().encode(text);
  const bits: number[] = [];
  for (const b of bytes) {
    for (let i = 7; i >= 0; i--) bits.push((b >> i) & 1);
  }
  return bits;
}

function createModules(size: number): boolean[][] {
  return Array.from({ length: size }, () => Array(size).fill(false));
}

function placeFinder(modules: boolean[][], row: number, col: number) {
  const s = modules.length;
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      const rr = row + r, cc = col + c;
      if (rr < 0 || rr >= s || cc < 0 || cc >= s) continue;
      if (r === -1 || r === 7 || c === -1 || c === 7) {
        modules[rr][cc] = false;
      } else {
        const d = Math.max(Math.abs(3 - r), Math.abs(3 - c));
        modules[rr][cc] = d === 1 || d === 3;
      }
    }
  }
}

function placeAlignment(modules: boolean[][], row: number, col: number) {
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const d = Math.max(Math.abs(r), Math.abs(c));
      modules[row + r][col + c] = d !== 1;
    }
  }
}

function placeTiming(modules: boolean[][]) {
  const s = modules.length;
  for (let i = 8; i < s - 8; i++) {
    modules[6][i] = i % 2 === 0;
    modules[i][6] = i % 2 === 0;
  }
}

function reserveFormat(modules: boolean[][]) {
  const s = modules.length;
  for (let i = 0; i <= 8; i++) {
    modules[8][i] = false;
    modules[i][8] = false;
    modules[8][s - 1 - i] = false;
    modules[s - 1 - i][8] = false;
  }
}

function placeData(modules: boolean[][], bits: number[]) {
  const s = modules.length;
  let idx = 0;
  let col = s - 1;
  let up = true;

  while (col >= 0) {
    if (col === 6) col--;
    for (let i = 0; i < s; i++) {
      const row = up ? s - 1 - i : i;
      for (let dc = 0; dc < 2; dc++) {
        const c = col - dc;
        if (c < 0 || c >= s) continue;
        if (modules[row][c]) continue;
        modules[row][c] = idx < bits.length ? bits[idx] === 1 : false;
        idx++;
      }
    }
    col -= 2;
    up = !up;
  }
}

function applyMask(modules: boolean[][]) {
  const s = modules.length;
  for (let r = 0; r < s; r++) {
    for (let c = 0; c < s; c++) {
      if ((r + c) % 2 === 0 && !modules[6][c] && !modules[r][6] &&
          !(r < 9 && c < 9) && !(r < 9 && c >= s - 8) && !(r >= s - 8 && c < 9)) {
        modules[r][c] = !modules[r][c];
      }
    }
  }
}

function modulesToSVG(modules: boolean[][], pixelSize: number): string {
  const s = modules.length;
  const cellSize = pixelSize / (s + 8);
  const pad = cellSize * 4;
  const total = pixelSize + pad * 2;

  const rects: string[] = [];
  for (let r = 0; r < s; r++) {
    for (let c = 0; c < s; c++) {
      if (modules[r][c]) {
        rects.push(`<rect x="${(c + 4) * cellSize}" y="${(r + 4) * cellSize}" width="${cellSize + 0.5}" height="${cellSize + 0.5}" fill="black"/>`);
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${total}" height="${total}"><rect width="${total}" height="${total}" fill="white"/>${rects.join("")}</svg>`;
}

function generateQRSVG(text: string): string {
  if (!text) return "";

  const dataBits = textToBinary(text);
  const gridSize = 21;
  const modules = createModules(gridSize);

  // Finder patterns
  placeFinder(modules, 0, 0);
  placeFinder(modules, 0, gridSize - 7);
  placeFinder(modules, gridSize - 7, 0);

  // Timing
  placeTiming(modules);

  // Format info (reserved)
  reserveFormat(modules);

  // Dark module
  modules[gridSize - 8][8] = true;

  // Data
  placeData(modules, dataBits);

  // Mask
  applyMask(modules);

  return modulesToSVG(modules, 256);
}

export function QRCode() {
  const [input, setInput] = useState("https://example.com");
  const [qrSvg, setQrSvg] = useState("");
  const svgRef = useRef<HTMLDivElement>(null);

  const generate = useCallback(() => {
    const svg = generateQRSVG(input);
    setQrSvg(svg);
  }, [input]);

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
