"use client";

export function Footer() {
  return (
    <footer className="py-4 px-8 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-[11px] text-muted-foreground/40">
        <span>ToolkitX v2.0.0</span>
        <span className="text-muted-foreground/20">|</span>
        <span>&copy; {new Date().getFullYear()} ToolkitX</span>
      </div>
    </footer>
  );
}
