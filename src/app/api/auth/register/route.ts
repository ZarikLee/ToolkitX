import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";
import { setAuthCookie } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  try {
    const { phone, email, name, password } = await req.json();

    if (!phone || !name) {
      return NextResponse.json(
        { error: "请填写手机号和用户名" },
        { status: 400 }
      );
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: "请输入正确的手机号" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      return NextResponse.json(
        { error: "该手机号已注册" },
        { status: 409 }
      );
    }

    const hashedPassword = password ? await hashPassword(password) : null;
    const user = await prisma.user.create({
      data: { phone, email: email || null, name, password: hashedPassword },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email || "",
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      user: { id: user.id, phone: user.phone, email: user.email, name: user.name, role: user.role },
    });
    const cookies = setAuthCookie(token);
    response.headers.set("Set-Cookie", cookies["Set-Cookie"]);
    return response;
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "注册失败", detail: error?.message || String(error) }, { status: 500 });
  }
}
