# Railway Deployment Guide

## First-Time Setup

### 1. Create Railway Account
- Go to railway.app
- Sign up with GitHub

### 2. Create Project
- New Project → Deploy from GitHub Repo
- Select your repo

### 3. Add MySQL
- New → Database → MySQL
- Railway auto-sets `MYSQL_URL`, `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`

### 4. Set Environment Variables
In the Next.js service → Variables:
```
DATABASE_URL=${{MySQL.MYSQL_URL}}
JWT_SECRET=your-secret-here
NODE_ENV=production
```

### 5. Custom Domain
- Settings → Networking → Custom Domain
- Add `aitoolkitx.com`
- CNAME target: `your-app.up.railway.app`
- SSL auto-managed by Railway

### 6. Dockerfile Config
- Settings → Build → Dockerfile Path: `Dockerfile`
- Or Railway auto-detects from root

## Railway Port
- Railway provides `$PORT` env var
- App must listen on `process.env.PORT || 3000`
- Healthcheck path: `/`

## Free Tier Limits
- $5 free credit (one-time, not monthly)
- Covers: compute + database + bandwidth
- If exceeded: service pauses, data retained 30 days
- Payment: Visa/Mastercard only (no PayPal, no Chinese UnionPay)

## Useful Commands
```bash
# Check deployment logs
railway logs

# Check service status
railway status

# Open Railway dashboard
railway open
```

## Database Migration
Use inline SQL in `server.ts` (not `prisma db push` in Dockerfile) to avoid build-time DB connection issues.
