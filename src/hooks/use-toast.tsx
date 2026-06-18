"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
  };

  const styles = {
    success: "border-[#30d158]/30 bg-[#30d158]/10 text-[#30d158]",
    error: "border-[#ff453a]/30 bg-[#ff453a]/10 text-[#ff453a]",
    warning: "border-[#ff9f0a]/30 bg-[#ff9f0a]/10 text-[#ff9f0a]",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-20 right-6 z-[9998] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => {
          const Icon = icons[t.type];
          return (
            <div
              key={t.id}
              className={cn(
                "pointer-events-auto flex items-center gap-2.5 rounded-xl border px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.3)] animate-slide-in-right backdrop-blur-sm",
                styles[t.type]
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="text-[13px] font-medium whitespace-nowrap">{t.message}</span>
              <button
                onClick={() => removeToast(t.id)}
                className="ml-1 opacity-50 hover:opacity-100 transition-opacity shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
