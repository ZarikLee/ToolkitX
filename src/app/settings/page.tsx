'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeSettings } from '@/components/settings/theme-settings';
import { MonitorSettings } from '@/components/settings/monitor-settings';
import { TerminalSettings } from '@/components/settings/terminal-settings';
import { Save } from 'lucide-react';
import { apiGet, apiPut, isLoginRequired, getLocalStorage } from '@/lib/api';

interface Settings {
  theme: 'dark' | 'light' | 'system';
  monitorRefreshInterval: number;
  terminalFontSize: number;
  terminalFontFamily: string;
}

const defaultSettings: Settings = {
  theme: 'dark',
  monitorRefreshInterval: 5000,
  terminalFontSize: 14,
  terminalFontFamily: 'Menlo, Monaco, "Courier New", monospace',
};

const SETTINGS_KEY = 'toolkitx_settings';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    if (isLoginRequired()) {
      setSettings({ ...defaultSettings, ...getLocalStorage(SETTINGS_KEY, {} as Settings) });
      return;
    }
    try {
      const data = await apiGet<Settings>('/api/settings');
      setSettings(data);
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
    } catch {
      setSettings({ ...defaultSettings, ...getLocalStorage(SETTINGS_KEY, {} as Settings) });
    }
  };

  const saveSettings = async () => {
    if (isLoginRequired()) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return;
    }
    try {
      const data = await apiPut<Settings>('/api/settings', settings);
      setSettings(data);
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
    } catch {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSettings = (partial: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex items-center gap-3 px-6 py-3 border-b border-white/[0.06] shrink-0">
        <Link
          href="/"
          className="flex items-center justify-center w-8 h-8 rounded-[10px] bg-white/[0.06] hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-all duration-200"
          title="返回首页"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
        </Link>
        <h1 className="text-[14px] font-medium tracking-tight">设置</h1>
        <button
          onClick={saveSettings}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white rounded-xl text-[13px] font-medium transition-all duration-200 active:scale-[0.98]"
        >
          <Save className="w-3.5 h-3.5" />
          {saved ? '已保存' : '保存设置'}
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-8 py-8 space-y-6">
          <ThemeSettings
            value={settings.theme}
            onChange={(theme) => updateSettings({ theme })}
          />

          <MonitorSettings
            refreshInterval={settings.monitorRefreshInterval}
            onChange={(monitorRefreshInterval) =>
              updateSettings({ monitorRefreshInterval })
            }
          />

          <TerminalSettings
            fontSize={settings.terminalFontSize}
            fontFamily={settings.terminalFontFamily}
            onFontSizeChange={(terminalFontSize) =>
              updateSettings({ terminalFontSize })
            }
            onFontFamilyChange={(terminalFontFamily) =>
              updateSettings({ terminalFontFamily })
            }
          />
        </div>
      </div>
    </div>
  );
}
