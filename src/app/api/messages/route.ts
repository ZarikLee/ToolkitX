import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

// GET - 获取用户消息列表（管理员额外包含所有用户反馈）
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

  // 管理员：获取所有未处理反馈作为"消息"
  let feedbackItems: { id: string; title: string; content: string; type: string; read: boolean; createdAt: number; isFeedback: boolean; userName: string; feedbackId: string; status: string }[] = [];

  if (user.role === "admin") {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
      },
    });

    feedbackItems = feedbacks.map((f) => ({
      id: `fb-${f.id}`,
      title: `[反馈] ${f.title}`,
      content: f.content,
      type: f.type,
      read: f.status === "replied",
      createdAt: f.createdAt.getTime(),
      isFeedback: true,
      userName: f.user.name,
      feedbackId: f.id,
      status: f.status,
    }));
  }

  const allMessages = [
    ...messages.map((m) => ({
      id: m.id,
      title: m.title,
      content: m.content,
      type: m.type,
      read: m.reads.length > 0 && m.reads[0].read,
      createdAt: m.createdAt.getTime(),
      isFeedback: false,
    })),
    ...feedbackItems,
  ].sort((a, b) => b.createdAt - a.createdAt);

  return NextResponse.json({
    messages: allMessages,
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
    // 处理反馈消息标记已读
    if (messageId.startsWith("fb-")) {
      const feedbackId = messageId.slice(3);
      // 用 FeedbackRead 表记录（复用 MessageRead 表，feedbackId 存 message 字段）
      // 简单方案：直接用一个标记
      const existing = await prisma.messageRead.findFirst({
        where: { messageId: feedbackId, userId: user.userId },
      });
      if (!existing) {
        await prisma.messageRead.create({
          data: { messageId: feedbackId, userId: user.userId, read: true },
        });
      }
    } else {
      await prisma.messageRead.upsert({
        where: {
          messageId_userId: { messageId, userId: user.userId },
        },
        update: { read: true },
        create: { messageId, userId: user.userId, read: true },
      });
    }
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
