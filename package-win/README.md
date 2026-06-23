# ToolkitX Windows 便携版

## 快速开始

### 1. 安装 Node.js（如果没有）
- 访问 https://nodejs.org
- 下载 LTS 版本（推荐）
- 双击安装，一路下一步

### 2. 启动 ToolkitX
- 解压 `toolkitx.zip`
- 双击 `start.bat`
- 浏览器打开 `http://localhost:3000`

### 3. 配置数据库（首次使用）
编辑 `.env` 文件，填入 MySQL 连接信息：
```
DATABASE_URL="mysql://用户名:密码@localhost:3306/toolkitx"
JWT_SECRET="your-secret-key"
DEEPSEEK_API_KEY="your-api-key"
```

## 系统要求
- Windows 10/11
- Node.js 18+ (https://nodejs.org)
- MySQL 8.0 (可选，用于数据持久化)

## 功能说明
- 无需安装任何开发工具
- 解压即用，双击启动
- 支持 SSH 跳板机连接
- 支持 AI 对话
- 支持所有运维工具

## 常见问题

### Q: 提示"未检测到 Node.js"？
A: 请先安装 Node.js，然后重新打开命令行窗口。

### Q: 端口被占用？
A: 编辑 `.env` 文件，添加 `PORT=3001`，然后重新启动。

### Q: 数据库连接失败？
A: 确保 MySQL 已启动，且 `.env` 中的连接信息正确。
