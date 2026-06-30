export interface TutorialSection {
  title: string;
  content: string;
  code?: string;
  language?: string;
  tip?: string;
  warning?: string;
}

export interface TutorialContent {
  slug: string;
  sections: TutorialSection[];
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const tutorialContents: Record<string, Record<string, TutorialContent>> = {
  linux: {
    "linux-basics": {
      slug: "linux-basics",
      sections: [
        {
          title: "Linux 简介",
          content: `Linux 是一个自由、开源的类 Unix 操作系统内核，由 Linus Torvalds 于 1991 年首次发布。如今 Linux 已发展成为一个完整的操作系统，广泛应用于服务器、嵌入式设备、超级计算机等领域。

Linux 的特点：
- 开源免费，社区驱动
- 稳定性和安全性高
- 多用户、多任务
- 支持多种硬件平台
- 强大的命令行工具`,
        },
        {
          title: "Linux 发行版",
          content: `Linux 发行版是将 Linux 内核与各种工具、软件打包在一起的完整操作系统。

常用发行版：
- Ubuntu：最适合初学者，社区活跃
- CentOS/RHEL：企业级服务器首选
- Debian：稳定性极高，服务器常用
- Fedora：技术创新，新特性先行
- Arch Linux：滚动更新，适合高级用户
- Alpine：轻量级，容器常用`,
        },
        {
          title: "基本概念",
          content: `Linux 系统结构：
- 内核（Kernel）：管理硬件和系统资源
- Shell：命令解释器，bash/zsh
- 文件系统：一切皆文件
- 用户空间与内核空间

Linux 文件系统层级：
- /root：root 用户的家目录
- /home：普通用户家目录
- /etc：系统配置文件
- /var：可变数据（日志、缓存）
- /usr：用户程序和库文件
- /tmp：临时文件
- /proc：虚拟文件系统，进程信息`,
        },
        {
          title: "第一行命令",
          content: `打开终端后，你会看到一个命令提示符：`,
          code: `$ whoami          # 查看当前用户
root

$ hostname         # 查看主机名
web-server-01

$ uname -a         # 查看系统信息
Linux web-server-01 5.15.0 #1 SMP x86_64 GNU/Linux

$ pwd              # 查看当前目录
/root

$ ls               # 列出当前目录文件
Desktop  Documents  Downloads

$ date             # 查看当前时间
Sun Jun 28 10:30:00 CST 2026

$ cal              # 查看日历
     June 2026
Su Mo Tu We Th Fr Sa
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28
29 30`,
          language: "bash",
          tip: "使用 Tab 键可以自动补全命令和文件名，大幅提高效率。",
        },
        {
          title: "帮助系统",
          content: `Linux 提供了强大的帮助系统：`,
          code: `$ man ls           # 查看 ls 命令的手册
$ ls --help         # 查看简要帮助
$ info ls           # 查看 info 文档
$ type ls           # 查看命令类型
$ which ls          # 查看命令路径
$ apropos "copy"    # 搜索相关命令`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "Linux 内核是谁开发的？", options: ["Richard Stallman", "Linus Torvalds", "Dennis Ritchie", "Ken Thompson"], answer: 1, explanation: "Linus Torvalds 于 1991 年首次发布了 Linux 内核。" },
        { question: "以下哪个目录存放系统配置文件？", options: ["/var", "/usr", "/etc", "/tmp"], answer: 2, explanation: "/etc 目录专门存放系统和应用的配置文件。" },
        { question: "查看当前用户身份的命令是？", options: ["hostname", "whoami", "pwd", "uname"], answer: 1, explanation: "whoami 命令返回当前登录用户的用户名。" },
      ],
    },
    "file-operations": {
      slug: "file-operations",
      sections: [
        {
          title: "查看文件与目录",
          content: `ls 命令 - 列出目录内容：`,
          code: `$ ls                 # 列出当前目录
$ ls -l              # 长格式显示（权限、大小、时间）
$ ls -la             # 显示所有文件（含隐藏文件）
$ ls -lh             # 人类可读的文件大小
$ ls -lt             # 按修改时间排序
$ ls -lS             # 按文件大小排序
$ ls -R              # 递归列出子目录`,
          language: "bash",
        },
        {
          title: "目录操作",
          content: `cd 命令 - 切换目录：`,
          code: `$ cd /path/to/dir    # 切换到指定目录
$ cd ~               # 切换到家目录
$ cd -               # 切换到上一次的目录
$ cd ..              # 切换到上级目录
$ cd /               # 切换到根目录

pwd 命令 - 显示当前目录：
$ pwd
/home/user/projects

mkdir 命令 - 创建目录：
$ mkdir newdir           # 创建目录
$ mkdir -p a/b/c         # 递归创建多级目录
$ mkdir -m 755 newdir    # 创建并设置权限`,
          language: "bash",
        },
        {
          title: "文件操作",
          content: `cp 命令 - 复制文件/目录：`,
          code: `$ cp file1 file2         # 复制文件
$ cp -r dir1 dir2        # 递归复制目录
$ cp -p file1 file2      # 保留权限和时间戳
$ cp -i file1 file2      # 覆盖前询问
$ cp -v file1 file2      # 显示复制过程

mv 命令 - 移动/重命名：
$ mv file1 file2         # 重命名
$ mv file1 /path/to/     # 移动文件
$ mv -i file1 file2      # 覆盖前询问
$ mv -v file1 file2      # 显示移动过程

rm 命令 - 删除文件/目录：
$ rm file                # 删除文件
$ rm -f file             # 强制删除（不询问）
$ rm -r dir              # 递归删除目录
$ rm -rf dir             # 强制递归删除（慎用！）
$ rm -- -file            # 删除以 - 开头的文件`,
          language: "bash",
          warning: "rm -rf 是危险操作，执行前务必确认路径正确。建议先用 ls 确认。",
        },
        {
          title: "文件查看",
          content: `查看文件内容：`,
          code: `$ cat file              # 显示全部内容
$ head -n 20 file       # 显示前20行
$ tail -n 20 file       # 显示后20行
$ tail -f file          # 实时追踪文件更新
$ less file             # 分页查看（按q退出）
$ more file             # 分页查看
$ wc -l file            # 统计行数
$ nl file               # 显示行号`,
          language: "bash",
          tip: "tail -f 是查看日志文件最常用的命令，可以实时看到新写入的内容。",
        },
        {
          title: "文件查找",
          content: `find 命令 - 强大的文件查找工具：`,
          code: `$ find /path -name "*.log"              # 按名称查找
$ find . -type f -name "*.py"           # 查找所有.py文件
$ find . -type d -name "test"           # 查找目录
$ find . -size +100M                    # 查找大于100M的文件
$ find . -mtime -7                      # 最近7天修改的文件
$ find . -perm 755                      # 按权限查找
$ find . -name "*.tmp" -exec rm {} \;   # 查找并删除
$ find . -empty                         # 查找空文件/目录

locate 命令 - 快速查找（基于索引）：
$ locate nginx.conf     # 从数据库快速查找
$ updatedb              # 更新索引数据库`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "复制目录需要使用哪个选项？", options: ["-f", "-r", "-i", "-v"], answer: 1, explanation: "-r（recursive）选项用于递归复制整个目录。" },
        { question: "哪个命令可以实时追踪文件更新？", options: ["cat", "head", "tail -f", "less"], answer: 2, explanation: "tail -f 可以实时显示文件的新写入内容。" },
        { question: "删除以 - 开头的文件应该怎么做？", options: ["rm -file", "rm -- -file", "rm '-file'", "rm ./-file"], answer: 1, explanation: "使用 -- 分隔符告诉 rm 命令后面的参数不是选项。" },
      ],
    },
    "text-processing": {
      slug: "text-processing",
      sections: [
        {
          title: "grep 命令",
          content: `grep（Global Regular Expression Print）是最常用的文本搜索工具。`,
          code: `$ grep "error" /var/log/syslog              # 搜索包含error的行
$ grep -i "error" file                       # 忽略大小写
$ grep -r "pattern" /path/                   # 递归搜索目录
$ grep -n "error" file                       # 显示行号
$ grep -c "error" file                       # 统计匹配行数
$ grep -v "debug" file                       # 反向匹配（排除）
$ grep -l "pattern" *.log                    # 只显示文件名
$ grep -A 3 "error" file                     # 显示匹配行及后3行
$ grep -B 2 "error" file                     # 显示匹配行及前2行
$ grep -E "err|warn|crit" file               # 使用扩展正则
$ grep -P "\d{3}-\d{4}" file                 # 使用Perl正则`,
          language: "bash",
        },
        {
          title: "sed 命令",
          content: `sed（Stream Editor）是流编辑器，常用于文本替换。`,
          code: `$ sed 's/old/new/' file                     # 替换每行第一个匹配
$ sed 's/old/new/g' file                    # 替换所有匹配
$ sed -i 's/old/new/g' file                 # 直接修改文件
$ sed -i.bak 's/old/new/g' file             # 修改前备份
$ sed '3d' file                             # 删除第3行
$ sed '/pattern/d' file                     # 删除匹配行
$ sed '2a\new line' file                    # 在第2行后插入
$ sed '2i\new line' file                    # 在第2行前插入
$ sed -n '5,10p' file                       # 打印第5-10行
$ sed 's/^/    /' file                      # 每行前加4个空格`,
          language: "bash",
          tip: "sed 的 -i 选项会直接修改文件，建议加 .bak 后缀自动备份。",
        },
        {
          title: "awk 命令",
          content: `awk 是强大的文本处理语言，按行和字段处理。`,
          code: `$ awk '{print $1}' file                     # 打印第1个字段
$ awk '{print $1, $3}' file                 # 打印第1和第3个字段
$ awk -F: '{print $1}' /etc/passwd          # 指定分隔符
$ awk '/error/ {print}' file                # 打印匹配行
$ awk 'NR==5' file                          # 打印第5行
$ awk 'NR>=5 && NR<=10' file               # 打印5-10行
$ awk '{sum+=$1} END {print sum}' file      # 求和
$ awk '{print NR, $0}' file                 # 打印行号和内容
$ awk -F: '$3>=1000 {print $1}' /etc/passwd # 条件过滤
$ awk '{count[$1]++} END {for(k in count) print k, count[k]}' file  # 统计`,
          language: "bash",
        },
        {
          title: "sort 与 uniq",
          content: `排序与去重：`,
          code: `$ sort file                     # 排序
$ sort -r file                  # 逆序排序
$ sort -n file                  # 按数值排序
$ sort -k2 file                 # 按第2列排序
$ sort -t: -k3 -n /etc/passwd   # 指定分隔符和列

$ sort file | uniq              # 去重（需先排序）
$ sort file | uniq -c           # 去重并计数
$ sort file | uniq -d           # 只显示重复行
$ sort file | sort | uniq -c | sort -rn  # 统计词频`,
          language: "bash",
        },
        {
          title: "管道与重定向",
          content: `管道与重定向是 Linux 的灵魂：`,
          code: `$ command > file               # 标准输出重定向（覆盖）
$ command >> file              # 标准输出重定向（追加）
$ command 2> file              # 标准错误重定向
$ command &> file              # 所有输出重定向
$ command < file               # 标准输入重定向

$ cat file | grep "error" | wc -l    # 管道组合
$ ps aux | grep nginx | grep -v grep # 查找nginx进程
$ cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10  # 统计IP`,
          language: "bash",
          tip: "管道 | 是 Linux 最强大的特性之一，可以将多个简单命令组合成复杂的功能。",
        },
      ],
      quiz: [
        { question: "grep -i 选项的作用是？", options: ["显示行号", "忽略大小写", "递归搜索", "反向匹配"], answer: 1, explanation: "-i 选项让 grep 在匹配时忽略大小写。" },
        { question: "sed -i.bak 的作用是？", options: ["直接修改文件", "修改前备份原文件", "删除文件", "创建新文件"], answer: 1, explanation: "sed -i.bak 会在修改前创建 .bak 备份文件。" },
        { question: "统计文件中每个单词出现次数的命令是？", options: ["sort | uniq", "awk '{count[$1]++}'", "grep -c", "wc -l"], answer: 1, explanation: "awk 的关联数组功能可以统计词频。" },
      ],
    },
    "process-management": {
      slug: "process-management",
      sections: [
        {
          title: "查看进程",
          content: `ps 命令 - 查看进程快照：`,
          code: `$ ps aux                          # 查看所有进程
$ ps aux | grep nginx             # 查找特定进程
$ ps -ef                           # 全格式显示
$ ps -eo pid,ppid,user,%cpu,%mem,cmd  # 自定义输出列
$ ps -ef --forest                  # 树状显示进程关系`,
          language: "bash",
        },
        {
          title: "实时监控",
          content: `top / htop - 实时进程监控：`,
          code: `$ top                              # 实时进程监控
# top 中的快捷键：
# P - 按CPU排序
# M - 按内存排序
# k - 杀进程
# q - 退出

$ htop                             # 增强版top（需安装）
$ top -bn1 | head -20              # 非交互模式输出`,
          language: "bash",
        },
        {
          title: "进程控制",
          content: `kill 命令 - 终止进程：`,
          code: `$ kill PID                         # 发送SIGTERM信号
$ kill -9 PID                      # 强制终止SIGKILL
$ killall nginx                    # 按名称杀进程
$ pkill -f "python app.py"         # 按命令行模式杀进程

$ nohup command &                  # 后台运行（不受终端关闭影响）
$ disown %1                        # 将任务从shell移除
$ jobs                             # 查看后台任务
$ fg %1                            # 调回前台
$ bg %1                            # 继续后台运行`,
          language: "bash",
        },
        {
          title: "systemctl 服务管理",
          content: `systemd 服务管理（CentOS 7+ / Ubuntu 16+）：`,
          code: `$ systemctl start nginx             # 启动服务
$ systemctl stop nginx              # 停止服务
$ systemctl restart nginx           # 重启服务
$ systemctl reload nginx            # 重新加载配置
$ systemctl status nginx            # 查看服务状态
$ systemctl enable nginx            # 开机自启
$ systemctl disable nginx           # 取消开机自启
$ systemctl list-units --type=service  # 列出所有服务
$ journalctl -u nginx -f            # 查看服务日志`,
          language: "bash",
          tip: "systemctl 是现代 Linux 系统管理服务的标准工具，替代了旧的 service 命令。",
        },
      ],
      quiz: [
        { question: "强制终止进程应该使用哪个信号？", options: ["kill PID", "kill -9 PID", "kill -TERM PID", "kill -HUP PID"], answer: 1, explanation: "kill -9 发送 SIGKILL 信号，强制终止进程。" },
        { question: "让进程在终端关闭后继续运行的命令是？", options: ["bg", "nohup command &", "disown", "screen"], answer: 1, explanation: "nohup 命令让进程忽略 HUP 信号，终端关闭后继续运行。" },
        { question: "查看服务实时日志的命令是？", options: ["systemctl status", "journalctl -u name -f", "cat /var/log/name.log", "dmesg"], answer: 1, explanation: "journalctl -u 服务名 -f 可以实时查看指定服务的日志。" },
      ],
    },
    "network-commands": {
      slug: "network-commands",
      sections: [
        {
          title: "网络配置查看",
          content: `查看网络接口和IP：`,
          code: `$ ip addr                          # 查看所有网络接口
$ ip addr show eth0                # 查看特定接口
$ ifconfig                         # 旧式查看（部分系统已移除）
$ ip route                         # 查看路由表
$ ip link show                     # 查看链路状态`,
          language: "bash",
        },
        {
          title: "端口与连接",
          content: `查看端口和网络连接：`,
          code: `$ ss -tlnp                         # 查看TCP监听端口
$ ss -ulnp                         # 查看UDP监听端口
$ ss -s                            # 查看连接统计
$ netstat -tlnp                    # 旧式查看（部分系统已移除）
$ lsof -i :80                      # 查看占用80端口的进程
$ lsof -i -P -n                    # 查看所有网络连接`,
          language: "bash",
        },
        {
          title: "网络测试",
          content: `测试网络连通性：`,
          code: `$ ping -c 3 google.com             # 测试连通性
$ traceroute google.com            # 路由追踪
$ mtr google.com                   # 实时路由追踪
$ curl -v https://example.com      # HTTP请求测试
$ curl -o /dev/null -s -w "%{http_code}" https://example.com  # 只看状态码
$ wget https://example.com/file    # 下载文件`,
          language: "bash",
        },
        {
          title: "DNS 查询",
          content: `DNS 解析查询：`,
          code: `$ nslookup example.com             # DNS查询
$ dig example.com                  # 详细DNS查询
$ dig +short example.com           # 简短输出
$ dig @8.8.8.8 example.com         # 指定DNS服务器
$ dig example.com A                # 查询A记录
$ dig example.com MX               # 查询邮件记录
$ dig example.com ANY              # 查询所有记录
$ host example.com                 # 简单DNS查询`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "查看TCP监听端口的命令是？", options: ["ss -tlnp", "ss -ulnp", "ip addr", "dig"], answer: 0, explanation: "ss -tlnp 显示TCP监听端口，-t=TCP, -l=监听, -n=数字, -p=进程。" },
        { question: "查看占用80端口的进程的命令是？", options: ["ss -tlnp | grep :80", "lsof -i :80", "netstat -tlnp | grep :80", "以上都可以"], answer: 3, explanation: "以上三个命令都可以查看占用特定端口的进程。" },
      ],
    },
  },
  sql: {
    "sql-basics": {
      slug: "sql-basics",
      sections: [
        {
          title: "SQL 简介",
          content: `SQL（Structured Query Language）是用于管理关系型数据库的标准语言。SQL 可以分为以下几类：

- DQL（数据查询语言）：SELECT
- DML（数据操作语言）：INSERT, UPDATE, DELETE
- DDL（数据定义语言）：CREATE, ALTER, DROP
- DCL（数据控制语言）：GRANT, REVOKE
- TCL（事务控制语言）：BEGIN, COMMIT, ROLLBACK`,
        },
        {
          title: "数据库操作",
          content: `创建和管理数据库：`,
          code: `-- 创建数据库
CREATE DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 查看所有数据库
SHOW DATABASES;

-- 切换数据库
USE mydb;

-- 删除数据库
DROP DATABASE mydb;`,
          language: "sql",
        },
        {
          title: "表操作",
          content: `创建和管理表：`,
          code: `-- 创建表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    age INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 查看表结构
DESCRIBE users;
SHOW CREATE TABLE users;

-- 添加列
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- 修改列
ALTER TABLE users MODIFY COLUMN phone VARCHAR(30);

-- 删除列
ALTER TABLE users DROP COLUMN phone;

-- 删除表
DROP TABLE users;`,
          language: "sql",
        },
        {
          title: "数据类型",
          content: `常用数据类型：
- 整数：TINYINT, SMALLINT, INT, BIGINT
- 浮点数：FLOAT, DOUBLE, DECIMAL
- 字符串：CHAR, VARCHAR, TEXT, BLOB
- 日期时间：DATE, TIME, DATETIME, TIMESTAMP
- 布尔：BOOLEAN（实际是TINYINT）`,
        },
      ],
      quiz: [
        { question: "SQL 的全称是？", options: ["Simple Query Language", "Structured Query Language", "Standard Query Language", "System Query Language"], answer: 1, explanation: "SQL 全称是 Structured Query Language（结构化查询语言）。" },
        { question: "以下哪个不是 DML 语句？", options: ["INSERT", "UPDATE", "CREATE", "DELETE"], answer: 2, explanation: "CREATE 是 DDL（数据定义语言）语句，不是 DML。" },
      ],
    },
    "select-queries": {
      slug: "select-queries",
      sections: [
        {
          title: "基本查询",
          content: `SELECT 语句基础：`,
          code: `-- 查询所有列
SELECT * FROM users;

-- 查询指定列
SELECT username, email FROM users;

-- 使用别名
SELECT username AS name, email AS mail FROM users;

-- 去重
SELECT DISTINCT department FROM employees;

-- 条件查询
SELECT * FROM users WHERE age > 18;
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM users WHERE age BETWEEN 20 AND 30;
SELECT * FROM users WHERE id IN (1, 2, 3);
SELECT * FROM users WHERE name IS NOT NULL;`,
          language: "sql",
        },
        {
          title: "排序与分页",
          content: `ORDER BY 和 LIMIT：`,
          code: `-- 升序排列（默认）
SELECT * FROM users ORDER BY created_at ASC;

-- 降序排列
SELECT * FROM users ORDER BY created_at DESC;

-- 多列排序
SELECT * FROM users ORDER BY age DESC, username ASC;

-- 分页查询（MySQL）
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;
-- 或者
SELECT * FROM users ORDER BY id LIMIT 20, 10;

-- 分页查询（PostgreSQL）
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;`,
          language: "sql",
        },
        {
          title: "条件运算符",
          content: `WHERE 子句中的运算符：`,
          code: `-- 比较运算符
SELECT * FROM users WHERE age >= 18;
SELECT * FROM users WHERE age <> 20;  -- 不等于

-- 逻辑运算符
SELECT * FROM users WHERE age > 18 AND status = 'active';
SELECT * FROM users WHERE age < 18 OR age > 60;
SELECT * FROM users WHERE NOT status = 'inactive';

-- BETWEEN
SELECT * FROM users WHERE age BETWEEN 20 AND 30;

-- IN
SELECT * FROM users WHERE country IN ('China', 'Japan', 'Korea');

-- LIKE（模式匹配）
SELECT * FROM users WHERE username LIKE 'john%';    -- 以john开头
SELECT * FROM users WHERE email LIKE '%@gmail.com'; -- 以@gmail.com结尾
SELECT * FROM users WHERE username LIKE 'j_hn';     -- j后面一个字符再hn

-- IS NULL
SELECT * FROM users WHERE deleted_at IS NULL;`,
          language: "sql",
        },
      ],
      quiz: [
        { question: "查询 users 表中前5条记录的正确SQL是？", options: ["SELECT * FROM users LIMIT 5;", "SELECT TOP 5 * FROM users;", "SELECT 5 * FROM users;", "SELECT * FROM users WHERE ROWNUM <= 5;"], answer: 0, explanation: "MySQL 使用 LIMIT 5 来限制返回5条记录。" },
        { question: "LIKE '%@gmail.com' 中 % 代表什么？", options: ["一个字符", "零个或多个字符", "换行符", "空格"], answer: 1, explanation: "% 是通配符，代表零个或多个字符。" },
      ],
    },
    "join-operations": {
      slug: "join-operations",
      sections: [
        {
          title: "INNER JOIN",
          content: `内连接 - 返回两表都匹配的行：`,
          code: `-- 基本内连接
SELECT users.username, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- 使用别名
SELECT u.username, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- 多表连接
SELECT u.username, o.amount, p.product_name
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN products p ON o.product_id = p.id;`,
          language: "sql",
        },
        {
          title: "LEFT JOIN",
          content: `左连接 - 返回左表所有行，右表无匹配则为NULL：`,
          code: `-- 查询所有用户及其订单（包括没有订单的用户）
SELECT u.username, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- 找出没有订单的用户
SELECT u.username
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;`,
          language: "sql",
        },
        {
          title: "RIGHT JOIN & FULL JOIN",
          content: `右连接和全连接：`,
          code: `-- 右连接 - 返回右表所有行
SELECT u.username, o.amount
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- MySQL不支持 FULL JOIN，可以用 UNION 模拟
SELECT u.username, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
UNION
SELECT u.username, o.amount
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;`,
          language: "sql",
          tip: "INNER JOIN 是最常用的连接类型，LEFT JOIN 次之。FULL JOIN 在 MySQL 中不直接支持。"
        },
      ],
      quiz: [
        { question: "INNER JOIN 返回什么？", options: ["左表所有行", "右表所有行", "两表都匹配的行", "两表所有行"], answer: 2, explanation: "INNER JOIN 只返回两表中都匹配的行。" },
        { question: "找出没有订单的用户应该用什么 JOIN？", options: ["INNER JOIN", "LEFT JOIN ... WHERE NULL", "RIGHT JOIN", "CROSS JOIN"], answer: 1, explanation: "LEFT JOIN 配合 WHERE ... IS NULL 可以找到没有匹配的记录。" },
      ],
    },
    "aggregation": {
      slug: "aggregation",
      sections: [
        {
          title: "聚合函数",
          content: `COUNT, SUM, AVG, MAX, MIN：`,
          code: `-- 统计行数
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT department) FROM employees;

-- 求和
SELECT SUM(amount) FROM orders;

-- 平均值
SELECT AVG(age) FROM users;

-- 最大最小值
SELECT MAX(salary), MIN(salary) FROM employees;

-- 组合使用
SELECT
    COUNT(*) AS total_users,
    AVG(age) AS avg_age,
    MAX(age) AS max_age
FROM users;`,
          language: "sql",
        },
        {
          title: "GROUP BY",
          content: `分组统计：`,
          code: `-- 按部门统计人数
SELECT department, COUNT(*) AS count
FROM employees
GROUP BY department;

-- 按部门统计平均薪资
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- 多列分组
SELECT department, job_title, COUNT(*) AS count
FROM employees
GROUP BY department, job_title;

-- HAVING 过滤分组结果
SELECT department, COUNT(*) AS count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;

-- HAVING vs WHERE
-- WHERE 在分组前过滤，HAVING 在分组后过滤
SELECT department, AVG(salary) AS avg_salary
FROM employees
WHERE status = 'active'
GROUP BY department
HAVING AVG(salary) > 10000;`,
          language: "sql",
        },
      ],
      quiz: [
        { question: "HAVING 和 WHERE 的区别是？", options: ["没有区别", "WHERE 在分组前过滤，HAVING 在分组后过滤", "HAVING 在分组前过滤", "WHERE 只能用于SELECT"], answer: 1, explanation: "WHERE 在 GROUP BY 之前过滤行，HAVING 在 GROUP BY 之后过滤分组。" },
      ],
    },
  },
  docker: {
    "docker-basics": {
      slug: "docker-basics",
      sections: [
        {
          title: "Docker 简介",
          content: `Docker 是一个开源的应用容器引擎，让开发者可以打包应用及其依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 或 Windows 操作系统上。

Docker 的核心概念：
- 镜像（Image）：只读模板，包含运行应用所需的一切
- 容器（Container）：镜像的运行实例
- 仓库（Registry）：存储和分发镜像的服务（如 Docker Hub）
- Dockerfile：构建镜像的脚本`,
        },
        {
          title: "安装 Docker",
          content: `Ubuntu 安装：`,
          code: `# 卸载旧版本
sudo apt-get remove docker docker-engine docker.io containerd runc

# 安装依赖
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# 添加 Docker 官方 GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 添加仓库
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 验证安装
docker --version
sudo docker run hello-world`,
          language: "bash",
        },
        {
          title: "基本操作",
          content: `镜像操作：`,
          code: `# 拉取镜像
docker pull nginx
docker pull nginx:1.24

# 查看本地镜像
docker images
docker image ls

# 搜索镜像
docker search ubuntu

# 删除镜像
docker rmi nginx:latest
docker image rm nginx:latest

# 清理无用镜像
docker image prune -a`,
          language: "bash",
        },
        {
          title: "容器操作",
          content: `运行和管理容器：`,
          code: `# 运行容器
docker run -d --name my-nginx -p 80:80 nginx
docker run -it ubuntu bash          # 交互模式

# 查看容器
docker ps                            # 运行中的容器
docker ps -a                         # 所有容器
docker logs my-nginx                 # 查看日志
docker logs -f my-nginx              # 实时日志

# 进入容器
docker exec -it my-nginx bash

# 停止/启动/重启
docker stop my-nginx
docker start my-nginx
docker restart my-nginx

# 删除容器
docker rm my-nginx
docker rm -f my-nginx                # 强制删除

# 清理所有停止的容器
docker container prune`,
          language: "bash",
          tip: "docker run -d 表示后台运行（detached mode），-p 80:80 表示宿主机端口映射到容器端口。",
        },
      ],
      quiz: [
        { question: "Docker 镜像和容器的关系是？", options: ["镜像就是容器", "容器是镜像的运行实例", "镜像是容器的运行实例", "两者没有关系"], answer: 1, explanation: "容器是镜像的运行实例，一个镜像可以创建多个容器。" },
        { question: "docker run -d 的作用是？", options: ["前台运行", "后台运行", "删除容器", "进入容器"], answer: 1, explanation: "-d 表示 detached mode，让容器在后台运行。" },
      ],
    },
    "dockerfile": {
      slug: "dockerfile",
      sections: [
        {
          title: "Dockerfile 基础",
          content: `Dockerfile 是一个文本文件，包含构建镜像的指令。每条指令创建镜像的一层。`,
          code: `# 基础镜像
FROM node:20-alpine

# 工作目录
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "server.js"]`,
          language: "dockerfile",
        },
        {
          title: "常用指令详解",
          content: `FROM - 指定基础镜像：`,
          code: `FROM node:20-alpine           # 指定版本
FROM ubuntu:22.04             # 操作系统镜像
FROM scratch                  # 空镜像（用于静态编译）`,
          language: "dockerfile",
        },
        {
          title: "多阶段构建",
          content: `多阶段构建减小镜像体积：`,
          code: `# 构建阶段
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
          language: "dockerfile",
          tip: "多阶段构建可以将构建环境和运行环境分离，大幅减小最终镜像体积。",
        },
      ],
      quiz: [
        { question: "Dockerfile 中 COPY 和 ADD 的区别是？", options: ["没有区别", "ADD 支持 URL 和解压", "COPY 更快", "ADD 只能复制文件"], answer: 1, explanation: "ADD 除了复制文件外，还支持从 URL 下载和自动解压 tar 文件。" },
      ],
    },
    "docker-compose": {
      slug: "docker-compose",
      sections: [
        {
          title: "Compose 简介",
          content: `Docker Compose 用于定义和运行多容器应用。通过一个 YAML 文件配置所有服务。`,
          code: `# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_PORT=5432
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:`,
          language: "yaml",
        },
        {
          title: "Compose 命令",
          content: `常用 Compose 命令：`,
          code: `# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down

# 重建并启动
docker-compose up -d --build

# 进入容器
docker-compose exec web bash

# 查看资源使用
docker-compose top`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "docker-compose up -d 中 -d 的作用是？", options: ["删除容器", "后台运行", "重建镜像", "查看日志"], answer: 1, explanation: "-d 表示后台运行（detached mode）。" },
      ],
    },
  },
  git: {
    "git-basics": {
      slug: "git-basics",
      sections: [
        {
          title: "Git 简介",
          content: `Git 是一个分布式版本控制系统，由 Linus Torvalds 创建，用于管理 Linux 内核开发。

Git 的核心概念：
- 工作区（Working Directory）：当前编辑的文件
- 暂存区（Staging Area）：准备提交的文件
- 本地仓库（Local Repository）：提交历史
- 远程仓库（Remote Repository）：共享的仓库`,
        },
        {
          title: "安装与配置",
          content: `安装 Git 并进行基本配置：`,
          code: `# 安装
sudo apt-get install git          # Ubuntu
brew install git                  # macOS

# 配置
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --list                 # 查看配置`,
          language: "bash",
        },
        {
          title: "基本工作流",
          content: "",
          code: `# 初始化仓库
git init

# 添加文件到暂存区
git add file.txt
git add .                         # 添加所有文件

# 提交
git commit -m "feat: add login page"

# 查看状态
git status

# 查看提交历史
git log --oneline
git log --graph --all             # 图形化显示`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "git add . 的作用是？", options: ["提交代码", "添加所有文件到暂存区", "删除文件", "查看状态"], answer: 1, explanation: "git add . 将当前目录下所有修改过的文件添加到暂存区。" },
      ],
    },
    "git-branching": {
      slug: "git-branching",
      sections: [
        {
          title: "分支操作",
          content: "",
          code: `# 查看分支
git branch                        # 本地分支
git branch -a                     # 所有分支（含远程）
git branch -v                     # 显示最后提交

# 创建分支
git branch feature-login

# 切换分支
git checkout feature-login
git switch feature-login          # Git 2.23+

# 创建并切换
git checkout -b feature-login
git switch -c feature-login

# 删除分支
git branch -d feature-login       # 安全删除
git branch -D feature-login       # 强制删除`,
          language: "bash",
        },
        {
          title: "合并与变基",
          content: "",
          code: `# 合并（merge）
git checkout main
git merge feature-login

# 变基（rebase）
git checkout feature-login
git rebase main

# 合并 vs 变基
# merge: 保留完整历史，产生合并提交
# rebase: 线性历史，改写提交`,
          language: "bash",
          tip: "rebase 会改写提交历史，不要对已推送到远程的分支使用 rebase。",
        },
      ],
      quiz: [
        { question: "git merge 和 git rebase 的主要区别是？", options: ["没有区别", "merge 保留历史，rebase 线性化历史", "rebase 更快", "merge 只能用于主分支"], answer: 1, explanation: "merge 保留完整的分支历史并产生合并提交，rebase 将分支变基到目标分支上产生线性历史。" },
      ],
    },
  },
  nginx: {
    "nginx-basics": {
      slug: "nginx-basics",
      sections: [
        {
          title: "Nginx 简介",
          content: `Nginx 是一个高性能的 HTTP 和反向代理服务器，也是一个 IMAP/POP3/SMTP 代理服务器。

Nginx 的特点：
- 高并发处理能力（事件驱动架构）
- 内存占用低
- 配置简洁
- 反向代理和负载均衡
- 静态文件服务高效`,
        },
        {
          title: "安装与基本操作",
          content: "",
          code: `# Ubuntu/Debian
sudo apt-get update
sudo apt-get install nginx

# CentOS/RHEL
sudo yum install epel-release
sudo yum install nginx

# 基本操作
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl status nginx
sudo nginx -t                     # 测试配置
sudo nginx -s reload              # 重新加载`,
          language: "bash",
        },
        {
          title: "配置文件结构",
          content: "",
          code: `# /etc/nginx/nginx.conf 主配置文件

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    keepalive_timeout 65;

    # 引入站点配置
    include /etc/nginx/conf.d/*.conf;
}`,
          language: "nginx",
        },
        {
          title: "虚拟主机配置",
          content: "",
          code: `# /etc/nginx/conf.d/example.conf

server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/example;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    # 静态文件缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}`,
          language: "nginx",
        },
      ],
      quiz: [
        { question: "nginx -t 命令的作用是？", options: ["启动nginx", "测试配置文件语法", "停止nginx", "查看日志"], answer: 1, explanation: "nginx -t 用于测试配置文件语法是否正确。" },
      ],
    },
    "nginx-reverse-proxy": {
      slug: "nginx-reverse-proxy",
      sections: [
        {
          title: "反向代理配置",
          content: `反向代理是 Nginx 最常用的功能之一，将客户端请求转发到后端服务器。`,
          code: `# 基本反向代理
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# WebSocket 代理
location /ws {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}`,
          language: "nginx",
        },
        {
          title: "负载均衡",
          content: "",
          code: `# 定义上游服务器组
upstream backend {
    server 192.168.1.10:3000 weight=3;
    server 192.168.1.11:3000 weight=2;
    server 192.168.1.12:3000 weight=1;

    # 健康检查
    keepalive 32;
}

# 负载均衡算法
upstream backend {
    # 轮询（默认）
    server 192.168.1.10:3000;
    server 192.168.1.11:3000;

    # IP Hash（会话保持）
    ip_hash;

    # 最少连接
    least_conn;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}`,
          language: "nginx",
        },
      ],
      quiz: [
        { question: "Nginx 负载均衡中 ip_hash 的作用是？", options: ["随机分配", "根据客户端IP分配到固定服务器", "按顺序分配", "按权重分配"], answer: 1, explanation: "ip_hash 根据客户端 IP 的哈希值将请求分配到固定的后端服务器，实现会话保持。" },
      ],
    },
  },
  python: {
    "python-basics": {
      slug: "python-basics",
      sections: [
        {
          title: "Python 简介",
          content: `Python 是一种解释型、面向对象、动态类型的高级编程语言。以其简洁的语法和强大的生态系统著称。

Python 的应用领域：
- Web 开发（Django, Flask）
- 数据科学与机器学习（NumPy, Pandas, TensorFlow）
- 自动化脚本与运维
- 网络爬虫
- 人工智能`,
        },
        {
          title: "基本数据类型",
          content: "",
          code: `# 数字
age = 25              # 整数 int
price = 9.99          # 浮点数 float
complex_num = 3 + 4j  # 复数

# 字符串
name = "Alice"
greeting = f"Hello, {name}!"  # f-string

# 布尔
is_active = True

# 列表
fruits = ["apple", "banana", "cherry"]
fruits.append("date")

# 字典
user = {"name": "Alice", "age": 25}
user["email"] = "alice@example.com"

# 元组
point = (10, 20)

# 集合
unique = {1, 2, 3, 3}  # {1, 2, 3}

# 类型检查
print(type(age))        # <class 'int'>
print(type(name))       # <class 'str'>`,
          language: "python",
        },
        {
          title: "控制流",
          content: "",
          code: `# if 语句
age = 18
if age >= 18:
    print("成年人")
elif age >= 12:
    print("青少年")
else:
    print("儿童")

# for 循环
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for fruit in ["apple", "banana", "cherry"]:
    print(fruit)

# while 循环
count = 0
while count < 5:
    print(count)
    count += 1

# 列表推导式
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]`,
          language: "python",
        },
      ],
      quiz: [
        { question: "Python 中 f-string 的作用是？", options: ["格式化字符串", "创建文件", "函数调用", "过滤数据"], answer: 0, explanation: "f-string 是 Python 3.6+ 引入的字符串格式化方式，使用 f 前缀和 {} 插入变量。" },
      ],
    },
    "python-data-structures": {
      slug: "python-data-structures",
      sections: [
        {
          title: "列表 (List)",
          content: `列表是 Python 中最常用的数据结构，是一个有序、可变的集合。列表可以存储任意类型的元素。

常用操作：append() 末尾添加，insert() 指定位置插入，pop() 删除并返回，sort() 原地排序，切片 [start:end:step] 获取子列表。`,
          code: `# 创建列表
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]

# 访问元素
print(fruits[0])       # apple
print(fruits[-1])      # cherry

# 切片
print(numbers[1:4])    # [2, 3, 4]
print(numbers[::2])    # [1, 3, 5]
print(numbers[::-1])   # [5, 4, 3, 2, 1]

# 列表方法
fruits.append("date")
fruits.insert(1, "blueberry")
fruits.remove("banana")
popped = fruits.pop()

# 列表推导式
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]

# 排序
nums = [3, 1, 4, 1, 5, 9]
nums.sort()
print(nums)  # [1, 1, 3, 4, 5, 9]`,
          language: "python",
        },
        {
          title: "元组 (Tuple)",
          content: `元组是有序、不可变的序列。一旦创建就不能修改。常用于存储不应被修改的数据，如坐标、数据库记录等。

元组解包是 Python 的强大特性，可以一次性将元组中的值赋给多个变量。`,
          code: `# 创建元组
point = (10, 20)
colors = ("red", "green", "blue")
single = (42,)  # 单元素元组必须加逗号

# 元组解包
x, y = point
a, b, c = colors

# 交换变量
a, b = b, a

# 函数多返回值
def get_min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = get_min_max([3, 1, 4, 1, 5, 9])`,
          language: "python",
          tip: "元组比列表更节省内存，且可以作为字典的键。",
        },
        {
          title: "字典 (Dict)",
          content: `字典是键值对的无序集合（Python 3.7+ 保持插入顺序）。键必须是不可变类型（字符串、数字、元组），值可以是任意类型。`,
          code: `# 创建字典
user = {"name": "Alice", "age": 25, "city": "Beijing"}

# 访问
print(user["name"])          # Alice
print(user.get("email", "N/A"))

# 修改和添加
user["age"] = 26
user["email"] = "alice@example.com"

# 遍历
for key, value in user.items():
    print(f"{key}: {value}")

# 字典推导式
squares = {x: x**2 for x in range(6)}

# 统计词频
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
count = {}
for word in words:
    count[word] = count.get(word, 0) + 1`,
          language: "python",
        },
        {
          title: "集合 (Set)",
          content: `集合是无序、不重复的元素集合。支持数学集合运算：并集、交集、差集、对称差集。常用于去重和成员检测。`,
          code: `# 创建集合
fruits = {"apple", "banana", "cherry"}
numbers = set([1, 2, 3, 3, 4, 4])  # {1, 2, 3, 4}

# 集合运算
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)   # 并集: {1, 2, 3, 4, 5, 6}
print(a & b)   # 交集: {3, 4}
print(a - b)   # 差集: {1, 2}
print(a ^ b)   # 对称差集: {1, 2, 5, 6}

# 去重
data = [1, 2, 2, 3, 3, 3, 4]
unique = list(set(data))`,
          language: "python",
        },
      ],
      quiz: [
        { question: "列表和元组的主要区别是什么？", options: ["列表更快", "列表可变，元组不可变", "元组可以存储更多数据", "没有区别"], answer: 1, explanation: "列表是可变的，可以修改元素；元组是不可变的，创建后不能修改。" },
        { question: "字典的键必须是什么类型？", options: ["任意类型", "字符串", "不可变类型", "数字"], answer: 2, explanation: "字典的键必须是不可变类型，如字符串、数字、元组。" },
        { question: "集合的主要特点是什么？", options: ["有序可重复", "有序不重复", "无序不重复", "无序可重复"], answer: 2, explanation: "集合是无序的且不允许重复元素。" },
      ],
    },
    "python-functions": {
      slug: "python-functions",
      sections: [
        {
          title: "函数定义与参数",
          content: `函数是可重用的代码块。Python 函数支持多种参数类型：位置参数、默认参数、关键字参数、可变参数。`,
          code: `# 基本函数
def greet(name):
    return f"Hello, {name}!"

# 默认参数
def power(base, exp=2):
    return base ** exp

# 多返回值
def divide(a, b):
    return a // b, a % b

quotient, remainder = divide(17, 5)

# 类型提示
def add(a: int, b: int) -> int:
    return a + b`,
          language: "python",
        },
        {
          title: "*args 与 **kwargs",
          content: `*args 用于接收任意数量的位置参数，在函数内部表现为元组。**kwargs 用于接收任意数量的关键字参数，在函数内部表现为字典。`,
          code: `# *args
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4, 5))  # 15

# **kwargs
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="Beijing")

# 混合使用
def create_user(name, age, **extra):
    user = {"name": name, "age": age}
    user.update(extra)
    return user`,
          language: "python",
        },
        {
          title: "装饰器",
          content: `装饰器是一种设计模式，用于在不修改原函数的情况下为函数添加额外功能。装饰器本质上是一个接收函数并返回函数的高阶函数。`,
          code: `import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 执行时间: {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "完成"

slow_function()

# 带参数的装饰器
def repeat(n):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()`,
          language: "python",
          tip: "使用 functools.wraps 保留原函数的元信息。",
        },
      ],
      quiz: [
        { question: "*args 和 **kwargs 的区别是什么？", options: ["没有区别", "*args 接收位置参数，**kwargs 接收关键字参数", "*args 更快", "**kwargs 是旧语法"], answer: 1, explanation: "*args 将位置参数收集为元组，**kwargs 将关键字参数收集为字典。" },
        { question: "装饰器的本质是什么？", options: ["一个类", "一个高阶函数", "一个变量", "一个循环"], answer: 1, explanation: "装饰器本质上是一个接收函数作为参数并返回新函数的高阶函数。" },
      ],
    },
    "python-oop": {
      slug: "python-oop",
      sections: [
        {
          title: "类与对象",
          content: `类是对象的蓝图，对象是类的实例。Python 使用 class 关键字定义类。__init__ 是构造方法，在创建对象时自动调用。`,
          code: `class Dog:
    species = "犬科"

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name} says: 汪汪！"

    def __str__(self):
        return f"Dog(name={self.name}, age={self.age})"

dog1 = Dog("旺财", 3)
print(dog1.bark())    # 旺财 says: 汪汪！
print(Dog.species)    # 犬科`,
          language: "python",
        },
        {
          title: "继承与多态",
          content: `继承允许子类复用父类的属性和方法。多态通过鸭子类型实现：如果对象看起来像鸭子、走路像鸭子，那它就是鸭子。`,
          code: `class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says: {self.sound}"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "汪汪")
        self.breed = breed

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name, "喵喵")

    def speak(self):  # 方法重写
        return f"{self.name} says: 喵~"

dog = Dog("旺财", "金毛")
cat = Cat("小花")
print(dog.speak())    # 旺财 says: 汪汪
print(cat.speak())    # 小花 says: 喵~`,
          language: "python",
        },
        {
          title: "特殊方法",
          content: `Python 类可以定义特殊方法（魔术方法），让自定义类支持内置操作，如 len()、print()、+ 运算符等。`,
          code: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __abs__(self):
        return (self.x2 + self.y2) ** 0.5

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1 + v2)       # Vector(4, 6)
print(abs(v1))        # 5.0`,
          language: "python",
        },
      ],
      quiz: [
        { question: "Python 中 self 代表什么？", options: ["类本身", "当前实例对象", "父类", "全局变量"], answer: 1, explanation: "self 代表类的当前实例对象。" },
        { question: "super() 的作用是什么？", options: ["创建子类", "调用父类方法", "删除对象", "检查类型"], answer: 1, explanation: "super() 用于调用父类的方法。" },
      ],
    },
    "python-file-io": {
      slug: "python-file-io",
      sections: [
        {
          title: "文件读写基础",
          content: `Python 使用 open() 函数打开文件。推荐使用 with 语句自动管理文件资源。常用打开模式：r 只读，w 写入（覆盖），a 追加。`,
          code: `# 写入文件
with open("hello.txt", "w", encoding="utf-8") as f:
    f.write("Hello, World!\\n")
    f.write("第二行内容\\n")

# 读取整个文件
with open("hello.txt", "r", encoding="utf-8") as f:
    content = f.read()

# 逐行读取
with open("hello.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())`,
          language: "python",
        },
        {
          title: "JSON 与 CSV 操作",
          content: `Python 的 json 模块可以方便地读写 JSON 文件。csv 模块用于处理 CSV 格式数据。`,
          code: `import json
import csv

# 写入 JSON
data = {"name": "张三", "age": 25, "scores": [90, 85, 92]}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取 JSON
with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)

# 读取 CSV
with open("students.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['姓名']} 成绩: {row['成绩']}")`,
          language: "python",
        },
      ],
      quiz: [
        { question: "with 语句在文件操作中的作用是什么？", options: ["加快读写速度", "自动关闭文件", "加密文件", "压缩文件"], answer: 1, explanation: "with 语句确保文件在使用完毕后自动关闭。" },
      ],
    },
    "python-error-handling": {
      slug: "python-error-handling",
      sections: [
        {
          title: "try/except 基础",
          content: `Python 使用 try/except 来捕获和处理异常。try 块中放置可能出错的代码，except 块处理异常。`,
          code: `# 基本语法
try:
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以零！")

# 捕获多个异常
try:
    num = int(input("请输入数字: "))
except ValueError:
    print("输入的不是有效数字")
except ZeroDivisionError:
    print("不能除以零！")

# else 和 finally
try:
    f = open("data.txt", "r")
except FileNotFoundError:
    print("文件不存在")
else:
    content = f.read()
finally:
    print("清理工作完成")`,
          language: "python",
        },
        {
          title: "自定义异常",
          content: `可以通过继承 Exception 类创建自定义异常，使错误处理更具语义化。`,
          code: `class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"余额不足: 当前 {balance}, 需要 {amount}")

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(balance, amount)
    return balance - amount

try:
    new_balance = withdraw(100, 200)
except InsufficientFundsError as e:
    print(e)`,
          language: "python",
        },
      ],
      quiz: [
        { question: "try/except/finally 中 finally 什么时候执行？", options: ["有异常时执行", "无异常时执行", "无论如何都执行", "从不执行"], answer: 2, explanation: "finally 块无论是否发生异常都会执行。" },
      ],
    },
    "python-regex": {
      slug: "python-regex",
      sections: [
        {
          title: "re 模块基础",
          content: `正则表达式是用于匹配字符串模式的强大工具。Python 的 re 模块提供了完整的正则表达式支持。`,
          code: `import re

text = "我的电话是 138-1234-5678，邮箱是 test@example.com"

# search - 搜索第一个匹配
phone = re.search(r"\\d{3}-\\d{4}-\\d{4}", text)
if phone:
    print(f"找到电话: {phone.group()}")

# findall - 查找所有匹配
numbers = re.findall(r"\\d+", text)
print(numbers)  # ['138', '1234', '5678']

# sub - 替换
cleaned = re.sub(r"\\d", "*", "电话: 13812345678")`,
          language: "python",
        },
        {
          title: "正则表达式语法",
          content: `常用元字符：. 任意字符，^ 开头，$ 结尾，\\d 数字，\\w 字母数字下划线，\\s 空白字符，* 0次或多次，+ 1次或多次。`,
          code: `import re

# 字符匹配
text = "abc 123 ABC"
print(re.findall(r"[a-z]+", text))    # ['abc']
print(re.findall(r"[0-9]+", text))    # ['123']

# 量词
text = "aab abbb a"
print(re.findall(r"ab*", text))   # ['aab', 'abbb', 'a']
print(re.findall(r"ab+", text))   # ['aab', 'abbb']

# 分组与捕获
date = "2026-06-30"
match = re.match(r"(\\d{4})-(\\d{2})-(\\d{2})", date)
if match:
    print(match.groups())  # ('2026', '06', '30')`,
          language: "python",
        },
      ],
      quiz: [
        { question: "re.search() 和 re.match() 的区别是什么？", options: ["没有区别", "search 搜索整个字符串，match 只匹配开头", "search 更快", "match 更灵活"], answer: 1, explanation: "re.match() 只从字符串开头匹配，re.search() 会搜索整个字符串。" },
      ],
    },
    "python-concurrency": {
      slug: "python-concurrency",
      sections: [
        {
          title: "threading 多线程",
          content: `threading 模块提供多线程支持。由于 Python 的 GIL，多线程适合 I/O 密集型任务，不适合 CPU 密集型任务。`,
          code: `import threading
import time

def download(url):
    print(f"开始下载 {url}")
    time.sleep(2)
    print(f"完成下载 {url}")

# 多线程执行
threads = []
for url in ["url1", "url2", "url3"]:
    t = threading.Thread(target=download, args=(url,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

# 使用 ThreadPoolExecutor
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=3) as executor:
    executor.map(download, urls)`,
          language: "python",
        },
        {
          title: "asyncio 异步编程",
          content: `asyncio 是 Python 的异步编程框架，使用 async/await 语法。适合高并发 I/O 操作，如网络请求、文件操作等。`,
          code: `import asyncio

async def greet(name):
    await asyncio.sleep(1)
    return f"Hello, {name}!"

async def main():
    # 并发执行
    results = await asyncio.gather(
        greet("Alice"),
        greet("Bob"),
        greet("Charlie"),
    )
    print(results)

asyncio.run(main())`,
          language: "python",
        },
      ],
      quiz: [
        { question: "Python 的 GIL 对多线程有什么影响？", options: ["没有影响", "限制了 CPU 密集型任务的并行", "限制了所有任务", "只影响网络请求"], answer: 1, explanation: "GIL 确保同一时刻只有一个线程执行 Python 字节码，因此多线程无法利用多核 CPU。" },
      ],
    },
    "python-network": {
      slug: "python-network",
      sections: [
        {
          title: "requests 库",
          content: `requests 是 Python 最流行的 HTTP 客户端库，API 简洁优雅。支持所有 HTTP 方法。`,
          code: `import requests

# GET 请求
response = requests.get("https://api.github.com")
print(response.status_code)
print(response.json())

# 带参数的 GET
params = {"q": "python", "sort": "stars"}
response = requests.get("https://api.github.com/search/repositories", params=params)

# POST 请求
data = {"username": "alice", "password": "secret"}
response = requests.post("https://httpbin.org/post", json=data)

# 错误处理
try:
    response = requests.get("https://httpbin.org/status/404", timeout=5)
    response.raise_for_status()
except requests.exceptions.RequestException as e:
    print(f"请求错误: {e}")`,
          language: "python",
        },
      ],
      quiz: [
        { question: "requests.get() 中 timeout 参数的作用是什么？", options: ["设置重试次数", "设置请求超时时间", "设置响应大小", "设置并发数"], answer: 1, explanation: "timeout 参数指定请求的超时时间（秒）。" },
      ],
    },
    "python-automation": {
      slug: "python-automation",
      sections: [
        {
          title: "os 与 pathlib",
          content: `os 模块提供操作系统相关功能，pathlib 提供面向对象的路径操作。pathlib 是更现代的方式，推荐使用。`,
          code: `import os
from pathlib import Path

# pathlib 操作
current = Path(".")
print(current.resolve())

# 路径操作
file_path = Path("data/output.csv")
print(file_path.parent)    # data
print(file_path.suffix)    # .csv

# 创建和删除
Path("new_dir").mkdir(parents=True, exist_ok=True)
Path("file.txt").touch()
Path("file.txt").unlink()

# 遍历目录
for py_file in Path(".").rglob("*.py"):
    print(py_file)`,
          language: "python",
        },
        {
          title: "subprocess 模块",
          content: `subprocess 模块用于执行外部命令和程序。推荐使用 run() 函数。`,
          code: `import subprocess

# 执行简单命令
result = subprocess.run(["ls", "-la"], capture_output=True, text=True)
print(result.stdout)

# 执行 shell 命令
result = subprocess.run("echo $HOME", shell=True, capture_output=True, text=True)

# 检查返回码
result = subprocess.run(
    ["git", "status"],
    capture_output=True,
    text=True,
    check=True
)`,
          language: "python",
        },
      ],
      quiz: [
        { question: "pathlib 相比 os.path 的优势是什么？", options: ["更快", "面向对象的 API，更简洁", "更多功能", "只支持 Linux"], answer: 1, explanation: "pathlib 提供面向对象的路径操作，代码更简洁、可读性更好。" },
      ],
    },
    "python-data-analysis": {
      slug: "python-data-analysis",
      sections: [
        {
          title: "NumPy 基础",
          content: `NumPy 是 Python 科学计算的基础库，提供高性能的多维数组对象 ndarray。`,
          code: `import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print(arr.shape)  # (5,)

# 数组运算
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a + b)     # [5 7 9]
print(a * b)     # [4 10 18]

# 统计方法
data = np.random.randn(1000)
print(np.mean(data))
print(np.std(data))`,
          language: "python",
        },
        {
          title: "Pandas 基础",
          content: `Pandas 是数据分析的核心库，提供 DataFrame 和 Series 两种数据结构。`,
          code: `import pandas as pd

# 创建 DataFrame
data = {
    "姓名": ["张三", "李四", "王五"],
    "年龄": [25, 30, 35],
    "城市": ["北京", "上海", "广州"]
}
df = pd.DataFrame(data)

# 读取数据
df = pd.read_csv("data.csv")

# 查看数据
print(df.head())
print(df.describe())

# 筛选
young = df[df["年龄"] < 30]`,
          language: "python",
        },
      ],
      quiz: [
        { question: "NumPy 数组相比 Python 列表的优势是什么？", options: ["语法更简洁", "更快且支持向量化运算", "更灵活", "更安全"], answer: 1, explanation: "NumPy 数组在底层用 C 实现，支持向量化运算，比 Python 列表快得多。" },
      ],
    },
    "python-web-scraping": {
      slug: "python-web-scraping",
      sections: [
        {
          title: "requests + BeautifulSoup",
          content: `requests 获取网页 HTML，BeautifulSoup 解析 HTML 内容。这是 Python 爬虫的基础组合。`,
          code: `import requests
from bs4 import BeautifulSoup

# 获取网页
url = "https://quotes.toscrape.com"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# 查找元素
quotes = soup.find_all("div", class_="quote")
for quote in quotes:
    text = quote.find("span", class_="text").get_text()
    author = quote.find("small", class_="author").get_text()
    print(f"{text} -- {author}")`,
          language: "python",
        },
      ],
      quiz: [
        { question: "requests 和 BeautifulSoup 各自的作用是什么？", options: ["都用于解析 HTML", "requests 获取网页，BeautifulSoup 解析 HTML", "都用于发送请求", "requests 解析 HTML，BeautifulSoup 发送请求"], answer: 1, explanation: "requests 负责发送 HTTP 请求获取网页内容，BeautifulSoup 负责解析 HTML 提取数据。" },
      ],
    },
    "python-testing": {
      slug: "python-testing",
      sections: [
        {
          title: "pytest 基础",
          content: `pytest 是 Python 最流行的测试框架，语法简洁，功能强大。测试文件和函数以 test_ 开头。`,
          code: `# test_calculator.py
from calculator import add, divide
import pytest

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

def test_divide():
    assert divide(10, 2) == 5.0

def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(10, 0)`,
          language: "python",
        },
        {
          title: "Fixture 与参数化",
          content: `Fixture 用于准备测试环境和数据。参数化测试可以用一组用例测试多种输入。`,
          code: `import pytest

@pytest.fixture
def sample_data():
    return {"name": "Alice", "age": 25}

def test_data_name(sample_data):
    assert sample_data["name"] == "Alice"

@pytest.mark.parametrize("input,expected", [
    (1, 2),
    (2, 4),
    (3, 6),
])
def test_double(input, expected):
    assert input * 2 == expected`,
          language: "python",
        },
      ],
      quiz: [
        { question: "pytest 测试文件的命名规则是什么？", options: ["任意命名", "以 test_ 开头", "以 _test 结尾", "以 test 开头或结尾"], answer: 1, explanation: "pytest 默认发现以 test_ 开头的文件和函数。" },
      ],
    },
    "python-packaging": {
      slug: "python-packaging",
      sections: [
        {
          title: "项目结构与 pyproject.toml",
          content: `标准的 Python 项目结构有助于代码组织和分发。推荐使用 pyproject.toml 管理项目配置。`,
          code: `# pyproject.toml
[build-system]
requires = ["setuptools>=68.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "myproject"
version = "0.1.0"
description = "我的项目"
requires-python = ">=3.8"
dependencies = [
    "requests>=2.28",
    "click>=8.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "black>=23.0",
]`,
          language: "toml",
        },
        {
          title: "打包与发布",
          content: `使用 build 工具构建分发包，使用 twine 上传到 PyPI。`,
          code: `# 安装构建工具
pip install build twine

# 构建分发包
python -m build

# 上传到 PyPI
twine upload dist/*

# 本地开发安装
pip install -e .

# 版本管理
# pip install bump2version
# bump2version patch  # 0.1.0 -> 0.1.1`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "pyproject.toml 的作用是什么？", options: ["运行脚本", "项目配置和构建设置", "存储数据", "日志记录"], answer: 1, explanation: "pyproject.toml 是 Python 项目的标准配置文件。" },
      ],
    },
  },
  shell: {
    "bash-basics": {
      slug: "bash-basics",
      sections: [
        {
          title: "Bash 变量",
          content: "",
          code: `# 定义变量
NAME="John"
AGE=30
readonly PI=3.14    # 只读变量

# 使用变量
echo "My name is $NAME"
echo "My name is \${NAME}"

# 命令替换
CURRENT_DATE=$(date +%Y-%m-%d)
KERNEL_VERSION=$(uname -r)

# 字符串操作
STR="Hello World"
echo \${#STR}           # 长度: 11
echo \${STR:0:5}        # 子串: Hello
echo \${STR/World/Linux} # 替换: Hello Linux

# 默认值
echo \${UNSET_VAR:-"default"}   # 未设置时使用默认值
echo \${UNSET_VAR:="assigned"}  # 未设置时赋值`,
          language: "bash",
        },
        {
          title: "数组",
          content: "",
          code: `# 定义数组
FRUITS=("apple" "banana" "cherry")
NUMBERS=(1 2 3 4 5)

# 访问元素
echo \${FRUITS[0]}       # apple
echo \${FRUITS[@]}       # 所有元素
echo \${#FRUITS[@]}      # 数组长度: 3

# 添加元素
FRUITS+=("date")

# 遍历数组
for fruit in "\${FRUITS[@]}"; do
    echo $fruit
done

# 关联数组（Bash 4+）
declare -A colors
colors[red]="#ff0000"
colors[green]="#00ff00"
echo \${colors[red]}`,
          language: "bash",
        },
        {
          title: "字符串操作",
          content: "",
          code: `STR="Hello, World!"

# 长度
echo \${#STR}              # 13

# 子串
echo \${STR:0:5}           # Hello
echo \${STR:7}             # World!

# 替换
echo \${STR/World/Bash}    # Hello, Bash!

# 删除匹配
FILE="archive.tar.gz"
echo \${FILE%.gz}          # archive.tar
echo \${FILE%%.*}          # archive
echo \${FILE#*.}           # tar.gz
echo \${FILE##*.}          # gz`,
          language: "bash",
          tip: "% 和 # 用于删除匹配，单字符匹配最短，双字符匹配最长。",
        },
      ],
      quiz: [
        { question: "Bash 中 ${#STR} 的作用是？", options: ["获取字符串值", "获取字符串长度", "定义数组", "删除变量"], answer: 1, explanation: "${#STR} 返回字符串 STR 的长度。" },
      ],
    },
    "bash-conditionals": {
      slug: "bash-conditionals",
      sections: [
        {
          title: "if 语句",
          content: `if 语句是 Bash 中最基本的条件判断结构。语法为 if [ condition ]; then ... fi。`,
          code: `# 基本 if 语句
if [ -f "/etc/passwd" ]; then
    echo "文件存在"
fi

# if-else
if [ "$USER" = "root" ]; then
    echo "你是 root 用户"
else
    echo "你是普通用户"
fi

# if-elif-else
AGE=25
if [ "$AGE" -lt 18 ]; then
    echo "未成年"
elif [ "$AGE" -lt 60 ]; then
    echo "成年人"
else
    echo "老年人"
fi`,
          language: "bash",
        },
        {
          title: "case 语句",
          content: `case 语句用于多分支匹配，类似其他语言的 switch-case。适合菜单选择、参数解析等场景。`,
          code: `FRUIT="apple"
case "$FRUIT" in
    "apple")
        echo "苹果"
        ;;
    "banana")
        echo "香蕉"
        ;;
    *)
        echo "未知水果"
        ;;
esac

# 通配符匹配
FILE="archive.tar.gz"
case "$FILE" in
    *.tar.gz) echo "tar.gz 压缩包" ;;
    *.zip)    echo "zip 压缩包" ;;
    *.py)     echo "Python 文件" ;;
    *)        echo "其他类型" ;;
esac`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "[ -f file ] 和 [ -d file ] 的区别是什么？", options: ["没有区别", "-f 检查普通文件，-d 检查目录", "-f 更快", "-d 更安全"], answer: 1, explanation: "-f 检查路径是否是普通文件，-d 检查路径是否是目录。" },
        { question: "case 语句中 * 模式的作用是什么？", options: ["匹配空字符串", "匹配任意字符串（默认分支）", "匹配数字", "匹配字母"], answer: 1, explanation: "* 是通配符，匹配任意字符串，通常放在最后作为默认分支。" },
      ],
    },
    "bash-loops": {
      slug: "bash-loops",
      sections: [
        {
          title: "for 循环",
          content: `for 循环遍历列表中的每个元素。有多种语法形式：列表、C 风格、文件通配。`,
          code: `# 列表循环
for FRUIT in apple banana cherry; do
    echo "$FRUIT"
done

# 数字序列
for i in {1..5}; do
    echo "$i"
done

# C 风格 for 循环
for ((i=0; i<10; i++)); do
    echo "$i"
done

# 遍历文件
for FILE in *.txt; do
    echo "文件: $FILE"
done`,
          language: "bash",
        },
        {
          title: "while 和 until",
          content: `while 循环在条件为真时重复执行。until 循环在条件为假时重复执行（与 while 相反）。`,
          code: `# while 循环
COUNT=1
while [ "$COUNT" -le 5 ]; do
    echo "计数: $COUNT"
    ((COUNT++))
done

# 无限循环
while true; do
    read -p "输入 (q 退出): " INPUT
    [ "$INPUT" = "q" ] && break
    echo "你输入了: $INPUT"
done

# 读取文件每一行
while IFS= read -r LINE; do
    echo "$LINE"
done < file.txt`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "while 和 until 的区别是什么？", options: ["没有区别", "while 条件为真时执行，until 条件为假时执行", "while 更快", "until 不支持 break"], answer: 1, explanation: "while 在条件为真时循环，until 在条件为假时循环，逻辑相反。" },
      ],
    },
    "bash-functions": {
      slug: "bash-functions",
      sections: [
        {
          title: "函数定义",
          content: `Bash 函数用于组织可重用的代码。函数可以接收参数、返回值。`,
          code: `# 定义函数
greet() {
    echo "Hello, $1!"
}

# 调用函数
greet "Alice"    # Hello, Alice!

# 函数参数
show_info() {
    echo "第一个参数: $1"
    echo "所有参数: $@"
    echo "参数个数: $#"
}

# 通过 echo 返回值
add() {
    echo $(( $1 + $2 ))
}

RESULT=$(add 3 5)
echo "3 + 5 = $RESULT"`,
          language: "bash",
        },
        {
          title: "局部变量",
          content: `Bash 函数中的变量默认是全局的。使用 local 关键字声明局部变量，避免变量污染。`,
          code: `# 使用 local
process_data() {
    local input="$1"
    local result=""
    result=$(echo "$input" | tr '[:upper:]' '[:lower:]')
    echo "$result"
}

OUTPUT=$(process_data "HELLO")
echo "$OUTPUT"  # hello

# 递归函数
factorial() {
    if [ "$1" -le 1 ]; then
        echo 1
    else
        local prev=$(factorial $(( $1 - 1 )))
        echo $(( $1 * prev ))
    fi
}

echo "5! = $(factorial 5)"  # 120`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "Bash 函数中 local 关键字的作用是什么？", options: ["声明全局变量", "声明局部变量", "声明常量", "声明数组"], answer: 1, explanation: "local 声明的变量只在函数内部有效。" },
      ],
    },
    "bash-io": {
      slug: "bash-io",
      sections: [
        {
          title: "标准输入输出",
          content: `每个进程有三个标准文件描述符：0 标准输入，1 标准输出，2 标准错误。`,
          code: `# 重定向输出
echo "hello" > file.txt       # 覆盖写入
echo "world" >> file.txt      # 追加写入

# 重定向错误
command 2> error.log
command > output.log 2>&1
command &> all.log

# Here Document
cat << EOF
第一行
第二行
EOF

# read 读取输入
read -p "请输入姓名: " NAME
read -s -p "请输入密码: " PASSWORD`,
          language: "bash",
        },
        {
          title: "管道与过滤器",
          content: `管道 | 将一个命令的输出作为另一个命令的输入。这是 Unix 哲学的核心。`,
          code: `# 基本管道
echo "hello world" | tr '[:lower:]' '[:upper:]'

# 常用组合
cat access.log \
    | awk '{print $1}' \
    | sort \
    | uniq -c \
    | sort -rn \
    | head -10

# tee 同时输出到屏幕和文件
command | tee output.log`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "2>&1 的作用是什么？", options: ["将标准输入重定向到标准输出", "将标准错误重定向到标准输出", "将标准输出重定向到标准输入", "将标准错误重定向到标准输入"], answer: 1, explanation: "2>&1 将文件描述符 2（stderr）重定向到文件描述符 1（stdout）。" },
      ],
    },
    "bash-regex": {
      slug: "bash-regex",
      sections: [
        {
          title: "grep 正则",
          content: `grep 支持基本正则和扩展正则。使用 -E 启用扩展正则。`,
          code: `# 基本正则
grep "^start" file.txt
grep "end$" file.txt
grep "a.b" file.txt

# 扩展正则（-E）
grep -E "err|warn|crit" file
grep -E "[0-9]{3}" file
grep -E "(ab)+" file`,
          language: "bash",
        },
        {
          title: "sed 与 awk",
          content: `sed 是流编辑器，常用于文本替换。awk 是强大的文本处理语言，按行和字段处理。`,
          code: `# sed 替换
sed 's/old/new/g' file
sed -i 's/old/new/g' file

# sed 删除
sed '/^$/d' file
sed '3d' file

# awk 打印列
awk '{print $1}' file
awk -F: '{print $1}' /etc/passwd

# awk 条件过滤
awk '/error/ {print}' file
awk 'NR==5' file`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "grep -E 和 grep 的区别是什么？", options: ["没有区别", "-E 启用扩展正则，支持 +、?、() 等", "-E 更快", "-E 只搜索文件"], answer: 1, explanation: "-E 启用扩展正则（ERE），支持更多元字符无需转义。" },
      ],
    },
    "bash-advanced": {
      slug: "bash-advanced",
      sections: [
        {
          title: "信号处理",
          content: `Bash 可以捕获和处理系统信号。trap 命令用于定义信号处理函数。`,
          code: `# 捕获退出
cleanup() {
    echo "清理临时文件..."
    rm -f /tmp/script_\$\$
}
trap cleanup EXIT

# 捕获 Ctrl+C
trap 'echo "收到 SIGINT"; exit 1' INT

# 忽略信号
trap '' INT    # 忽略 Ctrl+C
trap - INT    # 恢复默认处理`,
          language: "bash",
        },
        {
          title: "调试技巧",
          content: `Bash 提供了多种调试手段：set 选项、trap 调试、PS4 自定义调试前缀。`,
          code: `# set -x：打印每个命令
set -x
echo "调试模式"
set +x

# set -e：出错即退出
set -e

# set -u：使用未定义变量时报错
set -u

# 严格模式
set -euo pipefail`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "trap cleanup EXIT 的作用是什么？", options: ["捕获 Ctrl+C", "脚本退出时执行 cleanup 函数", "捕获所有信号", "启动 cleanup 进程"], answer: 1, explanation: "trap cleanup EXIT 在脚本退出时自动执行 cleanup 函数。" },
      ],
    },
    "bash-logging": {
      slug: "bash-logging",
      sections: [
        {
          title: "日志函数",
          content: `编写可复用的日志函数，统一管理日志格式和输出。`,
          code: `log() {
    local level="$1"
    shift
    local msg="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $msg"
}

log_info()  { log "INFO" "$@"; }
log_warn()  { log "WARN" "$@"; }
log_error() { log "ERROR" "$@" >&2; }

log_info "脚本开始执行"
log_error "连接数据库失败"`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "set -euo pipefail 中 -o pipefail 的作用是什么？", options: ["启用调试", "管道中任一命令失败即整体失败", "启用别名", "设置输出格式"], answer: 1, explanation: "pipefail 让管道返回最后一个失败命令的退出码。" },
      ],
    },
    "bash-examples": {
      slug: "bash-examples",
      sections: [
        {
          title: "自动备份脚本",
          content: `一个完整的备份脚本示例，包含日志、错误处理、日期归档等功能。`,
          code: `#!/bin/bash
set -euo pipefail

BACKUP_DIR="/backup"
SOURCE_DIR="/data"
DATE=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/backup.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

log "开始备份..."
mkdir -p "$BACKUP_DIR"

if tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" -C "$SOURCE_DIR" .; then
    log "备份成功"
else
    log "备份失败!"
    exit 1
fi

# 清理旧备份
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete
log "备份完成"`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "备份脚本中 tar -czf 的各参数含义是什么？", options: ["-c 创建, -z gzip, -f 文件", "-c 压缩, -z 打包, -f 格式", "-c 检查, -z 压缩, -f 过滤", "-c 复制, -z 加密, -f 过滤"], answer: 0, explanation: "-c 创建新归档，-z 使用 gzip 压缩，-f 指定文件名。" },
      ],
    },
    "bash-best-practices": {
      slug: "bash-best-practices",
      sections: [
        {
          title: "代码风格与安全",
          content: `编写清晰、可维护的 Bash 脚本需要遵循一定的代码风格规范。`,
          code: `#!/bin/bash
# 脚本描述
# 用法：./script.sh [options] <args>

set -euo pipefail

# 常量定义（全大写）
readonly SCRIPT_NAME=$(basename "$0")

# 函数定义（小写和下划线）
usage() {
    cat << EOF
用法: $SCRIPT_NAME [选项] <参数>
EOF
}

# 始终引用变量
rm -rf "$DIR/"

# 验证输入
validate_input() {
    local input="$1"
    if [[ ! "$input" =~ ^[a-zA-Z0-9_]+$ ]]; then
        echo "无效输入" >&2
        exit 1
    fi
}`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "为什么要在 Bash 中引用变量？", options: ["让代码更美观", "防止空格和通配符导致的意外行为", "提高性能", "语法要求"], answer: 1, explanation: "引用变量可以防止变量值中的空格导致参数分割。" },
      ],
    },
  },
  javascript: {
    "js-basics": {
      slug: "js-basics",
      sections: [
        {
          title: "变量声明",
          content: `JavaScript 有三种变量声明方式：var、let 和 const。let 和 const 是块作用域，推荐始终使用 const，需要修改时使用 let。`,
          code: `// const - 常量（推荐默认使用）
const API_URL = "https://api.example.com";

// let - 可变变量
let count = 0;
count = count + 1;

// 解构赋值
const [a, b, ...rest] = [1, 2, 3, 4, 5];
console.log(a, b, rest);  // 1 2 [3, 4, 5]

const { name, age } = { name: "Alice", age: 25 };`,
          language: "javascript",
        },
        {
          title: "函数",
          content: `JavaScript 支持多种函数定义方式。箭头函数是 ES6 引入的简洁语法，没有自己的 this 绑定。`,
          code: `// 函数声明
function greet(name) {
    return "Hello, " + name + "!";
}

// 箭头函数（推荐）
const add = (a, b) => a + b;
const double = x => x * 2;

// 默认参数
function createUser(name, role = "user") {
    return { name, role };
}

// 剩余参数
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

// 数组方法
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const total = numbers.reduce((sum, n) => sum + n, 0);`,
          language: "javascript",
        },
        {
          title: "对象与数组",
          content: `对象是键值对的集合，数组是有序的元素列表。两者都支持现代的简写语法和操作方法。`,
          code: `// 对象简写
const name = "Alice";
const age = 25;
const user = { name, age };

// 对象展开
const defaults = { theme: "dark", lang: "zh" };
const config = { ...defaults, theme: "light" };

// 数组方法链式调用
const result = [1, 2, 3, 4, 5]
    .filter(x => x % 2 === 0)
    .map(x => x * 10);`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "let 和 const 的区别是什么？", options: ["没有区别", "let 可重新赋值，const 不可", "const 更快", "let 是全局作用域"], answer: 1, explanation: "const 声明的变量不能重新赋值，let 声明的变量可以。" },
        { question: "箭头函数和普通函数的区别是什么？", options: ["没有区别", "箭头函数没有自己的 this", "箭头函数更快", "箭头函数不能有参数"], answer: 1, explanation: "箭头函数没有自己的 this 绑定，会继承外层的 this。" },
      ],
    },
    "js-dom": {
      slug: "js-dom",
      sections: [
        {
          title: "DOM 选择器",
          content: `DOM（Document Object Model）是 HTML 文档的编程接口。querySelector 和 querySelectorAll 是强大的选择方法。`,
          code: `// querySelector - 返回第一个匹配元素
const header = document.querySelector("h1");
const btn = document.querySelector(".btn-primary");

// querySelectorAll - 返回所有匹配元素
const items = document.querySelectorAll(".list-item");
items.forEach(item => console.log(item.textContent));

// 获取和设置属性
const link = document.querySelector("a");
console.log(link.href);
link.setAttribute("target", "_blank");
link.dataset.id = "123";  // data-id="123"`,
          language: "javascript",
        },
        {
          title: "事件处理",
          content: `addEventListener 是添加事件监听器的标准方式。事件对象包含事件的详细信息。`,
          code: `// 添加事件监听
const button = document.querySelector("#submit");
button.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("按钮被点击");
});

// 事件委托
const list = document.querySelector("#list");
list.addEventListener("click", (e) => {
    if (e.target.matches(".list-item")) {
        console.log("点击了:", e.target.textContent);
    }
});

// 键盘事件
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitForm();
    }
});`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "querySelector 和 getElementById 的区别是什么？", options: ["没有区别", "querySelector 支持 CSS 选择器，getElementById 只按 ID 查找", "querySelector 更快", "getElementById 已废弃"], answer: 1, explanation: "querySelector 使用 CSS 选择器语法，更灵活。" },
      ],
    },
    "js-async": {
      slug: "js-async",
      sections: [
        {
          title: "Promise",
          content: `Promise 是异步编程的解决方案，代表一个尚未完成但预期将来会完成的操作。有三种状态：pending、fulfilled、rejected。`,
          code: `// 创建 Promise
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ id: 1, name: "Alice" });
    }, 1000);
});

// 使用 Promise
fetchData
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Promise.all - 全部成功才成功
const results = await Promise.all([
    fetch("/api/users"),
    fetch("/api/posts"),
]);`,
          language: "javascript",
        },
        {
          title: "async/await",
          content: `async/await 是 Promise 的语法糖，让异步代码看起来像同步代码。async 函数自动返回 Promise。`,
          code: `// async 函数
async function getUser(id) {
    const response = await fetch("/api/users/" + id);
    const user = await response.json();
    return user;
}

// 使用
try {
    const user = await getUser(1);
    console.log(user);
} catch (error) {
    console.error("获取用户失败:", error);
}

// 并发执行
async function loadDashboard() {
    const [users, posts] = await Promise.all([
        fetchUsers(),
        fetchPosts(),
    ]);
    return { users, posts };
}`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "Promise 的三种状态是什么？", options: ["start, running, done", "pending, fulfilled, rejected", "open, closed, error", "init, process, complete"], answer: 1, explanation: "Promise 有 pending、fulfilled、rejected 三种状态。" },
      ],
    },
    "js-es6": {
      slug: "js-es6",
      sections: [
        {
          title: "解构与展开",
          content: `解构赋值让你从数组或对象中提取值到变量。展开运算符用于展开数组或对象。`,
          code: `// 数组解构
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// 对象解构
const { name, age, city = "未知" } = { name: "Alice", age: 25 };

// 展开运算符
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };`,
          language: "javascript",
        },
        {
          title: "可选链与空值合并",
          content: `可选链（?.）在属性不存在时返回 undefined。空值合并（??）在值为 null/undefined 时使用默认值。`,
          code: `// 可选链
const user = { profile: { name: "Alice" } };
const city = user?.address?.city;  // undefined

// 空值合并
const value = null ?? "默认值";  // "默认值"
const value2 = 0 ?? "默认值";    // 0

// 模板字符串
const name = "Alice";
const greeting = "Hello, " + name + "!";

// 模块系统
export const PI = 3.14159;
import Calculator from "./math.js";`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "展开运算符 ... 的作用是什么？", options: ["删除元素", "展开数组或对象", "创建数组", "压缩数据"], answer: 1, explanation: "展开运算符可以将数组展开为独立元素，或将对象展开为键值对。" },
      ],
    },
    "js-errors": {
      slug: "js-errors",
      sections: [
        {
          title: "错误类型与处理",
          content: `JavaScript 有多种内置错误类型：TypeError、ReferenceError、SyntaxError 等。使用 try/catch/finally 处理错误。`,
          code: `// 常见错误类型
// TypeError - 类型错误
const obj = null;
// console.log(obj.prop);  // TypeError

// try/catch/finally
try {
    const data = JSON.parse(invalidJSON);
} catch (error) {
    console.error("解析错误:", error.message);
} finally {
    console.log("无论是否出错都会执行");
}

// 异步错误处理
async function fetchData() {
    try {
        const response = await fetch("/api/data");
        return await response.json();
    } catch (error) {
        console.error("请求失败:", error);
        return null;
    }
}`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "TypeError 和 ReferenceError 的区别是什么？", options: ["没有区别", "TypeError 是类型错误，ReferenceError 是引用不存在的变量", "TypeError 更严重", "ReferenceError 只在严格模式下出现"], answer: 1, explanation: "TypeError 在操作类型不正确时抛出，ReferenceError 在引用未定义的变量时抛出。" },
      ],
    },
    "nodejs-basics": {
      slug: "nodejs-basics",
      sections: [
        {
          title: "Node.js 简介",
          content: `Node.js 是基于 Chrome V8 引擎的 JavaScript 运行时，让 JavaScript 可以在服务器端运行。采用事件驱动、非阻塞 I/O 模型。`,
          code: `# 验证安装
node --version
npm --version

# 运行 JS 文件
node script.js

# 交互式 REPL
node
> console.log("Hello from Node.js")
> .exit`,
          language: "bash",
        },
        {
          title: "模块系统",
          content: `Node.js 支持 CommonJS（require）和 ES Module（import）两种模块系统。推荐使用 ES Module。`,
          code: `// CommonJS（旧方式）
const fs = require("fs");
module.exports = { myFunction };

// ES Module（推荐）
import fs from "fs/promises";
export function myFunction() {}

// 内置模块
import http from "http";
import path from "path";
import crypto from "crypto";`,
          language: "javascript",
        },
        {
          title: "npm 包管理",
          content: `npm 是 Node.js 的包管理器。package.json 是项目的核心配置文件。`,
          code: `# 初始化项目
npm init -y

# 安装依赖
npm install express
npm install --save-dev jest

# 脚本命令
npm run dev
npm test

# package.json 示例
# {
#   "scripts": {
#     "dev": "node --watch server.js",
#     "start": "node server.js",
#     "test": "jest"
#   }
# }`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "Node.js 的主要优势是什么？", options: ["图形处理", "事件驱动、非阻塞 I/O，适合高并发", "数据库管理", "桌面应用开发"], answer: 1, explanation: "Node.js 使用事件驱动和非阻塞 I/O 模型，特别适合构建高并发的网络服务。" },
      ],
    },
    "nodejs-express": {
      slug: "nodejs-express",
      sections: [
        {
          title: "Express 基础",
          content: `Express 是 Node.js 最流行的 Web 框架，提供了路由、中间件、模板引擎等核心功能。`,
          code: `import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());
app.use(express.static("public"));

// 路由
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    res.json({ userId: id });
});

app.post("/users", (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({ name, email });
});

app.listen(PORT, () => {
    console.log("服务器运行在 http://localhost:" + PORT);
});`,
          language: "javascript",
        },
        {
          title: "中间件",
          content: `中间件是处理请求的函数链。每个中间件可以执行操作、修改请求/响应、调用 next()。`,
          code: `// 日志中间件
function logger(req, res, next) {
    console.log(req.method + " " + req.url);
    next();
}

app.use(logger);

// 权限中间件
function auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "未授权" });
    }
    req.user = verifyToken(token);
    next();
}

// 错误处理中间件（4 个参数）
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "服务器错误" });
});`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "Express 中 next() 的作用是什么？", options: ["结束响应", "调用下一个中间件", "发送数据", "关闭连接"], answer: 1, explanation: "next() 将控制权传递给下一个匹配的中间件函数。" },
      ],
    },
    "nodejs-rest-api": {
      slug: "nodejs-rest-api",
      sections: [
        {
          title: "RESTful 设计",
          content: `REST 使用 HTTP 方法操作资源。资源使用名词表示，操作使用动词（HTTP 方法）表示。`,
          code: `// 资源设计
// GET    /api/users          - 获取用户列表
// GET    /api/users/:id      - 获取单个用户
// POST   /api/users          - 创建用户
// PUT    /api/users/:id      - 更新用户
// DELETE /api/users/:id      - 删除用户

// 状态码
// 200 OK
// 201 Created
// 204 No Content
// 400 Bad Request
// 401 Unauthorized
// 404 Not Found`,
          language: "javascript",
        },
        {
          title: "实现示例",
          content: `一个完整的 REST API 示例，包含 CRUD 操作和数据验证。`,
          code: `let users = [];
let nextId = 1;

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.post("/api/users", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "姓名和邮箱必填" });
    }
    const user = { id: nextId++, name, email };
    users.push(user);
    res.status(201).json(user);
});

app.delete("/api/users/:id", (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: "用户不存在" });
    }
    users.splice(index, 1);
    res.status(204).send();
});`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "PUT 和 PATCH 的区别是什么？", options: ["没有区别", "PUT 替换整个资源，PATCH 只更新部分字段", "PUT 更安全", "PATCH 更快"], answer: 1, explanation: "PUT 用于全量更新，PATCH 用于部分更新。" },
      ],
    },
    "nodejs-auth": {
      slug: "nodejs-auth",
      sections: [
        {
          title: "JWT 认证",
          content: `JWT（JSON Web Token）是目前最流行的认证方案。服务器生成 token 发给客户端，客户端在后续请求中携带 token。`,
          code: `import jwt from "jsonwebtoken";

const SECRET = "your-secret-key";

// 生成 token
function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: "7d" }
    );
}

// 验证 token 中间件
function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "未提供 token" });
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "token 无效" });
    }
}`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "JWT 的三部分是什么？", options: ["用户名、密码、时间戳", "Header、Payload、Signature", "请求、响应、状态码", "加密、解密、验证"], answer: 1, explanation: "JWT 由 Header、Payload、Signature 三部分组成。" },
      ],
    },
    "nodejs-websocket": {
      slug: "nodejs-websocket",
      sections: [
        {
          title: "WebSocket 基础",
          content: `WebSocket 提供全双工通信，适合实时应用如聊天、游戏、实时数据推送。`,
          code: `import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("新客户端连接");

    ws.on("message", (data) => {
        const message = data.toString();
        // 广播给所有客户端
        wss.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log("客户端断开");
    });

    ws.send("欢迎连接 WebSocket 服务器!");
});`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "WebSocket 相比 HTTP 轮询的优势是什么？", options: ["更安全", "延迟更低，支持全双工通信", "实现更简单", "兼容性更好"], answer: 1, explanation: "WebSocket 建立持久连接，支持双向实时通信，延迟更低。" },
      ],
    },
    "nodejs-file-system": {
      slug: "nodejs-file-system",
      sections: [
        {
          title: "fs 模块",
          content: `Node.js 的 fs 模块提供文件系统操作。推荐使用 fs/promises 的异步 API。`,
          code: `import fs from "fs/promises";

// 读取文件
const content = await fs.readFile("file.txt", "utf-8");

// 写入文件
await fs.writeFile("output.txt", "Hello World");

// 文件信息
const stats = await fs.stat("file.txt");
console.log(stats.size);

// 目录操作
await fs.mkdir("new-dir", { recursive: true });
const files = await fs.readdir(".");`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "为什么推荐使用 fs/promises 而不是 fs？", options: ["更快", "支持 async/await，代码更清晰", "更安全", "更多功能"], answer: 1, explanation: "fs/promises 返回 Promise，可以使用 async/await 语法。" },
      ],
    },
    "nodejs-testing": {
      slug: "nodejs-testing",
      sections: [
        {
          title: "Jest 基础",
          content: `Jest 是 Facebook 开发的 JavaScript 测试框架，内置断言库、Mock、覆盖率报告等功能。`,
          code: `// math.test.js
import { add, divide } from "./math.js";

describe("数学函数", () => {
    test("add 正常相加", () => {
        expect(add(2, 3)).toBe(5);
    });

    test("divide 除以零抛出错误", () => {
        expect(() => divide(10, 0)).toThrow("除数不能为零");
    });
});

// 运行测试
// npx jest
// npx jest --watch`,
          language: "javascript",
        },
        {
          title: "Mock 与异步测试",
          content: `Mock 用于模拟依赖，隔离被测试代码。Jest 提供了强大的 Mock 功能。`,
          code: `// Mock 函数
const mockFn = jest.fn();
mockFn("hello");
expect(mockFn).toHaveBeenCalledWith("hello");

// Mock 返回值
const mockFetch = jest.fn();
mockFetch.mockResolvedValue({ data: "test" });

// 异步测试
test("异步操作", async () => {
    const result = await asyncOperation();
    expect(result).toBeTruthy();
});`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "Jest 中 describe 和 test 的作用是什么？", options: ["没有区别", "describe 分组测试用例，test 定义单个测试", "describe 用于异步测试", "test 用于 Mock"], answer: 1, explanation: "describe 用于组织测试用例，test 定义单个测试。" },
      ],
    },
  },
  network: {
    "tcp-ip": {
      slug: "tcp-ip",
      sections: [
        {
          title: "TCP 三次握手",
          content: `TCP 连接建立过程（三次握手）：

1. SYN：客户端发送 SYN=1, seq=x
2. SYN-ACK：服务器回复 SYN=1, ACK=1, seq=y, ack=x+1
3. ACK：客户端发送 ACK=1, seq=x+1, ack=y+1`,
          code: `# 使用 tcpdump 抓包观察三次握手
sudo tcpdump -i eth0 port 80 -nn

# 使用 ss 查看连接状态
ss -tn state established`,
          language: "bash",
        },
        {
          title: "TCP 四次挥手",
          content: `TCP 连接断开过程（四次挥手）：

1. FIN：主动方发送 FIN=1, seq=u
2. ACK：被动方回复 ACK=1, ack=u+1
3. FIN：被动方发送 FIN=1, seq=w
4. ACK：主动方回复 ACK=1, ack=w+1`,
        },
        {
          title: "TCP 状态机",
          content: `TCP 连接的 11 种状态：
- LISTEN：监听
- SYN_SENT：已发送 SYN
- SYN_RCVD：已收到 SYN
- ESTABLISHED：已建立连接
- FIN_WAIT_1：已发送 FIN
- FIN_WAIT_2：已收到 ACK
- TIME_WAIT：等待确保对方收到
- CLOSE_WAIT：被动关闭
- LAST_ACK：最后确认
- CLOSING：双方同时关闭
- CLOSED：已关闭`,
        },
      ],
      quiz: [
        { question: "TCP 三次握手中第二步服务器回复什么？", options: ["SYN", "ACK", "SYN-ACK", "FIN"], answer: 2, explanation: "第二步服务器回复 SYN-ACK，同时确认客户端的 SYN 并发送自己的 SYN。" },
      ],
    },
  },
  redis: {
    "redis-basics": {
      slug: "redis-basics",
      sections: [
        {
          title: "Redis 简介",
          content: `Redis（Remote Dictionary Server）是一个开源的内存数据结构存储系统，可用作数据库、缓存和消息中间件。

Redis 的特点：
- 极高的性能（10万+ QPS）
- 丰富的数据结构
- 支持持久化
- 支持主从复制和集群
- 原子操作`,
        },
        {
          title: "安装与基本操作",
          content: "",
          code: `# 安装
sudo apt-get install redis-server

# 启动
redis-server

# 连接
redis-cli

# 基本操作
PING                    # PONG
SET name "Alice"        # 设置键值
GET name                # "Alice"
DEL name                # 删除键
EXISTS name             # 是否存在
EXPIRE name 30          # 设置过期时间（秒）
TTL name                # 查看剩余时间`,
          language: "bash",
        },
        {
          title: "数据类型",
          content: "",
          code: `# String
SET counter 0
INCR counter            # 1
INCRBY counter 10       # 11

# Hash
HSET user:1 name "Alice" age 25
HGET user:1 name
HGETALL user:1

# List
LPUSH queue "task1" "task2"
RPOP queue              # "task1"
LRANGE queue 0 -1       # 所有元素

# Set
SADD tags "python" "redis" "docker"
SMEMBERS tags
SISMEMBER tags "python"  # 1

# Sorted Set
ZADD leaderboard 100 "player1" 200 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "Redis 默认端口号是？", options: ["3306", "5432", "6379", "8080"], answer: 2, explanation: "Redis 默认监听 6379 端口。" },
      ],
    },
  },
  // ============ Frontend ============
  frontend: {
    "html-basics": {
      slug: "html-basics",
      sections: [
        {
          title: "HTML 文档结构",
          content: `HTML（HyperText Markup Language）是构建网页的标准语言。每个 HTML 文档都遵循基本的结构框架。

一个标准的 HTML5 文档包含以下基本元素：

- DOCTYPE 声明：告诉浏览器使用 HTML5 标准
- html 根元素：包含整个页面内容
- head 头部：包含元数据、标题、样式引用
- body 主体：包含页面可见内容`,
          code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个网页</title>
</head>
<body>
    <h1>欢迎来到 HTML 世界</h1>
    <p>这是一个段落元素。</p>
</body>
</html>`,
          language: "html",
        },
        {
          title: "常用 HTML 标签",
          content: `HTML 标签是构建网页内容的基本单元。常用标签分为以下几类：

标题标签：h1 到 h6，h1 最大，h6 最小。
段落标签：p 用于包裹文本段落。
链接标签：a 用于创建超链接，href 属性指定目标地址。
图片标签：img 用于插入图片，src 指定图片路径，alt 提供替代文本。
列表标签：ul（无序列表）、ol（有序列表）、li（列表项）。
容器标签：div 用于分组块级内容，span 用于行内内容。`,
          code: `<h1>一级标题</h1>
<h2>二级标题</h2>

<p>这是一个<strong>加粗</strong>和<em>斜体</em>的段落。</p>

<a href="https://example.com" target="_blank">访问示例网站</a>

<img src="photo.jpg" alt="风景照片" width="600">

<ul>
    <li>苹果</li>
    <li>香蕉</li>
    <li>橘子</li>
</ul>

<ol>
    <li>第一步：安装</li>
    <li>第二步：配置</li>
    <li>第三步：运行</li>
</ol>`,
          language: "html",
          tip: "使用语义化标签（header、nav、main、article、footer）可以提高网页的可访问性和 SEO 友好性。",
        },
        {
          title: "表格与表单",
          content: `表格和表单是 HTML 中重要的交互元素。

表格用于展示结构化数据，由 table、tr（行）、th（表头）、td（数据单元格）组成。

表单用于收集用户输入，常用元素包括 input、textarea、select、button。input 的 type 属性决定了输入类型（text、password、email、number 等）。`,
          code: `<table border="1">
    <thead>
        <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>城市</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>25</td>
            <td>北京</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>30</td>
            <td>上海</td>
        </tr>
    </tbody>
</table>

<form action="/submit" method="POST">
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username" required>

    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email" required>

    <label for="role">角色：</label>
    <select id="role" name="role">
        <option value="user">普通用户</option>
        <option value="admin">管理员</option>
    </select>

    <button type="submit">提交</button>
</form>`,
          language: "html",
        },
      ],
      quiz: [
        { question: "HTML5 的 DOCTYPE 声明是什么？", options: ["<!DOCTYPE HTML PUBLIC>", "<!DOCTYPE html>", "<DOCTYPE HTML>", "<html DOCTYPE>"], answer: 1, explanation: "HTML5 的 DOCTYPE 声明非常简洁，只需 <!DOCTYPE html>。" },
        { question: "哪个标签用于创建超链接？", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1, explanation: "a 标签（anchor）用于创建超链接，href 属性指定链接目标。" },
        { question: "img 标签的 alt 属性有什么作用？", options: ["设置图片大小", "指定图片路径", "提供图片替代文本", "设置图片边框"], answer: 2, explanation: "alt 属性在图片无法显示时提供替代文本，也有助于屏幕阅读器理解图片内容。" },
      ],
    },
    "css-basics": {
      slug: "css-basics",
      sections: [
        {
          title: "CSS 选择器",
          content: `CSS 选择器用于选择要样式的 HTML 元素。常用选择器类型包括：

元素选择器：直接使用标签名，如 p、h1。
类选择器：使用点号加类名，如 .container。
ID 选择器：使用井号加 ID，如 #header。
后代选择器：空格分隔，选择嵌套元素。
子元素选择器：使用 > 号，只选择直接子元素。
伪类选择器：如 :hover、:focus、:nth-child()。`,
          code: `/* 元素选择器 */
p {
    color: #333;
    line-height: 1.6;
}

/* 类选择器 */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* ID 选择器 */
#header {
    background: #1a1a1a;
    color: white;
}

/* 后代选择器 */
.nav a {
    text-decoration: none;
    color: inherit;
}

/* 伪类 */
.button:hover {
    background: #0066cc;
    transform: translateY(-1px);
}

input:focus {
    outline: 2px solid #0066cc;
}`,
          language: "css",
        },
        {
          title: "盒模型",
          content: `CSS 盒模型是理解布局的基础。每个 HTML 元素都被看作一个矩形盒子，由以下部分组成：

content：实际内容区域，由 width 和 height 控制。
padding：内边距，内容与边框之间的间距。
border：边框，包围 padding 的线条。
margin：外边距，元素与其他元素之间的间距。

box-sizing: border-box 可以让 width/height 包含 padding 和 border，使布局计算更直观。`,
          code: `/* 默认盒模型 */
.box {
    width: 200px;
    padding: 20px;
    border: 2px solid #333;
    margin: 10px;
    /* 实际占用宽度：200 + 20*2 + 2*2 = 244px */
}

/* border-box 盒模型（推荐） */
.box-border {
    box-sizing: border-box;
    width: 200px;
    padding: 20px;
    border: 2px solid #333;
    margin: 10px;
    /* 实际占用宽度：200px（包含 padding 和 border） */
}

/* 全局设置 border-box */
* {
    box-sizing: border-box;
}`,
          language: "css",
          tip: "在项目开头使用 * { box-sizing: border-box; } 可以避免很多布局问题。",
        },
      ],
      quiz: [
        { question: "类选择器使用什么符号前缀？", options: ["#", ".", "!", "@"], answer: 1, explanation: "类选择器使用点号（.）作为前缀，如 .my-class。" },
        { question: "box-sizing: border-box 的作用是什么？", options: ["添加边框", "width/height 包含 padding 和 border", "移除边框", "设置外边距"], answer: 1, explanation: "border-box 让元素的 width/height 包含 padding 和 border，使布局计算更直观。" },
      ],
    },
    "react-basics": {
      slug: "react-basics",
      sections: [
        {
          title: "React 组件基础",
          content: `React 是 Facebook 开发的用于构建用户界面的 JavaScript 库。React 的核心思想是将 UI 拆分为独立的、可复用的组件。

组件是 React 的基本构建块。每个组件都可以接收数据（props）并返回描述 UI 的 JSX。组件名必须以大写字母开头。

JSX 是 JavaScript 的语法扩展，允许在 JS 中编写类似 HTML 的标记。JSX 最终会被编译为 React.createElement() 调用。`,
          code: `// 函数组件（推荐）
function Welcome({ name }) {
    return (
        <div className="welcome">
            <h1>你好，{name}！</h1>
            <p>欢迎使用 React</p>
        </div>
    );
}

// 使用组件
function App() {
    return (
        <div>
            <Welcome name="张三" />
            <Welcome name="李四" />
        </div>
    );
}

export default App;`,
          language: "jsx",
        },
        {
          title: "Props 与 State",
          content: `Props（属性）是组件之间传递数据的方式。Props 是只读的，组件不能修改自己的 Props。

State（状态）是组件内部管理的数据。当 State 改变时，组件会重新渲染。使用 useState Hook 管理函数组件的 State。

useState 返回一个数组：当前状态值和更新函数。调用更新函数会触发组件重新渲染。`,
          code: `import { useState } from 'react';

function Counter() {
    // 声明状态，初始值为 0
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>当前计数：{count}</p>
            <button onClick={() => setCount(count + 1)}>
                加 1
            </button>
            <button onClick={() => setCount(count - 1)}>
                减 1
            </button>
            <button onClick={() => setCount(0)}>
                重置
            </button>
        </div>
    );
}`,
          language: "jsx",
          tip: "State 更新是异步的。如果新状态依赖旧状态，应使用函数式更新：setCount(prev => prev + 1)。",
        },
      ],
      quiz: [
        { question: "React 组件名必须以什么开头？", options: ["小写字母", "大写字母", "下划线", "美元符号"], answer: 1, explanation: "React 约定组件名必须以大写字母开头，以便区分组件和普通 HTML 标签。" },
        { question: "useState 返回什么？", options: ["一个对象", "一个值", "一个数组", "一个函数"], answer: 2, explanation: "useState 返回一个数组，包含当前状态值和更新状态的函数。" },
      ],
    },
    "vue-basics": {
      slug: "vue-basics",
      sections: [
        {
          title: "Vue.js 模板语法",
          content: `Vue.js 是一个渐进式 JavaScript 框架，核心思想是数据驱动视图。

模板语法使用双大括号进行数据绑定（插值表达式）。v-bind 指令用于绑定 HTML 属性。v-on 指令用于绑定事件。

Vue 实例通过 data 函数返回响应式数据对象。当数据改变时，视图自动更新。`,
          code: `<div id="app">
    <!-- 文本插值 -->
    <h1>{{ message }}</h1>

    <!-- 绑定属性 -->
    <a v-bind:href="url">链接</a>
    <img :src="imageUrl" :alt="imageAlt">

    <!-- 事件绑定 -->
    <button v-on:click="handleClick">点击</button>
    <button @click="handleClick">简写形式</button>

    <!-- 双向绑定 -->
    <input v-model="inputValue">
    <p>输入内容：{{ inputValue }}</p>
</div>

<script>
const app = Vue.createApp({
    data() {
        return {
            message: 'Hello Vue!',
            url: 'https://vuejs.org',
            imageUrl: 'logo.png',
            imageAlt: 'Vue Logo',
            inputValue: ''
        };
    },
    methods: {
        handleClick() {
            alert('按钮被点击了！');
        }
    }
});

app.mount('#app');
</script>`,
          language: "html",
        },
      ],
      quiz: [
        { question: "Vue 中 v-model 的作用是什么？", options: ["绑定事件", "双向数据绑定", "条件渲染", "列表渲染"], answer: 1, explanation: "v-model 实现表单元素与 Vue 数据的双向绑定。" },
      ],
    },
  },
  // ============ Backend ============
  backend: {
    "go-basics": {
      slug: "go-basics",
      sections: [
        {
          title: "Go 语言基础",
          content: `Go（Golang）是 Google 开发的静态类型编译语言，以简洁、高效和并发支持著称。

Go 的特点：
- 静态类型，编译型语言
- 内置并发支持（goroutine 和 channel）
- 垃圾回收
- 强大的标准库
- 快速编译`,
          code: `package main

import "fmt"

// 函数定义
func greet(name string) string {
    return "你好，" + name + "！"
}

// 多返回值
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("除数不能为零")
    }
    return a / b, nil
}

func main() {
    fmt.Println(greet("Go 开发者"))

    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("错误:", err)
    } else {
        fmt.Printf("结果: %.2f\\n", result)
    }
}`,
          language: "go",
        },
        {
          title: "Goroutine 并发",
          content: `Goroutine 是 Go 的轻量级线程，由 Go 运行时管理。创建 goroutine 只需在函数调用前加 go 关键字。

Channel 是 goroutine 之间通信的管道。使用 <- 操作符发送和接收数据。带缓冲的 channel 可以在满之前非阻塞地发送数据。`,
          code: `package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("工人 %d 开始处理任务 %d\\n", id, j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 5)
    results := make(chan int, 5)

    // 启动 3 个工人
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // 发送任务
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    // 收集结果
    for r := 1; r <= 5; r++ {
        fmt.Println("结果:", <-results)
    }
}`,
          language: "go",
          tip: "Goroutine 非常轻量，初始栈只有几 KB，可以轻松创建成千上万个 goroutine。",
        },
      ],
      quiz: [
        { question: "如何在 Go 中创建 goroutine？", options: ["thread.Start()", "go 关键字", "async 关键字", "spawn 关键字"], answer: 1, explanation: "在 Go 中，使用 go 关键字加函数调用即可创建 goroutine。" },
      ],
    },
    "rust-ownership": {
      slug: "rust-ownership",
      sections: [
        {
          title: "所有权系统",
          content: `Rust 的所有权系统是其内存安全的核心机制，无需垃圾回收即可保证内存安全。

所有权规则：
- 每个值都有一个所有者（owner）
- 同一时刻只能有一个所有者
- 当所有者离开作用域时，值被自动释放

移动（Move）：将值从一个变量赋给另一个变量时，所有权转移，原变量不再可用。
克隆（Clone）：使用 .clone() 方法可以深拷贝数据，两个变量都拥有独立的数据。`,
          code: `fn main() {
    // 所有权转移
    let s1 = String::from("hello");
    let s2 = s1;  // s1 的所有权移动到 s2
    // println!("{}", s1);  // 编译错误！s1 已失效
    println!("{}", s2);  // 正常

    // 克隆
    let s3 = String::from("world");
    let s4 = s3.clone();  // 深拷贝
    println!("s3 = {}, s4 = {}", s3, s4);  // 两个都有效

    // 函数也会转移所有权
    let s5 = String::from("rust");
    let s6 = takes_ownership(s5);
    // s5 已失效
    println!("s6 = {}", s6);
}

fn takes_ownership(s: String) -> String {
    println!("获得了: {}", s);
    s  // 返回所有权
}`,
          language: "rust",
        },
        {
          title: "借用与引用",
          content: `借用（Borrowing）允许你使用值但不获取所有权。通过引用（&）来借用。

借用规则：
- 可以有任意多个不可变引用（&T）
- 或者只能有一个可变引用（&mut T）
- 不能同时存在可变引用和不可变引用

这些规则在编译时检查，确保数据竞争不会发生。`,
          code: `fn main() {
    let mut s = String::from("hello");

    // 不可变借用
    let r1 = &s;
    let r2 = &s;
    println!("r1 = {}, r2 = {}", r1, r2);
    // r1 和 r2 在此之后不再使用

    // 可变借用
    let r3 = &mut s;
    r3.push_str(", world");
    println!("r3 = {}", r3);
}

// 计算字符串长度，借用但不获取所有权
fn calculate_length(s: &String) -> usize {
    s.len()
}

// 修改借用的值
fn add_world(s: &mut String) {
    s.push_str(", world");
}`,
          language: "rust",
          tip: "Rust 的所有权系统在编译时检查内存安全，零运行时开销。",
        },
      ],
      quiz: [
        { question: "Rust 所有权规则是什么？", options: ["可以有多个所有者", "每个值只能有一个所有者", "所有值都是全局的", "手动管理内存"], answer: 1, explanation: "Rust 的核心规则是每个值在同一时刻只能有一个所有者。" },
      ],
    },
    "php-basics": {
      slug: "php-basics",
      sections: [
        {
          title: "PHP 简介与环境搭建",
          content: `PHP（Hypertext Preprocessor）是一种广泛使用的开源服务器端脚本语言，特别适合 Web 开发。

PHP 的特点：
- 语法简单，学习曲线平缓
- 内置大量 Web 开发函数
- 支持多种数据库（MySQL、PostgreSQL、SQLite）
- 跨平台运行
- 丰富的生态系统（Composer、Laravel、Symfony）`,
          code: `<?php
// PHP 基础语法
$name = "张三";
$age = 25;
$is_student = true;

// 输出
echo "姓名: " . $name . "<br>";
echo "年龄: $age<br>";

// 数组
$fruits = ["苹果", "香蕉", "橘子"];
echo count($fruits) . " 个水果<br>";

// 关联数组
$user = [
    "name" => "李四",
    "age" => 30,
    "email" => "lisi@example.com"
];
echo $user["name"];
?>`,
          language: "php",
        },
        {
          title: "变量与数据类型",
          content: `PHP 是弱类型语言，变量不需要声明类型。

PHP 支持的数据类型：
- 标量类型：int、float、string、bool
- 复合类型：array、object
- 特殊类型：null、resource

变量命名规则：
- 以 $ 开头
- 只能包含字母、数字、下划线
- 不能以数字开头`,
          code: `<?php
// 变量
$integer = 42;
$float = 3.14;
$string = "Hello";
$boolean = true;
$null = null;

// 类型检查
echo gettype($integer);    // integer
echo is_int($integer);     // 1 (true)
echo is_string($string);   // 1 (true)

// 数组操作
$numbers = [1, 2, 3, 4, 5];
$numbers[] = 6;            // 添加元素
echo array_pop($numbers);  // 弹出最后一个
echo array_push($numbers, 7); // 添加到末尾

// 二维数组
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
echo $matrix[1][2]; // 6
?>`,
          language: "php",
        },
        {
          title: "函数与流程控制",
          content: `PHP 支持函数定义、条件语句和循环语句。

函数特点：
- 使用 function 关键字定义
- 支持默认参数和可变参数
- 支持引用传递
- 支持返回多个值（使用 list() 解构）`,
          code: `<?php
// 函数定义
function greet($name, $greeting = "你好") {
    return "$greeting, $name!";
}

echo greet("张三");           // 你好, 张三!
echo greet("李四", "早上好"); // 早上好, 李四!

// 引用传递
function swap(&$a, &$b) {
    $temp = $a;
    $a = $b;
    $b = $temp;
}

$x = 10;
$y = 20;
swap($x, $y);
echo "$x, $y"; // 20, 10

// 条件语句
$score = 85;
if ($score >= 90) {
    echo "优秀";
} elseif ($score >= 80) {
    echo "良好";
} elseif ($score >= 60) {
    echo "及格";
} else {
    echo "不及格";
}

// 循环
for ($i = 0; $i < 5; $i++) {
    echo $i . " ";
}

$colors = ["红", "绿", "蓝"];
foreach ($colors as $index => $color) {
    echo "$index: $color ";
}

// 匿名函数
$multiply = function($a, $b) {
    return $a * $b;
};
echo $multiply(3, 4); // 12
?>`,
          language: "php",
        },
        {
          title: "字符串与正则",
          content: `PHP 提供了丰富的字符串处理函数和正则表达式支持。

常用字符串函数：
- strlen()：获取长度
- strpos()：查找位置
- substr()：截取子串
- str_replace()：替换
- explode()：分割字符串
- implode()：合并数组为字符串`,
          code: `<?php
// 字符串函数
$str = "Hello, World!";
echo strlen($str);            // 13
echo strpos($str, "World");  // 7
echo substr($str, 7, 5);    // World
echo str_replace("World", "PHP", $str); // Hello, PHP!

// 分割与合并
$csv = "张三,李四,王五";
$names = explode(",", $csv);
echo $names[0]; // 张三

$joined = implode(" | ", $names);
echo $joined; // 张三 | 李四 | 王五

// 正则表达式
$email = "user@example.com";
$pattern = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/";
if (preg_match($pattern, $email)) {
    echo "邮箱格式正确";
}

// 提取所有数字
$text = "我有3个苹果和5个橘子";
preg_match_all("/\\d+/", $text, $matches);
print_r($matches[0]); // [3, 5]
?>`,
          language: "php",
        },
      ],
      quiz: [
        { question: "PHP 中 $ 符号的作用是什么？", options: ["声明变量", "调用函数", "输出内容", "定义数组"], answer: 0, explanation: "在 PHP 中，$ 符号用于声明和引用变量。" },
        { question: "PHP 中 array_push() 函数的作用是？", options: ["删除数组元素", "在数组末尾添加元素", "合并数组", "反转数组"], answer: 1, explanation: "array_push() 将一个或多个元素添加到数组末尾。" },
        { question: "PHP 中 preg_match() 函数的作用是？", options: ["执行正则匹配", "替换字符串", "分割字符串", "合并字符串"], answer: 0, explanation: "preg_match() 用于执行正则表达式匹配。" },
      ],
    },
    "java-basics": {
      slug: "java-basics",
      sections: [
        {
          title: "Java 基础语法",
          content: `Java 是一种面向对象的编程语言，以"一次编写，到处运行"著称。

Java 的特点：
- 强类型静态语言
- 面向对象
- 自动垃圾回收
- 跨平台（JVM）
- 丰富的标准库`,
          code: `public class HelloWorld {
    public static void main(String[] args) {
        // 变量声明
        int age = 25;
        double price = 9.99;
        String name = "张三";
        boolean isActive = true;

        // 字符串操作
        String greeting = "你好, " + name + "!";
        System.out.println(greeting);
        System.out.println("长度: " + name.length());
        System.out.println("大写: " + name.toUpperCase());

        // 数组
        int[] numbers = {1, 2, 3, 4, 5};
        for (int num : numbers) {
            System.out.print(num + " ");
        }

        // 条件语句
        if (age >= 18) {
            System.out.println("成年人");
        } else {
            System.out.println("未成年人");
        }

        // 循环
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " ");
        }
    }
}`,
          language: "java",
        },
        {
          title: "面向对象编程",
          content: `Java 是纯面向对象语言，所有代码都必须在类中。

类和对象：
- 类是对象的模板
- 对象是类的实例
- 字段（属性）描述对象的状态
- 方法描述对象的行为

三大特性：
- 封装：隐藏内部实现
- 继承：子类继承父类
- 多态：同一接口不同实现`,
          code: `// 定义类
class Animal {
    private String name;
    private int age;

    // 构造方法
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getter 和 Setter
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    // 方法
    public void speak() {
        System.out.println(name + " 发出声音");
    }

    @Override
    public String toString() {
        return "Animal{name='" + name + "', age=" + age + "}";
    }
}

// 继承
class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);
        this.breed = breed;
    }

    @Override
    public void speak() {
        System.out.println(getName() + ": 汪汪！");
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("旺财", 3, "金毛");
        dog.speak(); // 旺财: 汪汪！
        System.out.println(dog);
    }
}`,
          language: "java",
        },
        {
          title: "异常处理",
          content: `Java 使用 try-catch-finally 机制处理异常。

异常分类：
- Checked Exception：编译时检查（IOException、SQLException）
- Unchecked Exception：运行时异常（NullPointerException、ArrayIndexOutOfBoundsException）
- Error：系统错误（OutOfMemoryError）`,
          code: `// 基本异常处理
public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("结果: " + result);
        } catch (ArithmeticException e) {
            System.out.println("算术错误: " + e.getMessage());
        } finally {
            System.out.println("始终执行");
        }

        // 多重 catch
        try {
            String str = null;
            str.length(); // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("空指针异常");
        } catch (Exception e) {
            System.out.println("其他异常");
        }

        // 自定义异常
        try {
            validateAge(-5);
        } catch (InvalidAgeException e) {
            System.out.println(e.getMessage());
        }
    }

    static int divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("除数不能为零");
        }
        return a / b;
    }

    static void validateAge(int age) throws InvalidAgeException {
        if (age < 0 || age > 150) {
            throw new InvalidAgeException("年龄无效: " + age);
        }
    }
}

// 自定义异常
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}`,
          language: "java",
        },
        {
          title: "集合框架",
          content: `Java 集合框架提供了数据结构的统一接口。

主要接口：
- Collection：存储一组对象
- List：有序可重复（ArrayList、LinkedList）
- Set：无序不可重复（HashSet、TreeSet）
- Map：键值对（HashMap、TreeMap）`,
          code: `import java.util.*;

public class CollectionDemo {
    public static void main(String[] args) {
        // ArrayList
        List<String> names = new ArrayList<>();
        names.add("张三");
        names.add("李四");
        names.add("王五");
        names.remove("李四");
        System.out.println(names); // [张三, 王五]

        // HashSet
        Set<Integer> numbers = new HashSet<>();
        numbers.add(1);
        numbers.add(2);
        numbers.add(2); // 重复，不会添加
        System.out.println(numbers); // [1, 2]

        // HashMap
        Map<String, Integer> scores = new HashMap<>();
        scores.put("张三", 95);
        scores.put("李四", 88);
        System.out.println(scores.get("张三")); // 95

        // 遍历
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        // Stream API
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        List<Integer> evens = nums.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        System.out.println(evens); // [2, 4, 6, 8, 10]
    }
}`,
          language: "java",
        },
      ],
      quiz: [
        { question: "Java 中 checked exception 和 unchecked exception 的区别是？", options: ["没有区别", "checked 必须处理，unchecked 可以不处理", "unchecked 更严重", "checked 是运行时异常"], answer: 1, explanation: "Checked exception 在编译时检查，必须用 try-catch 或 throws 处理；unchecked exception 是运行时异常，可以不处理。" },
        { question: "ArrayList 和 LinkedList 的主要区别是？", options: ["没有区别", "ArrayList 随机访问快，LinkedList 插入删除快", "LinkedList 更小", "ArrayList 线程安全"], answer: 1, explanation: "ArrayList 基于数组，随机访问 O(1)；LinkedList 基于链表，插入删除 O(1) 但随机访问 O(n)。" },
      ],
    },
    "csharp-basics": {
      slug: "csharp-basics",
      sections: [
        {
          title: "C# 基础语法",
          content: `C# 是微软开发的面向对象编程语言，是 .NET 平台的主要语言。

C# 的特点：
- 现代化的面向对象语言
- 强类型静态语言
- 支持 LINQ 查询
- 异步编程（async/await）
- 与 .NET 生态深度集成`,
          code: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        // 变量声明
        int age = 25;
        double price = 9.99;
        string name = "张三";
        bool isActive = true;

        // 字符串插值
        Console.WriteLine("姓名: " + name + ", 年龄: " + age);

        // 集合
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
        numbers.Add(6);
        numbers.RemoveAt(0);

        // 字典
        Dictionary<string, int> scores = new Dictionary<string, int> {
            { "张三", 95 },
            { "李四", 88 }
        };

        // 条件和循环
        if (age >= 18) {
            Console.WriteLine("成年人");
        }

        foreach (var num in numbers) {
            Console.Write(num + " ");
        }
    }
}`,
          language: "csharp",
        },
        {
          title: "LINQ 查询",
          content: `LINQ（Language Integrated Query）是 C# 的强大特性，提供统一的查询语法。

LINQ 的优势：
- 编译时类型检查
- 智能感知支持
- 统一的数据访问方式
- 支持多种数据源（数组、集合、数据库、XML）`,
          code: `using System;
using System.Linq;
using System.Collections.Generic;

class LinqDemo {
    static void Main() {
        List<int> numbers = new List<int> { 5, 3, 8, 1, 9, 2, 7, 4, 6 };

        // 查询语法
        var evens = from n in numbers
                    where n % 2 == 0
                    orderby n
                    select n;

        Console.WriteLine("偶数: " + string.Join(", ", evens));

        // 方法语法（Lambda）
        var result = numbers
            .Where(n => n > 3)
            .OrderByDescending(n => n)
            .Select(n => n * 2);

        Console.WriteLine("结果: " + string.Join(", ", result));

        // 聚合
        Console.WriteLine("总和: " + numbers.Sum());
        Console.WriteLine("平均: " + numbers.Average());
        Console.WriteLine("最大: " + numbers.Max());
        Console.WriteLine("计数: " + numbers.Count());

        // 分组
        var grouped = numbers.GroupBy(n => n % 2 == 0 ? "偶数" : "奇数");
        foreach (var group in grouped) {
            Console.WriteLine(group.Key + ": " + string.Join(", ", group));
        }
    }
}`,
          language: "csharp",
        },
        {
          title: "异步编程",
          content: `C# 使用 async/await 关键字实现异步编程，使异步代码像同步代码一样易读。

异步编程的核心概念：
- async 关键字标记异步方法
- await 等待异步操作完成
- Task 表示异步操作
- 避免阻塞主线程`,
          code: `using System;
using System.Net.Http;
using System.Threading.Tasks;

class AsyncDemo {
    static async Task Main() {
        Console.WriteLine("开始...");

        // 异步方法调用
        string result = await GetDataAsync();
        Console.WriteLine("数据: " + result);

        // 并行执行多个异步任务
        Task<string> task1 = FetchUrlAsync("https://api.example.com/data1");
        Task<string> task2 = FetchUrlAsync("https://api.example.com/data2");

        string[] results = await Task.WhenAll(task1, task2);
        Console.WriteLine("获取了 " + results.Length + " 个结果");
    }

    static async Task<string> GetDataAsync() {
        using (HttpClient client = new HttpClient()) {
            // await 会暂停方法执行，但不阻塞线程
            string data = await client.GetStringAsync("https://api.example.com");
            return data;
        }
    }

    static async Task<string> FetchUrlAsync(string url) {
        using (HttpClient client = new HttpClient()) {
            return await client.GetStringAsync(url);
        }
    }
}`,
          language: "csharp",
        },
        {
          title: "类与接口",
          content: `C# 支持完整的面向对象特性，包括类、接口、抽象类等。

接口定义契约，类实现接口。C# 接口可以包含默认实现（C# 8.0+）。

属性（Properties）简化了字段的封装。`,
          code: `// 接口
interface IShape {
    double Area { get; }
    double Perimeter { get; }
    void Draw();
}

// 抽象类
abstract class Shape : IShape {
    public string Name { get; set; }
    public abstract double Area { get; }
    public abstract double Perimeter { get; }
    public virtual void Draw() {
        Console.WriteLine("绘制 " + Name);
    }
}

// 具体类
class Circle : Shape {
    public double Radius { get; set; }

    public override double Area => Math.PI * Radius * Radius;
    public override double Perimeter => 2 * Math.PI * Radius;

    public override void Draw() {
        Console.WriteLine("绘制圆形，半径: " + Radius);
    }
}

class Rectangle : Shape {
    public double Width { get; set; }
    public double Height { get; set; }

    public override double Area => Width * Height;
    public override double Perimeter => 2 * (Width + Height);
}

// 使用
var circle = new Circle { Name = "圆", Radius = 5 };
circle.Draw();
Console.WriteLine("面积: " + circle.Area);`,
          language: "csharp",
        },
      ],
      quiz: [
        { question: "C# 中 LINQ 的作用是什么？", options: ["图形渲染", "统一的数据查询语法", "网络通信", "文件操作"], answer: 1, explanation: "LINQ 提供统一的查询语法，可以查询数组、集合、数据库等多种数据源。" },
        { question: "C# 中 async 关键字的作用是什么？", options: ["定义同步方法", "定义异步方法", "创建线程", "定义接口"], answer: 1, explanation: "async 关键字标记方法为异步方法，可以使用 await 关键字等待异步操作。" },
      ],
    },
    "nodejs-advanced": {
      slug: "nodejs-advanced",
      sections: [
        {
          title: "事件循环机制",
          content: `Node.js 的核心是事件驱动的非阻塞 I/O 模型，通过事件循环实现。

事件循环的阶段：
- timers：执行 setTimeout、setInterval 回调
- pending callbacks：执行系统操作的回调
- idle, prepare：内部使用
- poll：获取新的 I/O 事件
- check：执行 setImmediate 回调
- close callbacks：执行关闭事件的回调`,
          code: `// 事件循环演示
const fs = require('fs');

console.log('1. 同步代码');

setTimeout(() => {
    console.log('2. setTimeout 回调');
}, 0);

setImmediate(() => {
    console.log('3. setImmediate 回调');
});

fs.readFile(__filename, () => {
    console.log('4. I/O 回调');
});

Promise.resolve().then(() => {
    console.log('5. Promise 回调');
});

process.nextTick(() => {
    console.log('6. nextTick 回调');
});

console.log('7. 同步代码结束');

// 输出顺序：
// 1, 7, 6, 5, 2或3, 4
// nextTick 优先于 Promise
// setTimeout 和 setImmediate 顺序不确定`,
          language: "javascript",
        },
        {
          title: "Stream 流",
          content: `Stream 是处理流式数据的抽象接口，适合处理大文件和实时数据。

四种流类型：
- Readable：可读流（fs.createReadStream）
- Writable：可写流（fs.createWriteStream）
- Duplex：双工流（TCP Socket）
- Transform：转换流（zlib）`,
          code: `const fs = require('fs');
const { Transform } = require('stream');

// 读取流
const readStream = fs.createReadStream('large-file.txt', {
    encoding: 'utf8',
    highWaterMark: 1024  // 缓冲区大小
});

// 写入流
const writeStream = fs.createWriteStream('output.txt');

// 管道流
readStream.pipe(writeStream);

// 转换流
class UpperCaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}

const upperStream = new UpperCaseTransform();
process.stdin.pipe(upperStream).pipe(process.stdout);

// 处理流事件
readStream.on('data', (chunk) => {
    console.log('收到 ' + chunk.length + ' 字节');
});

readStream.on('end', () => {
    console.log('读取完成');
});

readStream.on('error', (err) => {
    console.error('错误:', err);
});`,
          language: "javascript",
        },
        {
          title: "Cluster 集群",
          content: `Cluster 模块允许创建子进程共享服务器端口，充分利用多核 CPU。

工作原理：
- 主进程（master）创建工作进程（worker）
- 工作进程共享服务器端口
- 使用 round-robin 算法分配请求
- 工作进程崩溃时自动重启`,
          code: `const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
    console.log('主进程 ' + process.pid + ' 运行');

    // Fork 工作进程
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // 监听工作进程退出
    cluster.on('exit', (worker, code, signal) => {
        console.log('工作进程 ' + worker.process.pid + ' 退出');
        // 自动重启
        cluster.fork();
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('来自工作进程 ' + process.pid + '\\n');
    }).listen(8000);

    console.log('工作进程 ' + process.pid + ' 启动');
}`,
          language: "javascript",
        },
        {
          title: "Worker Threads",
          content: `Worker Threads 提供真正的多线程能力，可以执行 CPU 密集型任务。

与 Cluster 的区别：
- Worker Threads 共享内存（SharedArrayBuffer）
- 适合 CPU 密集型计算
- 可以在主线程和工作线程间传递数据`,
          code: `const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    // 主线程
    const worker = new Worker(__filename, {
        workerData: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    });

    worker.on('message', (result) => {
        console.log('计算结果:', result);
    });

    worker.on('error', (err) => {
        console.error('错误:', err);
    });
} else {
    // 工作线程
    const { numbers } = workerData;
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    const average = sum / numbers.length;

    // 发送结果回主线程
    parentPort.postMessage({ sum, average });
}`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "Node.js 事件循环中 nextTick 和 Promise 的执行顺序是？", options: ["Promise 优先", "nextTick 优先", "同时执行", "随机顺序"], answer: 1, explanation: "nextTick 回调会在 Promise 回调之后、事件循环的下一个阶段之前执行。" },
        { question: "Stream 流的主要优势是什么？", options: ["代码更简洁", "处理大文件时内存效率高", "执行更快", "更安全"], answer: 1, explanation: "Stream 流可以分块处理数据，不需要将整个文件加载到内存中。" },
        { question: "Cluster 和 Worker Threads 的主要区别是？", options: ["没有区别", "Cluster 共享端口，Worker Threads 共享内存", "Worker Threads 更快", "Cluster 更简单"], answer: 1, explanation: "Cluster 用于创建多个进程共享服务器端口，Worker Threads 提供真正的多线程和内存共享。" },
      ],
    },
    "express-middleware": {
      slug: "express-middleware",
      sections: [
        {
          title: "中间件原理",
          content: `Express 中间件是处理 HTTP 请求的核心概念。中间件函数可以访问请求对象、响应对象和下一个中间件函数。

中间件的执行流程：
- 请求进入 -> 中间件1 -> 中间件2 -> ... -> 路由处理 -> 响应
- 每个中间件必须调用 next() 才能继续执行
- 如果不调用 next()，请求将被"挂起"`,
          code: `const express = require('express');
const app = express();

// 基础中间件
app.use((req, res, next) => {
    console.log('[' + new Date().toISOString() + '] ' + req.method + ' ' + req.url);
    next(); // 必须调用 next() 才能继续
});

// 路径匹配中间件
app.use('/api', (req, res, next) => {
    console.log('API 路由被访问');
    next();
});

// 路由
app.get('/', (req, res) => {
    res.send('首页');
});

app.get('/api/users', (req, res) => {
    res.json([{ name: '张三' }, { name: '李四' }]);
});

app.listen(3000);`,
          language: "javascript",
        },
        {
          title: "中间件类型",
          content: `Express 支持多种中间件类型：

应用级中间件：使用 app.use() 或 app.METHOD()
路由级中间件：使用 router.use() 或 router.METHOD()
错误处理中间件：有四个参数 (err, req, res, next)
内置中间件：express.json()、express.static()
第三方中间件：cors、helmet、morgan`,
          code: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// 应用级中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// 路由级中间件
const router = express.Router();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: '未授权' });
    }
    req.user = { id: 1, name: '张三' };
    next();
};

