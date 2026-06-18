## ADDED Requirements

### Requirement: 系统提供完整的设置页面
系统 SHALL 提供设置页面，允许用户配置应用偏好。

#### Scenario: 访问设置页面
- **WHEN** 用户点击侧边栏的"设置"
- **THEN** 系统显示设置页面

### Requirement: 用户可以切换主题
系统 SHALL 允许用户切换深色/浅色主题。

#### Scenario: 切换到深色主题
- **WHEN** 用户选择"深色"主题
- **THEN** 系统切换到深色主题

#### Scenario: 切换到浅色主题
- **WHEN** 用户选择"浅色"主题
- **THEN** 系统切换到浅色主题

#### Scenario: 跟随系统偏好
- **WHEN** 用户选择"跟随系统"
- **THEN** 系统根据系统设置自动切换主题

### Requirement: 用户可以配置监控刷新间隔
系统 SHALL 允许用户配置系统监控数据的刷新间隔。

#### Scenario: 设置刷新间隔
- **WHEN** 用户选择刷新间隔（1s、5s、10s、30s）
- **THEN** 系统保存设置并按新间隔刷新

### Requirement: 用户可以配置终端设置
系统 SHALL 允许用户配置 SSH 终端的字体、字号等。

#### Scenario: 设置终端字体
- **WHEN** 用户选择终端字体和字号
- **THEN** 系统保存设置并应用到终端

### Requirement: 系统持久化用户设置
系统 SHALL 将用户设置保存到本地，下次访问时自动加载。

#### Scenario: 保存设置
- **WHEN** 用户修改设置
- **THEN** 系统将设置保存到 localStorage

#### Scenario: 加载设置
- **WHEN** 用户访问应用
- **THEN** 系统从 localStorage 加载之前保存的设置
