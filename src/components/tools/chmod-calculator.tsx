"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const chmodHelp = [
  { title: "功能说明", items: ["计算 chmod 权限值", "支持数字和符号表示法", "反向计算：从数字获取权限"] },
  { title: "使用方法", items: ["勾选各组的读/写/执行权限", "查看数字和符号表示", "或输入数字查看权限"] },
];

interface Permissions {
  owner: { read: boolean; write: boolean; execute: boolean };
  group: { read: boolean; write: boolean; execute: boolean };
  other: { read: boolean; write: boolean; execute: boolean };
}

function permissionsToOctal(perms: Permissions): string {
  const owner = (perms.owner.read ? 4 : 0) + (perms.owner.write ? 2 : 0) + (perms.owner.execute ? 1 : 0);
  const group = (perms.group.read ? 4 : 0) + (perms.group.write ? 2 : 0) + (perms.group.execute ? 1 : 0);
  const other = (perms.other.read ? 4 : 0) + (perms.other.write ? 2 : 0) + (perms.other.execute ? 1 : 0);
  return `${owner}${group}${other}`;
}

function permissionsToSymbolic(perms: Permissions): string {
  const rwx = (p: { read: boolean; write: boolean; execute: boolean }) =>
    (p.read ? "r" : "-") + (p.write ? "w" : "-") + (p.execute ? "x" : "-");
  return rwx(perms.owner) + rwx(perms.group) + rwx(perms.other);
}

function octalToPermissions(octal: string): Permissions | null {
  if (!/^[0-7]{3}$/.test(octal)) return null;
  const nums = octal.split("").map(Number);
  return {
    owner: {
      read: (nums[0] & 4) !== 0,
      write: (nums[0] & 2) !== 0,
      execute: (nums[0] & 1) !== 0,
    },
    group: {
      read: (nums[1] & 4) !== 0,
      write: (nums[1] & 2) !== 0,
      execute: (nums[1] & 1) !== 0,
    },
    other: {
      read: (nums[2] & 4) !== 0,
      write: (nums[2] & 2) !== 0,
      execute: (nums[2] & 1) !== 0,
    },
  };
}

export function ChmodCalculator() {
  const [permissions, setPermissions] = useState<Permissions>({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    other: { read: true, write: false, execute: false },
  });
  const [numericInput, setNumericInput] = useState("");
  const [fromNumeric, setFromNumeric] = useState<Permissions | null>(null);

  const updatePermission = (group: "owner" | "group" | "other", perm: "read" | "write" | "execute") => {
    setPermissions((prev) => ({
      ...prev,
      [group]: { ...prev[group], [perm]: !prev[group][perm] },
    }));
  };

  const octal = permissionsToOctal(permissions);
  const symbolic = permissionsToSymbolic(permissions);

  const calculateFromNumeric = () => {
    setFromNumeric(octalToPermissions(numericInput));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const GroupSection = ({ label, group }: { label: string; group: "owner" | "group" | "other" }) => (
    <div className="p-4 glass rounded-xl space-y-2">
      <h3 className="text-sm font-medium">{label}</h3>
      <div className="flex gap-3">
        {(["read", "write", "execute"] as const).map((perm) => (
          <label key={perm} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={permissions[group][perm]}
              onChange={() => updatePermission(group, perm)}
              className="rounded"
            />
            <span className="text-sm">{perm === "read" ? "读 (r)" : perm === "write" ? "写 (w)" : "执行 (x)"}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">chmod 计算器</h2>
          <InlineHelp content={chmodHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          计算和转换文件权限
        </p>
      </div>

      <div className="space-y-3">
        <GroupSection label="所有者 (Owner)" group="owner" />
        <GroupSection label="用户组 (Group)" group="group" />
        <GroupSection label="其他 (Other)" group="other" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 glass rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">数字表示</span>
            <button
              onClick={() => copyToClipboard(octal)}
              className="px-2 py-1 text-xs btn-ghost"
            >
              复制
            </button>
          </div>
          <p className="text-2xl font-mono font-bold">{octal}</p>
        </div>
        <div className="p-4 glass rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">符号表示</span>
            <button
              onClick={() => copyToClipboard(symbolic)}
              className="px-2 py-1 text-xs btn-ghost"
            >
              复制
            </button>
          </div>
          <p className="text-2xl font-mono font-bold">{symbolic}</p>
        </div>
      </div>

      <div className="border-t border-white/15 pt-6">
        <h3 className="text-sm font-medium mb-3">反向计算</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={numericInput}
            onChange={(e) => setNumericInput(e.target.value)}
            className="input-apple font-mono"
            placeholder="755"
            maxLength={3}
          />
          <button
            onClick={calculateFromNumeric}
            disabled={numericInput.length !== 3}
            className="btn-secondary disabled:opacity-50"
          >
            计算
          </button>
        </div>

        {fromNumeric && (
          <div className="mt-3 p-4 glass rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">权限 ({numericInput}):</p>
            <p className="font-mono">{permissionsToSymbolic(fromNumeric)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
