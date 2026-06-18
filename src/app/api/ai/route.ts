import { NextResponse } from "next/server";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

const systemPrompts: Record<string, string> = {
  config: `你是一个运维配置专家。用户会描述需要的配置，你生成对应的配置文件。
规则：
- 直接输出配置内容，用 markdown 代码块包裹
- 在配置前简要说明这是什么配置
- 在配置后添加简短的使用说明
- 如果用户描述不够具体，给出合理的默认值`,

  script: `你是一个运维脚本专家。用户会描述需要的脚本功能，你生成对应的脚本。
规则：
- 直接输出完整可运行的脚本，用 markdown 代码块包裹
- 脚本必须包含注释说明
- 在脚本前说明功能概述
- 在脚本后添加使用方法和参数说明`,

  diagnose: `你是一个运维诊断专家。用户会描述遇到的问题，你给出诊断建议。
规则：
- 分析可能的原因（列出 3-5 个）
- 给出具体的排查步骤和命令
- 命令用代码块包裹
- 如果需要更多信息才能判断，明确指出需要什么信息`,

  chat: `你是一个运维助手。用户会问运维相关的问题或请求帮助。
规则：
- 用中文回答
- 回答简洁实用
- 涉及命令时用代码块包裹
- 如果不确定，诚实说明`,
};

export async function POST(request: Request) {
  try {
    const { type, prompt, history } = await request.json();

    if (!type || !prompt) {
      return NextResponse.json(
        { error: "Missing type or prompt" },
        { status: 400 }
      );
    }

    const systemPrompt = systemPrompts[type] || systemPrompts.chat;

    const messages: Array<{ role: string; content: string }> = [
      { role: "system", content: systemPrompt },
    ];

    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-10)) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    messages.push({ role: "user", content: prompt });

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        max_tokens: 4096,
        temperature: 0.7,
        stream: false,
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

    return NextResponse.json({ result });
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
