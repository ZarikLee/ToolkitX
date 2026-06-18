## MODIFIED Requirements

### Requirement: 系统支持深色主题
系统 SHALL 提供深色主题，并支持主题切换。

#### Scenario: 默认使用深色主题
- **WHEN** 用户首次访问 ToolkitX
- **THEN** 系统默认显示深色主题

#### Scenario: 切换主题
- **WHEN** 用户点击主题切换按钮
- **THEN** 系统在深色和浅色主题间切换

#### Scenario: 跟随系统偏好
- **WHEN** 用户选择"跟随系统"主题
- **THEN** 系统根据系统设置自动切换主题

### Requirement: 系统提供统一的导航框架
系统 SHALL 提供侧边栏导航，支持在不同功能模块间切换。

#### Scenario: 查看导航菜单
- **WHEN** 用户访问 ToolkitX
- **THEN** 系统显示侧边栏导航，包含容器管理、服务器仪表板、数据库管理、终端、文件管理等菜单项

#### Scenario: 切换功能模块
- **WHEN** 用户点击导航菜单项
- **THEN** 系统切换到对应的功能页面

## ADDED Requirements

### Requirement: 系统支持菜单折叠
系统 SHALL 支持折叠/展开侧边栏菜单。

#### Scenario: 折叠菜单
- **WHEN** 用户点击折叠按钮
- **THEN** 系统折叠侧边栏，仅显示图标

#### Scenario: 展开菜单
- **WHEN** 用户点击展开按钮
- **THEN** 系统展开侧边栏，显示图标和文字

### Requirement: 系统显示面包屑导航
系统 SHALL 显示当前页面的面包屑导航。

#### Scenario: 显示面包屑
- **WHEN** 用户访问子页面
- **THEN** 系统显示当前路径的面包屑导航
