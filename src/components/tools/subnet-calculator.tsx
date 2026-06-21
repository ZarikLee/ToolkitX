"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const subnetHelp = [
  { title: "功能说明", items: ["计算 IPv4 子网信息", "显示网络地址、广播地址、可用范围"] },
  { title: "使用方法", items: ["输入 IP 地址", "输入 CIDR 前缀长度", "查看计算结果"] },
];

interface SubnetInfo {
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  subnetMask: string;
  wildcardMask: string;
}

function ipToInt(ip: string): number {
  const parts = ip.split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join(".");
}

function calculateSubnet(ip: string, cidr: number): SubnetInfo | null {
  const ipInt = ipToInt(ip);
  if (isNaN(ipInt)) return null;

  const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const networkInt = (ipInt & mask) >>> 0;
  const broadcastInt = (networkInt | ~mask) >>> 0;

  const firstHost = cidr >= 31 ? intToIp(networkInt) : intToIp((networkInt + 1) >>> 0);
  const lastHost = cidr >= 31 ? intToIp(broadcastInt) : intToIp((broadcastInt - 1) >>> 0);
  const totalHosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : Math.pow(2, 32 - cidr) - 2;

  return {
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    firstHost,
    lastHost,
    totalHosts: Math.max(0, totalHosts),
    subnetMask: intToIp(mask),
    wildcardMask: intToIp((~mask) >>> 0),
  };
}

export function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.100");
  const [cidr, setCidr] = useState(24);
  const [result, setResult] = useState<SubnetInfo | null>(null);

  const calculate = () => {
    setResult(calculateSubnet(ip, cidr));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const fields = [
    { label: "网络地址", value: result?.networkAddress },
    { label: "广播地址", value: result?.broadcastAddress },
    { label: "第一可用主机", value: result?.firstHost },
    { label: "最后可用主机", value: result?.lastHost },
    { label: "子网掩码", value: result?.subnetMask },
    { label: "通配符掩码", value: result?.wildcardMask },
    { label: "可用主机数", value: result?.totalHosts.toString() },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">IPv4 子网计算器</h2>
          <InlineHelp content={subnetHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          计算 IPv4 子网信息，包括网络地址、广播地址和可用范围
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <label className="text-sm font-medium">IP 地址</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="input-apple mt-1 font-mono"
            placeholder="192.168.1.100"
          />
        </div>
        <div>
          <label className="text-sm font-medium">CIDR</label>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground">/</span>
            <input
              type="number"
              min={0}
              max={32}
              value={cidr}
              onChange={(e) => setCidr(Math.min(32, Math.max(0, parseInt(e.target.value) || 0)))}
              className="input-apple font-mono"
            />
          </div>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={32}
        value={cidr}
        onChange={(e) => setCidr(parseInt(e.target.value))}
        className="w-full"
      />

      <button
        onClick={calculate}
        disabled={!ip}
        className="btn-primary disabled:opacity-50"
      >
        计算
      </button>

      {result && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">计算结果</h3>
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between p-3 glass rounded-xl"
            >
              <div className="flex-1 min-w-0">
                <span className="text-xs text-muted-foreground">{field.label}</span>
                <p className="text-sm font-mono mt-1">{field.value}</p>
              </div>
              <button
                onClick={() => copyToClipboard(field.value!)}
                className="ml-2 px-3 py-1 text-sm btn-ghost shrink-0"
              >
                复制
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 glass rounded-xl">
        <h3 className="text-sm font-medium mb-2">常用子网</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            { cidr: 8, mask: "255.0.0.0", hosts: "16,777,214" },
            { cidr: 16, mask: "255.255.0.0", hosts: "65,534" },
            { cidr: 24, mask: "255.255.255.0", hosts: "254" },
            { cidr: 28, mask: "255.255.255.240", hosts: "14" },
          ].map((sub) => (
            <div
              key={sub.cidr}
              className="p-2 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => { setCidr(sub.cidr); }}
            >
              <span className="font-mono">/{sub.cidr}</span>
              <span className="text-muted-foreground ml-2">{sub.mask}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
