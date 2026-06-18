import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const history = await prisma.apiHistory.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(
    history.map((h) => ({
      id: h.id,
      name: h.name,
      method: h.method,
      url: h.url,
      headers: JSON.parse(h.headers || "[]"),
      body: h.body || "",
      status: h.status,
      time: h.time,
      timestamp: h.createdAt.getTime(),
    }))
  );
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, method, url, headers, body: reqBody, status, time } = body;

  if (!name || !method || !url) {
    return NextResponse.json(
      { error: "Missing required fields: name, method, url" },
      { status: 400 }
    );
  }

  const entry = await prisma.apiHistory.create({
    data: {
      userId: user.userId,
      name,
      method,
      url,
      headers: JSON.stringify(headers || []),
      body: reqBody || null,
      status: status || null,
      time: time || null,
    },
  });

  return NextResponse.json({
    id: entry.id,
    name: entry.name,
    method: entry.method,
    url: entry.url,
    headers: JSON.parse(entry.headers || "[]"),
    body: entry.body || "",
    status: entry.status,
    time: entry.time,
    timestamp: entry.createdAt.getTime(),
  });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    await prisma.apiHistory.deleteMany({
      where: { id, userId: user.userId },
    });
  } else {
    await prisma.apiHistory.deleteMany({
      where: { userId: user.userId },
    });
  }

  return NextResponse.json({ success: true });
}
