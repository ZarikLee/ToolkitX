"use client";

import { useState, useEffect, useCallback } from "react";

interface HelpButtonProps {
  title: string;
  content: HelpSection[];
}

interface HelpSection {
  title: string;
  items: string[];
}

export function HelpButton({ title, content }: HelpButtonProps) {
  const [open, setOpen] = useState(false);
  const [hasSeenHelp, setHasSeenHelp] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(`help_seen_${title}`);
    if (seen) setHasSeenHelp(true);
  }, [title]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setHasSeenHelp(true);
    localStorage.setItem(`help_seen_${title}`, "1");
    document.body.style.overflow = "";
  }, [title]);

  const handleOpen = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, handleClose]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <button
        onClick={handleOpen}
        className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 ${
          hasSeenHelp
            ? "text-muted-foreground/50 hover:text-muted-foreground hover:bg-white/[0.06]"
            : "text-[#0a84ff] hover:bg-[#0a84ff]/10"
        }`}
        title="使用帮助"
      >
        <span className="text-[11px] font-semibold">?</span>
        {!hasSeenHelp && (
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#0a84ff] rounded-full" />
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
        >
          <div
            className="glass-heavy rounded-2xl w-full max-w-lg shadow-[0_16px_48px_rgba(0,0,0,0.5)] animate-scale-in max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <h3 className="text-[17px] font-semibold tracking-tight">
                {title}
              </h3>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-all duration-200 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5 space-y-5 overflow-y-auto flex-1 min-h-0">
              {content.map((section, i) => (
                <div key={i}>
                  <h4 className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider mb-2.5">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-[13px] text-foreground/80 flex gap-2.5 leading-relaxed"
                      >
                        <span className="text-[#0a84ff]/60 mt-0.5 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 pb-5">
              <button
                onClick={handleClose}
                className="w-full px-4 py-2.5 bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white rounded-xl text-[13px] font-medium transition-all duration-200 active:scale-[0.98]"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
