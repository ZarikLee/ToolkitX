## Context

ToolkitX 是一个新的 Web 工具平台，面向运维工程师，将 Docker 容器管理、服务器监控、数据库操作等高频运维任务整合到一个统一的 Web 界面中。当前运维工作分散在多个命令行工具和 Web 控制台之间，效率低下。

## Goals / Non-Goals

**Goals:**
- 提供统一的 Web 界面管理 Docker 容器生命周期
- 展示服务器基础信息与健康状态
- 支持数据库连接配置与 SQL 查询执行
- 提供深色主题的现代化 UI

**Non-Goals:**
- 不实现完整的 CI/CD 流水线
- 不替代专业的监控系统（如 Prometheus/Grafana）
- 不实现多用户权限管理（初期版本）
- 不支持 Kubernetes 集群管理

## Decisions

### 前端框架：Next.js
- **选择**: Next.js + React + TypeScript
- **理由**: SSR 支持、文件系统路由、丰富的生态、TypeScript 类型安全
- **替代方案**: Vite + React（更轻量但缺少 SSR）, Vue 3（团队更熟悉 React）

### UI 组件库：Tailwind CSS + shadcn/ui
- **选择**: Tailwind CSS + shadcn/ui
- **理由**: 高度可定制、深色主题原生支持、组件可复制修改
- **替代方案**: Ant Design（更重型）、Material UI（风格不匹配）

### 后端框架：Next.js API Routes
- **选择**: Next.js API Routes (Route Handlers)
- **理由**: 与前端统一技术栈、部署简单、TypeScript 支持
- **替代方案**: Express.js（更灵活但增加复杂度）、FastAPI（Python 生态）

### 数据存储：JSON 配置文件
- **选择**: 本地 JSON 配置文件存储服务器和数据库连接信息
- **理由**: 简单、无需额外数据库、适合工具类应用
- **替代方案**: SQLite（增加依赖）、环境变量（不适合动态配置）

### Docker 交互：Docker Engine API
- **选择**: 通过 HTTP API 与 Docker daemon 交互
- **理由**: 标准接口、无需额外依赖、支持远程管理
- **替代方案**: SSH 执行命令（安全性差）、Docker SDK（增加依赖）

## Risks / Trade-offs

- **[安全性]** 通过 Web 界面操作服务器和数据库存在安全风险 → 使用本地部署、不暴露到公网、后续版本添加认证
- **[性能]** 大量容器或数据库查询可能影响响应速度 → 实现分页、限制查询结果数量
- **[兼容性]** 不同 Docker 版本 API 可能有差异 → 使用兼容性较好的 API 版本
- **[维护性]** 配置文件需要手动管理 → 后续版本可考虑添加 Web 界面配置
