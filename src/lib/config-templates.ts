export interface ConfigTemplate {
  id: string;
  name: string;
  category: "docker" | "nginx" | "systemd" | "cron" | "ssh" | "gitlab";
  description: string;
  content: string;
}

export const configTemplates: ConfigTemplate[] = [
  // Docker Compose 模板
  {
    id: "docker-wordpress",
    name: "WordPress + MySQL",
    category: "docker",
    description: "完整的 WordPress 博客系统，包含 MySQL 数据库",
    content: `version: '3.8'
services:
  wordpress:
    image: wordpress:latest
    ports:
      - "80:80"
    environment:
      - WORDPRESS_DB_HOST=mysql:3306
      - WORDPRESS_DB_USER=wp_user
      - WORDPRESS_DB_PASSWORD=your_password
      - WORDPRESS_DB_NAME=wordpress
    volumes:
      - wordpress_data:/var/www/html
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root_password
      - MYSQL_USER=wp_user
      - MYSQL_PASSWORD=your_password
      - MYSQL_DATABASE=wordpress
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  wordpress_data:
  mysql_data:`,
  },
  {
    id: "docker-nginx-proxy",
    name: "Nginx 反向代理 + Node.js",
    category: "docker",
    description: "Nginx 反向代理多个 Node.js 应用",
    content: `version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app1
      - app2

  app1:
    image: node:18-alpine
    working_dir: /app
    volumes:
      - ./app1:/app
    command: npm start

  app2:
    image: node:18-alpine
    working_dir: /app
    volumes:
      - ./app2:/app
    command: npm start`,
  },
  {
    id: "docker-redis-cluster",
    name: "Redis 集群",
    category: "docker",
    description: "3 主 3 从的 Redis 集群",
    content: `version: '3.8'
services:
  redis-node-1:
    image: redis:7-alpine
    ports:
      - "7001:7001"
    command: redis-server --port 7001 --cluster-enabled yes --cluster-config-file nodes.conf --cluster-node-timeout 5000

  redis-node-2:
    image: redis:7-alpine
    ports:
      - "7002:7002"
    command: redis-server --port 7002 --cluster-enabled yes --cluster-config-file nodes.conf --cluster-node-timeout 5000

  redis-node-3:
    image: redis:7-alpine
    ports:
      - "7003:7003"
    command: redis-server --port 7003 --cluster-enabled yes --cluster-config-file nodes.conf --cluster-node-timeout 5000

  redis-node-4:
    image: redis:7-alpine
    ports:
      - "7004:7004"
    command: redis-server --port 7004 --cluster-enabled yes --cluster-config-file nodes.conf --cluster-node-timeout 5000

  redis-node-5:
    image: redis:7-alpine
    ports:
      - "7005:7005"
    command: redis-server --port 7005 --cluster-enabled yes --cluster-config-file nodes.conf --cluster-node-timeout 5000

  redis-node-6:
    image: redis:7-alpine
    ports:
      - "7006:7006"
    command: redis-server --port 7006 --cluster-enabled yes --cluster-config-file nodes.conf --cluster-node-timeout 5000`,
  },
  // Nginx 模板
  {
    id: "nginx-reverse-proxy",
    name: "Nginx 反向代理",
    category: "nginx",
    description: "标准反向代理配置，带 WebSocket 支持",
    content: `server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`,
  },
  {
    id: "nginx-static",
    name: "Nginx 静态站点",
    category: "nginx",
    description: "静态网站托管配置，带 Gzip 压缩",
    content: `server {
    listen 80;
    server_name example.com;
    root /var/www/example.com;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 1000;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \\.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}`,
  },
  {
    id: "nginx-load-balancer",
    name: "Nginx 负载均衡",
    category: "nginx",
    description: "负载均衡配置，支持轮询和 IP Hash",
    content: `upstream backend {
    # 轮询（默认）
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
    server 192.168.1.12:8080;

    # IP Hash（会话保持）
    # ip_hash;

    # 加权轮询
    # server 192.168.1.10:8080 weight=3;
    # server 192.168.1.11:8080 weight=1;
}

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`,
  },
  // Systemd 模板
  {
    id: "systemd-nodejs",
    name: "Node.js 应用",
    category: "systemd",
    description: "Node.js 应用的 systemd 服务配置",
    content: `[Unit]
Description=Node.js Application
After=network.target

[Service]
Type=simple
User=node
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target`,
  },
  {
    id: "systemd-python",
    name: "Python 应用",
    category: "systemd",
    description: "Python 应用的 systemd 服务配置",
    content: `[Unit]
Description=Python Application
After=network.target

[Service]
Type=simple
User=python
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/python3 app.py
Restart=always
RestartSec=10
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target`,
  },
  {
    id: "systemd-docker",
    name: "Docker Compose 服务",
    category: "systemd",
    description: "管理 Docker Compose 的 systemd 服务",
    content: `[Unit]
Description=Docker Compose Application
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/myapp
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down

[Install]
WantedBy=multi-user.target`,
  },
  // Cron 模板
  {
    id: "cron-backup-db",
    name: "数据库备份",
    category: "cron",
    description: "每天凌晨 3 点备份 MySQL 数据库",
    content: `0 3 * * * /usr/bin/mysqldump -u root -p'password' --all-databases | gzip > /backup/db_$(date +\\%Y\\%m\\%d).sql.gz`,
  },
  {
    id: "cron-log-rotate",
    name: "日志清理",
    category: "cron",
    description: "每周日凌晨 2 点清理 30 天前的日志",
    content: `0 2 * * 0 find /var/log/myapp -name "*.log" -mtime +30 -delete`,
  },
  {
    id: "cron-health-check",
    name: "健康检查",
    category: "cron",
    description: "每 5 分钟检查服务是否正常",
    content: `*/5 * * * * curl -f http://localhost:3000/health || systemctl restart myapp`,
  },
  // SSH 模板
  {
    id: "ssh-config",
    name: "SSH 客户端配置",
    category: "ssh",
    description: "SSH 客户端 ~/.ssh/config 配置模板",
    content: `Host production
    HostName 192.168.1.100
    User deploy
    Port 22
    IdentityFile ~/.ssh/id_rsa

Host staging
    HostName 192.168.1.101
    User deploy
    Port 22
    IdentityFile ~/.ssh/id_rsa`,
  },
  {
    id: "ssh-hardening",
    name: "SSH 服务加固",
    category: "ssh",
    description: "SSH 服务端安全加固配置",
    content: `/etc/ssh/sshd_config

Port 2222
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
AllowUsers deploy admin`,
  },
  // GitLab Runner 模板
  {
    id: "gitlab-runner-config",
    name: "GitLab Runner 配置",
    category: "gitlab",
    description: "GitLab Runner 的 config.toml 配置",
    content: `concurrent = 4
check_interval = 0

[session_server]
  session_timeout = 1800

[[runners]]
  name = "my-runner"
  url = "https://gitlab.com/"
  token = "YOUR_TOKEN"
  executor = "docker"
  [runners.docker]
    tls_verify = false
    image = "alpine:latest"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache"]
    shm_size = 0
    network_mtu = 0
  [runners.cache]
    [runners.cache.s3]
    [runners.cache.gcs]`,
  },
];

export const templateCategories = [
  { id: "docker", name: "Docker Compose", icon: "🐳" },
  { id: "nginx", name: "Nginx", icon: "🌐" },
  { id: "systemd", name: "Systemd", icon: "⚙️" },
  { id: "cron", name: "Cron", icon: "⏰" },
  { id: "ssh", name: "SSH", icon: "🔐" },
  { id: "gitlab", name: "GitLab", icon: "🦊" },
];
