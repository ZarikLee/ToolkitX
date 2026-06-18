import { Script } from "./python-scripts";

export const shellScripts: Script[] = [
  {
    id: "sh-system-info",
    name: "系统信息",
    description: "一键查看系统完整信息",
    code: `#!/bin/bash

echo "=== 系统信息 ==="
echo "主机名: $(hostname)"
echo "系统: $(uname -a)"
echo "发行版: $(cat /etc/os-release 2>/dev/null | grep PRETTY_NAME | cut -d'"' -f2)"
echo ""

echo "=== CPU 信息 ==="
lscpu | grep -E "^(Architecture|CPU\(s\)|Model name|Thread)"
echo ""

echo "=== 内存信息 ==="
free -h
echo ""

echo "=== 磁盘信息 ==="
df -h | grep -v tmpfs
echo ""

echo "=== 网络信息 ==="
ip -4 addr show | grep inet | awk '{print $2, $NF}'
echo ""

echo "=== 运行时间 ==="
uptime`,
    tags: ["系统", "信息采集"],
    help: [
      { title: "功能说明", items: ["一键查看主机名、系统版本、CPU、内存、磁盘、网络信息"] },
      { title: "使用方法", items: ["赋予权限: chmod +x sh-system-info.sh", "运行: ./sh-system-info.sh", "也可直接复制命令到终端逐行执行"] },
    ],
  },
  {
    id: "sh-batch-ssh",
    name: "批量 SSH 执行",
    description: "批量在多台服务器执行命令",
    code: `#!/bin/bash

# 服务器列表
SERVERS=(
    "192.168.1.10"
    "192.168.1.11"
    "192.168.1.12"
)

USER="deploy"
KEY="/root/.ssh/id_rsa"
COMMAND="uptime"

for server in "\${SERVERS[@]}"; do
    echo "=== \$server ==="
    ssh -o StrictHostKeyChecking=no -i \$KEY \$USER@\$server "\$COMMAND"
    echo ""
done`,
    tags: ["SSH", "批量执行"],
    help: [
      { title: "功能说明", items: ["遍历服务器列表批量执行 SSH 命令", "适合批量检查、批量部署等场景"] },
      { title: "使用方法", items: ["修改 SERVERS 数组为实际 IP 列表", "修改 USER 和 KEY 为实际 SSH 凭据", "修改 COMMAND 为要执行的命令", "确保 SSH 密钥已配置免密登录"] },
    ],
  },
  {
    id: "sh-deploy",
    name: "应用部署",
    description: "自动化部署脚本模板",
    code: `#!/bin/bash

APP_NAME="myapp"
DEPLOY_DIR="/opt/\$APP_NAME"
BACKUP_DIR="/opt/backup/\$APP_NAME"
GIT_REPO="git@github.com:user/repo.git"
BRANCH="main"

echo "=== 开始部署 \$APP_NAME ==="

# 备份当前版本
if [ -d "\$DEPLOY_DIR" ]; then
    echo "备份当前版本..."
    mv \$DEPLOY_DIR \$BACKUP_DIR.\$(date +%Y%m%d_%H%M%S)
fi

# 拉取代码
echo "拉取代码..."
git clone -b \$BRANCH \$GIT_REPO \$DEPLOY_DIR

# 安装依赖
cd \$DEPLOY_DIR
npm install --production

# 重启服务
echo "重启服务..."
systemctl restart \$APP_NAME

# 检查状态
sleep 3
if systemctl is-active --quiet \$APP_NAME; then
    echo "✅ 部署成功！"
else
    echo "❌ 部署失败，回滚..."
    rm -rf \$DEPLOY_DIR
    mv \$BACKUP_DIR.* \$DEPLOY_DIR
    systemctl start \$APP_NAME
fi`,
    tags: ["部署", "自动化"],
    help: [
      { title: "功能说明", items: ["自动拉取代码、安装依赖、重启服务", "部署失败自动回滚到上一版本"] },
      { title: "使用方法", items: ["修改 APP_NAME、GIT_REPO、BRANCH 变量", "确保服务器已配置 Git 和 SSH 密钥", "配合 crontab 或 CI/CD 工具使用", "需要先创建对应的 systemd 服务"] },
    ],
  },
  {
    id: "sh-log-rotate",
    name: "日志轮转",
    description: "自动清理和压缩日志文件",
    code: `#!/bin/bash

LOG_DIR="/var/log/myapp"
KEEP_DAYS=30
COMPRESS_DAYS=7

echo "=== 日志清理 ==="

# 压缩超过 7 天的日志
find \$LOG_DIR -name "*.log" -mtime +\$COMPRESS_DAYS -exec gzip {} \\;

# 删除超过 30 天的日志
find \$LOG_DIR -name "*.gz" -mtime +\$KEEP_DAYS -delete

# 清空当前日志
> \$LOG_DIR/app.log

echo "日志清理完成"
echo "保留天数: \$KEEP_DAYS"
echo "压缩天数: \$COMPRESS_DAYS"`,
    tags: ["日志", "清理"],
    help: [
      { title: "功能说明", items: ["自动压缩超过 7 天的日志文件", "自动删除超过 30 天的旧日志", "清空当前日志文件"] },
      { title: "使用方法", items: ["修改 LOG_DIR 为实际日志目录", "调整 KEEP_DAYS 和 COMPRESS_DAYS", "配合 crontab 每天定时执行"] },
    ],
  },
  {
    id: "sh-health-check",
    name: "健康检查",
    description: "服务健康检查和自动重启",
    code: `#!/bin/bash

SERVICES=("nginx" "mysql" "redis" "myapp")
LOG_FILE="/var/log/health_check.log"

check_service() {
    local service=\$1
    if systemctl is-active --quiet \$service; then
        echo "[\$(date)] \$service: OK" >> \$LOG_FILE
        return 0
    else
        echo "[\$(date)] \$service: FAILED - 重启中..." >> \$LOG_FILE
        systemctl restart \$service
        sleep 5
        if systemctl is-active --quiet \$service; then
            echo "[\$(date)] \$service: 重启成功" >> \$LOG_FILE
        else
            echo "[\$(date)] \$service: 重启失败" >> \$LOG_FILE
        fi
        return 1
    fi
}

echo "=== 健康检查 ==="
for service in "\${SERVICES[@]}"; do
    check_service \$service
done
echo "检查完成，日志: \$LOG_FILE"`,
    tags: ["监控", "健康检查"],
    help: [
      { title: "功能说明", items: ["检查多个服务运行状态", "发现异常自动重启服务", "记录检查结果到日志文件"] },
      { title: "使用方法", items: ["修改 SERVICES 数组为要监控的服务", "配合 crontab 每 5 分钟执行一次", "查看日志: cat /var/log/health_check.log"] },
    ],
  },
  {
    id: "sh-backup",
    name: "全量备份",
    description: "数据库和文件全量备份",
    code: `#!/bin/bash

BACKUP_DIR="/backup"
DATE=\$(date +%Y%m%d_%H%M%S)
KEEP_DAYS=7

# 备份 MySQL
echo "备份 MySQL..."
mysqldump -u root -p'password' --all-databases | gzip > \$BACKUP_DIR/mysql_\$DATE.sql.gz

# 备份配置文件
echo "备份配置..."
tar czf \$BACKUP_DIR/config_\$DATE.tar.gz /etc/nginx /etc/mysql /etc/ssh

# 备份应用数据
echo "备份应用数据..."
tar czf \$BACKUP_DIR/appdata_\$DATE.tar.gz /opt/myapp/data

# 清理旧备份
echo "清理旧备份..."
find \$BACKUP_DIR -name "*.gz" -mtime +\$KEEP_DAYS -delete

echo "备份完成: \$BACKUP_DIR"
ls -lh \$BACKUP_DIR/*_\$DATE*`,
    tags: ["备份", "自动化"],
    help: [
      { title: "功能说明", items: ["全量备份 MySQL 数据库", "备份配置文件和应用数据", "自动清理旧备份"] },
      { title: "使用方法", items: ["修改 BACKUP_DIR 为备份目录", "修改 MySQL 密码和备份路径", "调整 KEEP_DAYS 控制保留天数", "配合 crontab 每天凌晨执行"] },
    ],
  },
  {
    id: "sh-ssl-renew",
    name: "SSL 证书续期",
    description: "Let's Encrypt 证书自动续期",
    code: `#!/bin/bash

DOMAIN="example.com"
EMAIL="admin@example.com"

echo "=== SSL 证书续期 ==="

# 检查证书到期时间
EXPIRY=\$(openssl s_client -connect \$DOMAIN:443 -servername \$DOMAIN 2>/dev/null | \\
    openssl x509 -noout -enddate | cut -d= -f2)
echo "当前证书到期时间: \$EXPIRY"

# 续期
certbot renew --cert-name \$DOMAIN

# 重载 Nginx
nginx -t && systemctl reload nginx

echo "续期完成"`,
    tags: ["SSL", "安全"],
    help: [
      { title: "功能说明", items: ["检查 SSL 证书到期时间", "自动续期 Let's Encrypt 证书", "重载 Nginx 使新证书生效"] },
      { title: "使用方法", items: ["修改 DOMAIN 和 EMAIL 变量", "确保已安装 certbot", "配合 crontab 每月自动执行", "建议先手动测试续期是否正常"] },
    ],
  },
  {
    id: "sh-docker-cleanup",
    name: "Docker 清理",
    description: "清理 Docker 垃圾，释放磁盘空间",
    code: `#!/bin/bash

echo "=== Docker 清理 ==="

# 查看磁盘使用
docker system df

# 清理停止的容器
echo "清理停止的容器..."
docker container prune -f

# 清理悬空镜像
echo "清理悬空镜像..."
docker image prune -f

# 清理未使用的网络
echo "清理未使用的网络..."
docker network prune -f

# 清理未使用的卷
echo "清理未使用的卷..."
docker volume prune -f

# 完全清理（谨慎使用）
# docker system prune -a -f --volumes

echo ""
echo "清理后磁盘使用:"
docker system df`,
    tags: ["Docker", "清理"],
    help: [
      { title: "功能说明", items: ["清理停止的容器、悬空镜像、未使用的网络和卷", "释放磁盘空间"] },
      { title: "使用方法", items: ["直接运行即可查看清理效果", "docker system df 查看清理前后对比", "取消注释最后一行可完全清理（谨慎）"] },
    ],
  },
  {
    id: "sh-user-management",
    name: "用户管理",
    description: "批量创建/删除用户",
    code: `#!/bin/bash

# 批量创建用户
create_users() {
    local users=("user1" "user2" "user3")
    local group="deploy"
    
    # 创建组
    groupadd -f \$group
    
    for user in "\${users[@]}"; do
        # 创建用户
        useradd -m -g \$group -s /bin/bash \$user
        
        # 设置密码
        echo "\$user:password123" | chpasswd
        
        # 添加 SSH 密钥
        mkdir -p /home/\$user/.ssh
        cp /root/.ssh/authorized_keys /home/\$user/.ssh/
        chown -R \$user:\$group /home/\$user/.ssh
        
        echo "用户 \$user 创建完成"
    done
}

# 批量删除用户
delete_users() {
    local users=("user1" "user2" "user3")
    
    for user in "\${users[@]}"; do
        userdel -r \$user 2>/dev/null
        echo "用户 \$user 已删除"
    done
}

# 使用
create_users
# delete_users`,
    tags: ["用户", "管理"],
    help: [
      { title: "功能说明", items: ["批量创建用户并设置密码", "自动配置 SSH 密钥", "支持批量删除用户"] },
      { title: "使用方法", items: ["修改 users 数组为实际用户名", "修改 group 为用户组名", "修改密码后运行 create_users", "取消注释 delete_users 可批量删除"] },
    ],
  },
  {
    id: "sh-network-diag",
    name: "网络诊断",
    description: "网络问题诊断工具",
    code: `#!/bin/bash

echo "=== 网络诊断 ==="

# DNS 解析
echo "DNS 解析:"
nslookup google.com
echo ""

# 路由追踪
echo "路由追踪:"
traceroute -m 15 google.com 2>/dev/null || tracepath google.com
echo ""

# 端口检查
echo "端口检查:"
nc -zv 8.8.8.8 53 -w 3
echo ""

# 带宽测试
echo "带宽测试:"
curl -s http://speedtest.tele2.net/10MB.iso -o /dev/null -w "Speed: %{speed_download} bytes/sec\\n"
echo ""

# 网络连接统计
echo "连接统计:"
ss -s`,
    tags: ["网络", "诊断"],
    help: [
      { title: "功能说明", items: ["DNS 解析检查", "路由追踪", "端口连通性检查", "带宽测试"] },
      { title: "使用方法", items: ["直接运行脚本执行所有诊断", "也可复制单个命令单独使用", "修改域名和 IP 为目标地址"] },
    ],
  },
  {
    id: "sh-process-monitor",
    name: "进程监控",
    description: "进程监控和自动重启",
    code: `#!/bin/bash

PROCESS="node"
MAX_CPU=80
MAX_MEM=80
LOG="/var/log/process_monitor.log"

monitor_process() {
    while true; do
        # 查找进程
        PIDS=\$(pgrep -x \$PROCESS)
        
        if [ -z "\$PIDS" ]; then
            echo "[\$(date)] \$PROCESS 未运行，启动中..." >> \$LOG
            systemctl start myapp
        fi
        
        for pid in \$PIDS; do
            CPU=\$(ps -p \$pid -o %cpu= | tr -d ' ')
            MEM=\$(ps -p \$pid -o %mem= | tr -d ' ')
            
            if (( \$(echo "\$CPU > \$MAX_CPU" | bc -l) )); then
                echo "[\$(date)] PID \$pid CPU 过高: \$CPU%" >> \$LOG
            fi
        done
        
        sleep 10
    done
}

monitor_process`,
    tags: ["进程", "监控"],
    help: [
      { title: "功能说明", items: ["持续监控指定进程运行状态", "进程未运行时自动重启", "CPU 过高时记录告警日志"] },
      { title: "使用方法", items: ["修改 PROCESS 为进程名", "调整 MAX_CPU 和 MAX_MEM 阈值", "后台运行: nohup ./sh-process-monitor.sh &"] },
    ],
  },
  {
    id: "sh-git-deploy",
    name: "Git 部署",
    description: "Git 仓库自动部署",
    code: `#!/bin/bash

REPO_DIR="/opt/myapp"
BRANCH="main"

cd \$REPO_DIR

# 拉取最新代码
echo "拉取最新代码..."
git fetch origin
LOCAL=\$(git rev-parse HEAD)
REMOTE=\$(git rev-parse origin/\$BRANCH)

if [ "\$LOCAL" = "\$REMOTE" ]; then
    echo "已是最新版本"
    exit 0
fi

# 备份当前版本
BACKUP=\$(git rev-parse --short HEAD)
git stash
git checkout \$BACKUP
tar czf /opt/backup/myapp_\$BACKUP.tar.gz .
git checkout \$BRANCH

# 更新代码
git pull origin \$BRANCH

# 安装依赖
npm install --production

# 数据库迁移
npm run migrate 2>/dev/null

# 重启服务
systemctl restart myapp

echo "部署完成: \$BACKUP -> \$(git rev-parse --short HEAD)"`,
    tags: ["Git", "部署"],
    help: [
      { title: "功能说明", items: ["自动拉取 Git 最新代码", "安装依赖并重启服务", "记录版本变更日志"] },
      { title: "使用方法", items: ["修改 REPO_DIR 和 BRANCH", "确保服务器已配置 Git SSH 密钥", "配合 crontab 或 webhook 自动触发"] },
    ],
  },
  {
    id: "sh-security-audit",
    name: "安全审计",
    description: "服务器安全检查脚本",
    code: `#!/bin/bash

echo "=== 安全审计 ==="

# 检查 SSH 配置
echo "SSH 配置检查:"
grep -E "^(PermitRootLogin|PasswordAuthentication|Port)" /etc/ssh/sshd_config
echo ""

# 检查开放端口
echo "开放端口:"
ss -tlnp | awk '{print \$4, \$6}' | grep -v "Local"
echo ""

# 检查最近登录
echo "最近登录:"
last -n 10
echo ""

# 检查失败登录
echo "失败登录:"
grep "Failed password" /var/log/auth.log | tail -5
echo ""

# 检查 rootkit
echo "Rootkit 检查:"
which rkhunter > /dev/null && rkhunter --check --skip-keypress
echo ""

# 检查文件权限
echo "敏感文件权限:"
ls -la /etc/shadow /etc/passwd /etc/sudoers`,
    tags: ["安全", "审计"],
    help: [
      { title: "功能说明", items: ["检查 SSH 配置安全性", "列出开放端口和最近登录", "检查失败登录尝试和敏感文件权限"] },
      { title: "使用方法", items: ["以 root 权限运行", "重点关注 PermitRootLogin 和 PasswordAuthentication", "发现异常登录及时处理", "建议定期运行审计脚本"] },
    ],
  },
  {
    id: "sh-disk-cleanup",
    name: "磁盘清理",
    description: "磁盘空间清理和监控",
    code: `#!/bin/bash

echo "=== 磁盘清理 ==="

# 查看磁盘使用
echo "磁盘使用:"
df -h | grep -v tmpfs
echo ""

# 查找大文件
echo "最大的 10 个文件:"
find / -type f -exec ls -S {} + 2>/dev/null | head -10
echo ""

# 清理 apt 缓存
echo "清理 apt 缓存..."
apt-get clean 2>/dev/null
apt-get autoremove -y 2>/dev/null

# 清理日志
echo "清理旧日志..."
journalctl --vacuum-time=7d 2>/dev/null
find /var/log -name "*.gz" -mtime +30 -delete 2>/dev/null

# 清理临时文件
echo "清理临时文件..."
find /tmp -type f -mtime +7 -delete 2>/dev/null

echo ""
echo "清理后磁盘使用:"
df -h / | tail -1`,
    tags: ["磁盘", "清理"],
    help: [
      { title: "功能说明", items: ["查看磁盘使用情况", "查找最大的文件", "清理 apt 缓存、旧日志、临时文件"] },
      { title: "使用方法", items: ["直接运行查看磁盘使用", "根据输出手动清理大文件", "注意不要删除系统关键文件"] },
    ],
  },
  {
    id: "sh-service-manager",
    name: "服务管理",
    description: "统一服务管理脚本",
    code: `#!/bin/bash

SERVICES=("nginx" "mysql" "redis" "myapp")

usage() {
    echo "Usage: \$0 {start|stop|restart|status}"
    exit 1
}

[ -z "\$1" ] && usage

case "\$1" in
    start)
        for svc in "\${SERVICES[@]}"; do
            systemctl start \$svc
            echo "Started: \$svc"
        done
        ;;
    stop)
        for svc in "\${SERVICES[@]}"; do
            systemctl stop \$svc
            echo "Stopped: \$svc"
        done
        ;;
    restart)
        for svc in "\${SERVICES[@]}"; do
            systemctl restart \$svc
            echo "Restarted: \$svc"
        done
        ;;
    status)
        for svc in "\${SERVICES[@]}"; do
            printf "%-15s: " \$svc
            systemctl is-active \$svc
        done
        ;;
    *)
        usage
        ;;
esac`,
    tags: ["服务", "管理"],
    help: [
      { title: "功能说明", items: ["统一管理多个服务的启动/停止/重启/状态查看"] },
      { title: "使用方法", items: ["修改 SERVICES 数组为要管理的服务", "运行: ./sh-service-manager.sh start", "支持 start/stop/restart/status 四个命令"] },
    ],
  },
];
