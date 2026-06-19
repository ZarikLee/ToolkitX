"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface HelpSection {
  title: string;
  items: string[];
}

interface InlineHelpProps {
  content: HelpSection[];
}

export function InlineHelp({ content }: InlineHelpProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, left: rect.left });
    }
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-5 h-5 rounded-full text-muted-foreground hover:bg-white/[0.06] transition-all duration-200"
        title="使用帮助"
      >
        <span className="text-[10px] font-semibold">?</span>
      </button>

      {open &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setOpen(false)}
            />
            <div
              className="fixed z-[9999] w-72 rounded-xl p-4 space-y-3 animate-scale-in glass-heavy"
              style={{
                top: pos.top,
                left: pos.left,
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              }}
            >
              {content.map((section, i) => (
                <div key={i}>
                  <h4 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                    {section.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-[12px] text-foreground/80 flex gap-2 leading-relaxed"
                      >
                        <span className="text-[#0a84ff] shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>,
          document.body
        )}
    </>
  );
}
