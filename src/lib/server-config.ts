import { Server, ServerDetail } from "@/types";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const CONFIG_PATH = join(process.cwd(), "data", "servers.json");

function ensureConfigExists() {
  if (!existsSync(CONFIG_PATH)) {
    writeFileSync(CONFIG_PATH, JSON.stringify([], null, 2));
  }
}

export function getServers(): Server[] {
  ensureConfigExists();
  try {
    const data = readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveServers(servers: Server[]): void {
  ensureConfigExists();
  writeFileSync(CONFIG_PATH, JSON.stringify(servers, null, 2));
}

export function addServer(
  server: Omit<Server, "id" | "status">
): Server {
  const servers = getServers();
  const newServer: Server = {
    ...server,
    id: Math.random().toString(36).substring(2, 9),
    status: "unknown",
  };
  servers.push(newServer);
  saveServers(servers);
  return newServer;
}

export function deleteServer(id: string): boolean {
  const servers = getServers();
  const filteredServers = servers.filter((s) => s.id !== id);
  if (filteredServers.length === servers.length) {
    return false;
  }
  saveServers(filteredServers);
  return true;
}

export function getServerById(id: string): Server | undefined {
  const servers = getServers();
  return servers.find((s) => s.id === id);
}

export function updateServerStatus(
  id: string,
  status: Server["status"]
): void {
  const servers = getServers();
  const server = servers.find((s) => s.id === id);
  if (server) {
    server.status = status;
    server.lastChecked = new Date().toISOString();
    saveServers(servers);
  }
}
