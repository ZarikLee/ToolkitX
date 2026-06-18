"use client";

import { useState, useEffect, useCallback } from "react";
import { Server, Plus, Pencil, Trash2, X, ChevronDown } from "lucide-react";

export interface SavedServer {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKey?: string;
}

interface ServerManagerProps {
  onSelect?: (server: SavedServer) => void;
  selectedId?: string;
  showSelect?: boolean;
  compact?: boolean;
}

const STORAGE_KEY = "quick_servers";

function loadServers(): SavedServer[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveServers(servers: SavedServer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(servers));
}

export function ServerManager({
  onSelect,
  selectedId,
  showSelect = true,
  compact = false,
}: ServerManagerProps) {
  const [servers, setServers] = useState<SavedServer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingServer, setEditingServer] = useState<SavedServer | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setServers(loadServers());
  }, []);

  const refresh = useCallback(() => {
    setServers(loadServers());
  }, []);

  const addServer = (data: Omit<SavedServer, "id">) => {
    const newServer: SavedServer = {
      ...data,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    };
    const updated = [...servers, newServer];
    saveServers(updated);
    setServers(updated);
  };

  const updateServer = (data: SavedServer) => {
    const updated = servers.map((s) => (s.id === data.id ? data : s));
    saveServers(updated);
    setServers(updated);
  };

  const deleteServer = (id: string) => {
    const updated = servers.filter((s) => s.id !== id);
    saveServers(updated);
    setServers(updated);
    if (selectedId === id && onSelect) {
      onSelect(updated[0] || null!);
    }
  };

  const handleSave = (data: Omit<SavedServer, "id"> & { id?: string }) => {
    if (data.id) {
      updateServer(data as SavedServer);
    } else {
      addServer(data);
    }
    setShowModal(false);
    setEditingServer(null);
  };

  const selected = servers.find((s) => s.id === selectedId);

  return (
    <div className="space-y-3">
      {/* Selector */}
      {showSelect && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-left transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Server className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                {selected ? (
                  <span className="truncate text-foreground">
                    {selected.name}
                    <span className="text-muted-foreground/40 ml-1.5">
                      {selected.host}
                    </span>
                  </span>
                ) : servers.length === 0 ? (
                  <span className="text-muted-foreground/40">
                    暂无服务器，请先添加
                  </span>
                ) : (
                  <span className="text-muted-foreground/40">选择服务器</span>
                )}
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute left-0 right-0 top-full mt-1 z-50 glass-heavy rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden max-h-64 overflow-y-auto animate-scale-in">
                  {servers.map((server) => (
                    <div
                      key={server.id}
                      className="flex items-center group"
                    >
                      <button
                        onClick={() => {
                          onSelect?.(server);
                          setShowDropdown(false);
                        }}
                        className="flex-1 flex items-center gap-2 px-4 py-2.5 text-[13px] text-left hover:bg-white/[0.06] transition-colors"
                      >
                        <Server className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                        <span className="truncate text-foreground">{server.name}</span>
                        <span className="text-muted-foreground/40 text-[11px] shrink-0">
                          {server.host}
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingServer(server);
                          setShowModal(true);
                          setShowDropdown(false);
                        }}
                        className="p-1.5 text-muted-foreground/30 hover:text-[#0a84ff] opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Pencil className="h-3 w-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteServer(server.id);
                        }}
                        className="p-1.5 pr-3 text-muted-foreground/30 hover:text-[#ff453a] opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {servers.length === 0 && (
                    <div className="px-4 py-3 text-[12px] text-muted-foreground/40 text-center">
                      暂无服务器
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => {
              setEditingServer(null);
              setShowModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all duration-200"
          >
            <Plus className="h-3.5 w-3.5" />
            {!compact && "添加"}
          </button>
        </div>
      )}

      {/* Server List (non-select mode) */}
      {!showSelect && (
        <div className="space-y-2">
          {servers.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground/30 text-[13px]">
              暂无保存的服务器
            </div>
          ) : (
            servers.map((server) => (
              <div
                key={server.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                  selectedId === server.id
                    ? "border-[#0a84ff]/40 bg-[#0a84ff]/[0.06]"
                    : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
                onClick={() => onSelect?.(server)}
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-medium truncate">{server.name}</p>
                  <p className="text-[11px] text-muted-foreground/40 font-mono">
                    {server.username}@{server.host}:{server.port}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingServer(server);
                      setShowModal(true);
                    }}
                    className="p-1.5 rounded-lg text-muted-foreground/30 hover:text-[#0a84ff] hover:bg-[#0a84ff]/10 transition-all"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteServer(server.id);
                    }}
                    className="p-1.5 rounded-lg text-muted-foreground/30 hover:text-[#ff453a] hover:bg-[#ff453a]/10 transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
          <button
            onClick={() => {
              setEditingServer(null);
              setShowModal(true);
            }}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-dashed border-white/[0.08] text-[12px] text-muted-foreground/40 hover:text-foreground hover:bg-white/[0.02] hover:border-white/[0.12] transition-all duration-200"
          >
            <Plus className="h-3.5 w-3.5" />
            添加服务器
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <ServerFormModal
          server={editingServer}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingServer(null);
          }}
        />
      )}
    </div>
  );
}

