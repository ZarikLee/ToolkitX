## ADDED Requirements

### Requirement: 用户可以通过 Web 终端连接自己的服务器
系统 SHALL 提供 Web SSH 终端，允许用户连接自己的服务器（不连接客户服务器）。

#### Scenario: 连接服务器
- **WHEN** 用户从服务器列表选择服务器并点击连接
- **THEN** 系统建立 SSH 连接并显示终端界面

#### Scenario: 断开连接
- **WHEN** 用户点击断开按钮
- **THEN** 系统关闭 SSH 连接

### Requirement: 系统提供快速命令库
系统 SHALL 提供分类收藏的常用命令库。

#### Scenario: 浏览命令库
- **WHEN** 用户打开命令库面板
- **THEN** 系统显示按类别分组的常用命令（Docker、系统、网络、数据库等）

#### Scenario: 插入命令
- **WHEN** 用户点击某个命令
- **THEN** 系统将命令插入终端

#### Scenario: 收藏命令
- **WHEN** 用户点击命令的收藏按钮
- **THEN** 系统将命令添加到收藏夹

### Requirement: 系统记录命令历史
系统 SHALL 自动记录用户执行过的命令。

#### Scenario: 查看历史
- **WHEN** 用户打开命令笔记本
- **THEN** 系统显示按时间排序的历史命令列表

#### Scenario: 搜索历史
- **WHEN** 用户输入搜索关键词
- **THEN** 系统过滤显示匹配的历史命令

#### Scenario: 重新执行
- **WHEN** 用户点击历史命令的"执行"按钮
- **THEN** 系统将命令插入终端并执行

### Requirement: 系统支持会话快照
系统 SHALL 允许用户保存和分享终端会话。

#### Scenario: 保存快照
- **WHEN** 用户点击"保存快照"
- **THEN** 系统保存当前终端输出

#### Scenario: 分享快照
- **WHEN** 用户点击"分享"
- **THEN** 系统生成可分享的快照链接

### Requirement: 终端与诊断工具联动
系统 SHALL 支持从诊断工具跳转到终端。

#### Scenario: 诊断发现问题
- **WHEN** 诊断工具发现端口不通或其他问题
- **THEN** 系统显示"在终端中排查"按钮

#### Scenario: 跳转终端
- **WHEN** 用户点击"在终端中排查"
- **THEN** 系统打开终端并预填充排查命令
