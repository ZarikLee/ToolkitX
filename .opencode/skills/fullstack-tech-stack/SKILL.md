# Full-Stack Web App Tech Stack (ToolkitX Pattern)

Reusable tech stack reference for building production web apps. Copy this skill when starting new projects.

## Core Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.x | React framework (App Router) |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling (CSS-first config, no tailwind.config.js) |
| Prisma | 6.19.x | ORM (**NOT** v7, requires Node 22) |
| MySQL | 8.0 | Database |
| Node.js | 20.x | Runtime (**NOT** Alpine, use Debian) |

## UI Libraries

| Library | Version | Purpose |
|---|---|---|
| lucide-react | 1.18.x | Icons |
| recharts | 3.8.x | Charts |
| clsx | 2.1.x | Class merging |
| tailwind-merge | 3.6.x | Tailwind dedup |
| class-variance-authority | 0.7.x | Variant styling |
| @radix-ui/react-slot | 1.2.x | UI primitives |

## Auth

| Library | Version | Purpose |
|---|---|---|
| jsonwebtoken | 9.x | JWT sign/verify (server-side) |
| jose | 6.x | JWT verify (Edge runtime) |
| bcryptjs | 3.x | Password hashing (12 rounds) |

**Pattern**: Two auth files:
- `src/lib/auth.ts` — server-side (jsonwebtoken + bcryptjs)
- `src/lib/auth-server.ts` — Edge-compatible (jose, cookie-based)

**Cookie**: `toolkitx_token`, HttpOnly, SameSite=Lax, 7-day expiry
**Middleware**: Manual JWT decode via `atob` + JSON.parse (no library in middleware)

## SSH / WebSocket

| Library | Version | Purpose |
|---|---|---|
| ssh2 | 1.17.x | SSH connections |
| ws | 8.x | WebSocket server |
| @xterm/xterm | 6.x | Terminal UI |
| @xterm/addon-fit | 0.11.x | Terminal auto-fit |
| @xterm/addon-web-links | 0.12.x | Clickable links in terminal |

**Pattern**: Custom server (`server.ts`) with `tsx` runtime, not Next.js default. WebSocket upgrade on `/api/ssh`.

## Code Editor

| Library | Version | Purpose |
|---|---|---|
| codemirror | 6.x | Editor core |
| @codemirror/basic-setup | 0.20.x | Default setup |
| @codemirror/lang-sql | 6.x | SQL syntax |
| @codemirror/theme-one-dark | 6.x | Dark theme |

## AI

| Service | Purpose |
|---|---|
| DeepSeek API | LLM (cheap, good Chinese support) |

## Deployment

### Railway
- Builder: `DOCKERFILE`
- Base image: `node:20` (Debian, NOT Alpine — lightningcss/tailwindcss native bindings fail on Alpine)
- Port: `$PORT` env var (Railway provides)
- Healthcheck: `/`, timeout 600s

### Dockerfile Template
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

**IMPORTANT**: `@next/swc-darwin-arm64` must NOT be in package.json — causes `npm ci EBADPLATFORM` on Linux. Remove before every commit:
```bash
rm -rf node_modules/@next/swc-darwin-arm64
```

### .npmrc
```
optional=true
platform=true
```

### .dockerignore
```
node_modules
.next
.git
.gitignore
*.md
.vscode
.env
.env.local
.env*.local
```

## Build Commands

```bash
# Local dev (Turbopack NOT supported on darwin/arm64)
source ~/.nvm/nvm.sh && nvm use 20
npm run dev -- --webpack

# Production build
npm run build -- --webpack

# Fix SWC corruption
rm -rf node_modules/@next/swc-darwin-arm64 && npm install

# Generate Prisma client
npx prisma generate

# Push schema to DB
npx prisma db push
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── login/page.tsx        # Auth page
│   ├── settings/page.tsx     # User settings
│   ├── admin/messages/page.tsx
│   ├── tools/page.tsx        # Data tools (query param ?tool=xxx)
│   ├── [feature]/page.tsx    # Feature pages
│   └── api/
│       ├── auth/             # Login, register, JWT
│       ├── [feature]/route.ts
│       └── proxy/route.ts    # API proxy
├── components/
│   ├── layout/
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── sub-page-layout.tsx
│   ├── terminal/             # SSH terminal components
│   ├── tools/                # Data processing tools
│   └── ui/                   # Shared UI components
├── lib/
│   ├── api.ts                # Client-side fetch helpers
│   ├── auth.ts               # Server JWT + bcrypt
│   ├── auth-server.ts        # Edge-compatible auth
│   ├── config-templates.ts   # Config templates
│   ├── prisma.ts             # Prisma singleton
│   └── ssh.ts                # SSH connection manager
├── data/                     # Static data (scripts, templates)
└── middleware.ts             # Auth middleware
```

## Auth Middleware Pattern

