import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

// GET - 获取消息列表
// 普通用户：看到所有广播公告，unreadCount = 未读公告数
// 管理员：看到所有广播公告 + 所有用户反馈，unreadCount = 未读反馈数（不包含自己的公告）
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = user.role === "admin";

  // 广播公告
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      reads: {
        where: { userId: user.userId },
        select: { read: true },
      },
    },
  });

  // 管理员：获取所有反馈 + 跟踪已读状态
  let feedbackItems: any[] = [];
  let feedbackUnreadCount = 0;

  if (isAdmin) {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
      },
    });

    // 检查管理员对每条反馈的已读状态（通过 MessageRead 表，messageId 用 fb-{feedbackId}）
    const feedbackIds = feedbacks.map((f) => `fb-${f.id}`);
    const reads = await prisma.messageRead.findMany({
      where: {
        messageId: { in: feedbackIds },
        userId: user.userId,
      },
    });
    const readSet = new Set(reads.filter((r) => r.read).map((r) => r.messageId));

    feedbackItems = feedbacks.map((f) => ({
      id: `fb-${f.id}`,
      title: `[反馈] ${f.title}`,
      content: f.content,
      type: f.type,
      read: readSet.has(`fb-${f.id}`),
      createdAt: f.createdAt.getTime(),
      isFeedback: true,
      userName: f.user.name,
      feedbackId: f.id,
      status: f.status,
      reply: f.reply,
    }));

    feedbackUnreadCount = feedbackItems.filter((f) => !f.read).length;
  }

  // 普通用户：公告的未读数（排除自己发的）
  // 管理员：公告不计入未读数
  const broadcastItems = messages.map((m) => ({
    id: m.id,
    title: m.title,
    content: m.content,
    type: m.type,
    read: m.reads.length > 0 && m.reads[0].read,
    createdAt: m.createdAt.getTime(),
    isFeedback: false,
  }));

  const broadcastUnreadCount = isAdmin
    ? 0
    : messages.filter((m) => m.reads.length === 0).length;

  const allMessages = [...broadcastItems, ...feedbackItems].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  return NextResponse.json({
    messages: allMessages,
    unreadCount: isAdmin ? feedbackUnreadCount : broadcastUnreadCount,
  });
}

// POST - 标记已读 / 管理员回复反馈
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { messageId, markAll, reply } = body;

  // 回复反馈
  if (reply && messageId?.startsWith("fb-")) {
    const feedbackId = messageId.slice(3);
    await prisma.feedback.update({
      where: { id: feedbackId },
      data: { reply, status: "replied" },
    });
    // 标记已读
    const existing = await prisma.messageRead.findFirst({
      where: { messageId, userId: user.userId },
    });
    if (!existing) {
      await prisma.messageRead.create({
        data: { messageId, userId: user.userId, read: true },
      });
    }
    return NextResponse.json({ success: true });
  }

  if (markAll) {
    // 公告全部已读
    const unreadMessages = await prisma.message.findMany({
      where: { reads: { none: { userId: user.userId } } },
      select: { id: true },
    });
    await prisma.messageRead.createMany({
      data: unreadMessages.map((m) => ({
        messageId: m.id,
        userId: user.userId,
        read: true,
      })),
    });
    // 反馈全部已读（管理员）
    if (user.role === "admin") {
      const unreadFeedbacks = await prisma.feedback.findMany({
        where: { status: "pending" },
        select: { id: true },
      });
      const fbReads = unreadFeedbacks.map((f) => ({
        messageId: `fb-${f.id}`,
        userId: user.userId,
        read: true,
      }));
      if (fbReads.length > 0) {
        await prisma.messageRead.createMany({ data: fbReads });
      }
    }
  } else if (messageId) {
    if (messageId.startsWith("fb-")) {
      const existing = await prisma.messageRead.findFirst({
        where: { messageId, userId: user.userId },
      });
      if (!existing) {
        await prisma.messageRead.create({
          data: { messageId, userId: user.userId, read: true },
        });
      }
    } else {
      await prisma.messageRead.upsert({
        where: { messageId_userId: { messageId, userId: user.userId } },
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
