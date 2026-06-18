# Tasks

## 1. 项目重构 - 清理旧代码

- [x] 1.1 删除旧的 API 路由（docker、databases、servers 的 CRUD）
- [x] 1.2 删除旧的页面组件（containers、databases、servers、monitor、process、services）
- [x] 1.3 删除旧的组件（docker-compose、file-manager、monitor、process、service）
- [x] 1.4 更新侧边栏导航（新模块结构）
- [x] 1.5 更新首页仪表板（新功能入口）

## 2. 配置生成器模块

- [x] 2.1 配置生成器主页面布局 (src/app/config-generator/page.tsx)
- [x] 2.2 Docker Compose 生成器 (src/components/config/docker-compose-generator.tsx)
- [x] 2.3 Nginx 配置生成器 (src/components/config/nginx-generator.tsx)
- [x] 2.4 Systemd 服务生成器 (src/components/config/systemd-generator.tsx)
- [x] 2.5 Cron 表达式生成器 (src/components/config/cron-generator.tsx)
- [x] 2.6 AI 配置生成区域 (src/components/config/ai-config-generator.tsx)
- [x] 2.7 配置模板数据 (src/lib/config-templates.ts)

## 3. 脚本库模块

- [x] 3.1 脚本库主页面布局 (src/app/scripts/page.tsx)
- [x] 3.2 Python 脚本模板数据 (src/data/python-scripts.ts)
- [x] 3.3 SQL 脚本模板数据 (src/data/sql-scripts.ts)
- [x] 3.4 Shell 脚本模板数据 (src/data/shell-scripts.ts)
- [x] 3.5 SQL 建表语句生成器 (src/components/scripts/sql-generator.tsx)
- [x] 3.6 脚本详情展示组件 (src/components/scripts/script-detail.tsx)
- [x] 3.7 AI 脚本生成区域 (src/components/scripts/ai-script-generator.tsx)

## 4. 诊断工具模块

- [x] 4.1 诊断工具主页面布局 (src/app/diagnostics/page.tsx)
- [x] 4.2 端口探测组件 (src/components/diagnostics/port-scanner.tsx)
- [x] 4.3 DNS 查询组件 (src/components/diagnostics/dns-lookup.tsx)
- [x] 4.4 SSL 证书检查组件 (src/components/diagnostics/ssl-checker.tsx)
- [x] 4.5 HTTP 响应检测组件 (src/components/diagnostics/http-checker.tsx)
- [x] 4.6 Traceroute 组件 (src/components/diagnostics/traceroute.tsx)
- [ ] 4.7 诊断报告生成器 (src/components/diagnostics/diagnostic-report.tsx)
- [ ] 4.8 诊断 API 路由 (src/app/api/diagnostics/route.ts)

## 5. 数据处理模块

- [x] 5.1 数据处理主页面布局 (src/app/tools/page.tsx)
- [x] 5.2 JSON 工具组件 (src/components/tools/json-tool.tsx)
- [x] 5.3 编码工具组件 (src/components/tools/encoding-tool.tsx)
- [x] 5.4 时间戳工具组件 (src/components/tools/timestamp-tool.tsx)
- [x] 5.5 密码生成器组件 (src/components/tools/password-generator.tsx)
- [x] 5.6 哈希计算器组件 (src/components/tools/hash-calculator.tsx)

## 6. 在线终端模块（差异化）

- [x] 6.1 终端主页面布局 (src/app/terminal/page.tsx)
- [x] 6.2 终端组件重构 (src/components/terminal/ssh-terminal.tsx)
- [x] 6.3 快速命令库组件 (src/components/terminal/command-palette.tsx)
- [x] 6.4 命令笔记本组件 (src/components/terminal/command-history.tsx)
- [x] 6.5 会话快照组件 (src/components/terminal/session-snapshot.tsx)
- [x] 6.6 服务器列表管理 (src/components/terminal/server-list.tsx)

## 7. AI 集成

- [x] 7.1 AI 服务 API (src/app/api/ai/route.ts)
- [x] 7.2 AI 配置生成逻辑
- [x] 7.3 AI 脚本生成逻辑
- [x] 7.4 AI 诊断建议逻辑

## 8. 通用组件

- [x] 8.1 代码编辑器组件 (src/components/ui/code-editor.tsx)
- [x] 8.2 复制按钮组件 (src/components/ui/copy-button.tsx)
- [x] 8.3 下载按钮组件 (src/components/ui/download-button.tsx)
- [x] 8.4 侧边栏更新（新导航结构）

## 9. 测试和部署

- [x] 9.1 构建测试
- [x] 9.2 部署到生产服务器
- [x] 9.3 更新 systemd 服务配置
