'use client';

import { useState, useCallback } from 'react';
import { SSHTerminal } from './ssh-terminal';
import { ServerManager, SavedServer } from '@/components/ui/server-manager';
import { Plus, X, Terminal, Server } from 'lucide-react';

interface TerminalTab {
  id: string;
  title: string;
  host: string;
  port: number;
  username: string;
  isConnected: boolean;
}

export function TerminalTabs() {
  const [tabs, setTabs] = useState<TerminalTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [showConnectDialog, setShowConnectDialog] = useState(false);

  const addTab = useCallback((config: { host: string; port: number; username: string }) => {
    const newTab: TerminalTab = {
      id: `tab_${Date.now()}`,
      title: `${config.username}@${config.host}`,
      host: config.host,
      port: config.port,
      username: config.username,
      isConnected: false,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
  }, []);

  const removeTab = useCallback((tabId: string) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== tabId));
    if (activeTabId === tabId) {
      setActiveTabId((prev) => {
        const remaining = tabs.filter((tab) => tab.id !== tabId);
        return remaining.length > 0 ? remaining[0].id : null;
      });
    }
  }, [tabs, activeTabId]);

  const updateTabStatus = useCallback((tabId: string, isConnected: boolean) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === tabId ? { ...tab, isConnected } : tab))
    );
  }, []);

  const handleQuickConnect = (server: SavedServer) => {
    addTab({
      host: server.host,
      port: server.port,
      username: server.username,
    });
    setShowConnectDialog(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div className="flex items-center bg-[#1c1c1e] border-b border-white/[0.06]">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-2.5 cursor-pointer border-r border-white/[0.06] min-w-[140px] transition-colors duration-200 ${
                activeTabId === tab.id
                  ? 'bg-[#2c2c2e]'
                  : 'bg-[#1c1c1e] hover:bg-[#2c2c2e]/50'
              }`}
              onClick={() => setActiveTabId(tab.id)}
            >
              <Terminal className="w-3.5 h-3.5 text-muted-foreground/60" />
              <span className="text-[12px] truncate text-foreground/80">{tab.title}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${tab.isConnected ? 'bg-[#30d158]' : 'bg-muted-foreground/20'}`} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
                className="ml-1 p-0.5 rounded hover:bg-white/[0.06] text-muted-foreground/30 hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowConnectDialog(!showConnectDialog)}
          className="flex items-center gap-1 px-3 py-2.5 hover:bg-white/[0.06] text-muted-foreground/40 hover:text-foreground transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Connect Panel */}
      {showConnectDialog && tabs.length === 0 && (
        <div className="border-b border-white/[0.06] bg-[#1c1c1e] p-4">
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Server className="h-4 w-4 text-muted-foreground/40" />
              <span className="text-[13px] font-medium text-foreground/80">快速连接</span>
            </div>
            <ServerManager
              onSelect={handleQuickConnect}
              showSelect
            />
            <p className="text-[11px] text-muted-foreground/30 text-center">
              选择已保存的服务器，或点击 + 添加新服务器
            </p>
          </div>
        </div>
      )}

      {/* Terminal Area */}
      <div className="flex-1 relative bg-[#0a0a0a]">
        {tabs.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Terminal className="w-12 h-12 mx-auto mb-4 text-muted-foreground/10" />
              <p className="text-[14px] text-muted-foreground/30 mb-1">暂无终端会话</p>
              <p className="text-[12px] text-muted-foreground/15 mb-4">点击 + 新建连接，或从服务器列表快速连接</p>
              <button
                onClick={() => setShowConnectDialog(true)}
                className="px-4 py-2 rounded-xl bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white text-[13px] font-medium transition-all duration-200 active:scale-[0.98]"
              >
                新建连接
              </button>
            </div>
          </div>
        ) : (
          tabs.map((tab) => (
            <div
              key={tab.id}
              className={`absolute inset-0 ${activeTabId === tab.id ? 'block' : 'hidden'}`}
            >
              <SSHTerminal
                host={tab.host}
                port={tab.port}
                username={tab.username}
                onConnect={() => updateTabStatus(tab.id, true)}
                onDisconnect={() => updateTabStatus(tab.id, false)}
              />
            </div>
          ))
        )}
      </div>

      {/* Connect Dialog */}
      {showConnectDialog && tabs.length > 0 && (
        <ConnectDialog
          onConnect={(config) => {
            addTab(config);
            setShowConnectDialog(false);
          }}
          onClose={() => setShowConnectDialog(false)}
        />
      )}
    </div>
  );
}

interface ConnectDialogProps {
  onConnect: (config: { host: string; port: number; username: string; password?: string; privateKey?: string }) => void;
  onClose: () => void;
}

function ConnectDialog({ onConnect, onClose }: ConnectDialogProps) {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('22');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState<'password' | 'key'>('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect({
      host,
      port: parseInt(port, 10),
      username,
      password: authType === 'password' ? password : undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 9999 }} onClick={onClose}>
      <div className="glass-heavy rounded-2xl w-full max-w-md shadow-[0_16px_48px_rgba(0,0,0,0.5)] animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <h2 className="text-[17px] font-semibold tracking-tight">SSH 连接</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-all duration-200 text-sm">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">主机地址</label>
              <input type="text" value={host} onChange={(e) => setHost(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] font-mono text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50" placeholder="192.168.1.100" required />
            </div>
            <div>
              <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">端口</label>
              <input type="number" value={port} onChange={(e) => setPort(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] font-mono text-foreground outline-none focus:border-[#0a84ff]/50" required />
            </div>
          </div>
          <div>
            <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">用户名</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50" placeholder="root" required />
          </div>
          <div>
            <label className="text-[12px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">认证方式</label>
            <div className="flex gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06] mb-2">
              <button type="button" onClick={() => setAuthType('password')} className={`flex-1 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 ${authType === 'password' ? 'bg-white/[0.1] text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                密码
              </button>
              <button type="button" onClick={() => setAuthType('key')} className={`flex-1 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 ${authType === 'key' ? 'bg-white/[0.1] text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                私钥
              </button>
            </div>
            {authType === 'password' ? (
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50" placeholder="SSH 密码（可选）" />
            ) : (
              <textarea className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] font-mono text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 resize-none h-24" placeholder="-----BEGIN RSA PRIVATE KEY-----" />
            )}
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-[13px] font-medium text-foreground transition-all duration-200">
              取消
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white text-[13px] font-medium transition-all duration-200 active:scale-[0.98]">
              连接
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
