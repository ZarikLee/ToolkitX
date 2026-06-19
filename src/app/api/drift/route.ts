import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { readFile } from "fs/promises";
import { createHash } from "crypto";

// GET - list monitored configs with drift status
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const baselines = await prisma.configBaseline.findMany({
    where: { userId: user.userId },
    include: { drifts: { orderBy: { detectedAt: "desc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  const result = baselines.map((b) => ({
    id: b.id,
    filePath: b.filePath,
    fileName: b.fileName,
    hash: b.hash,
    enabled: b.enabled,
    lastCheck: b.lastCheck.getTime(),
    createdAt: b.createdAt.getTime(),
    hasDrift: b.drifts.length > 0 && b.drifts[0].newHash !== b.hash,
    lastDrift: b.drifts.length > 0
      ? { id: b.drifts[0].id, detectedAt: b.drifts[0].detectedAt.getTime() }
      : null,
  }));

  return NextResponse.json({ baselines: result });
}

// POST - add config file to monitor
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { filePath, fileName } = body;

  if (!filePath) {
    return NextResponse.json({ error: "Missing filePath" }, { status: 400 });
  }

  try {
    const content = await readFile(filePath, "utf-8");
    const hash = createHash("sha256").update(content).digest("hex");

    const baseline = await prisma.configBaseline.create({
      data: {
        userId: user.userId,
        filePath,
        fileName: fileName || filePath.split("/").pop() || filePath,
        hash,
        content,
      },
    });

    return NextResponse.json({
      id: baseline.id,
      filePath: baseline.filePath,
      fileName: baseline.fileName,
      hash: baseline.hash,
      enabled: baseline.enabled,
      createdAt: baseline.createdAt.getTime(),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE - remove config from monitoring
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

  await prisma.configBaseline.deleteMany({ where: { id, userId: user.userId } });

  return NextResponse.json({ success: true });
}
