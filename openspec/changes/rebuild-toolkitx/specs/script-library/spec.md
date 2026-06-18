## ADDED Requirements

### Requirement: 系统提供 Python 脚本模板库
系统 SHALL 提供常用的 Python 自动化脚本模板。

#### Scenario: 浏览脚本模板
- **WHEN** 用户访问脚本库页面
- **THEN** 系统显示 Python 脚本分类列表（批量巡检、日志分析、自动备份、监控告警）

#### Scenario: 查看脚本详情
- **WHEN** 用户点击某个脚本模板
- **THEN** 系统显示脚本说明、使用方法、参数说明

#### Scenario: 复制或下载脚本
- **WHEN** 用户选择脚本
- **THEN** 用户可以一键复制或下载脚本文件

### Requirement: 系统提供 SQL 脚本模板库
系统 SHALL 提供 SQL 脚本模板。

#### Scenario: 建表语句生成器
- **WHEN** 用户选择建表语句生成器
- **THEN** 系统显示表单（表名、字段名、类型、约束等）

#### Scenario: 生成建表语句
- **WHEN** 用户填写完字段信息并点击"生成"
- **THEN** 系统生成完整的 CREATE TABLE 语句

#### Scenario: 数据迁移脚本
- **WHEN** 用户选择数据迁移脚本
- **THEN** 系统提供迁移脚本模板和使用说明

### Requirement: 系统提供 Shell 脚本模板库
系统 SHALL 提供 Shell 脚本模板。

#### Scenario: 浏览脚本模板
- **WHEN** 用户访问 Shell 脚本分类
- **THEN** 系统显示脚本列表（批量操作、部署脚本、环境初始化）

### Requirement: 用户可以通过 AI 生成脚本
系统 SHALL 提供 AI 辅助生成脚本的功能。

#### Scenario: 描述需求
- **WHEN** 用户在 AI 区域输入脚本需求描述
- **THEN** 系统将描述发送到 AI 并返回生成的脚本 + 使用说明

#### Scenario: 修改脚本
- **WHEN** 用户已有脚本并需要修改
- **THEN** AI 可以根据用户描述修改脚本
