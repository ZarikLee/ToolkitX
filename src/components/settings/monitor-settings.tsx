'use client';

interface MonitorSettingsProps {
  refreshInterval: number;
  onChange: (interval: number) => void;
}

export function MonitorSettings({
  refreshInterval,
  onChange,
}: MonitorSettingsProps) {
  const intervals = [
    { value: 1000, label: '1 second' },
    { value: 5000, label: '5 seconds' },
    { value: 10000, label: '10 seconds' },
    { value: 30000, label: '30 seconds' },
  ];

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="font-medium mb-4">系统监控</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            数据刷新间隔
          </label>
          <div className="flex gap-2">
            {intervals.map((interval) => (
              <button
                key={interval.value}
                onClick={() => onChange(interval.value)}
                className={`px-4 py-2 rounded border-2 transition-colors ${
                  refreshInterval === interval.value
                    ? 'border-[#0a84ff] bg-[#0a84ff]/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {interval.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            系统指标刷新频率。间隔越短数据越实时，但会增加服务器负载。
          </p>
        </div>
      </div>
    </div>
  );
}
