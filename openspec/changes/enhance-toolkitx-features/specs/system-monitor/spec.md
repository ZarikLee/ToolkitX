## ADDED Requirements

### Requirement: 系统显示实时 CPU 使用率
系统 SHALL 实时显示服务器的 CPU 使用率。

#### Scenario: 查看 CPU 使用率
- **WHEN** 用户访问系统监控页面
- **THEN** 系统显示当前 CPU 使用率百分比和历史趋势图

### Requirement: 系统显示实时内存使用情况
系统 SHALL 实时显示服务器的内存使用情况。

#### Scenario: 查看内存使用
- **WHEN** 用户访问系统监控页面
- **THEN** 系统显示已用内存、可用内存、使用百分比

### Requirement: 系统显示实时磁盘使用情况
系统 SHALL 实时显示服务器的磁盘使用情况。

#### Scenario: 查看磁盘使用
- **WHEN** 用户访问系统监控页面
- **THEN** 系统显示各分区的使用情况

### Requirement: 系统显示实时网络流量
系统 SHALL 实时显示服务器的网络流量。

#### Scenario: 查看网络流量
- **WHEN** 用户访问系统监控页面
- **THEN** 系统显示网络上传/下载速度和流量统计

### Requirement: 系统支持自定义监控间隔
系统 SHALL 允许用户设置监控数据刷新间隔。

#### Scenario: 设置刷新间隔
- **WHEN** 用户在设置中选择刷新间隔（1s、5s、10s、30s）
- **THEN** 系统按设定间隔更新监控数据
