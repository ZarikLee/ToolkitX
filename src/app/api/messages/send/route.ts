import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - 发送广播消息（管理员）
export async function POST(request: Request) {
  const body = await request.json();
  const { title, content, type } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "标题和内容不能为空" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: { title, content, type: type || "info" },
  });

  return NextResponse.json({ id: message.id });
}
