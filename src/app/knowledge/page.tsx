"use client";

import { useState, useEffect } from "react";
import { BookOpen, Code, Terminal, Search, ChevronRight, CheckCircle, XCircle, RotateCcw, Star } from "lucide-react";

// ==================== 知识数据 ====================

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  example?: string;
  tags: string[];
}

interface PracticeQuestion {
  id: string;
  scenario: string;
  question: string;
  answer: string[];
  hint: string;
  difficulty: "easy" | "medium" | "hard";
}

// Linux 知识库
const linuxKnowledge: KnowledgeItem[] = [
  { id: "l1", title: "文件操作", content: "ls -la 列出所有文件（含隐藏）\ncd 切换目录\ncp -r 复制目录\nmv 移动/重命名\nrm -rf 强制删除目录\nmkdir -p 创建多级目录\nchmod 755 修改权限\nchown user:group 修改属主", example: "ls -la /var/log", tags: ["文件", "目录", "权限"] },
  { id: "l2", title: "文本处理", content: "grep -rn 'pattern' 搜索文本\nsed -i 's/old/new/g' 替换\nawk '{print $1}' 列提取\ncat / file 查看文件\nhead/tail -n 20 查看前后20行\ntail -f 实时追踪日志\nwc -l 统计行数\nsort | uniq -c 排序去重计数", example: "grep -rn 'error' /var/log/", tags: ["grep", "sed", "awk", "日志"] },
  { id: "l3", title: "进程管理", content: "ps aux | grep name 查找进程\nkill -9 PID 强制杀进程\nkillall name 按名称杀\ntop/htop 实时监控\nnohup command & 后台运行\nsystemctl start/stop/status 服务管理\njobs / bg / fg 任务控制", example: "ps aux | grep nginx", tags: ["进程", "服务", "systemctl"] },
  { id: "l4", title: "网络命令", content: "ip addr / ifconfig 查看IP\nss -tlnp / netstat -tlnp 查看端口\ncurl -v URL 测试连通\nwget 下载文件\nping / traceroute 测试连通\nnslookup / dig DNS查询\nssh -p 22 user@host SSH连接", example: "ss -tlnp | grep :80", tags: ["网络", "端口", "SSH"] },
  { id: "l5", title: "磁盘与存储", content: "df -h 查看磁盘使用\nncdu / 分析磁盘占用\ndu -sh * 查看目录大小\nmount / umount 挂载卸载\nfdisk / parted 分区\nlsblk 查看块设备\niostat 查看IO状态", example: "df -h && du -sh /var/*", tags: ["磁盘", "存储", "IO"] },
  { id: "l6", title: "系统信息", content: "uname -a 系统信息\ncat /etc/os-release 发行版\nuptime 运行时间和负载\nfree -h 内存使用\nlscpu CPU信息\nwhoami / id 当前用户\nhistory 命令历史", example: "uname -a && free -h", tags: ["系统", "信息", "监控"] },
  { id: "l7", title: "压缩与解压", content: "tar -czf archive.tar.gz dir 压缩\ntar -xzf archive.tar.gz 解压\ntar -xjf archive.tar.bz2 解压bz2\nzip -r archive.zip dir 压缩zip\nunzip archive.zip 解压zip\ngzip / gunzip gzip压缩解压", example: "tar -czf backup.tar.gz /etc/", tags: ["压缩", "tar", "zip"] },
  { id: "l8", title: "用户管理", content: "useradd -m username 添加用户\npasswd username 设置密码\nuserdel -r username 删除用户\nusermod -aG sudo username 加sudo\ncat /etc/passwd 查看所有用户\nlast 查看登录记录", example: "useradd -m deploy && passwd deploy", tags: ["用户", "权限", "sudo"] },
];

