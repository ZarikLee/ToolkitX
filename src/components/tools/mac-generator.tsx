"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const macHelp = [
  { title: "功能说明", items: ["生成随机 MAC 地址", "支持指定厂商前缀"] },
  { title: "使用方法", items: ["选择是否使用厂商前缀", "点击「生成 MAC」", "复制生成的地址"] },
];

const vendorPrefixes = [
  { vendor: "Apple", prefix: "00:1A:2B" },
  { vendor: "Samsung", prefix: "00:1E:65" },
  { vendor: "Intel", prefix: "00:1B:21" },
  { vendor: "Cisco", prefix: "00:1A:A1" },
  { vendor: "Huawei", prefix: "00:1E:10" },
  { vendor: "Xiaomi", prefix: "28:6C:07" },
  { vendor: "TP-Link", prefix: "50:C7:BF" },
  { vendor: "Dell", prefix: "00:14:22" },
  { vendor: "Lenovo", prefix: "28:D2:44" },
  { vendor: "Generic", prefix: "02:00:00" },
];

function generateRandomMAC(): string {
  return Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
  ).join(":");
}

function generateVendorMAC(prefix: string): string {
  const suffix = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
  ).join(":");
  return `${prefix}:${suffix}`;
}

export function MACGenerator() {
  const [useVendor, setUseVendor] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(0);
  const [macs, setMacs] = useState<string[]>([]);

  const generate = () => {
    const newMacs = Array.from({ length: 5 }, () =>
      useVendor ? generateVendorMAC(vendorPrefixes[selectedVendor].prefix) : generateRandomMAC()
    );
    setMacs(newMacs);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(macs.join("\n"));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">MAC 地址生成器</h2>
          <InlineHelp content={macHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          生成随机 MAC 地址，支持厂商前缀
        </p>
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useVendor}
            onChange={(e) => setUseVendor(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">使用厂商前缀</span>
        </label>
      </div>

      {useVendor && (
        <div>
          <label className="text-sm font-medium">选择厂商</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {vendorPrefixes.map((vendor, i) => (
              <button
                key={vendor.vendor}
                onClick={() => setSelectedVendor(i)}
                className={`p-2 rounded-lg text-sm text-left transition-all ${
                  selectedVendor === i
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="font-medium">{vendor.vendor}</span>
                <span className="text-xs opacity-70 ml-2">{vendor.prefix}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={generate}
        className="w-full btn-primary"
      >
        生成 MAC
      </button>

      {macs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">生成结果</h3>
            <button
              onClick={copyAll}
              className="px-3 py-1 text-sm btn-ghost"
            >
              复制全部
            </button>
          </div>
          <div className="space-y-2">
            {macs.map((mac, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 glass rounded-xl"
              >
                <p className="font-mono text-sm">{mac}</p>
                <button
                  onClick={() => copyToClipboard(mac)}
                  className="ml-2 px-3 py-1 text-sm btn-ghost"
                >
                  复制
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 glass rounded-xl">
        <h3 className="text-sm font-medium mb-2">关于 MAC 地址</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>- MAC 地址由 6 组十六进制数组成 (如 AA:BB:CC:DD:EE:FF)</li>
          <li>- 前 3 组为厂商识别码 (OUI)，后 3 组为设备标识</li>
          <li>- 本地生成的 MAC 地址应将第一字节第二位设为 1</li>
        </ul>
      </div>
    </div>
  );
}
