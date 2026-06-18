"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`px-3 py-1.5 text-[12px] font-medium btn-secondary transition-all duration-200 active:scale-[0.97] ${className}`}
    >
      {copied ? "已复制 ✓" : "复制"}
    </button>
  );
}