// SQL 知识库
const sqlKnowledge: KnowledgeItem[] = [
  { id: "s1", title: "基础查询", content: "SELECT * FROM table 查询全部\nSELECT col1, col2 FROM table 指定列\nWHERE 条件过滤\nORDER BY col ASC/DESC 排序\nLIMIT n OFFSET m 分页\nDISTINCT 去重\nAS 别名", example: "SELECT name, email FROM users WHERE status = 'active' ORDER BY created_at DESC LIMIT 10", tags: ["SELECT", "WHERE", "排序"] },
  { id: "s2", title: "JOIN 连接", content: "INNER JOIN 两表交集\nLEFT JOIN 左表全部+右表匹配\nRIGHT JOIN 右表全部+左表匹配\nFULL OUTER JOIN 两表全部\nCROSS JOIN 笛卡尔积\nON 连接条件\nUSING 简化同名连接", example: "SELECT u.name, o.amount FROM users u INNER JOIN orders o ON u.id = o.user_id", tags: ["JOIN", "连接", "多表"] },
  { id: "s3", title: "聚合函数", content: "COUNT(*) 统计行数\nSUM(col) 求和\nAVG(col) 平均值\nMAX/MIN 最大最小\nGROUP BY 分组\nHAVING 分组后过滤\nGROUP_CONCAT 分组拼接", example: "SELECT department, COUNT(*), AVG(salary) FROM employees GROUP BY department HAVING COUNT(*) > 5", tags: ["聚合", "GROUP BY", "统计"] },
  { id: "s4", title: "子查询", content: "WHERE IN (SELECT ...) 子查询\nFROM (SELECT ...) 派生表\nEXISTS 存在性判断\nANY/SOME 比较任一\nALL 比较全部\n correlated 子查询关联外层", example: "SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000)", tags: ["子查询", "IN", "EXISTS"] },
  { id: "s5", title: "数据操作", content: "INSERT INTO table (cols) VALUES (...) 插入\nINSERT INTO table SELECT ... 批量插入\nUPDATE table SET col=val WHERE ... 更新\nDELETE FROM table WHERE ... 删除\nREPLACE INTO 替换插入\nON DUPLICATE KEY UPDATE 冲突更新", example: "UPDATE users SET status = 'inactive' WHERE last_login < '2024-01-01'", tags: ["INSERT", "UPDATE", "DELETE"] },
  { id: "s6", title: "索引与优化", content: "CREATE INDEX idx_name ON table(col) 创建索引\n联合索引最左前缀\nEXPLAIN 分析查询计划\n避免 SELECT *\n避免在WHERE中对字段运算\n合理使用覆盖索引\n慢查询日志分析", example: "EXPLAIN SELECT * FROM orders WHERE user_id = 100 AND status = 'paid'", tags: ["索引", "优化", "EXPLAIN"] },
  { id: "s7", title: "事务与锁", content: "BEGIN / START TRANSACTION 开启\nCOMMIT 提交\nROLLBACK 回滚\nSAVEPOINT 保存点\nSELECT ... FOR UPDATE 行锁\n死锁排查：SHOW ENGINE INNODB STATUS\n隔离级别：READ COMMITTED / REPEATABLE READ", example: "BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; COMMIT;", tags: ["事务", "锁", "ACID"] },
  { id: "s8", title: "窗口函数", content: "ROW_NUMBER() 行号\nRANK() / DENSE_RANK() 排名\nLAG/LEAD 前后行\nSUM() OVER(PARTITION BY ... ROWS ...) 滑动窗口\nNTILE(n) 分组\nFIRST_VALUE / LAST_VALUE", example: "SELECT name, salary, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) as rank FROM employees", tags: ["窗口函数", "ROW_NUMBER", "RANK"] },
];

