import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Spug 推送平台配置
const SPUG_SMS_URL = process.env.SPUG_SMS_URL || "https://push.spug.cc/send/n2D7LjX7LVmGkWNZ";

// 生成6位随机验证码
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 通过 Spug 发送短信
async function sendSms(phone: string, code: string): Promise<boolean> {
  try {
    const response = await fetch(SPUG_SMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: code,
        targets: phone,
      }),
    });

    const result = await response.json();
    console.log("[SMS Spug] Response:", result);

    // Spug 返回格式: { success: true, info: "..." } 或 { success: false, info: "..." }
    if (result.success) {
      return true;
    }

    console.error("[SMS Spug] Error:", result.info);
    return false;
  } catch (error) {
    console.error("[SMS Spug] Send failed:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "请输入正确的手机号" }, { status: 400 });
    }

    // 检查发送频率（60秒内不能重复发送）
    const recentCode = await prisma.smsCode.findFirst({
      where: {
        phone,
        createdAt: { gte: new Date(Date.now() - 60 * 1000) },
      },
      orderBy: { createdAt: "desc" },
    });

    if (recentCode) {
      return NextResponse.json({ error: "60秒内不能重复发送" }, { status: 429 });
    }

    // 生成验证码
    const code = generateCode();

    // 保存验证码到数据库
    await prisma.smsCode.create({
      data: {
        phone,
        code,
        purpose: "login",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5分钟过期
      },
    });

    // 发送短信
    const sent = await sendSms(phone, code);

    if (!sent) {
      return NextResponse.json({ error: "短信发送失败，请稍后重试" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "验证码已发送" });
  } catch (error) {
    console.error("[Send Code Error]", error);
    return NextResponse.json({ error: "发送失败" }, { status: 500 });
  }
}
