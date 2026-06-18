'use client';

interface TerminalSettingsProps {
  fontSize: number;
  fontFamily: string;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (family: string) => void;
}

export function TerminalSettings({
  fontSize,
  fontFamily,
  onFontSizeChange,
  onFontFamilyChange,
}: TerminalSettingsProps) {
  const fontSizes = [12, 14, 16, 18, 20, 24];
  const fontFamilies = [
    'Menlo, Monaco, "Courier New", monospace',
    'Consolas, "Courier New", monospace',
    '"Fira Code", "Courier New", monospace',
    '"Source Code Pro", "Courier New", monospace',
  ];

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="font-medium mb-4">SSH 终端</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">字体大小</label>
          <div className="flex gap-2">
            {fontSizes.map((size) => (
              <button
                key={size}
                onClick={() => onFontSizeChange(size)}
                className={`px-4 py-2 rounded border-2 transition-colors ${
                  fontSize === size
                    ? 'border-[#0a84ff] bg-[#0a84ff]/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {size}px
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            字体族
          </label>
          <div className="grid grid-cols-2 gap-2">
            {fontFamilies.map((family) => (
              <button
                key={family}
                onClick={() => onFontFamilyChange(family)}
                className={`px-4 py-2 rounded border-2 text-left transition-colors ${
                  fontFamily === family
                    ? 'border-[#0a84ff] bg-[#0a84ff]/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <span style={{ fontFamily }}>{family.split(',')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-2">预览</label>
          <div className="bg-black rounded p-4 font-mono" style={{ fontFamily, fontSize }}>
            <span className="text-green-400">$</span> ssh user@hostname
            <br />
            <span className="text-zinc-300">Welcome to Ubuntu 22.04 LTS</span>
            <br />
            <span className="text-green-400">$</span> <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}
