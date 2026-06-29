import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - 获取用户收藏列表
export async function GET() {
  const favorites = await prisma.userFavorites.findMany({
    where: { userId: "default" },
    select: { toolId: true },
  });

  return NextResponse.json({
    toolIds: favorites.map((f) => f.toolId),
  });
}

// POST - 切换收藏状态
export async function POST(request: Request) {
  const body = await request.json();
  const { toolId } = body;

  if (!toolId) {
    return NextResponse.json({ error: "toolId 不能为空" }, { status: 400 });
  }

  const existing = await prisma.userFavorites.findUnique({
    where: {
      userId_toolId: {
        userId: "default",
        toolId,
      },
    },
  });

  if (existing) {
    await prisma.userFavorites.delete({
      where: { id: existing.id },
    });
  } else {
    await prisma.userFavorites.create({
      data: {
        userId: "default",
        toolId,
      },
    });
  }

  // Return updated list
  const updated = await prisma.userFavorites.findMany({
    where: { userId: "default" },
    select: { toolId: true },
  });

  return NextResponse.json({ toolIds: updated.map((f) => f.toolId) });
}
