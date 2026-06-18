import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { method, url, headers, body } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const startTime = Date.now();

    const fetchOptions: RequestInit = {
      method: method || "GET",
      headers: {},
    };

    if (headers && Array.isArray(headers)) {
      for (const h of headers) {
        if (h.key && h.value) {
          (fetchOptions.headers as Record<string, string>)[h.key] = h.value;
        }
      }
    }

    if (body && method !== "GET" && method !== "HEAD") {
      fetchOptions.body = body;
    }

    const response = await fetch(url, fetchOptions);
    const elapsed = Date.now() - startTime;

    const responseText = await response.text();
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseText,
      time: elapsed,
      size: new TextEncoder().encode(responseText).length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Request failed" },
      { status: 500 }
    );
  }
}