router.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user);
});

app.use('/api', router);

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器错误' });
});

app.listen(3000);`,
          language: "javascript",
        },
        {
          title: "自定义中间件",
          content: `创建自定义中间件可以封装通用逻辑，提高代码复用性。

中间件模式：
- 日志记录
- 认证验证
- 请求限流
- 数据验证
- 缓存处理`,
          code: `const express = require('express');
const app = express();

// 日志中间件
const logger = (options = {}) => {
    const { format = ':method :url :status :response-time ms' } = options;
    return (req, res, next) => {
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(req.method + ' ' + req.url + ' ' + res.statusCode + ' ' + duration + 'ms');
        });
        next();
    };
};

// 请求限流中间件
const rateLimit = (windowMs = 60000, max = 100) => {
    const requests = new Map();

    return (req, res, next) => {
        const ip = req.ip;
        const now = Date.now();

        if (!requests.has(ip)) {
            requests.set(ip, []);
        }

        const timestamps = requests.get(ip).filter(t => t > now - windowMs);
        timestamps.push(now);
        requests.set(ip, timestamps);

        if (timestamps.length > max) {
            return res.status(429).json({ error: '请求过于频繁' });
        }

        res.set('X-RateLimit-Remaining', max - timestamps.length);
        next();
    };
};

