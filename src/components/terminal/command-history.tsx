"use client";

import { useState, useEffect } from "react";

interface CommandHistory {
  id: string;
  command: string;
  output: string;
  timestamp: number;
  favorite: boolean;
}

interface CommandHistoryProps {
  onExecute: (command: string) => void;
}

export function CommandHistory({ onExecute }: CommandHistoryProps) {
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("command_history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const saveHistory = (newHistory: CommandHistory[]) => {
    setHistory(newHistory);
    localStorage.setItem("command_history", JSON.stringify(newHistory));
  };

  const addCommand = (command: string, output: string) => {
    const newItem: CommandHistory = {
      id: Date.now().toString(),
      command,
      output,
      timestamp: Date.now(),
      favorite: false,
    };
    saveHistory([newItem, ...history].slice(0, 100));
  };

  const toggleFavorite = (id: string) => {
    saveHistory(
      history.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    saveHistory(history.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  const filteredHistory = history.filter(
    (item) =>
      item.command.toLowerCase().includes(search.toLowerCase()) ||
      item.output.toLowerCase().includes(search.toLowerCase())
  );

  const favoriteCommands = history.filter((item) => item.favorite);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">命令笔记本</h3>
        <button
          onClick={clearHistory}
          className="px-3 py-1 text-sm text-destructive hover:bg-destructive/10 rounded"
        >
          清空
        </button>
      </div>

      {favoriteCommands.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-2">
            收藏的命令
          </h4>
          <div className="space-y-1">
            {favoriteCommands.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm"
              >
                <code className="truncate flex-1">{item.command}</code>
                <button
                  onClick={() => onExecute(item.command)}
                  className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded"
                >
                  执行
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded text-sm"
          placeholder="搜索历史命令..."
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredHistory.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            暂无命令历史
          </p>
        )}
        {filteredHistory.map((item) => (
          <div key={item.id} className="p-3 border rounded">
            <div className="flex items-center justify-between">
              <code className="text-sm">{item.command}</code>
              <div className="flex gap-1">
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`px-2 py-0.5 text-xs rounded ${
                    item.favorite
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {item.favorite ? "★" : "☆"}
                </button>
                <button
                  onClick={() => onExecute(item.command)}
                  className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded"
                >
                  执行
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="px-2 py-0.5 text-xs text-destructive hover:bg-destructive/10 rounded"
                >
                  删除
                </button>
              </div>
            </div>
            {item.output && (
              <pre className="text-xs text-muted-foreground mt-2 max-h-20 overflow-hidden">
                {item.output.slice(0, 200)}
              </pre>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
