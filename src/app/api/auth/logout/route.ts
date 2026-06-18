import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth-server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  const cookies = clearAuthCookie();
  response.headers.set("Set-Cookie", cookies["Set-Cookie"]);
  return response;
}
