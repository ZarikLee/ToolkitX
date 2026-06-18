import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 腾讯云短信配置
const SECRET_ID = process.env.TENCENT_SMS_SECRET_ID || "";
const SECRET_KEY = process.env.TENCENT_SMS_SECRET_KEY || "";
const SMS_SDK_APP_ID = process.env.TENCENT_SMS_SDK_APP_ID || "";
const SMS_SIGN_NAME = process.env.TENCENT_SMS_SIGN_NAME || "";
const SMS_TEMPLATE_ID = process.env.TENCENT_SMS_TEMPLATE_ID || "";

// 生成6位随机验证码
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 简化的腾讯云短信发送（使用HTTP API v2）
async function sendSms(phone: string, code: string): Promise<boolean> {
  // 如果没有配置腾讯云密钥，使用开发模式（打印到控制台）
  if (!SECRET_ID || !SECRET_KEY) {
    console.log(`[SMS Dev] 手机号: ${phone}, 验证码: ${code}`);
    return true;
  }

  try {
    const crypto = await import("crypto");

    // 构建请求参数
    const params = {
      SmsSdkAppId: SMS_SDK_APP_ID,
      SignName: SMS_SIGN_NAME,
      TemplateId: SMS_TEMPLATE_ID,
      TemplateParamSet: [code, "5"],
      PhoneNumberSet: [`+86${phone}`],
    };

    // 腾讯云API v3签名
    const host = "sms.tencentcloudapi.com";
    const service = "sms";
    const action = "SendSms";
    const version = "2021-03-11";
    const algorithm = "TC3-HMAC-SHA256";
    const timestamp = Math.floor(Date.now() / 1000);
    const date = new Date(timestamp * 1000).toISOString().split("T")[0];

    // Step 1: 拼接规范请求串
    const httpRequestMethod = "POST";
    const canonicalUri = "/";
    const canonicalQueryString = "";
    const canonicalHeaders = `content-type:application/json\nhost:${host}\n`;
    const signedHeaders = "content-type;host";
    const payload = JSON.stringify(params);
    const hashedRequestPayload = crypto
      .createHash("sha256")
      .update(payload)
      .digest("hex");
    const canonicalRequest = `${httpRequestMethod}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${hashedRequestPayload}`;

    // Step 2: 拼接待签名字符串
    const credentialScope = `${date}/${service}/tc3_request`;
    const hashedCanonicalRequest = crypto
      .createHash("sha256")
      .update(canonicalRequest)
      .digest("hex");
    const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;

    // Step 3: 计算签名
    const getSignatureKey = (secret: string, date: string, service: string) => {
      const kDate = crypto.createHmac("sha256", `TC3${secret}`).update(date).digest();
      const kService = crypto.createHmac("sha256", kDate).update(service).digest();
      const kSigning = crypto.createHmac("sha256", kService).update("tc3_request").digest();
      return kSigning;
    };
    const signatureKey = getSignatureKey(SECRET_KEY, date, service);
    const signature = crypto.createHmac("sha256", signatureKey).update(stringToSign).digest("hex");

    // Step 4: 拼接 Authorization
    const authorization = `${algorithm} Credential=${SECRET_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    // 发送请求
    const response = await fetch(`https://${host}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Host": host,
        "X-TC-Action": action,
        "X-TC-Version": version,
        "X-TC-Timestamp": timestamp.toString(),
        "Authorization": authorization,
      },
      body: payload,
    });

    const result = await response.json();
    console.log("[SMS] Response:", result);

    if (result.Response?.Error) {
      console.error("[SMS] Error:", result.Response.Error);
      return false;
    }

    return result.Response?.SendStatusSet?.[0]?.Code === "Ok";
  } catch (error) {
    console.error("[SMS] Send failed:", error);
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
