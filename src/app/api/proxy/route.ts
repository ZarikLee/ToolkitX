import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { method, url, headers, body } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      if (/^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|0\.|localhost)/.test(hostname) || hostname === '::1') {
        return NextResponse.json({ error: "Access to private networks is forbidden" }, { status: 403 });
      }
    } catch { return NextResponse.json({ error: "Invalid URL" }, { status: 400 }); }

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
