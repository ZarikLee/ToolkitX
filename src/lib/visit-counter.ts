const STORAGE_KEY = "toolkitx_visits";
const BASE_COUNT = 2708;

export function getVisitCount(): number {
  if (typeof window === "undefined") return BASE_COUNT;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored ? parseInt(stored, 10) || 0 : 0) + BASE_COUNT;
  } catch {
    return BASE_COUNT;
  }
}

export function incrementVisitCount(): number {
  if (typeof window === "undefined") return BASE_COUNT;
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    const next = (current ? parseInt(current, 10) || 0 : 0) + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    return next + BASE_COUNT;
  } catch {
    return BASE_COUNT;
  }
}
