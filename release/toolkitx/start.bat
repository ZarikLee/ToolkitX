@echo off
echo ========================================
echo   ToolkitX - 运维工具箱 + AI 助手
echo ========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] 未检测到 Node.js!
    echo.
    echo 请先安装 Node.js:
    echo   1. 访问 https://nodejs.org
    echo   2. 下载 LTS 版本（推荐）
    echo   3. 双击安装，一路下一步
    echo   4. 重新打开此命令行窗口
    echo.
    pause
    exit /b 1
)

echo [1/3] 初始化数据库...
node server.js

echo.
echo [2/3] 服务启动中...
echo.
echo ========================================
echo   访问地址: http://localhost:3000
echo   按 Ctrl+C 停止服务
echo ========================================
echo.
