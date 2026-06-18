## ADDED Requirements

### Requirement: 用户可以查看服务器进程列表
系统 SHALL 允许用户查看服务器上运行的进程列表。

#### Scenario: 查看进程列表
- **WHEN** 用户访问进程管理页面
- **THEN** 系统显示所有运行中的进程（PID、名称、CPU、内存、状态）

### Requirement: 用户可以搜索和过滤进程
系统 SHALL 允许用户按名称或状态搜索和过滤进程。

#### Scenario: 搜索进程
- **WHEN** 用户在搜索框输入进程名
- **THEN** 系统显示匹配的进程列表

### Requirement: 用户可以终止进程
系统 SHALL 允许用户终止选中的进程。

#### Scenario: 终止进程
- **WHEN** 用户选中进程并点击"终止"按钮
- **THEN** 系统发送 SIGTERM 信号终止该进程

### Requirement: 用户可以查看进程详细信息
系统 SHALL 允许用户查看进程的详细信息。

#### Scenario: 查看进程详情
- **WHEN** 用户点击进程名称
- **THEN** 系统显示进程的详细信息（命令行、打开文件、网络连接等）
