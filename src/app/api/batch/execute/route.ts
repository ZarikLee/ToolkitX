import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { Client } from "ssh2";

interface ServerConfig {
  host: string;
  port?: number;
  username: string;
  password?: string;
  privateKey?: string;
}

function executeOnServer(
  server: ServerConfig,
  command: string,
  timeout = 30000
): Promise<{
  host: string;
  stdout: string;
  stderr: string;
  exitCode: number;
  success: boolean;
  error?: string;
}> {
  return new Promise((resolve) => {
    const conn = new Client();
    const timer = setTimeout(() => {
      conn.end();
      resolve({
        host: server.host,
        stdout: "",
        stderr: "Command timed out",
        exitCode: -1,
        success: false,
        error: "Timeout",
      });
    }, timeout);

    conn.on("ready", () => {
      conn.exec(command, (err, stream) => {
        if (err) {
          clearTimeout(timer);
          conn.end();
          resolve({
            host: server.host,
            stdout: "",
            stderr: err.message,
            exitCode: -1,
            success: false,
            error: err.message,
          });
          return;
        }

        let stdout = "";
        let stderr = "";

        stream.on("data", (data: Buffer) => {
          stdout += data.toString();
        });

        stream.stderr.on("data", (data: Buffer) => {
          stderr += data.toString();
        });

        stream.on("close", (code: number) => {
          clearTimeout(timer);
          conn.end();
          resolve({
            host: server.host,
            stdout,
            stderr,
            exitCode: code,
            success: code === 0,
          });
        });
      });
    });

    conn.on("error", (err) => {
      clearTimeout(timer);
      resolve({
        host: server.host,
        stdout: "",
        stderr: err.message,
        exitCode: -1,
        success: false,
        error: err.message,
      });
    });

    const connectConfig: any = {
      host: server.host,
      port: server.port || 22,
      username: server.username,
    };

    if (server.privateKey) {
      connectConfig.privateKey = server.privateKey;
    } else if (server.password) {
      connectConfig.password = server.password;
    }

    conn.connect(connectConfig);
  });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { servers, command } = body;

  if (!servers || !Array.isArray(servers) || servers.length === 0) {
    return NextResponse.json(
      { error: "Missing required field: servers (non-empty array)" },
      { status: 400 }
    );
  }

  if (!command) {
    return NextResponse.json(
      { error: "Missing required field: command" },
      { status: 400 }
    );
  }

  const results = await Promise.all(
    servers.map((server: ServerConfig) => executeOnServer(server, command))
  );

  return NextResponse.json({
    command,
    results,
    executedAt: Date.now(),
    totalServers: servers.length,
    successCount: results.filter((r) => r.success).length,
    failCount: results.filter((r) => !r.success).length,
  });
}
