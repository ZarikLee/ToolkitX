import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - get drift history for a config
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const baselineId = searchParams.get("baselineId");

  if (!baselineId) {
    return NextResponse.json({ error: "Missing baselineId" }, { status: 400 });
  }

  // Verify ownership
  const baseline = await prisma.configBaseline.findFirst({
    where: { id: baselineId, userId: "default" },
  });

  if (!baseline) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const drifts = await prisma.configDrift.findMany({
    where: { baselineId },
    orderBy: { detectedAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    drifts: drifts.map((d) => ({
      id: d.id,
      oldHash: d.oldHash,
      newHash: d.newHash,
      oldContent: d.oldContent,
      newContent: d.newContent,
      detectedAt: d.detectedAt.getTime(),
    })),
  });
}
