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

**Linux 的特点：**
- 开源免费，社区驱动
- 稳定性和安全性高
- 多用户、多任务
- 支持多种硬件平台
- 强大的命令行工具`,
        },
        {
          title: "Linux 发行版",
          content: `Linux 发行版是将 Linux 内核与各种工具、软件打包在一起的完整操作系统。

**常用发行版：**
- **Ubuntu**：最适合初学者，社区活跃
- **CentOS/RHEL**：企业级服务器首选
- **Debian**：稳定性极高，服务器常用
- **Fedora**：技术创新，新特性先行
- **Arch Linux**：滚动更新，适合高级用户
- **Alpine**：轻量级，容器常用`,
        },
        {
          title: "基本概念",
          content: `**Linux 系统结构：**
- 内核（Kernel）：管理硬件和系统资源
- Shell：命令解释器，bash/zsh
- 文件系统：一切皆文件
- 用户空间与内核空间

**Linux 文件系统层级：**
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
          content: `**ls 命令 - 列出目录内容：**`,
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
          content: `**cd 命令 - 切换目录：**`,
          code: `$ cd /path/to/dir    # 切换到指定目录
$ cd ~               # 切换到家目录
$ cd -               # 切换到上一次的目录
$ cd ..              # 切换到上级目录
$ cd /               # 切换到根目录

**pwd 命令 - 显示当前目录：**
$ pwd
/home/user/projects

**mkdir 命令 - 创建目录：**
$ mkdir newdir           # 创建目录
$ mkdir -p a/b/c         # 递归创建多级目录
$ mkdir -m 755 newdir    # 创建并设置权限`,
          language: "bash",
        },
        {
          title: "文件操作",
          content: `**cp 命令 - 复制文件/目录：**`,
          code: `$ cp file1 file2         # 复制文件
$ cp -r dir1 dir2        # 递归复制目录
$ cp -p file1 file2      # 保留权限和时间戳
$ cp -i file1 file2      # 覆盖前询问
$ cp -v file1 file2      # 显示复制过程

**mv 命令 - 移动/重命名：**
$ mv file1 file2         # 重命名
$ mv file1 /path/to/     # 移动文件
$ mv -i file1 file2      # 覆盖前询问
$ mv -v file1 file2      # 显示移动过程

**rm 命令 - 删除文件/目录：**
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
          content: `**查看文件内容：**`,
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
          content: `**find 命令 - 强大的文件查找工具：**`,
          code: `$ find /path -name "*.log"              # 按名称查找
$ find . -type f -name "*.py"           # 查找所有.py文件
$ find . -type d -name "test"           # 查找目录
$ find . -size +100M                    # 查找大于100M的文件
$ find . -mtime -7                      # 最近7天修改的文件
$ find . -perm 755                      # 按权限查找
$ find . -name "*.tmp" -exec rm {} \;   # 查找并删除
$ find . -empty                         # 查找空文件/目录

**locate 命令 - 快速查找（基于索引）：**
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
          content: `**排序与去重：**`,
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
          content: `**管道与重定向是 Linux 的灵魂：**`,
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
          content: `**ps 命令 - 查看进程快照：**`,
          code: `$ ps aux                          # 查看所有进程
$ ps aux | grep nginx             # 查找特定进程
$ ps -ef                           # 全格式显示
$ ps -eo pid,ppid,user,%cpu,%mem,cmd  # 自定义输出列
$ ps -ef --forest                  # 树状显示进程关系`,
          language: "bash",
        },
        {
          title: "实时监控",
          content: `**top / htop - 实时进程监控：**`,
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
          content: `**kill 命令 - 终止进程：**`,
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
          content: `**systemd 服务管理（CentOS 7+ / Ubuntu 16+）：**`,
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
          content: `**查看网络接口和IP：**`,
          code: `$ ip addr                          # 查看所有网络接口
$ ip addr show eth0                # 查看特定接口
$ ifconfig                         # 旧式查看（部分系统已移除）
$ ip route                         # 查看路由表
$ ip link show                     # 查看链路状态`,
          language: "bash",
        },
        {
          title: "端口与连接",
          content: `**查看端口和网络连接：**`,
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
          content: `**测试网络连通性：**`,
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
          content: `**DNS 解析查询：**`,
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

- **DQL（数据查询语言）**：SELECT
- **DML（数据操作语言）**：INSERT, UPDATE, DELETE
- **DDL（数据定义语言）**：CREATE, ALTER, DROP
- **DCL（数据控制语言）**：GRANT, REVOKE
- **TCL（事务控制语言）**：BEGIN, COMMIT, ROLLBACK`,
        },
        {
          title: "数据库操作",
          content: `**创建和管理数据库：**`,
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
          content: `**创建和管理表：**`,
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
          content: `**常用数据类型：**
- **整数**：TINYINT, SMALLINT, INT, BIGINT
- **浮点数**：FLOAT, DOUBLE, DECIMAL
- **字符串**：CHAR, VARCHAR, TEXT, BLOB
- **日期时间**：DATE, TIME, DATETIME, TIMESTAMP
- **布尔**：BOOLEAN（实际是TINYINT）`,
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
          content: `**SELECT 语句基础：**`,
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
          content: `**ORDER BY 和 LIMIT：**`,
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
          content: `**WHERE 子句中的运算符：**`,
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
          content: `**内连接 - 返回两表都匹配的行：**`,
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
          content: `**左连接 - 返回左表所有行，右表无匹配则为NULL：**`,
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
          content: `**右连接和全连接：**`,
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
          content: `**COUNT, SUM, AVG, MAX, MIN：**`,
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
          content: `**分组统计：**`,
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

**Docker 的核心概念：**
- **镜像（Image）**：只读模板，包含运行应用所需的一切
- **容器（Container）**：镜像的运行实例
- **仓库（Registry）**：存储和分发镜像的服务（如 Docker Hub）
- **Dockerfile**：构建镜像的脚本`,
        },
        {
          title: "安装 Docker",
          content: `**Ubuntu 安装：**`,
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
          content: `**镜像操作：**`,
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
          content: `**运行和管理容器：**`,
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
          content: `**FROM** - 指定基础镜像：`,
          code: `FROM node:20-alpine           # 指定版本
FROM ubuntu:22.04             # 操作系统镜像
FROM scratch                  # 空镜像（用于静态编译）`,
          language: "dockerfile",
        },
        {
          title: "多阶段构建",
          content: `**多阶段构建减小镜像体积：**`,
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
          content: `**常用 Compose 命令：**`,
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

**Git 的核心概念：**
- **工作区（Working Directory）**：当前编辑的文件
- **暂存区（Staging Area）**：准备提交的文件
- **本地仓库（Local Repository）**：提交历史
- **远程仓库（Remote Repository）**：共享的仓库`,
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

**Nginx 的特点：**
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

**Python 的应用领域：**
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
  },
  network: {
    "tcp-ip": {
      slug: "tcp-ip",
      sections: [
        {
          title: "TCP 三次握手",
          content: `TCP 连接建立过程（三次握手）：

1. **SYN**：客户端发送 SYN=1, seq=x
2. **SYN-ACK**：服务器回复 SYN=1, ACK=1, seq=y, ack=x+1
3. **ACK**：客户端发送 ACK=1, seq=x+1, ack=y+1`,
          code: `# 使用 tcpdump 抓包观察三次握手
sudo tcpdump -i eth0 port 80 -nn

# 使用 ss 查看连接状态
ss -tn state established`,
          language: "bash",
        },
        {
          title: "TCP 四次挥手",
          content: `TCP 连接断开过程（四次挥手）：

1. **FIN**：主动方发送 FIN=1, seq=u
2. **ACK**：被动方回复 ACK=1, ack=u+1
3. **FIN**：被动方发送 FIN=1, seq=w
4. **ACK**：主动方回复 ACK=1, ack=w+1`,
        },
        {
          title: "TCP 状态机",
          content: `**TCP 连接的 11 种状态：**
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

**Redis 的特点：**
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
};

export function getTutorialContent(categoryId: string, slug: string): TutorialContent | undefined {
  return tutorialContents[categoryId]?.[slug];
}

export default tutorialContents;
