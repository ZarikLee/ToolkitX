"use client";

import { useEffect, useState, useRef } from "react";

type ThemeId = "dark-purple" | "dark-green" | "light-yellow" | "light-yellow-orange" | "light-orange" | "light-orange-red";

interface ThemeDef {
  id: ThemeId;
  label: string;
  mode: "dark" | "light";
  colors: [string, string, string];
}

const THEMES: ThemeDef[] = [
  { id: "light-yellow",        label: "白黄",   mode: "light", colors: ["#fdfcf8", "#c8a032", "#e8d070"] },
  { id: "light-yellow-orange", label: "白黄橙", mode: "light", colors: ["#fdf9f4", "#d4962a", "#e8b050"] },
  { id: "light-orange",        label: "白橙",   mode: "light", colors: ["#faf6f0", "#e08020", "#f0a040"] },
  { id: "light-orange-red",    label: "白橙红", mode: "light", colors: ["#faf4f0", "#d86040", "#e87050"] },
  { id: "dark-purple",         label: "黑紫蓝", mode: "dark",  colors: ["#000000", "#0a84ff", "#bf5af2"] },
  { id: "dark-green",          label: "黑绿",   mode: "dark",  colors: ["#000a04", "#30d158", "#40c8a0"] },
];

const THEME_KEY = "theme";

function applyTheme(theme: ThemeDef) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme.mode);
  root.setAttribute("data-theme", theme.id);
}

export function ThemeToggle() {
  const [current, setCurrent] = useState<ThemeId>("dark-purple");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        const saved = data.theme as ThemeId;
        const def = THEMES.find((t) => t.id === saved);
        if (def) {
          setCurrent(def.id);
          localStorage.setItem(THEME_KEY, def.id);
          applyTheme(def);
          return;
        }
      }
    } catch {}
    const stored = localStorage.getItem(THEME_KEY) as ThemeId | null;
    const def = THEMES.find((t) => t.id === (stored || "dark-purple"));
    if (def) {
      setCurrent(def.id);
      applyTheme(def);
    }
  };

  useEffect(() => {
    if (!ref.current) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = async (theme: ThemeDef) => {
    setCurrent(theme.id);
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme.id);
    setOpen(false);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: theme.id }),
      });
    } catch {}
  };

  const currentDef = THEMES.find((t) => t.id === current) || THEMES[4];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-8 h-8 rounded-[10px] text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all duration-200"
        title="切换皮肤"
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${currentDef.colors[1]} 0%, ${currentDef.colors[2]} 100%)`,
          }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 py-3 px-3 rounded-2xl z-50 animate-scale-in"
          style={{
            background: "rgba(28, 28, 30, 0.92)",
            backdropFilter: "blur(40px) saturate(200%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 16px 48px rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className="flex flex-col gap-2.5">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => select(t)}
                className="group relative flex items-center justify-center"
                title={t.label}
              >
                <div
                  className="w-9 h-9 rounded-full transition-all duration-200 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${t.colors[1]} 0%, ${t.colors[2]} 100%)`,
                    boxShadow: current === t.id
                      ? `0 0 0 2px rgba(255,255,255,0.9), 0 0 12px ${t.colors[1]}40`
                      : "none",
                  }}
                />
                {current === t.id && (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ border: "2px solid rgba(255,255,255,0.9)" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
