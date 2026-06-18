"use client";

interface DownloadButtonProps {
  content: string;
  filename: string;
  className?: string;
}

export function DownloadButton({ content, filename, className = "" }: DownloadButtonProps) {
  const download = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={download}
      className={`px-3 py-1.5 text-[12px] font-medium bg-white/[0.06] hover:bg-white/[0.1] text-foreground rounded-lg transition-all duration-200 active:scale-[0.97] ${className}`}
    >
      下载
    </button>
  );
}
