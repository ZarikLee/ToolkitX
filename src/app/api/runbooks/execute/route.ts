import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Client } from "ssh2";

interface SSHServer {
  host: string;
  port?: number;
  username: string;
  password?: string;
  privateKey?: string;
}

interface RunbookStep {
  id: string;
  type: string;
  content: string;
  description?: string;
  order?: number;
}

function executeCommand(
  server: SSHServer,
  command: string,
  timeout = 30000
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    const timer = setTimeout(() => {
      conn.end();
      reject(new Error("Command timed out"));
    }, timeout);

    conn.on("ready", () => {
      conn.exec(command, (err, stream) => {
        if (err) {
          clearTimeout(timer);
          conn.end();
          reject(err);
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
          resolve({ stdout, stderr, exitCode: code });
        });
      });
    });

    conn.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
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
  const body = await request.json();
  const { runbookId, servers, stepIds } = body;

  if (!runbookId || !servers || !Array.isArray(servers) || servers.length === 0) {
    return NextResponse.json(
      { error: "Missing required fields: runbookId, servers" },
      { status: 400 }
    );
  }

  const runbook = await prisma.runbook.findFirst({
    where: { id: runbookId, userId: "default" },
  });

  if (!runbook) {
    return NextResponse.json({ error: "Runbook not found" }, { status: 404 });
  }

  const allSteps: RunbookStep[] = JSON.parse(runbook.steps);
  const stepsToExecute = (stepIds
    ? allSteps.filter((s) => stepIds.includes(s.id))
    : allSteps
  ).map((s, i) => ({ ...s, order: s.order ?? i }));

  stepsToExecute.sort((a, b) => a.order - b.order);

  const results: Array<{
    server: { host: string; username: string };
    steps: Array<{
      stepId: string;
      command: string;
      stdout: string;
      stderr: string;
      exitCode: number;
      success: boolean;
    }>;
  }> = [];

  for (const server of servers) {
    const serverResult: (typeof results)[0] = {
      server: { host: server.host, username: server.username },
      steps: [],
    };

    for (const step of stepsToExecute) {
      try {
        const { stdout, stderr, exitCode } = await executeCommand(
          server,
          step.content
        );
        serverResult.steps.push({
          stepId: step.id,
          command: step.content,
          stdout,
          stderr,
          exitCode,
          success: exitCode === 0,
        });
      } catch (error: any) {
        serverResult.steps.push({
          stepId: step.id,
          command: step.content,
          stdout: "",
          stderr: error.message || "Execution failed",
          exitCode: -1,
          success: false,
        });
      }
    }

    results.push(serverResult);
  }

  await prisma.auditLog.create({
    data: {
      userId: "default",
      action: "runbook.execute",
      resource: `runbook:${runbookId}`,
      detail: JSON.stringify({
        runbookId,
        serverCount: servers.length,
        stepCount: stepsToExecute.length,
      }),
    },
  });

  return NextResponse.json({
    runbookId,
    results,
    executedAt: Date.now(),
  });
}
