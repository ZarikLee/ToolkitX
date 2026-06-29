import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const snapshots = await prisma.sessionSnapshot.findMany({
    where: { userId: "default" },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    snapshots.map((s) => ({
      id: s.id,
      name: s.name,
      serverId: s.serverId || "",
      serverName: "",
      commands: JSON.parse(s.commands || "[]"),
      timestamp: s.createdAt.getTime(),
    }))
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, serverId, serverName, commands } = body;

  if (!name) {
    return NextResponse.json(
      { error: "Missing required field: name" },
      { status: 400 }
    );
  }

  const snapshot = await prisma.sessionSnapshot.create({
    data: {
      userId: "default",
      name,
      serverId: serverId || null,
      commands: JSON.stringify(commands || []),
    },
  });

  return NextResponse.json({
    id: snapshot.id,
    name: snapshot.name,
    serverId: snapshot.serverId || "",
    serverName: serverName || "",
    commands: JSON.parse(snapshot.commands || "[]"),
    timestamp: snapshot.createdAt.getTime(),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.sessionSnapshot.deleteMany({
    where: { id, userId: "default" },
  });

  return NextResponse.json({ success: true });
}
