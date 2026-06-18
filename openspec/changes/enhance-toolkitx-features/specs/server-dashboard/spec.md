## MODIFIED Requirements

### Requirement: 系统显示服务器健康状态
系统 SHALL 展示服务器的健康状态指标，包括实时图表。

#### Scenario: 查看 CPU 使用率
- **WHEN** 用户查看服务器详情
- **THEN** 系统显示当前 CPU 使用率百分比和历史趋势图

#### Scenario: 查看内存使用情况
- **WHEN** 用户查看服务器详情
- **THEN** 系统显示已用内存/总内存及使用百分比和历史趋势图

#### Scenario: 查看磁盘使用情况
- **WHEN** 用户查看服务器详情
- **THEN** 系统显示各磁盘分区的使用情况

#### Scenario: 查看网络流量
- **WHEN** 用户查看服务器详情
- **THEN** 系统显示网络上传/下载速度和流量统计

## ADDED Requirements

### Requirement: 用户可以查看服务器进程
系统 SHALL 允许用户查看服务器上运行的进程。

#### Scenario: 查看进程列表
- **WHEN** 用户点击"进程"标签
- **THEN** 系统显示服务器上运行的进程列表

### Requirement: 用户可以管理系统服务
系统 SHALL 允许用户管理 systemd 服务。

#### Scenario: 查看服务列表
- **WHEN** 用户点击"服务"标签
- **THEN** 系统显示 systemd 服务列表

#### Scenario: 管理服务状态
- **WHEN** 用户点击服务的启动/停止/重启按钮
- **THEN** 系统执行相应的 systemctl 命令

### Requirement: 用户可以通过 Web 终端连接服务器
系统 SHALL 允许用户通过 Web 终端连接服务器。

#### Scenario: 打开终端
- **WHEN** 用户点击"终端"按钮
- **THEN** 系统打开 Web SSH 终端连接到服务器