// 故障排查知识库
const troubleshootKnowledge: KnowledgeItem[] = [
  { id: "t1", title: "Web 服务 502/503", content: "502 Bad Gateway：上游服务未启动或崩溃\n1. 检查后端进程是否存活：ps aux | grep app\n2. 检查端口监听：ss -tlnp | grep :8080\n3. 检查 nginx upstream 配置\n4. 查看错误日志：tail -f /var/log/nginx/error.log\n5. 检查防火墙：iptables -L", example: "tail -f /var/log/nginx/error.log && ss -tlnp | grep :8080", tags: ["502", "503", "Nginx", "网关"] },
  { id: "t2", title: "磁盘空间不足", content: "1. df -h 查看使用率\n2. du -sh /* | sort -rh | head 定位大目录\n3. du -sh /var/log/* 查日志\n4. 清理：journalctl --vacuum-size=100M\n5. 清理旧日志：find /var/log -name '*.gz' -mtime +30 -delete\n6. 检查已删除但未释放：lsof +D /path", example: "df -h && du -sh /* | sort -rh | head -10", tags: ["磁盘", "空间", "df", "du"] },
  { id: "t3", title: "内存 OOM", content: "1. free -h 查看内存\n2. top -o %MEM 按内存排序\n3. dmesg | grep -i oom 查看OOM记录\n4. 限制容器内存：docker run --memory=512m\n5. 调整oom_score_adj\n6. 检查内存泄漏：pmap -x PID", example: "free -h && dmesg | grep -i 'out of memory' | tail -5", tags: ["OOM", "内存", "OOM Killer"] },
  { id: "t4", title: "SSH 连接问题", content: "1. Connection refused：sshd未运行或端口错\n2. Permission denied：检查密码/密钥\n3. Host key changed：ssh-keygen -R host\n4. Too many auth failures：IdentityOnly yes\n5. 连接慢：UseDNS no\n6. Debug：ssh -vvv user@host", example: "ssh -vvv user@host 2>&1 | head -50", tags: ["SSH", "连接", "认证"] },
  { id: "t5", title: "Docker 容器问题", content: "1. 容器退出：docker logs container_name\n2. 无法启动：检查端口冲突 docker ps -a\n3. 网络不通：docker network inspect\n4. 磁盘满：docker system prune -a\n5. 权限问题：检查挂载目录权限\n6. 健康检查失败：docker inspect --format='{{.State.Health}}'", example: "docker logs -f container_name && docker stats", tags: ["Docker", "容器", "日志"] },
  { id: "t6", title: "MySQL 性能问题", content: "1. 慢查询：SHOW VARIABLES LIKE 'slow_query%'\n2. 连接数：SHOW STATUS LIKE 'Threads%'\n3. 锁等待：SELECT * FROM information_schema.INNODB_LOCKS\n4. 死锁：SHOW ENGINE INNODB STATUS\n5. 表优化：OPTIMIZE TABLE table_name\n6. 索引分析：SHOW INDEX FROM table_name", example: "SHOW PROCESSLIST; SHOW STATUS LIKE 'Slow_queries';", tags: ["MySQL", "慢查询", "死锁", "性能"] },
  { id: "t7", title: "网络不通排查", content: "1. ping 目标 - 检查基础连通\n2. traceroute 目标 - 检查路由\n3. telnet host port - 检查端口\n4. curl -v URL - 检查HTTP\n5. ss -tlnp - 检查本地监听\n6. iptables -L - 检查防火墙\n7. nslookup - 检查DNS", example: "ping -c 3 8.8.8.8 && traceroute 8.8.8.8 && curl -v https://google.com", tags: ["网络", "ping", "traceroute", "DNS"] },
  { id: "t8", title: "证书过期问题", content: "1. 查看证书：openssl x509 -in cert.pem -noout -dates\n2. 检查链：openssl s_client -connect host:443\n3. 自签证书：openssl req -x509 -nodes -days 365 ...\n4. 更新Let's Encrypt：certbot renew\n5. 检查证书匹配：openssl x509 -noout -modulus -in cert.pem | md5sum", example: "echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates", tags: ["证书", "SSL", "TLS", "HTTPS"] },
];

