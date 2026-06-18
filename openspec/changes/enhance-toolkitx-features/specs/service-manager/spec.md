## ADDED Requirements

### Requirement: 用户可以查看 systemd 服务列表
系统 SHALL 允许用户查看服务器上的 systemd 服务列表。

#### Scenario: 查看服务列表
- **WHEN** 用户访问服务管理页面
- **THEN** 系统显示所有 systemd 服务（名称、状态、启用状态）

### Requirement: 用户可以管理服务状态
系统 SHALL 允许用户启动、停止、重启 systemd 服务。

#### Scenario: 启动服务
- **WHEN** 用户点击服务的"启动"按钮
- **THEN** 系统执行 systemctl start <service>

#### Scenario: 停止服务
- **WHEN** 用户点击服务的"停止"按钮
- **THEN** 系统执行 systemctl stop <service>

#### Scenario: 重启服务
- **WHEN** 用户点击服务的"重启"按钮
- **THEN** 系统执行 systemctl restart <service>

### Requirement: 用户可以管理服务启用状态
系统 SHALL 允许用户启用或禁用 systemd 服务开机自启。

#### Scenario: 启用服务
- **WHEN** 用户点击服务的"启用"按钮
- **THEN** 系统执行 systemctl enable <service>

#### Scenario: 禁用服务
- **WHEN** 用户点击服务的"禁用"按钮
- **THEN** 系统执行 systemctl disable <service>

### Requirement: 用户可以查看服务日志
系统 SHALL 允许用户查看 systemd 服务的日志。

#### Scenario: 查看服务日志
- **WHEN** 用户点击服务的"日志"按钮
- **THEN** 系统显示该服务的最新日志
