import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - 获取用户反馈列表
export async function GET() {
  const feedbacks = await prisma.feedback.findMany({
    where: { userId: "default" },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    feedbacks.map((f) => ({
      id: f.id,
      type: f.type,
      title: f.title,
      content: f.content,
      status: f.status,
      reply: f.reply,
      createdAt: f.createdAt.getTime(),
    }))
  );
}

// POST - 提交反馈
export async function POST(request: Request) {
  const body = await request.json();
  const { type, title, content } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "标题和内容不能为空" }, { status: 400 });
  }

  const feedback = await prisma.feedback.create({
    data: {
      userId: "default",
      type: type || "suggestion",
      title,
      content,
    },
  });

  return NextResponse.json({ id: feedback.id });
}
