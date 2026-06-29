import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const history = await prisma.commandHistory.findMany({
    where: { userId: "default" },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(
    history.map((h) => ({
      id: h.id,
      command: h.command,
      output: h.output || "",
      timestamp: h.createdAt.getTime(),
      favorite: false,
    }))
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const { command, output, serverId } = body;

  if (!command) {
    return NextResponse.json(
      { error: "Missing required field: command" },
      { status: 400 }
    );
  }

  const entry = await prisma.commandHistory.create({
    data: {
      userId: "default",
      command,
      output: output || null,
      serverId: serverId || null,
    },
  });

  return NextResponse.json({
    id: entry.id,
    command: entry.command,
    output: entry.output || "",
    timestamp: entry.createdAt.getTime(),
    favorite: false,
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    await prisma.commandHistory.deleteMany({
      where: { id, userId: "default" },
    });
  } else {
    await prisma.commandHistory.deleteMany({
      where: { userId: "default" },
    });
  }

  return NextResponse.json({ success: true });
}
