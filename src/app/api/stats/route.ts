import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const stats = await prisma.siteStats.findUnique({
    where: { id: "stats" },
  });

  return NextResponse.json({ visits: stats?.visits ?? 0 });
}

export async function POST() {
  const stats = await prisma.siteStats.upsert({
    where: { id: "stats" },
    update: { visits: { increment: 1 } },
    create: { id: "stats", visits: 1 },
  });

  return NextResponse.json({ visits: stats.visits });
}
