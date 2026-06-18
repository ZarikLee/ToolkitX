# Tasks

## 1. SSH 终端模块

- [x] 1.1 安装 xterm.js 和相关依赖
- [x] 1.2 实现 SSH 终端前端组件 (src/components/terminal/ssh-terminal.tsx)
- [x] 1.3 实现 WebSocket 代理 API (src/app/api/ssh/route.ts)
- [x] 1.4 实现后端 SSH 连接管理 (src/lib/ssh.ts)
- [x] 1.5 实现多标签终端组件 (src/components/terminal/terminal-tabs.tsx)
- [x] 1.6 实现终端设置（字体、字号）
- [x] 1.7 创建终端页面 (src/app/terminal/page.tsx)

## 2. 文件管理器模块

- [x] 2.1 实现文件列表组件 (src/components/file-manager/file-list.tsx)
- [x] 2.2 实现文件上传组件 (src/components/file-manager/file-upload.tsx)
- [x] 2.3 实现文件下载功能
- [x] 2.4 实现文件编辑器组件 (src/components/file-manager/file-editor.tsx)
- [x] 2.5 实现文件操作 API (src/app/api/files/route.ts)
- [x] 2.6 创建文件管理页面 (src/app/files/page.tsx)

## 3. Docker Compose 模块

- [x] 3.1 实现 Compose 文件列表组件 (src/components/docker-compose/compose-list.tsx)
- [x] 3.2 实现 Compose 命令执行功能
- [x] 3.3 实现服务状态显示组件 (src/components/docker-compose/service-status.tsx)
- [x] 3.4 实现服务日志查看组件 (src/components/docker-compose/service-logs.tsx)
- [x] 3.5 实现 Compose API (src/app/api/docker-compose/route.ts)
- [x] 3.6 创建 Docker Compose 页面 (src/app/docker-compose/page.tsx)

## 4. 系统监控模块

- [x] 4.1 安装 recharts 依赖
- [x] 4.2 实现 CPU 使用率图表组件 (src/components/monitor/cpu-chart.tsx)
- [x] 4.3 实现内存使用图表组件 (src/components/monitor/memory-chart.tsx)
- [x] 4.4 实现磁盘使用图表组件 (src/components/monitor/disk-chart.tsx)
- [x] 4.5 实现网络流量图表组件 (src/components/monitor/network-chart.tsx)
- [x] 4.6 实现系统监控 API (src/app/api/monitor/route.ts)
- [x] 4.7 实现 WebSocket 实时数据推送
- [x] 4.8 创建系统监控页面 (src/app/monitor/page.tsx)

## 5. 进程管理模块

- [x] 5.1 实现进程列表组件 (src/components/process/process-list.tsx)
- [x] 5.2 实现进程搜索和过滤组件 (src/components/process/process-filter.tsx)
- [x] 5.3 实现进程详情组件 (src/components/process/process-detail.tsx)
- [x] 5.4 实现进程管理 API (src/app/api/process/route.ts)
- [x] 5.5 创建进程管理页面 (src/app/process/page.tsx)

## 6. 服务管理模块

- [x] 6.1 实现服务列表组件 (src/components/service/service-list.tsx)
- [x] 6.2 实现服务操作组件 (src/components/service/service-actions.tsx)
- [x] 6.3 实现服务日志组件 (src/components/service/service-logs.tsx)
- [x] 6.4 实现服务管理 API (src/app/api/services/route.ts)
- [x] 6.5 创建服务管理页面 (src/app/services/page.tsx)

## 7. SQL 编辑器增强

- [x] 7.1 安装 CodeMirror 依赖
- [x] 7.2 实现 SQL 编辑器组件 (src/components/database/sql-editor.tsx)
- [x] 7.3 实现 SQL 语法高亮
- [x] 7.4 实现 SQL 自动补全
- [x] 7.5 实现 SQL 格式化功能
- [x] 7.6 实现查询历史组件 (src/components/database/query-history.tsx)
- [x] 7.7 实现查询收藏功能
- [x] 7.8 实现查询结果导出 (CSV/JSON)
- [x] 7.9 实现表结构查看组件 (src/components/database/table-schema.tsx)

## 8. 设置页面模块

- [x] 8.1 实现设置页面布局 (src/app/settings/page.tsx)
- [x] 8.2 实现主题设置组件 (src/components/settings/theme-settings.tsx)
- [x] 8.3 实现监控设置组件 (src/components/settings/monitor-settings.tsx)
- [x] 8.4 实现终端设置组件 (src/components/settings/terminal-settings.tsx)
- [x] 8.5 实现设置持久化（localStorage）

## 9. 侧边栏和导航增强

- [x] 9.1 更新侧边栏添加新菜单项
- [x] 9.2 实现菜单折叠/展开功能
- [x] 9.3 实现面包屑导航组件
- [x] 9.4 更新图标和样式

## 10. 测试和部署

- [ ] 10.1 编写单元测试
- [ ] 10.2 编写集成测试
- [x] 10.3 部署到生产服务器
- [x] 10.4 更新 systemd 服务配置
- [x] 10.5 更新文档
