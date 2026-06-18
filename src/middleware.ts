import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "toolkitx-jwt-secret-2026-secure-key";

function verifyTokenEdge(token: string): { userId: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return { userId: payload.userId };
  } catch {
    return null;
  }
}

const PUBLIC_PATHS = ["/login", "/api/auth/login", "/api/auth/register", "/api/auth/me"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("toolkitx_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const payload = verifyTokenEdge(token);
  if (!payload) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("toolkitx_token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/ai|api/proxy).*)"],
};
