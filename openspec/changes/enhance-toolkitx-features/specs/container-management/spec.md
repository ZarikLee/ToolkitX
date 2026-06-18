## MODIFIED Requirements

### Requirement: 用户可以查看容器日志
系统 SHALL 允许用户查看容器的运行日志，支持实时日志流。

#### Scenario: 查看容器日志
- **WHEN** 用户在容器详情页点击"日志"标签
- **THEN** 系统显示容器的标准输出和错误输出日志

#### Scenario: 实时日志流
- **WHEN** 用户点击"实时日志"按钮
- **THEN** 系统通过 WebSocket 实时推送容器日志

### Requirement: 用户可以查看容器详情
系统 SHALL 允许用户查看容器的详细信息，包括资源使用情况。

#### Scenario: 查看容器详情
- **WHEN** 用户点击容器名称或详情按钮
- **THEN** 系统显示容器的详细信息，包括环境变量、端口映射、挂载卷、资源使用等

#### Scenario: 查看容器资源使用
- **WHEN** 用户查看容器详情
- **THEN** 系统显示容器的 CPU、内存、网络使用情况

## ADDED Requirements

### Requirement: 用户可以在容器内执行命令
系统 SHALL 允许用户在容器内执行命令（exec）。

#### Scenario: 执行容器命令
- **WHEN** 用户在容器详情页输入命令并执行
- **THEN** 系统在容器内执行命令并显示输出

### Requirement: 用户可以查看容器资源使用图表
系统 SHALL 以图表形式展示容器的资源使用趋势。

#### Scenario: 查看资源图表
- **WHEN** 用户点击"资源"标签
- **THEN** 系统显示容器的 CPU、内存使用趋势图