```typescript
// src/middleware.ts
const PUBLIC_PATHS = ["/login", "/api/auth/login", "/api/auth/register", "/api/auth/me"];

export function middleware(req: NextRequest) {
  if (PUBLIC_PATHS.some(p => req.nextUrl.pathname.startsWith(p))) return NextResponse.next();
  
  const guest = req.cookies.get("app_guest")?.value;
  if (guest === "1") return NextResponse.next();
  
  const token = req.cookies.get("app_token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));
  
  // Manual JWT decode (Edge can't use jsonwebtoken)
  const payload = verifyTokenEdge(token);
  if (!payload) { /* clear cookie, redirect */ }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
```

## API Route Pattern

```typescript
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const items = await prisma.item.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: "desc" },
  });
  
  return NextResponse.json(items);  // Return array directly, NOT { items: [...] }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const body = await request.json();
  // Validate required fields
  if (!body.name) return NextResponse.json({ error: "Missing name" }, { status: 400 });
  
  const item = await prisma.item.create({
    data: { ...body, userId: user.userId },
  });
  
  return NextResponse.json(item);
}
```

**IMPORTANT**: Frontend must use array directly: `setData(response)` NOT `setData(response.items)`

## Database Migration Pattern (Inline SQL)

Use inline raw SQL in `server.ts` startup instead of `prisma db push` (avoids Docker build issues):

```typescript
async function runMigration() {
  const url = process.env.DATABASE_URL;
  if (!url) return;
  const mysql = await import('mysql2/promise');
  const conn = await mysql.createConnection(url);
  
  // Check if column exists before adding
  const [cols] = await conn.execute("SHOW COLUMNS FROM `Table` LIKE 'column'");
  if ((cols as any[]).length === 0) {
    await conn.execute("ALTER TABLE `Table` ADD COLUMN `column` TYPE");
  }
  
  // Create tables
  await conn.execute("CREATE TABLE IF NOT EXISTS `Table` (...)");
  await conn.end();
}
```

## Custom Server Pattern (for WebSocket/SSH)

```typescript
// server.ts
import { createServer } from 'http';
import next from 'next';
import { WebSocketServer, WebSocket } from 'ws';

const app = next({ dev, hostname: '0.0.0.0', port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  await runMigration();
  const server = createServer(async (req, res) => {
    const parsedUrl = parse(req.url!, true);
    await handle(req, res, parsedUrl);
  });

  const wss = new WebSocketServer({ noServer: true });
  server.on('upgrade', (req, socket, head) => {
    const { pathname } = parse(req.url || '/', true);
    if (pathname === '/api/ssh') {
      wss.handleUpgrade(req, socket, head, ws => wss.emit('connection', ws, req));
    } else { socket.destroy(); }
  });

  server.listen(port, hostname);
});
```

## UI Conventions

### Theme System
- 2 themes: light + dark
- Light: white bg + aurora ink wash
- Dark: black bg + blue-purple aurora
- Toggle via `document.documentElement.className = "light" | "dark"`
- Default: light
- CSS in `src/app/globals.css`

### Button Classes
```css
/* White button with shadow (light mode) */
.btn-secondary { @apply bg-white shadow-sm border; }

/* Round close button */
.btn-close { @apply w-7 h-7 rounded-full bg-white shadow-sm border; }

/* Apple-style inputs */
.input-apple { @apply bg-white/[0.04] border border-white/[0.08] rounded-xl; }
```

### Glass/Blur Effects
```css
.glass-heavy {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
}
```

### Sub-page Layout Pattern
All sub-pages use `SubPageLayout` with back button + title + help icon + tabs.

### Toast Notifications
- Position: center-top
- Animation: slide-down
- Style: 80% opacity, backdrop blur
- Auto-dismiss: 3s

### Modals
- No click-outside-close (only close button)
- Content scrollable with `overflow-y-auto flex-1 min-h-0`
- Use `btn-close` class for close button

## Common Gotchas

1. **SWC corruption**: `@next/swc-darwin-arm64` breaks frequently on macOS. Fix: `rm -rf node_modules/@next/swc-darwin-arm64 && npm install`
2. **Turbopack**: NOT supported on darwin/arm64. Always use `--webpack` flag.
3. **Prisma v7**: Requires Node 22. Use v6.19.x with Node 20.
4. **Alpine Docker**: Native bindings (lightningcss, @tailwindcss/oxide) fail. Use `node:20` (Debian).
5. **`@next/swc-darwin-arm64`**: NEVER add to package.json. Remove before git commit.
6. **API responses**: Return arrays directly, not wrapped in `{ data: [...] }`. Frontend uses `setData(response)` not `setData(response.data)`.
7. **InlineHelp z-index**: Use React Portal (`createPortal` to `document.body`) to escape `overflow: hidden` parents.
8. **Favorites**: Use localStorage for guest compatibility, not API-only.
9. **useSearchParams**: Must be wrapped in `<Suspense>` boundary in Next.js 16.
10. **SSH externalization**: In next.config, add `ssh2` to `config.externals` for server-side bundling.
