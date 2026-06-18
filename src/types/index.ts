export interface Container {
  id: string;
  name: string;
  image: string;
  status: "running" | "stopped" | "paused" | "created" | "removing";
  state: string;
  created: string;
  ports: string[];
}

export interface ContainerDetail extends Container {
  env: string[];
  mounts: { source: string; destination: string; mode: string }[];
  networkMode: string;
  restartCount: number;
}

export interface Server {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKey?: string;
  status: "online" | "offline" | "unknown";
  lastChecked?: string;
}

export interface ServerDetail extends Server {
  cpu: {
    model: string;
    cores: number;
    usage: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
  };
  disk: {
    total: number;
    used: number;
    free: number;
    mountpoint: string;
  }[];
  uptime: number;
  hostname: string;
  os: string;
}

export interface DatabaseConnection {
  id: string;
  name: string;
  type: "mysql" | "postgresql";
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  affectedRows?: number;
  error?: string;
}

export interface ApiRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  body: string;
  bodyType: "json" | "text" | "form";
}

export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  time: number;
  size: number;
}

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  raw: string;
}

export interface MonitorStats {
  cpu: { usage: number; cores: number; model: string };
  memory: { total: number; used: number; free: number; percent: number };
  disk: { fs: string; size: string; used: string; avail: string; usePercent: string; mountpoint: string }[];
  uptime: string;
  hostname: string;
  os: string;
  load: number[];
  processes: { pid: string; user: string; cpu: string; mem: string; command: string }[];
  network: { iface: string; rxBytes: number; txBytes: number }[];
}
