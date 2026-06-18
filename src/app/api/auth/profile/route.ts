import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth";

export async function PUT(request: Request) {
  const payload = await getCurrentUser();
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, email, currentPassword, newPassword } = body;

  if (name && name.length > 0) {
    await prisma.user.update({
      where: { id: payload.userId },
      data: { name },
    });
  }

  if (email && email !== payload.email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "该邮箱已被使用" }, { status: 409 });
    }
    await prisma.user.update({
      where: { id: payload.userId },
      data: { email },
    });
  }

  if (newPassword) {
    if (!currentPassword) {
      return NextResponse.json({ error: "请输入当前密码" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: "新密码至少需要 6 个字符" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { password: true },
    });
    if (!user) {
      return NextResponse.json({ error: "用户不存在" }, { status: 404 });
    }
    if (!user.password) {
      return NextResponse.json({ error: "该账号使用手机验证码登录，无法修改密码" }, { status: 400 });
    }
    const valid = await verifyPassword(currentPassword, user.password);
    if (!valid) {
      return NextResponse.json({ error: "当前密码错误" }, { status: 400 });
    }
    const hashed = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: payload.userId },
      data: { password: hashed },
    });
  }

  const updated = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true, avatar: true, createdAt: true },
  });

  return NextResponse.json({ user: updated });
}
