import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const servers = await prisma.server.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    servers.map((s) => ({
      id: s.id,
      name: s.name,
      host: s.host,
      port: s.port,
      username: s.username,
      password: s.password || undefined,
      privateKey: s.privateKey || undefined,
    }))
  );
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, host, port, username, password, privateKey } = body;

  if (!name || !host || !username) {
    return NextResponse.json(
      { error: "Missing required fields: name, host, username" },
      { status: 400 }
    );
  }

  const server = await prisma.server.create({
    data: {
      userId: user.userId,
      name,
      host,
      port: port || 22,
      username,
      password: password || null,
      privateKey: privateKey || null,
    },
  });

  return NextResponse.json({
    id: server.id,
    name: server.name,
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password || undefined,
    privateKey: server.privateKey || undefined,
  });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.server.deleteMany({
    where: { id, userId: user.userId },
  });

  return NextResponse.json({ success: true });
}
