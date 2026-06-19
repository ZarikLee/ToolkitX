import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const commands = await prisma.commandHistory.findMany({
    where: { userId: user.userId },
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