// 练习题
const practiceQuestions: Record<string, PracticeQuestion[]> = {
  linux: [
    { id: "lp1", scenario: "你需要查看 /var/log/nginx/ 目录下所有文件的详细信息", question: "请输入命令：", answer: ["ls -la /var/log/nginx/", "ls -al /var/log/nginx/", "ls -la /var/log/nginx", "ls -al /var/log/nginx"], hint: "使用 ls 加 -l（详细）和 -a（隐藏文件）选项", difficulty: "easy" },
    { id: "lp2", scenario: "服务器磁盘满了，你需要找出 /var 目录下最大的5个子目录", question: "请输入命令：", answer: ["du -sh /var/* | sort -rh | head -5", "du -sh /var/*/ | sort -rh | head -5", "du -sh /var/* | sort -rn | head -5", "du -sh /var/*/ | sort -rn | head -5"], hint: "用 du 统计目录大小，sort 排序，head 取前5", difficulty: "medium" },
    { id: "lp3", scenario: "有个进程 CPU 占用很高，你想找到它的 PID 并强制终止", question: "请输入两步命令（用 ; 或 && 分隔）：", answer: ["top -bn1 | grep process_name | awk '{print $1}' | xargs kill -9", "ps aux | grep process_name | grep -v grep | awk '{print $2}' | xargs kill -9", "pgrep process_name | xargs kill -9", "pidof process_name | xargs kill -9"], hint: "先找到 PID，再用 kill -9 终止", difficulty: "medium" },
    { id: "lp4", scenario: "你想实时查看 /var/log/syslog 文件的最新日志", question: "请输入命令：", answer: ["tail -f /var/log/syslog", "tailf /var/log/syslog", "tail -f /var/log/syslog"], hint: "tail 命令的 -f 选项可以实时追踪文件更新", difficulty: "easy" },
    { id: "lp5", scenario: "你需要搜索当前目录下所有 .log 文件中包含 'ERROR' 的行", question: "请输入命令：", answer: ["grep -rn 'ERROR' ./*.log", "grep -r 'ERROR' *.log", "grep -rn 'ERROR' --include='*.log' .", "grep -rn ERROR *.log", "grep -rn 'ERROR' ."], hint: "使用 grep 的 -r 递归搜索和 -n 显示行号", difficulty: "medium" },
    { id: "lp6", scenario: "你想把文件 backup.tar.gz 解压到 /opt/ 目录", question: "请输入命令：", answer: ["tar -xzf backup.tar.gz -C /opt/", "tar -xzvf backup.tar.gz -C /opt/", "tar xzf backup.tar.gz -C /opt/", "tar -xzf backup.tar.gz --directory=/opt/"], hint: "tar 解压用 -x，-z 处理 gzip，-C 指定目标目录", difficulty: "medium" },
    { id: "lp7", scenario: "你需要查看服务器的公网 IP 地址", question: "请输入命令：", answer: ["curl ifconfig.me", "curl ip.sb", "curl icanhazip.com", "curl ipecho.net/plain", "curl checkip.amazonaws.com", "curl ipinfo.io/ip"], hint: "用 curl 访问一个返回 IP 的服务", difficulty: "easy" },
    { id: "lp8", scenario: "你需要找出占用端口 8080 的进程", question: "请输入命令：", answer: ["ss -tlnp | grep :8080", "netstat -tlnp | grep :8080", "lsof -i :8080", "ss -tlnp | grep 8080", "netstat -tlnp | grep 8080"], hint: "用 ss 或 netstat 查看端口监听，或用 lsof 查看端口占用", difficulty: "easy" },
  ],
  sql: [
    { id: "sp1", scenario: "查询 users 表中所有状态为 active 的用户，按创建时间倒序", question: "请输入 SQL：", answer: ["SELECT * FROM users WHERE status = 'active' ORDER BY created_at DESC", "SELECT * FROM users WHERE status='active' ORDER BY created_at DESC", "SELECT * FROM users WHERE status = 'active' ORDER BY created_at desc"], hint: "SELECT * + WHERE 条件 + ORDER BY DESC", difficulty: "easy" },
    { id: "sp2", scenario: "统计每个部门的员工数量，只显示员工数大于5的部门", question: "请输入 SQL：", answer: ["SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5", "SELECT department, COUNT(*) as cnt FROM employees GROUP BY department HAVING cnt > 5", "SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*)>5"], hint: "GROUP BY 分组 + HAVING 过滤分组结果", difficulty: "medium" },
    { id: "sp3", scenario: "查询每个用户的订单总数和总金额", question: "请输入 SQL：", answer: ["SELECT user_id, COUNT(*) as order_count, SUM(amount) as total_amount FROM orders GROUP BY user_id", "SELECT user_id, COUNT(*), SUM(amount) FROM orders GROUP BY user_id", "SELECT user_id, COUNT(*) as total_orders, SUM(amount) as total_amount FROM orders GROUP BY user_id"], hint: "用 COUNT 和 SUM 聚合函数配合 GROUP BY", difficulty: "medium" },
    { id: "sp4", scenario: "找出从未下过订单的用户", question: "请输入 SQL：", answer: ["SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM orders)", "SELECT * FROM users u WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)", "SELECT u.* FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE o.id IS NULL", "SELECT * FROM users WHERE id NOT IN (SELECT DISTINCT user_id FROM orders)"], hint: "用 NOT IN、NOT EXISTS 或 LEFT JOIN + IS NULL", difficulty: "hard" },
    { id: "sp5", scenario: "查询订单金额排名前10的用户", question: "请输入 SQL：", answer: ["SELECT user_id, SUM(amount) as total FROM orders GROUP BY user_id ORDER BY total DESC LIMIT 10", "SELECT user_id, SUM(amount) as total FROM orders GROUP BY user_id ORDER BY SUM(amount) DESC LIMIT 10", "SELECT user_id, SUM(amount) FROM orders GROUP BY user_id ORDER BY SUM(amount) DESC LIMIT 10"], hint: "GROUP BY + SUM + ORDER BY DESC + LIMIT", difficulty: "medium" },
    { id: "sp6", scenario: "在 users 表中添加一个 age 字段（整数类型，默认值 0）", question: "请输入 SQL：", answer: ["ALTER TABLE users ADD COLUMN age INT DEFAULT 0", "ALTER TABLE users ADD age INT DEFAULT 0", "ALTER TABLE users ADD COLUMN age INTEGER DEFAULT 0"], hint: "ALTER TABLE + ADD COLUMN", difficulty: "easy" },
    { id: "sp7", scenario: "查询每个用户最近一笔订单的金额", question: "请输入 SQL：", answer: ["SELECT user_id, amount FROM orders WHERE (user_id, created_at) IN (SELECT user_id, MAX(created_at) FROM orders GROUP BY user_id)", "SELECT o.user_id, o.amount FROM orders o INNER JOIN (SELECT user_id, MAX(created_at) as max_date FROM orders GROUP BY user_id) t ON o.user_id = t.user_id AND o.created_at = t.max_date", "SELECT user_id, amount FROM orders WHERE id IN (SELECT MAX(id) FROM orders GROUP BY user_id)"], hint: "用子查询找到每个用户最新订单的 ID 或日期", difficulty: "hard" },
    { id: "sp8", scenario: "删除 users 表中重复的邮箱记录（保留 id 最小的）", question: "请输入 SQL：", answer: ["DELETE FROM users WHERE id NOT IN (SELECT * FROM (SELECT MIN(id) FROM users GROUP BY email) as tmp)", "DELETE FROM users WHERE id NOT IN (SELECT MIN(id) FROM users GROUP BY email)", "DELETE u1 FROM users u1 INNER JOIN users u2 WHERE u1.email = u2.email AND u1.id > u2.id"], hint: "保留每组最小的 ID，删除其他的", difficulty: "hard" },
  ],
  troubleshoot: [
    { id: "tp1", scenario: "用户访问网站返回 502 Bad Gateway", question: "请列出排查步骤（用 ; 分隔）：", answer: ["tail -f /var/log/nginx/error.log; ss -tlnp | grep :8080; ps aux | grep app", "nginx error log; check backend port; check process"], hint: "1.看nginx错误日志 2.检查后端端口 3.检查进程是否存活", difficulty: "medium" },
    { id: "tp2", scenario: "服务器突然变慢，怀疑内存不足", question: "请列出排查命令（用 ; 分隔）：", answer: ["free -h; top -o %MEM; dmesg | grep -i oom", "free; top; dmesg oom"], hint: "1.查看内存总量 2.按内存排序进程 3.检查OOM日志", difficulty: "medium" },
    { id: "tp3", scenario: "SSH 连接服务器超时", question: "请列出排查步骤（用 ; 分隔）：", answer: ["ping host; telnet host 22; ssh -vvv user@host", "ping; check port 22; verbose ssh"], hint: "1.检查网络连通 2.检查22端口 3.详细模式调试", difficulty: "easy" },
    { id: "tp4", scenario: "Docker 容器启动后立即退出", question: "请列出排查步骤（用 ; 分隔）：", answer: ["docker ps -a; docker logs container_name; docker inspect container_name", "docker ps; docker logs; docker inspect"], hint: "1.查看容器状态 2.查看日志 3.检查容器详情", difficulty: "easy" },
    { id: "tp5", scenario: "MySQL 查询很慢，如何排查？", question: "请列出排查步骤（用 ; 分隔）：", answer: ["SHOW PROCESSLIST; EXPLAIN SELECT ...; SHOW STATUS LIKE 'Slow_queries'", "show processlist; explain query; check slow queries"], hint: "1.查看当前连接 2.分析执行计划 3.检查慢查询", difficulty: "medium" },
    { id: "tp6", scenario: "网站SSL证书过期，需要更新", question: "请列出更新步骤（用 ; 分隔）：", answer: ["certbot renew; systemctl reload nginx; echo | openssl s_client -connect host:443 | openssl x509 -noout -dates", "renew cert; reload nginx; verify dates"], hint: "1.更新证书 2.重载nginx 3.验证有效期", difficulty: "medium" },
    { id: "tp7", scenario: "服务器磁盘空间满了，需要清理", question: "请列出排查步骤（用 ; 分隔）：", answer: ["df -h; du -sh /* | sort -rh | head -10; journalctl --vacuum-size=100M", "df; du sort; clean journal"], hint: "1.查看使用率 2.找出大目录 3.清理系统日志", difficulty: "medium" },
    { id: "tp8", scenario: "发现服务器被入侵，如何紧急处理？", question: "请列出紧急处理步骤（用 ; 分隔）：", answer: ["who; last; ps aux; netstat -tlnp; find / -mtime -1 -type f", "check who; check history; check processes; check ports; check recent files"], hint: "1.查看在线用户 2.查看登录记录 3.查看进程 4.查看端口 5.查看近期修改文件", difficulty: "hard" },
  ],
};

