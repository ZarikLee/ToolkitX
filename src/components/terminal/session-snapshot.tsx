"use client";

import { useState, useEffect } from "react";

interface Snapshot {
  id: string;
  name: string;
  serverId: string;
  serverName: string;
  commands: string[];
  timestamp: number;
}

interface SessionSnapshotProps {
  serverId?: string;
  serverName?: string;
  onRestore: (commands: string[]) => void;
}

export function SessionSnapshot({ serverId, serverName, onRestore }: SessionSnapshotProps) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [currentCommands, setCurrentCommands] = useState<string[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [snapshotName, setSnapshotName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("session_snapshots");
    if (saved) {
      setSnapshots(JSON.parse(saved));
    }
  }, []);

  const saveSnapshots = (newSnapshots: Snapshot[]) => {
    setSnapshots(newSnapshots);
    localStorage.setItem("session_snapshots", JSON.stringify(newSnapshots));
  };

  const addCommand = (command: string) => {
    setCurrentCommands([...currentCommands, command]);
  };

  const saveSnapshot = () => {
    if (!snapshotName) return;

    const newSnapshot: Snapshot = {
      id: Date.now().toString(),
      name: snapshotName,
      serverId: serverId || "unknown",
      serverName: serverName || "未知服务器",
      commands: currentCommands,
      timestamp: Date.now(),
    };

    saveSnapshots([newSnapshot, ...snapshots]);
    setSnapshotName("");
    setShowSaveModal(false);
  };

  const loadSnapshot = (snapshot: Snapshot) => {
    setCurrentCommands(snapshot.commands);
    onRestore(snapshot.commands);
  };

  const deleteSnapshot = (id: string) => {
    saveSnapshots(snapshots.filter((s) => s.id !== id));
  };

  const filteredSnapshots = serverId
    ? snapshots.filter((s) => s.serverId === serverId)
    : snapshots;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">会话快照</h3>
        <button
          onClick={() => setShowSaveModal(true)}
          disabled={currentCommands.length === 0}
          className="px-3 py-1 text-sm bg-muted rounded hover:bg-muted/80 disabled:opacity-50"
        >
          保存当前会话
        </button>
      </div>

      {currentCommands.length > 0 && (
        <div className="p-3 border rounded bg-muted/50">
          <p className="text-xs text-muted-foreground mb-1">当前会话 ({currentCommands.length} 条命令)</p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {currentCommands.map((cmd, i) => (
              <code key={i} className="text-xs block">{cmd}</code>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredSnapshots.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            暂无保存的快照
          </p>
        )}
        {filteredSnapshots.map((snapshot) => (
          <div key={snapshot.id} className="p-3 border rounded">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{snapshot.name}</p>
                <p className="text-xs text-muted-foreground">
                  {snapshot.serverName} | {snapshot.commands.length} 条命令
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => loadSnapshot(snapshot)}
                  className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded"
                >
                  加载
                </button>
                <button
                  onClick={() => deleteSnapshot(snapshot.id)}
                  className="px-2 py-0.5 text-xs text-destructive hover:bg-destructive/10 rounded"
                >
                  删除
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(snapshot.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">保存会话快照</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">快照名称</label>
                <input
                  type="text"
                  value={snapshotName}
                  onChange={(e) => setSnapshotName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded text-sm"
                  placeholder="部署前检查"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  包含 {currentCommands.length} 条命令
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={saveSnapshot}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium"
              >
                保存
              </button>
              <button
                onClick={() => setShowSaveModal(false)}
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
