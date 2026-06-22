import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, phone, password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "请输入密码" }, { status: 400 });
    }
    if (!email && !phone) {
      return NextResponse.json({ error: "请输入邮箱或手机号" }, { status: 400 });
    }

    // Find user by email or phone
    let user;
    if (email) {
      user = await prisma.user.findUnique({ where: { email } });
    } else {
      user = await prisma.user.findUnique({ where: { phone } });
    }

    if (!user) {
      return NextResponse.json({ error: "账号或密码错误" }, { status: 401 });
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "该账号未设置密码，请使用验证码登录" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "账号或密码错误" }, { status: 401 });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email || "",
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      user: { id: user.id, phone: user.phone, email: user.email || null, name: user.name, role: user.role },
    });

    response.cookies.set("toolkitx_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "登录失败，请稍后重试" }, { status: 500 });
  }
}
