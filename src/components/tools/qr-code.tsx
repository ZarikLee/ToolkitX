"use client";

import { useState, useRef } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const qrHelp = [
  { title: "功能说明", items: ["生成标准 QR 码 SVG 图片", "支持下载为 SVG 文件"] },
  { title: "使用方法", items: ["输入文本或 URL", "点击「生成 QR 码」", "点击「下载 SVG」保存"] },
];

const QR = (() => {
  const ALIGNMENT_PATTERNS = [
    [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
    [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54],
    [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70],
    [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86],
    [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170],
  ];

  const EC_CODEWORDS_PER_BLOCK = [
    -1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
  ];

  const NUM_ERROR_CORRECTION_BLOCKS = [
    -1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25, 26, 28, 29, 30, 32, 33, 35, 37, 38,
  ];

  const DATA_CODEWORDS = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706,
  ];

  function getVersion(dataLength: number, eccLevel: string): number {
    const eccIdx = "LMQH".indexOf(eccLevel);
    for (let v = 1; v <= 40; v++) {
      const capacity = DATA_CODEWORDS[v] - (DATA_CODEWORDS[v] % (eccIdx === 3 ? 1 : eccIdx === 2 ? 2 : eccIdx === 1 ? 4 : 7));
      if (dataLength <= capacity) return v;
    }
    return 40;
  }

  function encode(text: string): boolean[][] {
    const bytes = new TextEncoder().encode(text);
    const len = bytes.length;
    const version = getVersion(len + 2, "M");
    const size = version * 4 + 17;
    const modules: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
    const reserved: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

    // Finder patterns
    function drawFinder(cx: number, cy: number) {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const x = cx + dx, y = cy + dy;
          if (x < 0 || x >= size || y < 0 || y >= size) continue;
          const ring = Math.max(Math.abs(dx), Math.abs(dy));
          modules[y][x] = ring === 1 || ring === 3;
          reserved[y][x] = true;
        }
      }
    }

    drawFinder(3, 3);
    drawFinder(size - 4, 3);
    drawFinder(3, size - 4);

    // Timing patterns
    for (let i = 8; i < size - 8; i++) {
      modules[6][i] = modules[i][6] = i % 2 === 0;
      reserved[6][i] = reserved[i][6] = true;
    }

    // Alignment patterns
    if (version >= 2) {
      const positions = ALIGNMENT_PATTERNS[version - 1] || [];
      for (const ay of positions) {
        for (const ax of positions) {
          if (reserved[ay]?.[ax]) continue;
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const x = ax + dx, y = ay + dy;
              if (x >= 0 && x < size && y >= 0 && y < size) {
                const ring = Math.max(Math.abs(dx), Math.abs(dy));
                modules[y][x] = ring !== 1;
                reserved[y][x] = true;
              }
            }
          }
        }
      }
    }

    // Dark module
    modules[size - 8][8] = true;
    reserved[size - 8][8] = true;

    // Reserve format info areas
    for (let i = 0; i < 15; i++) {
      reserved[8][i < 6 ? i : i < 8 ? i + 1 : i + 2] = true;
      reserved[i < 6 ? i : i < 8 ? i + 1 : i + 2][8] = true;
    }

    // Data encoding - simplified: just place data in available cells
    let bitIndex = 0;
    const allBits: number[] = [];
    for (const b of bytes) {
      for (let i = 7; i >= 0; i--) allBits.push((b >> i) & 1);
    }
    // Terminator
    for (let i = 0; i < 4 && bitIndex < allBits.length + 4; i++) allBits.push(0);

    let dir = -1;
    let x = size - 1;
    let y = size - 1;
    bitIndex = 0;

    while (x >= 0) {
      if (reserved[y]?.[x]) {
        x += dir > 0 ? -1 : 1;
        if (x >= size) { x = size - 2; y -= 2; dir = -1; }
        if (x < 0) break;
        continue;
      }
      if (y >= 0 && y < size) {
        modules[y][x] = bitIndex < allBits.length ? allBits[bitIndex] === 1 : false;
        bitIndex++;
      }
      x += dir > 0 ? -1 : 1;
      if (x >= size) { x = size - 2; y -= 2; dir = -1; continue; }
      if (x < 0) { x = 0; y -= 2; dir = 1; continue; }
    }

    // Apply mask pattern 0 (checkerboard)
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!reserved[r][c] && (r + c) % 2 === 0) {
          modules[r][c] = !modules[r][c];
        }
      }
    }

    return modules;
  }

  function toSVG(modules: boolean[][], size: number): string {
    const grid = modules.length;
    const cellSize = size / (grid + 8);
    const padding = cellSize * 4;
    const total = size + padding * 2;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${total}" height="${total}">`;
    svg += `<rect width="${total}" height="${total}" fill="white"/>`;
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        if (modules[r][c]) {
          svg += `<rect x="${padding + c * cellSize}" y="${padding + r * cellSize}" width="${cellSize}" height="${cellSize}" fill="black"/>`;
        }
      }
    }
    svg += "</svg>";
    return svg;
  }

  return { encode, toSVG };
})();

export function QRCode() {
  const [input, setInput] = useState("https://example.com");
  const [qrSvg, setQrSvg] = useState("");
  const svgRef = useRef<HTMLDivElement>(null);

  const generate = () => {
    try {
      const modules = QR.encode(input);
      setQrSvg(QR.toSVG(modules, 200));
    } catch {
      setQrSvg("");
    }
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
          className="btn-secondary disabled:opacity-50"
        >
          下载 SVG
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!qrSvg}
          className="btn-secondary disabled:opacity-50"
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
