import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { question, context } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "Missing required field: question" },
        { status: 400 }
      );
    }

    const userContent = context
      ? `上下文：${context}\n\n问题：${question}`
      : question;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `你是一个运维助手。用户会问运维相关的问题或请求帮助。
规则：
- 用中文回答
- 回答简洁实用
- 涉及命令时用代码块包裹
- 如果不确定，诚实说明`,
          },
          { role: "user", content: userContent },
        ],
        max_tokens: 4096,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("DeepSeek API error:", response.status, errorData);
      return NextResponse.json(
        { error: `AI 服务请求失败: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      return NextResponse.json(
        { error: "AI 未返回有效内容" },
        { status: 502 }
      );
    }

    return NextResponse.json({ answer: result });
  } catch (error) {
    console.error("AI query error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
