#!/bin/bash
# Build script for Windows portable package

set -e

echo "========================================="
echo "  Building ToolkitX for Windows"
echo "========================================="

# Step 1: Build Next.js
echo "[1/4] Building Next.js..."
npm run build -- --webpack

# Step 2: Create package directory
echo "[2/4] Creating package..."
rm -rf release
mkdir -p release/toolkitx

# Step 3: Copy standalone output
echo "[3/4] Copying files..."
cp -r .next/standalone/* release/toolkitx/

# Copy static assets
cp -r .next/static release/toolkitx/.next/

# Copy public assets
mkdir -p release/toolkitx/public
cp -r public/* release/toolkitx/public/

# Copy startup script
cp package-win/start.bat release/toolkitx/

# Copy env template
cp .env release/toolkitx/.env.example

# Step 4: Create zip
echo "[4/4] Creating zip..."
cd release
zip -r ../ToolkitX-Windows.zip toolkitx/
cd ..

echo ""
echo "========================================="
echo "  Done! Package: ToolkitX-Windows.zip"
echo "========================================="
echo ""
echo "用户使用方法:"
echo "  1. 解压 ToolkitX-Windows.zip"
echo "  2. 安装 Node.js (https://nodejs.org)"
echo "  3. 双击 start.bat"
echo "  4. 浏览器打开 http://localhost:3000"
echo ""