// 使用自定义中间件
app.use(logger());
app.use(rateLimit(60000, 100));

app.post('/api/users', (req, res) => {
    res.json({ success: true });
});

app.listen(3000);`,
          language: "javascript",
        },
        {
          title: "中间件最佳实践",
          content: `编写高质量中间件的关键原则：

- 保持单一职责：每个中间件只做一件事
- 正确处理错误：调用 next(err) 传递错误
- 避免阻塞：不要在中间件中执行同步阻塞操作
- 合理使用 next()：确保每个中间件都调用 next()`,
          code: `const express = require('express');
const app = express();

// 错误处理最佳实践
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// 使用 asyncHandler 包装异步路由
app.get('/api/users/:id', asyncHandler(async (req, res) => {
    const user = await db.users.findById(req.params.id);
    if (!user) {
        const error = new Error('用户不存在');
        error.status = 404;
        throw error;
    }
    res.json(user);
}));

// 统一错误处理
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || '服务器错误';

    console.error('[Error] ' + status + ': ' + message);

    res.status(status).json({
        error: {
            message,
            status
        }
    });
});

app.listen(3000);`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "Express 中间件中 next() 函数的作用是什么？", options: ["结束请求", "调用下一个中间件", "发送响应", "记录日志"], answer: 1, explanation: "next() 函数用于将控制权传递给下一个中间件函数。如果不调用 next()，请求将被挂起。" },
        { question: "错误处理中间件有几个参数？", options: ["2个", "3个", "4个", "5个"], answer: 2, explanation: "错误处理中间件有4个参数：(err, req, res, next)，这是 Express 识别错误处理中间件的特殊签名。" },
      ],
    },
    "restful-api": {
      slug: "restful-api",
      sections: [
        {
          title: "REST 基本原则",
          content: `REST（Representational State Transfer）是一种软件架构风格，用于设计网络应用的 API。

