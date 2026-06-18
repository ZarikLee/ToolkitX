import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const runbooks = await prisma.runbook.findMany({
    where: { userId: user.userId },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(
    runbooks.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      triggerType: r.triggerType,
      triggerConfig: JSON.parse(r.triggerConfig),
      steps: JSON.parse(r.steps),
      enabled: r.enabled,
      createdAt: r.createdAt.getTime(),
      updatedAt: r.updatedAt.getTime(),
    }))
  );
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, triggerType, triggerConfig, steps } = body;

  if (!title || !triggerType) {
    return NextResponse.json(
      { error: "Missing required fields: title, triggerType" },
      { status: 400 }
    );
  }

  const runbook = await prisma.runbook.create({
    data: {
      userId: user.userId,
      title,
      description: description || null,
      triggerType,
      triggerConfig: JSON.stringify(triggerConfig || {}),
      steps: JSON.stringify(steps || []),
    },
  });

  return NextResponse.json({
    id: runbook.id,
    title: runbook.title,
    description: runbook.description,
    triggerType: runbook.triggerType,
    triggerConfig: JSON.parse(runbook.triggerConfig),
    steps: JSON.parse(runbook.steps),
    enabled: runbook.enabled,
    createdAt: runbook.createdAt.getTime(),
    updatedAt: runbook.updatedAt.getTime(),
  });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, triggerConfig, steps, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const updateData: any = { ...updates };
  if (triggerConfig !== undefined) {
    updateData.triggerConfig = JSON.stringify(triggerConfig);
  }
  if (steps !== undefined) {
    updateData.steps = JSON.stringify(steps);
  }

  const runbook = await prisma.runbook.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json({
    id: runbook.id,
    title: runbook.title,
    description: runbook.description,
    triggerType: runbook.triggerType,
    triggerConfig: JSON.parse(runbook.triggerConfig),
    steps: JSON.parse(runbook.steps),
    enabled: runbook.enabled,
    createdAt: runbook.createdAt.getTime(),
    updatedAt: runbook.updatedAt.getTime(),
  });
}

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

  await prisma.runbook.deleteMany({
    where: { id, userId: user.userId },
  });

  return NextResponse.json({ success: true });
}
