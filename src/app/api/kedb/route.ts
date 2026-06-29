import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const severity = searchParams.get("severity");
  const tag = searchParams.get("tag");

  const where: any = { userId: "default" };

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { symptom: { contains: search } },
      { cause: { contains: search } },
      { solution: { contains: search } },
    ];
  }

  if (severity) {
    where.severity = severity;
  }

  if (tag) {
    where.tags = { contains: tag };
  }

  const entries = await prisma.knowledgeEntry.findMany({
    where,
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(
    entries.map((e) => ({
      id: e.id,
      title: e.title,
      symptom: e.symptom,
      cause: e.cause,
      solution: e.solution,
      tags: JSON.parse(e.tags),
      severity: e.severity,
      usageCount: e.usageCount,
      createdAt: e.createdAt.getTime(),
      updatedAt: e.updatedAt.getTime(),
    }))
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, symptom, cause, solution, tags, severity } = body;

  if (!title || !symptom || !cause || !solution) {
    return NextResponse.json(
      { error: "Missing required fields: title, symptom, cause, solution" },
      { status: 400 }
    );
  }

  const entry = await prisma.knowledgeEntry.create({
    data: {
      userId: "default",
      title,
      symptom,
      cause,
      solution,
      tags: JSON.stringify(tags || []),
      severity: severity || "medium",
    },
  });

  return NextResponse.json({
    id: entry.id,
    title: entry.title,
    symptom: entry.symptom,
    cause: entry.cause,
    solution: entry.solution,
    tags: JSON.parse(entry.tags),
    severity: entry.severity,
    usageCount: entry.usageCount,
    createdAt: entry.createdAt.getTime(),
    updatedAt: entry.updatedAt.getTime(),
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, tags, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const updateData: any = { ...updates };
  if (tags !== undefined) {
    updateData.tags = JSON.stringify(tags);
  }

  const entry = await prisma.knowledgeEntry.update({
    where: { id, userId: "default" },
    data: updateData,
  });

  return NextResponse.json({
    id: entry.id,
    title: entry.title,
    symptom: entry.symptom,
    cause: entry.cause,
    solution: entry.solution,
    tags: JSON.parse(entry.tags),
    severity: entry.severity,
    usageCount: entry.usageCount,
    createdAt: entry.createdAt.getTime(),
    updatedAt: entry.updatedAt.getTime(),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.knowledgeEntry.deleteMany({
    where: { id, userId: "default" },
  });

  return NextResponse.json({ success: true });
}
