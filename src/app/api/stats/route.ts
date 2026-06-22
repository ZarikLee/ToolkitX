import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT visits FROM SiteStats WHERE id = 'stats'` as any[];
    const visits = result?.[0]?.visits ?? 0;
    return NextResponse.json({ visits: Number(visits) });
  } catch (error: any) {
    console.error("[Stats GET error]", error?.message || error);
    return NextResponse.json({ visits: 0, error: error?.message });
  }
}

export async function POST() {
  const errors: string[] = [];
  // Method 1: Prisma upsert
  try {
    const stats = await prisma.siteStats.upsert({
      where: { id: "stats" },
      update: { visits: { increment: 1 } },
      create: { id: "stats", visits: 1 },
    });
    return NextResponse.json({ visits: stats.visits, method: "prisma" });
  } catch (e: any) {
    errors.push("prisma:" + (e?.message || "unknown"));
  }

  // Method 2: Raw SQL upsert
  try {
    await prisma.$executeRawUnsafe(
      "INSERT INTO SiteStats (id, visits, createdAt, updatedAt) VALUES ('stats', 1, NOW(3), NOW(3)) ON DUPLICATE KEY UPDATE visits = visits + 1, updatedAt = NOW(3)"
    );
    const result = await prisma.$queryRawUnsafe("SELECT visits FROM SiteStats WHERE id = 'stats'") as any[];
    return NextResponse.json({ visits: Number(result?.[0]?.visits ?? 0), method: "raw_sql" });
  } catch (e: any) {
    errors.push("raw_sql:" + (e?.message || "unknown"));
  }

  // Method 3: Create table then upsert
  try {
    await prisma.$executeRawUnsafe(
      "CREATE TABLE IF NOT EXISTS SiteStats (id VARCHAR(191) NOT NULL, visits INT DEFAULT 0, createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), updatedAt DATETIME(3) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    );
    await prisma.$executeRawUnsafe(
      "INSERT INTO SiteStats (id, visits, createdAt, updatedAt) VALUES ('stats', 1, NOW(3), NOW(3)) ON DUPLICATE KEY UPDATE visits = visits + 1, updatedAt = NOW(3)"
    );
    const result = await prisma.$queryRawUnsafe("SELECT visits FROM SiteStats WHERE id = 'stats'") as any[];
    return NextResponse.json({ visits: Number(result?.[0]?.visits ?? 0), method: "create_table" });
  } catch (e: any) {
    errors.push("create_table:" + (e?.message || "unknown"));
  }

  console.error("[Stats POST] All methods failed:", errors);
  return NextResponse.json({ visits: 0, errors });
}
