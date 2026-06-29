"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const colorHelp = [
  { title: "功能说明", items: ["在 HEX、RGB、HSL 格式间转换颜色", "实时预览颜色"] },
  { title: "使用方法", items: ["输入任意颜色格式", "自动转换为其他格式", "点击复制按钮使用"] },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360; s /= 100; l /= 100;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });

  const updateFromHex = (value: string) => {
    setHex(value);
    const result = hexToRgb(value);
    if (result) {
      setRgb(result);
      setHsl(rgbToHsl(result.r, result.g, result.b));
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const result = hslToRgb(h, s, l);
    setRgb(result);
    setHex(rgbToHex(result.r, result.g, result.b));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">颜色转换器</h2>
          <InlineHelp content={colorHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          在 HEX、RGB、HSL 颜色格式间转换
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="w-24 h-24 rounded-xl border border-white/15"
          style={{ backgroundColor: hex }}
        />
        <div className="font-mono text-lg">{hex}</div>
      </div>

      <div className="space-y-4">
        <div className="p-4 glass rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">HEX</label>
            <button
              onClick={() => copyToClipboard(hex)}
              className="px-3 py-1 text-sm btn-ghost"
            >
              复制
            </button>
          </div>
          <input
            type="text"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="input-apple font-mono"
          />
        </div>

        <div className="p-4 glass rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">RGB</label>
            <button
              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
              className="px-3 py-1 text-sm btn-ghost"
            >
              复制
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["r", "g", "b"] as const).map((ch) => (
              <div key={ch}>
                <label className="text-xs text-muted-foreground uppercase">{ch}</label>
                <input
                  type="number"
                  min={0}
                  max={255}
                  value={rgb[ch]}
                  onChange={(e) => {
                    const val = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                    updateFromRgb(ch === "r" ? val : rgb.r, ch === "g" ? val : rgb.g, ch === "b" ? val : rgb.b);
                  }}
                  className="input-apple font-mono text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 glass rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">HSL</label>
            <button
              onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
              className="px-3 py-1 text-sm btn-ghost"
            >
              复制
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">H (0-360)</label>
              <input
                type="number"
                min={0}
                max={360}
                value={hsl.h}
                onChange={(e) => updateFromHsl(parseInt(e.target.value) || 0, hsl.s, hsl.l)}
                className="input-apple font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">S (0-100)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={hsl.s}
                onChange={(e) => updateFromHsl(hsl.h, parseInt(e.target.value) || 0, hsl.l)}
                className="input-apple font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">L (0-100)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={hsl.l}
                onChange={(e) => updateFromHsl(hsl.h, hsl.s, parseInt(e.target.value) || 0)}
                className="input-apple font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
