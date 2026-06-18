import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { readFile } from "fs/promises";
import { createHash } from "crypto";

// POST - trigger drift check for a config (or all enabled configs)
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { baselineId } = body;

  const where = baselineId
    ? { id: baselineId, userId: user.userId }
    : { userId: user.userId, enabled: true };

  const baselines = await prisma.configBaseline.findMany({ where });
  const results = [];

  for (const baseline of baselines) {
    try {
      const content = await readFile(baseline.filePath, "utf-8");
      const newHash = createHash("sha256").update(content).digest("hex");

      // Update last check time
      await prisma.configBaseline.update({
        where: { id: baseline.id },
        data: { lastCheck: new Date() },
      });

      if (newHash !== baseline.hash) {
        // Drift detected - record it
        const drift = await prisma.configDrift.create({
          data: {
            baselineId: baseline.id,
            oldHash: baseline.hash,
            newHash,
            oldContent: baseline.content,
            newContent: content,
          },
        });

        // Update baseline to new content
        await prisma.configBaseline.update({
          where: { id: baseline.id },
          data: { hash: newHash, content },
        });

        // Create alert event
        await prisma.alertEvent.create({
          data: {
            userId: user.userId,
            type: "config_drift",
            severity: "warning",
            title: `配置漂移: ${baseline.fileName}`,
            message: `文件 ${baseline.filePath} 内容已变更`,
            metadata: JSON.stringify({ baselineId: baseline.id, driftId: drift.id }),
          },
        });

        results.push({
          id: baseline.id,
          fileName: baseline.fileName,
          drifted: true,
          driftId: drift.id,
        });
      } else {
        results.push({
          id: baseline.id,
          fileName: baseline.fileName,
          drifted: false,
        });
      }
    } catch (e: any) {
      results.push({
        id: baseline.id,
        fileName: baseline.fileName,
        error: e.message,
      });
    }
  }

  return NextResponse.json({ results });
}
