import { DatabaseConnection } from "@/types";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const CONFIG_PATH = join(process.cwd(), "data", "databases.json");

function ensureConfigExists() {
  if (!existsSync(CONFIG_PATH)) {
    writeFileSync(CONFIG_PATH, JSON.stringify([], null, 2));
  }
}

export function getDatabaseConnections(): DatabaseConnection[] {
  ensureConfigExists();
  try {
    const data = readFileSync(CONFIG_PATH, "utf-8");
    const connections = JSON.parse(data);
    return connections.map((conn: DatabaseConnection) => ({
      ...conn,
      password: "***",
    }));
  } catch {
    return [];
  }
}

export function getDatabaseConnectionWithPassword(
  id: string
): DatabaseConnection | undefined {
  ensureConfigExists();
  try {
    const data = readFileSync(CONFIG_PATH, "utf-8");
    const connections: DatabaseConnection[] = JSON.parse(data);
    return connections.find((conn) => conn.id === id);
  } catch {
    return undefined;
  }
}

export function saveDatabaseConnections(
  connections: DatabaseConnection[]
): void {
  ensureConfigExists();
  writeFileSync(CONFIG_PATH, JSON.stringify(connections, null, 2));
}

export function addDatabaseConnection(
  connection: Omit<DatabaseConnection, "id">
): DatabaseConnection {
  const connections = JSON.parse(
    readFileSync(CONFIG_PATH, "utf-8") || "[]"
  );
  const newConnection: DatabaseConnection = {
    ...connection,
    id: Math.random().toString(36).substring(2, 9),
  };
  connections.push(newConnection);
  saveDatabaseConnections(connections);
  return { ...newConnection, password: "***" };
}

export function deleteDatabaseConnection(id: string): boolean {
  const connections = JSON.parse(
    readFileSync(CONFIG_PATH, "utf-8") || "[]"
  );
  const filteredConnections = connections.filter(
    (conn: DatabaseConnection) => conn.id !== id
  );
  if (filteredConnections.length === connections.length) {
    return false;
  }
  saveDatabaseConnections(filteredConnections);
  return true;
}
