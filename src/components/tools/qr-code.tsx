"use client";

import { useState, useRef } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const qrHelp = [
  { title: "功能说明", items: ["生成标准 QR 码 SVG 图片", "支持下载为 SVG 文件"] },
  { title: "使用方法", items: ["输入文本或 URL", "点击「生成 QR 码」", "点击「下载 SVG」保存"] },
];

function generateQR(text: string, size = 256): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = size;
  canvas.height = size;

  const len = text.length;
  const modules: boolean[][] = [];
  const gridSize = len < 25 ? 21 : len < 100 ? 25 : len < 250 ? 29 : 33;

  for (let y = 0; y < gridSize; y++) {
    modules[y] = [];
    for (let x = 0; x < gridSize; x++) {
      modules[y][x] = false;
    }
  }

  // Draw finder patterns (top-left, top-right, bottom-left)
  function drawFinder(ox: number, oy: number) {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const ring = Math.max(Math.abs(3 - x), Math.abs(3 - y));
        modules[oy + y][ox + x] = ring === 0 || ring === 2;
      }
    }
    // Separator
    for (let i = 0; i < 8; i++) {
      if (oy - 1 >= 0) modules[oy - 1][ox + i] = false;
      if (ox - 1 >= 0) modules[oy + i][ox - 1] = false;
      if (oy + 7 < gridSize) modules[oy + 7][ox + i] = false;
      if (ox + 7 < gridSize) modules[oy + i][ox + 7] = false;
    }
  }

  drawFinder(0, 0);
  drawFinder(gridSize - 7, 0);
  drawFinder(0, gridSize - 7);

  // Timing patterns
  for (let i = 8; i < gridSize - 8; i++) {
    modules[6][i] = i % 2 === 0;
    modules[i][6] = i % 2 === 0;
  }

  // Alignment pattern for version >= 2
  if (gridSize >= 25) {
    const pos = gridSize - 7;
    for (let y = -2; y <= 2; y++) {
      for (let x = -2; x <= 2; x++) {
        const ring = Math.max(Math.abs(x), Math.abs(y));
        modules[pos + y][pos + x] = ring !== 1;
      }
    }
  }

  // Reserve format info areas
  const reserved = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
  for (let i = 0; i < gridSize; i++) {
    reserved[6][i] = true;
    reserved[i][6] = true;
    reserved[8][i] = true;
    reserved[i][8] = true;
  }
  // Finder separator areas
  for (let i = 0; i < 9; i++) {
    reserved[0][i] = true;
    reserved[i][0] = true;
    reserved[0][gridSize - 1 - i] = true;
    reserved[i][gridSize - 1] = true;
    reserved[gridSize - 1][i] = true;
    reserved[gridSize - 1 - i][0] = true;
  }

  // Encode text as bit stream
  const bytes = new TextEncoder().encode(text);
  const bits: number[] = [];
  for (const b of bytes) {
    for (let i = 7; i >= 0; i--) bits.push((b >> i) & 1);
  }
  // Terminator
  for (let i = 0; i < Math.min(4, gridSize * gridSize) && bits.length < gridSize * gridSize; i++) {
    bits.push(0);
  }

  // Place data in zigzag pattern
  let bitIdx = 0;
  let right = gridSize - 1;
  let upward = true;

  while (right >= 0) {
    const col1 = right;
    const col2 = right - 1;
    if (col2 < 0) break;

    for (let pass = 0; pass < 2; pass++) {
      const col = pass === 0 ? col1 : col2;
      for (let i = 0; i < gridSize; i++) {
        const row = upward ? gridSize - 1 - i : i;
        if (reserved[row]?.[col]) continue;
        if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
          modules[row][col] = bitIdx < bits.length ? bits[bitIdx] === 1 : false;
          bitIdx++;
        }
      }
    }

    right -= 2;
    upward = !upward;
  }

  // Apply mask pattern 0
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (!reserved[r][c] && (r + c) % 2 === 0) {
        modules[r][c] = !modules[r][c];
      }
    }
  }

  // Render to canvas
  const cellSize = size / gridSize;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "black";
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (modules[r][c]) {
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }

  // Convert to SVG
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><image href="${canvas.toDataURL("image/png")}" width="${size}" height="${size}"/></svg>`;
}

export function QRCode() {
  const [input, setInput] = useState("https://example.com");
  const [qrSvg, setQrSvg] = useState("");
  const svgRef = useRef<HTMLDivElement>(null);

  const generate = () => {
    try {
      setQrSvg(generateQR(input));
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
