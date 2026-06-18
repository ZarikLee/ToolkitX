export interface Script {
  id: string;
  name: string;
  description: string;
  code: string;
  tags: string[];
  help: { title: string; items: string[] }[];
}

export const pythonScripts: Script[] = [
  {
    id: "py-http-server",
    name: "HTTP 服务器",
    description: "简单 HTTP 服务器，支持 GET/POST",
    code: `from http.server import HTTPServer, BaseHTTPRequestHandler
import json

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"status": "ok"}).encode())

    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        body = self.rfile.read(content_length)
        data = json.loads(body)
        print(f"Received: {data}")
        self.send_response(200)
        self.end_headers()

if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", 8080), Handler)
    print("Server running on port 8080")
    server.serve_forever()`,
    tags: ["HTTP", "服务器"],
    help: [
      { title: "功能说明", items: ["启动一个简单的 HTTP 服务器", "支持 GET 和 POST 请求", "默认监听 8080 端口"] },
      { title: "使用方法", items: ["安装 Python 3（无需额外依赖）", "运行: python http-server.py", "浏览器访问 http://localhost:8080", "修改 Handler 类来自定义路由逻辑"] },
    ],
  },
  {
    id: "py-file-watcher",
    name: "文件监控",
    description: "监控目录变化，自动执行操作",
    code: `import time
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class Watcher(FileSystemEventHandler):
    def on_created(self, event):
        print(f"New file: {event.src_path}")

    def on_modified(self, event):
        print(f"Modified: {event.src_path}")

    def on_deleted(self, event):
        print(f"Deleted: {event.src_path}")

if __name__ == "__main__":
    path = "/tmp/watch"
    observer = Observer()
    observer.schedule(Watcher(), path, recursive=True)
    observer.start()
    print(f"Watching {path}...")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()`,
    tags: ["文件监控", "自动化"],
    help: [
      { title: "功能说明", items: ["实时监控指定目录的文件变化", "自动检测文件创建、修改、删除事件"] },
      { title: "使用方法", items: ["安装依赖: pip install watchdog", "修改 path 变量为要监控的目录", "运行脚本后保持终端开启", "在监控目录中创建/修改文件查看效果"] },
    ],
  },
  {
    id: "py-log-parser",
    name: "日志分析器",
    description: "解析 Nginx/Apache 日志，统计访问量",
    code: `import re
from collections import Counter
from datetime import datetime

def parse_nginx_log(log_file):
    pattern = r'(\\d+\\.\\d+\\.\\d+\\.\\d+) - - \\[(.*?)\\] "(.*?)" (\\d+) (\\d+)'
    stats = {
        "total": 0,
        "status": Counter(),
        "ips": Counter(),
        "urls": Counter(),
    }

    with open(log_file, "r") as f:
        for line in f:
            match = re.match(pattern, line)
            if match:
                ip, date, request, status, size = match.groups()
                stats["total"] += 1
                stats["status"][status] += 1
                stats["ips"][ip] += 1
                url = request.split(" ")[1] if " " in request else ""
                stats["urls"][url] += 1

    return stats

if __name__ == "__main__":
    stats = parse_nginx_log("/var/log/nginx/access.log")
    print(f"Total requests: {stats['total']}")
    print("\\nTop 5 IPs:")
    for ip, count in stats["ips"].most_common(5):
        print(f"  {ip}: {count}")`,
    tags: ["日志分析", "Nginx"],
    help: [
      { title: "功能说明", items: ["解析 Nginx/Apache 访问日志", "统计总请求数、状态码分布、Top IP、Top URL"] },
      { title: "使用方法", items: ["修改 log_file 路径为实际日志文件", "运行脚本即可看到统计结果", "可扩展分析更多字段（User-Agent、Referer 等）"] },
    ],
  },
  {
    id: "py-port-scanner",
    name: "端口扫描器",
    description: "快速扫描目标主机开放端口",
    code: `import socket
from concurrent.futures import ThreadPoolExecutor

def scan_port(host, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((host, port))
        sock.close()
        return port, result == 0
    except:
        return port, False

def scan_ports(host, ports=None):
    if ports is None:
        ports = [21, 22, 80, 443, 3306, 5432, 6379, 8080, 8443]

    print(f"Scanning {host}...")
    open_ports = []

    with ThreadPoolExecutor(max_workers=10) as executor:
        results = executor.map(lambda p: scan_port(host, p), ports)
        for port, is_open in results:
            if is_open:
                print(f"  Port {port}: OPEN")
                open_ports.append(port)

    print(f"\\nTotal open ports: {len(open_ports)}")
    return open_ports

if __name__ == "__main__":
    import sys
    host = sys.argv[1] if len(sys.argv) > 1 else "127.0.0.1"
    scan_ports(host)`,
    tags: ["网络", "端口扫描"],
    help: [
      { title: "功能说明", items: ["多线程扫描目标主机的常用端口", "快速判断哪些端口是开放的"] },
      { title: "使用方法", items: ["运行: python port-scanner.py 192.168.1.1", "不传参数默认扫描 127.0.0.1", "可修改 ports 列表自定义扫描范围"] },
    ],
  },
  {
    id: "py-system-info",
    name: "系统信息采集",
    description: "采集 CPU、内存、磁盘等系统信息",
    code: `import psutil
import platform
import json
from datetime import datetime

def get_system_info():
    info = {
        "hostname": platform.node(),
        "os": f"{platform.system()} {platform.release()}",
        "cpu": {
            "percent": psutil.cpu_percent(interval=1),
            "cores": psutil.cpu_count(),
            "freq": psutil.cpu_freq()._asdict() if psutil.cpu_freq() else None,
        },
        "memory": {
            "total": psutil.virtual_memory().total,
            "used": psutil.virtual_memory().used,
            "percent": psutil.virtual_memory().percent,
        },
        "disk": {
            "total": psutil.disk_usage("/").total,
            "used": psutil.disk_usage("/").used,
            "percent": psutil.disk_usage("/").percent,
        },
        "network": {
            "bytes_sent": psutil.net_io_counters().bytes_sent,
            "bytes_recv": psutil.net_io_counters().bytes_recv,
        },
        "timestamp": datetime.now().isoformat(),
    }
    return info

if __name__ == "__main__":
    info = get_system_info()
    print(json.dumps(info, indent=2))`,
    tags: ["系统监控", "信息采集"],
    help: [
      { title: "功能说明", items: ["一键采集 CPU、内存、磁盘、网络信息", "输出 JSON 格式，方便接入监控系统"] },
      { title: "使用方法", items: ["安装依赖: pip install psutil", "运行: python system-info.py", "可配合 crontab 定时采集上报"] },
    ],
  },
  {
    id: "py-process-monitor",
    name: "进程监控",
    description: "监控进程资源使用，自动杀死高占用进程",
    code: `import psutil
import time
from datetime import datetime

def monitor_processes(threshold=80, interval=5):
    """监控进程，CPU 超过阈值时报警"""
    print(f"Monitoring processes (CPU threshold: {threshold}%)...")
    print("Press Ctrl+C to stop\\n")

    try:
        while True:
            for proc in psutil.process_iter(["pid", "name", "cpu_percent", "memory_percent"]):
                if proc.info["cpu_percent"] > threshold:
                    print(f"[{datetime.now()}] HIGH CPU: {proc.info['name']} "
                          f"(PID: {proc.info['pid']}, CPU: {proc.info['cpu_percent']}%)")
            time.sleep(interval)
    except KeyboardInterrupt:
        print("Monitoring stopped")

if __name__ == "__main__":
    import sys
    threshold = int(sys.argv[1]) if len(sys.argv) > 1 else 80
    monitor_processes(threshold)`,
    tags: ["进程监控", "自动化"],
    help: [
      { title: "功能说明", items: ["持续监控所有进程的 CPU 使用率", "超过阈值时输出告警信息"] },
      { title: "使用方法", items: ["安装依赖: pip install psutil", "运行: python process-monitor.py 80", "参数为 CPU 告警阈值（默认 80%）", "按 Ctrl+C 停止监控"] },
    ],
  },
  {
    id: "py-backup",
    name: "文件备份",
    description: "增量备份工具，支持压缩和日期命名",
    code: `import shutil
import os
from datetime import datetime
from pathlib import Path

def backup(src_dir, backup_dir, keep_days=7):
    """增量备份目录"""
    src = Path(src_dir)
    backup = Path(backup_dir)
    backup.mkdir(parents=True, exist_ok=True)

    date_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_name = f"backup_{date_str}"
    backup_path = backup / backup_name

    print(f"Backing up {src} to {backup_path}")
    shutil.make_archive(str(backup_path), "gztar", src)
    print(f"Backup complete: {backup_path}.tar.gz")

    # 清理旧备份
    if keep_days > 0:
        cutoff = datetime.now().timestamp() - (keep_days * 86400)
        for f in backup.glob("backup_*.tar.gz*"):
            if f.stat().st_mtime < cutoff:
                print(f"Removing old backup: {f.name}")
                f.unlink()

if __name__ == "__main__":
    import sys
    src = sys.argv[1] if len(sys.argv) > 1 else "/data"
    backup_dir = sys.argv[2] if len(sys.argv) > 2 else "/backup"
    backup(src, backup_dir)`,
    tags: ["备份", "自动化"],
    help: [
      { title: "功能说明", items: ["将指定目录压缩为 .tar.gz 备份", "自动清理超过保留天数的旧备份"] },
      { title: "使用方法", items: ["运行: python backup.py /data /backup", "第一个参数是源目录，第二个是备份目录", "修改 keep_days 变量控制保留天数", "可配合 crontab 每天自动备份"] },
    ],
  },
  {
    id: "py-redis-cache",
    name: "Redis 缓存管理",
    description: "Redis 连接、缓存读写、过期清理",
    code: `import redis
import json
from datetime import datetime

class RedisCache:
    def __init__(self, host="localhost", port=6379, db=0):
        self.client = redis.Redis(host=host, port=port, db=db, decode_responses=True)

    def get(self, key):
        value = self.client.get(key)
        if value:
            return json.loads(value)
        return None

    def set(self, key, value, expire=None):
        self.client.set(key, json.dumps(value), ex=expire)

    def delete(self, key):
        self.client.delete(key)

    def clear_expired(self):
        """清理过期键"""
        count = 0
        for key in self.client.scan_iter("*"):
            ttl = self.client.ttl(key)
            if ttl == -1:  # 没有过期时间
                continue
            count += 1
        return count

    def get_stats(self):
        info = self.client.info()
        return {
            "connected_clients": info.get("connected_clients", 0),
            "used_memory": info.get("used_memory_human", "0B"),
            "keys": sum(1 for _ in self.client.scan_iter("*")),
        }

if __name__ == "__main__":
    cache = RedisCache()
    stats = cache.get_stats()
    print(json.dumps(stats, indent=2))`,
    tags: ["Redis", "缓存"],
    help: [
      { title: "功能说明", items: ["封装 Redis 常用操作（读写、删除、清理）", "支持 JSON 序列化存储", "查看 Redis 连接数、内存、键数统计"] },
      { title: "使用方法", items: ["安装依赖: pip install redis", "修改 RedisCache() 的 host/port 参数", "调用 get_stats() 查看服务状态"] },
    ],
  },
  {
    id: "py-mysql-backup",
    name: "MySQL 备份",
    description: "MySQL 数据库自动备份脚本",
    code: `import subprocess
import os
from datetime import datetime
from pathlib import Path

def backup_mysql(host, user, password, databases=None, backup_dir="/backup/mysql"):
    """备份 MySQL 数据库"""
    Path(backup_dir).mkdir(parents=True, exist_ok=True)

    date_str = datetime.now().strftime("%Y%m%d_%H%M%S")

    if databases is None:
        # 备份所有数据库
        cmd = f"mysqldump -h {host} -u {user} -p'{password}' --all-databases"
        filename = f"all_databases_{date_str}.sql"
    else:
        # 备份指定数据库
        db_list = " ".join(databases)
        cmd = f"mysqldump -h {host} -u {user} -p'{password}' {db_list}"
        filename = f"databases_{date_str}.sql"

    filepath = os.path.join(backup_dir, filename)
    with open(filepath, "w") as f:
        subprocess.run(cmd, shell=True, stdout=f, stderr=True)

    print(f"Backup complete: {filepath}")
    return filepath

if __name__ == "__main__":
    backup_mysql(
        host="localhost",
        user="root",
        password="your_password",
        databases=["mydb"],
    )`,
    tags: ["MySQL", "备份"],
    help: [
      { title: "功能说明", items: ["自动备份 MySQL 数据库", "支持备份所有库或指定库", "文件名自动带时间戳"] },
      { title: "使用方法", items: ["修改 host、user、password、databases 参数", "运行: python mysql-backup.py", "备份文件保存在 /backup/mysql 目录", "可配合 crontab 定时备份"] },
    ],
  },
  {
    id: "py-docker-stats",
    name: "Docker 容器监控",
    description: "获取 Docker 容器资源使用统计",
    code: `import docker
import json

def get_container_stats():
    client = docker.from_env()
    stats = []

    for container in client.containers.list():
        stat = container.stats(stream=False)
        stats.append({
            "name": container.name,
            "status": container.status,
            "cpu_percent": calculate_cpu_percent(stat),
            "memory_usage": stat["memory_stats"].get("usage", 0),
            "memory_limit": stat["memory_stats"].get("limit", 0),
            "network_rx": stat["networks"].get("eth0", {}).get("rx_bytes", 0),
            "network_tx": stat["networks"].get("eth0", {}).get("tx_bytes", 0),
        })

    return stats

def calculate_cpu_percent(stat):
    cpu_delta = stat["cpu_stats"]["cpu_usage"]["total_usage"] - \\
                stat["precpu_stats"]["cpu_usage"]["total_usage"]
    system_delta = stat["cpu_stats"]["system_cpu_usage"] - \\
                   stat["precpu_stats"]["system_cpu_usage"]
    cpu_count = stat["cpu_stats"]["online_cpus"]

    if system_delta > 0 and cpu_delta > 0:
        return (cpu_delta / system_delta) * cpu_count * 100.0
    return 0.0

if __name__ == "__main__":
    stats = get_container_stats()
    print(json.dumps(stats, indent=2))`,
    tags: ["Docker", "监控"],
    help: [
      { title: "功能说明", items: ["获取所有运行中容器的 CPU、内存、网络使用", "输出 JSON 格式的详细统计信息"] },
      { title: "使用方法", items: ["安装依赖: pip install docker", "确保 Docker 守护进程正在运行", "运行: python docker-stats.py"] },
    ],
  },
  {
    id: "py-web-scraper",
    name: "网页抓取器",
    description: "使用 BeautifulSoup 抓取网页内容",
    code: `import requests
from bs4 import BeautifulSoup
import json

def scrape_url(url, selector=None):
    """抓取网页内容"""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    if selector:
        elements = soup.select(selector)
        return [{"text": el.get_text(strip=True), "html": str(el)} for el in elements]

    return {
        "title": soup.title.string if soup.title else "",
        "text": soup.get_text(strip=True)[:1000],
        "links": [{"text": a.get_text(strip=True), "href": a.get("href")}
                  for a in soup.find_all("a", href=True)[:10]],
    }

if __name__ == "__main__":
    result = scrape_url("https://example.com")
    print(json.dumps(result, indent=2, ensure_ascii=False))`,
    tags: ["爬虫", "网页抓取"],
    help: [
      { title: "功能说明", items: ["抓取指定 URL 的网页内容", "支持 CSS 选择器精确提取", "返回标题、正文、链接等信息"] },
      { title: "使用方法", items: ["安装依赖: pip install requests beautifulsoup4", "运行: python web-scraper.py https://example.com", "传入第二个参数可使用 CSS 选择器", "注意遵守网站 robots.txt 规则"] },
      { title: "参数说明", items: ["url: 要抓取的网页地址", "selector: 可选，CSS 选择器筛选特定元素", "返回 JSON 格式结果"] },
    ],
  },
  {
    id: "py-json-processor",
    name: "JSON 处理器",
    description: "JSON 文件读取、过滤、转换、合并",
    code: `import json
from pathlib import Path

def read_json(filepath):
    with open(filepath, "r") as f:
        return json.load(f)

def write_json(filepath, data, indent=2):
    with open(filepath, "w") as f:
        json.dump(data, f, indent=indent, ensure_ascii=False)

def filter_json(data, key, value):
    """过滤 JSON 数组"""
    if isinstance(data, list):
        return [item for item in data if item.get(key) == value]
    return data

def merge_json(file1, file2, output):
    """合并两个 JSON 文件"""
    data1 = read_json(file1)
    data2 = read_json(file2)

    if isinstance(data1, list) and isinstance(data2, list):
        result = data1 + data2
    elif isinstance(data1, dict) and isinstance(data2, dict):
        result = {**data1, **data2}
    else:
        raise ValueError("Cannot merge different types")

    write_json(output, result)
    return result

if __name__ == "__main__":
    # 示例：过滤 JSON
    data = read_json("data.json")
    filtered = filter_json(data, "status", "active")
    write_json("filtered.json", filtered)`,
    tags: ["JSON", "数据处理"],
    help: [
      { title: "功能说明", items: ["读取/写入 JSON 文件", "按字段过滤 JSON 数组", "合并两个 JSON 文件"] },
      { title: "使用方法", items: ["调用 read_json() 读取文件", "调用 filter_json(data, key, value) 过滤", "调用 merge_json(file1, file2, output) 合并"] },
    ],
  },
  {
    id: "py-email-sender",
    name: "邮件发送器",
    description: "发送带附件的邮件",
    code: `import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

def send_email(to, subject, body, attachments=None, smtp_host="smtp.gmail.com", smtp_port=587):
    msg = MIMEMultipart()
    msg["From"] = "your_email@gmail.com"
    msg["To"] = to
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "html"))

    for filepath in attachments or []:
        with open(filepath, "rb") as f:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(f.read())
            encoders.encode_base64(part)
            part.add_header("Content-Disposition", f"attachment; filename={filepath.split('/')[-1]}")
            msg.attach(part)

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login("your_email@gmail.com", "your_password")
        server.send_message(msg)

    print(f"Email sent to {to}")

if __name__ == "__main__":
    send_email(
        to="recipient@example.com",
        subject="Test Email",
        body="<h1>Hello!</h1><p>This is a test email.</p>",
    )`,
    tags: ["邮件", "通知"],
    help: [
      { title: "功能说明", items: ["发送 HTML 格式邮件", "支持添加附件", "使用 SMTP 协议"] },
      { title: "使用方法", items: ["修改 smtp_host、发件人邮箱和密码", "修改 recipient 和邮件内容", "运行脚本即可发送", "注意：需要开启邮箱的 SMTP 服务并生成授权码"] },
    ],
  },
  {
    id: "py-api-client",
    name: "API 客户端",
    description: "通用 REST API 客户端，支持认证",
    code: `import requests
from typing import Optional

class ApiClient:
    def __init__(self, base_url, api_key=None):
        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()
        if api_key:
            self.session.headers["Authorization"] = f"Bearer {api_key}"

    def get(self, path, params=None):
        return self._request("GET", path, params=params)

    def post(self, path, data=None):
        return self._request("POST", path, json=data)

    def put(self, path, data=None):
        return self._request("PUT", path, json=data)

    def delete(self, path):
        return self._request("DELETE", path)

    def _request(self, method, path, **kwargs):
        url = f"{self.base_url}{path}"
        response = self.session.request(method, url, **kwargs)
        response.raise_for_status()
        return response.json()

if __name__ == "__main__":
    client = ApiClient("https://api.example.com", api_key="your_key")
    data = client.get("/users")
    print(data)`,
    tags: ["API", "HTTP"],
    help: [
      { title: "功能说明", items: ["封装 REST API 的 GET/POST/PUT/DELETE", "支持 Bearer Token 认证", "自动处理 JSON 序列化"] },
      { title: "使用方法", items: ["修改 base_url 为 API 地址", "传入 api_key 启用认证", "调用 client.get('/path') 等方法"] },
    ],
  },
  {
    id: "py-config-manager",
    name: "配置管理器",
    description: "读取/写入配置文件，支持 YAML/JSON/INI",
    code: `import json
import configparser
from pathlib import Path

class ConfigManager:
    def __init__(self, filepath):
        self.filepath = Path(filepath)
        self.config = {}
        self.load()

    def load(self):
        if not self.filepath.exists():
            return

        suffix = self.filepath.suffix.lower()
        if suffix == ".json":
            with open(self.filepath) as f:
                self.config = json.load(f)
        elif suffix in (".ini", ".cfg"):
            parser = configparser.ConfigParser()
            parser.read(self.filepath)
            self.config = {s: dict(parser.items(s)) for s in parser.sections()}
        else:
            raise ValueError(f"Unsupported config format: {suffix}")

    def save(self):
        suffix = self.filepath.suffix.lower()
        if suffix == ".json":
            with open(self.filepath, "w") as f:
                json.dump(self.config, f, indent=2)
        elif suffix in (".ini", ".cfg"):
            parser = configparser.ConfigParser()
            for section, values in self.config.items():
                parser[section] = values
            with open(self.filepath, "w") as f:
                parser.write(f)

    def get(self, key, default=None):
        keys = key.split(".")
        value = self.config
        for k in keys:
            if isinstance(value, dict):
                value = value.get(k)
            else:
                return default
            if value is None:
                return default
        return value

    def set(self, key, value):
        keys = key.split(".")
        config = self.config
        for k in keys[:-1]:
            config = config.setdefault(k, {})
        config[keys[-1]] = value

if __name__ == "__main__":
    config = ConfigManager("settings.json")
    print(config.get("database.host", "localhost"))
    config.set("database.port", 5432)
    config.save()`,
    tags: ["配置", "文件管理"],
    help: [
      { title: "功能说明", items: ["统一管理 JSON/INI 格式配置文件", "支持嵌套 key 读取（如 database.host）", "自动保存修改"] },
      { title: "使用方法", items: ["初始化: config = ConfigManager('settings.json')", "读取: config.get('database.host', '默认值')", "写入: config.set('database.port', 5432)", "保存: config.save()"] },
    ],
  },
];
