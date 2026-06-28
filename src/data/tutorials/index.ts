export interface TutorialMeta {
  slug: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  readTime: string;
  tags: string[];
}

export interface TutorialCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  tutorials: TutorialMeta[];
}

export const categories: TutorialCategory[] = [
  {
    id: "linux",
    name: "Linux",
    description: "Linux 系统管理与运维",
    icon: "🐧",
    color: "#f97316",
    gradient: "from-orange-500 to-red-500",
    tutorials: [
      { slug: "linux-basics", title: "Linux 基础入门", description: "Linux 系统简介、安装与基本操作", difficulty: "beginner", readTime: "15min", tags: ["入门", "基础", "安装"] },
      { slug: "file-operations", title: "文件与目录操作", description: "ls, cd, cp, mv, rm, mkdir 等文件操作命令", difficulty: "beginner", readTime: "20min", tags: ["文件", "目录", "命令"] },
      { slug: "text-processing", title: "文本处理三剑客", description: "grep, sed, awk 文本处理详解", difficulty: "intermediate", readTime: "30min", tags: ["grep", "sed", "awk"] },
      { slug: "permissions", title: "用户与权限管理", description: "用户管理、文件权限、sudo 配置", difficulty: "beginner", readTime: "20min", tags: ["权限", "用户", "sudo"] },
      { slug: "process-management", title: "进程管理", description: "ps, top, kill, nohup, systemctl 进程管理", difficulty: "beginner", readTime: "20min", tags: ["进程", "systemctl", "服务"] },
      { slug: "network-commands", title: "网络命令详解", description: "ip, ss, curl, wget, ping, traceroute, nslookup", difficulty: "intermediate", readTime: "25min", tags: ["网络", "端口", "DNS"] },
      { slug: "disk-management", title: "磁盘与存储管理", description: "df, du, mount, fdisk, lsblk 磁盘管理", difficulty: "intermediate", readTime: "25min", tags: ["磁盘", "存储", "挂载"] },
      { slug: "system-info", title: "系统信息查看", description: "uname, uptime, free, lscpu, /proc 系统信息", difficulty: "beginner", readTime: "15min", tags: ["系统", "信息", "监控"] },
      { slug: "compression", title: "压缩与解压", description: "tar, gzip, zip, unzip 压缩解压详解", difficulty: "beginner", readTime: "15min", tags: ["压缩", "tar", "zip"] },
      { slug: "package-management", title: "软件包管理", description: "apt, yum, dnf, rpm 软件包管理", difficulty: "beginner", readTime: "20min", tags: ["包管理", "apt", "yum"] },
      { slug: "cron-jobs", title: "定时任务 Cron", description: "crontab 定时任务配置与管理", difficulty: "intermediate", readTime: "15min", tags: ["cron", "定时", "任务"] },
      { slug: "ssh-advanced", title: "SSH 高级用法", description: "SSH 密钥、端口转发、跳板机、配置优化", difficulty: "advanced", readTime: "30min", tags: ["SSH", "密钥", "端口转发"] },
      { slug: "log-analysis", title: "日志分析与管理", description: "syslog, journald, logrotate 日志管理", difficulty: "intermediate", readTime: "25min", tags: ["日志", "syslog", "journald"] },
      { slug: "shell-scripting", title: "Shell 脚本编程", description: "Bash 脚本基础到进阶", difficulty: "intermediate", readTime: "40min", tags: ["Shell", "Bash", "脚本"] },
      { slug: "firewall", title: "防火墙管理", description: "iptables, firewalld, ufw 防火墙配置", difficulty: "intermediate", readTime: "25min", tags: ["防火墙", "iptables", "ufw"] },
      { slug: "performance-tuning", title: "性能调优", description: "CPU、内存、IO 性能分析与调优", difficulty: "advanced", readTime: "35min", tags: ["性能", "调优", "监控"] },
      { slug: "backup-restore", title: "备份与恢复", description: "rsync, tar, dump 备份策略", difficulty: "intermediate", readTime: "20min", tags: ["备份", "rsync", "恢复"] },
      { slug: "users-advanced", title: "用户与组管理进阶", description: "PAM, ACL, umask 高级权限控制", difficulty: "advanced", readTime: "25min", tags: ["PAM", "ACL", "权限"] },
    ],
  },
  {
    id: "sql",
    name: "SQL 数据库",
    description: "SQL 语言与数据库管理",
    icon: "🗄️",
    color: "#3b82f6",
    gradient: "from-blue-500 to-cyan-500",
    tutorials: [
      { slug: "sql-basics", title: "SQL 基础入门", description: "SQL 语言简介、基本语法", difficulty: "beginner", readTime: "15min", tags: ["入门", "基础", "SQL"] },
      { slug: "select-queries", title: "SELECT 查询详解", description: "WHERE, ORDER BY, LIMIT, DISTINCT 查询", difficulty: "beginner", readTime: "20min", tags: ["SELECT", "查询", "WHERE"] },
      { slug: "join-operations", title: "JOIN 连接查询", description: "INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN", difficulty: "intermediate", readTime: "25min", tags: ["JOIN", "连接", "多表"] },
      { slug: "aggregation", title: "聚合函数与分组", description: "COUNT, SUM, AVG, GROUP BY, HAVING", difficulty: "intermediate", readTime: "20min", tags: ["聚合", "GROUP BY", "统计"] },
      { slug: "subqueries", title: "子查询", description: "IN, EXISTS, ANY, ALL 子查询详解", difficulty: "intermediate", readTime: "25min", tags: ["子查询", "IN", "EXISTS"] },
      { slug: "data-manipulation", title: "数据操作 DML", description: "INSERT, UPDATE, DELETE, REPLACE 数据操作", difficulty: "beginner", readTime: "20min", tags: ["INSERT", "UPDATE", "DELETE"] },
      { slug: "ddl-operations", title: "表结构操作 DDL", description: "CREATE, ALTER, DROP 表结构管理", difficulty: "beginner", readTime: "20min", tags: ["CREATE", "ALTER", "DROP"] },
      { slug: "indexes", title: "索引与优化", description: "索引原理、EXPLAIN 分析、慢查询优化", difficulty: "advanced", readTime: "30min", tags: ["索引", "优化", "EXPLAIN"] },
      { slug: "transactions", title: "事务与锁", description: "ACID, BEGIN, COMMIT, ROLLBACK, 锁机制", difficulty: "advanced", readTime: "30min", tags: ["事务", "锁", "ACID"] },
      { slug: "window-functions", title: "窗口函数", description: "ROW_NUMBER, RANK, LAG, LEAD 窗口函数", difficulty: "advanced", readTime: "25min", tags: ["窗口函数", "ROW_NUMBER"] },
      { slug: "views-and-sp", title: "视图与存储过程", description: "VIEW, PROCEDURE, FUNCTION, TRIGGER", difficulty: "intermediate", readTime: "30min", tags: ["视图", "存储过程", "触发器"] },
      { slug: "mysql-admin", title: "MySQL 管理", description: "用户管理、备份恢复、主从复制", difficulty: "advanced", readTime: "35min", tags: ["MySQL", "管理", "复制"] },
      { slug: "postgresql-intro", title: "PostgreSQL 入门", description: "PostgreSQL 特性与基础操作", difficulty: "beginner", readTime: "20min", tags: ["PostgreSQL", "入门"] },
      { slug: "mongodb-intro", title: "MongoDB 入门", description: "NoSQL 概念、MongoDB 基础操作", difficulty: "beginner", readTime: "20min", tags: ["MongoDB", "NoSQL"] },
      { slug: "redis-intro", title: "Redis 入门", description: "Redis 数据类型、基本操作、应用场景", difficulty: "beginner", readTime: "20min", tags: ["Redis", "缓存", "NoSQL"] },
    ],
  },
  {
    id: "docker",
    name: "Docker & K8s",
    description: "容器化与编排技术",
    icon: "🐳",
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-500",
    tutorials: [
      { slug: "docker-basics", title: "Docker 基础入门", description: "Docker 概念、安装、基本操作", difficulty: "beginner", readTime: "20min", tags: ["入门", "Docker", "容器"] },
      { slug: "dockerfile", title: "Dockerfile 编写", description: "Dockerfile 指令详解与最佳实践", difficulty: "intermediate", readTime: "25min", tags: ["Dockerfile", "构建", "镜像"] },
      { slug: "docker-compose", title: "Docker Compose", description: "多容器应用编排与管理", difficulty: "intermediate", readTime: "25min", tags: ["Compose", "编排", "多容器"] },
      { slug: "docker-network", title: "Docker 网络", description: "bridge, host, overlay 网络模式", difficulty: "intermediate", readTime: "20min", tags: ["网络", "bridge", "overlay"] },
      { slug: "docker-volume", title: "Docker 数据持久化", description: "volume, bind mount 数据管理", difficulty: "intermediate", readTime: "15min", tags: ["Volume", "数据", "持久化"] },
      { slug: "docker-security", title: "Docker 安全", description: "镜像安全、容器隔离、资源限制", difficulty: "advanced", readTime: "25min", tags: ["安全", "隔离", "限制"] },
      { slug: "docker-optimization", title: "Docker 镜像优化", description: "多阶段构建、镜像瘦身", difficulty: "advanced", readTime: "20min", tags: ["优化", "瘦身", "多阶段"] },
      { slug: "k8s-basics", title: "Kubernetes 基础", description: "K8s 架构、Pod、Service、Deployment", difficulty: "intermediate", readTime: "30min", tags: ["K8s", "Pod", "Service"] },
      { slug: "k8s-deployment", title: "K8s 部署策略", description: "滚动更新、蓝绿部署、金丝雀发布", difficulty: "advanced", readTime: "25min", tags: ["部署", "滚动更新", "金丝雀"] },
      { slug: "k8s-networking", title: "K8s 网络模型", description: "CNI、Service、Ingress 网络", difficulty: "advanced", readTime: "30min", tags: ["网络", "CNI", "Ingress"] },
      { slug: "k8s-storage", title: "K8s 存储管理", description: "PV、PVC、StorageClass", difficulty: "advanced", readTime: "25min", tags: ["存储", "PV", "PVC"] },
      { slug: "k8s-monitoring", title: "K8s 监控与日志", description: "Prometheus、Grafana、EFK 日志方案", difficulty: "advanced", readTime: "30min", tags: ["监控", "Prometheus", "日志"] },
    ],
  },
  {
    id: "git",
    name: "Git 版本控制",
    description: "Git 工作流与协作开发",
    icon: "📦",
    color: "#ef4444",
    gradient: "from-red-500 to-orange-500",
    tutorials: [
      { slug: "git-basics", title: "Git 基础入门", description: "Git 安装、配置、基本概念", difficulty: "beginner", readTime: "15min", tags: ["入门", "Git", "基础"] },
      { slug: "git-commands", title: "Git 常用命令", description: "add, commit, push, pull, fetch 详解", difficulty: "beginner", readTime: "20min", tags: ["命令", "commit", "push"] },
      { slug: "git-branching", title: "Git 分支管理", description: "branch, merge, rebase 分支策略", difficulty: "intermediate", readTime: "25min", tags: ["分支", "merge", "rebase"] },
      { slug: "git-stashing", title: "Git 暂存与恢复", description: "stash, reset, revert, checkout 操作", difficulty: "intermediate", readTime: "20min", tags: ["stash", "reset", "revert"] },
      { slug: "git-remotes", title: "Git 远程协作", description: "remote, fork, pull request 工作流", difficulty: "intermediate", readTime: "20min", tags: ["远程", "fork", "PR"] },
      { slug: "git-hooks", title: "Git Hooks", description: "pre-commit, commit-msg hooks 配置", difficulty: "advanced", readTime: "20min", tags: ["Hooks", "自动化", "检查"] },
      { slug: "git-submodules", title: "Git 子模块", description: "submodule 管理与工作流", difficulty: "advanced", readTime: "20min", tags: ["子模块", "submodule"] },
      { slug: "git-workflows", title: "Git 工作流", description: "Git Flow, GitHub Flow, GitLab Flow", difficulty: "intermediate", readTime: "25min", tags: ["工作流", "Git Flow"] },
      { slug: "git-lfs", title: "Git LFS", description: "大文件存储与管理", difficulty: "advanced", readTime: "15min", tags: ["LFS", "大文件"] },
      { slug: "git-advanced", title: "Git 高级技巧", description: "cherry-pick, bisect, reflog 高级操作", difficulty: "advanced", readTime: "25min", tags: ["高级", "cherry-pick", "bisect"] },
    ],
  },
  {
    id: "nginx",
    name: "Nginx",
    description: "Web 服务器与反向代理",
    icon: "🌐",
    color: "#22c55e",
    gradient: "from-green-500 to-emerald-500",
    tutorials: [
      { slug: "nginx-basics", title: "Nginx 基础入门", description: "Nginx 安装、配置、基本指令", difficulty: "beginner", readTime: "15min", tags: ["入门", "Nginx", "安装"] },
      { slug: "nginx-static", title: "静态文件服务", description: "配置静态文件、目录索引、gzip", difficulty: "beginner", readTime: "15min", tags: ["静态", "gzip", "目录"] },
      { slug: "nginx-reverse-proxy", title: "反向代理配置", description: "proxy_pass、负载均衡、健康检查", difficulty: "intermediate", readTime: "25min", tags: ["反向代理", "负载均衡"] },
      { slug: "nginx-ssl", title: "HTTPS 配置", description: "SSL 证书、Let's Encrypt、HSTS", difficulty: "intermediate", readTime: "20min", tags: ["SSL", "HTTPS", "证书"] },
      { slug: "nginx-location", title: "Location 匹配", description: "location 规则、正则匹配、优先级", difficulty: "intermediate", readTime: "20min", tags: ["location", "匹配", "正则"] },
      { slug: "nginx-security", title: "安全配置", description: "访问控制、限流、WAF 基础", difficulty: "advanced", readTime: "25min", tags: ["安全", "限流", "WAF"] },
      { slug: "nginx-performance", title: "性能优化", description: "worker、连接数、缓存优化", difficulty: "advanced", readTime: "25min", tags: ["性能", "优化", "缓存"] },
      { slug: "nginx-logging", title: "日志与监控", description: "access_log、error_log、自定义格式", difficulty: "intermediate", readTime: "20min", tags: ["日志", "监控", "格式"] },
    ],
  },
  {
    id: "python",
    name: "Python",
    description: "Python 编程与自动化",
    icon: "🐍",
    color: "#eab308",
    gradient: "from-yellow-500 to-amber-500",
    tutorials: [
      { slug: "python-basics", title: "Python 基础入门", description: "变量、数据类型、控制流", difficulty: "beginner", readTime: "20min", tags: ["入门", "基础", "Python"] },
      { slug: "python-data-structures", title: "数据结构", description: "列表、元组、字典、集合", difficulty: "beginner", readTime: "20min", tags: ["列表", "字典", "集合"] },
      { slug: "python-functions", title: "函数与模块", description: "函数定义、参数、装饰器、模块导入", difficulty: "intermediate", readTime: "25min", tags: ["函数", "装饰器", "模块"] },
      { slug: "python-oop", title: "面向对象编程", description: "类、继承、多态、魔法方法", difficulty: "intermediate", readTime: "30min", tags: ["OOP", "类", "继承"] },
      { slug: "python-file-io", title: "文件操作", description: "文件读写、with语句、路径处理", difficulty: "beginner", readTime: "15min", tags: ["文件", "IO", "路径"] },
      { slug: "python-error-handling", title: "异常处理", description: "try/except、自定义异常、上下文管理器", difficulty: "intermediate", readTime: "20min", tags: ["异常", "try", "except"] },
      { slug: "python-regex", title: "正则表达式", description: "re 模块、正则语法、常用模式", difficulty: "intermediate", readTime: "25min", tags: ["正则", "re", "匹配"] },
      { slug: "python-concurrency", title: "并发编程", description: "threading, multiprocessing, asyncio", difficulty: "advanced", readTime: "30min", tags: ["并发", "线程", "异步"] },
      { slug: "python-network", title: "网络编程", description: "socket, requests, HTTP 客户端", difficulty: "intermediate", readTime: "25min", tags: ["网络", "socket", "requests"] },
      { slug: "python-automation", title: "自动化脚本", description: "os, subprocess, paramiko 自动化", difficulty: "intermediate", readTime: "25min", tags: ["自动化", "脚本", "运维"] },
      { slug: "python-data-analysis", title: "数据分析入门", description: "NumPy, Pandas 基础操作", difficulty: "intermediate", readTime: "30min", tags: ["数据分析", "NumPy", "Pandas"] },
      { slug: "python-web-scraping", title: "Web 爬虫", description: "requests + BeautifulSoup 爬虫基础", difficulty: "intermediate", readTime: "25min", tags: ["爬虫", "BeautifulSoup"] },
      { slug: "python-testing", title: "单元测试", description: "pytest 测试框架与最佳实践", difficulty: "intermediate", readTime: "20min", tags: ["测试", "pytest"] },
      { slug: "python-packaging", title: "打包与分发", description: "setup.py, pyproject.toml, pip", difficulty: "advanced", readTime: "20min", tags: ["打包", "pip", "分发"] },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript & Node.js",
    description: "前端与后端 JavaScript 开发",
    icon: "⚡",
    color: "#f59e0b",
    gradient: "from-amber-500 to-yellow-500",
    tutorials: [
      { slug: "js-basics", title: "JavaScript 基础", description: "变量、函数、对象、数组", difficulty: "beginner", readTime: "20min", tags: ["入门", "基础", "JS"] },
      { slug: "js-dom", title: "DOM 操作", description: "选择器、事件、DOM 遍历与修改", difficulty: "beginner", readTime: "20min", tags: ["DOM", "事件", "选择器"] },
      { slug: "js-async", title: "异步编程", description: "Promise, async/await, 事件循环", difficulty: "intermediate", readTime: "25min", tags: ["异步", "Promise", "async"] },
      { slug: "js-es6", title: "ES6+ 新特性", description: "解构、展开、箭头函数、模块", difficulty: "intermediate", readTime: "25min", tags: ["ES6", "箭头函数", "模块"] },
      { slug: "js-errors", title: "错误处理与调试", description: "try/catch、调试技巧、Chrome DevTools", difficulty: "intermediate", readTime: "20min", tags: ["错误", "调试", "DevTools"] },
      { slug: "nodejs-basics", title: "Node.js 基础", description: "Node.js 安装、REPL、模块系统", difficulty: "beginner", readTime: "20min", tags: ["Node.js", "入门", "模块"] },
      { slug: "nodejs-express", title: "Express 框架", description: "路由、中间件、模板引擎", difficulty: "intermediate", readTime: "25min", tags: ["Express", "路由", "中间件"] },
      { slug: "nodejs-rest-api", title: "REST API 设计", description: "RESTful 设计原则、状态码、认证", difficulty: "intermediate", readTime: "25min", tags: ["REST", "API", "设计"] },
      { slug: "nodejs-auth", title: "用户认证", description: "JWT, Session, OAuth 认证方案", difficulty: "advanced", readTime: "30min", tags: ["认证", "JWT", "OAuth"] },
      { slug: "nodejs-websocket", title: "WebSocket 实时通信", description: "ws, socket.io 实时应用", difficulty: "intermediate", readTime: "25min", tags: ["WebSocket", "实时", "socket.io"] },
      { slug: "nodejs-file-system", title: "文件系统操作", description: "fs 模块、流、文件处理", difficulty: "intermediate", readTime: "20min", tags: ["fs", "文件", "流"] },
      { slug: "nodejs-testing", title: "Node.js 测试", description: "Jest, Mocha 测试框架", difficulty: "intermediate", readTime: "20min", tags: ["测试", "Jest", "Mocha"] },
    ],
  },
  {
    id: "shell",
    name: "Shell 脚本",
    description: "Bash 脚本编程与自动化",
    icon: "💻",
    color: "#10b981",
    gradient: "from-emerald-500 to-green-500",
    tutorials: [
      { slug: "bash-basics", title: "Bash 基础", description: "变量、数组、字符串操作", difficulty: "beginner", readTime: "20min", tags: ["Bash", "基础", "变量"] },
      { slug: "bash-conditionals", title: "条件判断", description: "if, case, test 条件语句", difficulty: "beginner", readTime: "15min", tags: ["条件", "if", "case"] },
      { slug: "bash-loops", title: "循环结构", description: "for, while, until 循环", difficulty: "beginner", readTime: "15min", tags: ["循环", "for", "while"] },
      { slug: "bash-functions", title: "函数定义", description: "函数语法、参数、返回值", difficulty: "intermediate", readTime: "15min", tags: ["函数", "参数"] },
      { slug: "bash-io", title: "输入输出与重定向", description: "stdin, stdout, stderr, 管道", difficulty: "beginner", readTime: "15min", tags: ["重定向", "管道", "IO"] },
      { slug: "bash-regex", title: "正则与文本处理", description: "grep, sed, awk 在脚本中的应用", difficulty: "intermediate", readTime: "20min", tags: ["正则", "grep", "sed"] },
      { slug: "bash-advanced", title: "高级脚本技巧", description: "信号处理、临时文件、锁机制", difficulty: "advanced", readTime: "25min", tags: ["高级", "信号", "锁"] },
      { slug: "bash-logging", title: "日志与错误处理", description: "日志记录、错误处理、set 选项", difficulty: "intermediate", readTime: "20min", tags: ["日志", "错误", "set"] },
      { slug: "bash-examples", title: "实战脚本示例", description: "备份脚本、监控脚本、部署脚本", difficulty: "intermediate", readTime: "30min", tags: ["实战", "备份", "监控"] },
      { slug: "bash-best-practices", title: "最佳实践", description: "代码规范、可移植性、性能优化", difficulty: "advanced", readTime: "20min", tags: ["最佳实践", "规范"] },
    ],
  },
  {
    id: "network",
    name: "网络基础",
    description: "TCP/IP、HTTP、DNS 网络协议",
    icon: "🔗",
    color: "#8b5cf6",
    gradient: "from-violet-500 to-purple-500",
    tutorials: [
      { slug: "network-osi", title: "OSI 七层模型", description: "网络分层、各层协议与功能", difficulty: "beginner", readTime: "20min", tags: ["OSI", "分层", "协议"] },
      { slug: "tcp-ip", title: "TCP/IP 协议", description: "三次握手、四次挥手、可靠传输", difficulty: "intermediate", readTime: "25min", tags: ["TCP", "IP", "握手"] },
      { slug: "http-protocol", title: "HTTP 协议详解", description: "请求方法、状态码、头部字段", difficulty: "intermediate", readTime: "25min", tags: ["HTTP", "请求", "状态码"] },
      { slug: "https-tls", title: "HTTPS 与 TLS", description: "SSL/TLS 握手、证书链、加密原理", difficulty: "advanced", readTime: "30min", tags: ["HTTPS", "TLS", "证书"] },
      { slug: "dns-deep", title: "DNS 深入理解", description: "DNS 解析过程、记录类型、DNS 安全", difficulty: "intermediate", readTime: "25min", tags: ["DNS", "解析", "记录"] },
      { slug: "load-balancing", title: "负载均衡原理", description: "四层/七层负载均衡、算法、健康检查", difficulty: "advanced", readTime: "25min", tags: ["负载均衡", "L4", "L7"] },
      { slug: "cdn-principles", title: "CDN 原理", description: "CDN 架构、缓存策略、回源机制", difficulty: "intermediate", readTime: "20min", tags: ["CDN", "缓存", "回源"] },
      { slug: "web-security", title: "Web 安全基础", description: "XSS、CSRF、SQL注入、安全防护", difficulty: "intermediate", readTime: "25min", tags: ["安全", "XSS", "CSRF"] },
      { slug: "websocket-intro", title: "WebSocket 协议", description: "WebSocket 握手、全双工通信、应用场景", difficulty: "intermediate", readTime: "20min", tags: ["WebSocket", "全双工"] },
      { slug: "network-tools", title: "网络诊断工具", description: "ping, traceroute, tcpdump, wireshark", difficulty: "intermediate", readTime: "20min", tags: ["工具", "诊断", "抓包"] },
    ],
  },
  {
    id: "redis",
    name: "Redis",
    description: "内存数据库与缓存技术",
    icon: "⚡",
    color: "#ef4444",
    gradient: "from-red-500 to-rose-500",
    tutorials: [
      { slug: "redis-basics", title: "Redis 基础入门", description: "Redis 安装、配置、基本操作", difficulty: "beginner", readTime: "15min", tags: ["入门", "Redis", "安装"] },
      { slug: "redis-data-types", title: "数据类型详解", description: "String, Hash, List, Set, ZSet", difficulty: "beginner", readTime: "25min", tags: ["数据类型", "String", "Hash"] },
      { slug: "redis-commands", title: "常用命令大全", description: "键操作、字符串、哈希、列表、集合", difficulty: "beginner", readTime: "20min", tags: ["命令", "操作"] },
      { slug: "redis-persistence", title: "持久化机制", description: "RDB、AOF、混合持久化", difficulty: "intermediate", readTime: "20min", tags: ["持久化", "RDB", "AOF"] },
      { slug: "redis-sentinel", title: "哨兵模式", description: "高可用架构、主从切换、故障转移", difficulty: "advanced", readTime: "25min", tags: ["哨兵", "高可用", "主从"] },
      { slug: "redis-cluster", title: "Redis Cluster", description: "分布式集群、哈希槽、数据分片", difficulty: "advanced", readTime: "30min", tags: ["集群", "分布式", "哈希槽"] },
      { slug: "redis-patterns", title: "应用场景", description: "缓存、计数器、排行榜、分布式锁", difficulty: "intermediate", readTime: "25min", tags: ["场景", "缓存", "锁"] },
      { slug: "redis-lua", title: "Lua 脚本", description: "原子操作、EVAL/EVALSHA", difficulty: "advanced", readTime: "20min", tags: ["Lua", "原子", "脚本"] },
      { slug: "redis-optimization", title: "性能优化", description: "内存优化、慢查询、Pipeline", difficulty: "advanced", readTime: "25min", tags: ["优化", "内存", "Pipeline"] },
      { slug: "redis-security", title: "安全配置", description: "ACL、密码、网络隔离", difficulty: "intermediate", readTime: "15min", tags: ["安全", "ACL", "密码"] },
    ],
  },
  {
    id: "frontend",
    name: "前端开发",
    description: "HTML、CSS、JavaScript 与主流框架",
    icon: "🎨",
    color: "#f472b6",
    gradient: "from-pink-500 to-rose-500",
    tutorials: [
      { slug: "html-basics", title: "HTML 基础", description: "HTML 标签、属性、文档结构", difficulty: "beginner", readTime: "15min", tags: ["HTML", "标签", "入门"] },
      { slug: "css-basics", title: "CSS 基础", description: "选择器、盒模型、布局", difficulty: "beginner", readTime: "20min", tags: ["CSS", "选择器", "布局"] },
      { slug: "css-flexbox", title: "Flexbox 布局", description: "弹性盒子布局详解", difficulty: "beginner", readTime: "20min", tags: ["Flexbox", "弹性", "布局"] },
      { slug: "css-grid", title: "CSS Grid 布局", description: "网格布局系统", difficulty: "intermediate", readTime: "20min", tags: ["Grid", "网格", "布局"] },
      { slug: "typescript-basics", title: "TypeScript 基础", description: "类型系统、接口、泛型", difficulty: "intermediate", readTime: "25min", tags: ["TypeScript", "类型", "入门"] },
      { slug: "react-basics", title: "React 基础", description: "组件、JSX、State、Props", difficulty: "intermediate", readTime: "25min", tags: ["React", "组件", "JSX"] },
      { slug: "react-hooks", title: "React Hooks", description: "useState、useEffect、自定义 Hook", difficulty: "intermediate", readTime: "25min", tags: ["Hooks", "useState", "useEffect"] },
      { slug: "vue-basics", title: "Vue.js 基础", description: "模板语法、指令、组件系统", difficulty: "intermediate", readTime: "25min", tags: ["Vue", "模板", "指令"] },
      { slug: "vue3-composition", title: "Vue3 组合式 API", description: "setup、ref、reactive、computed", difficulty: "intermediate", readTime: "25min", tags: ["Vue3", "组合式", "ref"] },
      { slug: "nextjs-basics", title: "Next.js 基础", description: "SSR、路由、数据获取", difficulty: "advanced", readTime: "30min", tags: ["Next.js", "SSR", "路由"] },
      { slug: "tailwind-basics", title: "Tailwind CSS", description: "原子化 CSS 框架入门", difficulty: "beginner", readTime: "20min", tags: ["Tailwind", "原子化", "CSS"] },
      { slug: "dom-manipulation", title: "DOM 操作详解", description: "选择器、遍历、事件处理", difficulty: "beginner", readTime: "20min", tags: ["DOM", "事件", "遍历"] },
      { slug: "ajax-fetch", title: "AJAX 与 Fetch", description: "异步请求、Fetch API、XHR", difficulty: "intermediate", readTime: "20min", tags: ["AJAX", "Fetch", "异步"] },
      { slug: "bootstrap-basics", title: "Bootstrap 入门", description: "栅格系统、组件、响应式设计", difficulty: "beginner", readTime: "20min", tags: ["Bootstrap", "栅格", "响应式"] },
    ],
  },
  {
    id: "backend",
    name: "后端开发",
    description: "服务端编程与 API 开发",
    icon: "⚙️",
    color: "#6366f1",
    gradient: "from-indigo-500 to-violet-500",
    tutorials: [
      { slug: "php-basics", title: "PHP 基础", description: "PHP 语法、数组、函数", difficulty: "beginner", readTime: "20min", tags: ["PHP", "语法", "入门"] },
      { slug: "java-basics", title: "Java 基础", description: "面向对象、异常处理、集合框架", difficulty: "beginner", readTime: "25min", tags: ["Java", "OOP", "集合"] },
      { slug: "go-basics", title: "Go 语言基础", description: "goroutine、channel、接口", difficulty: "intermediate", readTime: "25min", tags: ["Go", "goroutine", "channel"] },
      { slug: "rust-basics", title: "Rust 基础", description: "所有权、借用、生命周期", difficulty: "advanced", readTime: "30min", tags: ["Rust", "所有权", "借用"] },
      { slug: "csharp-basics", title: "C# 基础", description: "类型系统、LINQ、异步编程", difficulty: "beginner", readTime: "25min", tags: ["C#", "LINQ", "异步"] },
      { slug: "nodejs-advanced", title: "Node.js 进阶", description: "事件循环、流、Cluster、性能优化", difficulty: "advanced", readTime: "30min", tags: ["Node.js", "事件循环", "Cluster"] },
      { slug: "express-middleware", title: "Express 中间件", description: "中间件原理、自定义中间件", difficulty: "intermediate", readTime: "20min", tags: ["Express", "中间件", "原理"] },
      { slug: "restful-api", title: "RESTful API 设计", description: "REST 原则、状态码、版本控制", difficulty: "intermediate", readTime: "25min", tags: ["REST", "API", "设计"] },
      { slug: "graphql-basics", title: "GraphQL 入门", description: "Schema、Resolver、查询语言", difficulty: "intermediate", readTime: "25min", tags: ["GraphQL", "Schema", "Resolver"] },
      { slug: "grpc-intro", title: "gRPC 入门", description: "Protocol Buffers、服务定义", difficulty: "advanced", readTime: "25min", tags: ["gRPC", "Protobuf", "服务"] },
      { slug: "websockets-intro", title: "WebSocket 实时通信", description: "全双工通信、socket.io", difficulty: "intermediate", readTime: "20min", tags: ["WebSocket", "实时", "socket.io"] },
    ],
  },
  {
    id: "ai",
    name: "AI 智能开发",
    description: "机器学习、深度学习与 AI 应用",
    icon: "🤖",
    color: "#a855f7",
    gradient: "from-purple-500 to-fuchsia-500",
    tutorials: [
      { slug: "ai-intro", title: "人工智能简介", description: "AI 概念、发展历程、应用领域", difficulty: "beginner", readTime: "15min", tags: ["AI", "入门", "概念"] },
      { slug: "machine-learning-basics", title: "机器学习基础", description: "监督学习、无监督学习、评估指标", difficulty: "intermediate", readTime: "30min", tags: ["机器学习", "监督", "评估"] },
      { slug: "python-ai-tools", title: "Python AI 工具链", description: "NumPy、Pandas、Matplotlib", difficulty: "beginner", readTime: "25min", tags: ["Python", "NumPy", "Pandas"] },
      { slug: "tensorflow-basics", title: "TensorFlow 入门", description: "张量、计算图、Keras API", difficulty: "intermediate", readTime: "30min", tags: ["TensorFlow", "Keras", "张量"] },
      { slug: "pytorch-basics", title: "PyTorch 入门", description: "动态图、autograd、nn.Module", difficulty: "intermediate", readTime: "30min", tags: ["PyTorch", "动态图", "autograd"] },
      { slug: "scikit-learn", title: "Scikit-learn 实战", description: "分类、回归、聚类、模型选择", difficulty: "intermediate", readTime: "25min", tags: ["Scikit-learn", "分类", "聚类"] },
      { slug: "nlp-basics", title: "自然语言处理", description: "分词、词向量、文本分类", difficulty: "advanced", readTime: "30min", tags: ["NLP", "分词", "词向量"] },
      { slug: "llm-intro", title: "大语言模型入门", description: "LLM 原理、Prompt 工程、微调", difficulty: "intermediate", readTime: "25min", tags: ["LLM", "Prompt", "微调"] },
      { slug: "langchain-basics", title: "LangChain 入门", description: "链式调用、Agent、Memory", difficulty: "advanced", readTime: "30min", tags: ["LangChain", "Agent", "链"] },
      { slug: "ai-agent-intro", title: "AI Agent 入门", description: "智能体架构、工具调用、规划", difficulty: "advanced", readTime: "25min", tags: ["Agent", "智能体", "规划"] },
      { slug: "opencv-basics", title: "OpenCV 入门", description: "图像处理、特征检测、视频分析", difficulty: "intermediate", readTime: "25min", tags: ["OpenCV", "图像", "特征"] },
      { slug: "mlops-intro", title: "MLOps 入门", description: "模型部署、监控、CI/CD", difficulty: "advanced", readTime: "25min", tags: ["MLOps", "部署", "监控"] },
    ],
  },
  {
    id: "mobile",
    name: "移动开发",
    description: "iOS、Android 与跨平台开发",
    icon: "📱",
    color: "#14b8a6",
    gradient: "from-teal-500 to-cyan-500",
    tutorials: [
      { slug: "flutter-basics", title: "Flutter 基础", description: "Widget、布局、状态管理", difficulty: "intermediate", readTime: "25min", tags: ["Flutter", "Widget", "布局"] },
      { slug: "flutter-widgets", title: "Flutter 组件详解", description: "Material、Cupertino、自定义组件", difficulty: "intermediate", readTime: "25min", tags: ["组件", "Material", "Cupertino"] },
      { slug: "react-native-basics", title: "React Native 入门", description: "组件、导航、原生模块", difficulty: "intermediate", readTime: "25min", tags: ["React Native", "组件", "导航"] },
      { slug: "swift-basics", title: "Swift 基础", description: "类型系统、闭包、协议", difficulty: "beginner", readTime: "25min", tags: ["Swift", "闭包", "协议"] },
      { slug: "kotlin-basics", title: "Kotlin 基础", description: "空安全、扩展函数、协程", difficulty: "beginner", readTime: "25min", tags: ["Kotlin", "空安全", "协程"] },
      { slug: "android-basics", title: "Android 开发入门", description: "Activity、Intent、布局", difficulty: "beginner", readTime: "25min", tags: ["Android", "Activity", "Intent"] },
      { slug: "ios-swiftui", title: "SwiftUI 入门", description: "声明式 UI、数据流、动画", difficulty: "intermediate", readTime: "25min", tags: ["SwiftUI", "声明式", "动画"] },
    ],
  },
  {
    id: "languages",
    name: "编程语言",
    description: "C、C++、Go、Rust 等系统语言",
    icon: "📝",
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-500",
    tutorials: [
      { slug: "c-basics", title: "C 语言基础", description: "指针、数组、内存管理", difficulty: "beginner", readTime: "25min", tags: ["C", "指针", "内存"] },
      { slug: "cpp-basics", title: "C++ 基础", description: "类、模板、STL、RAII", difficulty: "intermediate", readTime: "30min", tags: ["C++", "模板", "STL"] },
      { slug: "go-concurrency", title: "Go 并发编程", description: "goroutine、channel、sync 包", difficulty: "intermediate", readTime: "25min", tags: ["Go", "并发", "goroutine"] },
      { slug: "rust-ownership", title: "Rust 所有权系统", description: "所有权、借用、生命周期", difficulty: "advanced", readTime: "30min", tags: ["Rust", "所有权", "借用"] },
      { slug: "ruby-basics", title: "Ruby 基础", description: "块、迭代器、元编程", difficulty: "beginner", readTime: "25min", tags: ["Ruby", "块", "元编程"] },
      { slug: "lua-basics", title: "Lua 基础", description: "表、元表、协程", difficulty: "beginner", readTime: "20min", tags: ["Lua", "表", "协程"] },
      { slug: "scala-basics", title: "Scala 基础", description: "函数式编程、模式匹配、Actor", difficulty: "intermediate", readTime: "25min", tags: ["Scala", "函数式", "Actor"] },
      { slug: "perl-basics", title: "Perl 基础", description: "正则表达式、文本处理", difficulty: "beginner", readTime: "20min", tags: ["Perl", "正则", "文本"] },
      { slug: "dart-basics", title: "Dart 基础", description: "异步、Stream、Isolate", difficulty: "intermediate", readTime: "25min", tags: ["Dart", "异步", "Stream"] },
    ],
  },
  {
    id: "fundamentals",
    name: "计算机基础",
    description: "数据结构、算法与设计模式",
    icon: "🧮",
    color: "#ec4899",
    gradient: "from-pink-500 to-purple-500",
    tutorials: [
      { slug: "data-structures", title: "数据结构", description: "数组、链表、树、图、哈希表", difficulty: "intermediate", readTime: "30min", tags: ["数据结构", "数组", "树"] },
      { slug: "algorithms", title: "算法基础", description: "排序、搜索、递归、分治", difficulty: "intermediate", readTime: "30min", tags: ["算法", "排序", "搜索"] },
      { slug: "design-patterns", title: "设计模式", description: "单例、工厂、观察者、策略模式", difficulty: "intermediate", readTime: "30min", tags: ["设计模式", "单例", "工厂"] },
      { slug: "regex-deep", title: "正则表达式深入", description: "正则语法、贪婪/非贪婪、分组", difficulty: "intermediate", readTime: "25min", tags: ["正则", "分组", "贪婪"] },
      { slug: "http-deep", title: "HTTP 协议深入", description: "HTTP/2、WebSocket、缓存策略", difficulty: "advanced", readTime: "25min", tags: ["HTTP", "HTTP/2", "缓存"] },
      { slug: "tcp-deep", title: "TCP/IP 深入", description: "拥塞控制、流量控制、可靠传输", difficulty: "advanced", readTime: "30min", tags: ["TCP", "拥塞", "流量"] },
      { slug: "os-basics", title: "操作系统基础", description: "进程、线程、内存管理、调度", difficulty: "intermediate", readTime: "30min", tags: ["OS", "进程", "线程"] },
      { slug: "compiler-basics", title: "编译原理入门", description: "词法分析、语法分析、代码生成", difficulty: "advanced", readTime: "30min", tags: ["编译", "词法", "语法"] },
    ],
  },
];

export function getCategoryById(id: string): TutorialCategory | undefined {
  return categories.find(c => c.id === id);
}

export function getTutorialBySlug(categoryId: string, slug: string): TutorialMeta | undefined {
  const cat = getCategoryById(categoryId);
  return cat?.tutorials.find(t => t.slug === slug);
}

export function searchTutorials(query: string): Array<{ category: TutorialCategory; tutorial: TutorialMeta }> {
  const q = query.toLowerCase();
  const results: Array<{ category: TutorialCategory; tutorial: TutorialMeta }> = [];
  for (const cat of categories) {
    for (const t of cat.tutorials) {
      if (
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      ) {
        results.push({ category: cat, tutorial: t });
      }
    }
  }
  return results;
}
