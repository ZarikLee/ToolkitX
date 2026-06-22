"use client";

import { useState, useEffect } from "react";

export function Footer() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setVisits(d.visits || 0))
      .catch(() => {});
  }, []);

  return (
    <footer className="py-4 px-8 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-[11px] text-muted-foreground/40">
        <span>ToolkitX v2.1.0</span>
        <span className="text-muted-foreground/20">|</span>
        <span>访问量：{visits.toLocaleString()}</span>
        <span className="text-muted-foreground/20">|</span>
        <span>&copy; {new Date().getFullYear()} ToolkitX</span>
      </div>
    </footer>
  );
}
