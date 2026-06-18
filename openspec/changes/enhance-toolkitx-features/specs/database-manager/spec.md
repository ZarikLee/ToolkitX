## MODIFIED Requirements

### Requirement: 用户可以执行 SQL 查询
系统 SHALL 允许用户对已配置的数据库执行 SQL 查询，支持语法高亮和自动补全。

#### Scenario: 执行查询
- **WHEN** 用户在查询编辑器中输入 SQL 语句并点击"执行"
- **THEN** 系统执行查询并显示查询结果

#### Scenario: 查询结果展示
- **WHEN** 查询执行成功
- **THEN** 系统以表格形式显示查询结果

#### Scenario: 查询错误处理
- **WHEN** 查询执行失败
- **THEN** 系统显示错误信息，帮助用户定位问题

## ADDED Requirements

### Requirement: 系统提供 SQL 语法高亮
系统 SHALL 在查询编辑器中提供 SQL 语法高亮。

#### Scenario: 语法高亮
- **WHEN** 用户在编辑器中输入 SQL
- **THEN** 系统对关键字、字符串、数字等进行语法高亮

### Requirement: 系统提供 SQL 自动补全
系统 SHALL 在查询编辑器中提供 SQL 自动补全。

#### Scenario: 自动补全
- **WHEN** 用户输入部分 SQL 关键字或表名
- **THEN** 系统显示自动补全建议

### Requirement: 用户可以格式化 SQL
系统 SHALL 允许用户格式化 SQL 查询语句。

#### Scenario: 格式化 SQL
- **WHEN** 用户点击"格式化"按钮
- **THEN** 系统格式化编辑器中的 SQL 语句

### Requirement: 用户可以查看表结构
系统 SHALL 允许用户查看数据库表的结构信息。

#### Scenario: 查看表结构
- **WHEN** 用户点击表名查看结构
- **THEN** 系统显示表的列名、类型、约束等信息
