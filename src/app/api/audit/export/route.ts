import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const resource = searchParams.get("resource");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const where: any = { userId: "default" };

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
  });

  const header = "ID,Action,Resource,Detail,IP,Created At";
  const rows = logs.map((l) => {
    const detail = l.detail ? `"${l.detail.replace(/"/g, '""')}"` : "";
    const ip = l.ip || "";
    const createdAt = l.createdAt.toISOString();
    return `${l.id},${l.action},${l.resource},${detail},${ip},${createdAt}`;
  });

  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="audit-logs-${Date.now()}.csv"`,
    },
  });
}
