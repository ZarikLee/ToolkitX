import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return NextResponse.json({ error: "请输入手机号和验证码" }, { status: 400 });
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "请输入正确的手机号" }, { status: 400 });
    }

    // 查找有效的验证码
    const smsCode = await prisma.smsCode.findFirst({
      where: {
        phone,
        code,
        purpose: "login",
        used: false,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!smsCode) {
      return NextResponse.json({ error: "验证码错误或已过期" }, { status: 400 });
    }

    // 标记验证码为已使用
    await prisma.smsCode.update({
      where: { id: smsCode.id },
      data: { used: true },
    });

    // 查找或创建用户
    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      // 新用户，自动注册
      user = await prisma.user.create({
        data: {
          phone,
          name: `用户${phone.slice(-4)}`,
          email: null,
          password: null,
        },
      });
      console.log(`[Auth] New user registered: ${phone}`);
    }

    // 生成 JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email || "",
      name: user.name,
      role: user.role,
    });

    // 设置 cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    });

    response.cookies.set("toolkitx_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[Verify Code Error]", error);
    return NextResponse.json({ error: "验证失败" }, { status: 500 });
  }
}