interface ServerFormModalProps {
  server: SavedServer | null;
  onSave: (data: Omit<SavedServer, "id"> & { id?: string }) => void;
  onClose: () => void;
}

function ServerFormModal({ server, onSave, onClose }: ServerFormModalProps) {
  const [form, setForm] = useState({
    name: server?.name || "",
    host: server?.host || "",
    port: server?.port || 22,
    username: server?.username || "root",
    password: server?.password || "",
    privateKey: server?.privateKey || "",
  });
  const [authType, setAuthType] = useState<"password" | "key">(
    server?.privateKey ? "key" : "password"
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...server,
      ...form,
      password: authType === "password" ? form.password : undefined,
      privateKey: authType === "key" ? form.privateKey : undefined,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
    >
      <div
        className="glass-heavy rounded-2xl w-full max-w-md shadow-[0_16px_48px_rgba(0,0,0,0.5)] animate-scale-in max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] shrink-0">
          <h3 className="text-[17px] font-semibold tracking-tight">
            {server ? "编辑服务器" : "添加服务器"}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-all duration-200 text-sm"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
              服务器名称
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
              placeholder="生产服务器"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                主机地址
              </label>
              <input
                type="text"
                value={form.host}
                onChange={(e) => setForm({ ...form, host: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] font-mono text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
                placeholder="192.168.1.100"
                required
              />
            </div>
            <div>
              <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                端口
              </label>
              <input
                type="number"
                value={form.port}
                onChange={(e) =>
                  setForm({ ...form, port: parseInt(e.target.value) || 22 })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] font-mono text-foreground outline-none focus:border-[#0a84ff]/50 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
              用户名
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
              placeholder="root"
              required
            />
          </div>

          {/* Auth Type */}
          <div>
            <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
              认证方式
            </label>
            <div className="flex gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06] mb-2">
              <button
                type="button"
                onClick={() => setAuthType("password")}
                className={`flex-1 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 ${
                  authType === "password"
                    ? "bg-white/[0.1] text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                密码
              </button>
              <button
                type="button"
                onClick={() => setAuthType("key")}
                className={`flex-1 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 ${
                  authType === "key"
                    ? "bg-white/[0.1] text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                私钥
              </button>
            </div>

            {authType === "password" ? (
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
                placeholder="SSH 密码（可选）"
              />
            ) : (
              <textarea
                value={form.privateKey}
                onChange={(e) => setForm({ ...form, privateKey: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] font-mono text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors resize-none h-24"
                placeholder="-----BEGIN RSA PRIVATE KEY-----"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-[13px] font-medium text-foreground transition-all duration-200"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white text-[13px] font-medium transition-all duration-200 active:scale-[0.98]"
            >
              {server ? "保存" : "添加"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
