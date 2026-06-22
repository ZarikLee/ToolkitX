import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function checkCertificate(domain: string, port = 443) {
  try {
    const { stdout } = await execAsync(
      `echo | openssl s_client -connect ${domain}:${port} -servername ${domain} 2>/dev/null | openssl x509 -noout -dates -subject -issuer 2>&1`,
      { timeout: 10000 }
    );

    const lines = stdout.split("\n");
    const cert: Record<string, string> = {};

    for (const line of lines) {
      if (line.startsWith("notBefore=")) cert.validFrom = line.split("=")[1];
      if (line.startsWith("notAfter=")) cert.validTo = line.split("=")[1];
      if (line.startsWith("subject="))
        cert.subject = line.split("=").slice(1).join("=");
      if (line.startsWith("issuer="))
        cert.issuer = line.split("=").slice(1).join("=");
    }

    if (!cert.validTo) {
      return { status: "error", error: "Could not parse certificate" };
    }

    const validTo = new Date(cert.validTo);
    const now = new Date();
    const daysLeft = Math.ceil(
      (validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      status: "ok",
      issuer: cert.issuer || "Unknown",
      validFrom: cert.validFrom ? new Date(cert.validFrom) : null,
      validTo,
      daysLeft,
    };
  } catch (error: any) {
    return { status: "error", error: error.message || "Check failed" };
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any = {};
  try {
    body = await request.json();
  } catch {}
  const { id, domain, port } = body;

  if (!id && !domain) {
    return NextResponse.json(
      { error: "Missing required field: id or domain" },
      { status: 400 }
    );
  }

  let certRecord;
  if (id) {
    certRecord = await prisma.certMonitor.findFirst({
      where: { id, userId: user.userId },
    });
    if (!certRecord) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }
  }

  if (domain && !/^[a-zA-Z0-9.-]+$/.test(domain)) {
    return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
  }

  const targetPort = certRecord?.port || port || 443;
  if (targetPort < 1 || targetPort > 65535) {
    return NextResponse.json({ error: "Invalid port" }, { status: 400 });
  }

  const targetDomain = certRecord?.domain || domain;

  const result = await checkCertificate(targetDomain, targetPort);

  if (id) {
    const updateData: any = {
      lastCheck: new Date(),
      lastStatus: result.status,
    };

    if (result.status === "ok") {
      updateData.issuer = result.issuer;
      updateData.validFrom = result.validFrom;
      updateData.validTo = result.validTo;
      updateData.daysLeft = result.daysLeft;
    }

    await prisma.certMonitor.update({
      where: { id },
      data: updateData,
    });
  }

  return NextResponse.json({
    domain: targetDomain,
    port: targetPort,
    ...result,
    checkedAt: Date.now(),
  });
}
