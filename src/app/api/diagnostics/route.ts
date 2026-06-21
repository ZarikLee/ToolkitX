import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { getCurrentUser } from "@/lib/auth-server";

const execAsync = promisify(exec);

async function runCommand(cmd: string, timeout = 10000): Promise<string> {
  try {
    const { stdout } = await execAsync(cmd, { timeout });
    return stdout.trim();
  } catch (e: any) {
    return e.stderr || e.message || "Command failed";
  }
}

// POST - Run a diagnostic
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { type, target, options } = body;

  if (!target || !/^[a-zA-Z0-9._:\-\/\?=&%+@#~]+$/.test(target)) {
    return NextResponse.json({ error: "Invalid target" }, { status: 400 });
  }

  if (!type) {
    return NextResponse.json({ error: "Missing type" }, { status: 400 });
  }

  let result: any = {};

  switch (type) {
    case "port": {
      const ports = options?.ports || [22, 80, 443];
      if (!Array.isArray(ports) || !ports.every((p: any) => Number.isInteger(p) && p >= 1 && p <= 65535)) {
        return NextResponse.json({ error: "Invalid port(s)" }, { status: 400 });
      }
      const portResults = [];
      for (const port of ports) {
        const out = await runCommand(`nc -z -w 2 ${target} ${port} 2>&1 && echo "open" || echo "closed"`);
        portResults.push({
          port,
          status: out.includes("open") ? "open" : "closed",
        });
      }
      result = { ports: portResults };
      break;
    }

    case "dns": {
      const recordType = options?.recordType || "A";
      const out = await runCommand(`dig +short ${target} ${recordType} 2>&1`);
      const records = out.split("\n").filter((r) => r.trim());
      result = { records, type: recordType };
      break;
    }

    case "ssl": {
      const out = await runCommand(
        `echo | openssl s_client -connect ${target}:443 -servername ${target} 2>/dev/null | openssl x509 -noout -dates -subject -issuer 2>&1`
      );
      const lines = out.split("\n");
      const cert: Record<string, string> = {};
      for (const line of lines) {
        if (line.startsWith("notBefore=")) cert.validFrom = line.split("=")[1];
        if (line.startsWith("notAfter=")) cert.validTo = line.split("=")[1];
        if (line.startsWith("subject=")) cert.subject = line.split("=").slice(1).join("=");
        if (line.startsWith("issuer=")) cert.issuer = line.split("=").slice(1).join("=");
      }
      result = { certificate: cert };
      break;
    }

    case "http": {
      const url = target.startsWith("http") ? target : `https://${target}`;
      const start = Date.now();
      try {
        const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(8000) });
        const latency = Date.now() - start;
        result = {
          status: res.status,
          statusText: res.statusText,
          latency,
          headers: Object.fromEntries(res.headers.entries()),
        };
      } catch (e: any) {
        result = { error: e.message, latency: Date.now() - start };
      }
      break;
    }

    case "trace": {
      const out = await runCommand(`traceroute -m 15 -w 2 ${target} 2>&1`, 20000);
      const hops = out.split("\n").slice(1).map((line) => {
        const parts = line.trim().split(/\s+/);
        return {
          hop: parts[0],
          host: parts[1] || "*",
          times: parts.slice(2).filter((p) => p !== "*"),
        };
      });
      result = { hops };
      break;
    }

    case "ping": {
      const count = options?.count || 10;
      if (!Number.isInteger(count) || count < 1 || count > 30) {
        return NextResponse.json({ error: "Invalid count" }, { status: 400 });
      }
      const out = await runCommand(`ping -c ${count} ${target} 2>&1`, 15000);
      const statsMatch = out.match(/rtt min\/avg\/max\/mdev = ([\d.]+)\/([\d.]+)\/([\d.]+)\/([\d.]+)/);
      const lossMatch = out.match(/(\d+)% packet loss/);
      result = {
        stats: statsMatch
          ? { min: statsMatch[1], avg: statsMatch[2], max: statsMatch[3], mdev: statsMatch[4] }
          : null,
        packetLoss: lossMatch ? lossMatch[1] + "%" : "unknown",
        raw: out,
      };
      break;
    }

    default:
      return NextResponse.json({ error: `Unknown diagnostic type: ${type}` }, { status: 400 });
  }

  return NextResponse.json({ type, target, result, timestamp: Date.now() });
}
