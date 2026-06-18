## Why

当前 ToolkitX 功能较为基础，仅提供简单的容器列表查看、服务器添加和数据库连接功能，无法满足运维工程师的日常工作效率需求。需要增加更专业、更丰富的功能，同时完善设置页面和主题切换体验。

## What Changes

- 增强容器管理：实时日志流、资源监控、容器终端、Docker Compose 支持
- 增强服务器管理：系统指标仪表板（CPU/内存/磁盘/网络）、进程管理、服务管理、SSH 终端
- 增强数据库管理：查询历史、结果导出、SQL 格式化、Schema 可视化
- 新增终端模块：Web SSH 终端连接远程服务器
- 新增文件管理器：浏览和编辑远程服务器文件
- 完善设置页面：主题切换、用户偏好、连接配置管理
- 改进主题系统：支持跟随系统偏好、改进浅色主题样式

## Capabilities

### New Capabilities
- `ssh-terminal`: Web SSH 终端，支持连接远程服务器执行命令
- `file-manager`: 远程文件管理器，支持浏览、编辑、上传、下载文件
- `docker-compose`: Docker Compose 文件管理和容器编排
- `system-monitor`: 实时系统指标监控仪表板（CPU/内存/磁盘/网络）
- `process-manager`: 服务器进程查看和管理
- `service-manager`: systemd 服务管理（启动/停止/重启/启用/禁用）
- `query-history`: SQL 查询历史记录和收藏
- `settings-page`: 完整的设置页面（主题、偏好、连接管理）

### Modified Capabilities
- `container-management`: 增加实时日志流、资源监控、容器终端
- `server-dashboard`: 增加系统指标图表、进程和服务管理
- `database-manager`: 增加查询历史、结果导出、SQL 格式化
- `web-ui`: 改进主题切换、支持系统偏好跟随

## Impact

- 新增 SSH 终端组件（xterm.js + ssh2）
- 新增文件管理器组件
- 新增系统监控图表组件（recharts）
- 修改所有现有页面组件
- 新增多个 API 路由
- 需要安装新依赖：xterm.js, ssh2, recharts, @codemirror/lang-sql