REST 的核心原则：
- 客户端-服务器架构
- 无状态：每个请求包含所有必要信息
- 可缓存：响应可以标记为可缓存或不可缓存
- 统一接口：使用标准的 HTTP 方法和状态码
- 分层系统：客户端不需要知道是否直接连接到服务器`,
          code: `// RESTful API 设计示例

// 获取资源列表
GET /api/users
GET /api/users?page=1&limit=10

// 获取单个资源
GET /api/users/123

// 创建资源
POST /api/users
Content-Type: application/json
{
    "name": "张三",
    "email": "zhangsan@example.com"
}

// 更新资源（完整替换）
PUT /api/users/123
Content-Type: application/json
{
    "name": "张三",
    "email": "new@example.com"
}

// 部分更新
PATCH /api/users/123
Content-Type: application/json
{
    "email": "new@example.com"
}

// 删除资源
DELETE /api/users/123`,
          language: "http",
        },
        {
          title: "HTTP 状态码",
          content: `正确的 HTTP 状态码对于 API 设计至关重要。

成功响应：
- 200 OK：请求成功
- 201 Created：资源创建成功
- 204 No Content：删除成功，无返回内容

客户端错误：
- 400 Bad Request：请求格式错误
- 401 Unauthorized：未认证
- 403 Forbidden：已认证但无权限
- 404 Not Found：资源不存在
- 409 Conflict：资源冲突（如重复创建）
- 422 Unprocessable Entity：数据验证失败

服务器错误：
- 500 Internal Server Error：服务器内部错误
- 502 Bad Gateway：网关错误
- 503 Service Unavailable：服务不可用`,
          code: `const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;

    // 400 - 请求格式错误
    if (!name || !email) {
        return res.status(400).json({
            error: '缺少必填字段'
        });
    }

    // 201 - 创建成功
    const user = { id: 1, name, email };
    res.status(201).json(user);
});

app.get('/api/users/:id', (req, res) => {
    const user = findUser(req.params.id);

    if (!user) {
        // 404 - 资源不存在
        return res.status(404).json({
            error: '用户不存在'
        });
    }

    // 200 - 成功
    res.json(user);
});

app.listen(3000);`,
          language: "javascript",
        },
        {
          title: "API 版本控制",
          content: `API 版本控制允许你在不破坏现有客户端的情况下引入新功能。

版本控制策略：
- URL 路径版本：/api/v1/users（最常用）
- 请求头版本：Accept: application/vnd.api.v1+json
- 查询参数版本：/api/users?version=1`,
          code: `const express = require('express');
const app = express();

// URL 路径版本控制
const v1Router = express.Router();
const v2Router = express.Router();

// v1 版本
v1Router.get('/users', (req, res) => {
    res.json({
        version: 'v1',
        users: [
            { id: 1, name: '张三' }
        ]
    });
});

// v2 版本（添加了新字段）
v2Router.get('/users', (req, res) => {
    res.json({
        version: 'v2',
        users: [
            { id: 1, name: '张三', avatar: '/avatars/1.png' }
        ],
        pagination: {
            page: 1,
            limit: 10,
            total: 100
        }
    });
});

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

app.listen(3000);`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "RESTful API 中 PUT 和 PATCH 的区别是什么？", options: ["没有区别", "PUT 完整替换，PATCH 部分更新", "PUT 更快", "PATCH 更安全"], answer: 1, explanation: "PUT 用于完整替换资源，需要发送所有字段；PATCH 用于部分更新，只发送需要修改的字段。" },
        { question: "创建资源成功应该返回什么状态码？", options: ["200", "201", "204", "202"], answer: 1, explanation: "201 Created 表示资源创建成功，通常在 POST 请求成功时返回。" },
      ],
    },
    "graphql-basics": {
      slug: "graphql-basics",
      sections: [
        {
          title: "GraphQL 简介",
          content: `GraphQL 是 Facebook 开发的 API 查询语言，允许客户端精确请求所需数据。

GraphQL vs REST：
- REST：多个端点，固定数据结构
- GraphQL：单个端点，客户端定义数据结构
- 避免过度获取和不足获取
- 强类型系统`,
          code: `// GraphQL Schema 定义
type Query {
    user(id: ID!): User
    users(page: Int, limit: Int): [User!]!
}

type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
}

type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
}

