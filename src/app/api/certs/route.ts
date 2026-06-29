import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const certs = await prisma.certMonitor.findMany({
    where: { userId: "default" },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    certs.map((c) => ({
      id: c.id,
      domain: c.domain,
      port: c.port,
      label: c.label,
      lastCheck: c.lastCheck?.getTime() || null,
      lastStatus: c.lastStatus,
      issuer: c.issuer,
      validFrom: c.validFrom?.getTime() || null,
      validTo: c.validTo?.getTime() || null,
      daysLeft: c.daysLeft,
      enabled: c.enabled,
      createdAt: c.createdAt.getTime(),
    }))
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const { domain, port, label } = body;

  if (!domain) {
    return NextResponse.json(
      { error: "Missing required field: domain" },
      { status: 400 }
    );
  }

  const existing = await prisma.certMonitor.findFirst({
    where: { userId: "default", domain, port: port || 443 },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Certificate monitor already exists for this domain" },
      { status: 409 }
    );
  }

  const cert = await prisma.certMonitor.create({
    data: {
      userId: "default",
      domain,
      port: port || 443,
      label: label || null,
    },
  });

  return NextResponse.json({
    id: cert.id,
    domain: cert.domain,
    port: cert.port,
    label: cert.label,
    lastCheck: null,
    lastStatus: null,
    issuer: null,
    validFrom: null,
    validTo: null,
    daysLeft: null,
    enabled: cert.enabled,
    createdAt: cert.createdAt.getTime(),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.certMonitor.deleteMany({
    where: { id, userId: "default" },
  });

  return NextResponse.json({ success: true });
}
