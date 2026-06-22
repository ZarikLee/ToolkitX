import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

function cleanTarget(raw: string): string {
  let t = raw.trim();
  t = t.replace(/^https?:\/\//i, "");
  t = t.replace(/\/+$/, "");
  t = t.replace(/:\d+$/, "");
  return t;
}

async function runCommand(cmd: string, timeout = 10000): Promise<string> {
  try {
    const { stdout } = await execAsync(cmd, { timeout });
    return stdout.trim();
  } catch (e: any) {
    return e.stderr || e.message || "Command failed";
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { type, target: rawTarget, options } = body;

  if (!rawTarget || /[;&|`$(){}<>!\\]/.test(rawTarget) || rawTarget.trim().length === 0) {
    return NextResponse.json({ error: "Invalid target" }, { status: 400 });
  }

  if (!type) {
    return NextResponse.json({ error: "Missing type" }, { status: 400 });
  }

  const target = cleanTarget(rawTarget);
  let result: any = {};

  switch (type) {
    case "port": {
      const ports = options?.ports || [22, 80, 443];
      if (!Array.isArray(ports) || !ports.every((p: any) => Number.isInteger(p) && p >= 1 && p <= 65535)) {
        return NextResponse.json({ error: "Invalid port(s)" }, { status: 400 });
      }
      const portResults = [];
      for (const port of ports) {
        let status = "closed";
        try {
          const { stdout } = await execAsync(
            `timeout 3 bash -c "echo > /dev/tcp/${target}/${port}" 2>&1 && echo "open" || echo "closed"`,
            { timeout: 5000 }
          );
          status = stdout.includes("open") ? "open" : "closed";
        } catch {
          status = "closed";
        }
        portResults.push({ port, status });
      }
      result = { ports: portResults };
      break;
    }

    case "dns": {
      const recordType = options?.recordType || "A";
      let out = "";
      try {
        const { stdout } = await execAsync(`dig +short ${target} ${recordType} 2>&1`, { timeout: 10000 });
        out = stdout;
      } catch {
        try {
          const { stdout } = await execAsync(`getent hosts ${target} 2>&1`, { timeout: 5000 });
          out = stdout;
        } catch {
          try {
            const { stdout } = await execAsync(`nslookup ${target} 2>&1`, { timeout: 5000 });
            out = stdout;
          } catch {
            out = "DNS lookup failed";
          }
        }
      }
      const records = out.split("\n").filter((r) => r.trim() && !r.startsWith(";") && !r.startsWith(";;"));
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
      const url = rawTarget.startsWith("http") ? rawTarget : `https://${target}`;
      const start = Date.now();
      try {
        const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(8000) });
        const latency = Date.now() - start;
        const text = await res.text();
        result = {
          status: res.status,
          statusText: res.statusText,
          latency,
          headers: Object.fromEntries(res.headers.entries()),
          size: text.length,
        };
      } catch (e: any) {
        result = { error: e.message, latency: Date.now() - start };
      }
      break;
    }

    case "trace": {
      let out = "";
      try {
        const r = await execAsync(`traceroute -m 15 -w 2 ${target} 2>&1`, { timeout: 20000 });
        out = r.stdout;
      } catch {
        try {
          const r = await execAsync(`ping -c 3 -W 2 ${target} 2>&1`, { timeout: 10000 });
          out = r.stdout;
        } catch (e: any) {
          out = e.stderr || e.message || "traceroute/ping not available on this server";
        }
      }
      const hops = out.split("\n").slice(1).map((line) => {
        const parts = line.trim().split(/\s+/);
        return {
          hop: parts[0],
          host: parts[1] || "*",
          times: parts.slice(2).filter((p) => p !== "*"),
        };
      });
      result = { hops, raw: out };
      break;
    }

    case "ping": {
      const count = options?.count || 10;
      if (!Number.isInteger(count) || count < 1 || count > 30) {
        return NextResponse.json({ error: "Invalid count" }, { status: 400 });
      }
      let out = "";
      try {
        const { stdout } = await execAsync(`ping -c ${count} ${target} 2>&1`, { timeout: 15000 });
        out = stdout;
      } catch (e: any) {
        out = e.stderr || e.message || "ping failed";
      }
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