type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String, email: String): User!
    deleteUser(id: ID!): Boolean!
}`,
          language: "graphql",
        },
        {
          title: "Resolver 实现",
          content: `Resolver 是 GraphQL 中处理查询的函数，负责从数据源获取数据。

Resolver 的四个参数：
- parent：父级 resolver 的返回值
- args：查询参数
- context：共享上下文（如数据库连接、认证信息）
- info：查询信息`,
          code: `const { ApolloServer, gql } = require('apollo-server');

// 类型定义
const typeDefs = gql\`
    type Query {
        user(id: ID!): User
        users: [User!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        author: User!
    }

    type Mutation {
        createUser(name: String!, email: String!): User!
    }
\`;

// 模拟数据
const users = [
    { id: '1', name: '张三', email: 'zhangsan@example.com' },
    { id: '2', name: '李四', email: 'lisi@example.com' }
];

const posts = [
    { id: '1', title: 'GraphQL 入门', authorId: '1' },
    { id: '2', title: 'Apollo Server', authorId: '1' }
];

// Resolver
const resolvers = {
    Query: {
        user: (_, { id }) => users.find(u => u.id === id),
        users: () => users
    },
    User: {
        posts: (parent) => posts.filter(p => p.authorId === parent.id)
    },
    Post: {
        author: (parent) => users.find(u => u.id === parent.authorId)
    },
    Mutation: {
        createUser: (_, { name, email }) => {
            const newUser = {
                id: String(users.length + 1),
                name,
                email
            };
            users.push(newUser);
            return newUser;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log('Server ready at ' + url);
});`,
          language: "javascript",
        },
        {
          title: "查询与变量",
          content: `GraphQL 查询语法灵活，支持嵌套查询和变量。

查询类型：
- Query：查询数据
- Mutation：修改数据
- Subscription：实时数据推送

变量用于参数化查询，避免注入攻击。`,
          code: `// 基本查询
query {
    user(id: "1") {
        name
        email
        posts {
            title
        }
    }
}

// 使用变量
query GetUser($id: ID!) {
    user(id: $id) {
        name
        email
    }
}

// 变量 JSON
{
    "id": "1"
}

// 分页查询
query GetUsers($page: Int, $limit: Int) {
    users(page: $page, limit: $limit) {
        id
        name
        email
    }
}

// Mutation
mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
        id
        name
        email
    }
}

// 变量
{
    "name": "王五",
    "email": "wangwu@example.com"
}`,
          language: "graphql",
        },
        {
          title: "错误处理与性能优化",
          content: `GraphQL 的错误处理和性能优化与 REST API 有所不同。

错误处理：
- 部分成功：部分字段出错时仍返回其他字段
- 错误扩展：添加自定义错误信息

性能优化：
- DataLoader：批量加载关联数据，避免 N+1 问题
- 查询复杂度分析：防止恶意查询
- 持久化查询：缓存查询结果`,
          code: `const DataLoader = require('dataloader');

// DataLoader 解决 N+1 问题
const userLoader = new DataLoader(async (ids) => {
    const users = await db.users.findByIds(ids);
    return ids.map(id => users.find(u => u.id === id));
});

const resolvers = {
    Post: {
        author: (parent) => userLoader.load(parent.authorId)
    }
};

// 错误处理
const resolversWithErrorHandling = {
    Mutation: {
        createUser: async (_, { name, email }) => {
            try {
                // 验证
                if (!email.includes('@')) {
                    return {
                        success: false,
                        errors: [{ field: 'email', message: '邮箱格式无效' }]
                    };
                }

                const user = await db.users.create({ name, email });
                return { success: true, user };
            } catch (error) {
                return {
                    success: false,
                    errors: [{ message: error.message }]
                };
            }
        }
    }
};`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "GraphQL 相比 REST API 的主要优势是什么？", options: ["更简单", "客户端可以精确请求所需数据", "更安全", "更快"], answer: 1, explanation: "GraphQL 允许客户端定义查询的具体字段，避免了 REST API 中的过度获取和不足获取问题。" },
        { question: "Resolver 的作用是什么？", options: ["定义 Schema", "处理查询并返回数据", "验证输入", "缓存结果"], answer: 1, explanation: "Resolver 是处理 GraphQL 查询的函数，负责从数据源获取数据并返回给客户端。" },
      ],
    },
    "grpc-intro": {
      slug: "grpc-intro",
      sections: [
        {
          title: "gRPC 简介",
          content: `gRPC 是 Google 开发的高性能 RPC 框架，使用 Protocol Buffers 作为接口定义语言。

gRPC 的特点：
- 基于 HTTP/2 协议
- 使用 Protocol Buffers 序列化（二进制格式，效率高）
- 支持四种通信模式：Unary、Server Streaming、Client Streaming、Bidirectional Streaming
- 自动生成多语言客户端代码
- 内置认证、负载均衡、追踪`,
          code: `// Proto 文件定义 (user.proto)
syntax = "proto3";

package user;

service UserService {
    rpc GetUser (GetUserRequest) returns (User);
    rpc ListUsers (ListUsersRequest) returns (stream User);
    rpc CreateUser (CreateUserRequest) returns (User);
}

message GetUserRequest {
    string id = 1;
}

message ListUsersRequest {
    int32 page = 1;
    int32 limit = 2;
}

message CreateUserRequest {
    string name = 1;
    string email = 2;
}

message User {
    string id = 1;
    string name = 2;
    string email = 3;
    int64 created_at = 4;
}`,
          language: "protobuf",
        },
        {
          title: "服务端实现",
          content: `gRPC 服务端实现需要继承生成的基类并实现 RPC 方法。

Node.js gRPC 实现步骤：
1. 安装依赖：grpc-tools、@grpc/grpc-js
2. 从 proto 文件生成代码
3. 实现服务方法
4. 启动服务器`,
          code: `const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// 加载 proto 文件
const packageDef = protoLoader.loadSync('user.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const proto = grpc.loadPackageDefinition(packageDef).user;

// 实现服务方法
const users = new Map();
let nextId = 1;

const getUser = (call, callback) => {
    const user = users.get(call.request.id);
    if (!user) {
        return callback({
            code: grpc.status.NOT_FOUND,
            message: '用户不存在'
        });
    }
    callback(null, user);
};

const listUsers = (call) => {
    const { page = 1, limit = 10 } = call.request;
    const allUsers = Array.from(users.values());
    const start = (page - 1) * limit;
    const pageUsers = allUsers.slice(start, start + limit);

    pageUsers.forEach(user => call.write(user));
    call.end();
};

const createUser = (call, callback) => {
    const user = {
        id: String(nextId++),
        name: call.request.name,
        email: call.request.email,
        created_at: Date.now()
    };
    users.set(user.id, user);
    callback(null, user);
};

// 启动服务器
const server = new grpc.Server();
server.addService(proto.UserService.service, {
    getUser,
    listUsers,
    createUser
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC 服务器运行在 0.0.0.0:50051');
});`,
          language: "javascript",
        },
        {
          title: "客户端调用",
          content: `gRPC 客户端可以使用多种通信模式调用服务。

通信模式：
- Unary RPC：一问一答
- Server Streaming：客户端发送一个请求，服务端返回流
- Client Streaming：客户端发送流，服务端返回一个响应
- Bidirectional Streaming：双向流`,
          code: `const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('user.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const proto = grpc.loadPackageDefinition(packageDef).user;

// 创建客户端
const client = new proto.UserService(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

// Unary RPC
client.getUser({ id: '1' }, (err, user) => {
    if (err) {
        console.error('错误:', err.message);
        return;
    }
    console.log('用户:', user);
});

// Server Streaming
const stream = client.listUsers({ page: 1, limit: 10 });
stream.on('data', (user) => {
    console.log('收到用户:', user);
});
stream.on('end', () => {
    console.log('流结束');
});
stream.on('error', (err) => {
    console.error('流错误:', err);
});

// Promise 风格调用
const getUserAsync = (id) => {
    return new Promise((resolve, reject) => {
        client.getUser({ id }, (err, user) => {
            if (err) reject(err);
            else resolve(user);
        });
    });
};

// 使用 async/await
async function main() {
    try {
        const user = await getUserAsync('1');
        console.log(user);
    } catch (err) {
        console.error(err);
    }
}`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "gRPC 使用什么协议传输数据？", options: ["HTTP/1.1", "HTTP/2", "WebSocket", "TCP"], answer: 1, explanation: "gRPC 基于 HTTP/2 协议，支持多路复用、头部压缩等特性。" },
        { question: "Protocol Buffers 的主要优势是什么？", options: ["可读性好", "二进制格式，序列化效率高", "支持所有语言", "无需定义"], answer: 1, explanation: "Protocol Buffers 使用二进制格式，比 JSON 体积小、序列化/反序列化速度快。" },
      ],
    },
    "websockets-intro": {
      slug: "websockets-intro",
      sections: [
        {
          title: "WebSocket 简介",
          content: `WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议，适用于实时应用。

WebSocket vs HTTP：
- HTTP：请求-响应模式，单向通信
- WebSocket：全双工通信，服务器可以主动推送
- 建立连接后保持长连接
- 适合实时聊天、在线游戏、实时数据推送`,
          code: `// 客户端 WebSocket
const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
    console.log('连接已建立');
    socket.send('你好服务器');
};

socket.onmessage = (event) => {
    console.log('收到消息:', event.data);
};

socket.onclose = () => {
    console.log('连接关闭');
};

socket.onerror = (error) => {
    console.error('错误:', error);
};

// 服务器端（Node.js）
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('新客户端连接');

    ws.on('message', (message) => {
        console.log('收到:', message);
        // 广播给所有客户端
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('客户端断开');
    });
});`,
          language: "javascript",
        },
        {
          title: "Socket.IO",
          content: `Socket.IO 是 WebSocket 的封装库，提供了更多功能和更好的兼容性。

Socket.IO 的特点：
- 自动降级：优先使用 WebSocket，不支持时降级到轮询
- 房间（Room）：支持广播到特定房间
- 命名空间：逻辑分组
- 重连机制：自动重连
- 二进制支持`,
          code: `// 服务器端
const io = require('socket.io')(3000, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('用户连接:', socket.id);

    // 加入房间
    socket.join('general');
    socket.join('user:' + socket.id);

    // 监听消息
    socket.on('chat message', (msg) => {
        // 广播到所有客户端
        io.emit('chat message', msg);
    });

    // 监听私聊
    socket.on('private message', ({ to, message }) => {
        io.to('user:' + to).emit('private message', {
            from: socket.id,
            message
        });
    });

    // 广播到房间
    socket.on('room message', ({ room, message }) => {
        io.to(room).emit('room message', {
            from: socket.id,
            message
        });
    });

    socket.on('disconnect', () => {
        console.log('用户断开:', socket.id);
    });
});

// 客户端
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('已连接');
});

socket.emit('chat message', '大家好！');

socket.on('chat message', (msg) => {
    console.log('收到消息:', msg);
});`,
          language: "javascript",
        },
        {
          title: "实时应用场景",
          content: `WebSocket 广泛应用于需要实时通信的场景。

常见应用场景：
- 实时聊天应用
- 多人在线游戏
- 实时数据仪表盘
- 协同编辑（如 Google Docs）
- 实时通知推送
- 股票行情推送
- 物联网设备通信`,
          code: `// 实时聊天应用示例
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 用户管理
const users = new Map();

io.on('connection', (socket) => {
    console.log('用户连接');

    // 用户加入
    socket.on('user join', (username) => {
        users.set(socket.id, { username, joinedAt: new Date() });
        io.emit('user list', Array.from(users.values()));
        socket.broadcast.emit('system message', username + ' 加入了聊天');
    });

    // 发送消息
    socket.on('chat message', (msg) => {
        const user = users.get(socket.id);
        io.emit('chat message', {
            username: user.username,
            message: msg,
            time: new Date().toLocaleTimeString()
        });
    });

    // 断开连接
    socket.on('disconnect', () => {
        const user = users.get(socket.id);
        if (user) {
            users.delete(socket.id);
            io.emit('user list', Array.from(users.values()));
            io.emit('system message', user.username + ' 离开了聊天');
        }
    });
});

server.listen(3000);`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "WebSocket 和 HTTP 的主要区别是什么？", options: ["没有区别", "WebSocket 全双工，HTTP 单向", "WebSocket 更安全", "HTTP 更快"], answer: 1, explanation: "WebSocket 支持全双工通信，服务器可以主动推送；HTTP 是请求-响应模式，单向通信。" },
        { question: "Socket.IO 相比原生 WebSocket 的优势是什么？", options: ["更快", "自动降级和重连", "更安全", "更简单"], answer: 1, explanation: "Socket.IO 提供自动降级（WebSocket -> 轮询）、自动重连、房间、命名空间等高级功能。" },
      ],
    },
  },
  // ============ AI ============
  ai: {
    "ai-intro": {
      slug: "ai-intro",
      sections: [
        {
          title: "人工智能概述",
          content: `人工智能（Artificial Intelligence）是计算机科学的一个分支，致力于创建能够模拟人类智能的系统。

AI 的主要分支：
- 机器学习（Machine Learning）：从数据中学习模式
- 深度学习（Deep Learning）：使用神经网络的机器学习
- 自然语言处理（NLP）：理解和生成人类语言
- 计算机视觉（Computer Vision）：理解和分析图像
- 强化学习（Reinforcement Learning）：通过试错学习策略`,
        },
        {
          title: "AI 应用领域",
          content: `AI 已经深入到各个行业和日常生活中：

科技领域：搜索引擎、推荐系统、语音助手（Siri、Alexa）。
医疗领域：医学影像诊断、药物研发、基因组分析。
金融领域：风险评估、欺诈检测、量化交易。
交通领域：自动驾驶、交通优化、路径规划。
制造业：质量检测、预测性维护、供应链优化。
教育领域：个性化学习、智能辅导、自动评分。`,
        },
      ],
      quiz: [
        { question: "机器学习的核心思想是什么？", options: ["手动编写规则", "从数据中学习模式", "使用固定算法", "人工输入所有知识"], answer: 1, explanation: "机器学习的核心是让计算机从数据中自动发现模式和规律，而不是手动编写规则。" },
      ],
    },
    "machine-learning-basics": {
      slug: "machine-learning-basics",
      sections: [
        {
          title: "监督学习",
          content: `监督学习是最常见的机器学习类型。训练数据包含输入特征和对应的标签（目标值）。

主要任务：
- 分类（Classification）：预测离散类别，如垃圾邮件检测、图像分类
- 回归（Regression）：预测连续数值，如房价预测、气温预测

常用算法：
- 线性回归（Linear Regression）
- 逻辑回归（Logistic Regression）
- 决策树（Decision Tree）
- 随机森林（Random Forest）
- 支持向量机（SVM）
- K 近邻（KNN）`,
          code: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.datasets import load_iris

# 加载数据
data = load_iris()
X, y = data.data, data.target

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 创建模型
model = RandomForestClassifier(n_estimators=100)

# 训练模型
model.fit(X_train, y_train)

# 预测
predictions = model.predict(X_test)

# 评估
accuracy = accuracy_score(y_test, predictions)
print(f"准确率: {accuracy:.2%}")`,
          language: "python",
        },
      ],
      quiz: [
        { question: "分类和回归的主要区别是什么？", options: ["数据量不同", "分类预测离散值，回归预测连续值", "算法不同", "速度不同"], answer: 1, explanation: "分类任务预测的是离散类别（如是/否），回归任务预测的是连续数值（如价格）。" },
      ],
    },
    "python-ai-tools": {
      slug: "python-ai-tools",
      sections: [
        {
          title: "NumPy 基础",
          content: `NumPy 是 Python 科学计算的基础库，提供高效的多维数组操作。

NumPy 的核心：
- ndarray：多维数组对象
- 广播（Broadcasting）：不同形状数组的运算
- 向量化操作：避免显式循环
- 线性代数、傅里叶变换等数学函数`,
          code: `import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2, 3], [4, 5, 6]])

# 数组属性
print("形状:", matrix.shape)  # (2, 3)
print("维度:", matrix.ndim)   # 2
print("数据类型:", matrix.dtype)

# 数组操作
arr2 = np.arange(0, 10, 2)  # [0, 2, 4, 6, 8]
zeros = np.zeros((3, 3))    # 3x3 零矩阵
ones = np.ones((2, 4))      # 2x4 全1矩阵

# 索引和切片
print(arr[0])       # 1
print(matrix[0, 1]) # 2
print(arr[1:4])     # [2, 3, 4]

# 数学运算（向量化）
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a + b)        # [5 7 9]
print(a * b)        # [4 10 18]
print(np.dot(a, b)) # 32

# 统计函数
data = np.random.randn(1000)
print("均值:", round(data.mean(), 4))
print("标准差:", round(data.std(), 4))`,
          language: "python",
        },
        {
          title: "Pandas 数据处理",
          content: `Pandas 是数据分析的核心库，提供 DataFrame 和 Series 两种数据结构。

DataFrame 类似 Excel 表格，支持各种数据操作：
- 数据读取：CSV、Excel、SQL、JSON
- 数据清洗：缺失值处理、类型转换
- 数据筛选：条件过滤、分组聚合
- 数据合并：连接、合并、重塑`,
          code: `import pandas as pd

# 创建 DataFrame
data = {
    '姓名': ['张三', '李四', '王五', '赵六'],
    '年龄': [25, 30, 35, 28],
    '城市': ['北京', '上海', '广州', '深圳'],
    '薪资': [15000, 20000, 25000, 18000]
}
df = pd.DataFrame(data)

# 查看数据
print(df.head())
print(df.describe())

# 数据筛选
beijing = df[df['城市'] == '北京']
high_salary = df[df['薪资'] > 18000]

# 分组聚合
city_stats = df.groupby('城市')['薪资'].agg(['mean', 'max', 'min'])
print(city_stats)

# 数据处理
df['薪资等级'] = df['薪资'].apply(lambda x: '高' if x > 20000 else '中' if x > 15000 else '低')

# 读取 CSV
# df = pd.read_csv('data.csv')
# df.to_csv('output.csv', index=False)`,
          language: "python",
        },
        {
          title: "Matplotlib 可视化",
          content: `Matplotlib 是 Python 最基础的可视化库，支持各种图表类型。

常用图表：
- 折线图：展示趋势
- 柱状图：比较数据
- 散点图：展示关系
- 饼图：展示占比
- 热力图：展示矩阵数据`,
          code: `import matplotlib.pyplot as plt
import numpy as np

# 设置中文显示
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 折线图
x = np.linspace(0, 10, 100)
plt.figure(figsize=(10, 6))
plt.plot(x, np.sin(x), label='sin(x)')
plt.plot(x, np.cos(x), label='cos(x)')
plt.xlabel('x')
plt.ylabel('y')
plt.title('三角函数')
plt.legend()
plt.grid(True)
plt.savefig('trig.png', dpi=300)
plt.show()

# 柱状图
categories = ['A', 'B', 'C', 'D']
values = [23, 45, 56, 78]
plt.figure(figsize=(8, 5))
plt.bar(categories, values, color=['red', 'green', 'blue', 'yellow'])
plt.title('分类统计')
plt.show()

# 散点图
np.random.seed(42)
x = np.random.randn(100)
y = 2 * x + np.random.randn(100)
plt.figure(figsize=(8, 6))
plt.scatter(x, y, alpha=0.5)
plt.xlabel('X')
plt.ylabel('Y')
plt.title('散点图')
plt.show()`,
          language: "python",
        },
      ],
      quiz: [
        { question: "NumPy 的核心数据结构是什么？", options: ["list", "DataFrame", "ndarray", "dict"], answer: 2, explanation: "NumPy 的核心是 ndarray（N-dimensional array），提供高效的多维数组操作。" },
        { question: "Pandas 中 DataFrame 类似什么？", options: ["字典", "Excel 表格", "数组", "列表"], answer: 1, explanation: "DataFrame 类似 Excel 表格，由行和列组成，支持各种数据操作。" },
      ],
    },
    "tensorflow-basics": {
      slug: "tensorflow-basics",
      sections: [
        {
          title: "TensorFlow 简介",
          content: `TensorFlow 是 Google 开发的开源机器学习框架，广泛应用于深度学习。

TensorFlow 的特点：
- 张量（Tensor）计算
- 自动微分（GradientTape）
- GPU/TPU 加速
- 生产部署工具（TensorFlow Serving、Lite）
- 丰富的预训练模型`,
          code: `import tensorflow as tf

# 张量基础
tensor = tf.constant([[1, 2], [3, 4]])
print("形状:", tensor.shape)  # (2, 2)
print("数据类型:", tensor.dtype)  # int32

# 张量运算
a = tf.constant([1, 2, 3])
b = tf.constant([4, 5, 6])
c = a + b  # [5, 7, 9]
d = tf.multiply(a, b)  # [4, 10, 18]

# 自动微分
x = tf.Variable(3.0)
with tf.GradientTape() as tape:
    y = x ** 2 + 2 * x + 1
dy_dx = tape.gradient(y, x)
print("dy/dx =", dy_dx.numpy())  # 8.0`,
          language: "python",
        },
        {
          title: "Keras 模型构建",
          content: `Keras 是 TensorFlow 的高级 API，提供简洁的模型构建方式。

两种模型构建方式：
- Sequential：层栈式模型
- Functional API：支持多输入输出、共享层
- Model Subclassing：完全自定义`,
          code: `import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Sequential 模型
model = keras.Sequential([
    layers.Dense(64, activation='relu', input_shape=(784,)),
    layers.Dropout(0.2),
    layers.Dense(32, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.summary()

# Functional API
inputs = keras.Input(shape=(784,))
x = layers.Dense(64, activation='relu')(inputs)
x = layers.Dropout(0.2)(x)
x = layers.Dense(32, activation='relu')(x)
outputs = layers.Dense(10, activation='softmax')(x)

model = keras.Model(inputs=inputs, outputs=outputs)

# 编译模型
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)`,
          language: "python",
        },
        {
          title: "图像分类实战",
          content: `使用 TensorFlow 构建图像分类模型。

工作流程：
- 数据加载和预处理
- 模型构建
- 训练和验证
- 预测和评估`,
          code: `import tensorflow as tf
from tensorflow.keras import datasets, layers, models

# 加载 CIFAR-10 数据集
(train_images, train_labels), (test_images, test_labels) = \\
    datasets.cifar10.load_data()

# 归一化
train_images, test_images = train_images / 255.0, test_images / 255.0

# 构建 CNN 模型
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

# 编译
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# 训练
history = model.fit(train_images, train_labels, epochs=10,
                    validation_data=(test_images, test_labels))

# 评估
test_loss, test_acc = model.evaluate(test_images, test_labels)
print("测试准确率:", round(test_acc, 4))`,
          language: "python",
        },
      ],
      quiz: [
        { question: "TensorFlow 中 GradientTape 的作用是什么？", options: ["记录计算图", "自动微分", "数据预处理", "模型保存"], answer: 1, explanation: "GradientTape 用于自动微分，记录前向传播过程并计算梯度。" },
        { question: "Keras 中 Dropout 层的作用是什么？", options: ["删除数据", "防止过拟合", "增加参数", "加速训练"], answer: 1, explanation: "Dropout 在训练时随机丢弃神经元，防止模型过拟合。" },
      ],
    },
    "pytorch-basics": {
      slug: "pytorch-basics",
      sections: [
        {
          title: "PyTorch 张量",
          content: `PyTorch 使用动态计算图，张量操作更加灵活。

Tensor vs NumPy：
- Tensor 支持 GPU 加速
- Tensor 支持自动微分
- 动态计算图（Define-by-Run）`,
          code: `import torch

# 创建张量
x = torch.tensor([1, 2, 3, 4, 5])
matrix = torch.randn(3, 4)  # 随机正态分布
zeros = torch.zeros(2, 3)
ones = torch.ones(2, 3)

# 张量属性
print("形状:", x.shape)
print("数据类型:", x.dtype)
print("设备:", x.device)

# 张量运算
a = torch.tensor([1.0, 2.0, 3.0])
b = torch.tensor([4.0, 5.0, 6.0])
print(a + b)    # [5, 7, 9]
print(a * b)    # [4, 10, 18]
print(torch.dot(a, b))  # 32.0

# 自动微分
x = torch.tensor(2.0, requires_grad=True)
y = x ** 2 + 3 * x + 1
y.backward()
print("dy/dx =", x.grad)  # 7.0`,
          language: "python",
        },
        {
          title: "动态计算图",
          content: `PyTorch 使用动态计算图（Define-by-Run），每次前向传播都会构建新的计算图。

优势：
- 调试简单：可以使用 Python 调试器
- 灵活控制：可以改变网络结构
- 更直观：代码和计算图一致`,
          code: `import torch

# 动态计算图示例
x = torch.tensor(2.0, requires_grad=True)

# 每次前向传播构建新的计算图
def forward(x):
    if x.item() > 0:
        return x ** 2
    else:
        return -x

y = forward(x)
y.backward()
print("x=2 时梯度:", x.grad)  # 4.0

# 条件分支
x = torch.tensor(-3.0, requires_grad=True)
y = forward(x)
y.backward()
print("x=-3 时梯度:", x.grad)  # -1.0`,
          language: "python",
        },
        {
          title: "神经网络构建",
          content: `PyTorch 使用 nn.Module 构建神经网络。

构建步骤：
- 继承 nn.Module
- 在 __init__ 中定义层
- 在 forward 中定义前向传播`,
          code: `import torch
import torch.nn as nn
import torch.optim as optim

class SimpleNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(SimpleNet, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        out = self.fc1(x)
        out = self.relu(out)
        out = self.fc2(out)
        return out

# 创建模型
model = SimpleNet(784, 128, 10)

# 定义损失函数和优化器
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 训练循环
for epoch in range(10):
    # 前向传播
    outputs = model(inputs)
    loss = criterion(outputs, labels)

    # 反向传播
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# 保存模型
torch.save(model.state_dict(), 'model.pth')`,
          language: "python",
        },
      ],
      quiz: [
        { question: "PyTorch 动态计算图的主要优势是什么？", options: ["更快", "更灵活，易于调试", "更安全", "更简单"], answer: 1, explanation: "动态计算图每次前向传播构建新的图，可以使用 Python 控制流，更灵活且易于调试。" },
        { question: "PyTorch 中 requires_grad=True 的作用是什么？", options: ["启用 GPU", "启用自动微分", "启用缓存", "启用并行"], answer: 1, explanation: "设置 requires_grad=True 后，PyTorch 会跟踪对该张量的所有操作并计算梯度。" },
      ],
    },
    "scikit-learn": {
      slug: "scikit-learn",
      sections: [
        {
          title: "Scikit-learn 简介",
          content: `Scikit-learn 是 Python 最流行的机器学习库，提供统一的 API 接口。

核心功能：
- 分类：SVM、随机森林、KNN
- 回归：线性回归、岭回归
- 聚类：KMeans、DBSCAN
- 降维：PCA、t-SNE
- 模型选择：交叉验证、网格搜索
- 数据预处理：标准化、编码`,
          code: `from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

# 加载数据集
iris = datasets.load_iris()
X, y = iris.data, iris.target

# 划分数据集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 数据标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("训练集大小:", X_train.shape[0])
print("测试集大小:", X_test.shape[0])
print("特征数量:", X_train.shape[1])`,
          language: "python",
        },
        {
          title: "分类算法",
          content: `Scikit-learn 提供多种分类算法，使用统一的 API。

常用分类算法：
- 逻辑回归：简单快速
- SVM：高维数据效果好
- 随机森林：集成学习，稳健
- KNN：简单直观
- 决策树：可解释性强`,
          code: `from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

# 逻辑回归
lr = LogisticRegression(max_iter=200)
lr.fit(X_train_scaled, y_train)
lr_pred = lr.predict(X_test_scaled)
print("逻辑回归准确率:", round(accuracy_score(y_test, lr_pred), 4))

# 支持向量机
svm = SVC(kernel='rbf', C=1.0)
svm.fit(X_train_scaled, y_train)
svm_pred = svm.predict(X_test_scaled)
print("SVM 准确率:", round(accuracy_score(y_test, svm_pred), 4))

# 随机森林
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train_scaled, y_train)
rf_pred = rf.predict(X_test_scaled)
print("随机森林准确率:", round(accuracy_score(y_test, rf_pred), 4))

# K 近邻
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train_scaled, y_train)
knn_pred = knn.predict(X_test_scaled)
print("KNN 准确率:", round(accuracy_score(y_test, knn_pred), 4))`,
          language: "python",
        },
        {
          title: "模型评估与优化",
          content: `模型评估和优化是机器学习的重要环节。

评估方法：
- 交叉验证：更可靠的性能评估
- 学习曲线：诊断过拟合/欠拟合

优化方法：
- 网格搜索：超参数调优
- 随机搜索：更高效的超参数搜索`,
          code: `from sklearn.model_selection import cross_val_score, GridSearchCV
import numpy as np

# 交叉验证
scores = cross_val_score(rf, X_train_scaled, y_train, cv=5)
print("交叉验证准确率:", round(scores.mean(), 4), "(+/-", round(scores.std() * 2, 4), ")")

# 网格搜索
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20, 30]
}

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)

grid_search.fit(X_train_scaled, y_train)
print("最佳参数:", grid_search.best_params_)
print("最佳准确率:", round(grid_search.best_score_, 4))`,
          language: "python",
        },
      ],
      quiz: [
        { question: "Scikit-learn 中 cross_val_score 的作用是什么？", options: ["训练模型", "交叉验证评估模型", "保存模型", "数据预处理"], answer: 1, explanation: "cross_val_score 使用交叉验证评估模型性能，提供更可靠的性能估计。" },
        { question: "GridSearchCV 的作用是什么？", options: ["数据清洗", "超参数调优", "特征选择", "模型部署"], answer: 1, explanation: "GridSearchCV 通过网格搜索找到模型的最佳超参数组合。" },
      ],
    },
    "nlp-basics": {
      slug: "nlp-basics",
      sections: [
        {
          title: "NLP 基础概念",
          content: `自然语言处理（NLP）是人工智能的一个分支，专注于人机语言交互。

NLP 的主要任务：
- 分词（Tokenization）
- 词性标注（POS Tagging）
- 命名实体识别（NER）
- 情感分析（Sentiment Analysis）
- 机器翻译（Machine Translation）`,
          code: `import jieba
import jieba.posseg as pseg

# 中文分词
text = "自然语言处理是人工智能的重要方向"
words = jieba.lcut(text)
print("分词结果:", words)

# 带词性标注的分词
words_with_pos = pseg.lcut(text)
for word, pos in words_with_pos:
    print(f"{word} ({pos})")

# 关键词提取
from jieba import analyse
keywords = analyse.extract_tags(text, topK=5)
print("关键词:", keywords)`,
          language: "python",
        },
        {
          title: "词向量",
          content: `词向量（Word Embedding）将词语映射到稠密向量空间，捕捉语义关系。

常用词向量模型：
- Word2Vec：CBOW 和 Skip-gram
- GloVe：全局词向量
- FastText：考虑子词信息
- 预训练模型：BERT、GPT`,
          code: `from gensim.models import Word2Vec

# 训练 Word2Vec
sentences = [
    ["我", "喜欢", "自然语言", "处理"],
    ["深度", "学习", "是", "机器", "学习", "的", "分支"],
    ["Python", "是", "编程", "语言"]
]

model = Word2Vec(sentences, vector_size=100, window=5, min_count=1)

# 获取词向量
vector = model.wv["自然语言"]
print("词向量维度:", vector.shape)

# 相似词
similar_words = model.wv.most_similar("学习", topn=3)
print("相似词:", similar_words)`,
          language: "python",
        },
        {
          title: "文本分类",
          content: `文本分类是 NLP 的核心任务，将文本分配到预定义的类别。

常见应用场景：
- 垃圾邮件检测
- 情感分析
- 新闻分类
- 意图识别`,
          code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

# 文本数据
train_texts = [
    "这个产品质量很好，非常满意",
    "服务态度太差了，再也不买了",
    "物流很快，包装完好",
    "商品与描述不符，很失望"
]
train_labels = [1, 0, 1, 0]  # 1: 正面, 0: 负面

# 构建 Pipeline
text_clf = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=5000)),
    ('clf', MultinomialNB())
])

# 训练
text_clf.fit(train_texts, train_labels)

