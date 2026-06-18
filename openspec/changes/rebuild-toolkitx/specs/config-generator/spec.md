## ADDED Requirements

### Requirement: 用户可以通过引导式表单生成 Docker Compose 配置
系统 SHALL 提供引导式表单，用户选择服务类型、填写参数后自动生成 docker-compose.yml。

#### Scenario: 选择服务类型
- **WHEN** 用户访问配置生成器页面
- **THEN** 系统显示可用的服务模板列表（MySQL、Redis、Nginx、PostgreSQL 等）

#### Scenario: 填写参数
- **WHEN** 用户选择某个服务模板
- **THEN** 系统显示该服务的配置表单，每项参数附带说明文字

#### Scenario: 生成配置
- **WHEN** 用户填写完参数并点击"生成"
- **THEN** 系统生成完整的 docker-compose.yml 配置

#### Scenario: 复制或下载配置
- **WHEN** 配置生成完成
- **THEN** 用户可以一键复制或下载配置文件

### Requirement: 用户可以通过引导式表单生成 Nginx 配置
系统 SHALL 提供引导式表单生成 Nginx 配置文件。

#### Scenario: 选择配置类型
- **WHEN** 用户选择 Nginx 配置生成器
- **THEN** 系统显示配置类型选项（反向代理、静态站点、负载均衡）

#### Scenario: 生成配置
- **WHEN** 用户填写参数并点击"生成"
- **THEN** 系统生成完整的 Nginx 配置文件

### Requirement: 用户可以通过引导式表单生成 Systemd 服务文件
系统 SHALL 提供引导式表单生成 .service 文件。

#### Scenario: 填写服务参数
- **WHEN** 用户选择 Systemd 服务生成器
- **THEN** 系统显示表单（服务名称、工作目录、用户、环境变量等）

#### Scenario: 生成配置
- **WHEN** 用户填写完参数并点击"生成"
- **THEN** 系统生成完整的 .service 文件 + systemctl 命令

### Requirement: 用户可以使用 Cron 表达式生成器
系统 SHALL 提供可视化的 Cron 表达式生成和解释工具。

#### Scenario: 可视化生成
- **WHEN** 用户选择 Cron 表达式生成器
- **THEN** 系统显示可视化频率选择器（分钟、小时、日期、月份、星期）

#### Scenario: 实时预览
- **WHEN** 用户设置 Cron 表达式
- **THEN** 系统实时显示下次 5 次执行时间

#### Scenario: 解释表达式
- **WHEN** 用户输入现有 Cron 表达式
- **THEN** 系统显示人类可读的解释

### Requirement: 用户可以通过 AI 生成配置
系统 SHALL 提供 AI 辅助区域，用户描述需求后 AI 生成配置。

#### Scenario: 描述需求
- **WHEN** 用户在 AI 区域输入需求描述
- **THEN** 系统将描述发送到 AI 并返回生成的配置

#### Scenario: 优化建议
- **WHEN** 用户已有配置
- **THEN** AI 可以分析配置并提供优化建议
