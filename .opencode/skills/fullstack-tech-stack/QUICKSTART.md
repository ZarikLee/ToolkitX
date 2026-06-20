# Quick Start: New Project from ToolkitX Stack

Copy-paste ready. Run these commands to scaffold a new project.

## 1. Init Project

```bash
mkdir my-project && cd my-project
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

## 2. Install Dependencies

```bash
# Core
npm install prisma @prisma/client mysql2

# Auth
npm install jsonwebtoken jose bcryptjs

# SSH/WebSocket (if needed)
npm install ssh2 ws @xterm/xterm @xterm/addon-fit @xterm/addon-web-links

# UI
npm install lucide-react recharts clsx tailwind-merge class-variance-authority @radix-ui/react-slot

# Code Editor (if needed)
npm install codemirror @codemirror/basic-setup @codemirror/lang-sql @codemirror/theme-one-dark

# AI (if needed)
# Just use fetch() to DeepSeek API

# Dev
npm install -D @types/jsonwebtoken @types/bcryptjs @types/ssh2 @types/ws tsx
```

## 3. Prisma Init

```bash
npx prisma init --datasource-provider mysql
```

Set `DATABASE_URL` in `.env`.

## 4. Essential Files to Create

### src/lib/prisma.ts
```typescript
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### src/lib/auth.ts
```typescript
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const JWT_SECRET = process.env.JWT_SECRET || "change-me";
export const hashPassword = (pw: string) => bcrypt.hash(pw, 12);
export const verifyPassword = (pw: string, hash: string) => bcrypt.compare(pw, hash);
export const signToken = (payload: any) => jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET) as any;
```

### src/lib/auth-server.ts
```typescript
import { cookies } from "next/headers";
import { verifyToken } from "./auth";
const COOKIE_NAME = "app_token";
export async function getCurrentUser() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try { return verifyToken(token); } catch { return null; }
}
export function setAuthCookie(token: string) {
  // Set cookie with HttpOnly, 7-day expiry
}
export function clearAuthCookie() {
  // Delete cookie
}
```

### src/lib/api.ts
```typescript
export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: "same-origin" });
  if (!res.ok) throw new Error((await res.json()).error || "Request failed");
  return res.json();
}
export async function apiPost<T>(url: string, data: any): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Request failed");
  return res.json();
}
export function isLoginRequired() {
  return !document.cookie.includes("app_token");
}
export function getLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
```

## 5. Middleware Template

```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
const PUBLIC = ["/login", "/api/auth/login", "/api/auth/register", "/api/auth/me"];
export function middleware(req: NextRequest) {
  if (PUBLIC.some(p => req.nextUrl.pathname.startsWith(p))) return NextResponse.next();
  const token = req.cookies.get("app_token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));
  // Manual JWT decode for Edge
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) throw new Error("expired");
  } catch {
    const r = NextResponse.redirect(new URL("/login", req.url));
    r.cookies.delete("app_token");
    return r;
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
```

## 6. Dockerfile

```dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN rm -f package-lock.json && npm install
RUN npx prisma generate
COPY . .
RUN npm run build -- --webpack
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["npx", "tsx", "server.ts"]
```

## 7. .npmrc
```
optional=true
platform=true
```

## 8. Build Command

```bash
npm run build -- --webpack
```

## 9. Commit Checklist

Before EVERY `git push`:
```bash
rm -rf node_modules/@next/swc-darwin-arm64
git add -A && git commit -m "..." && git push
```