# 预测
test_texts = [
    "质量不错，推荐购买",
    "太差了，退货"
]
predictions = text_clf.predict(test_texts)
print("预测结果:", predictions)  # [1, 0]`,
          language: "python",
        },
      ],
      quiz: [
        { question: "词向量的主要作用是什么？", options: ["分词", "将词语映射到向量空间", "语法分析", "文本生成"], answer: 1, explanation: "词向量将词语映射到稠密向量空间，捕捉词语之间的语义关系。" },
        { question: "TF-IDF 的作用是什么？", options: ["分词", "文本分类", "提取关键词权重", "情感分析"], answer: 2, explanation: "TF-IDF 用于计算词语在文档中的重要程度，词频高且文档频率低的词权重更高。" },
      ],
    },
    "llm-intro": {
      slug: "llm-intro",
      sections: [
        {
          title: "大语言模型原理",
          content: `大语言模型（LLM）是基于 Transformer 架构的大规模预训练语言模型。

核心概念：
- Transformer 架构：自注意力机制
- 预训练：在大规模语料上学习语言模式
- 微调（Fine-tuning）：适应特定任务
- 提示工程（Prompt Engineering）：引导模型输出

代表模型：
- GPT 系列：自回归生成
- BERT 系列：双向编码
- LLaMA：开源大模型
- ChatGLM：中文优化`,
          code: `# Transformer 自注意力机制简化实现
import torch
import torch.nn as nn

class SelfAttention(nn.Module):
    def __init__(self, embed_size, heads):
        super(SelfAttention, self).__init__()
        self.embed_size = embed_size
        self.heads = heads
        self.head_dim = embed_size // heads

        self.values = nn.Linear(self.head_dim, self.head_dim, bias=False)
        self.keys = nn.Linear(self.head_dim, self.head_dim, bias=False)
        self.queries = nn.Linear(self.head_dim, self.head_dim, bias=False)
        self.fc_out = nn.Linear(heads * self.head_dim, embed_size)

    def forward(self, values, keys, queries, mask):
        N = queries.shape[0]
        value_len, key_len, query_len = values.shape[1], keys.shape[1], queries.shape[1]

        # 分头
        values = values.reshape(N, value_len, self.heads, self.head_dim)
        keys = keys.reshape(N, key_len, self.heads, self.head_dim)
        queries = queries.reshape(N, query_len, self.heads, self.head_dim)

        # 注意力分数
        energy = torch.einsum("nqhd,nkhd->nhqk", [queries, keys])
        attention = torch.softmax(energy / (self.embed_size ** (1/2)), dim=3)

        # 加权求和
        out = torch.einsum("nhqk,nvhd->nqhd", [attention, values]).reshape(
            N, query_len, self.heads * self.head_dim
        )

        return self.fc_out(out)`,
          language: "python",
        },
        {
          title: "Prompt Engineering",
          content: `提示工程是设计有效提示（Prompt）以引导 LLM 生成期望输出的技术。

提示技巧：
- 角色设定：让模型扮演特定角色
- 少样本学习：提供示例
- 思维链：引导模型逐步推理
- 结构化输出：指定输出格式`,
          code: `# Prompt 示例

# 1. 角色设定
prompt1 = """
你是一位资深的 Python 开发专家。请解释以下代码的功能：

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
"""

# 2. 少样本学习
prompt2 = """
将以下中文翻译成英文：

中文：我喜欢编程
英文：I like programming

中文：今天天气很好
英文：The weather is nice today

中文：机器学习很有趣
英文：
"""

# 3. 思维链
prompt3 = """
请一步步分析以下问题：

问题：一个水池有两个进水管，A管单独注满需要6小时，B管单独注满需要4小时。
两管同时打开，多久能注满水池？

请按以下步骤分析：
1. 确定A管的注水速率
2. 确定B管的注水速率
3. 计算同时注水的总速率
4. 计算注满时间
"""`,
          language: "text",
        },
        {
          title: "LLM 应用开发",
          content: `LLM 应用开发的核心是将大模型集成到实际应用中。

主要技术栈：
- API 调用：OpenAI API、Claude API
- 本地部署：Ollama、vLLM
- 应用框架：LangChain、LlamaIndex
- 向量数据库：ChromaDB、Milvus`,
          code: `from openai import OpenAI

client = OpenAI(api_key="your-api-key")

# 基本对话
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手。"},
        {"role": "user", "content": "什么是机器学习？"}
    ],
    temperature=0.7,
    max_tokens=500
)

print(response.choices[0].message.content)

# 流式响应
stream = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "写一首关于编程的诗"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")`,
          language: "python",
        },
      ],
      quiz: [
        { question: "Transformer 架构的核心机制是什么？", options: ["循环神经网络", "自注意力机制", "卷积神经网络", "池化层"], answer: 1, explanation: "Transformer 的核心是自注意力机制（Self-Attention），可以捕捉序列中的长距离依赖关系。" },
        { question: "思维链（Chain of Thought）提示的作用是什么？", options: ["提高速度", "引导模型逐步推理", "减少 token", "增加创意"], answer: 1, explanation: "思维链提示引导模型展示推理过程，通常能提高复杂问题的解决准确率。" },
      ],
    },
    "langchain-basics": {
      slug: "langchain-basics",
      sections: [
        {
          title: "LangChain 简介",
          content: `LangChain 是一个用于构建 LLM 应用的开发框架。

核心组件：
- Models：LLM 和 Chat Model 的封装
- Prompts：提示模板管理
- Chains：组合多个组件的工作流
- Memory：对话历史管理
- Agents：使用工具的智能代理
- Retrievers：知识库检索`,
          code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 初始化模型
llm = ChatOpenAI(
    model="gpt-3.5-turbo",
    temperature=0.7
)

# 创建提示模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一位{role}。"),
    ("user", "{question}")
])

# 创建输出解析器
parser = StrOutputParser()

# 构建链
chain = prompt | llm | parser

# 调用链
result = chain.invoke({
    "role": "Python 专家",
    "question": "什么是装饰器？"
})

print(result)`,
          language: "python",
        },
        {
          title: "Memory 对话记忆",
          content: `LangChain 提供多种记忆组件管理对话历史。

记忆类型：
- ConversationBufferMemory：保存完整对话
- ConversationBufferWindowMemory：保存最近 N 轮
- ConversationSummaryMemory：保存对话摘要`,
          code: `from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

# 初始化模型
llm = ChatOpenAI(model="gpt-3.5-turbo")

# 创建记忆
memory = ConversationBufferMemory(return_messages=True)

# 创建对话链
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True
)

# 多轮对话
response1 = conversation.predict(input="你好，我叫张三")
print(response1)

response2 = conversation.predict(input="我叫什么名字？")
print(response2)  # 模型会记住名字

# 查看记忆
print(memory.chat_memory.messages)`,
          language: "python",
        },
        {
          title: "Retrieval 增强生成",
          content: `RAG（Retrieval-Augmented Generation）通过检索外部知识增强 LLM 的回答。

RAG 工作流程：
- 文档加载和分割
- 向量化存储
- 相似度检索
- 基于检索结果生成回答`,
          code: `from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA

# 加载文档
loader = TextLoader("knowledge.txt")
documents = loader.load()

# 文档分割
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
texts = text_splitter.split_documents(documents)

# 创建向量数据库
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(texts, embeddings)

# 创建检索器
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# 创建 QA 链
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-3.5-turbo"),
    chain_type="stuff",
    retriever=retriever
)

# 查询
result = qa_chain.invoke({"query": "什么是 Docker？"})
print(result["result"])`,
          language: "python",
        },
      ],
      quiz: [
        { question: "LangChain 中 Chain 的作用是什么？", options: ["存储数据", "组合多个组件构建工作流", "训练模型", "部署应用"], answer: 1, explanation: "Chain 用于将多个组件（如模型、提示、解析器）组合成一个完整的工作流。" },
        { question: "RAG 的主要优势是什么？", options: ["更快", "让 LLM 能够访问外部知识", "更便宜", "更简单"], answer: 1, explanation: "RAG 通过检索外部知识文档，让 LLM 能够回答基于特定领域知识的问题。" },
      ],
    },
    "ai-agent-intro": {
      slug: "ai-agent-intro",
      sections: [
        {
          title: "AI Agent 概念",
          content: `AI Agent 是能够感知环境、做出决策并采取行动的智能体。

Agent 的核心能力：
- 感知：获取环境信息
- 推理：分析和决策
- 行动：执行操作
- 学习：从经验中改进

Agent 架构：
- ReAct：推理 + 行动
- Plan-and-Execute：先规划后执行
- Multi-Agent：多智能体协作`,
          code: `from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_react_agent
from langchain_core.prompts import PromptTemplate
from langchain_core.tools import tool

# 定义工具
@tool
def search_web(query: str) -> str:
    """搜索互联网获取信息"""
    return f"搜索结果: 关于 '{query}' 的信息..."

@tool
def calculator(expression: str) -> str:
    """计算数学表达式"""
    try:
        result = eval(expression)
        return str(result)
    except Exception as e:
        return f"计算错误: {e}"

# 创建提示模板
prompt = PromptTemplate.from_template("""
你是一个有用的助手。使用以下工具回答问题。

工具:
{tools}

工具名称: {tool_names}

问题: {input}

思考过程:
{agent_scratchpad}
""")

# 创建 Agent
llm = ChatOpenAI(model="gpt-3.5-turbo")
tools = [search_web, calculator]

agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# 运行 Agent
result = executor.invoke({"input": "北京今天天气怎么样？"})
print(result["output"])`,
          language: "python",
        },
        {
          title: "工具调用（Function Calling）",
          content: `Function Calling 让 LLM 能够调用外部函数和 API。

工作流程：
- 定义函数 schema
- 发送请求和函数定义
- LLM 决定是否调用函数
- 执行函数并返回结果
- LLM 整合结果生成回答`,
          code: `from openai import OpenAI
import json

client = OpenAI()

# 定义函数
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "获取指定城市的天气信息",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "城市名称"
                }
            },
            "required": ["city"]
        }
    }
}]

# 调用
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "北京今天天气怎么样？"}],
    tools=tools,
    tool_choice="auto"
)

# 处理函数调用
message = response.choices[0].message

if message.tool_calls:
    for tool_call in message.tool_calls:
        function_name = tool_call.function.name
        arguments = json.loads(tool_call.function.arguments)
        print("调用函数:", function_name, "参数:", arguments)`,
          language: "python",
        },
        {
          title: "Multi-Agent 协作",
          content: `Multi-Agent 系统让多个 Agent 协作完成复杂任务。

