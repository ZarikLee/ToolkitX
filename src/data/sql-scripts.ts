import { Script } from "./python-scripts";

export const sqlScripts: Script[] = [
  {
    id: "sql-user-management",
    name: "用户管理",
    description: "创建、修改、删除数据库用户",
    code: `-- 创建用户
CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'password';

-- 授权
GRANT ALL PRIVILEGES ON mydb.* TO 'new_user'@'localhost';

-- 修改密码
ALTER USER 'new_user'@'localhost' IDENTIFIED BY 'new_password';

-- 查看用户权限
SHOW GRANTS FOR 'new_user'@'localhost';

-- 删除用户
DROP USER 'new_user'@'localhost';`,
    tags: ["用户管理", "权限"],
    help: [
      { title: "功能说明", items: ["创建数据库用户并设置密码", "授予/撤销用户权限", "修改密码和删除用户"] },
      { title: "使用方法", items: ["登录 MySQL: mysql -u root -p", "复制对应 SQL 语句执行", "将 new_user 和 password 替换为实际值", "% 表示允许远程登录，localhost 仅本地"] },
    ],
  },
  {
    id: "sql-backup-restore",
    name: "备份与恢复",
    description: "数据库备份和恢复脚本",
    code: `-- 备份单个数据库
mysqldump -u root -p mydb > backup.sql

-- 备份所有数据库
mysqldump -u root -p --all-databases > all_backup.sql

-- 备份特定表
mysqldump -u root -p mydb table1 table2 > tables_backup.sql

-- 恢复数据库
mysql -u root -p mydb < backup.sql

-- 只导出结构
mysqldump -u root -p --no-data mydb > schema.sql

-- 只导出数据
mysqldump -u root -p --no-create-info mydb > data.sql`,
    tags: ["备份", "恢复"],
    help: [
      { title: "功能说明", items: ["使用 mysqldump 备份数据库", "支持备份所有库、指定库、指定表", "支持只导出结构或只导出数据"] },
      { title: "使用方法", items: ["在终端执行（不是 MySQL 内）", "备份: mysqldump -u root -p mydb > backup.sql", "恢复: mysql -u root -p mydb < backup.sql", "建议配合 crontab 定时自动备份"] },
    ],
  },
  {
    id: "sql-performance",
    name: "性能优化",
    description: "慢查询分析和索引优化",
    code: `-- 启用慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';

-- 分析慢查询
-- mysqldumpslow -s t -t 10 /var/log/mysql/slow.log

-- 查看执行计划
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';

-- 查看索引使用情况
SHOW INDEX FROM users;

-- 创建索引
CREATE INDEX idx_email ON users(email);

-- 复合索引
CREATE INDEX idx_status_created ON orders(status, created_at);

-- 查看表状态
SHOW TABLE STATUS LIKE 'users';

-- 优化表
OPTIMIZE TABLE users;`,
    tags: ["性能", "索引", "优化"],
    help: [
      { title: "功能说明", items: ["启用慢查询日志定位慢 SQL", "使用 EXPLAIN 分析查询执行计划", "创建索引提升查询速度"] },
      { title: "使用方法", items: ["先启用慢查询日志", "用 EXPLAIN 查看 SQL 执行计划", "关注 type 列（ALL 说明全表扫描需优化）", "为 WHERE/JOIN 条件列创建索引"] },
    ],
  },
  {
    id: "sql-data-cleanup",
    name: "数据清理",
    description: "清理过期数据和日志",
    code: `-- 删除 30 天前的日志
DELETE FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- 归档旧数据
INSERT INTO logs_archive SELECT * FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY);
DELETE FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY);

-- 清理软删除数据
DELETE FROM users WHERE deleted_at IS NOT NULL AND deleted_at < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- 批量删除（避免锁表）
DELETE FROM logs WHERE id IN (
    SELECT id FROM (
        SELECT id FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY) LIMIT 10000
    ) AS tmp
);

-- 清空表（保留结构）
TRUNCATE TABLE logs;

-- 重置自增 ID
ALTER TABLE users AUTO_INCREMENT = 1;`,
    tags: ["数据清理", "归档"],
    help: [
      { title: "功能说明", items: ["按时间条件删除过期数据", "归档旧数据到备份表", "批量删除避免长时间锁表"] },
      { title: "使用方法", items: ["先确认数据已不需要或已备份", "修改 DELETE 语句中的时间条件", "大批量删除使用 LIMIT 分批执行", "TRUNCATE 比 DELETE 快但无法回滚"] },
    ],
  },
  {
    id: "sql-monitoring",
    name: "监控查询",
    description: "数据库性能监控 SQL",
    code: `-- 查看当前连接
SHOW PROCESSLIST;

-- 查看运行时间超过 60 秒的查询
SELECT * FROM information_schema.processlist WHERE time > 60;

-- 查看数据库大小
SELECT 
    table_schema AS 'Database',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
GROUP BY table_schema;

-- 查看表大小
SELECT 
    table_name,
    ROUND(data_length / 1024 / 1024, 2) AS 'Data (MB)',
    ROUND(index_length / 1024 / 1024, 2) AS 'Index (MB)'
FROM information_schema.tables
WHERE table_schema = 'mydb'
ORDER BY data_length DESC;

-- 查看 InnoDB 状态
SHOW ENGINE INNODB STATUS;

-- 查看锁等待
SELECT * FROM information_schema.innodb_lock_waits;`,
    tags: ["监控", "性能"],
    help: [
      { title: "功能说明", items: ["查看当前数据库连接和运行中的查询", "统计各数据库和表的大小", "检查 InnoDB 引擎状态和锁等待"] },
      { title: "使用方法", items: ["SHOW PROCESSLIST 查看当前连接", "information_schema 查询库表大小", "time > 60 可找出运行时间长的慢查询", "发现异常查询可用 KILL id 终止"] },
    ],
  },
  {
    id: "sql-replication",
    name: "主从复制配置",
    description: "MySQL 主从复制设置",
    code: `-- 主服务器配置
-- /etc/mysql/mysql.conf.d/mysqld.cnf
-- server-id=1
-- log-bin=mysql-bin
-- binlog-do-db=mydb

-- 创建复制用户
CREATE USER 'repl'@'%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';

-- 查看主服务器状态
SHOW MASTER STATUS;

-- 从服务器配置
CHANGE MASTER TO
    MASTER_HOST='192.168.1.100',
    MASTER_USER='repl',
    MASTER_PASSWORD='password',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=0;

-- 启动复制
START SLAVE;

-- 查看从服务器状态
SHOW SLAVE STATUS\\G

-- 停止复制
STOP SLAVE;`,
    tags: ["复制", "高可用"],
    help: [
      { title: "功能说明", items: ["配置 MySQL 主从复制架构", "实现数据自动同步和读写分离"] },
      { title: "使用方法", items: ["主服务器开启 binlog 并配置 server-id", "创建复制用户并授权", "从服务器配置 MASTER 信息并 START SLAVE", "用 SHOW SLAVE STATUS 检查复制状态"] },
    ],
  },
  {
    id: "sql-transaction",
    name: "事务处理",
    description: "事务控制和锁管理",
    code: `-- 开启事务
START TRANSACTION;

-- 或
BEGIN;

-- 执行操作
INSERT INTO accounts (user_id, balance) VALUES (1, 1000);
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;

-- 提交
COMMIT;

-- 回滚
ROLLBACK;

-- 保存点
SAVEPOINT sp1;
INSERT INTO logs (message) VALUES ('test');
ROLLBACK TO sp1;

-- 查看锁信息
SELECT * FROM information_schema.innodb_trx;
SELECT * FROM information_schema.innodb_locks;

-- 死锁检测
SHOW ENGINE INNODB STATUS;`,
    tags: ["事务", "锁"],
    help: [
      { title: "功能说明", items: ["使用事务保证多步操作的原子性", "支持提交、回滚、保存点", "查看锁信息和死锁检测"] },
      { title: "使用方法", items: ["START TRANSACTION 开启事务", "所有操作无误后 COMMIT 提交", "出错时 ROLLBACK 回滚", "用 SAVEPOINT 设置中间回滚点"] },
    ],
  },
  {
    id: "sql-batch-operations",
    name: "批量操作",
    description: "批量插入、更新、删除",
    code: `-- 批量插入
INSERT INTO users (name, email, created_at) VALUES
    ('User1', 'user1@example.com', NOW()),
    ('User2', 'user2@example.com', NOW()),
    ('User3', 'user3@example.com', NOW());

-- 批量更新
UPDATE users SET status = 'active' WHERE id IN (1, 2, 3);

-- 使用 CASE 批量更新不同值
UPDATE users SET status = CASE
    WHEN id = 1 THEN 'active'
    WHEN id = 2 THEN 'inactive'
    WHEN id = 3 THEN 'pending'
END WHERE id IN (1, 2, 3);

-- 批量插入（忽略错误）
INSERT IGNORE INTO users (email, name) VALUES
    ('existing@example.com', 'Duplicate'),
    ('new@example.com', 'New User');

-- 批量插入（更新重复）
INSERT INTO users (email, name, login_count) VALUES
    ('user@example.com', 'User', 1)
ON DUPLICATE KEY UPDATE
    login_count = login_count + 1;

-- 批量删除
DELETE FROM logs WHERE id IN (1, 2, 3, 4, 5);`,
    tags: ["批量操作", "性能"],
    help: [
      { title: "功能说明", items: ["单条语句插入/更新多行数据", "INSERT IGNORE 跳过重复记录", "ON DUPLICATE KEY UPDATE 更新重复记录"] },
      { title: "使用方法", items: ["批量插入比逐条插入快数倍", "用 CASE 实现不同行不同值更新", "大批量操作建议分批执行（每批 1000-5000 行）"] },
    ],
  },
  {
    id: "sql-view-procedure",
    name: "视图和存储过程",
    description: "创建视图和存储过程",
    code: `-- 创建视图
CREATE VIEW user_orders AS
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(o.id) AS order_count,
    SUM(o.amount) AS total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;

-- 使用视图
SELECT * FROM user_orders WHERE order_count > 5;

-- 创建存储过程
DELIMITER //
CREATE PROCEDURE get_user_orders(IN user_id INT)
BEGIN
    SELECT * FROM orders WHERE user_id = user_id ORDER BY created_at DESC;
END //
DELIMITER ;

-- 调用存储过程
CALL get_user_orders(1);

-- 删除存储过程
DROP PROCEDURE IF EXISTS get_user_orders;

-- 查看存储过程
SHOW PROCEDURE STATUS WHERE Db = 'mydb';`,
    tags: ["视图", "存储过程"],
    help: [
      { title: "功能说明", items: ["视图：虚拟表，简化复杂查询", "存储过程：预编译的 SQL 逻辑块", "支持参数传入和结果返回"] },
      { title: "使用方法", items: ["CREATE VIEW 创建视图后可像表一样查询", "DELIMITER 修改分隔符后定义存储过程", "CALL 调用存储过程", "SHOW PROCEDURE STATUS 查看已有过程"] },
    ],
  },
  {
    id: "sql-partitioning",
    name: "表分区",
    description: "按时间范围分区表",
    code: `-- 创建分区表
CREATE TABLE logs (
    id BIGINT AUTO_INCREMENT,
    level VARCHAR(10),
    message TEXT,
    created_at DATETIME,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- 添加分区
ALTER TABLE logs ADD PARTITION (
    PARTITION p2026 VALUES LESS THAN (2027)
);

-- 删除分区（快速删除大量数据）
ALTER TABLE logs DROP PARTITION p2023;

-- 查看分区信息
SELECT * FROM information_schema.PARTITIONS 
WHERE TABLE_SCHEMA = 'mydb' AND TABLE_NAME = 'logs';

-- 查询指定分区
SELECT * FROM logs PARTITION (p2024);`,
    tags: ["分区", "性能"],
    help: [
      { title: "功能说明", items: ["将大表按时间范围分成多个物理分区", "查询自动定位到对应分区，提升速度", "删除旧数据可直接 DROP 分区"] },
      { title: "使用方法", items: ["建表时用 PARTITION BY RANGE 定义分区", "ALTER TABLE ADD PARTITION 添加新分区", "DROP PARTITION 快速删除大量数据", "适合日志表、流水表等按时间增长的表"] },
    ],
  },
  {
    id: "sql-json-operations",
    name: "JSON 操作",
    description: "MySQL JSON 字段操作",
    code: `-- 创建含 JSON 字段的表
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    attributes JSON
);

-- 插入 JSON 数据
INSERT INTO products (name, attributes) VALUES
    ('Phone', '{"color": "black", "storage": 128, "features": ["5G", "NFC"]}');

-- 查询 JSON 字段
SELECT 
    name,
    attributes->>'$.color' AS color,
    attributes->>'$.storage' AS storage
FROM products;

-- JSON 数组查询
SELECT * FROM products 
WHERE JSON_CONTAINS(attributes->'$.features', '"5G"');

-- JSON 聚合
SELECT JSON_ARRAYAGG(name) AS names FROM products;

-- 更新 JSON 字段
UPDATE products 
SET attributes = JSON_SET(attributes, '$.price', 999)
WHERE id = 1;

-- 删除 JSON 键
UPDATE products 
SET attributes = JSON_REMOVE(attributes, '$.features')
WHERE id = 1;`,
    tags: ["JSON", "数据类型"],
    help: [
      { title: "功能说明", items: ["MySQL 5.7+ 原生支持 JSON 字段", "支持查询、更新、删除 JSON 内部数据", "支持 JSON 数组查询和聚合"] },
      { title: "使用方法", items: ["建表时字段类型设为 JSON", "用 ->> 操作符提取 JSON 值", "JSON_SET/JSON_REMOVE 更新字段", "JSON_CONTAINS 查询数组包含的值"] },
    ],
  },
  {
    id: "sql-union-subquery",
    name: "联合查询与子查询",
    description: "UNION、子查询、CTE 使用",
    code: `-- UNION 合并结果
SELECT name, email FROM users
UNION
SELECT name, email FROM contacts;

-- UNION ALL（包含重复）
SELECT user_id FROM orders
UNION ALL
SELECT user_id FROM wishlist;

-- 子查询
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders WHERE amount > 100);

-- EXISTS 子查询
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- CTE（公用表表达式）
WITH monthly_sales AS (
    SELECT 
        DATE_FORMAT(created_at, '%Y-%m') AS month,
        SUM(amount) AS total
    FROM orders
    GROUP BY month
)
SELECT * FROM monthly_sales WHERE total > 10000;

-- 递归 CTE
WITH RECURSIVE category_tree AS (
    SELECT id, name, parent_id, 0 AS level
    FROM categories WHERE parent_id IS NULL
    UNION ALL
    SELECT c.id, c.name, c.parent_id, ct.level + 1
    FROM categories c
    JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree;`,
    tags: ["查询", "子查询", "CTE"],
    help: [
      { title: "功能说明", items: ["UNION 合并多个查询结果", "子查询：查询中嵌套查询", "CTE：用 WITH 定义临时结果集"] },
      { title: "使用方法", items: ["UNION 自动去重，UNION ALL 保留重复", "IN/EXISTS 用于子查询", "WITH 定义 CTE 使复杂查询更易读", "递归 CTE 可遍历树形结构"] },
    ],
  },
  {
    id: "sql-data-migration",
    name: "数据迁移",
    description: "跨表、跨库数据迁移",
    code: `-- 跨表迁移
INSERT INTO users_archive (id, name, email, created_at)
SELECT id, name, email, created_at 
FROM users 
WHERE created_at < '2023-01-01';

-- 跨库迁移
INSERT INTO backup_db.users (id, name, email)
SELECT id, name, email 
FROM production_db.users;

-- 迁移时去重
INSERT IGNORE INTO target_table (id, name, email)
SELECT id, name, email FROM source_table;

-- 迁移并转换
INSERT INTO target_table (id, full_name, email)
SELECT id, CONCAT(first_name, ' ', last_name), email
FROM source_table;

-- 批量迁移（分页）
INSERT INTO target_table SELECT * FROM source_table
WHERE id NOT IN (SELECT id FROM target_table)
LIMIT 10000;

-- 验证迁移结果
SELECT 
    (SELECT COUNT(*) FROM source_table) AS source_count,
    (SELECT COUNT(*) FROM target_table) AS target_count;`,
    tags: ["迁移", "数据同步"],
    help: [
      { title: "功能说明", items: ["跨表、跨库迁移数据", "支持去重、类型转换、分页迁移"] },
      { title: "使用方法", items: ["INSERT INTO ... SELECT 从旧表导数据", "INSERT IGNORE 自动跳过重复", "大批量迁移用 LIMIT 分页", "迁移后对比 COUNT 验证数据量"] },
    ],
  },
  {
    id: "sql-security",
    name: "安全审计",
    description: "用户权限审计和安全检查",
    code: `-- 查看所有用户
SELECT user, host, plugin FROM mysql.user;

-- 查看所有权限
SELECT * FROM mysql.user_privileges;

-- 查看数据库级权限
SELECT * FROM mysql.db_privileges;

-- 查看表级权限
SELECT * FROM mysql.tables_priv;

-- 检查空密码用户
SELECT user, host FROM mysql.user WHERE authentication_string = '';

-- 检查 root 远程访问
SELECT user, host FROM mysql.user WHERE user = 'root' AND host != 'localhost';

-- 审计登录失败
-- 查看日志: /var/log/mysql/error.log

-- 加密敏感数据
UPDATE users SET 
    email = CONCAT(LEFT(email, 2), '***', RIGHT(email, 2)),
    phone = CONCAT(LEFT(phone, 3), '****', RIGHT(phone, 4))
WHERE id = 1;`,
    tags: ["安全", "审计"],
    help: [
      { title: "功能说明", items: ["检查数据库用户和权限配置", "发现空密码和远程 root 等安全隐患", "脱敏处理敏感字段"] },
      { title: "使用方法", items: ["定期运行审计 SQL 检查用户权限", "发现空密码用户立即修改", "限制 root 仅 localhost 登录", "对敏感字段做脱敏处理"] },
    ],
  },
];
