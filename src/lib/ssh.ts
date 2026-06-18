import { Client } from 'ssh2';
import { readFileSync } from 'fs';

export interface SSHConfig {
  host: string;
  port?: number;
  username: string;
  password?: string;
  privateKey?: string;
  privateKeyPath?: string;
}

export interface SSHConnection {
  id: string;
  config: SSHConfig;
  client: Client;
  stream: any;
}

const connections: Map<string, SSHConnection> = new Map();

export function generateConnectionId(): string {
  return `ssh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function createSSHConnection(config: SSHConfig): Promise<{ id: string; stream: any }> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    const id = generateConnectionId();

    conn.on('ready', () => {
      conn.shell({ term: 'xterm-256color' }, (err, stream) => {
        if (err) {
          conn.end();
          reject(err);
          return;
        }

        connections.set(id, {
          id,
          config,
          client: conn,
          stream,
        });

        resolve({ id, stream });
      });
    });

    conn.on('error', (err) => {
      reject(err);
    });

    const connectConfig: any = {
      host: config.host,
      port: config.port || 22,
      username: config.username,
    };

    if (config.privateKey) {
      connectConfig.privateKey = config.privateKey;
    } else if (config.privateKeyPath) {
      try {
        connectConfig.privateKey = readFileSync(config.privateKeyPath);
      } catch (e) {
        console.error('Failed to read private key:', e);
      }
    } else if (config.password) {
      connectConfig.password = config.password;
    }

    conn.connect(connectConfig);
  });
}

export function getConnection(id: string): SSHConnection | undefined {
  return connections.get(id);
}

export function closeConnection(id: string): boolean {
  const conn = connections.get(id);
  if (conn) {
    conn.stream.close();
    conn.client.end();
    connections.delete(id);
    return true;
  }
  return false;
}

export function writeToStream(id: string, data: string): boolean {
  const conn = connections.get(id);
  if (conn && conn.stream) {
    conn.stream.write(data);
    return true;
  }
  return false;
}

export function resizeStream(id: string, cols: number, rows: number): boolean {
  const conn = connections.get(id);
  if (conn && conn.stream) {
    conn.stream.setWindow(rows, cols, 0, 0);
    return true;
  }
  return false;
}

export function closeAllConnections(): void {
  for (const [id, conn] of connections) {
    try {
      conn.stream.close();
      conn.client.end();
    } catch (e) {
      // Ignore errors during cleanup
    }
  }
  connections.clear();
}
