(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4225],{136:(e,t,s)=>{"use strict";s.d(t,{y:()=>n});var i=s(5155),a=s(8500),r=s.n(a),o=s(6304);function n({title:e,subtitle:t,helpContent:s,tabs:a,children:l}){return(0,i.jsx)("main",{className:"flex-1 min-h-0 relative z-10",children:(0,i.jsxs)("div",{className:"max-w-7xl mx-auto px-4 py-4 md:px-8 md:py-8 h-full overflow-auto",children:[(0,i.jsxs)("div",{className:"flex items-center gap-3 mb-2 animate-fade-in",children:[(0,i.jsx)(r(),{href:"/",className:"btn-close",title:"返回首页",children:(0,i.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("path",{d:"M10 12L6 8l4-4"})})}),(0,i.jsx)("h1",{className:"text-[22px] font-bold tracking-tight",children:e}),s&&(0,i.jsx)(o.p,{content:s})]}),t&&(0,i.jsx)("p",{className:"text-muted-foreground text-[13px] mb-8 animate-fade-in",children:t}),a&&(0,i.jsx)("div",{className:"flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-6 w-fit animate-fade-in",children:a}),(0,i.jsx)("div",{className:"animate-fade-in",children:l})]})})}},3273:(e,t,s)=>{"use strict";s.d(t,{K:()=>r});var i=s(5155),a=s(8599);function r({active:e,onClick:t,children:s,icon:o}){return(0,i.jsxs)("button",{onClick:t,className:(0,a.cn)("flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200",e?"bg-white/[0.1] text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.2)]":"text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"),children:[o,s]})}},6304:(e,t,s)=>{"use strict";s.d(t,{p:()=>o});var i=s(5155),a=s(2115),r=s(7650);function o({content:e}){let[t,s]=(0,a.useState)(!1),n=(0,a.useRef)(null),[l,c]=(0,a.useState)({top:0,left:0});return(0,a.useEffect)(()=>{if(t&&n.current){let e=n.current.getBoundingClientRect();c({top:e.bottom+6,left:e.left})}},[t]),(0,a.useEffect)(()=>{if(!t)return;let e=e=>{"Escape"===e.key&&s(!1)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[t]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("button",{ref:n,onClick:()=>s(!t),className:"flex items-center justify-center w-5 h-5 rounded-full text-muted-foreground hover:bg-white/[0.06] transition-all duration-200",title:"使用帮助",children:(0,i.jsx)("span",{className:"text-[10px] font-semibold",children:"?"})}),t&&(0,r.createPortal)((0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"fixed inset-0 z-[9998]",onClick:()=>s(!1)}),(0,i.jsx)("div",{className:"fixed z-[9999] w-72 rounded-xl p-4 space-y-3 animate-scale-in glass-heavy",style:{top:l.top,left:l.left,boxShadow:"0 8px 32px rgba(0,0,0,0.15)"},children:e.map((e,t)=>(0,i.jsxs)("div",{children:[(0,i.jsx)("h4",{className:"text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5",children:e.title}),(0,i.jsx)("ul",{className:"space-y-1.5",children:e.items.map((e,t)=>(0,i.jsxs)("li",{className:"text-[12px] text-foreground/80 flex gap-2 leading-relaxed",children:[(0,i.jsx)("span",{className:"text-[#0a84ff] shrink-0",children:"•"}),(0,i.jsx)("span",{children:e})]},t))})]},t))})]}),document.body)]})}},6617:(e,t,s)=>{Promise.resolve().then(s.bind(s,8387))},8387:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>f});var i=s(5155),a=s(2115);let r=[{id:"py-http-server",name:"HTTP 服务器",description:"简单 HTTP 服务器，支持 GET/POST",code:`from http.server import HTTPServer, BaseHTTPRequestHandler
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
    server.serve_forever()`,tags:["HTTP","服务器"],help:[{title:"功能说明",items:["启动一个简单的 HTTP 服务器","支持 GET 和 POST 请求","默认监听 8080 端口"]},{title:"使用方法",items:["安装 Python 3（无需额外依赖）","运行: python http-server.py","浏览器访问 http://localhost:8080","修改 Handler 类来自定义路由逻辑"]}]},{id:"py-file-watcher",name:"文件监控",description:"监控目录变化，自动执行操作",code:`import time
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
    observer.join()`,tags:["文件监控","自动化"],help:[{title:"功能说明",items:["实时监控指定目录的文件变化","自动检测文件创建、修改、删除事件"]},{title:"使用方法",items:["安装依赖: pip install watchdog","修改 path 变量为要监控的目录","运行脚本后保持终端开启","在监控目录中创建/修改文件查看效果"]}]},{id:"py-log-parser",name:"日志分析器",description:"解析 Nginx/Apache 日志，统计访问量",code:`import re
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
        print(f"  {ip}: {count}")`,tags:["日志分析","Nginx"],help:[{title:"功能说明",items:["解析 Nginx/Apache 访问日志","统计总请求数、状态码分布、Top IP、Top URL"]},{title:"使用方法",items:["修改 log_file 路径为实际日志文件","运行脚本即可看到统计结果","可扩展分析更多字段（User-Agent、Referer 等）"]}]},{id:"py-port-scanner",name:"端口扫描器",description:"快速扫描目标主机开放端口",code:`import socket
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
    scan_ports(host)`,tags:["网络","端口扫描"],help:[{title:"功能说明",items:["多线程扫描目标主机的常用端口","快速判断哪些端口是开放的"]},{title:"使用方法",items:["运行: python port-scanner.py 192.168.1.1","不传参数默认扫描 127.0.0.1","可修改 ports 列表自定义扫描范围"]}]},{id:"py-system-info",name:"系统信息采集",description:"采集 CPU、内存、磁盘等系统信息",code:`import psutil
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
    print(json.dumps(info, indent=2))`,tags:["系统监控","信息采集"],help:[{title:"功能说明",items:["一键采集 CPU、内存、磁盘、网络信息","输出 JSON 格式，方便接入监控系统"]},{title:"使用方法",items:["安装依赖: pip install psutil","运行: python system-info.py","可配合 crontab 定时采集上报"]}]},{id:"py-process-monitor",name:"进程监控",description:"监控进程资源使用，自动杀死高占用进程",code:`import psutil
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
    monitor_processes(threshold)`,tags:["进程监控","自动化"],help:[{title:"功能说明",items:["持续监控所有进程的 CPU 使用率","超过阈值时输出告警信息"]},{title:"使用方法",items:["安装依赖: pip install psutil","运行: python process-monitor.py 80","参数为 CPU 告警阈值（默认 80%）","按 Ctrl+C 停止监控"]}]},{id:"py-backup",name:"文件备份",description:"增量备份工具，支持压缩和日期命名",code:`import shutil
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
    backup(src, backup_dir)`,tags:["备份","自动化"],help:[{title:"功能说明",items:["将指定目录压缩为 .tar.gz 备份","自动清理超过保留天数的旧备份"]},{title:"使用方法",items:["运行: python backup.py /data /backup","第一个参数是源目录，第二个是备份目录","修改 keep_days 变量控制保留天数","可配合 crontab 每天自动备份"]}]},{id:"py-redis-cache",name:"Redis 缓存管理",description:"Redis 连接、缓存读写、过期清理",code:`import redis
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
    print(json.dumps(stats, indent=2))`,tags:["Redis","缓存"],help:[{title:"功能说明",items:["封装 Redis 常用操作（读写、删除、清理）","支持 JSON 序列化存储","查看 Redis 连接数、内存、键数统计"]},{title:"使用方法",items:["安装依赖: pip install redis","修改 RedisCache() 的 host/port 参数","调用 get_stats() 查看服务状态"]}]},{id:"py-mysql-backup",name:"MySQL 备份",description:"MySQL 数据库自动备份脚本",code:`import subprocess
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
    )`,tags:["MySQL","备份"],help:[{title:"功能说明",items:["自动备份 MySQL 数据库","支持备份所有库或指定库","文件名自动带时间戳"]},{title:"使用方法",items:["修改 host、user、password、databases 参数","运行: python mysql-backup.py","备份文件保存在 /backup/mysql 目录","可配合 crontab 定时备份"]}]},{id:"py-docker-stats",name:"Docker 容器监控",description:"获取 Docker 容器资源使用统计",code:`import docker
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
    print(json.dumps(stats, indent=2))`,tags:["Docker","监控"],help:[{title:"功能说明",items:["获取所有运行中容器的 CPU、内存、网络使用","输出 JSON 格式的详细统计信息"]},{title:"使用方法",items:["安装依赖: pip install docker","确保 Docker 守护进程正在运行","运行: python docker-stats.py"]}]},{id:"py-web-scraper",name:"网页抓取器",description:"使用 BeautifulSoup 抓取网页内容",code:`import requests
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
    print(json.dumps(result, indent=2, ensure_ascii=False))`,tags:["爬虫","网页抓取"],help:[{title:"功能说明",items:["抓取指定 URL 的网页内容","支持 CSS 选择器精确提取","返回标题、正文、链接等信息"]},{title:"使用方法",items:["安装依赖: pip install requests beautifulsoup4","运行: python web-scraper.py https://example.com","传入第二个参数可使用 CSS 选择器","注意遵守网站 robots.txt 规则"]},{title:"参数说明",items:["url: 要抓取的网页地址","selector: 可选，CSS 选择器筛选特定元素","返回 JSON 格式结果"]}]},{id:"py-json-processor",name:"JSON 处理器",description:"JSON 文件读取、过滤、转换、合并",code:`import json
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
    write_json("filtered.json", filtered)`,tags:["JSON","数据处理"],help:[{title:"功能说明",items:["读取/写入 JSON 文件","按字段过滤 JSON 数组","合并两个 JSON 文件"]},{title:"使用方法",items:["调用 read_json() 读取文件","调用 filter_json(data, key, value) 过滤","调用 merge_json(file1, file2, output) 合并"]}]},{id:"py-email-sender",name:"邮件发送器",description:"发送带附件的邮件",code:`import smtplib
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
    )`,tags:["邮件","通知"],help:[{title:"功能说明",items:["发送 HTML 格式邮件","支持添加附件","使用 SMTP 协议"]},{title:"使用方法",items:["修改 smtp_host、发件人邮箱和密码","修改 recipient 和邮件内容","运行脚本即可发送","注意：需要开启邮箱的 SMTP 服务并生成授权码"]}]},{id:"py-api-client",name:"API 客户端",description:"通用 REST API 客户端，支持认证",code:`import requests
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
    print(data)`,tags:["API","HTTP"],help:[{title:"功能说明",items:["封装 REST API 的 GET/POST/PUT/DELETE","支持 Bearer Token 认证","自动处理 JSON 序列化"]},{title:"使用方法",items:["修改 base_url 为 API 地址","传入 api_key 启用认证","调用 client.get('/path') 等方法"]}]},{id:"py-config-manager",name:"配置管理器",description:"读取/写入配置文件，支持 YAML/JSON/INI",code:`import json
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
    config.save()`,tags:["配置","文件管理"],help:[{title:"功能说明",items:["统一管理 JSON/INI 格式配置文件","支持嵌套 key 读取（如 database.host）","自动保存修改"]},{title:"使用方法",items:["初始化: config = ConfigManager('settings.json')","读取: config.get('database.host', '默认值')","写入: config.set('database.port', 5432)","保存: config.save()"]}]}],o=[{id:"sql-user-management",name:"用户管理",description:"创建、修改、删除数据库用户",code:`-- 创建用户
CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'password';

-- 授权
GRANT ALL PRIVILEGES ON mydb.* TO 'new_user'@'localhost';

-- 修改密码
ALTER USER 'new_user'@'localhost' IDENTIFIED BY 'new_password';

-- 查看用户权限
SHOW GRANTS FOR 'new_user'@'localhost';

-- 删除用户
DROP USER 'new_user'@'localhost';`,tags:["用户管理","权限"],help:[{title:"功能说明",items:["创建数据库用户并设置密码","授予/撤销用户权限","修改密码和删除用户"]},{title:"使用方法",items:["登录 MySQL: mysql -u root -p","复制对应 SQL 语句执行","将 new_user 和 password 替换为实际值","% 表示允许远程登录，localhost 仅本地"]}]},{id:"sql-backup-restore",name:"备份与恢复",description:"数据库备份和恢复脚本",code:`-- 备份单个数据库
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
mysqldump -u root -p --no-create-info mydb > data.sql`,tags:["备份","恢复"],help:[{title:"功能说明",items:["使用 mysqldump 备份数据库","支持备份所有库、指定库、指定表","支持只导出结构或只导出数据"]},{title:"使用方法",items:["在终端执行（不是 MySQL 内）","备份: mysqldump -u root -p mydb > backup.sql","恢复: mysql -u root -p mydb < backup.sql","建议配合 crontab 定时自动备份"]}]},{id:"sql-performance",name:"性能优化",description:"慢查询分析和索引优化",code:`-- 启用慢查询日志
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
OPTIMIZE TABLE users;`,tags:["性能","索引","优化"],help:[{title:"功能说明",items:["启用慢查询日志定位慢 SQL","使用 EXPLAIN 分析查询执行计划","创建索引提升查询速度"]},{title:"使用方法",items:["先启用慢查询日志","用 EXPLAIN 查看 SQL 执行计划","关注 type 列（ALL 说明全表扫描需优化）","为 WHERE/JOIN 条件列创建索引"]}]},{id:"sql-data-cleanup",name:"数据清理",description:"清理过期数据和日志",code:`-- 删除 30 天前的日志
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
ALTER TABLE users AUTO_INCREMENT = 1;`,tags:["数据清理","归档"],help:[{title:"功能说明",items:["按时间条件删除过期数据","归档旧数据到备份表","批量删除避免长时间锁表"]},{title:"使用方法",items:["先确认数据已不需要或已备份","修改 DELETE 语句中的时间条件","大批量删除使用 LIMIT 分批执行","TRUNCATE 比 DELETE 快但无法回滚"]}]},{id:"sql-monitoring",name:"监控查询",description:"数据库性能监控 SQL",code:`-- 查看当前连接
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
SELECT * FROM information_schema.innodb_lock_waits;`,tags:["监控","性能"],help:[{title:"功能说明",items:["查看当前数据库连接和运行中的查询","统计各数据库和表的大小","检查 InnoDB 引擎状态和锁等待"]},{title:"使用方法",items:["SHOW PROCESSLIST 查看当前连接","information_schema 查询库表大小","time > 60 可找出运行时间长的慢查询","发现异常查询可用 KILL id 终止"]}]},{id:"sql-replication",name:"主从复制配置",description:"MySQL 主从复制设置",code:`-- 主服务器配置
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
STOP SLAVE;`,tags:["复制","高可用"],help:[{title:"功能说明",items:["配置 MySQL 主从复制架构","实现数据自动同步和读写分离"]},{title:"使用方法",items:["主服务器开启 binlog 并配置 server-id","创建复制用户并授权","从服务器配置 MASTER 信息并 START SLAVE","用 SHOW SLAVE STATUS 检查复制状态"]}]},{id:"sql-transaction",name:"事务处理",description:"事务控制和锁管理",code:`-- 开启事务
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
SHOW ENGINE INNODB STATUS;`,tags:["事务","锁"],help:[{title:"功能说明",items:["使用事务保证多步操作的原子性","支持提交、回滚、保存点","查看锁信息和死锁检测"]},{title:"使用方法",items:["START TRANSACTION 开启事务","所有操作无误后 COMMIT 提交","出错时 ROLLBACK 回滚","用 SAVEPOINT 设置中间回滚点"]}]},{id:"sql-batch-operations",name:"批量操作",description:"批量插入、更新、删除",code:`-- 批量插入
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
DELETE FROM logs WHERE id IN (1, 2, 3, 4, 5);`,tags:["批量操作","性能"],help:[{title:"功能说明",items:["单条语句插入/更新多行数据","INSERT IGNORE 跳过重复记录","ON DUPLICATE KEY UPDATE 更新重复记录"]},{title:"使用方法",items:["批量插入比逐条插入快数倍","用 CASE 实现不同行不同值更新","大批量操作建议分批执行（每批 1000-5000 行）"]}]},{id:"sql-view-procedure",name:"视图和存储过程",description:"创建视图和存储过程",code:`-- 创建视图
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
SHOW PROCEDURE STATUS WHERE Db = 'mydb';`,tags:["视图","存储过程"],help:[{title:"功能说明",items:["视图：虚拟表，简化复杂查询","存储过程：预编译的 SQL 逻辑块","支持参数传入和结果返回"]},{title:"使用方法",items:["CREATE VIEW 创建视图后可像表一样查询","DELIMITER 修改分隔符后定义存储过程","CALL 调用存储过程","SHOW PROCEDURE STATUS 查看已有过程"]}]},{id:"sql-partitioning",name:"表分区",description:"按时间范围分区表",code:`-- 创建分区表
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
SELECT * FROM logs PARTITION (p2024);`,tags:["分区","性能"],help:[{title:"功能说明",items:["将大表按时间范围分成多个物理分区","查询自动定位到对应分区，提升速度","删除旧数据可直接 DROP 分区"]},{title:"使用方法",items:["建表时用 PARTITION BY RANGE 定义分区","ALTER TABLE ADD PARTITION 添加新分区","DROP PARTITION 快速删除大量数据","适合日志表、流水表等按时间增长的表"]}]},{id:"sql-json-operations",name:"JSON 操作",description:"MySQL JSON 字段操作",code:`-- 创建含 JSON 字段的表
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
WHERE id = 1;`,tags:["JSON","数据类型"],help:[{title:"功能说明",items:["MySQL 5.7+ 原生支持 JSON 字段","支持查询、更新、删除 JSON 内部数据","支持 JSON 数组查询和聚合"]},{title:"使用方法",items:["建表时字段类型设为 JSON","用 ->> 操作符提取 JSON 值","JSON_SET/JSON_REMOVE 更新字段","JSON_CONTAINS 查询数组包含的值"]}]},{id:"sql-union-subquery",name:"联合查询与子查询",description:"UNION、子查询、CTE 使用",code:`-- UNION 合并结果
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
SELECT * FROM category_tree;`,tags:["查询","子查询","CTE"],help:[{title:"功能说明",items:["UNION 合并多个查询结果","子查询：查询中嵌套查询","CTE：用 WITH 定义临时结果集"]},{title:"使用方法",items:["UNION 自动去重，UNION ALL 保留重复","IN/EXISTS 用于子查询","WITH 定义 CTE 使复杂查询更易读","递归 CTE 可遍历树形结构"]}]},{id:"sql-data-migration",name:"数据迁移",description:"跨表、跨库数据迁移",code:`-- 跨表迁移
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
    (SELECT COUNT(*) FROM target_table) AS target_count;`,tags:["迁移","数据同步"],help:[{title:"功能说明",items:["跨表、跨库迁移数据","支持去重、类型转换、分页迁移"]},{title:"使用方法",items:["INSERT INTO ... SELECT 从旧表导数据","INSERT IGNORE 自动跳过重复","大批量迁移用 LIMIT 分页","迁移后对比 COUNT 验证数据量"]}]},{id:"sql-security",name:"安全审计",description:"用户权限审计和安全检查",code:`-- 查看所有用户
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
WHERE id = 1;`,tags:["安全","审计"],help:[{title:"功能说明",items:["检查数据库用户和权限配置","发现空密码和远程 root 等安全隐患","脱敏处理敏感字段"]},{title:"使用方法",items:["定期运行审计 SQL 检查用户权限","发现空密码用户立即修改","限制 root 仅 localhost 登录","对敏感字段做脱敏处理"]}]}],n=[{id:"sh-system-info",name:"系统信息",description:"一键查看系统完整信息",code:`#!/bin/bash

echo "=== 系统信息 ==="
echo "主机名: $(hostname)"
echo "系统: $(uname -a)"
echo "发行版: $(cat /etc/os-release 2>/dev/null | grep PRETTY_NAME | cut -d'"' -f2)"
echo ""

echo "=== CPU 信息 ==="
lscpu | grep -E "^(Architecture|CPU(s)|Model name|Thread)"
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
uptime`,tags:["系统","信息采集"],help:[{title:"功能说明",items:["一键查看主机名、系统版本、CPU、内存、磁盘、网络信息"]},{title:"使用方法",items:["赋予权限: chmod +x sh-system-info.sh","运行: ./sh-system-info.sh","也可直接复制命令到终端逐行执行"]}]},{id:"sh-batch-ssh",name:"批量 SSH 执行",description:"批量在多台服务器执行命令",code:`#!/bin/bash

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
    echo "=== $server ==="
    ssh -o StrictHostKeyChecking=no -i $KEY $USER@$server "$COMMAND"
    echo ""
done`,tags:["SSH","批量执行"],help:[{title:"功能说明",items:["遍历服务器列表批量执行 SSH 命令","适合批量检查、批量部署等场景"]},{title:"使用方法",items:["修改 SERVERS 数组为实际 IP 列表","修改 USER 和 KEY 为实际 SSH 凭据","修改 COMMAND 为要执行的命令","确保 SSH 密钥已配置免密登录"]}]},{id:"sh-deploy",name:"应用部署",description:"自动化部署脚本模板",code:`#!/bin/bash

APP_NAME="myapp"
DEPLOY_DIR="/opt/$APP_NAME"
BACKUP_DIR="/opt/backup/$APP_NAME"
GIT_REPO="git@github.com:user/repo.git"
BRANCH="main"

echo "=== 开始部署 $APP_NAME ==="

# 备份当前版本
if [ -d "$DEPLOY_DIR" ]; then
    echo "备份当前版本..."
    mv $DEPLOY_DIR $BACKUP_DIR.$(date +%Y%m%d_%H%M%S)
fi

# 拉取代码
echo "拉取代码..."
git clone -b $BRANCH $GIT_REPO $DEPLOY_DIR

# 安装依赖
cd $DEPLOY_DIR
npm install --production

# 重启服务
echo "重启服务..."
systemctl restart $APP_NAME

# 检查状态
sleep 3
if systemctl is-active --quiet $APP_NAME; then
    echo "✅ 部署成功！"
else
    echo "❌ 部署失败，回滚..."
    rm -rf $DEPLOY_DIR
    mv $BACKUP_DIR.* $DEPLOY_DIR
    systemctl start $APP_NAME
fi`,tags:["部署","自动化"],help:[{title:"功能说明",items:["自动拉取代码、安装依赖、重启服务","部署失败自动回滚到上一版本"]},{title:"使用方法",items:["修改 APP_NAME、GIT_REPO、BRANCH 变量","确保服务器已配置 Git 和 SSH 密钥","配合 crontab 或 CI/CD 工具使用","需要先创建对应的 systemd 服务"]}]},{id:"sh-log-rotate",name:"日志轮转",description:"自动清理和压缩日志文件",code:`#!/bin/bash

LOG_DIR="/var/log/myapp"
KEEP_DAYS=30
COMPRESS_DAYS=7

echo "=== 日志清理 ==="

# 压缩超过 7 天的日志
find $LOG_DIR -name "*.log" -mtime +$COMPRESS_DAYS -exec gzip {} \\;

# 删除超过 30 天的日志
find $LOG_DIR -name "*.gz" -mtime +$KEEP_DAYS -delete

# 清空当前日志
> $LOG_DIR/app.log

echo "日志清理完成"
echo "保留天数: $KEEP_DAYS"
echo "压缩天数: $COMPRESS_DAYS"`,tags:["日志","清理"],help:[{title:"功能说明",items:["自动压缩超过 7 天的日志文件","自动删除超过 30 天的旧日志","清空当前日志文件"]},{title:"使用方法",items:["修改 LOG_DIR 为实际日志目录","调整 KEEP_DAYS 和 COMPRESS_DAYS","配合 crontab 每天定时执行"]}]},{id:"sh-health-check",name:"健康检查",description:"服务健康检查和自动重启",code:`#!/bin/bash

SERVICES=("nginx" "mysql" "redis" "myapp")
LOG_FILE="/var/log/health_check.log"

check_service() {
    local service=$1
    if systemctl is-active --quiet $service; then
        echo "[$(date)] $service: OK" >> $LOG_FILE
        return 0
    else
        echo "[$(date)] $service: FAILED - 重启中..." >> $LOG_FILE
        systemctl restart $service
        sleep 5
        if systemctl is-active --quiet $service; then
            echo "[$(date)] $service: 重启成功" >> $LOG_FILE
        else
            echo "[$(date)] $service: 重启失败" >> $LOG_FILE
        fi
        return 1
    fi
}

echo "=== 健康检查 ==="
for service in "\${SERVICES[@]}"; do
    check_service $service
done
echo "检查完成，日志: $LOG_FILE"`,tags:["监控","健康检查"],help:[{title:"功能说明",items:["检查多个服务运行状态","发现异常自动重启服务","记录检查结果到日志文件"]},{title:"使用方法",items:["修改 SERVICES 数组为要监控的服务","配合 crontab 每 5 分钟执行一次","查看日志: cat /var/log/health_check.log"]}]},{id:"sh-backup",name:"全量备份",description:"数据库和文件全量备份",code:`#!/bin/bash

BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)
KEEP_DAYS=7

# 备份 MySQL
echo "备份 MySQL..."
mysqldump -u root -p'password' --all-databases | gzip > $BACKUP_DIR/mysql_$DATE.sql.gz

# 备份配置文件
echo "备份配置..."
tar czf $BACKUP_DIR/config_$DATE.tar.gz /etc/nginx /etc/mysql /etc/ssh

# 备份应用数据
echo "备份应用数据..."
tar czf $BACKUP_DIR/appdata_$DATE.tar.gz /opt/myapp/data

# 清理旧备份
echo "清理旧备份..."
find $BACKUP_DIR -name "*.gz" -mtime +$KEEP_DAYS -delete

echo "备份完成: $BACKUP_DIR"
ls -lh $BACKUP_DIR/*_$DATE*`,tags:["备份","自动化"],help:[{title:"功能说明",items:["全量备份 MySQL 数据库","备份配置文件和应用数据","自动清理旧备份"]},{title:"使用方法",items:["修改 BACKUP_DIR 为备份目录","修改 MySQL 密码和备份路径","调整 KEEP_DAYS 控制保留天数","配合 crontab 每天凌晨执行"]}]},{id:"sh-ssl-renew",name:"SSL 证书续期",description:"Let's Encrypt 证书自动续期",code:`#!/bin/bash

DOMAIN="example.com"
EMAIL="admin@example.com"

echo "=== SSL 证书续期 ==="

# 检查证书到期时间
EXPIRY=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN 2>/dev/null | \\
    openssl x509 -noout -enddate | cut -d= -f2)
echo "当前证书到期时间: $EXPIRY"

# 续期
certbot renew --cert-name $DOMAIN

# 重载 Nginx
nginx -t && systemctl reload nginx

echo "续期完成"`,tags:["SSL","安全"],help:[{title:"功能说明",items:["检查 SSL 证书到期时间","自动续期 Let's Encrypt 证书","重载 Nginx 使新证书生效"]},{title:"使用方法",items:["修改 DOMAIN 和 EMAIL 变量","确保已安装 certbot","配合 crontab 每月自动执行","建议先手动测试续期是否正常"]}]},{id:"sh-docker-cleanup",name:"Docker 清理",description:"清理 Docker 垃圾，释放磁盘空间",code:`#!/bin/bash

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
docker system df`,tags:["Docker","清理"],help:[{title:"功能说明",items:["清理停止的容器、悬空镜像、未使用的网络和卷","释放磁盘空间"]},{title:"使用方法",items:["直接运行即可查看清理效果","docker system df 查看清理前后对比","取消注释最后一行可完全清理（谨慎）"]}]},{id:"sh-user-management",name:"用户管理",description:"批量创建/删除用户",code:`#!/bin/bash

# 批量创建用户
create_users() {
    local users=("user1" "user2" "user3")
    local group="deploy"
    
    # 创建组
    groupadd -f $group
    
    for user in "\${users[@]}"; do
        # 创建用户
        useradd -m -g $group -s /bin/bash $user
        
        # 设置密码
        echo "$user:password123" | chpasswd
        
        # 添加 SSH 密钥
        mkdir -p /home/$user/.ssh
        cp /root/.ssh/authorized_keys /home/$user/.ssh/
        chown -R $user:$group /home/$user/.ssh
        
        echo "用户 $user 创建完成"
    done
}

# 批量删除用户
delete_users() {
    local users=("user1" "user2" "user3")
    
    for user in "\${users[@]}"; do
        userdel -r $user 2>/dev/null
        echo "用户 $user 已删除"
    done
}

# 使用
create_users
# delete_users`,tags:["用户","管理"],help:[{title:"功能说明",items:["批量创建用户并设置密码","自动配置 SSH 密钥","支持批量删除用户"]},{title:"使用方法",items:["修改 users 数组为实际用户名","修改 group 为用户组名","修改密码后运行 create_users","取消注释 delete_users 可批量删除"]}]},{id:"sh-network-diag",name:"网络诊断",description:"网络问题诊断工具",code:`#!/bin/bash

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
ss -s`,tags:["网络","诊断"],help:[{title:"功能说明",items:["DNS 解析检查","路由追踪","端口连通性检查","带宽测试"]},{title:"使用方法",items:["直接运行脚本执行所有诊断","也可复制单个命令单独使用","修改域名和 IP 为目标地址"]}]},{id:"sh-process-monitor",name:"进程监控",description:"进程监控和自动重启",code:`#!/bin/bash

PROCESS="node"
MAX_CPU=80
MAX_MEM=80
LOG="/var/log/process_monitor.log"

monitor_process() {
    while true; do
        # 查找进程
        PIDS=$(pgrep -x $PROCESS)
        
        if [ -z "$PIDS" ]; then
            echo "[$(date)] $PROCESS 未运行，启动中..." >> $LOG
            systemctl start myapp
        fi
        
        for pid in $PIDS; do
            CPU=$(ps -p $pid -o %cpu= | tr -d ' ')
            MEM=$(ps -p $pid -o %mem= | tr -d ' ')
            
            if (( $(echo "$CPU > $MAX_CPU" | bc -l) )); then
                echo "[$(date)] PID $pid CPU 过高: $CPU%" >> $LOG
            fi
        done
        
        sleep 10
    done
}

monitor_process`,tags:["进程","监控"],help:[{title:"功能说明",items:["持续监控指定进程运行状态","进程未运行时自动重启","CPU 过高时记录告警日志"]},{title:"使用方法",items:["修改 PROCESS 为进程名","调整 MAX_CPU 和 MAX_MEM 阈值","后台运行: nohup ./sh-process-monitor.sh &"]}]},{id:"sh-git-deploy",name:"Git 部署",description:"Git 仓库自动部署",code:`#!/bin/bash

REPO_DIR="/opt/myapp"
BRANCH="main"

cd $REPO_DIR

# 拉取最新代码
echo "拉取最新代码..."
git fetch origin
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/$BRANCH)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "已是最新版本"
    exit 0
fi

# 备份当前版本
BACKUP=$(git rev-parse --short HEAD)
git stash
git checkout $BACKUP
tar czf /opt/backup/myapp_$BACKUP.tar.gz .
git checkout $BRANCH

# 更新代码
git pull origin $BRANCH

# 安装依赖
npm install --production

# 数据库迁移
npm run migrate 2>/dev/null

# 重启服务
systemctl restart myapp

echo "部署完成: $BACKUP -> $(git rev-parse --short HEAD)"`,tags:["Git","部署"],help:[{title:"功能说明",items:["自动拉取 Git 最新代码","安装依赖并重启服务","记录版本变更日志"]},{title:"使用方法",items:["修改 REPO_DIR 和 BRANCH","确保服务器已配置 Git SSH 密钥","配合 crontab 或 webhook 自动触发"]}]},{id:"sh-security-audit",name:"安全审计",description:"服务器安全检查脚本",code:`#!/bin/bash

echo "=== 安全审计 ==="

# 检查 SSH 配置
echo "SSH 配置检查:"
grep -E "^(PermitRootLogin|PasswordAuthentication|Port)" /etc/ssh/sshd_config
echo ""

# 检查开放端口
echo "开放端口:"
ss -tlnp | awk '{print $4, $6}' | grep -v "Local"
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
ls -la /etc/shadow /etc/passwd /etc/sudoers`,tags:["安全","审计"],help:[{title:"功能说明",items:["检查 SSH 配置安全性","列出开放端口和最近登录","检查失败登录尝试和敏感文件权限"]},{title:"使用方法",items:["以 root 权限运行","重点关注 PermitRootLogin 和 PasswordAuthentication","发现异常登录及时处理","建议定期运行审计脚本"]}]},{id:"sh-disk-cleanup",name:"磁盘清理",description:"磁盘空间清理和监控",code:`#!/bin/bash

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
df -h / | tail -1`,tags:["磁盘","清理"],help:[{title:"功能说明",items:["查看磁盘使用情况","查找最大的文件","清理 apt 缓存、旧日志、临时文件"]},{title:"使用方法",items:["直接运行查看磁盘使用","根据输出手动清理大文件","注意不要删除系统关键文件"]}]},{id:"sh-service-manager",name:"服务管理",description:"统一服务管理脚本",code:`#!/bin/bash

SERVICES=("nginx" "mysql" "redis" "myapp")

usage() {
    echo "Usage: $0 {start|stop|restart|status}"
    exit 1
}

[ -z "$1" ] && usage

case "$1" in
    start)
        for svc in "\${SERVICES[@]}"; do
            systemctl start $svc
            echo "Started: $svc"
        done
        ;;
    stop)
        for svc in "\${SERVICES[@]}"; do
            systemctl stop $svc
            echo "Stopped: $svc"
        done
        ;;
    restart)
        for svc in "\${SERVICES[@]}"; do
            systemctl restart $svc
            echo "Restarted: $svc"
        done
        ;;
    status)
        for svc in "\${SERVICES[@]}"; do
            printf "%-15s: " $svc
            systemctl is-active $svc
        done
        ;;
    *)
        usage
        ;;
esac`,tags:["服务","管理"],help:[{title:"功能说明",items:["统一管理多个服务的启动/停止/重启/状态查看"]},{title:"使用方法",items:["修改 SERVICES 数组为要管理的服务","运行: ./sh-service-manager.sh start","支持 start/stop/restart/status 四个命令"]}]}];function l({script:e,onClose:t}){let[s,r]=(0,a.useState)(!1);return(0,i.jsx)("div",{className:"fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in",children:(0,i.jsxs)("div",{className:"glass-heavy rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-[0_16px_48px_rgba(0,0,0,0.5)] animate-scale-in mx-4",children:[(0,i.jsxs)("div",{className:"flex items-center justify-between px-6 py-4 border-b border-white/[0.06]",children:[(0,i.jsxs)("div",{className:"flex items-center gap-3",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h2",{className:"text-[16px] font-semibold tracking-tight",children:e.name}),(0,i.jsx)("p",{className:"text-[12px] text-muted-foreground mt-0.5",children:e.description})]}),e.help&&e.help.length>0&&(0,i.jsx)("button",{onClick:()=>r(!s),className:"flex items-center justify-center w-6 h-6 rounded-full text-[#0a84ff] hover:bg-[#0a84ff]/10 transition-colors shrink-0",title:"使用帮助",children:(0,i.jsx)("span",{className:"text-xs font-semibold",children:"?"})})]}),(0,i.jsx)("button",{onClick:t,className:"w-7 h-7 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-all duration-200 text-xs",children:"✕"})]}),s&&e.help&&(0,i.jsx)("div",{className:"px-6 py-4 bg-[#0a84ff]/[0.04] border-b border-white/[0.06]",children:(0,i.jsx)("div",{className:"flex gap-6",children:e.help.map((e,t)=>(0,i.jsxs)("div",{className:"flex-1",children:[(0,i.jsx)("h4",{className:"text-[11px] font-medium text-[#0a84ff] uppercase tracking-wider mb-1.5",children:e.title}),(0,i.jsx)("ul",{className:"space-y-1",children:e.items.map((e,t)=>(0,i.jsxs)("li",{className:"text-[12px] text-muted-foreground flex gap-1.5 leading-relaxed",children:[(0,i.jsx)("span",{className:"text-[#0a84ff]/40 shrink-0",children:"•"}),(0,i.jsx)("span",{children:e})]},t))})]},t))})}),(0,i.jsxs)("div",{className:"flex-1 overflow-auto p-6",children:[(0,i.jsx)("div",{className:"flex gap-1.5 mb-4",children:e.tags.map(e=>(0,i.jsx)("span",{className:"px-2 py-0.5 text-[11px] bg-white/[0.06] text-muted-foreground rounded-md",children:e},e))}),(0,i.jsx)("pre",{className:"p-4 bg-black/40 rounded-xl text-[13px] font-mono overflow-x-auto border border-white/[0.04] leading-relaxed",children:e.code})]}),(0,i.jsxs)("div",{className:"flex gap-2 px-6 pb-5",children:[(0,i.jsx)("button",{onClick:()=>{navigator.clipboard.writeText(e.code)},className:"btn-primary",children:"复制代码"}),(0,i.jsx)("button",{onClick:()=>{let t=e.tags.includes("Shell")?".sh":e.tags.includes("SQL")?".sql":".py",s=new Blob([e.code],{type:"text/plain"}),i=URL.createObjectURL(s),a=document.createElement("a");a.href=i,a.download=`${e.id}${t}`,a.click(),URL.revokeObjectURL(i)},className:"px-4 py-2 btn-secondary rounded-xl text-[13px] font-medium transition-all duration-200 active:scale-[0.98]",children:"下载文件"})]})]})})}let c=["写一个 Python 脚本，监控服务器 CPU 和内存使用率","生成一个 Shell 脚本，自动备份 MySQL 数据库","写一个 SQL 查询，统计每天的订单量","写一个 Python 脚本，批量重命名文件"];function d(){let[e,t]=(0,a.useState)([]),[s,r]=(0,a.useState)(""),[o,n]=(0,a.useState)(!1),l=async()=>{if(s.trim()&&!o){t([...e,{role:"user",content:s}]),r(""),n(!0);try{let i=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"script",prompt:s,history:e.map(e=>({role:e.role,content:e.content}))})}),a=await i.json();if(!i.ok)throw Error(a.error||"请求失败");let r={role:"assistant",content:a.result};t(e=>[...e,r])}catch(s){let e={role:"assistant",content:`⚠️ 请求失败：${s.message}

请检查网络连接后重试。`};t(t=>[...t,e])}finally{n(!1)}}};return(0,i.jsxs)("div",{className:"space-y-6 animate-fade-in",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h2",{className:"text-lg font-semibold mb-2",children:"AI 脚本生成"}),(0,i.jsx)("p",{className:"text-sm text-muted-foreground",children:"描述您需要的功能，AI 帮您生成脚本"})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{className:"text-sm font-medium mb-2",children:"试试这些示例"}),(0,i.jsx)("div",{className:"flex flex-wrap gap-2",children:c.map((e,t)=>(0,i.jsxs)("button",{onClick:()=>{r(e)},className:"px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors",children:[e.slice(0,30),"..."]},t))})]}),(0,i.jsxs)("div",{className:"glass rounded-xl overflow-hidden",children:[(0,i.jsxs)("div",{className:"h-96 overflow-y-auto p-4 space-y-4",children:[0===e.length&&(0,i.jsx)("div",{className:"text-center text-muted-foreground py-12",children:"输入您的需求，AI 将为您生成脚本"}),e.map((e,t)=>(0,i.jsx)("div",{className:`flex ${"user"===e.role?"justify-end":"justify-start"}`,children:(0,i.jsx)("div",{className:`max-w-[80%] rounded-xl p-3 ${"user"===e.role?"bg-primary text-primary-foreground":"bg-white/5"}`,children:(0,i.jsx)("pre",{className:"whitespace-pre-wrap text-sm font-sans",children:e.content})})},t)),o&&(0,i.jsx)("div",{className:"flex justify-start",children:(0,i.jsx)("div",{className:"bg-white/5 rounded-xl p-3",children:(0,i.jsxs)("div",{className:"flex gap-1",children:[(0,i.jsx)("span",{className:"animate-bounce",children:"●"}),(0,i.jsx)("span",{className:"animate-bounce delay-100",children:"●"}),(0,i.jsx)("span",{className:"animate-bounce delay-200",children:"●"})]})})})]}),(0,i.jsx)("div",{className:"border-t border-white/8 p-4",children:(0,i.jsxs)("div",{className:"flex gap-2",children:[(0,i.jsx)("input",{type:"text",value:s,onChange:e=>r(e.target.value),onKeyDown:e=>"Enter"===e.key&&l(),className:"flex-1 input-apple",placeholder:"描述您需要的脚本功能..."}),(0,i.jsx)("button",{onClick:l,disabled:o||!s.trim(),className:"btn-primary disabled:opacity-50",children:"发送"})]})})]})]})}var p=s(136),m=s(3273);let u=[{title:"如何使用脚本库",items:["点击上方标签页切换语言（Python / SQL / Shell）","浏览脚本卡片，点击任意脚本查看完整代码","在弹窗中点击「复制」将代码复制到剪贴板","点击「下载」可直接下载为对应后缀的文件"]},{title:"SQL 建表生成器",items:["切换到「SQL」标签页后，点击「建表生成器」","输入表名和字段信息，支持设置主键、默认值、注释","点击「生成 SQL」即可获得完整的 CREATE TABLE 语句"]},{title:"AI 脚本生成",items:["切换到「AI 生成」标签页，用自然语言描述需求","例如：「写一个 Python 脚本，监控服务器 CPU」","AI 会生成完整脚本，包含注释和使用说明","可以继续追问，让 AI 修改或补充功能"]}],h=[{id:"python",name:"Python",count:15},{id:"sql",name:"SQL",count:15},{id:"shell",name:"Shell",count:15},{id:"ai",name:"AI 生成",count:0}];function f(){let[e,t]=(0,a.useState)("python"),[s,c]=(0,a.useState)(null),f=(()=>{switch(e){case"python":return r;case"sql":return o;case"shell":return n;default:return[]}})(),_=f.find(e=>e.id===s);return(0,i.jsxs)(p.y,{title:"脚本库",subtitle:"运维常用脚本模板，一键复制使用",helpContent:u,tabs:(0,i.jsx)(i.Fragment,{children:h.map(s=>(0,i.jsxs)(m.K,{active:e===s.id,onClick:()=>{t(s.id),c(null)},children:[s.name,s.count>0&&(0,i.jsx)("span",{className:"ml-1 text-[11px] text-muted-foreground/60",children:s.count})]},s.id))}),children:["ai"===e?(0,i.jsx)(d,{}):(0,i.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",children:f.map((e,t)=>(0,i.jsxs)("div",{onClick:()=>c(e.id),className:`p-4 rounded-xl border cursor-pointer transition-all duration-200 animate-fade-in ${s===e.id?"border-[#0a84ff]/40 bg-[#0a84ff]/[0.06] shadow-[0_0_0_1px_rgba(10,132,255,0.1)]":"border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1]"}`,style:{animationDelay:`${30*t}ms`},children:[(0,i.jsx)("h3",{className:"text-[14px] font-medium tracking-tight",children:e.name}),(0,i.jsx)("p",{className:"text-[12px] text-muted-foreground mt-1 leading-relaxed",children:e.description}),(0,i.jsx)("div",{className:"flex gap-1.5 mt-2.5",children:e.tags.map(e=>(0,i.jsx)("span",{className:"px-2 py-0.5 text-[11px] bg-white/[0.06] text-muted-foreground rounded-md",children:e},e))})]},e.id))}),_&&(0,i.jsx)(l,{script:_,onClose:()=>c(null)})]})}},8599:(e,t,s)=>{"use strict";s.d(t,{cn:()=>r});var i=s(9722),a=s(622);function r(...e){return(0,a.QP)((0,i.$)(e))}}},e=>{e.O(0,[8500,8409,8441,3794,7358],()=>e(e.s=6617)),_N_E=e.O()}]);