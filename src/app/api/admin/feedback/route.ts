import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

// GET - 管理员获取所有用户反馈
export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const feedbacks = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return NextResponse.json(
    feedbacks.map((f) => ({
      id: f.id,
      type: f.type,
      title: f.title,
      content: f.content,
      status: f.status,
      reply: f.reply,
      userName: f.user.name,
      userEmail: f.user.email,
      createdAt: f.createdAt.getTime(),
    }))
  );
}

// POST - 管理员回复反馈
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { feedbackId, reply, status } = body;

  if (!feedbackId) {
    return NextResponse.json({ error: "Missing feedbackId" }, { status: 400 });
  }

  const updateData: Record<string, string> = {};
  if (reply !== undefined) updateData.reply = reply;
  if (status !== undefined) updateData.status = status;

  await prisma.feedback.update({
    where: { id: feedbackId },
    data: updateData,
  });

  return NextResponse.json({ success: true });
}
