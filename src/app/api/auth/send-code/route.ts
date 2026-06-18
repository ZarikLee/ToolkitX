import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 互亿无线短信配置
const IHUYI_ACCOUNT = process.env.IHUYI_ACCOUNT || "";
const IHUYI_APIKEY = process.env.IHUYI_APIKEY || "";

// 生成6位随机验证码
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 通过互亿无线发送短信
async function sendSms(phone: string, code: string): Promise<{ ok: boolean; msg?: string }> {
  // 开发模式：没有配置账号时打印到控制台
  if (!IHUYI_ACCOUNT || !IHUYI_APIKEY) {
    console.log(`[SMS Dev Mode] 手机号: ${phone}, 验证码: ${code}`);
    return { ok: true };
  }

  try {
    const content = `您的验证码是:${code}。请不要把验证码泄露给其他人。`;

    const params = new URLSearchParams({
      account: IHUYI_ACCOUNT,
      password: IHUYI_APIKEY,
      mobile: phone,
      content: content,
      format: "json",
    });

    const response = await fetch("https://106.ihuyi.com/webservice/sms.php?method=Submit", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const result = await response.json();
    console.log("[SMS ihuyi] Response:", result);

    // code=2 表示成功
    if (result.code === "2" || result.code === 2) {
      return { ok: true };
    }

    return { ok: false, msg: result.msg || "短信发送失败" };
  } catch (error) {
    console.error("[SMS ihuyi] Send failed:", error);
    return { ok: false, msg: "短信发送异常" };
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
    const result = await sendSms(phone, code);

    if (!result.ok) {
      return NextResponse.json({ error: result.msg || "短信发送失败" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "验证码已发送" });
  } catch (error) {
    console.error("[Send Code Error]", error);
    return NextResponse.json({ error: "发送失败" }, { status: 500 });
  }
}
