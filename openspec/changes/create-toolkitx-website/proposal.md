## Why

运维工程师在日常工作中需要频繁操作 Docker 容器、管理服务器、维护数据库等，这些操作分散在多个命令行工具和 Web 控制台之间，效率低下且容易出错。ToolkitX 旨在将这些高频运维操作集成到一个统一的 Web 工具平台中，提升运维效率。

## What Changes

- 创建 ToolkitX Web 应用，提供容器化部署、服务器管理、数据库管理等功能
- 实现 Docker 容器生命周期管理（查看、启动、停止、重启、删除）
- 实现服务器信息概览与基础健康监控
- 实现数据库连接管理与基本查询执行
- 提供统一的 Web 界面，支持深色主题

## Capabilities

### New Capabilities
- `container-management`: Docker 容器的查看、启动、停止、重启、删除等生命周期管理
- `server-dashboard`: 服务器基础信息展示与健康状态监控
- `database-manager`: 数据库连接配置与 SQL 查询执行
- `web-ui`: 统一的 Web 界面框架，包含导航、布局、深色主题支持

### Modified Capabilities

## Impact

- 新增前端项目（React/Next.js）
- 需要后端 API 服务与 Docker daemon、数据库等交互
- 依赖 Docker Engine API、数据库驱动等
- 需要配置文件管理（服务器列表、数据库连接信息）
