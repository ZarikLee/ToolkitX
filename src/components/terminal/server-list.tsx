"use client";

import { useState, useEffect } from "react";

interface Server {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
}

interface ServerListProps {
  onSelect: (server: Server) => void;
  selectedServerId?: string;
}

export function ServerList({ onSelect, selectedServerId }: ServerListProps) {
  const [servers, setServers] = useState<Server[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newServer, setNewServer] = useState({ name: "", host: "", port: 22, username: "root" });

  useEffect(() => {
    const saved = localStorage.getItem("quick_servers");
    if (saved) {
      setServers(JSON.parse(saved));
    }
  }, []);

  const saveServers = (newServers: Server[]) => {
    setServers(newServers);
    localStorage.setItem("quick_servers", JSON.stringify(newServers));
  };

  const addServer = () => {
    if (!newServer.name || !newServer.host) return;
    const server: Server = {
      ...newServer,
      id: Date.now().toString(),
    };
    saveServers([...servers, server]);
    setNewServer({ name: "", host: "", port: 22, username: "root" });
    setShowAddModal(false);
  };

  const deleteServer = (id: string) => {
    saveServers(servers.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">快速连接</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1 text-sm bg-muted rounded hover:bg-muted/80"
        >
          + 添加
        </button>
      </div>

      <div className="space-y-2">
        {servers.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            暂无保存的服务器
          </p>
        )}
        {servers.map((server) => (
          <div
            key={server.id}
            className={`flex items-center justify-between p-3 border rounded cursor-pointer ${
              selectedServerId === server.id
                ? "border-primary bg-primary/10"
                : "hover:border-primary/50"
            }`}
            onClick={() => onSelect(server)}
          >
            <div>
              <p className="text-sm font-medium">{server.name}</p>
              <p className="text-xs text-muted-foreground">
                {server.username}@{server.host}:{server.port}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteServer(server.id);
              }}
              className="px-2 py-0.5 text-xs text-destructive hover:bg-destructive/10 rounded"
            >
              删除
            </button>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-heavy rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">添加服务器</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">服务器名称</label>
                <input
                  type="text"
                  value={newServer.name}
                  onChange={(e) => setNewServer({ ...newServer, name: e.target.value })}
                  className="input-apple w-full mt-1 text-sm"
                  placeholder="生产服务器"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">主机地址</label>
                  <input
                    type="text"
                    value={newServer.host}
                    onChange={(e) => setNewServer({ ...newServer, host: e.target.value })}
                    className="input-apple w-full mt-1 text-sm"
                    placeholder="192.168.1.100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">端口</label>
                  <input
                    type="number"
                    value={newServer.port}
                    onChange={(e) => setNewServer({ ...newServer, port: parseInt(e.target.value) || 22 })}
                    className="input-apple w-full mt-1 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">用户名</label>
                <input
                  type="text"
                  value={newServer.username}
                  onChange={(e) => setNewServer({ ...newServer, username: e.target.value })}
                  className="input-apple w-full mt-1 text-sm"
                  placeholder="root"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={addServer}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium"
              >
                添加
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-muted rounded text-sm font-medium hover:bg-muted/80"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
