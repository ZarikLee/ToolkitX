"use client";

export function Footer() {
  return (
    <footer className="py-4 px-8 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-[11px] text-muted-foreground/40">
        <span>ToolkitX v1.1.0</span>
        <span className="text-muted-foreground/20">|</span>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-muted-foreground/60 transition-colors"
        >
          粤ICP备2025509035号
        </a>
        <span className="text-muted-foreground/20">|</span>
        <span>&copy; {new Date().getFullYear()} ToolkitX</span>
      </div>
    </footer>
  );
}
