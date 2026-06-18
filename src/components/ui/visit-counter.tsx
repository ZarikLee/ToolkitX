"use client";

import { useState, useEffect } from "react";

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stats", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <div className="text-center text-xs text-muted-foreground py-4">
      累计访问 {count.toLocaleString()} 次
    </div>
  );
}