const difficultyLabel = { easy: "简单", medium: "中等", hard: "困难" };
const difficultyColor = { easy: "text-green-500", medium: "text-yellow-500", hard: "text-red-500" };

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<"linux" | "sql" | "troubleshoot">("linux");
  const [mode, setMode] = useState<"learn" | "practice">("learn");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 练习状态
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);

  const knowledge = activeTab === "linux" ? linuxKnowledge : activeTab === "sql" ? sqlKnowledge : troubleshootKnowledge;
  const questions = practiceQuestions[activeTab] || [];
  const filteredKnowledge = knowledge.filter(k =>
    search === "" ||
    k.title.toLowerCase().includes(search.toLowerCase()) ||
    k.content.toLowerCase().includes(search.toLowerCase()) ||
    k.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const checkAnswer = () => {
    if (!userAnswer.trim()) return;
    const q = questions[currentQ];
    const normalized = userAnswer.trim().toLowerCase().replace(/\s+/g, " ");
    const isCorrect = q.answer.some(a => normalized === a.toLowerCase().replace(/\s+/g, " "));
    setResult(isCorrect ? "correct" : "wrong");
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextQuestion = () => {
    setCurrentQ((prev) => (prev + 1) % questions.length);
    setUserAnswer("");
    setResult(null);
    setShowHint(false);
  };

  const resetPractice = () => {
    setCurrentQ(0);
    setUserAnswer("");
    setResult(null);
    setScore({ correct: 0, total: 0 });
    setShowHint(false);
  };

  const tabs = [
    { key: "linux" as const, label: "Linux", icon: Terminal },
    { key: "sql" as const, label: "SQL", icon: Code },
    { key: "troubleshoot" as const, label: "故障排查", icon: Search },
  ];

  const tabTitles = { linux: "Linux 知识库", sql: "SQL 知识库", troubleshoot: "故障排查手册" };

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-5 w-5 text-[#0a84ff]" />
          <h1 className="text-[22px] font-bold">{tabTitles[activeTab]}</h1>
        </div>
        <p className="text-muted-foreground text-[13px] mb-4">
          {mode === "learn" ? "系统学习运维常用知识点" : "通过练习检验你的掌握程度"}
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setActiveTab(t.key); setSearch(""); setCurrentQ(0); setUserAnswer(""); setResult(null); setShowHint(false); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
                activeTab === t.key
                  ? "bg-[#0a84ff] text-white shadow-sm"
                  : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
          <div className="flex-1" />
          <div className="flex bg-white/[0.04] border border-white/[0.06] rounded-xl overflow-hidden">
            <button
              onClick={() => setMode("learn")}
              className={`px-4 py-2 text-[13px] font-medium transition-all ${mode === "learn" ? "bg-white/[0.1] text-foreground" : "text-muted-foreground"}`}
            >
              知识点
            </button>
            <button
              onClick={() => { setMode("practice"); resetPractice(); }}
              className={`px-4 py-2 text-[13px] font-medium transition-all ${mode === "practice" ? "bg-white/[0.1] text-foreground" : "text-muted-foreground"}`}
            >
              模拟练习
            </button>
          </div>
        </div>
      </div>

      {mode === "learn" ? (
        <>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索知识点..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] placeholder:text-muted-foreground/30 outline-none focus:border-[#0a84ff]/50 transition-colors"
            />
          </div>

          {/* Knowledge Cards */}
          <div className="grid gap-2">
            {filteredKnowledge.map((item) => (
              <div
                key={item.id}
                className="glass rounded-xl overflow-hidden cursor-pointer hover:bg-white/[0.04] transition-all"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#0a84ff] to-[#5e5ce6] flex items-center justify-center">
                      <ChevronRight className={`h-3 w-3 text-white transition-transform ${expandedId === item.id ? "rotate-90" : ""}`} />
                    </div>
                    <span className="text-[13px] font-medium">{item.title}</span>
                  </div>
                  <div className="flex gap-1">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] bg-white/[0.06] rounded-md text-muted-foreground/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {expandedId === item.id && (
                  <div className="px-4 pb-4 border-t border-white/[0.04]">
                    <pre className="mt-3 p-3 rounded-lg bg-[#0a0a0a] text-[12px] font-mono text-foreground/80 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {item.content}
                    </pre>
                    {item.example && (
                      <div className="mt-2">
                        <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider">示例</span>
                        <pre className="mt-1 p-2 rounded-lg bg-[#0a84ff]/5 border border-[#0a84ff]/10 text-[11px] font-mono text-[#0a84ff]/80 overflow-x-auto whitespace-pre-wrap">
                          {item.example}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Practice Mode */
        <div className="max-w-2xl mx-auto">
          {/* Score */}
          <div className="flex items-center justify-between mb-6 glass rounded-xl px-4 py-3">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-[20px] font-bold text-green-500">{score.correct}</div>
                <div className="text-[10px] text-muted-foreground/50">正确</div>
              </div>
              <div className="text-center">
                <div className="text-[20px] font-bold text-muted-foreground/40">{score.total}</div>
                <div className="text-[10px] text-muted-foreground/50">总题</div>
              </div>
              <div className="text-center">
                <div className="text-[20px] font-bold text-[#0a84ff]">
                  {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
                </div>
                <div className="text-[10px] text-muted-foreground/50">正确率</div>
              </div>
            </div>
            <button onClick={resetPractice} className="btn-ghost text-[12px] flex items-center gap-1">
              <RotateCcw className="h-3 w-3" />
              重置
            </button>
          </div>

          {/* Question */}
          {questions.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] text-muted-foreground/50">第 {currentQ + 1}/{questions.length} 题</span>
                <span className={`text-[11px] ${difficultyColor[questions[currentQ].difficulty]}`}>
                  {difficultyLabel[questions[currentQ].difficulty]}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4">
                <p className="text-[13px] text-foreground/80 leading-relaxed mb-2">
                  <span className="text-muted-foreground/50 font-medium">场景：</span>
                  {questions[currentQ].scenario}
                </p>
                <p className="text-[13px] font-medium">
                  {questions[currentQ].question}
                </p>
              </div>

              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.metaKey) checkAnswer();
                  if (e.key === "Enter" && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    checkAnswer();
                  }
                }}
                className="w-full p-3 rounded-xl bg-[#0a0a0a] border border-white/[0.06] text-[13px] font-mono text-foreground placeholder:text-muted-foreground/20 outline-none focus:border-[#0a84ff]/50 resize-none h-20 mb-3"
                placeholder="输入你的命令或答案..."
                disabled={result !== null}
              />

              {/* Result */}
              {result && (
                <div className={`p-3 rounded-xl mb-3 text-[13px] ${
                  result === "correct"
                    ? "bg-green-500/10 border border-green-500/20 text-green-500"
                    : "bg-red-500/10 border border-red-500/20 text-red-500"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {result === "correct" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <span className="font-medium">{result === "correct" ? "正确！" : "再想想..."}</span>
                  </div>
                  {result === "wrong" && (
                    <div className="mt-2">
                      <p className="text-[11px] text-muted-foreground/60 mb-1">参考答案：</p>
                      <code className="block p-2 rounded-lg bg-[#0a0a0a] text-[11px] font-mono text-green-400 break-all">
                        {questions[currentQ].answer[0]}
                      </code>
                    </div>
                  )}
                </div>
              )}

              {/* Hint */}
              {showHint && (
                <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10 text-[12px] text-yellow-500/80 mb-3">
                  <Star className="h-3 w-3 inline mr-1" />
                  {questions[currentQ].hint}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {!result ? (
                  <>
                    <button onClick={() => setShowHint(true)} className="btn-ghost text-[12px]">
                      提示
                    </button>
                    <div className="flex-1" />
                    <button onClick={checkAnswer} disabled={!userAnswer.trim()} className="btn-primary text-[12px] disabled:opacity-50">
                      提交答案
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setShowHint(false)} className="btn-ghost text-[12px]">
                      隐藏提示
                    </button>
                    <div className="flex-1" />
                    <button onClick={nextQuestion} className="btn-primary text-[12px]">
                      下一题 <ChevronRight className="h-3 w-3 inline ml-1" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
