import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - 管理员获取所有用户反馈
export async function GET() {
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
