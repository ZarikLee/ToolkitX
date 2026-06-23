'use client';

import { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';

interface SSHTerminalProps {
  host: string;
  port?: number;
  username: string;
  password?: string;
  privateKey?: string;
  jumpHost?: {
    host: string;
    port?: number;
    username: string;
    password?: string;
    privateKey?: string;
  };
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: string) => void;
}

export function SSHTerminal({
  host,
  port = 22,
  username,
  password,
  privateKey,
  jumpHost,
  onConnect,
  onDisconnect,
  onError,
}: SSHTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#d4d4d4',
        selectionBackground: '#264f78',
      },
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(new WebLinksAddon());

    terminal.open(terminalRef.current);
    fitAddon.fit();

    terminalInstanceRef.current = terminal;

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
    };
  }, []);

  const connect = async () => {
    if (isConnecting || isConnected) return;

    setIsConnecting(true);
    terminalInstanceRef.current?.clear();

    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/ssh`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: 'connect',
          host,
          port,
          username,
          password,
          privateKey,
          jumpHost,
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'connected':
            setIsConnected(true);
            setIsConnecting(false);
            onConnect?.();
            break;
          case 'data':
            terminalInstanceRef.current?.write(data.data);
            break;
          case 'error':
            setIsConnecting(false);
            onError?.(data.message);
            break;
          case 'disconnected':
            setIsConnected(false);
            setIsConnecting(false);
            onDisconnect?.();
            break;
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
      };

      ws.onerror = () => {
        setIsConnecting(false);
        onError?.('WebSocket connection failed');
      };

      terminalInstanceRef.current?.onData((data) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'data', data }));
        }
      });

      terminalInstanceRef.current?.onResize(({ cols, rows }) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'resize', cols, rows }));
        }
      });
    } catch (error) {
      setIsConnecting(false);
      onError?.(error instanceof Error ? error.message : 'Connection failed');
    }
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ type: 'disconnect' }));
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
    onDisconnect?.();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 bg-[#1c1c1e] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#30d158] shadow-[0_0_6px_rgba(48,209,88,0.4)]' : 'bg-muted-foreground/20'}`} />
          <span className="text-[12px] font-mono text-foreground/60">
            {isConnected ? `${username}@${host}:${port}` : '未连接'}
          </span>
        </div>
        <div className="flex gap-2">
          {!isConnected ? (
            <button
              onClick={connect}
              disabled={isConnecting}
              className="btn-primary text-[12px] px-3 py-1"
            >
              {isConnecting ? '连接中...' : '连接'}
            </button>
          ) : (
            <button
              onClick={disconnect}
              className="px-3 py-1 text-[12px] font-medium bg-[#ff453a] hover:bg-[#ff453a]/90 rounded-lg transition-colors"
            >
              断开
            </button>
          )}
        </div>
      </div>
      <div ref={terminalRef} className="flex-1 bg-[#0a0a0a]" />
    </div>
  );
}
