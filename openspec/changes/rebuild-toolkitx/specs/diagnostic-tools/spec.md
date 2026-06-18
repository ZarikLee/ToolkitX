## ADDED Requirements

### Requirement: 用户可以通过服务器进行端口探测
系统 SHALL 允许用户从服务器发起 TCP 端口探测。

#### Scenario: 探测端口
- **WHEN** 用户输入目标 IP 和端口号
- **THEN** 系统从服务器发起 TCP 连接测试并返回结果（通/不通 + 延迟）

### Requirement: 用户可以进行 DNS 查询
系统 SHALL 允许用户查询 DNS 记录。

#### Scenario: 查询记录
- **WHEN** 用户输入域名并选择记录类型（A/AAAA/MX/CNAME/TXT）
- **THEN** 系统返回 DNS 查询结果

#### Scenario: 多 DNS 对比
- **WHEN** 用户输入域名
- **THEN** 系统同时查询多个 DNS 服务器并对比结果

### Requirement: 用户可以检查 SSL 证书
系统 SHALL 允许用户检查 SSL 证书信息。

#### Scenario: 检查证书
- **WHEN** 用户输入域名
- **THEN** 系统返回证书有效期、签发者、域名匹配情况

### Requirement: 用户可以检测 HTTP 响应
系统 SHALL 允许用户检测 HTTP 端点。

#### Scenario: 检测响应
- **WHEN** 用户输入 URL
- **THEN** 系统返回状态码、响应时间、Headers 信息

#### Scenario: 追踪重定向
- **WHEN** 用户输入 URL 并启用重定向追踪
- **THEN** 系统显示完整的重定向链

### Requirement: 用户可以进行路径追踪
系统 SHALL 允许用户进行 MTR/Traceroute 路径追踪。

#### Scenario: 路径追踪
- **WHEN** 用户输入目标 IP
- **THEN** 系统返回路径追踪结果 + 丢包分析

### Requirement: 系统可以生成诊断报告
系统 SHALL 在诊断完成后生成可导出的报告。

#### Scenario: 生成报告
- **WHEN** 用户完成多项诊断
- **THEN** 系统自动汇总诊断结果生成报告

#### Scenario: 导出报告
- **WHEN** 报告生成完成
- **THEN** 用户可以导出为 Markdown 或 PDF 格式
