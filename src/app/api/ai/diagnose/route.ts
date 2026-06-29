import { NextResponse } from "next/server";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

export async function POST(request: Request) {
  try {
    const { symptoms } = await request.json();

    if (!symptoms) {
      return NextResponse.json(
        { error: "Missing required field: symptoms" },
        { status: 400 }
      );
    }

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
            content: `你是一个运维诊断专家。用户会描述遇到的问题症状，你给出诊断建议。
规则：
- 分析可能的原因（列出 3-5 个）
- 给出具体的排查步骤和命令
- 命令用代码块包裹
- 如果需要更多信息才能判断，明确指出需要什么信息
- 用中文回答`,
          },
          { role: "user", content: `症状：${symptoms}` },
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

    return NextResponse.json({ suggestions: result });
  } catch (error) {
    console.error("AI diagnose error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