协作模式：
- 层级式：管理者分配任务给工人
- 辩论式：多个 Agent 讨论得出结论
- 流水线式：任务在 Agent 间传递`,
          code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-3.5-turbo")

# 定义不同角色的 Agent
researcher_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是研究员。根据主题收集和整理相关信息。"),
    ("user", "{topic}")
])

writer_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是作家。根据研究内容撰写文章。"),
    ("user", "{research}")
])

reviewer_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是审稿人。审阅文章并提供改进建议。"),
    ("user", "{article}")
])

# 创建 Agent 链
researcher = researcher_prompt | llm | StrOutputParser()
writer = writer_prompt | llm | StrOutputParser()
reviewer = reviewer_prompt | llm | StrOutputParser()

# 协作流程
topic = "AI Agent 的发展趋势"

# 1. 研究
research = researcher.invoke({"topic": topic})
print("研究完成")

# 2. 写作
article = writer.invoke({"research": research})
print("文章完成")

# 3. 审稿
feedback = reviewer.invoke({"article": article})
print("审稿完成")`,
          language: "python",
        },
      ],
      quiz: [
        { question: "AI Agent 的核心能力是什么？", options: ["存储数据", "感知、推理、行动、学习", "生成文本", "处理图像"], answer: 1, explanation: "AI Agent 需要具备感知环境、推理决策、采取行动和从经验中学习的能力。" },
        { question: "Function Calling 的作用是什么？", options: ["调用本地函数", "让 LLM 能够调用外部函数和 API", "训练模型", "存储数据"], answer: 1, explanation: "Function Calling 让 LLM 能够根据用户需求自动调用预定义的外部函数和 API。" },
      ],
    },
    "opencv-basics": {
      slug: "opencv-basics",
      sections: [
        {
          title: "OpenCV 简介",
          content: `OpenCV 是开源计算机视觉库，支持图像处理和视频分析。

核心功能：
- 图像读取、显示、保存
- 图像变换（缩放、旋转、裁剪）
- 颜色空间转换
- 边缘检测
- 目标检测`,
          code: `import cv2
import numpy as np

# 读取图像
img = cv2.imread('image.jpg')

# 显示图像
cv2.imshow('Image', img)
cv2.waitKey(0)
cv2.destroyAllWindows()

# 保存图像
cv2.imwrite('output.jpg', img)

# 图像属性
print("形状:", img.shape)    # (高度, 宽度, 通道)
print("大小:", img.size)      # 像素总数
print("数据类型:", img.dtype) # uint8

# 颜色空间转换
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)`,
          language: "python",
        },
        {
          title: "图像处理",
          content: `OpenCV 提供丰富的图像处理函数。

常用操作：
- 几何变换：缩放、旋转、仿射变换
- 滤波：模糊、锐化、去噪
- 形态学：腐蚀、膨胀、开闭运算
- 阈值处理：二值化`,
          code: `import cv2
import numpy as np

img = cv2.imread('image.jpg')

# 缩放
resized = cv2.resize(img, (500, 500))
resized2 = cv2.resize(img, None, fx=0.5, fy=0.5)

# 旋转
(h, w) = img.shape[:2]
center = (w // 2, h // 2)
M = cv2.getRotationMatrix2D(center, 45, 1.0)
rotated = cv2.warpAffine(img, M, (w, h))

# 模糊
blurred = cv2.GaussianBlur(img, (5, 5), 0)

# 边缘检测
edges = cv2.Canny(img, 100, 200)

# 阈值处理
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

# 形态学操作
kernel = np.ones((5, 5), np.uint8)
dilated = cv2.dilate(binary, kernel, iterations=1)
eroded = cv2.erode(binary, kernel, iterations=1)`,
          language: "python",
        },
        {
          title: "目标检测",
          content: `OpenCV 支持多种目标检测方法。

常用方法：
- Haar 级联分类器：人脸检测
- HOG + SVM：行人检测
- 深度学习：YOLO、SSD
- 模板匹配`,
          code: `import cv2

# Haar 级联分类器 - 人脸检测
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

img = cv2.imread('photo.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 检测人脸
faces = face_cascade.detectMultiScale(gray, 1.1, 4)

for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)

cv2.imshow('Detected Faces', img)
cv2.waitKey(0)

# 模板匹配
template = cv2.imread('template.jpg', 0)
image = cv2.imread('image.jpg', 0)

result = cv2.matchTemplate(image, template, cv2.TM_CCOEFF_NORMED)
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

top_left = max_loc
h, w = template.shape
bottom_right = (top_left[0] + w, top_left[1] + h)
cv2.rectangle(img, top_left, bottom_right, 255, 2)`,
          language: "python",
        },
      ],
      quiz: [
        { question: "OpenCV 中 Canny 函数的作用是什么？", options: ["读取图像", "边缘检测", "图像缩放", "颜色转换"], answer: 1, explanation: "Canny 是经典的边缘检测算法，能够检测图像中的边缘。" },
        { question: "Haar 级联分类器常用于什么任务？", options: ["图像分类", "人脸检测", "图像生成", "语义分割"], answer: 1, explanation: "Haar 级联分类器常用于人脸检测，OpenCV 预训练了多种检测器。" },
      ],
    },
    "mlops-intro": {
      slug: "mlops-intro",
      sections: [
        {
          title: "MLOps 概述",
          content: `MLOps 是将机器学习模型从开发到生产部署的实践方法论。

MLOps 的核心目标：
- 自动化模型训练和部署
- 监控模型性能
- 管理模型版本
- 确保模型可重现

MLOps 工作流：
- 数据准备
- 模型训练
- 模型评估
- 模型部署
- 监控和维护`,
          code: `# MLflow 实验跟踪示例
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 开始实验
mlflow.set_experiment("iris_classification")

with mlflow.start_run():
    # 训练模型
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # 预测
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)

    # 记录参数和指标
    mlflow.log_param("n_estimators", 100)
    mlflow.log_metric("accuracy", accuracy)

    # 保存模型
    mlflow.sklearn.log_model(model, "model")

    print("准确率:", round(accuracy, 4))`,
          language: "python",
        },
        {
          title: "模型部署",
          content: `模型部署是将训练好的模型投入生产环境的过程。

部署方式：
- REST API：Flask、FastAPI
- 容器化：Docker、Kubernetes
- Serverless：AWS Lambda
- 边缘部署：TensorFlow Lite、ONNX Runtime`,
          code: `# FastAPI 部署示例
from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI()

# 加载模型
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

class PredictionRequest(BaseModel):
    features: list

class PredictionResponse(BaseModel):
    prediction: int
    probability: list

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    features = np.array(request.features).reshape(1, -1)
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0].tolist()

    return PredictionResponse(
        prediction=int(prediction),
        probability=probability
    )

@app.get("/health")
async def health():
    return {"status": "healthy"}`,
          language: "python",
        },
        {
          title: "CI/CD 与监控",
          content: `持续集成和持续部署（CI/CD）是 MLOps 的重要组成部分。

CI/CD 流程：
- 代码提交触发构建
- 自动化测试
- 模型训练和评估
- 自动部署
- 监控和告警`,
          code: `# GitHub Actions ML Pipeline 示例
name: ML Pipeline

on:
  push:
    branches: [main]

jobs:
  train-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'

      - name: Install dependencies
        run: |
          pip install -r requirements.txt

      - name: Train model
        run: python train.py

      - name: Evaluate model
        run: python evaluate.py

      - name: Deploy
        if: success()
        run: python deploy.py`,
          language: "yaml",
        },
      ],
      quiz: [
        { question: "MLOps 的主要目标是什么？", options: ["训练模型", "自动化模型的开发、部署和监控", "数据清洗", "模型评估"], answer: 1, explanation: "MLOps 旨在自动化机器学习模型的整个生命周期，包括训练、部署和监控。" },
        { question: "MLflow 的主要功能是什么？", options: ["模型训练", "实验跟踪和模型管理", "数据可视化", "代码编辑"], answer: 1, explanation: "MLflow 用于跟踪实验、记录参数和指标、保存和管理模型。" },
      ],
    },
  },
  // ============ Mobile ============
  mobile: {
    "flutter-basics": {
      slug: "flutter-basics",
      sections: [
        {
          title: "Flutter Widget 基础",
          content: `Flutter 是 Google 开发的跨平台 UI 框架，使用 Dart 语言，一套代码可以同时运行在 iOS、Android、Web 和桌面平台。

Flutter 的核心概念是 Widget（组件）。一切都是 Widget，包括布局、间距、动画等。Widget 分为 StatelessWidget（无状态）和 StatefulWidget（有状态）两种。

MaterialApp 是 Material Design 风格应用的根组件，提供主题、路由等基础功能。`,
          code: `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Flutter 入门'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('你点击了按钮：'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            _counter++;
          });
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}`,
          language: "dart",
        },
      ],
      quiz: [
        { question: "Flutter 中 StatelessWidget 和 StatefulWidget 的区别是什么？", options: ["没有区别", "StatelessWidget 无状态，StatefulWidget 有状态", "StatelessWidget 更快", "StatefulWidget 更好看"], answer: 1, explanation: "StatelessWidget 是不可变的，一旦创建状态不会改变；StatefulWidget 可以在生命周期内改变状态。" },
      ],
    },
    "kotlin-basics": {
      slug: "kotlin-basics",
      sections: [
        {
          title: "Kotlin 基础语法",
          content: `Kotlin 是 JetBrains 开发的现代编程语言，是 Android 官方开发语言。它完全兼容 Java，同时提供了更简洁的语法和更安全的特性。

Kotlin 的特点：
- 空安全：类型系统在编译时检查空值
- 扩展函数：可以为现有类添加新函数
- 协程：轻量级异步编程
- 数据类：自动生成 equals、hashCode、toString
- 智能类型转换`,
          code: `// 变量声明
val immutable = "不可变"  // val 类似 final
var mutable = "可变"     // var 可重新赋值

// 空安全
var name: String = "Kotlin"
// name = null  // 编译错误
var nullable: String? = "可以为 null"
println(nullable?.length)  // 安全调用

// 扩展函数
fun String.removeSpaces(): String {
    return this.replace(" ", "")
}

println("Hello World".removeSpaces())  // HelloWorld

// 数据类
data class User(
    val name: String,
    val age: Int,
    val email: String
)

val user = User("张三", 25, "zhangsan@example.com")
println(user)  // User(name=张三, age=25, email=zhangsan@example.com)`,
          language: "kotlin",
        },
      ],
      quiz: [
        { question: "Kotlin 中 val 和 var 的区别是什么？", options: ["没有区别", "val 不可变，var 可变", "val 是全局变量", "var 是常量"], answer: 1, explanation: "val 声明的变量不可重新赋值（类似 Java 的 final），var 声明的变量可以重新赋值。" },
      ],
    },
    "flutter-widgets": {
      slug: "flutter-widgets",
      sections: [
        {
          title: "Material Design 组件",
          content: `Flutter 提供丰富的 Material Design 组件，遵循 Google 的设计规范。

常用组件：
- AppBar：应用栏
- Scaffold：页面骨架
- ListTile：列表项
- Card：卡片
- FloatingActionButton：浮动按钮
- Drawer：侧边栏
- BottomNavigationBar：底部导航`,
          code: `import 'package:flutter/material.dart';

class MaterialWidgets extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Material 组件'),
        actions: [
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {},
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          children: [
            DrawerHeader(
              child: Text('菜单'),
              decoration: BoxDecoration(color: Colors.blue),
            ),
            ListTile(
              leading: Icon(Icons.home),
              title: Text('首页'),
              onTap: () {},
            ),
          ],
        ),
      ),
      body: ListView(
        children: [
          Card(
            child: Column(
              children: [
                Image.network('https://picsum.photos/400/200'),
                Padding(
                  padding: EdgeInsets.all(16),
                  child: ListTile(
                    leading: CircleAvatar(child: Text('张')),
                    title: Text('卡片标题'),
                    subtitle: Text('卡片描述内容'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: Icon(Icons.add),
      ),
    );
  }
}`,
          language: "dart",
        },
        {
          title: "Cupertino 组件",
          content: `Cupertino 组件遵循 iOS 设计规范，提供原生 iOS 风格的 UI。

常用组件：
- CupertinoNavigationBar：iOS 风格导航栏
- CupertinoListSection：分组列表
- CupertinoSwitch：开关
- CupertinoSlider：滑块
- CupertinoActionSheet：操作表
- CupertinoAlertDialog：对话框`,
          code: `import 'package:flutter/cupertino.dart';

class CupertinoWidgets extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Cupertino 组件'),
        trailing: CupertinoButton(
          child: Icon(CupertinoIcons.add),
          onPressed: () {},
        ),
      ),
      child: ListView(
        children: [
          CupertinoListSection(
            header: Text('设置'),
            children: [
              CupertinoListTile(
                leading: Icon(CupertinoIcons.wifi),
                title: Text('Wi-Fi'),
                trailing: CupertinoSwitch(value: true, onChanged: (v) {}),
              ),
              CupertinoListTile(
                leading: Icon(CupertinoIcons.bluetooth),
                title: Text('蓝牙'),
                trailing: CupertinoSwitch(value: false, onChanged: (v) {}),
              ),
            ],
          ),
          CupertinoListSection(
            header: Text('音量'),
            children: [
              CupertinoSlider(
                value: 0.6,
                onChanged: (v) {},
              ),
            ],
          ),
        ],
      ),
    );
  }
}`,
          language: "dart",
        },
        {
          title: "自定义组件",
          content: `创建可复用的自定义组件是 Flutter 开发的最佳实践。

组件设计原则：
- 单一职责：每个组件只做一件事
- 可配置：通过参数定制外观
- 可组合：组合现有组件构建复杂 UI`,
          code: `import 'package:flutter/material.dart';

// 自定义按钮组件
class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final Color? color;
  final IconData? icon;

  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.color,
    this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: onPressed,
      icon: Icon(icon, size: 20),
      label: Text(text),
      style: ElevatedButton.styleFrom(
        backgroundColor: color,
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }
}

// 自定义卡片组件
class UserCard extends StatelessWidget {
  final String name;
  final String email;
  final String avatarUrl;
  final VoidCallback? onTap;

  const UserCard({
    Key? key,
    required this.name,
    required this.email,
    required this.avatarUrl,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Row(
            children: [
              CircleAvatar(
                radius: 30,
                backgroundImage: NetworkImage(avatarUrl),
              ),
              SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      name,
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 4),
                    Text(
                      email,
                      style: TextStyle(color: Colors.grey),
                    ),
                  ],
                ),
              ),
              Icon(Icons.chevron_right),
            ],
          ),
        ),
      ),
    );
  }
}`,
          language: "dart",
        },
      ],
      quiz: [
        { question: "Material Design 和 Cupertino 的区别是什么？", options: ["没有区别", "Material 遵循 Google 设计，Cupertino 遵循 iOS 设计", "Cupertino 更好看", "Material 只能用于 Android"], answer: 1, explanation: "Material Design 是 Google 的设计语言，Cupertino 是 Apple 的 iOS 设计风格。" },
        { question: "Flutter 中 StatelessWidget 和 StatefulWidget 的区别是什么？", options: ["没有区别", "StatelessWidget 无状态，StatefulWidget 有状态", "StatelessWidget 更快", "StatefulWidget 更好看"], answer: 1, explanation: "StatelessWidget 是不可变的，一旦创建状态不会改变；StatefulWidget 可以在生命周期内改变状态。" },
      ],
    },
    "react-native-basics": {
      slug: "react-native-basics",
      sections: [
        {
          title: "React Native 基础",
          content: `React Native 让开发者使用 JavaScript/TypeScript 构建原生移动应用。

核心概念：
- 一次编写，运行在 iOS 和 Android
- 使用 React 的组件化思想
- 原生组件映射
- 热重载（Hot Reload）`,
          code: `import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: '1', title: '学习 React Native' },
    { id: '2', title: '构建移动应用' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>我的应用</Text>
      </View>

      <View style={styles.counter}>
        <Text style={styles.count}>{count}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>点击 +1</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  counter: {
    alignItems: 'center',
    padding: 20,
  },
  count: {
    fontSize: 48,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default App;`,
          language: "jsx",
        },
        {
          title: "导航（Navigation）",
          content: `React Native 使用 React Navigation 实现页面导航。

导航类型：
- Stack Navigator：堆栈导航（页面栈）
- Tab Navigator：底部标签导航
- Drawer Navigator：侧边抽屉导航`,
          code: `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native';

// 页面组件
const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 24 }}>首页</Text>
    <Button
      title="查看详情"
      onPress={() => navigation.navigate('Details', { itemId: 42 })}
    />
  </View>
);

const DetailsScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>详情页</Text>
      <Text>项目 ID: {itemId}</Text>
      <Button title="返回" onPress={() => navigation.goBack()} />
    </View>
  );
};

// 导航配置
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: '详情' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;`,
          language: "jsx",
        },
        {
          title: "状态管理",
          content: `React Native 可以使用 React 状态管理方案或专门的状态管理库。

常用方案：
- useState/useReducer：React 内置
- Context API：轻量级全局状态
- Redux：复杂应用状态管理
- Zustand：轻量级状态管理`,
          code: `import React, { createContext, useContext, useReducer } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Context + useReducer
const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

const CountContext = createContext();

const CountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {children}
    </CountContext.Provider>
  );
};

const useCount = () => useContext(CountContext);

// 组件
const Counter = () => {
  const { state, dispatch } = useCount();

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{state.count}</Text>
      <View style={styles.buttons}>
        <Button title="+1" onPress={() => dispatch({ type: 'increment' })} />
        <Button title="-1" onPress={() => dispatch({ type: 'decrement' })} />
        <Button title="重置" onPress={() => dispatch({ type: 'reset' })} />
      </View>
    </View>
  );
};

const App = () => (
  <CountProvider>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Counter />
    </View>
  </CountProvider>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  count: { fontSize: 48, marginBottom: 20 },
  buttons: { flexDirection: 'row', gap: 10 },
});

export default App;`,
          language: "jsx",
        },
      ],
      quiz: [
        { question: "React Native 和 React 的区别是什么？", options: ["没有区别", "React Native 用于移动端，React 用于 Web", "React Native 更快", "React 更简单"], answer: 1, explanation: "React 用于构建 Web 应用，React Native 用于构建原生移动应用，它们共享 React 的核心概念。" },
        { question: "React Navigation 中 Stack Navigator 的作用是什么？", options: ["标签导航", "堆栈导航（页面栈）", "抽屉导航", "路由配置"], answer: 1, explanation: "Stack Navigator 实现堆栈式页面导航，支持页面入栈、出栈和返回操作。" },
      ],
    },
    "swift-basics": {
      slug: "swift-basics",
      sections: [
        {
          title: "Swift 基础语法",
          content: `Swift 是 Apple 开发的现代编程语言，用于 iOS、macOS、watchOS、tvOS 开发。

Swift 的特点：
- 类型安全
- 可选类型（Optionals）
- 闭包（Closures）
- 协议（Protocols）
- 泛型（Generics）`,
          code: `import Foundation

// 变量和常量
let name = "张三"  // 常量
var age = 25       // 可变变量
age = 26

// 数据类型
let integer: Int = 42
let double: Double = 3.14
let string: String = "Hello"
let boolean: Bool = true

// 可选类型
var optionalName: String? = "李四"
if let name = optionalName {
    print("名字: \\(name)")
}

// 空合并运算符
let displayName = optionalName ?? "未知"

// 数组
var fruits = ["苹果", "香蕉", "橘子"]
fruits.append("葡萄")
fruits.remove(at: 1)

// 字典
var scores: [String: Int] = ["张三": 95, "李四": 88]
scores["王五"] = 92

// 循环
for fruit in fruits {
    print(fruit)
}

// 函数
func greet(name: String) -> String {
    return "你好, \\(name)!"
}

let greeting = greet(name: "Swift")`,
          language: "swift",
        },
        {
          title: "闭包",
          content: `闭包是自包含的函数代码块，可以在代码中传递和使用。

闭包语法：
- 简化闭包：省略参数类型和 return
- 尾随闭包：闭包是最后一个参数时
- 捕获值：闭包可以捕获和修改外部变量`,
          code: `import Foundation

// 基本闭包
let greet = { (name: String) -> String in
    return "你好, \\(name)!"
}
print(greet("张三"))

// 简化闭包
let numbers = [5, 3, 8, 1, 9]

// 排序
let sorted = numbers.sorted { $0 < $1 }
print(sorted) // [1, 3, 5, 8, 9]

// 高阶函数
let doubled = numbers.map { $0 * 2 }
print(doubled) // [10, 6, 16, 2, 18]

let evens = numbers.filter { $0 % 2 == 0 }
print(evens) // [8]

let sum = numbers.reduce(0, +)
print(sum) // 26

// 尾随闭包
func performOperation(on numbers: [Int], operation: (Int) -> Int) -> [Int] {
    return numbers.map(operation)
}

let result = performOperation(on: numbers) { $0 * 3 }
print(result) // [15, 9, 24, 3, 27]

// 捕获值
func makeCounter() -> () -> Int {
    var count = 0
    return {
        count += 1
        return count
    }
}

let counter = makeCounter()
print(counter()) // 1
print(counter()) // 2
print(counter()) // 3`,
          language: "swift",
        },
        {
          title: "协议与扩展",
          content: `协议（Protocol）定义方法、属性和其他需求的蓝图。

协议特点：
- 定义接口规范
- 支持多协议遵循
- 协议扩展提供默认实现
- 协议组合`,
          code: `import Foundation

// 定义协议
protocol Drawable {
    func draw()
}

protocol Resizable {
    func resize(by factor: Double)
}

// 协议扩展提供默认实现
extension Drawable {
    func draw() {
        print("绘制图形")
    }
}

// 遵循协议
struct Circle: Drawable, Resizable {
    var radius: Double

    func draw() {
        print("绘制圆形，半径: \\(radius)")
    }

    mutating func resize(by factor: Double) {
        radius *= factor
    }
}

// 使用
var circle = Circle(radius: 5)
circle.draw() // 绘制圆形，半径: 5.0
circle.resize(by: 2)
circle.draw() // 绘制圆形，半径: 10.0

// 协议组合
func render(_ item: Drawable & Resizable) {
    item.draw()
}`,
          language: "swift",
        },
      ],
      quiz: [
        { question: "Swift 中可选类型（Optional）的作用是什么？", options: ["定义常量", "表示值可能存在或不存在", "创建数组", "定义函数"], answer: 1, explanation: "可选类型用于表示一个值可能存在或不存在，需要解包才能使用。" },
        { question: "Swift 中协议（Protocol）的作用是什么？", options: ["定义类", "定义接口规范和默认实现", "存储数据", "处理错误"], answer: 1, explanation: "协议定义方法和属性的规范，类、结构体、枚举可以遵循协议并实现其要求。" },
      ],
    },
    "android-basics": {
      slug: "android-basics",
      sections: [
        {
          title: "Android 项目结构",
          content: `Android 项目使用 Gradle 构建系统。

项目结构：
- app/src/main/java：源代码
- app/src/main/res：资源文件
- app/src/main/AndroidManifest.xml：应用清单
- build.gradle：构建配置`,
          code: `// AndroidManifest.xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.myapp">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>

// build.gradle (app)
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.myapp'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.myapp"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"
    }
}`,
          language: "xml",
        },
        {
          title: "Activity 与 Intent",
          content: `Activity 是 Android 应用的核心组件，代表一个用户界面屏幕。

Activity 生命周期：
- onCreate：创建
- onStart：可见
- onResume：前台
- onPause：暂停
- onStop：停止
- onDestroy：销毁

Intent 用于组件间通信，可以启动 Activity、Service 等。`,
          code: `// MainActivity.kt
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 启动新 Activity
        button.setOnClickListener {
            val intent = Intent(this, DetailActivity::class.java)
            intent.putExtra("key", "value")
            startActivity(intent)
        }
    }

    override fun onResume() {
        super.onResume()
        Log.d("Lifecycle", "onResume")
    }

    override fun onPause() {
        super.onPause()
        Log.d("Lifecycle", "onPause")
    }
}

// DetailActivity.kt
class DetailActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)

        // 获取传递的数据
        val value = intent.getStringExtra("key")
        textView.text = value
    }
}`,
          language: "kotlin",
        },
        {
          title: "UI 组件",
          content: `Android 提供丰富的 UI 组件构建用户界面。

常用组件：
- TextView：文本显示
- EditText：文本输入
- Button：按钮
- RecyclerView：列表
- ConstraintLayout：约束布局`,
          code: `<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        android:textSize="24sp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintBottom_toBottomOf="parent" />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="点击"
        app:layout_constraintTop_toBottomOf="@id/textView"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>`,
          language: "xml",
        },
      ],
      quiz: [
        { question: "Android Activity 生命周期中 onResume 的作用是什么？", options: ["创建 Activity", "Activity 可见", "Activity 进入前台", "销毁 Activity"], answer: 2, explanation: "onResume 在 Activity 进入前台并开始与用户交互时调用。" },
        { question: "Intent 在 Android 中的作用是什么？", options: ["布局设计", "组件间通信", "数据存储", "网络请求"], answer: 1, explanation: "Intent 用于 Android 组件间的通信，可以启动 Activity、Service 等。" },
      ],
    },
    "ios-swiftui": {
      slug: "ios-swiftui",
      sections: [
        {
          title: "SwiftUI 基础",
          content: `SwiftUI 是 Apple 推出的声明式 UI 框架，使用 Swift 语法构建用户界面。

SwiftUI 的特点：
- 声明式语法
- 实时预览
- 数据驱动 UI
- 跨 Apple 平台
- 与 UIKit 互操作`,
          code: `import SwiftUI

struct ContentView: View {
    @State private var count = 0
    @State private var name = ""

    var body: some View {
        VStack(spacing: 20) {
            Text("计数: \\(count)")
                .font(.largeTitle)

            Button("点击 +1") {
                count += 1
            }
            .buttonStyle(.borderedProminent)

            TextField("输入姓名", text: $name)
                .textFieldStyle(.roundedBorder)
                .padding()

            if !name.isEmpty {
                Text("你好, \\(name)!")
            }
        }
        .padding()
    }
}

// 预览
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}`,
          language: "swift",
        },
        {
          title: "布局系统",
          content: `SwiftUI 提供灵活的布局系统构建复杂界面。

布局组件：
- VStack：垂直布局
- HStack：水平布局
- ZStack：层叠布局
- List：列表
- ScrollView：滚动视图`,
          code: `import SwiftUI

struct LayoutDemo: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                // HStack 水平布局
                HStack {
                    Image(systemName: "person.circle")
                        .font(.system(size: 40))
                    VStack(alignment: .leading) {
                        Text("张三")
                            .font(.headline)
                        Text("iOS 开发者")
                            .font(.subheadline)
                            .foregroundColor(.gray)
                    }
                    Spacer()
                    Button("关注") {}
                        .buttonStyle(.bordered)
                }
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(10)

                // List 列表
                List {
                    Section("设置") {
                        Label("个人资料", systemImage: "person")
                        Label("通知", systemImage: "bell")
                        Label("隐私", systemImage: "lock")
                    }
                }
                .listStyle(.insetGrouped)
            }
        }
    }
}`,
          language: "swift",
        },
        {
          title: "数据流",
          content: `SwiftUI 使用属性包装器管理数据流。

数据流类型：
- @State：视图内部状态
- @Binding：子视图绑定父视图状态
- @ObservedObject：引用类型对象
- @StateObject：创建并持有引用类型对象
- @EnvironmentObject：全局共享对象`,
          code: `import SwiftUI

// 数据模型
class UserSettings: ObservableObject {
    @Published var username: String = "张三"
    @Published var isDarkMode: Bool = false
}

// 父视图
struct ParentView: View {
    @StateObject private var settings = UserSettings()
    @State private var items: [String] = ["苹果", "香蕉", "橘子"]

    var body: some View {
        NavigationView {
            List {
                // 子视图绑定父视图状态
                ChildView(username: $settings.username)

                Toggle("深色模式", isOn: $settings.isDarkMode)

                // 列表
                ForEach(items, id: \\.self) { item in
                    Text(item)
                }
                .onDelete { indexSet in
                    items.remove(atOffsets: indexSet)
                }
            }
            .navigationTitle("设置")
        }
    }
}

// 子视图
struct ChildView: View {
    @Binding var username: String

    var body: some View {
        TextField("用户名", text: $username)
            .textFieldStyle(.roundedBorder)
    }
}`,
          language: "swift",
        },
      ],
      quiz: [
        { question: "SwiftUI 中 @State 和 @Binding 的区别是什么？", options: ["没有区别", "@State 管理内部状态，@Binding 绑定父视图状态", "@Binding 更快", "@State 更安全"], answer: 1, explanation: "@State 用于视图内部状态，@Binding 用于子视图绑定和修改父视图的状态。" },
        { question: "SwiftUI 声明式 UI 的核心思想是什么？", options: ["命令式编程", "描述 UI 应该是什么样子", "手动更新 UI", "使用 XML 布局"], answer: 1, explanation: "声明式 UI 描述 UI 的状态和外观，SwiftUI 根据状态自动更新界面。" },
      ],
    },
  },
  // ============ Languages ============
  languages: {
    "c-basics": {
      slug: "c-basics",
      sections: [
        {
          title: "C 语言基础",
          content: `C 语言是计算机科学的基石，许多现代操作系统和编程语言都建立在 C 语言之上。

C 语言的特点：
- 接近硬件的底层操作能力
- 高效的执行性能
- 丰富的运算符和数据类型
- 结构化编程
- 可移植性强`,
          code: `#include <stdio.h>
#include <stdlib.h>

// 结构体定义
struct Student {
    char name[50];
    int age;
    float score;
};

// 函数定义
void printStudent(struct Student *s) {
    printf("姓名: %s, 年龄: %d, 成绩: %.1f\\n",
           s->name, s->age, s->score);
}

int main() {
    // 数组
    int numbers[] = {1, 2, 3, 4, 5};
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        sum += numbers[i];
    }
    printf("数组总和: %d\\n", sum);

    // 指针
    int x = 42;
    int *ptr = &x;
    printf("x 的地址: %p, 值: %d\\n", (void*)ptr, *ptr);

    // 结构体
    struct Student stu = {"张三", 20, 95.5};
    printStudent(&stu);

    return 0;
}`,
          language: "c",
          tip: "C 语言中指针是最强大也最危险的特性，务必确保指针指向有效的内存地址。",
        },
      ],
      quiz: [
        { question: "C 语言中 * 运算符的作用是什么？", options: ["乘法", "解引用（获取指针指向的值）", "取地址", "声明指针"], answer: 1, explanation: "* 运算符用于解引用指针，获取指针指向的内存地址中的值。" },
      ],
    },
    "cpp-basics": {
      slug: "cpp-basics",
      sections: [
        {
          title: "C++ 面向对象",
          content: `C++ 在 C 的基础上增加了面向对象编程（OOP）特性。类是 C++ 中封装数据和函数的基本单元。

C++ 的三大特性：
- 封装：将数据和操作数据的函数绑定在一起
- 继承：子类可以继承父类的属性和方法
- 多态：同一接口可以有不同的实现

RAII（资源获取即初始化）是 C++ 的核心编程范式，通过对象的生命周期管理资源。`,
          code: `#include <iostream>
#include <string>
#include <vector>

class Animal {
protected:
    std::string name;
    int age;

public:
    Animal(const std::string& n, int a) : name(n), age(a) {}
    virtual void speak() const {
        std::cout << name << " 发出声音" << std::endl;
    }
    virtual ~Animal() {}
};

class Dog : public Animal {
public:
    Dog(const std::string& n, int a) : Animal(n, a) {}
    void speak() const override {
        std::cout << name << ": 汪汪！" << std::endl;
    }
};

int main() {
    std::vector<std::unique_ptr<Animal>> animals;
    animals.push_back(std::make_unique<Dog>("旺财", 3));
    animals.push_back(std::make_unique<Dog>("小黑", 5));

    for (const auto& animal : animals) {
        animal->speak();
    }

    return 0;
}`,
          language: "cpp",
        },
      ],
      quiz: [
        { question: "C++ 中 virtual 关键字的作用是什么？", options: ["声明虚函数，支持多态", "声明静态函数", "声明常量", "声明友元"], answer: 0, explanation: "virtual 关键字用于声明虚函数，使子类可以重写父类方法，实现运行时多态。" },
      ],
    },
    "go-concurrency": {
      slug: "go-concurrency",
      sections: [
        {
          title: "Goroutine 详解",
          content: `Goroutine 是 Go 的轻量级线程，由 Go 运行时调度。

Goroutine 的特点：
- 初始栈只有几 KB，可动态增长
- 创建成本极低，可创建成千上万个
- 由 Go 运行时调度（M:N 调度模型）
- 同一进程内的 goroutine 共享内存`,
          code: `package main

import (
    "fmt"
    "runtime"
    "sync"
    "time"
)

func main() {
    // 打印当前 GOMAXPROCS
    fmt.Println("CPU 核心数:", runtime.GOMAXPROCS(0))

    // 使用 WaitGroup 等待所有 goroutine
    var wg sync.WaitGroup
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Worker %d 完成\\n", id)
        }(i)
    }
    wg.Wait()
    fmt.Println("所有 worker 完成")
}`,
          language: "go",
        },
        {
          title: "Channel 通信",
          content: `Channel 是 goroutine 之间通信的管道，遵循 CSP（Communicating Sequential Processes）模型。

Channel 类型：
- 无缓冲 channel：同步通信
- 有缓冲 channel：异步通信
- 只读/只写 channel：限制方向
- 关闭 channel：通知接收方`,
          code: `package main

import (
    "fmt"
    "sync"
)

func main() {
    // 无缓冲 channel
    ch := make(chan string)

    go func() {
        ch <- "你好"
    }()

    msg := <-ch
    fmt.Println(msg) // 你好

    // 有缓冲 channel
    buffered := make(chan int, 3)
    buffered <- 1
    buffered <- 2
    buffered <- 3
    fmt.Println(<-buffered) // 1

    // 使用 WaitGroup 和 channel 实现 worker pool
    var wg sync.WaitGroup
    jobs := make(chan int, 10)
    results := make(chan int, 10)

    // 启动 3 个 worker
    for w := 0; w < 3; w++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for job := range jobs {
                results <- job * 2
            }
        }(w)
    }

    // 发送任务
    for j := 0; j < 5; j++ {
        jobs <- j
    }
    close(jobs)

    // 等待 worker 完成
    go func() {
        wg.Wait()
        close(results)
    }()

    // 收集结果
    for result := range results {
        fmt.Println("结果:", result)
    }
}`,
          language: "go",
        },
        {
          title: "Select 语句",
          content: `Select 语句用于在多个 channel 操作中选择一个执行。

Select 的特点：
- 随机选择一个就绪的 case
- 如果没有就绪的 case，阻塞等待
- 支持 default case（非阻塞）`,
          code: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(1 * time.Second)
        ch1 <- "来自 channel 1"
    }()

    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "来自 channel 2"
    }()

    // 使用 select 等待第一个就绪的 channel
    select {
    case msg := <-ch1:
        fmt.Println(msg)
    case msg := <-ch2:
        fmt.Println(msg)
    case <-time.After(3 * time.Second):
        fmt.Println("超时")
    }

    // 非阻塞操作
    messages := make(chan string)
    select {
    case msg := <-messages:
        fmt.Println(msg)
    default:
        fmt.Println("没有消息")
    }
}`,
          language: "go",
        },
        {
          title: "并发模式",
          content: `Go 提供多种并发模式处理复杂的并发场景。

常用模式：
- Fan-out/Fan-in：任务分发和结果聚合
- Pipeline：流水线处理
- Context：控制 goroutine 生命周期`,
          code: `package main

import (
    "context"
    "fmt"
    "time"
)

// Context 控制
func worker(ctx context.Context, id int) {
    for {
        select {
        case <-ctx.Done():
            fmt.Printf("Worker %d 停止: %v\\n", id, ctx.Err())
            return
        default:
            fmt.Printf("Worker %d 工作中\\n", id)
            time.Sleep(500 * time.Millisecond)
        }
    }
}

func main() {
    // Context 控制
    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
    defer cancel()

    for i := 0; i < 3; i++ {
        go worker(ctx, i)
    }

    time.Sleep(4 * time.Second)
}`,
          language: "go",
        },
      ],
      quiz: [
        { question: "Goroutine 和操作系统线程的区别是什么？", options: ["没有区别", "Goroutine 更轻量，由 Go 运行时调度", "线程更轻量", "Goroutine 不能并发"], answer: 1, explanation: "Goroutine 初始栈只有几 KB，由 Go 运行时调度，创建和切换成本远低于操作系统线程。" },
        { question: "无缓冲 channel 和有缓冲 channel 的区别是什么？", options: ["没有区别", "无缓冲是同步通信，有缓冲是异步通信", "有缓冲更快", "无缓冲不能传递数据"], answer: 1, explanation: "无缓冲 channel 要求发送方和接收方同时就绪才能通信；有缓冲 channel 在缓冲区未满时可以异步发送。" },
      ],
    },
    "ruby-basics": {
      slug: "ruby-basics",
      sections: [
        {
          title: "Ruby 基础",
          content: `Ruby 是 Yukihiro Matsumoto 创建的面向对象语言，以简洁优雅著称。

Ruby 的特点：
- 一切皆对象
- 代码块（Blocks）
- 元编程（Metaprogramming）
- 灵活的语法
- 丰富的社区和宝石（Gems）`,
          code: `# 变量和数据类型
name = "Ruby"
age = 25
pi = 3.14
is_active = true

# 字符串
greeting = "Hello, #{name}!"
puts greeting.upcase
puts greeting.length

# 数组
fruits = ["apple", "banana", "cherry"]
fruits << "date"
puts fruits[0]  # apple
puts fruits.length

# 哈希
user = { name: "张三", age: 25, city: "北京" }
puts user[:name]
user[:email] = "zhangsan@example.com"

# 符号
status = :active
puts status.class  # Symbol

# 范围
(1..5).each { |i| print "#{i} " }`,
          language: "ruby",
        },
        {
          title: "代码块与迭代器",
          content: `Ruby 的代码块是一段可以传递给方法的代码，是 Ruby 的核心特性之一。

代码块的使用：
- do...end：多行代码块
- {...}：单行代码块
- yield：在方法内调用代码块
- Proc 和 Lambda：将代码块存储为对象`,
          code: `# 基本迭代器
[1, 2, 3, 4, 5].each do |num|
  puts num
end

(1..10).select { |n| n.even? }.each { |n| puts n }

# 自定义方法接收代码块
def repeat(times)
  times.times { yield }
end

repeat(3) { puts "Hello!" }

# 使用 Proc
square = Proc.new { |x| x ** 2 }
puts square.call(5)  # 25

# 使用 Lambda
multiply = lambda { |a, b| a * b }
puts multiply.call(3, 4)  # 12

# map
squares = [1, 2, 3, 4, 5].map { |n| n ** 2 }
puts squares.inspect  # [1, 4, 9, 16, 25]

# reduce
sum = [1, 2, 3, 4, 5].reduce(0) { |acc, n| acc + n }
puts sum  # 15`,
          language: "ruby",
        },
        {
          title: "元编程",
          content: `元编程是 Ruby 最强大的特性之一，允许在运行时修改类和对象。

元编程技术：
- method_missing：处理未定义的方法
- define_method：动态定义方法
- send：动态调用方法
- eval：执行字符串代码`,
          code: `# method_missing
class Dynamic
  def method_missing(method_name, *args)
    if method_name.to_s.start_with?("get_")
      variable = method_name.to_s[4..]
      instance_variable_get("@#{variable}")
    else
      super
    end
  end
end

obj = Dynamic.new
obj.instance_variable_set(:@name, "张三")
puts obj.get_name  # 张三

# define_method
class Calculator
  define_method(:add) { |a, b| a + b }
  define_method(:subtract) { |a, b| a - b }
  define_method(:multiply) { |a, b| a * b }
end

calc = Calculator.new
puts calc.add(5, 3)  # 8

# send
class Greeter
  def greet(name)
    "你好, #{name}!"
  end
end

g = Greeter.new
puts g.send(:greet, "Ruby")`,
          language: "ruby",
        },
      ],
      quiz: [
        { question: "Ruby 中代码块的作用是什么？", options: ["定义类", "传递一段代码给方法执行", "处理异常", "导入模块"], answer: 1, explanation: "代码块是一段可以传递给方法的代码，方法内部通过 yield 调用。" },
        { question: "Ruby 中 method_missing 的作用是什么？", options: ["删除方法", "处理未定义的方法调用", "创建方法", "重命名方法"], answer: 1, explanation: "当对象调用一个未定义的方法时，Ruby 会调用 method_missing，可以在其中动态处理。" },
      ],
    },
    "lua-basics": {
      slug: "lua-basics",
      sections: [
        {
          title: "Lua 基础",
          content: `Lua 是轻量级的脚本语言，常用于游戏开发和嵌入式系统。

Lua 的特点：
- 极其轻量（整个解释器只有几百 KB）
- 嵌入式脚本语言
- 表（Table）是唯一的数据结构
- 元表（Metatable）实现面向对象
- 协程（Coroutine）支持`,
          code: `-- 变量
name = "Lua"
age = 25
pi = 3.14
is_active = true

-- 字符串
greeting = "Hello, " .. name .. "!"
print(string.upper(greeting))

-- 表（数组）
fruits = {"apple", "banana", "cherry"}
print(fruits[1])  -- Lua 索引从 1 开始
print(#fruits)    -- 长度: 3

-- 表（字典/哈希）
user = {name = "张三", age = 25, city = "北京"}
print(user.name)

-- 遍历
for i, v in ipairs(fruits) do
    print(i, v)
end

for k, v in pairs(user) do
    print(k, v)
end`,
          language: "lua",
        },
        {
          title: "元表与元方法",
          content: `元表（Metatable）可以改变表的行为，是 Lua 面向对象的基础。

元方法：
- __index：访问不存在的键时调用
- __newindex：修改不存在的键时调用
- __add、__sub 等：运算符重载
- __call：将表当函数调用
- __tostring：字符串转换`,
          code: `-- 元表基础
local mt = {
    __add = function(a, b)
        return {x = a.x + b.x, y = a.y + b.y}
    end,
    __tostring = function(self)
        return string.format("(%d, %d)", self.x, self.y)
    end
}

local point = {x = 1, y = 2}
setmetatable(point, mt)

local point2 = {x = 3, y = 4}
setmetatable(point2, mt)

local result = point + point2
print(result)  -- (4, 6)

-- 面向对象
local Animal = {}
Animal.__index = Animal

function Animal.new(name, sound)
    local self = setmetatable({}, Animal)
    self.name = name
    self.sound = sound
    return self
end

function Animal:speak()
    return self.name .. " says " .. self.sound
end

local dog = Animal.new("Dog", "Woof")
print(dog:speak())  -- Dog says Woof`,
          language: "lua",
        },
        {
          title: "协程",
          content: `协程（Coroutine）是 Lua 的轻量级并发机制，支持协作式多任务。

协程状态：
- suspended：挂起状态
- running：运行状态
- normal：正常状态
- dead：结束状态`,
          code: `-- 创建协程
local co = coroutine.create(function()
    print("协程开始")
    coroutine.yield()
    print("协程继续")
    coroutine.yield()
    print("协程结束")
end)

coroutine.resume(co)  -- 协程开始
coroutine.resume(co)  -- 协程继续
coroutine.resume(co)  -- 协程结束

-- 带返回值的协程
local producer = coroutine.create(function()
    for i = 1, 10 do
        coroutine.yield(i * 2)
    end
end)

-- 消费者
while true do
    local success, value = coroutine.resume(producer)
    if not success then break end
    print(value)
end

-- 使用协程实现迭代器
local function range(start, stop, step)
    step = step or 1
    return coroutine.wrap(function()
        for i = start, stop, step do
            coroutine.yield(i)
        end
    end)
end

for num in range(1, 10, 2) do
    print(num)  -- 1, 3, 5, 7, 9
end`,
          language: "lua",
        },
      ],
      quiz: [
        { question: "Lua 中表（Table）的作用是什么？", options: ["只用于数组", "唯一的数据结构，可作为数组、字典、对象", "只用于字典", "不可修改"], answer: 1, explanation: "表是 Lua 唯一的数据结构，可以用作数组、字典、对象等。" },
        { question: "Lua 中元表（Metatable）的作用是什么？", options: ["存储数据", "改变表的行为，实现运算符重载和面向对象", "创建线程", "处理错误"], answer: 1, explanation: "元表可以定义表的运算符行为、属性访问等，是实现面向对象的基础。" },
      ],
    },
    "scala-basics": {
      slug: "scala-basics",
      sections: [
        {
          title: "Scala 基础",
          content: `Scala 是一种融合面向对象和函数式编程的语言，运行在 JVM 上。

Scala 的特点：
- 面向对象 + 函数式编程
- 类型推断
- 模式匹配
- 隐式转换
- Actor 并发模型（Akka）`,
          code: `// 变量
val name: String = "Scala"  // 不可变
var age: Int = 25           // 可变

// 类型推断
val message = "Hello"  // 自动推断为 String

// 函数
def add(a: Int, b: Int): Int = a + b

// 匿名函数
val multiply = (a: Int, b: Int) => a * b

// 字符串插值
val greeting = s"Hello, $name!"

// 元组
val person = ("张三", 25, "北京")
println(person._1)  // 张三

// 集合
val numbers = List(1, 2, 3, 4, 5)
val doubled = numbers.map(_ * 2)
val evens = numbers.filter(_ % 2 == 0)
val sum = numbers.reduce(_ + _)`,
          language: "scala",
        },
        {
          title: "模式匹配",
          content: `模式匹配是 Scala 的强大特性，类似 switch 但更强大。

模式匹配支持：
- 值匹配
- 类型匹配
- 构造器匹配
- 序列匹配
- 选项匹配`,
          code: `// 基本模式匹配
def describe(x: Any): String = x match {
    case 0 => "零"
    case x: Int if x > 0 => s"正整数: $x"
    case x: Int => s"负整数: $x"
    case s: String => s"字符串: $s"
    case _ => "其他"
}

println(describe(42))    // 正整数: 42
println(describe("hi")) // 字符串: hi

// 样例类匹配
case class Person(name: String, age: Int)
case class Animal(name: String, sound: String)

def greet(entity: Any): String = entity match {
    case Person(name, age) => s"你好, $name! 你 $age 岁了"
    case Animal(name, sound) => s"$name 说 $sound"
    case _ => "未知实体"
}

println(greet(Person("张三", 25)))

// 序列匹配
val numbers = List(1, 2, 3)
numbers match {
    case List(1, 2, 3) => println("匹配 1,2,3")
    case List(1, _*) => println("以 1 开头的列表")
    case _ => println("其他")
}`,
          language: "scala",
        },
        {
          title: "函数式编程",
          content: `Scala 支持完整的函数式编程特性。

核心概念：
- 不可变数据
- 高阶函数
- 柯里化
- 尾递归优化`,
          code: `// 高阶函数
val numbers = List(1, 2, 3, 4, 5)

// map、filter、reduce
val result = numbers
    .filter(_ % 2 == 0)
    .map(_ * 2)
    .reduce(_ + _)

// 柯里化
def add(a: Int)(b: Int): Int = a + b
val add5 = add(5) _  // 创建部分应用函数
println(add5(3))     // 8

// 尾递归
import scala.annotation.tailrec

@tailrec
def factorial(n: Int, acc: Int = 1): Int = {
    if (n <= 1) acc
    else factorial(n - 1, n * acc)
}

println(factorial(5))  // 120

// 隐式转换
implicit class RichString(s: String) {
    def shout: String = s.toUpperCase + "!"
}

println("hello".shout)  // HELLO!`,
          language: "scala",
        },
      ],
      quiz: [
        { question: "Scala 中 val 和 var 的区别是什么？", options: ["没有区别", "val 不可变，var 可变", "val 是全局变量", "var 是常量"], answer: 1, explanation: "val 声明的变量不可重新赋值，var 声明的变量可以重新赋值。" },
        { question: "Scala 模式匹配相比 Java switch 的优势是什么？", options: ["更快", "支持类型匹配、序列匹配等更强大的模式", "更简单", "只支持整数"], answer: 1, explanation: "Scala 模式匹配支持值、类型、构造器、序列等多种模式，比 Java switch 强大得多。" },
      ],
    },
    "perl-basics": {
      slug: "perl-basics",
      sections: [
        {
          title: "Perl 基础",
          content: `Perl 是 Larry Wall 创建的脚本语言，以强大的文本处理能力著称。

Perl 的特点：
- 正则表达式支持极强
- 文本处理能力强大
- 灵活的语法（TIMTOWTDI）
- CPAN 模块仓库
- 适合系统管理和网络编程`,
          code: `#!/usr/bin/perl
use strict;
use warnings;

# 变量
my $name = "Perl";
my @fruits = ("apple", "banana", "cherry");
my %user = (name => "张三", age => 25);

# 打印
print "Hello, $name!\\n";
print "水果: @fruits\\n";

# 数组操作
push(@fruits, "date");      # 添加
pop(@fruits);               # 弹出
my $count = scalar(@fruits); # 长度

# 条件和循环
my $score = 85;
if ($score >= 90) {
    print "优秀\\n";
} elsif ($score >= 80) {
    print "良好\\n";
} else {
    print "及格\\n";
}

for my $fruit (@fruits) {
    print "$fruit\\n";
}`,
          language: "perl",
        },
        {
          title: "正则表达式",
          content: `Perl 的正则表达式是其最强大的特性之一。

正则匹配操作符：
- m//：匹配
- s///：替换
- qr//：预编译正则`,
          code: `#!/usr/bin/perl
use strict;
use warnings;

my $text = "我的邮箱是 test\@example.com，电话是 138-1234-5678";

# 基本匹配
if ($text =~ /\\d{3}-\\d{4}-\\d{4}/) {
    print "找到电话号码\\n";
}

# 捕获组
if ($text =~ /(\\d{3})-(\\d{4})-(\\d{4})/) {
    print "电话: $1-$2-$3\\n";
}

# 替换
my $clean = $text;
$clean =~ s/\\d{3}-\\d{4}-\\d{4}/XXX-XXXX-XXXX/;
print "$clean\\n";

# 正则修饰符
# i: 忽略大小写
# g: 全局匹配
# m: 多行模式

my $str = "Hello World";
if ($str =~ /hello/i) {
    print "匹配（忽略大小写）\\n";
}

# 非贪婪匹配
my $html = "<b>bold</b> and <i>italic</i>";
if ($html =~ /<(b)>(.*?)<\\/\\1>/) {
    print "粗体文本: $2\\n";  # bold
}`,
          language: "perl",
        },
        {
          title: "子程序与引用",
          content: `Perl 支持子程序（函数）和引用（类似指针）。

子程序特点：
- 使用 sub 关键字定义
- 参数通过 @_ 传递
- 使用 return 返回
- 支持闭包`,
          code: `#!/usr/bin/perl
use strict;
use warnings;

# 基本子程序
sub greet {
    my ($name) = @_;
    return "你好, $name!";
}

print greet("张三") . "\\n";

# 哈希参数
sub create_user {
    my (%args) = @_;
    return {
        name => $args{name},
        age => $args{age} // 0,
    };
}

my $user = create_user(name => "李四", age => 30);
print "$user->{name}\\n";

# 引用
my @array = (1, 2, 3);
my $array_ref = \\@array;
print "$$array_ref[0]\\n";  # 1

# 匿名数组和哈希
my $anon_array = [1, 2, 3];
my $anon_hash = { x => 1, y => 2 };

# 闭包
sub counter {
    my $count = 0;
    return sub {
        $count++;
        return $count;
    };
}

my $counter = counter();
print $counter() . "\\n";  # 1
print $counter() . "\\n";  # 2

# map 和 grep
my @numbers = (1, 2, 3, 4, 5);
my @doubled = map { $_ * 2 } @numbers;
my @evens = grep { $_ % 2 == 0 } @numbers;

print "加倍: @doubled\\n";
print "偶数: @evens\\n";`,
          language: "perl",
        },
      ],
      quiz: [
        { question: "Perl 中 $_ 变量的作用是什么？", options: ["全局变量", "默认迭代变量", "私有变量", "常量"], answer: 1, explanation: "$_ 是 Perl 的默认变量，在循环和正则匹配中自动使用。" },
        { question: "Perl 正则中 s/// 操作符的作用是什么？", options: ["匹配", "替换", "分割", "合并"], answer: 1, explanation: "s/// 是替换操作符，用于在字符串中查找并替换匹配的内容。" },
      ],
    },
    "dart-basics": {
      slug: "dart-basics",
      sections: [
        {
          title: "Dart 基础",
          content: `Dart 是 Google 开发的编程语言，是 Flutter 的开发语言。

Dart 的特点：
- 强类型静态语言
- 支持 AOT 和 JIT 编译
- 单线程事件循环
- 异步支持（Future、Stream）`,
          code: `// 变量
var name = 'Dart';  // 类型推断
String language = 'Dart';  // 显式类型
final pi = 3.14;  // 运行时常量
const e = 2.718;  // 编译时常量

// 空安全
String? nullableName;  // 可空类型
String nonNullName = '必须有值';  // 非空类型

// 控制流
if (nullableName != null) {
  print(nullableName.length);
}

// 级联表示法
var person = Person()
  ..name = '张三'
  ..age = 25;

// 集合
var list = [1, 2, 3, 4, 5];
var set = {1, 2, 3, 3};  // {1, 2, 3}
var map = {'name': '张三', 'age': 25};

// 函数
int add(int a, int b) => a + b;  // 箭头函数

var result = add(3, 4);
print(result);  // 7`,
          language: "dart",
        },
        {
          title: "异步编程",
          content: `Dart 使用 Future 和 Stream 处理异步操作。

Future 表示未来会有值（一次性）
Stream 表示未来会有多个值（流式）`,
          code: `import 'dart:async';

// Future
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 2));
  return '数据加载完成';
}

// 使用 Future
void main() async {
  print('开始...');
  String data = await fetchData();
  print(data);
  print('结束');
}

// Stream
Stream<int> numberStream() async* {
  for (int i = 1; i <= 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

// 监听 Stream
void listenToStream() {
  numberStream().listen(
    (number) {
      print('收到: $number');
    },
    onDone: () {
      print('Stream 结束');
    },
    onError: (error) {
      print('错误: $error');
    },
  );
}

// Stream 操作
void streamOperations() {
  numberStream()
    .where((n) => n % 2 == 0)  // 过滤
    .map((n) => n * 2)          // 转换
    .listen((n) => print(n));   // 监听
}`,
          language: "dart",
        },
        {
          title: "类与混入",
          content: `Dart 支持面向对象编程和混入（Mixin）多重继承。

类的特点：
- 单继承
- 支持抽象类和接口
- Mixin 实现代码复用
- 泛型支持`,
          code: `// 抽象类
abstract class Animal {
  String get name;
  void speak();
}

// Mixin
mixin Flyable {
  void fly() {
    print('在飞翔');
  }
}

// 类实现
class Dog extends Animal with Flyable {
  @override
  String name;

  Dog(this.name);

  @override
  void speak() {
    print('$name: 汪汪！');
  }
}

// 使用
var dog = Dog('旺财');
dog.speak();  // 旺财: 汪汪！
dog.fly();    // 在飞翔

// 泛型类
class Box<T> {
  T? _value;

  void set(T value) => _value = value;
  T? get() => _value;
}

var intBox = Box<int>();
intBox.set(42);
print(intBox.get());  // 42`,
          language: "dart",
        },
      ],
      quiz: [
        { question: "Dart 中 final 和 const 的区别是什么？", options: ["没有区别", "final 运行时常量，const 编译时常量", "const 更快", "final 不能赋值"], answer: 1, explanation: "const 在编译时确定值，final 在运行时确定但之后不可变。" },
        { question: "Dart 中 Future 和 Stream 的区别是什么？", options: ["没有区别", "Future 返回一个值，Stream 返回多个值", "Stream 更快", "Future 是异步的"], answer: 1, explanation: "Future 表示一次性异步操作的结果，Stream 表示随时间推移产生多个值的异步序列。" },
      ],
    },
  },
  // ============ Fundamentals ============
  fundamentals: {
    "data-structures": {
      slug: "data-structures",
      sections: [
        {
          title: "数组与链表",
          content: `数组是最基础的数据结构，使用连续内存存储相同类型的元素。支持 O(1) 随机访问，但插入和删除需要移动元素，时间复杂度为 O(n)。

链表使用节点存储数据，每个节点包含数据和指向下一个节点的指针。插入和删除只需修改指针，时间复杂度为 O(1)，但不支持随机访问。

选择建议：
- 需要频繁随机访问：选择数组
- 需要频繁插入删除：选择链表
- 需要两端操作：选择双端队列`,
          code: `# 数组（Python 列表）
arr = [1, 2, 3, 4, 5]
arr.append(6)        # O(1) 均摊
arr.insert(0, 0)     # O(n)
arr.pop()            # O(1)
print(arr[2])        # O(1) 随机访问

# 链表节点定义
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# 创建链表: 1 -> 2 -> 3
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)

# 遍历链表
current = head
while current:
    print(current.val, end=" -> ")
    current = current.next
print("None")`,
          language: "python",
        },
        {
          title: "栈与队列",
          content: `栈（Stack）是后进先出（LIFO）的数据结构。只能在栈顶进行插入和删除操作。应用：函数调用栈、表达式求值、括号匹配。

队列（Queue）是先进先出（FIFO）的数据结构。从队尾插入，从队头删除。应用：任务调度、广度优先搜索、消息队列。

双端队列（Deque）两端都可以进行插入和删除操作。`,
          code: `# 栈的实现
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()

    def peek(self):
        if not self.is_empty():
            return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

# 使用栈判断括号匹配
def is_valid_parentheses(s):
    stack = Stack()
    mapping = {')': '(', ']': '[', '}': '{'}

    for char in s:
        if char in mapping:
            if stack.is_empty() or stack.pop() != mapping[char]:
                return False
        else:
            stack.push(char)

    return stack.is_empty()

print(is_valid_parentheses("()[]{}"))  # True
print(is_valid_parentheses("(]"))      # False`,
          language: "python",
          tip: "Python 的 list 可以直接当栈使用：append() 入栈，pop() 出栈。",
        },
        {
          title: "哈希表",
          content: `哈希表（Hash Table）通过哈希函数将键映射到数组索引，实现近乎 O(1) 的查找、插入和删除。

哈希冲突的解决方法：
- 链地址法：冲突的元素存储在链表中
- 开放寻址法：冲突时探测下一个空位

哈希表广泛应用于：缓存、字典、数据库索引、去重。`,
          code: `# Python 字典就是哈希表的实现
hash_map = {}

# 插入 O(1)
hash_map["name"] = "张三"
hash_map["age"] = 25
hash_map["city"] = "北京"

# 查找 O(1)
print(hash_map["name"])  # 张三

# 判断键是否存在
if "age" in hash_map:
    print("存在年龄字段")

# 遍历
for key, value in hash_map.items():
    print(f"{key}: {value}")

# 简单哈希函数实现
def simple_hash(key, table_size):
    hash_value = 0
    for char in str(key):
        hash_value += ord(char)
    return hash_value % table_size

print(simple_hash("hello", 10))  # 哈希值`,
          language: "python",
        },
      ],
      quiz: [
        { question: "数组和链表的主要区别是什么？", options: ["数组更大", "数组支持 O(1) 随机访问，链表支持 O(1) 插入删除", "没有区别", "链表更安全"], answer: 1, explanation: "数组使用连续内存支持快速随机访问，链表通过指针连接支持快速插入删除。" },
        { question: "栈是什么数据结构？", options: ["先进先出", "后进先出", "随机访问", "排序"], answer: 1, explanation: "栈是后进先出（LIFO）的数据结构，最后入栈的元素最先出栈。" },
        { question: "哈希表的平均查找时间复杂度是？", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2, explanation: "哈希表通过哈希函数直接计算索引，平均情况下查找时间复杂度为 O(1)。" },
      ],
    },
    "algorithms": {
      slug: "algorithms",
      sections: [
        {
          title: "排序算法",
          content: `排序是将数据按特定顺序排列的过程。常见排序算法的时间复杂度和特点：

冒泡排序：O(n²)，简单但效率低，稳定排序。
选择排序：O(n²)，不稳定，交换次数少。
插入排序：O(n²)，对几乎有序的数据效率高。
快速排序：O(n log n) 平均，不稳定，实际应用最广泛。
归并排序：O(n log n)，稳定，需要额外空间。
堆排序：O(n log n)，不稳定，原地排序。`,
          code: `# 快速排序
def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

# 归并排序
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(quick_sort([3, 6, 8, 10, 1, 2, 1]))
# [1, 1, 2, 3, 6, 8, 10]`,
          language: "python",
        },
        {
          title: "搜索算法",
          content: `搜索是在数据集合中查找特定元素的过程。

线性搜索：逐个检查元素，时间复杂度 O(n)。适用于无序数据。
二分搜索：在有序数据中反复折半查找，时间复杂度 O(log n)。效率极高。

二分搜索的前提是数据必须有序。每次比较排除一半的搜索空间。`,
          code: `# 二分搜索（迭代版）
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

# 二分搜索（递归版）
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1

    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# 测试
sorted_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(binary_search(sorted_arr, 7))  # 6
print(binary_search(sorted_arr, 11)) # -1`,
          language: "python",
        },
      ],
      quiz: [
        { question: "快速排序的平均时间复杂度是？", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1, explanation: "快速排序的平均时间复杂度是 O(n log n)，是实际应用中最常用的排序算法。" },
        { question: "二分搜索的前提条件是什么？", options: ["数据无序", "数据必须有序", "数据量小", "数据是整数"], answer: 1, explanation: "二分搜索要求数据必须有序，每次比较可以排除一半的搜索空间。" },
      ],
    },
    "design-patterns": {
      slug: "design-patterns",
      sections: [
        {
          title: "创建型模式",
          content: `创建型模式关注对象的创建机制，试图以适合情况的方式创建对象。

单例模式（Singleton）：确保一个类只有一个实例，并提供全局访问点。应用场景：数据库连接池、日志记录器、配置管理器。

工厂模式（Factory）：定义创建对象的接口，让子类决定实例化哪个类。应用场景：根据配置创建不同类型的对象。`,
          code: `# 单例模式
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        self.connection = "数据库连接已建立"

# 工厂模式
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "汪汪！"

class Cat(Animal):
    def speak(self):
        return "喵喵！"

class AnimalFactory:
    @staticmethod
    def create_animal(animal_type):
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        raise ValueError(f"未知动物类型: {animal_type}")

# 使用
dog = AnimalFactory.create_animal("dog")
print(dog.speak())  # 汪汪！`,
          language: "python",
        },
        {
          title: "行为型模式",
          content: `行为型模式关注对象之间的通信和职责分配。

观察者模式（Observer）：定义对象间的一对多依赖关系，当一个对象状态改变时，所有依赖它的对象都会收到通知。应用场景：事件系统、消息订阅、数据绑定。

策略模式（Strategy）：定义一系列算法，将每个算法封装起来，使它们可以互换。应用场景：排序算法切换、支付方式选择、验证规则。`,
          code: `# 观察者模式
class EventEmitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, callback):
        if event not in self._listeners:
            self._listeners[event] = []
        self._listeners[event].append(callback)

    def emit(self, event, *args):
        if event in self._listeners:
            for callback in self._listeners[event]:
                callback(*args)

# 使用
emitter = EventEmitter()
emitter.on("data", lambda data: print(f"收到数据: {data}"))
emitter.on("data", lambda data: print(f"处理数据: {data.upper()}"))
emitter.emit("data", "hello world")

# 策略模式
class SortStrategy:
    def sort(self, data):
        pass

class BubbleSort(SortStrategy):
    def sort(self, data):
        arr = data.copy()
        n = len(arr)
        for i in range(n):
            for j in range(0, n-i-1):
                if arr[j] > arr[j+1]:
                    arr[j], arr[j+1] = arr[j+1], arr[j]
        return arr

class QuickSort(SortStrategy):
    def sort(self, data):
        if len(data) <= 1:
            return data
        pivot = data[len(data) // 2]
        left = [x for x in data if x < pivot]
        middle = [x for x in data if x == pivot]
        right = [x for x in data if x > pivot]
        return self.sort(left) + middle + self.sort(right)

class Sorter:
    def __init__(self, strategy: SortStrategy):
        self._strategy = strategy

    def sort(self, data):
        return self._strategy.sort(data)

sorter = Sorter(BubbleSort())
print(sorter.sort([3, 1, 4, 1, 5, 9, 2, 6]))`,
          language: "python",
        },
      ],
      quiz: [
        { question: "单例模式的目的是什么？", options: ["创建多个实例", "确保一个类只有一个实例", "加速创建过程", "减少内存使用"], answer: 1, explanation: "单例模式确保一个类在整个应用程序中只有一个实例，并提供全局访问点。" },
        { question: "观察者模式适用于什么场景？", options: ["排序算法", "事件通知系统", "数据库连接", "文件操作"], answer: 1, explanation: "观察者模式适用于一个对象状态改变需要通知多个其他对象的场景，如事件系统。" },
      ],
    },
    "regex-deep": {
      slug: "regex-deep",
      sections: [
        {
          title: "贪婪与非贪婪匹配",
          content: `正则表达式的贪婪和非贪婪匹配决定了量词的行为方式。

贪婪匹配（默认）：
- 尽可能多地匹配字符
- 从左到右尝试，直到失败

非贪婪匹配（懒惰匹配）：
- 在量词后加 ? 使匹配尽可能少
- 如 *?、+?、??、{n,m}?`,
          code: `import re

text = '<div>内容1</div><div>内容2</div>'

# 贪婪匹配（默认）
greedy = re.findall(r'<div>.*</div>', text)
print("贪婪:", greedy)
# ['<div>内容1</div><div>内容2</div>']

# 非贪婪匹配
lazy = re.findall(r'<div>.*?</div>', text)
print("非贪婪:", lazy)
# ['<div>内容1</div>', '<div>内容2</div>']

# 实际应用：提取 HTML 内容
html = '<p>第一段</p><p>第二段</p><p>第三段</p>'
paragraphs = re.findall(r'<p>(.*?)</p>', html)
print("段落:", paragraphs)
# ['第一段', '第二段', '第三段']

# 提取引号中的内容
text2 = '他说"你好"，然后说"再见"'
quotes = re.findall(r'"(.*?)"', text2)
print("引号内容:", quotes)
# ['你好', '再见']`,
          language: "python",
        },
        {
          title: "分组与捕获",
          content: `分组是正则表达式的核心特性，用于捕获匹配的子串。

分组类型：
- 普通分组：(pattern)
- 命名分组：(?P<name>pattern)
- 非捕获分组：(?:pattern)
- 前向断言：(?=pattern)、(?<=pattern)
- 后向断言：(?!pattern)、(?<!pattern)`,
          code: `import re

# 普通分组
text = "2026-01-15"
match = re.search(r'(\\d{4})-(\\d{2})-(\\d{2})', text)
if match:
    print("完整匹配:", match.group(0))  # 2026-01-15
    print("年份:", match.group(1))      # 2026
    print("月份:", match.group(2))      # 01
    print("日期:", match.group(3))      # 15

# 命名分组
match = re.search(r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})', text)
if match:
    print("年份:", match.group('year'))
    print("月份:", match.group('month'))

# 非捕获分组
text = "http://example.com https://secure.com"
urls = re.findall(r'(?:http|https)://([^/]+)', text)
print("域名:", urls)

# 前向断言（肯定）
text = "价格: 100元 数量: 200"
numbers = re.findall(r'\\d+(?=元)', text)  # 后面是"元"的数字
print("价格:", numbers)  # ['100']

# 后向断言（肯定）
numbers2 = re.findall(r'(?<=数量: )\\d+', text)  # 前面是"数量: "的数字
print("数量:", numbers2)  # ['200']

# 分组替换
text = "张三 13812345678 李四 13987654321"
masked = re.sub(r'(\\d{3})\\d{4}(\\d{4})', r'\\1\\2', text)
print("脱敏:", masked)`,
          language: "python",
        },
        {
          title: "断言与零宽断言",
          content: `断言（零宽断言）匹配一个位置而不是字符，用于精确匹配。

四种零宽断言：
- (?=pattern)：肯定先行断言（后面是 pattern）
- (?!pattern)：否定先行断言（后面不是 pattern）
- (?<=pattern)：肯定后行断言（前面是 pattern）
- (?<!pattern)：否定后行断言（前面不是 pattern）`,
          code: `import re

# 肯定先行断言 (?=...)
# 匹配后面跟着 "元" 的数字
text = "价格: 100元 数量: 200个"
result = re.findall(r'\\d+(?=元)', text)
print("价格:", result)  # ['100']

# 否定先行断言 (?!...)
# 匹配后面不跟着 "个" 的数字
result2 = re.findall(r'\\d+(?!个)', text)
print("不含个的数字:", result2)

# 肯定后行断言 (?<=...)
# 匹配前面是 "价格: " 的数字
result3 = re.findall(r'(?<=价格: )\\d+', text)
print("价格:", result3)  # ['100']

# 否定后行断言 (?<!...)
# 匹配前面不是 "价格: " 的数字
result4 = re.findall(r'(?<!价格: )\\d+', text)
print("其他数字:", result4)

# 实际应用：提取 HTML 标签内容（不使用分组）
html = '<b>粗体</b> 和 <i>斜体</i>'
tags = re.findall(r'(?<=<b>).*?(?=</b>)', html)
print("粗体内容:", tags)

# 密码强度验证
def check_password(password):
    patterns = {
        '长度': r'(?=^.{8,})',
        '大写字母': r'(?=.*[A-Z])',
        '小写字母': r'(?=.*[a-z])',
        '数字': r'(?=.*\\d)',
        '特殊字符': r'(?=.*[@$!%*?&])'
    }
    for name, pattern in patterns.items():
        if not re.search(pattern, password):
            return f"缺少: {name}"
    return "密码强度合格"

print(check_password("Abc123@#"))`,
          language: "python",
        },
      ],
      quiz: [
        { question: "贪婪匹配和非贪婪匹配的区别是什么？", options: ["没有区别", "贪婪尽可能多匹配，非贪婪尽可能少匹配", "贪婪更快", "非贪婪更准确"], answer: 1, explanation: "贪婪匹配（默认）尽可能多地匹配字符，非贪婪匹配（在量词后加 ?）尽可能少地匹配。" },
        { question: "零宽断言的作用是什么？", options: ["匹配字符", "匹配位置而不是字符", "替换文本", "分割字符串"], answer: 1, explanation: "零宽断言匹配一个位置（如单词边界、特定字符前后），不消耗字符。" },
        { question: "非捕获分组 (?:pattern) 的作用是什么？", options: ["不匹配", "分组但不捕获，不保存匹配结果", "只匹配一次", "否定匹配"], answer: 1, explanation: "非捕获分组用于分组但不保存匹配结果，可以提高性能或避免干扰 group() 索引。" },
      ],
    },
    "http-deep": {
      slug: "http-deep",
      sections: [
        {
          title: "HTTP/2 特性",
          content: `HTTP/2 是 HTTP 协议的重大改进，解决了 HTTP/1.1 的性能瓶颈。

HTTP/2 核心特性：
- 多路复用：单个连接并行处理多个请求
- 头部压缩：HPACK 压缩算法
- 服务器推送：主动推送资源
- 流优先级：控制资源加载优先级
- 二进制分帧：更高效的解析`,
          code: `# HTTP/2 vs HTTP/1.1 对比

# HTTP/1.1：每个请求需要一个 TCP 连接
GET /index.html HTTP/1.1
Host: example.com

# HTTP/2：单个连接并行处理
# 多路复用示例
stream_id: 1
GET /index.html

stream_id: 3
GET /style.css

stream_id: 5
GET /script.js

# 头部压缩对比
# HTTP/1.1 每次请求都发送完整头部
User-Agent: Mozilla/5.0...
Accept: text/html
Accept-Language: zh-CN

# HTTP/2 使用 HPACK 压缩
# 首次请求发送完整头部
# 后续请求只发送差异部分

# 服务器推送
# 服务器预测客户端需要的资源并主动推送
# 客户端请求 index.html
# 服务器同时推送 style.css 和 script.js`,
          language: "http",
        },
        {
          title: "HTTP 缓存策略",
          content: `HTTP 缓存可以显著提升性能，减少网络请求。

缓存类型：
- 强缓存：直接使用本地缓存
- 协商缓存：向服务器验证缓存是否有效

缓存控制头：
- Cache-Control：控制缓存行为
- ETag/If-None-Match：基于内容的验证
- Last-Modified/If-Modified-Since：基于时间的验证`,
          code: `# 强缓存
# Cache-Control 头
Cache-Control: max-age=3600        # 缓存1小时
Cache-Control: no-cache            # 每次必须验证
Cache-Control: no-store            # 完全不缓存
Cache-Control: public              # 可以被任何缓存存储
Cache-Control: private             # 只能被浏览器缓存

# 协商缓存
# ETag（基于内容哈希）
ETag: "33a64df5"

# 客户端发送验证请求
If-None-Match: "33a64df5"

# 服务器响应
# 如果内容未改变
HTTP/1.1 304 Not Modified

# 如果内容已改变
HTTP/1.1 200 OK
ETag: "686897696a7c876b7e"

# Last-Modified（基于时间）
Last-Modified: Wed, 21 Oct 2026 07:28:00 GMT

# 客户端发送验证请求
If-Modified-Since: Wed, 21 Oct 2026 07:28:00 GMT

# 最佳实践示例
# 静态资源（带 hash）
Cache-Control: max-age=31536000, immutable

# HTML 文件
Cache-Control: no-cache

# API 响应
Cache-Control: no-store`,
          language: "http",
        },
        {
          title: "HTTP/3 与 QUIC",
          content: `HTTP/3 基于 QUIC 协议，解决了 TCP 的队头阻塞问题。

HTTP/3 特点：
- 基于 UDP 的 QUIC 协议
- 0-RTT 连接建立
- 无队头阻塞
- 连接迁移（网络切换不断开）
- 内置 TLS 1.3`,
          code: `# HTTP/3 协议栈对比

# HTTP/1.1 和 HTTP/2
应用层: HTTP/1.1 或 HTTP/2
安全层: TLS 1.2/1.3（可选）
传输层: TCP

# HTTP/3
应用层: HTTP/3
传输层: QUIC（基于 UDP）
安全层: TLS 1.3（内置）

# 连接建立对比
# HTTP/2 (TCP + TLS)
客户端                服务器
  |---- SYN ----------->|
  |<--- SYN-ACK --------|
  |---- ACK ----------->|
  |---- ClientHello --->|
  |<--- ServerHello ----|
  |---- Finished ------->|
  |<--- Finished -------|
  |                      |
  总计: 2-3 RTT

# HTTP/3 (QUIC)
客户端                服务器
  |---- Initial -------->|
  |<--- Initial ---------|
  |---- Handshake ------>|
  |<--- Handshake -------|
  |                      |
  总计: 1 RTT (首次)
  0 RTT (后续连接)`,
          language: "text",
        },
      ],
      quiz: [
        { question: "HTTP/2 多路复用的作用是什么？", options: ["加密数据", "单个连接并行处理多个请求", "压缩头部", "服务器推送"], answer: 1, explanation: "多路复用允许在单个 TCP 连接上同时发送多个请求和响应，解决了 HTTP/1.1 的队头阻塞问题。" },
        { question: "HTTP 缓存中 ETag 的作用是什么？", options: ["控制缓存时间", "基于内容哈希验证缓存是否有效", "标记资源版本", "压缩响应"], answer: 1, explanation: "ETag 是资源内容的哈希值，客户端可以通过 If-None-Match 头验证缓存是否仍然有效。" },
        { question: "HTTP/3 基于什么协议？", options: ["TCP", "UDP", "QUIC", "WebSocket"], answer: 2, explanation: "HTTP/3 基于 QUIC 协议，QUIC 建立在 UDP 之上，解决了 TCP 的队头阻塞问题。" },
      ],
    },
    "tcp-deep": {
      slug: "tcp-deep",
      sections: [
        {
          title: "TCP 拥塞控制",
          content: `TCP 拥塞控制防止网络过载，保证网络稳定性。

拥塞控制算法：
- 慢启动：指数增长拥塞窗口
- 拥塞避免：线性增长
- 快速重传：收到 3 个重复 ACK 立即重传
- 快速恢复：快速重传后不回到慢启动`,
          code: `# TCP 拥塞控制过程

# 慢启动阶段
# 初始拥塞窗口 cwnd = 1 MSS
# 每收到一个 ACK，cwnd += 1 MSS

# 时间 0: cwnd = 1
# 发送 1 个段

# 时间 1: 收到 ACK，cwnd = 2
# 发送 2 个段

# 时间 2: 收到 2 个 ACK，cwnd = 4
# 发送 4 个段

# 时间 3: 收到 4 个 ACK，cwnd = 8
# 发送 8 个段

# 拥塞避免阶段
# 当 cwnd >= ssthresh（慢启动阈值）
# 每个 RTT，cwnd += 1 MSS（线性增长）

# 快速重传
# 收到 3 个重复 ACK
# 立即重传丢失的段
# ssthresh = cwnd / 2
# cwnd = ssthresh + 3

# 快速恢复
# 快速重传后
# 每收到一个重复 ACK，cwnd += 1
# 收到新数据的 ACK，退出快速恢复

# 现代拥塞控制算法
# CUBIC（Linux 默认）
# BBR（Google）`,
          language: "text",
        },
        {
          title: "TCP 流量控制",
          content: `TCP 流量控制防止发送方发送过快导致接收方缓冲区溢出。

机制：
- 滑动窗口：接收方通告可用缓冲区大小
- 零窗口：接收方缓冲区满时发送零窗口
- 窗口探测：定期查询零窗口是否打开
- 延迟确认：减少 ACK 数量`,
          code: `# TCP 滑动窗口机制

# 接收方通告窗口大小
# 假设接收方缓冲区大小为 4096 字节

# 发送方                    接收方
# |                        |
# |--- 数据 (1-1000) ----->|
# |                        | 缓冲区: 3096 可用
# |<--- ACK 1000, Win=3000-|
# |                        |
# |--- 数据 (1001-2000) -->|
# |                        | 缓冲区: 2096 可用
# |<--- ACK 2000, Win=2000-|
# |                        |
# |--- 数据 (2001-3000) -->|
# |                        | 缓冲区: 1096 可用
# |<--- ACK 3000, Win=1000-|
# |                        |
# |--- 数据 (3001-3500) -->|
# |                        | 缓冲区: 596 可用
# |<--- ACK 3500, Win=500--|
# |                        |
# |--- 数据 (3501-4000) -->|
# |                        | 缓冲区: 0 (满)
# |<--- ACK 4000, Win=0----|

# 零窗口处理
# 发送方停止发送数据
# 定期发送窗口探测段
# 接收方缓冲区有空间后发送窗口更新

# Nagle 算法
# 合并小数据包减少网络开销
# 禁用：TCP_NODELAY 选项`,
          language: "text",
        },
        {
          title: "TCP 调优",
          content: `TCP 调优可以优化网络性能。

关键参数：
- 缓冲区大小
- 超时时间
- 重传策略
- 窗口缩放`,
          code: `# Linux TCP 调优参数

# 查看当前配置
sysctl net.ipv4.tcp_rmem
sysctl net.ipv4.tcp_wmem
sysctl net.core.somaxconn

# 缓冲区大小
# net.ipv4.tcp_rmem = 4096 131072 6291456
# min default max（接收缓冲区）

# net.ipv4.tcp_wmem = 4096 65536 6291456
# min default max（发送缓冲区）

# 设置更大的缓冲区
sudo sysctl -w net.core.rmem_max=16777216
sudo sysctl -w net.core.wmem_max=16777216
sudo sysctl -w net.ipv4.tcp_rmem="4096 87380 16777216"
sudo sysctl -w net.ipv4.tcp_wmem="4096 65536 16777216"

# 连接队列
# net.core.somaxconn = 4096
# 最大监听队列长度

# net.ipv4.tcp_max_syn_backlog = 8192
# SYN 队列长度

# 超时设置
# net.ipv4.tcp_fin_timeout = 15
# FIN-WAIT-2 超时时间

# net.ipv4.tcp_keepalive_time = 600
# keepalive 探测间隔

# 拥塞控制
# net.ipv4.tcp_congestion_control = cubic
# 可选：cubic, bbr

# 启用 BBR
sudo sysctl -w net.ipv4.tcp_congestion_control=bbr
sudo sysctl -w net.core.default_qdisc=fq`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "TCP 拥塞控制中慢启动的窗口增长方式是什么？", options: ["线性增长", "指数增长", "随机增长", "固定大小"], answer: 1, explanation: "慢启动阶段拥塞窗口指数增长，每收到一个 ACK 窗口增加 1 MSS。" },
        { question: "TCP 流量控制的作用是什么？", options: ["防止网络过载", "防止发送方发送过快导致接收方缓冲区溢出", "加密数据", "压缩数据"], answer: 1, explanation: "TCP 流量控制通过滑动窗口机制，让接收方控制发送方的发送速率，防止缓冲区溢出。" },
        { question: "Linux 中启用 BBR 拥塞控制的命令是？", options: ["sysctl -w net.ipv4.tcp_congestion_control=bbr", "iptables -A INPUT -j BBR", "tcpdump -i bbr", "netstat --bbr"], answer: 0, explanation: "使用 sysctl 命令设置 tcp_congestion_control 参数为 bbr 即可启用 BBR 算法。" },
      ],
    },
    "os-basics": {
      slug: "os-basics",
      sections: [
        {
          title: "进程与线程",
          content: `操作系统通过进程和线程实现并发执行。

进程：
- 资源分配的基本单位
- 独立的地址空间
- 进程间通信（IPC）：管道、共享内存、消息队列

线程：
- CPU 调度的基本单位
- 共享进程的地址空间
- 线程间同步：互斥锁、信号量`,
          code: `# Python 进程示例
import multiprocessing
import os

def worker():
    print(f"子进程 PID: {os.getpid()}, 父进程 PID: {os.getppid()}")

if __name__ == '__main__':
    print(f"主进程 PID: {os.getpid()}")

    # 创建进程
    processes = []
    for i in range(3):
        p = multiprocessing.Process(target=worker)
        processes.append(p)
        p.start()

    # 等待进程完成
    for p in processes:
        p.join()

# Python 线程示例
import threading
import time

def print_time(name, delay):
    for i in range(3):
        time.sleep(delay)
        print(f"{name}: {time.ctime()}")

# 创建线程
t1 = threading.Thread(target=print_time, args=("Thread-1", 2))
t2 = threading.Thread(target=print_time, args=("Thread-2", 3))

t1.start()
t2.start()

# 等待线程完成
t1.join()
t2.join()`,
          language: "python",
        },
        {
          title: "内存管理",
          content: `操作系统负责内存的分配和管理。

内存管理技术：
- 虚拟内存：每个进程有独立的地址空间
- 分页：将内存分成固定大小的页
- 分段：按逻辑单位划分内存
- 页面置换：内存不足时换出页面`,
          code: `# 虚拟内存概念
# 每个进程有独立的虚拟地址空间
# 通过页表映射到物理内存

# 进程虚拟地址空间布局（Linux x86-64）
# +------------------+
# |      栈          | <- 向下增长（局部变量、函数调用）
# |                  |
# +------------------+
# |      ↓           |
# |                  |
# |      ↑           |
# +------------------+
# |      堆          | <- 向上增长（动态分配）
# +------------------+
# |      BSS        | <- 未初始化全局变量
# +------------------+
# |      数据段      | <- 已初始化全局变量
# +------------------+
# |      代码段      | <- 程序代码（只读）
# +------------------+

# 页面置换算法
# FIFO：先进先出
# LRU：最近最少使用
# LFU：最不经常使用
# Clock：时钟算法

# 碎片问题
# 内碎片：分配给进程的内存大于实际需要
# 外碎片：内存中存在大量小的空闲块

# 解决方案
# 分页：消除外碎片
# 段页式：结合分段和分页的优点`,
          language: "text",
        },
        {
          title: "文件系统",
          content: `文件系统负责组织和管理存储设备上的数据。

文件系统类型：
- ext4：Linux 默认文件系统
- NTFS：Windows 文件系统
- APFS：Apple 文件系统
- FAT32：通用但有大小限制

文件系统结构：
- 超级块：文件系统元数据
- inode：文件元数据（不包含文件名）
- 数据块：实际文件内容
- 目录项：文件名到 inode 的映射`,
          code: `# Linux 文件系统操作

# 查看文件系统信息
df -h                    # 磁盘空间使用
df -T                    # 文件系统类型
mount                    # 挂载点信息

# inode 信息
ls -i file.txt           # 查看 inode 号
stat file.txt            # 详细 inode 信息
df -i                    # inode 使用情况

# 文件类型
ls -la
# - 普通文件
# d 目录
# l 符号链接
# b 块设备
# c 字符设备
# p 命名管道
# s 套接字

# 文件权限
chmod 755 file.txt       # rwxr-xr-x
chmod u+x file.txt       # 给所有者添加执行权限
chown user:group file    # 修改所有者和组

# 硬链接和软链接
ln source link_name      # 硬链接
ln -s source link_name   # 软链接（符号链接）

# 硬链接：共享 inode，不能跨文件系统
# 软链接：独立 inode，存储目标路径`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "进程和线程的主要区别是什么？", options: ["没有区别", "进程有独立地址空间，线程共享地址空间", "线程更重", "进程不能并发"], answer: 1, explanation: "进程是资源分配的基本单位，有独立的地址空间；线程是 CPU 调度的基本单位，共享进程的地址空间。" },
        { question: "虚拟内存的作用是什么？", options: ["增加物理内存", "为每个进程提供独立的地址空间", "加密内存", "压缩内存"], answer: 1, explanation: "虚拟内存让每个进程认为自己拥有完整的地址空间，通过页表映射到物理内存。" },
        { question: "Linux 中 inode 存储什么信息？", options: ["文件名", "文件权限、大小、时间戳等元数据", "文件内容", "目录结构"], answer: 1, explanation: "inode 存储文件的元数据（权限、大小、时间戳等），但不包含文件名和实际内容。" },
      ],
    },
    "compiler-basics": {
      slug: "compiler-basics",
      sections: [
        {
          title: "编译过程概述",
          content: `编译器将源代码转换为可执行程序的过程。

编译的四个阶段：
- 词法分析：将字符流转换为记号流
- 语法分析：将记号流转换为抽象语法树（AST）
- 语义分析：检查类型、作用域等
- 代码生成：生成目标代码`,
          code: `# 编译过程示意

源代码 (Source Code)
    |
    v
[词法分析] (Lexical Analysis)
    |
    v
记号流 (Token Stream)
    |
    v
[语法分析] (Syntax Analysis)
    |
    v
抽象语法树 (AST)
    |
    v
[语义分析] (Semantic Analysis)
    |
    v
标注的 AST (Annotated AST)
    |
    v
[中间代码生成] (IR Generation)
    |
    v
中间表示 (IR)
    |
    v
[优化] (Optimization)
    |
    v
优化的 IR
    |
    v
[目标代码生成] (Code Generation)
    |
    v
目标代码 (Object Code)
    |
    v
[链接] (Linking)
    |
    v
可执行程序

# 示例：编译 C 程序
# gcc -O2 -o program main.c

# 分步执行
gcc -E main.c -o main.i      # 预处理
gcc -S main.i -o main.s      # 编译为汇编
gcc -c main.s -o main.o      # 汇编为目标文件
gcc main.o -o program        # 链接生成可执行文件`,
          language: "text",
        },
        {
          title: "词法分析",
          content: `词法分析器（Lexer）将源代码字符流转换为记号（Token）流。

记号类型：
- 关键字：if、else、while、int
- 标识符：变量名、函数名
- 字面量：数字、字符串
- 运算符：+、-、*、/、=
- 分隔符：;、(、)、{、}`,
          code: `# 词法分析器示例（Python 实现）

import re

# 定义记号类型
TOKEN_TYPES = [
    ('NUMBER', r'\\d+'),
    ('IDENT', r'[a-zA-Z_][a-zA-Z0-9_]*'),
    ('PLUS', r'\\+'),
    ('MINUS', r'-'),
    ('MULTIPLY', r'\\*'),
    ('DIVIDE', r'/'),
    ('ASSIGN', r'='),
    ('LPAREN', r'\\('),
    ('RPAREN', r'\\)'),
    ('LBRACE', r'\\{'),
    ('RBRACE', r'\\}'),
    ('SEMICOLON', r';'),
    ('WHITESPACE', r'\\s+'),  # 忽略空白
]

# 关键字
KEYWORDS = {'if', 'else', 'while', 'int', 'return', 'void'}

def tokenize(code):
    tokens = []
    pos = 0

    while pos < len(code):
        match = None
        for token_type, pattern in TOKEN_TYPES:
            regex = re.compile(pattern)
            match = regex.match(code, pos)
            if match:
                value = match.group()
                if token_type == 'WHITESPACE':
                    pos = match.end()
                    break
                elif token_type == 'IDENT' and value in KEYWORDS:
                    token_type = 'KEYWORD'
                tokens.append((token_type, value))
                pos = match.end()
                break

        if not match:
            raise SyntaxError(f'Unexpected character at position {pos}')

    return tokens

# 测试
code = 'int x = 10 + 20;'
tokens = tokenize(code)
for token_type, value in tokens:
    print(f'{token_type}: {value}')`,
          language: "python",
        },
        {
          title: "语法分析",
          content: `语法分析器（Parser）将记号流转换为抽象语法树（AST）。

语法分析方法：
- 自顶向下：递归下降、LL 解析
- 自底向上：LR 解析、LALR 解析
- 混合方法：PEG 解析`,
          code: `# 简单的递归下降解析器

class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    def current_token(self):
        if self.pos < len(self.tokens):
            return self.tokens[self.pos]
        return None

    def eat(self, expected_type):
        token = self.current_token()
        if token and token[0] == expected_type:
            self.pos += 1
            return token
        raise SyntaxError(f'Expected {expected_type}, got {token}')

    # 表达式解析
    def expr(self):
        node = self.term()
        while self.current_token() and self.current_token()[0] in ('PLUS', 'MINUS'):
            op = self.eat(self.current_token()[0])
            right = self.term()
            node = ('binop', op[1], node, right)
        return node

    def term(self):
        node = self.factor()
        while self.current_token() and self.current_token()[0] in ('MULTIPLY', 'DIVIDE'):
            op = self.eat(self.current_token()[0])
            right = self.factor()
            node = ('binop', op[1], node, right)
        return node

    def factor(self):
        token = self.current_token()
        if token[0] == 'NUMBER':
            self.pos += 1
            return ('number', int(token[1]))
        elif token[0] == 'IDENT':
            self.pos += 1
            return ('identifier', token[1])
        elif token[0] == 'LPAREN':
            self.eat('LPAREN')
            node = self.expr()
            self.eat('RPAREN')
            return node
        raise SyntaxError(f'Unexpected token: {token}')

# AST 节点示例
# 表达式: 1 + 2 * 3
# AST: ('binop', '+', ('number', 1), ('binop', '*', ('number', 2), ('number', 3)))`,
          language: "python",
        },
      ],
      quiz: [
        { question: "编译器的四个主要阶段是什么？", options: ["解析、执行、调试、优化", "词法分析、语法分析、语义分析、代码生成", "编码、编译、链接、运行", "设计、实现、测试、部署"], answer: 1, explanation: "编译器的主要阶段是：词法分析（Token化）、语法分析（构建AST）、语义分析（类型检查）、代码生成（生成目标代码）。" },
        { question: "词法分析的输入和输出分别是什么？", options: ["输入AST，输出代码", "输入字符流，输出记号流", "输入记号，输出AST", "输入代码，输出可执行文件"], answer: 1, explanation: "词法分析器将源代码字符流转换为记号（Token）流，是编译的第一步。" },
        { question: "抽象语法树（AST）的作用是什么？", options: ["存储变量", "表示程序的结构化表示", "执行代码", "优化性能"], answer: 1, explanation: "AST 是程序的树状结构表示，保留了程序的语法结构，便于后续分析和代码生成。" },
      ],
    },
  },
};

export function getTutorialContent(categoryId: string, slug: string): TutorialContent | undefined {
  return tutorialContents[categoryId]?.[slug];
}

export default tutorialContents;
