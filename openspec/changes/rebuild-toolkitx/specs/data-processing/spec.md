## ADDED Requirements

### Requirement: 用户可以格式化和转换 JSON 数据
系统 SHALL 提供 JSON 格式化、压缩、校验和格式转换功能。

#### Scenario: 格式化 JSON
- **WHEN** 用户粘贴 JSON 数据并点击"格式化"
- **THEN** 系统显示格式化后的 JSON

#### Scenario: 压缩 JSON
- **WHEN** 用户点击"压缩"
- **THEN** 系统将 JSON 压缩为单行

#### Scenario: 校验 JSON
- **WHEN** 用户粘贴 JSON 数据
- **THEN** 系统自动校验并显示错误位置

#### Scenario: 格式转换
- **WHEN** 用户选择转换目标（YAML/CSV）
- **THEN** 系统将 JSON 转换为对应格式

### Requirement: 用户可以进行编码解码操作
系统 SHALL 提供 Base64、URL 编解码和 JWT 解析功能。

#### Scenario: Base64 编解码
- **WHEN** 用户输入文本并选择编码/解码
- **THEN** 系统返回 Base64 编码/解码结果

#### Scenario: URL 编解码
- **WHEN** 用户输入 URL 并选择编码/解码
- **THEN** 系统返回 URL 编码/解码结果

#### Scenario: JWT 解析
- **WHEN** 用户粘贴 JWT Token
- **THEN** 系统解析并显示 Header、Payload、Signature

### Requirement: 用户可以转换时间戳
系统 SHALL 提供 Unix 时间戳和人类可读时间的互转功能。

#### Scenario: Unix 转人类可读
- **WHEN** 用户输入 Unix 时间戳
- **THEN** 系统显示人类可读的时间格式

#### Scenario: 人类可读转 Unix
- **WHEN** 用户输入人类可读的时间
- **THEN** 系统显示对应的 Unix 时间戳

#### Scenario: 时区转换
- **WHEN** 用户选择源时区和目标时区
- **THEN** 系统进行时区转换

### Requirement: 用户可以生成密码
系统 SHALL 提供密码生成器。

#### Scenario: 生成密码
- **WHEN** 用户设置密码长度和字符集
- **THEN** 系统生成随机密码

### Requirement: 用户可以计算哈希值
系统 SHALL 提供哈希计算功能。

#### Scenario: 计算哈希
- **WHEN** 用户输入文本并选择哈希算法（MD5/SHA256/SHA512）
- **THEN** 系统返回对应的哈希值
