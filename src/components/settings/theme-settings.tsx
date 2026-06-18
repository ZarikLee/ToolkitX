'use client';

import { Sun, Moon } from 'lucide-react';

interface ThemeSettingsProps {
  value: 'dark' | 'light';
  onChange: (theme: 'dark' | 'light') => void;
}

export function ThemeSettings({ value, onChange }: ThemeSettingsProps) {
  const themes = [
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'light' as const, label: 'Light', icon: Sun },
  ];

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="font-medium mb-4">外观</h3>
      <div className="flex gap-3">
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <button
              key={theme.value}
              onClick={() => onChange(theme.value)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                value === theme.value
                  ? 'border-[#0a84ff] bg-[#0a84ff]/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{theme.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
