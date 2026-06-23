import { Client } from 'ssh2';
import { readFileSync } from 'fs';

export interface SSHConfig {
  host: string;
  port?: number;
  username: string;
  password?: string;
  privateKey?: string;
  privateKeyPath?: string;
  jumpHost?: {
    host: string;
    port?: number;
    username: string;
    password?: string;
    privateKey?: string;
  };
}

export interface SSHConnection {
  id: string;
  config: SSHConfig;
  client: Client;
  stream: any;
  jumpClient?: Client;
}

const connections: Map<string, SSHConnection> = new Map();

export function generateConnectionId(): string {
  return `ssh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function buildAuth(auth: { password?: string; privateKey?: string; privateKeyPath?: string }): any {
  if (auth.privateKey) {
    return { privateKey: auth.privateKey };
  }
  if (auth.privateKeyPath) {
    try {
      return { privateKey: readFileSync(auth.privateKeyPath) };
    } catch (e) {
      console.error('Failed to read private key:', e);
    }
  }
  if (auth.password) {
    return { password: auth.password };
  }
  return {};
}

function connectClient(config: { host: string; port: number; username: string; password?: string; privateKey?: string }, sock?: any): Promise<Client> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn.on('ready', () => resolve(conn));
    conn.on('error', (err) => reject(err));

    const connectConfig: any = {
      host: config.host,
      port: config.port || 22,
      username: config.username,
      ...buildAuth(config),
    };

    if (sock) {
      connectConfig.sock = sock;
    }

    conn.connect(connectConfig);
  });
}

export async function createSSHConnection(config: SSHConfig): Promise<{ id: string; stream: any }> {
  const id = generateConnectionId();
  let jumpClient: Client | undefined;

  let targetConn: Client;

  if (config.jumpHost) {
    // Step 1: Connect to jump host
    jumpClient = await connectClient({
      host: config.jumpHost.host,
      port: config.jumpHost.port || 22,
      username: config.jumpHost.username,
      password: config.jumpHost.password,
      privateKey: config.jumpHost.privateKey,
    });

    // Step 2: Create tunnel through jump host to target
    const stream = await new Promise<any>((resolve, reject) => {
      jumpClient!.forwardOut(
        '127.0.0.1', 0,
        config.host, config.port || 22,
        (err, s) => {
          if (err) {
            jumpClient!.end();
            reject(err);
          } else {
            resolve(s);
          }
        }
      );
    });

    // Step 3: Connect to target through tunnel
    targetConn = await connectClient({
      host: config.host,
      port: config.port || 22,
      username: config.username,
      password: config.password,
      privateKey: config.privateKey,
    }, stream);
  } else {
    // Direct connection (no jump host)
    targetConn = await connectClient({
      host: config.host,
      port: config.port || 22,
      username: config.username,
      password: config.password,
      privateKey: config.privateKey,
    });
  }

  // Open shell
  const shellStream = await new Promise<any>((resolve, reject) => {
    targetConn.shell({ term: 'xterm-256color' }, (err, stream) => {
      if (err) {
        targetConn.end();
        if (jumpClient) jumpClient.end();
        reject(err);
      } else {
        resolve(stream);
      }
    });
  });

  connections.set(id, {
    id,
    config,
    client: targetConn,
    stream: shellStream,
    jumpClient,
  });

  return { id, stream: shellStream };
}

export function getConnection(id: string): SSHConnection | undefined {
  return connections.get(id);
}

export function closeConnection(id: string): boolean {
  const conn = connections.get(id);
  if (conn) {
    try { conn.stream.close(); } catch {}
    try { conn.client.end(); } catch {}
    try { conn.jumpClient?.end(); } catch {}
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
      conn.jumpClient?.end();
    } catch {}
  }
  connections.clear();
}
