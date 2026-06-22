import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT visits FROM SiteStats WHERE id = 'stats'` as any[];
    const visits = result?.[0]?.visits ?? 0;
    return NextResponse.json({ visits: Number(visits) });
  } catch (error) {
    console.error("[Stats GET]", error);
    return NextResponse.json({ visits: 0 });
  }
}

export async function POST() {
  try {
    // Try upsert first
    try {
      const stats = await prisma.siteStats.upsert({
        where: { id: "stats" },
        update: { visits: { increment: 1 } },
        create: { id: "stats", visits: 1 },
      });
      return NextResponse.json({ visits: stats.visits });
    } catch {
      // Fallback to raw SQL
      await prisma.$executeRaw`INSERT INTO SiteStats (id, visits, createdAt, updatedAt) VALUES ('stats', 1, NOW(3), NOW(3)) ON DUPLICATE KEY UPDATE visits = visits + 1, updatedAt = NOW(3)`;
      const result = await prisma.$queryRaw`SELECT visits FROM SiteStats WHERE id = 'stats'` as any[];
      const visits = result?.[0]?.visits ?? 0;
      return NextResponse.json({ visits: Number(visits) });
    }
  } catch (error) {
    console.error("[Stats POST]", error);
    return NextResponse.json({ visits: 0 });
  }
}
