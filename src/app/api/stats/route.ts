import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ensureTable = async () => {
  await prisma.$executeRawUnsafe(
    "CREATE TABLE IF NOT EXISTS SiteStats (id VARCHAR(191) NOT NULL, visits INT DEFAULT 0, createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), updatedAt DATETIME(3) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
  );
};

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT visits FROM SiteStats WHERE id = 'stats'` as any[];
    return NextResponse.json({ visits: Number(result?.[0]?.visits ?? 0) });
  } catch {
    return NextResponse.json({ visits: 0 });
  }
}

export async function POST() {
  try {
    await ensureTable();
    const stats = await prisma.siteStats.upsert({
      where: { id: "stats" },
      update: { visits: { increment: 1 } },
      create: { id: "stats", visits: 1 },
    });
    return NextResponse.json({ visits: stats.visits });
  } catch (e: any) {
    try {
      await prisma.$executeRawUnsafe(
        "INSERT INTO SiteStats (id, visits, createdAt, updatedAt) VALUES ('stats', 1, NOW(3), NOW(3)) ON DUPLICATE KEY UPDATE visits = visits + 1, updatedAt = NOW(3)"
      );
      const result = await prisma.$queryRawUnsafe("SELECT visits FROM SiteStats WHERE id = 'stats'") as any[];
      return NextResponse.json({ visits: Number(result?.[0]?.visits ?? 0) });
    } catch {
      return NextResponse.json({ visits: 0 });
    }
  }
}
