const STORAGE_KEY = "toolkitx_visits";

export function getVisitCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function incrementVisitCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const current = getVisitCount();
    const next = current + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}
