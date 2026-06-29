import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const commands = await prisma.commandHistory.findMany({
    where: { userId: "default" },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(
    commands.map((c) => ({
      id: c.id,
      command: c.command,
      output: c.output || null,
      serverId: c.serverId || null,
      createdAt: c.createdAt.getTime(),
    }))
  );
}
