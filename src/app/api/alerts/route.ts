import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

// GET - list alerts with filters
export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status"); // active, acknowledged, resolved
  const severity = searchParams.get("severity");
  const limit = parseInt(searchParams.get("limit") || "50");

  const where: any = { userId: user.userId };
  if (status === "active") where.resolved = false;
  if (status === "resolved") where.resolved = true;
  if (severity) where.severity = severity;

  const alerts = await prisma.alertEvent.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json({
    alerts: alerts.map((a) => ({
      id: a.id,
      type: a.type,
      severity: a.severity,
      title: a.title,
      message: a.message,
      resolved: a.resolved,
      metadata: a.metadata ? JSON.parse(a.metadata) : null,
      createdAt: a.createdAt.getTime(),
    })),
  });
}

// POST - create manual alert
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { type, severity, title, message } = body;

  const alert = await prisma.alertEvent.create({
    data: {
      userId: user.userId,
      type: type || "manual",
      severity: severity || "info",
      title,
      message,
    },
  });

  return NextResponse.json({
    id: alert.id,
    type: alert.type,
    severity: alert.severity,
    title: alert.title,
    message: alert.message,
    resolved: alert.resolved,
    createdAt: alert.createdAt.getTime(),
  });
}

// PUT - acknowledge/resolve alert
export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, resolved } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const alert = await prisma.alertEvent.update({
    where: { id },
    data: { resolved: resolved ?? true },
  });

  return NextResponse.json({ success: true, id: alert.id });
}

// DELETE - delete alert
export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.alertEvent.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
