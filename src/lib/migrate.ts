"use client";

const MIGRATION_KEY = "toolkitx_migrated";

export async function migrateLocalStorageToDB(): Promise<void> {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(MIGRATION_KEY)) return;

  try {
    // Check if logged in
    const meRes = await fetch("/api/auth/me");
    if (!meRes.ok) return;

    // Migrate servers
    const serversRaw = localStorage.getItem("quick_servers");
    if (serversRaw) {
      const servers = JSON.parse(serversRaw);
      for (const server of servers) {
        try {
          await fetch("/api/servers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: server.name,
              host: server.host,
              port: server.port,
              username: server.username,
              password: server.password,
              privateKey: server.privateKey,
            }),
          });
        } catch {}
      }
    }

    // Migrate settings
    const settingsRaw = localStorage.getItem("toolkitx_settings");
    if (settingsRaw) {
      const settings = JSON.parse(settingsRaw);
      try {
        await fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        });
      } catch {}
    }

    // Migrate theme
    const theme = localStorage.getItem("theme");
    if (theme) {
      try {
        await fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme }),
        });
      } catch {}
    }

    // Migrate API history
    const apiHistoryRaw = localStorage.getItem("api_test_history");
    if (apiHistoryRaw) {
      const history = JSON.parse(apiHistoryRaw);
      for (const entry of history) {
        try {
          await fetch("/api/api-history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: entry.name,
              method: entry.method,
              url: entry.url,
              headers: entry.headers,
              body: entry.body,
              status: entry.status,
              time: entry.time,
            }),
          });
        } catch {}
      }
    }

    // Migrate command history
    const cmdHistoryRaw = localStorage.getItem("command_history");
    if (cmdHistoryRaw) {
      const history = JSON.parse(cmdHistoryRaw);
      for (const entry of history) {
        try {
          await fetch("/api/command-history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              command: entry.command,
              output: entry.output,
            }),
          });
        } catch {}
      }
    }

    // Migrate session snapshots
    const snapshotsRaw = localStorage.getItem("session_snapshots");
    if (snapshotsRaw) {
      const snapshots = JSON.parse(snapshotsRaw);
      for (const snap of snapshots) {
        try {
          await fetch("/api/snapshots", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: snap.name,
              serverId: snap.serverId,
              serverName: snap.serverName,
              commands: snap.commands,
            }),
          });
        } catch {}
      }
    }

    localStorage.setItem(MIGRATION_KEY, "1");
  } catch {
    // Migration failed, will retry next time
  }
}
