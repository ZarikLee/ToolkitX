import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

// GET - 获取用户消息列表（含未读状态）
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      reads: {
        where: { userId: user.userId },
        select: { read: true },
      },
    },
  });

  const unreadCount = messages.filter((m) => m.reads.length === 0).length;

  return NextResponse.json({
    messages: messages.map((m) => ({
      id: m.id,
      title: m.title,
      content: m.content,
      type: m.type,
      read: m.reads.length > 0 && m.reads[0].read,
      createdAt: m.createdAt.getTime(),
    })),
    unreadCount,
  });
}

// POST - 标记消息为已读
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { messageId, markAll } = body;

  if (markAll) {
    const unreadMessages = await prisma.message.findMany({
      where: {
        reads: { none: { userId: user.userId } },
      },
      select: { id: true },
    });

    await prisma.messageRead.createMany({
      data: unreadMessages.map((m) => ({
        messageId: m.id,
        userId: user.userId,
        read: true,
      })),
    });
  } else if (messageId) {
    await prisma.messageRead.upsert({
      where: {
        messageId_userId: { messageId, userId: user.userId },
      },
      update: { read: true },
      create: { messageId, userId: user.userId, read: true },
    });
  }

  return NextResponse.json({ success: true });
}

// DELETE - 管理员删除消息
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

  await prisma.message.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
