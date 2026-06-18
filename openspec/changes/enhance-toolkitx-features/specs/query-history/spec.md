## ADDED Requirements

### Requirement: 系统记录 SQL 查询历史
系统 SHALL 自动记录用户执行的 SQL 查询。

#### Scenario: 执行查询后自动保存
- **WHEN** 用户执行 SQL 查询
- **THEN** 系统将查询语句、执行时间、结果保存到历史记录

### Requirement: 用户可以查看查询历史
系统 SHALL 允许用户查看历史查询记录。

#### Scenario: 查看历史列表
- **WHEN** 用户点击"查询历史"
- **THEN** 系统显示历史查询列表（时间、语句、耗时）

### Requirement: 用户可以收藏常用查询
系统 SHALL 允许用户收藏常用的 SQL 查询。

#### Scenario: 收藏查询
- **WHEN** 用户点击查询的"收藏"按钮
- **THEN** 系统将该查询添加到收藏列表

#### Scenario: 使用收藏查询
- **WHEN** 用户从收藏列表选择查询
- **THEN** 系统将查询语句加载到编辑器

### Requirement: 用户可以导出查询结果
系统 SHALL 允许用户将查询结果导出为 CSV 或 JSON 格式。

#### Scenario: 导出为 CSV
- **WHEN** 用户点击"导出 CSV"按钮
- **THEN** 系统下载 CSV 格式的结果文件

#### Scenario: 导出为 JSON
- **WHEN** 用户点击"导出 JSON"按钮
- **THEN** 系统下载 JSON 格式的结果文件
