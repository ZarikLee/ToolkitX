"use client";

import { useState, useEffect } from "react";

export function VisitCounter() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    fetch("/api/stats", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setVisitCount(d.visits || 0))
      .catch(() => {});
  }, []);

  if (visitCount === 0) return null;

  return (
    <div className="text-center mt-8 mb-4">
      <p className="text-[11px] text-muted-foreground/30">
        累计访问 {visitCount.toLocaleString()} 次
      </p>
    </div>
  );
}
