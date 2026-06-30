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
          content: `咱们来聊聊 Linux。很多人觉得 Linux 特神秘，黑乎乎的窗口敲来敲去，其实说白了 Linux 就是个操作系统，跟 Windows、macOS 一样，都是管电脑硬件、让你跑软件的东西。

区别在哪呢？Linux 是开源的——任何人都能看它的源代码、改它、拿它去用，不用付钱。这让它成了服务器领域的绝对王者。你用的网站、App，后台十有八九跑的都是 Linux。连安卓手机底层也是 Linux 内核。

Linux 的几个看家本事：
- 开源免费，全球开发者一起修 bug、加功能，相当于全世界的程序员给你当免费保安
- 稳得一批——服务器一跑好几年不重启都是家常便饭
- 多用户多任务——同一台机器上百人同时登录各干各的，互不打扰
- 命令行天下第一——刚开始不适应，用久了你会发现鼠标反而慢`,
        },
        {
          title: "Linux 发行版",
          content: `Linux 内核就好比汽车的发动机，光有发动机开不了车，还得有方向盘、轮胎、座椅。发行版就是把内核加上各种软件打包成一整套能用的系统。

市面上有几百种发行版，但别慌，常用的就这几个：

- Ubuntu：新手上路首选，界面友好，社区活跃，出了问题谷歌一搜一大把答案
- CentOS/RHEL：企业里的老大哥，银行、政府、大公司最爱，稳如老狗但软件版本偏旧
- Debian：Ubuntu 它爹，更保守更稳，服务器经典选择
- Fedora：新技术试验田，新特性最先尝鲜，适合喜欢追新的玩家
- Arch Linux：极客专属，从头搭起你的系统，过程像玩乐高但文档超赞
- Alpine：迷你身材，Docker 容器的标配基础镜像，才几 MB 大小`,
        },
        {
          title: "基本概念",
          content: `Linux 的系统结构没那么玄乎，分成这几层：

内核——心脏，管 CPU、内存、硬盘、网卡这些硬件，你打的任何命令最终都是内核在执行
Shell——翻译官，你说人话（命令），Shell 翻译给内核听。最常见的是 bash，现在 zsh 也很火
文件系统——Linux 的信条是「一切皆文件」，硬盘是文件、键盘是文件、进程也是文件

目录结构也没那么吓人，记住这几个就行：
- /home——你的私人地盘，每个用户的文件都在这，相当于 Windows 的 C:\\Users
- /etc——配置文件的老巢，改系统设置基本都在这，好比控制面板
- /var——话痨文件聚集地，日志、缓存这些一直在变的东西
- /tmp——公共厕所，临时文件放这，重启可能就被清了
- /proc——虚拟文件夹，不占硬盘，存的是系统和进程的实时信息`,
        },
        {
          title: "第一行命令",
          content: `打开终端，看到那个一闪一闪的光标，这就是你的指挥中心了：`,
          code: `$ whoami          # 我是谁？
root

$ hostname         # 这台机器叫什么？
web-server-01

$ uname -a         # 看看系统版本
Linux web-server-01 5.15.0 #1 SMP x86_64 GNU/Linux

$ pwd              # 我现在在哪个目录？
/root

$ ls               # 这目录里有什么？
Desktop  Documents  Downloads

$ date             # 现在几点？
Sun Jun 28 10:30:00 CST 2026

$ cal              # 看看日历
     June 2026
Su Mo Tu We Th Fr Sa
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28
29 30`,
          language: "bash",
          tip: "Tab 键是 Linux 里最好用的快捷键——帮你自动补全命令和文件名，告别手打全称的痛苦。",
        },
        {
          title: "帮助系统",
          content: `Linux 自带史上最全的说明书，不需要上网搜：`,
          code: `$ man ls           # ls 的完整手册，按 q 退出
$ ls --help         # ls 的速查版帮助
$ info ls           # 比 man 更详细的信息文档
$ type ls           # ls 到底是个啥（内置命令？别名？还是外部分程序？）
$ which ls          # ls 这个程序在哪个目录
$ apropos "copy"    # 我忘了复制命令叫啥？搜 "copy" 看看`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "Linux 内核是谁发起的？", options: ["Richard Stallman", "Linus Torvalds", "Dennis Ritchie", "Ken Thompson"], answer: 1, explanation: "Linus Torvalds 1991 年在大学宿舍里搞出了 Linux 内核的第一个版本。" },
        { question: "配置文件一般放在哪个目录？", options: ["/var", "/usr", "/etc", "/tmp"], answer: 2, explanation: "/etc 就是配置文件的大本营，想改系统配置来这里找。" },
        { question: "怎么查当前用户是谁？", options: ["hostname", "whoami", "pwd", "uname"], answer: 1, explanation: "whoami 直接告诉你当前登录的是哪个用户，简单粗暴。" },
      ],
    },
    "file-operations": {
      slug: "file-operations",
      sections: [
        {
          title: "查看文件与目录",
          content: `ls 是你用得最多的命令，就像你在 Finder 里看文件夹一样。但 ls 比图形界面强一百倍：`,
          code: `$ ls                 # 看看当前目录有啥
$ ls -l              # 详细列表：谁创建的、多大、啥时候改的
$ ls -la             # 包括隐藏文件（以 . 开头的那些）
$ ls -lh             # 文件大小用人类能看懂的单位（1K 而不是 1024）
$ ls -lt             # 按时间排序，最新改的排最前
$ ls -lS             # 按文件大小排序，大的在前
$ ls -R              # 所有子目录里的文件也列出来`,
          language: "bash",
        },
        {
          title: "目录操作",
          content: `在目录之间跳来跳去，其实就三个命令：`,
          code: `$ cd /path/to/dir    # 去那个目录
$ cd ~               # 回家（家目录）
$ cd -               # 退回上次待的目录，特别实用
$ cd ..              # 上一级目录
$ cd /               # 去根目录

$ pwd                # 我现在在哪儿？
/home/user/projects

$ mkdir newdir           # 新建一个文件夹
$ mkdir -p a/b/c         # 一口气建三层文件夹
$ mkdir -m 755 newdir    # 建文件夹同时设好权限`,
          language: "bash",
        },
        {
          title: "文件操作",
          content: `复制、移动、删除——日常操作三件套。注意 rm 可是真删除，没有回收站：`,
          code: `$ cp file1 file2         # 复制文件
$ cp -r dir1 dir2        # 复制整个文件夹
$ cp -p file1 file2      # 保留权限和时间信息
$ cp -i file1 file2      # 目标文件存在时先问你

$ mv file1 file2         # 重命名
$ mv file1 /path/to/     # 挪到别的目录
$ mv -i file1 file2      # 覆盖前问一下

$ rm file                # 删文件
$ rm -f file             # 强制删，不问
$ rm -r dir              # 删整个文件夹
$ rm -rf dir             # 删文件夹，强制，不问——慎用！
$ rm -- -file            # 文件名以 - 开头时得加 -- 保护一下`,
          language: "bash",
          warning: "rm -rf 没有后悔药。执行前先用 ls 确认一下路径，别手抖把整个系统删了。",
        },
        {
          title: "文件查看",
          content: `看文件内容也是家常便饭。不同场景用不同命令：`,
          code: `$ cat file              # 一口气看完整个文件
$ head -n 20 file       # 只看前 20 行
$ tail -n 20 file       # 只看最后 20 行
$ tail -f file          # 文件有新内容就实时显示，看日志必用
$ less file             # 分页看，按 q 退出，超大文件也不卡
$ more file             # 也是分页看，但 less 更好用
$ wc -l file            # 数数文件有几行
$ nl file               # 显示行号`,
          language: "bash",
          tip: "tail -f 是运维标配——盯着日志文件，新内容一来就显示，排查问题特别好使。",
        },
        {
          title: "文件查找",
          content: `找文件不能靠眼扫，得靠 find。它就像百度搜文件，按名字、大小、时间什么条件都能搜：`,
          code: `$ find /path -name "*.log"              # 找所有 .log 文件
$ find . -type f -name "*.py"           # 找当前目录下所有 .py 文件
$ find . -type d -name "test"           # 找叫 test 的文件夹
$ find . -size +100M                    # 找大于 100MB 的大文件，清理空间用
$ find . -mtime -7                      # 找 7 天内改过的文件
$ find . -perm 755                      # 找权限是 755 的文件
$ find . -name "*.tmp" -exec rm {} \\;   # 找到所有 .tmp 并删掉
$ find . -empty                         # 找空文件和空文件夹

$ locate nginx.conf     # locate 靠索引查找，秒出结果
$ updatedb              # 更新 locate 的索引数据库`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "复制整个文件夹要加哪个选项？", options: ["-f", "-r", "-i", "-v"], answer: 1, explanation: "-r（recursive）递归复制，文件夹里的所有东西一并带走。" },
        { question: "哪个命令能实时盯着文件更新？", options: ["cat", "head", "tail -f", "less"], answer: 2, explanation: "tail -f 会一直跟踪文件，新写一行它就显示一行。" },
        { question: "文件名以 - 开头，怎么安全删除？", options: ["rm -file", "rm -- -file", "rm '-file'", "rm ./-file"], answer: 1, explanation: "-- 是分隔符，告诉 rm 后面不是选项而是文件名。" },
      ],
    },
    "text-processing": {
      slug: "text-processing",
      sections: [
        {
          title: "grep 命令",
          content: `grep 说白了就是「文本搜索机」——在一堆文字里找你想要的行。名字挺古怪（Global Regular Expression Print），但用法超简单。你查日志、翻代码、找配置项，grep 都是第一选择：`,
          code: `$ grep "error" /var/log/syslog              # 搜包含 error 的行
$ grep -i "error" file                       # 不管大小写都搜出来
$ grep -r "pattern" /path/                   # 在目录里翻个底朝天
$ grep -n "error" file                       # 显示行号，方便定位
$ grep -c "error" file                       # 只告诉你匹配了几行
$ grep -v "debug" file                       # 排除含 debug 的行
$ grep -l "pattern" *.log                    # 只列文件名，不显内容
$ grep -A 3 "error" file                     # 匹配行 + 后面 3 行，看上下文
$ grep -B 2 "error" file                     # 匹配行 + 前面 2 行
$ grep -E "err|warn|crit" file               # 一次搜多个词（扩展正则）
$ grep -P "\d{3}-\d{4}" file                 # Perl 正则，威力翻倍`,
          language: "bash",
        },
        {
          title: "sed 命令",
          content: `sed 是个流编辑器，你可以理解成「批量查找替换工具」——不需要打开文件，一键把旧内容换成新内容。处理几十 MB 的日志也不在话下：`,
          code: `$ sed 's/old/new/' file                     # 每行第一个 old 换成 new
$ sed 's/old/new/g' file                    # 每行所有 old 全换
$ sed -i 's/old/new/g' file                 # 直接改原文件，注意没有回头路
$ sed -i.bak 's/old/new/g' file             # 改之前先备份原文件为 .bak
$ sed '3d' file                             # 删掉第 3 行
$ sed '/pattern/d' file                     # 删掉含 pattern 的行
$ sed '2a\new line' file                    # 在第 2 行后面插入一行
$ sed '2i\new line' file                    # 在第 2 行前面插入一行
$ sed -n '5,10p' file                       # 只看第 5 到第 10 行
$ sed 's/^/    /' file                      # 每行前面加 4 个空格（缩进）`,
          language: "bash",
          tip: "sed -i 会直接改写文件，养成加 .bak 后缀的好习惯，万一改错了还能找回原文件。",
        },
        {
          title: "awk 命令",
          content: `awk 是文本处理界的瑞士军刀——它把每行按空格（或你指定的分隔符）切成一个个字段，然后你可以对这些字段做加减乘除、统计、过滤。相当于命令行的 Excel：`,
          code: `$ awk '{print $1}' file                     # 打印第 1 列
$ awk '{print $1, $3}' file                 # 打印第 1 和第 3 列
$ awk -F: '{print $1}' /etc/passwd          # 用冒号当分隔符
$ awk '/error/ {print}' file                # 打印含 error 的行
$ awk 'NR==5' file                          # 只看第 5 行
$ awk 'NR>=5 && NR<=10' file               # 看第 5 到第 10 行
$ awk '{sum+=$1} END {print sum}' file      # 第 1 列求和
$ awk '{print NR, $0}' file                 # 行号 + 内容
$ awk -F: '$3>=1000 {print $1}' /etc/passwd # 第 3 列 >= 1000 才打印第 1 列
$ awk '{count[$1]++} END {for(k in count) print k, count[k]}' file  # 统计每项出现次数`,
          language: "bash",
        },
        {
          title: "sort 与 uniq",
          content: `排序和去重是数据分析的基本功，sort 和 uniq 是绝佳搭档：`,
          code: `$ sort file                     # 按字母排序
$ sort -r file                  # 反过来排
$ sort -n file                  # 按数字大小排（不用 -n 的话 10 会排在 2 前面！）
$ sort -k2 file                 # 按第 2 列来排
$ sort -t: -k3 -n /etc/passwd   # 冒号分隔，按第 3 列数字排

$ sort file | uniq              # 去重（先排序再去重，搭配使用）
$ sort file | uniq -c           # 去重 + 统计出现次数
$ sort file | uniq -d           # 只看重复出现的行
$ sort file | sort | uniq -c | sort -rn  # 词频排行榜`,
          language: "bash",
        },
        {
          title: "管道与重定向",
          content: `管道 | 是 Linux 的设计精髓——把前一个命令的输出直接喂给下一个命令的输入，像流水线一样。重定向 > 和 >> 则控制输出去哪儿。这两个概念搞懂了，Linux 功力直接翻倍：`,
          code: `$ command > file               # 输出写到 file（覆盖原有内容）
$ command >> file              # 输出追加到 file 末尾
$ command 2> file              # 只把错误信息写到 file
$ command &> file              # 不管正常还是错误，全写进去
$ command < file               # 从 file 读输入

$ cat file | grep "error" | wc -l    # 数数文件里有多少行带 error
$ ps aux | grep nginx | grep -v grep # 找 nginx 进程，去掉 grep 自己
$ cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10  # 统计访问最多的 10 个 IP`,
          language: "bash",
          tip: "管道就是把简单命令串成流水线。每个命令只做一件事但做到极致，串起来威力无穷。",
        },
      ],
      quiz: [
        { question: "grep -i 选项的作用是？", options: ["显示行号", "忽略大小写", "递归搜索", "反向匹配"], answer: 1, explanation: "-i 是 ignore case，不管大写小写统统搜出来。" },
        { question: "sed -i.bak 's/a/b/g' file 做了什么？", options: ["只替换不保存", "备份原文件再修改", "创建新文件", "删除原文件"], answer: 1, explanation: "先备份原文件为 file.bak，然后把所有 a 改成 b，新内容存回原文件。" },
        { question: "统计文件中各单词出现次数，最优方案是？", options: ["grep -c", "awk 关联数组", "wc -l", "sort | uniq -c"], answer: 1, explanation: "awk 的关联数组可以边读边统计，一行搞定，效率最高。" },
      ],
    },
    "process-management": {
      slug: "process-management",
      sections: [
        {
          title: "查看进程",
          content: `进程就是正在运行的程序。你的服务器上同时跑着几百个进程，ps 能帮你看到它们：`,
          code: `$ ps aux                          # 列出所有进程，详情满满
$ ps aux | grep nginx             # 精确找 nginx 进程
$ ps -ef                           # 另一种全格式，UNIX 风格
$ ps -eo pid,ppid,user,%cpu,%mem,cmd  # 只显示你关心的列
$ ps -ef --forest                  # 树状图，父子进程关系一目了然`,
          language: "bash",
        },
        {
          title: "实时监控",
          content: `ps 是拍照片，top 是拍视频——实时刷新告诉你谁在吃 CPU、谁在占内存。就像 Windows 的任务管理器，只不过是在命令行里：`,
          code: `$ top                              # 实时监控，按 q 退出
# top 里的快捷键（不用记，进去就知道）：
# P - 按 CPU 用量排序
# M - 按内存用量排序
# k - 输入 PID 杀进程
# q - 退出

$ htop                             # top 的彩色升级版，需单独安装
$ top -bn1 | head -20              # 非交互模式，抓一次快照`,
          language: "bash",
        },
        {
          title: "进程控制",
          content: `进程不听话就得管。kill 不是「杀死」而是「发信号」，信号有好几种，温柔地劝退还是直接毙掉由你定：`,
          code: `$ kill PID                         # 发 SIGTERM 信号，客气地请进程自己退出
$ kill -9 PID                      # 发 SIGKILL 信号，直接毙掉，不给收拾的时间
$ killall nginx                    # 按名字杀，所有叫 nginx 的进程全干掉
$ pkill -f "python app.py"         # 按完整命令匹配来杀

$ nohup command &                  # 后台运行 + 防断线，关了终端也在跑
$ disown %1                        # 把任务从当前 shell 里摘出去
$ jobs                             # 看看有多少后台任务
$ fg %1                            # 把后台任务拉回前台
$ bg %1                            # 把暂停的任务放到后台继续跑`,
          language: "bash",
        },
        {
          title: "systemctl 服务管理",
          content: `systemd 是现代 Linux 的大管家，systemctl 是你指挥它的遥控器。开机启动、启停服务、看日志，全用它：`,
          code: `$ systemctl start nginx             # 启动 nginx
$ systemctl stop nginx              # 停掉 nginx
$ systemctl restart nginx           # 重启（stop + start）
$ systemctl reload nginx            # 热重载配置文件，服务不中断
$ systemctl status nginx            # 看服务跑得怎么样
$ systemctl enable nginx            # 设置开机自启
$ systemctl disable nginx           # 取消开机自启
$ systemctl list-units --type=service  # 列出所有服务
$ journalctl -u nginx -f            # 实时看 nginx 的服务日志`,
          language: "bash",
          tip: "systemctl 统一管理所有服务，不管是 nginx、mysql 还是你自己写的程序，都一个语法。",
        },
      ],
      quiz: [
        { question: "让一个进程直接毙掉该用哪个信号？", options: ["kill PID", "kill -9 PID", "kill -TERM PID", "kill -HUP PID"], answer: 1, explanation: "SIGKILL（-9）是终极手段，进程自己都没机会收尾就被干掉了。" },
        { question: "关了终端还想让进程继续跑，怎么做？", options: ["bg", "nohup command &", "disown", "screen"], answer: 1, explanation: "nohup 告诉进程忽略 HUP 信号，关了终端连接也继续跑。" },
        { question: "想看 nginx 服务的实时日志，用什么？", options: ["systemctl status nginx", "journalctl -u nginx -f", "cat /var/log/nginx.log", "dmesg"], answer: 1, explanation: "journalctl -u 指定服务名，-f 实时跟踪，比手动 tail 日志文件更系统化。" },
      ],
    },
    "network-commands": {
      slug: "network-commands",
      sections: [
        {
          title: "网络配置查看",
          content: `想看看你的服务器有几张网卡、IP 是多少？ip 命令是现代的标配，ifconfig 是老古董了（但老系统上可能还得用）：`,
          code: `$ ip addr                          # 所有网卡信息一览
$ ip addr show eth0                # 只看 eth0 这张网卡
$ ifconfig                         # 老派查看方式，新系统可能默认没装
$ ip route                         # 路由表——数据包出门往哪走
$ ip link show                     # 网卡链路状态，网线插没插、速度多少`,
          language: "bash",
        },
        {
          title: "端口与连接",
          content: `端口就像门牌号，一个 IP 地址上有 65535 个门。ss 命令帮你看看哪些门开着、谁在门口排队：`,
          code: `$ ss -tlnp                         # TCP 监听端口，哪个程序在等连接
$ ss -ulnp                         # UDP 监听端口
$ ss -s                            # 当前连接总数统计
$ netstat -tlnp                    # 老一辈的查看命令，快被 ss 取代了
$ lsof -i :80                      # 谁在占着 80 端口？精准定位
$ lsof -i -P -n                    # 所有网络连接，不解析域名直接看 IP`,
          language: "bash",
        },
        {
          title: "网络测试",
          content: `网络出问题了怎么排查？老司机按顺序来：先 ping 看通不通，再 curl 看应用层有没有响应：`,
          code: `$ ping -c 3 google.com             # 发 3 个包测试通不通
$ traceroute google.com            # 看看路上经过哪些路由器
$ mtr google.com                   # ping + traceroute 合体，实时刷新
$ curl -v https://example.com      # 调试 HTTP 请求，看完整的提手过程
$ curl -o /dev/null -s -w "%{http_code}" https://example.com  # 只看 HTTP 状态码
$ wget https://example.com/file    # 下载文件`,
          language: "bash",
        },
        {
          title: "DNS 查询",
          content: `域名解析出问题？dig 是你最好的朋友。nslookup 是初级版，dig 才是专业工具：`,
          code: `$ nslookup example.com             # 简单查询
$ dig example.com                  # 完整 DNS 查询，信息超全
$ dig +short example.com           # 只要 IP 地址，别的别看
$ dig @8.8.8.8 example.com         # 用 Google 的 DNS 查（怀疑运营商 DNS 有问题时用）
$ dig example.com A                # 只查 A 记录（IPv4）
$ dig example.com MX               # 查邮件服务器
$ dig example.com ANY              # 啥记录都给我
$ host example.com                 # 最简单的方式`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "看 TCP 监听端口用哪个命令？", options: ["ss -tlnp", "ss -ulnp", "ip addr", "dig"], answer: 0, explanation: "-t 是 TCP，-l 是监听中的，-n 数字显示，-p 显示进程名。" },
        { question: "想知道 80 端口被谁占着，用什么？", options: ["ss -tlnp | grep :80", "lsof -i :80", "netstat -tlnp | grep :80", "以上都行"], answer: 3, explanation: "三个命令都能定位占用端口的进程，用哪一个取决于你系统装了啥。" },
      ],
    },
    "permissions": {
      slug: "permissions",
      sections: [
        {
          title: "权限是怎么回事",
          content: `Linux 的权限系统说白了就是「谁能对这个文件干啥」。每个文件都有三组权限：主人（owner）、家里人（group）、路人（others）。每组都有三种操作：读（r，看内容）、写（w，改内容）、执行（x，运行它）。

你 ls -l 看到的那个 rwxr-xr-x 就是这回事——三三一组，从前往后分别对应主人、组、路人。`,
          code: `$ ls -l script.sh
-rwxr-xr-x 1 john dev 1024 Jun 28 10:30 script.sh

# 拆解：- | rwx | r-x | r-x
# 第一位 - 表示普通文件（d 是目录，l 是软链接）
# rwx → 主人 john 能读能写能执行
# r-x → dev 组的人能读能执行但不能改
# r-x → 其他人能读能执行但不能改`,
          language: "bash",
        },
        {
          title: "chmod——改权限",
          content: `chmod 就是「改锁」的工具。有两种写法：数字模式（642、755 这些）和符号模式（u+x、g-w）。数字模式最常见，三个数字分别代表主人、组、其他人的权限。

打个比方：r=4, w=2, x=1，你要啥权限就把数字加起来。rwx = 4+2+1 = 7，rw- = 4+2 = 6，r-- = 4。`,
          code: `$ chmod 755 script.sh       # 主人全权限，组和其他人只读+执行
$ chmod 644 file.txt        # 主人可读写，其他人只读
$ chmod 600 secret.key      # 只有主人自己能读写，别人完全看不着
$ chmod +x script.sh        # 给所有用户加执行权限
$ chmod u+w file.txt        # 给主人加写权限
$ chmod go-rwx file.txt     # 组和其他人啥权限都收走
$ chmod -R 755 dir/         # 递归改整个目录`,
          language: "bash",
          tip: "关键配置文件设 600，脚本设 755，普通文件 644——记住这三个数字基本够用了。",
        },
        {
          title: "chown——换主人",
          content: `chown 是给文件换主人的。有时候你把文件传错了用户目录，或者想给项目统一所有权，就得用它：`,
          code: `$ chown john file.txt                # 把文件主人改成 john
$ chown john:dev file.txt            # 主人改成 john，组改成 dev
$ chown -R john:dev /var/www/        # 整个目录递归改
$ chown :dev file.txt                # 只改组，主人不动`,
          language: "bash",
        },
        {
          title: "sudo——借权力",
          content: `普通用户想干管理员的事怎么办？sudo 就是「借权限」——临时以 root 身份跑一条命令。不用切到 root，干完自动变回普通用户。

要 sudo 得先在 /etc/sudoers 里被列入了白名单：`,
          code: `$ sudo apt update                  # 借 root 权限更新软件源
$ sudo systemctl restart nginx      # 借 root 权限重启服务
$ sudo -i                           # 临时切到 root 的 shell
$ sudo -u postgres psql             # 以 postgres 用户的身份跑命令
$ visudo                            # 安全编辑 /etc/sudoers`,
          language: "bash",
          warning: "sudo 权限很大，别随便 curl 一个脚本就用 sudo 执行。先看清楚脚本内容再跑。",
        },
      ],
      quiz: [
        { question: "chmod 644 对应的权限是？", options: ["rwxr--r--", "rw-r--r--", "rwxrw-r--", "rw-rw-r--"], answer: 1, explanation: "6=rw-, 4=r--, 4=r--，所以是 rw-r--r--。" },
        { question: "想让文件只有自己才能读写，用什么？", options: ["chmod 777", "chmod 644", "chmod 600", "chmod 755"], answer: 2, explanation: "600 意味着主人可读写（6），组和其他人零权限（00）。" },
        { question: "sudo 的本质是什么？", options: ["永久切换成 root", "临时借 root 权限跑一条命令", "创建一个新用户", "修改文件权限"], answer: 1, explanation: "sudo 就是借权限——以 root 身份执行完这条命令后自动还原。" },
      ],
    },
    "disk-management": {
      slug: "disk-management",
      sections: [
        {
          title: "盘还剩多少——df",
          content: `磁盘满了服务就挂了，所以得常看。df 告诉你每个挂载点还剩多少空间。就像手机存储空间不足会弹提示，df 就是服务器的「存储空间」仪表盘：`,
          code: `$ df -h                    # 人类可读的磁盘用量
$ df -h /                  # 只看根分区
$ df -i                    # 看 inode 使用率（小文件太多也会导致写不进去！）
$ df -hT                   # 加上文件系统类型`,
          language: "bash",
          tip: "df -i 经常被忽略——即使磁盘空间够，inode 用完了也写不进去新文件，常见于邮件服务器和大量小文件场景。",
        },
        {
          title: "什么占空间——du",
          content: `df 告诉你总量用了多少，du 帮你找谁占了最多空间。就像「磁盘扫帚」，专揪大文件和大目录：`,
          code: `$ du -sh /var/log/         # 这个目录总共多大
$ du -sh * | sort -rh      # 当前目录下各文件/文件夹排序，大的在前面
$ du -h --max-depth=1 /    # 根目录下一层各占多少
$ du -sh * | sort -rh | head -10  # 找出前 10 大目录
$ ncdu                      # 交互式磁盘分析，需额外安装`,
          language: "bash",
        },
        {
          title: "挂载——mount",
          content: `Windows 插 U 盘自动弹出，Linux 得手动「挂载」——把设备上的文件系统接入到目录树里。说白了就是告诉系统：这个 U 盘的内容，以后在 /mnt/usb 就能看到：`,
          code: `$ mount /dev/sdb1 /mnt/usb  # 把 U 盘挂到 /mnt/usb
$ mount                      # 查看所有挂载点
$ umount /mnt/usb            # 卸载（用之前确保没进程在用）
$ mount -t ext4 /dev/sdb1 /mnt/data  # 指定文件系统类型
$ blkid                      # 查看所有块设备的 UUID
$ lsblk                      # 树状显示所有磁盘和分区`,
          language: "bash",
        },
        {
          title: "分区——fdisk",
          content: `给新硬盘分区就像给地画格子——决定哪块种玉米哪块种土豆。fdisk 是老牌分区工具，简单够用：`,
          code: `$ sudo fdisk -l             # 列出所有磁盘和分区
$ sudo fdisk /dev/sdb       # 进入 /dev/sdb 的交互式分区界面
# fdisk 内常用命令：
# m - 帮助
# p - 打印当前分区表
# n - 新建分区
# d - 删除分区
# w - 写入并退出
# q - 不保存退出

$ sudo mkfs.ext4 /dev/sdb1  # 分区完后还得格式化
$ sudo partprobe            # 通知内核重新读分区表`,
          language: "bash",
          warning: "fdisk 操作不可逆，输入前再三确认磁盘名。别手滑把系统盘分了，那是灾难现场。",
        },
      ],
      quiz: [
        { question: "df 和 du 的区别是什么？", options: ["没区别", "df 看整体，du 看具体目录", "df 看文件，du 看磁盘", "df 是 du 的别名"], answer: 1, explanation: "df 看每个分区的总体使用情况，du 逐个目录统计帮你找大文件。" },
        { question: "df -i 看的是什么？", options: ["磁盘大小", "inode 使用率", "文件数量", "目录数量"], answer: 1, explanation: "-i 显示 inode 使用情况，inode 用完即使磁盘还有空间也写不进文件。" },
      ],
    },
    "system-info": {
      slug: "system-info",
      sections: [
        {
          title: "系统版本——uname / lsb_release",
          content: `拿到一台新机器，第一件事就是搞清楚它是什么系统、什么版本。就像接手一辆车先看仪表盘：`,
          code: `$ uname -a               # 内核版本 + 架构全部信息
$ uname -r               # 只看内核版本号
$ cat /etc/os-release    # 发行版信息（标准方式）
$ lsb_release -a         # 更详尽的发行版信息
$ hostnamectl            # systemd 系统下的完整信息`,
          language: "bash",
        },
        {
          title: "内存与 CPU——free / lscpu",
          content: `内存够不够、CPU 什么配置，是排查性能问题的第一步：`,
          code: `$ free -h               # 内存使用情况（人类可读）
$ free -s 2             # 每 2 秒刷新一次
$ cat /proc/meminfo     # 超详细内存信息
$ lscpu                 # CPU 型号、核心数、架构全知道
$ cat /proc/cpuinfo     # 每个 CPU 核心的详细参数
$ nproc                 # 就是核心数，一句话的事`,
          language: "bash",
          tip: "注意 free 的 available 列才是真正可用的内存，比 free 列更准，因为 Linux 会拿空闲内存当缓存。",
        },
        {
          title: "硬件概览——lshw / lspci / lsusb",
          content: `想全面了解服务器里装了哪些硬件？这几个命令就是你的「硬件体检报告」：`,
          code: `$ lshw -short           # 硬件总览，需 root 权限
$ lshw -C disk           # 只看磁盘控制器和硬盘
$ lspci                  # 所有 PCI 设备（显卡、网卡、声卡）
$ lsusb                  # 所有 USB 设备
$ lsblk                  # 磁盘和分区树状图
$ dmidecode -t memory    # 内存条详细信息（型号、频率、插槽）
$ hdparm -I /dev/sda     # 硬盘参数和健康状态`,
          language: "bash",
        },
        {
          title: "运行状态——uptime / vmstat",
          content: `服务器跑了多久、负载高不高？uptime 三秒出结果：`,
          code: `$ uptime                # 运行了多久 + 最近 1/5/15 分钟平均负载
$ w                      # 谁在线 + uptime 的信息
$ vmstat 1               # 每秒刷新，看 CPU、内存、IO 综合情况
$ iostat -x 1            # 磁盘 IO 详情
$ sar                    # 系统活动报告，历史数据分析`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "怎么知道 CPU 有多少个核心？", options: ["free -h", "lscpu", "uname -a", "uptime"], answer: 1, explanation: "lscpu 直接告诉你 CPU 型号、核心数、线程数等全部信息。" },
        { question: "free -h 里 available 和 free 的区别？", options: ["没区别", "free 是空闲内存，available 包含缓存可释放的部分", "available 是已用内存", "free 包含缓存"], answer: 1, explanation: "Linux 用空闲内存做缓存，看起来 free 很小但 available 才是真正能用的量。" },
      ],
    },
    "compression": {
      slug: "compression",
      sections: [
        {
          title: "tar——打包与压缩一把梭",
          content: `tar 是 Linux 里最常用的归档工具。你可能会问「归档」和「压缩」啥区别？归档就是把一堆文件和文件夹打成一个包（就像快递纸箱），压缩才是把这个包挤小（真空包装）。tar 本身只归档不压缩，但加参数可以边打边压。

说白了，tar 就像搬家公司的纸箱——把所有零散东西装进一个箱子方便运输：`,
          code: `$ tar -cvf archive.tar dir/         # 打包（c=创建, v=看过程, f=指定文件名）
$ tar -xvf archive.tar               # 解包
$ tar -czvf archive.tar.gz dir/      # 打包 + gzip 压缩
$ tar -xzvf archive.tar.gz           # 解压 gzip 包
$ tar -cjvf archive.tar.bz2 dir/     # 打包 + bzip2 压缩（压得更小但更慢）
$ tar -xjvf archive.tar.bz2          # 解压 bzip2 包
$ tar -tf archive.tar                # 只看包里有什么，不解开
$ tar -xzvf archive.tar.gz -C /path/ # 解压到指定目录`,
          language: "bash",
          tip: "记住这几个参数组合就够了：czvf（压 gzip）、xzvf（解 gzip）、cjvf（压 bz2）、xjvf（解 bz2）。",
        },
        {
          title: "gzip / bzip2——单文件压缩",
          content: `gzip 和 bzip2 只能压单个文件，所以通常是跟 tar 配合使用。偶尔直接压单个大文件也方便：`,
          code: `$ gzip file.txt          # 压成 file.txt.gz，原文件消失
$ gzip -k file.txt       # 保留原文件
$ gunzip file.txt.gz     # 解压
$ gzip -9 file.txt       # 最大压缩率（1最快9最小）

$ bzip2 file.txt         # 压成 file.txt.bz2
$ bunzip2 file.txt.bz2   # 解压`,
          language: "bash",
        },
        {
          title: "zip / unzip——跨平台通吃",
          content: `zip 格式的最大好处是跨平台——Windows、macOS、Linux 都能用。如果你的压缩包要传给非 Linux 用户，zip 是最稳妥的选择：`,
          code: `$ zip -r archive.zip dir/          # 压缩目录
$ zip archive.zip file1 file2      # 压缩多个文件
$ unzip archive.zip                # 解压
$ unzip -l archive.zip             # 只看包内容不解压
$ unzip archive.zip -d /path/      # 解压到指定目录
$ zip -e archive.zip secret.txt    # 加密压缩，要设密码`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "tar 里表示创建压缩包的两个关键参数是？", options: ["-x 和 -f", "-c 和 -f", "-t 和 -v", "-r 和 -z"], answer: 1, explanation: "c 是 create（创建），f 是 file（指定文件名），tar 最基本的两个参数。" },
        { question: "tar + gzip 压缩和解压的正确参数是？", options: ["-cjvf / -xjvf", "-czvf / -xzvf", "-c 和 -x", "zip / unzip"], answer: 1, explanation: "z 代表 gzip，所以 czvf 是压缩，xzvf 是解压。" },
      ],
    },
    "package-management": {
      slug: "package-management",
      sections: [
        {
          title: "包管理是啥",
          content: `在 Linux 上装软件跟 Windows 不一样——不需要去官网下载安装包然后下一步下一步。Linux 用「包管理器」统一管理所有软件的安装、更新、卸载。就像手机上的应用商店，一个命令搞定一切。

不同发行版有不同的包管理器，但原理一样：
- Debian / Ubuntu 系：apt
- Red Hat / CentOS / Fedora 系：yum（老）或 dnf（新）`,
        },
        {
          title: "apt（Debian/Ubuntu）",
          content: `apt 是 Ubuntu 和 Debian 的标配。装软件就像逛超市，先更新货架列表，然后拿你要的东西：`,
          code: `$ sudo apt update                       # 更新软件源列表
$ sudo apt upgrade                      # 升级所有已安装的软件
$ sudo apt install nginx                # 安装 nginx
$ sudo apt remove nginx                 # 卸载 nginx（保留配置文件）
$ sudo apt purge nginx                  # 彻底卸载，连配置文件都删
$ sudo apt autoremove                   # 自动删掉没用的依赖包
$ apt search nginx                      # 搜软件
$ apt show nginx                        # 看软件详情
$ apt list --installed                  # 列出已安装的软件
$ sudo apt install nginx=1.18.0-0       # 装特定版本`,
          language: "bash",
        },
        {
          title: "yum / dnf（RHEL/CentOS/Fedora）",
          content: `RHEL 系用 yum（老系统）或 dnf（Fedora 和新 RHEL）。dnf 是 yum 的升级版，更快更准。语法跟 apt 很像，换个名字而已：`,
          code: `$ sudo yum update                      # 更新所有包
$ sudo yum install nginx               # 安装
$ sudo yum remove nginx                # 卸载
$ sudo yum search nginx                # 搜索
$ sudo yum info nginx                  # 查看详情
$ sudo yum list installed              # 已安装列表
$ yum history                          # 安装/更新历史

# dnf 语法几乎一样，把 yum 换成 dnf 就行
$ sudo dnf install nginx
$ sudo dnf remove nginx`,
          language: "bash",
          tip: "Fedora 的新版本已经把 yum 替换成 dnf 了，旧系统上 yum 其实是指向 dnf 的软链接。",
        },
        {
          title: "添加第三方源",
          content: `官方源里的软件有时候不够新或没有你要的包，就需要加第三方源（PPA 或 EPEL）：`,
          code: `# Ubuntu 添加 PPA
$ sudo add-apt-repository ppa:ondrej/php
$ sudo apt update
$ sudo apt install php8.2

# CentOS/RHEL 添加 EPEL（Extra Packages for Enterprise Linux）
$ sudo yum install epel-release
$ sudo yum install htop`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "apt 中彻底卸载软件（含配置）的命令？", options: ["apt remove", "apt purge", "apt delete", "apt autoremove"], answer: 1, explanation: "purge 比 remove 更狠，连配置文件一块删。" },
        { question: "RHEL 8+ 推荐的包管理器是？", options: ["yum", "apt", "dnf", "rpm"], answer: 2, explanation: "dnf 是 yum 的下一代，RHEL 8 和 Fedora 已经默认用它。" },
      ],
    },
    "cron-jobs": {
      slug: "cron-jobs",
      sections: [
        {
          title: "Cron 是啥——定时闹钟",
          content: `Cron 就是 Linux 自带的任务计划器，相当于一个全天候不睡觉的管家，到点就帮你做事。备份数据库、清理日志、发邮件报告——这些重复劳动全交给它。

说白了就是你跟服务器说：「每天早上 3 点帮我备份数据库」，然后它雷打不动地执行，你该睡觉睡觉。`,
        },
        {
          title: "Crontab 语法",
          content: `每一条 cron 任务都长这样：分 时 日 月 星期 命令。五个时间字段 + 要执行的命令。记忆技巧：从细到粗，从分钟到星期。

打个比方：'30 3 * * * /backup.sh'——每天凌晨 3:30 执行备份脚本。星号代表「每个」。`,
          code: `# 编辑当前用户的定时任务
$ crontab -e

# 查看当前用户的定时任务
$ crontab -l

# 格式：分 时 日 月 星期 命令
# 例子：
0 2 * * * /backup.sh              # 每天凌晨 2 点备份
*/5 * * * * /check.sh             # 每 5 分钟检查一次
0 9 * * 1 ~/weekly-report.sh      # 每周一早上 9 点
0 0 1 * * ~/monthly-bill.sh       # 每月 1 号凌晨
@reboot /start-service.sh         # 开机自动执行

# 特殊写法（不用记数字）
@daily /backup.sh                 # = 0 0 * * *
@hourly /check.sh                 # = 0 * * * *
@weekly /report.sh                # = 0 0 * * 0`,
          language: "bash",
        },
        {
          title: "Cron 日志与排查",
          content: `Cron 执行了没？出错了怎么查？首先确认 cron 服务在跑，然后查日志：`,
          code: `$ systemctl status cron       # 确认 cron 服务在运行
$ systemctl restart cron        # 改了配置有时需要重启

$ grep CRON /var/log/syslog     # 看 cron 执行记录（Ubuntu）
$ tail -f /var/log/cron         # 看 cron 执行记录（CentOS）

# 建议：cron 命令里用绝对路径 + 输出重定向到日志
0 2 * * * /usr/bin/python3 /home/user/backup.py >> /var/log/backup.log 2>&1`,
          language: "bash",
          tip: "cron 里的环境变量跟你的终端不一样，PATH 很短。写脚本时用绝对路径最保险，比如 /usr/bin/python3 而不是 python3。",
        },
      ],
      quiz: [
        { question: "cron 任务 '0 4 * * *' 什么时候执行？", options: ["每 4 分钟", "每天 4:00", "每 4 小时", "每周 4 天"], answer: 1, explanation: "0 分钟，4 点，* 每天，* 每月，* 每周——即每天凌晨 4 点整。" },
        { question: "cron 里 */10 * * * * 什么意思？", options: ["每 10 秒", "每 10 分钟", "每 10 小时", "每月 10 号"], answer: 1, explanation: "*/10 在分钟位表示每 10 分钟执行一次。" },
      ],
    },
    "ssh-advanced": {
      slug: "ssh-advanced",
      sections: [
        {
          title: "SSH 密钥——告别密码",
          content: `每次 ssh 都输密码？又慢又不安全。用密钥对登录，既快又防暴力破解。说白了就是一对「锁和钥匙」——公钥（锁）放服务器上，私钥（钥匙）你自己拿着：`,
          code: `$ ssh-keygen -t ed25519 -C "your@email.com"   # 生成密钥对（推荐 ed25519）
$ ssh-keygen -t rsa -b 4096 -C "your@email.com"  # 或者 RSA 4096 位

$ ssh-copy-id user@server.com    # 把公钥复制到服务器（一把梭）
# 手动方式：
$ cat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

$ ssh -i ~/.ssh/my_key user@server.com  # 指定私钥登录`,
          language: "bash",
          tip: "ed25519 比 RSA 更快更短更安全，新机器推荐用它。",
        },
        {
          title: "SSH Config——不用再记 IP",
          content: `每次都打 ssh user@192.168.1.100 -p 2222 太痛苦了。创建一个 ~/.ssh/config 文件，给服务器起个昵称，以后直接 ssh 昵称就行：`,
          code: `# ~/.ssh/config
Host my-server
    HostName 192.168.1.100
    User john
    Port 2222
    IdentityFile ~/.ssh/my_key

Host prod-web
    HostName 10.0.1.50
    User deploy
    IdentityFile ~/.ssh/prod_key

# 使用：直接 ssh my-server 就行！`,
          language: "ssh_config",
        },
        {
          title: "端口转发——打通隧道",
          content: `SSH 不只是登录用的，它还能当隧道用。端口转发说白了就是「借道 SSH 连接访问本来访问不到的服务」。

三种常见场景：
- 本地转发：把远程服务器的端口「搬到」你本地来访问
- 远程转发：反过来，把你本地的端口暴露给远程
- 动态转发：把 SSH 当 SOCKS 代理用`,
          code: `# 本地转发：把服务器上只监听 localhost:3306 的 MySQL 映射到你本地的 3306
$ ssh -L 3306:localhost:3306 user@server

# 远程转发：把你本地的 8080 端口暴露给远程服务器的 9090 端口的用户
$ ssh -R 9090:localhost:8080 user@server

# 动态转发（SOCKS 代理）：浏览器设代理为 localhost:1080，走服务器上网
$ ssh -D 1080 user@server`,
          language: "bash",
        },
        {
          title: "跳板机——中间人转发",
          content: `生产环境的服务器往往不给直接连，你需要先连一台「跳板机」，再从跳板机跳到目标服务器。SSH 有几种办法解决这个问题：`,
          code: `# 方法一：ProxyJump 一步到位（推荐，OpenSSH 7.3+）
$ ssh -J bastion-user@bastion.com target-user@target.com

# 方法二：SSH Config 配置 ProxyJump
Host target
    HostName 10.0.1.100
    User admin
    ProxyJump bastion

Host bastion
    HostName bastion.example.com
    User jumpuser

# 方法三：ProxyCommand（老版本，兼容性好）
$ ssh -o ProxyCommand="ssh -W %h:%p bastion.com" target.com`,
          language: "bash",
          tip: "ProxyJump 是跳板机的标准做法，配置一次以后直接 ssh target 就行，中间过程全透明。",
        },
      ],
      quiz: [
        { question: "SSH 密钥对中，哪个可以公开？", options: ["私钥", "公钥", "两个都不能", "两个都能"], answer: 1, explanation: "公钥可以到处分发（放服务器上），私钥必须自己保管好不能泄露。" },
        { question: "本地转发 ssh -L 3306:localhost:3306 server 做了什么？", options: ["服务器上传文件", "把服务器 MySQL 端口映射到本地", "把本地端口映射到服务器", "加密传输文件"], answer: 1, explanation: "-L 本地转发，把远程只能本地访问的服务通过 SSH 隧道搬到你的电脑上访问。" },
      ],
    },
    "log-analysis": {
      slug: "log-analysis",
      sections: [
        {
          title: "日志在哪——syslog 与 journald",
          content: `Linux 的日志有两个体系：传统的 syslog（存在 /var/log/ 目录下）和现代的 journald（systemd 自带，存二进制格式）。看日志就像看监控录像，系统干了什么坏事好事都有记录：`,
          code: `# 传统 syslog 日志
$ tail -f /var/log/syslog         # 系统主日志（Ubuntu/Debian）
$ tail -f /var/log/messages       # 系统主日志（CentOS/RHEL）
$ tail -f /var/log/auth.log       # 认证日志（谁登录了、谁输错密码）
$ tail -f /var/log/kern.log       # 内核日志

# journald（systemd 系统）
$ journalctl                       # 所有日志
$ journalctl -f                    # 实时跟踪（等同于 tail -f）
$ journalctl -u nginx              # 只看 nginx 的日志
$ journalctl -u nginx --since "1 hour ago"  # 最近一小时的
$ journalctl -u ssh --since today           # 今天的
$ journalctl -p err                # 只看错误级别以上
$ journalctl --disk-usage          # 日志占了多少空间`,
          language: "bash",
        },
        {
          title: "日志分析技巧",
          content: `日志不是拿来看的，是拿来分析的。真正排查问题时，你要在海量日志里捞有用信息。grep、awk、sed 在这大显身手：`,
          code: `# 看某个时间段的日志
$ grep "2026-06-28 10:" /var/log/syslog

# 找登录失败记录
$ grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn

# 统计每个 IP 尝试登录次数（找暴力破解）
$ grep "Failed password" /var/log/auth.log | grep -oP 'from \S+' | sort | uniq -c | sort -rn | head -10

# 找出访问最多的 10 个接口
$ awk '{print $7}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10

# 看看哪个时段请求最多
$ awk '{print $4}' /var/log/nginx/access.log | cut -d: -f2,3 | sort | uniq -c | sort -rn`,
          language: "bash",
        },
        {
          title: "logrotate——日志别撑爆硬盘",
          content: `日志一直写一直写，迟早写满磁盘。logrotate 就是日志的定期保洁——轮转（存档旧的）、压缩、删除过期的。你只管配置好规则，它自动帮你打扫：`,
          code: `# /etc/logrotate.d/nginx 示例配置
/var/log/nginx/*.log {
    daily                   # 每天轮转一次
    missingok               # 文件不存在也不报错
    rotate 30               # 保留最近 30 个归档
    compress                # 压缩旧日志
    delaycompress           # 延迟压缩（留一天未压缩版本方便排查）
    notifempty              # 空文件就不转了
    create 640 nginx adm    # 轮转后创建新日志文件
    sharedscripts
    postrotate
        systemctl reload nginx  # 轮转后通知 nginx 重新打开日志文件
    endscript
}

# 手动测试轮转
$ logrotate -d /etc/logrotate.d/nginx     # 调试模式（不实际执行）
$ logrotate -f /etc/logrotate.conf        # 强制执行一次`,
          language: "bash",
          tip: "postrotate 里的 reload 很重要——程序一般不自己关闭日志文件，需要通知它重新开。",
        },
      ],
      quiz: [
        { question: "journalctl -u nginx 做了什么？", options: ["删除 nginx 日志", "只看 nginx 服务的日志", "重启 nginx 日志服务", "加密 nginx 日志"], answer: 1, explanation: "-u 指定服务单元，只显示该服务的日志条目。" },
        { question: "logrotate 的 rotate 30 表示？", options: ["30 天轮转一次", "保留最近 30 个归档", "最大 30MB", "30 分钟执行一次"], answer: 1, explanation: "rotate 指定保留几个归档文件，超过的自动删除。" },
      ],
    },
    "shell-scripting": {
      slug: "shell-scripting",
      sections: [
        {
          title: "Shell 脚本基础",
          content: `Shell 脚本就是把你在命令行里敲的命令攒成一个文件，一次写好，反复执行。就像流水线工人手里的小抄——照着做就行了。

脚本文件开头的 #!/bin/bash 叫 shebang，告诉系统用哪个解释器执行这个脚本。没有这行，系统不知道谁来干活：`,
          code: `#!/bin/bash
# 这是我的第一个脚本
echo "Hello, World!"

# 变量——不用声明类型，直接赋值用
name="John"
echo "Hello, $name"

# 命令结果赋给变量——用 $() 括起来
today=$(date +%Y-%m-%d)
echo "Today is $today"

# 让脚本能执行
$ chmod +x script.sh
$ ./script.sh`,
          language: "bash",
        },
        {
          title: "条件判断与循环",
          content: `脚本要聪明就得会判断、会循环。if 就像十字路口——条件满足走一条路，不满足走另一条。for 就像流水线——挨个处理列表里的东西：`,
          code: `#!/bin/bash

# if 判断
if [ "$1" == "start" ]; then
    echo "Starting..."
elif [ "$1" == "stop" ]; then
    echo "Stopping..."
else
    echo "Usage: $0 start|stop"
fi

# 数值比较用 -gt, -lt, -eq
if [ $count -gt 10 ]; then
    echo "大于 10"
fi

# 文件判断
if [ -f "/etc/nginx/nginx.conf" ]; then
    echo "配置文件存在"
fi

# for 循环
for user in alice bob charlie; do
    echo "Hello, $user"
done

# while 循环
count=1
while [ $count -le 5 ]; do
    echo "Count: $count"
    count=$((count + 1))
done`,
          language: "bash",
        },
        {
          title: "函数与传参",
          content: `复杂脚本得拆成函数，不然就是一个大长条面条代码。函数就像工具箱里的每个工具——各管各的活：`,
          code: `#!/bin/bash

# 定义函数
backup_dir() {
    local src=$1
    local dest=$2
    echo "Backing up $src to $dest..."
    tar -czf "$dest" "$src"
}

check_disk() {
    local threshold=$1
    local usage=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ $usage -gt $threshold ]; then
        echo "WARNING: Disk usage is $usage%!"
    fi
}

# 调用函数
backup_dir /var/www /backup/www-$(date +%Y%m%d).tar.gz
check_disk 80

# 脚本参数：$1 第一个参数, $2 第二个, $# 参数个数, $@ 所有参数
echo "脚本被传了 $# 个参数"
echo "第一个参数是 $1"`,
          language: "bash",
        },
        {
          title: "错误处理——别让脚本静默崩溃",
          content: `脚本里一个命令失败了，后面的还傻乎乎接着跑——这很危险。加上 set -e 让脚本遇到错误就停。set -u 防止用未定义变量。加上错误处理让你的脚本靠谱十倍：`,
          code: `#!/bin/bash
set -euo pipefail   # 三件套：遇错就停 + 未定义变量报错 + 管道中任意命令失败都算失败

# 用 trap 做清理工作（即使出错也会执行）
cleanup() {
    echo "Cleaning up..."
    rm -f /tmp/lockfile
}
trap cleanup EXIT

# 或者处理特定错误
trap 'echo "Error on line $LINENO"' ERR

# 关键操作前检查
if [ ! -f "./config.conf" ]; then
    echo "FATAL: config.conf not found!"
    exit 1
fi

echo "Script completed successfully"`,
          language: "bash",
          tip: "set -euo pipefail 是脚本的「安全气囊」——强烈建议每个脚本开头都加上，能救你无数次。",
        },
      ],
      quiz: [
        { question: "Shell 脚本的 shebang 是什么？", options: ["# 注释", "#!/bin/bash", "use bash;", "import shell"], answer: 1, explanation: "#!/bin/bash 告诉系统用 bash 解释器执行这个脚本。" },
        { question: "set -e 的作用？", options: ["启用调试模式", "任何命令失败立即退出", "打印每条命令", "并行执行命令"], answer: 1, explanation: "-e（errexit）让脚本在任何一个命令返回非零退出码时立即停止，防止错误蔓延。" },
      ],
    },
    "firewall": {
      slug: "firewall",
      sections: [
        {
          title: "防火墙是什么——保安大爷",
          content: `防火墙说白了就是站在服务器门口检查进出的保安大爷——只放行你允许的流量，拦下你不认识的。Linux 底层都是 iptables/nftables，但直接写 iptables 规则门槛太高，所以有了各种「前台」工具帮你简化操作。

就像酒店门禁——你要么在前台登记（简单工具），要么去机房接网线（直接操作 iptables），效果一样但操作难度差远了。`,
        },
        {
          title: "ufw——Ubuntu 的傻瓜防火墙",
          content: `ufw 全称 Uncomplicated FireWall（不复杂的防火墙），名字说明一切。适合个人和小项目，几行命令搞定：`,
          code: `$ sudo ufw enable              # 打开防火墙
$ sudo ufw disable             # 关闭防火墙
$ sudo ufw status              # 看看当前规则

$ sudo ufw allow 22            # 允许 SSH
$ sudo ufw allow 80/tcp        # 允许 HTTP
$ sudo ufw allow 443/tcp       # 允许 HTTPS
$ sudo ufw allow from 10.0.0.0/24  # 允许整个子网访问

$ sudo ufw deny 3306           # 禁止 MySQL 端口
$ sudo ufw delete allow 80     # 删除某条规则

$ sudo ufw default deny incoming   # 默认拒绝所有入站
$ sudo ufw default allow outgoing  # 默认允许所有出站`,
          language: "bash",
          tip: "开启 ufw 前一定先 allow 22（SSH），别把自己锁门外了，尤其是操作远程服务器的时候。",
        },
        {
          title: "firewalld——企业级方案",
          content: `RHEL/CentOS 系用 firewalld，它比 ufw 强大很多，引进了「区域（zone）」的概念——不同网络区域用不同策略。公司内网可以宽松点，公共 WiFi 就得严。`,
          code: `$ sudo systemctl start firewalld
$ sudo firewall-cmd --state              # 防火墙在跑吗？

$ sudo firewall-cmd --list-all           # 查看当前区域完整规则
$ sudo firewall-cmd --get-active-zones   # 查看活动区域

$ sudo firewall-cmd --add-port=80/tcp --permanent   # 永久开放 80 端口
$ sudo firewall-cmd --add-service=http --permanent   # 开放 http 服务
$ sudo firewall-cmd --remove-port=3306/tcp --permanent  # 关掉 3306
$ sudo firewall-cmd --reload             # 重载规则使之生效

$ sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="10.0.0.0/24" port port="22" protocol="tcp" accept'  # 复杂规则`,
          language: "bash",
          tip: "firewalld 改规则要加 --permanent 才会永久保存，否则重启就没了。加完记得 firewall-cmd --reload。",
        },
        {
          title: "iptables——底层的终极武器",
          content: `iptables 是直接操作内核的防火墙，所有那些高级工具底层调的其实都是它。学会 iptables 你不怕任何防火墙问题，但确实不好记：`,
          code: `$ sudo iptables -L -n -v           # 查看当前规则
$ sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT   # 允许 SSH
$ sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT   # 允许 HTTP
$ sudo iptables -A INPUT -j DROP                         # 默认拒绝所有

$ sudo iptables -D INPUT 3           # 删除 INPUT 链第 3 条规则
$ sudo iptables-save > /etc/iptables/rules.v4  # 保存规则
$ sudo iptables-restore < /etc/iptables/rules.v4  # 恢复`,
          language: "bash",
          warning: "iptables 规则是立即生效的。iptables -F 会清空所有规则——如果默认策略是 DROP，清空后你就可能失去连接。",
        },
      ],
      quiz: [
        { question: "ufw 开启前最重要的事？", options: ["备份文件", "允许 SSH 端口", "安装 nginx", "更新系统"], answer: 1, explanation: "别忘了先 allow 22 或你实际的 SSH 端口，不然开启后自己都连不上了。" },
        { question: "firewalld 的 --permanent 参数什么作用？", options: ["永久删除规则", "规则重启后依然有效", "规则临时生效", "自动备份"], answer: 1, explanation: "不加 --permanent 的规则只在当前运行时有效，重启就丢了。" },
      ],
    },
    "performance-tuning": {
      slug: "performance-tuning",
      sections: [
        {
          title: "看清瓶颈——别瞎调",
          content: `性能调优最忌讳「我觉得慢就加内存」。先定位瓶颈在哪儿——是 CPU 满了、内存不够、磁盘太慢、还是网络带宽吃紧？拿数据说话：`,
          code: `$ top                    # 先看谁在吃 CPU 和内存
$ iostat -x 1            # 磁盘 IO 是不是瓶颈
$ vmstat 1               # 综合视图
$ sar -u 1               # CPU 使用详情
$ dstat                  # 全功能监控，一个顶五个（需安装）
$ nload                  # 实时网络流量`,
          language: "bash",
          tip: "多数时候性能问题不是硬件不够，而是代码写得烂或配置不当。先查应用再找硬件。",
        },
        {
          title: "CPU 与内存优化",
          content: `CPU 满了？找到吃 CPU 的进程，看是正常业务高峰还是死循环。内存不够用？看看是不是某个进程在内存泄漏：`,
          code: `# 找吃 CPU 最多的进程
$ ps aux --sort=-%cpu | head -5

# 找吃内存最多的进程
$ ps aux --sort=-%mem | head -5

# 清理缓存（内存紧张时）
$ sync && echo 3 > /proc/sys/vm/drop_caches

# 查看 swap 使用情况
$ free -h
$ swapon --show
$ cat /proc/sys/vm/swappiness   # 默认 60，值越大越爱用 swap`,
          language: "bash",
        },
        {
          title: "磁盘与 IO 优化",
          content: `磁盘慢分两种：吞吐量瓶颈（大文件读写慢）和 IOPS 瓶颈（大量小文件读写慢）。iostat 帮你分清楚：`,
          code: `# 看磁盘繁忙程度
$ iostat -x 1
# %util 接近 100% → 磁盘真满了
# await 太高 → 磁盘响应慢
# r/s w/s 很高但 await 不高 → IOPS 瓶颈

# 找最吃 IO 的进程
$ iotop                     # 需安装，实时显示各进程的 IO 用量

# 检查文件系统
$ tune2fs -l /dev/sda1 | grep -i "block size"
$ cat /sys/block/sda/queue/scheduler  # IO 调度器`,
          language: "bash",
        },
        {
          title: "网络与连接优化",
          content: `并发量大时，默认的网络参数可能不够用。你可能会遇到「too many open files」这种经典的坑：`,
          code: `# 查看当前连接数
$ ss -s
$ cat /proc/sys/net/core/somaxconn    # 最大监听队列长度

# 查看/修改文件描述符限制
$ ulimit -n                  # 当前限制
$ ulimit -n 65535            # 临时调大
$ cat /etc/security/limits.conf  # 永久修改

# 监控网络流量
$ nethogs eth0              # 按进程看流量（需安装）
$ iftop                     # 按连接看流量（需安装）

# 内核参数查看
$ sysctl -a | grep tcp      # 所有 TCP 相关内核参数`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "iostat 的 %util 接近 100% 说明什么？", options: ["CPU 满了", "内存满了", "磁盘满了", "网络满了"], answer: 2, explanation: "%util 是磁盘繁忙程度，接近 100% 说明磁盘一直在干活，来不及处理请求了。" },
        { question: "ulimit -n 控制的是什么？", options: ["最大线程数", "最大文件描述符数", "最大进程数", "最大内存"], answer: 1, explanation: "-n 控制一个进程最多能打开多少个文件描述符（包括网络连接），高并发服务经常需要调大。" },
      ],
    },
    "backup-restore": {
      slug: "backup-restore",
      sections: [
        {
          title: "rsync——同步神器",
          content: `rsync 是 Linux 里最牛的同步工具。跟 cp 不一样，它只传改变的部分，第二次同步贼快。还能跨服务器同步、断点续传。就像搬家公司先看屋里哪些东西没搬过的，只搬没搬的：`,
          code: `$ rsync -av /source/ /dest/              # 本地同步
$ rsync -av /source/ user@server:/dest/   # 同步到远程
$ rsync -av --delete /source/ /dest/      # 目标目录多出来的文件也删掉
$ rsync -av --exclude="*.log" /src/ /dest/  # 排除 .log 文件
$ rsync -avz /source/ user@server:/dest/  # -z 压缩传输，省带宽
$ rsync -avP /large/file user@server:/dest/  # -P 断点续传 + 进度条

# 常用组合：-avzP，几乎万能
$ rsync -avzP --delete /var/www/ backup@nas:/backups/www/`,
          language: "bash",
          warning: "--delete 会让目标目录跟源目录完全一样。源目录没有的文件目标目录也会被删，小心别搞反了方向。",
        },
        {
          title: "tar 备份——打个包存起来",
          content: `简单粗暴的全量备份就用 tar。把整个目录打成一个压缩包，往备份目录或外接硬盘一丢：`,
          code: `# 全量备份
$ tar -czpf /backup/www-$(date +%Y%m%d).tar.gz /var/www

# 增量备份思路（配合 find）
$ find /var/www -mtime -1 -type f | tar -czf /backup/www-inc-$(date +%Y%m%d).tar.gz -T -

# 恢复
$ tar -xzf /backup/www-20260628.tar.gz -C /tmp/restore/`,
          language: "bash",
        },
        {
          title: "数据库备份——mysqldump / pg_dump",
          content: `光备份文件不够，数据库里存着你最值钱的数据。MySQL/PostgreSQL 各有自己的备份工具：`,
          code: `# MySQL/MariaDB 备份
$ mysqldump -u root -p --all-databases > all-db-$(date +%Y%m%d).sql
$ mysqldump -u root -p mydb > mydb-backup.sql           # 单个数据库
$ mysqldump -u root -p mydb users > users-backup.sql    # 单张表
$ mysqldump -u root -p --no-data mydb > mydb-schema.sql # 只要表结构

# MySQL 恢复
$ mysql -u root -p mydb < mydb-backup.sql

# PostgreSQL 备份
$ pg_dump -U postgres -Fc mydb > mydb.dump              # 压缩格式
$ pg_dump -U postgres mydb > mydb.sql                   # 纯 SQL

# PostgreSQL 恢复
$ pg_restore -U postgres -d mydb mydb.dump
$ psql -U postgres -d mydb < mydb.sql`,
          language: "bash",
          tip: "建议在备份脚本里加上日期后缀，保留多份——万一上一份有问题还有更早的能恢复。",
        },
      ],
      quiz: [
        { question: "rsync 的 --delete 是什么作用？", options: ["删除源文件", "删除目标中多余的文件", "删除备份", "删除空目录"], answer: 1, explanation: "--delete 让目标目录完全镜像源目录，目标多出来的文件会被删除。" },
        { question: "mysqldump --no-data 导出什么？", options: ["没有数据的空文件", "只要表结构不要数据", "只要数据不要结构", "压缩文件"], answer: 1, explanation: "--no-data 只导出 CREATE TABLE 语句，适合需要复制表结构但不复制数据的场景。" },
      ],
    },
    "users-advanced": {
      slug: "users-advanced",
      sections: [
        {
          title: "用户管理进阶——useradd / usermod",
          content: `基础的用户管理你可能知道 useradd 和 passwd，但其实还有更多玩法。创建用户不光设个密码，还得指定家目录、shell、所属组：`,
          code: `$ useradd -m -s /bin/bash -G sudo,docker john    # 建用户 + 家目录 + bash + 附加组
$ userdel -r john                         # 删用户 + 删除他的家目录
$ usermod -aG docker john                 # 把 john 加入 docker 组
$ usermod -s /bin/zsh john                # 改 john 的默认 shell
$ usermod -L john                         # 锁定用户（禁止登录）
$ usermod -U john                         # 解锁

$ passwd -l john                          # 锁定密码
$ passwd -S john                          # 查看用户密码状态
$ chage -l john                           # 看密码过期策略
$ chage -M 90 john                        # 密码 90 天过期`,
          language: "bash",
        },
        {
          title: "组管理",
          content: `用户组就是「权限的批量管理」。把一群用户放进一个组，然后给这个组设权限，组里的人自动继承。比一个个改方便多了：`,
          code: `$ groupadd dev                    # 新建 dev 组
$ groupmod -n developers dev      # 改名为 developers
$ groupdel dev                    # 删组

$ usermod -aG dev john            # 把 john 加入 dev 组
$ gpasswd -d john dev             # 把 john 移出 dev 组
$ groups john                     # 看 john 在哪些组里
$ getent group dev                # 看 dev 组里有谁`,
          language: "bash",
        },
        {
          title: "ACL——细粒度权限",
          content: `传统的 rwx 权限太粗了——只有主人、组、其他人三级。但现实需求可能是「这个文件让 alice 能写、bob 只读、其他人看不着」。这时候 ACL（Access Control List）就派上用场了：`,
          code: `# 先确认文件系统支持 ACL
$ mount | grep acl

$ getfacl file.txt                    # 查看 ACL 权限
$ setfacl -m u:alice:rw file.txt      # 给 alice 单独设读写
$ setfacl -m u:bob:r file.txt         # 给 bob 只读
$ setfacl -m g:dev:rwx dir/           # 给 dev 组成员全权限
$ setfacl -x u:alice file.txt         # 删掉 alice 的 ACL
$ setfacl -b file.txt                 # 清空所有 ACL（回到普通权限）
$ setfacl -R -m u:alice:rw dir/       # 递归设置`,
          language: "bash",
          tip: "有 ACL 的文件在 ls -l 里权限末尾会显示一个 + 号，看到它就知道这个文件有多余的权限规则。",
        },
        {
          title: "PAM——认证的乐高积木",
          content: `PAM（Pluggable Authentication Modules）是 Linux 认证系统的核心。你可以理解成「认证流水线」——login、ssh、sudo 这些程序不自己管密码校验，统统交给 PAM 处理。

PAM 让你可以组合各种认证方式：密码、指纹、手机令牌都可以串起来，像乐高一样拼装。配置在 /etc/pam.d/ 目录下：`,
          code: `# /etc/pam.d/ 下的配置文件
$ ls /etc/pam.d/
common-auth     # 认证方式（密码、密钥等）
common-account  # 账户管理（过期、锁定）
common-session  # 会话管理（登录后做什么）
common-password # 密码策略（复杂度、长度要求）

# 常用 PAM 模块
# pam_tally2.so  - 登录失败N次锁定账户
# pam_limits.so  - 资源限制
# pam_umask.so   - 新文件默认权限`,
          language: "bash",
          warning: "PAM 配置改错可能导致所有人都登录不了。改之前先备份，留一个 root 终端不要关以防万一。",
        },
      ],
      quiz: [
        { question: "ACL 和传统权限最大区别？", options: ["ACL 更快", "ACL 能针对特定用户设置权限", "ACL 不支持目录", "ACL 替代了 chmod"], answer: 1, explanation: "传统 rwx 只有主人/组/其他人三级，ACL 可以精确到「alice 能写、bob 能读」。" },
        { question: "ls -l 里看到权限末尾有 + 号，什么意思？", options: ["文件是隐藏的", "这个文件有 ACL 规则", "文件是目录", "权限有问题"], answer: 1, explanation: "+ 号表示这个文件/目录设置了 ACL 扩展权限。" },
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
    "network-osi": {
      slug: "network-osi",
      sections: [
        {
          title: "OSI 七层模型",
          content: `咱们来聊聊网络世界的「地图」——OSI 七层模型。你可以把它想象成一栋七层的办公楼，数据就像文件一样，从七楼一步步传到一楼，每一层都会被「包装」一下，加上该层专属的信息。

从上往下：
应用层——你跟电脑交互的地方，说白了就是浏览器、微信这些软件在的这一层
表示层——负责「翻译」，数据加解密、格式转换都在这，相当于同声传译
会话层——管对话的节奏，啥时候开聊、啥时候挂断
传输层——保证数据完整送到，TCP 和 UDP 就在这干活，相当于快递分拣配送中心
网络层——管寻址和路由，IP 地址住在这里，相当于快递单上的收货地址
数据链路层——把数据打包成帧，在同一条网线里传输
物理层——最实在的一层，网线、光纤、无线电波这些看得见摸得着的东西`,
        },
        {
          title: "为啥要分层？就跟盖楼一样",
          content: `你可能会纳闷，传个数据为啥要搞这么复杂？分层的好处跟盖楼一样——每层只管自己的活。

说白了就是「各管各的」：应用层不用管底下用铜缆还是光纤，物理层也不用理解你在看什么网页。改一层不影响其他层，替换也方便。

打个比方——寄快递：你把东西交给快递员（应用层），他帮你打包封箱（表示层），贴上运单号跟踪（会话层），快递公司分拣配送（传输层+网络层），卡车运输（数据链路层），靠公路送到（物理层）。`,
        },
        {
          title: "TCP/IP 模型——现实中的四层楼",
          content: `OSI 七层是教科书的理想模型，实际大家用的都是 TCP/IP 四层模型。OSI 是理论标准答案，TCP/IP 是实践打磨出的最佳方案。

TCP/IP 把七层并成四层：
应用层 = OSI 的应用层 + 表示层 + 会话层
传输层 = OSI 的传输层
网际层 = OSI 的网络层
网络接口层 = OSI 的数据链路层 + 物理层`,
        },
        {
          title: "数据封装——俄罗斯套娃",
          content: `数据从你电脑发出去就像俄罗斯套娃一层套一层：
应用层数据 → 传输层加 TCP 头 → 网络层加 IP 头 → 数据链路层加 MAC 头和尾 → 变成 0 和 1 从网线飞出去。接收端反过来一层层拆开。`,
        },
      ],
      quiz: [
        { question: "OSI 七层里负责寻址和路由的是哪一层？", options: ["传输层", "网络层", "数据链路层", "应用层"], answer: 1, explanation: "网络层管 IP 寻址和路由选择，决定数据包走哪条路。" },
        { question: "TCP 干活在 OSI 的哪一层？", options: ["应用层", "会话层", "传输层", "网络层"], answer: 2, explanation: "TCP 在传输层，负责端到端的可靠传输。" },
        { question: "传输层在数据前面加什么？", options: ["IP 头", "MAC 头", "TCP 头", "HTTP 头"], answer: 2, explanation: "传输层加上 TCP 头（源端口和目标端口等信息），然后传给网络层。" },
      ],
    },
    "tcp-ip": {
      slug: "tcp-ip",
      sections: [
        {
          title: "TCP 三次握手——先确认再干活",
          content: `TCP 三次握手就像打电话确认线路通不通。你拨号（发 SYN：「我想跟你连」），对方接起来说「喂？听得到吗？」（回 SYN-ACK：「收到了，我也要连」），然后你说「能听清，开聊」（回 ACK）——好了，连接建立。

技术细节：
第一步：客户端发 SYN=1，带起始序列号 x
第二步：服务端回复 SYN=1, ACK=1，确认号 x+1，自己带序列号 y
第三步：客户端回 ACK=1，确认号 y+1，连接建立

说白了就是双方互相确认收发能力都没问题，然后才正经传数据。`,
          code: `# 抓包看三次握手
sudo tcpdump -i eth0 port 80 -nn

# 看当前建立的连接
ss -tn state established`,
          language: "bash",
        },
        {
          title: "TCP 四次挥手——好聚好散",
          content: `断开连接要四次挥手，就像朋友分别：
A 说「我先走了」（发 FIN）
B 说「好我知道了，但让我把剩下的话说完」（先回 ACK）
B 说完后说「那我也走了」（发 FIN）
A 最后回「好的拜拜」（回 ACK），再默默等一会儿才彻底走

为啥比握手多一次？因为 TCP 是全双工的——两边同时在发数据，断开时必须各自说「我不发了」，没法合并。`,
        },
        {
          title: "TCP 的 11 种状态——连接的心情日记",
          content: `TCP 连接在不同阶段有不同的状态：
LISTEN——等别人来连我，像开店等客人
SYN_SENT——我发出连接请求了，在等回复
SYN_RCVD——收到别人的请求并回复了，等他最后确认
ESTABLISHED——连上了，正常通信中
FIN_WAIT_1——我先提出要断开
FIN_WAIT_2——对方说知道了，我在等他那边也关
TIME_WAIT——两边都关了但多等一会儿确保最后 ACK 被收到
CLOSE_WAIT——对方要断了我收到了但还没回应（多半是你代码忘了 close！）
LAST_ACK——我也准备关了，等最后确认
CLOSING——巧了，两边同时说断开
CLOSED——彻底结束

TIME_WAIT 太多→短连接太频繁。CLOSE_WAIT 太多→代码忘了 close()。`,
        },
        {
          title: "UDP——TCP 的闪电侠兄弟",
          content: `TCP 可靠但慢，UDP 快但不可靠。UDP 不确认、不重传、不排序，像往河里扔漂流瓶，到了就到了没到拉倒。

UDP 适合：视频通话和直播（丢几帧无所谓但延迟高了卡顿）、在线游戏（操作必须实时）、DNS 查询（小包丢了重问）。

结论：在乎数据完整用 TCP，在乎速度用 UDP。`,
        },
      ],
      quiz: [
        { question: "TCP 三次握手第二步服务器回复什么？", options: ["SYN", "ACK", "SYN-ACK", "FIN"], answer: 2, explanation: "第二步服务器回复 SYN-ACK，既确认收到了客户端的 SYN，也发了自己的 SYN。" },
        { question: "服务器 TIME_WAIT 状态特别多说明什么？", options: ["CPU 不够", "频繁建连又断开短连接", "网络太慢", "端口不够"], answer: 1, explanation: "TIME_WAIT 是主动关闭方等对方收最后 ACK，过多说明短连接反复创建销毁。" },
      ],
    },
    "http-protocol": {
      slug: "http-protocol",
      sections: [
        {
          title: "HTTP 是什么？",
          content: `HTTP 全称超文本传输协议，说白了就是浏览器和服务器之间聊天的规矩。你输入网址、点按钮、看视频，背后全是它在干活。

HTTP 最大的特点是「无状态」——服务器记不住你上次来过没有，就像无人便利店，每次结账都当你是个新客。那怎么记住你呢？靠 Cookie、Session 这些「小本本」帮你记。`,
        },
        {
          title: "HTTP 请求长啥样？",
          content: `一个 HTTP 请求就像寄一封信，包含几个部分：
请求行——告诉服务器你要干啥（GET？POST？）和找谁
请求头——附加信息，比如你用什么浏览器、能接什么格式
一个空行作为分隔
请求体——你提交的具体数据（比如填的表单）

服务器看完会回你一封信（响应），里面有状态码（200 成功、404 找不着等等）、响应头、响应体。`,
          code: `# 用 curl 看 HTTP 请求响应的完整过程
curl -v https://httpbin.org/get

# 发 POST 请求
curl -X POST https://httpbin.org/post \\
  -H "Content-Type: application/json" \\
  -d '{"name": "张三"}'

# 只想要状态码
curl -o /dev/null -s -w "%{http_code}" https://example.com`,
          language: "bash",
        },
        {
          title: "GET、POST 和其他「动词」",
          content: `GET 就像去图书馆查书——参数跟在 URL 后面，谁都能看到，适合获取数据和搜索。
POST 像寄快递——数据藏在请求体里，外面看不见，适合提交表单、登录。

另外还有 PUT（整个替换资源）、PATCH（局部修改）、DELETE（删掉），合在一起就是 RESTful API 那一套。`,
        },
        {
          title: "HTTP 状态码速记法",
          content: `状态码就是服务器给你的「反馈」：

200 —— OK，一切正常
301 —— 我搬家了，以后去新地址
302 —— 临时换个地方
304 —— 内容没变，用你缓存的就行
400 —— 你的请求有问题，我看不懂
401 —— 没登录呢，先去认证
402 —— 
403 —— 登了但没权限
404 —— 你要的东西不存在
500 —— 我出 bug 了
502 —— 上游服务器挂了
503 —— 我太忙，过会再来

口诀：2 开头是好事，3 开头要跳转，4 开头你的锅，5 开头服务器的锅。`,
          tip: "304 配合缓存能省大量带宽，是优化利器。",
        },
        {
          title: "HTTP/1.1、HTTP/2、HTTP/3 的进化",
          content: `HTTP/1.1 用了二十多年，最大的痛点是「队头阻塞」——前面请求没完成，后面的得排队等，跟单车道堵车一样。

HTTP/2 支持多路复用，多个请求在同一连接上齐头并进。还能头部压缩、服务器主动推送。

HTTP/3 更进一步，底层从 TCP 换成 QUIC（基于 UDP），建连更快，彻底消灭了 TCP 层面的队头阻塞。现在主流网站基本都上 HTTP/2 了。`,
        },
      ],
      quiz: [
        { question: "HTTP 状态码 404 表示什么？", options: ["服务器挂了", "没权限", "资源不存在", "请求格式错了"], answer: 2, explanation: "404 Not Found——服务器找不到你要的那个资源。" },
        { question: "HTTP/2 相比 HTTP/1.1 最大改进是什么？", options: ["支持 GET", "多路复用", "支持 POST", "增加状态码"], answer: 1, explanation: "HTTP/2 通过多路复用允许多请求/响应在一条 TCP 连接上并行传输。" },
      ],
    },
    "https-tls": {
      slug: "https-tls",
      sections: [
        {
          title: "HTTPS 为啥要有？",
          content: `HTTP 是明文的——就像寄明信片，中间每个邮局都能看见你写了啥。在咖啡馆蹭公共 WiFi，旁边的人可能正在偷看你的密码和银行卡号。

HTTPS 就是 HTTP + TLS/SSL 加密，相当于把明信片装进保险箱。即使中间人截到了数据包，看到的也是一堆乱码。`,
        },
        {
          title: "TLS 握手机制——在不安全的地方安全地商量密码",
          content: `TLS 握手做的事就一件：双方在别人都能偷听的通道上，安全地商量出一个只有他俩知道的「秘密钥匙」。

简化版流程：
客户端先说「嗨，我支持这些加密方式，这是我的随机数 A」
服务器回「好，选这个方式，这是我的随机数 B 和我的证书（里面有公钥）」
客户端验证证书（确认对面不是假网站），生成随机数 C，用服务器公钥加密发过去
现在双方手里都有 A、B、C 三个随机数，各自算出同一个会话密钥，之后就用这个加密

关键点——就算有人全程偷听，也算不出这个密钥，因为随机数 C 是用公钥加密的，只有服务器的私钥能解开。`,
        },
        {
          title: "证书和 CA 体系——网站的「身份证」",
          content: `HTTPS 证书就是网站的「身份证」。你访问 bank.com，怎么确定对面真是银行不是钓鱼网站？靠 CA（证书颁发机构）。

CA 就像公安局——核实完网站身份后签发证书。你的浏览器里预置了可信 CA 的名单，只有经这些 CA 签发的证书才会被信任。

证书里面装着：网站域名、公钥、签发机构、有效期。证书过期、域名不匹配、或被吊销，浏览器就会弹出红色的「不安全」警告。`,
        },
        {
          title: "给网站加 HTTPS",
          content: `把网站从 HTTP 升级到 HTTPS 的基本步骤：
1. 去 CA 申请证书（Let's Encrypt 免费且支持自动化）
2. 把证书配到 Nginx 或 Apache 上
3. 设置 HTTP 自动跳转到 HTTPS
4. 把站内所有资源链接从 http:// 改成 https://

用 Let's Encrypt + Certbot 基本可以一键搞定，还能自动续期。`,
          code: `# Nginx HTTPS 配置
server {
    listen 443 ssl http2;
    server_name example.com;
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    location / { proxy_pass http://127.0.0.1:3000; }
}
# HTTP 自动跳 HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}`,
          language: "nginx",
          tip: "Let's Encrypt 证书 90 天过期，务必配好自动续期：certbot renew --dry-run",
        },
      ],
      quiz: [
        { question: "HTTPS 用什么来加密通信？", options: ["HTTP", "TCP", "TLS/SSL", "DNS"], answer: 2, explanation: "HTTPS = HTTP + TLS/SSL，TLS 在 HTTP 下层把数据加密了再传。" },
        { question: "TLS 握手时证书的作用是什么？", options: ["加快速度", "验证服务器身份", "加密每条数据", "压缩内容"], answer: 1, explanation: "证书用来证明服务器的身份，客户端通过 CA 签名确认对面确实是声称的那个网站。" },
      ],
    },
    "dns-deep": {
      slug: "dns-deep",
      sections: [
        {
          title: "DNS——互联网的电话本",
          content: `DNS 就是互联网的「电话本」。你输入 google.com，电脑根本不认识这个名字，得去问 DNS 服务器：「google.com 的 IP 是多少？」DNS 查完了告诉你 142.250.x.x，然后浏览器才去连接它。

没有 DNS 的话，你得把全世界网站的 IP 地址都背下来——那画面太美不敢想。`,
        },
        {
          title: "DNS 查询的完整旅程",
          content: `DNS 查询的过程，就像在一个巨大的公司里找人：

你的电脑先翻自己的「备忘录」（浏览器缓存、系统 hosts 文件）
找不到就去问「前台」——本地 DNS 服务器（通常是路由器或运营商提供的）
本地 DNS 也没有，就一层层往上问：
  先问根域名服务器：「谁是管 .com 的？」
  再问 .com 的域名服务器：「谁是管 google.com 的？」
  最后问 google.com 的权威 DNS，它才给答案：「IP 是 xxx」

整个链路可能七八跳，但因为到处都有缓存，常用的域名秒级就能解析出来。`,
          code: `# 追踪 DNS 查询全过程
dig +trace google.com

# 查不同类型的记录
dig google.com A        # IPv4 地址（最常用）
dig google.com AAAA     # IPv6 地址
dig google.com MX       # 邮件服务器
dig google.com NS       # 这个域名归谁管
dig google.com CNAME    # 别名
dig google.com TXT      # 文本记录（验证、SPF 等）`,
          language: "bash",
        },
        {
          title: "DNS 记录类型速查",
          content: `各种 DNS 记录类型，各干各的事：

A 记录——域名映射到 IPv4 地址，最常用
AAAA 记录——域名映射到 IPv6 地址
CNAME 记录——别名，比如 www 指向主域名
MX 记录——指定谁来处理这个域名的邮件
NS 记录——指定这个域名由哪些 DNS 服务器管理
TXT 记录——存一段文本，常用于 SPF 防垃圾邮件、域名验证
SRV 记录——指定某服务用哪个端口`,
        },
        {
          title: "DNS 常见的坑",
          content: `DNS 也会出各种问题：
DNS 劫持——你的 DNS 查询被中间人偷偷改掉，想去淘宝结果去了钓鱼网站
DNS 污染——某些查询被「投毒」了，返回虚假结果
DNS 缓存——改了 DNS 记录后因为缓存没刷新，部分用户还是访问旧地址
DNS 延迟——DNS 服务器在国外，每次查询几百毫秒

解决方案：换靠谱的 DNS（Cloudflare 1.1.1.1、阿里云 DNS、114DNS），或者开启 DoH/DoT 把 DNS 查询也加密。`,
          tip: "推荐把备用 DNS 设成 1.1.1.1 (Cloudflare) 或 8.8.8.8 (Google)，速度快还能防劫持。",
        },
      ],
      quiz: [
        { question: "DNS 的 A 记录是干嘛的？", options: ["管邮件的", "域名映射到 IPv4 地址", "别名功能", "存文本的"], answer: 1, explanation: "A 记录把域名映射到 IPv4 地址，是最基础的 DNS 记录。" },
        { question: "DNS 劫持是什么意思？", options: ["DNS 服务器宕机", "DNS 查询结果被恶意篡改", "缓存过期了", "域名注册过期"], answer: 1, explanation: "DNS 劫持是攻击者在 DNS 查询过程中篡改结果，把用户引向恶意网站。" },
      ],
    },
    "load-balancing": {
      slug: "load-balancing",
      sections: [
        {
          title: "负载均衡——银行柜台原理",
          content: `负载均衡就是把流量「匀开」给多台服务器。就像银行开了好几个窗口——十个顾客来办事，只开一个窗口大家排长队，开五个窗口效率就高了。

网站流量一大，单台服务器扛不住，就需要多台一起干活。负载均衡器就是那个「大堂经理」，把每个请求合理分配到某台服务器上。`,
        },
        {
          title: "分配策略——不同的「派活」方式",
          content: `几种分配策略各有千秋：

轮询——一人一个轮流来，最简单公平
加权轮询——配置高的机器多分点活，能者多劳
最少连接——谁当前最闲就把请求发谁，比较智能
IP 哈希——同一客户端 IP 固定到同一台服务器，保证「回头客」找原来那台
随机——纯凭运气

选哪种取决于场景。服务器配置一样就用轮询。有好有差用加权。需要会话保持就用 IP 哈希。`,
          code: `# Nginx 负载均衡
upstream backend {
    server 192.168.1.10:3000 weight=3;   # 加权轮询
    server 192.168.1.11:3000 weight=2;
    server 192.168.1.12:3000 weight=1;
    keepalive 32;
}
server {
    listen 80;
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`,
          language: "nginx",
        },
        {
          title: "四层 vs 七层——在哪一层分流",
          content: `负载均衡可以在不同「海拔」干活：

四层（L4）——只看 IP 和端口做分发，简单粗暴速度快，相当于看快递单地址就派送
七层（L7）——能看到 HTTP 的具体内容（URL、Cookie、Header），可以做更精细的分流

比如根据 URL 把 /api 请求发到后端组 A，把 /static 发到组 B，这就是七层的活儿。Nginx、HAProxy 两者都支持。`,
        },
        {
          title: "健康检查——「你还活着吗？」",
          content: `负载均衡器需要知道后端哪些服务器还活着。健康检查就是定期去「敲门」——发探测请求看有没有正常回应。

某台服务器连续几次没回应，负载均衡就把它从可用列表踢出去，流量不再发它。等恢复了再自动加回来。整个过程对用户完全透明。`,
          code: `# Nginx 健康检查
upstream backend {
    server 192.168.1.10:3000 max_fails=3 fail_timeout=30s;
    server 192.168.1.11:3000 max_fails=3 fail_timeout=30s;
    server 192.168.1.12:3000 backup;  # 备用
}`,
          language: "nginx",
          tip: "加一台 backup 当后手——平时不参与分流，只有其他全挂时才顶上。",
        },
      ],
      quiz: [
        { question: "四层和七层负载均衡最关键的区别？", options: ["速度不同", "四层看 IP/端口，七层能看 HTTP 内容", "协议不同", "价格不同"], answer: 1, explanation: "四层基于传输层（IP+端口）分发，七层可以按 URL、Cookie 等做更精细策略。" },
        { question: "IP 哈希策略主要用来干嘛？", options: ["提速度", "会话保持", "省内存", "加并发"], answer: 1, explanation: "IP 哈希保证同一客户端请求始终发到同一服务器，用于保持登录状态等。", },
      ],
    },
    "cdn-principles": {
      slug: "cdn-principles",
      sections: [
        {
          title: "CDN——全国连锁便利店",
          content: `CDN（内容分发网络）就是把你的网站内容「复制」到世界各地的节点上，让用户从离自己最近的节点拿数据。就像连锁便利店——不需要跑到总部买东西，家门口就有一家。

比如你服务器在北京，纽约用户要访问，数据跨半个地球几百毫秒。有了 CDN，纽约当地就有缓存的副本，几毫秒拿到。`,
        },
        {
          title: "CDN 怎么干活？",
          content: `CDN 的工作流程出乎意料地简单：
你的域名解析不指向源站 IP，而是指向 CDN 厂商。用户访问时，DNS 智能解析返回离他最近的 CDN 节点 IP。

CDN 节点收到请求，看自己有没有缓存这个内容：
有（命中）→ 直接返回，快如闪电
没有（未命中）→ 回源站拿一份，自己缓存起来，再返回用户

静态资源（图片、CSS、JS、视频）是 CDN 最佳队友，缓存命中率能做到 99% 以上。`,
        },
        {
          title: "CDN 不止是加速",
          content: `CDN 的好处远不止加速：
抗 DDoS——流量打在遍布全球的 CDN 节点上，很难集中打垮
省带宽——大部分请求被 CDN 挡住了，源站压力骤降
提高可用性——源站短暂宕机，CDN 缓存还能继续提供服务
HTTPS 加速——用户和就近 CDN 节点做 TLS 握手，回源走长连接

说白了就是把脏活累活甩给 CDN，源站专心做核心业务。`,
          tip: "图片、字体这种基本不变的资源可以缓存一年，配合文件名 hash 策略做到「永久缓存、秒级更新」。",
        },
        {
          title: "缓存策略——什么缓存多久",
          content: `CDN 缓存的精髓在于「存多久」：
强缓存——Cache-Control: max-age=xxx，告诉 CDN「这段时间内不用来找我」
协商缓存——用 ETag 或 Last-Modified 让 CDN 来问「变没变？」

图片字体这种基本不变的缓存一年都行，HTML 页面可能几分钟就更新，缓存时间设短点。`,
          code: `# Nginx 静态资源缓存
location ~* \\.(jpg|png|gif|ico|css|js|svg|woff|woff2)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}
location / {
    add_header Cache-Control "public, max-age=300";  # HTML 5分钟
}`,
          language: "nginx",
        },
      ],
      quiz: [
        { question: "CDN 最核心的原理是什么？", options: ["压缩数据", "就近缓存和分发内容", "加密传输", "负载均衡"], answer: 1, explanation: "CDN 把内容缓存到全球各地节点上，用户从最近的节点获取数据，极大降低延迟。" },
        { question: "Cache-Control: max-age 属于什么策略？", options: ["协商缓存", "强缓存", "不缓存", "永久缓存"], answer: 1, explanation: "max-age 是强缓存，告诉浏览器/CDN 在这个时间内直接用缓存别来问我。" },
      ],
    },
    "web-security": {
      slug: "web-security",
      sections: [
        {
          title: "XSS——往你网页里塞广告",
          content: `XSS 就是攻击者往你的网页里「塞」一段恶意脚本，别的用户打开时就中招了。就像有人在留言板上贴诈骗广告，其他人都能看到。

三种类型：
反射型——恶意脚本藏在 URL 参数里，服务器没过滤就输出到页面
存储型——恶意脚本存进了数据库，每个访问用户都中招
DOM 型——纯前端问题，JS 把用户输入直接插到页面里

防 XSS 核心就一条：永远别相信用户输入，输出到页面时必须转义。`,
          code: `// 千万别这样！
element.innerHTML = userInput;  // 极度危险

// 安全做法
element.textContent = userInput;  // 不会执行 HTML

// 自己转义
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}`,
          language: "javascript",
          tip: "React、Vue 默认会转义输出，但用了 dangerouslySetInnerHTML 或 v-html 时要特别留神。",
        },
        {
          title: "CSRF——借你的手干坏事",
          content: `CSRF 就是攻击者诱骗你在不知情时发出了你本不想发的请求。你登录了银行然后点了个恶意链接——那个链接在背后偷偷往银行发转账请求，因为浏览器还带着你银行的登录 Cookie。

防御措施：
CSRF Token——服务器每次给一个随机 Token，提交时必须带上，攻击者猜不到
SameSite Cookie——给 Cookie 标上 SameSite=Strict/Lax，禁止跨站携带
验证 Referer/Origin——看请求是不是从你自己的网站发起的`,
          code: `// Express 中 CSRF Token
const csrf = require('csurf');
app.use(csrf({ cookie: true }));
app.get('/form', (req, res) => {
    res.render('send', { csrfToken: req.csrfToken() });
});

// SameSite Cookie
res.cookie('session', token, {
    httpOnly: true, secure: true, sameSite: 'strict'
});`,
          language: "javascript",
        },
        {
          title: "SQL 注入——最经典的漏洞",
          content: `SQL 注入就是把用户输入直接拼进 SQL 语句造成的漏洞。比如：
"SELECT * FROM users WHERE name = '" + userInput + "'"

如果有人输入 ' OR '1'='1，SQL 就变成：
"SELECT * FROM users WHERE name = '' OR '1'='1'"
结果——所有用户数据全被拖出来。

防御极简单：永远用参数化查询（Prepared Statements），不要拼字符串。所有主流数据库驱动和 ORM 都内置这个能力。`,
        },
        {
          title: "CORS 跨域——浏览器的门禁",
          content: `浏览器的同源策略禁止一个网站随意访问另一个网站的数据——这是在保护你。但前后端分离时（API 在 api.example.com，页面在 www.example.com），需要跨域。

CORS 就是服务端告诉浏览器：「我允许这些域名来访问」。通过 Access-Control-Allow-Origin 等响应头控制。

注意：CORS 只是浏览器限制，curl 或 Postman 发请求不受此限制。`,
        },
      ],
      quiz: [
        { question: "XSS 攻击的本质是什么？", options: ["偷 Cookie", "往网页里注入恶意脚本", "伪造请求", "破解密码"], answer: 1, explanation: "XSS 在网页中注入恶意脚本，当其他用户访问时执行这些脚本。" },
        { question: "防 SQL 注入最有效的方法？", options: ["过滤特殊字符", "参数化查询", "用 HTTPS", "缩短 SQL"], answer: 1, explanation: "参数化查询从根源上杜绝了字符串拼接带来的注入风险。" },
      ],
    },
    "websocket-intro": {
      slug: "websocket-intro",
      sections: [
        {
          title: "WebSocket——从写信到打电话",
          content: `HTTP 像写信——你问一句我答一句，我不能主动开口。WebSocket 像打电话——建立连接后双方随时能说话。

最适合的场景：实时聊天、股票行情、在线协作、在线游戏。`,
        },
        {
          title: "WebSocket 连接建立——先借 HTTP 的门进",
          content: `WebSocket 建连的方式挺有意思——先「伪装」成 HTTP 请求，然后升级成 WebSocket 协议。

客户端发 HTTP 请求带 Upgrade 头：「嘿服务器，我要升级成 WebSocket」
服务器回 101：「行，升级完成」
之后这个 TCP 连接就不再走 HTTP 了，变成全双工的 WebSocket 通道。`,
          code: `// 前端 WebSocket
const ws = new WebSocket('ws://localhost:3000');
ws.onopen = () => {
    console.log('连上了！');
    ws.send('你好，服务器！');
};
ws.onmessage = (event) => console.log('收到：', event.data);
ws.onclose = () => console.log('断了');
ws.onerror = (err) => console.error('出错', err);`,
          language: "javascript",
        },
        {
          title: "WebSocket vs SSE vs 轮询",
          content: `实时推送有好几种方案：
短轮询——每隔几秒发 HTTP 请求「有新消息没？」（最笨但最简单）
长轮询——发请求后服务器先 hold 住，有消息再回
SSE——服务器主动推事件，但只支持服务器→客户端单向
WebSocket——真正全双工，双向随便发

服务器推通知用 SSE 就够了，双向实时通信（聊天、游戏）必须 WebSocket。`,
          code: `// Node.js 服务端 WebSocket
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        });
    });
    ws.on('close', () => console.log('客户端走了'));
});`,
          language: "javascript",
          tip: "生产环境务必处理断线重连——网络波动导致 WebSocket 断开很常见。",
        },
      ],
      quiz: [
        { question: "WebSocket 和 HTTP 最大区别？", options: ["没区别", "WebSocket 全双工，服务器可主动推送", "WebSocket 更快", "HTTP 更安全"], answer: 1, explanation: "WebSocket 建立连接后支持双向全双工通信，不像 HTTP 只能一问一答。" },
        { question: "WebSocket 怎么建立连接的？", options: ["直连 TCP", "HTTP 协议升级", "UDP", "FTP"], answer: 1, explanation: "WebSocket 借 HTTP 发起，通过 Upgrade 头升级协议。" },
      ],
    },
    "network-tools": {
      slug: "network-tools",
      sections: [
        {
          title: "ping——排障起手式",
          content: `ping 是你排查网络问题的第一招。发 ICMP 包看能不能收到回复。能通说明网络层没问题，不通往下查。就像喊一声「喂——」看对方回不回。`,
          code: `# 基础
ping -c 4 google.com        # 发 4 个包
ping -i 0.2 google.com      # 快速模式

# 关注：time（延迟，越小越好）、packet loss（丢包率，必须 0%）`,
          language: "bash",
        },
        {
          title: "traceroute / mtr——追踪路径",
          content: `ping 只告诉你通不通，traceroute 告诉你「怎么通的」——经过哪些路由器，每跳花多久。mtr 是增强版，实时持续追踪。`,
          code: `traceroute google.com
mtr google.com              # 实时交互式追踪

# 关注：每跳 IP 和延迟，* * * 可能被防火墙屏蔽`,
          language: "bash",
        },
        {
          title: "curl——HTTP 瑞士军刀",
          content: `curl 是你跟 HTTP 打交道最常用的兵器。调试 API、测试接口、分析耗时全用它。`,
          code: `# 详细看全过程
curl -v https://httpbin.org/get

# POST JSON
curl -X POST https://httpbin.org/post \\
  -H "Content-Type: application/json" \\
  -d '{"key": "value"}'

# 分析各环节耗时（定位瓶颈）
curl -o /dev/null -s -w \\
  "DNS: %{time_namelookup}s\\nTCP: %{time_connect}s\\nTLS: %{time_appconnect}s\\n首字节: %{time_starttransfer}s\\n总: %{time_total}s\\n" \\
  https://example.com`,
          language: "bash",
          tip: "curl -w 能抽出各个环节的耗时，帮你精准定位是 DNS 慢、TLS 握手慢还是服务器处理慢。",
        },
        {
          title: "tcpdump / Wireshark——抓包大法",
          content: `当问题找不到头绪时，抓包是最后的手段。tcpdump 命令行版，Wireshark 图形化分析。能看到每个包的完整细节。`,
          code: `# tcpdump 常用
sudo tcpdump -i eth0 port 80 -nn
sudo tcpdump -i eth0 host 192.168.1.1
sudo tcpdump -i eth0 -w capture.pcap  # 存文件给 Wireshark`,
          language: "bash",
          tip: "生产环境抓包注意加过滤和 -c 限数，不然几秒就能撑爆磁盘。",
        },
        {
          title: "ss——看端口和连接",
          content: `ss 是 netstat 的继任者，又快又好用。`,
          code: `# 看所有监听
ss -tlnp                    # TCP 监听
ss -ulnp                    # UDP 监听
ss -s                       # 连接统计

# 谁占着端口
lsof -i :80

# Nginx 用了哪些端口
lsof -i -P -n | grep nginx`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "ping 用的是什么协议？", options: ["TCP", "UDP", "ICMP", "HTTP"], answer: 2, explanation: "ping 使用 ICMP (Internet Control Message Protocol) 发送回显请求。" },
        { question: "curl -w 参数主要用来干嘛？", options: ["写入文件", "输出各环节耗时等指标", "显示响应头", "跳过 SSL"], answer: 1, explanation: "-w (write-out) 在请求完成后输出自定义时间指标和变量。" },
      ],
    },
  },
  redis: {
    "redis-basics": {
      slug: "redis-basics",
      sections: [
        {
          title: "Redis 是什么？",
          content: `Redis 全称 Remote Dictionary Server，你可以把它理解成一个「超级快的内存记事本」。数据全在内存里，读写轻松过 10 万次每秒。不光能当缓存用，还能当数据库、消息队列使。

它的核心特点就是快、结构多、够简单：
极速——数据在内存，比 MySQL 快几十上百倍
数据结构丰富——字符串、哈希、列表、集合、有序集合，你想要的结构它都有
支持持久化——虽然数据在内存，但能定期存到硬盘，重启不丢
原子操作——一个命令要么全执行、要么全不执行，不会半路被插队`,
        },
        {
          title: "安装和上手",
          content: `装 Redis 特别简单，Linux 下一条命令搞定。`,
          code: `# 安装（Ubuntu/Debian）
sudo apt-get install redis-server

# 启动
redis-server

# 连接
redis-cli

# 试试手
PING                    # → PONG，说明连上了
SET name "小刚"         # 存一个
GET name                # → "小刚"
DEL name                # 删掉
EXISTS name             # 还在吗？→ 0
EXPIRE code 60          # 60 秒后自动过期
TTL code                # 还剩多少秒`,
          language: "bash",
          tip: "Redis 默认端口 6379，记不住没关系，反正常用命令就那几个。",
        },
        {
          title: "五种核心数据类型速览",
          content: `Redis 比普通缓存强在哪？数据类型丰富啊：

String——键值对，能存数字还能原子自增，计数器、限流器首选
Hash——键值对里再套键值对，存对象特别方便
List——有序列表，两头都能推入弹出，天然消息队列
Set——无序不重复，去重、交集、并集一把梭
Sorted Set——每个元素带分数自动排序，排行榜不二之选`,
          code: `# String
SET counter 0
INCR counter            # → 1
INCRBY counter 10       # → 11

# Hash
HSET user:1 name "小红" age 25
HGET user:1 name        # → "小红"
HGETALL user:1          # 全拿

# List
LPUSH queue "a" "b"
RPOP queue               # → "a"（先进先出）
LRANGE queue 0 -1        # 全看

# Set
SADD tags "python" "redis" "docker"
SMEMBERS tags
SISMEMBER tags "python"  # → 1（存在）

# Sorted Set
ZADD rank 100 "张三" 200 "李四"
ZRANGE rank 0 -1 WITHSCORES`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "Redis 默认端口号是多少？", options: ["3306", "5432", "6379", "8080"], answer: 2, explanation: "Redis 默认监听 6379 端口。" },
        { question: "以下哪个不是 Redis 内置的数据类型？", options: ["String", "Hash", "Table", "Sorted Set"], answer: 2, explanation: "Table 不是 Redis 的内置类型，核心五种是 String、Hash、List、Set、Sorted Set。" },
      ],
    },
    "redis-data-types": {
      slug: "redis-data-types",
      sections: [
        {
          title: "String——不止是字符串",
          content: `String 是 Redis 最基础的类型，但别看名字叫「字符串」，它其实万能。能存文本、JSON、数字，甚至二进制。

最大亮点是原子自增——多个客户端同时 INCR 同一个 key，绝不会出现竞态条件。计数器、分布式 ID 生成全靠它。`,
          code: `# String 花式用法
SET page:home "首页内容"
GET page:home

# 原子数字操作
SET views 0
INCR views              # → 1
INCRBY views 100        # → 101
DECR views              # → 100

# 带过期
SETEX token 3600 "abc123"  # 3600 秒后自动删

# 条件设置（不存在才设，分布式锁基础）
SETNX lock:resource "1"`,
          language: "bash",
          tip: "SETNX + EXPIRE 是 Redis 分布式锁的经典套路，生产环境建议用 Redlock 算法或 Redisson 等成熟库。",
        },
        {
          title: "Hash——存对象利器",
          content: `Hash 是「键值对里的键值对」，特别适合存对象。跟用 String 存 JSON 相比，Hash 可以单独读写某个字段，不用每次序列化反序列化整个对象。`,
          code: `HSET user:100 name "小明" age 25 city "北京"
HGET user:100 name          # → "小明"
HMGET user:100 name age     # 一次拿多个
HGETALL user:100            # 全拿出来

HSET user:100 age 26        # 只改一个
HDEL user:100 city           # 删一个
HINCRBY user:100 age 1      # age 自增 → 27
HEXISTS user:100 email      # → 0`,
          language: "bash",
        },
        {
          title: "List——天然消息队列",
          content: `List 是有序列表，两头都能操作，天然队列结构。LPUSH + RPOP = 先进先出队列，LPUSH + LPOP = 后进先出栈。`,
          code: `LPUSH news "消息1" "消息2"
RPUSH news "消息3"
LRANGE news 0 -1             # 全看
LPOP news                    # 左弹
RPOP news                    # 右弹
LLEN news                    # 长度

# 裁剪只留前 N 条
LTRIM news 0 99

# 阻塞弹出——消息队列神器
BLPOP queue 5                # 等 5 秒，有数据弹出`,
          language: "bash",
          tip: "BLPOP/BRPOP 是 Redis 做消息队列的核心，配合多消费者实现简单任务分发。",
        },
        {
          title: "Set——去重和集合运算",
          content: `Set 无序不重复，最大用处是去重以及交集、并集、差集运算。适合标签系统、共同关注。`,
          code: `SADD user:1:tags "python" "redis" "mysql"
SADD user:2:tags "python" "mongodb" "docker"

SINTER user:1:tags user:2:tags   # 交集 → 共同标签 "python"
SUNION user:1:tags user:2:tags   # 并集
SDIFF user:1:tags user:2:tags    # 差集

SRANDMEMBER user:1:tags          # 随机抽一个
SPOP user:1:tags                 # 弹出一个`,
          language: "bash",
        },
        {
          title: "Sorted Set——排行榜第一名",
          content: `Sorted Set 是 Set 的升级版——每个元素带「分数」按分自动排序。排行榜功能的最佳人选。

按分数范围查、按排名查，非常灵活。`,
          code: `ZADD score 100 "张三" 85 "李四" 92 "王五"

ZRANGE score 0 -1 WITHSCORES    # 升序
ZREVRANGE score 0 -1 WITHSCORES # 降序（排行榜）

ZREVRANK score "张三"   # → 0（第一名）
ZSCORE score "张三"     # → "100"

ZRANGEBYSCORE score 90 100 WITHSCORES`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "Redis 中哪种数据类型最适合排行榜？", options: ["String", "Hash", "List", "Sorted Set"], answer: 3, explanation: "Sorted Set 每个元素带分数自定排序，天然适合排行榜和积分排名。" },
        { question: "Hash 相比用 String 存 JSON 的优势？", options: ["更快", "可以单独读写某个字段", "更省内存", "更复杂"], answer: 1, explanation: "Hash 可以独立读写单个 field，不用像 JSON 那样序列化反序列化整个对象。" },
      ],
    },
    "redis-commands": {
      slug: "redis-commands",
      sections: [
        {
          title: "键管理——增删查改加过期",
          content: `Redis 键管理跟文件管理差不多，多了一个「自动过期」功能，特别好用。`,
          code: `SET key1 "hello"
GET key1
EXISTS key1
DEL key1
TYPE key1

# 过期（Redis 特色）
EXPIRE session 3600      # 3600 秒后自动删
TTL session              # 还剩多少秒
PERSIST session          # 取消过期

# 批量操作
KEYS user:*              # 生产环境千万别用！阻塞全库
SCAN 0 MATCH user:* COUNT 100  # 渐进式扫描，推荐`,
          language: "bash",
          warning: "生产环境严禁 KEYS *，几百万个 key 时能把 Redis 卡死。用 SCAN 代替。",
        },
        {
          title: "事务——一次性打包执行",
          content: `Redis 事务用 MULTI/EXEC 包裹，里面命令按顺序执行，中间不会被别的客户端插队。

注意：Redis 事务不支持回滚！中间某条出错，其他照样执行，这点跟 MySQL 完全不同。`,
          code: `MULTI                     # 开始
SET a 1
SET b 2
INCR a
EXEC                      # 全执行 → OK, OK, 2

DISCARD                   # 放弃事务

# 乐观锁（WATCH）
WATCH balance
MULTI
DECRBY balance 100
EXEC                      # balance 被改了则返回 nil`,
          language: "bash",
        },
        {
          title: "管道（Pipeline）——批量加速",
          content: `正常是一发一回，100 个命令 = 100 次网络往返。Pipeline 把一堆命令打包一起发，Redis 处理完打包回，就一次往返。批量写入性能提升几十倍。`,
          code: `# redis-cli 管道
cat commands.txt | redis-cli --pipe

# commands.txt:
# SET k1 v1
# SET k2 v2
# SET k3 v3`,
          language: "bash",
          tip: "Pipeline 不保证原子性——中间可能被其他客户端命令插入。要原子性用 Lua 脚本或事务。",
        },
        {
          title: "Pub/Sub——发布订阅",
          content: `Redis Pub/Sub 是轻量消息系统。有人往「频道」发消息，订阅了该频道的全收到。适合实时通知、聊天推送。

注意：消息不持久化——发时没人订阅，消息直接没了。`,
          code: `# 终端1：订阅
SUBSCRIBE news

# 终端2：发布
PUBLISH news "重大新闻！"

# 模式订阅
PSUBSCRIBE news.*

UNSUBSCRIBE news`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "生产环境查找键该用什么？", options: ["KEYS *", "SCAN", "GET *", "FIND"], answer: 1, explanation: "SCAN 是渐进式遍历不会阻塞 Redis，生产必须用它替代 KEYS。" },
        { question: "Redis 事务和 MySQL 事务最大不同？", options: ["不支持事务", "不支持回滚", "不支持 ACID", "不支持并发"], answer: 1, explanation: "Redis 事务不支持回滚，某条命令失败不影响其他命令执行。" },
      ],
    },
    "redis-persistence": {
      slug: "redis-persistence",
      sections: [
        {
          title: "Redis 怎么把数据存硬盘？",
          content: `Redis 数据全在内存，断电就没了。它提供两种持久化方式：

RDB（快照）——每隔一段时间把整个内存「拍照」存硬盘，像游戏存档。文件小恢复快，但可能丢最后快照之后的数据。

AOF（追加日志）——每条写命令都记下来，像记账本。数据更安全（可做到每秒记一次），但文件比 RDB 大，恢复慢些。`,
        },
        {
          title: "RDB 快照——定期拍照",
          content: `RDB 就是定期拍照——比如每 5 分钟有 100 次修改，生成 dump.rdb。恢复极快，适合备份。但两次快照之间的数据可能丢。`,
          code: `# redis.conf RDB 配置
save 900 1      # 15 分钟有 1 次修改就拍
save 300 10     # 5 分钟有 10 次修改就拍
save 60 10000   # 1 分钟有 1 万次修改就拍

# 手动触发
BGSAVE          # 后台保存，不阻塞（推荐用这个）
LASTSAVE        # 看最后一次快照时间`,
          language: "bash",
          tip: "生产用 BGSAVE，它 fork 子进程做快照，不影响主进程干活。",
        },
        {
          title: "AOF 日志——每笔都记",
          content: `AOF 像记账——每条写命令追加到文件末尾。Redis 重启时把「账本」从头过一遍，数据恢复。

三种同步策略：
always——每条命令立刻写盘，最安全也最慢
everysec——每秒写一次，折中方案，最多丢 1 秒数据（推荐）
no——交给操作系统决定，最快但可能丢比较多`,
          code: `# redis.conf AOF 配置
appendonly yes
appendfsync everysec        # 每秒同步（推荐）

# AOF 文件会越来越大，需要重写压缩
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb

BGREWRITEAOF               # 手动重写
redis-check-aof --fix appendonly.aof  # 修复损坏的 AOF`,
          language: "bash",
          warning: "AOF 损坏时 Redis 可能拒绝启动，用 redis-check-aof --fix 修复，但可能丢末尾损坏数据。",
        },
        {
          title: "混合模式——鱼与熊掌兼得",
          content: `Redis 4.0 起支持混合持久化——AOF 重写时先以 RDB 格式存当前数据，后面跟 AOF 增量日志。加载快（RDB）又安全（AOF）。

生产最佳实践：同时开 RDB 和 AOF，AOF 用 everysec。RDB 做冷备份，AOF 保证数据不丢。`,
          code: `# 混合持久化（Redis 4.0+）
aof-use-rdb-preamble yes`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "RDB 持久化的特点？", options: ["实时记录每条命令", "定期生成内存快照", "不用存硬盘", "无法恢复"], answer: 1, explanation: "RDB 定期把内存快照存硬盘，恢复快但可能丢快照间隔内的数据。" },
        { question: "AOF everysec 最多丢多少数据？", options: ["不丢", "1 秒", "1 分钟", "很多"], answer: 1, explanation: "everysec 每秒刷一次盘，最坏丢 1 秒内的写操作。" },
      ],
    },
    "redis-sentinel": {
      slug: "redis-sentinel",
      sections: [
        {
          title: "哨兵是什么——自动值班警卫",
          content: `Redis Sentinel（哨兵）是 Redis 的高可用方案，干三件事：

监控——盯着主从节点，看谁挂没挂
通知——出问题发消息通知你
自动故障转移——主节点挂了，自动从从节点里选一个当新主节点

像一群值班警卫 24 小时盯着集群，主节点一出问题立刻自动切换，对应用基本透明。`,
        },
        {
          title: "哨兵怎么干活",
          content: `哨兵工作流程：
多个哨兵一起盯着主从（至少 3 个，防误判）
大多数哨兵都认为主挂了（主观下线→客观下线）
哨兵投票选个领头的执行故障转移
领头哨兵从从节点里挑最合适的（数据最新、网络好）晋升为新主
其他从节点自动切到新主节点
整个过程通常在几十秒内完成`,
          code: `# sentinel.conf 关键配置
sentinel monitor mymaster 127.0.0.1 6379 2
# ↑ 监控名为 mymaster 的主节点，至少 2 个哨兵同意才判定故障

sentinel down-after-milliseconds mymaster 5000
# ↑ 5 秒没响应就判主观下线

sentinel failover-timeout mymaster 10000

# 启动哨兵
redis-sentinel /path/to/sentinel.conf`,
          language: "bash",
          tip: "哨兵至少 3 个且部署在不同物理机上。只有 2 个的话挂一个就没法达成多数派共识了。",
        },
        {
          title: "客户端如何感知故障转移？",
          content: `故障转移后主节点变了，客户端怎么知道新地址？

答案是客户端不直连 Redis IP，而是先问哨兵：「现在主节点是谁？」哨兵告诉它当前主节点地址，客户端再连过去。主流客户端库（Jedis、Lettuce、ioredis）都支持 Sentinel 模式。`,
          code: `// Node.js ioredis 连接 Sentinel
const Redis = require('ioredis');
const redis = new Redis({
    sentinels: [
        { host: 'sentinel1', port: 26379 },
        { host: 'sentinel2', port: 26379 },
        { host: 'sentinel3', port: 26379 }
    ],
    name: 'mymaster'
});
redis.set('key', 'value');  // 自动连到当前主节点`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "Redis Sentinel 最少需要几个哨兵？", options: ["1 个", "2 个", "3 个", "5 个"], answer: 2, explanation: "最少 3 个，因为需要多数派（quorum）来判定故障和执行故障转移。" },
        { question: "主观下线和客观下线有什么区别？", options: ["没区别", "主观是单哨兵认为挂了，客观是多数都认为挂了", "客观更快", "主观更准确"], answer: 1, explanation: "单个哨兵判定挂掉叫主观下线，大多数都这么认为才升级为客观下线并触发故障转移。" },
      ],
    },
    "redis-cluster": {
      slug: "redis-cluster",
      sections: [
        {
          title: "Redis 集群——把数据「切开」",
          content: `一台 Redis 不够用了（内存、QPS 跟不上），就需要集群。Redis Cluster 把数据「切分」到多台机器，每台只存一部分。

跟主从复制的区别：主从是「复制」（每台数据一样），集群是「分片」（每台只存一部分）。`,
        },
        {
          title: "数据分片——哈希槽",
          content: `Redis Cluster 把数据空间切成 16384 个哈希槽。每个键通过 CRC16 算哈希对 16384 取模，决定它属哪个槽。各节点分摊这些槽。

比如节点 A 管 0~5460 号槽，B 管 5461~10922，C 管 10923~16383。你查 key，客户端先算槽号知道去哪台机器找。`,
          code: `# 看 key 在哪个槽
CLUSTER KEYSLOT mykey

CLUSTER NODES            # 所有节点
CLUSTER INFO             # 集群状态
CLUSTER SLOTS            # 槽分布`,
          language: "bash",
        },
        {
          title: "集群的高可用",
          content: `Cluster 里每个主节点可配从节点。主挂了从自动顶上——自带故障转移，无需哨兵。

跟 Sentinel 区别：Sentinel 管主从架构，Cluster 管分片架构，各有所长。`,
          code: `# 创建集群（至少 6 节点：3 主 3 从）
redis-cli --cluster create \\
  192.168.1.1:6379 192.168.1.1:6380 \\
  192.168.1.2:6379 192.168.1.2:6380 \\
  192.168.1.3:6379 192.168.1.3:6380 \\
  --cluster-replicas 1

# 加节点
redis-cli --cluster add-node 192.168.1.4:6379 192.168.1.1:6379

# 重分片
redis-cli --cluster reshard 192.168.1.1:6379`,
          language: "bash",
          tip: "redis-cli --cluster 命令创建和管理集群比手写配置容易得多。",
        },
        {
          title: "集群的限制",
          content: `Cluster 好使但有限制：
不支持多键跨槽操作——mget/mset 的所有 key 必须在同一槽
不支持跨节点事务——事务只能在单节点内
Lua 脚本必须确保所有操作在同一节点
需要客户端支持 MOVED/ASK 重定向

主流客户端（Jedis、Lettuce、ioredis、redis-py）都已内置支持，这些细节基本帮你处理好了。`,
        },
      ],
      quiz: [
        { question: "Redis Cluster 有多少个哈希槽？", options: ["1024", "8192", "16384", "65536"], answer: 2, explanation: "Redis Cluster 固定 16384 个哈希槽分布数据。" },
        { question: "Cluster 相比主从+哨兵最大区别？", options: ["没区别", "Cluster 支持数据分片可水平扩展", "Cluster 更简单", "哨兵更快"], answer: 1, explanation: "Cluster 通过哈希槽把数据分片到多台机器可水平扩展；主从+哨兵只做高可用，数据还是全量一份。" },
      ],
    },
    "redis-patterns": {
      slug: "redis-patterns",
      sections: [
        {
          title: "缓存模式——旁路缓存",
          content: `旁路缓存（Cache Aside）最常用，流程直接：
查数据：先查 Redis → 有直接回 → 没有查数据库 → 写入 Redis 再回
写数据：先更新数据库 → 删掉 Redis 对应缓存（等下次查询自动重建）

这最稳妥，避免了缓存和数据库不一致的坑。`,
          code: `// Node.js 旁路缓存示例
async function getUser(id) {
    const cacheKey = \`user:\${id}\`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (user) await redis.setex(cacheKey, 3600, JSON.stringify(user));
    return user;
}

// 更新时删缓存
async function updateUser(id, data) {
    await db.query('UPDATE users SET ? WHERE id = ?', [data, id]);
    await redis.del(\`user:\${id}\`);
}`,
          language: "javascript",
        },
        {
          title: "缓存穿透、击穿、雪崩——三大问题",
          content: `这仨是面试必考、线上常见事故：

缓存穿透——查不存在的数据（如 ID=-1），缓存没有直接打到数据库。攻击者专门构造这种请求能打爆数据库。解决：布隆过滤器，或者查不到也缓存空值（短时间）。

缓存击穿——热点 key 刚好过期，瞬间大量请求涌向数据库。解决：加互斥锁，或者「永不过期」异步刷新。

缓存雪崩——大量 key 同时过期，数据库瞬间被压垮。解决：给过期时间加随机值，避免集中过期。`,
          code: `// 防穿透：缓存空值
let data = await redis.get(\`product:\${id}\`);
if (data === 'NULL') return null;
if (data) return JSON.parse(data);
const product = await db.findById(id);
if (product) {
    await redis.setex(\`product:\${id}\`, 3600, JSON.stringify(product));
} else {
    await redis.setex(\`product:\${id}\`, 60, 'NULL');  // 空值也缓存
}
return product;

// 防雪崩：过期时间加随机
const ttl = 3600 + Math.floor(Math.random() * 600);
await redis.setex(key, ttl, value);`,
          language: "javascript",
          tip: "布隆过滤器防穿透神器——极小的内存判断「某 key 一定不存在」。Redis 4.0+ 有内置布隆过滤器模块。",
        },
        {
          title: "分布式锁",
          content: `多台服务器抢同一资源需要分布式锁协调。Redis 的 SETNX 可做简易版，但生产建议用 Redlock 算法或 Redisson 等成熟库。`,
          code: `# 简易分布式锁
SET lock:order:123 "random-value" NX EX 30

# 释放用 Lua 保证原子性（先查再删）
EVAL "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end" 1 lock:order:123 random-value`,
          language: "bash",
          warning: "简单 SETNX 锁在 Redis 主从切换时可能丢失（主挂了锁还没同步到从）。Redlock 通过在多个独立 Redis 实例同时加锁来解决。",
        },
        {
          title: "计数器与限流器",
          content: `利用 Redis 单线程和原子自增轻松实现计数器和限流器。点赞数、阅读量——INCR 搞定。固定窗口限流——设 key 带过期，每次 INCR 超了就拒绝。滑动窗口限流——用 Sorted Set 记录时间戳，精准控制。`,
          code: `# 固定窗口限流（简单版）：1 分钟最多 100 次
INCR rate:api:127.0.0.1
EXPIRE rate:api:127.0.0.1 60

# 滑动窗口限流（精确版）——用 Sorted Set
ZADD rate:api:127.0.0.1 <timestamp> <unique-id>
ZREMRANGEBYSCORE rate:api:127.0.0.1 0 <timestamp减60秒>
ZCARD rate:api:127.0.0.1  # 这分钟内多少次`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "缓存穿透指的是什么？", options: ["缓存挂了", "查不存在的数据穿透到数据库", "缓存过期太快", "缓存占满"], answer: 1, explanation: "缓存穿透是查询数据库中不存在的数据，每次请求都穿透缓存打到数据库。" },
        { question: "防缓存雪崩的主要思路？", options: ["加更多缓存", "给过期时间加随机值避免集中过期", "用更大 Redis", "关闭过期"], answer: 1, explanation: "缓存雪崩是大量 key 同时过期导致数据库压力突增，加随机偏移可避免集中过期。" },
      ],
    },
    "redis-lua": {
      slug: "redis-lua",
      sections: [
        {
          title: "Lua 脚本——原子性地执行多个命令",
          content: `Redis 的 Lua 脚本让你把多个命令写在一个脚本里原子执行——要么全做要么全不做，中间不会插进其他客户端命令。

比事务（MULTI/EXEC）强在哪？Lua 可以在脚本里写逻辑判断，根据读到的值决定下一步。事务是「提交一批固定指令」，Lua 是「把逻辑搬进 Redis 里执行」。`,
          code: `# 简单 Lua 脚本
EVAL "return redis.call('GET', KEYS[1])" 1 mykey

# 原子性检查并更新库存
EVAL "
    local stock = redis.call('GET', KEYS[1])
    if stock and tonumber(stock) > 0 then
        redis.call('DECR', KEYS[1])
        return 1  -- 扣减成功
    else
        return 0  -- 库存不足
    end
" 1 product:100:stock`,
          language: "bash",
          tip: "Lua 脚本执行期间 Redis 会阻塞其他命令，别写太复杂太耗时。",
        },
        {
          title: "SCRIPT LOAD 缓存脚本",
          content: `EVAL 每次传整个脚本有网络开销。SCRIPT LOAD 先把脚本上传 Redis 返回 SHA1 摘要，之后用 EVALSHA 加摘要执行——省带宽还更快。`,
          code: `SCRIPT LOAD "return redis.call('GET', KEYS[1])"
# → "abc123def456..."（SHA1 摘要）

EVALSHA "abc123def456..." 1 mykey

SCRIPT EXISTS "abc123def456..."
SCRIPT FLUSH`,
          language: "bash",
        },
        {
          title: "Lua 脚本实用场景",
          content: `Lua 最实用的几个场景：分布式限流（原子检查+放行）、库存扣减（查库存+扣减一步到位防超卖）、获取分布式锁、原子性的复杂操作。`,
          code: `# 原子性限流
EVAL "
    local key = KEYS[1]
    local limit = tonumber(ARGV[1])
    local window = tonumber(ARGV[2])
    local current = redis.call('INCR', key)
    if current == 1 then
        redis.call('EXPIRE', key, window)
    end
    if current > limit then return 0 end
    return 1
" 1 rate:api:login 100 60`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "Redis Lua 脚本相比事务（MULTI/EXEC）的优势？", options: ["更快", "可以在脚本中做逻辑判断", "支持回滚", "不占网络"], answer: 1, explanation: "Lua 脚本支持条件判断、循环等逻辑，可根据读取数据决定下一步，比事务灵活得多。" },
        { question: "EVALSHA 相比 EVAL 的好处？", options: ["省带宽", "更安全", "支持更多命令", "不需要脚本"], answer: 0, explanation: "EVALSHA 只传 SHA1 摘要（几十字节），不用每次传整个脚本。" },
      ],
    },
    "redis-optimization": {
      slug: "redis-optimization",
      sections: [
        {
          title: "内存优化——省着点用",
          content: `Redis 虽快，数据全在内存，内存就是真金白银。优化关键：用小而精的数据结构（能用 Hash 别用多个 String）、设好过期时间（别让冷数据一直占着）、避免大 key（一个 key 几 MB 又占内存又拖性能）。`,
          code: `# 看内存
INFO memory
MEMORY USAGE mykey        # 某 key 占多少
MEMORY DOCTOR             # Redis 内存诊断建议

# 看大 key（生产慎用）
redis-cli --bigkeys

# 设最大内存和淘汰策略
maxmemory 2gb
maxmemory-policy allkeys-lru`,
          language: "bash",
          tip: "务必配置 maxmemory 和淘汰策略，不然内存满了 Redis 直接拒绝写入甚至崩溃。",
        },
        {
          title: "内存淘汰策略",
          content: `内存满了要淘汰 key。几种策略：
noeviction——不淘汰直接拒绝写入（默认，一般不这么用）
allkeys-lru——在所有 key 里淘汰最近最少用的（缓存场景推荐）
volatile-lru——只在设了过期的 key 里淘汰
allkeys-random——随机淘汰
volatile-ttl——优先淘汰剩余寿命最短的

缓存场景推荐 allkeys-lru。`,
        },
        {
          title: "避免慢查询",
          content: `Redis 单线程执行命令，一个慢命令让所有人排队等。要特别避免：
禁用 KEYS * 用 SCAN
大 key 的 DEL 用 UNLINK（异步删除，Redis 4.0+）
SORT、SUNION 等集合操作数据量大时极慢
SMEMBERS 是 O(N)，大 Set 慎用`,
          code: `# 排查慢查询
SLOWLOG GET 10            # 最近 10 条慢查询
SLOWLOG RESET

# 配置
slowlog-log-slower-than 10000  # 超 10ms 就算慢`,
          language: "bash",
        },
        {
          title: "连接池与 Pipeline",
          content: `频繁建连断开开销大，务必用连接池。主流客户端都内置了。配合 Pipeline 批量发命令，吞吐提升几十倍。`,
          code: `// Node.js ioredis + Pipeline
const Redis = require('ioredis');
const redis = new Redis({ host: 'localhost', port: 6379 });

const pipeline = redis.pipeline();
pipeline.set('a', 1);
pipeline.set('b', 2);
pipeline.get('a');
const results = await pipeline.exec();`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "Redis 缓存场景推荐哪种淘汰策略？", options: ["noeviction", "allkeys-lru", "volatile-random", "allkeys-random"], answer: 1, explanation: "allkeys-lru 在所有 key 中淘汰最近最少用的，缓存场景最合适。" },
        { question: "为啥不要直接 DEL 大 key？", options: ["不能删", "DEL 是 O(N) 可能阻塞 Redis", "会丢数据", "会触发淘汰"], answer: 1, explanation: "DEL 大 key 需释放大量内存 O(N) 可能到秒级阻塞其他请求。用 UNLINK 异步删除。" },
      ],
    },
    "redis-security": {
      slug: "redis-security",
      sections: [
        {
          title: "Redis 安全问题——血的教训",
          content: `Redis 默认安装几乎没安全措施：无密码、绑所有网卡、端口众所周知。互联网上被黑掉的 Redis 不计其数——攻击者连上你 Redis 要么偷数据，要么写 SSH 公钥控制服务器甚至挖矿。

所以 Redis 安全不是「想不想」，是必须做。`,
        },
        {
          title: "基本安全配置",
          content: `上线前这几项必须配：
设置密码——requirepass，虽明文传输但至少挡住大多数自动扫描
绑内网 IP——bind 不设 0.0.0.0，只监听内网
改端口——别用默认 6379（安全中的隐匿策略）
禁用/重命名危险命令——FLUSHALL、CONFIG 等`,
          code: `# redis.conf 安全配置
bind 127.0.0.1 10.0.0.5
port 16379

requirepass "你的强密码"

rename-command FLUSHALL ""           # 禁用
rename-command CONFIG "CFG_hidden"  # 重命名
rename-command KEYS ""               # 禁用

maxclients 10000`,
          language: "bash",
          tip: "如果必须暴露公网，务必加防火墙限制来源 IP，只允许自己的应用服务器访问。",
        },
        {
          title: "TLS 加密（Redis 6.0+）",
          content: `Redis 6.0 开始原生支持 TLS，客户端到服务器连接加密。敏感数据或公网传输强烈建议开启。`,
          code: `# redis.conf TLS
port 0                      # 关非 TLS
tls-port 6379
tls-cert-file /path/to/redis.crt
tls-key-file /path/to/redis.key
tls-ca-cert-file /path/to/ca.crt

# 连接
redis-cli --tls --cert client.crt --key client.key --cacert ca.crt`,
          language: "bash",
        },
        {
          title: "ACL 权限控制（Redis 6.0+）",
          content: `Redis 6.0 引入 ACL，不再一个密码走天下。可以给不同用户不同权限：应用用户只能读写特定数据、运维只读、监控只用 INFO。`,
          code: `# 创建 ACL 用户
ACL SETUSER appuser on >pass123 ~user:* +@all -@dangerous
# ↑ 只能操作 user: 开头的键，禁用危险命令

ACL SETUSER readonly on >readonly ~* +@read
# ↑ 只读所有键

ACL LIST
ACL WHOAMI

# 持久化
aclfile /etc/redis/users.acl`,
          language: "bash",
          tip: "ACL 是 Redis 6.0 的重大安全升级，可以精细控制每个用户的权限，强烈建议启用。",
        },
      ],
      quiz: [
        { question: "Redis 默认最大安全隐患？", options: ["太慢了", "默认无密码且绑所有网卡", "不支持 HTTPS", "数据不压缩"], answer: 1, explanation: "Redis 默认无密码、绑 0.0.0.0、端口 6379 众所周知，攻击者可直接连接执行任意命令。" },
        { question: "Redis 6.0 ACL 主要解决什么问题？", options: ["性能优化", "精细化权限控制", "数据压缩", "集群管理"], answer: 1, explanation: "ACL 允许为不同用户设置不同的命令和键权限，不再是一个密码走天下。" },
      ],
    },
  },
  // ============ Frontend ============
  frontend: {
    "html-basics": {
      slug: "html-basics",
      sections: [
        {
          title: "HTML 文档结构——网页的骨架",
          content: `HTML 就是搭网页的积木，每个网页背后都是一堆标签拼起来的。就跟盖房先打地基一样，每个 HTML 页面有个标准框架。

一个标准 HTML5 页面包含：
DOCTYPE 声明——告诉浏览器「按 HTML5 规矩来」
html 根元素——整个页面装这个大盒子里
head 头部——放幕后信息：元数据、标题、样式链接等
body 主体——用户能看到的所有东西`,
          code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个网页</title>
</head>
<body>
    <h1>欢迎来到 HTML 世界</h1>
    <p>这是一个段落。</p>
</body>
</html>`,
          language: "html",
        },
        {
          title: "常用标签速览——搭积木的基本块",
          content: `HTML 标签说白了就是你搭网页的积木块。最常用的：

标题标签 h1~h6——数字越小字越大，h1 一般一个页面只有一个
段落标签 p——文字都要包在 p 或别的标签里
链接标签 a——href 是点它要跳转的地址
图片标签 img——src 指图片在哪，alt 是加载不出时显示的替代文字
列表——ul 无序列表带圆点，ol 有序列表带数字，li 是每行
容器——div 块级占一行，span 行内不换行`,
          code: `<h1>最大的标题</h1>
<h2>二级标题</h2>

<p>这是一段文字，可以有<strong>加粗</strong>和<em>斜体</em>。</p>

<a href="https://example.com" target="_blank">点我跳转</a>

<img src="photo.jpg" alt="一张风景照" width="600">

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
          tip: "用语义化标签（header、nav、main、article、footer）替代纯 div，代码更清晰还能提升 SEO 和无障碍体验。",
        },
        {
          title: "表格与表单——跟用户打交道",
          content: `网页不光展示内容还得跟用户互动。表格（table）展示结构化数据：table 包裹，tr 是一行，th 是表头加粗，td 是普通格。表单（form）收集用户输入：input 最常用，type 决定样子，textarea 多行输入，select 下拉框。`,
          code: `<table border="1">
    <thead>
        <tr><th>姓名</th><th>年龄</th><th>城市</th></tr>
    </thead>
    <tbody>
        <tr><td>张三</td><td>25</td><td>北京</td></tr>
        <tr><td>李四</td><td>30</td><td>上海</td></tr>
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
        { question: "HTML5 的 DOCTYPE 怎么写？", options: ["<!DOCTYPE HTML PUBLIC>", "<!DOCTYPE html>", "<DOCTYPE HTML>", "<html DOCTYPE>"], answer: 1, explanation: "HTML5 的 DOCTYPE 极简，一行 <!DOCTYPE html>。" },
        { question: "哪个标签创建超链接？", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1, explanation: "a 标签（anchor）用于创建跳转链接，href 指定目标。" },
        { question: "img 的 alt 属性是干嘛的？", options: ["设大小", "指定路径", "图片加载失败时的替代文字", "设边框"], answer: 2, explanation: "alt 在图片无法显示时展示替代文字，屏幕阅读器也用它描述图片。" },
      ],
    },
    "css-basics": {
      slug: "css-basics",
      sections: [
        {
          title: "CSS 选择器——找准你要「化妆」的元素",
          content: `CSS 给 HTML 穿衣服化妆，选择器告诉它「给谁化」。常用选择器：

元素选择器——直接写标签名，p 选所有段落
类选择器——点号开头，.container 选所有 class="container" 的（最常用！）
ID 选择器——井号开头，#header 选 id="header" 的元素
后代选择器——空格隔开，.nav a 选导航里所有链接
伪类——冒号开头，:hover 鼠标悬停，:focus 输入框获焦点`,
          code: `/* 元素选择器 */
p { color: #333; line-height: 1.6; }

/* 类选择器（最常用） */
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }

/* ID 选择器 */
#header { background: #1a1a1a; color: white; }

/* 后代选择器 */
.nav a { text-decoration: none; color: inherit; }

/* 伪类 */
.button:hover { background: #0066cc; transform: translateY(-1px); }
input:focus { outline: 2px solid #0066cc; }`,
          language: "css",
        },
        {
          title: "盒模型——每个元素都是盒子",
          content: `CSS 世界里，每个元素都是矩形「盒子」。由里到外四层：
content——实际内容区，width/height 控制这层
padding——内边距，内容到边框的间距
border——边框
margin——外边距，跟邻居的距离

关键在 box-sizing。默认 width 只包括 content，加上 padding+border 实际更宽很难算。设 box-sizing: border-box 后 width 包含 content+padding+border，布局计算直观多了。`,
          code: `/* 默认盒模型（算得头疼） */
.box { width: 200px; padding: 20px; border: 2px solid #333; margin: 10px; }
/* 实际占宽：200+40+4=244px */

/* border-box 盒模型（强烈推荐） */
.box-border { box-sizing: border-box; width: 200px; padding: 20px; border: 2px solid #333; }
/* 实际占宽就是 200px */

/* 项目开始就全局设置 */
*, *::before, *::after { box-sizing: border-box; }`,
          language: "css",
          tip: "项目一开始就全局 box-sizing: border-box，能省掉你无数布局上的麻烦。",
        },
      ],
      quiz: [
        { question: "类选择器用什么符号？", options: ["#", ".", "!", "@"], answer: 1, explanation: "类选择器用点号（.）作前缀，如 .my-class。" },
        { question: "box-sizing: border-box 作用？", options: ["加边框", "让 width 包含 padding 和 border", "去掉边框", "设外边距"], answer: 1, explanation: "border-box 让 width/height 包含 padding+border，布局不再需要心算。" },
      ],
    },
    "css-flexbox": {
      slug: "css-flexbox",
      sections: [
        {
          title: "Flexbox——弹性盒子，布局救星",
          content: `Flexbox 出现之前，CSS 做水平居中、等分布局、垂直对齐让人崩溃——float、clearfix 各种 hack。Flexbox 就是来救场的。

思路特简单：给容器设 display: flex，子元素自动变「弹性元素」，在一行或一列里排列、对齐、分空间。就像把东西放进会自动调整的抽屉里。`,
        },
        {
          title: "容器属性——管「抽屉」的",
          content: `flex-direction——横排 row 或竖排 column
justify-content——主轴对齐（居中、两端对齐、均匀分布）
align-items——交叉轴对齐（顶、中、底、拉伸）
flex-wrap——多了换不换行
gap——子元素之间的间距`,
          code: `/* Flexbox 容器 */
.container {
    display: flex;
    flex-direction: row;           /* 横排（默认） */
    justify-content: space-between; /* 两端对齐 */
    align-items: center;           /* 垂直居中 */
    flex-wrap: wrap;               /* 多了自动换行 */
    gap: 16px;
}

/* 水平居中 */
.h-center { display: flex; justify-content: center; }

/* 万能居中（水平+垂直） */
.perfect-center { display: flex; justify-content: center; align-items: center; }`,
          language: "css",
        },
        {
          title: "子元素属性——管「里面东西」的",
          content: `flex-grow——有多余空间时能「长大」多少
flex-shrink——空间不够时能「缩小」多少
flex-basis——初始大小
flex——上面仨的简写，flex: 1 就是均分空间
align-self——单独设置某一项的对齐方式`,
          code: `/* 子元素 */
.item { flex: 1; }          /* 均分剩余空间 */
.item-fixed { flex: 0 0 200px; }  /* 固定 200px */
.item-double { flex: 2; }   /* 占别人的两倍 */

/* 三栏布局（两侧固定 中间自适应） */
.layout { display: flex; }
.sidebar { flex: 0 0 250px; }
.main    { flex: 1; }
.aside   { flex: 0 0 300px; }`,
          language: "css",
          tip: "flex: 1 是 CSS 里用得最频繁的简写之一，等于告诉元素「剩余空间你都吃了，跟大家平分」。",
        },
        {
          title: "Flexbox 实战场景",
          content: `Flexbox 日常开发就能搞定大部分布局：导航栏（logo 左菜单右）、卡片列表（自动换行间距均匀）、居中（水平垂直再也不用纠结）、等分（几等分轻轻松松）、圣杯布局（侧边固定中间自适应）。`,
        },
      ],
      quiz: [
        { question: "justify-content: center 干嘛的？", options: ["垂直居中", "主轴居中", "子元素加间距", "换行"], answer: 1, explanation: "justify-content 控制主轴对齐，center 是居中对齐。" },
        { question: "flex: 1 啥意思？", options: ["固定 1px", "均分剩余空间", "不放大", "不缩小"], answer: 1, explanation: "flex: 1 = flex-grow:1; flex-shrink:1; flex-basis:0，让元素均分剩余空间。" },
      ],
    },
    "css-grid": {
      slug: "css-grid",
      sections: [
        {
          title: "Grid——二维布局之王",
          content: `Flexbox 适合一维（要么横要么竖），Grid 是真正的二维布局——同时管行和列。像棋盘一样，把容器分几行几列，把元素放指定格子里。

Grid 最适合：页面整体布局、仪表盘、图片墙、需要同时控制行列的场景。`,
        },
        {
          title: "基础网格——分行分列",
          content: `Grid 核心是定义行列「轨道」：
grid-template-columns——几列、每列多宽
grid-template-rows——几行、每行多高
gap——格子之间的间距`,
          code: `/* Grid 基础 */
.container { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 16px; }

/* fr 是 Grid 里最实用的单位：剩余空间的份数 */
.equal-cols { display: grid; grid-template-columns: repeat(3, 1fr); /* 三等分 */ }

/* 响应式自动列数，每列最少 250px */
.auto-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }`,
          language: "css",
          tip: "fr（fraction）是 Grid 最实用的单位，1fr 2fr 表示第二列是第一列两倍宽，不用算百分比。",
        },
        {
          title: "区域命名法——最优雅的布局方式",
          content: `grid-template-areas 给每个格子取名字，放元素时直接用名字指定位子，布局结构一目了然。改布局只需改 areas 里的名字排列就行。`,
          code: `/* Grid 区域命名——最直观的布局 */
.layout {
    display: grid;
    grid-template-areas:
        "header  header  header"
        "sidebar main    aside"
        "footer  footer  footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 12px;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.aside   { grid-area: aside; }
.footer  { grid-area: footer; }`,
          language: "css",
          tip: "grid-template-areas 是 Grid 最优雅的用法，布局结构一眼就看明白了。",
        },
        {
          title: "Flexbox 还是 Grid？",
          content: `Flexbox——一维布局，一排或一列里排列元素。适合导航栏、按钮组、卡片列表。
Grid——二维布局，同时控制行和列。适合整体页面布局、仪表盘、图库。

它们不冲突，经常混着用——外层大结构用 Grid，里面小组件用 Flexbox。`,
        },
      ],
      quiz: [
        { question: "Grid 的 fr 单位表示什么？", options: ["固定像素", "剩余空间的份数", "百分比", "视口单位"], answer: 1, explanation: "fr（fraction）表示网格容器中剩余空间的一份，1fr 2fr 第二列是第一列两倍宽。" },
        { question: "Grid 和 Flexbox 最核心的区别？", options: ["Flexbox 更快", "Grid 二维，Flexbox 一维", "Grid 更旧", "没区别"], answer: 1, explanation: "Grid 同时控制行和列（二维），Flexbox 主要负责一个方向的排列（一维）。" },
      ],
    },
    "typescript-basics": {
      slug: "typescript-basics",
      sections: [
        {
          title: "TypeScript 是什么——给 JS 立规矩",
          content: `TypeScript 就是 JavaScript 加了「类型标注」。JS 像随手写便签（自由但易写错），TS 像填规范表格（有约束但不易出错）。

加类型的好处在哪：
写代码时 IDE 就能即时提示——这个变量能点出什么方法、这个函数要什么参数
传错类型当场报错——不用等到线上才炸锅
看代码一目了然——不需要猜某个参数是字符串还是数字
大型项目维护起来舒服——重构时改一个类型定义，所有用错的地方全给你标出来`,
          code: `// JavaScript（没类型——偷偷埋雷）
function greet(name) { return "Hello, " + name; }
greet(123);  // 不会报错，但结果肯定有问题

// TypeScript（有类型——编译就炸雷）
function greet(name: string): string { return "Hello, " + name; }
greet(123);  // ❌ 编译报错！参数类型不对`,
          language: "typescript",
        },
        {
          title: "基础类型——给变量贴「标签」",
          content: `基础类型跟 JS 数据类型对应：
string——字符串
number——数字（没有 int/float 之分，都是 number）
boolean——true 或 false
array——用 Type[] 表示，比如 string[] 是字符串数组
any——关了类型检查，「随便你」（少用！）
unknown——不知道什么类型，但必须检查后才能用（比 any 安全）
void——函数没有返回值`,
          code: `// 基础类型标注
let name: string = "小明";
let age: number = 25;
let isActive: boolean = false;
let hobbies: string[] = ["编程", "读书"];

// 函数类型
function add(a: number, b: number): number { return a + b; }
function greet(name: string, greeting?: string): string {
    return (greeting || "你好") + ", " + name;
}`,
          language: "typescript",
        },
        {
          title: "接口和类型别名——定义「形状」",
          content: `interface 像「合同」——定义规范，谁用谁就得按规范来。可以扩展（extends）。
type 像「别名」——给一个复杂类型起个简短名字。支持联合类型 |、交叉类型 & 等骚操作。

泛型就是类型的「参数化」——不用写死类型，而是「谁用谁指定」。`,
          code: `// 接口
interface User { id: number; name: string; email: string; age?: number; }
function printUser(user: User) { console.log(user.name); }

// 接口继承
interface AdminUser extends User {
    role: "admin" | "superadmin";
    permissions: string[];
}

// 类型别名
type Status = "active" | "inactive" | "pending";
type Point = { x: number; y: number };

// 泛型——给类型「传参数」
function getFirst<T>(arr: T[]): T | undefined { return arr[0]; }
const first = getFirst<number>([1, 2, 3]);  // first 的类型是 number`,
          language: "typescript",
          tip: "TS 学习曲线是先陡后平——刚开始满屏报错觉得很烦，一旦适应了就再也回不去 JS 了。类型安全感极强。",
        },
      ],
      quiz: [
        { question: "TypeScript 相比 JS 最大优势？", options: ["更快", "编译时的类型检查", "更小体积", "不依赖 Node"], answer: 1, explanation: "TS 通过静态类型检查在编译时就能发现类型相关的 bug，大幅减少运行时错误。" },
        { question: "any 和 unknown 的区别？", options: ["没区别", "any 绕过类型检查，unknown 必须先检查才能用", "unknown 更快", "any 更安全"], answer: 1, explanation: "any 直接关闭类型检查；unknown 虽然接受任何值，但使用前必须做类型判断，更安全。" },
      ],
    },
    "react-basics": {
      slug: "react-basics",
      sections: [
        {
          title: "React 组件基础——搭 UI 积木",
          content: `React 的核心思想就是把 UI 拆成一个个独立的、可复用的「组件」。每个组件就像一块积木，你可以随便组合它们搭出复杂的界面。

组件就是一个返回 JSX 的函数。JSX 看起来像在 JavaScript 里写 HTML，其实会被编译成普通的 JS 函数调用。组件名必须以大写字母开头——React 靠这个区分「自定义组件」和「普通 HTML 标签」。`,
          code: `// 函数组件（现代 React 的标准写法）
function Welcome({ name }: { name: string }) {
    return (
        <div className="welcome">
            <h1>你好，{name}！</h1>
            <p>欢迎使用 React</p>
        </div>
    );
}

// 使用组件——像搭乐高一样拼起来
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
          title: "Props 与 State——数据怎么流动",
          content: `React 里的数据分两种：

Props——父组件传给子组件的数据，子组件只能读不能改。就像爸妈给你的零花钱，你可以花但不能在钱上改面额。
State——组件自己管理的内部数据，改了 State 就会自动重新渲染界面。就像你自己的账户余额，想取就取想存就存。

useState 是最基础的 State Hook。调用它返回一个数组：第一个是当前值，第二个是更新这个值的函数。每次调用更新函数，组件就会重新渲染。`,
          code: `import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>当前计数：{count}</p>
            <button onClick={() => setCount(count + 1)}>加 1</button>
            <button onClick={() => setCount(count - 1)}>减 1</button>
            <button onClick={() => setCount(0)}>重置</button>
        </div>
    );
}`,
          language: "jsx",
          tip: "State 更新是异步的。如果新状态依赖于旧状态，要用函数式更新：setCount(prev => prev + 1)，避免拿到过期的值。",
        },
      ],
      quiz: [
        { question: "React 组件名为什么必须大写开头？", options: ["约定俗成", "React 用它区分组件和普通 HTML 标签", "为了好看", "性能更好"], answer: 1, explanation: "React 用首字母大写来区分是自定义组件还是原生 HTML 标签。" },
        { question: "useState 返回的是什么？", options: ["一个对象", "一个值", "一个数组（值和更新函数）", "一个函数"], answer: 2, explanation: "useState 返回 [当前状态值, 更新状态的函数]。" },
      ],
    },
    "react-hooks": {
      slug: "react-hooks",
      sections: [
        {
          title: "useEffect——管「额外的事」",
          content: `React 组件主要负责「根据数据渲染 UI」，但有时候你需要干别的——发网络请求、订阅事件、操作 DOM、设置定时器。这些统统叫「副作用」，用 useEffect 来处理。

useEffect 接受一个函数和一个依赖数组。函数在组件渲染后执行；依赖数组告诉 React「这些值变了才重新执行」。空数组 [] 表示只在组件加载时跑一次。`,
          code: `import { useState, useEffect } from 'react';

function UserProfile({ userId }: { userId: number }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(\`/api/users/\${userId}\`)
            .then(res => res.json())
            .then(setUser);
    }, [userId]);  // userId 变了就重新拉数据

    // 清理函数：组件卸载或依赖变化前执行
    useEffect(() => {
        const timer = setInterval(() => console.log('tick'), 1000);
        return () => clearInterval(timer);  // 一定要清理！
    }, []);

    if (!user) return <p>加载中...</p>;
    return <div>{user.name}</div>;
}`,
          language: "jsx",
          tip: "useEffect 的返回函数（清理函数）在组件卸载或者下一次 effect 执行前调用，用来清定时器、取消订阅等。忘记清理是内存泄漏的常见原因。",
        },
        {
          title: "useRef——不被渲染影响的「小本本」",
          content: `useRef 像一个「不被渲染影响的小本本」。它存的变量在组件整个生命周期里保持不变，改它的值也不会触发重新渲染。

主要用途：拿 DOM 元素的引用（比如自动聚焦输入框）、保存上一次的值、存任何不想触发重渲染的数据。`,
          code: `import { useRef, useEffect } from 'react';

function AutoFocusInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => { inputRef.current?.focus(); }, []);
    return <input ref={inputRef} type="text" />;
}

// 保存上一次的值（经典自定义 Hook）
function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => { ref.current = value; });
    return ref.current;
}`,
          language: "jsx",
        },
        {
          title: "useMemo 和 useCallback——需要时才优化",
          content: `当组件重新渲染时，里面的计算和函数都会重新创建。大部分时候这不是问题，但如果计算很重或者函数传给子组件导致不必要的重渲染，就需要优化。

useMemo——缓存计算结果，依赖不变就不重新算
useCallback——缓存函数引用，依赖不变就返回同一个函数

记住：不是每个地方都加这俩！只在真正需要优化的时候才用，否则反而增加复杂度和维护成本。`,
          code: `import { useMemo, useCallback } from 'react';

function ExpensiveList({ items, filter }: Props) {
    // 只有 items 或 filter 变了才重新过滤
    const filtered = useMemo(
        () => items.filter(i => i.includes(filter)),
        [items, filter]
    );

    // 函数引用不变，避免子组件不必要的重渲染
    const handleClick = useCallback((id: number) => {
        console.log('clicked', id);
    }, []);

    return filtered.map(item => <Item key={item} onClick={handleClick} />);
}`,
          language: "jsx",
        },
        {
          title: "自定义 Hook——把逻辑抽出来复用",
          content: `自定义 Hook 就是以 use 开头的普通函数，里面可以调用其他 Hook。这是 React 里复用状态逻辑的最佳方式——把「数据请求」「窗口尺寸」「表单处理」这些通用逻辑抽成自定义 Hook，多个组件直接用。`,
          code: `// 自定义 Hook：追踪窗口尺寸
function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    useEffect(() => {
        const handler = () => setSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return size;
}

// 在任何组件里直接用
function ResponsiveComponent() {
    const { width } = useWindowSize();
    return <p>窗口宽度：{width}px</p>;
}`,
          language: "jsx",
        },
      ],
      quiz: [
        { question: "useEffect 第二个参数是空数组 [] 代表什么？", options: ["每次渲染都执行", "只在组件加载时执行一次", "依赖所有变量", "永不执行"], answer: 1, explanation: "[] 表示没有任何依赖，effect 只在组件首次渲染（挂载）后执行一次。" },
        { question: "useRef 和 useState 最核心的区别是什么？", options: ["useRef 更快", "useRef 改变不触发重新渲染", "useState 能存 DOM 引用", "没区别"], answer: 1, explanation: "useRef 的值改变不会触发组件重新渲染，而 useState 的值改变会触发重渲染。" },
      ],
    },
    "vue-basics": {
      slug: "vue-basics",
      sections: [
        {
          title: "Vue.js 模板语法——数据驱动视图",
          content: `Vue 的核心思想是「数据驱动视图」——你只管改数据，页面自动更新，不用手动操作 DOM。

模板语法非常直觉：
双大括号 {{ }}——把数据插到 HTML 里
v-bind（简写 :）——把数据绑定到 HTML 属性上
v-on（简写 @）——绑定事件
v-model——表单双向绑定：改表单会更新数据，改数据会更新表单
v-if / v-show——条件渲染，控制显示或隐藏
v-for——循环渲染列表`,
          code: `<div id="app">
    <!-- 文本插值 -->
    <h1>{{ message }}</h1>

    <!-- 属性绑定 -->
    <a v-bind:href="url">链接</a>
    <img :src="imageUrl" :alt="imageAlt">

    <!-- 事件绑定 -->
    <button v-on:click="handleClick">点击</button>
    <button @click="handleClick">简写</button>

    <!-- 双向绑定 -->
    <input v-model="inputValue">
    <p>你输入了：{{ inputValue }}</p>

    <!-- 条件渲染 -->
    <p v-if="isLogin">欢迎回来！</p>
    <p v-else>请先登录</p>

    <!-- 列表渲染 -->
    <ul>
        <li v-for="(item, index) in items" :key="index">
            {{ index }} - {{ item }}
        </li>
    </ul>
</div>

<script>
const app = Vue.createApp({
    data() {
        return {
            message: 'Hello Vue!',
            url: 'https://vuejs.org',
            imageUrl: 'logo.png',
            imageAlt: 'Vue Logo',
            inputValue: '',
            isLogin: false,
            items: ['苹果', '香蕉', '橘子']
        };
    },
    methods: {
        handleClick() { alert('按钮被点击了！'); }
    }
});
app.mount('#app');
</script>`,
          language: "html",
        },
      ],
      quiz: [
        { question: "Vue 中 v-model 的作用是什么？", options: ["绑定事件", "双向数据绑定", "条件渲染", "列表渲染"], answer: 1, explanation: "v-model 实现了表单元素和 Vue 数据的双向绑定——表单改数据就变，数据改表单就变。" },
        { question: "v-if 和 v-show 的区别是什么？", options: ["没区别", "v-if 是真的添加/移除元素，v-show 是改 display", "v-show 更快", "v-if 只能用在表单上"], answer: 1, explanation: "v-if 是真正的条件渲染，不满足时 DOM 元素不存在；v-show 元素始终存在，只是切换 display 属性。" },
      ],
    },
    "vue3-composition": {
      slug: "vue3-composition",
      sections: [
        {
          title: "组合式 API——把逻辑「组装」起来",
          content: `Vue 3 最大的变化就是推出了组合式 API（Composition API）。在旧的选项式 API 里，同一个功能的代码散落在 data、methods、computed、watch 各处——功能一多就很难维护。组合式 API 允许你把同一块逻辑写在一起，然后用 setup() 函数「组装」起来。

setup() 是组合式 API 的入口，在组件创建之前执行。在里面定义响应式数据、计算属性、方法，然后 return 出去给模板用。`,
          code: `// Vue 3 组合式 API
import { ref, reactive, computed, watch, onMounted } from 'vue';

export default {
    setup() {
        // 响应式数据
        const count = ref(0);              // 基本类型用 ref
        const user = reactive({            // 对象用 reactive
            name: '张三',
            age: 25
        });

        // 计算属性
        const doubleCount = computed(() => count.value * 2);

        // 方法
        function increment() {
            count.value++;  // ref 需要 .value 访问
        }

        // 侦听器
        watch(count, (newVal, oldVal) => {
            console.log(\`count 从 \${oldVal} 变成了 \${newVal}\`);
        });

        // 生命周期
        onMounted(() => {
            console.log('组件挂载好了');
        });

        // 返回给模板用的东西
        return { count, user, doubleCount, increment };
    }
};`,
          language: "javascript",
        },
        {
          title: "ref vs reactive——该用哪个？",
          content: `ref 和 reactive 都能创建响应式数据，但有细微差别：

ref——适合基本类型（字符串、数字、布尔）。在 JS 里访问要 .value，模板里自动解包不用加 .value。也能包对象但内部会转成 reactive。
reactive——适合对象和数组，直接访问属性不用 .value。但不能整体重新赋值（会丢失响应式）。

简单记：基本类型用 ref，对象用 reactive。或者偷懒统一用 ref（因为 ref 什么都能包）。`,
        },
        {
          title: "组合函数——逻辑复用的最佳方式",
          content: `组合式 API 最大的好处是你可以把一段逻辑抽成「组合函数」（composable），在多个组件里复用。就像 React 的自定义 Hook 一样，命名习惯也以 use 开头。`,
          code: `// composables/useMouse.js——追踪鼠标位置
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
    const x = ref(0);
    const y = ref(0);

    function update(event) {
        x.value = event.pageX;
        y.value = event.pageY;
    }

    onMounted(() => window.addEventListener('mousemove', update));
    onUnmounted(() => window.removeEventListener('mousemove', update));

    return { x, y };
}

// 在组件中使用
import { useMouse } from './composables/useMouse';

export default {
    setup() {
        const { x, y } = useMouse();
        return { x, y };
    }
};
// 模板里：<p>鼠标位置：{{ x }}, {{ y }}</p>`,
          language: "javascript",
          tip: "组合函数命名习惯以 use 开头（useMouse、useFetch），这是 Vue 社区约定，跟 React Hook 的命名习惯一致。",
        },
      ],
      quiz: [
        { question: "Vue 3 中 ref 和 reactive 的主要区别？", options: ["ref 更快", "ref 适合基本类型需 .value，reactive 适合对象", "reactive 更旧", "没区别"], answer: 1, explanation: "ref 适合基本类型在 JS 里通过 .value 访问；reactive 适合对象直接访问属性。" },
        { question: "组合式 API 相比选项式 API 最大优势？", options: ["更快", "能把同一功能的代码组织在一起", "更少代码", "更好的 TS 支持"], answer: 1, explanation: "组合式 API 允许将同一功能相关的数据、方法、侦听器写在一起，而不是分散在不同选项里。" },
      ],
    },
    "nextjs-basics": {
      slug: "nextjs-basics",
      sections: [
        {
          title: "Next.js 是什么——React 的「完全体」",
          content: `React 本身只是个 UI 库，要做完整的网站你得自己配路由、做服务端渲染、优化 SEO……Next.js 就是把这些「标配功能」全给你集成好了的 React 框架。

它的几大亮点：
文件即路由——在 app 目录下建个文件，自动就是一个页面路由，不用写路由配置
服务端渲染（SSR）和静态生成（SSG）——页面可以在服务器上生成好再发给浏览器，首屏飞快，SEO 友好
API 路由——同一个项目里既能写前端页面也能写后端 API
图片优化、字体优化、代码分割……你需要的优化它基本都内置了`,
          code: `// app/page.tsx——首页（App Router 写法）
export default function Home() {
    return (
        <main>
            <h1>欢迎来到我的网站</h1>
            <p>这个页面可以是服务端渲染的，也可以是静态生成的</p>
        </main>
    );
}`,
          language: "tsx",
        },
        {
          title: "服务端组件 vs 客户端组件",
          content: `Next.js 13+ 的 App Router 区分了两种组件：

服务端组件（默认）——在服务器上运行，可以直接查数据库、读文件系统，发给浏览器的 HTML 不含 JS，体积为零。但不能用 useState、useEffect 这些浏览器才能跑的 Hook。

客户端组件——在浏览器中运行，就是传统的 React 组件。当你需要交互、状态管理、事件处理时，在文件顶部加 'use client' 声明就行了。`,
          code: `// 服务端组件（默认）——可以直接 async/await 拿数据
async function BlogList() {
    const posts = await fetch('https://api.example.com/posts', {
        next: { revalidate: 3600 }  // 每小时自动重新生成
    }).then(res => res.json());

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}

// 客户端组件——需要交互时加 'use client'
'use client';
import { useState } from 'react';

function LikeButton() {
    const [likes, setLikes] = useState(0);
    return <button onClick={() => setLikes(likes + 1)}>点赞 {likes}</button>;
}`,
          language: "tsx",
        },
        {
          title: "路由和导航",
          content: `Next.js 的 App Router 用文件夹结构定义路由：

app/page.tsx → 首页 /
app/about/page.tsx → /about 页面
app/blog/[slug]/page.tsx → /blog/任意文章名 页面
app/dashboard/layout.tsx → /dashboard 的共享布局

链接用 next/link 组件而不是 a 标签，Next.js 自动做客户端导航——不刷新整页，体验跟 SPA 一样丝滑。`,
          code: `// 导航示例
import Link from 'next/link';

export default function Nav() {
    return (
        <nav>
            <Link href="/">首页</Link>
            <Link href="/blog">博客</Link>
            <Link href="/about">关于</Link>
        </nav>
    );
}`,
          language: "tsx",
          tip: "App Router 里的 layout.tsx 在导航时不会重新渲染，只更新变化的部分——这个「部分渲染」是 Next.js 性能优秀的关键。",
        },
        {
          title: "数据获取——三种策略",
          content: `Next.js 提供了灵活的数据获取方式：

SSR——每次请求都在服务器生成页面，数据永远最新。适合实时数据、个性化内容。
SSG——构建时生成页面，CDN 一发，快到离谱。适合博客、文档、营销页面。
ISR——SSG 升级版，可以设页面多长时间自动重新生成。兼顾速度和新鲜度。`,
          code: `// SSR：每次请求都拿最新数据
async function getData() {
    const res = await fetch('https://api.example.com/data', {
        cache: 'no-store'  // 不缓存，每次拿最新
    });
    return res.json();
}

// SSG + ISR：构建时生成，定时更新
async function getData() {
    const res = await fetch('https://api.example.com/posts', {
        next: { revalidate: 60 }  // 每 60 秒允许重新生成
    });
    return res.json();
}`,
          language: "typescript",
        },
      ],
      quiz: [
        { question: "Next.js 「文件即路由」是什么意思？", options: ["每个文件手动配路由", "app 目录下创建文件就自动生成路由", "路由存在单独文件里", "只能用 API 路由"], answer: 1, explanation: "Next.js 基于文件系统自动生成路由，app 目录下的文件/文件夹结构直接对应 URL 路径。" },
        { question: "ISR（增量静态再生）相比纯 SSG 的优势？", options: ["构建更快", "可以在运行时定期重新生成页面", "更安全", "体积更小"], answer: 1, explanation: "ISR 允许在运行中按设定间隔重新生成静态页面，不用重新构建整个站点就能更新内容。" },
      ],
    },
    "tailwind-basics": {
      slug: "tailwind-basics",
      sections: [
        {
          title: "Tailwind CSS——直接给 HTML 化妆",
          content: `传统 CSS 是「写类名然后在样式表里定义样式」。Tailwind 反过来了——直接用一堆预定义的工具类（utility class）在 HTML 上组合出样式，不写 CSS 文件。

比如你想要一个蓝色背景、白色文字、内边距、圆角的 div，直接写成：
<div class="bg-blue-500 text-white p-4 rounded-lg">

每个 class 干一件事，组合起来就是最终效果。刚开始可能觉得 HTML 「好长好丑」，但用习惯了就回不去了——不用在 CSS 和 HTML 之间来回切，不用纠结给类起什么名。`,
        },
        {
          title: "核心概念——「工具优先」",
          content: `Tailwind 的几个核心概念：

响应式前缀——sm:、md:、lg: 等前缀让类只在特定屏幕尺寸生效。md:flex 就是说中屏以上才变 flex。

状态变体——hover:、focus:、active: 等。hover:bg-red-500 就是鼠标悬停背景变红。

暗色模式——dark: 前缀。dark:bg-gray-800 在暗色模式下背景变深灰。

任意值——方括号写法。w-[300px] 或 text-[#ff6600] 表示「就用这个值」。`,
          code: `<!-- Tailwind 实战——一张卡片组件 -->
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div class="md:flex">
        <div class="md:shrink-0">
            <img class="h-48 w-full object-cover md:h-full md:w-48"
                 src="photo.jpg" alt="图片">
        </div>
        <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                公司新闻
            </div>
            <a href="#" class="block mt-1 text-lg font-medium text-black hover:underline">
                我们推出了新产品！
            </a>
            <p class="mt-2 text-gray-500">
                这是一段产品描述文字，颜色为灰色。
            </p>
        </div>
    </div>
</div>`,
          language: "html",
        },
        {
          title: "Tailwind v4 的变化",
          content: `Tailwind v4 相比 v3 大幅简化：
不再需要 tailwind.config.js——配置直接在 CSS 文件里完成
用 @import "tailwindcss" 引入，替代旧的 @tailwind 指令
CSS-first 配置——在 CSS 里直接设置主题变量、自定义值
原生支持最新的 CSS 特性如 oklch 颜色空间`,
          tip: "Tailwind 的「丑」只是审美习惯问题——当你不再需要给类起名字、也不用在 CSS 文件里翻来翻去的时候，你会爱上这种极简的写法。",
        },
        {
          title: "效率技巧",
          content: `给 Tailwind 提速的几个技巧：
装 VS Code 插件 Tailwind CSS IntelliSense——自动补全、悬停预览、还能排序类名
编辑器设保存时自动排序类名——用 Prettier 的 tailwindcss 插件
不理解某个类时看文档或问 AI——不用背，用得多了自然就记住了
遇到重复的类组合提取成组件——这才是 Tailwind 的正确用法`,
        },
      ],
      quiz: [
        { question: "Tailwind CSS 的核心设计理念？", options: ["写更少 HTML", "用工具类直接在 HTML 上组合样式", "组件化 CSS", "CSS-in-JS"], answer: 1, explanation: "Tailwind 用大量预定义的工具类直接在 HTML 上写样式，而不是在单独的 CSS 文件里定义。" },
        { question: "Tailwind 中 md:flex 的 md: 前缀是什么意思？", options: ["暗色模式", "中屏及以上才生效", "鼠标悬停", "最大宽度"], answer: 1, explanation: "md: 是响应式前缀，表示在中等屏幕尺寸及以上时这个样式才生效。" },
      ],
    },
    "dom-manipulation": {
      slug: "dom-manipulation",
      sections: [
        {
          title: "DOM 是什么——浏览器眼里的网页",
          content: `DOM（文档对象模型）就是浏览器把 HTML 解析之后生成的一棵「节点树」。每个标签、每段文字、每个属性都变成树上的一个节点。JavaScript 可以操作这棵树——增删改查节点——这就是「DOM 操作」。

在没有 React/Vue 这些框架之前，前端开发基本就是在跟 DOM 打交道。现在框架帮我们封装了大部分 DOM 操作，但理解它仍然很重要——调试、写自定义交互都离不开。`,
        },
        {
          title: "查找元素——找到你要操作的那个",
          content: `要操作 DOM，先得找到那个元素。原生 JS 提供了几种查找方法：

getElementById——按 ID 找，最快最直接
querySelector——用 CSS 选择器找第一个匹配的，万能
querySelectorAll——找所有匹配的，返回 NodeList
getElementsByClassName / getElementsByTagName——按类名或标签名找（旧 API）`,
          code: `// 查找元素
const header = document.getElementById('header');
const firstBtn = document.querySelector('.btn');
const allBtns = document.querySelectorAll('.btn');
const paragraphs = document.getElementsByTagName('p');

// querySelector 支持任意 CSS 选择器
const activeLink = document.querySelector('nav a.active');
const firstLi = document.querySelector('ul > li:first-child');`,
          language: "javascript",
        },
        {
          title: "修改内容和样式",
          content: `找到元素后就可以改内容、改属性、改样式：

textContent——改文本（安全，不会执行 HTML）
innerHTML——改 HTML 内容（可以插标签但有 XSS 风险）
setAttribute / getAttribute——读写属性
classList——管理 CSS 类（add、remove、toggle、contains）
style——直接改内联样式`,
          code: `// 改内容
const title = document.querySelector('h1');
title.textContent = '新标题';           // 安全，只当纯文本
title.innerHTML = '新<em>标题</em>';     // 能插 HTML，注意 XSS

// 管理 CSS 类
const box = document.querySelector('.box');
box.classList.add('active');
box.classList.remove('hidden');
box.classList.toggle('dark');          // 有就去掉，没有就加上
box.classList.contains('active');      // → true

// 直接改样式
box.style.backgroundColor = '#ff6600';
box.style.transform = 'translateY(-10px)';`,
          language: "javascript",
        },
        {
          title: "创建和删除节点",
          content: `不光能改现有元素，还能动态创建新元素或删掉不要的：

createElement——创建新标签
appendChild / append——往一个元素里加子节点
insertBefore / insertAdjacentHTML——在指定位置插入
remove / removeChild——删除元素`,
          code: `// 创建新元素
const newDiv = document.createElement('div');
newDiv.textContent = '我是新来的';
newDiv.classList.add('new-box');
document.body.appendChild(newDiv);

// 在特定位置插入
container.insertBefore(newDiv, beforeThis);

// 快速插入 HTML
container.insertAdjacentHTML('beforeend', '<p>加到最后</p>');
// 四个位置：beforebegin, afterbegin, beforeend, afterend

// 删除
oldElement.remove();`,
          language: "javascript",
        },
        {
          title: "事件处理——让页面「活」起来",
          content: `用户的点击、输入、滚动、按键……都是「事件」。通过事件监听让页面响应这些操作。

事件冒泡是 DOM 的核心机制——事件先在最内层元素触发，然后一层层往上冒。利用这个可以做「事件委托」——在父元素上统一处理子元素的事件。`,
          code: `// 事件监听
const btn = document.querySelector('button');
btn.addEventListener('click', (event) => {
    console.log('被点了！', event.target);
    event.preventDefault();   // 阻止默认行为
    event.stopPropagation();  // 阻止冒泡
});

// 事件委托——在父元素上统一处理（性能优化经典套路）
document.querySelector('ul').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        console.log('点了：', event.target.textContent);
    }
});

// 常用事件类型
// click, dblclick, mousedown, mouseup, mousemove
// keydown, keyup, keypress
// submit, change, input, focus, blur
// scroll, resize, load, DOMContentLoaded`,
          language: "javascript",
          tip: "事件委托是性能优化的经典技巧——不要给 100 个 li 分别绑事件，在父元素 ul 上绑一个，通过 event.target 判断点了哪个。",
        },
      ],
      quiz: [
        { question: "innerHTML 和 textContent 区别？", options: ["没区别", "innerHTML 可解析 HTML 标签，textContent 只当纯文本", "textContent 更快", "innerHTML 更安全"], answer: 1, explanation: "innerHTML 把内容当 HTML 解析（有 XSS 风险），textContent 只插入纯文本，更安全。" },
        { question: "事件委托利用了 DOM 的什么机制？", options: ["事件捕获", "事件冒泡", "同步执行", "异步回调"], answer: 1, explanation: "事件委托利用事件冒泡，在父元素上绑定一个监听器处理所有子元素事件。" },
      ],
    },
    "ajax-fetch": {
      slug: "ajax-fetch",
      sections: [
        {
          title: "Ajax 和 Fetch——网页怎么偷偷发请求",
          content: `Ajax 技术的核心就一件事：不刷新整个页面就能跟服务器交换数据。你刷微博时往下滑自动加载更多内容、在搜索框里输入时弹出的联想词——全是 Ajax 在背后干活。

以前用 XMLHttpRequest（又长又臭的 XHR），现在全用 Fetch API，基于 Promise，写法清爽多了。`,
        },
        {
          title: "Fetch 基本用法",
          content: `Fetch 用法很简单：传 URL 进去，它返回一个 Promise，拿到响应后按需解析 JSON、文本等。

核心就是 fetch(url, options)，其中 options 可以指定请求方法（GET/POST）、请求头、请求体等。`,
          code: `// GET 请求
fetch('/api/users')
    .then(res => {
        if (!res.ok) throw new Error('请求失败');
        return res.json();
    })
    .then(data => console.log('数据：', data))
    .catch(err => console.error('出错：', err));

// POST 请求（发数据）
fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '张三', email: 'zhangsan@example.com' })
})
    .then(res => res.json())
    .then(data => console.log('创建成功：', data));

// async/await 写法（更优雅）
async function getUsers() {
    try {
        const res = await fetch('/api/users');
        const users = await res.json();
        return users;
    } catch (err) {
        console.error('请求出错：', err);
    }
}`,
          language: "javascript",
        },
        {
          title: "处理响应——不只是 JSON",
          content: `Response 对象提供多种解析方式：

res.json()——解析 JSON 数据（最常用）
res.text()——获取纯文本
res.blob()——获取二进制数据（图片、文件等）
res.arrayBuffer()——获取原始二进制缓冲

还要注意 res.ok——它是 true 时状态码在 200-299 之间，false 时（如 404、500）也要处理。`,
        },
        {
          title: "请求配置——更多选项",
          content: `Fetch 的第二个参数 options 可以配置很多东西：

method——请求方法（GET、POST、PUT、DELETE 等）
headers——请求头对象
body——请求体数据
mode——CORS 模式（cors、no-cors、same-origin）
credentials——是否带 Cookie（include、same-origin、omit）
cache——缓存策略（default、no-cache、reload、force-cache）`,
          code: `// 完整配置示例
await fetch('/api/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(data),
    credentials: 'include',  // 跨域请求也带 Cookie
    cache: 'no-cache'
});`,
          language: "javascript",
          tip: "Fetch 默认不会在 404 或 500 时 reject，只会把 ok 设为 false。记得检查 res.ok 或手动处理状态码。",
        },
        {
          title: "取消请求——AbortController",
          content: `有时候用户操作变了（比如快速切换页面），需要取消正在飞行的请求。AbortController 就是干这个的。`,
          code: `// 取消请求
const controller = new AbortController();

fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .catch(err => {
        if (err.name === 'AbortError') {
            console.log('请求被取消了');
        }
    });

// 5 秒后超时取消
setTimeout(() => controller.abort(), 5000);

// 或者用 AbortSignal.timeout() 一键设置超时
fetch('/api/data', { signal: AbortSignal.timeout(5000) });`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "Fetch API 相比旧的 XMLHttpRequest 最大优势？", options: ["更快", "基于 Promise，写法更清晰", "支持更多格式", "不依赖浏览器"], answer: 1, explanation: "Fetch 基于 Promise 和链式调用，配合 async/await 代码更简洁易读。" },
        { question: "Fetch 请求返回 404 时会 reject 吗？", options: ["会", "不会，只会把 ok 设为 false", "取决于配置", "会抛出异常"], answer: 1, explanation: "Fetch 只在网络故障时 reject。HTTP 错误状态码（404、500 等）不会 reject，需要通过 res.ok 或 res.status 手动判断。" },
      ],
    },
    "bootstrap-basics": {
      slug: "bootstrap-basics",
      sections: [
        {
          title: "Bootstrap 是什么——老牌 UI 框架",
          content: `Bootstrap 是最老牌的 CSS 框架，由 Twitter 开发。它的核心价值就是「开箱即用」——提供了大量预置的组件和栅格系统，不用从零设计按钮、表单、导航栏，直接用现成的 class 就行。

虽然现在有了 Tailwind 等更现代的方案，但 Bootstrap 在快速原型、后台管理系统、不追求个性化设计的项目里依然很能打。`,
        },
        {
          title: "栅格系统——12 列响应式布局",
          content: `Bootstrap 最经典的就是它的 12 列栅格系统。页面横向分成 12 列，你想占几列就占几列。而且自带 5 个断点（xs、sm、md、lg、xl），不同屏幕尺寸自动适配。`,
          code: `<!-- Bootstrap 栅格 -->
<div class="container">
    <div class="row">
        <!-- 中屏及以上占 8 列，小屏占 12 列（全宽） -->
        <div class="col-md-8 col-12">
            <h2>主内容区</h2>
            <p>在大屏幕上占 8/12 宽，手机上全宽。</p>
        </div>
        <!-- 侧边栏 -->
        <div class="col-md-4 col-12">
            <h3>侧边栏</h3>
            <p>在大屏幕上占 4/12 宽。</p>
        </div>
    </div>
</div>`,
          language: "html",
        },
        {
          title: "常用组件速览",
          content: `Bootstrap 提供了一大堆现成的组件，加个 class 就能用：

按钮——btn、btn-primary、btn-lg 等
卡片——card、card-header、card-body
导航栏——navbar、nav、dropdown
表单——form-control、form-check、input-group
弹窗——modal、alert、toast
排版工具——text-center、fw-bold、mt-3、p-4（间距工具类）`,
          code: `<!-- Bootstrap 组件示例 -->
<!-- 按钮 -->
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-outline-danger">危险轮廓按钮</button>
<button class="btn btn-success btn-lg">大号成功按钮</button>

<!-- 卡片 -->
<div class="card" style="width: 18rem;">
    <img src="photo.jpg" class="card-img-top" alt="图片">
    <div class="card-body">
        <h5 class="card-title">卡片标题</h5>
        <p class="card-text">这是卡片的内容文字。</p>
        <a href="#" class="btn btn-primary">了解更多</a>
    </div>
</div>

<!-- 导航栏 -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">品牌名</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link active" href="#">首页</a></li>
                <li class="nav-item"><a class="nav-link" href="#">功能</a></li>
                <li class="nav-item"><a class="nav-link" href="#">关于</a></li>
            </ul>
        </div>
    </div>
</nav>`,
          language: "html",
        },
        {
          title: "Bootstrap 怎么选？",
          content: `Bootstrap 还是 Tailwind？简单说：

选 Bootstrap 如果——你要快速出活、做后台管理系统、不想纠结设计细节、团队不擅长写 CSS。
选 Tailwind 如果——你想要高度定制化的设计风格、喜欢用工具类组合样式、追求设计自由度。

两个框架都很成熟，选哪个都不会错。关键看你的团队和项目需求。`,
        },
      ],
      quiz: [
        { question: "Bootstrap 栅格系统把一行分成几列？", options: ["6 列", "10 列", "12 列", "24 列"], answer: 2, explanation: "Bootstrap 使用 12 列栅格系统，通过 col-* 类指定元素占多少列。" },
        { question: "Bootstrap 中 col-md-6 的 md 代表什么？", options: ["暗色模式", "中等屏幕及以上", "中等字体", "中等间距"], answer: 1, explanation: "md 是 Bootstrap 的断点前缀，表示在中等屏幕（>=768px）及以上时生效。" },
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
