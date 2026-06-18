## ADDED Requirements

### Requirement: 用户可以查看 Docker Compose 文件
系统 SHALL 允许用户查看服务器上的 Docker Compose 文件。

#### Scenario: 列出 Compose 文件
- **WHEN** 用户访问 Docker Compose 页面
- **THEN** 系统显示服务器上的 docker-compose.yml 文件列表

### Requirement: 用户可以执行 Docker Compose 命令
系统 SHALL 允许用户执行 docker-compose 命令（up、down、ps、logs 等）。

#### Scenario: 启动服务
- **WHEN** 用户选择 Compose 文件并点击"启动"
- **THEN** 系统执行 docker-compose up -d

#### Scenario: 停止服务
- **WHEN** 用户选择 Compose 文件并点击"停止"
- **THEN** 系统执行 docker-compose down

#### Scenario: 查看服务状态
- **WHEN** 用户选择 Compose 文件并点击查看状态
- **THEN** 系统执行 docker-compose ps 并显示结果

### Requirement: 用户可以查看 Compose 服务日志
系统 SHALL 允许用户查看 Docker Compose 服务的日志。

#### Scenario: 查看日志
- **WHEN** 用户选择某个服务并点击查看日志
- **THEN** 系统显示该服务的最新日志
