import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

// GET - list alert rules
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rules = await prisma.alertRule.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    rules: rules.map((r) => ({
      id: r.id,
      name: r.name,
      type: r.type,
      condition: r.condition,
      threshold: r.threshold,
      severity: r.severity,
      enabled: r.enabled,
      cooldown: r.cooldown,
      lastFired: r.lastFired?.getTime() || null,
      createdAt: r.createdAt.getTime(),
    })),
  });
}

// POST - create alert rule
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, type, condition, threshold, severity, cooldown } = body;

  if (!name || !type || !condition || threshold === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const rule = await prisma.alertRule.create({
    data: {
      userId: user.userId,
      name,
      type,
      condition,
      threshold,
      severity: severity || "warning",
      cooldown: cooldown || 300,
    },
  });

  return NextResponse.json({
    id: rule.id,
    name: rule.name,
    type: rule.type,
    condition: rule.condition,
    threshold: rule.threshold,
    severity: rule.severity,
    enabled: rule.enabled,
    cooldown: rule.cooldown,
    createdAt: rule.createdAt.getTime(),
  });
}

// PUT - update alert rule
export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const rule = await prisma.alertRule.update({
    where: { id, userId: user.userId },
    data: updates,
  });

  return NextResponse.json({
    id: rule.id,
    name: rule.name,
    type: rule.type,
    condition: rule.condition,
    threshold: rule.threshold,
    severity: rule.severity,
    enabled: rule.enabled,
    cooldown: rule.cooldown,
    createdAt: rule.createdAt.getTime(),
  });
}

// DELETE - delete alert rule
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

  const existing = await prisma.alertRule.findFirst({
    where: { id, userId: user.userId },
  });
  if (!existing) {
    return NextResponse.json({ error: "Rule not found" }, { status: 404 });
  }
  await prisma.alertRule.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
