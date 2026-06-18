"use client";

import { useState } from "react";

interface HelpSection {
  title: string;
  items: string[];
}

interface InlineHelpProps {
  content: HelpSection[];
}

export function InlineHelp({ content }: InlineHelpProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-5 h-5 rounded-full text-muted-foreground hover:bg-white/[0.06] transition-all duration-200"
        title="使用帮助"
      >
        <span className="text-[10px] font-semibold">?</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[60]"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-7 z-[60] w-72 rounded-xl p-4 space-y-3 animate-scale-in" style={{ background: 'rgba(28,28,30,0.97)', backdropFilter: 'blur(40px) saturate(200%)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
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
        </>
      )}
    </span>
  );
}
