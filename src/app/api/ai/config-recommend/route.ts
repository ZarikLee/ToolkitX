import { NextResponse } from "next/server";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

export async function POST(request: Request) {
  try {
    const { needs } = await request.json();

    if (!needs) {
      return NextResponse.json(
        { error: "Missing required field: needs" },
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
            content: `你是一个运维配置专家。用户会描述需要的配置，你生成对应的配置文件和建议。
规则：
- 直接输出配置内容，用 markdown 代码块包裹
- 在配置前简要说明这是什么配置
- 在配置后添加简短的使用说明
- 如果用户描述不够具体，给出合理的默认值
- 推荐最佳实践和安全配置
- 用中文回答`,
          },
          { role: "user", content: `需求：${needs}` },
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

    return NextResponse.json({ recommendation: result });
  } catch (error) {
    console.error("AI config-recommend error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
