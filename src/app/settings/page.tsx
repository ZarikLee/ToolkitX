'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeSettings } from '@/components/settings/theme-settings';
import { MonitorSettings } from '@/components/settings/monitor-settings';
import { TerminalSettings } from '@/components/settings/terminal-settings';
import { Save } from 'lucide-react';
import { apiGet, apiPut, isLoginRequired, getLocalStorage } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface Settings {
  theme: 'dark' | 'light';
  monitorRefreshInterval: number;
  terminalFontSize: number;
  terminalFontFamily: string;
}

const defaultSettings: Settings = {
  theme: 'light',
  monitorRefreshInterval: 5000,
  terminalFontSize: 14,
  terminalFontFamily: 'Menlo, Monaco, "Courier New", monospace',
};

const SETTINGS_KEY = 'toolkitx_settings';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const { toast } = useToast();

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
      toast('设置已保存');
      return;
    }
    try {
      const data = await apiPut<Settings>('/api/settings', settings);
      setSettings(data);
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
    } catch {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
    toast('设置已保存');
  };

  const updateSettings = (partial: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex items-center gap-3 px-8 py-3 border-b border-white/[0.06] shrink-0">
        <Link
          href="/"
          className="btn-close shrink-0"
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
        <div className="ml-auto" />
        <button
          onClick={saveSettings}
          className="flex items-center gap-2 btn-primary"
        >
          <Save className="w-3.5 h-3.5" />
          保存设置
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
