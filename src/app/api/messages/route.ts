import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

// GET - 获取消息列表
// 普通用户：广播公告 + 自己的反馈（含管理员回复）
// 管理员：广播公告 + 所有用户反馈
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = user.role === "admin";

  // 广播公告 + 已读状态
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      reads: {
        where: { userId: user.userId },
        select: { read: true },
      },
    },
  });

  const broadcastItems = messages.map((m) => ({
    id: m.id,
    title: m.title,
    content: m.content,
    type: m.type,
    read: m.reads.length > 0 && m.reads[0].read,
    createdAt: m.createdAt.getTime(),
    isFeedback: false,
  }));

  // 反馈列表
  const feedbackWhere = isAdmin
    ? {}
    : { userId: user.userId };

  const feedbacks = await prisma.feedback.findMany({
    where: feedbackWhere,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true } },
    },
  });

  // 获取反馈的已读状态
  const fbIds = feedbacks.map((f) => `fb-${f.id}`);
  const reads = await prisma.messageRead.findMany({
    where: {
      messageId: { in: fbIds },
      userId: user.userId,
    },
  });
  const readSet = new Set(reads.filter((r) => r.read).map((r) => r.messageId));

  const feedbackItems = feedbacks.map((f) => ({
    id: `fb-${f.id}`,
    title: isAdmin ? `[反馈] ${f.title}` : `[我的反馈] ${f.title}`,
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

  const allMessages = [...broadcastItems, ...feedbackItems].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  // 未读数计算
  let unreadCount = 0;
  if (isAdmin) {
    unreadCount = feedbackItems.filter((f) => !f.read).length;
  } else {
    const broadcastUnread = messages.filter((m) => m.reads.length === 0).length;
    const feedbackUnread = feedbackItems.filter((f) => !f.read).length;
    unreadCount = broadcastUnread + feedbackUnread;
  }

  return NextResponse.json({
    messages: allMessages,
    unreadCount,
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

    // 获取反馈信息（用于回复后通知用户）
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
    });

    await prisma.feedback.update({
      where: { id: feedbackId },
      data: { reply, status: "replied" },
    });

    // 管理员回复后，标记管理员已读
    const existing = await prisma.messageRead.findFirst({
      where: { messageId, userId: user.userId },
    });
    if (!existing) {
      await prisma.messageRead.create({
        data: { messageId, userId: user.userId, read: true },
      });
    }

    // 通知用户：标记用户的反馈为未读，这样用户打开消息中心就能看到管理员的回复
    if (feedback && feedback.userId !== user.userId) {
      // 删除用户的已读标记，使其变为未读
      await prisma.messageRead.deleteMany({
        where: { messageId, userId: feedback.userId },
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
    // 反馈全部已读
    const feedbackWhere = user.role === "admin"
      ? { status: "pending" as const }
      : { userId: user.userId };
    const unreadFeedbacks = await prisma.feedback.findMany({
      where: feedbackWhere,
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
