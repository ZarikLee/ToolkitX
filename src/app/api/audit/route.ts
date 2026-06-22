import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const resource = searchParams.get("resource");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const limit = parseInt(searchParams.get("limit") || "100", 10);

  const where: any = { userId: user.userId };

  if (action) {
    where.action = action;
  }

  if (resource) {
    where.resource = { contains: resource };
  }

  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) {
      where.createdAt.gte = new Date(startDate);
    }
    if (endDate) {
      where.createdAt.lte = new Date(endDate);
    }
  }

  const logs = await prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: Math.min(limit, 1000),
  });

  return NextResponse.json(
    logs.map((l) => ({
      id: l.id,
      userId: l.userId,
      action: l.action,
      resource: l.resource,
      detail: l.detail || null,
      ip: l.ip || null,
      createdAt: l.createdAt.getTime(),
    }))
  );
}
