'use client';

interface ThemeSettingsProps {
  value: string;
  onChange: (theme: string) => void;
}

const THEMES = [
  { id: 'light-yellow',        label: '白黄',   mode: 'light', colors: ['#fdfcf8', '#c8a032', '#e8d070'] },
  { id: 'light-yellow-orange', label: '白黄橙', mode: 'light', colors: ['#fdf9f4', '#d4962a', '#e8b050'] },
  { id: 'light-orange',        label: '白橙',   mode: 'light', colors: ['#faf6f0', '#e08020', '#f0a040'] },
  { id: 'light-orange-red',    label: '白橙红', mode: 'light', colors: ['#faf4f0', '#d86040', '#e87050'] },
  { id: 'dark-purple',         label: '黑紫蓝', mode: 'dark',  colors: ['#000000', '#0a84ff', '#bf5af2'] },
  { id: 'dark-green',          label: '黑绿',   mode: 'dark',  colors: ['#000a04', '#30d158', '#40c8a0'] },
];

export function ThemeSettings({ value, onChange }: ThemeSettingsProps) {
  return (
    <div className="glass rounded-xl p-5">
      <h3 className="font-medium mb-4">外观</h3>
      <div className="grid grid-cols-3 gap-3">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-colors ${
              value === theme.id
                ? 'border-[#0a84ff] bg-[#0a84ff]/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div
              className="w-6 h-6 rounded-full shrink-0"
              style={{
                background: `linear-gradient(135deg, ${theme.colors[1]} 0%, ${theme.colors[2]} 100%)`,
              }}
            />
            <span className="text-sm">{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
