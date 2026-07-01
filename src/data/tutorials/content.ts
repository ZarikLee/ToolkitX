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
          code: `whoami          # 我是谁？
root

hostname         # 这台机器叫什么？
web-server-01

uname -a         # 看看系统版本
Linux web-server-01 5.15.0 #1 SMP x86_64 GNU/Linux

pwd              # 我现在在哪个目录？
/root

ls               # 这目录里有什么？
Desktop  Documents  Downloads

date             # 现在几点？
Sun Jun 28 10:30:00 CST 2026

cal              # 看看日历
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
          code: `man ls           # ls 的完整手册，按 q 退出
ls --help         # ls 的速查版帮助
info ls           # 比 man 更详细的信息文档
type ls           # ls 到底是个啥（内置命令？别名？还是外部分程序？）
which ls          # ls 这个程序在哪个目录
apropos "copy"    # 我忘了复制命令叫啥？搜 "copy" 看看`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "Linux 内核是谁发起的？", options: ["Richard Stallman", "Linus Torvalds", "Dennis Ritchie", "Ken Thompson"], answer: 1, explanation: "Linus Torvalds 1991 年在大学宿舍里搞出了 Linux 内核的第一个版本。" },
        { question: "配置文件一般放在哪个目录？", options: ["/var", "/usr", "/etc", "/tmp"], answer: 2, explanation: "/etc 就是配置文件的大本营，想改系统配置来这里找。" },
        { question: "怎么查当前用户是谁？", options: ["hostname", "whoami", "pwd", "uname"], answer: 1, explanation: "whoami 直接告诉你当前登录的是哪个用户，简单粗暴。" },
        { question: "pwd 命令是干什么的？", options: ["查看当前目录路径", "修改密码", "打印文件", "重启系统"], answer: 0, explanation: "pwd = Print Working Directory，告诉你现在在哪个目录下，迷路时先敲它。" },
        { question: "man ls 查看帮助后怎么退出？", options: ["按 ESC", "按 q", "输入 exit", "Ctrl+C"], answer: 1, explanation: "man 用的是 less 分页器，看完按 q 就退出了，跟 less 操作一样。" },
      ],
    },
    "file-operations": {
      slug: "file-operations",
      sections: [
        {
          title: "查看文件与目录",
          content: `ls 是你用得最多的命令，就像你在 Finder 里看文件夹一样。但 ls 比图形界面强一百倍：`,
          code: `ls                 # 看看当前目录有啥
ls -l              # 详细列表：谁创建的、多大、啥时候改的
ls -la             # 包括隐藏文件（以 . 开头的那些）
ls -lh             # 文件大小用人类能看懂的单位（1K 而不是 1024）
ls -lt             # 按时间排序，最新改的排最前
ls -lS             # 按文件大小排序，大的在前
ls -R              # 所有子目录里的文件也列出来`,
          language: "bash",
        },
        {
          title: "目录操作",
          content: `在目录之间跳来跳去，其实就三个命令：`,
          code: `cd /path/to/dir    # 去那个目录
cd ~               # 回家（家目录）
cd -               # 退回上次待的目录，特别实用
cd ..              # 上一级目录
cd /               # 去根目录

pwd                # 我现在在哪儿？
/home/user/projects

mkdir newdir           # 新建一个文件夹
mkdir -p a/b/c         # 一口气建三层文件夹
mkdir -m 755 newdir    # 建文件夹同时设好权限`,
          language: "bash",
        },
        {
          title: "文件操作",
          content: `复制、移动、删除——日常操作三件套。注意 rm 可是真删除，没有回收站：`,
          code: `cp file1 file2         # 复制文件
cp -r dir1 dir2        # 复制整个文件夹
cp -p file1 file2      # 保留权限和时间信息
cp -i file1 file2      # 目标文件存在时先问你

mv file1 file2         # 重命名
mv file1 /path/to/     # 挪到别的目录
mv -i file1 file2      # 覆盖前问一下

rm file                # 删文件
rm -f file             # 强制删，不问
rm -r dir              # 删整个文件夹
rm -rf dir             # 删文件夹，强制，不问——慎用！
rm -- -file            # 文件名以 - 开头时得加 -- 保护一下`,
          language: "bash",
          warning: "rm -rf 没有后悔药。执行前先用 ls 确认一下路径，别手抖把整个系统删了。",
        },
        {
          title: "文件查看",
          content: `看文件内容也是家常便饭。不同场景用不同命令：`,
          code: `cat file              # 一口气看完整个文件
head -n 20 file       # 只看前 20 行
tail -n 20 file       # 只看最后 20 行
tail -f file          # 文件有新内容就实时显示，看日志必用
less file             # 分页看，按 q 退出，超大文件也不卡
more file             # 也是分页看，但 less 更好用
wc -l file            # 数数文件有几行
nl file               # 显示行号`,
          language: "bash",
          tip: "tail -f 是运维标配——盯着日志文件，新内容一来就显示，排查问题特别好使。",
        },
        {
          title: "文件查找",
          content: `找文件不能靠眼扫，得靠 find。它就像百度搜文件，按名字、大小、时间什么条件都能搜：`,
          code: `find /path -name "*.log"              # 找所有 .log 文件
find . -type f -name "*.py"           # 找当前目录下所有 .py 文件
find . -type d -name "test"           # 找叫 test 的文件夹
find . -size +100M                    # 找大于 100MB 的大文件，清理空间用
find . -mtime -7                      # 找 7 天内改过的文件
find . -perm 755                      # 找权限是 755 的文件
find . -name "*.tmp" -exec rm {} \\;   # 找到所有 .tmp 并删掉
find . -empty                         # 找空文件和空文件夹

locate nginx.conf     # locate 靠索引查找，秒出结果
updatedb              # 更新 locate 的索引数据库`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "复制整个文件夹要加哪个选项？", options: ["-f", "-r", "-i", "-v"], answer: 1, explanation: "-r（recursive）递归复制，文件夹里的所有东西一并带走。" },
        { question: "哪个命令能实时盯着文件更新？", options: ["cat", "head", "tail -f", "less"], answer: 2, explanation: "tail -f 会一直跟踪文件，新写一行它就显示一行。" },
        { question: "文件名以 - 开头，怎么安全删除？", options: ["rm -file", "rm -- -file", "rm '-file'", "rm ./-file"], answer: 1, explanation: "-- 是分隔符，告诉 rm 后面不是选项而是文件名。" },
        { question: "cp -p 相比普通 cp，多做了什么？", options: ["复制更快", "保留权限和时间戳", "只复制新文件", "压缩后再复制"], answer: 1, explanation: "-p 是 preserve，保留原文件的权限、时间戳、所有者等元信息。" },
        { question: "find . -name '*.log' -exec rm {} \\; 这个命令干了啥？", options: ["列出所有 log 文件", "找出来并删除所有 .log 文件", "改名所有 .log 文件", "压缩所有 .log 文件"], answer: 1, explanation: "-exec 让 find 对每个找到的文件执行 rm 命令，批量清理非常方便。" },
      ],
    },
    "text-processing": {
      slug: "text-processing",
      sections: [
        {
          title: "grep 命令",
          content: `grep 说白了就是「文本搜索机」——在一堆文字里找你想要的行。名字挺古怪（Global Regular Expression Print），但用法超简单。你查日志、翻代码、找配置项，grep 都是第一选择：`,
          code: `grep "error" /var/log/syslog              # 搜包含 error 的行
grep -i "error" file                       # 不管大小写都搜出来
grep -r "pattern" /path/                   # 在目录里翻个底朝天
grep -n "error" file                       # 显示行号，方便定位
grep -c "error" file                       # 只告诉你匹配了几行
grep -v "debug" file                       # 排除含 debug 的行
grep -l "pattern" *.log                    # 只列文件名，不显内容
grep -A 3 "error" file                     # 匹配行 + 后面 3 行，看上下文
grep -B 2 "error" file                     # 匹配行 + 前面 2 行
grep -E "err|warn|crit" file               # 一次搜多个词（扩展正则）
grep -P "\d{3}-\d{4}" file                 # Perl 正则，威力翻倍`,
          language: "bash",
        },
        {
          title: "sed 命令",
          content: `sed 是个流编辑器，你可以理解成「批量查找替换工具」——不需要打开文件，一键把旧内容换成新内容。处理几十 MB 的日志也不在话下：`,
          code: `sed 's/old/new/' file                     # 每行第一个 old 换成 new
sed 's/old/new/g' file                    # 每行所有 old 全换
sed -i 's/old/new/g' file                 # 直接改原文件，注意没有回头路
sed -i.bak 's/old/new/g' file             # 改之前先备份原文件为 .bak
sed '3d' file                             # 删掉第 3 行
sed '/pattern/d' file                     # 删掉含 pattern 的行
sed '2a\new line' file                    # 在第 2 行后面插入一行
sed '2i\new line' file                    # 在第 2 行前面插入一行
sed -n '5,10p' file                       # 只看第 5 到第 10 行
sed 's/^/    /' file                      # 每行前面加 4 个空格（缩进）`,
          language: "bash",
          tip: "sed -i 会直接改写文件，养成加 .bak 后缀的好习惯，万一改错了还能找回原文件。",
        },
        {
          title: "awk 命令",
          content: `awk 是文本处理界的瑞士军刀——它把每行按空格（或你指定的分隔符）切成一个个字段，然后你可以对这些字段做加减乘除、统计、过滤。相当于命令行的 Excel：`,
          code: `awk '{print $1}' file                     # 打印第 1 列
awk '{print $1, $3}' file                 # 打印第 1 和第 3 列
awk -F: '{print $1}' /etc/passwd          # 用冒号当分隔符
awk '/error/ {print}' file                # 打印含 error 的行
awk 'NR==5' file                          # 只看第 5 行
awk 'NR>=5 && NR<=10' file               # 看第 5 到第 10 行
awk '{sum+=$1} END {print sum}' file      # 第 1 列求和
awk '{print NR, $0}' file                 # 行号 + 内容
awk -F: '$3>=1000 {print $1}' /etc/passwd # 第 3 列 >= 1000 才打印第 1 列
awk '{count[$1]++} END {for(k in count) print k, count[k]}' file  # 统计每项出现次数`,
          language: "bash",
        },
        {
          title: "sort 与 uniq",
          content: `排序和去重是数据分析的基本功，sort 和 uniq 是绝佳搭档：`,
          code: `sort file                     # 按字母排序
sort -r file                  # 反过来排
sort -n file                  # 按数字大小排（不用 -n 的话 10 会排在 2 前面！）
sort -k2 file                 # 按第 2 列来排
sort -t: -k3 -n /etc/passwd   # 冒号分隔，按第 3 列数字排

sort file | uniq              # 去重（先排序再去重，搭配使用）
sort file | uniq -c           # 去重 + 统计出现次数
sort file | uniq -d           # 只看重复出现的行
sort file | sort | uniq -c | sort -rn  # 词频排行榜`,
          language: "bash",
        },
        {
          title: "管道与重定向",
          content: `管道 | 是 Linux 的设计精髓——把前一个命令的输出直接喂给下一个命令的输入，像流水线一样。重定向 > 和 >> 则控制输出去哪儿。这两个概念搞懂了，Linux 功力直接翻倍：`,
          code: `command > file               # 输出写到 file（覆盖原有内容）
command >> file              # 输出追加到 file 末尾
command 2> file              # 只把错误信息写到 file
command &> file              # 不管正常还是错误，全写进去
command < file               # 从 file 读输入

cat file | grep "error" | wc -l    # 数数文件里有多少行带 error
ps aux | grep nginx | grep -v grep # 找 nginx 进程，去掉 grep 自己
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10  # 统计访问最多的 10 个 IP`,
          language: "bash",
          tip: "管道就是把简单命令串成流水线。每个命令只做一件事但做到极致，串起来威力无穷。",
        },
      ],
      quiz: [
        { question: "grep -i 选项的作用是？", options: ["显示行号", "忽略大小写", "递归搜索", "反向匹配"], answer: 1, explanation: "-i 是 ignore case，不管大写小写统统搜出来。" },
        { question: "sed -i.bak 's/a/b/g' file 做了什么？", options: ["只替换不保存", "备份原文件再修改", "创建新文件", "删除原文件"], answer: 1, explanation: "先备份原文件为 file.bak，然后把所有 a 改成 b，新内容存回原文件。" },
        { question: "统计文件中各单词出现次数，最优方案是？", options: ["grep -c", "awk 关联数组", "wc -l", "sort | uniq -c"], answer: 1, explanation: "awk 的关联数组可以边读边统计，一行搞定，效率最高。" },
        { question: "command > file 和 command >> file 的区别是？", options: ["没区别", "> 覆盖, >> 追加", "> 追加, >> 覆盖", "> 只写错误, >> 只写正常"], answer: 1, explanation: "一个 > 是覆盖写入，两个 >> 是追加到文件末尾，别搞混了。" },
        { question: "sed -n '5,10p' file 的作用是？", options: ["删除第 5-10 行", "打印第 5-10 行", "在 5-10 行间插入", "只保留第 5-10 行"], answer: 1, explanation: "-n 抑制默认输出，p 指示打印，合起来就是只看第 5 到第 10 行。" },
      ],
    },
    "process-management": {
      slug: "process-management",
      sections: [
        {
          title: "查看进程",
          content: `进程就是正在运行的程序。你的服务器上同时跑着几百个进程，ps 能帮你看到它们：`,
          code: `ps aux                          # 列出所有进程，详情满满
ps aux | grep nginx             # 精确找 nginx 进程
ps -ef                           # 另一种全格式，UNIX 风格
ps -eo pid,ppid,user,%cpu,%mem,cmd  # 只显示你关心的列
ps -ef --forest                  # 树状图，父子进程关系一目了然`,
          language: "bash",
        },
        {
          title: "实时监控",
          content: `ps 是拍照片，top 是拍视频——实时刷新告诉你谁在吃 CPU、谁在占内存。就像 Windows 的任务管理器，只不过是在命令行里：`,
          code: `top                              # 实时监控，按 q 退出
# top 里的快捷键（不用记，进去就知道）：
# P - 按 CPU 用量排序
# M - 按内存用量排序
# k - 输入 PID 杀进程
# q - 退出

htop                             # top 的彩色升级版，需单独安装
top -bn1 | head -20              # 非交互模式，抓一次快照`,
          language: "bash",
        },
        {
          title: "进程控制",
          content: `进程不听话就得管。kill 不是「杀死」而是「发信号」，信号有好几种，温柔地劝退还是直接毙掉由你定：`,
          code: `kill PID                         # 发 SIGTERM 信号，客气地请进程自己退出
kill -9 PID                      # 发 SIGKILL 信号，直接毙掉，不给收拾的时间
killall nginx                    # 按名字杀，所有叫 nginx 的进程全干掉
pkill -f "python app.py"         # 按完整命令匹配来杀

nohup command &                  # 后台运行 + 防断线，关了终端也在跑
disown %1                        # 把任务从当前 shell 里摘出去
jobs                             # 看看有多少后台任务
fg %1                            # 把后台任务拉回前台
bg %1                            # 把暂停的任务放到后台继续跑`,
          language: "bash",
        },
        {
          title: "systemctl 服务管理",
          content: `systemd 是现代 Linux 的大管家，systemctl 是你指挥它的遥控器。开机启动、启停服务、看日志，全用它：`,
          code: `systemctl start nginx             # 启动 nginx
systemctl stop nginx              # 停掉 nginx
systemctl restart nginx           # 重启（stop + start）
systemctl reload nginx            # 热重载配置文件，服务不中断
systemctl status nginx            # 看服务跑得怎么样
systemctl enable nginx            # 设置开机自启
systemctl disable nginx           # 取消开机自启
systemctl list-units --type=service  # 列出所有服务
journalctl -u nginx -f            # 实时看 nginx 的服务日志`,
          language: "bash",
          tip: "systemctl 统一管理所有服务，不管是 nginx、mysql 还是你自己写的程序，都一个语法。",
        },
      ],
      quiz: [
        { question: "让一个进程直接毙掉该用哪个信号？", options: ["kill PID", "kill -9 PID", "kill -TERM PID", "kill -HUP PID"], answer: 1, explanation: "SIGKILL（-9）是终极手段，进程自己都没机会收尾就被干掉了。" },
        { question: "关了终端还想让进程继续跑，怎么做？", options: ["bg", "nohup command &", "disown", "screen"], answer: 1, explanation: "nohup 告诉进程忽略 HUP 信号，关了终端连接也继续跑。" },
        { question: "想看 nginx 服务的实时日志，用什么？", options: ["systemctl status nginx", "journalctl -u nginx -f", "cat /var/log/nginx.log", "dmesg"], answer: 1, explanation: "journalctl -u 指定服务名，-f 实时跟踪，比手动 tail 日志文件更系统化。" },
        { question: "killall 和 pkill 有什么区别？", options: ["完全一样", "killall 按进程名杀，pkill 按正则匹配", "pkill 只能杀 root 进程", "killall 杀得更彻底"], answer: 1, explanation: "killall 按精确程序名匹配，pkill 支持正则和模糊匹配，更灵活。" },
        { question: "systemctl enable nginx 做了什么？", options: ["立即启动 nginx", "设置 nginx 开机自启", "查看 nginx 状态", "重启 nginx"], answer: 1, explanation: "enable 是注册开机自启项，并不立即启动。要现在跑起来得用 start。" },
        { question: "top 里按什么键按内存用量排序？", options: ["P", "M", "K", "Q"], answer: 1, explanation: "大写 M 按内存降序排列，大写 P 按 CPU 排列，大写 K 是杀进程。" },
      ],
    },
    "network-commands": {
      slug: "network-commands",
      sections: [
        {
          title: "网络配置查看",
          content: `想看看你的服务器有几张网卡、IP 是多少？ip 命令是现代的标配，ifconfig 是老古董了（但老系统上可能还得用）：`,
          code: `ip addr                          # 所有网卡信息一览
ip addr show eth0                # 只看 eth0 这张网卡
ifconfig                         # 老派查看方式，新系统可能默认没装
ip route                         # 路由表——数据包出门往哪走
ip link show                     # 网卡链路状态，网线插没插、速度多少`,
          language: "bash",
        },
        {
          title: "端口与连接",
          content: `端口就像门牌号，一个 IP 地址上有 65535 个门。ss 命令帮你看看哪些门开着、谁在门口排队：`,
          code: `ss -tlnp                         # TCP 监听端口，哪个程序在等连接
ss -ulnp                         # UDP 监听端口
ss -s                            # 当前连接总数统计
netstat -tlnp                    # 老一辈的查看命令，快被 ss 取代了
lsof -i :80                      # 谁在占着 80 端口？精准定位
lsof -i -P -n                    # 所有网络连接，不解析域名直接看 IP`,
          language: "bash",
        },
        {
          title: "网络测试",
          content: `网络出问题了怎么排查？老司机按顺序来：先 ping 看通不通，再 curl 看应用层有没有响应：`,
          code: `ping -c 3 google.com             # 发 3 个包测试通不通
traceroute google.com            # 看看路上经过哪些路由器
mtr google.com                   # ping + traceroute 合体，实时刷新
curl -v https://example.com      # 调试 HTTP 请求，看完整的提手过程
curl -o /dev/null -s -w "%{http_code}" https://example.com  # 只看 HTTP 状态码
wget https://example.com/file    # 下载文件`,
          language: "bash",
        },
        {
          title: "DNS 查询",
          content: `域名解析出问题？dig 是你最好的朋友。nslookup 是初级版，dig 才是专业工具：`,
          code: `nslookup example.com             # 简单查询
dig example.com                  # 完整 DNS 查询，信息超全
dig +short example.com           # 只要 IP 地址，别的别看
dig @8.8.8.8 example.com         # 用 Google 的 DNS 查（怀疑运营商 DNS 有问题时用）
dig example.com A                # 只查 A 记录（IPv4）
dig example.com MX               # 查邮件服务器
dig example.com ANY              # 啥记录都给我
host example.com                 # 最简单的方式`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "看 TCP 监听端口用哪个命令？", options: ["ss -tlnp", "ss -ulnp", "ip addr", "dig"], answer: 0, explanation: "-t 是 TCP，-l 是监听中的，-n 数字显示，-p 显示进程名。" },
        { question: "想知道 80 端口被谁占着，用什么？", options: ["ss -tlnp | grep :80", "lsof -i :80", "netstat -tlnp | grep :80", "以上都行"], answer: 3, explanation: "三个命令都能定位占用端口的进程，用哪一个取决于你系统装了啥。" },
        { question: "dig +short example.com 会输出什么？", options: ["完整的 DNS 解析过程", "只输出 IP 地址", "DNS 服务器信息", "域名注册信息"], answer: 1, explanation: "+short 让 dig 只给出最精简的答案——IP 地址，不啰嗦。" },
        { question: "ping 不通对方但对方在线，最可能的原因是？", options: ["对方关机了", "对方禁了 ICMP", "DNS 坏了", "网线断了"], answer: 1, explanation: "很多服务器防火墙默认禁止 ICMP 回显（ping 用到的协议），ping 不通不代表连不上。" },
      ],
    },
    "permissions": {
      slug: "permissions",
      sections: [
        {
          title: "权限是怎么回事",
          content: `Linux 的权限系统说白了就是「谁能对这个文件干啥」。每个文件都有三组权限：主人（owner）、家里人（group）、路人（others）。每组都有三种操作：读（r，看内容）、写（w，改内容）、执行（x，运行它）。

你 ls -l 看到的那个 rwxr-xr-x 就是这回事——三三一组，从前往后分别对应主人、组、路人。`,
          code: `ls -l script.sh
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
          code: `chmod 755 script.sh       # 主人全权限，组和其他人只读+执行
chmod 644 file.txt        # 主人可读写，其他人只读
chmod 600 secret.key      # 只有主人自己能读写，别人完全看不着
chmod +x script.sh        # 给所有用户加执行权限
chmod u+w file.txt        # 给主人加写权限
chmod go-rwx file.txt     # 组和其他人啥权限都收走
chmod -R 755 dir/         # 递归改整个目录`,
          language: "bash",
          tip: "关键配置文件设 600，脚本设 755，普通文件 644——记住这三个数字基本够用了。",
        },
        {
          title: "chown——换主人",
          content: `chown 是给文件换主人的。有时候你把文件传错了用户目录，或者想给项目统一所有权，就得用它：`,
          code: `chown john file.txt                # 把文件主人改成 john
chown john:dev file.txt            # 主人改成 john，组改成 dev
chown -R john:dev /var/www/        # 整个目录递归改
chown :dev file.txt                # 只改组，主人不动`,
          language: "bash",
        },
        {
          title: "sudo——借权力",
          content: `普通用户想干管理员的事怎么办？sudo 就是「借权限」——临时以 root 身份跑一条命令。不用切到 root，干完自动变回普通用户。

要 sudo 得先在 /etc/sudoers 里被列入了白名单：`,
          code: `sudo apt update                  # 借 root 权限更新软件源
sudo systemctl restart nginx      # 借 root 权限重启服务
sudo -i                           # 临时切到 root 的 shell
sudo -u postgres psql             # 以 postgres 用户的身份跑命令
visudo                            # 安全编辑 /etc/sudoers`,
          language: "bash",
          warning: "sudo 权限很大，别随便 curl 一个脚本就用 sudo 执行。先看清楚脚本内容再跑。",
        },
      ],
      quiz: [
        { question: "chmod 644 对应的权限是？", options: ["rwxr--r--", "rw-r--r--", "rwxrw-r--", "rw-rw-r--"], answer: 1, explanation: "6=rw-, 4=r--, 4=r--，所以是 rw-r--r--。" },
        { question: "想让文件只有自己才能读写，用什么？", options: ["chmod 777", "chmod 644", "chmod 600", "chmod 755"], answer: 2, explanation: "600 意味着主人可读写（6），组和其他人零权限（00）。" },
        { question: "sudo 的本质是什么？", options: ["永久切换成 root", "临时借 root 权限跑一条命令", "创建一个新用户", "修改文件权限"], answer: 1, explanation: "sudo 就是借权限——以 root 身份执行完这条命令后自动还原。" },
        { question: "chown :admin file.txt 这条命令干嘛的？", options: ["改文件主人为 admin", "改文件所属组为 admin", "删文件", "改文件权限"], answer: 1, explanation: "冒号前面为空表示只改组不改主人，:admin 就是把文件的组改成 admin。" },
        { question: "数字权限 755 拆开是？", options: ["rwx--x--x", "rwxr-xr-x", "rw-rw-rw-", "r--r--r--"], answer: 1, explanation: "7=rwx(主人), 5=r-x(组), 5=r-x(其他人)，即主人全权限，别人只能读和跑。" },
      ],
    },
    "disk-management": {
      slug: "disk-management",
      sections: [
        {
          title: "盘还剩多少——df",
          content: `磁盘满了服务就挂了，所以得常看。df 告诉你每个挂载点还剩多少空间。就像手机存储空间不足会弹提示，df 就是服务器的「存储空间」仪表盘：`,
          code: `df -h                    # 人类可读的磁盘用量
df -h /                  # 只看根分区
df -i                    # 看 inode 使用率（小文件太多也会导致写不进去！）
df -hT                   # 加上文件系统类型`,
          language: "bash",
          tip: "df -i 经常被忽略——即使磁盘空间够，inode 用完了也写不进去新文件，常见于邮件服务器和大量小文件场景。",
        },
        {
          title: "什么占空间——du",
          content: `df 告诉你总量用了多少，du 帮你找谁占了最多空间。就像「磁盘扫帚」，专揪大文件和大目录：`,
          code: `du -sh /var/log/         # 这个目录总共多大
du -sh * | sort -rh      # 当前目录下各文件/文件夹排序，大的在前面
du -h --max-depth=1 /    # 根目录下一层各占多少
du -sh * | sort -rh | head -10  # 找出前 10 大目录
ncdu                      # 交互式磁盘分析，需额外安装`,
          language: "bash",
        },
        {
          title: "挂载——mount",
          content: `Windows 插 U 盘自动弹出，Linux 得手动「挂载」——把设备上的文件系统接入到目录树里。说白了就是告诉系统：这个 U 盘的内容，以后在 /mnt/usb 就能看到：`,
          code: `mount /dev/sdb1 /mnt/usb  # 把 U 盘挂到 /mnt/usb
mount                      # 查看所有挂载点
umount /mnt/usb            # 卸载（用之前确保没进程在用）
mount -t ext4 /dev/sdb1 /mnt/data  # 指定文件系统类型
blkid                      # 查看所有块设备的 UUID
lsblk                      # 树状显示所有磁盘和分区`,
          language: "bash",
        },
        {
          title: "分区——fdisk",
          content: `给新硬盘分区就像给地画格子——决定哪块种玉米哪块种土豆。fdisk 是老牌分区工具，简单够用：`,
          code: `sudo fdisk -l             # 列出所有磁盘和分区
sudo fdisk /dev/sdb       # 进入 /dev/sdb 的交互式分区界面
# fdisk 内常用命令：
# m - 帮助
# p - 打印当前分区表
# n - 新建分区
# d - 删除分区
# w - 写入并退出
# q - 不保存退出

sudo mkfs.ext4 /dev/sdb1  # 分区完后还得格式化
sudo partprobe            # 通知内核重新读分区表`,
          language: "bash",
          warning: "fdisk 操作不可逆，输入前再三确认磁盘名。别手滑把系统盘分了，那是灾难现场。",
        },
      ],
      quiz: [
        { question: "df 和 du 的区别是什么？", options: ["没区别", "df 看整体，du 看具体目录", "df 看文件，du 看磁盘", "df 是 du 的别名"], answer: 1, explanation: "df 看每个分区的总体使用情况，du 逐个目录统计帮你找大文件。" },
        { question: "df -i 看的是什么？", options: ["磁盘大小", "inode 使用率", "文件数量", "目录数量"], answer: 1, explanation: "-i 显示 inode 使用情况，inode 用完即使磁盘还有空间也写不进文件。" },
        { question: "du -sh * | sort -rh | head -10 这个命令干嘛的？", options: ["查看磁盘总大小", "找当前目录下前 10 大目录/文件", "排序文件名", "查看隐藏文件"], answer: 1, explanation: "按大小排序取前 10，快速找出谁在吃硬盘空间。" },
        { question: "mount 命令的作用是？", options: ["格式化磁盘", "把设备接入目录树", "分区", "创建文件系统"], answer: 1, explanation: "挂载就是把设备（硬盘、U盘）的内容映射到一个目录，之后访问那个目录就等于访问设备。" },
      ],
    },
    "system-info": {
      slug: "system-info",
      sections: [
        {
          title: "系统版本——uname / lsb_release",
          content: `拿到一台新机器，第一件事就是搞清楚它是什么系统、什么版本。就像接手一辆车先看仪表盘：`,
          code: `uname -a               # 内核版本 + 架构全部信息
uname -r               # 只看内核版本号
cat /etc/os-release    # 发行版信息（标准方式）
lsb_release -a         # 更详尽的发行版信息
hostnamectl            # systemd 系统下的完整信息`,
          language: "bash",
        },
        {
          title: "内存与 CPU——free / lscpu",
          content: `内存够不够、CPU 什么配置，是排查性能问题的第一步：`,
          code: `free -h               # 内存使用情况（人类可读）
free -s 2             # 每 2 秒刷新一次
cat /proc/meminfo     # 超详细内存信息
lscpu                 # CPU 型号、核心数、架构全知道
cat /proc/cpuinfo     # 每个 CPU 核心的详细参数
nproc                 # 就是核心数，一句话的事`,
          language: "bash",
          tip: "注意 free 的 available 列才是真正可用的内存，比 free 列更准，因为 Linux 会拿空闲内存当缓存。",
        },
        {
          title: "硬件概览——lshw / lspci / lsusb",
          content: `想全面了解服务器里装了哪些硬件？这几个命令就是你的「硬件体检报告」：`,
          code: `lshw -short           # 硬件总览，需 root 权限
lshw -C disk           # 只看磁盘控制器和硬盘
lspci                  # 所有 PCI 设备（显卡、网卡、声卡）
lsusb                  # 所有 USB 设备
lsblk                  # 磁盘和分区树状图
dmidecode -t memory    # 内存条详细信息（型号、频率、插槽）
hdparm -I /dev/sda     # 硬盘参数和健康状态`,
          language: "bash",
        },
        {
          title: "运行状态——uptime / vmstat",
          content: `服务器跑了多久、负载高不高？uptime 三秒出结果：`,
          code: `uptime                # 运行了多久 + 最近 1/5/15 分钟平均负载
w                      # 谁在线 + uptime 的信息
vmstat 1               # 每秒刷新，看 CPU、内存、IO 综合情况
iostat -x 1            # 磁盘 IO 详情
sar                    # 系统活动报告，历史数据分析`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "怎么知道 CPU 有多少个核心？", options: ["free -h", "lscpu", "uname -a", "uptime"], answer: 1, explanation: "lscpu 直接告诉你 CPU 型号、核心数、线程数等全部信息。" },
        { question: "free -h 里 available 和 free 的区别？", options: ["没区别", "free 是空闲内存，available 包含缓存可释放的部分", "available 是已用内存", "free 包含缓存"], answer: 1, explanation: "Linux 用空闲内存做缓存，看起来 free 很小但 available 才是真正能用的量。" },
        { question: "uptime 命令能告诉你什么？", options: ["CPU 型号", "运行时长和平均负载", "内存大小", "磁盘空间"], answer: 1, explanation: "uptime 一行显示服务器跑了多久、几个用户在线、最近 1/5/15 分钟的平均负载。" },
        { question: "lscpu 主要看什么？", options: ["内存信息", "CPU 架构和核心数", "磁盘分区", "网络接口"], answer: 1, explanation: "lscpu 专门展示 CPU 的型号、核心数、线程数、缓存大小等硬件参数。" },
      ],
    },
    "compression": {
      slug: "compression",
      sections: [
        {
          title: "tar——打包与压缩一把梭",
          content: `tar 是 Linux 里最常用的归档工具。你可能会问「归档」和「压缩」啥区别？归档就是把一堆文件和文件夹打成一个包（就像快递纸箱），压缩才是把这个包挤小（真空包装）。tar 本身只归档不压缩，但加参数可以边打边压。

说白了，tar 就像搬家公司的纸箱——把所有零散东西装进一个箱子方便运输：`,
          code: `tar -cvf archive.tar dir/         # 打包（c=创建, v=看过程, f=指定文件名）
tar -xvf archive.tar               # 解包
tar -czvf archive.tar.gz dir/      # 打包 + gzip 压缩
tar -xzvf archive.tar.gz           # 解压 gzip 包
tar -cjvf archive.tar.bz2 dir/     # 打包 + bzip2 压缩（压得更小但更慢）
tar -xjvf archive.tar.bz2          # 解压 bzip2 包
tar -tf archive.tar                # 只看包里有什么，不解开
tar -xzvf archive.tar.gz -C /path/ # 解压到指定目录`,
          language: "bash",
          tip: "记住这几个参数组合就够了：czvf（压 gzip）、xzvf（解 gzip）、cjvf（压 bz2）、xjvf（解 bz2）。",
        },
        {
          title: "gzip / bzip2——单文件压缩",
          content: `gzip 和 bzip2 只能压单个文件，所以通常是跟 tar 配合使用。偶尔直接压单个大文件也方便：`,
          code: `gzip file.txt          # 压成 file.txt.gz，原文件消失
gzip -k file.txt       # 保留原文件
gunzip file.txt.gz     # 解压
gzip -9 file.txt       # 最大压缩率（1最快9最小）

bzip2 file.txt         # 压成 file.txt.bz2
bunzip2 file.txt.bz2   # 解压`,
          language: "bash",
        },
        {
          title: "zip / unzip——跨平台通吃",
          content: `zip 格式的最大好处是跨平台——Windows、macOS、Linux 都能用。如果你的压缩包要传给非 Linux 用户，zip 是最稳妥的选择：`,
          code: `zip -r archive.zip dir/          # 压缩目录
zip archive.zip file1 file2      # 压缩多个文件
unzip archive.zip                # 解压
unzip -l archive.zip             # 只看包内容不解压
unzip archive.zip -d /path/      # 解压到指定目录
zip -e archive.zip secret.txt    # 加密压缩，要设密码`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "tar 里表示创建压缩包的两个关键参数是？", options: ["-x 和 -f", "-c 和 -f", "-t 和 -v", "-r 和 -z"], answer: 1, explanation: "c 是 create（创建），f 是 file（指定文件名），tar 最基本的两个参数。" },
        { question: "tar + gzip 压缩和解压的正确参数是？", options: ["-cjvf / -xjvf", "-czvf / -xzvf", "-c 和 -x", "zip / unzip"], answer: 1, explanation: "z 代表 gzip，所以 czvf 是压缩，xzvf 是解压。" },
        { question: "tar -tf archive.tar 干什么用的？", options: ["解压", "压缩", "只看包内容不解开", "删除包内文件"], answer: 2, explanation: "-t 是 list 模式，列出包里的文件但不动手解，先看看包里有什么再决定。" },
        { question: "gzip 和 bzip2 最大区别是什么？", options: ["gzip 更快但文件稍大，bzip2 更小但更慢", "gzip 不能压缩文本", "bzip2 不能解压"], answer: 0, explanation: "gzip 速度快压缩率稍低，bzip2 压得更小但吃 CPU 更多，看场景选。" },
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
          code: `sudo apt update                       # 更新软件源列表
sudo apt upgrade                      # 升级所有已安装的软件
sudo apt install nginx                # 安装 nginx
sudo apt remove nginx                 # 卸载 nginx（保留配置文件）
sudo apt purge nginx                  # 彻底卸载，连配置文件都删
sudo apt autoremove                   # 自动删掉没用的依赖包
apt search nginx                      # 搜软件
apt show nginx                        # 看软件详情
apt list --installed                  # 列出已安装的软件
sudo apt install nginx=1.18.0-0       # 装特定版本`,
          language: "bash",
        },
        {
          title: "yum / dnf（RHEL/CentOS/Fedora）",
          content: `RHEL 系用 yum（老系统）或 dnf（Fedora 和新 RHEL）。dnf 是 yum 的升级版，更快更准。语法跟 apt 很像，换个名字而已：`,
          code: `sudo yum update                      # 更新所有包
sudo yum install nginx               # 安装
sudo yum remove nginx                # 卸载
sudo yum search nginx                # 搜索
sudo yum info nginx                  # 查看详情
sudo yum list installed              # 已安装列表
yum history                          # 安装/更新历史

# dnf 语法几乎一样，把 yum 换成 dnf 就行
sudo dnf install nginx
sudo dnf remove nginx`,
          language: "bash",
          tip: "Fedora 的新版本已经把 yum 替换成 dnf 了，旧系统上 yum 其实是指向 dnf 的软链接。",
        },
        {
          title: "添加第三方源",
          content: `官方源里的软件有时候不够新或没有你要的包，就需要加第三方源（PPA 或 EPEL）：`,
          code: `# Ubuntu 添加 PPA
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install php8.2

# CentOS/RHEL 添加 EPEL（Extra Packages for Enterprise Linux）
sudo yum install epel-release
sudo yum install htop`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "apt 中彻底卸载软件（含配置）的命令？", options: ["apt remove", "apt purge", "apt delete", "apt autoremove"], answer: 1, explanation: "purge 比 remove 更狠，连配置文件一块删。" },
        { question: "RHEL 8+ 推荐的包管理器是？", options: ["yum", "apt", "dnf", "rpm"], answer: 2, explanation: "dnf 是 yum 的下一代，RHEL 8 和 Fedora 已经默认用它。" },
        { question: "apt autoremove 干嘛的？", options: ["删除所有软件", "自动删除没用的依赖包", "卸载系统", "清理缓存"], answer: 1, explanation: "当你卸载软件后，有些依赖包没人用了，autoremove 帮你把它们清理掉。" },
        { question: "Ubuntu 添加第三方 PPA 的第一步是？", options: ["直接 apt install", "add-apt-repository 添加源", "重启系统", "编译源码"], answer: 1, explanation: "PPA 是第三方软件源，得先用 add-apt-repository 加上，然后 apt update，最后才能装。" },
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
crontab -e

# 查看当前用户的定时任务
crontab -l

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
          code: `systemctl status cron       # 确认 cron 服务在运行
systemctl restart cron        # 改了配置有时需要重启

grep CRON /var/log/syslog     # 看 cron 执行记录（Ubuntu）
tail -f /var/log/cron         # 看 cron 执行记录（CentOS）

# 建议：cron 命令里用绝对路径 + 输出重定向到日志
0 2 * * * /usr/bin/python3 /home/user/backup.py >> /var/log/backup.log 2>&1`,
          language: "bash",
          tip: "cron 里的环境变量跟你的终端不一样，PATH 很短。写脚本时用绝对路径最保险，比如 /usr/bin/python3 而不是 python3。",
        },
      ],
      quiz: [
        { question: "cron 任务 '0 4 * * *' 什么时候执行？", options: ["每 4 分钟", "每天 4:00", "每 4 小时", "每周 4 天"], answer: 1, explanation: "0 分钟，4 点，* 每天，* 每月，* 每周——即每天凌晨 4 点整。" },
        { question: "cron 里 */10 * * * * 什么意思？", options: ["每 10 秒", "每 10 分钟", "每 10 小时", "每月 10 号"], answer: 1, explanation: "*/10 在分钟位表示每 10 分钟执行一次。" },
        { question: "cron 里写命令，为什么建议用绝对路径？", options: ["绝对路径更短", "cron 的 PATH 环境变量很短，不用绝对路径可能找不到程序", "没有原因", "绝对路径执行更快"], answer: 1, explanation: "cron 运行时的环境和你终端不一样，PATH 里没几个目录，用 /usr/bin/python3 这种绝对路径最保险。" },
        { question: "@reboot /script.sh 做什么用？", options: ["立刻执行脚本", "每次开机自动执行", "每周执行一次", "每分钟执行一次"], answer: 1, explanation: "@reboot 是 cron 的特殊写法，系统每次启动时自动跑这个任务。" },
      ],
    },
    "ssh-advanced": {
      slug: "ssh-advanced",
      sections: [
        {
          title: "SSH 密钥——告别密码",
          content: `每次 ssh 都输密码？又慢又不安全。用密钥对登录，既快又防暴力破解。说白了就是一对「锁和钥匙」——公钥（锁）放服务器上，私钥（钥匙）你自己拿着：`,
          code: `ssh-keygen -t ed25519 -C "your@email.com"   # 生成密钥对（推荐 ed25519）
ssh-keygen -t rsa -b 4096 -C "your@email.com"  # 或者 RSA 4096 位

ssh-copy-id user@server.com    # 把公钥复制到服务器（一把梭）
# 手动方式：
cat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

ssh -i ~/.ssh/my_key user@server.com  # 指定私钥登录`,
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
ssh -L 3306:localhost:3306 user@server

# 远程转发：把你本地的 8080 端口暴露给远程服务器的 9090 端口的用户
ssh -R 9090:localhost:8080 user@server

# 动态转发（SOCKS 代理）：浏览器设代理为 localhost:1080，走服务器上网
ssh -D 1080 user@server`,
          language: "bash",
        },
        {
          title: "跳板机——中间人转发",
          content: `生产环境的服务器往往不给直接连，你需要先连一台「跳板机」，再从跳板机跳到目标服务器。SSH 有几种办法解决这个问题：`,
          code: `# 方法一：ProxyJump 一步到位（推荐，OpenSSH 7.3+）
ssh -J bastion-user@bastion.com target-user@target.com

# 方法二：SSH Config 配置 ProxyJump
Host target
HostName 10.0.1.100
User admin
ProxyJump bastion

Host bastion
HostName bastion.example.com
User jumpuser

# 方法三：ProxyCommand（老版本，兼容性好）
ssh -o ProxyCommand="ssh -W %h:%p bastion.com" target.com`,
          language: "bash",
          tip: "ProxyJump 是跳板机的标准做法，配置一次以后直接 ssh target 就行，中间过程全透明。",
        },
      ],
      quiz: [
        { question: "SSH 密钥对中，哪个可以公开？", options: ["私钥", "公钥", "两个都不能", "两个都能"], answer: 1, explanation: "公钥可以到处分发（放服务器上），私钥必须自己保管好不能泄露。" },
        { question: "本地转发 ssh -L 3306:localhost:3306 server 做了什么？", options: ["服务器上传文件", "把服务器 MySQL 端口映射到本地", "把本地端口映射到服务器", "加密传输文件"], answer: 1, explanation: "-L 本地转发，把远程只能本地访问的服务通过 SSH 隧道搬到你的电脑上访问。" },
        { question: "ProxyJump 解决的是什么问题？", options: ["加速 SSH 连接", "通过跳板机连目标服务器", "自动备份", "多用户登录"], answer: 1, explanation: "生产环境的目标服务器不给直连，得先 SSH 到跳板机再从跳板机跳到目标。ProxyJump 让这一步到位。" },
        { question: "ssh-keygen -t ed25519 中的 ed25519 是啥？", options: ["一种加密算法", "SSH 端口号", "用户名", "服务器地址"], answer: 0, explanation: "ed25519 是一种现代非对称加密算法，比传统的 RSA 更快更短更安全，推荐使用。" },
      ],
    },
    "log-analysis": {
      slug: "log-analysis",
      sections: [
        {
          title: "日志在哪——syslog 与 journald",
          content: `Linux 的日志有两个体系：传统的 syslog（存在 /var/log/ 目录下）和现代的 journald（systemd 自带，存二进制格式）。看日志就像看监控录像，系统干了什么坏事好事都有记录：`,
          code: `# 传统 syslog 日志
tail -f /var/log/syslog         # 系统主日志（Ubuntu/Debian）
tail -f /var/log/messages       # 系统主日志（CentOS/RHEL）
tail -f /var/log/auth.log       # 认证日志（谁登录了、谁输错密码）
tail -f /var/log/kern.log       # 内核日志

# journald（systemd 系统）
journalctl                       # 所有日志
journalctl -f                    # 实时跟踪（等同于 tail -f）
journalctl -u nginx              # 只看 nginx 的日志
journalctl -u nginx --since "1 hour ago"  # 最近一小时的
journalctl -u ssh --since today           # 今天的
journalctl -p err                # 只看错误级别以上
journalctl --disk-usage          # 日志占了多少空间`,
          language: "bash",
        },
        {
          title: "日志分析技巧",
          content: `日志不是拿来看的，是拿来分析的。真正排查问题时，你要在海量日志里捞有用信息。grep、awk、sed 在这大显身手：`,
          code: `# 看某个时间段的日志
grep "2026-06-28 10:" /var/log/syslog

# 找登录失败记录
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn

# 统计每个 IP 尝试登录次数（找暴力破解）
grep "Failed password" /var/log/auth.log | grep -oP 'from \S+' | sort | uniq -c | sort -rn | head -10

# 找出访问最多的 10 个接口
awk '{print $7}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10

# 看看哪个时段请求最多
awk '{print $4}' /var/log/nginx/access.log | cut -d: -f2,3 | sort | uniq -c | sort -rn`,
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
logrotate -d /etc/logrotate.d/nginx     # 调试模式（不实际执行）
logrotate -f /etc/logrotate.conf        # 强制执行一次`,
          language: "bash",
          tip: "postrotate 里的 reload 很重要——程序一般不自己关闭日志文件，需要通知它重新开。",
        },
      ],
      quiz: [
        { question: "journalctl -u nginx 做了什么？", options: ["删除 nginx 日志", "只看 nginx 服务的日志", "重启 nginx 日志服务", "加密 nginx 日志"], answer: 1, explanation: "-u 指定服务单元，只显示该服务的日志条目。" },
        { question: "logrotate 的 rotate 30 表示？", options: ["30 天轮转一次", "保留最近 30 个归档", "最大 30MB", "30 分钟执行一次"], answer: 1, explanation: "rotate 指定保留几个归档文件，超过的自动删除。" },
        { question: "journalctl --since '1 hour ago' 的作用是？", options: ["删除一小时前的日志", "只看最近一小时的日志", "停止日志服务一小时", "备份一小时前的日志"], answer: 1, explanation: "--since 配合时间过滤，只看特定时间段的日志，排查问题专用。" },
        { question: "logrotate 配置里的 postrotate 段干嘛用的？", options: ["轮转前备份", "轮转后通知程序重新打开日志文件", "删除日志", "压缩日志"], answer: 1, explanation: "nignx 等程序不会自动感知日志文件被轮转了，需要用 postrotate 发信号让它重新打开新日志文件。" },
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
chmod +x script.sh
./script.sh`,
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
        { question: "Shell 脚本里 $1 是什么意思？", options: ["第一个函数", "脚本本身的名字", "第一个参数", "进程 ID"], answer: 2, explanation: "$1 是传给脚本的第一个参数，$2 第二个，$0 是脚本名，$# 是参数个数。" },
        { question: "trap cleanup EXIT 这句做了啥？", options: ["捕获信号但不处理", "脚本退出时自动执行 cleanup 函数", "忽略退出信号", "立即退出脚本"], answer: 1, explanation: "trap 设置陷阱，无论脚本正常结束还是出错退出，都会执行 cleanup 做收尾清理。" },
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
          code: `sudo ufw enable              # 打开防火墙
sudo ufw disable             # 关闭防火墙
sudo ufw status              # 看看当前规则

sudo ufw allow 22            # 允许 SSH
sudo ufw allow 80/tcp        # 允许 HTTP
sudo ufw allow 443/tcp       # 允许 HTTPS
sudo ufw allow from 10.0.0.0/24  # 允许整个子网访问

sudo ufw deny 3306           # 禁止 MySQL 端口
sudo ufw delete allow 80     # 删除某条规则

sudo ufw default deny incoming   # 默认拒绝所有入站
sudo ufw default allow outgoing  # 默认允许所有出站`,
          language: "bash",
          tip: "开启 ufw 前一定先 allow 22（SSH），别把自己锁门外了，尤其是操作远程服务器的时候。",
        },
        {
          title: "firewalld——企业级方案",
          content: `RHEL/CentOS 系用 firewalld，它比 ufw 强大很多，引进了「区域（zone）」的概念——不同网络区域用不同策略。公司内网可以宽松点，公共 WiFi 就得严。`,
          code: `sudo systemctl start firewalld
sudo firewall-cmd --state              # 防火墙在跑吗？

sudo firewall-cmd --list-all           # 查看当前区域完整规则
sudo firewall-cmd --get-active-zones   # 查看活动区域

sudo firewall-cmd --add-port=80/tcp --permanent   # 永久开放 80 端口
sudo firewall-cmd --add-service=http --permanent   # 开放 http 服务
sudo firewall-cmd --remove-port=3306/tcp --permanent  # 关掉 3306
sudo firewall-cmd --reload             # 重载规则使之生效

sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="10.0.0.0/24" port port="22" protocol="tcp" accept'  # 复杂规则`,
          language: "bash",
          tip: "firewalld 改规则要加 --permanent 才会永久保存，否则重启就没了。加完记得 firewall-cmd --reload。",
        },
        {
          title: "iptables——底层的终极武器",
          content: `iptables 是直接操作内核的防火墙，所有那些高级工具底层调的其实都是它。学会 iptables 你不怕任何防火墙问题，但确实不好记：`,
          code: `sudo iptables -L -n -v           # 查看当前规则
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT   # 允许 SSH
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT   # 允许 HTTP
sudo iptables -A INPUT -j DROP                         # 默认拒绝所有

sudo iptables -D INPUT 3           # 删除 INPUT 链第 3 条规则
sudo iptables-save > /etc/iptables/rules.v4  # 保存规则
sudo iptables-restore < /etc/iptables/rules.v4  # 恢复`,
          language: "bash",
          warning: "iptables 规则是立即生效的。iptables -F 会清空所有规则——如果默认策略是 DROP，清空后你就可能失去连接。",
        },
      ],
      quiz: [
        { question: "ufw 开启前最重要的事？", options: ["备份文件", "允许 SSH 端口", "安装 nginx", "更新系统"], answer: 1, explanation: "别忘了先 allow 22 或你实际的 SSH 端口，不然开启后自己都连不上了。" },
        { question: "firewalld 的 --permanent 参数什么作用？", options: ["永久删除规则", "规则重启后依然有效", "规则临时生效", "自动备份"], answer: 1, explanation: "不加 --permanent 的规则只在当前运行时有效，重启就丢了。" },
        { question: "ufw default deny incoming 这条命令做了什么？", options: ["允许所有入站流量", "默认拒绝所有入站连接", "关闭防火墙", "仅拒绝 SSH"], answer: 1, explanation: "这是设置默认策略——没匹配到允许规则的入站流量全部拒绝，白名单模式。" },
        { question: "iptables -A INPUT -j DROP 中的 -j DROP 是啥？", options: ["记录日志", "丢弃数据包不回应", "拒绝并回复", "转发数据包"], answer: 1, explanation: "DROP 直接扔掉包不告诉对方，REJECT 是拒绝并回复一个错误，DROP 更隐蔽。" },
      ],
    },
    "performance-tuning": {
      slug: "performance-tuning",
      sections: [
        {
          title: "看清瓶颈——别瞎调",
          content: `性能调优最忌讳「我觉得慢就加内存」。先定位瓶颈在哪儿——是 CPU 满了、内存不够、磁盘太慢、还是网络带宽吃紧？拿数据说话：`,
          code: `top                    # 先看谁在吃 CPU 和内存
iostat -x 1            # 磁盘 IO 是不是瓶颈
vmstat 1               # 综合视图
sar -u 1               # CPU 使用详情
dstat                  # 全功能监控，一个顶五个（需安装）
nload                  # 实时网络流量`,
          language: "bash",
          tip: "多数时候性能问题不是硬件不够，而是代码写得烂或配置不当。先查应用再找硬件。",
        },
        {
          title: "CPU 与内存优化",
          content: `CPU 满了？找到吃 CPU 的进程，看是正常业务高峰还是死循环。内存不够用？看看是不是某个进程在内存泄漏：`,
          code: `# 找吃 CPU 最多的进程
ps aux --sort=-%cpu | head -5

# 找吃内存最多的进程
ps aux --sort=-%mem | head -5

# 清理缓存（内存紧张时）
sync && echo 3 > /proc/sys/vm/drop_caches

# 查看 swap 使用情况
free -h
swapon --show
cat /proc/sys/vm/swappiness   # 默认 60，值越大越爱用 swap`,
          language: "bash",
        },
        {
          title: "磁盘与 IO 优化",
          content: `磁盘慢分两种：吞吐量瓶颈（大文件读写慢）和 IOPS 瓶颈（大量小文件读写慢）。iostat 帮你分清楚：`,
          code: `# 看磁盘繁忙程度
iostat -x 1
# %util 接近 100% → 磁盘真满了
# await 太高 → 磁盘响应慢
# r/s w/s 很高但 await 不高 → IOPS 瓶颈

# 找最吃 IO 的进程
iotop                     # 需安装，实时显示各进程的 IO 用量

# 检查文件系统
tune2fs -l /dev/sda1 | grep -i "block size"
cat /sys/block/sda/queue/scheduler  # IO 调度器`,
          language: "bash",
        },
        {
          title: "网络与连接优化",
          content: `并发量大时，默认的网络参数可能不够用。你可能会遇到「too many open files」这种经典的坑：`,
          code: `# 查看当前连接数
ss -s
cat /proc/sys/net/core/somaxconn    # 最大监听队列长度

# 查看/修改文件描述符限制
ulimit -n                  # 当前限制
ulimit -n 65535            # 临时调大
cat /etc/security/limits.conf  # 永久修改

# 监控网络流量
nethogs eth0              # 按进程看流量（需安装）
iftop                     # 按连接看流量（需安装）

# 内核参数查看
sysctl -a | grep tcp      # 所有 TCP 相关内核参数`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "iostat 的 %util 接近 100% 说明什么？", options: ["CPU 满了", "内存满了", "磁盘满了", "网络满了"], answer: 2, explanation: "%util 是磁盘繁忙程度，接近 100% 说明磁盘一直在干活，来不及处理请求了。" },
        { question: "ulimit -n 控制的是什么？", options: ["最大线程数", "最大文件描述符数", "最大进程数", "最大内存"], answer: 1, explanation: "-n 控制一个进程最多能打开多少个文件描述符（包括网络连接），高并发服务经常需要调大。" },
        { question: "性能调优第一步应该做什么？", options: ["加内存", "定位瓶颈用数据说话", "重启服务器", "升级 CPU"], answer: 1, explanation: "别瞎调！先用 top、iostat、vmstat 这些工具看清楚到底是哪慢——CPU、内存、磁盘还是网络。" },
        { question: "swap 空间是啥？", options: ["CPU 缓存", "拿硬盘当内存用的应急方案", "内存条型号", "磁盘分区格式"], answer: 1, explanation: "swap 是虚拟内存，当物理内存不够用时系统把不常用的内存写到硬盘上腾空间，但速度比真内存慢得多。" },
      ],
    },
    "backup-restore": {
      slug: "backup-restore",
      sections: [
        {
          title: "rsync——同步神器",
          content: `rsync 是 Linux 里最牛的同步工具。跟 cp 不一样，它只传改变的部分，第二次同步贼快。还能跨服务器同步、断点续传。就像搬家公司先看屋里哪些东西没搬过的，只搬没搬的：`,
          code: `rsync -av /source/ /dest/              # 本地同步
rsync -av /source/ user@server:/dest/   # 同步到远程
rsync -av --delete /source/ /dest/      # 目标目录多出来的文件也删掉
rsync -av --exclude="*.log" /src/ /dest/  # 排除 .log 文件
rsync -avz /source/ user@server:/dest/  # -z 压缩传输，省带宽
rsync -avP /large/file user@server:/dest/  # -P 断点续传 + 进度条

# 常用组合：-avzP，几乎万能
rsync -avzP --delete /var/www/ backup@nas:/backups/www/`,
          language: "bash",
          warning: "--delete 会让目标目录跟源目录完全一样。源目录没有的文件目标目录也会被删，小心别搞反了方向。",
        },
        {
          title: "tar 备份——打个包存起来",
          content: `简单粗暴的全量备份就用 tar。把整个目录打成一个压缩包，往备份目录或外接硬盘一丢：`,
          code: `# 全量备份
tar -czpf /backup/www-$(date +%Y%m%d).tar.gz /var/www

# 增量备份思路（配合 find）
find /var/www -mtime -1 -type f | tar -czf /backup/www-inc-$(date +%Y%m%d).tar.gz -T -

# 恢复
tar -xzf /backup/www-20260628.tar.gz -C /tmp/restore/`,
          language: "bash",
        },
        {
          title: "数据库备份——mysqldump / pg_dump",
          content: `光备份文件不够，数据库里存着你最值钱的数据。MySQL/PostgreSQL 各有自己的备份工具：`,
          code: `# MySQL/MariaDB 备份
mysqldump -u root -p --all-databases > all-db-$(date +%Y%m%d).sql
mysqldump -u root -p mydb > mydb-backup.sql           # 单个数据库
mysqldump -u root -p mydb users > users-backup.sql    # 单张表
mysqldump -u root -p --no-data mydb > mydb-schema.sql # 只要表结构

# MySQL 恢复
mysql -u root -p mydb < mydb-backup.sql

# PostgreSQL 备份
pg_dump -U postgres -Fc mydb > mydb.dump              # 压缩格式
pg_dump -U postgres mydb > mydb.sql                   # 纯 SQL

# PostgreSQL 恢复
pg_restore -U postgres -d mydb mydb.dump
psql -U postgres -d mydb < mydb.sql`,
          language: "bash",
          tip: "建议在备份脚本里加上日期后缀，保留多份——万一上一份有问题还有更早的能恢复。",
        },
      ],
      quiz: [
        { question: "rsync 的 --delete 是什么作用？", options: ["删除源文件", "删除目标中多余的文件", "删除备份", "删除空目录"], answer: 1, explanation: "--delete 让目标目录完全镜像源目录，目标多出来的文件会被删除。" },
        { question: "mysqldump --no-data 导出什么？", options: ["没有数据的空文件", "只要表结构不要数据", "只要数据不要结构", "压缩文件"], answer: 1, explanation: "--no-data 只导出 CREATE TABLE 语句，适合需要复制表结构但不复制数据的场景。" },
        { question: "rsync -avzP 里的 -z 是什么作用？", options: ["增量同步", "压缩传输", "断点续传", "删除多余文件"], answer: 1, explanation: "-z 在传输过程中压缩数据，省带宽，慢速网络传输大文件时特别好用。" },
        { question: "哪条命令能定制自动备份脚本？", options: ["tar -czpf /backup/www-$(date +%Y%m%d).tar.gz /var/www", "zip -r backup.zip /var/www", "cp -r /var/www /backup/", "dd if=/var/www of=/backup"], answer: 0, explanation: "tar 配合 date 命令自动生成带日期后缀的压缩包，塞进 crontab 就能每天自动备份。" },
      ],
    },
    "users-advanced": {
      slug: "users-advanced",
      sections: [
        {
          title: "用户管理进阶——useradd / usermod",
          content: `基础的用户管理你可能知道 useradd 和 passwd，但其实还有更多玩法。创建用户不光设个密码，还得指定家目录、shell、所属组：`,
          code: `useradd -m -s /bin/bash -G sudo,docker john    # 建用户 + 家目录 + bash + 附加组
userdel -r john                         # 删用户 + 删除他的家目录
usermod -aG docker john                 # 把 john 加入 docker 组
usermod -s /bin/zsh john                # 改 john 的默认 shell
usermod -L john                         # 锁定用户（禁止登录）
usermod -U john                         # 解锁

passwd -l john                          # 锁定密码
passwd -S john                          # 查看用户密码状态
chage -l john                           # 看密码过期策略
chage -M 90 john                        # 密码 90 天过期`,
          language: "bash",
        },
        {
          title: "组管理",
          content: `用户组就是「权限的批量管理」。把一群用户放进一个组，然后给这个组设权限，组里的人自动继承。比一个个改方便多了：`,
          code: `groupadd dev                    # 新建 dev 组
groupmod -n developers dev      # 改名为 developers
groupdel dev                    # 删组

usermod -aG dev john            # 把 john 加入 dev 组
gpasswd -d john dev             # 把 john 移出 dev 组
groups john                     # 看 john 在哪些组里
getent group dev                # 看 dev 组里有谁`,
          language: "bash",
        },
        {
          title: "ACL——细粒度权限",
          content: `传统的 rwx 权限太粗了——只有主人、组、其他人三级。但现实需求可能是「这个文件让 alice 能写、bob 只读、其他人看不着」。这时候 ACL（Access Control List）就派上用场了：`,
          code: `# 先确认文件系统支持 ACL
mount | grep acl

getfacl file.txt                    # 查看 ACL 权限
setfacl -m u:alice:rw file.txt      # 给 alice 单独设读写
setfacl -m u:bob:r file.txt         # 给 bob 只读
setfacl -m g:dev:rwx dir/           # 给 dev 组成员全权限
setfacl -x u:alice file.txt         # 删掉 alice 的 ACL
setfacl -b file.txt                 # 清空所有 ACL（回到普通权限）
setfacl -R -m u:alice:rw dir/       # 递归设置`,
          language: "bash",
          tip: "有 ACL 的文件在 ls -l 里权限末尾会显示一个 + 号，看到它就知道这个文件有多余的权限规则。",
        },
        {
          title: "PAM——认证的乐高积木",
          content: `PAM（Pluggable Authentication Modules）是 Linux 认证系统的核心。你可以理解成「认证流水线」——login、ssh、sudo 这些程序不自己管密码校验，统统交给 PAM 处理。

PAM 让你可以组合各种认证方式：密码、指纹、手机令牌都可以串起来，像乐高一样拼装。配置在 /etc/pam.d/ 目录下：`,
          code: `# /etc/pam.d/ 下的配置文件
ls /etc/pam.d/
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
        { question: "useradd -m -s /bin/bash -G docker john 里，-G 是干嘛的？", options: ["设家目录", "附加到辅助组", "设置 shell", "设置密码"], answer: 1, explanation: "-G 指定用户加入的辅助组，-g 才是指定主组，注意大小写区别。" },
        { question: "setfacl -m u:alice:rw file.txt 哪个部分表示读+写权限？", options: ["u:alice", "rw", "file.txt", "setfacl -m"], answer: 1, explanation: "rw 就是 read + write，给 alice 对 file.txt 有读和写的权限。" },
        { question: "PAM 配置文件在哪？", options: ["/etc/passwd", "/etc/pam.d/", "/etc/security/", "/var/log/pam/"], answer: 1, explanation: "PAM 的所有服务配置文件都在 /etc/pam.d/ 目录下，每个服务一个文件。" },
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
        { question: "VARCHAR(50) 里的 50 是什么意思？", options: ["50 个字节", "最多 50 个字符", "50 行记录", "第 50 列"], answer: 1, explanation: "VARCHAR 后面的数字表示最多能存多少个字符，不是字节。" },
        { question: "AUTO_INCREMENT 做什么的？", options: ["自动备份", "自动递增生成唯一 ID", "自动排序", "自动删除"], answer: 1, explanation: "自增列专门用来做主键，每次插入新行自动 +1，保证每条记录都有唯一编号。" },
        { question: "ALTER TABLE 属于哪类 SQL？", options: ["DQL", "DML", "DDL", "DCL"], answer: 2, explanation: "ALTER 是修改表结构的，属于 DDL（数据定义语言），跟 CREATE、DROP 是一家子。" },
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
        { question: "SELECT DISTINCT department FROM employees 这条 SQL 做了什么？", options: ["查询所有员工", "去重列出所有不同的部门名", "统计部门数量", "删除重复部门"], answer: 1, explanation: "DISTINCT 关键词把查询结果里重复的行去掉，只留不重样的。" },
        { question: "MySQL 里 ORDER BY id LIMIT 10 OFFSET 20 怎么理解？", options: ["取前 10 条", "跳过 20 条取 10 条", "取第 20 条", "取最后 10 条"], answer: 1, explanation: "OFFSET 20 跳过前 20 条，LIMIT 10 只拿 10 条，就是翻页的第 3 页（每页 10 条）。" },
        { question: "LIKE 'j_hn' 里的 _ 是什么意思？", options: ["0 或多个字符", "正好一个字符", "下划线本身", "换行符"], answer: 1, explanation: "_ 是占位符，匹配恰好一个字符。j_hn 可以匹配 john，但不匹配 jon。" },
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
        { question: "INNER JOIN 和 CROSS JOIN 有什么区别？", options: ["一样", "INNER JOIN 带 ON 条件匹配，CROSS JOIN 笛卡尔积全匹配", "INNER JOIN 更快", "CROSS JOIN 不支持多表"], answer: 1, explanation: "CROSS JOIN 不加条件，表 A 每行跟表 B 每行全组合一遍，通常不是你要的。" },
        { question: "两个表连接，ON a.id = b.id 里的 ON 关键词是干嘛的？", options: ["设置别名", "指定连接条件", "打开数据库", "排序规则"], answer: 1, explanation: "ON 后面跟的是两张表怎么匹配的规则——哪两个字段相等就配对。" },
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
        { question: "COUNT(*) 和 COUNT(column) 有什么区别？", options: ["完全一样", "COUNT(*) 数所有行，COUNT(column) 只数非 NULL 的行", "COUNT(column) 更快", "COUNT(*) 数指定列"], answer: 1, explanation: "COUNT(*) 管你 NULL 不 NULL 全算上，COUNT(column) 遇到 NULL 就跳过不计数。" },
        { question: "AVG(salary) 是干什么的？", options: ["求和", "求平均工资", "求最大值", "统计行数"], answer: 1, explanation: "AVG 就是平均值，把一列的所有值加在一起除以个数。" },
        { question: "GROUP BY 后面跟上多个列是什么意思？", options: ["报错", "按多列组合分组", "只按最后一列分组", "随机分组"], answer: 1, explanation: "多列分组就是按列的排列组合来分，比如按部门+职位分组，同一个部门同一个职位的算一组。" },
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
        { question: "docker run -p 8080:80 nginx 里的 8080:80 是什么意思？", options: ["容器名和端口", "宿主机端口映射到容器端口", "镜像版本", "内存限制"], answer: 1, explanation: "把宿主机的 8080 端口映射到容器内的 80 端口，访问 localhost:8080 就等于访问容器的 80。" },
        { question: "docker exec -it my-nginx bash 这条命令干嘛的？", options: ["启动容器", "停止容器", "进入正在运行的容器里敲命令", "删除容器"], answer: 2, explanation: "exec 是在运行中的容器里执行命令，-it 交互模式 + bash 就是进容器里操作。" },
        { question: "docker system prune -a 会清理什么？", options: ["只删除容器", "删除镜像", "删除停止的容器、未使用的镜像、网络等", "重启 Docker"], answer: 2, explanation: "prune 是大扫除——把不再用的容器、镜像、网络、构建缓存全清干净。" },
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
        { question: "多阶段构建主要解决什么问题？", options: ["加快构建速度", "减小最终镜像体积", "多平台支持", "并行构建"], answer: 1, explanation: "构建阶段用大镜像装各种工具，运行阶段只复制编译好的结果到小镜像，最终镜像不包含构建工具。" },
        { question: "Dockerfile 里 CMD 和 RUN 有什么区别？", options: ["没区别", "RUN 在构建时执行，CMD 在容器启动时执行", "CMD 在构建时执行", "RUN 只能写一次"], answer: 1, explanation: "RUN 是在 docker build 的时候跑的，CMD 是 docker run 启动容器时跑的。" },
        { question: "FROM node:20-alpine 里的 alpine 表示什么？", options: ["Node 版本", "基于 Alpine Linux 的超小基础镜像", "作者名字", "构建工具"], answer: 1, explanation: "Alpine 是个极小巧的 Linux 发行版，做 Docker 基础镜像体积能小到 5MB，容器用它能大幅瘦身。" },
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
        { question: "docker-compose down 做了什么？", options: ["只停止容器", "停止并删除容器、网络等资源", "重启服务", "查看日志"], answer: 1, explanation: "down 会停止所有服务并清理容器、网络，比 stop 更彻底。" },
        { question: "docker-compose.yml 里 depends_on 是什么意思？", options: ["环境变量", "指定启动顺序，等依赖的服务先启动", "网络配置", "端口映射"], answer: 1, explanation: "depends_on 告诉 Docker 这个服务依赖另外几个服务，启动时按依赖关系来。" },
        { question: "docker-compose.yml 里 volumes 段的用途？", options: ["网络配置", "数据持久化，把目录/卷挂载到容器", "环境变量", "端口映射"], answer: 1, explanation: "volumes 把宿主机目录或命名卷挂进容器，容器删了数据还在——这就是数据持久化的秘诀。" },
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
        { question: "git commit 后面 -m 是干嘛的？", options: ["修改上次提交", "直接跟提交信息", "合并分支", "创建标签"], answer: 1, explanation: "-m 后面直接跟提交消息，省得进编辑器写。如果不加 -m，Git 会打开默认编辑器让你写。" },
        { question: "暂存区（staging area）的作用是什么？", options: ["备份代码", "让开发者挑选哪些改动放进一次提交", "存储远程代码", "缓存编译结果"], answer: 1, explanation: "暂存区让你可以精心挑选哪些文件/改动放进本次 commit，而不是一股脑全提交。" },
        { question: "git log --oneline 的输出效果？", options: ["显示完整日志", "每条 commit 显示成一行", "只显示第一行提交信息", "显示图形化日志"], answer: 1, explanation: "--oneline 让每条提交只占一行，紧凑显示 hash 和标题，适合快速浏览历史。" },
        { question: "git status 能告诉你什么？", options: ["远程仓库地址", "当前哪些文件改了、哪些在暂存区", "所有提交历史", "代码差异"], answer: 1, explanation: "status 告诉你工作区和暂存区的状态——哪些文件改了、哪些 add 了、哪些还没跟踪。" },
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
        { question: "git checkout -b feature-x 做了什么？", options: ["删除分支", "创建并切换到新分支", "合并分支", "查看分支"], answer: 1, explanation: "-b 是创建新分支，checkout 是切换，合起来就是新建分支同时切过去。" },
        { question: "什么时候不该用 rebase？", options: ["本地分支", "已经推送到远程共享的分支", "小分支", "主分支"], answer: 1, explanation: "rebase 会改写提交历史，如果分支已经推给别人用了，改写历史会搞乱别人的仓库。" },
        { question: "git branch -D 和 -d 的区别？", options: ["没区别", "-D 强制删除，-d 安全删除（没合并不删）", "-d 更快", "-D 只删远程分支"], answer: 1, explanation: "-d 是安全检查——分支没合并到上游就不让删，-D 不管三七二十一直接干。" },
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
        { question: "systemctl reload nginx 和 restart 的区别？", options: ["没区别", "reload 不中断服务热加载配置，restart 会短暂中断", "restart 更快", "reload 只重启 worker 进程"], answer: 1, explanation: "reload 是平滑重载——nginx 读完新配置后通知旧的 worker 优雅退出，新的 worker 接班，用户无感知。" },
        { question: "Nginx 的 worker_processes auto 是什么意思？", options: ["手动设置进程数", "自动按 CPU 核心数设置工作进程", "禁用 worker", "随机分配进程"], answer: 1, explanation: "auto 让 Nginx 自己探测 CPU 核心数并设置 worker 数量，一般一个核一个 worker 最优。" },
        { question: "listen 80 里的 80 是什么？", options: ["进程编号", "HTTP 标准端口", "worker 数量", "超时秒数"], answer: 1, explanation: "80 是 HTTP 协议的标准端口，浏览器不写端口默认就是访问 80。" },
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
        { question: "proxy_pass 指令干什么的？", options: ["认证用户", "把请求转发给后端服务器", "设置缓存", "压缩响应"], answer: 1, explanation: "proxy_pass 是反向代理的核心——告诉 Nginx 把匹配到的请求转发到哪个后端地址。" },
        { question: "proxy_set_header X-Real-IP $remote_addr 有什么用？", options: ["设置缓存头", "把真实客户端 IP 传给后端", "伪装 IP", "隐藏 IP"], answer: 1, explanation: "Nginx 代理后，后端看到的是 Nginx 的 IP。这个头把用户的真实 IP 透传过去，方便后端记录和分析。" },
        { question: "upstream 块里的 weight=3 是什么意思？", options: ["服务器编号", "权重，权重越大概率越大", "最大连接数", "超时时间"], answer: 1, explanation: "weight 是加权轮询的权重，3:2:1 意味着给那台服务器分配的请求是另外两台的三倍和两倍。" },
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
        { question: "Python 里 type() 函数干嘛的？", options: ["打印变量", "返回变量的类型", "转换类型", "删除变量"], answer: 1, explanation: "type(x) 告诉你 x 是什么类型——int、str、list 还是别的什么。" },
        { question: "Python 中用什么表示单行注释？", options: ["//", "#", "--", "/*"], answer: 1, explanation: "# 是 Python 的注释符号，从 # 到行尾的内容都不会被执行。" },
        { question: "range(5) 生成什么？", options: ["1到5", "0到4", "5个随机数", "0到5"], answer: 1, explanation: "range(5) 生成 0, 1, 2, 3, 4——从 0 开始，到 5 之前结束，不包含 5。" },
        { question: "list.append(4) 做了什么？", options: ["覆盖列表", "在列表末尾加一个元素", "在列表开头加元素", "删除元素"], answer: 1, explanation: "append 把新元素追加到列表尾部，是列表最常用的操作之一。" },
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
        { question: "a, b = b, a 这个操作做了啥？", options: ["交换 a 和 b 的值", "把 b 赋给 a", "创建元组", "报错"], answer: 0, explanation: "这是元组解包的经典用法，一行代码交换两个变量的值，不用引入临时变量。" },
        { question: "dict.get('key', 'default') 里第二个参数啥作用？", options: ["键名", "如果键不存在时返回的默认值", "值的类型", "最大长度"], answer: 1, explanation: "get 的第二个参数是默认值，键找不到时不报错而是返回这个默认值，比直接 dict[key] 更安全。" },
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
        { question: "def greet(name='World') 里 'World' 是什么？", options: ["固定值", "默认参数值", "类型提示", "返回值"], answer: 1, explanation: "这是默认参数——调用 greet() 不传参数时 name 取默认值 'World'，传了就用传的值。" },
        { question: "return a // b, a % b 返回了几个值？", options: ["0个", "1个", "2个（以元组形式）", "不确定"], answer: 2, explanation: "Python 用逗号分隔多个返回值时，实际上返回的是一个元组，可以用解包同时接收。" },
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
        { question: "Python 里 __init__ 方法是干嘛的？", options: ["析构函数", "构造函数，创建对象时自动调用", "静态方法", "私有方法"], answer: 1, explanation: "__init__ 是初始化方法，每次创建类的新实例时自动执行，用来设置对象的初始状态。" },
        { question: "super().__init__() 调用了谁？", options: ["当前类的 __init__", "父类的 __init__", "子类的 __init__", "什么都没调用"], answer: 1, explanation: "super() 指代父类，super().__init__() 就是调用父类的构造方法，子类继承时常用。" },
        { question: "class Dog(Animal) 中的 (Animal) 表示什么？", options: ["函数参数", "继承——Dog 是 Animal 的子类", "接口实现", "类型注解"], answer: 1, explanation: "括号里的类名就是父类，Dog 继承 Animal 的所有属性和方法。" },
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
        { question: "open('file.txt', 'w') 里的 'w' 啥意思？", options: ["读文件", "写模式——会覆盖已有内容", "追加", "删除文件"], answer: 1, explanation: "'w' 是 write 模式，打开文件准备写入。如果文件已存在会先清空，不存在则创建。" },
        { question: "with open() as f 比直接 open() 好在哪？", options: ["更短", "自动关闭文件，不用手动 f.close()", "性能更好", "只读模式"], answer: 1, explanation: "with 上下文管理器保证代码块执行完后文件自动关闭，即使中间抛异常也不会忘关。" },
        { question: "readline() 和 readlines() 的区别？", options: ["没区别", "readline 读一行，readlines 读所有行返回列表", "readlines 更快", "readline 返回列表"], answer: 1, explanation: "readline() 一次读一行返回字符串，readlines() 一口气读完所有行返回一个列表。" },
        { question: "os.path.join('a', 'b') 的输出是？", options: ["a/b", "根据系统自动选 a/b 或 a\\b", "a.b", "错误"], answer: 1, explanation: "os.path.join 会自动用当前系统的路径分隔符拼接——Linux 用 /，Windows 用 \\。" },
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
        { question: "except Exception as e 里的 e 是什么？", options: ["错误函数", "捕获到的异常对象", "错误代码", "文件对象"], answer: 1, explanation: "as e 把捕获的异常实例赋给变量 e，可以通过它获取错误信息。" },
        { question: "try 块里代码抛异常后会发生什么？", options: ["程序继续", "跳到对应 except 块处理", "程序静默退出", "自动重试"], answer: 1, explanation: "一旦 try 里的代码抛了异常，剩余代码跳过，直接跳到匹配的 except 块。" },
        { question: "finally 块什么时候执行？", options: ["只有没异常时", "只有有异常时", "无论是否有异常都会执行", "从不执行"], answer: 2, explanation: "finally 是不管有没有异常、有没有被捕获，都会在最后执行，适合做清理工作。" },
        { question: "raise ValueError('错误') 做了什么？", options: ["捕获错误", "手动抛出一个异常", "修复错误", "忽略错误"], answer: 1, explanation: "raise 是主动抛异常，你不一定等系统出错，可以自己按条件抛——比如数据不对就抛。" },
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
        { question: "re.search(r'\\d+', 'abc123') 匹配到了什么？", options: ["abc", "123", "整个字符串", "空"], answer: 1, explanation: "\\d+ 匹配连续数字，search 在字符串中找到 '123' 并返回匹配对象。" },
        { question: "re.sub(r'\\s+', ' ', text) 干了什么？", options: ["删除所有空格", "把连续空白替换成一个空格", "拆分字符串", "匹配空白"], answer: 1, explanation: "sub 是替换，把正则匹配到的内容替换成指定字符串——这里就是把多个空格/换行压缩成一个空格。" },
        { question: "r'\\d{3}-\\d{4}-\\d{4}' 能匹配什么？", options: ["任意数字", "手机号格式如 138-0000-0000", "邮编", "身份证"], answer: 1, explanation: "\\d{3} 三位数字，加横线，再加两组四位数字，典型手机号格式。" },
        { question: "re.compile() 有什么用？", options: ["执行正则", "预编译正则表达式，复用效率高", "删除正则", "验证正则语法"], answer: 1, explanation: "同一个正则在循环里反复用，先 compile 编译一次，之后用编译好的对象匹配，省了每次重新编译的开销。" },
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
        { question: "Python 的 GIL 是什么？", options: ["图形界面库", "全局解释器锁，同一时刻仅一个线程执行 Python 字节码", "垃圾回收器", "JIT 编译器"], answer: 1, explanation: "GIL(Global Interpreter Lock) 是 CPython 的机制，同一时刻只允许一个线程执行 Python 代码。" },
        { question: "多线程在 Python 中适合什么场景？", options: ["CPU 密集型计算", "IO 密集型（网络请求、文件读写）", "所有场景", "GUI 界面"], answer: 1, explanation: "GIL 让 CPU 密集型多线程没啥用，但 IO 等待时线程可以切换，网络请求、文件读写这类 IO 密集型用多线程有收益。" },
        { question: "asyncio 的核心是什么？", options: ["多线程", "多进程", "事件循环 + 协程", "GIL"], answer: 2, explanation: "asyncio 基于事件循环和协程，单线程内通过 async/await 实现并发，特别适合大量网络 IO 的场景。" },
        { question: "ThreadPoolExecutor 是干嘛的？", options: ["创建进程池", "线程池——控制并发线程数复用线程", "调试工具", "网络库"], answer: 1, explanation: "线程池预先创建一堆线程，有任务就分配，用完回收不销毁，避免频繁创建销毁线程的开销。" },
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
        { question: "requests.get() 返回什么？", options: ["字符串", "JSON", "Response 对象，包含状态码、内容等", "文件"], answer: 2, explanation: "返回 Response 对象，你可以 .status_code 看状态，.json() 解析 JSON，.text 拿文本。" },
        { question: "requests.post(url, json=data) 中 json 参数的作用？", options: ["设置请求 URL", "自动序列化字典为 JSON 并设 Content-Type", "接收 JSON 响应", "设置超时"], answer: 1, explanation: "json= 参数自动把 Python 字典转成 JSON 字符串写入请求体，并设好 Content-Type 头，省心。" },
        { question: "urllib 和 requests 的区别？", options: ["urllib 更简单", "requests 更高层、API 更好用", "功能完全一样", "requests 是标准库"], answer: 1, explanation: "requests 是第三方库，API 设计更人性化，不用像 urllib 那样手动编码参数、处理编码。" },
        { question: "response.status_code == 200 表示什么？", options: ["服务器错误", "请求成功", "页面未找到", "重定向"], answer: 1, explanation: "HTTP 200 OK 表示请求成功，服务器正常处理并返回了数据。" },
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
        { question: "os.system('ls') 做了什么？", options: ["列出 Python 文件", "在 shell 里执行 ls 命令", "读取文件", "打印系统信息"], answer: 1, explanation: "os.system 把字符串当 shell 命令执行，就像你在终端敲 ls 回车。" },
        { question: "subprocess.run() 比 os.system() 好在哪里？", options: ["更快", "能捕获输出、设置超时、检查返回码", "更短", "不需要参数"], answer: 1, explanation: "subprocess.run 是 os.system 的增强版——可以拿输出、设超时、控制环境变量，功能全面。" },
        { question: "Pathlib 的 Path.home() / 'downloads' 做了什么？", options: ["创建文件", "拼接出用户下载目录的路径", "下载文件", "打开目录"], answer: 1, explanation: "Path 对象支持 / 操作符拼接路径，Path.home() 返回用户家目录，非常直观。" },
        { question: "schedule 库是用来干什么的？", options: ["HTTP 请求", "定时任务——类似 cron 的 Python 版", "发送邮件", "解析 HTML"], answer: 1, explanation: "schedule 是 Python 的轻量定时任务库，可以在代码里「每天早上9点跑这个函数」。" },
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
        { question: "Pandas 的 DataFrame 是什么？", options: ["数组", "二维表格数据结构，类似 Excel 表格", "数学公式", "数据库"], answer: 1, explanation: "DataFrame 是 Pandas 的核心——有行有列的表格，可以筛选、分组、计算、画图。" },
        { question: "NumPy 数组比 Python 原生 list 强在哪里？", options: ["更灵活", "支持向量化运算，速度快很多", "能存字符串", "更节省内存"], answer: 1, explanation: "NumPy 底层 C 实现，支持批量数值运算（向量化），比 Python 循环快几十上百倍。" },
        { question: "df.head(10) 返回什么？", options: ["最后 10 行", "前 10 行数据", "10 个随机行", "统计信息"], answer: 1, explanation: "head(n) 返回 DataFrame 的前 n 行，默认 5 行，快速浏览数据结构。" },
        { question: "matplotlib 的 plt.plot(x, y) 做什么？", options: ["计算", "画折线图", "保存文件", "打印数据"], answer: 1, explanation: "plot 是 matplotlib 最基本的画图函数——给 x 和 y 坐标就画出折线图。" },
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
        { question: "BeautifulSoup 是用来干嘛的？", options: ["发送 HTTP 请求", "解析 HTML 和 XML 文档", "处理 JSON", "画图"], answer: 1, explanation: "BeautifulSoup 把 HTML 解析成 DOM 树，让你像操作对象一样查找标签、提取文本和属性。" },
        { question: "soup.find_all('a', class_='title') 找的是什么？", options: ["所有 class=title 的 a 标签", "所有 div", "第一个 a 标签", "标题文本"], answer: 0, explanation: "find_all 查找所有匹配的标签，这里是找所有带 class='title' 的链接。" },
        { question: "爬虫里 User-Agent 头有什么用？", options: ["加密请求", "伪装成浏览器，防止被反爬", "加速请求", "设置 COOKIE"], answer: 1, explanation: "很多网站看 User-Agent 判断是不是爬虫，不加或者用默认的 requests UA 很容易被封。" },
        { question: "time.sleep(2) 在爬虫里常用来干嘛？", options: ["报错", "降低请求频率，礼貌爬取", "加速", "调试"], answer: 1, explanation: "加延时是为了控制请求速度，别一秒几百个请求把别人服务器打趴下，同时也是防封的基本操作。" },
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
        { question: "unittest 和 pytest 的关系？", options: ["pytest 是 unittest 的子集", "pytest 是更好用的第三方测试框架，兼容 unittest", "完全无关", "unittest 更新"], answer: 1, explanation: "pytest 是 de facto 的 Python 测试框架，可以用更少的代码写更多的测试，同时还支持跑 unittest 写的用例。" },
        { question: "pytest 测试函数命名规则是？", options: ["任意名字", "以 test_ 开头", "以 _test 结尾", "包含 test"], answer: 1, explanation: "pytest 自动发现以 test_ 开头的函数，或者 TestXXX 类里的方法。" },
        { question: "assert 1 + 1 == 2 这句在测试中干嘛的？", options: ["打印结果", "断言——如果条件不成立测试就失败", "跳过测试", "计算表达式"], answer: 1, explanation: "assert 是 Python 内置的关键字，后面条件表达为 True 测试继续，False 就抛出 AssertionError 标记失败。" },
        { question: "pip install pytest && pytest tests/ 做了什么？", options: ["安装 pytest 并跑 tests 目录下所有测试", "卸载 pytest", "创建测试文件", "只检查语法"], answer: 0, explanation: "安装 pytest 后，在项目根目录运行 pytest，它会自动发现并执行所有 test_*.py。" },
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
        { question: "pip install requests 从哪下载包？", options: ["GitHub", "PyPI (Python Package Index)", "npm", "本地文件"], answer: 1, explanation: "PyPI 是 Python 的官方第三方包仓库，pip 默认从这里下载安装包。" },
        { question: "requirements.txt 是干嘛的？", options: ["代码文件", "列出项目依赖的所有包及其版本", "配置文件", "日志文件"], answer: 1, explanation: "requirements.txt 记录了项目用了哪些包、什么版本，别人用 pip install -r requirements.txt 就能复现你的环境。" },
        { question: "pip install . 和 pip install -e . 的区别？", options: ["没区别", "-e 是可编辑模式安装——改了代码不用重新装", ". 更稳定", "-e 是强制安装"], answer: 1, explanation: "-e (editable) 以开发者模式安装，改了源码直接生效，不用每次重装，开发自己的包时用。" },
        { question: "虚拟环境 (venv) 解决了什么问题？", options: ["性能问题", "项目间包版本冲突", "Python 版本问题", "网络问题"], answer: 1, explanation: "每个项目一个独立虚拟环境，项目 A 用 Django 3，项目 B 用 Django 4，互不干扰。" },
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
        { question: "echo $HOME 打印了什么？", options: ["字符串 $HOME", "当前用户的家目录路径", "空", "报错"], answer: 1, explanation: "$HOME 是环境变量，存着当前用户的家目录路径，echo 把它打出来。" },
        { question: "chmod +x script.sh 做了什么？", options: ["删除脚本", "给脚本加上执行权限", "编译脚本", "压缩脚本"], answer: 1, explanation: "+x 给文件加可执行权限，不加的话 ./script.sh 会报 Permission denied。" },
        { question: "#!/bin/bash 叫啥？", options: ["注释", "shebang——告诉系统用哪个解释器", "变量声明", "函数定义"], answer: 1, explanation: "shebang 是脚本第一行的 #! 开头标记，告诉操作系统用哪个程序来执行这个脚本。" },
        { question: "变量赋值 name=\"John\"，等号两边能加空格吗？", options: ["可以", "绝对不能，加了空格就变成比较了", "右边可以左边不行", "随便"], answer: 1, explanation: "bash 里变量赋值等号两边绝对不能有空格，name = \\\"John\\\" 会被当成运行 name 命令。" },
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
        { question: "[ $count -gt 10 ] 里 -gt 是什么意思？", options: ["等于", "大于", "小于", "不等于"], answer: 1, explanation: "-gt 是 greater than 的缩写，数值比较用 -gt/-lt/-eq/-ge/-le。" },
        { question: "[ -f /etc/nginx.conf ] 检查什么？", options: ["目录存在", "文件存在且是普通文件", "文件可执行", "文件为空"], answer: 1, explanation: "-f 专门检查路径存在且是个普通文件（不是目录/链接/设备）。" },
        { question: "bash 里 if 判断结束后要以什么结尾？", options: ["end", "fi", "endif", "}"], answer: 1, explanation: "bash 的 if 要 fi 结尾（if 倒过来），elif 表示 else if，奇葩但记住了。" },
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
        { question: "for user in alice bob charlie; do ... done 循环了几次？", options: ["1", "3", "无限", "0"], answer: 1, explanation: "in 后面列表有三个名字，循环体会运行三次，每次 $user 取一个不同的名字。" },
        { question: "while 循环什么时候停止？", options: ["永远不", "当条件为假时", "手动停止", "运行一次后"], answer: 1, explanation: "while 后面跟条件表达式，条件为真继续跑，为假就跳出循环。" },
        { question: "count=$((count + 1)) 这种语法叫啥？", options: ["变量赋值", "算术扩展", "字符串拼接", "函数调用"], answer: 1, explanation: "$((...)) 是 bash 的算术扩展，括号里可以写数学表达式，计算结果赋给变量。" },
        { question: "break 在循环里起什么作用？", options: ["继续下一次循环", "立即跳出整个循环", "什么都不做", "结束脚本"], answer: 1, explanation: "break 是立即跳出循环——不跑完剩下的迭代，后面的循环体也不执行了。" },
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
        { question: "bash 里怎么定义函数？", options: ["def func():", "func() { ... }", "function func():", "fn func()"], answer: 1, explanation: "bash 的函数定义就是 名字() { 代码块 }，或者 function 名字 { 代码块 }。" },
        { question: "函数里 local var='hello' 的 local 是什么？", options: ["全局变量", "局部变量——只在函数内可见", "系统变量", "别名"], answer: 1, explanation: "不用 local 的话函数内变量默认是全局的，加了 local 就只在函数内部可见，外面访问不了。" },
        { question: "backup_dir /src /dest 传了两个参数，函数里怎么接收？", options: ["$1 和 $2", "$0 和 $1", "args[0]", "$@ 和 $*"], answer: 0, explanation: "第一个参数 $1，第二个 $2，以此类推。$0 是脚本名，$# 是参数个数。" },
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
        { question: "read -p \\\"Enter name: \\\" name 里的 -p 干嘛？", options: ["设置密码", "先打印提示信息再等待输入", "读取文件", "管道"], answer: 1, explanation: "-p 后面跟提示文本，先输出提示再等待用户输入，比 echo + read 少一行。" },
        { question: "command > output.txt 2>&1 中 2>&1 的作用？", options: ["重定向标准输入", "把标准错误重定向到标准输出", "创建第二个文件", "什么都不做"], answer: 1, explanation: "2 是 stderr，1 是 stdout，2>&1 把错误信息也合并到标准输出，都写进同一个文件。" },
        { question: "/dev/null 是什么？", options: ["普通文件", "黑洞——写进去的数据直接消失", "设备文件", "日志文件"], answer: 1, explanation: "/dev/null 是个特殊文件，写进去的任何内容都会被丢弃，通常用来扔掉不需要的输出。" },
        { question: "exec 3< file.txt 在做什么？", options: ["执行文件", "打开文件描述符 3 指向 file.txt", "删除文件", "重命名文件"], answer: 1, explanation: "exec 可以自定义文件描述符——给 file.txt 分配编号 3，之后可以从 3 读取文件内容。" },
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
        { question: "grep -E 'err|warn|crit' 里的 | 是什么意思？", options: ["管道", "或——匹配 err 或 warn 或 crit", "转义字符", "行首"], answer: 1, explanation: "管道符在正则里是「或」的意思，一次搜多个关键词。" },
        { question: "[[ \\\"hello123\\\" =~ [0-9]+ ]] 做了什么？", options: ["报错", "用正则检查字符串是否包含数字", "读取文件", "比较数字"], answer: 1, explanation: "=~ 是 bash 的正则匹配操作符，检查左边的字符串是否匹配右边的正则。" },
        { question: "sed -E 's/([0-9]+)/[\\1]/g' 中 \\1 是什么意思？", options: ["字面量 1", "反向引用——引用第一个捕获组内容", "转义", "行尾"], answer: 1, explanation: "\\1 引用第一个括号捕获的内容，s/([0-9]+)/[\\1]/g 就是把数字用方括号包起来。" },
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
        { question: "bash -x script.sh 做了什么？", options: ["执行脚本", "调试模式——打印每条执行的命令", "编译脚本", "检查语法"], answer: 1, explanation: "-x 开启 xtrace 模式，运行脚本时每条命令被展开后打印出来，调试利器。" },
        { question: "Ctrl+R 在 bash 里是干嘛的？", options: ["撤销", "反向搜索历史命令", "清屏", "退出"], answer: 1, explanation: "Ctrl+R 进入反向搜索模式，输入关键词就能找到你之前敲过的相关命令。" },
        { question: "alias ll='ls -la' 把什么做了？", options: ["运行 ls", "给 ls -la 起了个简称叫 ll", "删除 ls", "创建软链接"], answer: 1, explanation: "alias 是别名，之后在终端敲 ll 就等于敲 ls -la，减少打字量。" },
        { question: "source ~/.bashrc 做了什么？", options: ["重启 bash", "在当前 shell 里执行配置文件，使改动立即生效", "创建新文件", "退出 shell"], answer: 1, explanation: "改了 .bashrc 后不用重新登录，source 一下就能在当前会话生效。" },
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
        { question: "logger \\\"Backup completed\\\" 做了什么？", options: ["打印到终端", "向系统日志（syslog）写入一条消息", "记录到文件", "发送邮件"], answer: 1, explanation: "logger 命令直接往系统日志里写消息，你在脚本里用它能记录关键操作到系统日志。" },
        { question: "exec > >(tee -a /var/log/script.log) 2>&1 的作用？", options: ["加密日志", "把脚本输出同时显示在屏幕和写到日志文件", "只写文件", "关闭日志"], answer: 1, explanation: "tee 把输出分流——一份到屏幕，一份追加到文件，配合 exec 重定向整个脚本的输出。" },
        { question: "logrotate 对自写脚本的日志有什么用？", options: ["没作用", "自动轮转压缩老旧日志防止撑爆磁盘", "加密日志", "发送日志邮件"], answer: 1, explanation: "自己在 /etc/logrotate.d/ 下加个配置，指定日志路径，logrotate 就能自动帮你管理了。" },
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
        { question: "一个典型的自动备份脚本应该包含什么？", options: ["只 tar 一下", "tar 打包 + 日期命名 + 保留最近 N 份 + 错误处理", "只要 cp", "只写日志"], answer: 1, explanation: "好备份脚本应该自动带日期、删旧备份、出错时报警或记录，不能悄悄挂掉。" },
        { question: "脚本里 mysqldump | gzip > backup.sql.gz 用了什么？", options: ["文件操作", "管道——mysqldump 的输出直接喂给 gzip 压缩", "多线程", "网络传输"], answer: 1, explanation: "| 把 mysqldump 的 SQL 输出用管道直接送给 gzip 压缩，中间不写磁盘，省空间又快。" },
        { question: "用 curl 监控网站可用性的脚本，最关键检查什么？", options: ["响应时间", "HTTP 状态码是否为 200", "页面标题", "服务器类型"], answer: 1, explanation: "返回 200 表示服务正常，如果返回 5xx 或连接超时说明出问题了得发报警。" },
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
        { question: "好的 bash 脚本第一行应该是什么？", options: ["#!/bin/bash", "set -euo pipefail", "echo Start", "exit 0"], answer: 1, explanation: "set -euo pipefail 三件套是脚本的安全带，遇到错误就停、未定义变量报错、管道中任何命令失败都算失败。" },
        { question: "脚本里变量为什么习惯用双引号括起来？", options: ["好看", "防止变量含空格或为空时出 bug", "提升性能", "约定俗成没理由"], answer: 1, explanation: "不加引号的话变量值为空或含空格时会被拆成多段或报错，用 \"$var\" 最安全。" },
        { question: "用 ShellCheck 这个工具能干什么？", options: ["运行脚本", "静态分析脚本找出常见错误和隐患", "编译脚本", "加密脚本"], answer: 1, explanation: "ShellCheck 像 bash 的 linter，自动指出未引用的变量、错误的语法、安全风险等。" },
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
        { question: "var, let, const 中哪个声明常量？", options: ["var", "let", "const", "全都行"], answer: 2, explanation: "const 声明常量——赋值后不能重新赋值，但对象内部属性可以修改。" },
        { question: "=== 和 == 有什么区别？", options: ["没区别", "=== 严格比较（值和类型都等），== 会类型转换", "== 更快", "=== 只比类型"], answer: 1, explanation: "=== 要求值和类型都相同，== 会尝试类型转换后再比较，比如 0 == '' 是 true 但 0 === '' 是 false。" },
        { question: "箭头函数 () => { } 和普通函数最大区别之一？", options: ["语法", "箭头函数不绑自己的 this", "箭头函数不能调用", "箭头函数更快"], answer: 1, explanation: "箭头函数没有自己的 this——它的 this 来自外层作用域，跟 function 声明的函数行为完全不同。" },
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
        { question: "document.querySelector('.btn') 返回什么？", options: ["所有匹配元素", "第一个匹配 CSS 选择器的元素", "空数组", "一个集合"], answer: 1, explanation: "querySelector 用 CSS 选择器语法找元素，只返回第一个匹配的，找所有用 querySelectorAll。" },
        { question: "addEventListener('click', handler) 做了什么？", options: ["删除事件", "注册 click 事件监听器", "模拟点击", "禁用按钮"], answer: 1, explanation: "给元素绑定一个事件处理函数，用户点击时自动调用 handler。" },
        { question: "e.preventDefault() 在表单提交事件中干嘛？", options: ["自动提交", "阻止默认行为（如页面刷新）", "加速提交", "验证表单"], answer: 1, explanation: "表单默认提交会刷新页面。preventDefault 阻止这个行为，让你用 AJAX 提交后再自己处理。" },
        { question: "element.classList.toggle('active') 干了啥？", options: ["添加类", "删除类", "如果类存在则删除，不存在则添加", "替换类"], answer: 2, explanation: "toggle 是个开关——有 active 类就去掉，没有就加上，做开关效果很方便。" },
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
        { question: "Promise 解决的问题是什么？", options: ["性能优化", "避免回调地狱，优雅处理异步操作", "类型检查", "DOM 操作"], answer: 1, explanation: "在 Promise 之前，异步操作用嵌套回调，层层嵌套代码像金字塔。Promise 用 .then() 链式调用扁平化。" },
        { question: "async 函数返回什么？", options: ["普通值", "总是返回一个 Promise", "undefined", "原始值"], answer: 1, explanation: "async 函数无论你 return 什么，最终都会被包装成 Promise 返回。" },
        { question: "await 关键词只能在哪种函数里用？", options: ["普通函数", "async 函数", "箭头函数", "构造函数"], answer: 1, explanation: "await 只能出现在 async 函数体内，在普通函数里用会语法错误。" },
        { question: "Promise.all([p1, p2]) 是干嘛的？", options: ["只等最快的", "等所有 Promise 都完成", "任意一个完成就返回", "串行执行"], answer: 1, explanation: "all 等待传入的所有 Promise 都 resolve，任意一个 reject 就整体 reject，并发请求常用。" },
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
        { question: "解构赋值 const { name, age } = user 做了什么？", options: ["创建新对象", "从对象里提取 name 和 age 属性到同名变量", "深拷贝", "类型转换"], answer: 1, explanation: "解构直接把你需要的属性从对象里「拆」出来赋给变量，不用一行一行写 user.name。" },
        { question: "模板字面量 `Hello, ${name}` 比 'Hello, ' + name 好在哪？", options: ["更快", "多行字符串 + 嵌入表达式，更直观", "兼容性好", "类型安全"], answer: 1, explanation: "反引号字符串支持直接嵌变量 ${name}、多行内容、嵌套表达式，比加号拼接优雅得多。" },
        { question: "展开运算符 [...arr1, ...arr2] 做了什么？", options: ["创建数组引用", "把两个数组的元素展开合并成新数组", "合并对象", "删除元素"], answer: 1, explanation: "... 把数组/对象的内容展开，常用于合并数组、浅拷贝、函数传参。" },
        { question: "import { fn } from './module.js' 与 require 的区别？", options: ["没区别", "import 是 ES6 模块静态导入，require 是 CommonJS 动态加载", "require 更新", "import 只能浏览器"], answer: 1, explanation: "ES6 import 在编译时确定依赖关系，支持 tree shaking；require 是运行时加载，更灵活但不利于优化。" },
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
        { question: "try...catch 捕获的是哪种错误？", options: ["编译错误", "运行时抛出的异常", "语法错误", "逻辑错误"], answer: 1, explanation: "try...catch 只能捕获代码执行过程中抛出的运行时异常，语法错误在代码执行前就报错了。" },
        { question: "finally 块在什么情况下执行？", options: ["仅成功时", "仅异常时", "无论成功还是异常都执行", "从不"], answer: 2, explanation: "finally 是保底执行——try 里 return 了、throw 了，finally 都会在退出前跑。" },
        { question: "throw new Error('Invalid input') 做了什么？", options: ["捕获错误", "手动创建一个异常并抛出", "修复错误", "记录日志"], answer: 1, explanation: "throw 主动抛异常，这样调用方可以用 try...catch 捕获并处理。" },
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
        { question: "package.json 文件是干嘛的？", options: ["JS 源码", "项目配置文件——记录依赖、脚本、版本等元信息", "日志文件", "编译产物"], answer: 1, explanation: "package.json 是 Node 项目的身份证——记录了项目名、版本、依赖包、npm 脚本等所有配置。" },
        { question: "npm install 和 npm install --save-dev 的区别？", options: ["没区别", "--save-dev 装的包是开发依赖（如测试工具），生产环境不需要", "dev 更快", "dev 不写入 package.json"], answer: 1, explanation: "开发依赖如 jest、eslint 只在开发时用，生产环境装包时 --production 会跳过它们。" },
        { question: "CommonJS 和 ES Module 导入方式哪个更新？", options: ["CommonJS", "ES Module——import/export 是 ES6 标准", "一样新", "都不好"], answer: 1, explanation: "ES Module 是 JavaScript 官方标准，import/export 语法，现代项目和浏览器都推荐用它。" },
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
        { question: "app.get('/api/users', (req, res) => ...) 做了什么？", options: ["设置路由", "定义 GET /api/users 的处理函数", "添加中间件", "启动服务器"], answer: 1, explanation: "app.get 注册一个 GET 请求的路由处理函数，当客户端 GET /api/users 时执行回调。" },
        { question: "req.params.id 里面的数据从哪来？", options: ["请求体", "URL 路径参数，如 /users/:id", "查询字符串", "请求头"], answer: 1, explanation: "路由定义 /users/:id，访问 /users/42 时，req.params.id 就是 '42'。" },
        { question: "res.json({ name: 'Alice' }) 做了什么？", options: ["返回文本", "设置 Content-Type 为 JSON 并返回序列化后的数据", "返回重定向", "返回文件"], answer: 1, explanation: "res.json 自动设好 Content-Type: application/json，并把对象序列化为 JSON 字符串发送。" },
        { question: "app.use(express.json()) 有什么作用？", options: ["响应 JSON", "解析请求体中的 JSON 数据到 req.body", "发送静态文件", "处理错误"], answer: 1, explanation: "express.json() 是内置中间件，解析 POST/PUT 请求体中的 JSON 数据，没有它 req.body 会是 undefined。" },
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
        { question: "RESTful API 中 POST /users 通常做什么？", options: ["查询用户", "创建新用户", "更新用户", "删除用户"], answer: 1, explanation: "POST 一般用于创建资源，POST /users 就是新建一个用户。" },
        { question: "HTTP DELETE /users/5 做什么？", options: ["更新 id=5 的用户", "删除 id=5 的用户", "查询 id=5 的用户", "创建用户"], answer: 1, explanation: "DELETE 方法用来删资源，/users/5 指定了要删的用户 ID。" },
        { question: "返回 201 Created 和 200 OK 的区别？", options: ["一样", "201 表示资源已创建，200 表示请求成功", "201 用于错误", "200 只用于更新"], answer: 1, explanation: "201 Created 通常在 POST 创建新资源成功后返回，附带新资源的位置；200 是通用成功。" },
        { question: "分页 API 常用哪两个查询参数？", options: ["sort 和 order", "page 和 limit / offset 和 limit", "id 和 name", "start 和 end"], answer: 1, explanation: "分页常用 page + limit（第几页每页几条）或 offset + limit（跳过几条取几条）。" },
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
        { question: "JWT 是哪三个单词缩写？", options: ["Java Web Token", "JSON Web Token", "JavaScript Worker Thread", "Just Wait Time"], answer: 1, explanation: "JSON Web Token——一段签名过的 JSON 数据，用来在客户端和服务端间安全传递身份信息。" },
        { question: "bcrypt.hash(password, 10) 中 10 是什么意思？", options: ["密码长度", "salt rounds——迭代加密的轮数", "哈希长度", "过期时间"], answer: 1, explanation: "数字越大加密越耗时（也更难破解），10 是常见默认值，每次翻倍时间也差不多翻倍。" },
        { question: "express-session 中间件主要干嘛？", options: ["日志记录", "管理用户会话（session）", "压缩响应", "验证 JWT"], answer: 1, explanation: "session 中间件让服务端能记住用户状态——登录后把用户信息存 session，后续请求带 cookie 找回。" },
        { question: "CORS 问题是啥？", options: ["数据库问题", "浏览器同源策略限制了跨域请求", "服务器配置问题", "加密问题"], answer: 1, explanation: "浏览器出于安全禁止跨域 AJAX，后端需要设置 CORS 头告诉浏览器「这个域名允许跨域访问」。" },
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
        { question: "WebSocket 和 HTTP 最大的不同？", options: ["WebSocket 更快", "WebSocket 是全双工——服务端能主动推送消息", "WebSocket 更安全", "WebSocket 只能用于聊天"], answer: 1, explanation: "HTTP 是请求-响应模式，服务端不能主动发消息。WebSocket 建立后两端随时能互发消息。" },
        { question: "Socket.io 中 io.emit() 和 socket.emit() 的区别？", options: ["一样", "io.emit 发给所有客户端，socket.emit 只发给当前连接", "io.emit 更快", "socket.emit 是旧 API"], answer: 1, explanation: "io.emit 是广播——所有已连接用户都收到；socket.emit 只发给触发事件的那个连接。" },
        { question: "ws:// 和 wss:// 的区别类似什么？", options: ["tcp 和 udp", "http 和 https——wss 是加密的 WebSocket", "GET 和 POST", "ipv4 和 ipv6"], answer: 1, explanation: "wss 是 WebSocket Secure——在 TLS/SSL 之上建立 WebSocket 连接，数据加密传输。" },
        { question: "socket.on('disconnect', ...) 什么时候触发？", options: ["连接建立时", "客户端断开连接时", "发送消息时", "服务器重启时"], answer: 1, explanation: "disconnect 事件在用户关闭页面、断网等导致连接断开时触发，通常用来清理在线用户列表。" },
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
        { question: "fs.readFileSync('file.txt') 和 fs.readFile() 的区别？", options: ["没区别", "Sync 是同步的会阻塞，不带 Sync 是异步的", "Sync 更快", "readFile 已废弃"], answer: 1, explanation: "同步方法会等文件读完才执行下一行，适合脚本启动阶段；异步的用回调/Promise 不阻塞事件循环。" },
        { question: "fs.existsSync(path) 检查什么？", options: ["文件内容", "文件或目录是否存在", "文件权限", "文件大小"], answer: 1, explanation: "返回 true 或 false，直接告诉你路径是否存在。" },
        { question: "用 stream 读写大文件比直接 readFile 好在哪？", options: ["代码更短", "流式处理不把整个文件加载到内存", "stream 更快", "两者一样"], answer: 1, explanation: "readFile 把整个文件读进内存——几百 MB 的文件会撑爆内存。stream 分块读取，内存占用恒定。" },
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
        { question: "Jest 中 test('描述', fn) 这个 fn 里做什么？", options: ["定义一个函数", "写测试逻辑和断言", "启动服务器", "模拟数据"], answer: 1, explanation: "fn 是测试函数——里面对被测代码调一下，然后 expect 断言结果是否符合预期。" },
        { question: "expect(sum(1, 2)).toBe(3) 这条断言在检查什么？", options: ["代码样式", "sum(1,2) 的返回值是否等于 3", "函数是否存在", "参数类型"], answer: 1, explanation: "expect 包裹实际值，.toBe() 检查是否严格等于期望值，是 Jest 最基本的断言。" },
        { question: "Jest 的 mock 函数 jest.fn() 能干什么？", options: ["创建真实函数", "创建假函数——追踪调用次数和参数，替代真实依赖", "删除函数", "加密函数"], answer: 1, explanation: "mock 让你不需要真的调用数据库或 API，用假的替代并检查函数是否被正确调用。" },
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
        { question: "OSI 七层模型从下到上第二层叫什么？", options: ["物理层", "数据链路层", "网络层", "传输层"], answer: 1, explanation: "数据链路层是第二层，负责相邻节点间的可靠传输，MAC 地址就在这层。" },
        { question: "IP 协议在 OSI 第几层？", options: ["第 2 层", "第 3 层（网络层）", "第 4 层", "第 7 层"], answer: 1, explanation: "IP 在网络层（第三层），负责寻址和路由，把数据包从源地址送到目的地址。" },
        { question: "TCP/IP 协议栈有几层？", options: ["7 层", "4 层", "5 层", "3 层"], answer: 1, explanation: "TCP/IP 实际用的模型是 4 层：网络接口层、网络层、传输层、应用层。" },
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
        { question: "TCP 三次握手，第一步是？", options: ["服务器发 SYN-ACK", "客户端发 FIN", "客户端发 SYN", "服务器发 ACK"], answer: 2, explanation: "客户端先发 SYN 包说「我想连接」，然后服务器回 SYN-ACK，最后客户端发 ACK 确认。" },
        { question: "TCP 和 UDP 最核心的区别是？", options: ["TCP 更快", "TCP 可靠有连接，UDP 不可靠无连接", "UDP 更安全", "TCP 只能传文本"], answer: 1, explanation: "TCP 保证顺序、不丢包、有连接；UDP 只管发不管到没到、不保证顺序，但延迟低。" },
        { question: "端口号范围是多少？", options: ["0-1023", "0-65535", "0-9999", "1024-49151"], answer: 1, explanation: "端口号是 16 位，范围 0-65535，0-1023 是知名端口（HTTP=80, SSH=22 等）。" },
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
        { question: "HTTP 请求报文第一行包含什么？", options: ["请求体", "方法 + URL + HTTP 版本", "只含 URL", "只含方法"], answer: 1, explanation: "请求行格式：GET /api/users HTTP/1.1——方法、路径、协议版本，三个信息。" },
        { question: "GET 和 POST 的区别？", options: ["一样", "GET 参数在 URL 中，POST 参数在请求体", "POST 更快", "GET 能传更多数据"], answer: 1, explanation: "GET 把参数拼在 URL 后面（有长度限制），POST 放在请求体里，适合传大数据和文件。" },
        { question: "HTTP 状态码 301 和 302 的区别？", options: ["没区别", "301 永久重定向，302 临时重定向", "301 是错误", "302 表示成功"], answer: 1, explanation: "301 告诉浏览器和搜索引擎「这个地址永久换了」，302 表示临时换一下还会回来。" },
        { question: "Content-Type: application/json 这个头干嘛的？", options: ["设置缓存", "告诉接收方请求/响应体的数据格式是 JSON", "认证", "压缩"], answer: 1, explanation: "Content-Type 声明数据的 MIME 类型，接收方根据这个知道怎么解析 body 里的内容。" },
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
        { question: "HTTPS 中的 S 代表什么？", options: ["Speed", "Secure——通过 TLS/SSL 加密", "Simple", "Server"], answer: 1, explanation: "HTTPS = HTTP + TLS/SSL，数据在传输中被加密，防止被窃听和篡改。" },
        { question: "SSL 证书是干什么的？", options: ["加速网站", "证明网站身份 + 加密通信", "存储文件", "管理域名"], answer: 1, explanation: "证书由 CA 签发，包含网站公钥和身份信息，浏览器验证证书后建立加密连接。" },
        { question: "Let's Encrypt 是什么？", options: ["收费证书", "免费、自动化的 SSL 证书颁发机构", "Web 服务器", "DNS 服务"], answer: 1, explanation: "Let's Encrypt 提供免费的 SSL 证书，配合 certbot 工具能自动申请和续期。" },
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
        { question: "DNS 的 A 记录存的是什么？", options: ["域名", "IPv4 地址", "IPv6 地址", "邮件服务器"], answer: 1, explanation: "A 记录把域名映射到 IPv4 地址，是最基础的 DNS 记录类型。" },
        { question: "CNAME 记录的作用？", options: ["直接解析 IP", "把域名指向另一个域名（别名）", "存储文本", "设置邮件"], answer: 1, explanation: "CNAME 是别名记录，可以让 www.example.com 指向 example.com，改一处两者都生效。" },
        { question: "nslookup 和 dig 的区别？", options: ["没区别", "dig 信息更全、更专业，nslookup 更简单", "nslookup 已废弃", "dig 是 Windows 的"], answer: 1, explanation: "dig 提供了完整的 DNS 查询输出，适合深入诊断；nslookup 简单快速但信息少。" },
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
        { question: "负载均衡主要是解决什么的？", options: ["存储问题", "把请求分摊到多台服务器", "数据库问题", "网络加密"], answer: 1, explanation: "一台机器扛不住流量了，负载均衡把请求分发给多台后端服务器一起处理。" },
        { question: "Nginx 的 upstream 指令用来做什么？", options: ["设置缓存", "定义一组后端服务器", "配置 SSL", "设置日志"], answer: 1, explanation: "upstream 块列出后端服务器地址，Nginx 按负载策略把请求分配给它们。" },
        { question: "session 粘滞 (sticky session) 要解决什么问题？", options: ["加快速度", "同一个用户始终发给同一台后端", "安全性", "缓存"], answer: 1, explanation: "如果用户 session 存在某台服务器上，请求跳到另一台就找不到 session 了，粘滞确保请求落到同一台。" },
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
        { question: "CDN 的全称是什么？", options: ["Computer Data Network", "Content Delivery Network（内容分发网络）", "Cloud Data Node", "Cache Domain Name"], answer: 1, explanation: "CDN 在全球各地节点缓存你的静态资源，用户就近访问——快、省带宽、防攻击。" },
        { question: "CDN 缓存了 static JS/CSS，源站更新了用户看到旧版怎么办？", options: ["没办法", "用文件 hash 改名（app.abc123.js），改了 hash 新请求不走缓存", "清空本地浏览器缓存", "禁用 CDN"], answer: 1, explanation: "文件名带内容 hash，文件变了 hash 就变，URL 变了 CDN 就会回源拉新版本。" },
        { question: "CDN 是怎么判断「就近」的？", options: ["随机选", "DNS 智能解析——根据请求的地理位置返回最近的节点 IP", "选带宽最大的", "选最空闲的"], answer: 1, explanation: "用户请求域名时 DNS 系统根据 IP 判断地理位置，返回离用户最近的 CDN 节点地址。" },
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
        { question: "XSS 攻击是啥？", options: ["数据库注入", "跨站脚本——在网页里注入恶意 JS 代码", "网络劫持", "暴力破解密码"], answer: 1, explanation: "攻击者把脚本塞进网页，其他用户访问时执行这段恶意代码，可能盗取 cookie、篡改页面。" },
        { question: "SQL 注入怎么防？", options: ["多加防火墙", "始终用参数化查询或 ORM，不拼接 SQL 字符串", "用 HTTPS", "限制数据库大小"], answer: 1, explanation: "不用字符串拼接 SQL，用参数化查询（如 ? 占位符），用户输入不会当成 SQL 代码执行。" },
        { question: "CSRF 攻击的原理？", options: ["盗取密码", "利用用户已登录身份，诱导点击触发非本意的操作", "注入脚本", "伪造 IP"], answer: 1, explanation: "你登录了银行网站，又打开了一个恶意页面，这个页面偷偷以你的身份提交转账请求——这就是 CSRF。" },
        { question: "密码怎么存最安全？", options: ["明文存", "哈希 + 加盐（bcrypt/argon2）", "Base64 编码", "对称加密"], answer: 1, explanation: "单向哈希加随机盐——即使数据库泄露，攻击者也无法直接看到原始密码。" },
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
        { question: "WebSocket 连接升级基于哪个协议？", options: ["TCP", "HTTP——先发一个 HTTP Upgrade 请求", "UDP", "FTP"], answer: 1, explanation: "WebSocket 借道 HTTP 握手，请求头里带 Upgrade: websocket 告诉服务器要转协议。" },
        { question: "WebSocket 适合什么场景？", options: ["静态文件下载", "实时交互——聊天、在线协作、股票行情", "离线数据同步", "文件备份"], answer: 1, explanation: "需要服务端主动推送数据的实时场景 WebSocket 最适合，比轮询效率高太多了。" },
        { question: "心跳 (ping/pong) 在 WebSocket 里有什么用？", options: ["加速传输", "保持连接活跃、检测断线", "加密数据", "压缩数据"], answer: 1, explanation: "长期没数据传输时防火墙可能断开连接，定时发 ping/pong 保持连接不断。" },
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
        { question: "Wireshark 是干嘛的？", options: ["防火墙工具", "网络抓包分析工具", "性能压测工具", "端口扫描器"], answer: 1, explanation: "Wireshark 能抓取经过网卡的所有数据包并解析每一层协议，排查网络问题的利器。" },
        { question: "Postman 主要用来干什么？", options: ["写代码", "测试和调试 HTTP API", "数据库管理", "服务器监控"], answer: 1, explanation: "Postman 是 API 测试工具——构造请求、看响应、写自动化测试、生成文档。" },
        { question: "ab (Apache Bench) 做什么的？", options: ["代码格式化", "HTTP 压力测试——模拟并发看服务器能抗多少请求", "抓包", "路由追踪"], answer: 1, explanation: "ab 是简单粗暴的压测工具，指定并发数和总请求数，看服务器 QPS 和响应时间。" },
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
        { question: "Redis 的数据存在哪里？", options: ["硬盘", "内存", "SSD", "云端"], answer: 1, explanation: "Redis 是内存数据库——数据主要存在内存中所以特别快，但也要配持久化防止重启丢数据。" },
        { question: "Redis 的 key 最大能多长？", options: ["256 字节", "512MB", "1024 字节", "1GB"], answer: 1, explanation: "极端情况下 key 可以到 512MB，但不建议用太长——可读性差、消耗内存。" },
        { question: "redis-cli 是用来干什么的？", options: ["Redis 服务端", "Redis 的命令行客户端", "Redis 集群管理", "Redis 备份工具"], answer: 1, explanation: "redis-cli 让你在命令行里直连 Redis 服务器进行操作，类似 MySQL 的 mysql 客户端。" },
        { question: "EXPIRE key 3600 做了什么？", options: ["删除 key", "设置 key 的存在时间为 1", "设置 key 3600 秒后自动删除", "延长 key 到 3600 字节"], answer: 2, explanation: "EXPIRE 设 TTL，key 在指定秒数后自动被 Redis 删除，常用在验证码过期等场景。" },
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
        { question: "Redis 的 List 类型底层实现是什么？", options: ["数组", "双向链表或 ziplist", "二叉树", "哈希表"], answer: 1, explanation: "List 底层根据元素大小和个数自动在 ziplist（紧凑列表）和 linkedlist（双向链表）间切换。" },
        { question: "Set 和 ZSet (Sorted Set) 最大的区别？", options: ["没区别", "ZSet 每个元素带一个 score，按 score 排序", "Set 更快", "ZSet 不能去重"], answer: 1, explanation: "Sorted Set 的每个成员都关联一个分数，自动按分数排序，排行榜场景必备。" },
        { question: "Hash 在 Redis 里适合存什么？", options: ["列表数据", "对象——如用户名、邮箱、年龄", "有序数据", "二进制文件"], answer: 1, explanation: "Hash 是键值对集合，完美映射业务对象，可以单独增删改某个字段而不影响其他。" },
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
        { question: "SETNX key value 和 SET key value NX 区别？", options: ["没有区别——功能完全相同", "SETNX 已过时，SET ... NX 是新写法", "SETNX 更快", "SET NX 只能设 Hash"], answer: 1, explanation: "两者功能一样——只有 key 不存在时才设值，但 SET key value NX 是推荐的现代写法。" },
        { question: "INCR counter 把 counter 的值怎么了？", options: ["设为 0", "原子自增 1，如果没有 counter 则从 0 开始", "字符串拼接", "删除了"], answer: 1, explanation: "INCR 是原子自增操作，多线程并发也不会出现竞态，常用于计数器。" },
        { question: "SCAN 命令为什么比 KEYS 好？", options: ["返回更多数据", "SCAN 是游标式分批迭代，不会阻塞 Redis", "SCAN 更精确", "SCAN 是老命令"], answer: 1, explanation: "KEYS * 在生产环境是禁忌——上百万 key 时锁住整个 Redis 几秒。SCAN 分批返回不阻塞。" },
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
        { question: "RDB 快照方式持久化是什么意思？", options: ["实时同步每一条写操作", "定时把整个内存数据写入 .rdb 文件——快照", "记录命令日志", "不持久化"], answer: 1, explanation: "RDB 按规则（如每 5 分钟 100 次修改）把内存 dump 到磁盘，恢复快但可能丢最后一次快照后的数据。" },
        { question: "AOF 日志的实现原理？", options: ["定期快照", "每一条写命令都追加到 .aof 文件——重放日志恢复数据", "内存镜像", "二进制快照"], answer: 1, explanation: "AOF 类似数据库的 WAL 日志，每条修改 Redis 的命令都记录，恢复时重放日志重建数据。" },
        { question: "混合持久化 (RDB + AOF) 怎么工作的？", options: ["只用一个", "AOF 文件前半部分是 RDB 快照 + 后半部分是增量命令", "两个独立文件", "定时切换"], answer: 1, explanation: "Redis 4.0 后 AOF 可混合 RDB——快速加载快照再重放增量命令，恢复速度比纯 AOF 快。" },
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
        { question: "Sentinel 主要解决什么问题？", options: ["数据库压缩", "高可用——主节点挂了自动选新 master 并切换", "数据加密", "负载均衡"], answer: 1, explanation: "Sentinel 集群监控 master，一旦宕机自动执行故障转移——选举一个 slave 为新的 master。" },
        { question: "一个生产环境的 Sentinel 至少需要几个实例？", options: ["1 个", "3 个（奇数，满足大多数投票）", "2 个", "越多越好"], answer: 1, explanation: "Sentinel 用多数票决策，至少 3 个才能在你需要的时候达成一致，2 个出现分票就定不了。" },
        { question: "Sentinel 发现 master 宕机后会做什么？", options: ["重启 master", "选出新 master，通知其他 slave 复制新 master", "直接关闭集群", "报警然后等人处理"], answer: 1, explanation: "自动故障转移——选新主、改从、通知客户端新地址，全套流程自己完成。" },
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
        { question: "Redis Cluster 把数据分散到多个节点的技术叫什么？", options: ["数据备份", "数据分片 (sharding)——按 hash slot 分", "数据加密", "数据压缩"], answer: 1, explanation: "Cluster 把整个 key 空间分成 16384 个 hash slot，每个节点负责一部分 slot，数据按 key 的 slot 存到对应节点。" },
        { question: "Redis Cluster 最少需要几个节点？", options: ["1 主 1 从", "3 主 3 从共 6 个", "1 个就行", "5 个"], answer: 1, explanation: "最小配置 3 主（满足分片和选举）加 3 从（每个主一个副本保障高可用），共 6 个实例。" },
        { question: "Cluster 模式下客户端怎么知道 key 在哪个节点？", options: ["随机试", "根据 key 计算 slot 值，去对应的节点取", "问 Sentinel", "全节点广播"], answer: 1, explanation: "客户端对 key 做 CRC16(key) % 16384 算出 slot，然后去负责该 slot 的节点操作。" },
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
        { question: "用 Redis 实现分布式锁的命令是什么？", options: ["GET lock", "SET lock value NX EX 30", "DEL lock", "INCR lock"], answer: 1, explanation: "SET NX 保证原子性——只有锁不存在时才设成功，EX 设过期时间防止死锁。" },
        { question: "Redis 做缓存时常用的淘汰策略是？", options: ["永远不删", "LRU (最近最少使用淘汰) 或 LFU (最不经常使用淘汰)", "随机淘汰", "定时全清"], answer: 1, explanation: "缓存满了就得踢人。LRU 根据「最近没用」淘汰，LFU 根据「用得少」淘汰。" },
        { question: "Redis 做消息队列主要用什么数据结构？", options: ["String", "List——LPUSH + BRPOP 实现阻塞队列", "Set", "Hash"], answer: 1, explanation: "LPUSH 往队列尾放消息，BRPOP 从队列头取消息（没消息就阻塞等），简单队列就搞定了。" },
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
        { question: "Redis 里 Lua 脚本的最大好处是什么？", options: ["写得快", "原子性——整个脚本里的所有命令要么全执行要么全不执行", "调试简单", "兼容性好"], answer: 1, explanation: "Lua 脚本在 Redis 里是原子执行的——脚本运行期间不会有其他命令插队。" },
        { question: "EVAL 和 EVALSHA 的区别？", options: ["没区别", "EVALSHA 用脚本的 SHA1 哈希值调用，省带宽", "EVAL 更快", "EVALSHA 已废弃"], answer: 1, explanation: "每次 EVAL 要把整个脚本内容传过去，EVALSHA 只需要 40 字节的 SHA1 摘要。" },
        { question: "Redis Lua 里 redis.call('SET', KEY, VALUE) 和 redis.pcall 区别？", options: ["没区别", "call 遇到错误直接抛异常停脚本，pcall 返回错误对象继续执行", "pcall 更快", "call 是异步的"], answer: 1, explanation: "pcall 是 protected call——出错返回错误对象不中断脚本，适合需要容错的场景。" },
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
        { question: "使用 Pipeline 最大的好处是？", options: ["写 Lua", "批量发命令——减少网络往返次数", "自动分片", "数据压缩"], answer: 1, explanation: "每次命令来回报一次网络延迟，Pipeline 把 N 条命令打包一次发过去，延迟减少 N 倍。" },
        { question: "scan 系列命令代替 keys 的理由？", options: ["返回更多", "scan 迭代式返回不会阻塞 Redis，生产环境安全", "scan 更快", "scan 支持模糊匹配"], answer: 1, explanation: "KEYS * 在生产环境是大忌——上千万 key 时卡住 Redis 不服务其他请求。SCAN 游标式分批取。" },
        { question: "慢查询日志 slowlog 记录了什么？", options: ["所有命令", "执行时间超过阈值的命令", "错误的命令", "内存使用情况"], answer: 1, explanation: "slowlog 帮你揪出哪些查询拖慢 Redis，不是数据量大就是命令写得有问题。" },
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
        { question: "CONFIG set requirepass \"mypassword\" 做了什么？", options: ["改端口", "设置 Redis 连接密码", "改数据库名", "设置最大内存"], answer: 1, explanation: "requirepass 是 Redis 的认证密码——客户端连上后得先 AUTH 密码才能操作。" },
        { question: "Redis 默认监听所有网络接口，怎么加固？", options: ["不用管", "bind 到指定 IP 或 localhost，加防火墙规则", "加密码就够了", "换端口"], answer: 1, explanation: "Redis 默认 bind 0.0.0.0 开放给全网，应该只 bind 内网 IP 或 127.0.0.1，再配密码。" },
        { question: "rename-command FLUSHDB \"\" 做了什么？", options: ["改名命令", "禁用 FLUSHDB 命令——设成空字符串", "重命名数据库", "创建新命令"], answer: 1, explanation: "把危险命令重命名为空串等于禁用——防止误删或被人恶意全清数据库。" },
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
        { question: "<!DOCTYPE html> 有什么用？", options: ["注释", "告诉浏览器这是 HTML5 文档", "引入 JS", "没用的历史遗留"], answer: 1, explanation: "DOCTYPE 声明让浏览器进入标准模式渲染，不写的话可能进入怪异模式表现不一致。" },
        { question: "<a href=\"#section1\">跳到第一节</a> 中 #section1 是什么？", options: ["外部链接", "页面内锚点——跳转到 id=section1 的元素", "JS 函数", "CSS 选择器"], answer: 1, explanation: "# 开头的是内部锚点链接，点击后页面滚动到 id=\"section1\" 的元素位置。" },
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
        { question: "CSS 选择器的优先级 (specificity) 怎么排？", options: ["class > id", "id > class > tag（内联最高）", "都一样", "tag 最高"], answer: 1, explanation: "权重：!important > 内联 > id > class/属性/伪类 > 标签——数字越大越优先。" },
        { question: "display: flex 把容器变成了什么布局？", options: ["表格布局", "弹性盒子布局——子元素可伸缩排列", "网格布局", "流式布局"], answer: 1, explanation: "flex 开启弹性布局，子元素可以横向/纵向排列、伸缩、居中，比 float 好使一百倍。" },
        { question: "box-sizing: border-box 改变了什么？", options: ["边框颜色", "宽高计算方式——包含 padding 和 border", "内边距", "外边距"], answer: 1, explanation: "默认 width 不含 padding + border，设为 border-box 后 width 是最终可见宽度，布局好算多了。" },
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
        { question: "justify-content: center 做了什么？", options: ["垂直居中", "水平居中主轴上的子元素", "分散对齐", "两端对齐"], answer: 1, explanation: "justify-content 控制主轴（默认横向）上的对齐方式，center 就是居中。" },
        { question: "align-items: center 做什么？", options: ["水平居中", "垂直居中交叉轴上的子元素", "拉伸", "基线对齐"], answer: 1, explanation: "align-items 控制交叉轴（默认纵向）上的对齐，center 垂直居中。" },
        { question: "flex-wrap: wrap 有什么用？", options: ["不换行", "子元素放不下时自动换行", "逆向排列", "居中"], answer: 1, explanation: "默认不换行，子元素会被挤小。wrap 让它们放不下就换到下一行。" },
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
        { question: "Grid 和 Flexbox 最大的区别？", options: ["Grid 更新", "Flexbox 是一维（行或列），Grid 是二维（行和列同时）", "Grid 只支持 Chrome", "Flexbox 已废弃"], answer: 1, explanation: "Flexbox 擅长单行/单列排列，Grid 是真正的二维网格——同时控制行和列的位置。" },
        { question: "grid-template-columns: 1fr 1fr 1fr 是什么意思？", options: ["1 像素", "三等分——每列占一份可用空间", "固定 1 列", "1 行"], answer: 1, explanation: "fr 是弹性单位，三列都是 1fr 就是三等分可用宽度。" },
        { question: "grid-gap: 16px 做了什么？", options: ["设置内边距", "设置网格单元格之间的间距", "设置边框", "设置外边距"], answer: 1, explanation: "grid-gap（或 gap）给网格的单元格之间加间隔，不用给每个格子加 margin 了。" },
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
        { question: "TypeScript 相比 JavaScript 最大的优势？", options: ["运行更快", "静态类型检查——在编译时发现类型错误", "语法更少", "不需要编译"], answer: 1, explanation: "TS 在编译阶段就检查类型错误，减少运行时 bug，写代码时 IDE 有更好的补全和重构能力。" },
        { question: "interface User { name: string; age?: number } 中 ? 表示？", options: ["必填", "可选属性——age 可以不传", "私有", "只读"], answer: 1, explanation: "? 代表可选，创建 User 类型的对象时 age 字段可有可无。" },
        { question: "泛型 function identity<T>(arg: T): T 中 T 是什么？", options: ["固定类型", "类型变量——调用时确定，保持输入输出类型一致", "T 类型", "字符串"], answer: 1, explanation: "泛型让函数能处理多种类型又保持类型安全——传什么类型进去就返回什么类型。" },
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
        { question: "React 中 JSX 是什么？", options: ["新语言", "JavaScript 语法扩展——像 HTML 但编译成 JS", "数据库", "CSS 框架"], answer: 1, explanation: "JSX 让你在 JS 里写类似 HTML 的标签，编译时转成 React.createElement 调用。" },
        { question: "props 和 state 的区别？", options: ["一样", "props 是父组件传下来的只读参数，state 是组件自身管理的数据", "props 能改 state 不能", "state 是全局的"], answer: 1, explanation: "props 从外部来不能改，state 是组件内部自己管的状态，用 setState 更新。" },
        { question: "useState 返回的数组第一个元素是什么？", options: ["更新函数", "当前状态值", "之前的旧值", "引用"], answer: 1, explanation: "useState 返回 [当前值, 更新函数]，通常 const [count, setCount] = useState(0)。" },
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
        { question: "useEffect 是干什么的？", options: ["定义状态", "处理副作用——如获取数据、操作 DOM、订阅等", "创建组件", "渲染列表"], answer: 1, explanation: "函数组件没有生命周期方法，useEffect 统一处理数据请求、事件订阅、DOM 更新等副作用。" },
        { question: "useEffect(() => { ... }, []) 第二个参数空数组什么意思？", options: ["每次都执行", "只在组件挂载时执行一次", "从不执行", "在特定状态变化时执行"], answer: 1, explanation: "空依赖数组表示「不依赖任何变量」，effect 只在首次渲染后跑一次，类似 componentDidMount。" },
        { question: "自定义 Hook 是什么？", options: ["内置 API", "以 use 开头的函数——封装复用逻辑", "类组件", "第三方库"], answer: 1, explanation: "自定义 Hook 把组件逻辑抽成可复用函数，比如 useLocalStorage、useFetch，多个组件共享逻辑。" },
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
        { question: "Vue 的双向绑定 v-model 做了什么？", options: ["单向传值", "表单输入和数据自动同步", "绑定样式", "事件监听"], answer: 1, explanation: "v-model 是语法糖——同时做数据到视图的绑定和视图到数据的更新，修改任一方向另一个自动变化。" },
        { question: "{{ message }} 这种双大括号叫啥？", options: ["表达式", "Mustache 语法——插值表达式，输出 JS 变量的值", "HTML 标签", "注释"], answer: 1, explanation: "双花括号把 JS 表达式的结果渲染到 DOM，是最基本的 Vue 模板语法。" },
        { question: "v-if 和 v-show 的区别？", options: ["一样", "v-if 是真的增删 DOM，v-show 只是切换 display:none", "v-show 更快", "v-if 用于列表"], answer: 1, explanation: "频繁切换用 v-show——只是显示隐藏不重渲染；条件很少变用 v-if——不渲染就不占 DOM。" },
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
        { question: "Vue3 组合式 API 的 setup() 函数是干嘛的？", options: ["初始化样式", "组件的入口——在这里定义数据和方法", "创建路由", "处理 HTTP 请求"], answer: 1, explanation: "setup 是组合式 API 的起点，组件实例创建之前执行，替代了 Options API 的 data、methods 等。" },
        { question: "ref(0) 创建的响应式数据怎么取值？", options: ["直接 .value", "count.value——模板里自动解包不用写 .value", "ref.value", "get(count)"], answer: 1, explanation: "JS 里取值要 .value，但 template 里 Vue 自动帮你解包——直接写 count 就行。" },
        { question: "watch 和 computed 的区别？", options: ["没区别", "computed 是派生计算属性有缓存，watch 是监听变化执行副作用", "watch 用于模板", "computed 用于异步"], answer: 1, explanation: "computed 根据依赖自动计算返回新值有缓存；watch 监听某个值变化执行如发请求等副作用。" },
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
        { question: "Next.js 中 App Router 以什么文件定义页面？", options: ["index.js", "page.tsx（或 page.js）", "route.ts", "layout.ts"], answer: 1, explanation: "在 app 目录下，page.tsx 就是该路由对应的页面组件，文件名固定。" },
        { question: "SSR (Server Side Rendering) 是什么意思？", options: ["客户端渲染", "在服务器端渲染 HTML 后返回完整页面", "静态生成", "预编译"], answer: 1, explanation: "服务端渲染——每个请求都在服务器上生成 HTML，用户看到的是完整的页面，首屏快、利于 SEO。" },
        { question: "layout.tsx 文件用来做什么？", options: ["定义 API", "定义共享布局——多个页面共用的外壳，切换页面时 layout 不重新渲染", "静态资源", "路由参数"], answer: 1, explanation: "layout 是持久化布局，包裹子页面，导航时 layout 保持状态不刷新，省性能。" },
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
        { question: "Tailwind CSS 的 utility-first 是什么意思？", options: ["组件优先", "用大量预设的工具类（如 p-4, text-red-500）直接在 HTML 里写样式，不写自定义 CSS", "CSS 框架", "JavaScript 库"], answer: 1, explanation: "Tailwind 提供数以千计的原子化 CSS 类，每个类只做一件事，组合起来实现任何设计。" },
        { question: "class=\"flex items-center justify-between\" 做了什么？", options: ["报错", "flex 布局 + 垂直居中 + 两端分散对齐", "网格布局", "文本样式"], answer: 1, explanation: "flex 弹性布局，items-center 垂直居中，justify-between 让子元素两端贴边中间均匀。三行 CSS 缩成一个 class。" },
        { question: "hover:bg-blue-700 这个类是什么？", options: ["普通类", "hover 变体——鼠标悬停时应用 bg-blue-700", "响应式类", "dark 模式"], answer: 1, explanation: "Tailwind 的前缀变体机制——hover: 表示只在鼠标悬停时生效，类似的还有 focus:、dark: 等。" },
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
        { question: "原生 JS 怎么创建新 DOM 元素？", options: ["document.newElement()", "document.createElement('div')", "DOM.create()", "new Element()"], answer: 1, explanation: "createElement 创建新元素节点，之后可以用 appendChild 添加到页面里。" },
        { question: "parent.appendChild(child) 做了什么？", options: ["移除子元素", "把 child 加到 parent 的末尾", "替换", "克隆"], answer: 1, explanation: "appendChild 把现有节点移动到目标父节点的子元素列表末尾。" },
        { question: "Element.innerHTML = 'Hello' 和 textContent 的区别？", options: ["一样", "innerHTML 解析 HTML 标签，textContent 纯文本不解析", "textContent 更快", "innerHTML 已废弃"], answer: 1, explanation: "innerHTML 会把字符串当 HTML 解析——有 XSS 风险；textContent 只设置文本，安全。" },
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
        { question: "fetch() 默认是什么 HTTP 方法？", options: ["POST", "GET", "PUT", "DELETE"], answer: 1, explanation: "fetch 不指定 method 时默认发 GET 请求。" },
        { question: "fetch 返回的 Response 对象，怎么拿 JSON 数据？", options: [".text()", ".json()——返回一个解析 JSON 的 Promise", ".data", ".body"], answer: 1, explanation: "response.json() 返回 Promise——需要 await 或 .then() 才能拿到解析后的 JS 对象。" },
        { question: "Axios 比 fetch 好在哪些方面？", options: ["浏览器不支持 fetch", "自动 JSON 解析、请求/响应拦截器、超时设置、更好的错误处理", "fetch 更快", "Axios 是标准 API"], answer: 1, explanation: "fetch 需要手动 .json()、404/500 不算 reject 要自己检查，浏览器上 Axios 更省心。" },
        { question: "请求超时怎么处理？", options: ["无限等待", "用 AbortController + setTimeout 取消请求", "重试 3 次", "忽略超时"], answer: 1, explanation: "AbortController.signal 配合 fetch 在超时后中止请求，防止请求挂死。" },
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
        { question: "Bootstrap 的栅格系统有多少列？", options: ["10", "12", "16", "24"], answer: 1, explanation: "Bootstrap 默认 12 列，col-6 占一半，col-4 占三分之一，加起来刚好 12。" },
        { question: "class=\"btn btn-primary\" 渲染出什么？", options: ["文本", "蓝色主按钮", "红色按钮", "没有样式"], answer: 1, explanation: "btn 是按钮基础样式，btn-primary 是主色（通常是蓝色），组合成一个标准按钮。" },
        { question: "Bootstrap 的 class=\\\"d-none d-md-block\\\" 是什么意思？", options: ["总是隐藏", "移动端隐藏，中等屏幕及以上显示", "总是显示", "只在桌面隐藏"], answer: 1, explanation: "d-none 默认隐藏，d-md-block 在 md 断点及以上覆盖为显示。" },
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
        { question: "Go 语言最主要的特色是？", options: ["面向对象", "goroutine 并发——用 go 关键字轻量启动协程", "动态类型", "解释执行"], answer: 1, explanation: "Go 的杀手级特性就是 goroutine + channel——用极低的成本实现高并发。" },
        { question: "Go 里 := 是什么意思？", options: ["赋值", "短变量声明——声明并赋值，自动推断类型", "等于比较", "指针"], answer: 1, explanation: ":= 是声明 + 赋值二合一，只能在函数内用。var name type 也行，但 := 更简洁。" },
        { question: "defer 关键词做什么？", options: ["异步执行", "延迟到函数返回前执行——常用于关闭文件、释放锁", "立即执行", "并行执行"], answer: 1, explanation: "defer 把函数调用压栈，外层函数 return 前按后进先出顺序执行，清理必备。" },
        { question: "Go 里用 error 类型而不是 try...catch，为什么？", options: ["不支持异常", "显式处理每个错误——避免异常传播不可控", "Go 没有错误", "错误被静默忽略"], answer: 1, explanation: "Go 的设计哲学：每个可能出错的地方都显式返回 error，调用者必须处理或显式忽略。" },
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
        { question: "Rust 的所有权规则：一个值同时能有几个 owner？", options: ["多个", "恰好一个", "零个", "任意"], answer: 1, explanation: "核心规则——每个值有且仅有一个所有者，所有者离开作用域值被自动释放。" },
        { question: "Rust 的 & 引用符号表示什么？", options: ["取地址", "不可变借用——引用值但不拥有它", "可变引用", "所有权的转移"], answer: 1, explanation: "&T 是不可变引用，允许你借用来读取值，但你不能通过它修改原值，也不夺走所有权。" },
        { question: "Rust 中 &mut 引用和 & 引用的核心差异？", options: ["没差别", "&mut 允许修改被引用值，但同时只能有一个 &mut", "&mut 更快", "&mut 拥有所有权"], answer: 1, explanation: "可变借用期间不能有其他任何引用（读也不行）——这是 Rust 防止数据竞争的机制。" },
        { question: "Rust 的 move 语义是什么？", options: ["变量搬迁副本", "赋值时所有权转移——原来变量失效不能再用", "垃圾回收", "引用计数"], answer: 1, explanation: "let y = x; 后 x 的所有权转移给了 y，你再访问 x 编译直接报错——防止双重释放。" },
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
        { question: "PHP 的代码块用什么标签包裹？", options: ["<script>", "<?php ... ?>", "<code>", "{% %}"], answer: 1, explanation: "<?php 开头 ?> 结尾，PHP 代码必须在这对标签之间。" },
        { question: "PHP 里 $ 符号表示什么？", options: ["注释", "变量——所有变量名前都加 $", "函数", "常量"], answer: 1, explanation: "PHP 变量名前必须有 $——$name、$count，没 $ 的是常量或函数。" },
        { question: "echo 和 print 的区别？", options: ["没区别", "echo 能输出多个字符串没返回值，print 只输出一个且返回 1", "print 更快", "echo 只能输出数字"], answer: 1, explanation: "echo 更快更灵活能连写多个参数；print 能用在表达式中但只能输出一个。" },
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
        { question: "Java 的 JVM 是什么？", options: ["代码编辑器", "Java 虚拟机——将字节码转为机器码运行", "编译器", "数据库"], answer: 1, explanation: "JVM 是 Java '一次编译处处运行' 的关键——不管你什么系统，javac 编译出 .class 字节码，JVM 负责跑它。" },
        { question: "public static void main(String[] args) 中 static 表示什么？", options: ["实例方法", "类方法——不用创建对象就能调用", "私有方法", "抽象方法"], answer: 1, explanation: "static 让 main 方法属于类本身，JVM 可以不用 new 对象就能直接调用这个入口方法。" },
        { question: "int 和 Integer 的区别？", options: ["一样", "int 是基本类型，Integer 是包装类（对象）", "Integer 更快", "int 是对象"], answer: 1, explanation: "int 存栈上、快、没方法；Integer 是对象、存堆上、可为 null，集合里只能用 Integer。" },
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
        { question: "C# 中 var 关键字用于什么？", options: ["声明动态类型", "隐式类型——编译器自动推断变量的具体类型", "声明可变变量", "声明变量为 variant"], answer: 1, explanation: "var 让你偷懒不写类型，编译器根据等号右边的值自动推出来，编译时依然是强类型。" },
        { question: "C# 的 async/await 是干什么的？", options: ["多线程", "异步编程——不阻塞线程等待 IO，提高吞吐量", "并行计算", "事件处理"], answer: 1, explanation: "跟 JS 的 async/await 设计类似——看起来像同步的写法，实际是异步执行不卡线程。" },
        { question: "LINQ 是什么？", options: ["数据库", "语言集成查询——用类似 SQL 的语法对集合进行查询", "ORM 框架", "日志库"], answer: 1, explanation: "LINQ 让你在 C# 里用 from/where/select 语法操作对象和数据库，统一的查询接口。" },
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
        { question: "Node.js 的事件循环有几个阶段？", options: ["3", "6——timers、I/O callbacks、idle/prepare、poll、check、close", "1", "4"], answer: 1, explanation: "事件循环 6 个阶段，每个阶段有自己的 FIFO 回调队列，理解它才能写出高性能 Node 代码。" },
        { question: "process.nextTick 和 setImmediate 的区别？", options: ["一样", "nextTick 在同一个事件循环阶段末尾执行，setImmediate 在下一个事件循环的 check 阶段执行", "setImmediate 更快", "nextTick 是异步的"], answer: 1, explanation: "nextTick 优先级最高——当前操作完成后立即执行，但滥用会饿死 I/O。" },
        { question: "cluster 模块解决了什么问题？", options: ["代码压缩", "多核利用——fork 多个 worker 进程利用所有 CPU 核心", "日志管理", "网络优化"], answer: 1, explanation: "Node 单进程只能用一个核，cluster 开多个进程共享同一个端口，充分利用多核。" },
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
        { question: "Express 中间件的签名一般是？", options: ["(err) => {}", "(req, res, next) => {}", "(data) => {}", "(req, res) => {}"], answer: 1, explanation: "中间件函数接收 req、res 和 next 三个参数，调用 next() 把控制权传给下一个中间件。" },
        { question: "错误处理中间件的签名跟普通中间件有什么不同？", options: ["一样", "多一个 err 参数在最前面: (err, req, res, next)", "不用 next", "只有 err 参数"], answer: 1, explanation: "错误处理中间件四个参数——Express 根据参数个数识别是不是错误处理函数。" },
        { question: "app.use('/api', router) 中 /api 是什么？", options: ["全局中间件", "路由前缀——router 里所有路由自动加 /api 前缀", "静态文件路径", "错误路由"], answer: 1, explanation: "mount path 自动加到 router 内部路由前面——router.get('/users') 实际响应 /api/users。" },
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
        { question: "HTTP PUT 和 PATCH 的区别？", options: ["一样", "PUT 全量替换资源，PATCH 部分更新", "PATCH 已废弃", "PUT 只用于 GET"], answer: 1, explanation: "PUT 一般传完整对象覆盖；PATCH 只传要改的字段即部分更新，更灵活。" },
        { question: "API 版本号通常怎么包含？", options: ["响应体里", "URL 里——/api/v1/users 或 Accept 头", "请求体中", "Cookie 中"], answer: 1, explanation: "常见两种方式：URL 前缀 /v1/api 或 Accept 头 version。URL 方式最简单直观。" },
        { question: "响应体用 JSON 包裹一个 data 字段如 { data: {...} } 有什么好处？", options: ["好看", "统一格式便于前端处理、包含分页/错误信息", "性能更好", "JSON 规范要求"], answer: 1, explanation: "统一响应格式 { data, error, meta } 节省前端代码，不同接口有一致的结构可以写通用处理。" },
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
        { question: "GraphQL 和 REST 的主要区别？", options: ["没区别", "GraphQL 客户端指定要什么字段，REST 服务端决定返回什么", "REST 更快", "GraphQL 只能查一个资源"], answer: 1, explanation: "GraphQL 让前端按需索取——只查需要的字段，一次请求拿多个资源，避免 over-fetching 和 under-fetching。" },
        { question: "GraphQL Schema 里的 type User { id: ID! name: String } 中 ! 表示？", options: ["重要字段", "非空——这个字段不能为 null", "已废弃", "隐藏字段"], answer: 1, explanation: "! 标记 Non-Null，该字段必须有值不能返回 null。" },
        { question: "Mutation 和 Query 的区别？", options: ["一样", "Query 是查询（读），Mutation 是变更（写/改/删）", "Mutation 更快", "Query 不支持变量"], answer: 1, explanation: "查询用 Query，修改数据用 Mutation，GraphQL 中两者在 Schema 中分开定义。" },
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
        { question: "gRPC 默认用什么序列化协议？", options: ["JSON", "Protocol Buffers (protobuf)——二进制协议", "XML", "YAML"], answer: 1, explanation: "Protobuf 是 gRPC 的序列化格式——比 JSON 小很多、解析快很多，schema 用 .proto 文件定义。" },
        { question: ".proto 文件中 rpc GetUser(UserRequest) returns (UserResponse); 定义了什么？", options: ["HTTP 端点", "一个 RPC 方法——接收 UserRequest 返回 UserResponse", "数据库查询", "消息格式"], answer: 1, explanation: "rpc 关键字定义远程过程调用，入参和出参类型都要提前定义。" },
        { question: "gRPC 支持哪几种通信模式？", options: ["只有请求-响应", "一元 RPC、服务端流、客户端流、双向流", "只有流式", "只有单向"], answer: 1, explanation: "gRPC 支持四种模式——最简单的请求/响应、流式下载、流式上传、实时双向流。" },
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
        { question: "WebSocket 握手时首先发起的是什么请求？", options: ["WebSocket 请求", "HTTP 请求——带 Upgrade: websocket 头", "TCP SYN", "UDP 报文"], answer: 1, explanation: "WebSocket 连接始于 HTTP 升级请求，成功后协议切换为 ws:// 或 wss://。" },
        { question: "ws.readyState 属性用来做什么？", options: ["发送消息", "查看连接状态——0=连接中 1=已连接 2=关闭中 3=已关闭", "接收消息", "设置超时"], answer: 1, explanation: "readyState 告诉你 WebSocket 当前状态，发送消息前最好检查是不是 OPEN 状态。" },
        { question: "ws.onmessage = (event) => { console.log(event.data) } 监听了什么？", options: ["连接打开", "收到服务端发来的消息", "连接关闭", "连接错误"], answer: 1, explanation: "onmessage 回调在收到服务端推送的数据时触发，event.data 就是那条数据。" },
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
        { question: "AI 三大流派不包括哪个？", options: ["监督学习", "无监督学习", "强化学习", "量子学习"], answer: 3, explanation: "机器学习的三大范式是监督学习、无监督学习、强化学习，没有量子学习这个标准分类。" },
        { question: "深度学习（Deep Learning）的核心是什么？", options: ["规则引擎", "多层神经网络——用很多层神经元学习复杂特征", "决策树", "支持向量机"], answer: 1, explanation: "深度学习就是很多层神经网络——数据进去后逐层提取越来越高级的特征。" },
        { question: "过拟合 (overfitting) 是啥意思？", options: ["模型太简单", "模型在训练集上很好但在新数据上很差——死记硬背不会举一反三", "模型太小", "数据太少"], answer: 1, explanation: "过拟合就像学生背答案不学原理——训练数据准确率很高，但遇到没见过的题就翻车。" },
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
        { question: "监督学习和无监督学习的根本区别？", options: ["监督学习有 GPU", "监督学习有标注数据（知道答案），无监督学习没有标注", "无监督学习更准", "监督学习用于图像"], answer: 1, explanation: "监督学习的数据带标签（如猫/狗），无监督学习的数据没有标签全靠自己找模式。" },
        { question: "训练集和测试集的比例，常见的是？", options: ["50:50", "80:20 或 70:30——大部分训练小部分验证", "99:1", "随便分"], answer: 1, explanation: "大部分数据用来训练模型，留一小部分测试模型在没见过的数据上表现怎么样。" },
        { question: "混淆矩阵 (Confusion Matrix) 用来评估什么？", options: ["模型大小", "分类模型——真正/假正/真负/假负四个指标", "训练速度", "内存占用"], answer: 1, explanation: "混淆矩阵让你算出准确率、召回率、F1 分数等指标，知道模型在哪类数据上容易搞混。" },
        { question: "回归和分类的区别？", options: ["一样", "分类输出类别，回归输出连续数值", "回归输出类别", "分类输出数值"], answer: 1, explanation: "分类判断这是猫还是狗（离散），回归预测房价是多少万（连续数）。" },
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
        { question: "Pandas 在机器学习流程里主要做什么？", options: ["训练模型", "数据预处理——读取、清洗、转换数据", "模型部署", "画图"], answer: 1, explanation: "Pandas 负责前面脏活累活：读 CSV/数据库、处理缺失值、筛选列、分组聚合，准备好后交给 sklearn。" },
        { question: "scikit-learn 的 train_test_split 做什么？", options: ["训练模型", "把数据随机拆成训练集和测试集", "拟合数据", "评估模型"], answer: 1, explanation: "train_test_split 最简单直接地把数据集分成两部分——训练的做模型，测试的验效果。" },
        { question: "Matplotlib 和 Seaborn 的主要区别？", options: ["一样", "Seaborn 基于 Matplotlib 封装了更漂亮、更简单的统计图表 API", "Matplotlib 是 Python 标准库", "Seaborn 不支持 Pyplot"], answer: 1, explanation: "Seaborn 是 Matplotlib 的高级封装，默认样式就好看，几行代码出统计分布图/热力图。" },
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
        { question: "TensorFlow 里的张量 (Tensor) 是什么？", options: ["一种数据结构", "多维数组——类比 NumPy 的 ndarray", "模型文件", "回调函数"], answer: 1, explanation: "Tensor 就是张量——0 维是标量，1 维是向量，2 维是矩阵，N 维是张量。TensorFlow 就是「张量流动」。" },
        { question: "Keras 和 TensorFlow 什么关系？", options: ["竞争对手", "Keras 是 TensorFlow 的高层 API——写神经网络更方便", "Keras 是 C++ 库", "无关的两个东西"], answer: 1, explanation: "Keras 是 TensorFlow 的官方高层接口，用更简洁的代码构建和训练深度学习模型。" },
        { question: "model.compile(optimizer='adam', loss='mse') 在做什么？", options: ["保存模型", "配置训练过程——选优化器和损失函数", "加载数据", "评估模型"], answer: 1, explanation: "compile 是模型训练前的配置——决定用什么优化算法、损失函数怎么算、用哪些评估指标。" },
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
        { question: "PyTorch 跟 TensorFlow 最大的体验差异？", options: ["PyTorch 更快", "动态计算图——代码怎么写图怎么建，调试更自然", "PyTorch 不支持 GPU", "PyTorch 只有 C++ API"], answer: 1, explanation: "PyTorch 用动态计算图（define-by-run），每次前向传播重新建图，print 和 breakpoint 随便用。" },
        { question: "torch.nn.Module 是干嘛的？", options: ["数据处理", "神经网络的基类——所有模型都继承它", "优化器", "数据加载器"], answer: 1, explanation: "nn.Module 定义了神经网络的标准接口，你的模型继承它后写 __init__ 定义层，forward 定义前向传播。" },
        { question: "model.train() 和 model.eval() 的区别？", options: ["一样", "train 开启 dropout/batchnorm 等训练行为，eval 关闭它们用于推理", "eval 更快", "train 是必须的"], answer: 1, explanation: "一些层在训练和推理时行为不同——Dropout 训练时随机丢神经元、推理时不丢；BatchNorm 用训练集的均值方差、推理用全局统计值。" },
        { question: "optimizer.zero_grad() 为什么要先清梯度？", options: ["释放内存", "PyTorch 梯度默认累加——不清的话上一步的梯度加到这一步上", "加速", "习惯"], answer: 1, explanation: "PyTorch 的梯度是累加的，不手动清零的话每个 batch 的梯度会叠加上去，训练就乱套了。" },
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
        { question: "sklearn 里 fit() 方法做什么？", options: ["预测", "训练模型——用数据学习参数", "评估", "保存模型"], answer: 1, explanation: "fit(X, y) 是所有 sklearn 模型的统一接口——把特征 X 和标签 y 喂进去让模型学习。" },
        { question: "predict() 和 predict_proba() 的区别？", options: ["一样", "predict 返回类别标签，predict_proba 返回每个类的概率", "predict 更快", "predict_proba 只能用于回归"], answer: 1, explanation: "predict 直接告诉你分类结果，predict_proba 返回各类别的概率分布——如 [0.1, 0.9] 表示 90% 可能第二类。" },
        { question: "StandardScaler 做什么预处理？", options: ["填补缺失值", "标准化——让每列特征均值为 0 标准差为 1", "编码类别", "降维"], answer: 1, explanation: "特征尺度差异很大时（年收入 vs 年龄），StandardScaler 把它们缩放到同一量级，免得数值大的特征主导模型。" },
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
        { question: "NLP 中 tokenization 是什么？", options: ["加密", "分词——把文本切成一个个 token（词/子词）", "翻译", "情感分析"], answer: 1, explanation: "模型不认识整句文字，得先分词。英文按空格分就差不多，中文还得用 jieba 等分词工具。" },
        { question: "TF-IDF 是用来干什么的？", options: ["情感分析", "评估一个词对一篇文章的重要性——出现越多越重要但太普遍的词降权", "图像识别", "翻译"], answer: 1, explanation: "TF（词频）× IDF（逆文档频率）——词在本文频繁但在其他文章少见，权重就高。" },
        { question: "Word2Vec 输出的 word embedding 是什么？", options: ["分类标签", "稠密向量——把词映射到高维空间，相似语义的词向量接近", "概率值", "句子"], answer: 1, explanation: "把「猫」「狗」映射到相近的向量，把词语间的语义关系编码到数值向量里。" },
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
        { question: "LLM 的全称是什么？", options: ["Low Level Module", "Large Language Model（大语言模型）", "Logical Learning Method", "Local Language Machine"], answer: 1, explanation: "LLM 是大语言模型——用海量文本训练的巨型神经网络，如 GPT、Claude、LLaMA。" },
        { question: "Prompt Engineering 是什么意思？", options: ["写代码", "精心设计提示词——让 LLM 输出你想要的结果", "训练模型", "硬件优化"], answer: 1, explanation: "跟 LLM 说话也有技巧——指令清晰、给范例、角色设定，这些都能大幅提高输出质量。" },
        { question: "Token 在 LLM 里是什么概念？", options: ["词语", "模型处理文本的最小单位——一个单词或子词片断", "段落", "整个文档"], answer: 1, explanation: "LLM 不认字只认 token，「我喜欢编程」可能被切成 ['我', '喜欢', '编程'] 三个 token。按 token 计费。" },
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
        { question: "LangChain 主要解决什么问题？", options: ["部署模型", "编排 LLM 应用——把 LLM、检索、记忆、工具串成链", "训练模型", "量化模型"], answer: 1, explanation: "LangChain 是 LLM 应用的脚手架——帮你把各种外部数据源、工具、LLM 组合成复杂应用。" },
        { question: "LangChain 里的 Chain 是什么概念？", options: ["区块链", "把多个组件（LLM、检索器等）按顺序串起来的管道", "数据库连接", "API 接口"], answer: 1, explanation: "Chain 是 LangChain 的核心抽象——比如先查文档 → 把结果和用户问题一起喂给 LLM → 生成回答。" },
        { question: "RAG (Retrieval-Augmented Generation) 是什么？", options: ["一种模型架构", "先检索相关文档再让 LLM 基于检索结果生成回答", "微调方法", "数据清洗"], answer: 1, explanation: "RAG 先搜数据库/向量库找到相关上下文，然后把上下文+问题一起给 LLM，目的是减少幻觉。" },
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
        { question: "Multi-Agent 系统中，层级式协作指的是？", options: ["Agents 平等讨论", "一个管理者分配任务给多个工人 Agent", "Agent 独立工作", "轮流做主"], answer: 1, explanation: "层级式像管理者和员工——一个主导 Agent 分配子任务给专门的 Agent，最后汇总结果。" },
        { question: "Agent 里的 ReAct 模式是什么意思？", options: ["React 框架", "Reasoning + Acting——推理和行动交替进行", "反应式编程", "重新激活"], answer: 1, explanation: "ReAct 让 Agent 交替进行思考和行动：先推理下一步怎么做，再执行动作看结果，循环直到完成目标。" },
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
        { question: "OpenCV 里 cv2.imread() 返回什么？", options: ["文件对象", "NumPy 数组——图像的像素矩阵", "PIL 图片", "Base64 字符串"], answer: 1, explanation: "imread 把图片读成 NumPy 数组（高度、宽度、通道），可以直接用数学方法处理像素。" },
        { question: "cv2.cvtColor(img, cv2.COLOR_BGR2RGB) 做了什么？", options: ["压缩图片", "色彩空间转换——OpenCV 默认 BGR 转成 RGB", "裁剪图片", "旋转图片"], answer: 1, explanation: "OpenCV 读进来是 BGR 顺序，matplotlib/PIL 是 RGB 顺序，不转的话显示颜色不对。" },
        { question: "高斯模糊 GaussianBlur 的实际用途？", options: ["增强色彩", "去除图像噪点——模糊掉高频噪声", "检测边缘", "放大图像"], answer: 1, explanation: "模糊（滤波）消除图像里的随机噪点，让后续的边缘检测、识别更准确。" },
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
        { question: "MLOps 的全称是什么？", options: ["Machine Learning Operations", "Model Language Operations", "Multi-Layer Operations", "Machine Language on Platform"], answer: 0, explanation: "MLOps 是 DevOps 在机器学习领域的扩展——把模型训练、测试、部署、监控标准化自动化。" },
        { question: "模型 drift（漂移）是什么意思？", options: ["模型移动", "模型上线后数据分布发生变化性能下降", "参数更新", "GPU 漂移"], answer: 1, explanation: "训练时的数据分布和上线后的真实数据差异越来越大，模型越来越不准，需要持续监控和重训练。" },
        { question: "CI/CD 在 MLOps 中的含义？", options: ["仅部署", "持续集成/持续交付——自动化测试、构建、部署模型流水线", "数据清洗", "模型训练"], answer: 1, explanation: "CI/CD 让模型迭代自动化——代码提交后自动跑测试、打包镜像、部署到生产环境。" },
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
        { question: "Flutter 用什么语言开发？", options: ["Java", "Dart", "Kotlin", "Swift"], answer: 1, explanation: "Flutter 使用 Google 开发的 Dart 语言，前端 UI 和后端逻辑都可以用 Dart 写。" },
        { question: "Flutter 里「一切皆 widget」是什么意思？", options: ["widget 就是按钮", "UI 的每个部件都是 widget——按钮、布局、文字、甚至应用本身", "只用于 iOS", "widget 是数据库"], answer: 1, explanation: "Flutter 的 UI 由 widget 树构成——从整页到一个小图标全是 widget，嵌套组合构建界面。" },
        { question: "Hot Reload 是什么？", options: ["重启应用", "代码改了立即在设备上预览 UI 变化——不用重新编译", "热更新", "性能分析"], answer: 1, explanation: "Hot Reload 是 Flutter 开发体验的王牌——改完代码一两秒就看到效果，极大加速 UI 迭代。" },
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
        { question: "Kotlin 被谁钦定为 Android 首选开发语言？", options: ["Oracle", "Google", "Apple", "Microsoft"], answer: 1, explanation: "2019 年 Google 宣布 Kotlin 为 Android 开发的首选语言，跟 Java 互操作。" },
        { question: "Kotlin 的 ? 语法（如 String?）表示什么？", options: ["字符串", "可空类型——这个变量可以为 null", "可选参数", "泛型"], answer: 1, explanation: "? 告诉编译器「这个变量可能为 null」，强制你做空检查，从根本上减少 NPE。" },
        { question: "data class User(val name: String) 中的 data 关键字做什么？", options: ["公开类", "自动生成 equals/hashCode/toString/copy 方法", "单例", "抽象类"], answer: 1, explanation: "data class 是专存数据的类——编译器自动生成 getter、equals、hashCode、toString、copy，省掉大量样板代码。" },
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
        { question: "StatelessWidget 和 StatefulWidget 的区别？", options: ["一样", "StatelessWidget 自身没状态不变，StatefulWidget 能维护可变状态", "Stateful 更快", "Stateless 是旧版"], answer: 1, explanation: "静态界面用 StatelessWidget；需要响应用户操作、数据变化要重渲染的用 StatefulWidget。" },
        { question: "setState(() { count++; }) 做了什么？", options: ["初始化", "通知 Flutter 状态变了——触发 UI 重建刷新界面", "清理内存", "保存数据"], answer: 1, explanation: "setState 是 StatefulWidget 刷新 UI 的方法——改完状态数据后调用，Flutter 自动重绘相关部分。" },
        { question: "build(BuildContext context) 方法返回什么？", options: ["空", "Widget——描述当前状态的 UI", "字符串", "bool"], answer: 1, explanation: "build 方法根据当前状态返回一个新的 widget 树，Flutter 引擎比较新旧差异只更新改变的部分。" },
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
        { question: "React Native 和 Flutter 本质区别？", options: ["语言不同", "RN 调用原生组件跨平台通信桥，Flutter 画自己的引擎渲染", "RN 不能做 iOS", "Flutter 用 JavaScript"], answer: 1, explanation: "RN 通过 Bridge 调用 iOS/Android 原生 UI 组件；Flutter 自绘引擎 Skia——UI 完全自己画不用系统组件。" },
        { question: "React Native 里 View 相当于 HTML 的什么？", options: ["<span>", "<div>——布局的基本容器", "<p>", "<img>"], answer: 1, explanation: "View 是最基础的布局容器，对应 div，Text 对应 p，Image 对应 img。" },
        { question: "React Native 怎么实现跨平台？", options: ["WebView", "同一套 JS/React 代码，通过桥接层调用 iOS/Android 原生组件", "模拟器", "转译器"], answer: 1, explanation: "JS 代码运行在单独的线程，通过 Bridge 把 UI 指令发到原生侧，原生侧负责渲染。" },
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
        { question: "Swift 谁创建的？", options: ["Google", "Apple——替代 Objective-C 的 iOS/macOS 新语言", "Microsoft", "Oracle"], answer: 1, explanation: "Apple 2014 年发布 Swift 来替代 Objective-C，更现代、更安全、更快。" },
        { question: "var 和 let 的区别？", options: ["一样", "var 声明可变变量，let 声明不可变常量", "let 更快", "var 是旧语法"], answer: 1, explanation: "Swift 鼓励用 let——能不变的尽量不变，减少可变状态带来的 bug。" },
        { question: "Swift 的 Optionals（?）解决了什么问题？", options: ["性能", "空值安全——编译器强制你处理 nil 而不是运行时崩溃", "兼容性", "语法糖"], answer: 1, explanation: "? 表示值可能为 nil，编译器要求你必须解包或用 ?? 给默认值，从源头杜绝 NPE。" },
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
        { question: "Android 的四大组件不包括哪个？", options: ["Activity", "Service", "BroadcastReceiver", "ViewModel"], answer: 3, explanation: "四大组件：Activity(界面)、Service(后台)、BroadcastReceiver(广播)、ContentProvider(数据共享)。ViewModel 是架构组件。" },
        { question: "Activity 的生命周期中 onCreate 做什么？", options: ["销毁界面", "Activity 创建时初始化——setContentView 加载布局", "暂停时", "停止时"], answer: 1, explanation: "onCreate 是 Activity 生命周期的入口，做初始化工作——加载布局、找控件、设置数据。" },
        { question: "Gradle 在 Android 开发中做什么？", options: ["写代码", "构建工具——编译、打包、管理依赖", "测试工具", "UI 设计器"], answer: 1, explanation: "Gradle 负责项目的构建管理——编译代码、打包成 APK、下载依赖库，相当于 Java 的 Maven。" },
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
        { question: "SwiftUI 和 UIKit 的关系？", options: ["相同", "SwiftUI 是新一代声明式 UI 框架，UIKit 是传统的命令式框架", "UIKit 是新框架", "SwiftUI 只能 iOS"], answer: 1, explanation: "SwiftUI 是 2019 年推出的声明式 UI 框架，用更简洁的代码描述界面，逐步替代 UIKit。" },
        { question: "@State 属性包装器干什么的？", options: ["持久化", "标记一个变量是状态源——变了自动刷新 UI", "网络请求", "数据存储"], answer: 1, explanation: "@State 是 SwiftUI 响应式 UI 的核心——View 中标记的变量值一改，SwiftUI 自动重新计算 body。" },
        { question: "VStack 和 HStack 分别表示什么？", options: ["列表和网格", "垂直堆叠和水平堆叠布局", "滚动视图和静态视图", "导航和标签"], answer: 1, explanation: "VStack 垂直排列子视图，HStack 水平排列——SwiftUI 最基础的布局组件。" },
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
        { question: "C 语言中 printf 函数在哪个头文件？", options: ["<string.h>", "<stdio.h>", "<stdlib.h>", "<math.h>"], answer: 1, explanation: "printf 声明在 stdio.h（标准输入输出头文件）中。" },
        { question: "int *p = &x; 里 & 什么意思？", options: ["逻辑与", "取地址——拿到变量 x 的内存地址", "引用", "位运算"], answer: 1, explanation: "& 是取地址运算符，&x 返回 x 的内存地址，赋给指针 p。" },
        { question: "malloc 分配的堆内存在不用后需要？", options: ["自动释放", "手动 free() 释放——否则内存泄漏", "等程序退出", "不需要管"], answer: 1, explanation: "C 没有垃圾回收，堆上 malloc 的内存必须用 free() 显式释放，忘了就是内存泄漏。" },
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
        { question: "C++ 相对于 C 最大的新特性是？", options: ["指针", "面向对象——类、继承、多态", "内存管理", "结构体"], answer: 1, explanation: "C++ 在 C 基础上加了面向对象——class、封装、继承、多态，还有模板、引用等。" },
        { question: "new 和 delete 做什么用的？", options: ["跟 malloc 一样", "C++ 的对象创建和销毁——new 自动调用构造，delete 自动调用析构", "只是语法糖", "new 是 C 的"], answer: 1, explanation: "new 不仅分配内存还调构造函数初始化对象；delete 调析构函数做清理再释放内存。" },
        { question: "std::vector 相比原生数组的优势？", options: ["一样", "动态扩容、自动管理内存、提供 push_back/size 等便捷方法", "速度更快", "更省内存"], answer: 1, explanation: "vector 是动态数组——不用预先定死大小，往里加数据自动扩容，RAII 管理内存安全。" },
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
        { question: "go funcName() 这句做了什么？", options: ["调用函数", "启动一个 goroutine 并发执行函数", "等待函数结束", "同步函数"], answer: 1, explanation: "go 关键字启动一个轻量协程，新 goroutine 并发执行不阻塞当前流程。" },
        { question: "channel 的主要作用是？", options: ["管道", "goroutine 之间安全通信——发送和接收数据", "文件操作", "错误处理"], answer: 1, explanation: "channel 是 Go 的通信机制——不要通过共享内存来通信，要通过通信来共享内存。" },
        { question: "select 语句用来做什么？", options: ["条件判断", "监听多个 channel——哪个先有数据就处理哪个", "循环", "错误处理"], answer: 1, explanation: "select 类似 switch 但专用于 channel——同时监听多个 channel 就绪状态，先到先处理。" },
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
        { question: "Ruby 的设计哲学是什么？", options: ["性能优先", "程序员的快乐——代码读起来像自然语言", "类型安全", "简洁性"], answer: 1, explanation: "Ruby 的核心理念是开发者体验——代码尽量自然、人性化，让你写得开心。" },
        { question: "Ruby 里符号 :symbol 和字符串 \"string\" 的区别？", options: ["一样", "符号是不可变的轻量标识符，常作为 hash 的键", "符号是老语法", "符号更快"], answer: 1, explanation: "符号是唯一的不可变对象——内存中相同 :name 只有一份；字符串每次都是新对象。" },
        { question: "do...end 和 { } 块的本质是什么？", options: ["循环", "闭包——可以传递给方法的代码块", "注释", "字符串"], answer: 1, explanation: "块是 Ruby 的灵魂——方法调用时附带一段代码，方法内部用 yield 回调这个块。" },
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
        { question: "Lua 最广泛应用在哪个领域？", options: ["Web 开发", "游戏脚本和嵌入式——如 Redis/Nginx 扩展、魔兽世界插件", "数据科学", "移动开发"], answer: 1, explanation: "Lua 设计初衷就是嵌入式脚本语言——小、快、易集成，游戏引擎和工具扩展领域绝对统治。" },
        { question: "Lua 唯一的数据结构是？", options: ["数组", "表 (table)——兼具数组和字典功能", "链表", "树"], answer: 1, explanation: "Lua 核心只有 table 一种——把它当下标整数就是数组，当字符串键就是字典，万物皆表。" },
        { question: "Lua 里 -- 和 --[[ ]] 分别表示？", options: ["单行和多行注释", "单行注释和块注释", "字符串和多行字符串", "函数和类"], answer: 1, explanation: "-- 单行注释，--[[ 开头 ]]-- 结尾的是多行大块注释。" },
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
        { question: "Scala 语言名字由哪两个词组合？", options: ["Scalable + Language", "Script + Java", "Scalar + Lambda", "Scale + Algebra"], answer: 0, explanation: "Scala = Scalable Language——可扩展的语言，天生融合面向对象和函数式编程。" },
        { question: "val 和 var 的区别？", options: ["一样", "val 是不可变值（final），var 是可变量", "var 更快", "val 是局部变量"], answer: 1, explanation: "Scala 鼓励用 val 声明不可变值——函数式编程的原则是尽量减少可变状态。" },
        { question: "case class Person(name: String) 中的 case 关键字做什么？", options: ["没啥用", "自动生成 equals/hashCode/toString/copy，支持模式匹配", "创建单例", "私有类"], answer: 1, explanation: "case class 编译器自动帮你生成一堆样板方法，还是模式匹配的基础。" },
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
        { question: "Perl 最擅长处理什么？", options: ["图形界面", "文本处理——正则表达式、日志分析、报告生成", "计算密集", "移动开发"], answer: 1, explanation: "Perl 的文本处理能力在脚本语言里是王者级别的——正则引擎无比强大，曾经的 CGI 时代王者。" },
        { question: "Perl 里 $ 和 @ 开头的变量区别？", options: ["一样", "$ 是标量（单个值），@ 是数组", "@ 是标量", "$ 是数组"], answer: 1, explanation: "Perl 变量用符号区分类型——$ 标量、@ 数组、% 哈希，强迫症狂喜。" },
        { question: "chomp 函数做什么？", options: ["数值运算", "去除字符串末尾的换行符", "拼接字符串", "分割字符串"], answer: 1, explanation: "chomp 专门去掉字符串末尾的换行符 \n——读取文件后标准操作。" },
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
        { question: "Dart 是谁开发的？", options: ["Apple", "Google——Flutter 配套语言", "Microsoft", "Oracle"], answer: 1, explanation: "Dart 是 Google 开发的，最知名的用途就是作为 Flutter 的唯一开发语言。" },
        { question: "Dart 里 final 和 const 的区别？", options: ["一样", "final 是运行时常量（只设一次），const 是编译时常量（值完全不变）", "const 更慢", "final 不能用于类"], answer: 1, explanation: "final 可以设一次值但值在运行时确定；const 必须在编译时就知道值是什么。" },
        { question: "Dart 的 null safety 特性是什么？", options: ["性能优化", "默认所有类型不能为 null——要可空必须显式加 ?", "垃圾回收", "并发模型"], answer: 1, explanation: "Dart 2.12 引入空安全——String 不能为 null，String? 才可以是 null，编译器帮你避免空指针。" },
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
        { question: "栈 (Stack) 遵循什么原则？", options: ["FIFO", "LIFO——后进先出", "随机访问", "按优先级"], answer: 1, explanation: "栈像一摞盘子——最后放上去的最先拿出来。函数调用栈、撤销操作都是栈的典型应用。" },
        { question: "哈希表查找复杂度是？", options: ["O(n)", "O(1)——平均常数时间直接定位", "O(log n)", "O(n^2)"], answer: 1, explanation: "哈希函数直接算出位置——理想状态下一步到位 O(1)，冲突多退化为链表可能到 O(n)。" },
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
        { question: "二分查找的前提条件？", options: ["数据要排序", "数据必须已排序且支持随机访问", "数据要哈希", "数据要小"], answer: 1, explanation: "二分查找每次砍半——前提是数据必须有序，且能快速跳转到中间索引。" },
        { question: "动态规划的核心思想？", options: ["贪心", "把大问题拆成重叠子问题——存中间结果避免重复计算", "随机", "分组"], answer: 1, explanation: "DP 就是带记忆的递归——子问题算过一次就记下来，下次直接查表不重算。" },
        { question: "BFS 和 DFS 的区别？", options: ["一样", "BFS 层层外扩用队列，DFS 一条路走到头用栈/递归", "BFS 更快", "DFS 总有解"], answer: 1, explanation: "广度优先逐层探索（找最短路径），深度优先一根筋走到底（回溯、排列组合问题）。" },
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
        { question: "单例模式 (Singleton) 保证什么？", options: ["多个实例", "一个类全局只有一个实例", "每次创建新对象", "隐藏实现"], answer: 1, explanation: "单例确保一个类有且只有一个实例并提供全局访问点——如数据库连接池、日志管理器。" },
        { question: "观察者模式 (Observer) 用在什么场景？", options: ["计算", "一对多通知——一个对象变化自动通知所有依赖", "数据存储", "加密"], answer: 1, explanation: "发布-订阅就是观察者模式——如 Vue 的响应式数据变化后自动通知视图更新。" },
        { question: "工厂模式解决什么问题？", options: ["性能", "把对象创建抽象化——调用方不用知道具体创建哪个类的实例", "内存", "网络"], answer: 1, explanation: "工厂封装了创建对象的逻辑——根据参数返回不同子类实例，客户端只管用不管创建细节。" },
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
        { question: "\\\\b 在正则中代表什么？", options: ["空格", "单词边界——匹配单词开头或结尾的位置", "退格符", "换行"], answer: 1, explanation: "\\\\b 不是匹配一个字符而是边界位置——\\\\bcat\\\\b 只匹配完整的 'cat'，不匹配 'category' 里的 cat。" },
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
        { question: "HTTP/2 相比 HTTP/1.1 最大的改进？", options: ["更安全", "多路复用——一个连接并发处理多个请求", "请求体更大", "新状态码"], answer: 1, explanation: "HTTP/1.1 一个连接一次只能处理一个请求（队头阻塞）。HTTP/2 二进制分帧后一个连接同时传多个请求/响应。" },
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
        { question: "TCP 的滑动窗口协议解决什么？", options: ["连接管理", "流量控制——收方根据自己的处理能力控制发方的发送速度", "加密", "路由"], answer: 1, explanation: "滑动窗口让接收方能动态调整窗口大小，告诉发送方「我还能处理多少数据」——防止溢出了丢包。" },
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
        { question: "进程和线程最核心的区别？", options: ["线程更快", "进程拥有独立内存空间，线程共享进程内存", "线程是进程的子集", "进程更小"], answer: 1, explanation: "进程是资源分配的最小单位（独立内存），线程是 CPU 调度的最小单位（共享内存）。" },
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
        { question: "编译器前端主要做什么？", options: ["代码生成", "词法分析 -> 语法分析 -> 语义分析（生成中间代码）", "代码优化", "链接"], answer: 1, explanation: "前端把源码转换成中间表示——词法分析拆 token、语法分析建 AST、语义分析检查类型。" },
      ],
    },
  },

  _fallback: {
    "c-memory": {
      slug: "c-memory",
      sections: [
        {
          title: "栈和堆的区别",
          content: "C 语言内存分四大区：栈、堆、全局区、代码区。栈是编译器自动管理的，函数调用时分配局部变量，返回时自动释放，非常快但空间有限。堆是程序员手动管理的，用 malloc 申请 free 释放，空间大但容易内存泄漏。理解栈和堆是 C 程序员的基本功。",
          code: "#include <stdio.h>\n#include <stdlib.h>\n\nint global_var = 100; // 全局区\n\nint main() {\n    int stack_var = 42;     // 栈上分配\n    \n    // 堆上分配\n    int *heap_var = (int*)malloc(sizeof(int));\n    *heap_var = 99;\n    \n    printf(\"栈变量: %d\\n\", stack_var);\n    printf(\"堆变量: %d\\n\", *heap_var);\n    printf(\"全局变量: %d\\n\", global_var);\n    \n    free(heap_var); // 别忘了释放！\n    return 0;\n}",
          language: "c",
          warning: "malloc 和 free 必须配对，忘 free 就内存泄漏，free 两次就 double free 崩溃。",
        },
        {
          title: "malloc、calloc、realloc、free",
          content: "malloc 分配指定字节数的内存，不初始化（里面是垃圾值）。calloc 分配并初始化为零，适合数组。realloc 调整已分配的内存大小（扩容或缩容），可能移动内存块地址。free 释放内存，指针 free 后最好置为 NULL 防止野指针。",
          code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // malloc: 分配不初始化\n    int *p1 = (int*)malloc(5 * sizeof(int));\n    // 此时 p1[0] 的值不确定（垃圾值）\n    \n    // calloc: 分配并初始化为0\n    int *p2 = (int*)calloc(5, sizeof(int));\n    // p2[0] 到 p2[4] 都是 0\n    \n    // realloc: 扩容\n    int *p3 = (int*)malloc(3 * sizeof(int));\n    p3 = (int*)realloc(p3, 10 * sizeof(int));\n    \n    // 释放\n    free(p1); free(p2); free(p3);\n    p1 = p2 = p3 = NULL; // 好习惯\n    \n    return 0;\n}",
          language: "c",
          tip: "malloc 的参数可以算 sizeof：malloc(num * sizeof(int))，不管什么平台都不会出错。",
        },
        {
          title: "动态分配数组和结构体",
          content: "用 malloc 分配数组比定长数组灵活，运行时才知道需要多大。动态分配结构体也很常见，比如链表的节点、树的节点。分配时别忘了 sizeof，二维数组可以用指针数组实现，每一行单独 malloc，行之间内存不连续但灵活。",
          code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\ntypedef struct Node Node;\n\nNode* create_node(int data) {\n    Node *node = (Node*)malloc(sizeof(Node));\n    node->data = data;\n    node->next = NULL;\n    return node;\n}\n\nint main() {\n    int n = 5;\n    int *arr = (int*)malloc(n * sizeof(int));\n    for (int i = 0; i < n; i++) arr[i] = i * 10;\n    \n    // 二维数组（指针数组）\n    int rows = 3, cols = 4;\n    int **matrix = (int**)malloc(rows * sizeof(int*));\n    for (int i = 0; i < rows; i++) {\n        matrix[i] = (int*)malloc(cols * sizeof(int));\n    }\n    \n    // 使用...\n    matrix[1][2] = 99;\n    \n    // 释放二维数组\n    for (int i = 0; i < rows; i++) free(matrix[i]);\n    free(matrix); free(arr);\n    \n    return 0;\n}",
          language: "c",
        },
        {
          title: "常见内存错误",
          content: "C 语言最折磨人的就是内存错误，没有垃圾回收全靠自己管。常见五种：忘记 free（内存泄漏）、double free（重复释放崩溃）、野指针（用已经 free 了的指针）、越界访问（数组索引超出范围破坏其他数据）、缓冲区溢出（strcpy 拷贝超长字符串覆盖了返回地址）。valgrind 是查内存问题的神器。",
          code: "#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    // 1. 内存泄漏 - 忘了 free\n    int *p1 = malloc(100);\n    // 没有 free(p1) - 泄漏!\n    \n    // 2. 野指针 - free 后还用\n    int *p2 = malloc(100);\n    free(p2);\n    *p2 = 10; // 危险！野指针\n    \n    // 3. 缓冲区溢出\n    char buf[10];\n    strcpy(buf, \"这个字符串太长了超过了10个字节\"); // 溢出！\n    \n    // 4. 越界访问\n    int arr[5];\n    arr[10] = 100; // 越界到未知区域\n    \n    return 0;\n}",
          language: "c",
          warning: "内存泄漏在小程序里不明显，但服务端长期运行会慢慢耗尽内存导致崩溃。每次 malloc 都要想清楚谁负责 free。",
        },
        {
          title: "智能的内存管理实践",
          content: "好的习惯能避免大部分内存问题：malloc 后立刻检查是否返回 NULL（分配失败）；free 后把指针置 NULL；定义一个 xxx_free 函数集中释放资源；使用内存池减少碎片；避免深层嵌套指针，能栈分配的不用堆。配合 valgrind --leak-check=full 工具检查泄漏。",
          code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct User {\n    char *name;\n    int age;\n};\n\ntypedef struct User User;\n\nUser* user_new(const char *name, int age) {\n    User *u = malloc(sizeof(User));\n    if (u == NULL) return NULL; // 检查分配失败\n    u->name = malloc(strlen(name) + 1);\n    if (u->name == NULL) { free(u); return NULL; }\n    strcpy(u->name, name);\n    u->age = age;\n    return u;\n}\n\nvoid user_free(User *u) {\n    if (u == NULL) return;\n    free(u->name);\n    free(u);\n}\n\nint main() {\n    User *u = user_new(\"小明\", 18);\n    if (u == NULL) return 1;\n    printf(\"%s, %d\\n\", u->name, u->age);\n    user_free(u);\n    // 检查: valgrind --leak-check=full ./program\n    return 0;\n}",
          language: "c",
          tip: "每个数据结构写一对 new/free 函数，养成习惯后内存管理会清晰很多。",
        },
      ],
      quiz: [
        {
          question: "malloc 和 calloc 的主要区别？",
          options: ["没有区别", "calloc 分配后初始化为零，malloc 不初始化", "malloc 更快", "calloc 分配的更多"],
          answer: 1,
          explanation: "calloc 会将分配的内存全部初始化为零，malloc 内存内容是未定义的。",
        },
        {
          question: "free 之后指针应该怎么处理？",
          options: ["不管", "置为 NULL 防止野指针", "继续使用", "重新赋值"],
          answer: 1,
          explanation: "free 后置 NULL 能防止误用已释放的指针（虽然解引用 NULL 也会崩溃但更容易定位）。",
        },
        {
          question: "二级指针动态二维数组释放的正确顺序？",
          options: ["直接 free 最外层", "先 free 每一行，再 free 最外层指针数组", "不需要释放", "顺序任意"],
          answer: 1,
          explanation: "先释放每一行的内存，最后释放存放行指针的数组，顺序反了会泄漏。",
        },
        {
          question: "如何检测 C 程序的内存泄漏？",
          options: ["肉眼检查", "使用 valgrind 工具", "看代码注释", "编译选项 -Wall"],
          answer: 1,
          explanation: "valgrind 是 Linux 下经典的 C/C++ 内存检测工具，能发现泄漏和越界。",
        },
      ],
    },
    "c-pointers": {
      slug: "c-pointers",
      sections: [
        {
          title: "什么是指针",
          content: "指针就是存内存地址的变量。就像快递地址，指针里存的是某个东西放在内存里的哪个位置。声明指针用星号，取地址用 &，解引用用 *（到那个地址去拿东西）。理解指针是 C 语言最重要的基本功，数组、字符串、动态内存都和指针有关。",
          code: "#include <stdio.h>\n\nint main() {\n    int a = 42;\n    int *p = &a;     // p 存的是 a 的地址\n    \n    printf(\"a 的值: %d\\n\", a);       // 42\n    printf(\"a 的地址: %p\\n\", &a);    // 某个地址如 0x7fff...\n    printf(\"p 存的值(地址): %p\\n\", p);\n    printf(\"p 指向的值: %d\\n\", *p);  // 42\n    \n    *p = 100;       // 通过指针修改 a 的值\n    printf(\"a 的新值: %d\\n\", a);     // 100\n    \n    return 0;\n}",
          language: "c",
          tip: "星号在声明时表示这个变量是指针，在使用时表示解引用。",
        },
        {
          title: "指针运算和数组",
          content: "数组名本身就是指向第一个元素的指针。arr[i] 本质上是 *(arr + i)，编译器帮你翻译了。指针加减整数会移动指针的位置，移动的字节数是类型大小乘以整数。指针相减得到两个地址之间隔了几个元素。空指针用 NULL 表示，解引用 NULL 会直接崩溃。",
          code: "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int *p = arr;      // 指向第一个元素\n    \n    printf(\"%d\\n\", *p);        // 10\n    printf(\"%d\\n\", *(p + 1));  // 20 - 指针+1跳到下一个int\n    printf(\"%d\\n\", p[2]);      // 30 - 等价于*(p+2)\n    \n    // 遍历数组\n    for (int *ptr = arr; ptr < arr + 5; ptr++) {\n        printf(\"%d \", *ptr);   // 10 20 30 40 50\n    }\n    \n    // 指针相减\n    int *p1 = &arr[4];\n    int *p2 = &arr[1];\n    printf(\"相隔 %ld 个元素\\n\", p1 - p2); // 3\n    \n    return 0;\n}",
          language: "c",
          warning: "指针运算超出了数组边界（越界），读到的是垃圾数据，写到外面可能破坏其他变量。",
        },
        {
          title: "指针和函数",
          content: "C 语言函数参数是值传递的，传进去的是副本。如果函数里要修改外部的变量，必须传指针（传地址）。swap 交换函数是最经典的例子。指针作为返回值时要小心，不能返回局部变量的地址，因为函数返回后局部变量就释放了。",
          code: "#include <stdio.h>\n\n// 值传递 - 改不了\nvoid bad_swap(int a, int b) {\n    int tmp = a;\n    a = b;\n    b = tmp;\n}\n\n// 指针传递 - 可以改\nvoid swap(int *a, int *b) {\n    int tmp = *a;\n    *a = *b;\n    *b = tmp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf(\"x=%d, y=%d\\n\", x, y); // x=20, y=10\n    \n    return 0;\n}",
          language: "c",
          tip: "需要修改外部变量时传指针，这是 C 语言里最常见的指针用途。",
        },
        {
          title: "指针数组和数组指针",
          content: "指针数组是存指针的数组：int *arr[5]。数组指针是指向数组的指针：int (*p)[5]，括号不能省因为 [] 优先级比 * 高。最常用的是字符串数组：char *arr[] 存了一堆字符串的指针。main 函数的参数 char *argv[] 就是一个指针数组。",
          code: "#include <stdio.h>\n\nint main() {\n    // 指针数组：每个元素是一个指针\n    const char *strs[] = {\"C语言\", \"指针\", \"数组\"};\n    for (int i = 0; i < 3; i++) {\n        printf(\"%s\\n\", strs[i]);\n    }\n    \n    // 数组指针：指向一整个数组\n    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    int (*p)[3] = matrix; // p 指向有3个int的数组\n    \n    printf(\"%d\\n\", p[0][1]); // 2\n    printf(\"%d\\n\", p[1][2]); // 6\n    \n    return 0;\n}",
          language: "c",
          tip: "读 C 声明有个技巧：从名字开始，先看右边再看左边。int *p[5]：p 是数组（先看右边[5]），数组里存的是指针（再看左边*）。",
        },
        {
          title: "函数指针",
          content: "函数指针存的是函数的入口地址。声明语法有点奇怪：返回值 (*指针名)(参数列表)。用某个函数名赋值，通过指针名调函数。函数指针常用作回调函数，比如 qsort 排序时要传一个比较函数，信号处理注册回调，还有模仿面向对象的多态。",
          code: "#include <stdio.h>\n#include <stdlib.h>\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\n\n// 函数指针作为参数\nint calculate(int (*op)(int, int), int x, int y) {\n    return op(x, y);\n}\n\n// qsort 比较函数\nint compare(const void *a, const void *b) {\n    return *(int*)a - *(int*)b;\n}\n\nint main() {\n    int (*func)(int, int); // 函数指针声明\n    func = add;\n    printf(\"add: %d\\n\", func(3, 5)); // 8\n    \n    func = sub;\n    printf(\"sub: %d\\n\", func(3, 5)); // -2\n    \n    printf(\"calc: %d\\n\", calculate(add, 10, 20)); // 30\n    \n    // qsort 使用\n    int arr[] = {5, 2, 8, 1, 3};\n    qsort(arr, 5, sizeof(int), compare);\n    \n    return 0;\n}",
          language: "c",
          tip: "函数指针的声明看起来很复杂，可以用 typedef 简化：typedef int (*Operation)(int, int);",
        },
      ],
      quiz: [
        {
          question: "C 语言中取变量的地址用什么运算符？",
          options: ["*", "&", "#", "@"],
          answer: 1,
          explanation: "& 是取地址运算符，获取变量在内存中的地址。",
        },
        {
          question: "int arr[5]; arr 和 &arr[0] 的关系？",
          options: ["完全不同", "arr 就等于 &arr[0]，都是首元素地址", "arr 是第二个元素的地址", "arr 是数组大小"],
          answer: 1,
          explanation: "数组名会自动退化为指向首元素的指针，等于 &arr[0]。",
        },
        {
          question: "函数里想修改外部 int 变量，参数应该传什么？",
          options: ["传值", "传指针（int *）", "传引用（int &）", "声明为全局变量"],
          answer: 1,
          explanation: "C 语言是值传递，要修改外部变量必须传指针，通过解引用修改。",
        },
        {
          question: "不能返回局部变量的地址，为什么？",
          options: ["编译错误", "函数返回后局部变量被释放，地址指向无效内存", "语法不允许", "返回后地址会改变"],
          answer: 1,
          explanation: "局部变量在栈上，函数返回后栈空间回收，这个地址已经是无效的了。",
        },
      ],
    },
    "cpp-modern": {
      slug: "cpp-modern",
      sections: [
        {
          title: "auto 和类型推导",
          content: "auto 让编译器自动推断变量类型，你懒得写 long long 类型名的时候特别好用。声明变量时如果马上初始化，用 auto 编译器自己猜。auto 不会推断引用和 const，需要自己加 auto& 或 const auto&。遍历容器时 for (const auto& x : vec) 是标准写法。",
          code: "#include <vector>\n#include <map>\n\nint main() {\n    auto i = 42;          // int\n    auto d = 3.14;        // double\n    auto s = \"hello\";     // const char*\n    \n    std::vector<int> v = {1, 2, 3};\n    auto it = v.begin();  // std::vector<int>::iterator\n    \n    std::map<std::string, int> m;\n    for (const auto& [k, v] : m) {  // C++17 结构化绑定\n        // k 是键, v 是值\n    }\n    \n    // auto 不推导引用\n    int x = 10;\n    auto y = x;   // int, 不是 int&\n    auto& z = x;  // int&\n    \n    return 0;\n}",
          language: "cpp",
          tip: "auto 让模板类型的迭代器和 lambda 声明变得简洁无比，但基本类型用 auto 反而降低可读性。",
        },
        {
          title: "lambda 匿名函数",
          content: "Lambda 就是现场写的匿名函数，三个部分：捕获列表（[]）、参数列表、函数体。捕获列表决定外面的变量怎么传进来：= 值捕获只读，& 引用捕获可改，[x] 只捕 x，[this] 捕当前对象成员。mutable 让值捕获的变量也能修改。最常用于 STL 算法和回调。",
          code: "#include <vector>\n#include <algorithm>\n#include <iostream>\n\nint main() {\n    int threshold = 5;\n    \n    // 基本 lambda\n    auto add = [](int a, int b) { return a + b; };\n    std::cout << add(3, 5) << \"\\n\";\n    \n    // 捕获外部变量\n    std::vector<int> v = {1, 2, 3, 4, 5, 6};\n    int count = std::count_if(v.begin(), v.end(),\n        [threshold](int x) { return x > threshold; }\n    );\n    \n    // 引用捕获 - 可以修改外部变量\n    int sum = 0;\n    std::for_each(v.begin(), v.end(),\n        [&sum](int x) { sum += x; }\n    );\n    \n    // 泛型 lambda (C++14)\n    auto generic = [](auto a, auto b) { return a + b; };\n    \n    return 0;\n}",
          language: "cpp",
          tip: "lambda 本质上是一个匿名函数对象（仿函数），[] 里什么都不写就等同于普通函数。",
        },
        {
          title: "智能指针",
          content: "C++11 引入了三种智能指针，告别手动 new/delete。unique_ptr 独占所有权，只能移动不能复制，离开作用域自动 delete。shared_ptr 共享所有权，引用计数归零时释放，用 make_shared 创建最高效。weak_ptr 用来打破 shared_ptr 循环引用，不增加引用计数。",
          code: "#include <memory>\n#include <iostream>\n\nclass Resource {\npublic:\n    Resource() { std::cout << \"构造\\n\"; }\n    ~Resource() { std::cout << \"析构\\n\"; }\n    void use() { std::cout << \"使用资源\\n\"; }\n};\n\nint main() {\n    // unique_ptr - 独占\n    auto u = std::make_unique<Resource>();\n    u->use();\n    // std::unique_ptr<Resource> u2 = u; // 错误！不能复制\n    auto u2 = std::move(u); // 转移所有权\n    \n    // shared_ptr - 共享\n    auto s1 = std::make_shared<Resource>();\n    auto s2 = s1; // s2 也指向同一个对象，引用计数=2\n    std::cout << \"引用计数: \" << s1.use_count() << \"\\n\"; // 2\n    \n    // weak_ptr - 不增加引用计数\n    std::weak_ptr<Resource> w = s1;\n    if (auto sp = w.lock()) { // 尝试获取 shared_ptr\n        sp->use();\n    }\n    \n    return 0; // 离开作用域自动释放所有资源\n}",
          language: "cpp",
          warning: "shared_ptr 有循环引用问题（A 指 B，B 指 A），会导致内存泄漏。用 weak_ptr 打破循环。",
        },
        {
          title: "移动语义和右值引用",
          content: "移动语义是 C++11 最大的创新之一，解决了不必要的深拷贝。std::move 把左值转为右值，触发移动构造函数（偷资源而不是拷贝）。&& 是右值引用，移动构造的参数就是 T&&。对于持有堆资源的类（如 vector、string），移动比拷贝快得多因为只是转移指针。",
          code: "#include <vector>\n#include <iostream>\n\nint main() {\n    std::vector<int> v1 = {1, 2, 3, 4, 5};\n    \n    // 拷贝：v1 不变\n    auto v2 = v1;\n    \n    // 移动：v1 被掏空（变成空 vector）\n    auto v3 = std::move(v1);\n    std::cout << \"v1 size: \" << v1.size() << \"\\n\"; // 0\n    std::cout << \"v3 size: \" << v3.size() << \"\\n\"; // 5\n    \n    // 移动构造函数示例\n    class Buffer {\n        int* data;\n    public:\n        Buffer(size_t size) : data(new int[size]) {}\n        Buffer(Buffer&& other) noexcept : data(other.data) {\n            other.data = nullptr; // 掏空\n        }\n        ~Buffer() { delete[] data; }\n    };\n    \n    return 0;\n}",
          language: "cpp",
          tip: "用 std::move 时记住：移走之后原对象处于有效但未定义的状态，不要再使用它。",
        },
        {
          title: "constexpr 编译期计算",
          content: "constexpr 让函数和变量在编译期就能计算出结果，运行时不花时间。constexpr 函数的计算结果可以在编译时当作常量使用（如数组大小、模板参数等）。C++14 允许 constexpr 函数里有循环和分支，C++17 可以用 constexpr if 编译期选择执行路径。",
          code: "#include <iostream>\n\n// 编译期阶乘\nconstexpr int factorial(int n) {\n    int result = 1;\n    for (int i = 1; i <= n; i++) result *= i;\n    return result;\n}\n\nint main() {\n    constexpr int fact5 = factorial(5); // 编译时算好 = 120\n    int arr[factorial(4)];               // 数组大小 24，编译时确定\n    \n    // constexpr if (C++17)\n    template<typename T>\n    auto get_value(T t) {\n        if constexpr (std::is_integral_v<T>) {\n            return t * 2;\n        } else {\n            return t;\n        }\n    }\n    \n    std::cout << fact5 << \"\\n\";\n    return 0;\n}",
          language: "cpp",
          tip: "能用 constexpr 的函数尽量声明为 constexpr，编译期计算完就是免费的运行时性能。",
        },
      ],
      quiz: [
        {
          question: "auto 关键字的作用？",
          options: ["定义变量", "让编译器自动推断类型", "表示自动变量", "声明引用"],
          answer: 1,
          explanation: "auto 让编译器根据初始化表达式自动推导变量的类型。",
        },
        {
          question: "std::unique_ptr 和 std::shared_ptr 的区别？",
          options: ["unique_ptr 更快", "unique_ptr 独占所有权，shared_ptr 引用计数共享", "shared_ptr 不能拷贝", "没有区别"],
          answer: 1,
          explanation: "unique_ptr 独占对象所有权不能复制，shared_ptr 通过引用计数共享所有权。",
        },
        {
          question: "std::move 的作用？",
          options: ["移动变量位置", "把左值转成右值触发移动语义", "拷贝变量", "删除变量"],
          answer: 1,
          explanation: "std::move 将左值转换为右值引用，让编译器选择移动构造而不是拷贝。",
        },
        {
          question: "constexpr 函数的特点？",
          options: ["只能返回 const", "可以在编译期求值", "运行时不能调用", "返回值不能被修改"],
          answer: 1,
          explanation: "constexpr 函数在参数是编译期常量时能在编译阶段计算出结果。",
        },
      ],
    },
    "cpp-stl": {
      slug: "cpp-stl",
      sections: [
        {
          title: "STL 六大组件概览",
          content: "STL（标准模板库）是 C++ 最强大的库，六大组件：容器（存数据）、算法（排序查找等）、迭代器（连接容器和算法的桥梁）、仿函数（函数对象）、适配器（改造接口）、分配器（内存管理）。最常用的就是容器加算法，用迭代器串联，vector<int> v; sort(v.begin(), v.end()); 一行搞定。",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> v = {5, 2, 8, 1, 9, 3};\n    \n    // 算法 + 迭代器\n    std::sort(v.begin(), v.end());\n    \n    auto it = std::find(v.begin(), v.end(), 8);\n    if (it != v.end()) std::cout << \"找到了: \" << *it << \"\\n\";\n    \n    for (int n : v) std::cout << n << \" \";\n    // 1 2 3 5 8 9\n    \n    return 0;\n}",
          language: "cpp",
          tip: "STL 的核心思想是算法和容器解耦，通过迭代器这个中间层连接。",
        },
        {
          title: "序列容器：vector、list、deque",
          content: "vector 是动态数组，末尾增删 O(1)，随机访问 O(1)，是默认选择。list 是双向链表，任意位置增删 O(1)，但不能随机访问。deque 是双端队列，头尾增删都是 O(1)，还能随机访问，实现上是一个分块的数组。大部分场景用 vector，需要频繁头部操作用 deque。",
          code: "#include <vector>\n#include <list>\n#include <deque>\n\nint main() {\n    // vector: 默认选择\n    std::vector<int> v = {1, 2, 3};\n    v.push_back(4);\n    v.pop_back();\n    int third = v[2]; // 随机访问\n    \n    // list: 频繁中间插入\n    std::list<int> lst = {1, 2, 3};\n    lst.push_front(0);\n    lst.push_back(4);\n    auto it = lst.begin();\n    ++it;\n    lst.insert(it, 99);\n    \n    // deque: 两头操作\n    std::deque<int> dq;\n    dq.push_back(1);\n    dq.push_front(0);\n    dq.pop_front();\n    \n    return 0;\n}",
          language: "cpp",
        },
        {
          title: "关联容器：set、map",
          content: "set 存唯一键，自动排序（默认升序），底层是红黑树。map 存键值对，按 key 排序，key 必须唯一。unordered_set 和 unordered_map 是基于哈希表的，无序但 O(1) 平均查找。需要排序用 set/map，追求速度用 unordered_map。multiset/multimap 允许重复键。",
          code: "#include <set>\n#include <map>\n#include <unordered_map>\n\nint main() {\n    // set: 自动排序去重\n    std::set<int> s = {3, 1, 4, 1, 5};\n    // s 里是 {1, 3, 4, 5}\n    s.insert(2);\n    if (s.count(3)) std::cout << \"存在\\n\";\n    \n    // map: 键值对\n    std::map<std::string, int> scores;\n    scores[\"小明\"] = 95;\n    scores[\"小红\"] = 88;\n    \n    for (auto& [name, score] : scores) {\n        std::cout << name << \": \" << score << \"\\n\";\n    }\n    \n    // unordered_map: 哈希表，快但无序\n    std::unordered_map<std::string, int> hash;\n    hash[\"apple\"] = 3;\n    hash[\"banana\"] = 5;\n    \n    return 0;\n}",
          language: "cpp",
          tip: "如果不能确定用 map 还是 unordered_map，默认用 map，需要性能优化时再切 unordered_map。",
        },
        {
          title: "常用算法",
          content: "STL 算法有上百个，最常用的：sort 排序、find 查找、binary_search 二分查找、count 计数、reverse 翻转、unique 去重、min_element/max_element 找极值、accumulate 求和、for_each 遍历执行操作。lambda 表达式让算法更灵活，一个 lambda 替代一个专门写的函数。",
          code: "#include <algorithm>\n#include <numeric>\n#include <vector>\n#include <iostream>\n\nint main() {\n    std::vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};\n    \n    // 排序和去重\n    std::sort(v.begin(), v.end());\n    auto last = std::unique(v.begin(), v.end());\n    v.erase(last, v.end());\n    \n    // 查找\n    auto it = std::find(v.begin(), v.end(), 4);\n    bool has5 = std::binary_search(v.begin(), v.end(), 5);\n    \n    // 计数\n    int ones = std::count(v.begin(), v.end(), 1);\n    \n    // 累加\n    int sum = std::accumulate(v.begin(), v.end(), 0);\n    \n    // lambda + for_each\n    std::for_each(v.begin(), v.end(), [](int n) {\n        std::cout << n * 2 << \" \";\n    });\n    \n    return 0;\n}",
          language: "cpp",
          tip: "binary_search 要求容器已排序，所以通常先 sort 再二分查找。",
        },
        {
          title: "智能指针和容器配合",
          content: "C++11 引入智能指针后，在容器里存指针不再是噩梦。存 shared_ptr<T> 到 vector 里，最后一个引用消失时自动释放。unique_ptr<T> 独占所有权，只能移动不能拷贝。容器存指针的另一种方式是存值，用 vector<T> 而不是 vector<T*>，RAII 帮你自动管理。",
          code: "#include <memory>\n#include <vector>\n#include <iostream>\n\nclass Animal {\npublic:\n    virtual void speak() = 0;\n    virtual ~Animal() = default;\n};\n\nclass Dog : public Animal {\npublic:\n    void speak() override { std::cout << \"汪汪\\n\"; }\n};\n\nint main() {\n    // vector 存 shared_ptr\n    std::vector<std::shared_ptr<Animal>> animals;\n    animals.push_back(std::make_shared<Dog>());\n    animals.push_back(std::make_shared<Dog>());\n    \n    for (auto& a : animals) a->speak();\n    \n    // vector 存 unique_ptr\n    std::vector<std::unique_ptr<Animal>> uanimals;\n    uanimals.push_back(std::make_unique<Dog>());\n    \n    // 离开作用域自动释放所有指针，不用手动 delete\n    return 0;\n}",
          language: "cpp",
          tip: "C++11 之后尽量用智能指针替代裸指针，容器里存 shared_ptr/unique_ptr 而不是 new 出来的指针。",
        },
      ],
      quiz: [
        {
          question: "STL 中连接容器和算法的桥梁是什么？",
          options: ["指针", "迭代器", "引用", "仿函数"],
          answer: 1,
          explanation: "迭代器像指针一样操作，让算法不需要知道容器的具体类型就能工作。",
        },
        {
          question: "vector 的 push_back 平均时间复杂度是什么？",
          options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
          answer: 2,
          explanation: "vector 末尾插入是摊销 O(1)，扩容时偶有 O(n) 但总体平均是常数。",
        },
        {
          question: "map 和 unordered_map 最本质的区别？",
          options: ["名字不同", "map 有序（红黑树），unordered_map 无序（哈希表）", "unordered_map 更快", "map 不是标准容器"],
          answer: 1,
          explanation: "map 基于红黑树保持 key 排序，unordered_map 基于哈希表不保证顺序但查找更快。",
        },
        {
          question: "C++11 后容器里存多态对象推荐用什么？",
          options: ["裸指针 new", "shared_ptr 或 unique_ptr", "void*", "引用"],
          answer: 1,
          explanation: "智能指针保证资源自动释放，没有内存泄漏风险，是现代 C++ 的推荐写法。",
        },
      ],
    },
    "css-animations": {
      slug: "css-animations",
      sections: [
        {
          title: "CSS 过渡 Transition",
          content: "Transition 是最简单的动画方式，让元素属性从一个值平滑变到另一个值。四个要素：要变什么属性、变多久、用什么速度曲线、延迟多久开始。适合做 hover 效果、显示隐藏之类的简单交互。",
          code: ".btn {\n  background: #3b82f6;\n  transition: background 0.3s ease, transform 0.2s;\n}\n\n.btn:hover {\n  background: #2563eb;\n  transform: scale(1.05);\n}",
          language: "css",
          tip: "transition 写在元素默认状态上，不是写在 hover 状态上。",
        },
        {
          title: "CSS 关键帧动画 Keyframes",
          content: "Keyframes 能做 Transition 做不到的复杂动画，比如循环播放、多阶段变化。用 @keyframes 定义动画的各个阶段（0% 到 100%），然后用 animation 属性绑到元素上。可以控制播放次数、方向、填充模式等。",
          code: "@keyframes slideIn {\n  from { transform: translateX(-100%); opacity: 0; }\n  50% { opacity: 0.5; }\n  to { transform: translateX(0); opacity: 1; }\n}\n\n.box { animation: slideIn 0.5s ease-out; }",
          language: "css",
        },
        {
          title: "贝塞尔曲线和缓动函数",
          content: "缓动函数决定了动画的速度节奏。ease 是慢-快-慢，linear 是匀速，ease-in 是慢启动，ease-out 是慢结束。cubic-bezier 可以自定义曲线形状，四个参数两个控制点坐标。想要弹性效果？用超越 0-1 范围的参数。",
          code: "/* 标准缓动 */\n.standard { transition-timing-function: ease; }\n\n/* 自定义弹性 */\n.bouncy { \n  transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);\n}\n\n/* 越来越慢 */\n.decelerate { animation-timing-function: ease-out; }",
          language: "css",
          warning: "动画速度不能太慢，300ms 以内最佳，超过 500ms 用户会觉得卡。",
        },
        {
          title: "性能优化：只动画 transform 和 opacity",
          content: "浏览器渲染四个阶段：重排、重绘、合成、绘制。不同 CSS 属性触发的阶段不同。width/height 改动触发重排，最费性能。transform 和 opacity 只触发合成阶段，能用 GPU 加速，丝般顺滑。动画性能黄金法则：只用 transform 和 opacity。",
          code: "/* 不要这样 - 触发重排 */\n.bad { transition: width 0.3s, height 0.3s; }\n\n/* 应该这样 - 只触发合成 */\n.good { \n  transition: transform 0.3s, opacity 0.3s;\n  will-change: transform;\n}\n\n/* 平移替代 left/top */\n.slide { transform: translateX(100px); }",
          language: "css",
          tip: "will-change 提前告诉浏览器这个元素要动，做好优化准备。但不要滥用，用多了反而占用太多 GPU 内存。",
        },
        {
          title: "实用的动画小技巧",
          content: "动画不一定非要飞进来飞出去，微小的过渡效果就能大幅提升体验。按钮的 active 缩放、页面加载的骨架屏闪烁、滚动渐显元素、hover 时卡片的上浮阴影，这些都是低成本高回报的小动画。media 查询 prefers-reduced-motion 要尊重用户的无障碍偏好。",
          code: "/* 骨架屏闪烁 */\n@keyframes shimmer {\n  to { background-position: -200% 0; }\n}\n\n.skeleton {\n  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n}\n\n/* 尊重用户偏好 */\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { animation-duration: 0.01ms !important; }\n}",
          language: "css",
        },
      ],
      quiz: [
        {
          question: "CSS transition 应该写在哪个状态上？",
          options: ["hover 状态", "focus 状态", "元素默认状态", "active 状态"],
          answer: 2,
          explanation: "transition 写在默认状态上，这样进入和离开 hover 都能平滑过渡。",
        },
        {
          question: "哪些属性动画性能最好？",
          options: ["width 和 height", "transform 和 opacity", "color 和 background", "position 和 display"],
          answer: 1,
          explanation: "transform 和 opacity 只触发合成阶段，可利用 GPU 加速。",
        },
        {
          question: "animation-fill-mode: forwards 的作用？",
          options: ["动画无限循环", "动画结束后保持最后一帧", "动画结束后回到初始状态", "动画反转播放"],
          answer: 1,
          explanation: "forwards 让元素保留动画结束时的样式，不会跳回初始状态。",
        },
        {
          question: "prefers-reduced-motion 的作用？",
          options: ["优化动画性能", "检测用户是否希望减少动画效果", "强制开启动画", "禁用所有动画"],
          answer: 1,
          explanation: "某些用户会设置系统偏好减少动画，这个媒体查询用来尊重这个设置。",
        },
      ],
    },
    "css-responsive": {
      slug: "css-responsive",
      sections: [
        {
          title: "响应式设计的核心思路",
          content: "响应式就是让一个网页在手机、平板、电脑上都能看得舒服。核心是这个观点：不要把设计写死在某个固定宽度上，而是让布局根据屏幕大小自适应。主要有三种手段：媒体查询、流式布局（flexbox/grid）、响应式单位（vw/vh/rem）。三者结合才是正道。",
          code: "/* 移动优先的媒体查询 */\n.container { padding: 16px; }\n\n@media (min-width: 768px) {\n  .container { padding: 32px; }\n}\n\n@media (min-width: 1024px) {\n  .container { max-width: 960px; margin: 0 auto; }\n}",
          language: "css",
          tip: "先写移动端样式，再用 min-width 逐步覆盖桌面端，这叫移动优先策略。",
        },
        {
          title: "媒体查询 Media Queries",
          content: "媒体查询是响应式的基石，就是给不同条件的屏幕写不同的 CSS 规则。常用的有 min-width、max-width、orientation 等。可以把断点值定义成 CSS 变量或预处理器变量统一管理，不要到处写魔术数字。",
          code: ":root {\n  --bp-sm: 640px;\n  --bp-md: 768px;\n  --bp-lg: 1024px;\n}\n\n@media (min-width: var(--bp-md)) {\n  .sidebar { display: block; }\n}",
          language: "css",
          warning: "CSS 变量在媒体查询条件中不生效，需要用预处理器或 PostCSS 插件。",
        },
        {
          title: "Flexbox 弹性布局",
          content: "Flexbox 是一维布局方案，要么控制横向排列要么控制纵向排列。display: flex 激活弹性容器，里面的子元素就变成弹性项目了。常用属性：justify-content 控制主轴对齐，align-items 控制交叉轴对齐，flex-wrap 控制是否换行。",
          code: ".card-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.card {\n  flex: 1 1 300px;\n  min-width: 0;\n}",
          language: "css",
          tip: "flex: 1 1 300px 意思是最小 300px，空间足够就均分，不够就换行。配合 flex-wrap 轻松实现响应式网格。",
        },
        {
          title: "CSS Grid 网格布局",
          content: "Grid 是二维布局方案，能同时控制行和列。特别适合页面整体布局和复杂的卡片网格。grid-template-columns 定义列规则，auto-fit/auto-fill 配合 minmax 可以自动计算该放几列，完全不用写媒体查询就能响应式！",
          code: ".grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 24px;\n}\n\n/* 页面布局 */\n.layout {\n  display: grid;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\"\n    \"footer footer\";\n}",
          language: "css",
        },
        {
          title: "响应式单位和 Clamp",
          content: "vw 是视口宽度的百分比，适合做流体排版。但纯 vw 有极限，屏幕很大字就巨大，屏幕很小字就看不清。clamp 函数能设上下限：clamp(最小值, 理想值, 最大值)，字体会在范围内平滑缩放。rem 相对于根元素字号，适合整体缩放。",
          code: "h1 { font-size: clamp(24px, 5vw, 48px); }\np { font-size: clamp(16px, 2vw, 20px); }\n.hero { padding: clamp(32px, 8vw, 120px) 0; }",
          language: "css",
          tip: "clamp 结合 vw 是实现流体排版最优雅的方式，几乎不需要媒体查询来调字号。",
        },
      ],
      quiz: [
        {
          question: "移动优先策略是什么意思？",
          options: ["先写手机端样式再用 min-width 覆盖", "先写桌面端再适配手机", "只做移动端", "移动端和桌面端分开写"],
          answer: 0,
          explanation: "移动优先是从最小值开始写样式，然后用 min-width 媒体查询在屏幕变大时覆盖。",
        },
        {
          question: "auto-fit 和 auto-fill 的区别？",
          options: ["没有区别", "auto-fit 会拉伸填满，auto-fill 会留白", "auto-fill 会拉伸，auto-fit 留白", "auto-fit 是 grid 的，auto-fill 是 flex 的"],
          answer: 1,
          explanation: "auto-fit 会把多余的列拉伸填满空间，auto-fill 会保留空白列。",
        },
        {
          question: "clamp 函数的三个参数依次是什么？",
          options: ["最大值/理想值/最小值", "最小值/理想值/最大值", "理想值/最小值/最大值", "最小值/最大值/理想值"],
          answer: 1,
          explanation: "clamp(MIN, VAL, MAX)，VAL 通常用 vw，上下限是绝对单位。",
        },
        {
          question: "Flexbox 和 Grid 的本质区别？",
          options: ["Flexbox 更快", "Flexbox 是一维布局，Grid 是二维布局", "Grid 更简单", "Flexbox 不支持响应式"],
          answer: 1,
          explanation: "Flexbox 控制一行或一列，Grid 同时控制行和列。",
        },
      ],
    },
    "docker-network": {
      slug: "docker-network",
      sections: [
        {
          title: "Docker 网络是干嘛的",
          content: "Docker 的网络负责容器之间、容器和宿主机之间、容器和外部网络的通信。每个容器启动时默认会连到一个叫 bridge 的虚拟网络，分配一个内部 IP。\n\n你在容器里访问 localhost 访问的是容器自己的 localhost，不是宿主机的。这是初学者最容易搞错的——想说我在容器里连本机数据库写 localhost，结果发现连不上，因为数据库在宿主机上。\n\nDocker 支持多种网络驱动：bridge（默认，单机容器通信）、host（容器直接用宿主机网络）、overlay（跨主机的容器通信，Swarm 模式用）、macvlan（给容器分配物理网卡的 MAC 地址）、none（无网络）。",
          code: "# 查看所有网络\ndocker network ls\n\n# 查看网络详情\ndocker network inspect bridge\n\n# 创建自定义网络\ndocker network create --driver bridge mynet\n\n# 运行容器时指定网络\ndocker run -d --network mynet --name web nginx\n\ndocker run -d --network mynet --name db mysql",
          language: "bash",
          tip: "自定义 bridge 网络比默认 bridge 好——支持 DNS 解析，容器之间可以通过容器名互相访问。",
        },
        {
          title: "Bridge 网络详解",
          content: "Bridge 是 Docker 默认的网络模式，创建一个虚拟网桥 docker0，每个容器通过虚拟网卡连到这个网桥上。默认 bridge 下容器之间只能用 IP 通信，但自定义 bridge 支持 DNS 解析——容器名直接当域名用。\n\n端口映射：容器内的端口默认外部访问不到，需要在 docker run 时用 -p 映射。比如 -p 8080:80 表示宿主机的 8080 端口转发到容器的 80 端口。\n\n容器之间通信：在同一个自定义网络下的容器，直接用容器名就能互相 ping 通。Docker 内置的 DNS 服务器（127.0.0.11）负责解析。这是 docker-compose 多容器服务通信的基础。",
          code: "# 端口映射\n# 宿主 8080 -> 容器 80\ndocker run -d -p 8080:80 nginx\n\n# 只监听本机（只允许 127.0.0.1 访问）\ndocker run -d -p 127.0.0.1:8080:80 nginx\n\n# 随机端口映射\ndocker run -d -P nginx\n\n# 容器间 DNS 通信\ndocker network create appnet\ndocker run -d --network appnet --name web nginx\ndocker run -d --network appnet --name app node:18\n# app 容器里直接 curl web 就行",
          language: "bash",
          tip: "自定义 bridge 网络的 DNS 解析只对容器名生效，默认 bridge 网络不支持。所以独立项目最好建自己的网络。",
        },
        {
          title: "Host 与 None 网络",
          content: "host 网络：容器直接共享宿主机的网络命名空间，没有网络隔离。容器监听的端口直接暴露在宿主机上，不需要 -p 映射。性能最好（没有 NAT 转发开销），但安全性差（容器可以直接访问宿主机所有网络接口）。\n\n适用场景：高性能网络应用（如 Nginx 代理）、容器需要访问宿主机大量端口的场景。Windows 和 Mac 上 host 模式不支持或行为不同。\n\nnone 网络：容器没有网络接口，完全隔离。适合不需要网络的纯计算任务，或者安全要求极高、绝不能联网的容器。",
          code: "# Host 网络\ndocker run -d --network host nginx\n# nginx 的 80 端口直接出现在宿主机上\n\n# None 网络\ndocker run --network none --name isolated alpine\n\n# 给运行的容器连接/断开网络\ndocker network connect mynet web\ndocker network disconnect mynet web",
          language: "bash",
          warning: "host 网络模式下容器和宿主机共用网络，端口冲突直接报错。一台机器上只能有一个进程监听某个端口。",
        },
        {
          title: "Overlay 网络与跨主机通信",
          content: "单机用 bridge 就够了，但跑集群（Docker Swarm 或 Kubernetes）时，不同机器上的容器需要互相通信就要用 overlay 网络。\n\nOverlay 网络在多台 Docker 宿主机之间创建分布式网络——不同主机上的容器看起来在同一个局域网里，可以直接 IP 通信。底层用 VXLAN 隧道封装数据包。\n\n创建 overlay 网络需要先初始化 Swarm（docker swarm init），然后创建 overlay 网络，各节点上的容器加入这个网络就能跨主机通信。Kubernetes 的 Flannel、Calico 也是类似原理。",
          code: "# 初始化 Swarm（主节点）\ndocker swarm init\n\n# 创建 overlay 网络\ndocker network create -d overlay --attachable myoverlay\n\n# 在不同节点上运行容器加入 overlay\ndocker run -d --network myoverlay --name web nginx\n\n# 查看 swarm 节点\ndocker node ls",
          language: "bash",
        },
        {
          title: "网络调试与排错",
          content: "容器网络出问题了？常用排查手段：\n\ndocker network inspect——看网络里有哪些容器、IP 分配情况。\ndocker exec 进容器 ping 另一个容器名——测试 DNS 解析是否正常。\ndocker run --rm alpine nslookup 容器名——用 alpine 自带的 nslookup 手动测 DNS。\ndocker logs 容器名——看容器的启动日志，很多时候网络问题是因为端口被占用了。\n容器内 curl 宿主机 IP:端口——确认是不是端口映射的问题。\n宿主机 curl localhost:映射端口——确认是不是防火墙的问题。",
          code: "# 进容器排查网络\ndocker exec -it web sh\nping app          # 容器名能解析吗？\nping 8.8.4.4     # 能出外网吗？\ncurl app:3000    # 能连另一个容器吗？\n\n# 宿主机上排查\ndocker network inspect mynet | jq '.[0].Containers'\ndocker port web   # 查看端口映射\n\n# 手动 DNS 测试\ndocker run --rm --network mynet alpine nslookup web",
          language: "bash",
          tip: "容器的 curl 默认可能没装。alpine 镜像里 curl 也没有，可以用 wget -qO- 代替，或者 apt-get install curl。",
        },
      ],
      quiz: [
        {
          question: "默认 bridge 和自定义 bridge 最大的区别？",
          options: ["速度不同", "自定义 bridge 支持 DNS 解析", "默认 bridge 不能映射端口", "没区别"],
          answer: 1,
          explanation: "自定义 bridge 网络内置 DNS，容器之间可以通过名字互相访问。默认 bridge 只能用 IP。",
        },
        {
          question: "docker run -p 8080:80 中的 8080 和 80 分别是谁的端口？",
          options: ["8080 是容器端口，80 是宿主机端口", "8080 是宿主机端口，80 是容器端口", "两个都是宿主机端口", "两个都是容器端口"],
          answer: 1,
          explanation: "左边是宿主机端口，右边是容器端口。写法是宿主机:容器，记住了。",
        },
        {
          question: "host 网络模式的优缺点？",
          options: ["最安全但最慢", "性能最好但没有网络隔离", "不支持 Windows", "只能用于 Swarm"],
          answer: 1,
          explanation: "host 模式容器直接用宿主机网络栈，没有 NAT 转换开销所以快，但也没有隔离。",
        },
        {
          question: "Overlay 网络解决什么问题？",
          options: ["单机上容器间通信", "跨主机容器通信", "容器访问外网", "容器访问宿主机"],
          answer: 1,
          explanation: "Overlay 网络让不同宿主机上的容器看起来在同一个网络里，是 Swarm 和 K8s 多节点通信的基础。",
        },
        {
          question: "怎么排查容器间 DNS 是否正常？",
          options: ["docker ps", "docker exec 进容器 ping 另一个容器名", "docker restart", "docker logs"],
          answer: 1,
          explanation: "最直接的方法：进一个容器用 ping 另一个容器的名字，能通就说明 DNS 正常，不通就是网络配置有问题。",
        },
      ],
    },
    "docker-optimization": {
      slug: "docker-optimization",
      sections: [
        {
          title: "镜像大小的优化——为什么我的镜像 2GB",
          content: "大镜像的问题：push/pull 慢、占用磁盘多、启动慢。优化镜像大小是个系统工程：\n\n1. 选对基础镜像——alpine（约 5MB）比 ubuntu（约 70MB）小十几倍。但 alpine 用 musl libc 而不是 glibc，某些 C 扩展可能不兼容。\n2. 多阶段构建——构建在第一个阶段（大镜像），最终产物复制到第二个阶段（小镜像，如 alpine）。构建工具不进入最终镜像。\n3. 减少层数——把多个 RUN 合并成一个，用 && 连接。每层都是增量，层数少=体积小。\n4. 清理包缓存——apt-get 后立刻 rm -rf /var/lib/apt/lists/*。\n5. 不要装不需要的东西——推荐用 --no-install-recommends。\n6. .dockerignore——把 node_modules、.git、.env 排除，别打进镜像。",
          code: "# 多阶段构建示例\n# Stage 1: 构建\nFROM node:18 AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: 生产\nFROM node:18-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY package*.json ./\nEXPOSE 3000\nCMD [\"node\", \"dist/main.js\"]",
          language: "dockerfile",
          tip: "多阶段构建是镜像瘦身的最佳实践——构建阶段可以很臃肿（装各种构建工具），最终镜像只用 alpine 加产出的 dist。",
        },
        {
          title: "层缓存优化——加速构建",
          content: "Docker 的构建是逐层缓存——每层如果没变就用缓存，变了这一层和所有后面的层都重建。所以正确的做法是把不常变的放前面、常变的放后面。\n\n典型的优化：先 COPY package.json 和 lock 文件，然后 RUN npm ci。最后才 COPY 源代码。这样只改代码时，npm install 那层能走缓存，构建快很多。\n\n注意：docker build 的缓存可能过期——如果 package.json 没变但 npm registry 上的版本更新了，缓存还是会用旧版本。可以用 --no-cache 强制重建，或在 CI 里用 --build-arg 传版本信息破坏缓存。",
          code: "# 差的做法（每次改代码都重新 npm install）\nCOPY . .\nRUN npm ci\n\n# 好的做法（package.json 没变就复用缓存）\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\n\n# 强制不用缓存\ndocker build --no-cache -t app .\n\n# .dockerignore\ngit\nnode_modules\n.env\n*.md\ndist",
          language: "bash",
        },
        {
          title: "容器运行时优化",
          content: "镜像优化完，运行时的优化也重要：\n\n1. 合理设置 restart policy——unless-stopped（Docker 重启/崩溃后自动启动容器），always 也行但手动 stop 后下次 Docker 重启它又活了。\n2. 日志管理——不设 limit 的话容器的 stdout/stderr 日志会无限增长，撑满磁盘。用 --log-opt max-size=10m --log-opt max-file=3。\n3. 优雅关闭——容器收到 SIGTERM 后要能优雅关闭。CMD 里用 exec 形式（CMD [\"node\", \"app.js\"]）而不是 shell 形式（CMD node app.js），因为 shell 形式不转发信号。\n4. healthcheck——给容器加健康检查，Swarm/Compose 能根据健康状态决定要不要重启容器。\n5. 资源不必要的不给——--cpus 和 --memory 合理设置，别给太多也别给太少。",
          code: "# 日志限制\ndocker run -d --log-opt max-size=10m --log-opt max-file=3 nginx\n\n# 全局日志限制（/etc/docker/daemon.json）\n{\n  \"log-driver\": \"json-file\",\n  \"log-opts\": {\n    \"max-size\": \"10m\",\n    \"max-file\": \"3\"\n  }\n}\n\n# Healthcheck（Dockerfile 里）\nHEALTHCHECK --interval=30s --timeout=3s --retries=3 \\\n  CMD curl -f http://localhost/ || exit 1",
          language: "bash",
          tip: "json-file 是默认日志驱动，日志存在 /var/lib/docker/containers/ 下。不设置 rotate 的话几个月能长到几十 GB。",
        },
        {
          title: "多阶段构建进阶",
          content: "多阶段构建不只是简单的复制文件，还能做更多：\n\n1. 给阶段起名字：FROM image AS stage-name，后面 COPY --from=stage-name。\n2. 多来源：从不同阶段甚至不同镜像复制文件。比如 Go 应用的静态编译——在构建阶段编译成二进制，运行阶段用 scratch（空白镜像）只放二进制。\n3. --chown 参数：COPY --from=builder --chown=appuser:appuser /app/dist ./dist。在复制的同时换所有者。\n4. 构建参数：用 ARG 传构建时变量，结合 --target 只构建到某个阶段（适合 CI 里分开构建和测试）。",
          code: "# 多阶段构建——Go 应用从构建到 scratch\nFROM golang:1.21 AS builder\nWORKDIR /app\nCOPY . .\nRUN CGO_ENABLED=0 go build -o server .\n\nFROM scratch\nCOPY --from=builder /app/server /server\nEXPOSE 8080\nCMD [\"/server\"]\n# 最终镜像只有 server 二进制，几 MB！\n\n# 只构建到 builder 阶段\ndocker build --target builder -t app:dev .",
          language: "dockerfile",
          tip: "scratch 是空的，没有 shell、没有包管理器、啥都没有。适合静态编译的 Go/Rust 应用，极致安全和小巧。",
        },
        {
          title: "Docker Compose 优化",
          content: "docker-compose.yml 也有一些优化点：\n\n1. 利用 depends_on 和 healthcheck 控制启动顺序——数据库就绪后再启动应用。但 depends_on 只等容器启动不等服务就绪，配合 condition: service_healthy 才能真正等。\n\n2. 环境变量用 .env 文件管理，不要写死在 compose 文件里。不同环境各有一个 .env 文件，compose 自动读取。\n\n3. 合理利用 profiles——不是所有服务每次都要启动。给开发用的工具服务加 profiles: ['dev']，docker compose --profile dev up 才启动它们。\n\n4. 限制资源——compose 里也能设 cpus 和 memory limits，防止某个容器吃光资源。\n\n5. network 用自定义网络——多个 compose 项目默认创建各自的网络互不干扰。需要跨项目通信时指定外部网络。",
          code: "# docker-compose.yml 优化\nget services:\n  app:\n    image: myapp\n    depends_on:\n      db:\n        condition: service_healthy\n    deploy:\n      resources:\n        limits:\n          cpus: '0.5'\n          memory: 256M\n  db:\n    image: postgres\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n      interval: 5s\n      timeout: 3s\n      retries: 5",
          language: "yaml",
          tip: "depends_on 的 condition: service_healthy 需要 compose v3.4+（或使用 v2.x 格式）。老版本只支持 depends_on 启动顺序不检查健康状态。",
        },
      ],
      quiz: [
        {
          question: "多阶段构建的主要目的？",
          options: ["加速网络", "最终镜像不包含构建工具，大幅缩小体积", "增加层数", "多平台构建"],
          answer: 1,
          explanation: "构建阶段用大镜像装各种工具，最终阶段只复制产物，最终镜像干净小巧。",
        },
        {
          question: "先 COPY package.json 再 RUN npm install 的目的是？",
          options: ["代码格式更好", "利用层缓存，package.json 没变就不用重新安装依赖", "必须这样做", "减少文件数量"],
          answer: 1,
          explanation: "Docker 是逐层缓存的。把不常变的文件放前面，改代码时依赖安装这一步能走缓存。",
        },
        {
          question: "容器日志不设限制会怎样？",
          options: ["日志自动删除", "日志可能无限增长撑满磁盘", "日志不输出", "容器会崩溃"],
          answer: 1,
          explanation: "默认 Docker 不限制容器日志大小。一个很爱打印日志的容器几个月能把磁盘吃光。",
        },
        {
          question: "scratch 基础镜像是什么？",
          options: ["最新的 Ubuntu", "完全空白的镜像", "最小的 Alpine", "开发用镜像"],
          answer: 1,
          explanation: "scratch 是 Docker 的空镜像——没有文件系统、没有 shell。只能跑静态编译的二进制程序。",
        },
        {
          question: "为什么容器日志建议用 max-size 限制？",
          options: ["Docker 需要", "防止日志撑满磁盘", "日志太大容器启动慢", "法律规定"],
          answer: 1,
          explanation: "磁盘满了所有服务都受影响。限制日志大小和保留文件数是生产环境必须做的配置。",
        },
      ],
    },
    "docker-security": {
      slug: "docker-security",
      sections: [
        {
          title: "Docker 安全的基本原则",
          content: "容器不是虚拟机——它们共享同一个宿主机内核。一个能突破容器隔离的漏洞，理论上可能影响到宿主机和其他容器。\n\n基本原则：最小权限——容器只拿它干活必需的权限。不要用 root 跑容器；限制容器的系统调用（seccomp）；只读文件系统；限制资源使用。\n\n威胁面：恶意镜像（从 Docker Hub 随便 pull 可能有后门）；容器逃逸（利用内核漏洞突破隔离）；资源耗尽（一个容器吃光 CPU/内存）；敏感信息泄露（密码写 Dockerfile 里）。\n\n好消息是：Docker 默认的安全配置已经比较合理——AppArmor、seccomp、cgroups 都是默认开启的。关键是你不要主动关掉它们。",
          code: "# 查看 Docker 安全相关的系统信息\ndocker info | grep -A5 Security\n\n# 检查镜像的漏洞（需安装 docker scan 或 trivy）\ndocker scan nginx:latest\n\n# 不安全的做法\n# docker run --privileged ...  （给了全部权限，非常危险）\n# docker run -v /:/host ...    （挂载宿主机根目录）",
          language: "bash",
          warning: "docker run --privileged 等于把容器的安全机制全关了。除非你确定知道在做什么，否则永远不要用。",
        },
        {
          title: "用户与权限——不要用 root 跑容器",
          content: "默认情况下 Docker 容器里的进程是以 root 运行的（容器内的 root，不是宿主机 root）。虽然 Docker 做了一些隔离，但容器 root 在某些条件下还是能触及宿主机资源。\n\n解决办法：在 Dockerfile 里用 USER 指令切换到一个非 root 用户。或者 docker run --user 1000:1000 指定 UID/GID。\n\n还有一个技巧：user namespace remapping——让容器内的 root 映射到宿主机上一个普通用户。即使容器逃逸了，攻击者也只是个普通用户的权限。在 /etc/docker/daemon.json 里配置 userns-remap。\n\n但要注意：user namespace 开启后，容器内的 root 写不了宿主机的 root 文件，有些需要改系统文件的容器（如 MySQL 初始化）会出问题。",
          code: "# 以非 root 用户运行\n# 在你的 Dockerfile 里：\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nUSER appuser\n\n# 或者启动时指定\ndocker run -u 1000:1000 --name app node:18\n\n# 开启 user namespace remapping\n# /etc/docker/daemon.json\n{\n  \"userns-remap\": \"default\"\n}",
          language: "bash",
          tip: "基础镜像的选择也很重要。alpine 默认就有非 root 用户，而有些镜像默认就是 root，需要注意确认。",
        },
        {
          title: "资源限制——别让一个容器吃光整台机器",
          content: "不加限制的容器可以吃掉所有 CPU 和内存——如果某个容器内存泄漏了，整台机器都可能 OOM。用 cgroups 限制资源：\n\n内存限制：--memory（硬限制，超了就杀进程或 OOM）、--memory-reservation（软限制，只在内存紧张时生效）。\n\nCPU 限制：--cpus（限制最多用几核）、--cpu-shares（相对权重，多个容器竞争 CPU 时按权重分配）、--cpuset-cpus（绑定到指定 CPU 核）。\n\n磁盘 IO 限制：--blkio-weight（IO 权重）、--device-read-bps（读速率）、--device-write-bps（写速率）。\n\n还有 pids limit：--pids-limit 限制容器里最多能跑多少个进程，防止 fork 炸弹。",
          code: "# 内存限制\ndocker run -d --memory 512m --memory-swap 1g --name app node:18\n\n# CPU 限制\ndocker run -d --cpus 2 --cpu-shares 512 --name app node:18\n\n# PIDs 限制\ndocker run -d --pids-limit 100 --name app node:18\n\n# docker-compose 里\ndeploy:\n  resources:\n    limits:\n      cpus: '2'\n      memory: 512M\n    reservations:\n      cpus: '1'\n      memory: 256M",
          language: "bash",
          tip: "生产环境每个容器都要设资源限制，不然一个容器出问题可能拖垮整台机器的所有服务。",
        },
        {
          title: "只读文件系统与安全扫描",
          content: "把容器的根文件系统设为只读——容器运行时不能修改文件。修改数据的路径必须通过 Volume 挂载出去。这样即使容器被入侵，攻击者也没法写恶意程序进容器。\n\n只读文件系统用 --read-only 参数，配合 tmpfs 给需要临时写入的路径（如 /tmp、/var/run）。\n\n镜像安全扫描：用 docker scan（基于 Snyk）或 trivy 扫描镜像里的已知漏洞。CI/CD 流程里集成扫描，发现高危漏洞就拦截部署。\n\n还有内容信任（Docker Content Trust）——用 docker trust 签名镜像，部署时只拉签名过的镜像，防篡改。",
          code: "# 只读文件系统\ndocker run -d --read-only --tmpfs /tmp --tmpfs /run nginx\n\n# 安全扫描\ndocker scan nginx:latest\ntrivy image nginx:latest\n\n# 启用内容信任\nexport DOCKER_CONTENT_TRUST=1\ndocker pull nginx:latest  # 只拉签名的",
          language: "bash",
          tip: "--read-only 可能会导致一些容器启动失败（因为它们需要在某些路径写临时文件）。用 --tmpfs 给这些路径提供临时可写空间。",
        },
        {
          title: "敏感信息与 Secrets 管理",
          content: "永远不要把密码、API Key、证书写在 Dockerfile 里——这些会留在镜像的层历史里，谁拿到镜像都能翻出来。\n\n敏感信息的管理方式：\n1. 环境变量（不适合太敏感的信息，docker inspect 能看到）\n2. Docker Secrets（Swarm 模式，加密存储，只有指定容器能读）\n3. 挂载配置文件（把 secrets 放在宿主机文件里挂载进去）\n4. 外部密钥管理服务（Vault、AWS Secrets Manager）\n\n对于 docker-compose，用 env_file 或 secrets 配置管理敏感数据。至少不要把秘密写进 docker-compose.yml 然后提交 git。",
          code: "# Docker Swarm Secrets\n# 创建 secret\nprintf \"MySecretPassword\" | docker secret create db_password -\n\n# 使用 secret\n# docker-compose.yml (Swarm)\nservices:\n  db:\n    image: mysql\n    secrets:\n      - db_password\nsecrets:\n  db_password:\n    external: true\n\n# 不用 secrets 时至少用 env 文件\n# .env 文件（加进 .gitignore）\n# DB_PASSWORD=MySecretPassword\n# docker run --env-file .env mysql",
          language: "bash",
          warning: "docker inspect 容器名 能看到所有环境变量。不要把敏感信息放到 --env 或 ENV 里，用 secrets 或文件挂载。",
        },
      ],
      quiz: [
        {
          question: "docker run --privileged 是什么意思？",
          options: ["以非 root 运行", "给了容器几乎所有权限，非常危险", "容器更快", "限制资源使用"],
          answer: 1,
          explanation: "--privileged 把容器的所有安全限制都关了，容器几乎等于一台虚拟机。除非必须，永远不要用。",
        },
        {
          question: "为什么不要用 root 跑容器？",
          options: ["root 太慢", "容器 root 在特定条件下可能影响宿主机", "Docker 不允许", "没区别"],
          answer: 1,
          explanation: "虽然容器 root 和宿主机 root 有隔离，但万一有逃逸漏洞，容器 root 能在宿主机上做 root 级别的事。",
        },
        {
          question: "--memory 和 --memory-reservation 的区别？",
          options: ["没区别", "--memory 是硬限制，--memory-reservation 是软限制", "--memory-reservation 更大", "--memory 只用于 CPU"],
          answer: 1,
          explanation: "--memory 是硬上限，超了就 OOM。--memory-reservation 是软上限，仅在宿主机内存紧张时生效。",
        },
        {
          question: "--read-only 有什么用？",
          options: ["加速读取", "容器文件系统只读，防篡改", "只能读不能写数据库", "只读 Dockerfile"],
          answer: 1,
          explanation: "把容器的根文件系统设为只读，被入侵了攻击者也改不了文件系统内容。需要写的地方用 volume 或 tmpfs。",
        },
        {
          question: "为什么不要把数据库密码写 Dockerfile 里？",
          options: ["Dockerfile 不执行", "密码会留在镜像层历史里，谁都能看到", "Docker 不支持", "密码太长了"],
          answer: 1,
          explanation: "Dockerfile 每一行都是一个镜像层，即使后面 RUN rm 了文件，之前的层里还留着。用 docker history 能翻出来。",
        },
      ],
    },
    "docker-volume": {
      slug: "docker-volume",
      sections: [
        {
          title: "为什么需要数据持久化",
          content: "容器是无状态的——删掉容器，里面的数据也跟着没了。这跟容器设计的哲学有关：容器应该是用完就丢的。但数据库、上传的文件、配置文件这些数据需要活过容器的生命周期，所以需要持久化。\n\nDocker 提供两种持久化方式：Volume（由 Docker 管理的存储卷）和 Bind Mount（把宿主机目录直接映射进容器）。\n\nVolume 是推荐方式——由 Docker 统一管理，可以跨容器共享、备份、迁移。Bind Mount 更简单直接但依赖宿主机目录结构，换个机器可能就挂了。\n\n还有个 tmpfs Mount——数据存内存里不落盘，容器停了数据就没了，适合存临时敏感数据。",
          code: "# 创建 volume\ndocker volume create mydata\n\n# 查看所有 volume\ndocker volume ls\n\n# 查看 volume 详情\ndocker volume inspect mydata\n\n# 使用 volume\ndocker run -d -v mydata:/var/lib/mysql --name db mysql\n\n# 删 volume（确认没容器在用）\ndocker volume rm mydata",
          language: "bash",
        },
        {
          title: "Volume 用法详解",
          content: "Volume 是最推荐的持久化方案，Docker 帮你管文件存在哪（默认在 /var/lib/docker/volumes/ 下）。\n\n匿名 Volume——docker run -v /data 不指定名字，Docker 自动生成一个随机名字的 volume。删容器时如果不加 -v 参数，匿名 volume 不会被删（会堆积垃圾）。\n\n具名 Volume——docker run -v mydata:/data 指定一个名字。跨容器共享同一个 volume 很容易：两个容器都用 -v mydata:/data。\n\nVolume 的备份和迁移：可以用一个临时容器挂载 volume，然后 tar 打包导出。或者用 docker volume 的子命令备份到远程（这需要第三方工具配合，原生 Docker 没有）。",
          code: "# 具名 volume\ndocker run -d -v dbdata:/var/lib/mysql mysql\n\n# 多个容器共享同一个 volume\ndocker run -d -v shared:/data --name app1 alpine\ndocker run -d -v shared:/data --name app2 alpine\n\n# 备份 volume\ndocker run --rm -v dbdata:/data -v $(pwd):/backup alpine \\\n  tar czf /backup/dbdata.tar.gz /data",
          language: "bash",
          tip: "docker run -v 后面第一个参数如果不带斜杠就是 volume 名字，带了斜杠 Docker 认为是宿主机路径（Bind Mount）。",
        },
        {
          title: "Bind Mount 用法",
          content: "Bind Mount 直接把宿主机的一个目录或文件映射进容器。容器里对那个目录的读写直接反映到宿主机上，反之亦然。开发环境特别好用——本地改代码，容器里实时生效。\n\n跟 Volume 的区别：Bind Mount 你指定路径（如 /home/user/project:/app），Volume 由 Docker 管理路径。Bind Mount 更灵活但可移植性差，换台机器路径可能变了。\n\n常见场景：开发环境挂载源代码（改代码容器自动更新）、挂载配置文件（nginx.conf）、挂载宿主机 socket（比如 docker.sock）。",
          code: "# Bind Mount\ndocker run -d -v $(pwd)/html:/usr/share/nginx/html nginx\n\n# 只读挂载\ndocker run -d -v $(pwd)/config:/etc/nginx:ro nginx\n\n# 挂载单个文件\ndocker run -d -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro nginx\n\n# docker-compose 里\n# volumes:\n#   - ./html:/usr/share/nginx/html\n#   - ./config:/etc/nginx:ro",
          language: "bash",
          warning: "挂载文件而非目录时，文件必须在宿主机上已存在。Docker 不会自动创建文件，如果不存在 Docker 会把它当成目录名创建空目录。",
        },
        {
          title: "tmpfs 与内存存储",
          content: "tmpfs Mount 把数据存内存里，不写磁盘。容器停了数据就没了。适合的场景：临时缓存、敏感信息（不希望落在磁盘上）、需要极速 IO 的数据。\n\ntmpfs 跟 Volume 和 Bind Mount 不同——它不是持久化的，容器删了就没了。\n\n使用方式：docker run --tmpfs /tmp 或者 docker run --mount type=tmpfs,destination=/tmp,tmpfs-size=64M。注意限一下大小，别把宿主机内存吃光了。",
          code: "# tmpfs\ndocker run --tmpfs /tmp:rw,size=64M nginx\n\n# --mount 语法（更明确）\ndocker run --mount type=tmpfs,destination=/tmp,tmpfs-size=64M nginx\n\n# docker-compose 里\n# tmpfs:\n#   - /tmp:size=64M",
          language: "bash",
        },
        {
          title: "Volume 驱动与最佳实践",
          content: "Docker 的 Volume 支持插件驱动，可以把数据存到远程存储：NFS、云盘（AWS EBS、Azure Disk）、分布式存储（Ceph、GlusterFS）。这对有状态容器（数据库）特别重要——容器挂了换台机器，挂载同一个远程 volume，数据还在。\n\n最佳实践：\n1. 数据库、消息队列等有状态服务必须用 Volume\n2. 开发环境用 Bind Mount，生产环境用 Volume\n3. Volume 定期备份，尤其是数据库的 Volume\n4. 清理不再用的 volume：docker volume prune\n5. 不要在 container 里存重要的数据，所有需要持久化的都挂载出来",
          code: "# 清理未使用的 volume\ndocker volume prune\n\n# 查看 volume 占用空间\ndocker system df -v\n\n# 使用 NFS volume 驱动\ndocker volume create \\\n  --driver local \\\n  --opt type=nfs \\\n  --opt o=addr=192.168.1.100,rw \\\n  --opt device=:/path/to/share \\\n  nfs-volume",
          language: "bash",
          warning: "docker volume prune 会删掉所有没被容器使用的 volume。删之前确认没有重要的数据还在里面。",
        },
      ],
      quiz: [
        {
          question: "Volume 和 Bind Mount 最大区别？",
          options: ["Volume 更快", "Volume 由 Docker 管理路径，Bind Mount 你指定路径", "Bind Mount 不能共享", "没区别"],
          answer: 1,
          explanation: "Volume 存在 Docker 的目录里(/var/lib/docker/volumes/)，Bind Mount 路径你自己定。Volume 可移植性更好。",
        },
        {
          question: "docker run -v mydata:/data 中 -v 的第一个参数是什么？",
          options: ["容器的路径", "volume 名称（或宿主机路径）", "端口号", "镜像名"],
          answer: 1,
          explanation: "第一个参数是 volume 名或宿主机路径（含斜杠时），第二个是容器内挂载路径。",
        },
        {
          question: "tmpfs 挂载的数据存在哪？",
          options: ["宿主机磁盘", "容器磁盘", "内存", "远程存储"],
          answer: 2,
          explanation: "tmpfs 把数据存在内存里，容器一停数据全丢。适合临时缓存或敏感数据。",
        },
        {
          question: "为什么删容器时数据也跟着丢了？",
          options: ["Docker 有 bug", "没挂载 volume，数据在容器可写层里", "所有的数据都会丢", "数据库有问题"],
          answer: 1,
          explanation: "没挂载 Volume 或 Bind Mount 的话，数据存在容器的可写层。容器删了可写层就没了。",
        },
        {
          question: "docker run -v ./config:/etc/nginx:ro 里的 :ro 是什么意思？",
          options: ["只给 root 用户访问", "只读挂载", "远程挂载", "自动重建"],
          answer: 1,
          explanation: ":ro 是 read-only，容器里没法修改挂载的目录/文件。挂配置文件时加 ro 更安全。",
        },
      ],
    },
    "flutter-navigation": {
      slug: "flutter-navigation",
      sections: [
        {
          title: "Navigator 和路由基础",
          content: "Flutter 用 Navigator 管理页面栈，就像一摞卡片，push 在顶上放一张，pop 把顶上那张拿走。MaterialPageRoute 定义页面切换动画。Navigator.push 跳转新页面，Navigator.pop 返回上一页。这是命令式导航，简单直接。",
          code: "// 跳转到第二页\nNavigator.push(\n  context,\n  MaterialPageRoute(builder: (context) => SecondPage()),\n);\n\n// 返回上一页\nNavigator.pop(context);\n\n// 带结果返回\n// 第二页中：\nNavigator.pop(context, '带回去的数据');\n\n// 第一页接收：\nfinal result = await Navigator.push<String>(\n  context,\n  MaterialPageRoute(builder: (context) => SecondPage()),\n);\nprint('返回的结果: $result');",
          language: "dart",
          tip: "Navigator 是从上往下叠的，push 加一页，pop 拿掉一页，就像浏览器的前进后退。",
        },
        {
          title: "命名路由",
          content: "MaterialApp 的 routes 属性定义命名路由表，类似 Web 的 URL 路由。Navigator.pushNamed 按名字跳转，路由在 app 入口统一管理。适合中小型项目路径不复杂的场景。onGenerateRoute 处理未知路由或带参数的动态路由。",
          code: "void main() {\n  runApp(MaterialApp(\n    initialRoute: '/',\n    routes: {\n      '/': (context) => HomePage(),\n      '/profile': (context) => ProfilePage(),\n      '/settings': (context) => SettingsPage(),\n    },\n    onGenerateRoute: (settings) {\n      if (settings.name == '/user') {\n        final id = settings.arguments as int;\n        return MaterialPageRoute(\n          builder: (context) => UserPage(id: id),\n        );\n      }\n      return null;\n    },\n  ));\n}\n\n// 跳转\nNavigator.pushNamed(context, '/profile');\nNavigator.pushNamed(context, '/user', arguments: 123);",
          language: "dart",
          warning: "命名路由不支持路径参数解析（如 /user/123），需要自己处理。复杂路由用 GoRouter。",
        },
        {
          title: "GoRouter 声明式路由",
          content: "GoRouter 是 Flutter 官方推荐的声明式路由方案，支持路径参数（/user/:id）、路由守卫（重定向）、嵌套路由、Deep Link 等高级特性。GoRouter 基于 Router 组件，配合 MaterialApp.router 使用。路由定义是一个集中的列表，可读性极强。",
          code: "import 'package:go_router/go_router.dart';\n\nfinal router = GoRouter(\n  initialLocation: '/',\n  routes: [\n    GoRoute(\n      path: '/',\n      builder: (context, state) => HomePage(),\n    ),\n    GoRoute(\n      path: '/user/:id',\n      builder: (context, state) {\n        final id = state.pathParameters['id']!;\n        return UserPage(id: int.parse(id));\n      },\n    ),\n    // 嵌套路由\n    ShellRoute(\n      builder: (context, state, child) => ScaffoldWithNavBar(child: child),\n      routes: [\n        GoRoute(path: '/dashboard', builder: (_, __) => DashboardPage()),\n        GoRoute(path: '/notifications', builder: (_, __) => NotificationPage()),\n      ],\n    ),\n  ],\n  // 导航守卫\n  redirect: (context, state) {\n    final isLoggedIn = AuthService.isLoggedIn;\n    final isAuthRoute = state.matchedLocation == '/login';\n    if (!isLoggedIn && !isAuthRoute) return '/login';\n    if (isLoggedIn && isAuthRoute) return '/';\n    return null;\n  },\n);\n\nclass MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp.router(\n      routerConfig: router,\n    );\n  }\n}",
          language: "dart",
          tip: "GoRouter 支持 Deep Link，用户点击 https://yourapp.com/user/123 能直接打开对应页面。",
        },
        {
          title: "页面传参和接收结果",
          content: "页面之间传参数有多种方式：构造函数直接传（最直接）、命名路由的 arguments 传递、用状态管理框架全局共享。接收返回结果用 await Navigator.push，第二页 pop 时塞数据第一页就能收到。页面想阻止返回（比如有未保存的修改）用 WillPopScope 拦截。",
          code: "// 方式1: 构造函数传参\nclass DetailPage extends StatelessWidget {\n  final int itemId;\n  DetailPage({required this.itemId});\n  \n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      body: Center(child: Text('详情: $itemId')),\n    );\n  }\n}\n\n// 方式2: 接收返回结果\nWidget build(BuildContext context) {\n  return ElevatedButton(\n    onPressed: () async {\n      final result = await Navigator.push(\n        context,\n        MaterialPageRoute(builder: (_) => EditPage()),\n      );\n      if (result == 'saved') {\n        // 刷新列表\n      }\n    },\n    child: Text('编辑'),\n  );\n}\n\n// 方式3: 防止误返回\nWillPopScope(\n  onWillPop: () async {\n    if (_hasUnsavedChanges) {\n      final shouldLeave = await showDialog<bool>(\n        context: context,\n        builder: (_) => AlertDialog(\n          title: Text('确定离开？'),\n          content: Text('有未保存的修改'),\n          actions: [\n            TextButton(onPressed: () => Navigator.pop(context, true), child: Text('离开')),\n            TextButton(onPressed: () => Navigator.pop(context, false), child: Text('留下')),\n          ],\n        ),\n      );\n      return shouldLeave ?? false;\n    }\n    return true;\n  },\n  child: ...\\n)",
          language: "dart",
          tip: "WillPopScope 包装页面可以监听系统的返回按钮（Android）或侧滑返回（iOS），做拦截。",
        },
        {
          title: "底部导航和 Tab 切换",
          content: "底部导航栏是 App 最常见的导航方式。BottomNavigationBar 组件配合 IndexedStack 保持各 Tab 页面状态（切换 Tab 不销毁页面）。Scaffold 的 bottomNavigationBar 属性放导航栏，body 是当前显示的页面。配合 PageView 还能实现滑动手势切换。",
          code: "class MainScreen extends StatefulWidget {\n  @override\n  _MainScreenState createState() => _MainScreenState();\n}\n\nclass _MainScreenState extends State<MainScreen> {\n  int _currentIndex = 0;\n  \n  final _pages = [\n    HomePage(),\n    DiscoverPage(),\n    ProfilePage(),\n  ];\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      body: IndexedStack(\n        index: _currentIndex,\n        children: _pages,\n      ),\n      bottomNavigationBar: BottomNavigationBar(\n        currentIndex: _currentIndex,\n        onTap: (index) => setState(() => _currentIndex = index),\n        items: [\n          BottomNavigationBarItem(icon: Icon(Icons.home), label: '首页'),\n          BottomNavigationBarItem(icon: Icon(Icons.explore), label: '发现'),\n          BottomNavigationBarItem(icon: Icon(Icons.person), label: '我的'),\n        ],\n      ),\n    );\n  }\n}",
          language: "dart",
          tip: "IndexedStack 缓存所有子页面，切换 Tab 时页面状态保持。如果不需要缓存直接 _pages[_currentIndex] 即可。",
        },
      ],
      quiz: [
        {
          question: "Flutter Navigator.push 的作用？",
          options: ["删除当前页面", "在当前页面上添加一个新页面", "替换所有页面", "关闭应用"],
          answer: 1,
          explanation: "Navigator.push 在页面栈压入新页面，可以通过系统返回键或 pop 返回。",
        },
        {
          question: "GoRouter 声明路由路径参数 /user/:id 如何获取 id？",
          options: ["state.params['id']", "state.pathParameters['id']", "state.queryString", "context.params"],
          answer: 1,
          explanation: "GoRouter 的路径参数通过 state.pathParameters 获取，key 是路径中冒号后的名字。",
        },
        {
          question: "IndexedStack 的作用？",
          options: ["堆叠所有页面", "保持所有子页面状态只显示当前索引对应的", "索引所有页面", "计算页面数量"],
          answer: 1,
          explanation: "IndexedStack 同时持有所有子页面，根据 index 显示一个，其他页面状态保持不销毁。",
        },
        {
          question: "WillPopScope 的作用？",
          options: ["阻止页面打开", "拦截返回操作做自定义处理", "加速页面切换", "记录页面浏览"],
          answer: 1,
          explanation: "WillPopScope 包裹页面可以拦截返回按钮，弹窗询问或阻止误操作。",
        },
      ],
    },
    "flutter-network": {
      slug: "flutter-network",
      sections: [
        {
          title: "http 包发起请求",
          content: "Flutter 最基础的网络请求用 http 包，http.get 发 GET，http.post 发 POST。返回的 Response 有 statusCode 和 body（字符串）。需要反序列化 JSON 用 dart:convert 的 jsonDecode。虽然简单但也够用，小项目完全可以不引入第三方网络库。",
          code: "import 'package:http/http.dart' as http;\nimport 'dart:convert';\n\nFuture<List<User>> fetchUsers() async {\n  final response = await http.get(\n    Uri.parse('https://api.example.com/users'),\n    headers: {'Authorization': 'Bearer $token'},\n  );\n  \n  if (response.statusCode == 200) {\n    final List<dynamic> jsonList = jsonDecode(response.body);\n    return jsonList.map((json) => User.fromJson(json)).toList();\n  } else {\n    throw Exception('请求失败: ${response.statusCode}');\n  }\n}\n\nFuture<void> createUser(User user) async {\n  final response = await http.post(\n    Uri.parse('https://api.example.com/users'),\n    headers: {'Content-Type': 'application/json'},\n    body: jsonEncode(user.toJson()),\n  );\n  \n  if (response.statusCode != 201) {\n    throw Exception('创建失败');\n  }\n}",
          language: "dart",
          warning: "jsonDecode 默认返回 dynamic，不安全。用 Map<String, dynamic> 显式声明类型更好。",
        },
        {
          title: "JSON 序列化",
          content: "Dart 没有像 Gson 那样的反射序列化，需要手写 fromJson 和 toJson 方法。json_serializable 库用代码生成自动写序列化代码，需要运行 build_runner。手动写虽然麻烦但简单可控，小项目手写够用。fromJson 是工厂构造函数，toJson 返回 Map。",
          code: "class User {\n  final int id;\n  final String name;\n  final String? email;\n\n  User({required this.id, required this.name, this.email});\n\n  factory User.fromJson(Map<String, dynamic> json) {\n    return User(\n      id: json['id'] as int,\n      name: json['name'] as String,\n      email: json['email'] as String?,\n    );\n  }\n\n  Map<String, dynamic> toJson() {\n    return {\n      'id': id,\n      'name': name,\n      'email': email,\n    };\n  }\n}\n\n// 使用 json_serializable 自动生成\n// @JsonSerializable()\n// class User {\n//   final int id;\n//   final String name;\n//   factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);\n//   Map<String, dynamic> toJson() => _$UserToJson(this);\n// }",
          language: "dart",
          tip: "json_serializable 需要额外配置 build_runner，虽然省代码但多了构建步骤，项目初期手动写更简单。",
        },
        {
          title: "Dio 高级网络库",
          content: "Dio 是 Flutter 最流行的第三方网络库，比 http 包功能强大得多。支持拦截器（请求/响应/异常三方拦截）、拦截器链、取消请求、超时设置、文件下载上传进度、BaseUrl 配置、Cookie 管理等。拦截器最适合做 token 刷新和日志记录。",
          code: "import 'package:dio/dio.dart';\n\n// 创建实例并配置\nfinal dio = Dio(BaseOptions(\n  baseUrl: 'https://api.example.com',\n  connectTimeout: Duration(seconds: 5),\n  receiveTimeout: Duration(seconds: 3),\n  headers: {'Content-Type': 'application/json'},\n));\n\n// 添加拦截器\ndio.interceptors.add(InterceptorsWrapper(\n  onRequest: (options, handler) {\n    options.headers['Authorization'] = 'Bearer $token';\n    print('请求: ${options.method} ${options.path}');\n    handler.next(options);\n  },\n  onResponse: (response, handler) {\n    print('响应: ${response.statusCode}');\n    handler.next(response);\n  },\n  onError: (error, handler) {\n    if (error.response?.statusCode == 401) {\n      // token 过期，刷新 token 后重试\n      refreshToken().then((_) => handler.resolve(retryRequest(error.requestOptions)));\n      return;\n    }\n    handler.next(error);\n  },\n));\n\n// 使用\nfinal response = await dio.get('/users', queryParameters: {'page': 1});\nfinal data = response.data;\n\n// 表单上传\nfinal formData = FormData.fromMap({\n  'file': await MultipartFile.fromFile('path/to/file.jpg'),\n  'name': 'avatar',\n});\nawait dio.post('/upload', data: formData);",
          language: "dart",
          tip: "Dio 拦截器链按添加顺序执行，Request 拦截器正序，Response 和 Error 拦截器倒序。",
        },
        {
          title: "网络异常处理和加载状态",
          content: "网络请求必须处理各种异常：超时、无网络、服务器错误、JSON 解析失败。用 try-catch 包裹 await 调用，分别 catch DioException 和通用 Exception。UI 层通常有三种状态：loading 显示加载动画、error 显示错误重试按钮、loaded 显示数据。",
          code: "class UserProvider extends ChangeNotifier {\n  List<User> _users = [];\n  bool _isLoading = false;\n  String? _error;\n\n  List<User> get users => _users;\n  bool get isLoading => _isLoading;\n  String? get error => _error;\n\n  Future<void> fetchUsers() async {\n    _isLoading = true;\n    _error = null;\n    notifyListeners();\n\n    try {\n      final response = await dio.get('/users');\n      _users = (response.data as List)\n          .map((json) => User.fromJson(json))\n          .toList();\n    } on DioException catch (e) {\n      switch (e.type) {\n        case DioExceptionType.connectionTimeout:\n          _error = '连接超时，请检查网络';\n          break;\n        case DioExceptionType.receiveTimeout:\n          _error = '服务器响应超时';\n          break;\n        case DioExceptionType.badResponse:\n          _error = '服务器错误: ${e.response?.statusCode}';\n          break;\n        default:\n          _error = '网络异常: ${e.message}';\n      }\n    } catch (e) {\n      _error = '数据解析失败';\n    } finally {\n      _isLoading = false;\n      notifyListeners();\n    }\n  }\n}",
          language: "dart",
          tip: "网络状态的 loading/error/data 三态管理是几乎所有 App 页面都需要的，可以封装成通用组件。",
        },
        {
          title: "WebSocket 实时通信",
          content: "WebSocket 适合需要服务端主动推送的场景：即时通讯、股票行情、在线协作。dart:io 内置 WebSocket，连接后通过 Stream 监听消息。web_socket_channel 包提供了更友好的 API。onMessage 处理收到的消息，sink.add 发送消息。记得在 dispose 时关闭连接。",
          code: "import 'package:web_socket_channel/web_socket_channel.dart';\n\nclass ChatService {\n  late WebSocketChannel _channel;\n  \n  void connect(String token) {\n    _channel = WebSocketChannel.connect(\n      Uri.parse('wss://chat.example.com/ws?token=$token'),\n    );\n  }\n  \n  Stream get messages => _channel.stream;\n  \n  void sendMessage(String text) {\n    _channel.sink.add(jsonEncode({\n      'type': 'message',\n      'content': text,\n    }));\n  }\n  \n  void disconnect() {\n    _channel.sink.close();\n  }\n}\n\n// Widget 中使用\nclass ChatPage extends StatefulWidget {\n  @override\n  _ChatPageState createState() => _ChatPageState();\n}\n\nclass _ChatPageState extends State<ChatPage> {\n  final _service = ChatService();\n\n  @override\n  void initState() {\n    super.initState();\n    _service.connect('token');\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return StreamBuilder(\n      stream: _service.messages,\n      builder: (context, snapshot) {\n        if (snapshot.hasData) {\n          return Text('收到: ${snapshot.data}');\n        }\n        return Text('等待消息...');\n      },\n    );\n  }\n\n  @override\n  void dispose() {\n    _service.disconnect();\n    super.dispose();\n  }\n}",
          language: "dart",
          tip: "客户端 WebSocket 注意断线重连和心跳保活，生产环境要加上重连逻辑。",
        },
      ],
      quiz: [
        {
          question: "Flutter 中 http 包获取数据后如何解析 JSON？",
          options: ["自动解析", "用 jsonDecode 然后手动映射", "用 Gson", "不需要解析"],
          answer: 1,
          explanation: "Dart 的 jsonDecode 返回 Map<String, dynamic>，需要手动映射到 Dart 对象。",
        },
        {
          question: "Dio 的核心优势相比 http 包？",
          options: ["体积更小", "拦截器、取消请求、超时等高级功能", "是官方包", "不需要写代码"],
          answer: 1,
          explanation: "Dio 提供拦截器链、请求取消、进度监听、文件下载等高级网络功能。",
        },
        {
          question: "Dio 拦截器链的执行顺序？",
          options: ["随机", "请求按添加顺序，响应/错误按添加的逆序", "全部正序", "全部倒序"],
          answer: 1,
          explanation: "Request 拦截器正序执行，Response 和 Error 拦截器逆序（栈结构）。",
        },
        {
          question: "WebSocket 适合什么场景？",
          options: ["普通的 GET 请求", "服务端需要主动推送数据的实时场景", "上传大文件", "REST API"],
          answer: 1,
          explanation: "WebSocket 建立长连接，服务端可以主动推送消息，适合聊天、行情等实时场景。",
        },
      ],
    },
    "flutter-state": {
      slug: "flutter-state",
      sections: [
        {
          title: "StatefulWidget 和 setState",
          content: "Flutter 中一切皆 Widget。StatelessWidget 是不可变的（属性不能改），StatefulWidget 是可变的（有内部状态）。StatefulWidget 有两个类：Widget 类和 State 类。调用 setState 通知框架重绘。setState 里改数据，Flutter 自动 diff 并高效更新 UI。这是最基本的状态管理方式。",
          code: "import 'package:flutter/material.dart';\n\nclass CounterWidget extends StatefulWidget {\n  @override\n  _CounterWidgetState createState() => _CounterWidgetState();\n}\n\nclass _CounterWidgetState extends State<CounterWidget> {\n  int _count = 0;\n\n  void _increment() {\n    setState(() {\n      _count++;\n    });\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return Column(\n      children: [\n        Text('计数: $_count', style: TextStyle(fontSize: 24)),\n        ElevatedButton(\n          onPressed: _increment,\n          child: Text('加一'),\n        ),\n      ],\n    );\n  }\n}",
          language: "dart",
          tip: "setState 只重建当前 State 对应的 build，不会重建整个页面，Flutter 的 diff 机制非常高效。",
        },
        {
          title: "InheritedWidget 和上下传递",
          content: "InheritedWidget 能沿着 Widget 树向下传递数据，子 Widget 不需要一层层通过构造函数传参。典型的用法是 Theme.of(context) 获取主题、MediaQuery.of(context) 获取屏幕尺寸。原理是子 Widget 通过 BuildContext 向上查找最近的 InheritedWidget。",
          code: "class MyInherited extends InheritedWidget {\n  final int data;\n  \n  MyInherited({required this.data, required Widget child}) : super(child: child);\n\n  static MyInherited? of(BuildContext context) {\n    return context.dependOnInheritedWidgetOfExactType<MyInherited>();\n  }\n\n  @override\n  bool updateShouldNotify(MyInherited oldWidget) => data != oldWidget.data;\n}\n\n// 使用\nclass ChildWidget extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    final data = MyInherited.of(context)?.data ?? 0;\n    return Text('数据: $data');\n  }\n}",
          language: "dart",
          warning: "InheritedWidget 是底层 API，实际开发不直接用它。Provider 库在 InheritedWidget 上做了更友好的封装。",
        },
        {
          title: "Provider 状态管理",
          content: "Provider 是 Flutter 团队推荐的状态管理方案，底层基于 InheritedWidget。ChangeNotifier 是可监听的数据模型，notifyListeners() 通知刷新。ChangeNotifierProvider 把数据注入 Widget 树，Consumer 或 context.watch 获取数据并自动更新。是目前最主流的方式。",
          code: "import 'package:provider/provider.dart';\n\n// 数据模型\nclass CounterModel extends ChangeNotifier {\n  int _count = 0;\n  int get count => _count;\n\n  void increment() {\n    _count++;\n    notifyListeners();\n  }\n}\n\n// 注入\nvoid main() {\n  runApp(\n    ChangeNotifierProvider(\n      create: (_) => CounterModel(),\n      child: MyApp(),\n    ),\n  );\n}\n\n// 使用\nclass CounterWidget extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    final counter = context.watch<CounterModel>();\n    return Column(\n      children: [\n        Text('计数: ${counter.count}'),\n        ElevatedButton(\n          onPressed: () => context.read<CounterModel>().increment(),\n          child: Text('加一'),\n        ),\n      ],\n    );\n  }\n}",
          language: "dart",
          tip: "context.watch 会监听变化自动重建，context.read 只读不监听，用于回调里。搞混了会多重建。",
        },
        {
          title: "Riverpod 新一代状态管理",
          content: "Riverpod 是 Provider 的升级版，解决了 Provider 的一些痛点（编译时安全、不依赖 BuildContext、支持多个同类型 Provider）。Provider 通过函数创建全局可访问的数据容器，ref 访问其他 Provider。StatelessWidget 配合 ConsumerWidget 获取数据。",
          code: "import 'package:flutter_riverpod/flutter_riverpod.dart';\n\n// 定义 Provider\nfinal counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {\n  return CounterNotifier();\n});\n\nclass CounterNotifier extends StateNotifier<int> {\n  CounterNotifier() : super(0);\n  void increment() => state++;\n}\n\n// 使用\nclass CounterPage extends ConsumerWidget {\n  @override\n  Widget build(BuildContext context, WidgetRef ref) {\n    final count = ref.watch(counterProvider);\n    return Scaffold(\n      body: Center(\n        child: Text('$count', style: TextStyle(fontSize: 48)),\n      ),\n      floatingActionButton: FloatingActionButton(\n        onPressed: () => ref.read(counterProvider.notifier).increment(),\n        child: Icon(Icons.add),\n      ),\n    );\n  }\n}",
          language: "dart",
          tip: "Riverpod 最大的优势是不依赖 BuildContext，可以在任何地方访问 Provider，包括测试代码。",
        },
        {
          title: "BLoC 模式",
          content: "BLoC 是更正式的状态管理方案，把业务逻辑从 UI 完全分离。事件进（Events）状态出（States），中间 BLoC 处理。使用了 Stream 流式架构。flutter_bloc 库提供了 BlocProvider 注入、BlocBuilder 重建、BlocListener 监听副作用。适合大型项目和团队协作。",
          code: "import 'package:flutter_bloc/flutter_bloc.dart';\n\n// 事件\nabstract class CounterEvent {}\nclass Increment extends CounterEvent {}\n\n// BLoC\nclass CounterBloc extends Bloc<CounterEvent, int> {\n  CounterBloc() : super(0) {\n    on<Increment>((event, emit) => emit(state + 1));\n  }\n}\n\n// 界面\nclass CounterPage extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return BlocProvider(\n      create: (_) => CounterBloc(),\n      child: Scaffold(\n        body: Center(\n          child: BlocBuilder<CounterBloc, int>(\n            builder: (context, count) => Text('$count', style: TextStyle(fontSize: 48)),\n          ),\n        ),\n        floatingActionButton: FloatingActionButton(\n          onPressed: () => context.read<CounterBloc>().add(Increment()),\n          child: Icon(Icons.add),\n        ),\n      ),\n    );\n  }\n}",
          language: "dart",
          tip: "BLoC 强制将 UI 和业务逻辑分离，虽然模板代码多了点，但可测试性和可维护性大幅提升。",
        },
      ],
      quiz: [
        {
          question: "Flutter 中 setState 的作用？",
          options: ["初始化状态", "通知框架重新构建 Widget", "销毁 State", "创建新 State"],
          answer: 1,
          explanation: "setState 告诉 Flutter 数据变了请重新 build，Flutter 高效地只更新变化的部分。",
        },
        {
          question: "Provider 中 ChangeNotifier 的 notifyListeners 做什么？",
          options: ["注销监听", "通知所有监听者数据已更新", "创建新的监听", "移除所有监听"],
          answer: 1,
          explanation: "notifyListeners 触发所有 Consumer 重新构建，类似 setState 但作用范围更广。",
        },
        {
          question: "Riverpod 相比 Provider 的一大优势？",
          options: ["更快", "不依赖 BuildContext 即可访问数据", "代码更少", "不支持 Flutter"],
          answer: 1,
          explanation: "Riverpod 的 ref 对象可以脱离 Widget 树访问 Provider（如单元测试）。",
        },
        {
          question: "BLoC 模式的核心概念？",
          options: ["MVC", "Events 输入，States 输出，BLoC 在中间处理", "全部用 Provider", "只用 setState"],
          answer: 1,
          explanation: "BLoC = Business Logic Component，事件驱动进状态出，UI 只负责展示。",
        },
      ],
    },
    "git-advanced": {
      slug: "git-advanced",
      sections: [
        {
          title: "cherry-pick——挑拣提交",
          content: "cherry-pick 把你想要的一个或几个 commit 从别的分支复制到当前分支。你不需要 merge 整个分支，只要选其中的几个 commit。\n\n典型场景：修了一个 bug 在 develop 分支上，但这个修复也需要应用到生产分支上。用 cherry-pick 把那个修复 commit 摘到生产分支。\n\ncherry-pick 会在当前分支创建一个新的 commit，内容跟来源 commit 一样，但 commit hash 不同（因为是不同的分支上创建的）。这意味着后续 merge 两个分支时可能会有重复内容冲突，需要手动解决。\n\n操作：git cherry-pick commit-hash。可以一次挑多个：git cherry-pick hash1 hash2 hash3，或者一个范围：git cherry-pick hash1..hash3。",
          code: "# 把某个 commit 复制到当前分支\ngit cherry-pick abc1234\n\n# 一次挑多个\ngit cherry-pick abc1234 def5678\n\n# 挑一个范围（不含 hash1，从 hash2 到 hash3）\ngit cherry-pick hash1..hash3\n\n# 发生了冲突？跟 merge 一样解决\n# 解决后 git add && git cherry-pick --continue\n\ngit cherry-pick --abort   # 放弃本次 cherry-pick",
          language: "bash",
          tip: "cherry-pick 之后记得沟通——两个分支现在有内容相同的不同 commit，后面 merge 时可能会冲突。最好 cherry-pick 后就清理好。",
        },
        {
          title: "bisect——二分法找 bug",
          content: "bisect 是 Git 最神奇的命令——用二分查找算法帮你找出是哪个 commit 引入了 bug。你不用一个个 commit 试，几十上百个 commit 只需测试几次就能定位。\n\n用法：git bisect start——开始二分。git bisect bad——标记当前版本有问题。git bisect good commit-hash——标记某个旧版本是好的（没 bug）。Git 自动切到中间版本让你测试。每次测试完告诉 Git 是好（good）还是坏（bad），反复直到找到元凶。\n\n你可以手动测试，也可以写个自动测试脚本：git bisect run npm test。Git 自动二分法查找，找到坏 commit 就停止。\n\n找到后 git bisect reset 回到二分之前的状态。",
          code: "# 二分查找的完整流程\ngit bisect start\ngit bisect bad                  # 当前版本有 bug\ngit bisect good v1.0.0          # v1.0.0 是好的\n\n# Git 自动切到中间版本\n# 你测试一下，然后告诉 Git：\n# git bisect good    （如果这个版本没 bug）\n# git bisect bad     （如果这个版本有 bug）\n\n# 反复几次后 Git 告诉你第一个出问题的 commit\ngit bisect reset              # 退出二分模式\n\n# 自动化二分（有测试脚本的话）\ngit bisect run npm test",
          language: "bash",
          tip: "bisect 是找回归 bug 的神器。当你说\"之前还是好的，不知道哪个改动坏了\"，bisect 几分钟就帮你揪出来。",
        },
        {
          title: "reflog——后悔药",
          content: "reflog 记录了你在 Git 仓库里 HEAD 的每一次移动。就算你 git reset --hard 把 commit 丢了，只要它曾经在本地仓库存在过，reflog 里就能找到。默认保存 90 天。\n\ngit reflog 列出 HEAD 的所有移动记录，每条有一个编号（HEAD@{0} 是最新的，HEAD@{1} 是上一次）。找到你误删的那条记录对应的 commit hash，然后用 git reset --hard 或 git checkout 恢复。\n\nreflog 不只救 reset 误操作，还能找回删掉的分支（merge 后删了分支，后来发现还需要？去 reflog 找最后一次 commit 的 hash 然后 git branch recover-branch hash）。",
          code: "# 查看 reflog\ngit reflog\n\n# 输出示例\n# abc1234 HEAD@{0}: commit: fix login bug\n# def5678 HEAD@{1}: merge feature/branch\n# 7890abc HEAD@{2}: reset: moving to HEAD~1\n\n# 恢复到 reset 之前的状态\ngit reset --hard def5678\n\n# 找回误删的分支\ngit reflog | grep \"feature/old\"\ngit branch recovered-branch abc1234",
          language: "bash",
          tip: "reflog 是本地的，push 不到远程仓库。用来救你本地的误操作就够了。远程仓库的误操作需要用 GitHub 的 protected branch 之类的机制保护。",
        },
        {
          title: "rebase——变基的深入理解",
          content: "rebase 和 merge 做的是同一件事——把一个分支的改动整合到另一个分支——但方式不同：\n\nmerge 创建一个特殊的 merge commit，把两个分支的历史连在一起。历史保留原有的分叉结构，能看到哪个 commit 来自哪个分支。\n\nrebase 把当前分支的 commit 依次摘出来，放到目标分支的最新 commit 之后重新提交。历史变成一条直线——看起来像你一直在目标分支上顺序开发。\n\nrebase 的金科玉律：不要 rebase 已经 push 到共享仓库的 commit。rebase 会改变 commit hash，别人基于旧 hash 的工作就会乱掉。只 rebase 你自己本地的、还没 push 的分支。\n\n交互式 rebase（rebase -i）可以编辑历史——压缩多个 commit 为一个（squash）、重新排序、修改 commit message、拆分 commit。这是保持 commit 历史干净的重要工具。",
          code: "# 将当前分支 rebase 到 main 上\ngit checkout feature\ngit rebase main\n\n# 交互式 rebase——修改最近 3 个 commit\ngit rebase -i HEAD~3\n# 编辑器里可以：\n# pick → 保留\n# squash → 合并到上一个 commit\n# reword → 改 message\n# drop → 删除\n# edit → 暂停让你修改\n\n# rebase 冲突后\ngit add .                # 解决后 add\ngit rebase --continue    # 继续\ngit rebase --abort       # 放弃 rebase",
          language: "bash",
          warning: "rebase 后 push 需要 --force。如果别人在这期间 pull 了你的旧分支，他的仓库会出问题。rebase 前确保只有你一个人在改这个分支。",
        },
        {
          title: "submodule 与 subtree——管理项目中的外部代码",
          content: "当你的项目依赖其他 Git 仓库的代码时（如共享库、主题），两种方案：\n\nsubmodule——在你的仓库里记录外部仓库的引用（指向某个 commit）。git clone 时默认不会下载 submodule，需要 git submodule update --init。\n\n优点：外部仓库独立维护，版本明确。\n缺点：操作复杂——clone 多一步、切换分支要注意 submodule 是否匹配、pull 了主仓库还要进 submodule 里 pull。\n\nsubtree——把外部仓库的代码合并到你的仓库的一个子目录里。没有额外的 clone 步骤，外人看就是你这个仓库的代码。\n\n优点：外人 clone 一步到位。缺点：仓库变大（包了外部代码），历史记录混杂。\n\n现代项目更推荐用包管理器（npm、pip）管依赖，而不是 submodule。",
          language: "bash",
        },
      ],
      quiz: [
        {
          question: "cherry-pick 做什么？",
          options: ["删除 commit", "把指定 commit 复制到当前分支", "合并整个分支", "创建新分支"],
          answer: 1,
          explanation: "cherry-pick 把某个（或某些）commit 从别的分支摘过来，只复制你指定的，不复制整个分支的内容。",
        },
        {
          question: "git bisect 找的是什么？",
          options: ["最大的 commit", "哪个 commit 引入了 bug（二分查找）", "最新的 commit", "合并点的 commit"],
          answer: 1,
          explanation: "bisect 用二分法在 commit 历史里查找第一个出 bug 的 commit。每次测试一半，几十个 commit 只要测几次。",
        },
        {
          question: "rebase 的金科玉律是什么？",
          options: ["永远不要 rebase", "不要 rebase 已 push 到共享仓库的 commit", "每次提交前都 rebase", "rebase 之前要先 merge"],
          answer: 1,
          explanation: "rebase 会改变 commit hash。如果这些 commit 已经被别人拉取了，你 rebase 后 push --force 会搞乱别人的仓库。",
        },
        {
          question: "git reflog 记录的是什么？",
          options: ["远程仓库历史", "HEAD 的每次移动记录", "所有分支的完整历史", "只记录 merge 操作"],
          answer: 1,
          explanation: "reflog 记录了 HEAD 在本地仓库里的每次位置变化。误 reset --hard 后可以从这里找回丢失的 commit。",
        },
        {
          question: "交互式 rebase 的 squash 选项做什么？",
          options: ["删除 commit", "把 commit 合并到前一个 commit", "跳过 commit", "复制 commit"],
          answer: 1,
          explanation: "squash 把当前 commit 的内容合并到上一个 commit，两个合成一个。清理\"改个 typo\"\"再改个 typo\"这种琐碎 commit。",
        },
      ],
    },
    "git-commands": {
      slug: "git-commands",
      sections: [
        {
          title: "Git 工作区、暂存区、本地仓库",
          content: "Git 最核心的三个概念搞懂了操作就通透了：\n\n工作区——你电脑上能看到、能编辑的文件目录。git clone 下来或者 init 出来的就是工作区。\n暂存区——一个中间地带，决定哪些修改纳入下次 commit。用 git add 把文件从工作区放进暂存区。你可以只 add 部分文件的修改，不想要的先留着下次再 commit。\n本地仓库——git commit 之后，暂存区的快照永久保存在本地仓库里（.git 目录）。commit 就是给当前快照打个版本标签。\n\n还有远程仓库——github/gitlab 上的那个。git push 把本地的 commit 推上去，git pull 把远程的拉下来。\n\n这个流程简记：工作区改文件 → git add 到暂存区 → git commit 到本地仓库 → git push 到远程仓库。",
          code: "# 完整的工作流\ngit status                # 看看改了啥\ngit diff                  # 看看具体改了啥内容\ngit add file.txt          # 把改动加入暂存区\ngit add .                 # 加所有改动\ngit diff --staged         # 看看暂存区里有什么\ngit commit -m \"msg\"       # 提交到本地仓库\ngit push origin main      # 推到远程仓库",
          language: "bash",
          tip: "git status 告诉你哪个区有改动；git diff 看工作区 vs 暂存区的差异；git diff --staged 看暂存区 vs 上次 commit 的差异。",
        },
        {
          title: "commit、log、show——提交与查看历史",
          content: "commit 是 Git 的核心操作——给当前暂存区打个快照保存到仓库。每个 commit 有个唯一的 SHA-1 hash（40 位十六进制）。\n\ngit log 看提交历史，按时间从新到老排列。参数很多：--oneline（一行一条简洁）、--graph（画分支图）、--all（所有分支）、--author=\"名字\"（按作者筛选）、--since/--until（按日期筛选）。\n\ngit show 看某个 commit 的详细内容——改了哪些文件、具体改了哪几行。可以看当前 HEAD 也可以看任意 commit hash。\n\ngit blame 看某个文件每一行是谁写的、在哪次 commit 改的——找到罪魁祸首的利器。",
          code: "# 提交\ngit commit -m \"feat: add user login\"\ngit commit -am \"fix: typo\"        # add + commit 一步（只对已跟踪的文件有效）\n\n# 查看历史\ngit log --oneline --graph --all\ngit log --author=\"Alice\" --since=\"2024-01-01\"\ngit log -p file.txt              # 看某个文件的修改历史\n\n# 查看详情\ngit show HEAD\ngit show abc1234                 # 看某个 commit\n\ngit blame package.json           # 谁改了这行",
          language: "bash",
          tip: "commit message 规范推荐 Conventional Commits：feat:（新功能）、fix:（修 bug）、docs:（文档）、refactor:（重构）。",
        },
        {
          title: "diff——文件差异对比",
          content: "git diff 是看文件改了什么的行家工具。不同参数看不同区域的差异：\n\ngit diff（不加参数）——工作区跟暂存区的差异。你改了但还没 add 的内容。\ngit diff --staged——暂存区跟上次 commit 的差异。你 add 了但还没 commit 的内容。\ngit diff HEAD——工作区跟上次 commit 的差异（包含暂存和未暂存的改动）。\ngit diff branch1..branch2——两个分支之间的差异。\ngit diff commit1 commit2——两个提交之间的差异。",
          code: "# 各种 diff\ngit diff                        # 工作区 vs 暂存区\ngit diff --staged               # 暂存区 vs HEAD\ngit diff HEAD                   # 工作区 vs HEAD\ngit diff main..feature          # 两个分支的差异\ngit diff abc1234 def5678        # 两个 commit 的差异\ngit diff --stat                 # 只看改动统计（哪些文件改了几行）\ngit diff --name-only            # 只列改动的文件名",
          language: "bash",
          tip: "git diff --name-only 配合 xargs 可以做批量操作——比如查出所有改动的 .js 文件然后只对他们跑 lint。",
        },
        {
          title: "amend、reset、restore——修改与撤销",
          content: "改错了怎么撤销？Git 提供了多个命令，按不同阶段用不同方法：\n\n撤销工作区的改动——git restore file.txt 把工作区的文件恢复到暂存区版本（或恢复到最后一次 commit）。\n\n撤销暂存区的改动——git restore --staged file.txt 把文件从暂存区移出（add 的逆操作）。\n\n修改最近一次 commit——git commit --amend 把暂存区的内容追加到上一次 commit。可以改 message、补漏加文件。但不要 amend 已经 push 了的 commit（会改变 hash，别人没法同步）。\n\n撤销 commit——git reset --soft HEAD~1 撤销 commit 但保留改动在暂存区；git reset --mixed HEAD~1 撤销 commit 且取消暂存但保留文件改动；git reset --hard HEAD~1 彻底回到上一个 commit（改动的文件丢光）。",
          code: "# 撤销工作区修改\ngit restore file.txt\ngit restore .                   # 撤销所有文件\n\n# 撤销暂存区\ngit restore --staged file.txt\n\n# 修改最近一次 commit\ngit add forgotten.txt\ngit commit --amend -m \"new msg\"\n\n# 撤销 commit\ngit reset --soft HEAD~1    # 保留改动在暂存区\ngit reset --mixed HEAD~1   # 保留改动在工作区（未暂存）\ngit reset --hard HEAD~1    # 彻底删掉（不可恢复！）",
          language: "bash",
          warning: "git reset --hard 没有后悔药！执行前确认你知道自己在干什么。已经在 commit 里的东西可以通过 reflog 恢复，但 uncommitted 的改动真没了。",
        },
        {
          title: "tag——给版本打标签",
          content: "tag 是给某个 commit 打上一个有意义的标签，通常用来标记发布版本（v1.0.0、v2.1.3）。\n\n轻量标签（Lightweight Tag）——只是指向某个 commit 的引用，没有额外信息。\n注释标签（Annotated Tag）——完整的 Git 对象，包含标签人、日期、备注消息。git tag -a 创建的就是注释标签，推荐用这种。\n\ngit push 默认不会推送标签到远程，需要 git push --tags 或 git push origin v1.0.0。\n\ngit tag -l 列出所有标签。git show v1.0.0 看标签详情（包括它指向的 commit 信息）。\ngit checkout v1.0.0 可以把工作区切换到标签对应的代码状态（但会进入 detached HEAD 状态）。",
          code: "# 创建标签\ngit tag v1.0.0                          # 轻量标签\ngit tag -a v1.0.0 -m \"正式发布 1.0\"      # 注释标签（推荐）\n\n# 给过去的 commit 打标签\ngit tag -a v0.9.0 abc1234 -m \"0.9 beta\"\n\n# 推送标签\ngit push origin v1.0.0                  # 推单个标签\ngit push origin --tags                  # 推所有标签\n\n# 查看/删除\ngit tag -l                              # 列出所有标签\ngit show v1.0.0                         # 看标签详情\ngit tag -d v1.0.0                       # 删除本地标签\ngit push origin --delete v1.0.0         # 删除远程标签",
          language: "bash",
          tip: "语义化版本号（SemVer）格式是 主版本.次版本.修订号（如 2.1.3）。主版本变化表示不兼容的 API 修改。",
        },
      ],
      quiz: [
        {
          question: "git add 把文件从哪移到哪？",
          options: ["工作区到本地仓库", "工作区到暂存区", "暂存区到本地仓库", "本地仓库到远程"],
          answer: 1,
          explanation: "git add 把改动从工作区移入暂存区，为下次 commit 做准备。commit 才把暂存区的内容保存到本地仓库。",
        },
        {
          question: "git diff 和 git diff --staged 有什么区别？",
          options: ["一样", "git diff 看工作区 vs 暂存区，--staged 看暂存区 vs commit", "--staged 更快", "git diff 看的是 commit 之间差异"],
          answer: 1,
          explanation: "git diff 看工作区（你改了的代码）跟暂存区（add 过的代码）的差异。--staged 看暂存区跟上次 commit 的差异。",
        },
        {
          question: "git commit --amend 不该在什么情况下用？",
          options: ["commit 没 push 前", "commit 已经 push 到远程后", "改 commit message", "补加漏掉的文件"],
          answer: 1,
          explanation: "amend 会改变 commit 的 hash。已经 push 的 commit 别人可能基于它工作，改了 hash 会导致冲突。",
        },
        {
          question: "git reset --hard HEAD~1 会丢失什么？",
          options: ["只丢 commit 记录", "丢 commit 记录和所有未提交的改动", "什么都不丢", "只丢暂存区的改动"],
          answer: 1,
          explanation: "--hard 彻底回到指定状态，那次 commit 之后的改动和当前工作区的未提交改动全没了。最危险的操作。",
        },
        {
          question: "注释标签跟轻量标签的区别？",
          options: ["没区别", "注释标签包含作者、日期、备注等元信息", "轻量标签不能推送", "注释标签只能给一个 commit"],
          answer: 1,
          explanation: "注释标签（git tag -a）把标签本身作为一个 Git 对象，可以存备注、作者等信息。正式发布建议用注释标签。",
        },
      ],
    },
    "git-hooks": {
      slug: "git-hooks",
      sections: [
        {
          title: "Git Hooks 是干什么的",
          content: "Git Hooks 是在 Git 操作（commit、push、merge 等）前后自动执行的脚本。就像自动化门检——你进门之前先过安检，不合格就不让你进。\n\n常见用途：\npre-commit——commit 之前检查代码格式、跑 lint、跑单元测试。不通过就不让 commit。\ncommit-msg——检查 commit message 是否符合规范（如 Conventional Commits）。\npre-push——push 之前跑完整的测试套件。\npost-merge——merge 之后自动安装依赖（npm install）。\npost-receive——远程仓库收到 push 后自动部署（CI/CD 的原始形态）。\n\nHooks 放 .git/hooks/ 目录下，默认有一些 .sample 文件。去掉 .sample 后缀并设为可执行就生效。但 .git 目录不纳入版本控制，所以团队共享 hook 需要额外工具。",
          code: "# 查看已有 hooks\nls .git/hooks/\n\n# 创建一个简单的 pre-commit hook\ncat > .git/hooks/pre-commit << 'EOF'\n#!/bin/bash\necho \"Running pre-commit checks...\"\nnpm run lint\nif [ $? -ne 0 ]; then\n  echo \"Lint failed! Commit rejected.\"\n  exit 1\nfi\nEOF\nchmod +x .git/hooks/pre-commit",
          language: "bash",
          tip: "Husky 是 Node.js 生态里管理 Git Hooks 的主流工具。它把 hooks 存在项目里（可版本控制），install 时自动设置。",
        },
        {
          title: "常用的 Client-Side Hooks",
          content: "客户端 hooks 在你本地执行，常用这几个：\n\npre-commit——最常用的 hook。在 commit message 输入之前执行。跑 lint、格式化、检查 debug 代码、阻止提交 secrets。返回非 0 退出码就阻止 commit。\n\nprepare-commit-msg——在 commit message 编辑器打开前执行。可以自动生成 commit message 模板（比如从分支名提取 issue 号）。\n\ncommit-msg——输入完 commit message 后验证。检查是否包含 ticket 号、是否符合格式规范。\n\npre-rebase——rebase 之前执行，可以阻止向某些分支 rebase。\n\npost-checkout——切换分支后执行。可以自动安装新分支的依赖、切换数据库连接。",
          code: "# commit-msg hook 示例——检查 commit message 格式\n#!/bin/bash\nMSG_FILE=$1\nMSG=$(cat $MSG_FILE)\nPATTERN=\"^(feat|fix|docs|style|refactor|test|chore): \"\n\nif ! echo \"$MSG\" | grep -qE \"$PATTERN\"; then\n  echo \"Commit message must follow: type: description\"\n  echo \"Allowed types: feat, fix, docs, style, refactor, test, chore\"\n  exit 1\nfi",
          language: "bash",
        },
        {
          title: "Server-Side Hooks",
          content: "服务端 hooks 在远程仓库收到 push 时执行，用来做服务端校验和自动化：\n\npre-receive——收到 push 之后、更新引用之前执行。可以做最后的验证——检查是否有 merge conflict、检查提交者是否有权限。如果拒绝，push 就失败。\n\nupdate——类似 pre-receive，但对每个被推送的分支分别执行。可以只阻止向 main 分支直接 push。\n\npost-receive——push 更新完引用后执行。最经典的使用场景：自动部署。服务器收到代码后把最新代码部署到生产环境（最早的 CI/CD 实现）。\n\nGitHub/GitLab 等平台封装了这些 hooks 为 Webhooks、GitHub Actions、GitLab CI——属于高级版服务端 hooks，更灵活好用。",
          code: "# 服务端 post-receive hook——自动部署\n#!/bin/bash\n# 放在裸仓库 (bare repo) 的 hooks 目录\nDEPLOY_DIR=\"/var/www/myapp\"\nGIT_DIR=\"/var/www/myapp.git\"\n\nwhile read old new ref; do\n  if [ \"$ref\" = \"refs/heads/main\" ]; then\n    git --work-tree=$DEPLOY_DIR --git-dir=$GIT_DIR checkout -f main\n    cd $DEPLOY_DIR\n    npm ci --production\n    pm2 restart myapp\n    echo \"Deployed!\"\n  fi\ndone",
          language: "bash",
          warning: "服务端 hooks 在远程仓库上执行，脚本 bug 可能导致 push 失败或服务异常。务必在测试环境验证过再上生产。",
        },
        {
          title: "用 Husky 管理 Hooks（团队共享）",
          content: ".git/hooks 目录不在版本控制里，团队成员没法共享 hook。Husky 解决了这个问题——它把 hook 配置存在项目代码里（如 .husky/pre-commit），npm install 时自动设置 hook。\n\n安装 Husky：npx husky init。之后在 .husky/ 目录下创建 hook 文件。比如 .husky/pre-commit 内容为 npm run lint。\n\n配合 lint-staged——只对 git add 后的文件跑 lint，不对所有文件跑（省时间）。即使项目有几千个文件，只检查你改了的几个。\n\n这两个工具配合是前端项目的标准配置——husky 触发 hook，lint-staged 在 pre-commit hook 里只跑改动文件的检查。",
          code: "# 安装 husky\nnpm install husky --save-dev\nnpx husky init\n\n# 创建 pre-commit hook\necho \"npx lint-staged\" > .husky/pre-commit\n\n# package.json 里配置 lint-staged\n{\n  \"lint-staged\": {\n    \"*.{js,ts,jsx,tsx}\": [\n      \"eslint --fix\",\n      \"prettier --write\"\n    ],\n    \"*.{css,scss}\": [\"stylelint --fix\"]\n  }\n}",
          language: "bash",
          tip: "lint-staged 只检查暂存区的文件，不会对整个项目全量扫描。commit 速度不受项目大小影响。",
        },
        {
          title: "Hooks 的坑与最佳实践",
          content: "Git Hooks 强大但也容易出问题：\n\n1. 别在 hook 里执行太慢的任务——pre-commit 每次提交都跑，如果跑了完整的测试套件（几分钟），commit 体验极差。pre-commit 适合轻量检查（lint），重任务放到 pre-push 或 CI。\n\n2. 提供跳过方法——偶尔紧急情况需要跳过 hook。git commit --no-verify 跳过 pre-commit 和 commit-msg hook。但要慎用，别成为习惯。\n\n3. 跨平台问题——hook 脚本可能用了 bash 特有的语法，Windows 上不能跑。Husky 对跨平台有处理。\n\n4. Hook 脚本保持简单——hook 脚本越复杂越容易出 bug。复杂逻辑应该抽成独立的脚本文件，hook 文件里只调用它。",
          code: "# 跳过 hooks（紧急情况用）\ngit commit --no-verify -m \"hotfix\"\ngit push --no-verify\n\n# hook 里调独立脚本\n# .husky/pre-commit\n#!/bin/sh\nnode scripts/pre-commit-check.js\n\n# pre-push hook——推送前跑测试\n#!/bin/sh\nnpm test",
          language: "bash",
          tip: "pre-commit hook 超 3 秒就该优化了。重复提交代码是很频繁的操作，hook 太慢会让人想用 --no-verify 跳过去。",
        },
      ],
      quiz: [
        {
          question: "pre-commit hook 什么时候触发？",
          options: ["push 之前", "commit 之前（输入 message 前）", "merge 之前", "clone 之后"],
          answer: 1,
          explanation: "pre-commit 在 git commit 命令执行后、commit message 编辑器弹出前触发。返回非 0 就阻止本次 commit。",
        },
        {
          question: "为什么 .git/hooks 目录不适合直接管理团队共享的 hooks？",
          options: ["hooks 不能共享", ".git 目录不被版本控制", "hooks 太大了", "只有本地能用"],
          answer: 1,
          explanation: ".git 目录不会被 git 跟踪（它是 git 自己的数据），所以里面的 hooks 也不能通过 push/pull 共享。Husky 解决了这个问题。",
        },
        {
          question: "lint-staged 配合 Husky 解决了什么问题？",
          options: ["只检查改动的文件，提升 commit 速度", "自动修复所有文件", "创建 PR", "管理分支"],
          answer: 0,
          explanation: "lint-staged 只对暂存区的文件跑 lint/格式化，不需要全项目扫描。commit 速度跟项目大小解耦。",
        },
        {
          question: "怎样跳过 pre-commit hook？",
          options: ["git commit --skip", "git commit --no-verify", "删掉 hook 文件", "git skip commit"],
          answer: 1,
          explanation: "--no-verify 跳过 pre-commit 和 commit-msg hook。紧急情况可以用，但别养成习惯。",
        },
        {
          question: "post-receive hook 最经典的应用场景是什么？",
          options: ["发送邮件", "自动部署（收到 push 后部署代码）", "代码格式化", "冲突检查"],
          answer: 1,
          explanation: "post-receive 在远程仓库收到推送后执行。最早的自动部署就是靠这个——服务端收到 push 后把代码部署到生产目录。",
        },
      ],
    },
    "git-remotes": {
      slug: "git-remotes",
      sections: [
        {
          title: "remote——跟远程仓库交互",
          content: "remote 是 Git 里对远程仓库的引用。clone 下来的仓库自动有一个叫 origin 的远程。\n\ngit remote -v——看当前配置了哪些远程仓库及其 URL。通常 origin 指向你的仓库。\n\ngit remote add 名字 URL——添加新的远程仓库（比如 upstream 指向原仓库，方便同步别人的更新）。\n\ngit remote remove——删除不再需要的远程。\ngit remote rename——改名字。\ngit remote show 名字——查看远程仓库的详细信息（分支、fetch/push URL）。",
          code: "# 查看远程\ngit remote -v\n\n# 添加上游仓库\ngit remote add upstream https://github.com/original/repo.git\n\n# 从上游同步\ngit fetch upstream\ngit merge upstream/main\n\n# 查看远程详细信息\ngit remote show origin\n\n# 改 URL\ngit remote set-url origin git@github.com:user/new-repo.git\n\n# 删除远程\ngit remote remove upstream",
          language: "bash",
          tip: "Fork 了别人的项目，先把原项目加为 upstream。定期 git fetch upstream && git merge upstream/main 跟上原项目的更新。",
        },
        {
          title: "fetch、pull、push——数据同步三件套",
          content: "fetch、pull、push 是跟远程仓库同步的三个核心命令：\n\ngit fetch origin——从远程下载所有你本地没有的数据（新的分支、新的 commit），但不自动合并到你的代码里。只拉数据不看代码，安全操作。\n\ngit pull——fetch + merge 二合一。把远程的更新拉下来并合并到当前分支。相当于自动执行了 fetch 再 merge。如果有冲突会提示你手动解决。\n\ngit pull --rebase——fetch + rebase 二合一。拉下远程的更新然后用 rebase 方式整合（你的本地提交移到远程更新之后）。历史更线型好看但解决冲突步骤不同。\n\ngit push origin branch——把本地的 commit 推到远程。如果远程有了你本地没有的更新（别人推了新的），push 会被拒绝，需要先 pull。",
          code: "# fetch——安全拉数据不合并\ngit fetch origin\ngit fetch --all                # 拉所有远程\n\n# pull——拉数据+合并\ngit pull origin main\ngit pull --rebase              # 用 rebase 方式整合\n\n# push——推本地到远程\ngit push origin main\ngit push -u origin feature     # 首次推送设置跟踪\ngit push --force-with-lease    # 安全的强制推送",
          language: "bash",
          tip: "git pull --rebase 比默认的 git pull 产生的历史更干净，推荐。如果 rebase 过程中有冲突，解决后 git rebase --continue。",
        },
        {
          title: "Pull Request / Merge Request 流程",
          content: "PR（Pull Request，GitHub 叫法）或 MR（Merge Request，GitLab 叫法）是现代团队协作的标准流程：\n\n1. 从主分支创建一个 feature 分支\ngit checkout -b feature/new-login\n\n2. 开发、commit、push 到远程\ngit push origin feature/new-login\n\n3. 在 GitHub/GitLab 上创建 PR/MR——描述你做了什么、为什么这样做。\n\n4. 同事 Code Review——在 PR 页面逐行看代码、提意见、讨论。\n\n5. 修改代码、push 追加 commit。PR 自动更新。\n\n6. Review 通过后合并到主分支——可以选择 merge commit、squash merge（合并所有 commit 为一个）、或 rebase merge。",
          code: "# PR 工作流\ngit checkout -b feature/new-feature\n# ... 写代码 ...\ngit add .\ngit commit -m \"feat: add new feature\"\ngit push -u origin feature/new-feature\n# 去 GitHub 创建 PR\n\n# PR review 后修改\ngit add .\ngit commit -m \"fix: review feedback\"\ngit push\n# PR 自动更新，不需要重新创建\n\n# 合并后清理本地\ngit checkout main\ngit pull origin main\ngit branch -d feature/new-feature",
          language: "bash",
          tip: "PR 提交前先 git fetch origin main && git merge origin/main 解决掉可能的冲突，这样 PR 里只有你自己的改动，review 更清爽。",
        },
        {
          title: "fork 与 upstream——给开源项目贡献代码",
          content: "给别人项目贡献代码的标准流程：\n\n1. Fork——在 GitHub 上点 Fork 按钮，把别人的仓库复制到你自己的账号下。\n2. Clone——把你 fork 的仓库 clone 到本地。\n3. 添加上游——git remote add upstream 原始仓库地址。注意区分 origin（你的 fork）和 upstream（原仓库）。\n4. 创建分支、改代码、commit、push 到你自己的 fork。\n5. 在你的 fork 里创建 Pull Request，目标指向原仓库。\n6. 维护同步——定期 git fetch upstream && git merge upstream/main，保持你的 fork 跟原仓库同步。",
          code: "# Fork 工作流\ngit clone https://github.com/your-user/project.git\ngit remote add upstream https://github.com/original/project.git\n\n# 保持同步\ngit fetch upstream\ngit checkout main\ngit merge upstream/main\ngit push origin main\n\n# 在同步后的基础上创建新功能分支\ngit checkout -b feature/my-contribution\n# 改代码 commit push\ngit push origin feature/my-contribution\n# 去 GitHub 从 your-user/project 向 original/project 创建 PR",
          language: "bash",
        },
        {
          title: "冲突解决",
          content: "当两个人改了同一个文件的同一行，Git 不知道用谁的——这就产生了冲突。冲突不是 Bug，是正常的工作流程。\n\n冲突的标志：Git 在文件里插入 <<<<<<<、=======、>>>>>>> 标记，标记之间分别是你改的和别人改的内容。\n\n解决冲突的步骤：\n1. 打开冲突文件，找到标记位置\n2. 决定保留哪个版本——保留你的、保留别人的、或者合并两者\n3. 删除冲突标记（<<<<<<、=======、>>>>>>>）\n4. git add 标记为已解决\n5. git commit 完成合并（merge 的 commit message 已经有模板）\n\n合并工具：vscode 自带冲突解决界面很直观；命令行可以用 git mergetool（会打开配置的可视化合并工具）。",
          code: "# merge 时发生冲突\ngit merge feature\n# CONFLICT: Merge conflict in file.txt\n\n# 查看哪些文件有冲突\ngit status\n\n# 解决后标记\ngit add file.txt\n\n# 完成合并\ngit commit\n\n# 放弃本次合并退回安全区\ngit merge --abort\n\n# 用 vscode 打开冲突文件更直观",
          language: "bash",
          tip: "冲突解决完别忘了删掉标记符号（<<<<<<、======、>>>>>>）。不删的话代码不但跑不起来，提交上去也尴尬。",
        },
      ],
      quiz: [
        {
          question: "git fetch 和 git pull 的区别？",
          options: ["没区别", "fetch 只下载不合并，pull 下载+合并", "pull 只下载不合并", "fetch 删除远程数据"],
          answer: 1,
          explanation: "fetch 把远程的新数据拉到本地但不碰你的代码。pull = fetch + merge。不知道 pull 会怎么影响代码时先 fetch 看看。",
        },
        {
          question: "Fork 工作流中 origin 和 upstream 分别指什么？",
          options: ["origin 是原仓库 upstream 是你的 fork", "origin 是你的 fork upstream 是原仓库", "两个都是你的", "upstream 不存在"],
          answer: 1,
          explanation: "你 fork 后自己那个叫 origin。添加上游原仓库叫 upstream。从 upstream 拉更新保持同步。",
        },
        {
          question: "冲突标记 <<<<<<< 和 >>>>>>> 之间是什么？",
          options: ["Git 日志", "两个版本有冲突的代码内容", "空行", "错误提示"],
          answer: 1,
          explanation: "<<<<<<< 到 ======= 是你当前的版本，======= 到 >>>>>>> 是你要合并进来的版本。你需要手动选择保留哪个或合并。",
        },
        {
          question: "git push --force-with-lease 跟 --force 有什么区别？",
          options: ["一样", "--force-with-lease 会检查远程有没有你不知道的新 commit，有就拒绝", "--force-with-lease 更快", "只有名字不同"],
          answer: 1,
          explanation: "--force-with-lease 是安全的强制推送——当你本地跟踪的远程引用被更新了（别人推了新的），它就拒绝执行，防止你覆盖别人的代码。",
        },
        {
          question: "PR 合并时 squash merge 做什么？",
          options: ["跳过 Code Review", "把 feature 分支的所有 commit 压成一个合并到主分支", "删除分支", "快速合并"],
          answer: 1,
          explanation: "Squash merge 把 feature 分支上的一堆 commit（可能很乱的 WIP commit）压成一条干净的 commit 放入主分支历史。",
        },
      ],
    },
    "git-stashing": {
      slug: "git-stashing",
      sections: [
        {
          title: "stash——临时存起来",
          content: "你正在开发一个功能，代码改了一半还没法 commit，突然要切到另一个分支修紧急 bug——stash 就是干这事的。它把你的改动暂存起来，让工作区变干净，之后随时可以恢复。\n\ngit stash——把工作区和暂存区的修改存进 stash 栈，工作区恢复干净。\ngit stash pop——把最近 stash 的改动恢复到工作区并删除这个 stash。\ngit stash apply——恢复但不删除 stash（可以反复恢复）。\ngit stash list——看当前有哪些 stash。\n\n默认 stash 不会保存未跟踪的文件（新文件），加 -u 参数（或 --include-untracked）才保存。加 -a 连被 .gitignore 忽略的文件也保存。",
          code: "# 临时保存改动\ngit stash                   # 快速保存\ngit stash -u                # 包含未跟踪的文件\ngit stash -m \"WIP: login feature\"  # 起个名\n\n# 查看 stash 列表\ngit stash list\n\n# 恢复\ngit stash pop               # 恢复最近一个并删除\ngit stash apply              # 恢复但不删除\ngit stash pop stash@{2}      # 恢复指定的 stash\n\n# 删除\ngit stash drop stash@{0}    # 删一个\ngit stash clear              # 删所有",
          language: "bash",
          tip: "stash 是一个栈——后 stash 的在上面。用 git stash list 看编号，stash@{0} 是最新的，stash@{1} 是次新的。",
        },
        {
          title: "reset——撤销 commit",
          content: "reset 的三个模式区别很大：\n\n--soft——只撤销 commit 本身，改动回到暂存区（就像没 commit 过）。适合「刚才那个 commit 太快了，改一下 message 再 commit」。\n\n--mixed（默认）——撤销 commit + 取消暂存区，改动回到工作区。适合「commit 了不该 commit 的东西，要拆成多个 commit」。\n\n--hard——撤销一切，回到指定状态。工作区和暂存区的改动全丢。适合「这个方向完全错了，从头来过」。但如果你要撤销的 commit 已经 push 了，--hard 之后 push 需要 --force。\n\ngit reflog 可以救回误操作的 reset，因为 Git 对 HEAD 的每次移动都有记录（默认保留 90 天）。",
          code: "# 三种 reset\ngit reset --soft HEAD~1     # commit 撤回，改动在暂存区\ngit reset --mixed HEAD~1    # commit 撤回，改动在工作区（未暂存）\ngit reset --hard HEAD~1     # 全部撤回，改动丢失\n\n# 回到某个特定的 commit\ngit reset --hard abc1234\n\n# 救回误 reset 的 commit\ngit reflog                  # 找到被丢掉的 commit hash\ngit reset --hard abc1234    # 回到那个状态",
          language: "bash",
          warning: "git reset --hard 之后 push 需要 git push --force。如果别人已经 pull 了你之前的 commit，force push 可能导致他们的仓库出问题。",
        },
        {
          title: "revert——安全的撤销",
          content: "reset 会改写历史，在共享分支上很危险。revert 是安全的选择——它创建一个新的 commit，这个 commit 的内容是某个旧 commit 的逆操作。历史不改写，只是往前加一个回退 commit。\n\ngit revert abc1234 创建一个新 commit，把 abc1234 那次提交的改动全部还原。跟 reset 不同，revert 之后历史上有两条记录：原来的 commit 和还原的 commit。\n\n多人协作的分支上，永远用 revert 而不是 reset。如果你已经 push 了错误 commit，reset + force push 会让别人的仓库出问题，revert 不会。",
          code: "# 还原某个 commit\ngit revert abc1234\n\n# 还原但不自动提交（可以先检查或合并）\ngit revert --no-commit abc1234\n\n# 还原一个 merge commit（需要指定保留哪个父提交）\ngit revert -m 1 abc1234\n\n# 还原最近几个 commit（从旧到新）\ngit revert HEAD~3..HEAD",
          language: "bash",
          tip: "在共享分支上（main、develop）出了事用 revert。在自己的 feature 分支上用 reset 没问题，反正只有你一个人在上面。",
        },
        {
          title: "checkout——切换与探索",
          content: "git checkout 是个多功能命令，能切分支、切 commit、恢复文件（新版 Git 建议用 git switch 切分支，用 git restore 恢复文件，功能拆分更清晰）。\n\n切分支：git checkout feature-branch。切到某个历史 commit：git checkout abc1234（进入 detached HEAD 状态——不挂任何分支上，如果在这里 commit 了容易丢）。\n\n切文件：git checkout -- file.txt 恢复工作区文件到最后一次 commit 的状态。这个操作不可逆，改动的文件直接丢了。\n\n创建并切换到新分支：git checkout -b new-feature。从某个特定 commit 分叉出来：git checkout -b hotfix abc1234。",
          code: "# 切换分支\ngit switch main                     # Git 2.23+ 推荐\n# git checkout main                 # 传统写法\n\n# 创建并切换新分支\ngit switch -c new-feature           # 推荐\ngit checkout -b new-feature         # 传统写法\n\n# 恢复文件\ngit restore file.txt                # 推荐\ngit checkout -- file.txt            # 传统写法\n\n# 切换到某个历史 commit\ngit checkout abc1234                # detached HEAD\ngit switch -c repair-branch abc1234 # 基于旧 commit 建新分支",
          language: "bash",
          tip: "Git 2.23+ 引入了 git switch 和 git restore，把 checkout 的多重功能拆分清楚。新手从这两个命令入手更不容易搞混。",
        },
        {
          title: "clean——清除未跟踪的文件",
          content: "git clean 清除工作区里没被 Git 跟踪的文件和目录（比如编译产物、临时文件）。这个操作非常危险——删掉的文件没经过 Git 管理，没法恢复。\n\ngit clean -n——先看看哪些文件会被删（dry run 不真删）。\ngit clean -f——删除未跟踪的文件（不包括目录）。\ngit clean -fd——删除未跟踪的文件和目录。\ngit clean -fdx——连 .gitignore 里忽略的文件也清理。\n\n常见用法：配合 git reset --hard 完全重置工作区——git reset --hard && git clean -fd。把项目恢复到 clone 下来的干净状态。",
          code: "# 先看看会删什么\ngit clean -n\n\n# 删除未跟踪的文件\ngit clean -f\n\n# 删除未跟踪的文件+目录\ngit clean -fd\n\n# 连 .gitignore 里的文件也删\ngit clean -fdx\n\n# 完全重置（慎用）\ngit reset --hard && git clean -fd",
          language: "bash",
          warning: "git clean -fd 删除的东西永远找不回来。执行前一定先用 -n 看看要删什么，确认没有重要文件。",
        },
      ],
      quiz: [
        {
          question: "git stash pop 和 git stash apply 的区别？",
          options: ["没区别", "pop 恢复后删除 stash，apply 保留", "apply 会删除 stash", "pop 可以指定 stash 编号"],
          answer: 1,
          explanation: "pop = apply + drop。恢复后立刻删除这个 stash。apply 恢复后 stash 还留着可以反复用。",
        },
        {
          question: "在共享分支上出了错误 commit，该用什么修复？",
          options: ["git reset --hard", "git revert", "git stash", "git clean"],
          answer: 1,
          explanation: "revert 创建新 commit 来撤销旧 commit，不改写历史。共享分支 force push 是禁忌，revert 是最安全的选择。",
        },
        {
          question: "git reset --soft 和 --mixed 的区别？",
          options: ["没区别", "--soft 改动留在暂存区，--mixed 改动回工作区", "--mixed 改动留在暂存区", "--soft 会删文件"],
          answer: 1,
          explanation: "--soft 只撤销 commit 记录，改动还在暂存区。--mixed 撤销 commit 并取消暂存，改动回工作区。",
        },
        {
          question: "git checkout 和 git switch 的关系？",
          options: ["完全不同的命令", "switch 是 checkout 切分支功能的替代品（Git 2.23+）", "checkout 已经废弃了", "switch 比 checkout 功能多"],
          answer: 1,
          explanation: "Git 把 checkout 功能拆成 switch（切分支）和 restore（恢复文件）。老命令还能用但新命令语义更清晰。",
        },
        {
          question: "git clean -fd 干什么的？",
          options: ["清理 Git 历史", "删除未跟踪的文件和目录", "清理暂存区", "删除所有分支"],
          answer: 1,
          explanation: "clean 删除 Git 不跟踪的文件。-f 是 force，-d 包含目录。这些文件不在 Git 里，删了就找不回来了。",
        },
      ],
    },
    "git-workflows": {
      slug: "git-workflows",
      sections: [
        {
          title: "分支策略的重要性",
          content: "没有分支策略的团队就是灾难——所有人往一个分支上 commit，代码冲突天天发生，永远不知道哪个版本能发布。分支策略是团队的协作规则。\n\n分支策略解决这几个问题：\n- 新功能怎么开发？（在哪个分支、怎么合回主线）\n- 生产环境跑了什么代码？（发布分支还是主分支）\n- 紧急 bug 怎么修？（怎么绕过正在开发的新功能快速修）\n- 开发中代码和稳定代码怎么隔离？\n\n常见的三种工作流：Git Flow（最经典但有点重）、GitHub Flow（简单轻量）、GitLab Flow（环境驱动）。选哪种看团队规模和发布节奏。",
          code: "# 不管哪种工作流，核心分支就两类：\n# 长期分支——main/master、develop（一直存在）\n# 短期分支——feature、hotfix、release（完成后就删）\n\n# 查看分支\n  git branch -a",
          language: "bash",
        },
        {
          title: "Git Flow——经典企业级工作流",
          content: "Git Flow 是最经典的分支模型，适合有明确发布周期的项目：\n\n两个永久分支：\nmaster/main——只有发布代码，每个 commit 都是一个发布版本（打 tag）。\ndevelop——开发集成分支，所有 feature 合到这里。\n\n三个临时分支：\nfeature/xxx——从 develop 分出，开发完成后合回 develop。\nrelease/x.x.x——从 develop 分出，做发布前的最后测试和修 bug（不改新功能）。完成后合到 master 和 develop。\nhotfix/x.x.x——从 master 分出修紧急 bug，完成后合到 master 和 develop。\n\n优点：结构清晰，角色的职责分明。缺点：对持续部署的项目来说太重了——release 分支的存在拖慢了发布节奏。",
          code: "# Git Flow 分支操作\ngit checkout -b feature/new-login develop      # 开始新功能\ngit checkout develop && git merge feature/new-login  # 合回开发\ngit branch -d feature/new-login               # 删除功能分支\n\ngit checkout -b release/1.2.0 develop         # 开始发布准备\ngit checkout master && git merge release/1.2.0  # 发布到主分支\ngit tag -a v1.2.0 -m \"Release 1.2.0\"          # 打版本标签\ngit checkout develop && git merge release/1.2.0\n\ngit checkout -b hotfix/bug-123 master          # 紧急修 bug\ngit checkout master && git merge hotfix/bug-123\ngit tag -a v1.1.1 -m \"Hotfix 1.1.1\"",
          language: "bash",
        },
        {
          title: "GitHub Flow——简单现代的轻量工作流",
          content: "GitHub Flow 比 Git Flow 简单得多，适合持续部署的项目：\n\n只有一条主分支 main——始终是可部署的稳定代码。\n\n所有开发在 feature 分支上——从 main 分出来，开发完成后通过 Pull Request 合回 main。\n\n合回 main 后立刻部署——这就是持续部署的理念：main 上的代码总是能发布的。\n\n优势：简单、部署快、适合 SaaS 产品。劣势：缺少 release 流程，修 hotfix 也得走完整的 feature branch 流程，紧急时不够快。\n\n适合：Web 应用、微服务、持续部署的团队。你的代码合并到 main 后立刻自动部署到生产。",
          code: "# GitHub Flow\ngit checkout -b feature/new-login main\ngit add . && git commit -m \"feat: new login\"\ngit push origin feature/new-login\n# 创建 Pull Request\n# Code Review\n# Merge to main\n# 自动部署（CI/CD）\n\ngit checkout main && git pull\ngit branch -d feature/new-login",
          language: "bash",
          tip: "GitHub Flow 的核心思想：main 分支永远可以部署。任何 feature 分支都是简短的（一两天内合回），不会长期分叉。",
        },
        {
          title: "Trunk-Based Development（主干开发）",
          content: "Trunk-Based Development 比 GitHub Flow 更激进——所有人直接往 trunk（main）分支上频繁提交小改动，feature 分支生命周期超短（几小时到一天）。\n\n核心原则：\n1. 小批量频繁提交——每天多次合到 main，减少合并冲突。\n2. Feature Flag——新功能代码合到 main 但用开关控制是否启用。功能开关不开，代码在生产跑着但用户看不到。\n3. 全面的自动化测试——没时间手动测，全靠 CI 保障质量。\n4. Pair Programming / Code Review——每个 commit 至少两个人看过。\n\nGoogle 和 Facebook 用的就是这种模式。对团队要求高——测试、监控、feature flag 基建要到位。小团队基础没做好的话反而容易出问题。",
          code: "# Trunk-Based 开发\n# 开发者 A\ngit pull origin main\ngit checkout -b tiny-feature\ngit commit -m \"add partial logic\"\ngit push && create PR && merge  # 几小时内就合回\n\n# 新功能用 feature flag 控制\nif (featureFlags.newLogin) {\n  // 新代码路径\n} else {\n  // 旧代码路径\n}",
          language: "bash",
          tip: "Trunk-Based 的精髓是 feature flag——代码可以部署到生产但不启用。新功能在后台悄悄开发测试，确认稳定后一键打开。",
        },
        {
          title: "选哪种工作流",
          content: "没有银弹，看场景选：\n\nGit Flow——适合有固定发布周期的传统软件（如 App、开源项目）。版本号明确，每次发布有测试期。团队规模中到大。\n\nGitHub Flow——适合持续部署的 Web 应用、SaaS 产品。改了就部署，不需要维护多个发布版本。团队规模不限。\n\nTrunk-Based——适合技术能力强的团队，追求最高发布频率。测试自动化程度高，有成熟的 Feature Flag 体系。小团队谨慎。\n\n混合方案——取各家之长。比如用 Git Flow 的 hotfix 分支理念 + GitHub Flow 的轻量 PR 流程。不用照搬教条。",
          code: "# 各工作流的标签对比\n# Git Flow: master, develop, feature/*, release/*, hotfix/*\n# GitHub Flow: main, feature/*\n# Trunk-Based: main, tiny-short-lived-branches\n\n# 切换工作流基本就是团队约定，Git 本身不管\n# 重要的是大家在同一个规则下协作",
          language: "bash",
        },
      ],
      quiz: [
        {
          question: "Git Flow 有几个永久分支？",
          options: ["1 个", "2 个（master 和 develop）", "3 个", "没有"],
          answer: 1,
          explanation: "master 放生产代码（有 tag），develop 放集成的开发代码。其他都是临时分支。",
        },
        {
          question: "GitHub Flow 关于 main 分支的核心原则是什么？",
          options: ["main 只读", "main 分支永远可部署", "main 分支不定期更新", "main 跟 develop 同步"],
          answer: 1,
          explanation: "GitHub Flow 要求 main 上的代码始终是可以部署到生产的稳定代码。每次 merge 后立刻或定时部署。",
        },
        {
          question: "Trunk-Based Development 怎么处理开发中不完整的功能？",
          options: ["不写单元测试", "用 Feature Flag 控制功能开关", "暂时不 merge", "删掉功能"],
          answer: 1,
          explanation: "功能代码合到主干了但用开关关闭。测试/灰度时打开，全量时去掉 flag。这就是 Facebook/Google 的模式。",
        },
        {
          question: "hotfix 分支在 Git Flow 里从哪分出、合到哪？",
          options: ["从 feature 分出合到 develop", "从 master 分出合到 master 和 develop", "从 develop 分出合到 master", "从 release 分出合到 master"],
          answer: 1,
          explanation: "hotfix 从 master 分出（基于当前生产代码修），修完后合回 master（修复生产）和 develop（集成分支也要有这修复）。",
        },
        {
          question: "团队应该严格遵循某个工作流吗？",
          options: ["应该照搬不调整", "不需要，可以借鉴然后根据团队情况定制", "没有任何工作流是最好的", "必须用 Git Flow"],
          answer: 1,
          explanation: "工作流是指导原则不是圣经。理解每种模式为什么那样设计，然后根据团队规模、发布节奏、项目特点裁剪。",
        },
      ],
    },
    "go-database": {
      slug: "go-database",
      sections: [
        {
          title: "database/sql 基础",
          content: "Go 标准库的 database/sql 包提供了统一的数据库操作接口，但实际驱动需要从第三方导入（如 go-sql-driver/mysql、lib/pq）。sql.Open 打开连接池但不验证连接，db.Ping 才真正测试连接。Exec 执行增删改，Query 执行查询，QueryRow 查单行。",
          code: "import (\n    \"database/sql\"\n    _ \"github.com/go-sql-driver/mysql\" // 匿名导入注册驱动\n)\n\nfunc main() {\n    db, err := sql.Open(\"mysql\", \"root:123456@tcp(localhost:3306)/mydb?parseTime=true\")\n    if err != nil {\n        log.Fatal(err)\n    }\n    defer db.Close()\n    \n    if err = db.Ping(); err != nil {\n        log.Fatal(err)\n    }\n    \n    fmt.Println(\"数据库连接成功\")\n}",
          language: "go",
          tip: "DSN 里加上 parseTime=true，这样 Scan 时间字段时自动转为 time.Time。",
        },
        {
          title: "CRUD 操作",
          content: "增删改用 Exec，返回 Result 可以拿 LastInsertId 和 RowsAffected。查询用 Query 返回 Rows，必须遍历调用 rows.Next() 然后 rows.Scan() 取出数据，最后 rows.Close()。单行查询用 QueryRow 配合 Scan，如果没找到返回 sql.ErrNoRows。",
          code: "// 增\nresult, err := db.Exec(\"INSERT INTO users(name, age) VALUES(?, ?)\", \"小明\", 18)\nid, _ := result.LastInsertId()\n\n// 查多条\nrows, err := db.Query(\"SELECT id, name FROM users WHERE age > ?\", 18)\ndefer rows.Close()\nfor rows.Next() {\n    var id int\n    var name string\n    rows.Scan(&id, &name)\n    fmt.Println(id, name)\n}\n\n// 查单条\nvar name string\nerr = db.QueryRow(\"SELECT name FROM users WHERE id = ?\", 1).Scan(&name)\nif err == sql.ErrNoRows {\n    fmt.Println(\"没找到\")\n}",
          language: "go",
          warning: "Query 返回的 rows 必须 Close，不然连接不会释放回池子导致连接泄漏。",
        },
        {
          title: "sqlx 库的使用",
          content: "database/sql 的 Scan 要手动写很多 & 变量，字段多了很烦。sqlx 库通过结构体 tag 自动映射，StructScan 一行代码把行数据映射到结构体。支持命名参数、In 查询（处理 IN (?) 的底层逻辑）等。在 sql 包的基础上封装，不会改变编程模型，上手很快。",
          code: "import \"github.com/jmoiron/sqlx\"\n\ntype User struct {\n    ID    int    `db:\"id\"`\n    Name  string `db:\"name\"`\n    Age   int    `db:\"age\"`\n}\n\ndb, _ := sqlx.Connect(\"mysql\", \"...\")\n\n// 查询自动映射到结构体\nvar users []User\ndb.Select(&users, \"SELECT * FROM users WHERE age > ?\", 18)\n\n// 查询单条\nvar user User\nerr := db.Get(&user, \"SELECT * FROM users WHERE id = ?\", 1)\n\n// 命名参数\nnamedStmt, _ := db.PrepareNamed(\"SELECT * FROM users WHERE name = :name\")\nnamedStmt.Get(&user, map[string]interface{}{\"name\": \"小明\"})",
          language: "go",
          tip: "sqlx 对标准 sql 包零侵入，你可以渐进式地混用 sqlx 和 sql。",
        },
        {
          title: "GORM 入门",
          content: "GORM 是 Go 最流行的 ORM 库。定义模型结构体嵌 gorm.Model 自动获得 ID、CreatedAt、UpdatedAt、DeletedAt 字段。AutoMigrate 自动建表或更新表结构，Create 增，Find 查，Save 改，Delete 删。链式调用支持条件、排序、分页等，开发效率高。",
          code: "type User struct {\n    gorm.Model\n    Name  string `gorm:\"size:100;not null\"`\n    Age   int    `gorm:\"default:0\"`\n    Email string `gorm:\"uniqueIndex\"`\n}\n\ndb, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})\ndb.AutoMigrate(&User{})\n\n// 增\ndb.Create(&User{Name: \"小明\", Age: 18})\n\n// 查\nvar user User\ndb.First(&user, 1)                         // 主键查\ndb.Where(\"name = ?\", \"小明\").First(&user)  // 条件查\n\n// 改\ndb.Model(&user).Update(\"age\", 20)\n\n// 删（软删除）\ndb.Delete(&user)",
          language: "go",
          warning: "GORM 的软删除是通过 DeletedAt 字段实现的，Delete 只是标记删除不是真删。Unscoped 可以真删。",
        },
        {
          title: "数据库事务",
          content: "Go 中事务通过 db.Begin 开启，返回的 Tx 对象执行所有 SQL，最后 tx.Commit 或 tx.Rollback。事务最好用完就结束，不要在事务里做耗时操作（发邮件、调外部 API 等）。GORM 的事务可以用闭包方式自动处理提交和回滚。",
          code: "// 标准 sql 事务\nfunc transferMoney(db *sql.DB, from, to int, amount float64) error {\n    tx, err := db.Begin()\n    if err != nil { return err }\n    defer tx.Rollback() // 如果没 Commit，回滚\n    \n    _, err = tx.Exec(\"UPDATE accounts SET balance = balance - ? WHERE id = ?\", amount, from)\n    if err != nil { return err }\n    \n    _, err = tx.Exec(\"UPDATE accounts SET balance = balance + ? WHERE id = ?\", amount, to)\n    if err != nil { return err }\n    \n    return tx.Commit()\n}\n\n// GORM 事务闭包\ndb.Transaction(func(tx *gorm.DB) error {\n    if err := tx.Create(&user).Error; err != nil { return err }\n    if err := tx.Create(&order).Error; err != nil { return err }\n    return nil // 返回 nil 自动提交，返回 err 自动回滚\n})",
          language: "go",
          tip: "defer tx.Rollback() 是个好习惯，Commit 之前 Rollback 无影响，Commit 之后 Rollback 会被忽略。",
        },
      ],
      quiz: [
        {
          question: "database/sql 中 Exec 和 Query 的区别？",
          options: ["没区别", "Exec 用于增删改，Query 用于查询", "Exec 更快", "Query 更安全"],
          answer: 1,
          explanation: "Exec 用于不返回行数据的 SQL（INSERT/UPDATE/DELETE），Query 用于返回结果集的 SELECT。",
        },
        {
          question: "sqlx 相比 database/sql 的主要改进？",
          options: ["性能更好", "自动将结果映射到结构体", "支持更多数据库", "不需要导入驱动"],
          answer: 1,
          explanation: "sqlx 通过 tag 自动映射 SQL 结果到 Go 结构体，减少手写 Scan 代码。",
        },
        {
          question: "GORM 中软删除是怎么实现的？",
          options: ["真删除数据", "通过 DeletedAt 字段标记删除时间", "把数据移到回收站", "加密数据"],
          answer: 1,
          explanation: "GORM 用 DeletedAt 时间戳标记软删除，查询时自动过滤已删除记录。",
        },
        {
          question: "事务中 defer tx.Rollback() 的作用？",
          options: ["每次都回滚", "如果出错自动回滚", "提高性能", "推迟提交"],
          answer: 1,
          explanation: "在 Commit 之前如果有错误或 panic，defer Rollback 确保事务自动回滚。",
        },
      ],
    },
    "go-error": {
      slug: "go-error",
      sections: [
        {
          title: "Go 的错误处理哲学",
          content: "Go 没有 try-catch 异常机制，错误就是一个普通的值，通过返回值的最后一个参数传递。每个可能出错的函数都返回 (result, error)，调用方必须检查 error。这种显式错误处理让代码看起来很啰嗦，但好处是错误处理路径一目了然，不会出现被吞掉的异常。",
          code: "func ReadFile(path string) ([]byte, error) {\n    data, err := os.ReadFile(path)\n    if err != nil {\n        return nil, fmt.Errorf(\"读取失败 %s: %w\", path, err)\n    }\n    return data, nil\n}\n\n// 调用方必须检查\ncontent, err := ReadFile(\"data.txt\")\nif err != nil {\n    log.Fatal(err)\n}",
          language: "go",
          tip: "永远不要忽略 error，即使用 _ 丢弃也要想清楚为什么抛弃它。",
        },
        {
          title: "errors 包和 fmt.Errorf",
          content: "errors.New 创建简单的错误，fmt.Errorf 可以格式化错误信息。Go 1.13 引入了错误包装机制，用 %w 动词可以把底层错误包起来，errors.Is 和 errors.As 用来判断和解包错误链。这样既能添加上下文信息，又不丢失原始错误。",
          code: "// 创建错误\nerr := errors.New(\"文件不存在\")\n\n// 包装错误\nerr = fmt.Errorf(\"打开配置文件失败: %w\", err)\n\n// 判断错误类型\nif errors.Is(err, os.ErrNotExist) {\n    fmt.Println(\"文件确实不存在\")\n}\n\n// 解包获取具体错误\nvar pathErr *os.PathError\nif errors.As(err, &pathErr) {\n    fmt.Println(\"路径:\", pathErr.Path)\n}",
          language: "go",
          warning: "%w 只能在一层 fmt.Errorf 中用一次，不要包装多个错误。",
        },
        {
          title: "自定义错误类型",
          content: "简单的错误用 errors.New 或 fmt.Errorf 就够了。复杂的业务错误需要自己定义错误类型，实现 Error() 方法就可以了。结构体类型的错误可以携带更多上下文信息（比如错误码、请求 ID），方便上层做差异化处理。",
          code: "type ValidationError struct {\n    Field   string\n    Message string\n}\n\nfunc (e *ValidationError) Error() string {\n    return fmt.Sprintf(\"字段 %s 验证失败: %s\", e.Field, e.Message)\n}\n\n// 使用\nfunc ValidateUser(u User) error {\n    if u.Name == \"\" {\n        return &ValidationError{Field: \"Name\", Message: \"不能为空\"}\n    }\n    return nil\n}\n\n// 类型断言处理\nerr := ValidateUser(user)\nvar vErr *ValidationError\nif errors.As(err, &vErr) {\n    fmt.Println(\"哪个字段:\", vErr.Field)\n}",
          language: "go",
          tip: "自定义错误类型建议实现 Is(target error) bool 方法，这样 errors.Is 才能正确匹配。",
        },
        {
          title: "defer、panic 和 recover",
          content: "defer 延迟执行，在函数返回前按后进先出的顺序执行，常用于关闭资源。panic 是程序崩溃，类似其他语言的 throw，但 Go 不推荐用 panic 处理常规错误。recover 只能在 defer 里用，用来捕获 panic 防止程序崩溃。一般只在包的顶层或框架里用 recover。",
          code: "func ReadConfig() (cfg Config, err error) {\n    f, err := os.Open(\"config.json\")\n    if err != nil {\n        return cfg, err\n    }\n    defer f.Close() // 函数返回前自动关闭\n    \n    // defer + recover 防崩溃\n    defer func() {\n        if r := recover(); r != nil {\n            err = fmt.Errorf(\"解析配置崩溃: %v\", r)\n        }\n    }()\n    \n    dec := json.NewDecoder(f)\n    return cfg, dec.Decode(&cfg)\n}",
          language: "go",
          warning: "panic 不是异常处理机制，只在不可恢复的错误时使用。常规错误请返回 error。",
        },
        {
          title: "错误处理的最佳实践",
          content: "错误应该在最早出现的地方包装，添加有意义的上下文，然后一路向上返回。不要在中间层打印日志又返回错误，日志要么在最底层打，要么在最顶层统一处理。用 errors.Is 而不是 == 比较错误，因为可能经过了包装。sentinel error（包级别的错误变量）是常见的模式。",
          code: "// Sentinel error 模式\nvar ErrNotFound = errors.New(\"not found\")\n\nfunc FindUser(id int) (*User, error) {\n    // 没找到\n    return nil, ErrNotFound\n}\n\n// 调用方判断\nuser, err := FindUser(123)\nif errors.Is(err, ErrNotFound) {\n    // 处理未找到的情况\n}\n\n// 不要这样 - 中间层既打日志又返回错误\nif err != nil {\n    log.Println(err)  // 坏习惯\n    return err\n}\n// 应该让调用方决定怎么处理错误",
          language: "go",
          tip: "错误信息用英文小写开头，不要标点结尾，保持简洁。如 fmt.Errorf(\"open file: %w\", err)。",
        },
      ],
      quiz: [
        {
          question: "Go 中错误处理的基本模式？",
          options: ["try-catch", "返回 error 值并检查", "throw 异常", "回调函数"],
          answer: 1,
          explanation: "Go 把 error 当作普通返回值，调用方必须显式检查处理。",
        },
        {
          question: "fmt.Errorf 中 %w 动词的作用？",
          options: ["格式化数字", "包装底层错误并保留原始错误链", "打印文件名", "格式化时间"],
          answer: 1,
          explanation: "%w 包装上层错误但不丢失原始错误，errors.Is 能穿透包装链匹配。",
        },
        {
          question: "defer 的执行顺序是？",
          options: ["声明顺序", "后进先出（LIFO）", "先进先出（FIFO）", "随机顺序"],
          answer: 1,
          explanation: "多个 defer 按后进先出的顺序执行，像摞盘子先放的后拿。",
        },
        {
          question: "什么时候用 panic？",
          options: ["处理所有错误", "不可恢复的致命错误", "替代 error 返回值", "控制程序流程"],
          answer: 1,
          explanation: "panic 用于真正不可恢复的错误，如程序启动时配置文件损坏。常规错误用 error 返回值。",
        },
      ],
    },
    "go-structs": {
      slug: "go-structs",
      sections: [
        {
          title: "结构体定义和实例化",
          content: "Go 语言不是面向对象语言，但用结构体和方法模拟了面向对象。struct 是一组字段的集合，用 type 关键字定义。实例化有好几种方式：字面量初始化、new 函数返回指针、直接声明后赋值。Go 没有构造函数，习惯用一个 NewXxx 工厂函数来创建和初始化结构体。",
          code: "type User struct {\n    ID       int\n    Name     string\n    Email    string\n    Age      int\n}\n\n// 实例化\nu1 := User{1, \"小明\", \"xm@qq.com\", 18}\nu2 := User{Name: \"小红\", Email: \"xh@qq.com\"} // 指定字段\nu3 := new(User)       // 返回指针\n\n// 工厂函数（惯例）\nfunc NewUser(name string) *User {\n    return &User{Name: name, Age: 0}\n}",
          language: "go",
          tip: "结构体字段名首字母大写表示公开，小写表示私有（包外无法访问）。",
        },
        {
          title: "方法：给 struct 绑定行为",
          content: "方法就是带接收者的函数。接收者写在 func 和函数名之间，可以是值接收者也可以是指针接收者。值接收者操作的是副本，不会修改原值。指针接收者操作的是原对象，可以修改字段。大部分情况用指针接收者，避免拷贝和能修改原值。",
          code: "type Counter struct {\n    count int\n}\n\n// 指针接收者 - 能修改原值\nfunc (c *Counter) Increment() {\n    c.count++\n}\n\n// 值接收者 - 不修改原值\nfunc (c Counter) Value() int {\n    return c.count\n}\n\nc := Counter{}\nc.Increment() // count 变成 1\nc.Increment() // count 变成 2",
          language: "go",
          tip: "简单判断：如果方法要修改接收者，或者接收者是个大结构体，用指针接收者。",
        },
        {
          title: "结构体嵌套和组合",
          content: "Go 没有继承，用的是组合（Composition）。一个结构体可以嵌套另一个结构体，嵌入式字段的方法和属性会被提升到外层。这跟继承很像但不是继承，底层还是两个独立的结构体。组合比继承更灵活，不会有深层次继承的复杂性。",
          code: "type Animal struct {\n    Name string\n}\n\nfunc (a Animal) Speak() string {\n    return \"...\"\n}\n\ntype Dog struct {\n    Animal // 嵌入式字段\n    Breed  string\n}\n\nfunc (d Dog) Speak() string {\n    return \"汪汪\"\n}\n\nd := Dog{Animal{Name: \"旺财\"}, \"金毛\"}\nfmt.Println(d.Name)    // 自动提升，直接用\nfmt.Println(d.Speak()) // \"汪汪\"，覆盖了Animal的Speak",
          language: "go",
          tip: "嵌入式字段实现了类似继承的效果，但本质上还是组合，Go 的设计哲学是组合优于继承。",
        },
        {
          title: "接口：隐式实现",
          content: "Go 的接口是隐式实现的，不需要显式声明 implements。只要你这个类型实现了接口要求的所有方法，你就自动实现了这个接口。这种鸭子类型的设计让代码非常灵活，不依赖具体类型只依赖行为。空接口 interface{} 可以接收任何值，类似 Java 的 Object。",
          code: "type Speaker interface {\n    Speak() string\n}\n\nfunc Greet(s Speaker) {\n    fmt.Println(s.Speak())\n}\n\n// Dog 有 Speak() 方法，自动实现了 Speaker 接口\nGreet(Dog{})\n\n// 空接口\nvar anything interface{}\nanything = 42\nanything = \"hello\"\nanything = User{}",
          language: "go",
          tip: "接口要小而精，单一职责。标准库的 io.Reader 只有一个 Read 方法，无比强大。",
        },
        {
          title: "结构体标签 Tag",
          content: "结构体 Tag 是写在字段后面的字符串，反射可以读取。最常用的是 JSON 序列化：json:\"fieldname\" 指定 JSON 字段名，json:\"-\" 表示忽略，json:\"name,omitempty\" 表示空值时不输出。还有用于数据库映射、表单验证等场景的标签。",
          code: "type User struct {\n    ID       int    `json:\"id\"`\n    Name     string `json:\"name\"`\n    Password string `json:\"-\"`              // 不序列化\n    Email    string `json:\"email,omitempty\"` // 空就不输出\n    Age      int    `json:\"age\" validate:\"min=0,max=120\"`\n}\n\nu := User{ID: 1, Name: \"小明\"}\nb, _ := json.Marshal(u)\n// {\"id\":1,\"name\":\"小明\",\"age\":0}\n// 注意 Password 被忽略了，Email 为空也忽略了",
          language: "go",
          tip: "json:\"name,omitempty\" 在 name 为零值时不输出，对指针类型要注意 nil 和空字符串的区别。",
        },
      ],
      quiz: [
        {
          question: "Go 结构体方法的值接收者和指针接收者的区别？",
          options: ["没区别", "值接收者不能修改原值，指针接收者可以", "指针接收者更快", "值接收者只能用于小结构体"],
          answer: 1,
          explanation: "值接收者操作的是副本，原值不变；指针接收者操作原对象。",
        },
        {
          question: "Go 的接口实现机制是什么？",
          options: ["显式声明 implements", "隐式实现（鸭子类型）", "需要继承接口", "用反射动态实现"],
          answer: 1,
          explanation: "Go 接口是隐式实现的，只要类型实现了接口的所有方法就自动满足接口。",
        },
        {
          question: "结构体标签 json:\",omitempty\" 的作用？",
          options: ["加快序列化", "字段为空时不输出", "字段必须非空", "忽略这个字段"],
          answer: 1,
          explanation: "omitempty 表示字段为零值时不出现在 JSON 输出里。",
        },
        {
          question: "嵌入式字段的方法被提升到外层，这叫什么？",
          options: ["继承", "多态", "方法提升", "组合优于继承"],
          answer: 2,
          explanation: "Go 通过嵌入式字段实现方法提升，看起来像继承但本质是组合。",
        },
      ],
    },
    "go-testing": {
      slug: "go-testing",
      sections: [
        {
          title: "测试文件和基本结构",
          content: "Go 有内建的测试框架，不需要接第三方库。测试文件以 _test.go 结尾，测试函数以 Test 开头，放在同包或同目录。用 go test 命令运行，-v 显示详细信息，-run 按正则过滤测试。每个测试函数接收 *testing.T 参数，用来报告失败。",
          code: "// math.go\npackage math\nfunc Add(a, b int) int { return a + b }\n\n// math_test.go\npackage math\n\nimport \"testing\"\n\nfunc TestAdd(t *testing.T) {\n    result := Add(2, 3)\n    if result != 5 {\n        t.Errorf(\"Add(2,3) = %d; want 5\", result)\n    }\n}\n\n// 运行: go test -v",
          language: "go",
          tip: "测试文件放同包（package xxx）可以访问未导出的函数，做白盒测试。",
        },
        {
          title: "表驱动测试",
          content: "表驱动测试是 Go 的惯用测试模式。把测试用例定义成一个结构体切片，每个用例有输入和期望输出。然后用循环遍历执行，失败时用 t.Run 给每个用例起个名，方便定位。这种方式添加新用例非常简单，就是在切片里加一行。",
          code: "func TestAdd(t *testing.T) {\n    tests := []struct {\n        name     string\n        a, b     int\n        expected int\n    }{\n        {\"正数相加\", 2, 3, 5},\n        {\"零加\", 0, 5, 5},\n        {\"负数相加\", -1, -2, -3},\n    }\n    \n    for _, tt := range tests {\n        t.Run(tt.name, func(t *testing.T) {\n            result := Add(tt.a, tt.b)\n            if result != tt.expected {\n                t.Errorf(\"got %d, want %d\", result, tt.expected)\n            }\n        })\n    }\n}",
          language: "go",
          tip: "t.Run 让每个子用例可以独立运行：go test -run TestAdd/正数相加。",
        },
        {
          title: "Mock 和 test helper",
          content: "Go 的 mock 不用框架，靠接口实现。定义一个接口，生产代码用真实实现，测试用 mock 实现。辅助函数 t.Helper() 标记后，失败时错误信息指向调用方而不是辅助函数本身，方便定位。临时文件用 t.TempDir()，测试结束自动清理。",
          code: "// 定义接口\ntype UserService interface {\n    GetUser(id int) (*User, error)\n}\n\n// Mock 实现\ntype mockUserService struct {\n    users map[int]*User\n}\n\nfunc (m *mockUserService) GetUser(id int) (*User, error) {\n    u, ok := m.users[id]\n    if !ok { return nil, ErrNotFound }\n    return u, nil\n}\n\n// helper 示例\nfunc assertEqual(t *testing.T, got, want interface{}) {\n    t.Helper() // 关键！\n    if got != want {\n        t.Errorf(\"got %v, want %v\", got, want)\n    }\n}",
          language: "go",
          tip: "Go 社区的 mock 哲学是用接口 + 手写 mock 而不是框架生成，虽然 testify/mock 也常用。",
        },
        {
          title: "基准测试和 Fuzzing",
          content: "基准测试函数以 Benchmark 开头，参数是 *testing.B。b.N 是测试框架自动调整的运行次数，运行够多次才能得到稳定的耗时测量。go test -bench . 运行基准测试。Fuzzing（Go 1.18+）用 FuzzXxx 函数，随机扔数据到被测函数看能不全崩溃。",
          code: "// 基准测试\nfunc BenchmarkAdd(b *testing.B) {\n    for i := 0; i < b.N; i++ {\n        Add(100, 200)\n    }\n}\n\n// 运行: go test -bench=.\n\n// Fuzz 测试\nfunc FuzzAdd(f *testing.F) {\n    f.Add(1, 2) // seed corpus\n    f.Fuzz(func(t *testing.T, a, b int) {\n        result := Add(a, b)\n        if result < a { // 简单的不变式验证\n            t.Errorf(\"结果不合理\")\n        }\n    })\n}\n\n// 运行: go test -fuzz=FuzzAdd -fuzztime=10s",
          language: "go",
          tip: "Fuzz 测试可以找到人类想不到的边界情况，非常适合测试解析器、编码器等。",
        },
        {
          title: "测试覆盖率",
          content: "go test -cover 显示覆盖率百分比，go test -coverprofile=coverage.out 生成覆盖率文件。然后用 go tool cover -html=coverage.out 在浏览器里打开，绿色是覆盖到，红色是没覆盖到。覆盖率能帮你发现哪些逻辑分支没测到，但不是 100% 覆盖率就等于没 bug。",
          code: "# 运行测试并生成覆盖率\ngo test -coverprofile=coverage.out ./...\n\n# 浏览器查看覆盖率详情\ngo tool cover -html=coverage.out\n\n# 终端查看覆盖率\ngo tool cover -func=coverage.out\n\n# CI 里检查覆盖率不低于某个值\ngo test -cover ./... | grep coverage",
          language: "bash",
          warning: "不要为了 100% 覆盖率写没意义的测试。关键业务逻辑和边界条件才是重点。",
        },
      ],
      quiz: [
        {
          question: "Go 测试文件命名约定是什么？",
          options: ["test_*.go", "*_test.go", "*.test.go", "*Test.go"],
          answer: 1,
          explanation: "Go 约定测试文件以 _test.go 结尾，go test 只编译这些文件。",
        },
        {
          question: "表驱动测试的优点？",
          options: ["跑得更快", "容易添加新测试用例和维护", "不需要写代码", "自动生成测试数据"],
          answer: 1,
          explanation: "表驱动把测试数据集中管理，加新用例只需加一行，清晰高效。",
        },
        {
          question: "t.Helper() 的作用？",
          options: ["运行测试更快", "标记辅助函数，失败时指向调用方", "跳过该测试", "并发运行测试"],
          answer: 1,
          explanation: "t.Helper() 让测试框架在失败时报告调用方位置而非辅助函数内部。",
        },
        {
          question: "怎么生成和查看测试覆盖率 HTML 报告？",
          options: ["go test -html", "go tool cover -html=coverage.out", "go cover -html", "go test -v"],
          answer: 1,
          explanation: "先用 -coverprofile 生成文件，再用 go tool cover -html 打开浏览器查看。",
        },
        {
          question: "Fuzz 测试的主要用途是什么？",
          options: ["性能测试", "用随机数据探索边界情况找 bug", "单元测试替代", "集成测试"],
          answer: 1,
          explanation: "Fuzzing 自动生成大量随机输入，发现程序员想不到的边界崩溃。",
        },
      ],
    },
    "go-web": {
      slug: "go-web",
      sections: [
        {
          title: "net/http 构建 Web 服务器",
          content: "Go 标准库的 net/http 包就能搭建生产级 HTTP 服务器，不需要第三方框架。http.HandleFunc 注册路由处理函数，http.ListenAndServe 启动服务器。处理函数接收 ResponseWriter 写响应和 Request 读请求。虽然简单但功能完整，很多 Go Web 框架底层都是基于 net/http。",
          code: "package main\n\nimport (\n    \"fmt\"\n    \"net/http\"\n)\n\nfunc main() {\n    http.HandleFunc(\"/\", func(w http.ResponseWriter, r *http.Request) {\n        fmt.Fprintf(w, \"Hello, %s!\", r.URL.Path)\n    })\n    \n    http.HandleFunc(\"/user\", userHandler)\n    \n    http.ListenAndServe(\":8080\", nil)\n}\n\nfunc userHandler(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprint(w, `{\"name\": \"小明\", \"age\": 18}`)\n}",
          language: "go",
          tip: "http.HandleFunc 的路径匹配是最长前缀匹配，/ 会匹配所有路径。",
        },
        {
          title: "路由多路复用器 ServeMux",
          content: "Go 1.22 之后标准库的 ServeMux 支持了方法匹配和路径参数，之前只能用第三方路由库如 gorilla/mux 或 chi。现在直接 http.NewServeMux 就能用 GET/POST 方法限定和 {id} 路径参数。不需要额外依赖就能实现 RESTful API。",
          code: "mux := http.NewServeMux()\n\n// 方法限定\nmux.HandleFunc(\"GET /users\", listUsers)\nmux.HandleFunc(\"POST /users\", createUser)\nmux.HandleFunc(\"GET /users/{id}\", getUser)\nmux.HandleFunc(\"DELETE /users/{id}\", deleteUser)\n\n// 提取路径参数\nfunc getUser(w http.ResponseWriter, r *http.Request) {\n    id := r.PathValue(\"id\")\n    fmt.Fprintf(w, \"获取用户 %s\", id)\n}\n\nhttp.ListenAndServe(\":8080\", mux)",
          language: "go",
          tip: "Go 1.22+ 的标准库 ServeMux 已经足够强大，小项目不需要引入第三方路由。",
        },
        {
          title: "中间件模式",
          content: "中间件是一个接收 http.Handler 返回 http.Handler 的函数，可以在请求处理前后做通用的事情，比如日志记录、认证、跨域、限流等。多个中间件可以链式组合，像洋葱一样层层包裹。这种函数式组合的方式非常优雅。",
          code: "// 日志中间件\nfunc Logger(next http.Handler) http.Handler {\n    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n        start := time.Now()\n        next.ServeHTTP(w, r)\n        log.Printf(\"%s %s %v\", r.Method, r.URL.Path, time.Since(start))\n    })\n}\n\n// 认证中间件\nfunc Auth(next http.Handler) http.Handler {\n    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n        token := r.Header.Get(\"Authorization\")\n        if token == \"\" {\n            http.Error(w, \"未授权\", http.StatusUnauthorized)\n            return\n        }\n        next.ServeHTTP(w, r)\n    })\n}\n\n// 链式组合\nhandler := Logger(Auth(mux))\nhttp.ListenAndServe(\":8080\", handler)",
          language: "go",
          tip: "中间件模式让横切关注点（日志、认证）和业务逻辑解耦，代码清爽。",
        },
        {
          title: "JSON API 和请求处理",
          content: "Go Web API 的核心就是：读请求体用 json.NewDecoder 反序列化，写响应用 json.NewEncoder 序列化。w.Header().Set 设置响应头 Content-Type。请求信息在 r 结构体里：r.Method 是请求方法，r.URL.Query() 拿查询参数，r.Header 拿请求头。",
          code: "type CreateUserReq struct {\n    Name  string `json:\"name\"`\n    Email string `json:\"email\"`\n}\n\nfunc createUser(w http.ResponseWriter, r *http.Request) {\n    var req CreateUserReq\n    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {\n        http.Error(w, \"无效的请求体\", http.StatusBadRequest)\n        return\n    }\n    defer r.Body.Close()\n    \n    // 查询参数\n    page := r.URL.Query().Get(\"page\")\n    \n    // 返回 JSON\n    w.Header().Set(\"Content-Type\", \"application/json\")\n    w.WriteHeader(http.StatusCreated)\n    json.NewEncoder(w).Encode(map[string]string{\"id\": \"123\"})\n}",
          language: "go",
          warning: "别忘了关闭 r.Body，虽然 ServeHTTP 在函数结束后通常会自动关闭，但显示 defer 是个好习惯。",
        },
        {
          title: "静态文件服务",
          content: "http.FileServer 可以一行代码搭建静态文件服务器，用于托管前端打包好的 HTML/CSS/JS 文件。如果需要把静态文件嵌入二进制，Go 1.16 的 embed 包可以把静态目录编译进二进制里，部署一个文件就能跑。http.StripPrefix 去掉 URL 前缀映射到文件系统路径。",
          code: "// 服务当前目录的 static 文件夹\nfs := http.FileServer(http.Dir(\"./static\"))\nhttp.Handle(\"/static/\", http.StripPrefix(\"/static/\", fs))\n\n// embed 嵌入静态文件\n//go:embed dist/*\nvar staticFiles embed.FS\n\nfunc main() {\n    fs := http.FileServer(http.FS(staticFiles))\n    http.Handle(\"/\", fs)\n    http.ListenAndServe(\":8080\", nil)\n}",
          language: "go",
          tip: "embed 让 Go 程序可以编译成单个二进制文件，部署极其方便，拷一个文件就完事。",
        },
      ],
      quiz: [
        {
          question: "Go 标准库中启动 HTTP 服务器的函数是？",
          options: ["http.Start", "http.ListenAndServe", "http.Serve", "http.Run"],
          answer: 1,
          explanation: "http.ListenAndServe 监听指定地址并处理 HTTP 请求。",
        },
        {
          question: "Go 中间件的本质是什么？",
          options: ["一个结构体", "一个函数，接收 http.Handler 返回 http.Handler", "一个接口", "一个路由规则"],
          answer: 1,
          explanation: "中间件是函数式包装，在现有 Handler 外面再包一层逻辑。",
        },
        {
          question: "Go 1.22+ 如何提取路由中的路径参数？",
          options: ["r.Param(\"id\")", "r.PathValue(\"id\")", "r.URL.Query().Get(\"id\")", "r.FormValue(\"id\")"],
          answer: 1,
          explanation: "Go 1.22 新增 r.PathValue 方法提取 {param} 路径参数。",
        },
        {
          question: "embed 包的作用？",
          options: ["压缩代码", "把文件嵌入编译后的二进制", "加密代码", "优化性能"],
          answer: 1,
          explanation: "embed 把静态资源编译进二进制，部署时只需要一个可执行文件。",
        },
      ],
    },
    "html-forms": {
      slug: "html-forms",
      sections: [
        {
          title: "表单的基本结构",
          content: "表单是用户往网站输入数据的最主要方式。form 标签包裹所有表单项，action 属性写提交地址，method 属性写请求方式 GET 或 POST。每个输入项用 label 加 input 组合，label 的 for 属性关联 input 的 id，点了标签就能聚焦输入框，对移动端点击小按钮尤其友好。",
          code: "<form action=\"/submit\" method=\"POST\">\n  <label for=\"email\">邮箱</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required />\n  <button type=\"submit\">提交</button>\n</form>",
          language: "html",
        },
        {
          title: "各种 input 类型",
          content: "HTML5 提供了超级丰富的 input 类型，不只是 text。email 会自动校验邮箱格式，number 弹出数字键盘，date 弹出日期选择器，tel 弹出拨号键盘。移动端用对了 type 用户体验天差地别。color 直接打开取色器，range 展示滑块。这些原生控件比手写的好用得多。",
          code: "<input type=\"email\" placeholder=\"you@example.com\" />\n<input type=\"number\" min=\"0\" max=\"100\" step=\"5\" />\n<input type=\"date\" />\n<input type=\"tel\" />\n<input type=\"color\" />\n<input type=\"range\" min=\"0\" max=\"100\" />\n<input type=\"file\" accept=\"image/*\" multiple />",
          language: "html",
          tip: "能用原生 HTML5 input 类型就尽量用，别动不动就自己写选择器组件。",
        },
        {
          title: "表单验证",
          content: "表单验证有两层：前端验证和后端验证。前端验证是为了立刻提示用户填错了什么，后端验证才是安全的保障。HTML5 自带验证属性：required 表示必填，pattern 写正则，min/max 限范围。自定义错误提示用 setCustomValidity。",
          code: "<input required minlength=\"6\" maxlength=\"20\" />\n<input type=\"url\" />\n<input pattern=\"[0-9]{11}\" title=\"请输入11位手机号\" />\n\n// JS 自定义验证\ninput.setCustomValidity(\"用户名已存在\")\ninput.reportValidity()\n\n// 阻止默认气泡改用自定义样式\nform.addEventListener(\"submit\", (e) => {\n  if (!form.checkValidity()) e.preventDefault()\n})",
          language: "html",
        },
        {
          title: "表单的可用性优化",
          content: "好的表单不光要能用还要好用。自动聚焦第一个输入框，用 tabindex 控制 Tab 键切换顺序，分组用 fieldset 加 legend。错误提示要紧挨着出错的输入框，不要一股脑堆在顶部。提交按钮要防重复点击，点了之后变灰加 loading 状态。",
          code: "<form novalidate>\n  <fieldset>\n    <legend>个人信息</legend>\n    <input autofocus autocomplete=\"given-name\" />\n    <input autocomplete=\"email\" />\n  </fieldset>\n  \n  <fieldset>\n    <legend>收货地址</legend>\n    <input autocomplete=\"street-address\" />\n  </fieldset>\n  \n  <button type=\"submit\" id=\"submitBtn\">提交</button>\n</form>",
          language: "html",
          tip: "autocomplete 属性配合规范的值能帮用户快速自动填充，对移动端极其友好。",
        },
        {
          title: "表单数据和文件上传",
          content: "普通表单提交会刷新页面，前端通常拦截后用 AJAX 发送 FormData。FormData 自动收集所有带 name 属性的表单字段，包括文件。如果不用 FormData，也可以用 new URLSearchParams 序列化数据。文件上传要用 multipart/form-data 编码。",
          code: "const form = document.querySelector('form')\nform.addEventListener('submit', async (e) => {\n  e.preventDefault()\n  const formData = new FormData(form)\n  const res = await fetch('/api/submit', {\n    method: 'POST',\n    body: formData,\n  })\n})",
          language: "javascript",
          warning: "FormData 不会收集没有 name 属性的字段，这是常见的坑。",
        },
      ],
      quiz: [
        {
          question: "label 标签的 for 属性关联 input 的什么属性？",
          options: ["name", "class", "id", "type"],
          answer: 2,
          explanation: "for 属性指向 input 的 id，点了标签就能聚焦输入框。",
        },
        {
          question: "表单文件上传需要设置什么编码类型？",
          options: ["application/json", "text/plain", "multipart/form-data", "application/xml"],
          answer: 2,
          explanation: "multipart/form-data 支持二进制文件传输。",
        },
        {
          question: "怎么阻止表单默认提交行为？",
          options: ["return false", "e.preventDefault()", "e.stopPropagation()", "form.disable()"],
          answer: 1,
          explanation: "e.preventDefault() 阻止浏览器默认的表单提交行为。",
        },
        {
          question: "FormData 对象收集表单数据的条件？",
          options: ["所有表单元素都会被收集", "只有带 name 属性的表单元素才会被收集", "只有 input 元素会被收集", "只有带 value 属性的才会被收集"],
          answer: 1,
          explanation: "FormData 只收集有 name 属性的表单字段，没有 name 的不收。",
        },
      ],
    },
    "indexes": {
      slug: "indexes",
      sections: [
        {
          title: "索引是干什么的",
          content: "数据库索引跟书的目录一个道理——没有目录你得从第一页翻到最后一页找内容，有了目录直接翻到对应页码。索引就是给表的某些列建一个快速查找的数据结构（通常是 B+ 树），让查询不用扫全表。\n\n一张表没有索引，查询就要全表扫描。几十万行还行，上千万行就等着吧。建了索引，数据库直接定位到那几行，速度从走遍全城变成 GPS 导航。\n\n但索引不是免费的——写操作（INSERT、UPDATE、DELETE）变慢，因为要同时更新索引。索引还占磁盘空间。所以不是列越多索引越好。",
          code: "-- 给 email 列建索引\nCREATE INDEX idx_users_email ON users(email);\n\n-- 建联合索引\nCREATE INDEX idx_orders_user_date ON orders(user_id, created_at);\n\n-- 唯一索引\nCREATE UNIQUE INDEX idx_users_phone ON users(phone);",
          language: "sql",
          tip: "建索引的原则：WHERE、JOIN、ORDER BY 里常用的列优先建。单列查询多的建单列索引，多列一起查的建联合索引。",
        },
        {
          title: "B+ 树索引原理",
          content: "数据库里最常用的索引结构叫 B+ 树——一种自平衡的多叉树。B+ 树的特点是：所有数据都存在叶子节点里，叶子节点之间用链表串起来，非叶子节点只存索引键和指针。\n\n这样设计的好处是：查询效率稳定（树的高度一般就 3 到 4 层，几百万数据也就几次磁盘 IO），同时支持范围查询（因为叶子节点有链表，找到起点顺着往下遍历就行）。\n\n对比一下哈希索引：查等值快（O(1)），但不支持范围查询和排序。所以 MySQL 默认用 B+ 树，除非你指定用哈希。不过大多数引擎（包括 InnoDB）就是用 B+ 树。",
          code: "-- 查看查询用没用索引\nEXPLAIN SELECT * FROM users WHERE email = 'test@example.com';\n\n-- key 列显示用了哪个索引\n-- type 列如果是 ALL（全表扫描），说明没走索引\n-- rows 列表示预估要扫多少行",
          language: "sql",
          tip: "EXPLAIN 是优化的第一步——先用它看查询走没走索引、扫了多少行，再决定要不要加索引、改 SQL。",
        },
        {
          title: "联合索引与最左前缀原则",
          content: "联合索引就是把多个列绑在一起建一个索引，比如 CREATE INDEX idx_a_b ON t(a, b)。联合索引有个铁律：最左前缀原则——查询条件必须从索引的最左边列开始匹配，不跳过中间列，索引才能生效。\n\n举个例子：索引是 (a, b, c)。WHERE a=1 AND b=2 能用索引；WHERE b=2 不能用（跳过了 a）；WHERE a=1 AND c=3 部分能用（只用到 a 列，c 用不到因为跳过了 b）。\n\n理解了最左前缀，你建联合索引时就能合理排列字段顺序——把查询频率最高的、区分度最大的放最左边。",
          code: "-- 建一个覆盖常用查询的联合索引\nCREATE INDEX idx_orders_uid_status_date ON orders(user_id, status, created_at);\n\n-- 这些查询都能走索引：\n-- WHERE user_id = 1\n-- WHERE user_id = 1 AND status = 'paid'\n-- WHERE user_id = 1 AND status = 'paid' AND created_at > '2024-01-01'\n\n-- 这个不能走：\n-- WHERE status = 'paid'（跳过了 user_id）",
          language: "sql",
          tip: "联合索引列的顺序按三个原则排：等值查询在前面，范围查询在后面；区分度高的在前面；最常用查询的字段放前面。",
        },
        {
          title: "覆盖索引与回表",
          content: "覆盖索引是一个性能优化概念——如果查询需要的所有列都包含在索引里了，数据库就不用回到原表去读数据，直接从索引里拿，少一次磁盘 IO。\n\n反之如果你查的列索引里没有（比如只索引了 name 但你要查 name 和 age），数据库先通过索引找到行位置，再回表去读缺少的列——这叫回表。回表多了速度就下来了。\n\n所以建索引时如果某个查询跑得特别频繁，考虑把 SELECT 里经常要的列也塞进索引。用 EXPLAIN 的 Extra 列看：Using index 就是覆盖索引，完美。",
          code: "-- 这个查询需要回表（索引只有 name）\nSELECT id, name, age, email FROM users WHERE name = 'Alice';\n\n-- 建覆盖索引，避免回表\nCREATE INDEX idx_users_name_cover ON users(name, age, email);\n\n-- 用 EXPLAIN 判断：\n-- Using index = 覆盖索引，没回表\n-- Using index condition = 用了索引但可能有回表",
          language: "sql",
          tip: "EXPLAIN 的 Extra 列显示 Using index，就说明走了覆盖索引，没回表。这是查询优化的目标状态。",
        },
        {
          title: "索引失效的常见情况",
          content: "建了索引不等于查询一定会用它。以下几种情况索引会失效：\n\n1. 在索引列上做运算或函数——WHERE YEAR(created_at)=2024 用不了索引，因为值被函数包裹了。改成 WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31'。\n\n2. 隐式类型转换——WHERE phone=13800000000 如果 phone 是 VARCHAR，数据库会把所有 phone 转成数字去比，索引失效。\n\n3. LIKE 以百分号开头——WHERE name LIKE '%Alice' 用不了索引，因为 B+ 树只能从左往右匹配。LIKE 'Alice%' 可以。\n\n4. OR 两边不是同一个索引列——WHERE a=1 OR b=2，优化器可能放弃索引选择全表扫描。",
          code: "-- 这些写法索引会失效\nSELECT * FROM orders WHERE YEAR(created_at) = 2024;\nSELECT * FROM users WHERE phone = 13800000000;\nSELECT * FROM users WHERE name LIKE '%Alice';\n\n-- 改成这样就对了\nSELECT * FROM orders WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';\nSELECT * FROM users WHERE phone = '13800000000';\nSELECT * FROM users WHERE name LIKE 'Alice%';",
          language: "sql",
          warning: "函数索引（MySQL 8.0+ 支持）可以解决列上函数的问题，但不是所有数据库版本都有，谨慎使用。",
        },
      ],
      quiz: [
        {
          question: "联合索引 (a, b, c)，哪个查询能用上索引？",
          options: ["WHERE b = 1", "WHERE a = 1 AND c = 3", "WHERE c = 3", "WHERE b = 1 AND c = 3"],
          answer: 1,
          explanation: "WHERE a=1 AND c=3 能用 a 列，c 用不到（跳过了 b）。最左前缀要求不能跳过中间的列。",
        },
        {
          question: "EXPLAIN 的 type 列显示 ALL 什么意思？",
          options: ["用了所有索引", "全表扫描", "查询成功", "ALL 是最好的类型"],
          answer: 1,
          explanation: "ALL 就是 Full Table Scan，全表一行行扫。大多数情况下要避免，除非表确实很小。",
        },
        {
          question: "覆盖索引解决的是什么问题？",
          options: ["索引太多的问题", "回表问题", "数据重复问题", "索引大小问题"],
          answer: 1,
          explanation: "把查询需要的列全放到索引里，就不用回表取数据了，省一次磁盘 IO。",
        },
        {
          question: "LIKE '%关键词' 为什么不走索引？",
          options: ["LIKE 不支持索引", "B+ 树只能从左往右匹配", "数据库 bug", "因为使用了百分号符号"],
          answer: 1,
          explanation: "B+ 树按前缀排序，你知道开头字符才能快速定位。百分号开头意味着前面可能是任何内容。",
        },
        {
          question: "一张频繁写入的表上建 10 个索引会怎样？",
          options: ["查询变快 10 倍", "写入变慢、磁盘占用变大", "没任何影响", "数据库会崩溃"],
          answer: 1,
          explanation: "每次 INSERT 都要更新所有索引，索引越多写越慢。按需建索引，别贪多。",
        },
      ],
    },
    "java-collections": {
      slug: "java-collections",
      sections: [
        {
          title: "集合框架概览",
          content: "Java 的集合框架就像一套收纳工具，List 是有序可重复的列表，Set 是无序不可重复的集合，Map 是键值对。主要接口是 Collection 和 Map，下面各有不同的实现类。ArrayList 和 LinkedList、HashSet 和 TreeSet、HashMap 和 TreeMap，不同的实现适用于不同的场景。",
          code: "import java.util.*;\n\nList<String> list = new ArrayList<>();    // 可重复有序\nSet<String> set = new HashSet<>();         // 不可重复无序\nMap<String, Integer> map = new HashMap<>(); // 键值对\nQueue<String> queue = new LinkedList<>();  // 队列",
          language: "java",
          tip: "声明变量用接口类型，new 的时候用具体实现类，方便后期切换。",
        },
        {
          title: "ArrayList vs LinkedList",
          content: "ArrayList 底层是数组，查询快 O(1)，增删慢 O(n)因为要挪动元素。LinkedList 底层是双向链表，查询慢 O(n)要遍历，增删快 O(1)改指针就行。大部分场景用 ArrayList，因为实际开发中查的多改的少。LinkedList 实现了 Deque 接口，可以当队列和栈用。",
          code: "ArrayList<Integer> arr = new ArrayList<>();\narr.add(1); arr.get(0); arr.remove(0);\n\nLinkedList<Integer> linked = new LinkedList<>();\nlinked.addFirst(1);  // 头部插入\nlinked.addLast(2);   // 尾部插入\nlinked.pollFirst();  // 弹出头部，可以当队列用",
          language: "java",
          tip: "默认用 ArrayList，只有频繁在头部增删时才用 LinkedList。",
        },
        {
          title: "HashSet 和 TreeSet",
          content: "HashSet 基于哈希表，无序，增删查都是 O(1)。TreeSet 基于红黑树，有序（自然排序或自定义比较器），增删查 O(log n)。HashSet 快但没顺序，TreeSet 有顺序但慢一些。去重场景首选 HashSet，需要排序输出用 TreeSet。",
          code: "Set<Integer> hashSet = new HashSet<>();\nhashSet.add(3); hashSet.add(1); hashSet.add(2);\n// 输出顺序不确定：可能是 1,2,3 也可能不是\n\nSet<Integer> treeSet = new TreeSet<>();\ntreeSet.add(3); treeSet.add(1); treeSet.add(2);\n// 输出一定是有序的：1, 2, 3\n\n// 自定义排序\nSet<String> sorted = new TreeSet<>((a, b) -> b.compareTo(a));",
          language: "java",
        },
        {
          title: "HashMap 原理和遍历",
          content: "HashMap 底层是数组加链表（JDK8 加入了红黑树），通过 key 的 hashCode 找到桶的位置。冲突少的时候是链表，冲突多了转成红黑树提高效率。遍历 Map 有三种方式：keySet 遍历键，values 遍历值，entrySet 遍历键值对（最推荐因为一次拿俩）。",
          code: "Map<String, Integer> map = new HashMap<>();\nmap.put(\"apple\", 3);\nmap.put(\"banana\", 5);\n\n// 推荐：遍历键值对\nfor (Map.Entry<String, Integer> entry : map.entrySet()) {\n    System.out.println(entry.getKey() + \": \" + entry.getValue());\n}\n\n// JDK8 流式写法\nmap.forEach((k, v) -> System.out.println(k + \": \" + v));",
          language: "java",
          tip: "entrySet 遍历效率最高，因为一次就能拿到 key 和 value，不用先拿 key 再 get。",
        },
        {
          title: "Collections 工具类",
          content: "Collections 是集合的工具类，全是静态方法。排序 sort、翻转 reverse、打乱 shuffle、最大值 max、最小值 min、线程安全包装 synchronizedXXX、不可变包装 unmodifiableXXX。Arrays 工具类处理数组，asList 可以把数组转 List 但注意是固定大小的。",
          code: "List<Integer> list = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5));\nCollections.sort(list);           // 升序\nCollections.reverse(list);        // 翻转\nCollections.shuffle(list);        // 洗牌\nint max = Collections.max(list);  // 最大值\nCollections.frequency(list, 1);   // 计数\n\n// 线程安全包装\nList<Integer> syncList = Collections.synchronizedList(list);",
          language: "java",
          warning: "Arrays.asList 返回的 List 是固定大小的，不能 add 或 remove。",
        },
      ],
      quiz: [
        {
          question: "ArrayList 的底层数据结构是什么？",
          options: ["链表", "数组", "哈希表", "红黑树"],
          answer: 1,
          explanation: "ArrayList 底层用动态数组实现，支持快速随机访问。",
        },
        {
          question: "HashSet 怎么保证元素不重复？",
          options: ["遍历比较", "通过 hashCode 和 equals 方法", "排序比较", "随机检查"],
          answer: 1,
          explanation: "HashSet 先用 hashCode 定位桶，再用 equals 判断是否真的相等。",
        },
        {
          question: "遍历 Map 最推荐的方式？",
          options: ["keySet", "values", "entrySet", "直接用 Map 遍历"],
          answer: 2,
          explanation: "entrySet 一次拿 key 和 value，不需要额外 get 操作。",
        },
        {
          question: "TreeSet 的有序性基于什么？",
          options: ["插入顺序", "哈希值", "红黑树", "数组下标"],
          answer: 2,
          explanation: "TreeSet 底层是红黑树，元素按照自然顺序或比较器顺序排列。",
        },
      ],
    },
    "java-exception": {
      slug: "java-exception",
      sections: [
        {
          title: "异常的分类体系",
          content: "Java 异常分两大类：受检异常（Checked Exception）和非受检异常（Unchecked Exception）。受检异常必须显式处理，要么 try-catch 要么 throws 声明，比如 IOException。非受检异常是 RuntimeException 的子类，不用强制处理，比如 NullPointerException。Error 是更严重的错误，程序一般无法处理，比如 OutOfMemoryError。",
          code: "// 受检异常 - 必须处理\ntry {\n    FileReader reader = new FileReader(\"file.txt\");\n} catch (FileNotFoundException e) {\n    System.out.println(\"文件没找到\");\n}\n\n// 非受检异常 - 不用强制处理\nString s = null;\ns.length(); // 抛出 NullPointerException",
          language: "java",
        },
        {
          title: "try-catch-finally 机制",
          content: "try 块放可能出错的代码，catch 捕获指定异常类型，finally 不论是否异常都会执行。多个 catch 按顺序匹配，子类异常写前面父类写后面。finally 典型用途是关闭资源（文件流、数据库连接），但 JDK7 之后 try-with-resources 更优雅。",
          code: "BufferedReader reader = null;\ntry {\n    reader = new BufferedReader(new FileReader(\"file.txt\"));\n    String line = reader.readLine();\n} catch (IOException e) {\n    e.printStackTrace();\n} finally {\n    if (reader != null) {\n        try { reader.close(); } catch (IOException e) { }\n    }\n}",
          language: "java",
          warning: "不要在 finally 里写 return，会覆盖 try 块里的返回值。",
        },
        {
          title: "try-with-resources 自动关闭",
          content: "JDK7 引入的 try-with-resources 让资源管理变得超简单。把实现了 AutoCloseable 接口的资源声明在 try 后面的括号里，用完自动关闭，连 finally 都不用写。文件读写、数据库连接、网络连接这些都应该用这种写法。",
          code: "public String readFile(String path) {\n    try (BufferedReader br = new BufferedReader(new FileReader(path))) {\n        return br.readLine();\n    } catch (IOException e) {\n        e.printStackTrace();\n        return null;\n    }\n}",
          language: "java",
          tip: "所有 IO 操作都用 try-with-resources，省心又安全。",
        },
        {
          title: "自定义异常",
          content: "有些业务场景需要自己定义异常，比如用户不存在、余额不足。写一个类继承 Exception（受检）或 RuntimeException（非受检），加个构造函数就行了。业务代码里 throw new 抛出，上层 catch 统一处理。自定义异常让错误信息更有语义。",
          code: "public class InsufficientBalanceException extends RuntimeException {\n    public InsufficientBalanceException(String message) {\n        super(message);\n    }\n}\n\npublic void withdraw(double amount) {\n    if (amount > balance) {\n        throw new InsufficientBalanceException(\"余额不足: \" + balance);\n    }\n    balance -= amount;\n}",
          language: "java",
        },
        {
          title: "异常处理的最佳实践",
          content: "不要 catch 了什么都不做（吞异常），至少打个日志。不要 catch Exception 这个最顶层的，太宽泛了会误吞异常。不要用异常控制正常业务流程，异常开销很大。抛出异常时要保留原始堆栈信息，用 new RuntimeException(message, e) 而不是丢掉了 cause。",
          code: "// 错误：吞异常\ncatch (IOException e) { }\n\n// 错误：用异常控制流程\nif (x == 0) throw new RuntimeException(\"除数不能为零\");\n\n// 正确：保留原始异常\ncatch (SQLException e) {\n    throw new RuntimeException(\"数据库查询失败\", e);\n}\n\n// 正确：打日志\ncatch (IOException e) {\n    log.error(\"读取文件失败\", e);\n    throw new ServiceException(\"文件读取错误\", e);\n}",
          language: "java",
          warning: "永远不要用异常控制正常业务逻辑，异常的性能代价是正常流程的上百倍。",
        },
      ],
      quiz: [
        {
          question: "NullPointerException 属于哪类异常？",
          options: ["受检异常", "非受检异常", "Error", "不需要处理"],
          answer: 1,
          explanation: "NPE 继承自 RuntimeException，属于非受检异常。",
        },
        {
          question: "finally 块里的代码什么时候不执行？",
          options: ["catch 块执行时", "try 块正常结束时", "System.exit() 被调用时", "return 语句执行时"],
          answer: 2,
          explanation: "只有 JVM 退出或 System.exit() 时 finally 不执行，其他情况都会执行。",
        },
        {
          question: "try-with-resources 要求资源实现哪个接口？",
          options: ["Closeable", "AutoCloseable", "Disposable", "Resource"],
          answer: 1,
          explanation: "必须实现 AutoCloseable 接口，Closeable 是它的子接口。",
        },
        {
          question: "catch 多个异常时顺序有什么要求？",
          options: ["父类在前子类在后", "子类在前父类在后", "随便写", "不能用多个 catch"],
          answer: 1,
          explanation: "子类必须写在父类前面，否则子类永远匹配不到，编译报错。",
        },
      ],
    },
    "java-io": {
      slug: "java-io",
      sections: [
        {
          title: "IO 流分类",
          content: "Java IO 按流向分为输入流和输出流，按数据单位分为字节流和字符流。字节流以 byte 为单位，后缀是 Stream（InputStream/OutputStream），适合处理图片、视频等二进制。字符流以 char 为单位，后缀是 Reader/Writer，适合处理文本。IO 流用了装饰者模式，一层套一层。",
          code: "// 字节流 - 复制文件\nFileInputStream fis = new FileInputStream(\"source.jpg\");\nFileOutputStream fos = new FileOutputStream(\"dest.jpg\");\n\n// 字符流 - 读取文本\nFileReader reader = new FileReader(\"text.txt\");\nBufferedReader br = new BufferedReader(reader);",
          language: "java",
        },
        {
          title: "文件读写基础",
          content: "最基础的读文件用 FileReader 或 FileInputStream，写文件用 FileWriter 或 FileOutputStream。但裸用的效率很低，一次读一个字节或字符。套一个 BufferedReader 或 BufferedInputStream 加上缓冲区，效率能提高几十倍。读文本用 readLine 一行行读最方便。",
          code: "// 读文本文件\nStringBuilder content = new StringBuilder();\ntry (BufferedReader br = new BufferedReader(new FileReader(\"test.txt\"))) {\n    String line;\n    while ((line = br.readLine()) != null) {\n        content.append(line).append(\"\\n\");\n    }\n}\n\n// 写文件\ntry (BufferedWriter bw = new BufferedWriter(new FileWriter(\"out.txt\"))) {\n    bw.write(\"Hello, 世界\");\n    bw.newLine();\n}",
          language: "java",
          tip: "文件操作一定用 try-with-resources，避免忘关流造成资源泄漏。",
        },
        {
          title: "NIO 和 Path/Files",
          content: "JDK7 引入的 NIO.2 提供了 Path 和 Files 工具类，操作文件比以前简单多了。Files.readAllLines 一行代码读整个文件，Files.write 一行代码写文件。Path 替代了难用的 File 类，Paths.get 创建路径对象。用 NIO 的 API 处理小文件比传统 IO 方便太多。",
          code: "import java.nio.file.*;\nimport java.nio.charset.StandardCharsets;\n\nPath path = Paths.get(\"data.txt\");\n\n// 一行读整个文件\nList<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);\n\n// 一行写文件\nFiles.write(path, Arrays.asList(\"第一行\", \"第二行\"), StandardCharsets.UTF_8);\n\n// 检查文件\nboolean exists = Files.exists(path);\nlong size = Files.size(path);",
          language: "java",
          tip: "处理小文件（几 MB 以内）直接用 Files 工具类，大文件还是用流式读取。",
        },
        {
          title: "对象序列化",
          content: "序列化就是把 Java 对象转成字节序列存起来或网络传输。类需要实现 Serializable 标记接口，用 ObjectOutputStream 写出，ObjectInputStream 读入。serialVersionUID 是序列化版本号，不显式写的话 jvm 自动生成一个，改了类容易反序列化失败。",
          code: "public class User implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String name;\n    private transient String password; // 不序列化\n}\n\n// 序列化\ntry (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(\"user.obj\"))) {\n    oos.writeObject(new User(\"小明\", \"123456\"));\n}\n\n// 反序列化\ntry (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(\"user.obj\"))) {\n    User user = (User) ois.readObject();\n}",
          language: "java",
          warning: "transient 修饰的字段不会被序列化，适合密码之类的敏感数据。",
        },
        {
          title: "编码问题",
          content: "编码问题是 IO 最常见的坑。文件以什么编码存的就要以什么编码读。Windows 默认 GBK，Mac/Linux 默认 UTF-8，跨平台最容易乱码。InputStreamReader 和 OutputStreamWriter 可以指定编码，把字节流转成字符流。NIO 的 Files 读取时也指定 StandardCharsets 编码。",
          code: "// 指定编码读取\ntry (BufferedReader br = new BufferedReader(\n        new InputStreamReader(new FileInputStream(\"test.txt\"), StandardCharsets.UTF_8))) {\n    String line = br.readLine();\n}\n\n// NIO 方式指定编码\nString content = Files.readString(Path.of(\"test.txt\"), StandardCharsets.UTF_8);",
          language: "java",
          warning: "处理中文内容时一定要显式指定 UTF-8 编码，不要依赖系统默认编码。",
        },
      ],
      quiz: [
        {
          question: "Java IO 中字节流和字符流的根本区别？",
          options: ["读写速度不同", "字节流以 byte 为单位，字符流以 char 为单位", "字节流只能读二进制", "字符流只能读文本"],
          answer: 1,
          explanation: "字节流最小单位是 byte（1 字节），字符流最小单位是 char（2 字节）。",
        },
        {
          question: "BufferedReader 的作用？",
          options: ["加密读取", "提高读取效率通过缓冲", "压缩数据", "转换编码"],
          answer: 1,
          explanation: "BufferedReader 内部维护缓冲区，减少磁盘 IO 次数，大幅提高效率。",
        },
        {
          question: "transient 关键字的作用？",
          options: ["标记临时变量", "序列化时忽略该字段", "标记方法为临时", "表示变量可变"],
          answer: 1,
          explanation: "transient 修饰的字段在序列化时会被跳过，不会被写入字节流。",
        },
        {
          question: "Files.readAllLines 适合什么场景？",
          options: ["读取大文件", "读取小文件", "读取二进制文件", "只能读取 GBK 编码"],
          answer: 1,
          explanation: "它一次性把整个文件读入内存，大文件会内存溢出，适合几 MB 以内的小文件。",
        },
      ],
    },
    "java-jdbc": {
      slug: "java-jdbc",
      sections: [
        {
          title: "JDBC 连接数据库",
          content: "JDBC 是 Java 操作数据库的标准接口，每个数据库厂商提供自己的驱动实现。连接数据库五步走：加载驱动、建立连接、创建 Statement、执行 SQL、处理结果、关闭连接。Connection 是数据库连接对象，Statement 是 SQL 发送器，ResultSet 是结果集。",
          code: "// MySQL 连接示例\nString url = \"jdbc:mysql://localhost:3306/mydb\";\nString user = \"root\";\nString password = \"123456\";\n\ntry (Connection conn = DriverManager.getConnection(url, user, password)) {\n    System.out.println(\"连接成功\");\n} catch (SQLException e) {\n    e.printStackTrace();\n}",
          language: "java",
          tip: "JDBC 4.0 以后不需要 Class.forName 加载驱动了，SPI 机制自动加载。",
        },
        {
          title: "Statement 和 PreparedStatement",
          content: "Statement 直接拼接 SQL 字符串，有 SQL 注入风险而且每次都要编译。PreparedStatement 用占位符 ? 预编译 SQL，防注入、效率高。为什么防注入？因为 SQL 逻辑和数据是分开的，? 里的值不管写什么都会被当作数据而不是 SQL 片段。",
          code: "// 不推荐：Statement 拼接（有 SQL 注入风险）\nStatement stmt = conn.createStatement();\nResultSet rs = stmt.executeQuery(\"SELECT * FROM users WHERE name='\"+ name + \"'\");\n\n// 推荐：PreparedStatement 预编译\nString sql = \"SELECT * FROM users WHERE name = ? AND age > ?\";\nPreparedStatement pstmt = conn.prepareStatement(sql);\npstmt.setString(1, name);\npstmt.setInt(2, 18);\nResultSet rs = pstmt.executeQuery();\n\n// 增删改用 executeUpdate()，返回受影响行数\nint rows = pstmt.executeUpdate();",
          language: "java",
          warning: "永远不要拼接 SQL 字符串，SQL 注入是最常见的漏洞之一，PreparedStatement 是标配。",
        },
        {
          title: "ResultSet 处理结果",
          content: "ResultSet 是查询结果集，内部有一个游标，初始指向第一行之前，要 next 一下才到第一行。getString 按列名或列索引获取值，列索引从 1 开始不是 0。读完一行再 next 移到下一行，next 返回 false 表示读完了。循环遍历所有行是最常见的用法。",
          code: "String sql = \"SELECT id, name, age FROM users\";\nPreparedStatement pstmt = conn.prepareStatement(sql);\nResultSet rs = pstmt.executeQuery();\n\nwhile (rs.next()) {\n    int id = rs.getInt(\"id\");\n    String name = rs.getString(\"name\");\n    int age = rs.getInt(3); // 也可以按列索引\n    System.out.println(id + \": \" + name + \", \" + age);\n}",
          language: "java",
          tip: "用列名读取比用列索引更可读，但列索引性能稍好一点点。",
        },
        {
          title: "事务管理",
          content: "事务就是把一组 SQL 当作一个整体，要么全成功要么全失败。转账就是典型场景：A 减钱和 B 加钱必须同时成功。conn.setAutoCommit(false) 关闭自动提交，都执行完了 conn.commit() 提交，有异常 conn.rollback() 回滚。事务的 ACID 特性是数据库可靠性的基石。",
          code: "Connection conn = null;\ntry {\n    conn = DriverManager.getConnection(url, user, password);\n    conn.setAutoCommit(false); // 开启事务\n    \n    // 扣钱\n    pstmt1.executeUpdate();\n    // 加钱\n    pstmt2.executeUpdate();\n    \n    conn.commit(); // 提交\n} catch (SQLException e) {\n    if (conn != null) conn.rollback(); // 回滚\n} finally {\n    if (conn != null) conn.close();\n}",
          language: "java",
          warning: "事务要尽量短，锁住资源太久会影响并发。不要在事务里做 RPC 调用或发邮件。",
        },
        {
          title: "连接池",
          content: "每次请求都创建连接太慢太费资源。连接池预先创建一批连接存着，用时借一根用完还回去。常用的连接池有 HikariCP、Druid。HikariCP 性能最好，Spring Boot 默认就用它。Druid 阿里出品，带监控统计功能，运维方便。",
          code: "// HikariCP 配置\nHikariConfig config = new HikariConfig();\nconfig.setJdbcUrl(\"jdbc:mysql://localhost:3306/mydb\");\nconfig.setUsername(\"root\");\nconfig.setPassword(\"123456\");\nconfig.setMaximumPoolSize(20);\nconfig.setMinimumIdle(5);\n\nHikariDataSource ds = new HikariDataSource(config);\nConnection conn = ds.getConnection();\n// ... 用完记得 close，实际是还回池子",
          language: "java",
          tip: "连接池的大小一般设为 CPU 核数乘以 2 再加磁盘数，不是越大越好。",
        },
      ],
      quiz: [
        {
          question: "PreparedStatement 相比 Statement 的两个主要优势？",
          options: ["更快且防 SQL 注入", "代码更短", "支持更多 SQL 语法", "不需要连接数据库"],
          answer: 0,
          explanation: "预编译带来性能提升，参数化查询防止 SQL 注入。",
        },
        {
          question: "ResultSet 的游标初始位置在哪里？",
          options: ["第一行", "第一行之前", "最后一行", "随机位置"],
          answer: 1,
          explanation: "初始游标在第一行之前，必须 rs.next() 才能移到第一行。",
        },
        {
          question: "事务中 setAutoCommit(false) 的作用？",
          options: ["关闭数据库", "手动控制提交和回滚", "自动提交每条 SQL", "提高查询速度"],
          answer: 1,
          explanation: "设为 false 后需要手动 commit 或 rollback，这样才能多条 SQL 组成一个事务。",
        },
        {
          question: "为什么需要数据库连接池？",
          options: ["为了更稳定", "复用连接减少创建销毁开销", "支持更多 SQL 语法", "数据库要求必须有连接池"],
          answer: 1,
          explanation: "创建数据库连接很重，连接池预创建并复用连接，大幅提升性能。",
        },
      ],
    },
    "java-oop": {
      slug: "java-oop",
      sections: [
        {
          title: "面向对象三大特性",
          content: "Java 是纯面向对象的语言，万物皆对象。三大特性封装、继承、多态是面试必问。封装就是把数据和方法包在一起，对外只暴露必要的接口，隐藏实现细节。继承就是子类复用父类的代码，用 extends 关键字。多态就是同一个方法名不同对象表现出不同行为。",
          code: "// 封装\npublic class BankAccount {\n    private double balance;\n    public double getBalance() { return balance; }\n    public void deposit(double amount) { balance += amount; }\n}\n\n// 继承\npublic class SavingsAccount extends BankAccount {\n    private double interestRate;\n}",
          language: "java",
        },
        {
          title: "抽象类和接口的区别",
          content: "抽象类用 abstract 修饰，可以有普通方法和抽象方法，单继承。接口用 interface 定义，JDK8 之后可以有默认方法和静态方法，多实现。什么时候用哪个？类之间有 is-a 关系用抽象类，定义行为规范用接口。接口是做什么的契约，抽象类是是什么的模板。",
          code: "public abstract class Animal {\n    public abstract void makeSound();\n    public void sleep() { System.out.println(\"Zzz\"); }\n}\n\npublic interface Flyable {\n    void fly();\n    default void land() { System.out.println(\"landing...\"); }\n}\n\npublic class Bird extends Animal implements Flyable {\n    // 必须实现两个抽象方法\n}",
          language: "java",
          tip: "优先使用接口而不是抽象类，因为接口更灵活，支持多实现。",
        },
        {
          title: "构造函数和重载",
          content: "构造函数用来初始化对象，名字和类名一模一样，没有返回值。一个类可以有多个构造函数，参数列表不同，这叫重载。构造函数之间可以用 this() 互相调用，但必须写在第一行。默认构造函数是不带参数的，一旦你自己写了构造函数，默认的就没有了。",
          code: "public class Student {\n    private String name;\n    private int age;\n\n    public Student() { this(\"无名\", 18); }\n    public Student(String name) { this(name, 18); }\n    public Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}",
          language: "java",
          warning: "一旦你定义了带参数的构造函数，无参构造函数就消失了，需要显式声明。",
        },
        {
          title: "static 和 final 关键字",
          content: "static 表示属于类而不是属于某个对象的。static 变量所有对象共享一份，static 方法不用 new 对象就能调用。final 表示不可变：修饰变量不能改值，修饰方法不能被子类重写，修饰类不能被子类继承。public static final 就是常量的标准写法。",
          code: "public class MathUtils {\n    public static final double PI = 3.14159;\n\n    public static int add(int a, int b) {\n        return a + b;\n    }\n}\n\n// 直接调用\nint result = MathUtils.add(3, 5);\nSystem.out.println(MathUtils.PI);",
          language: "java",
        },
        {
          title: "内部类和匿名内部类",
          content: "内部类是定义在一个类里面的类，可以访问外部类的私有成员。匿名内部类没有名字，直接 new 接口或抽象类当场实现方法。在 Lambda 表达式出来之前，匿名内部类用得很多，比如事件监听器。现在能换成 Lambda 的场景尽量用 Lambda，代码更简洁。",
          code: "// 匿名内部类\nbutton.addActionListener(new ActionListener() {\n    @Override\n    public void actionPerformed(ActionEvent e) {\n        System.out.println(\"点击了\");\n    }\n});\n\n// Lambda 替代（更简洁）\nbutton.addActionListener(e -> System.out.println(\"点击了\"));",
          language: "java",
          tip: "能用 Lambda 替换匿名内部类的地方尽量替换，代码可读性大幅提升。",
        },
      ],
      quiz: [
        {
          question: "Java 中 extends 关键字表示什么关系？",
          options: ["实现接口", "继承类", "声明变量", "导入包"],
          answer: 1,
          explanation: "extends 表示继承父类，子类获得父类的属性和方法。",
        },
        {
          question: "Java 一个类能同时实现几个接口？",
          options: ["1个", "2个", "无限个", "取决于 JDK 版本"],
          answer: 2,
          explanation: "Java 支持多接口实现，用逗号分隔即可。",
        },
        {
          question: "static 方法里能直接访问非 static 成员吗？",
          options: ["可以", "不可以", "用反射可以", "编译时不报错就可以"],
          answer: 1,
          explanation: "static 方法属于类，没有 this，不能直接访问实例成员。",
        },
        {
          question: "final 修饰类表示什么？",
          options: ["类不能被实例化", "类不能被继承", "类不能被导入", "类不能被重命名"],
          answer: 1,
          explanation: "final 修饰类表示这个类不能有子类，比如 String 类就是 final 的。",
        },
      ],
    },
    "java-threads": {
      slug: "java-threads",
      sections: [
        {
          title: "线程的创建方式",
          content: "创建线程有三种方式：继承 Thread 类、实现 Runnable 接口、实现 Callable 接口（有返回值）。推荐用 Runnable 方式，因为 Java 单继承，Thread 方式会浪费唯一一次继承机会。Callable 可以返回结果和抛异常，配合 Future 使用。",
          code: "// 方式1: 实现 Runnable（推荐）\nThread t1 = new Thread(() -> {\n    System.out.println(\"线程运行中\");\n});\nt1.start();\n\n// 方式2: Callable + Future\nExecutorService executor = Executors.newSingleThreadExecutor();\nFuture<String> future = executor.submit(() -> {\n    Thread.sleep(1000);\n    return \"结果\";\n});\nString result = future.get(); // 阻塞等待结果",
          language: "java",
        },
        {
          title: "线程的生命周期",
          content: "线程有六个状态：NEW（创建了但没 start）、RUNNABLE（运行中或就绪）、BLOCKED（等锁）、WAITING（无限等待如 wait）、TIMED_WAITING（限时等待如 sleep）、TERMINATED（执行完毕）。start 从 NEW 到 RUNNABLE，sleep 进入 TIMED_WAITING，synchronized 拿不到锁进入 BLOCKED。",
          code: "Thread t = new Thread(() -> {\n    System.out.println(\"状态: \" + Thread.currentThread().getState());\n});\nSystem.out.println(t.getState()); // NEW\nt.start();\nThread.sleep(100);\nSystem.out.println(t.getState()); // TERMINATED\n\nt.join();  // 等待线程执行完毕\nThread.sleep(1000); // 当前线程睡1秒",
          language: "java",
          tip: "join 方法让当前线程等待调用 join 的那个线程执行完毕。",
        },
        {
          title: "synchronized 同步锁",
          content: "多个线程同时改同一个数据会出问题，synchronized 保证同一时刻只有一个线程执行同步代码块。可以修饰方法（锁的是 this 对象）或代码块（锁指定对象）。静态方法上的 synchronized 锁的是 Class 对象。锁的范围越小越好，只锁关键代码，不要锁整个方法。",
          code: "public class Counter {\n    private int count = 0;\n    \n    public synchronized void increment() { count++; }\n    \n    // 等价于\n    public void increment2() {\n        synchronized (this) {\n            count++;\n        }\n    }\n    \n    // 静态方法锁 Class 对象\n    public static synchronized void staticMethod() { }\n}",
          language: "java",
          warning: "synchronized 是可重入锁，同一个线程可以多次获取同一把锁不会死锁。",
        },
        {
          title: "线程池 ExecutorService",
          content: "频繁创建销毁线程开销大，线程池就是预先创建一批线程等着干活，用完不销毁放回池子。Executors 工具类可以快速创建各种线程池：newFixedThreadPool 定长线程池、newCachedThreadPool 无限扩大的缓存池、newScheduledThreadPool 定时任务池。生产环境不推荐用 Executors，用 ThreadPoolExecutor 手动调参。",
          code: "ExecutorService pool = Executors.newFixedThreadPool(4);\n\n// 提交任务\npool.execute(() -> System.out.println(\"无返回值的任务\"));\nFuture<Integer> future = pool.submit(() -> { return 42; });\n\n// 关闭线程池\npool.shutdown();\npool.awaitTermination(10, TimeUnit.SECONDS);\n\n// 推荐的生产环境写法\nnew ThreadPoolExecutor(4, 8, 60L, TimeUnit.SECONDS, \n    new LinkedBlockingQueue<>(100));",
          language: "java",
          tip: "生产环境不要用无界队列，请求多时会 OOM。newFixedThreadPool 用 LinkedBlockingQueue 无界队列，很危险。",
        },
        {
          title: "volatile 和原子类",
          content: "volatile 保证多线程间变量的可见性，一个线程改了值另一个线程马上能看到，但不保证原子性。count++ 这种非原子操作 volatile 也救不了。如果想用无锁的方案做计数，用 AtomicInteger 之类的原子类，底层 CAS 实现，性能比 synchronized 好很多。",
          code: "// volatile 只保证可见性\nvolatile boolean running = true;\n\n// 原子类保证线程安全\nAtomicInteger atomicCount = new AtomicInteger(0);\natomicCount.incrementAndGet();  // 原子的 count++\nint value = atomicCount.get();\n\n// CAS 原理简述\natomicCount.compareAndSet(5, 10); // 如果当前值=5，改为10",
          language: "java",
          tip: "简单计数场景用 AtomicInteger，不需要 synchronized，性能好很多。",
        },
      ],
      quiz: [
        {
          question: "start() 和 run() 的区别？",
          options: ["没区别", "start 启动新线程，run 在当前线程执行", "run 启动新线程", "start 是同步的，run 是异步的"],
          answer: 1,
          explanation: "start 才会创建新线程并执行 run 方法，直接调用 run 就是普通方法调用。",
        },
        {
          question: "synchronized 修饰实例方法时锁的是什么？",
          options: ["类本身", "this 对象", "方法代码", "当前线程"],
          answer: 1,
          explanation: "实例方法上的 synchronized 锁的是调用该方法的 this 对象。",
        },
        {
          question: "volatile 能保证什么？",
          options: ["原子性", "可见性", "有序性", "持久性"],
          answer: 1,
          explanation: "volatile 保证变量修改后其他线程立即可见，但不保证复合操作的原子性。",
        },
        {
          question: "为什么生产环境不推荐用 Executors 创建线程池？",
          options: ["性能太差", "默认参数容易 OOM", "不支持并发", "API 已废弃"],
          answer: 1,
          explanation: "newFixedThreadPool 等用无界队列，任务堆积会导致 OOM。",
        },
      ],
    },
    "js-closures": {
      slug: "js-closures",
      sections: [
        {
          title: "闭包是什么——函数记住它的出生地",
          content: "闭包是 JavaScript 最重要的概念之一。简单说：一个函数能够记住并访问它被创建时所在的作用域里的变量，即使那个作用域已经不存在了。\n\n打个比方：你小时候在你家树下面埋了个罐子，长大了回到那个树下面还能挖出来。对于函数来说，闭包就是它小时候的记忆——它能访问创建它的那个作用域里的变量，哪怕那个父函数早就执行完了。\n\n所有 JavaScript 函数本质上都是闭包——因为它们都有对创建时作用域的引用。只是我们经常说的闭包场景是指函数内部返回另一个函数，并且返回的函数用到了外层函数的变量。",
          code: "// 经典的闭包例子\nfunction createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\ncounter(); // 1\ncounter(); // 2\ncounter(); // 3\n// count 变量虽然定义在 createCounter 里，\n// 但返回的函数一直能访问它",
          language: "javascript",
        },
        {
          title: "闭包的实际用途",
          content: "闭包不是用来炫技的，它有很实际的用途：\n\n1. 数据私有化——创建只有某些函数才能访问的变量，外部完全碰不到。在 JavaScript 还没有 class private 字段之前，闭包就是唯一的私有变量方案。\n\n2. 工厂函数——创建一系列类似但行为有细微差异的函数。比如 createAdder(5) 返回一个每次加 5 的函数。\n\n3. 回调与事件绑定——点击按钮后执行的回调函数能访问绑定时周围作用域的变量。\n\n4. 模块模式——IIFE（立即调用的函数表达式）加闭包是最早的 JS 模块方案，把变量封在函数作用域里，只暴露需要的接口。",
          code: "// 1. 私有变量\nfunction createPerson(name) {\n  let age = 0;\n  return {\n    getName: () => name,\n    getAge: () => age,\n    birthday: () => { age++; }\n  };\n  // age 和 name 在外部完全访问不到\n}\n\n// 2. 工厂函数\nconst addFive = (x => y => x + y)(5);\naddFive(10); // 15\n\n// 3. 模块模式\nconst myModule = (function() {\n  let privateVar = 'secret';\n  return {\n    getVar: () => privateVar,\n    setVar: v => { privateVar = v; }\n  };\n})();",
          language: "javascript",
          tip: "闭包的内存问题——闭包会保持对外层变量的引用，导致这些变量不会被垃圾回收。如果闭包里引用了大对象且闭包一直存在，内存就释放不掉。",
        },
        {
          title: "经典的闭包陷阱——循环里的闭包",
          content: "这是面试必考题：用 var 在循环里创建函数引用循环变量 i，结果所有函数引用的都是循环结束后的同一个 i。\n\n为什么？因为 var 是函数作用域而不是块作用域，整个循环共享同一个 i。循环结束后 i 变成了最终值。所有闭包引用的都是同一个 i 的最终值。\n\n解决方案：1. 用 let 替代 var（let 是块作用域，每次迭代创建新的绑定）。2. 用 IIFE 创建一个新作用域把 i 的值传进去保存。",
          code: "// 经典陷阱\nfor (var i = 0; i < 3; i++) {\n  setTimeout(function() { console.log(i); }, 100);\n}\n// 输出：3, 3, 3（不是 0, 1, 2）\n\n// 解决方案 1：用 let\nfor (let i = 0; i < 3; i++) {\n  setTimeout(function() { console.log(i); }, 100);\n}\n// 输出：0, 1, 2 ✓\n\n// 解决方案 2：IIFE\nfor (var i = 0; i < 3; i++) {\n  (function(j) {\n    setTimeout(function() { console.log(j); }, 100);\n  })(i);\n}\n// 输出：0, 1, 2 ✓",
          language: "javascript",
          tip: "用 let 就基本不用关心这个陷阱了。但面试官喜欢考这个，理解原理还是需要的。",
        },
        {
          title: "词法作用域——作用域在写代码时就定好了",
          content: "JavaScript 的作用域是静态的（词法作用域）——函数在哪定义的就继承了哪的作用域，跟在哪执行的没关系。\n\nthis 是动态的——取决于函数怎么调用的。这就是为什么闭包跟 this 的关系让人觉得迷幻：闭包记住了词法作用域的变量，但 this 的值取决于调用方式，不受闭包保护。\n\n箭头函数的 this 是词法的——继承自外层作用域的 this，不会因为调用方式改变。用箭头函数做回调，this 指向固定，省去 bind(this) 的烦恼。\n\n理解闭包的两个关键：词法作用域（编译时确定）、垃圾回收（闭包引用的变量不回收）。",
          code: "// 词法作用域\nfunction outer() {\n  const x = 10;\n  return function inner() {\n    console.log(x); // x 从 outer 的作用域里找\n  };\n}\n\nconst f = outer();\nf(); // 10，即使 outer 已经执行完了\n\n// this 不是闭包变量\nconst obj = {\n  name: 'Alice',\n  greet: function() {\n    setTimeout(function() {\n      console.log(this.name); // undefined！this 是 window/global\n    }, 100);\n  },\n  greetArrow: function() {\n    setTimeout(() => {\n      console.log(this.name); // Alice——箭头函数继承外层 this\n    }, 100);\n  }\n};",
          language: "javascript",
        },
        {
          title: "闭包与性能——内存管理",
          content: "闭包虽好用，但滥用会导致内存泄漏：\n\n1. 闭包持有了不必要的大对象引用——本来该被回收的 DOM 元素或大数组，因为某个闭包还引着而没法释放。\n\n2. 全局闭包——在全局作用域创建的闭包如果引用了大变量，这些变量就跟全局变量一样永驻内存。\n\n3. 异步回调里的闭包——setTimeout/setInterval 的闭包持有引用，timer 不清理闭包就一直存在。\n\n如何避免泄漏：不需要时解除引用（设为 null）、用 useEffect 的 cleanup 清理（React）、在组件销毁时取消订阅。\n\nChrome DevTools 的 Memory 面板可以拍 heap snapshot 看哪些闭包持有了不该持有的对象。",
          code: "// 潜在内存泄漏\nfunction setup() {\n  const bigData = new Array(1000000);\n  // bigData 只在 init 里用\n  \n  const btn = document.getElementById('btn');\n  btn.addEventListener('click', function() {\n    // 这个闭包引用了整个 setup 作用域\n    // 虽然没直接用到 bigData，但 V8 的优化可能\n    // 导致整个 scope 对象都被保留\n    console.log('clicked');\n  });\n}\n\n// 更好的做法：拆开作用域\nfunction setup() {\n  const bigData = new Array(1000000);\n  // 用完 bigData 后...\n  bigData = null; // 解除引用\n  \n  // 再绑定事件\n  const btn = document.getElementById('btn');\n  btn.addEventListener('click', () => console.log('clicked'));\n}",
          language: "javascript",
          tip: "现代 JS 引擎（V8）对闭包的内存做了很多优化——不会无脑保留所有外层变量。但不代表可以随意写，养成好习惯不依赖引擎优化。",
        },
      ],
      quiz: [
        {
          question: "闭包能做什么？",
          options: ["只能做加法", "让函数记住并访问其创建时所在作用域的变量", "替代所有循环", "创建 HTML 元素"],
          answer: 1,
          explanation: "闭包是函数加它创建时的作用域——函数能一直访问那些变量，即使创建它的父函数已经执行完了。",
        },
        {
          question: "for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); } 输出什么？",
          options: ["0 1 2", "3 3 3", "0 0 0", "报错"],
          answer: 1,
          explanation: "var 是函数作用域，循环结束 i 变成 3，所有 setTimeout 回调看到的是同一个 i 的最终值 3。",
        },
        {
          question: "箭头函数和普通函数在 this 上有什么区别？",
          options: ["完全一样", "箭头函数 this 从外层作用域继承，普通函数 this 取决于调用方式", "箭头函数没有 this", "普通函数 this 固定"],
          answer: 1,
          explanation: "箭头函数的 this 是词法绑定的——定义时从外层继承。普通函数的 this 是运行时动态决定的。",
        },
        {
          question: "闭包会造成内存泄漏吗？",
          options: ["不会", "会，如果闭包一直持有不必要的大对象引用", "只有 Node.js 会", "只有浏览器会"],
          answer: 1,
          explanation: "闭包会阻止垃圾回收——只要闭包还存活着，它引用到的外部变量就不会被释放。不清理的长驻闭包可能泄漏内存。",
        },
        {
          question: "IIFE 在闭包里起什么作用？",
          options: ["加速执行", "创建一个新作用域保存当前的变量值", "替代闭包", "没有作用"],
          answer: 1,
          explanation: "IIFE 立即执行创建新作用域，把循环变量的当前值通过参数传进去保存——每个迭代有自己独立的值副本。",
        },
      ],
    },
    "js-event-loop": {
      slug: "js-event-loop",
      sections: [
        {
          title: "JavaScript 是单线程的——那异步怎么来的",
          content: "JavaScript 的单线程意味着同一时间只能做一件事——只有一个调用栈。如果一个请求卡住，后面所有操作都等着。\n\n但浏览器/Node.js 不是单线程的——它们有 Web APIs（浏览器）或 libuv（Node.js）提供的线程池。JS 代码调异步操作时（setTimeout、fetch、文件读写），实际工作交给这些幕后线程去干。\n\n干完之后怎么通知 JS？通过事件循环——幕后线程把回调函数放到一个任务队列里。JS 主线程执行完当前代码后，从任务队列取出回调执行。这就是 JavaScript 异步非阻塞的秘密。\n\n打个比方：你（JS 主线程）是前台收银，顾客下单后你告诉厨房（Web API），然后继续收下一位。菜好了厨房按铃（回调进队列），你手上的顾客处理完了就回头端菜。",
          code: "console.log('1');\n\nsetTimeout(() => {\n  console.log('2');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('3');\n});\n\nconsole.log('4');\n\n// 输出：1 4 3 2\n// 为什么？因为微任务（Promise）比宏任务（setTimeout）优先级高",
          language: "javascript",
        },
        {
          title: "宏任务与微任务——两个队列",
          content: "事件循环里任务分两个级别：\n\n宏任务（Macro-task / Task）——setTimeout、setInterval、I/O 回调、UI 渲染（浏览器）、setImmediate（Node.js）。\n\n微任务（Micro-task）——Promise.then/catch/finally、async/await（await 后面的部分）、MutationObserver（浏览器）、queueMicrotask()、process.nextTick（Node.js，比微任务还先执行）。\n\n事件循环的每次迭代（tick）：\n1. 执行一个宏任务（从宏任务队列取一个）\n2. 执行所有微任务（微任务队列清空——包括微任务执行中产生的新微任务，也一并执行完）\n3. 如果需要且时间到了，渲染更新（浏览器）\n4. 开始下一次迭代\n\n这就是为什么同一个流程里微任务总比下一个宏任务先执行——每次拿一个宏任务后必先把微任务队列清空。",
          code: "// 执行顺序测试\nconsole.log('start');\n\nsetTimeout(() => console.log('timeout'), 0);\n\nPromise.resolve()\n  .then(() => { console.log('promise 1'); })\n  .then(() => { console.log('promise 2'); });\n\nconsole.log('end');\n\n// 输出：\n// start\n// end\n// promise 1\n// promise 2\n// timeout\n//\n// 流程：同步代码先执行 → 开始事件循环\n// 微任务队列有 promise → 全部清空\n// 宏任务队列有 timeout → 执行",
          language: "javascript",
          tip: "process.nextTick（Node.js）的优先级比 Promise.then 还高，在微任务队列之前执行。一个 tick 里 nextTick 队列会先清空。",
        },
        {
          title: "async/await 在事件循环里的行为",
          content: "async/await 本质上是 Promise 的语法糖，但在事件循环里的行为有个细节：\n\nasync 函数被调用时同步部分立即执行（new Promise 的 executor 是同步的）。await 后面会被拆成 .then()——await 之前的代码同步执行，await 之后的代码变成微任务。\n\n所以：await promise 后面的代码相当于 promise.then(() => { 后面的代码 })，被放入微任务队列。\n\n多个 async/await 的执行顺序取决于 Promise 何时 resolve。用 await 写的代码看起来像同步，但事件循环里的实际顺序还是异步的。",
          code: "async function main() {\n  console.log('A');\n  await Promise.resolve();\n  console.log('B');\n}\n\nmain();\n\nPromise.resolve().then(() => console.log('C'));\n\nconsole.log('D');\n\n// 输出：A D B C\n// 但注意！B 和 C 实际上都在微任务队列里\n// 因为 await 后面的 B 相当于 .then(() => console.log('B'))\n// 它是第一个进入微任务队列的，所以 B 先于 C 执行",
          language: "javascript",
          tip: "await 后面的代码优先级跟 .then 一样——都是微任务。多个 await 的代码会被排队到微任务队列里依次执行。",
        },
        {
          title: "Node.js 的事件循环与浏览器有什么不同",
          content: "Node.js 的事件循环基于 libuv，比浏览器的要复杂：\n\nNode.js 的事件循环分 6 个阶段，每个阶段处理特定的回调：\n1. timers——setTimeout/setInterval 回调\n2. pending callbacks——系统操作的回调（如 TCP 错误）\n3. idle/prepare——内部使用\n4. poll——获取新的 I/O 事件（大部分回调在这执行）\n5. check——setImmediate 回调\n6. close callbacks——close 事件的回调（如 socket.on('close')）\n\n每个阶段之间会检查是否有 process.nextTick 和微任务需要执行。\n\nsetTimeout(fn, 0) 和 setImmediate(fn) 的区别：在主模块里直接调用时 setTimeout 先执行（取决于当时事件循环在哪个阶段），在 I/O 回调里 setImmediate 先执行。",
          code: "// Node.js 中 setTimeout vs setImmediate\nsetTimeout(() => console.log('timeout'), 0);\nsetImmediate(() => console.log('immediate'));\n\n// 在主模块里：输出顺序不确定\n// 在 I/O 回调里：setImmediate 一定先执行\n\nconst fs = require('fs');\nfs.readFile(__filename, () => {\n  setTimeout(() => console.log('timeout'), 0);\n  setImmediate(() => console.log('immediate'));\n  // 输出：immediate 先，timeout 后\n});",
          language: "javascript",
          tip: "Node.js 的 process.nextTick 在同一个 tick 里，在任何微任务之前执行。可以用来做关键操作的优先级保障。",
        },
        {
          title: "事件循环的实际影响——卡顿与性能",
          content: "事件循环被阻塞是 Node.js 性能问题的根本原因——一个同步的 CPU 密集操作会卡住事件循环，所有 I/O 都在排队等。\n\n常见阻塞场景：大 JSON 解析、大量同步加密解密、复杂的正则匹配（灾难性回溯）、大循环里的同步操作。\n\n解决方案：\n1. 把 CPU 密集任务拆成小块用 setImmediate 或 async/await 让步事件循环\n2. Worker Threads 把计算放到独立线程\n3. child_process 开子进程跑重任务\n4. 用 stream 而不是一次性读取大文件\n\n排查工具：Node.js 内置的 perf_hooks、clinic.js、0x 火焰图、--trace-event-categories。这些工具能看出事件循环哪个阶段吃了多少时间。",
          code: "// 阻塞事件循环的代码（坏）\nfunction blockingLoop() {\n  let sum = 0;\n  for (let i = 0; i < 10_000_000_000; i++) {\n    sum += i;\n  }\n  return sum;\n}\n\n// 让步式——把大任务拆开\nasync function nonBlockingLoop() {\n  let sum = 0;\n  for (let i = 0; i < 1000; i++) {\n    for (let j = 0; j < 10_000_000; j++) {\n      sum += j;\n    }\n    // 每轮让步事件循环处理其他任务\n    await new Promise(resolve => setImmediate(resolve));\n  }\n  return sum;\n}",
          language: "javascript",
          warning: "CPU 密集任务不要放在主线程——一次 10 亿的循环能把事件循环卡住几秒。期间服务器对所有请求都不响应。",
        },
      ],
      quiz: [
        {
          question: "JavaScript 是单线程的，那异步操作怎么来的？",
          options: ["JavaScript 其实不是单线程", "浏览器/Node.js 提供后台线程处理 IO，事件循环把回调送回主线程", "JS 引擎自动开线程", "异步只是假象"],
          answer: 1,
          explanation: "JS 主线程只负责执行代码。异步操作（定时器、网络请求、文件读写）由运行时环境的后台线程处理，完成后回调进任务队列。",
        },
        {
          question: "宏任务和微任务谁先执行？",
          options: ["宏任务", "微任务——每次宏任务后微任务队列完全清空", "一起执行", "取决于代码"],
          answer: 1,
          explanation: "事件循环每个 tick 取一个宏任务执行，然后清空所有微任务。微任务处理中产生的新微任务也在同一 tick 内处理完。",
        },
        {
          question: "Node.js 里 process.nextTick 和 Promise.then 谁先执行？",
          options: ["Promise.then", "process.nextTick——优先级比微任务还高", "同时执行", "取决于 Node 版本"],
          answer: 1,
          explanation: "process.nextTick 的队列在每个事件循环阶段切换时首先清空，比微任务队列还优先。",
        },
        {
          question: "await 后面的代码相当于什么？",
          options: ["同步代码", ".then() 回调（微任务）", "setTimeout 回调", "setImmediate 回调"],
          answer: 1,
          explanation: "await 把后面的代码拆成 Promise 的 .then 回调，进入微任务队列。await 之后的代码不是同步继续执行的。",
        },
        {
          question: "CPU 密集计算怎么避免阻塞事件循环？",
          options: ["没办法", "拆成小块用 setImmediate 让步、Worker Threads 或子进程", "增加更多 CPU", "用更大的内存"],
          answer: 1,
          explanation: "把大循环拆开每次处理一小部分然后 setImmediate 让出主线程，或者把计算搬到 Worker Thread / 子进程里。",
        },
      ],
    },
    "js-prototype": {
      slug: "js-prototype",
      sections: [
        {
          title: "原型链——JavaScript 的继承机制",
          content: "JavaScript 的继承跟 Java/C++ 不一样——它不是基于类的，而是基于原型的。每个对象都有一个隐藏的 [[Prototype]] 属性（通过 __proto__ 或 Object.getPrototypeOf 访问），指向它的原型对象。\n\n当你在对象上访问一个属性，JS 引擎先找对象本身有没有这个属性。没有就顺着 __proto__ 链往上层找，一直找到 null 为止。这条链就是原型链。\n\nObject.prototype 是所有普通对象的最终原型。Function.prototype 是所有函数的原型。Array.prototype 是所有数组的原型，继承自 Object.prototype。\n\nArray.prototype → Object.prototype → null。你定义的数组能用 push、map、filter 是因为它们定义在 Array.prototype 上，通过原型链传递到你数组里。",
          code: "const arr = [1, 2, 3];\narr.push(4); // push 来自 Array.prototype\narr.toString(); // toString 来自 Object.prototype\n\n// 验证原型链\narr.__proto__ === Array.prototype;         // true\nArray.prototype.__proto__ === Object.prototype; // true\nObject.prototype.__proto__ === null;       // true（链的终点）",
          language: "javascript",
        },
        {
          title: "构造函数与 new 关键字",
          content: "在 ES6 class 出来之前，JavaScript 的类是用构造函数模拟的。任何普通函数前面加 new 调用，就变成了构造函数。\n\nnew 做了四件事：\n1. 创建一个空对象{}\n2. 把空对象的原型指向构造函数的 prototype（obj.__proto__ = Fn.prototype）\n3. 以这个空对象为 this 调用构造函数（Fn.call(obj)）\n4. 如果构造函数没返回对象，就返回这个空对象\n\n所以构造函数的 prototype 属性就是用它创建出来的实例的原型。注意只有函数的 prototype 属性跟对象的 __proto__ 是两个东西——prototype 是函数才有的属性，__proto__ 是所有对象都有的。",
          code: "// 构造函数\nfunction Person(name) {\n  this.name = name;\n}\n\nPerson.prototype.sayHi = function() {\n  console.log('Hi, I am ' + this.name);\n};\n\nconst alice = new Person('Alice');\nalice.sayHi(); // Hi, I am Alice\n\n// new 的模拟实现\nfunction myNew(Fn, ...args) {\n  const obj = Object.create(Fn.prototype);\n  const result = Fn.apply(obj, args);\n  return result instanceof Object ? result : obj;\n}",
          language: "javascript",
        },
        {
          title: "ES6 class——语法糖",
          content: "ES6 引入了 class 关键字，但它本质上是原型继承的语法糖——底层还是基于原型的。class 让代码更直观，也加了几个只有 class 才有的特性。\n\nconstructor 是构造函数。extends 设置原型链（子类的 prototype.__proto__ 指向父类的 prototype）。super 调用父类构造函数。\n\nclass 跟构造函数的不同：class 必须用 new 调用（否则报错）；class 的方法不可枚举（默认不可用 for...in 遍历出来）；class 内部默认是严格模式。\n\n静态方法（static）定义在类本身而不是原型上，相当于 Person.staticMethod。实例访问不到。",
          code: "// class 语法\nclass Person {\n  constructor(name) {\n    this.name = name;\n  }\n  \n  sayHi() {\n    console.log('Hi, I am ' + this.name);\n  }\n  \n  static create(name) {\n    return new Person(name);\n  }\n}\n\nconst bob = new Person('Bob');\nbob.sayHi();\n\n// extends 继承\nclass Student extends Person {\n  constructor(name, grade) {\n    super(name);  // 调用父类构造函数\n    this.grade = grade;\n  }\n  \n  study() {\n    console.log(this.name + ' is studying');\n  }\n}",
          language: "javascript",
          tip: "虽然有了 class 语法，但理解背后的原型机制仍然重要。debug 时看对象结构、理解为什么方法在所有实例间共享，都跟原型有关。",
        },
        {
          title: "prototype vs __proto__ vs Object.create",
          content: "这三个东西容易搞混，一张图搞清楚：\n\nprototype——只有函数对象有。它是一个普通对象，当你用 new 调用这个函数时，新对象的 __proto__ 指向函数的 prototype。\n\n__proto__——每个对象都有（除了 null），指向它的原型。这是原型链的物理连接。\n\nObject.create(proto)——创建一个新对象，手动指定它的原型。这是最纯粹的原型继承方式，不需要构造函数。\n\n它们的关系：实例.__proto__ === 构造函数.prototype。函数的 __proto__ 指向 Function.prototype。",
          code: "// 三种继承方式的对比\n\n// 1. 构造函数 + prototype\nfunction Animal(name) { this.name = name; }\nAnimal.prototype.eat = function() { console.log('eat'); };\nconst dog = new Animal('dog');\n\n// 2. Object.create\nconst animalProto = { eat() { console.log('eat'); } };\nconst cat = Object.create(animalProto);\ncat.name = 'cat';\n\n// 3. class\nclass AnimalClass {\n  constructor(name) { this.name = name; }\n  eat() { console.log('eat'); }\n}\nconst bird = new AnimalClass('bird');",
          language: "javascript",
        },
        {
          title: "原型链的面试陷阱",
          content: "原型链相关的高频面试题：\n\n1. instanceof——检查构造函数.prototype 是否在某个对象的原型链上。obj instanceof Fn 就是看 Fn.prototype 在不在 obj.__proto__ 链上。\n\n2. hasOwnProperty——检查属性是在对象自身上还是在原型链上。for...in 会遍历原型链上的可枚举属性，配合 hasOwnProperty 过滤。\n\n3. 修改内置原型——给 Array.prototype 加自定义方法（如 Array.prototype.lastItem）。虽然可以做到但不推荐——可能跟未来的 JS 标准冲突或者覆盖别人的代码。\n\n4. 各种方法在哪个 prototype 上——toString 在 Object.prototype 上，所有对象都能用。call/apply/bind 在 Function.prototype 上，只有函数能用。",
          code: "// instanceof\nfunction Foo() {}\nconst f = new Foo();\nf instanceof Foo;  // true\nf instanceof Object;  // true（Foo.prototype 的最顶端是 Object.prototype）\n\n// hasOwnProperty\nconst obj = Object.create({ inherited: true });\nobj.own = false;\nobj.hasOwnProperty('own');  // true\nobj.hasOwnProperty('inherited');  // false\n\n// 检查属性在不在自身\nfor (const key in obj) {\n  if (obj.hasOwnProperty(key)) {\n    console.log('own:', key);\n  }\n}",
          language: "javascript",
          tip: "不要扩展内置原型——Array.prototype.myMethod。你的代码和第三方库、未来的 JS 标准都看上了同一个 Array.prototype。",
        },
      ],
      quiz: [
        {
          question: "JavaScript 的继承是基于什么的？",
          options: ["类", "原型", "接口", "模块"],
          answer: 1,
          explanation: "JS 是原型继承——对象直接继承另一个对象（原型），顺着原型链向上找属性和方法。class 只是语法糖。",
        },
        {
          question: "prototype 属性和 __proto__ 属性有什么区别？",
          options: ["一样", "prototype 只有函数有，__proto__ 所有对象都有", "__proto__ 只有函数有", "prototype 是废弃的"],
          answer: 1,
          explanation: "prototype 是函数的属性，决定了用它 new 出来的对象的原型链起点。__proto__ 是每个对象都有的，指向它的原型。",
        },
        {
          question: "new 关键字做了什么？",
          options: ["只创建了一个对象", "创建对象、设置原型、执行构造函数、返回对象", "调用原型的 toString", "创建一个类"],
          answer: 1,
          explanation: "new 做四步：创空对象、设其 __proto__ 指向构造函数的 prototype、以该对象为 this 执行构造函数、返回对象。",
        },
        {
          question: "instanceof 检查的是什么？",
          options: ["对象是否为某个类", "构造函数的 prototype 是否在对象的原型链上", "对象的类型", "函数是否被调用过"],
          answer: 1,
          explanation: "instanceof 顺着 obj.__proto__ 链往上找，看某个构造函数的 prototype 是否在链上。",
        },
        {
          question: "为什么不推荐扩展内置原型（如 Array.prototype.myMethod）？",
          options: ["语法不支持", "可能跟其他库或未来 JS 标准冲突", "性能极差", "只有老浏览器支持"],
          answer: 1,
          explanation: "全局修改内置原型影响所有代码。第三方库可能也定义了同名方法，或者未来 ES 标准引入同名方法。非常不保险。",
        },
      ],
    },
    "k8s-basics": {
      slug: "k8s-basics",
      sections: [
        {
          title: "Kubernetes 是什么、解决什么问题",
          content: "Kubernetes（简称 K8s，8 代表 k 和 s 中间省略的 8 个字母）是容器编排平台。当你需要管理几十上百个容器时——部署到哪些机器、负载均衡、故障恢复、滚动更新——手动操作是不可能的。K8s 就是干这事的自动化大管家。\n\nK8s 的四大核心能力：\n1. 自动调度——你告诉 K8s 你想跑几个容器，它自己决定跑在哪些机器上。\n2. 自动修复——容器挂了自动重启，节点挂了自动把上面容器迁走。\n3. 滚动更新——更新应用时一个一个替换，服务不中断。\n4. 服务发现和负载均衡——容器之间通过服务名互相找到，自动负载均衡。\n\nK8s 的架构：控制平面（Master 节点，负责决策）和工作节点（Worker 节点，负责跑容器）。控制平面包括 API Server、etcd（存储所有配置）、Scheduler（调度）、Controller Manager（控制器）。",
          language: "bash",
        },
        {
          title: "核心概念——Node、Pod、Service",
          content: "K8s 有几个核心概念，搞懂了就入门了：\n\nNode——物理机或虚拟机，也就是工作节点。上面跑着 kubelet（跟控制平面对接的代理）和容器运行时（Docker 或 containerd）。\n\nPod——K8s 调度的最小单位，不是容器。一个 Pod 里可以有 1 个或多个容器，它们共享网络和存储、在同一个 Node 上。大多数情况下一个 Pod 只跑一个容器，多容器 Pod 用于 Sidecar 模式。\n\nService——一组 Pod 的抽象。Pod 是临时的，IP 会变，挂了重建后 IP 可能不一样。Service 给这组 Pod 提供一个固定的虚拟 IP 和 DNS 名，你永远用 Service 名访问，不管后面 Pod 怎么变。\n\nDeployment——管理 Pod 的控制器。你定义想跑几个副本、用什么镜像、怎么更新，Deployment 去实现并维持你想要的这个状态。",
          code: "# 查看节点\nkubectl get nodes\n\n# 查看 Pod\nkubectl get pods\nkubectl get pods -o wide   # 看到分配在哪个 Node 上\n\n# 查看 Service\nkubectl get svc\n\n# 查看 Deployment\nkubectl get deployments",
          language: "bash",
        },
        {
          title: "kubectl——你对 K8s 的唯一操作入口",
          content: "kubectl 是 K8s 的命令行客户端。你对 K8s 的一切操作——创建、查看、更新、删除——全通过 kubectl 发给 API Server。\n\nkubectl 的基本语法：kubectl 动作 资源类型 资源名 选项。比如 kubectl get pods、kubectl describe pod my-pod、kubectl delete pod my-pod。\n\n常用动作：get（查）、describe（详情）、create（建）、apply（声明式创建/更新，推荐）、delete（删）、logs（看日志）、exec（进容器执行命令）。\n\n资源类型简写：pod/po、service/svc、deployment/deploy、configmap/cm、namespace/ns。记不住用 kubectl api-resources 看。",
          code: "# 常用 kubectl 命令\nkubectl get pods -A                    # 所有命名空间的 Pod\nkubectl describe pod my-pod            # Pod 详细信息和事件\nkubectl logs my-pod                    # Pod 日志\nkubectl logs my-pod -c my-container    # 指定容器日志\nkubectl exec -it my-pod -- sh          # 进容器\nkubectl apply -f deployment.yaml       # 声明式部署\nkubectl delete -f deployment.yaml      # 删除\nkubectl port-forward my-pod 8080:80    # 端口转发",
          language: "bash",
          tip: "kubectl explain pod.spec 非常有用——直接在命令行里查某个 K8s 资源的字段说明，不用翻文档。",
        },
        {
          title: "YAML 配置的基本结构",
          content: "K8s 里一切皆 YAML。每个 K8s 对象的 YAML 都遵循同样的结构——四个顶级字段：apiVersion、kind、metadata、spec（有些有 status，但那是 K8s 填的，不是你写的）。\n\napiVersion——K8s API 的版本，决定了哪些字段可用。比如 apps/v1（Deployment）、v1（Pod、Service）。\nkind——资源类型，如 Pod、Service、Deployment、ConfigMap。\nmetadata——元数据，至少要有 name。可以加 labels（标签，用于筛选）、namespace（命名空间）。\nspec——期望的状态，这是你最常写的部分。不同资源的 spec 完全不同。",
          code: "# Pod 的 YAML 示例\napiVersion: v1\nkind: Pod\nmetadata:\n  name: my-pod\n  labels:\n    app: myapp\nspec:\n  containers:\n  - name: nginx\n    image: nginx:latest\n    ports:\n    - containerPort: 80\n\n# 应用这个文件\nkubectl apply -f pod.yaml",
          language: "yaml",
          tip: "kubectl explain 资源名 能看某个资源类型的字段说明和默认值，特别适合不记得 fields 的时候。",
        },
        {
          title: "Namespace——资源隔离",
          content: "Namespace 是 K8s 里的虚拟分区——你在一个 Namespace 里创建的资源，在别的 Namespace 里看不到（除非你指定）。适合多团队共享同一个集群、或者按环境隔离（dev/staging/prod）。\n\n默认有四个 Namespace：default（默认）、kube-system（K8s 自己的组件）、kube-public（公共的 ConfigMap 等）、kube-node-lease（节点心跳）。\n\n大部分命令默认操作 default Namespace。要操作别的 Namespace 加 -n 参数，或者用 kubectl config set-context 改默认 Namespace。\n\n注意：不是所有资源都支持 Namespace——Node、PersistentVolume 是集群级别的，不属于任何 Namespace。用 kubectl api-resources --namespaced 看哪些支持 Namespace。",
          code: "# 创建 Namespace\nkubectl create namespace dev\n\n# 在指定 Namespace 操作\nkubectl get pods -n dev\nkubectl apply -f app.yaml -n prod\n\n# 切换默认 Namespace\nkubectl config set-context --current --namespace=dev\n\n# 查看所有 Namespace 的资源\nkubectl get pods --all-namespaces\nkubectl get pods -A",
          language: "bash",
          tip: "生产环境一定用不同的 Namespace 隔离环境。dev 和 prod 混在同一个 Namespace 里就是在找麻烦。",
        },
      ],
      quiz: [
        {
          question: "K8s 调度的最小单位是什么？",
          options: ["容器", "Pod", "Node", "Deployment"],
          answer: 1,
          explanation: "Pod 是 K8s 的最小调度单位。容器包含在 Pod 里，一个 Pod 可以有多个容器。",
        },
        {
          question: "Service 的作用是什么？",
          options: ["存储数据", "给 Pod 提供固定的虚拟 IP 和 DNS 名", "管理配置", "监控日志"],
          answer: 1,
          explanation: "Service 为一组 Pod 提供稳定的访问入口。Pod IP 会变但 Service 的 IP 和 DNS 名不变。",
        },
        {
          question: "kubectl apply -f file.yaml 和 kubectl create -f file.yaml 区别？",
          options: ["apply 是声明式（可以重复执行），create 是命令式", "没区别", "create 更快", "apply 只读"],
          answer: 0,
          explanation: "apply 可以反复执行，K8s 自动判断是创建还是更新。create 只能创建，第二次会报错。",
        },
        {
          question: "Namespace 有什么作用？",
          options: ["加速 Pod 启动", "资源隔离和分组", "增加安全性", "提供网络隔离"],
          answer: 1,
          explanation: "Namespace 把集群虚拟分割成多个逻辑分区，不同团队或环境的资源可以隔离开。",
        },
        {
          question: "etcd 在 K8s 里存的是什么？",
          options: ["容器日志", "集群所有配置和状态数据", "用户应用数据", "容器镜像"],
          answer: 1,
          explanation: "etcd 是 K8s 的后端数据库，存着集群的期望状态和实际状态——Pod、Service、ConfigMap 等所有对象的配置。",
        },
      ],
    },
    "k8s-config": {
      slug: "k8s-config",
      sections: [
        {
          title: "ConfigMap——配置管理",
          content: "把配置硬编码在镜像里是个坏习惯——换个环境就要重新打镜像。ConfigMap 把配置从镜像里抽出来，运行时以环境变量或文件形式注入 Pod。\n\nConfigMap 存键值对，键是配置项名，值是配置内容。可以存简单的 key=value，也可以存整个配置文件（Nginx 配置、Java properties 等）。大小限制 1MB。\n\n使用方式：\n1. 环境变量——把 ConfigMap 的键值对注入为容器的环境变量\n2. 挂载为文件——把 ConfigMap 挂载到容器里某个目录，每个键是一个文件\n3. 命令行参数——通过 env 注入后再传给命令\n\nConfigMap 更新后，环境变量的方式不会自动更新（Pod 要重建）。挂载文件的方式会延迟自动更新（kubelet 定期同步）。",
          code: "# 从字面值创建\nkubectl create configmap app-config \\\n  --from-literal=DB_HOST=db-service \\\n  --from-literal=DB_PORT=5432\n\n# 从文件创建\nkubectl create configmap nginx-config --from-file=nginx.conf\n\n# YAML 方式\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: app-config\ndata:\n  DB_HOST: \"db-service\"\n  DB_PORT: \"5432\"\n  app.properties: |\n    server.port=8080\n    logging.level=INFO",
          language: "bash",
          tip: "ConfigMap 里可以存一个完整的配置文件——用竖线加缩进（YAML 多行字符串语法），然后把整个 ConfigMap 挂载为文件。",
        },
        {
          title: "Secret——敏感数据管理",
          content: "Secret 跟 ConfigMap 类似，但专门存敏感信息——密码、Token、证书、SSH Key。数据以 Base64 编码存储（注意不是加密！只是编码，任何人都能解码）。\n\nSecret 类型：\nOpaque——通用类型，就是你存的任意键值对\nkubernetes.io/tls——TLS 证书和私钥\nkubernetes.io/dockerconfigjson——Docker registry 的登录凭证\nkubernetes.io/basic-auth——用户名密码\n\n创建后使用方法跟 ConfigMap 一样：环境变量注入或文件挂载。Secret 在 etcd 里默认不加密，生产环境建议开 etcd 加密或者用外部密钥管理服务（Vault、Sealed Secrets）。",
          code: "# 创建 Secret\nkubectl create secret generic db-secret \\\n  --from-literal=username=admin \\\n  --from-literal=password='MyP@ssw0rd'\n\n# TLS Secret\nkubectl create secret tls my-tls \\\n  --cert=cert.pem --key=key.pem\n\n# YAML 方式\ndata:\n  username: YWRtaW4=    # base64 编码的 admin\n  password: TXlQQHNzdzByZA==\n\n# 使用 Secret（Pod YAML 里）\nenv:\n- name: DB_PASSWORD\n  valueFrom:\n    secretKeyRef:\n      name: db-secret\n      key: password",
          language: "bash",
          warning: "Secret 的 Base64 只是编码不是加密！任何能 kubectl get secret 的人都能解码。要真正的加密用 Sealed Secrets 或 Vault。",
        },
        {
          title: "ConfigMap 和 Secret 的更新机制",
          content: "ConfigMap 和 Secret 更新后，Pod 里的值不会立刻生效：\n\n环境变量方式：只有在 Pod 启动时读取。改了 ConfigMap，Pod 的环境变量还是旧值。必须重建 Pod。\n\n文件挂载方式：kubelet 定期同步（默认约 60 秒），会把最新的值更新到容器里的文件。但应用需要自己检测文件变化并重载配置（如 nginx -s reload）。\n\n如果应用不支持热重载文件，更新配置的麻烦流程就是：改 ConfigMap → 重启 Pod。\n\n还有一种方式：用 deployment 的 annotation 记录 ConfigMap 的 hash，hash 变了自动触发滚动更新。这是比较优雅的自动更新方案。",
          code: "# 滚动更新时触发 Pod 重建\n# Deployment YAML 的 template.metadata.annotations 里加\nannotations:\n  checksum/config: {{ include (print $.Template.BasePath \"/configmap.yaml\") . | sha256sum }}",
          language: "yaml",
        },
        {
          title: "环境变量注入与 Pod 配置最佳实践",
          content: "给容器注入配置的最佳实践：\n\n1. 非敏感的简单配置（数据库地址、端口）→ ConfigMap 挂为环境变量\n2. 配置文件（nginx.conf、Java properties）→ ConfigMap 挂载为文件\n3. 密码、Token、证书 → Secret 挂载为文件（比环境变量更安全）\n4. 配置验证 → 在容器启动脚本里检查必需的环境变量是否都设了\n5. 合理使用默认值——没设时有回退方案，不崩\n\n环境变量的优先级（从高到低）：容器直接 env > Secret envFrom > ConfigMap envFrom。如果有同名环境变量，高优先级的覆盖低优先级的。",
          code: "# Pod——同时使用 ConfigMap 和 Secret\nspec:\n  containers:\n  - name: app\n    image: myapp:latest\n    envFrom:\n    - configMapRef:\n        name: app-config\n    - secretRef:\n        name: db-secret\n    env:\n    - name: NODE_ENV\n      value: \"production\"\n    volumeMounts:\n    - name: nginx-config\n      mountPath: /etc/nginx/conf.d\n  volumes:\n  - name: nginx-config\n    configMap:\n      name: nginx-config",
          language: "yaml",
          tip: "envFrom 会把这个 ConfigMap 或 Secret 的所有键值对注入为环境变量。一行搞定，比逐个 env valueFrom 方便。",
        },
        {
          title: "Helm Chart——K8s 的包管理器",
          content: "如果每个环境都手写一套 YAML 文件，维护起来会很痛苦。Helm 是 K8s 的包管理器——把一组 K8s YAML 模板化，用 values.yaml 来定制每个环境的配置。\n\nHelm Chart 的结构：\nChart.yaml——chart 的元数据（名称、版本、依赖）。\nvalues.yaml——默认的配置值。\ntemplates/——K8s 资源模板（Deployment、Service、ConfigMap 等），用 Go 模板语法嵌入式地引用 values。\n\n安装 chart：helm install my-app ./chart -f values-prod.yaml。-f 可以覆盖默认的 values。\n\n升级：helm upgrade my-app ./chart --set image.tag=v2.0。用 --set 快速覆盖单个值。\n\nHelm 的模板函数库很丰富：default（兜底值）、quote（加引号）、indent（缩进）、toYaml（转 YAML）。在 templates 里用 .Values.xxx 引用 values.yaml 的值。",
          code: "# Chart.yaml\napiVersion: v2\nname: my-app\nversion: 1.0.0\nappVersion: \"2.0.0\"\n\n# values.yaml\nreplicas: 3\nimage:\n  repository: myapp\n  tag: latest\nservice:\n  port: 80\n  type: ClusterIP\nresources:\n  limits:\n    cpu: 500m\n    memory: 256Mi\n\n# templates/deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nspec:\n  replicas: {{ .Values.replicas }}\n  template:\n    spec:\n      containers:\n      - image: \"{{ .Values.image.repository }}:{{ .Values.image.tag }}\"\n        resources:\n          {{- toYaml .Values.resources | nindent 10 }}",
          language: "yaml",
          tip: "Helm 的 lookup 函数可以从已存在的 K8s 资源里取信息（如共享的 Secret），避免在 values.yaml 里重复写相同配置。",
        },
      ],
      quiz: [
        {
          question: "ConfigMap 和 Secret 的主要区别？",
          options: ["ConfigMap 能存更多", "Secret 专门存敏感数据，以 Base64 编码", "ConfigMap 只能用 YAML", "Secret 不能挂载为文件"],
          answer: 1,
          explanation: "Secret 为敏感数据设计，数据 Base64 编码（不是加密）。功能上 ConfigMap 能做的 Secret 也能做，但概念分开更安全。",
        },
        {
          question: "改了 ConfigMap，Pod 的环境变量会立刻更新吗？",
          options: ["会", "不会，需要重建 Pod", "等 30 秒自动更新", "需要在容器里执行命令"],
          answer: 1,
          explanation: "环境变量只在 Pod 启动时注入一次。改了 ConfigMap 不影响已运行的 Pod，必须重建。",
        },
        {
          question: "Secret 的 Base64 编码是加密吗？",
          options: ["是的", "不是，只是编码，随便解码", "取决于使用方式", "只有 root 能解码"],
          answer: 1,
          explanation: "Base64 是可逆编码，任何人都能 echo dGVzdA== | base64 -d 解码。要真正的安全需要额外方案。",
        },
        {
          question: "文件挂载方式改 ConfigMap 后多久能更新到 Pod？",
          options: ["立刻", "约 60 秒（kubelet 同步周期）", "1 小时", "从不会更新"],
          answer: 1,
          explanation: "kubelet 定期同步挂载的 ConfigMap/Secret 到 Pod 文件。默认约 60 秒，但应用需要重载配置才能生效。",
        },
        {
          question: "envFrom 是干什么的？",
          options: ["查看环境变量", "把整个 ConfigMap 或 Secret 的所有键值一次性注入为环境变量", "删除环境变量", "导出环境变量"],
          answer: 1,
          explanation: "envFrom 一键把 ConfigMap 或 Secret 的所有 key-value 变成环境变量，省去逐个写的麻烦。",
        },
      ],
    },
    "k8s-deployment": {
      slug: "k8s-deployment",
      sections: [
        {
          title: "Deployment——Pod 的管理者",
          content: "Deployment 是 K8s 最常用的控制器——它管理 ReplicaSet，ReplicaSet 管理 Pod。你定义期望状态（几个副本、什么镜像），Deployment 保证实际状态跟期望一致。\n\nDeployment 的核心功能：\n1. 副本管理——保证指定数量的 Pod 一直跑着。少了就补，多了就杀。\n2. 滚动更新——改变镜像版本时，一个一个替换 Pod，服务不中断。\n3. 回滚——升级出了问题，一键回到上一个版本。\n4. 扩缩容——改 replicas 数字，秒级生效。\n\n创建 Deployment 最常用 kubectl create deployment（命令行快捷方式）和 kubectl apply -f deployment.yaml（YAML 声明式，推荐）。",
          code: "# 命令行快捷创建\nkubectl create deployment my-app --image=nginx --replicas=3\n\n# YAML 方式\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: my-app\n  template:\n    metadata:\n      labels:\n        app: my-app\n    spec:\n      containers:\n      - name: app\n        image: nginx:1.25\n        ports:\n        - containerPort: 80",
          language: "yaml",
        },
        {
          title: "滚动更新——怎么不停机升级",
          content: "滚动更新是 Deployment 的杀手级功能。你改一下 image 版本号然后 apply，Deployment 会创建一个新的 ReplicaSet，按配置的策略逐步用新 Pod 替换旧 Pod。\n\n控制滚动更新的两个关键参数：\nmaxSurge——更新期间最多可以多出几个 Pod（超出 replicas 数量）。默认 25%。比如 replicas=4，最多可以临时跑到 5 个。\nmaxUnavailable——更新期间最多几个 Pod 可以不可用。默认 25%。比如 replicas=4，最多 1 个 Pod 可以不接流量。\n\n更新策略：RollingUpdate（一个个换，默认）和 Recreate（先把所有旧的删了再建新的，有停机时间）。除非真的不能同时跑新旧版本（如数据库 schema 不兼容），不然都用 RollingUpdate。",
          code: "# 更新镜像\nkubectl set image deployment/my-app app=nginx:1.26\n\n# 或者在 YAML 里改 image 然后重新 apply\nkubectl apply -f deployment.yaml\n\n# 查看更新进度\nkubectl rollout status deployment/my-app\n\n# 查看更新历史\nkubectl rollout history deployment/my-app\n\n# 调整滚动更新策略\nspec:\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0",
          language: "bash",
          tip: "maxUnavailable: 0 表示更新时不允许任何 Pod 不可用，但需要临时多出一个 Pod（maxSurge 至少为 1）。这是最保守的更新策略。",
        },
        {
          title: "回滚——出错了怎么退回去",
          content: "升级后发现问题怎么办？Deployment 保存了更新历史（默认保留 10 个版本），一条命令就能回滚。\n\nkubectl rollout undo deployment/my-app——回到上一个版本。\nkubectl rollout undo deployment/my-app --to-revision=3——回到指定的第 3 版。\nkubectl rollout history deployment/my-app——看所有历史版本。\n\n每次对 Deployment 的 template（即 Pod 的定义）的修改都会创建一个新 Revision。改 replicas 数不算新 Revision。\n\n回滚也是通过滚动更新来实现的——Deployment 会创建新的 ReplicaSet，逐步替换当前 Pod。",
          code: "# 查看更新历史\nkubectl rollout history deployment/my-app\n\n# 查看某个版本的具体信息\nkubectl rollout history deployment/my-app --revision=3\n\n# 回滚到上一个版本\nkubectl rollout undo deployment/my-app\n\n# 回滚到指定版本\nkubectl rollout undo deployment/my-app --to-revision=2\n\n# 暂停和恢复更新\nkubectl rollout pause deployment/my-app   # 暂停\nkubectl rollout resume deployment/my-app  # 恢复",
          language: "bash",
          tip: "在持续部署（CD）里，部署后发现监控指标异常可以自动执行 rollout undo——这是 GitOps 的标配操作。",
        },
        {
          title: "扩缩容与自动伸缩（HPA）",
          content: "手动扩缩容：kubectl scale deployment my-app --replicas=5。秒级生效，K8s 立刻启动或终止 Pod。\n\n水平自动伸缩（HPA）——根据 CPU 使用率或自定义指标自动调整副本数。HPA 定期检查指标，如果 Pod 的平均 CPU 超过你设定的阈值，自动增加副本。反之减少。\n\nHPA 需要三个条件：Deployment 必须设了 resources.requests（HPA 要知道什么是 100%）；集群安装了 metrics-server（收集 CPU/内存指标）；你创建了 HPA 资源。\n\n除了 CPU 和内存，HPA 还支持自定义指标（如请求 QPS、队列长度）。需要安装 Prometheus Adapter。",
          code: "# 手动扩容\nkubectl scale deployment my-app --replicas=5\n\n# 创建 HPA\nkubectl autoscale deployment my-app --min=2 --max=10 --cpu-percent=70\n\n# HPA YAML\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata:\n  name: my-app-hpa\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: my-app\n  minReplicas: 2\n  maxReplicas: 10\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target:\n        type: Utilization\n        averageUtilization: 70",
          language: "yaml",
          tip: "HPA 的冷却时间有默认值——扩容后等 3 分钟再考虑缩容，避免抖动。这些参数可以配但一般默认值够用。",
        },
        {
          title: "金丝雀发布与蓝绿部署",
          content: "除了标准滚动更新，还有更复杂的发布策略：\n\n蓝绿部署——准备两套完整的环境（蓝=旧版，绿=新版）。新版部署好后，一次性把所有流量从蓝切到绿。优点：瞬间切换，有问题立刻切回去。缺点：双倍资源。\n\n金丝雀发布——先把新版放给一小部分用户（比如 10% 流量），观察没问题再逐步放大到 100%。用 Service 的 Label Selector 配合多个 Deployment 实现。\n\nK8s 原生的 Deployment 不直接支持这些策略，但可以借助：\n- 多个 Deployment + 共享的 Service（通过 Label 控制流量比例）\n- Service Mesh（Istio、Linkerd）做更精细的流量控制\n- Argo Rollouts（专门做渐进式发布的 K8s 控制器）\n- Flagger（配合 Service Mesh 做金丝雀发布）",
          code: "# 金丝雀发布思路（用 Label 分流）\n# 主 Deployment: label version: stable\n# 金丝雀 Deployment: label version: canary（只有 1 个副本）\n# Service selector 同时匹配 stable 和 canary\n# 大多数流量到 stable，少部分到 canary",
          language: "bash",
          tip: "生产环境直接上 Istio 或 Argo Rollouts 做金丝雀发布，比手动调 Label 靠谱得多。K8s 原生对高级发布策略支持有限。",
        },
      ],
      quiz: [
        {
          question: "Deployment 的默认更新策略是什么？",
          options: ["Recreate", "RollingUpdate", "蓝绿部署", "金丝雀发布"],
          answer: 1,
          explanation: "RollingUpdate 是默认策略——一个一个替换 Pod，保证服务不中断。",
        },
        {
          question: "kubectl rollout undo 是干什么的？",
          options: ["删除 Deployment", "回滚到上一个版本", "重启 Pod", "扩容"],
          answer: 1,
          explanation: "undo 把 Deployment 回滚到前一个 Revision。升级出了 BUG 用它最快止损。",
        },
        {
          question: "HPA 根据什么来扩缩容？",
          options: ["管理员手动操作", "CPU 使用率或自定义指标", "时间调度", "Pod 数量"],
          answer: 1,
          explanation: "HPA 监控指标（通常是 CPU 使用率），超过目标阈值自动加 Pod，低于目标自动减 Pod。",
        },
        {
          question: "滚动更新中的 maxSurge 是什么意思？",
          options: ["最大 Pod 总数", "更新时可超出 replicas 的额外 Pod 数", "最大不可用 Pod 数", "更新速度"],
          answer: 1,
          explanation: "maxSurge 控制更新时能临时多几个 Pod。值越大更新越快，但占的临时资源越多。",
        },
        {
          question: "蓝绿部署和滚动更新的本质区别？",
          options: ["一样", "蓝绿部署准备两套完整环境一次性切流量，滚动更新逐步替换 Pod", "蓝绿部署更快", "滚动更新需要更多资源"],
          answer: 1,
          explanation: "蓝绿部署把新旧两套环境都准备好，一次性切流量。滚动更新在一个环境里逐步替换 Pod。蓝绿需要翻倍的资源。",
        },
      ],
    },
    "k8s-monitoring": {
      slug: "k8s-monitoring",
      sections: [
        {
          title: "K8s 监控的三大支柱——Metrics、Logs、Traces",
          content: "监控不只是看 CPU 用了多少。完整的可观测性包含三个方面：\n\nMetrics（指标）——数字化的时序数据。CPU 使用率、内存、请求延迟、错误率。用 Prometheus 采集。\n\nLogs（日志）——每个服务的输出文本。排查问题的主要入口。用 Loki 或 EFK（Elasticsearch + Fluentd + Kibana）采集聚合。\n\nTraces（链路追踪）——一个请求经过多个微服务的完整路径。用 Jaeger 或 Tempo。\n\n这三个还有一个统称叫云原生可观测性三件套。在小规模集群上可以先搞 Metrics 和 Logs，Traces 是微服务多了以后的事。",
          code: "# K8s 原生查看资源使用\nkubectl top nodes\nkubectl top pods\n\n# 需要先安装 metrics-server\nkubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml",
          language: "bash",
        },
        {
          title: "Prometheus + Grafana——指标监控标配",
          content: "Prometheus 是云原生监控的事实标准。它定期去各个目标抓取指标（HTTP Pull 模式），时序数据存在本地 TSDB 里。Grafana 负责把数据变成漂亮的仪表盘。\n\nPrometheus 的核心概念：\n- Metrics（指标）——带名字和标签的时间序列数据。比如 http_requests_total{method=\"GET\", status=\"200\"}。\n- PromQL——Prometheus 的查询语言，能对指标做计算、聚合、过滤。\n- AlertManager——Prometheus 的告警组件。Prometheus 评估告警规则，触发了就推给 AlertManager，AlertManager 发邮件/钉钉/企业微信。\n- ServiceMonitor——K8s 的 CRD，定义 Prometheus 该监控哪些 Service。有了它你不需要手动改 Prometheus 配置。\n\n安装方式：最简单的是用 kube-prometheus-stack（Helm chart），一把梭把 Prometheus、Grafana、AlertManager 全装好。",
          code: "# 安装 kube-prometheus-stack\nhelm repo add prometheus-community https://prometheus-community.github.io/helm-charts\nhelm install prometheus prometheus-community/kube-prometheus-stack\n\n# 查看监控目标\nkubectl port-forward svc/prometheus-operated 9090\n# 浏览器访问 http://localhost:9090/targets\n\n# 访问 Grafana\nkubectl port-forward svc/prometheus-grafana 3000:80\n# 浏览器访问 http://localhost:3000 默认 admin/prom-operator",
          language: "bash",
          tip: "kube-prometheus-stack 会自带一大堆 K8s 集群的 Dashboard——Node 资源、Pod 资源、API Server 指标，基本开箱即用。",
        },
        {
          title: "PromQL 入门",
          content: "PromQL 是 Prometheus 的查询语言，几个常用写法：\n\n直接查指标名——http_requests_total 返回所有带这个指标名的时序数据。\n\n标签过滤——http_requests_total{method=\"GET\"} 只看 GET 请求。用 =、!=、=~（正则匹配）、!~（正则不匹配）。\n\n聚合——sum(rate(http_requests_total[5m])) 把所有 instance 的请求速率加起来。\n\n函数——rate() 算每秒速率（Counter 类型必用）、increase() 算一段时间内的增量、avg_over_time() 算平均值。\n\n范围向量——[5m] 表示过去 5 分钟的数据，一般配合 rate 或 increase 用。\n\nCPU 使用率示例：100 - (avg by (instance) (rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)。看着复杂但拆开就是：找出空闲 CPU 的比例，100 减掉就是使用率。",
          code: "# 常用的 PromQL\n# 请求速率（每秒）\nrate(http_requests_total[5m])\n\n# 错误率\nrate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m])\n\n# 99 分位延迟\nhistogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))\n\n# 容器内存使用\ncontainer_memory_usage_bytes{container!=\"\"}\n\n# CPU 节流率\nrate(container_cpu_cfs_throttled_seconds_total[5m])",
          language: "promql",
          tip: "PromQL 的 rate() 和 irate() 区别：rate 算平均速率，irate 算瞬时速率（最近两个采样点之间）。一般用 rate 够了。",
        },
        {
          title: "日志收集——EFK / Loki",
          content: "K8s 里每个容器的 stdout/stderr 日志存在 Node 的 /var/log/containers/ 下。日志收集系统需要把这些分散在各 Node 上的日志聚合到集中存储。\n\nEFK 方案（Elasticsearch + Fluentd + Kibana）：Fluentd 以 DaemonSet 方式在每个 Node 上跑，采集所有容器的日志，发送到 Elasticsearch 存储，Kibana 做查询和可视化。功能强大但资源消耗大。\n\nLoki 方案（Loki + Promtail + Grafana）：Promtail 负责采集，Loki 负责存储和索引，Grafana 统一展示（指标和日志在一个界面）。轻量、跟 Prometheus 集成好、存储成本低。\n\n选型建议：资源充裕、需要全文搜索选 EFK。追求轻量、已有 Grafana 生态选 Loki。",
          code: "# 查看容器日志\nkubectl logs pod-name\nkubectl logs -f pod-name           # 实时跟踪\nkubectl logs -l app=myapp --all-containers  # 按 label 查所有容器\nkubectl logs --tail=100 pod-name    # 最后 100 行\nkubectl logs --since=10m pod-name   # 最近 10 分钟\n\n# 查看已崩溃容器之前的日志\nkubectl logs pod-name --previous",
          language: "bash",
          tip: "Fluentd 用 DaemonSet 部署——每个 Node 上一个副本，采集该 Node 上所有容器的日志。这样整个集群的日志都被集中了。",
        },
        {
          title: "Probe 与告警",
          content: "监控不只是采集数据，还得自动发现问题并告警。K8s 生态的告警体系：\n\nPrometheus AlertManager——定义告警规则，满足条件时发通知。支持分组、抑制、静默（维护期间不上发）。\n\nLiveness/Readiness Probe——K8s 自带的健康检查，Pod 挂了自动重启，不导流量到不健康的 Pod。\n\nEvents——kubectl get events 能发现问题（如 OOMKilled、FailedMount、BackOff）。生产环境建议把 Events 收集进日志系统统一告警。\n\n生产环境告警规则的建议配置：\n- Pod 频繁重启（CrashLoopBackOff 超过 N 分钟）\n- 节点资源使用率超过 80%\n- Deployment 副本数跟期望不一致\n- PVC 使用率超过 80%\n- 证书即将过期（TLS Secret 快要到期）",
          code: "# 查看集群事件\nkubectl get events --sort-by='.lastTimestamp'\nkubectl get events -w        # 实时监听\n\n# 查看节点状况\nkubectl describe node node-name | grep -A5 Conditions\n\n# 告警用 Event exporter 把 K8s Events 导出到 Prometheus\n# 或者部署 kube-state-metrics 收集 K8s 对象的状态指标",
          language: "bash",
          tip: "kube-state-metrics 能生成 Deployment 期望/实际副本数、Pod 状态这类指标。配合 Prometheus 告警规则，自动发现资源状态异常的组件。",
        },
      ],
      quiz: [
        {
          question: "可观测性三件套是？",
          options: ["CPU、内存、磁盘", "Metrics、Logs、Traces", "Pod、Service、Deployment", "Prometheus、Kibana、Jaeger"],
          answer: 1,
          explanation: "Metrics 监控指标，Logs 应用日志，Traces 分布式链路追踪。三者结合才能全面了解系统状态。",
        },
        {
          question: "Prometheus 采集数据的方式是？",
          options: ["被动的 push 方式", "主动的 pull 方式去抓取", "通过 agent 推送", "通过 WebSocket"],
          answer: 1,
          explanation: "Prometheus 使用 pull 模式，定期向目标服务的 /metrics 端点发起 HTTP 请求拉取指标数据。",
        },
        {
          question: "rate(http_requests_total[5m]) 计算的是什么？",
          options: ["过去 5 分钟的总请求数", "过去 5 分钟的每秒平均请求速率", "当前请求数", "错误请求数"],
          answer: 1,
          explanation: "rate 函数对 Counter 类型指标求每秒平均增长速率。[5m] 表示过去 5 分钟的时间窗口。",
        },
        {
          question: "EFK 方案的三个组件是什么？",
          options: ["Elasticsearch + Filebeat + K8s", "Elasticsearch + Fluentd + Kibana", "Elasticsearch + Flink + K8s", "Etcd + Fluentd + Kong"],
          answer: 1,
          explanation: "Fluentd 采集日志，Elasticsearch 存储和索引，Kibana 查询和可视化。",
        },
        {
          question: "Liveness Probe 失败跟 Readiness Probe 失败结果有什么区别？",
          options: ["一样", "Liveness 失败重启容器，Readiness 失败只暂停流量", "Liveness 失败不重启", "Readiness 失败重启容器"],
          answer: 1,
          explanation: "Liveness 失败 K8s 判定容器有不可恢复的问题，杀掉重启。Readiness 失败只是暂时不导流量，等它恢复。",
        },
      ],
    },
    "k8s-pods": {
      slug: "k8s-pods",
      sections: [
        {
          title: "Pod 是什么",
          content: "Pod 是 K8s 的最小调度单位，一个 Pod 里可以有多个容器，但大多数情况是 1 个 Pod 1 个容器。Pod 里的所有容器共享同一个网络命名空间（同一个 IP）和存储卷，可以通过 localhost 互相通信。\n\nPod 是临时的——它会被创建、销毁、重建。每次重建 IP 都不一样。Pod 不应该被直接管理（除非临时调试），应该通过 Deployment、StatefulSet 等控制器来管理。\n\nPod 的生命周期：Pending（等待调度）→ Running（至少一个容器在跑）→ Succeeded/Failed（所有容器终止）。Pod 一旦终止了就不会复活，控制器会创建新的 Pod。",
          code: "# 快速创建一个临时 Pod 做调试\nkubectl run debug-pod --image=nginx --rm -it -- sh\n\n# 查看 Pod 详情\ndescribe pod my-pod\n\n# 查看 Pod 的 YAML（从 K8s 拿到的实际运行配置）\nkubectl get pod my-pod -o yaml\n\n# 删除 Pod（如果是 Deployment 管理的，会立刻重建）\nkubectl delete pod my-pod",
          language: "bash",
        },
        {
          title: "多容器 Pod 与 Sidecar 模式",
          content: "一个 Pod 里多个容器的经典模式叫 Sidecar——主容器干正事，Sidecar 容器干辅助工作：日志收集、代理、配置热更新。\n\n比如你的应用容器把日志写到文件，Sidecar 容器负责把日志发送到日志系统。因为共享存储，Sidecar 能读到主容器的文件。\n\n多容器 Pod 的注意事项：容器启动顺序没有保证（除非用 Init 容器）。如果一个 Pod 里的某个容器一直 CrashLoop，整个 Pod 的状态就是 CrashLoopBackOff。\n\nInit 容器——Pod 里的特殊容器，在普通容器之前启动，完成后就退出。适合做初始化工作：等数据库就绪、下载配置、修改文件权限。",
          code: "# Pod 定义（1 主容器 + 1 Sidecar）\napiVersion: v1\nkind: Pod\nmetadata:\n  name: app-with-sidecar\nspec:\n  containers:\n  - name: app\n    image: myapp:latest\n    volumeMounts:\n    - name: logs\n      mountPath: /var/log/app\n  - name: log-shipper\n    image: fluentd:latest\n    volumeMounts:\n    - name: logs\n      mountPath: /var/log/app\n      readOnly: true\n  volumes:\n  - name: logs\n    emptyDir: {}",
          language: "yaml",
          tip: "Sidecar 模式最常见的就是日志收集——应用只管写日志，Sidecar 负责发送。两个容器各司其职，解耦。",
        },
        {
          title: "探针——Liveness、Readiness、Startup",
          content: "K8s 用探针来检查容器的健康状况：\n\nLiveness Probe——容器还活着吗？如果探针失败，K8s 杀掉容器并重启。适合检测死锁、无限循环等导致进程还活着但已经不能服务的状态。\n\nReadiness Probe——容器准备好接收流量了吗？失败时 K8s 不把流量路由到这个 Pod。适合检测依赖还没就绪的情况（如数据库还没连上）。\n\nStartup Probe——容器启动完了吗？只用在启动慢的容器。启动期间 Startup Probe 如果失败，Liveness 不会执行（否则容器还没启动完就被杀了）。\n\n探针有三种实现方式：HTTP GET（最常用）、TCP Socket、Exec（容器内执行命令）。",
          code: "# 探针配置\nlivenessProbe:\n  httpGet:\n    path: /healthz\n    port: 8080\n  initialDelaySeconds: 15\n  periodSeconds: 20\n\nreadinessProbe:\n  httpGet:\n    path: /ready\n    port: 8080\n  initialDelaySeconds: 5\n  periodSeconds: 10\n\nstartupProbe:\n  httpGet:\n    path: /startup\n    port: 8080\n  failureThreshold: 30\n  periodSeconds: 10",
          language: "yaml",
          tip: "Readiness 和 Liveness 要不同。Readiness 探针失败只是不导流量，Liveness 探针失败是直接杀容器重建。",
        },
        {
          title: "资源请求与限制",
          content: "Pod 的每个容器都需要声明资源请求和限制：\n\nrequests——调度时保证的最少资源。Scheduler 只会把 Pod 分配到有足够空闲资源的 Node 上。\nlimits——容器最多能用的资源。超出 CPU limit 会被 throttling（变慢），超出内存 limit 会被 OOMKilled（杀掉）。\n\nrequests 用于调度决策，limits 用于运行时限制。如果你设了 limits 没设 requests，K8s 会把 requests 默认设成跟 limits 一样。\n\n资源单位：CPU 用核数（0.5 = 半核，或者写 500m = 500 millicpu）。内存用字节（Mi = 兆字节，Gi = 吉字节）。",
          code: "# 资源声明\ncontainers:\n- name: app\n  image: myapp:latest\n  resources:\n    requests:\n      cpu: 100m\n      memory: 128Mi\n    limits:\n      cpu: 500m\n      memory: 256Mi\n\n# 不设 limits 的后果：容器可以用光整个 Node 的资源\n# 不设 requests 的后果：调度器不知道给多少资源，可能把 Node 塞爆",
          language: "yaml",
          warning: "生产环境每个容器必须设 requests 和 limits。不设的话一个内存泄漏就能把整个 Node 上的 Pod 全拖垮。",
        },
        {
          title: "Pod 排错",
          content: "Pod 出问题了怎么排查？按这个顺序来：\n\n1. kubectl get pods——先看状态是不是 Running。常见错误状态：Pending（调度不了，查 Node 资源或镜像拉取）、CrashLoopBackOff（起来了又挂，看日志）、ImagePullBackOff（拉不到镜像）、ErrImagePull（镜像名错了）。\n\n2. kubectl describe pod——看 Events 部分，K8s 把 Pod 经历的一切都记在这里。拉镜像、调度、启动探针失败都有对应事件。\n\n3. kubectl logs——看容器输出。如果 Pod 有多个容器，用 -c 指定。如果容器反复重启，加 --previous 看上次容器的日志。\n\n4. kubectl exec——进容器里手动排查。记住容器里可能没装 curl/nc 之类的调试工具，用 alpine 镜像跑临时 Pod。",
          code: "# 排查流程\nkubectl get pods                     # 状态\nkubectl describe pod my-pod          # 事件\nkubectl logs my-pod                  # 当前容器日志\nkubectl logs my-pod --previous       # 上次崩溃的日志\nkubectl exec -it my-pod -- sh        # 进入容器\n\n# 临时调试 Pod\nkubectl run debug --image=alpine --rm -it -- sh\n# 进去后可以 ping、nslookup、curl 测试",
          language: "bash",
          tip: "describe pod 的 Events 是最重要的排查入口。每次 Pod 状态变化 K8s 都在 Event 里记原因。",
        },
      ],
      quiz: [
        {
          question: "Pod 里多个容器怎么互相通信？",
          options: ["用 Service", "用 localhost 加各自端口", "用 Ingress", "不能通信"],
          answer: 1,
          explanation: "Pod 里所有容器共享同一个网络命名空间，通过 localhost:端口 就可以互相访问。",
        },
        {
          question: "Liveness 和 Readiness 的区别？",
          options: ["一样", "Liveness 失败杀容器重启，Readiness 失败只不导流量", "Readiness 更严格", "Liveness 只在启动时检查"],
          answer: 1,
          explanation: "Liveness 失败意味着容器不可恢复，需要重启。Readiness 失败只是暂时不能服务，等它恢复。",
        },
        {
          question: "Init 容器什么时候用？",
          options: ["替代主容器", "在主容器前做初始化工作", "作为 Sidecar", "处理流量"],
          answer: 1,
          explanation: "Init 容器在普通容器之前运行，完成后退出。适合等待依赖就绪、下载配置等初始化任务。",
        },
        {
          question: "资源 requests 和 limits 的区别？",
          options: ["一样", "requests 用于调度保证，limits 是运行时上限", "limits 用于调度", "requests 是运行时上限"],
          answer: 1,
          explanation: "requests 决定 Pod 被调度到哪个 Node（够不够放），limits 限制 Pod 最多能用多少资源。",
        },
        {
          question: "Pod 状态 CrashLoopBackOff 说明什么？",
          options: ["正常运行", "Pod 反复启动后崩溃", "镜像拉不下来", "资源不够"],
          answer: 1,
          explanation: "容器启动了又挂、K8s 重启后又挂，反复几次进入 CrashLoopBackOff。查日志找崩溃原因。",
        },
      ],
    },
    "k8s-services": {
      slug: "k8s-services",
      sections: [
        {
          title: "Service 是什么、为什么需要它",
          content: "Pod 是临死重生的——挂掉重建后 IP 全变了。你怎么保证客户端总能找到正确的 Pod？这就是 Service 存在的意义。\n\nService 给一组 Pod 提供稳定的访问入口——一个固定不变的虚拟 IP（ClusterIP）和一 DNS 名。你访问 Service 的名字，Service 把请求转发到后端健康的 Pod。\n\nService 通过 Label Selector 找到它要代理的 Pod。你在 Service 里写 selector: app: myapp，这个 Service 就代理所有 label 为 app=myapp 的 Pod。这就是为什么 Pod 要打 label 的原因之一。\n\nService 有三种常用类型：ClusterIP（集群内部访问，默认）、NodePort（在每个 Node 上开一个端口对外暴露）、LoadBalancer（云厂商的负载均衡器，生产环境标准方式）。",
          code: "# Service YAML\napiVersion: v1\nkind: Service\nmetadata:\n  name: my-service\nspec:\n  selector:\n    app: myapp\n  ports:\n  - port: 80        # Service 的端口\n    targetPort: 8080 # 后端 Pod 的端口\n  type: ClusterIP",
          language: "yaml",
        },
        {
          title: "ClusterIP、NodePort、LoadBalancer 的区别",
          content: "ClusterIP——默认类型，只在集群内部可达。其他 Pod 可以访问，集群外面的客户端不行。适合内部服务（数据库、后端 API）。\n\nNodePort——在每个 Node 上开一个高端口（默认范围 30000-32767），外部客户端访问任意 Node 的 IP 加这个端口就进去了。NodePort 会自动创建 ClusterIP。适合开发测试或简单的对外暴露，生产环境不够灵活。\n\nLoadBalancer——云厂商（AWS、GCP、Azure）提供的外部负载均衡器。自动创建 ClusterIP 和 NodePort，然后云厂商分配一个公网 IP 或域名。生产环境的标准方式，但每个 LoadBalancer 都要花钱。\n\n还有一种 ExternalName——不代理 Pod，而是把一个 Service 名映射到一个外部 DNS 域名上。",
          code: "# NodePort 示例\nspec:\n  type: NodePort\n  selector:\n    app: myapp\n  ports:\n  - port: 80\n    targetPort: 8080\n    nodePort: 30080  # 可选，不写就随机分配\n\n# LoadBalancer 示例\nspec:\n  type: LoadBalancer\n  selector:\n    app: myapp\n  ports:\n  - port: 80\n    targetPort: 8080",
          language: "yaml",
          tip: "云上的生产环境用 LoadBalancer。自建机房用 NodePort + 外部 Nginx/HAProxy 或者 MetalLB（裸金属的负载均衡方案）。",
        },
        {
          title: "Ingress——HTTP/HTTPS 路由",
          content: "Service 是四层（传输层）的负载均衡，Ingress 是七层（应用层）的 HTTP 路由。Ingress 能根据域名和 URL 路径把请求路由到不同的 Service。\n\n比如 example.com/api 去后端 API Service，example.com/web 去前端 Service。一个 Ingress 管理多个域名和路径。\n\nIngress 本身只是一个配置规则，真正干活的是 Ingress Controller——Nginx Ingress、Traefik、HAProxy 这些。你需要先部署 Ingress Controller，然后创建 Ingress 资源。\n\n现在 K8s 也在推 Gateway API——Ingress 的下一代，功能更丰富、角色更清晰，但 Ingress 仍是主流。",
          code: "# Ingress YAML\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: my-ingress\nspec:\n  rules:\n  - host: api.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: api-service\n            port:\n              number: 80\n  - host: web.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web-service\n            port:\n              number: 80",
          language: "yaml",
        },
        {
          title: "Service 发现与 CoreDNS",
          content: "K8s 集群里有个内置的 DNS 服务（CoreDNS），每个 Service 创建时自动注册一条 DNS 记录。Pod 之间通过 Service 名字就找到对方，完全不需要硬编码 IP。\n\nDNS 名规则：服务名.命名空间.svc.cluster.local。同 Namespace 下直接用服务名就行，跨 Namespace 用 服务名.命名空间。\n\n比如 dev 命名空间里有个叫 db 的 Service，同 Namespace 的 Pod 直接连 db。prod 里的 Pod 想连 dev 的 db 就写 db.dev。\n\n如果 Service 是 Headless Service（clusterIP: None），DNS 不会返回虚拟 IP 而是返回所有后端 Pod 的 IP。适合需要自己控制负载均衡的场景（如数据库集群主从发现）。",
          code: "# 同 Namespace 访问：直接用服务名\ncurl http://my-service/api\n\n# 跨 Namespace：用 服务名.命名空间\ncurl http://my-service.dev.svc.cluster.local\n\n# Headless Service\napiVersion: v1\nkind: Service\nmetadata:\n  name: db-headless\nspec:\n  clusterIP: None\n  selector:\n    app: mysql\n  ports:\n  - port: 3306",
          language: "yaml",
          tip: "CoreDNS 默认部署为一个 Deployment（多个副本），保证 DNS 高可用。如果 Pod 的 DNS 解析有问题，先查 CoreDNS 的 Pod 是否 Running。",
        },
        {
          title: "网络策略——NetworkPolicy",
          content: "默认情况下 K8s 集群里所有 Pod 之间可以互相访问（扁平网络），这在安全上是个隐患。NetworkPolicy 像防火墙规则——控制 Pod 的出入流量。\n\n你可以定义：允许哪些来源的流量进入 Pod（ingress），允许 Pod 的流量去哪些目的地（egress）。源和目的地可以用 Pod Selector、Namespace Selector、IP 块来定义。\n\n注意：NetworkPolicy 是命名空间级别的资源。要让它生效，你需要安装一个支持 NetworkPolicy 的网络插件（如 Calico、Cilium、Weave Net）。Flannel 默认不支持。",
          code: "# NetworkPolicy——只允许 app=frontend 的 Pod 访问\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: api-allow\nspec:\n  podSelector:\n    matchLabels:\n      app: api\n  policyTypes:\n  - Ingress\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: frontend\n    ports:\n    - protocol: TCP\n      port: 8080",
          language: "yaml",
          tip: "NetworkPolicy 默认是允许所有流量的。你创建第一条 deny-all 策略后，只放行你明确允许的流量。白名单模式比黑名单安全。",
        },
      ],
      quiz: [
        {
          question: "Service 的第一种类型 ClusterIP 能在集群外访问吗？",
          options: ["能", "不能，只供集群内部访问", "配了 NodePort 才能", "要用 HTTPS"],
          answer: 1,
          explanation: "ClusterIP 只能在集群内部访问。要外部访问得用 NodePort 或 LoadBalancer。",
        },
        {
          question: "Ingress 和 Service 的区别？",
          options: ["一样", "Ingress 是 HTTP 七层路由，Service 是四层负载均衡", "Ingress 不转发流量", "Service 只能四层"],
          answer: 1,
          explanation: "Service 工作在传输层，根据 IP 和端口转发。Ingress 工作在应用层，能根据域名和 URL 路径做 HTTP 路由。",
        },
        {
          question: "同 Namespace 下 Pod 怎么访问叫 db 的 Service？",
          options: ["用 IP", "直接用 db", "用 db.cluster.local", "用 localhost"],
          answer: 1,
          explanation: "同 Namespace 下直接用 Service 名字就行。跨 Namespace 才需要 db.namespace 这样的格式。",
        },
        {
          question: "Headless Service (clusterIP: None) 跟普通 Service 区别？",
          options: ["没有区别", "DNS 返回后端 Pod 的 IP 而不是虚拟 IP", "不能转发流量", "速度更快"],
          answer: 1,
          explanation: "Headless Service 的 DNS 直接解析为后端 Pod 的 IP 列表，适合自己掌控负载均衡的场景。",
        },
        {
          question: "创建 NetworkPolicy 后默认行为是什么？",
          options: ["拒绝所有流量", "允许所有流量（需要显式 deny）", "完全断网", "只允许 Ingress"],
          answer: 1,
          explanation: "K8s 的默认策略是全部允许。创建了 NetworkPolicy 才缩小放行范围。白名单模式——先 deny-all 再逐个开放。",
        },
      ],
    },
    "k8s-storage": {
      slug: "k8s-storage",
      sections: [
        {
          title: "存储的基本概念——PV、PVC、StorageClass",
          content: "K8s 的存储体系有三层抽象：\n\nPV（PersistentVolume）——一块实际的存储资源。就像一块硬盘，管理员预先创建好，等着 Pod 来用。\n\nPVC（PersistentVolumeClaim）——Pod 的存储请求。就像 Pod 说「我要 10GB 的存储空间」，K8s 找一个合适的 PV 给它绑定。\n\nStorageClass——存储的模板。管理员定义了不同级别的存储（SSD 快盘、HDD 慢盘、云盘），用户创建 PVC 时指定用哪个 StorageClass，K8s 自动创建 PV。\n\n这个三层设计的本质是职责分离：管理员管存储资源（PV/StorageClass），用户只要声明需求（PVC），不用关心后端存储是什么。",
          code: "# PV 示例（管理员创建或 StorageClass 自动创建）\napiVersion: v1\nkind: PersistentVolume\nmetadata:\n  name: my-pv\nspec:\n  capacity:\n    storage: 10Gi\n  accessModes:\n    - ReadWriteOnce\n  hostPath:\n    path: /data/my-pv\n\n# PVC 示例（用户创建）\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: my-pvc\nspec:\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 5Gi",
          language: "yaml",
        },
        {
          title: "AccessMode——读写模式",
          content: "PV 和 PVC 有三种访问模式：\n\nReadWriteOnce (RWO)——读写，但只能被单个 Node 上的 Pod 挂载。最常见的模式，适合数据库单实例。\n\nReadOnlyMany (ROX)——只读，可以被多个 Node 上的 Pod 挂载。适合共享配置文件、静态资源。\n\nReadWriteMany (RWX)——读写，可以被多个 Node 上的 Pod 挂载。NFS、CephFS、GlusterFS 这类共享文件系统支持。\n\n不是所有存储后端都支持所有模式。云厂商的块存储（AWS EBS、GCE PD）只支持 RWO，文件存储（EFS、NFS）才支持 RWX。\n\n选择 AccessMode 取决于你的应用的架构——单副本用 RWO 够了；多副本需要共享存储用 RWX。",
          code: "# Pod 使用 PVC\nspec:\n  containers:\n  - name: db\n    image: mysql:8\n    volumeMounts:\n    - name: mysql-data\n      mountPath: /var/lib/mysql\n  volumes:\n  - name: mysql-data\n    persistentVolumeClaim:\n      claimName: my-pvc",
          language: "yaml",
          tip: "PVC 可以动态创建 PV（通过 StorageClass）也可以绑定管理员预先创建的 PV。生产环境一般用 StorageClass 动态创建。",
        },
        {
          title: "StorageClass——动态创建 PV",
          content: "没有 StorageClass 时，管理员要手动创建 PV，用户创建 PVC 绑定手动 PV。PV 不够了管理员又得手动加。有了 StorageClass，用户创建 PVC 时 K8s 自动根据 StorageClass 的定义创建 PV。\n\nStorageClass 通过 provisioner（供应器）跟后端存储交互。云厂商的 K8s 服务自带 provisioner（直接创建云盘），自建集群可以用 NFS provisioner 或 Ceph provisioner。\n\n关键参数：provisioner（供应器名称）、parameters（传给供应器的参数，如磁盘类型 SSD）、reclaimPolicy（PVC 删除后 PV 怎么处理——Delete 删数据、Retain 保留数据）。\n\n可以在 StorageClass 里设置 allowVolumeExpansion: true，允许 PVC 扩容。在有状态应用（数据库）里这个功能很重要。",
          code: "# StorageClass 示例\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: fast-ssd\nprovisioner: kubernetes.io/aws-ebs\nparameters:\n  type: gp3\nreclaimPolicy: Delete\nallowVolumeExpansion: true\n\n# PVC 引用 StorageClass\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: db-data\nspec:\n  storageClassName: fast-ssd\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 100Gi",
          language: "yaml",
          tip: "allowVolumeExpansion 需要在 StorageClass 里显式开启。然后直接改 PVC 的 storage 大小就能自动扩容。",
        },
        {
          title: "StatefulSet——有状态应用的 Pod 管理器",
          content: "Deployment 适合无状态应用（Web 服务器、API），StatefulSet 适合有状态应用（数据库、消息队列、分布式存储）。StatefulSet 的每个 Pod 有固定的身份标识和存储。\n\nStatefulSet 跟 Deployment 的关键区别：\n1. Pod 名字固定——不是随机后缀，而是 myapp-0、myapp-1、myapp-2。Pod 重启后名字不变。\n2. 有序启停——启动时按 0→1→2 顺序，停止时按 2→1→0 逆序。升级也按序。\n3. 独立存储——每个 Pod 有自己独立的 PVC，Pod 重建后绑定回同一个 PVC，数据不丢。\n4. 稳定的网络标识——每个 Pod 有固定的 DNS 名（myapp-0.myapp-svc），适合发现集群里的各个成员。\n\n典型场景：MySQL 主从、Redis 集群、Elasticsearch、Kafka——这些需要持久化存储和固定网络标识的服务。",
          code: "# StatefulSet 示例\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: mysql\nspec:\n  serviceName: mysql-svc\n  replicas: 3\n  selector:\n    matchLabels:\n      app: mysql\n  template:\n    metadata:\n      labels:\n        app: mysql\n    spec:\n      containers:\n      - name: mysql\n        image: mysql:8\n        volumeMounts:\n        - name: data\n          mountPath: /var/lib/mysql\n  volumeClaimTemplates:\n  - metadata:\n      name: data\n    spec:\n      accessModes: [\"ReadWriteOnce\"]\n      storageClassName: fast-ssd\n      resources:\n        requests:\n          storage: 100Gi",
          language: "yaml",
          tip: "volumeClaimTemplates 是 StatefulSet 的关键——它为每个 Pod 自动创建一个独立的 PVC。StatefulSet 删了 PVC 不会自动删。",
        },
        {
          title: "PV 回收策略与数据保护",
          content: "PV 的 reclaimPolicy 决定 PVC 删除后 PV 怎么处理：\n\nDelete——PV 和数据一起删掉。默认策略，适合自动创建的 PV。\nRetain——PV 保留，数据还在。管理员需要手动清理（删除 PV 并清理存储后端的数据）。适合重要的数据。\nRecycle——废弃了，别用，它会执行 rm -rf 清空 PV 再给别人用，不安全。\n\n数据保护的最佳实践：\n1. 重要数据的 PVC 用 Retain 策略，不会被误删\n2. 配合 VolumeSnapshot 做快照备份\n3. 定期把数据备份到外部存储（S3、NAS）\n4. PVC 的 finalizer 可以防止误删 PVC",
          code: "# PV 设置 Retain 策略\nspec:\n  persistentVolumeReclaimPolicy: Retain\n\n# VolumeSnapshot（需要先安装 snapshot controller）\napiVersion: snapshot.storage.k8s.io/v1\nkind: VolumeSnapshot\nmetadata:\n  name: my-snapshot\nspec:\n  volumeSnapshotClassName: csi-snapclass\n  source:\n    persistentVolumeClaimName: my-pvc",
          language: "yaml",
          warning: "Delete 策略意味着删 PVC 就会删数据，没有确认对话框！重要数据务必用 Retain 或配合 VolumeSnapshot 做备份。",
        },
      ],
      quiz: [
        {
          question: "PV 和 PVC 的关系是什么？",
          options: ["PV 是请求，PVC 是供给", "PV 是实际存储，PVC 是存储请求", "两个是一回事", "PVC 更底层"],
          answer: 1,
          explanation: "PV 是实际的存储资源（管理员提供的），PVC 是 Pod 的存储需求（用户声明的）。K8s 把 PVC 绑定到合适的 PV。",
        },
        {
          question: "ReadWriteMany (RWX) 什么意思？",
          options: ["只能一个 Pod 读写", "多个 Pod 可以同时读写同一个卷", "只能读不能写", "只能写不能读"],
          answer: 1,
          explanation: "RWX 允许多个 Node 上的多个 Pod 同时挂载同一个存储卷读写。需要共享文件系统支持如 NFS、CephFS。",
        },
        {
          question: "StatefulSet 跟 Deployment 最大的区别？",
          options: ["StatefulSet 更简单", "StatefulSet 给每个 Pod 分配固定的身份和独立存储", "StatefulSet 只能一个副本", "Deployment 不支持 PVC"],
          answer: 1,
          explanation: "StatefulSet 的 Pod 有固定的名字、有序启停、独立持久化存储。适合有状态服务如数据库。",
        },
        {
          question: "StorageClass 的 reclaimPolicy: Delete 是什么意思？",
          options: ["PVC 不存在时才删 PV", "删 PVC 时自动删 PV 和数据", "永远不删数据", "只删 PV 不删数据"],
          answer: 1,
          explanation: "Delete 意味着 PVC 删除后 K8s 自动删 PV 和底层实际数据。重要数据用 Retain 策略。",
        },
        {
          question: "volumeClaimTemplates 是哪个资源类型的独特字段？",
          options: ["Deployment", "Pod", "StatefulSet", "PVC"],
          answer: 2,
          explanation: "volumeClaimTemplates 是 StatefulSet 特有的——为每个 Pod 自动创建独立的 PVC 并绑定。",
        },
      ],
    },
    "kotlin-android": {
      slug: "kotlin-android",
      sections: [
        {
          title: "Kotlin 基础语法",
          content: "Kotlin 是 JetBrains 开发的现代 JVM 语言，现在是 Android 开发的官方语言。var 声明可变变量，val 声明不可变（推荐用 val）。类型写在冒号后面，变量名前面。分号可写可不写。字符串模板用 $var 或 ${expr}。空安全是杀手特性，? 后缀表示可空类型。",
          code: "fun main() {\n    // 变量\n    val name: String = \"小明\"\n    var age = 18  // 类型推断\n    \n    // 字符串模板\n    println(\"你好, $name, 你${age + 1}岁了\")\n    \n    // 空安全\n    var nullable: String? = null\n    val length = nullable?.length ?: 0  // Elvis 操作符给默认值\n    // nullable!!.length  // 强制解包，如果是 null 就崩\n    \n    // when 表达式\n    val grade = when (age) {\n        in 0..6 -> \"幼儿\"\n        in 7..17 -> \"学生\"\n        else -> \"成人\"\n    }\n    \n    // 数据类 - 一行搞定\n    data class User(val name: String, val email: String)\n}",
          language: "kotlin",
          tip: "Elvis 操作符 ?: 是 Kotlin 最好用的特性之一，给可空值提供默认值的简洁写法。",
        },
        {
          title: "Activity 生命周期",
          content: "Activity 是 Android 的一个页面，有自己的生命周期。onCreate 创建时调用（只一次），onStart 可见但不在前台，onResume 在前台可交互，onPause 暂停（如弹窗覆盖），onStop 完全不可见，onDestroy 销毁。理解生命周期是写 Android 的基础，不然各种闪退。",
          code: "class MainActivity : AppCompatActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContentView(R.layout.activity_main)\n        println(\"onCreate - 创建\")\n    }\n    \n    override fun onStart() {\n        super.onStart()\n        println(\"onStart - 可见了\")\n    }\n    \n    override fun onResume() {\n        super.onResume()\n        println(\"onResume - 可以交互了\")\n    }\n    \n    override fun onPause() {\n        super.onPause()\n        println(\"onPause - 失去焦点\")\n        // 保存临时数据\n    }\n    \n    override fun onStop() {\n        super.onStop()\n        println(\"onStop - 不可见了\")\n    }\n    \n    override fun onDestroy() {\n        super.onDestroy()\n        println(\"onDestroy - 销毁\")\n    }\n}",
          language: "kotlin",
          tip: "旋转屏幕时 Activity 会重建（销毁再创建），要注意保存状态。",
        },
        {
          title: "RecyclerView 列表",
          content: "RecyclerView 是 Android 上显示长列表的标准组件，比旧的 ListView 高效很多因为它会回收复用的 item 视图。需要一个 Adapter 提供数据和创建 ViewHolder，一个 LayoutManager 决定排列方式（线性、网格、瀑布流）。配合 ViewBinding 写起来比 findViewById 舒服。",
          code: "// Adapter\nclass UserAdapter(\n    private val users: List<User>,\n    private val onItemClick: (User) -> Unit\n) : RecyclerView.Adapter<UserAdapter.ViewHolder>() {\n    \n    class ViewHolder(binding: ItemUserBinding) : RecyclerView.ViewHolder(binding.root) {\n        val nameText = binding.nameText\n        val emailText = binding.emailText\n    }\n    \n    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {\n        val binding = ItemUserBinding.inflate(LayoutInflater.from(parent.context), parent, false)\n        return ViewHolder(binding)\n    }\n    \n    override fun onBindViewHolder(holder: ViewHolder, position: Int) {\n        val user = users[position]\n        holder.nameText.text = user.name\n        holder.emailText.text = user.email\n        holder.itemView.setOnClickListener { onItemClick(user) }\n    }\n    \n    override fun getItemCount() = users.size\n}\n\n// 使用\nrecyclerView.adapter = UserAdapter(users) { user ->\n    Toast.makeText(this, \"点击了 ${user.name}\", Toast.LENGTH_SHORT).show()\n}\nrecyclerView.layoutManager = LinearLayoutManager(this)",
          language: "kotlin",
          tip: "AsyncListDiffer 可以在列表更新时自动计算差异并优雅地动画刷新，比 notifyDataSetChanged 体验好。",
        },
        {
          title: "ViewModel 和 LiveData",
          content: "ViewModel 保存 UI 数据，在配置改变（如旋转）时不销毁。LiveData 是可观察的数据容器，数据变化时自动通知 UI 更新。配合 lifecycle 作用域，LiveData 只通知活跃的 UI，不用担心内存泄漏。这是 Android 推荐的架构组件。",
          code: "class MainViewModel : ViewModel() {\n    private val _users = MutableLiveData<List<User>>()\n    val users: LiveData<List<User>> = _users\n    \n    fun loadUsers() {\n        viewModelScope.launch {\n            // 模拟网络请求\n            val result = fetchUsersFromApi()\n            _users.value = result\n        }\n    }\n    \n    private suspend fun fetchUsersFromApi(): List<User> {\n        delay(1000)\n        return listOf(User(\"小明\", \"xm@qq.com\"))\n    }\n}\n\n// Activity 中使用\nclass MainActivity : AppCompatActivity() {\n    private val viewModel: MainViewModel by viewModels()\n    \n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContentView(R.layout.activity_main)\n        \n        viewModel.users.observe(this) { users ->\n            // 数据变化时更新 UI\n            adapter.submitList(users)\n        }\n        \n        viewModel.loadUsers()\n    }\n}",
          language: "kotlin",
          tip: "viewModelScope 是 ViewModel 自带的协程作用域，ViewModel 销毁时自动取消所有协程。",
        },
        {
          title: "Jetpack Compose 入门（现代 UI）",
          content: "Compose 是 Android 的现代声明式 UI 工具包，用 Kotlin 代码写 UI。@Composable 函数描述界面，状态变化时自动重组。不再需要 XML 布局文件，UI 和逻辑在同一个 Kotlin 文件里。LazyColumn 替代 RecyclerView，简单到只有几行代码。",
          code: "@Composable\nfun UserListScreen() {\n    var users by remember { mutableStateOf(listOf<User>()) }\n    \n    LaunchedEffect(Unit) {\n        users = fetchUsers()\n    }\n    \n    Scaffold(\n        topBar = { TopAppBar(title = { Text(\"用户列表\") }) }\n    ) { padding ->\n        LazyColumn(contentPadding = padding) {\n            items(users) { user ->\n                UserCard(user)\n            }\n        }\n    }\n}\n\n@Composable\nfun UserCard(user: User) {\n    Card(\n        modifier = Modifier\n            .fillMaxWidth()\n            .padding(8.dp)\n            .clickable { println(\"点击: ${user.name}\") }\n    ) {\n        Column(modifier = Modifier.padding(16.dp)) {\n            Text(user.name, style = MaterialTheme.typography.headlineSmall)\n            Text(user.email, style = MaterialTheme.typography.bodyMedium)\n        }\n    }\n}",
          language: "kotlin",
          tip: "Compose 的 remember 和 LaunchedEffect 配合使用，能实现以前需要多个生命周期方法才能做的事。",
        },
      ],
      quiz: [
        {
          question: "Kotlin 中 val 和 var 的区别？",
          options: ["val 可变 var 不可变", "val 不可变 var 可变", "没有区别", "val 只能用于数字"],
          answer: 1,
          explanation: "val 声明只读变量（类似 final），var 声明可变变量。",
        },
        {
          question: "Activity 收到 onStop() 表示什么？",
          options: ["创建完成", "完全不可见", "可以交互", "销毁"],
          answer: 1,
          explanation: "onStop 表示 Activity 不可见了（被其他 Activity 完全覆盖或按 Home 键）。",
        },
        {
          question: "ViewModel 为什么在屏幕旋转时不销毁？",
          options: ["存在 SharedPreferences", "ViewModel 的生命周期与 Activity 解耦，由 ViewModelStore 持有", "自动保存到 Bundle", "存到磁盘"],
          answer: 1,
          explanation: "ViewModel 存储在 ViewModelStore 中，在 Activity 重建时复用。",
        },
        {
          question: "Jetpack Compose 中 @Composable 注解表示？",
          options: ["可序列化", "UI 组件函数", "数据库实体", "普通函数"],
          answer: 1,
          explanation: "@Composable 标记函数用于描述 UI，Compose 编译器会在状态变化时重组调用。",
        },
      ],
    },
    "kotlin-coroutines": {
      slug: "kotlin-coroutines",
      sections: [
        {
          title: "协程基础",
          content: "协程是 Kotlin 的轻量级并发方案。相比于线程，一个线程上可以跑成千上万个协程，因为协程挂起时不阻塞线程，线程可以去干别的事。suspend 标记可挂起函数，launch 启动不关心返回值的协程，async 启动并返回 Deferred（类似 Future）。协程上下文决定了协程跑在哪个线程上。",
          code: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    // launch 启动协程\n    val job = launch {\n        delay(1000)  // 挂起，不阻塞线程\n        println(\"协程执行完毕\")\n    }\n    \n    // async 带返回值\n    val deferred = async {\n        delay(500)\n        \"结果\"\n    }\n    \n    println(\"等待结果...\")\n    val result = deferred.await()\n    println(\"获得: $result\")\n    \n    job.join()  // 等待 launch 协程结束\n}",
          language: "kotlin",
          tip: "delay 是协程的 sleep，挂起不阻塞线程；Thread.sleep 是真正阻塞线程。",
        },
        {
          title: "协程上下文和调度器",
          content: "协程调度器决定协程在哪个线程上跑。Dispatchers.Main 是 Android 主线程（更新 UI），Dispatchers.IO 处理网络和数据库，Dispatchers.Default 做 CPU 密集型计算，Dispatchers.Unconfined 不限定线程。withContext 可以临时切换上下文，不会创建新协程。",
          code: "fun main() = runBlocking {\n    // 在 IO 线程做网络请求\n    val data = withContext(Dispatchers.IO) {\n        fetchFromNetwork()\n    }\n    \n    // 回到主线程更新 UI\n    withContext(Dispatchers.Main) {\n        showData(data)\n    }\n    \n    // 组合使用\n    launch(Dispatchers.Default) {\n        // CPU 密集计算\n        val result = heavyComputation()\n        withContext(Dispatchers.Main) {\n            updateUI(result)\n        }\n    }\n}\n\nsuspend fun fetchFromNetwork(): String {\n    delay(500)\n    return \"网络数据\"\n}\n\nfun showData(data: String) = println(data)\nfun heavyComputation(): String = \"计算完成\"\nfun updateUI(result: String) = println(\"UI: $result\")",
          language: "kotlin",
          tip: "withContext 挂起当前协程，在指定调度器执行代码块，完成后回来继续，非常优雅。",
        },
        {
          title: "协程作用域和生命周期",
          content: "协程作用域控制协程的生命周期。GlobalScope 是全局作用域（不推荐，生命周期不可控）。lifecycleScope 绑定 Android 的 Activity/Fragment 生命周期。viewModelScope 绑定 ViewModel 的生命周期。结构化并发：父协程会等所有子协程结束，子协程出错父协程也会取消。",
          code: "// Activity 中使用 lifecycleScope\nclass MyActivity : AppCompatActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        \n        lifecycleScope.launch {\n            // Activity 销毁时自动取消\n            val data = loadData()\n            updateUI(data)\n        }\n    }\n}\n\n// ViewModel 中使用 viewModelScope\nclass MyViewModel : ViewModel() {\n    fun loadData() {\n        viewModelScope.launch {\n            // ViewModel 清除时自动取消\n            val users = fetchUsers()\n            _users.value = users\n        }\n    }\n}\n\n// 自定义 CoroutineScope\nclass DataLoader {\n    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)\n    \n    fun load() {\n        scope.launch {\n            // 手动管理生命周期\n        }\n    }\n    \n    fun destroy() {\n        scope.cancel()  // 取消所有协程\n    }\n}",
          language: "kotlin",
          warning: "不要用 GlobalScope，它的生命周期和 Application 一样长，容易造成资源泄漏。",
        },
        {
          title: "异常处理和取消",
          content: "协程的异常分两种：launch 的异常会直接抛给父协程导致整个作用域取消，async 的异常封装在 await 时才抛出。SupervisorJob 防止一个子协程失败影响其他子协程。用 try-catch 包裹协程内部代码处理异常，CoroutineExceptionHandler 做全局异常兜底。",
          code: "fun main() = runBlocking {\n    val handler = CoroutineExceptionHandler { _, exception ->\n        println(\"捕获异常: ${exception.message}\")\n    }\n    \n    // SupervisorJob 隔离错误\n    val scope = CoroutineScope(SupervisorJob() + handler)\n    \n    scope.launch {\n        delay(100)\n        throw RuntimeException(\"子协程1崩了\")\n    }\n    \n    scope.launch {\n        delay(200)\n        println(\"子协程2不受影响，正常执行\")\n    }\n    \n    delay(500)\n    \n    // 取消协程\n    val job = launch {\n        try {\n            repeat(1000) { i ->\n                println(\"工作 $i\")\n                delay(100)\n            }\n        } finally {\n            println(\"清理资源\")\n        }\n    }\n    \n    delay(300)\n    job.cancel()  // 取消\n    println(\"已取消\")\n}",
          language: "kotlin",
          tip: "协程取消是协作式的：只有挂起点才会检查取消，纯计算不挂起的循环要手动检查 isActive。",
        },
        {
          title: "Flow 冷数据流",
          content: "Flow 是协程版的响应式流，类似 RxJava 但更轻量。flow {} 构建器创建数据流，emit 发射数据。collect 收集数据时才执行（冷流）。操作符 map/filter/take 等中间处理，collect 才是终端操作。flowOn 改变执行上游的协程上下文。",
          code: "import kotlinx.coroutines.flow.*\n\nfun getNumbers(): Flow<Int> = flow {\n    for (i in 1..5) {\n        delay(100)  // 模拟网络延迟\n        emit(i)\n    }\n}\n\nfun main() = runBlocking {\n    getNumbers()\n        .filter { it % 2 == 0 }\n        .map { it * 10 }\n        .collect { value ->\n            println(\"收到: $value\")\n        }\n    // 输出: 收到: 20, 收到: 40\n    \n    // StateFlow - 热流（有状态）\n    val stateFlow = MutableStateFlow(0)\n    stateFlow.value = 42\n    \n    // SharedFlow - 热流（事件）\n    val events = MutableSharedFlow<String>()\n    launch {\n        events.collect { event -> println(\"事件: $event\") }\n    }\n    events.emit(\"登录成功\")\n}",
          language: "kotlin",
          tip: "Flow 是冷流(被收集时才执行)，StateFlow/SharedFlow 是热流(始终存在)。UI 状态用 StateFlow，一次性事件用 SharedFlow。",
        },
      ],
      quiz: [
        {
          question: "协程的挂起函数 suspend 和普通函数的区别？",
          options: ["没有区别", "挂起函数可以暂停执行不阻塞线程", "挂起函数只能异步执行", "挂起函数不能有返回值"],
          answer: 1,
          explanation: "suspend 函数可以在挂起点暂停，释放当前线程去执行其他任务。",
        },
        {
          question: "Dispatchers.IO 适用于什么场景？",
          options: ["CPU 密集计算", "UI 更新", "网络请求和数据库操作", "后台任务"],
          answer: 2,
          explanation: "Dispatchers.IO 专为 IO 密集型任务设计（网络、文件、数据库）。",
        },
        {
          question: "SupervisorJob 的作用？",
          options: ["监督管理", "一个子协程的失败不会导致其他子协程和父协程取消", "管理所有协程", "自动重启协程"],
          answer: 1,
          explanation: "SupervisorJob 隔离子协程的错误，一个失败不影响其他兄弟协程。",
        },
        {
          question: "Flow 是冷流还是热流？",
          options: ["冷流（collect 时才执行）", "热流（始终活跃）", "取决于 use case", "两者都是"],
          answer: 0,
          explanation: "Flow 默认是冷流，只有调用 collect 时才执行生产逻辑。StateFlow 和 SharedFlow 是热流。",
        },
      ],
    },
    "kotlin-spring": {
      slug: "kotlin-spring",
      sections: [
        {
          title: "Spring Boot + Kotlin 项目搭建",
          content: "Kotlin 和 Spring Boot 是绝配。用 Spring Initializr 选择 Kotlin 语言和 Gradle Kotlin DSL。Kotlin 的数据类天然适合 JPA 实体，data class User(...)。Controller 只需要注解加函数就能处理 HTTP 请求。空安全让 NullPointerException 在编译时就被揪出来。",
          code: "// build.gradle.kts\nplugins {\n    id(\"org.springframework.boot\") version \"3.2.0\"\n    id(\"io.spring.dependency-management\") version \"1.1.4\"\n    kotlin(\"jvm\") version \"1.9.21\"\n    kotlin(\"plugin.spring\") version \"1.9.21\"\n    kotlin(\"plugin.jpa\") version \"1.9.21\"\n}\n\n// Application.kt\n@SpringBootApplication\nclass DemoApplication\n\nfun main(args: Array<String>) {\n    runApplication<DemoApplication>(*args)\n}",
          language: "kotlin",
          tip: "Kotlin + Spring 写起来比 Java 少 30%+ 的代码，主要是数据类和 null 安全省掉了大量模板。",
        },
        {
          title: "Controller 和 RESTful API",
          content: "@RestController 标记控制器，@GetMapping/@PostMapping 映射路由。Kotlin 的函数参数可以直接对应请求参数，@RequestParam 获取查询参数，@PathVariable 获取路径变量，@RequestBody 反序列化 JSON 为 Kotlin 数据类。响应自动序列化为 JSON。",
          code: "@RestController\n@RequestMapping(\"/api/users\")\nclass UserController(private val service: UserService) {\n    \n    @GetMapping\n    fun list(@RequestParam(defaultValue = \"1\") page: Int): List<UserDto> {\n        return service.findAll(page)\n    }\n    \n    @GetMapping(\"/{id}\")\n    fun getById(@PathVariable id: Long): UserDto? {\n        return service.findById(id)\n    }\n    \n    @PostMapping\n    @ResponseStatus(HttpStatus.CREATED)\n    fun create(@Valid @RequestBody request: CreateUserRequest): UserDto {\n        return service.create(request)\n    }\n    \n    @DeleteMapping(\"/{id}\")\n    @ResponseStatus(HttpStatus.NO_CONTENT)\n    fun delete(@PathVariable id: Long) {\n        service.delete(id)\n    }\n}\n\ndata class CreateUserRequest(\n    @field:NotBlank val name: String,\n    @field:Email val email: String\n)\n\ndata class UserDto(val id: Long, val name: String, val email: String)",
          language: "kotlin",
          tip: "Kotlin 数据类 + @Valid + Bean Validation 一行注解搞定参数校验。",
        },
        {
          title: "JPA Repository 和事务",
          content: "Spring Data JPA 让你几乎不用写 SQL。定义 interface 继承 JpaRepository<Entity, ID>，Spring 自动生成增删改查方法。方法名按命名规则写自动生成查询：findByName 查名字，findByAgeGreaterThan 查年龄大于。@Transactional 声明事务，@Modifying 标记更新删除操作。",
          code: "@Entity\n@Table(name = \"users\")\nclass User(\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    val id: Long = 0,\n    \n    @Column(nullable = false, length = 50)\n    var name: String,\n    \n    @Column(unique = true)\n    var email: String\n)\n\ninterface UserRepository : JpaRepository<User, Long> {\n    fun findByName(name: String): User?\n    fun findByEmailContaining(keyword: String): List<User>\n    fun findByAgeGreaterThan(age: Int): List<User>\n    \n    @Query(\"SELECT u FROM User u WHERE u.createdAt > :since\")\n    fun findRecent(@Param(\"since\") since: LocalDateTime): List<User>\n    \n    @Modifying\n    @Query(\"UPDATE User u SET u.name = :name WHERE u.id = :id\")\n    fun updateName(@Param(\"id\") id: Long, @Param(\"name\") name: String): Int\n}\n\n@Service\n@Transactional\nclass UserService(private val userRepository: UserRepository) {\n    fun findAll(): List<User> = userRepository.findAll()\n    fun create(name: String, email: String) = userRepository.save(User(name = name, email = email))\n}",
          language: "kotlin",
          tip: "Kotlin 的具名参数让 JPA 实体创建很自然：User(name = \"小明\", email = \"xm@qq.com\")。",
        },
        {
          title: "异常处理和全局异常拦截",
          content: "用 @ControllerAdvice 做全局异常处理比在每个 controller 里写 try-catch 优雅得多。定义异常类和对应的处理函数，统一返回 ErrorResponse。@ExceptionHandler 按异常类型分发。service 层永远不需要知道 HTTP 相关的东西。",
          code: "// 自定义异常\nclass UserNotFoundException(id: Long) : RuntimeException(\"用户未找到: $id\")\nclass EmailAlreadyUsedException(email: String) : RuntimeException(\"邮箱已注册: $email\")\n\ndata class ErrorResponse(\n    val code: Int,\n    val message: String,\n    val timestamp: LocalDateTime = LocalDateTime.now()\n)\n\n@RestControllerAdvice\nclass GlobalExceptionHandler {\n    \n    @ExceptionHandler(UserNotFoundException::class)\n    @ResponseStatus(HttpStatus.NOT_FOUND)\n    fun handleNotFound(ex: UserNotFoundException): ErrorResponse {\n        return ErrorResponse(404, ex.message ?: \"未找到\")\n    }\n    \n    @ExceptionHandler(EmailAlreadyUsedException::class)\n    @ResponseStatus(HttpStatus.CONFLICT)\n    fun handleConflict(ex: EmailAlreadyUsedException): ErrorResponse {\n        return ErrorResponse(409, ex.message ?: \"冲突\")\n    }\n    \n    @ExceptionHandler(MethodArgumentNotValidException::class)\n    @ResponseStatus(HttpStatus.BAD_REQUEST)\n    fun handleValidation(ex: MethodArgumentNotValidException): ErrorResponse {\n        val error = ex.bindingResult.fieldErrors.first().defaultMessage ?: \"验证失败\"\n        return ErrorResponse(400, error)\n    }\n}",
          language: "kotlin",
          tip: "@RestControllerAdvice 是 Kotlin + Spring 项目的标配，让所有异常处理集中管理。",
        },
        {
          title: "Kotlin 协程支持",
          content: "Spring WebFlux 配合 Kotlin 协程让处理高并发请求变得简单。Controller 里用 suspend 函数替代返回 Mono/Flux。Repository 支持 CoroutineCrudRepository 返回挂起函数。一句话：加 kotlinx-coroutines-reactor 依赖，controller 的函数加 suspend 关键字就行。",
          code: "import kotlinx.coroutines.*\n\n// 支持协程的 Repository\ninterface UserCoroutineRepository : CoroutineCrudRepository<User, Long> {\n    suspend fun findByName(name: String): User?\n}\n\n@RestController\n@RequestMapping(\"/api/users\")\nclass UserReactiveController(\n    private val repository: UserCoroutineRepository\n) {\n    @GetMapping\n    suspend fun list(): List<User> = repository.findAll().toList()\n    \n    @GetMapping(\"/{id}\")\n    suspend fun getById(@PathVariable id: Long): User {\n        return repository.findById(id) ?: throw UserNotFoundException(id)\n    }\n    \n    @PostMapping\n    suspend fun create(@RequestBody user: User): User = repository.save(user)\n    \n    // 并发请求多个数据源\n    @GetMapping(\"/dashboard\")\n    suspend fun dashboard(): DashboardData = coroutineScope {\n        val users = async { repository.findAll().toList() }\n        val stats = async { fetchStatistics() }\n        DashboardData(users.await(), stats.await())\n    }\n}",
          language: "kotlin",
          tip: "Kotlin 协程让 WebFlux 代码从 Reactive Stream 的复杂操作符地狱变回直觉的同步写法。",
        },
      ],
      quiz: [
        {
          question: "Spring Boot 中 @RestController 的作用？",
          options: ["标记服务类", "标记控制器，返回值自动序列化为 JSON", "标记实体类", "标记配置类"],
          answer: 1,
          explanation: "@RestController = @Controller + @ResponseBody，每个方法返回值自动写入响应体。",
        },
        {
          question: "Spring Data JPA 中方法命名查询的规则？",
          options: ["随便写", "findBy + 属性名，Spring 自动解析生成 SQL", "必须写 @Query", "只能查主键"],
          answer: 1,
          explanation: "Spring Data JPA 根据方法名（如 findByName）自动生成查询，省去手写 SQL。",
        },
        {
          question: "@ControllerAdvice + @ExceptionHandler 的作用？",
          options: ["性能优化", "全局统一异常处理", "日志记录", "事务管理"],
          answer: 1,
          explanation: "@ControllerAdvice 实现全局异常拦截，所有 controller 的异常统一在这里处理。",
        },
        {
          question: "Kotlin 的 suspend 函数在 Spring WebFlux 中的优势？",
          options: ["减少网络延迟", "异步代码写成同步风格", "提高 QPS", "自动重试"],
          answer: 1,
          explanation: "suspend 函数让异步代码以同步方式书写，不用处理 Mono/Flux 操作符链。",
        },
      ],
    },
    "mongodb-aggregation": {
      slug: "mongodb-aggregation",
      sections: [
        {
          title: "聚合管道是什么",
          content: "聚合管道（Aggregation Pipeline）是 MongoDB 最强大的数据分析工具。它把数据处理分成多个阶段，每个阶段对上一步的输出做一次加工，像工厂流水线一样——原材料进去，经过一道道工序，最终出来成品。\n\n每个阶段是一个操作符：美元 match 筛选、美元 group 分组、美元 sort 排序、美元 project 投影/计算、美元 limit 限制、美元 skip 跳过。管道里可以有几十个阶段，但建议控制在必要范围内。\n\n聚合管道跟 find 的区别：find 只能做简单的筛选排序，聚合管道能做复杂的数据转换、计算、分组、甚至多集合关联。相当于 SQL 里的 GROUP BY、子查询、窗口函数的综合体。",
          code: "// 聚合管道基本结构\ndb.orders.aggregate([\n  { $match: { status: \"completed\" } },       // 过滤\n  { $group: { _id: \"$user_id\", total: { $sum: \"$amount\" } } }, // 分组\n  { $sort: { total: -1 } },                   // 排序\n  { $limit: 10 }                              // 取前 10\n]);",
          language: "javascript",
        },
        {
          title: "核心阶段详解——match / group / project",
          content: "美元 match——相当于 find 的查询条件，放在管道最前面可以减少后面阶段的数据量，提高效率。能用索引的建议前面先 match。\n\n美元 group——分组聚合，相当于 SQL 的 GROUP BY。下划线 id 是分组字段（美元符号开头表示引用字段），其他字段是各种累加器：美元 sum 求和、美元 avg 平均、美元 min/美元 max 极值、美元 push 把值推入数组、美元 addToSet 推入数组但去重、美元 first/美元 last 取第一/最后一个。\n\n美元 project——投影和字段计算，可以保留/排除字段，也能创建计算字段。1 表示保留，0 表示排除。还可以用美元 add、美元 subtract 等表达式计算新字段。",
          code: "// $match\ndb.orders.aggregate([\n  { $match: { created_at: { $gte: ISODate(\"2024-01-01\") } } }\n]);\n\n// $group\ndb.orders.aggregate([\n  { $group: {\n      _id: \"$user_id\",\n      total_spent: { $sum: \"$amount\" },\n      avg_order: { $avg: \"$amount\" },\n      order_count: { $sum: 1 }\n  }}\n]);\n\n// $project\ndb.users.aggregate([\n  { $project: {\n      name: 1,\n      birthYear: { $subtract: [2024, \"$age\"] },\n      _id: 0\n  }}\n]);",
          language: "javascript",
          tip: "美元 match 放在管道最前面能利用索引，减少进入后续阶段的数据量。这是性能优化的基本技巧。",
        },
        {
          title: "数组操作——unwind / lookup",
          content: "美元 unwind——把数组字段拆开，数组里每个元素变成独立的一行。如果文档里 tags 数组是 ['a','b','c']，美元 unwind 之后变成三行，每行的 tags 字段是单个值。相当于 SQL 的 flatten 展开操作。\n\n美元 lookup——跨集合关联查询，相当于 SQL 的 LEFT OUTER JOIN。在 3.2 版本之前 MongoDB 不支持关联，现在也支持了。from 指定关联的集合，localField 是当前集合的字段，foreignField 是关联集合的字段，as 是结果存到哪个字段。\n\n美元 lookup 有性能开销，建议在关联字段上建索引。非必要不要用 lookup，能在文档设计时用嵌套解决的优先嵌套。",
          code: "// $unwind\ndb.users.aggregate([\n  { $unwind: \"$hobbies\" },\n  { $group: { _id: \"$hobbies\", count: { $sum: 1 } } },\n  { $sort: { count: -1 } }\n]);\n\n// $lookup\ndb.orders.aggregate([\n  { $lookup: {\n      from: \"users\",\n      localField: \"user_id\",\n      foreignField: \"_id\",\n      as: \"user\"\n  }},\n  { $unwind: \"$user\" }\n]);",
          language: "javascript",
          tip: "美元 unwind 之后的文档数量可能很大——一个文档里 1000 个元素的数组会炸成 1000 行。注意内存和性能。",
        },
        {
          title: "管道表达式与条件逻辑",
          content: "聚合管道里有很多表达式可以做数据转换和条件判断：\n\n美元 add / 美元 subtract / 美元 multiply / 美元 divide——四则运算\n美元 concat / 美元 substr / 美元 toUpper / 美元 toLower——字符串操作\n美元 cond——三元表达式，相当于 if-else。接收一个条件、为真时的值、为假时的值\n美元 switch——多条件分支，相当于 switch-case\n美元 ifNull——如果字段为 null 就用默认值\n美元 dateToString——日期格式化\n\n这些表达式可以嵌套使用，但嵌套太深可读性会变差，建议复杂逻辑拆成多个阶段。",
          code: "// $cond——条件判断\ndb.users.aggregate([\n  { $project: {\n      name: 1,\n      level: {\n        $cond: {\n          if: { $gte: [\"$age\", 50] },\n          then: \"senior\",\n          else: \"junior\"\n        }\n      }\n  }}\n]);\n\n// 字符串操作\ndb.users.aggregate([\n  { $project: {\n      fullName: { $concat: [\"$first_name\", \" \", \"$last_name\"] },\n      email: { $toLower: \"$email\" }\n  }}\n]);",
          language: "javascript",
          tip: "美元 cond 可以嵌套，实现多条件判断。但如果条件太多，改用美元 switch 更清晰。",
        },
        {
          title: "聚合性能优化",
          content: "聚合管道可能处理百万级数据，优化很关键：\n\n1. 美元 match 放最前面——过滤掉大部分数据，后面阶段压力小。\n2. 索引配合——美元 match、美元 sort 用的字段如果有索引，性能提升巨大。\n3. allowDiskUse——默认聚合操作内存限制 100MB，超了就报错。加 {allowDiskUse: true} 允许使用磁盘，慢但不会报错。\n4. 避免不必要的美元 unwind——一个文档展开成几千行可能把内存撑爆。\n5. 美元 limit 和美元 skip 放合适的位置——limit 尽早放减少数据量；skip 放前面，后面阶段不需要跳过的行就不用处理。\n6. 用 explain 分析管道——跟 find 的 explain 一样，看看每个阶段处理了多少文档、花了多少时间。",
          code: "// 启用磁盘使用\ndb.orders.aggregate([...], { allowDiskUse: true });\n\n// 查看聚合执行计划\ndb.orders.explain(\"executionStats\").aggregate([\n  { $match: { status: \"completed\" } },\n  { $group: { _id: \"$user_id\", total: { $sum: \"$amount\" } } }\n]);",
          language: "javascript",
          warning: "allowDiskUse 会让聚合变慢很多（磁盘比内存慢几百倍）。属于不得已才用的方案，能优化 pipeline 就优化。",
        },
      ],
      quiz: [
        {
          question: "聚合管道里美元 match 放哪里最好？",
          options: ["最后面", "中间", "最前面", "哪都行"],
          answer: 2,
          explanation: "美元 match 放最前面能过滤掉大部分数据，减少后面阶段要处理的数据量，跟 SQL 里 WHERE 尽早过滤一个道理。",
        },
        {
          question: "美元 unwind 对数组做什么？",
          options: ["删除数组", "把数组拆成多行", "把数组排序", "把数组合并"],
          answer: 1,
          explanation: "美元 unwind 把数组字段展开，每个元素变成独立一列（一行）。注意如果数组很大展开会很耗性能。",
        },
        {
          question: "美元 lookup 相当于 SQL 的什么？",
          options: ["WHERE", "GROUP BY", "LEFT OUTER JOIN", "ORDER BY"],
          answer: 2,
          explanation: "美元 lookup 是跨集合关联查询，跟 SQL 的 LEFT OUTER JOIN 功能类似。",
        },
        {
          question: "聚合管道内存限制多少？",
          options: ["16MB", "100MB", "1GB", "没有限制"],
          answer: 1,
          explanation: "默认 100MB 内存限制。超过报错，需要加 allowDiskUse: true 允许使用磁盘。",
        },
        {
          question: "美元 group 里下划线 id 是什么意思？",
          options: ["文档的 _id", "分组键", "累加器名称", "排序字段"],
          answer: 1,
          explanation: "美元 group 的下划线 id 是分组依据的字段。美元符号加字段名表示引用原文档的字段值。",
        },
      ],
    },
    "mongodb-basics": {
      slug: "mongodb-basics",
      sections: [
        {
          title: "NoSQL 跟 SQL 到底差在哪",
          content: "关系型数据库（SQL）把数据存成一张张互相有关联的表——用户表、订单表、商品表，查的时候用 JOIN 把它们缝在一起。\n\nMongoDB 是文档数据库——不像表那样一行行一列列，而是把数据存成 BSON（类似 JSON）的文档。一个文档就是一个自包含的数据单元，用户的订单可以嵌套在用户文档里，不用拆散到多个表。\n\n核心区别：SQL 的表结构是死的，所有行都得一个样。MongoDB 文档是灵活的，不同文档可以有不同字段。SQL 靠 JOIN 拆表关联，MongoDB 靠嵌套文档减少关联，但也能用 lookup 做类似 JOIN 的事。\n\n选 MongoDB 的场景：数据格式不固定经常变；数据之间天然有嵌套关系（如博客文章加评论）；快速原型开发。不适合：复杂事务多、需要大量关联查询的场景。",
          language: "javascript",
        },
        {
          title: "安装与 MongoDB Shell（mongosh）",
          content: "MongoDB 安装后自带 mongosh（新版命令行客户端，替代老版 mongo shell）。mongosh 是个完整的 Node.js REPL，可以直接写 JavaScript。\n\n常用命令：show dbs 看所有数据库，use mydb 切换数据库，show collections 看当前库所有集合，db.help() 看帮助。\n\n集合相当于 SQL 的表，文档相当于 SQL 的行。MongoDB 会自动为每个文档生成一个下划线 id 字段，类型是 ObjectId——一个 12 字节的唯一 ID，包含时间戳信息。",
          code: "# 启动 MongoDB 服务\nmongod --dbpath /data/db\n\n# 连接\nmongosh mongodb://localhost:27017\n\n# mongosh 常用命令\nshow dbs\nuse mydb\nshow collections\ndb.users.find()\ndb.users.findOne()\nexit",
          language: "bash",
          tip: "mongosh 用的是 JavaScript 语法，db.users.findOne() 后面不需要分号但加了也没事。",
        },
        {
          title: "文档模型设计——嵌套 vs 引用",
          content: "MongoDB 里设计数据模型有一个核心问题：嵌套还是引用？\n\n嵌套——把关联数据直接嵌入到父文档里。比如把评论嵌入文章文档里。好处是一次查询就全拿到了，不用 JOIN。坏处是文档可能变大超过 16MB 限制；评论多了更新也麻烦。\n\n引用——类似 SQL 的外键。文章和评论分开存，评论文档里放一个文章 ID 指向文章。好处是灵活安全，坏处是查的时候可能要跑 lookup 关联。\n\n选嵌套还是引用的经验法则：子数据跟父数据同生共死且数量不多（几十条）就嵌套；子数据可能被多个父文档引用或数量很大就引用。",
          code: "// 嵌套模型：文章里嵌入评论\n{\n  _id: ObjectId(\"...\"),\n  title: \"MongoDB 教程\",\n  comments: [\n    { user: \"Alice\", text: \"好文章!\", date: ISODate(\"2024-01-01\") },\n    { user: \"Bob\", text: \"学习了\", date: ISODate(\"2024-01-02\") }\n  ]\n}\n\n// 引用模型\n// articles 集合\n{ _id: ObjectId(\"...\"), title: \"MongoDB 教程\" }\n// comments 集合\n{ article_id: ObjectId(\"...\"), user: \"Alice\", text: \"好文章!\" }",
          language: "javascript",
          tip: "嵌套的评论有上限——单个文档最大 16MB，如果评论可能非常多，老老实实用引用模型。",
        },
        {
          title: "数据库与集合的管理",
          content: "MongoDB 的数据库和集合是懒创建的——你不用去建库建表，直接用就行。第一次往 database.collection 插入数据时，数据库和集合自动就长出来了。\n\n但有些高级选项需要显式创建：\n固定集合——大小固定的集合，写满了自动覆盖最老的数据，适合存日志。\n文档校验——虽然 MongoDB 是 schema-less 的，但你可以在集合上定义校验规则，拒绝不符合格式的文档插入。\n过期索引——给某个日期字段建 TTL 索引，时间一到文档自动删除，适合存临时数据。",
          code: "// 固定集合（最大 1MB，最多存 1000 条）\ndb.createCollection(\"logs\", { capped: true, size: 1048576, max: 1000 });\n\n// 定义集合校验规则\ndb.createCollection(\"users\", {\n  validator: {\n    $jsonSchema: {\n      bsonType: \"object\",\n      required: [\"name\", \"email\"],\n      properties: {\n        name: { bsonType: \"string\" },\n        email: { bsonType: \"string\", pattern: \"^.+@.+$\" },\n        age: { bsonType: \"int\", minimum: 0, maximum: 150 }\n      }\n    }\n  }\n});",
          language: "javascript",
          warning: "dropDatabase() 没有确认对话框，执行直接删，不会问第二遍。生产环境操作前再三确认。",
        },
        {
          title: "数据类型与 ObjectId",
          content: "MongoDB 的 BSON 支持丰富的数据类型：String、Integer、Boolean、Double、Array、Object、Date、ObjectId、Binary Data、Null、Regular Expression、Timestamp。\n\nObjectId 是最特殊的一个——默认主键 _id 的类型。12 字节的结构：前 4 字节是时间戳（精确到秒），中间 5 字节是随机值（机器 ID 加进程 ID），后 3 字节是计数器。这意味着从 ObjectId 就能反解出文档是什么时候创建的。\n\nDate 类型存的是 UTC 时间，mongosh 里显示会转成本地时间。数字分 Integer（32 位）、Long（64 位）、Double（浮点）。默认输入数字是 Double，想用 Integer 得用 NumberInt()。",
          code: "// ObjectId 里提取时间\nObjectId(\"669c8a1234567890abcdef12\").getTimestamp()\n// 返回 ISODate 对象\n\n// 数字类型\nNumberInt(42)   // 32 位整数\nNumberLong(99)  // 64 位整数\nNumberDecimal(\"123.45\") // 高精度小数\n\n// 日期\ndb.events.insertOne({ name: \"Conference\", date: new Date(\"2024-12-01\") });\ndb.events.insertOne({ name: \"Webinar\", date: ISODate(\"2024-12-15\") });",
          language: "javascript",
          tip: "ObjectId 不需要你手动生成，插入时不提供 _id 系统自动创建。但也可以用 ObjectId() 手动创建。",
        },
      ],
      quiz: [
        {
          question: "MongoDB 的集合相当于 SQL 的什么？",
          options: ["数据库", "表", "行", "列"],
          answer: 1,
          explanation: "Collection = Table，Document = Row，Field = Column。换个名字而已，概念上可以这样对应。",
        },
        {
          question: "MongoDB 文档最大多少？",
          options: ["1MB", "16MB", "1GB", "没有限制"],
          answer: 1,
          explanation: "单个 BSON 文档最大 16MB，超过这个限制要考虑 GridFS 分块存储或改成引用模型。",
        },
        {
          question: "嵌套模型适合什么场景？",
          options: ["数据量巨大", "子数据与父数据同生共死且数量不多", "需要频繁 JOIN", "需要强事务"],
          answer: 1,
          explanation: "嵌套读一次什么都拿到了，但文档有 16MB 上限且更新嵌套内容不如引用灵活。",
        },
        {
          question: "MongoDB 默认主键 _id 的类型是？",
          options: ["整数字", "UUID", "ObjectId", "字符串"],
          answer: 2,
          explanation: "ObjectId 是 12 字节的 BSON 类型，包含时间戳、机器 ID 和计数器，全局唯一。",
        },
        {
          question: "固定集合的特点？",
          options: ["大小无限", "数据永远不会删", "大小固定，满了自动删最老的数据", "只能读不能写"],
          answer: 2,
          explanation: "固定集合就像环形缓冲区，新数据覆盖旧数据。适合存日志、消息队列。",
        },
      ],
    },
    "mongodb-crud": {
      slug: "mongodb-crud",
      sections: [
        {
          title: "插入文档——insertOne / insertMany",
          content: "插入数据是 CRUD 的第一个操作。MongoDB 提供 insertOne（插一条）和 insertMany（插多条）。\n\ninsertOne 插入一个文档，如果集合不存在会自动创建。返回值包含 insertedId——自动生成的 _id。insertMany 可以一次插入多条，效率高很多。\n\n批量插入时可以加 ordered: false 参数——即使中间某条插入失败，后面的继续插，不会全部回滚。默认 ordered: true 会按顺序插，遇到错误就停止。",
          code: "// 插入一条\ndb.users.insertOne({\n  name: \"Alice\",\n  email: \"alice@example.com\",\n  age: 36\n});\n\n// 插入多条\ndb.users.insertMany([\n  { name: \"Bob\", email: \"bob@example.com\", age: 42 },\n  { name: \"Charlie\", email: \"charlie@example.com\", age: 35 }\n]);\n\n// 忽略失败继续插\ndb.users.insertMany([...], { ordered: false });",
          language: "javascript",
        },
        {
          title: "查询文档——find 与查询条件",
          content: "find 是 MongoDB 里最重要的命令，相当于 SQL 的 SELECT。find 接收两个参数：查询条件（相当于 WHERE）和投影（相当于 SELECT 哪些列）。\n\n查询条件是一个 JS 对象，字段名 冒号 字段值。特殊操作符以美元符号开头：美元 gt（大于）、美元 lt（小于）、美元 gte（大于等于）、美元 lte（小于等于）、美元 ne（不等于）、美元 in（在列表里）。\n\n逻辑操作符：美元 and（且）、美元 or（或）、美元 not（非）。多个条件写在一起默认就是 AND 的关系。\n\nfindOne 只返回第一条匹配的文档，find 返回游标，可以接着分页排序。",
          code: "// 基本查询\ndb.users.find({ age: { $gt: 30 } });\n\n// 多条件查询\ndb.users.find({\n  age: { $gte: 20, $lte: 40 },\n  email: /@example\\.com$/\n});\n\n// $or\ndb.users.find({\n  $or: [{ age: { $lt: 20 } }, { age: { $gt: 50 } }]\n});\n\n// 投影——只返回 name 和 email\ndb.users.find({}, { name: 1, email: 1, _id: 0 });",
          language: "javascript",
          tip: "find 返回游标，惰性加载，不是一次性把所有数据取回来。默认前 20 条，用 it 查看更多。",
        },
        {
          title: "更新文档——updateOne / updateMany",
          content: "更新操作分三种：updateOne（改第一条匹配的）、updateMany（改所有匹配的）、replaceOne（把整个文档换成新的）。\n\n更新操作符：美元 set——设某个字段的值；美元 unset——删除某个字段；美元 inc——给数字字段加减一个值；美元 push——数组尾部加一个元素；美元 pull——数组中删除匹配的元素；美元 rename——改字段名。\n\nupsert 选项：如果找不到匹配的文档，就插入一条。updateOne 配合 upsert: true 很好用——有就改，没有就建。",
          code: "// 改一条\ndb.users.updateOne(\n  { name: \"Alice\" },\n  { $set: { age: 37 } }\n);\n\n// 批量改\ndb.users.updateMany(\n  { age: { $gte: 40 } },\n  { $set: { tag: \"senior\" } }\n);\n\n// $inc：全体年龄 +1\ndb.users.updateMany({}, { $inc: { age: 1 } });\n\n// $push：添加兴趣\ndb.users.updateOne(\n  { name: \"Alice\" },\n  { $push: { hobbies: \"golf\" } }\n);\n\n// upsert\ndb.users.updateOne(\n  { name: \"David\" },\n  { $set: { age: 55 } },\n  { upsert: true }\n);",
          language: "javascript",
          tip: "updateOne 只改第一条匹配的，updateMany 改所有匹配的。别用混了。",
        },
        {
          title: "删除文档——deleteOne / deleteMany",
          content: "删除分 deleteOne 和 deleteMany。deleteMany 传空对象会删光整个集合的所有文档（但集合还在）。\n\n删除操作返回一个结果对象，包含 deletedCount——告诉你删了几条。如果删除条件匹配了很多文档，可以中途用 killOp 终止。\n\n清空集合最快的办法是 drop()——直接删集合（包括索引），比 deleteMany({}) 快得多，因为 drop 不逐个删文档，直接回收空间。但 drop 连索引一起删，重建索引有成本。\n\n安全建议：生产环境先 find 看看匹配多少条，确认没问题再 delete。删除操作最好先在测试库跑一遍。",
          code: "// 删一条\ndb.users.deleteOne({ name: \"Alice\" });\n\n// 删所有匹配的\ndb.users.deleteMany({ age: { $lt: 18 } });\n\n// 删集合里所有文档（保留集合结构）\ndb.users.deleteMany({});\n\n// 直接删集合（快但索引也丢）\ndb.users.drop();\n\n// 安全删除——先看再删\nconst count = db.users.countDocuments({ age: { $lt: 18 } });\nprint('将要删除 ' + count + ' 条');",
          language: "javascript",
          warning: "deleteMany({}) 删全部数据但保留集合，drop() 连集合带索引全删。生产环境操作前先做备份。",
        },
        {
          title: "CRUD 操作实战——一个完整的用户管理场景",
          content: "把 insertOne、find、updateOne、deleteOne 串起来做一个完整的用户管理场景：\n\n1. 创建用户——insertOne 插入新用户，检查邮箱是否重复（用唯一索引或先 findOne 检查）。\n2. 查找用户——find 支持模糊搜索（正则匹配姓名）、按年龄范围筛选、分页展示。\n3. 更新用户信息——updateOne 加 dollar set 只改需要改的字段，用 dollar inc 修改积分累计。\n4. 删除用户——deleteOne 按照用户 ID 精确删除。或 deleteMany 批量删除过期的未激活用户。\n\n完整的 CRUD 操作记住个规律：条件在前（第一个参数），操作在后（第二个参数）。每一类操作都是这个结构。\n\n还有一个常用技巧：增删改之后用 find 验证一下。比如 insert 后把新文档查出来确认字段都对。开发阶段这个习惯很省排查时间。",
          code: "// 完整 CRUD 场景\n// 1. 检查重复 + 插入\nget existing = db.users.findOne({ email: \"new@example.com\" });\nif (!existing) {\n  db.users.insertOne({\n    name: \"New User\",\n    email: \"new@example.com\",\n    age: 25,\n    points: 0,\n    createdAt: new Date()\n  });\n}\n\n// 2. 模糊搜索 + 分页\ndb.users.find({\n  name: /new/i,  // 不区分大小写的模糊匹配\n  age: { $gte: 18 }\n}).sort({ createdAt: -1 }).skip(0).limit(10);\n\n// 3. 更新积分\ndb.users.updateOne(\n  { email: \"new@example.com\" },\n  { $inc: { points: 10 }, $set: { lastLogin: new Date() } }\n);\n\n// 4. 批量清理\ndb.users.deleteMany({\n  createdAt: { $lt: new Date(\"2023-01-01\") },\n  points: 0\n});",
          language: "javascript",
          tip: "MongoDB 的 CRUD 和 SQL 的 CRUD 本来就是一回事——增(Insert)、查(Select)、改(Update)、删(Delete)。语法不同但逻辑相通。",
        },
      ],
      quiz: [
        {
          question: "insertMany 的 ordered: false 干什么的？",
          options: ["按索引排序插入", "即使中间失败也继续插后面的", "异步插入", "只插入不存在的"],
          answer: 1,
          explanation: "默认按顺序插入遇到错误就停。ordered: false 忽略错误继续插，适合大批量数据导入。",
        },
        {
          question: "find 的第一个参数是什么？",
          options: ["投影", "排序", "查询条件", "分页"],
          answer: 2,
          explanation: "第一个参数是查询条件（相当于 WHERE），第二个是投影（相当于 SELECT 哪些列）。",
        },
        {
          question: "美元 inc 操作符干什么的？",
          options: ["设置字段值", "给数字字段加减", "删除字段", "插入新字段"],
          answer: 1,
          explanation: "美元 inc 是 increment 的缩写，给数字字段增加或减少一个值，比如库存减 1。",
        },
        {
          question: "upsert 是什么意思？",
          options: ["只更新", "只插入", "有就更新没有就插入", "删除后重建"],
          answer: 2,
          explanation: "upsert = update + insert。最常见的用法是 updateOne 设置 upsert: true。",
        },
        {
          question: "deleteMany({}) 和 drop() 的区别？",
          options: ["没区别", "drop 更快但删集合和索引，deleteMany 删数据保留结构", "deleteMany 更快", "drop 有确认对话框"],
          answer: 1,
          explanation: "deleteMany({}) 逐条删除文档但保留集合和索引。drop() 连集合带索引一起干掉，空间回收更快但重建索引有开销。",
        },
      ],
    },
    "mongodb-indexes": {
      slug: "mongodb-indexes",
      sections: [
        {
          title: "索引基础——单字段与复合索引",
          content: "MongoDB 的索引原理跟 SQL 差不多——B 树结构，加速查询。创建索引用 createIndex，第一个参数是索引字段和方向（1 升序、-1 降序），第二个参数是选项。\n\n_id 字段自动有一个唯一索引。其他字段需要手动建——一般在查询频繁的字段上建索引。\n\n单字段索引：createIndex({ field: 1 })。复合索引：createIndex({ a: 1, b: -1 })，支持最左前缀匹配（跟 SQL 的联合索引一样）。\n\n索引方向在单字段索引里不重要（MongoDB 可以反向遍历），在复合索引里才有关键影响——排序时如果索引方向匹配就不用额外排序。",
          code: "// 单字段索引\ndb.users.createIndex({ email: 1 });\n\n// 复合索引\ndb.users.createIndex({ city: 1, age: -1 });\n\n// 唯一索引\ndb.users.createIndex({ email: 1 }, { unique: true });\n\n// 查看集合的所有索引\ndb.users.getIndexes();",
          language: "javascript",
        },
        {
          title: "索引类型——TTL、文本、地理空间",
          content: "MongoDB 支持多种索引类型，远超 B 树索引：\n\nTTL 索引——给日期字段建索引，指定过期时间。到期后 MongoDB 自动删除文档。适合存临时数据、会话信息、验证码。后台每 60 秒运行一次清理任务。\n\n文本索引——对字符串内容做全文搜索。一个集合只能有一个文本索引但可以包含多个字段。支持多语言分词（中文需要指定语言或装中文分词插件）。搜索时用美元 text 操作符。\n\n地理空间索引——2dsphere 索引支持地理空间查询，能查出附近的点、在某个区域内的点。外卖、打车类应用的基础。\n\n哈希索引——对字段的哈希值建索引，只支持等值查询。用在分片集群里让数据均匀分布。",
          code: "// TTL 索引（60 秒后自动删除）\ndb.sessions.createIndex(\n  { created_at: 1 },\n  { expireAfterSeconds: 60 }\n);\n\n// 文本索引\ndb.articles.createIndex({ title: \"text\", content: \"text\" });\ndb.articles.find({ $text: { $search: \"mongodb tutorial\" } });\n\n// 地理空间索引\ndb.restaurants.createIndex({ location: \"2dsphere\" });\ndb.restaurants.find({\n  location: {\n    $near: {\n      $geometry: { type: \"Point\", coordinates: [116.4, 39.9] },\n      $maxDistance: 5000\n    }\n  }\n});",
          language: "javascript",
          tip: "TTL 索引的清理程序每 60 秒跑一次，不是精确到秒的。如果需要严格定时删除，不要在业务逻辑里依赖它。",
        },
        {
          title: "索引覆盖查询",
          content: "跟 SQL 的覆盖索引一个道理——如果查询需要的所有字段都包含在索引里了，MongoDB 就不用去查实际的文档数据，直接从索引返回结果，速度快很多。\n\n判断是否覆盖：explain 的结果里 totalDocsExamined 为 0 且没有 FETCH 阶段，说明数据全从索引拿了。\n\n要实现覆盖查询，投影里只选索引中包含的字段，而且不能返回下划线 id（除非下划线 id 也在索引里）。因为下划线 id 默认返回，如果不 index 它就会触发回表。\n\n但别为了覆盖查询建太宽的索引——索引越大磁盘越多、写入越慢。只对高频查询做覆盖优化。",
          code: "// 建覆盖索引\ndb.orders.createIndex({ user_id: 1, amount: 1 });\n\n// 覆盖查询（只查索引里的字段，且 _id 不返回）\ndb.orders.find(\n  { user_id: ObjectId(\"...\") },\n  { user_id: 1, amount: 1, _id: 0 }\n);\n\n// 验证是否覆盖\ndb.orders.find(\n  { user_id: ObjectId(\"...\") },\n  { user_id: 1, amount: 1, _id: 0 }\n).explain(\"executionStats\");",
          language: "javascript",
          tip: "覆盖查询要求投影的字段全部在索引里，而且 _id 要么包含在索引里要么显式排除。",
        },
        {
          title: "索引策略与 explain",
          content: "explain 是索引优化的神器。三种模式：queryPlanner（仅执行计划，默认）、executionStats（执行计划加实际统计）、allPlansExecution（所有候选计划的对比）。生产环境用 executionStats 最实用。\n\n解读 explain 的关键字段：winningPlan.stage——IXSCAN 表示走了索引，COLLSCAN 表示全表扫描。totalDocsExamined——实际扫了多少文档。nReturned——返回了多少。executionTimeMillis——执行毫秒数。\n\n索引设计原则：\n覆盖查询频率高的字段\n等值查询字段放复合索引前面，范围查询字段放后面\n排序字段最好在索引里（避免内存排序）\n经常一起查询的字段建复合索引\n用 explain 验证索引是否真的被用了",
          code: "// 详细执行计划\ndb.orders.find({ user_id: ObjectId(\"...\") }).explain(\"executionStats\");\n\n// 关键指标\n// winningPlan.inputStage.stage: \"IXSCAN\" 或 \"COLLSCAN\"\n// executionStats.totalDocsExamined\n// executionStats.nReturned\n// executionStats.executionTimeMillis",
          language: "javascript",
          tip: "totalDocsExamined / nReturned 比值越大说明索引效率越低。理想情况这个比值接近 1。",
        },
        {
          title: "索引维护与管理",
          content: "索引不是建了就一劳永逸的——需要定期维护和监控。\n\n查看索引使用情况：用美元 indexStats 聚合管道看每个索引的访问次数，找出不再使用的索引（它们是写操作的累赘）。\n\n重建索引：随着文档增删改，索引可能出现碎片。用 reIndex() 重建索引能回收空间、提升性能。但重建期间会锁集合，生产环境要谨慎计划。\n\n隐藏索引：用 hideIndex() 隐藏某个索引，查询不会用它但索引还在。适合做大胆的测试——先隐藏看查询有没有变慢，确认没事再删。\n\n删除索引：dropIndex() 或 dropIndexes()。删除不需要的索引能提升写性能。",
          code: "// 查看索引使用统计\ndb.orders.aggregate([{ $indexStats: {} }]);\n\n// 隐藏索引（测试用）\ndb.users.hideIndex(\"email_1\");\n\n// 取消隐藏\ndb.users.unhideIndex(\"email_1\");\n\n// 删索引\ndb.users.dropIndex(\"email_1\");\n\n// 删所有非 _id 索引\ndb.users.dropIndexes();",
          language: "javascript",
          warning: "dropIndexes() 删除所有索引（除了 _id），不是 dropIndex（一个）。看清楚了再执行。",
        },
      ],
      quiz: [
        {
          question: "TTL 索引的作用是？",
          options: ["加速查询", "自动删除过期文档", "保证数据唯一", "全文搜索"],
          answer: 1,
          explanation: "TTL 索引在日期字段上设过期时间，到期自动删除文档。常用于会话、验证码等临时数据。",
        },
        {
          question: "explain 里 COLLSCAN 表示什么？",
          options: ["用了复合索引", "全集合扫描（没走索引）", "走了覆盖索引", "查询成功"],
          answer: 1,
          explanation: "COLLSCAN = Collection Scan，一行行扫过去。跟 SQL 的 Full Table Scan 一个意思，通常需要优化。",
        },
        {
          question: "覆盖索引查询的条件是什么？",
          options: ["只要投影字段在索引里就行", "投影字段全在索引里且 _id 也要被索引或排除", "任何查询都能覆盖", "只支持单字段索引"],
          answer: 1,
          explanation: "投影的字段必须全在索引里，而且 _id 要么包含在索引里要么显式排除，否则要回表取数据。",
        },
        {
          question: "hideIndex 干什么用的？",
          options: ["删除索引", "临时禁用索引但保留", "重建索引", "查看索引大小"],
          answer: 1,
          explanation: "hideIndex 隐藏索引让它不被查询使用，但索引还在。适合安全地测试删除索引的影响。",
        },
        {
          question: "复合索引的方向什么时候重要？",
          options: ["永远重要", "当查询涉及排序时，要跟排序方向匹配", "不重要", "只有升序索引才有效"],
          answer: 1,
          explanation: "如果查询有 sort 且多个字段不同排序方向，复合索引的字段方向要匹配才能避免额外排序。",
        },
      ],
    },
    "mongodb-queries": {
      slug: "mongodb-queries",
      sections: [
        {
          title: "比较与逻辑操作符大全",
          content: "MongoDB 查询条件用操作符来描述，都是以美元符号开头的。比较操作符：美元 eq（等于，一般不需要显式写）、美元 ne（不等于）、美元 gt（大于）、美元 gte（大于等于）、美元 lt（小于）、美元 lte（小于等于）、美元 in（在列表中）、美元 nin（不在列表中）。\n\n逻辑操作符：美元 and（且）、美元 or（或）、美元 nor（都不）、美元 not（非）。注意美元 and 通常不需要显式写——逗号分隔的多个条件默认就是 AND。\n\n数组操作符：美元 all（数组包含所有指定元素）、美元 size（数组长度匹配）、美元 elemMatch（数组中至少一个元素满足条件）。\n\n正则表达式：字段值可以直接传正则来做模糊匹配。MongoDB 用的是 PCRE 正则语法。",
          code: "// 比较操作符\ndb.products.find({ price: { $gte: 100, $lte: 500 } });\ndb.users.find({ city: { $in: [\"北京\", \"上海\", \"深圳\"] } });\n\n// 逻辑操作符\ndb.users.find({\n  $and: [{ age: { $gte: 18 } }, { age: { $lte: 60 } }]\n});\ndb.users.find({\n  $or: [{ city: \"北京\" }, { city: \"上海\" }]\n});\n\n// 数组操作符\ndb.products.find({ tags: { $all: [\"phone\", \"apple\"] } });\ndb.users.find({ hobbies: { $size: 3 } });\n\n// 正则\ndb.users.find({ email: /@gmail\\.com$/ });",
          language: "javascript",
        },
        {
          title: "投影、排序、分页",
          content: "find 的第二个参数叫投影——控制返回哪些字段。1 表示要，0 表示不要。下划线 id 比较特殊：默认要返回，想不返回得显式写 _id: 0。\n\n排序用 sort()，1 是升序，-1 是降序。可以按多个字段排序。\n\n分页用 skip() 和 limit() 配合——skip 跳过前 N 条，limit 限制返回条数。但注意 skip 大值时性能差，因为 MongoDB 还是要遍历跳过的文档。更优的方案是用游标（基于 _id 或某个排序字段做断点续查）。\n\ncountDocuments() 统计符合条件的文档数，可以配合查询条件精确计数。",
          code: "// 投影\ndb.users.find({}, { name: 1, age: 1, _id: 0 });\n\n// 排序\ndb.users.find().sort({ age: -1 });        // 年龄降序\ndb.users.find().sort({ city: 1, age: -1 });  // 先按城市升序再按年龄降序\n\n// 分页\ndb.users.find().skip(20).limit(10);  // 第 3 页，每页 10 条\n\n// 游标分页（更好）\ndb.users.find({ _id: { $gt: lastId } }).limit(10);\n\n// 计数\ndb.users.countDocuments({ age: { $gt: 30 } });",
          language: "javascript",
          tip: "skip 大值时性能差，因为 MongoDB 还是要遍历跳过的文档。用基于 _id 的游标分页更好。",
        },
        {
          title: "嵌套文档与数组查询",
          content: "MongoDB 的嵌套文档查询用点号访问：address.city。数组查询更灵活——可能是数组里某个元素匹配、数组包含某个值、或者数组里满足多个条件。\n\n查询数组有几种常见方式：直接匹配整个数组（顺序也必须一致）、美元 in 只要数组包含某个值、美元 all 数组包含所有指定值、美元 elemMatch 数组里至少一个元素满足组合条件。\n\n嵌套的数组里再嵌套文档，查询就一层层用点号加操作符往下钻。但层级太深会影响性能和可读性，建议控制在 3 层以内。",
          code: "// 嵌套字段\ndb.users.find({ \"address.city\": \"北京\" });\n\n// 数组包含某个值\ndb.users.find({ hobbies: \"golf\" });\n\n// 数组包含任意一个\ndb.users.find({ hobbies: { $in: [\"golf\", \"tennis\"] } });\n\n// 数组包含所有\ndb.users.find({ hobbies: { $all: [\"golf\", \"swimming\"] } });\n\n// 数组里元素满足组合条件\ndb.orders.find({\n  items: {\n    $elemMatch: { product: \"iPhone\", qty: { $gte: 2 } }\n  }\n});",
          language: "javascript",
          tip: "美元 elemMatch 比嵌套的逗号条件更精确。不加美元 elemMatch 时，多个条件只要在数组里任意元素分别满足就行。",
        },
        {
          title: "游标方法与查询优化",
          content: "find 返回的是一个游标对象，可以在上面链式调用各种方法：sort、limit、skip、hint（指定用哪个索引）、explain（查看执行计划）、count、toArray（转为数组）。\n\nexplain 是查询优化的利器——类似 MySQL 的 EXPLAIN。explain('executionStats') 能看到查询时间、扫描了多少文档、走了哪个索引。如果发现 totalDocsExamined 远大于 nReturned，说明扫了大量无关文档，可能需要优化索引。\n\nhint 可以强制指定用哪个索引，在优化器选错索引时有用。但一般让优化器自己选，不要过度使用 hint。",
          code: "// 链式调用\ndb.users.find({ age: { $gt: 20 } })\n  .sort({ age: -1 })\n  .skip(10)\n  .limit(5);\n\n// 查看执行计划\ndb.users.find({ email: \"alice@example.com\" }).explain(\"executionStats\");\n\n// 强制使用某个索引\ndb.users.find({ email: \"alice@example.com\" }).hint({ email: 1 });\n\n// 转为数组\nconst users = db.users.find().limit(10).toArray();",
          language: "javascript",
          tip: "explain('executionStats') 里的 totalDocsExamined 如果远大于 nReturned，说明索引不够好或没走索引。",
        },
        {
          title: "常用聚合查询快速入门",
          content: "虽然聚合管道有专门的章节，但一些简单的聚合查询属于日常操作。countDocuments 数数、distinct 去重、estimatedDocumentCount 估算总数（用元数据，秒出结果）。\n\naggregate 也可以做简单聚合，比如分组计数、求和。虽然功能远不止这些，但简单的美元 group 加美元 sum 经常用到。\n\n美元 match 相当于 find 的条件过滤，美元 group 相当于 SQL 的 GROUP BY，美元 sort 排序，美元 limit 限制数量。管道就是把这些操作串起来，上一个操作的输出是下一个操作的输入。",
          code: "// distinct——去重\ndb.users.distinct(\"city\");\n\n// 快速估算总数\ndb.users.estimatedDocumentCount();\n\n// 简单聚合——每个城市多少人\n// 注意：这里只是演示概念，完整聚合见聚合管道章节\ndb.users.aggregate([\n  { $group: { _id: \"$city\", count: { $sum: 1 } } },\n  { $sort: { count: -1 } }\n]);",
          language: "javascript",
          tip: "distinct 对单个字段去重，返回数组。数据量大的时候有 16MB 限制（返回结果不能超过 16MB）。",
        },
      ],
      quiz: [
        {
          question: "美元 in 和美元 all 的区别？",
          options: ["一样", "美元 in 匹配任一，美元 all 匹配所有", "美元 all 更快", "美元 in 只能用于数组"],
          answer: 1,
          explanation: "美元 in 只要数组包含列表中任意一个值。美元 all 要求数组包含列表中的所有值。",
        },
        {
          question: "skip 大值分页为什么慢？",
          options: ["MongoDB 不支持分页", "skip 要遍历跳过的文档", "skip 需要排序", "skip 会锁表"],
          answer: 1,
          explanation: "skip 不是直接跳到指定位置，而是从开头按顺序跳过 N 条文档。N 越大扫过的文档越多越慢。",
        },
        {
          question: "find 的第二个参数是干什么的？",
          options: ["查询条件", "排序条件", "投影（控制返回哪些字段）", "分页条件"],
          answer: 2,
          explanation: "第二个参数叫 projection（投影），1 表示要返回这个字段，0 表示不要。不指定默认返回所有字段。",
        },
        {
          question: "explain('executionStats') 里的 totalDocsExamined 是什么意思？",
          options: ["总共多少文档", "查询扫了多少文档", "返回多少文档", "索引多少个"],
          answer: 1,
          explanation: "totalDocsExamined 是这次查询实际检查过的文档数。如果远大于 nReturned（实际返回数），说明效率低。",
        },
        {
          question: "distinct 去重的限制是什么？",
          options: ["只能对数字去重", "返回结果最大 16MB", "不能加查询条件", "只能返回数组"],
          answer: 1,
          explanation: "distinct 返回一个数组，同样受 BSON 文档 16MB 限制。字段的去重值太多可能会超。",
        },
      ],
    },
    "mongodb-replication": {
      slug: "mongodb-replication",
      sections: [
        {
          title: "副本集是什么",
          content: "副本集（Replica Set）是 MongoDB 实现高可用的核心机制——多个 mongod 进程组成一个集群，一个主节点处理所有写入，多个从节点实时同步数据。\n\n主节点挂了怎么办？——副本集自动选举产生新的主节点，整个过程中应用可能短暂不可用（几秒到十几秒），但数据不丢、服务自动恢复。这就是高可用的含义：单点故障不导致服务中断。\n\n副本集最少需要 3 个节点（1 主 2 从）或 2 个节点加 1 个仲裁者（只投票不存数据）。为什么是奇数？因为选举需要多数派（超过半数）——偶数节点可能分裂成平票两个阵营谁也选不出来。\n\n应用端连副本集：连接字符串里写所有节点地址，驱动自动发现主节点。主节点变了驱动自动切换连接。",
          code: "# 启动副本集（每个节点都要指定相同的 replSet）\nmongod --replSet myReplSet --port 27017 --dbpath /data/rs1\nmongod --replSet myReplSet --port 27018 --dbpath /data/rs2\nmongod --replSet myReplSet --port 27019 --dbpath /data/rs3\n\n# 在任一节点上初始化副本集\nmongosh --port 27017\nrs.initiate({\n  _id: \"myReplSet\",\n  members: [\n    { _id: 0, host: \"localhost:27017\" },\n    { _id: 1, host: \"localhost:27018\" },\n    { _id: 2, host: \"localhost:27019\" }\n  ]\n});",
          language: "bash",
          tip: "副本集成员数最好是奇数。如果只有 2 个数据节点，加一个仲裁者（arbiter）——它不存数据只投票，资源消耗极小。",
        },
        {
          title: "复制流程——Oplog 机制",
          content: "MongoDB 的复制基于 Oplog（操作日志）。主节点把所有的写操作（增删改）记录到 oplog 里，从节点持续拉取 oplog 并在本地重放。\n\nOplog 是一个固定大小的集合（capped collection），存在 local 数据库的 oplog.rs 里。满了就覆盖最老的记录。如果从节点落后太多，oplog 已经滚过了，从节点就追不上需要全量同步。\n\nOplog 大小默认是空闲磁盘的 5%（最小 990MB，最大 50GB）。高写入场景要调大 oplog，避免从节点追不上。\n\n从节点拉取 oplog 是异步的，所以主从之间会有延迟（Replication Lag）。延迟大小取决于写入量、网络速度、从节点性能。",
          code: "// 查看 oplog 信息\nuse local;\ndb.oplog.rs.stats();\n\n// 查看 oplog 最新一条\ndb.oplog.rs.find().sort({ $natural: -1 }).limit(1);\n\n// 查看复制状态\nrs.printReplicationInfo();   // 主节点：oplog 大小和时间\nrs.printSecondaryReplicationInfo();   // 各从节点的复制延迟",
          language: "javascript",
          tip: "rs.printReplicationInfo() 能看到 oplog 能保存多长时间的操作记录。如果时间太短，从节点容易追不上。",
        },
        {
          title: "读写分离与 Read Preference",
          content: "默认情况下从节点不处理读请求——所有读写都走主节点。但可以配置 Read Preference 让读请求分散到从节点，减轻主节点压力。\n\nRead Preference 模式：\nprimary（默认）——所有读走主节点\nprimaryPreferred——优先读主，主挂了读从\nsecondary——只读从节点\nsecondaryPreferred——优先读从，从都挂了读主\nnearest——读网络延迟最低的节点\n\n读写分离的代价：可能读到旧数据。因为从节点异步同步，你读从节点时可能数据还没同步过来。对实时性要求高的场景（如余额查询）不适合读从节点。",
          code: "// 应用端设置 Read Preference\n// Node.js 驱动示例\nconst client = new MongoClient(uri, {\n  readPreference: \"secondaryPreferred\"\n});\n\n// mongosh 单次查询设置\n// 注意：以下为概念示意\ndb.orders.find().readPref(\"secondary\");",
          language: "javascript",
          warning: "读从节点可能拿到旧数据。如果你的业务逻辑是写后立即读（比如下单后立即查订单），务必读主节点。",
        },
        {
          title: "自动故障转移与选举",
          content: "副本集能在主节点挂掉后自动选出新主，这个过程叫故障转移。选主流程基于 Raft 共识算法：\n\n1. 从节点发现连不上主节点（心跳超时，默认 10 秒）\n2. 从节点发起选举，向其他节点拉票\n3. 拿到大于半数票的从节点成为新主\n4. 其他节点自动从新主同步\n\n选举优先级可以通过 priority 参数调整：priority 高的节点更容易当选主。priority 设为 0 的节点永远不会当选主（适合放在性能差的机器上做纯从库）。\n\nvotes 参数控制节点是否有投票权。hidden 参数可以把节点隐藏（客户端读不到），适合做专用的备份或分析节点。",
          code: "// 查看副本集状态\nrs.status();\n\n// 查看当前配置\nrs.conf();\n\n// 调整成员优先级\nconst cfg = rs.conf();\ncfg.members[1].priority = 2;  // 提高被选为主的概率\ncfg.members[2].priority = 0;  // 永远不会当主\nrs.reconfig(cfg);",
          language: "javascript",
        },
        {
          title: "副本集运维要点",
          content: "副本集日常运维需要注意：\n\n1. 监控复制延迟——用 rs.printSecondaryReplicationInfo() 或 Prometheus 监控。延迟高说明从库追不上，可能影响读写分离或故障转移。\n\n2. 定期检查 Oplog 窗口——确保 oplog 足够大，从节点即使短暂断网也能追回来。高写入场景 oplog 至少能存 24 小时的记录。\n\n3. 备份策略——通常从从节点做备份，不影响主节点性能。但备份时要记录 oplog 位置，方便做时间点恢复。\n\n4. 滚动升级——升级 MongoDB 版本时，先升级从节点，再切主然后升级原主。保证服务不中断。\n\n5. 扩容——添加新节点用 rs.add()，新节点会自动初始同步（全量拷贝加增量 oplog）。初始同步期间新节点不可用。",
          code: "// 添加新成员\nrs.add(\"localhost:27020\");\n\n// 移除成员\nrs.remove(\"localhost:27020\");\n\n// 添加仲裁者\nrs.addArb(\"localhost:27021\");\n\n// 手动降主（维护前把主切走）\nrs.stepDown();",
          language: "javascript",
          tip: "rs.stepDown() 让当前主节点主动退位，触发选举。做维护操作前的标准流程——先降主再操作。",
        },
      ],
      quiz: [
        {
          question: "副本集最少需要几个节点？",
          options: ["1 个", "2 个", "3 个", "5 个"],
          answer: 2,
          explanation: "最少 3 个节点才能形成多数派进行选举。2 节点加 1 仲裁者也行，但仲裁者不存数据。",
        },
        {
          question: "Oplog 满了会怎样？",
          options: ["MongoDB 崩溃", "从节点可能追不上需要全量同步", "主节点停止写入", "不影响任何操作"],
          answer: 1,
          explanation: "Oplog 是固定大小的循环队列，满了覆盖旧记录。如果从节点刚好需要这些被覆盖的记录就追不上了。",
        },
        {
          question: "Read Preference 设为 secondary 的风险是？",
          options: ["读不到数据", "可能读到旧数据", "写操作会失败", "连接会断开"],
          answer: 1,
          explanation: "从节点异步同步数据，从库可能还没收到主库最新的写入，读从库可能拿到过时数据。",
        },
        {
          question: "priority 设为 0 的节点会怎样？",
          options: ["不参与复制", "永远不成为主节点", "不存储数据", "不参与投票"],
          answer: 1,
          explanation: "priority: 0 的节点永远不会当选主，适合放在性能差的机器上做纯从库。",
        },
        {
          question: "rs.stepDown() 干什么的？",
          options: ["关闭副本集", "主节点主动退位触发选举", "删除节点", "降低节点优先级"],
          answer: 1,
          explanation: "主动让当前主节点退位，触发重新选举。做维护操作前建议先 stepDown 避免影响业务。",
        },
      ],
    },
    "mongodb-sharding": {
      slug: "mongodb-sharding",
      sections: [
        {
          title: "分片是什么、什么时候需要它",
          content: "当单台服务器的磁盘、内存、CPU 撑不住数据量或并发量时，就需要分片——把数据分布到多台服务器上，每台只存一部分数据。\n\n分片集群的三个组件：\nshard——存储实际数据的副本集，每个分片是一个独立的副本集。\nmongos——路由器，客户端连的是它，它根据分片键把请求路由到正确的分片。对客户端来说 mongos 就是完整的 MongoDB，感知不到分片。\nconfig server——存储集群元数据（哪个分片存哪些数据），也是副本集。\n\n什么时候需要分片？数据量超过单机磁盘容量、写入量超过单机 IO 能力、内存装不下热数据。但分片增加运维复杂度，能不分尽量不分。",
          code: "# 分片集群架构示意\n# mongos (路由)  ←  客户端连这里\n#    ↓\n# config server replica set (元数据)\n#    ↓\n# shard1 replica set  +  shard2 replica set  +  shard3 replica set\n# (数据分片 1)          (数据分片 2)          (数据分片 3)",
          language: "bash",
        },
        {
          title: "分片键——最重要的决策",
          content: "分片键是决定数据怎么分布的核心。选分片键是分片集群里最重要的设计决策，选错了后面要改基本等于重建。\n\n好的分片键满足三点：\n1. 高基数——值足够多，能把数据均匀散开。比如 userId 基数高，gender（男/女）只有两个值不行。\n2. 读写分布均匀——没有热点。比如用时间戳当分片键，所有新写入都集中到一个分片上，其他分片闲着。\n3. 查询能精准路由——查询条件里包含分片键，mongos 就能直接把请求发到正确的分片，不用广播到所有分片。\n\n常见分片键：散列分片（Hash Sharding）——对字段的哈希值分片，能保证均匀分布但范围查询会广播到所有分片。范围分片（Range Sharding）——按分片键的值范围分片，支持高效范围查询但可能有热点。",
          code: "// 启用分片\nsh.enableSharding(\"mydb\");\n\n// 散列分片（按 userId 哈希）\nsh.shardCollection(\"mydb.orders\", { user_id: \"hashed\" });\n\n// 范围分片（按 created_at 范围）\nsh.shardCollection(\"mydb.logs\", { created_at: 1 });\n\n// 复合分片键\nsh.shardCollection(\"mydb.events\", { user_id: 1, created_at: 1 });",
          language: "javascript",
          warning: "分片键选好后不能修改。如果选错了只能重建集合重新分片——这是一项巨大的工程。",
        },
        {
          title: "Chunk 与均衡器",
          content: "分片集群内部把数据按分片键范围切分成一个个 Chunk（块）。默认每个 Chunk 大小是 128MB。Chunk 是数据迁移的最小单元。\n\n均衡器（Balancer）负责保持各分片之间的 Chunk 数量平衡。当某个分片的 Chunk 比别的多太多时，均衡器自动迁移 Chunk 到其他分片。\n\nChunk 分裂：当某个 Chunk 的数据增长超过 Chunk Size，会自动分裂成两个 Chunk。分裂是轻量操作（只改元数据），迁移才是重的。\n\n均衡器在后头低优先级运行，不会影响正常的读写请求。但迁移期间涉及数据复制，如果集群负载已经很高可能导致性能波动。可以设置均衡器的运行窗口（比如只在凌晨跑）。",
          code: "// 查看集群状态\nsh.status();\n\n// 查看均衡器状态\nsh.isBalancerRunning();\n\n// 设置均衡器运行窗口（凌晨 2-6 点）\nsh.setBalancerState(true);\ndb.settings.updateOne(\n  { _id: \"balancer\" },\n  { $set: { activeWindow: { start: \"02:00\", stop: \"06:00\" } } }\n);\n\n// 手动迁移 Chunk\nsh.moveChunk(\"mydb.orders\", { user_id: ObjectId(\"...\") }, \"shard0002\");",
          language: "javascript",
          tip: "sh.status() 输出很长但信息很全——每个分片多少 Chunk、数据量多大、均衡器是否在跑，一目了然。",
        },
        {
          title: "查询路由与性能考量",
          content: "mongos 接收到查询后会根据分片键决定怎么处理：\n\n目标查询——查询条件包含分片键，mongos 能精准路由到对应的分片，只查一个分片。这是最理想的情况。\n\n广播查询——查询条件不包含分片键，mongos 把查询发给所有分片，然后合并结果。效率低得多而且结果排序可能不准。\n\n聚合管道的分片：尽量把美元 match 和美元 sort 放在最前面让各分片本地执行，最后在 mongos 合并。能用 lookup、group 时注意数据是否跨分片——跨分片聚合需要大量数据传输。\n\n排序的坑：分片集群里 sort 的结果是各分片先排序，mongos 再合并排序。如果数据量很大且没有分片键参与，合并排序可能成为瓶颈。",
          code: "// 目标查询（好）\ndb.orders.find({ user_id: ObjectId(\"...\") });\n// mongos 直接路由到对应的分片\n\n// 广播查询（不好）\ndb.orders.find({ amount: { $gt: 100 } });\n// mongos 要把查询发给所有分片再合并结果\n\n// 分片环境下的排序\ndb.orders.find({ user_id: ObjectId(\"...\") }).sort({ created_at: -1 });\n// 如果有分片键过滤，排序在单个分片内完成",
          language: "javascript",
          tip: "尽量在查询里包含分片键。没有分片键的查询叫 Scatter-Gather——分散到各分片再汇总，效率低。",
        },
        {
          title: "分片集群运维",
          content: "分片集群比单机或副本集复杂得多，运维要点：\n\n1. 监控 Chunk 分布——用 sh.status() 定期检查各分片的 Chunk 是否均匀。不均衡说明分片键选得不好或均衡器没在跑。\n\n2. config server 备份——config server 存着集群所有元数据，它的备份优先级最高。config server 挂了整个集群就挂了。\n\n3. 添加新分片——用 sh.addShard() 添加新副本集作为分片，均衡器会自动迁移部分 Chunk 到新分片。迁移过程可能很慢（大数据量可能要几天）。\n\n4. 移除分片——用 db.adminCommand({ removeShard: \"shardName\" }) 把分片上的所有 Chunk 迁移到其他分片，然后移除。这个操作可能有损，确保所有数据迁移完再执行。\n\n5. 版本升级——mongos、config server、shard 有自己的升级顺序，需要严格按文档来。",
          code: "// 添加新分片\nsh.addShard(\"myReplSet4/localhost:27040\");\n\n// 移除分片（先把数据迁走）\ndb.adminCommand({ removeShard: \"myReplSet4\" });\n// 反复执行直到 drained: true\n\n// 查看各分片的数据量\nuse config;\ndb.chunks.aggregate([\n  { $group: { _id: \"$shard\", count: { $sum: 1 } } }\n]);",
          language: "javascript",
          warning: "removeShard 操作不可逆。执行前确保所有数据已迁移完成（drained: true），确认无误后再最终移除。",
        },
      ],
      quiz: [
        {
          question: "分片集群中 mongos 的角色是？",
          options: ["存储数据", "路由请求到正确的分片", "备份数据", "监控集群"],
          answer: 1,
          explanation: "mongos 是客户端和分片之间的路由器。客户端连 mongos，mongos 根据分片键把请求发给对应的分片。",
        },
        {
          question: "好的分片键最重要的特性是？",
          options: ["字段名短", "高基数、读写均匀、查询包含", "必须是整数", "必须是日期"],
          answer: 1,
          explanation: "高基数保证数据均匀分布，读写均匀避免热点，查询包含分片键才能精准路由。",
        },
        {
          question: "散列分片和范围分片的主要区别？",
          options: ["散列分片更快", "散列分片分布均匀但范围查询需广播，范围分片支持范围查询但可能有热点", "没有区别", "散列分片只能用于字符串"],
          answer: 1,
          explanation: "散列分片按哈希值分布，数据均匀但失去范围查询能力。范围分片保留范围排序但有热点风险。",
        },
        {
          question: "查询不包含分片键会怎样？",
          options: ["查询失败", "广播到所有分片再合并结果", "自动选择分片", "数据会被复制"],
          answer: 1,
          explanation: "mongos 不知道数据在哪个分片，只能把查询发给所有分片（Scatter-Gather），效率低。",
        },
        {
          question: "config server 存的是什么？",
          options: ["用户数据", "集群元数据（分片键、Chunk 分布）", "Oplog", "临时文件"],
          answer: 1,
          explanation: "config server 存的是集群的配置信息——哪个集合分了片、分片键是什么、每个 Chunk 在哪个分片上。丢了集群就挂了。",
        },
      ],
    },
    "mysql-admin": {
      slug: "mysql-admin",
      sections: [
        {
          title: "用户与权限管理",
          content: "MySQL 的权限系统分成两层：用户能连上（登录权限）、用户能干啥（操作权限）。root 是超级管理员，什么都能干，但也最危险——生产环境别直接用 root 操作。\n\n建用户的正确姿势：先 CREATE USER 创建账号，再 GRANT 撒权限，最后 FLUSH PRIVILEGES 刷新让改动生效。删用户就 DROP USER，改密码用 ALTER USER。\n\n权限粒度很细：可以精确到某张表的某几列、某个库的所有表、甚至某个存储过程。原则是最小权限——只给用户干活必需的权限。",
          code: "-- 创建只读用户\nCREATE USER 'readonly'@'%' IDENTIFIED BY 'StrongPassword123!';\nGRANT SELECT ON mydb.* TO 'readonly'@'%';\nFLUSH PRIVILEGES;\n\n-- 创建应用用户\nCREATE USER 'app_user'@'localhost' IDENTIFIED BY 'AppPass456!';\nGRANT SELECT, INSERT, UPDATE, DELETE ON mydb.* TO 'app_user'@'localhost';\n\n-- 查看用户权限\nSHOW GRANTS FOR 'app_user'@'localhost';\n\n-- 回收权限\nREVOKE DELETE ON mydb.* FROM 'app_user'@'localhost';",
          language: "sql",
          warning: "别用 GRANT 自动创建用户（老版本可以），MySQL 8+ 不支持了。必须先 CREATE USER 再 GRANT。",
        },
        {
          title: "备份与恢复——mysqldump 与 XtraBackup",
          content: "备份是 DBA 的生命线。两种备份思路：逻辑备份（mysqldump）和物理备份（XtraBackup）。\n\nmysqldump 把数据和结构导成 SQL 语句，人可读，可以只备份某些表甚至某些行。缺点是慢，大库备份和恢复都慢。适合小库和部分数据迁移。\n\nXtraBackup 是物理备份——直接复制数据文件，速度快、不锁表。支持增量备份。生产环境的大库备份标配。\n\n备份策略一般是：每天全量加每小时增量，保留最近 N 天。定期做恢复演练——光备份不验证等于没备份。",
          code: "# mysqldump 备份\nmysqldump -u root -p --single-transaction mydb > mydb_backup.sql\n\n# 只备份结构\nmysqldump -u root -p --no-data mydb > mydb_schema.sql\n\n# 恢复\nmysql -u root -p mydb < mydb_backup.sql\n\n# XtraBackup 全量备份\nxtrabackup --backup --target-dir=/backup/full --user=root --password=xxx",
          language: "bash",
          tip: "mysqldump 加 --single-transaction 参数能保证 InnoDB 表在备份期间一致性，不锁表。生产环境必加。",
        },
        {
          title: "主从复制——读写分离的基础",
          content: "主从复制是 MySQL 高可用的基石——一台主库负责写，多台从库负责读。主库把变更记到二进制日志（binlog），从库拉取日志并在本地重放，最终两边数据一致。\n\n三种复制格式：STATEMENT（记录 SQL 语句，省空间但可能不准）、ROW（记录每行怎么变的，准但日志大）、MIXED（混合）。生产环境推荐 ROW 格式。\n\n复制延迟是常见问题——从库追不上主库的写入速度。可能是网络、从库性能、大事务等原因。延迟高时去从库读可能拿到旧数据。",
          code: "# 主库配置 my.cnf\n# server-id=1\n# log-bin=mysql-bin\n# binlog_format=ROW\n\n# 在从库上执行\nCHANGE MASTER TO\n  MASTER_HOST='10.0.1.100',\n  MASTER_USER='repl_user',\n  MASTER_PASSWORD='password',\n  MASTER_LOG_FILE='mysql-bin.000001',\n  MASTER_LOG_POS=4;\nSTART SLAVE;\nSHOW SLAVE STATUS\\G",
          language: "sql",
          tip: "SHOW SLAVE STATUS 里的 Seconds_Behind_Master 是关键指标——0 说明完美同步，数值大说明有延迟。",
        },
        {
          title: "慢查询分析与优化流程",
          content: "生产环境最怕突然变慢，排查慢查询有固定套路：\n\n第一步，开慢查询日志——设置 long_query_time（比如超过 1 秒算慢），打开 slow_query_log。\n\n第二步，用 mysqldumpslow 或 pt-query-digest 分析日志——哪个 SQL 跑得最慢、哪类查询最频繁。\n\n第三步，对慢查询用 EXPLAIN 分析——看 type 列是不是 ALL、key 列有没有走索引、rows 列预估扫多少行。\n\n第四步，对症下药——加索引、改 SQL、分表、加缓存、升级硬件。改之前拿 EXPLAIN 对比一下前后的差异。",
          code: "# 开启慢查询日志\nSET GLOBAL slow_query_log = ON;\nSET GLOBAL long_query_time = 1;\nSET GLOBAL log_queries_not_using_indexes = ON;\n\n# 分析慢查询日志\nmysqldumpslow -s t -t 10 /var/log/mysql/slow.log\npt-query-digest /var/log/mysql/slow.log\n\n# EXPLAIN 分析具体 SQL\nEXPLAIN SELECT * FROM orders WHERE user_id = 1 AND status = 'pending';",
          language: "bash",
          tip: "pt-query-digest 是 Percona Toolkit 里的神器，比 mysqldumpslow 强大得多，生产环境必备。",
        },
        {
          title: "InnoDB 参数调优基础",
          content: "MySQL 默认配置偏保守，生产环境必须调。InnoDB 几个核心参数：\n\ninnodb_buffer_pool_size——InnoDB 的内存缓存区，存数据和索引。值越大缓存命中率越高，读写越快。一般设成物理内存的 50% 到 70%。\n\ninnodb_log_file_size——redo log 文件大小，影响写入性能。太小的日志写满了就要刷盘，写入会卡。建议设成 buffer pool 的 25% 左右。\n\ninnodb_flush_log_at_trx_commit——控制 redo log 刷盘策略。默认 1（最安全但最慢），2（每秒刷一次，宕机可能丢 1 秒数据），0（最快但最不安全）。\n\ninnodb_io_capacity——告诉 InnoDB 磁盘 IO 能力，影响后台刷脏页的速度。SSD 可以设高一些。",
          code: "-- 查看 InnoDB 状态\nSHOW ENGINE INNODB STATUS\\G\n\n-- 查看 buffer pool 使用情况\nSHOW STATUS LIKE 'Innodb_buffer_pool_read%';\n-- 命中率 = 1 - reads/requests，应该大于 99%",
          language: "sql",
          warning: "改 innodb_buffer_pool_size 之前确认物理内存够用。改大了导致系统用 swap 的话，性能反而崩盘。",
        },
      ],
      quiz: [
        {
          question: "mysqldump 的 --single-transaction 参数干嘛的？",
          options: ["加速备份", "保证 InnoDB 表备份期间数据一致不锁表", "只备份一个表", "压缩备份文件"],
          answer: 1,
          explanation: "对 InnoDB 表开一个事务读快照，备份期间不加锁，不影响读写。MyISAM 表不支持这个。",
        },
        {
          question: "binlog_format=ROW 的好处是？",
          options: ["日志文件最小", "记录精确，不会出现主从不一致", "执行最快", "节省 CPU"],
          answer: 1,
          explanation: "ROW 格式记录每行的实际变更内容，不会因为 SQL 的不确定性导致主从数据不一致。",
        },
        {
          question: "innodb_buffer_pool_size 一般设多大？",
          options: ["10% 内存", "50%~70% 物理内存", "越大越好", "100MB 就够"],
          answer: 1,
          explanation: "设太低命中率低频繁读盘，设太高系统没内存了会 swap。专用数据库服务器 70% 到 80% 是合理范围。",
        },
        {
          question: "慢查询分析第一步做什么？",
          options: ["直接加索引", "用 EXPLAIN 分析", "确认慢查询日志已开启并收集到数据", "重启 MySQL"],
          answer: 2,
          explanation: "先确认慢查询日志开了、能看到哪些 SQL 慢。没数据就没法分析，不知道该优化谁。",
        },
        {
          question: "Seconds_Behind_Master 为 NULL 说明什么？",
          options: ["复制正常", "复制完全同步", "复制线程没在跑", "网络很快"],
          answer: 2,
          explanation: "NULL 通常说明 IO 线程或 SQL 线程停了，复制没在工作。正常同步时应该是一个数字。",
        },
      ],
    },
    "nginx-location": {
      slug: "nginx-location",
      sections: [
        {
          title: "Location 匹配规则详解",
          content: "location 是 Nginx 配置的灵魂——它决定了对不同 URL 路径怎么处理。Nginx 收到请求后按优先级匹配 location：\n\n匹配优先级（从高到低）：\n1. 精确匹配 = /exact（最优先，完全一样才匹配）\n2. 前缀匹配 ^~ /prefix（匹配后不再检查正则）\n3. 正则匹配 ~（区分大小写的正则）或 ~*（不区分大小写的正则）\n4. 普通前缀匹配 /prefix（兜底）\n\n正则匹配中，Nginx 会按在配置文件里的顺序找第一个匹配的。前缀匹配选最长的那个。\n\n特殊规则：当一个请求匹配到多个 location，Nginx 最终只用 1 个（不会叠加）。优先级规则要牢记。",
          code: "# 精确匹配\nlocation = /favicon.ico {\n  # 只匹配 /favicon.ico\n}\n\n# 前缀匹配（优先）\nlocation ^~ /static/ {\n  # 以 /static/ 开头的都走这里，正则不管了\n}\n\n# 正则匹配\nlocation ~ \\.php$ {\n  # 以 .php 结尾的走这里\n}\n\nlocation ~* \\.(jpg|png)$ {\n  # jpg 或 png 走这里，不区分大小写\n}\n\n# 普通前缀匹配（兜底）\nlocation / {\n  # 所有请求都匹配，但优先级最低\n}",
          language: "nginx",
          tip: "正则匹配 ~ 和 ~* 是按配置文件里的顺序匹配的——第一个匹配的就用。所以比较特殊的正则放前面，宽泛的放后面。",
        },
        {
          title: "常用 location 配置场景",
          content: "各种实际场景的 location 配置：\n\nAPI 代理——/api/ 的请求转发到后端服务。\n静态资源——/static/ 或特定文件后缀的直接返回文件。\n健康检查——/health 返回 200 给负载均衡器。\nACME 验证——/.well-known/acme-challenge/ 给 Let's Encrypt 验证用。\n\n顺序很重要——精确匹配和特定前缀放前面，兜底的 / 放最后。API 代理一般在静态资源之前还是之后？看需求但通常 API location 放前面，因为它匹配条件更精确。",
          code: "# 典型的 location 配置顺序\n\n# 1. 精确匹配（健康检查）\nlocation = /health {\n  return 200 \"ok\";\n  add_header Content-Type text/plain;\n}\n\n# 2. Let's Encrypt 验证\nlocation ^~ /.well-known/acme-challenge/ {\n  root /var/www/certbot;\n}\n\n# 3. API 代理\nlocation /api/ {\n  proxy_pass http://backend:3000;\n}\n\n# 4. 静态文件\nlocation /static/ {\n  expires 30d;\n}\n\n# 5. 兜底\nlocation / {\n  try_files $uri /index.html;\n}",
          language: "nginx",
        },
        {
          title: "正则表达式在 location 里的应用",
          content: "location 的正则匹配很强大，但别滥搞——过于复杂的正则影响性能且易出 bug。\n\n常用正则 pattern：\n~ \\.php$——以 .php 结尾\n~* \\.(jpg|png|gif|css|js)$——常见静态文件后缀\n~ ^/user/(\\d+)——URL 里带数字 id，如 /user/123\n\n正则匹配里用小括号捕获组，可以在后面用 $1 引用：\n\nrewrite ^/old-page$ /new-page permanent;\nrewrite ^/user/(\\d+)$ /profile?id=$1 last;\n\nlast 告诉 Nginx 用重写后的 URI 重新走一遍 location 匹配。permanent 返回 301 给浏览器。redirect 返回 302。break 停止当前上下文继续执行为后续指令。",
          code: "# 正则 location\nlocation ~ ^/api/v[12]/ {\n  # 匹配 /api/v1/ 或 /api/v2/\n  proxy_pass http://backend;\n}\n\n# rewrite 重写\nlocation / {\n  rewrite ^/blog/(.*)$ /posts/$1 last;\n  # /blog/my-post 变成 /posts/my-post\n}\n\n# 把老 URL 301 跳转\nserver {\n  listen 80;\n  server_name old.example.com;\n  return 301 https://new.example.com$request_uri;\n}",
          language: "nginx",
          tip: "rewrite 里的 last 和 break 容易搞混——last 让 Nginx 用新 URI 重新匹配 location，break 在当前 location 里继续执行后续指令。",
        },
        {
          title: "location 嵌套",
          content: "一个 location 里面可以再写 location——这在前后缀代理转发时很实用。\n\n场景：/api/ 代理到后端，但 /api/public/ 不需要认证（公开接口），可以用嵌套 location 细分：\n\n外层 location /api/ { proxy_pass ...; } 作为默认处理，内层 location /api/public/ {} 覆盖特定的子路径。\n\n嵌套的 location 里也可以用 proxy_pass 覆盖外层的代理设置，或者用 break/return 阻止代理。",
          code: "# location 嵌套\nlocation /api/ {\n  proxy_pass http://backend;\n  proxy_set_header Host $host;\n\n  # 公开 API 不需要认证头\n  location /api/public/ {\n    proxy_pass http://backend;\n    proxy_set_header Authorization \"\";  # 清空认证头\n  }\n\n  # 管理 API 走另一个后端\n  location /api/admin/ {\n    proxy_pass http://admin-backend:3001;\n  }\n}",
          language: "nginx",
        },
        {
          title: "try_files 的高级用法",
          content: "try_files 不只是 SPA 兜底，还有其他高级用法：\n\n1. 尝试多个文件：try_files $uri $uri/ $uri.html =404; ——先看原始 URI，然后看是不是目录，再试加 .html，都不行返回 404。\n\n2. 命名 location 配合：try_files $uri @fallback; ——如果找不到文件就跳到命名 location @fallback。\n\n3. 用变量构建动态路径：try_files /cache$uri /app$uri =404; ——实现多层缓存查找。\n\n4. 配合 proxy_pass 做缓存代理：先试本地有没有缓存文件，没有再代理到后端。",
          code: "# try_files 配合命名 location\nlocation / {\n  try_files $uri $uri/ @backend;\n}\n\nlocation @backend {\n  proxy_pass http://app:3000;\n  proxy_cache my_cache;\n  proxy_cache_valid 200 10m;\n}\n\n# 多层文件查找\nlocation /images/ {\n  try_files /thumbnails$uri $uri =404;\n  # 先找缩略图，没有就找原图\n}",
          language: "nginx",
          tip: "命名 location 以 @ 开头，不会直接响应请求，只能被 try_files 或 error_page 等指令引用。",
        },
      ],
      quiz: [
        {
          question: "Nginx location 匹配里优先级最高的是？",
          options: ["正则匹配 ~", "前缀匹配 ^~", "精确匹配 =", "普通前缀匹配"],
          answer: 2,
          explanation: "精确匹配 = 优先级最高。只要完全一样就匹配它，其他都不看。",
        },
        {
          question: "^~ /static/ 和 /static/ 的区别？",
          options: ["没区别", "^~ 匹配后不再检查正则，普通前缀还会检查正则", "^~ 是正则匹配", "^~ 不如普通前缀"],
          answer: 1,
          explanation: "^~ 是优先前缀匹配——匹配之后跳过所有正则。普通前缀匹配后 Nginx 还会继续找有没有更匹配的正则。",
        },
        {
          question: "rewrite 指令里的 last 和 permanent 区别？",
          options: ["一样", "last 内部重写 URI 重新匹配，permanent 返回 301 给浏览器", "permanent 在 location 里用", "last 等于 break"],
          answer: 1,
          explanation: "last 让 Nginx 内部拿新 URI 重新匹配 location。permanent 直接告诉浏览器跳转到新地址（301）。",
        },
        {
          question: "命名 location（@xxx）怎么用？",
          options: ["直接响应用户请求", "被 try_files、error_page 等内部指令引用", "用于反向代理", "存放变量"],
          answer: 1,
          explanation: "以 @ 开头的 location 不会被直接访问，只能由 try_files、error_page 等内部指令跳转到。",
        },
        {
          question: "SPA 的 try_files $uri $uri/ /index.html 中的 $uri/ 什么作用？",
          options: ["没作用", "如果请求的是目录，尝试找目录下的 index 文件", "处理正则", "重定向 HTTPS"],
          answer: 1,
          explanation: "$uri/ 表示如果存在同名的目录，尝试用该目录的 index 文件（如 index.html）。大多数 SPA 其实用不到，但不碍事。",
        },
      ],
    },
    "nginx-logging": {
      slug: "nginx-logging",
      sections: [
        {
          title: "access_log——记录每个请求",
          content: "access_log 记录每一个请求的详细信息——谁在什么时间访问了什么资源、返回了什么状态码、传输了多少数据。这些日志是做数据分析、排查问题、安全审计的基础。\n\n默认的 combined 格式挺全的：客户端 IP、时间、请求行、状态码、响应大小、Referer、User-Agent。\n\n自定义 log_format 可以加更多信息：$request_time（请求处理时间）、$upstream_response_time（后端响应时间）、$upstream_addr（后端地址）、$http_x_forwarded_for（真实客户端 IP，在代理后面特别重要）。\n\naccess_log 的路径和是否开启可以针对每个 server 或 location 单独设置。off 关掉日志（对健康检查等频繁请求可以关掉减少 IO）。",
          code: "# 自定义日志格式\nlog_format main '$remote_addr - $remote_user [$time_local] '\n                '\"$request\" $status $body_bytes_sent '\n                '\"$http_referer\" \"$http_user_agent\" '\n                'rt=$request_time uct=$upstream_connect_time '\n                'uht=$upstream_header_time urt=$upstream_response_time';\n\naccess_log /var/log/nginx/access.log main;\n\n# 按 location 关闭日志\nlocation /health {\n  access_log off;\n  return 200;\n}",
          language: "nginx",
          tip: "$request_time vs $upstream_response_time——前者是 Nginx 从收到请求到响应的总时间，后者是后端的处理时间。差值太大说明 Nginx 自己处理（如静态文件）或网络传输花了时间。",
        },
        {
          title: "error_log——记录错误与调试",
          content: "error_log 记录 Nginx 遇到的错误、警告和调试信息。错误日志级别从低到高：debug、info、notice、warn、error、crit、alert、emerg。\n\n生产环境通常设 warn 或 error 级别。设 debug 级别日志量爆炸且有性能影响，只用于排查具体问题（需要编译 Nginx 时加上 --with-debug 支持）。\n\nerror_log 可以配置到文件、syslog、或者 stderr（容器里常用，日志收集系统统一收）。\n\n常见的 error_log 里的问题：\nupstream timed out——后端响应超时。\nconnect() failed——连不上后端。\nSSL 相关错误——证书配置问题。\npermission denied——文件权限问题。",
          code: "# 错误日志配置\nerror_log /var/log/nginx/error.log warn;\n\n# 输出到 syslog\nerror_log syslog:server=localhost:514 warn;\n\n# 调试模式（仅临时用）\nerror_log /var/log/nginx/debug.log debug;\n# 需要 Nginx 编译时有 --with-debug\n\n# 按条件记错误日志\nmap $status $loggable {\n  ~^[23]  0;\n  default 1;\n}\naccess_log /var/log/nginx/access.log combined if=$loggable;",
          language: "nginx",
          tip: "nginx -t 只能检查语法错误。运行时的问题（如连不上后端）只能从 error_log 里看。",
        },
        {
          title: "日志轮转——别让磁盘撑满",
          content: "Nginx 自己不管日志轮转，日志文件会一直变大。需要用 logrotate 或操作系统的工具定期切割压缩旧日志。\n\nlogrotate 是 Linux 的标准日志管理工具——它定期把旧的日志文件重命名、压缩，并通知 Nginx 打开新日志文件（通过 USR1 信号）。\n\n典型的配置：每天轮转、保留 30 天、压缩旧文件、延迟压缩（避免当前正在写的文件被压缩）。\n\n注意：logrotate 执行后需要 kill -USR1 给 Nginx 发信号让它的日志指向新文件。或者用 copytruncate 模式直接截断（但可能丢几行日志）。",
          code: "# /etc/logrotate.d/nginx\n/var/log/nginx/*.log {\n  daily                       # 每天轮转一次\n  missingok                   # 日志文件不存在不报错\n  rotate 30                   # 保留 30 份\n  compress                    # 压缩旧日志\n  delaycompress               # 延迟压缩（留一份不压缩方便查看）\n  notifempty                  # 空文件不轮转\n  create 640 nginx adm        # 创建新文件的权限\n  sharedscripts\n  postrotate\n    if [ -f /var/run/nginx.pid ]; then\n      kill -USR1 `cat /var/run/nginx.pid`\n    fi\n  endscript\n}",
          language: "bash",
        },
        {
          title: "条件日志与动态日志",
          content: "Nginx 可以用 if 条件控制是否记录日志——健康检查、静态资源这些不需要记录的内容可以关掉日志，减少磁盘 IO 和日志量。\n\n使用 map 指令定义一个变量，根据条件设置为 0（不记）或 1（记）。access_log 用 if= 条件引用这个变量。\n\n还有 buffered 日志模式——Nginx 把日志先写缓冲区再批量刷盘，减少磁盘 IO 次数。buffer 和 flush 参数控制缓冲区大小和刷盘频率。\n\ngzip 日志——日志量大时可以设置 access_log 输出通过管道传给 gzip 程序实时压缩。",
          code: "# 条件日志——健康检查和静态文件不记\nmap $uri $loggable {\n  /health 0;\n  ~* \\.(css|js|png|jpg|gif)$ 0;\n  default 1;\n}\naccess_log /var/log/nginx/access.log combined if=$loggable;\n\n# 缓冲日志\naccess_log /var/log/nginx/access.log combined buffer=64k flush=5s;\n\n# 压缩日志（pipe 到 gzip）\naccess_log /var/log/nginx/access.log.gz combined gzip buffer=64k flush=5s;",
          language: "nginx",
          tip: "缓冲日志的 flush 参数——日志在缓冲区里最多待多少秒就必须刷盘。5s 意味着最多丢最近 5 秒的日志（Nginx 挂了的话）。",
        },
        {
          title: "JSON 日志与 ELK 集成",
          content: "传统文本日志难以程序化分析。现在流行用 JSON 格式输出日志，直接喂给 ELK（Elasticsearch + Logstash + Kibana）或 Loki 做聚合分析。\n\nJSON 日志定制——用 log_format 定义 JSON 格式（注意要 escape 特殊字符）。关键字段：时间戳、客户端 IP、请求 URI、状态码、响应时间、User-Agent。\n\n配合 Filebeat 或 Fluentd 把 JSON 日志采集到 Elasticsearch。\n\n注意：JSON 日志里别用 $http_ 开头的变量（如 Cookie）全部输出——可能泄露敏感信息。只记录需要分析的必要字段。",
          code: "# JSON 格式日志\nlog_format json_combined escape=json '{'\n  '\"timestamp\":\"$time_iso8601\",'\n  '\"remote_addr\":\"$remote_addr\",'\n  '\"real_ip\":\"$http_x_forwarded_for\",'\n  '\"method\":\"$request_method\",'\n  '\"uri\":\"$request_uri\",'\n  '\"status\":$status,'\n  '\"body_bytes\":$body_bytes_sent,'\n  '\"request_time\":$request_time,'\n  '\"upstream_time\":$upstream_response_time,'\n  '\"user_agent\":\"$http_user_agent\"'\n'}';\n\naccess_log /var/log/nginx/access.json json_combined;",
          language: "nginx",
          tip: "escape=json 是 Nginx 1.11.8 加入的参数，自动把变量里的引号反斜杠等转义成合法 JSON。不用自己手动处理了。",
        },
      ],
      quiz: [
        {
          question: "access_log 和 error_log 分别记什么？",
          options: ["access_log 记错误，error_log 记请求", "access_log 记每次请求，error_log 记错误和诊断", "两个记一样的东西", "access_log 已废弃不用"],
          answer: 1,
          explanation: "access_log 是访问日志——每个 HTTP 请求一条记录。error_log 是错误日志——服务器遇到的问题记录。",
        },
        {
          question: "logrotate 的 postrotate 里为什么发 USR1 信号？",
          options: ["重启 Nginx", "通知 Nginx 重新打开日志文件", "停止日志", "清理缓存"],
          answer: 1,
          explanation: "USR1 信号告诉 Nginx 重新打开日志文件。logrotate 把旧日志移走后，Nginx 还在往旧文件句柄写，发信号让它指向新文件。",
        },
        {
          question: "生产环境 error_log 应该设什么级别？",
          options: ["debug", "info", "warn 或 error", "emerg"],
          answer: 2,
          explanation: "warn/error 是生产环境合理的级别——记录需要关注的问题但不会产生海量日志。debug 级别日志量爆炸只用于临时查问题。",
        },
        {
          question: "JSON 日志格式的好处？",
          options: ["比文本日志小", "结构化数据方便 ELK/Loki 等聚合分析工具解析", "不能被人类阅读", "Nginx 自动开启"],
          answer: 1,
          explanation: "JSON 以结构化方式存每条日志，ELK 等工具直接解析，能按任意字段聚合筛选，比 grep 文本日志强太多。",
        },
        {
          question: "为什么 $http_x_forwarded_for 在反向代理场景很重要？",
          options: ["它是请求方法", "它记录了真实客户端的 IP（经代理传递）", "它控制缓存", "它是状态码"],
          answer: 1,
          explanation: "前端有代理时 Nginx 看到的是代理的 IP。X-Forwarded-For 头里保存了原始客户端 IP。日志里记这个才能做 IP 分析。",
        },
      ],
    },
    "nginx-performance": {
      slug: "nginx-performance",
      sections: [
        {
          title: "Worker 进程与连接数调优",
          content: "Nginx 的高性能底座是它的事件驱动架构——一个 worker 进程能同时处理几千个连接，不像 Apache 每个连接一个进程/线程。\n\nworker_processes——多少个 worker 进程。一般设成 CPU 核心数（auto 可以让 Nginx 自动检测）。设多了会有上下文切换开销，设少了浪费 CPU。\n\nworker_connections——每个 worker 最多同时处理多少个连接。默认 512。生产环境至少 1024~4096。\n\n最大并发连接数 = worker_processes * worker_connections。但还要除以 2（因为每个请求需要客户端和服务端两个连接，对于反向代理）才是实际并发请求数。\n\nworker_rlimit_nofile——系统级别的文件描述符限制。必须大于 worker_connections（Nginx 每个连接要用 1~2 个文件描述符）。",
          code: "# Nginx 核心性能配置\nworker_processes auto;\nworker_rlimit_nofile 65535;\n\nevents {\n  worker_connections 4096;\n  use epoll;              # Linux 上的高效事件模型\n  multi_accept on;         # 一次 accept 所有新连接\n}\n\n# 理论最大并发 = worker_processes * worker_connections / 2\n# 4 核 * 4096 / 2 = 8192 个并发请求",
          language: "nginx",
          tip: "worker_connections 设置好后用 ulimit -n 确认系统的文件描述符限制大于这个值。不够的话需要改 /etc/security/limits.conf。",
        },
        {
          title: "静态资源缓存与 sendfile",
          content: "Nginx 作为静态文件服务器的性能优化主要靠两点：内核级别的文件传输和缓存。\n\nsendfile on——用操作系统的 sendfile 系统调用直接把文件从磁盘传到网络，不经过用户空间的内存拷贝。性能提升明显。\n\ntcp_nopush on——跟 sendfile 配合，尽可能让 Nginx 在一个 TCP 包里发送完整的响应头加数据。\n\ntcp_nodelay on——对小数据包不延迟直接发。跟 tcp_nopush 不冲突——前者优化大文件，后者优化小响应。\n\nopen_file_cache——把打开的文件描述符缓存起来，不用每次都 open/close。能存文件句柄、修改时间、大小等信息。静态文件多的时候收益明显。",
          code: "sendfile on;\ntcp_nopush on;\ntcp_nodelay on;\n\n# 文件缓存\nopen_file_cache max=10000 inactive=60s;\nopen_file_cache_valid 30s;\nopen_file_cache_min_uses 2;\nopen_file_cache_errors on;\n\n# keepalive：长连接\ngzip on;\nkeepalive_timeout 65;\nkeepalive_requests 100;",
          language: "nginx",
          tip: "open_file_cache 的 inactive 参数：如果一个文件在若干秒内没有被访问，它就从缓存里移除。缓存太大也会占内存。",
        },
        {
          title: "反向代理缓存",
          content: "Nginx 不仅能代理请求，还能缓存后端返回的响应——经常访问的页面缓存起来，后端少处理很多请求。\n\nproxy_cache_path 定义缓存目录、缓存大小、过期策略。proxy_cache 在 location 里开启缓存。\n\nproxy_cache_key——用什么作为缓存的 key。默认是协议+域名+URI，一般够用。\nproxy_cache_valid——不同 HTTP 状态码缓存多久。200 可以长一点，404 短一点。\nproxy_cache_bypass——设置条件跳过缓存（如 cookie 里有特定值）。\n\n注意：动态内容（每个用户看到不一样的）不要缓存，或者用 vary 头区分。缓存了用户个人信息就是安全事故。",
          code: "# 在 http 块定义缓存路径\nproxy_cache_path /var/cache/nginx levels=1:2 keys_zone=mycache:10m max_size=1g inactive=60m;\n\n# 在 location 使用\nlocation /api/ {\n  proxy_cache mycache;\n  proxy_cache_key \"$scheme$host$request_uri\";\n  proxy_cache_valid 200 10m;\n  proxy_cache_valid 404 1m;\n  proxy_cache_bypass $cookie_nocache;\n  add_header X-Cache-Status $upstream_cache_status;\n\n  proxy_pass http://backend;\n}",
          language: "nginx",
          tip: "$upstream_cache_status 变量能显示 HIT（命中缓存）或 MISS（没命中）或 BYPASS（跳过）。加到响应头里方便调试。",
        },
        {
          title: "负载均衡策略",
          content: "Nginx upstream 模块支持多种负载均衡策略：\n\n轮询（默认）——请求按顺序分配给后端。配合 weight 加权——性能好的机器设高权重。\nleast_conn——优先分配给连接数最少的后端。适合长连接场景（WebSocket）。\nip_hash——根据客户端 IP 的 hash 固定分配后端。同一个 IP 的请求永远到同一台机器。适合有状态的 session 场景（但不推荐依赖 session，最好用无状态设计）。\nhash——自定义 key 做 hash（如 $request_uri），相同 key 请求固定到同一台机器。\n\n健康检查：max_fails 和 fail_timeout——在 fail_timeout 时间内失败 max_fails 次就暂时剔除这个后端。\n\n生产环境建议用云厂商的负载均衡（ALB/ELB）做四层分发，Nginx 做七层路由。",
          code: "# 定义 upstream\nupstream backend {\n  least_conn;  # 最少连接策略\n  server 10.0.1.10:3000 weight=3 max_fails=2 fail_timeout=30s;\n  server 10.0.1.11:3000 weight=1;\n  server 10.0.1.12:3000 backup;  # 备用，其他都挂了才用\n}\n\n# ip_hash 策略\nupstream sticky_backend {\n  ip_hash;\n  server 10.0.1.10:3000;\n  server 10.0.1.11:3000;\n}\n\nlocation / {\n  proxy_pass http://backend;\n}",
          language: "nginx",
          tip: "后端挂了 Nginx 不会一直等——proxy_connect_timeout、proxy_read_timeout 设置好超时时间，超时了就换下一个后端。",
        },
        {
          title: "性能监控与日志分析",
          content: "Nginx 自带一个简单的状态监控页面（stub_status），能看到当前连接数、处理过的请求数。\n\n开启 stub_status：用 stub_status 指令或 status 模块。看 Active connections、accepts（总连接数）、handled（处理成功的连接数）、requests（总请求数）。\n\nReading（正在读请求头）、Writing（正在发响应）、Waiting（keep-alive 等待中）。Waiting 多说明 keepalive 在工作，空闲连接多。Reading/Writing 多且持续增长说明有压力。\n\n日志分析：用 GoAccess 或 awk 脚本分析 access.log，统计 QPS、响应时间分布、错误率。\n\n专业监控：Prometheus + nginx-prometheus-exporter 把 Nginx 指标接入 Grafana，跟服务端的指标一起看。",
          code: "# 开启 stub_status\nlocation /nginx_status {\n  stub_status;\n  allow 127.0.0.1;\n  deny all;\n}\n\n# 访问后会输出：\n# Active connections: 291\n# server accepts handled requests\n#  16630948 16630948 31070465\n# Reading: 6 Writing: 179 Waiting: 106\n\n# 日志格式（加响应时间）\nlog_format timed '$remote_addr - [$time_local] \"$request\" '\n                 '$status $body_bytes_sent \"$http_referer\" '\n                 '$request_time $upstream_response_time';\naccess_log /var/log/nginx/access.log timed;",
          language: "nginx",
          tip: "nginx-prometheus-exporter 能导出 connect/request/time 等指标到 Prometheus。比 stub_status 强大太多，生产环境推荐。",
        },
      ],
      quiz: [
        {
          question: "worker_connections 设置的是什么？",
          options: ["总 worker 数", "每个 worker 能同时处理的最大连接数", "总连接数上限", "文件描述符限制"],
          answer: 1,
          explanation: "worker_connections 是每个 worker 进程能同时处理的连接数。总并发 = worker_processes * worker_connections / 2。",
        },
        {
          question: "sendfile on 优化了什么？",
          options: ["网络速度", "文件传输绕过用户空间内存拷贝", "压缩率", "连接数"],
          answer: 1,
          explanation: "sendfile 让内核直接把文件数据从磁盘传到网络 socket，不需要先读到用户空间再写，省一次内存拷贝。",
        },
        {
          question: "负载均衡 ip_hash 策略的作用？",
          options: ["随机分配", "相同 IP 的请求固定到同一台后端", "轮询分配", "按权重分配"],
          answer: 1,
          explanation: "ip_hash 对客户端 IP 做哈希，该 IP 的请求永远到同一台机器。适合临时需要 session 保持的场景。",
        },
        {
          question: "proxy_cache_key 是干嘛的？",
          options: ["加密缓存", "定义用什么做缓存的键来区分不同请求", "设置缓存大小", "清除缓存"],
          answer: 1,
          explanation: "不同的 URL 应该生成不同的缓存条目。proxy_cache_key 定义用什么作为区分——默认用协议+域名+URI。",
        },
        {
          question: "stub_status 的 Waiting 连接多是好事还是坏事？",
          options: ["坏事——有大量未处理请求", "好事——keepalive 正常工作", "说明 Nginx 要挂了", "说明后端撑不住了"],
          answer: 1,
          explanation: "Waiting 是 keep-alive 空闲连接——连接保持着但暂时没有数据传输。大多说明 HTTP 长连接正常工作。",
        },
      ],
    },
    "nginx-security": {
      slug: "nginx-security",
      sections: [
        {
          title: "访问控制——IP 黑白名单",
          content: "Nginx 可以基于 IP 地址做访问控制——允许或拒绝特定 IP 的访问。这在限制管理后台只能内网访问、封禁恶意 IP 等场景特别好用。\n\nallow——允许哪些 IP。deny——拒绝哪些 IP。规则按顺序执行，第一个匹配的生效。通常 deny all 放最后（白名单模式），或者 allow all 放最后（黑名单模式）。\n\nIP 范围可以用 CIDR：192.168.1.0/24 表示 192.168.1.0 到 192.168.1.255。\n\n注意：如果你的 Nginx 前面有 CDN 或反向代理，Nginx 看到的 IP 是 CDN 的 IP 而不是用户真实 IP。需要用 real_ip 模块或从 X-Forwarded-For 头里取。",
          code: "# 白名单模式——只允许内网\ndeny all;\nallow 192.168.0.0/16;\nallow 10.0.0.0/8;\n\n# 黑名单模式——封禁几个恶意 IP\ndeny 1.2.3.4;\ndeny 5.6.7.0/24;\nallow all;\n\n# 在 location 内部限制管理后台\nlocation /admin/ {\n  allow 192.168.1.0/24;\n  deny all;\n}",
          language: "nginx",
        },
        {
          title: "限流——保护后端不被冲垮",
          content: "限流是保护后端服务的重要手段——防止单个 IP 恶意刷接口、防止突发流量打垮服务。Nginx 有两种限流方式：\n\n速率限制——limit_req，控制每秒允许多少个请求。用令牌桶算法：桶以固定速率产生令牌，每个请求消耗一个令牌，没令牌的请求排队或被拒绝。\n\n并发限制——limit_conn，控制单个 IP 同时最多多少个连接。防止单个 IP 占用过多连接资源。\n\nlimit_req_zone 定义限制规则（按什么 key 限），limit_req 在 location 里应用。burst 参数允许短时间的突增请求排队（不加 burst 就直接拒绝超出的）。nodelay 参数让排队请求也立即处理。",
          code: "# 在 http 块定义\nlimit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;\nlimit_conn_zone $binary_remote_addr zone=connlimit:10m;\n\n# 在 server 或 location 里应用\nlocation /api/ {\n  limit_req zone=mylimit burst=20 nodelay;\n  limit_conn connlimit 10;\n  proxy_pass http://backend;\n}\n\n# 对不同 API 不同限速\nlimit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;\nlocation /api/login {\n  limit_req zone=login burst=3 nodelay;\n}",
          language: "nginx",
          tip: "登录接口限速要低（1r/s），防止暴力破解。一般 API 可以高一点（10~100r/s），看后端承受能力。",
        },
        {
          title: "安全响应头",
          content: "Nginx 可以通过 add_header 给响应加上安全头，让浏览器做好防御：\n\nX-Content-Type-Options: nosniff——防止浏览器 MIME 类型嗅探，严格用 Content-Type。\nX-Frame-Options: SAMEORIGIN——防止你的网页被别的网站用 iframe 嵌入（点击劫持攻击）。\nX-XSS-Protection: 1; mode=block——开启浏览器内置的 XSS 过滤器。\nContent-Security-Policy——限制页面可以加载哪些来源的资源（script、style、img、font 等）。这是最强的 Web 安全策略。\nReferrer-Policy——控制 Referer 头里带多少信息。\n\n这些安全头可以在 Nginx 层统一加，不需要每个应用自己处理。",
          code: "# 全局安全头\nadd_header X-Content-Type-Options \"nosniff\" always;\nadd_header X-Frame-Options \"SAMEORIGIN\" always;\nadd_header X-XSS-Protection \"1; mode=block\" always;\nadd_header Referrer-Policy \"strict-origin-when-cross-origin\" always;\n\n# CSP（根据你的应用定制）\nadd_header Content-Security-Policy \"\n  default-src 'self';\n  script-src 'self' 'unsafe-inline' https://cdn.example.com;\n  style-src 'self' 'unsafe-inline';\n  img-src 'self' data: https:;\n\" always;",
          language: "nginx",
          tip: "CSP 配置先设成 report-only 模式（Content-Security-Policy-Report-Only），只报错不拦截。调好了再去掉 Report-Only。",
        },
        {
          title: "防止 DDoS 与暴力破解",
          content: "Nginx 虽然不是专业的 WAF，但可以做基础的防护：\n\n1. 限制请求速率——登录接口设 1~3r/s，防止暴力破解。\n2. 限制 body 大小——client_max_body_size 10m，防止上传超大文件撑爆磁盘。\n3. 限制请求头大小——防止恶意构造超大头。\n4. 超时配置——client_body_timeout、client_header_timeout 设置短的超时，防止慢速攻击（Slowloris）。\n5. 隐藏版本号——server_tokens off，不让攻击者知道你的 Nginx 版本。\n6. 阻止不认识的 Host 头——防止 DNS 重绑定攻击。\n\n对于专业攻击，Nginx 的这些手段不够——需要配合专业的 WAF（如 ModSecurity）、CDN（Cloudflare）或 iptables 层的防护。",
          code: "# 基础防护配置\nclient_max_body_size 10m;\nclient_header_buffer_size 1k;\nlarge_client_header_buffers 4 8k;\n\nclient_body_timeout 10s;\nclient_header_timeout 10s;\nsend_timeout 10s;\n\nserver_tokens off;\n\n# 阻止不认识的 Host\nserver {\n  listen 80 default_server;\n  server_name _;\n  return 444;  # Nginx 特殊状态码——直接关连接不回复\n}",
          language: "nginx",
          tip: "return 444 是 Nginx 特有的状态码——直接断开 TCP 连接不回复任何内容。适合给恶意 IP 用——TCP 连接直接掐断。",
        },
        {
          title: "Basic Auth——简单密码保护",
          content: "Nginx 内置 HTTP Basic Auth，可以在开发环境、内网工具、临时公开页等场景加一层简单的用户名密码保护。\n\n两步：1. 用 htpasswd 创建用户名密码文件。2. 在 Nginx location 里用 auth_basic 指令引用。\n\nBasic Auth 的密码是 Base64 编码（不是加密），所以一定要配合 HTTPS 使用——不然密码明文就暴露了。\n\n对于内部管理工具（如 kibana、grafana），用 Basic Auth 加 IP 白名单双重保护是不错的组合。",
          code: "# 创建密码文件\nsudo apt install apache2-utils  # 得到 htpasswd 命令\nsudo htpasswd -c /etc/nginx/.htpasswd admin\n# -c 创建新文件（第一次用），之后再添加用户不要加 -c\n\n# Nginx 配置\nlocation /admin/ {\n  auth_basic \"Restricted Area\";\n  auth_basic_user_file /etc/nginx/.htpasswd;\n  \n  proxy_pass http://kibana:5601;\n}",
          language: "nginx",
          warning: "Basic Auth 的密码是 Base64 编码不是加密。不配 HTTPS 的话中间人完全可以解码拿到密码。生产环境 Basic Auth 必须配合 HTTPS。",
        },
      ],
      quiz: [
        {
          question: "Nginx 限流 limit_req 的 burst 参数什么意思？",
          options: ["最多允许多少连接", "允许短时间突发多少请求排队", "每秒最多多少个请求", "内存大小"],
          answer: 1,
          explanation: "burst 是令牌桶的队列大小。超过 rate 的请求可以排队在这个队列里等待处理。不加 burst 就直接拒绝。",
        },
        {
          question: "X-Frame-Options: SAMEORIGIN 防护什么攻击？",
          options: ["XSS", "SQL 注入", "点击劫持", "CSRF"],
          answer: 2,
          explanation: "点击劫持是把你的页面放在看不见的 iframe 上，诱导用户点击。SAMEORIGIN 禁止第三方网站用 iframe 嵌入你的页面。",
        },
        {
          question: "server_tokens off 的作用是？",
          options: ["关闭服务器", "隐藏 Nginx 版本号", "禁用令牌认证", "关闭 HTTPS"],
          answer: 1,
          explanation: "错误页面和响应头里的 Server 字段会显示 Nginx 版本号。关掉后攻击者不知道你用的版本，减少针对性漏洞攻击。",
        },
        {
          question: "return 444 是什么？",
          options: ["HTTP 444 标准状态码", "Nginx 特殊状态码——直接关闭连接不回复", "服务器错误", "重定向"],
          answer: 1,
          explanation: "444 是 Nginx 独有的，不是 HTTP 标准。使用它会直接断开 TCP 连接，不给客户端任何响应。适合静默拒绝恶意请求。",
        },
        {
          question: "Basic Auth 为什么必须配 HTTPS？",
          options: ["Nginx 要求", "密码是 Base64 编码不是加密，HTTP 明文传输可被解码", "Basic Auth 只能用 HTTPS", "否则 Nginx 不启动"],
          answer: 1,
          explanation: "Basic Auth 把用户名密码做 Base64 编码放在 Authorization 头里。没有 HTTPS 加密，中间人可以抓包直接解码拿到密码。",
        },
      ],
    },
    "nginx-ssl": {
      slug: "nginx-ssl",
      sections: [
        {
          title: "HTTPS = HTTP + SSL/TLS",
          content: "HTTPS 就是 HTTP 加上 SSL/TLS 加密层。它的作用是：\n1. 加密传输——你发的数据和服务器回的都在密文里，中间人看不到。\n2. 身份验证——确认你连的是真正的服务器，不是假的钓鱼网站。\n3. 数据完整性——数据在传输过程中没有被篡改。\n\nSSL/TLS 握手过程简说：浏览器跟服务器打招呼（ClientHello），服务器发证书（ServerHello + Certificate），浏览器验证证书是不是受信任的 CA 签发的，协商出一个对称加密密钥，之后的数据都用这个密钥加密。\n\nTLS 1.2 是主流，1.3 更新更快（握手只需 1-RTT）。建议配置 Nginx 时最低支持 TLS 1.2，关掉老的 SSLv3 和 TLS 1.0/1.1。",
          code: "server {\n  listen 443 ssl http2;\n  server_name example.com;\n\n  ssl_certificate     /etc/ssl/certs/example.com.crt;\n  ssl_certificate_key /etc/ssl/private/example.com.key;\n\n  ssl_protocols TLSv1.2 TLSv1.3;\n  ssl_ciphers HIGH:!aNULL:!MD5;\n\n  location / {\n    root /var/www/html;\n  }\n}",
          language: "nginx",
        },
        {
          title: "Let's Encrypt 免费 SSL 证书",
          content: "Let's Encrypt 是免费的 SSL 证书颁发机构，几乎所有网站都能免费获得受信任的证书。没有它之前，HTTPS 是花钱的事。\n\ncertbot 是最常用的 Let's Encrypt 客户端。它自动验证你确实拥有该域名，然后签发证书并配置 Nginx。证书有效期 90 天，需要定期续签（certbot 支持自动续签）。\n\nHTTP 验证方式——certbot 在 Nginx 的 .well-known 目录下放一个临时文件，Let's Encrypt 的服务器通过 HTTP 访问这个文件来验证。这是最常见的验证方式，要求 80 端口能从外网访问。\n\nDNS 验证方式——在域名 DNS 记录里添加一条 TXT 记录来验证。适合内网服务器或 80 端口开不出来的场景。支持通配符证书（*.example.com）。",
          code: "# 安装 certbot\nsudo apt install certbot python3-certbot-nginx\n\n# 自动配置 Nginx 并获取证书\nsudo certbot --nginx -d example.com -d www.example.com\n\n# 只获取证书不自动改 Nginx 配置\nsudo certbot certonly --webroot -w /var/www/html -d example.com\n\n# 测试续签（不实际续签）\nsudo certbot renew --dry-run\n\n# 自动续签（一般 certbot 会加一条 systemd timer 或 cron）\nsudo certbot renew --quiet",
          language: "bash",
          tip: "certbot 安装后通常自动设好了定时任务。每隔一段时间自动尝试续签。你可以用 certbot certificates 查看所有已签发的证书及其到期时间。",
        },
        {
          title: "HTTP 强制跳转 HTTPS",
          content: "配置了 HTTPS 后应该把所有 HTTP 请求重定向到 HTTPS。Nginx 的配置：监听 80 端口，return 301 跳转到 https。\n\n301 是永久重定向——浏览器会记住这个跳转，下次直接访问 HTTPS。\n\n还有一种叫 HSTS（HTTP Strict Transport Security）——在响应头里告诉浏览器：这个网站以后只能用 HTTPS 访问，别再试 HTTP 了。Strict-Transport-Security 头就是这个意思。\n\nHSTS 的好处：避免 SSL Strip 攻击（攻击者把 HTTPS 降级成 HTTP）。坏处：一旦设了，浏览器在有效期内（max-age）绝对不会用 HTTP 访问，证书配错了网站就打不开了。",
          code: "# HTTP 跳转 HTTPS\nserver {\n  listen 80;\n  server_name example.com;\n  return 301 https://$host$request_uri;\n}\n\n# HTTPS 配置（加 HSTS）\nserver {\n  listen 443 ssl http2;\n  server_name example.com;\n\n  add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;\n  # max-age 单位是秒，31536000 = 1 年\n\n  ssl_certificate     /etc/ssl/certs/example.com.crt;\n  ssl_certificate_key /etc/ssl/private/example.com.key;\n}",
          language: "nginx",
          warning: "HSTS 的 includeSubDomains 会影响所有子域名。确保所有子域名都配了 HTTPS 再开这个选项，否则子域名会打不开。",
        },
        {
          title: "SSL 安全配置最佳实践",
          content: "正确的 SSL 配置不只是有证书就行，还需要几个安全增强：\n\n1. 禁用老协议——只开 TLS 1.2 和 TLS 1.3，禁止所有更老的版本。ssl_protocols TLSv1.2 TLSv1.3;\n\n2. 安全的加密套件——指定安全的 cipher 列表。用 Mozilla 推荐的 Intermediate 配置。\n\n3. OCSP Stapling——Nginx 帮浏览器检查证书是否被吊销，省得浏览器自己去查。ssl_stapling on;\n\n4. 安全的 Diffie-Hellman 参数——生成一个高强度的 dhparam 文件。\n\n5. session 复用——同一个浏览器多次连接可以复用之前协商的密钥，减少握手开销。ssl_session_cache shared:SSL:10m; ssl_session_timeout 10m;",
          code: "# 完整的 SSL 安全配置\nssl_protocols TLSv1.2 TLSv1.3;\nssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;\nssl_prefer_server_ciphers on;\n\n# OCSP Stapling\nssl_stapling on;\nssl_stapling_verify on;\nssl_trusted_certificate /etc/ssl/certs/example.com.chain.crt;\n\n# DH 参数\ngenerate: openssl dhparam -out /etc/ssl/dhparam.pem 2048\nssl_dhparam /etc/ssl/dhparam.pem;\n\n# Session 复用\nssl_session_cache shared:SSL:10m;\nssl_session_timeout 10m;",
          language: "nginx",
          tip: "可以用 SSL Labs 的在线测试（ssllabs.com/ssltest）打分你的 SSL 配置。目标是 A+ 评级。",
        },
        {
          title: "SSL 证书排错",
          content: "证书配置出问题的常见原因：\n\n1. 证书和私钥不匹配——用 openssl x509 -noout -modulus -in cert.crt 和 openssl rsa -noout -modulus -in key.key 对比，输出应该一样。\n\n2. 中间证书缺失——浏览器缺少中间 CA 证书无法验证你的证书链。把多个证书按顺序拼接——你的证书在最前，中间证书在后。\n\n3. 证书过期——用 openssl s_client -connect example.com:443 看证书有效期。certbot renew --dry-run 测试续签是否正常。\n\n4. 域名不匹配——证书的 CN 或 SAN 里不包含你访问的域名。通配符证书 (*.example.com) 只能匹配一级子域名，不能匹配多级（a.b.example.com）。",
          code: "# 查看证书详情\nopenssl s_client -connect example.com:443 -servername example.com | openssl x509 -noout -dates\n\n# 验证证书和私钥匹配\nopenssl x509 -noout -modulus -in cert.pem | openssl md5\nopenssl rsa -noout -modulus -in key.pem | openssl md5  # 两个 MD5 应该一样\n\n# 查看完整证书链\nopenssl s_client -connect example.com:443 -showcerts\n\n# Nginx 重新加载\nsudo nginx -t && sudo nginx -s reload",
          language: "bash",
          tip: "在线工具 SSL Checker（sslshopper.com）也能帮你快速诊断证书问题。贴域名进去它会告诉你哪不对。",
        },
      ],
      quiz: [
        {
          question: "HTTPS 提供的三大保障是什么？",
          options: ["速度、压缩、缓存", "加密、身份验证、数据完整性", "重定向、代理、负载均衡", "缓存、限流、安全头"],
          answer: 1,
          explanation: "HTTPS 加密数据防窃听，通过证书验证服务器身份防钓鱼，保证数据在传输中不被篡改。",
        },
        {
          question: "Let's Encrypt 怎么验证域名所有权？",
          options: ["发邮件验证", "在域名下放一个验证文件或添加 DNS TXT 记录", "人工审核", "发短信验证"],
          answer: 1,
          explanation: "HTTP 验证是放文件，DNS 验证是加 TXT 记录。两种都能在 90 天内自动化续签。",
        },
        {
          question: "HSTS 的 Strict-Transport-Security 头有什么作用？",
          options: ["压缩传输内容", "告诉浏览器以后只走 HTTPS，不要尝试 HTTP", "设置缓存时间", "允许跨域"],
          answer: 1,
          explanation: "HSTS 强制浏览器在未来一段时间内只用 HTTPS 访问该网站。防御 SSL Strip 降级攻击。",
        },
        {
          question: "为什么 SSL 配置建议最低 TLS 1.2？",
          options: ["TLS 1.0 速度太慢", "TLS 1.0/1.1 有安全漏洞已不安全", "浏览器不支持旧版本", "TLS 1.2 免费"],
          answer: 1,
          explanation: "SSLv3、TLS 1.0、1.1 都有已知漏洞（如 POODLE、BEAST），PCI DSS 等安全标准也已废弃它们。",
        },
        {
          question: "301 和 HSTS 配合 HTTP 转 HTTPS 有什么区别？",
          options: ["一样", "301 服务器端跳转，HSTS 浏览器端强制", "HSTS 只能在 Apache 用", "301 不适用于 HTTPS"],
          answer: 1,
          explanation: "301 是服务器回复浏览器说你去 HTTPS。HSTS 是浏览器记住这个网站该用 HTTPS，下次直接走 HTTPS 不发 HTTP 请求。",
        },
      ],
    },
    "nginx-static": {
      slug: "nginx-static",
      sections: [
        {
          title: "静态文件服务配置",
          content: "Nginx 最基础的功能就是当静态文件服务器——直接返回 HTML、CSS、JS、图片等文件给浏览器。不需要后端程序参与，Nginx 直接从磁盘读了发出去。\n\n核心指令：\nroot——指定文件根目录。比如 root /var/www/html;，访问 example.com/logo.png 就找 /var/www/html/logo.png。\nalias——跟 root 类似但能路径重写。比如 alias /var/static/; 访问 /images/logo.png 变成 /var/static/logo.png（不带 images 前缀）。\nindex——默认文件，访问目录时找哪个文件（如 index.html）。\ntry_files——按照顺序尝试文件，找不到就返回某个 URI（常用于单页应用的路由回调）。\n\nautoindex on——开启目录浏览，浏览器能直接看到目录的文件列表（像 FTP）。生产环境通常是 off（安全考虑）。",
          code: "server {\n  listen 80;\n  server_name example.com;\n  root /var/www/html;\n  index index.html index.htm;\n\n  location / {\n    try_files $uri $uri/ =404;\n  }\n\n  # 图片文件单独配置缓存\n  location ~* \\.(jpg|png|gif|svg|ico)$ {\n    expires 30d;\n    add_header Cache-Control \"public\";\n  }\n}",
          language: "nginx",
          tip: "root 和 alias 容易搞混——root 会拼接 URI 路径，alias 会替换 URI 前缀。静态文件服务用 root 就行，反向代理路径重写时才用 alias。",
        },
        {
          title: "gzip 压缩——让文件传得更快",
          content: "gzip 能在服务器端把文本文件（HTML、CSS、JS、JSON）压缩后再发给浏览器，压缩率通常 60%~80%。用户在浏览器上感觉不到压缩和解压的过程，但下载速度快了一大截。\n\n关键配置：\ngzip on——开启压缩。\ngzip_types——指定哪些文件类型要压缩。text/html 默认已包含。\ngzip_min_length——小于这个字节数就不压缩了（太小的文件压了反而更慢）。\ngzip_comp_level——压缩级别 1~9。1 最快但压得小，9 最慢但压得最好。推荐 5~6。\ngzip_vary on——在响应头加 Vary: Accept-Encoding，告诉 CDN/缓存我支持压缩。\ngzip_proxied——对反向代理来的响应也压缩。\n\n注意：图片和视频已经压缩过了，再 gzip 没效果反而浪费 CPU。只压文本类文件。",
          code: "gzip on;\ngzip_types text/plain text/css application/json application/javascript text/xml;\ngzip_min_length 256;\ngzip_comp_level 5;\ngzip_vary on;\ngzip_proxied any;\ngzip_disable \"msie6\";",
          language: "nginx",
          tip: "几乎所有的前端项目都应该开 gzip。一般开启后文本资源能减少 60%~80% 的传输量。",
        },
        {
          title: "浏览器缓存策略",
          content: "让浏览器缓存静态资源是提升加载速度最有效的方法之一——用户第二次访问你的网站，静态资源直接从浏览器缓存拿，不需要任何网络请求。\n\nexpires——告诉浏览器这个资源能缓存多久。expires 30d 就是缓存 30 天。\nCache-Control——比 Expires 更现代的缓存控制头。public 表示 CDN 也能缓存；immutable 表示这个文件不会变，别重新验证。\n\n缓存策略：\n不变的文件（带 hash 的 JS/CSS）→ 缓存一年，immutable\n可能会变的文件（index.html）→ 不缓存或短期缓存\n图片、字体 → 缓存一个月到一年\n\n强缓存 vs 协商缓存：expires/Cache-Control 设置了强缓存——直接拿缓存不请求服务器。ETag/Last-Modified 是协商缓存——请求服务器但服务器说 304（没变直接用缓存）。",
          code: "# 带 hash 的构建文件——长期缓存\nlocation ~* \\.[a-f0-9]{8,}\\.(js|css)$ {\n  expires 1y;\n  add_header Cache-Control \"public, immutable\";\n}\n\n# 图片字体——中期缓存\nlocation ~* \\.(jpg|png|gif|svg|woff2|ttf)$ {\n  expires 30d;\n  add_header Cache-Control \"public\";\n}\n\n# HTML——短期缓存或不缓存\nlocation / {\n  expires -1;\n  add_header Cache-Control \"no-cache\";\n}",
          language: "nginx",
          tip: "前端构建工具（Webpack、Vite）会给文件加 content hash——文件内容不变 hash 就不变。配合 immutable 让浏览器永久缓存这些文件。",
        },
        {
          title: "CORS 跨域配置",
          content: "浏览器的同源策略阻止一个域名的网页访问另一个域名的资源。CORS（跨域资源共享）通过在 HTTP 响应头里加许可来允许跨域访问。\n\nAccess-Control-Allow-Origin——允许哪些域名跨域访问。如果所有域名都能访问就写 *。\nAccess-Control-Allow-Methods——允许哪些 HTTP 方法（GET、POST、PUT 等）。\nAccess-Control-Allow-Headers——允许哪些请求头。\nAccess-Control-Allow-Credentials——是否允许带 Cookie 的跨域请求。如果设了 true，Access-Control-Allow-Origin 不能是 *。\n\nOPTIONS 预检请求：浏览器在复杂请求前先发一个 OPTIONS 请求问服务器允不允许。Nginx 可以统一处理预检请求。",
          code: "# 允许所有跨域（公开 API）\nadd_header Access-Control-Allow-Origin *;\nadd_header Access-Control-Allow-Methods \"GET, POST, OPTIONS\";\nadd_header Access-Control-Allow-Headers \"Content-Type, Authorization\";\n\n# OPTIONS 预检请求直接返回 204\nif ($request_method = 'OPTIONS') {\n  return 204;\n}\n\n# 允许带 Cookie（指定具体域名）\nadd_header Access-Control-Allow-Origin https://example.com;\nadd_header Access-Control-Allow-Credentials true;",
          language: "nginx",
          tip: "Access-Control-Allow-Origin 设为 * 时不能同时设 Allow-Credentials: true。如果需要带 Cookie 跨域，必须指定具体域名。",
        },
        {
          title: "单页应用（SPA）的 Nginx 配置",
          content: "React、Vue 等单页应用的前端路由（如 /user/profile）在首次加载后由前端 JS 处理。但用户直接访问 /user/profile 或刷新页面时，Nginx 找不到对应的物理文件就返回 404。\n\n解决方案：try_files $uri $uri/ /index.html; ——告诉 Nginx 如果找不到文件，就把请求交给 index.html。前端的路由系统再根据 URL 渲染对应的组件。\n\n注意：API 请求不要被这条规则捕获。把 API 的 location 放前面匹配，try_files 放后面兜底。",
          code: "server {\n  listen 80;\n  server_name example.com;\n  root /var/www/spa;\n  index index.html;\n\n  # API 请求交给后端\n  location /api/ {\n    proxy_pass http://backend:3000;\n  }\n\n  # SPA 兜底\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}",
          language: "nginx",
          tip: "try_files 里的 /index.html 是 URI 而不是文件路径——Nginx 会用这个 URI 重新走一遍 location 匹配。所以 index.html 最终会由 root 指令找到。",
        },
      ],
      quiz: [
        {
          question: "root 和 alias 指令的区别？",
          options: ["一样", "root 拼接 URI 路径，alias 替换 URI 前缀", "alias 不能用于静态文件", "root 只能用于根路径"],
          answer: 1,
          explanation: "root 会把 location 匹配的路径拼在 root 路径后面。alias 会替换掉 location 匹配的部分。静态文件服务一般用 root。",
        },
        {
          question: "gzip 压缩应该对什么文件类型做？",
          options: ["所有文件", "文本类文件（HTML/CSS/JS/JSON）", "图片", "视频"],
          answer: 1,
          explanation: "只对文本类型做 gzip——压缩率高。图片和视频本身已压缩，再 gzip 没效果还浪费 CPU。",
        },
        {
          question: "SPA 项目里 try_files $uri $uri/ /index.html 解决什么问题？",
          options: ["加速加载", "前端路由刷新 404 问题", "压缩文件", "跨域问题"],
          answer: 1,
          explanation: "前端路由的 URL 在磁盘上没有对应文件。try_files 兜底把请求给 index.html，前端 JS 来渲染对应的页面。",
        },
        {
          question: "Cache-Control: immutable 什么意思？",
          options: ["永不缓存", "文件内容不会变，浏览器不需要重新验证", "每次都重新下载", "只在 HTTPS 下有效"],
          answer: 1,
          explanation: "immutable 告诉浏览器这个资源绝对不变。即使点了刷新按钮也不用发请求验证。配合文件 hash 使用。",
        },
        {
          question: "CORS 预检请求 OPTIONS 谁来发？",
          options: ["服务器", "浏览器自动发送", "前端代码手动发送", "Nginx 自动发送"],
          answer: 1,
          explanation: "当请求不是简单请求时（如 Content-Type 是 application/json），浏览器自动先发一个 OPTIONS 预检请求确认服务器允许。",
        },
      ],
    },
    "nodejs-database": {
      slug: "nodejs-database",
      sections: [
        {
          title: "Node.js 连接数据库的基础",
          content: "Node.js 操作数据库跟其他语言原理一样，但因为是异步的，所有数据库操作都是非阻塞的——用回调、Promise 或 async/await。\n\n三种常见模式：\n1. 原生驱动——mysql2、pg (PostgreSQL)、mongodb（MongoDB 官方驱动）。直接发 SQL 或命令，最底层最灵活。\n2. 查询构建器——Knex.js，用 JS 链式调用拼 SQL，不用手写原始 SQL 字符串。\n3. ORM——Prisma、Sequelize、TypeORM。把数据库表映射成 JS 类/对象，用面向对象的方式操作数据库。\n\n多数现代 Node.js 项目会用 ORM 或至少查询构建器——手写 SQL 虽然灵活但容易注入、不易维护。但关键的性能查询仍然可能需要原生 SQL。",
          code: "# 安装常用数据库驱动\nnpm install mysql2          # MySQL\nnpm install pg               # PostgreSQL\nnpm install mongodb          # MongoDB\nnpm install prisma @prisma/client  # Prisma ORM\nnpm install knex             # Knex 查询构建器",
          language: "bash",
        },
        {
          title: "MySQL——mysql2 驱动",
          content: "mysql2 是 Node.js 连接 MySQL 最常用的驱动。它支持 Promise API、连接池、预处理语句（防 SQL 注入）。\n\n连接池是生产环境必备——每次请求创建连接太浪费，连接池维护一组复用连接。mysql2/promise 提供 async/await 友好的 API。\n\n预处理语句（Prepared Statement）用 ? 占位符，防止 SQL 注入。mysql2.execute('SELECT * FROM users WHERE id = ?', [userId]) 自动转义参数。\n\n事务用连接池的 getConnection 拿到一个连接，用 beginTransaction、commit、rollback 管控。事务结束后 connection.release() 还回连接池。",
          code: "const mysql = require('mysql2/promise');\n\n// 连接池\nconst pool = mysql.createPool({\n  host: 'localhost',\n  user: 'root',\n  database: 'mydb',\n  waitForConnections: true,\n  connectionLimit: 10,\n});\n\n// 查询\nconst [rows] = await pool.execute(\n  'SELECT * FROM users WHERE age > ?', [18]\n);\n\n// 插入\nconst [result] = await pool.execute(\n  'INSERT INTO users (name, email) VALUES (?, ?)',\n  ['Alice', 'alice@example.com']\n);\nconsole.log(result.insertId);\n\n// 事务\nconst conn = await pool.getConnection();\ntry {\n  await conn.beginTransaction();\n  await conn.execute('UPDATE accounts SET balance = balance - ? WHERE id = ?', [100, 1]);\n  await conn.execute('UPDATE accounts SET balance = balance + ? WHERE id = ?', [100, 2]);\n  await conn.commit();\n} catch (err) {\n  await conn.rollback();\n  throw err;\n} finally {\n  conn.release();\n}",
          language: "javascript",
          tip: "连接池的 connectionLimit 不是越大越好——MySQL 默认最大连接数 151。设太大会耗尽 MySQL 的连接资源。",
        },
        {
          title: "PostgreSQL——pg 驱动与连接池",
          content: "pg 是 Node.js 连接 PostgreSQL 的标准驱动。跟 mysql2 类似但 PG 特有的功能：\n\npg.Pool 管理连接池。参数化查询用 $1、$2 占位符（不是 ?）。\n\nPG 支持 LISTEN/NOTIFY——数据库能主动推送消息给 Node.js。适合实时更新场景。\n\nJSONB 查询的结果自动解析为 JS 对象，不需要额外处理。PG 的 COPY 命令可以做高速批量插入。\n\npg-promise 是 pg 的 Promise 封装，提供更丰富的 API。但原生的 pg 已经支持 Promise 和 async/await，不一定需要额外库。",
          code: "const { Pool } = require('pg');\n\nconst pool = new Pool({\n  host: 'localhost',\n  database: 'mydb',\n  user: 'postgres',\n  max: 10,\n});\n\n// 查询\nconst { rows } = await pool.query(\n  'SELECT * FROM users WHERE age > $1', [18]\n);\n\n// JSONB 查询\nconst { rows } = await pool.query(\n  \"SELECT * FROM products WHERE attributes @> $1\",\n  [{ color: 'blue' }]\n);\n// attributes 字段自动从 JSONB 转为 JS 对象\n\n// LISTEN/NOTIFY\nconst client = await pool.connect();\nawait client.query('LISTEN new_order');\nclient.on('notification', (msg) => {\n  console.log('New order:', msg.payload);\n});",
          language: "javascript",
          tip: "pg 的 $1 占位符是 PostgreSQL 特有的参数化方式。记住不要拼字符串传参——参数化既防注入又让数据库缓存执行计划。",
        },
        {
          title: "MongoDB——mongodb 驱动",
          content: "mongodb 是 MongoDB 官方 Node.js 驱动。它操作 MongoDB 的 JSON 文档风格跟写 JavaScript 对象一样自然。\n\nMongoClient.connect 创建连接（通常是全局单例）。db.collection 获取集合引用。然后就是 find、insertOne、updateOne、deleteMany 这些操作。\n\nMongoDB 驱动返回的是 Cursor 对象——惰性加载，不会一次性把全部数据拉回来。用 .toArray() 转数组或用 for await...of 迭代。\n\n跟关系型数据库不同，MongoDB 不需要预定义 schema。但你可以用 JSON Schema Validation 在集合上定义校验规则——在 driver 这层不用管，但好的实践是配合 Mongoose 加 schema。",
          code: "const { MongoClient } = require('mongodb');\n\nconst client = new MongoClient('mongodb://localhost:27017');\nawait client.connect();\nconst db = client.db('mydb');\nconst users = db.collection('users');\n\n// 查询\nconst adults = await users.find({ age: { $gt: 18 } }).toArray();\n\n// 插入\nconst result = await users.insertOne({\n  name: 'Alice',\n  email: 'alice@example.com',\n  age: 36\n});\nconsole.log(result.insertedId);\n\n// 游标迭代（大数据集）\nconst cursor = users.find({ age: { $gt: 18 } });\nfor await (const doc of cursor) {\n  console.log(doc.name);\n}",
          language: "javascript",
        },
        {
          title: "ORM 选型——Prisma vs Sequelize vs Knex",
          content: "Prisma——新一代 ORM，强类型是其最大卖点。定义 schema 文件（schema.prisma），一键生成 TypeScript 类型和客户端代码。类型安全贯穿所有查询，IDE 自动补全完美。适合 TypeScript 项目。\n\nSequelize——最老牌的 Node.js ORM。支持 MySQL、PG、SQLite、MSSQL。功能全面但 API 设计较老（回调风格为主），TypeScript 支持一般。适合老项目或不需要强类型的团队。\n\nKnex——查询构建器，不是完全体 ORM。在原始 SQL 和 ORM 之间——链式调用生成 SQL 但不会把结果映射成 Model 对象。适合需要写复杂 SQL 但又不想管理原始字符串的场景。\n\n选型建议：新项目用 Prisma（TypeScript 加持），需要灵活控制的用 Knex，历史遗留项目看看 Sequelize。",
          code: "// Prisma——定义 schema\n// schema.prisma\nmodel User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n  posts Post[]\n}\n\n// 使用 Prisma Client\nimport { PrismaClient } from '@prisma/client';\nconst prisma = new PrismaClient();\n\nconst users = await prisma.user.findMany({\n  where: { age: { gt: 18 } },\n  include: { posts: true }\n});\n\n// Knex——查询构建器\nconst knex = require('knex')({ client: 'pg', connection: {...} });\nconst users = await knex('users')\n  .where('age', '>', 18)\n  .orderBy('created_at', 'desc')\n  .limit(10);",
          language: "javascript",
          tip: "Prisma 的编译器模型——你改 schema 后跑 prisma generate，它重新生成类型安全的 client。所有查询都有编译时类型检查，运行时少很多 bug。",
        },
      ],
      quiz: [
        {
          question: "Node.js 连接 MySQL 推荐用哪个驱动？",
          options: ["mongoose", "mysql2", "pg", "redis"],
          answer: 1,
          explanation: "mysql2 是 MySQL 的主流 Node.js 驱动，支持 Promise、连接池、预处理语句。pg 是 PostgreSQL 的驱动。",
        },
        {
          question: "预处理语句（? 或 $1 占位符）最重要的作用是？",
          options: ["代码更短", "防止 SQL 注入攻击", "执行更快", "兼容所有数据库"],
          answer: 1,
          explanation: "用占位符传参数，数据库把数据和 SQL 逻辑分开处理。用户输入不会被当作 SQL 代码执行。同时数据库还能缓存执行计划。",
        },
        {
          question: "Prisma 相比 Sequelize 最大的优势？",
          options: ["免费", "强类型——TypeScript 支持做到极致", "支持更多数据库", "不需要写 schema"],
          answer: 1,
          explanation: "Prisma 从 schema 生成类型安全的 Client，所有查询有编译时类型检查，IDE 自动补全完美。这是它最大的卖点。",
        },
        {
          question: "连接池的作用是什么？",
          options: ["存储查询结果", "复用数据库连接避免每次请求创建新连接", "加速 SQL 执行", "加密连接"],
          answer: 1,
          explanation: "连接池维护一组打开着的数据库连接。请求来时直接取一个用，用完还回去。省去每次创建连接的开销。",
        },
        {
          question: "MongoDB 驱动返回的 Cursor 有什么特点？",
          options: ["一次性返回所有数据", "惰性加载——不会一次拉回全部数据", "只能用于聚合查询", "跟数组一样操作"],
          answer: 1,
          explanation: "Cursor 是惰性迭代器，不会一次性把所有数据加载到内存。用 .toArray() 转为数组或用 for await...of 逐个处理。",
        },
      ],
    },
    "php-laravel": {
      slug: "php-laravel",
      sections: [
        {
          title: "Laravel 安装和路由",
          content: "Laravel 是 PHP 最流行的 Web 框架，基于 MVC 模式。用 Composer 创建项目，artisan 是命令行工具。路由定义在 routes/web.php 里，Route::get/post/put/delete 分别对应 HTTP 方法。可以用闭包直接返回响应，也可以用控制器类。",
          code: "<?php\n// routes/web.php\n\nRoute::get(\"/\", function () {\n    return view(\"welcome\");\n});\n\nRoute::get(\"/users\", [UserController::class, \"index\"]);\nRoute::get(\"/users/{id}\", [UserController::class, \"show\"]);\nRoute::post(\"/users\", [UserController::class, \"store\"]);\n\n// 路由分组 + 中间件\nRoute::middleware([\"auth\"])->prefix(\"admin\")->group(function () {\n    Route::get(\"/dashboard\", [AdminController::class, \"index\"]);\n});\n\n// 查看所有路由\n// php artisan route:list",
          language: "php",
          tip: "Route::resource 可以用一行代码生成 RESTful 的七个路由。",
        },
        {
          title: "Eloquent ORM 操作",
          content: "Eloquent 是 Laravel 自带的 ORM，每个数据库表对应一个 Model 类。一行 artisan 命令生成模型：php artisan make:model User。模型定义后，增删改查简单到令人发指。User::all() 查全部，User::find($id) 查一个，动态方法 User::where()->get() 条件查询。",
          code: "<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass User extends Model {\n    protected $fillable = [\"name\", \"email\", \"password\"];\n    \n    // 关联\n    public function posts() {\n        return $this->hasMany(Post::class);\n    }\n}\n\n// 使用\n// 增\n$user = User::create([\"name\" => \"小明\", \"email\" => \"xm@qq.com\", \"password\" => bcrypt(\"123456\")]);\n\n// 查\n$users = User::where(\"age\", \">\", 18)->orderBy(\"name\")->get();\n$user = User::findOrFail(1);\n\n// 改\n$user->update([\"name\" => \"新名字\"]);\n\n// 删\n$user->delete();\n\n// 关联查询\n$userPosts = User::with(\"posts\")->find(1);",
          language: "php",
          warning: "$fillable 或 $guarded 必须设置一个，用来防止批量赋值漏洞。白名单比黑名单更安全。",
        },
        {
          title: "Blade 模板",
          content: "Blade 是 Laravel 的模板引擎，文件以 .blade.php 结尾。{{ }} 输出变量并自动转义防 XSS，{!! !!} 输出不转义的 HTML。@if/@foreach/@for 控制结构，@extends 模板继承，@section/@yield 定义和填充区块。@include 引入子模板，@csrf 生成 CSRF token。",
          code: "{{-- layouts/app.blade.php --}}\n<!DOCTYPE html>\n<html>\n<head><title>@yield(\"title\")</title></head>\n<body>\n    @include(\"partials.header\")\n    <main>@yield(\"content\")</main>\n    @include(\"partials.footer\")\n</body>\n</html>\n\n{{-- users/index.blade.php --}}\n@extends(\"layouts.app\")\n\n@section(\"title\", \"用户列表\")\n\n@section(\"content\")\n    <h1>用户列表</h1>\n    @foreach ($users as $user)\n        <p>{{ $user->name }} - {{ $user->email }}</p>\n    @endforeach\n    \n    @auth\n        <a href=\"/profile\">个人中心</a>\n    @endauth\n    \n    @guest\n        <a href=\"/login\">请登录</a>\n    @endguest\n@endsection",
          language: "php",
          tip: "{{ }} 会自动转义 HTML 特殊字符防止 XSS，不需要手动 htmlspecialchars。",
        },
        {
          title: "Artisan 命令行",
          content: "Artisan 是 Laravel 强大的命令行工具，能做很多事：生成代码（make:model、make:controller）、数据库迁移（migrate）、数据填充（seed）、启动开发服务器（serve）、缓存清理（cache:clear）、进入交互式环境（tinker）。记不住的命令用 php artisan list 查看。",
          code: "# 创建模型（同时生成迁移和工厂）\nphp artisan make:model Post -mf\n\n# 数据库迁移\nphp artisan migrate\nphp artisan migrate:rollback\nphp artisan migrate:refresh --seed\n\n# 数据填充\nphp artisan make:seeder UserSeeder\nphp artisan db:seed\n\n# 创建控制器\nphp artisan make:controller UserController --resource\n\n# 缓存\nphp artisan config:cache\nphp artisan route:cache\nphp artisan view:cache\n\n# 开发服务器\nphp artisan serve --port=8080\n\n# 交互式 REPL\nphp artisan tinker",
          language: "bash",
          tip: "php artisan inspire 会随机显示一条鸡汤名言，给枯燥的开发加点乐子。",
        },
        {
          title: "请求验证和中间件",
          content: "Form Request 是 Laravel 推荐的表单验证方式，把验证逻辑从控制器中抽离出来。rules 方法定义规则，messages 自定义错误消息。中间件是请求的过滤器，在进入控制器前执行。auth 中间件检查登录，throttle 限流，自定义中间件能做各种前置后置处理。",
          code: "<?php\n// Form Request\nnamespace App\\Http\\Requests;\n\nuse Illuminate\\Foundation\\Http\\FormRequest;\n\nclass StoreUserRequest extends FormRequest {\n    public function authorize(): bool {\n        return true;\n    }\n    \n    public function rules(): array {\n        return [\n            \"name\" => \"required|string|max:50\",\n            \"email\" => \"required|email|unique:users\",\n            \"age\" => \"integer|min:1|max:150\",\n        ];\n    }\n    \n    public function messages(): array {\n        return [\n            \"name.required\" => \"用户名不能为空\",\n            \"email.unique\" => \"该邮箱已注册\",\n        ];\n    }\n}\n\n// 控制器中使用\npublic function store(StoreUserRequest $request) {\n    // $request 已经验证通过\n    User::create($request->validated());\n    return redirect(\"/users\")->with(\"success\", \"创建成功\");\n}",
          language: "php",
          tip: "Form Request 验证失败会自动重定向回上一页并带上错误信息，控制器只处理验证通过的数据。",
        },
      ],
      quiz: [
        {
          question: "Laravel 的路由文件在哪里定义？",
          options: ["config/routes.php", "routes/web.php", "app/routes.php", "public/routes.php"],
          answer: 1,
          explanation: "Web 路由在 routes/web.php，API 路由在 routes/api.php。",
        },
        {
          question: "Eloquent 模型中 $fillable 属性的作用？",
          options: ["指定表名", "批量赋值的白名单", "隐藏字段", "定义关联"],
          answer: 1,
          explanation: "$fillable 定义了允许批量赋值的字段列表，是防止批量赋值漏洞的安全措施。",
        },
        {
          question: "Blade 中 {{ }} 和 {!! !!} 的区别？",
          options: ["{{ }} 更快", "{{ }} 自动转义 HTML，{!! !!} 不转义", "{{ }} 不转义", "没有区别"],
          answer: 1,
          explanation: "{{ }} 输出转义后文本防止 XSS，{!! !!} 原样输出 HTML 用于需要渲染 HTML 的场景。",
        },
        {
          question: "Laravel Form Request 的 validate() 方法在验证失败时？",
          options: ["返回错误 JSON", "自动重定向回上一页并附上错误信息", "抛出异常", "静默忽略"],
          answer: 1,
          explanation: "Form Request 验证失败会自动重定向，控制器里拿到的 $request 是已经验证通过的。",
        },
      ],
    },
    "php-mysql": {
      slug: "php-mysql",
      sections: [
        {
          title: "PDO 连接数据库",
          content: "PDO 是 PHP 访问数据库的标准扩展，支持多种数据库切换驱动不用改代码。new PDO 创建连接，DSN 指定数据库类型和地址。PDO 默认会抛异常，配合 try-catch 捕获错误。连接后 query 直接执行 SQL，exec 执行无返回的语句。",
          code: "<?php\n\n$dsn = \"mysql:host=localhost;dbname=mydb;charset=utf8mb4\";\n$user = \"root\";\n$pass = \"123456\";\n\ntry {\n    $pdo = new PDO($dsn, $user, $pass, [\n        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n    ]);\n    echo \"连接成功\\n\";\n} catch (PDOException $e) {\n    die(\"连接失败: \" . $e->getMessage());\n}\n\n// 查询\n$stmt = $pdo->query(\"SELECT * FROM users\");\n$users = $stmt->fetchAll();\nprint_r($users);",
          language: "php",
          tip: "PDO::ATTR_DEFAULT_FETCH_MODE 设成 FETCH_ASSOC 就不用每次都写 fetch 模式了。",
        },
        {
          title: "预处理语句防注入",
          content: "预处理语句是防范 SQL 注入的核心武器。用 prepare 准备带占位符的 SQL，然后 bindValue/bindParam 绑定参数，最后 execute 执行。占位符有两种：? 命名占位和 :name 命名占位（推荐后者，语义更清晰）。永远不要拼接用户输入到 SQL 里！",
          code: "<?php\n\n$pdo = new PDO(\"mysql:host=localhost;dbname=mydb\", \"root\", \"123456\");\n$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\n\n// 命名占位符（推荐）\n$stmt = $pdo->prepare(\"INSERT INTO users (name, email) VALUES (:name, :email)\");\n$stmt->execute([\n    \":name\" => \"小明\",\n    \":email\" => \"xm@qq.com\",\n]);\n\n// 查询\n$stmt = $pdo->prepare(\"SELECT * FROM users WHERE age > :age\");\n$stmt->execute([\":age\" => 18]);\n$users = $stmt->fetchAll();\n\nforeach ($users as $user) {\n    echo $user[\"name\"] . \"\\n\";\n}\n\n// 单行查询\n$stmt = $pdo->prepare(\"SELECT * FROM users WHERE id = :id\");\n$stmt->execute([\":id\" => 1]);\n$user = $stmt->fetch();\n\n$count = $stmt->rowCount(); // 受影响行数",
          language: "php",
          warning: "拼接 SQL 字符串是 PHP 代码最常见的安全漏洞：$pdo->query(\"SELECT * FROM users WHERE name = '$name'\") 非常危险！",
        },
        {
          title: "事务处理",
          content: "事务确保一组 SQL 要么全成功要么全失败。PDO 用 beginTransaction 开启，commit 提交，rollBack 回滚。事务期间必须用同一个 PDO 连接。转账是最经典的事务场景。inTransaction 检查是否正在事务中。",
          code: "<?php\n\ntry {\n    $pdo->beginTransaction();\n    \n    // 扣钱\n    $stmt = $pdo->prepare(\"UPDATE accounts SET balance = balance - :amount WHERE id = :from\");\n    $stmt->execute([\":amount\" => 100, \":from\" => 1]);\n    \n    // 加钱\n    $stmt = $pdo->prepare(\"UPDATE accounts SET balance = balance + :amount WHERE id = :to\");\n    $stmt->execute([\":amount\" => 100, \":to\" => 2]);\n    \n    $pdo->commit();\n    echo \"转账成功\\n\";\n} catch (Exception $e) {\n    if ($pdo->inTransaction()) {\n        $pdo->rollBack();\n    }\n    echo \"转账失败: \" . $e->getMessage() . \"\\n\";\n}",
          language: "php",
          warning: "事务中不要执行耗时的非数据库操作，比如发邮件、调远程 API，会长时间持有锁。",
        },
        {
          title: "数据层封装",
          content: "在实际项目中不会直接用裸 PDO，通常会封装一个简单的查询类或使用 ORM。通过继承或组合封装增删改查通用操作，避免 SQL 散落在各处。如果要切换数据库或添加缓存、日志等横切逻辑，有封装层就好处理得多。",
          code: "<?php\n\nclass BaseModel {\n    protected PDO $pdo;\n    protected string $table;\n    \n    public function __construct(PDO $pdo) {\n        $this->pdo = $pdo;\n    }\n    \n    public function find(int $id): ?array {\n        $stmt = $this->pdo->prepare(\"SELECT * FROM {$this->table} WHERE id = :id\");\n        $stmt->execute([\":id\" => $id]);\n        return $stmt->fetch() ?: null;\n    }\n    \n    public function all(): array {\n        $stmt = $this->pdo->query(\"SELECT * FROM {$this->table}\");\n        return $stmt->fetchAll();\n    }\n    \n    public function create(array $data): int {\n        $columns = implode(\", \", array_keys($data));\n        $placeholders = \":\" . implode(\", :\", array_keys($data));\n        $stmt = $this->pdo->prepare(\"INSERT INTO {$this->table} ({$columns}) VALUES ({$placeholders})\");\n        $stmt->execute($data);\n        return (int) $this->pdo->lastInsertId();\n    }\n}\n\nclass User extends BaseModel {\n    protected string $table = \"users\";\n}\n\n$user = new User($pdo);\n$user->create([\"name\" => \"小红\", \"email\" => \"xh@qq.com\"]);",
          language: "php",
          tip: "实际项目推荐用 Laravel Eloquent 或 Doctrine ORM，不需要自己手写这套。",
        },
        {
          title: "常见安全问题",
          content: "数据库操作的安全漏洞排名第一就是 SQL 注入。黄金法则：所有用户输入都用预处理参数绑定。第二是错误信息泄露，生产环境绝不能把数据库错误直接展示给用户，用 try-catch 记日志展示友好提示。数据库权限也应最小化，Web 应用用专门的受限账户而不是 root。",
          code: "<?php\n\n// 生产环境配置\nini_set(\"display_errors\", \"0\");  // 不显示错误给用户\nerror_reporting(E_ALL);\n\n// 安全的查询写法\nfunction searchUsers(PDO $pdo, string $keyword): array {\n    $stmt = $pdo->prepare(\"SELECT * FROM users WHERE name LIKE :keyword\");\n    $stmt->execute([\":keyword\" => \"%{$keyword}%\"]);\n    return $stmt->fetchAll();\n}\n\n// 生产环境错误处理\ntry {\n    $pdo = new PDO($dsn, $user, $pass, [\n        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n    ]);\n} catch (PDOException $e) {\n    error_log($e->getMessage()); // 记录日志\n    die(\"服务暂时不可用，请稍后再试\");  // 友好提示\n}",
          language: "php",
          tip: "用最小权限原则：Web 应用只给 SELECT/INSERT/UPDATE/DELETE 权限，不要给 DROP/ALTER。",
        },
      ],
      quiz: [
        {
          question: "PDO 中准备语句的命名占位符格式？",
          options: ["?", "%s", ":name", "#name"],
          answer: 2,
          explanation: "命名占位符以冒号开头如 :email，语义更清晰推荐使用。",
        },
        {
          question: "预处理语句最重要的安全作用？",
          options: ["提高性能", "防止 SQL 注入攻击", "减少代码量", "自动建表"],
          answer: 1,
          explanation: "预处理将 SQL 逻辑和数据分离，用户输入不会被当作 SQL 执行。",
        },
        {
          question: "PDO 开启事务的方法是？",
          options: ["startTransaction", "beginTransaction", "transaction", "start"],
          answer: 1,
          explanation: "PDO::beginTransaction() 开启一个数据库事务。",
        },
        {
          question: "生产环境如何处理数据库错误？",
          options: ["直接显示错误给用户", "记日志后展示友好提示", "忽略错误", "只显示错误代码"],
          answer: 1,
          explanation: "错误详情记录到日志供开发排查，给用户展示不会泄露信息的友好提示。",
        },
      ],
    },
    "php-oop": {
      slug: "php-oop",
      sections: [
        {
          title: "类和对象基础",
          content: "PHP 从诞生起就支持面向对象，但随着版本迭代 OOP 特性越来越完善。用 class 定义类，new 创建对象，-> 访问属性和方法。$this 指当前对象，self:: 指当前类。构造函数 __construct 在 new 时自动调用，析构函数 __destruct 在对象销毁时调用。",
          code: "<?php\n\nclass User {\n    public string $name;\n    private int $age;\n    \n    public function __construct(string $name, int $age) {\n        $this->name = $name;\n        $this->age = $age;\n    }\n    \n    public function getAge(): int {\n        return $this->age;\n    }\n    \n    public function __destruct() {\n        echo \"{$this->name} 被销毁了\\n\";\n    }\n}\n\n$user = new User(\"小明\", 18);\necho $user->name;           // 小明\necho $user->getAge();       // 18",
          language: "php",
          tip: "PHP 8 引入了构造函数属性提升，__construct(public string $name) 一行代替声明加赋值。",
        },
        {
          title: "访问修饰符和继承",
          content: "PHP 有三种访问修饰符：public 到处都能访问，protected 自己和子类能访问，private 只有自己类内部能访问。继承用 extends，单继承。子类重写父类方法可以加 override 标注（PHP 8.3）。parent:: 调用父类方法。final 阻止继承或重写。",
          code: "<?php\n\nclass Animal {\n    protected string $name;\n    \n    public function __construct(string $name) {\n        $this->name = $name;\n    }\n    \n    public function speak(): string {\n        return \"...\";\n    }\n}\n\nclass Dog extends Animal {\n    public function speak(): string {\n        return parent::speak() . \" 汪汪\";\n    }\n    \n    public function getName(): string {\n        return $this->name; // protected 可以访问\n    }\n}\n\nfinal class Cat extends Animal {\n    // Cat 不能再被继承\n}\n\n$dog = new Dog(\"旺财\");\necho $dog->speak(); // ... 汪汪",
          language: "php",
        },
        {
          title: "抽象类和接口",
          content: "抽象类用 abstract 修饰，不能直接实例化，子类必须实现所有抽象方法。接口用 interface 定义，只声明方法签名不实现，类通过 implements 实现接口。PHP 支持多接口实现。接口是是什么的契约，抽象类是共享基础实现。",
          code: "<?php\n\ninterface Loggable {\n    public function log(): string;\n}\n\nabstract class BaseModel {\n    protected int $id;\n    \n    abstract public function table(): string;\n    \n    public function getId(): int {\n        return $this->id;\n    }\n}\n\nclass User extends BaseModel implements Loggable {\n    public function table(): string {\n        return \"users\";\n    }\n    \n    public function log(): string {\n        return \"用户 {$this->id} 操作记录\";\n    }\n}\n\n$user = new User();\necho $user->table(); // users\necho $user->log();   // 用户 0 操作记录",
          language: "php",
          tip: "PHP 支持多接口实现，用逗号分隔：class Foo implements A, B, C {}",
        },
        {
          title: "Trait 代码复用",
          content: "PHP 不能多继承，但可以用 Trait 在多个类之间共享方法。trait 定义一组方法，用 use 关键字引入类中。多个 trait 可以用逗号引入。冲突时用 insteadof 选择用哪个，as 起别名。Trait 解决了单继承的复用限制，比复制粘贴代码优雅。",
          code: "<?php\n\ntrait Timestamps {\n    public function createdAt(): string {\n        return date(\"Y-m-d H:i:s\");\n    }\n    \n    public function updatedAt(): string {\n        return date(\"Y-m-d H:i:s\");\n    }\n}\n\ntrait SoftDelete {\n    public function delete(): void {\n        echo \"软删除\\n\";\n    }\n}\n\nclass Article {\n    use Timestamps, SoftDelete;\n    \n    public string $title;\n}\n\n$article = new Article();\necho $article->createdAt(); // 2024-01-01 12:00:00\n$article->delete();         // 软删除",
          language: "php",
          tip: "Trait 适合横向的代码共享（如日志、时间戳、软删除），继承适合纵向的是否关系。",
        },
        {
          title: "魔术方法和命名空间",
          content: "PHP 的魔术方法以 __ 开头，在特定时机自动调用。__toString 转字符串，__get/__set 访问不存在的属性时触发，__call/__callStatic 调用不存在的方法时触发。命名空间 namespace 避免类名冲突，use 导入，类似 Python 的 import。",
          code: "<?php\n\nnamespace App\\Models;\n\nclass User {\n    private array $data = [];\n    \n    public function __get(string $name) {\n        return $this->data[$name] ?? null;\n    }\n    \n    public function __set(string $name, $value): void {\n        $this->data[$name] = $value;\n    }\n    \n    public function __toString(): string {\n        return json_encode($this->data);\n    }\n    \n    public static function __callStatic(string $name, array $args) {\n        echo \"调用不存在的静态方法: {$name}\\n\";\n    }\n}\n\n$user = new User();\n$user->email = \"test@qq.com\"; // __set 被调用\necho $user->email;             // __get 被调用\necho $user;                    // __toString 被调用\nUser::findByEmail(\"...\");      // __callStatic 被调用",
          language: "php",
          warning: "魔术方法会让代码变得隐晦，不要滥用。尤其是 __get/__set 会让 IDE 无法做自动补全。",
        },
      ],
      quiz: [
        {
          question: "PHP 中访问当前对象的属性用什么？",
          options: ["self->", "this->", "$this->", "$self->"],
          answer: 2,
          explanation: "PHP 用 $this-> 访问当前对象的属性和方法。",
        },
        {
          question: "PHP 中类可以实现几个接口？",
          options: ["1个", "2个", "3个", "多个"],
          answer: 3,
          explanation: "PHP 支持多接口实现，用逗号分隔多个接口。",
        },
        {
          question: "Trait 的主要作用？",
          options: ["替代类", "在多个类之间水平共享方法", "替代接口", "提高性能"],
          answer: 1,
          explanation: "Trait 让单继承的 PHP 能水平复用代码，多个类共享相同的方法集。",
        },
        {
          question: "PHP 8 构造函数属性提升有什么优势？",
          options: ["不写构造函数", "一行同时声明属性并赋值", "提高性能", "自动生成属性"],
          answer: 1,
          explanation: "构造函数属性提升用 __construct(public string $name) 一行替代属性声明 + 构造函数赋值。",
        },
      ],
    },
    "php-security": {
      slug: "php-security",
      sections: [
        {
          title: "SQL 注入防护",
          content: "SQL 注入是 PHP 圈最臭名昭著的安全漏洞。原理很简单：用户输入的数据被直接拼进 SQL 语句，用户恶意输入就可以改变 SQL 语句的逻辑。防护方法就是永远用预处理语句加参数绑定，不管是 PDO 还是 MySQLi 都支持。用户输入在进入 SQL 之前就和技术参数分开了。",
          code: "<?php\n\n// 危险写法 - 绝不用\n$name = $_GET[\"name\"];\n$result = $pdo->query(\"SELECT * FROM users WHERE name = '$name'\");\n// 用户输入 ' OR '1'='1 就完蛋了\n\n// 安全写法 - 永远用预处理\n$stmt = $pdo->prepare(\"SELECT * FROM users WHERE name = :name\");\n$stmt->execute([\":name\" => $_GET[\"name\"]]);\n\n// 动态排序字段 - 用白名单\n$allowed = [\"id\", \"name\", \"created_at\"];\n$sort = in_array($_GET[\"sort\"], $allowed) ? $_GET[\"sort\"] : \"id\";\n$result = $pdo->query(\"SELECT * FROM users ORDER BY {$sort}\");",
          language: "php",
          warning: "ORDER BY 和 GROUP BY 不能用占位符，只能先白名单校验再拼进去。",
        },
        {
          title: "XSS 跨站脚本攻击",
          content: "XSS 是攻击者往你的页面注入恶意 JavaScript 代码。防护核心：所有输出到 HTML 的数据都要转义。htmlspecialchars 把 < > & \" ' 转成 HTML 实体。模板引擎（Blade、Twig）默认就转义，裸 PHP 里要手动调用。用户提交的富文本要做白名单过滤。",
          code: "<?php\n\n// 输出到 HTML 时必须转义\necho htmlspecialchars($_GET[\"name\"], ENT_QUOTES, \"UTF-8\");\n\n// JavaScript 上下文里的转义（用在 <script> 里）\n$safeJson = json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS);\n\n// HTML 属性里的转义\n$attr = htmlspecialchars($value, ENT_COMPAT);\n\n// 设置安全的 Cookie\nsetcookie(\"session\", $value, [\n    \"httponly\" => true,   // JS 读不到\n    \"secure\" => true,     // 只通过 HTTPS 传\n    \"samesite\" => \"Lax\",  // 防 CSRF\n]);\n\n// CSP 响应头（在 PHP 里设置）\nheader(\"Content-Security-Policy: default-src 'self'\");",
          language: "php",
          tip: "设置 Cookie 的 httponly 标志后，即使有 XSS 漏洞攻击者也偷不到 Cookie。",
        },
        {
          title: "CSRF 跨站请求伪造",
          content: "CSRF 攻击利用了你已登录的身份，在你不知情的情况下发请求干坏事（比如转账）。防护方法：在每个表单加一个随机 token，提交时验证 token 对不对。Laravel 的 @csrf 和表单里的 csrf_field() 自动做了。AJAX 请求也要在 header 里带上 CSRF token。",
          code: "<?php\n\n// 生成 CSRF token\nsession_start();\nif (empty($_SESSION[\"csrf_token\"])) {\n    $_SESSION[\"csrf_token\"] = bin2hex(random_bytes(32));\n}\n\n// 表单里加隐藏字段\n// <form method=\"POST\">\n//   <input type=\"hidden\" name=\"csrf_token\" value=\"<?= $_SESSION['csrf_token'] ?>\">\n// </form>\n\n// 验证\nif ($_SERVER[\"REQUEST_METHOD\"] === \"POST\") {\n    if (!hash_equals($_SESSION[\"csrf_token\"], $_POST[\"csrf_token\"] ?? \"\")) {\n        die(\"CSRF token 验证失败\");\n    }\n}\n\n// AJAX 验证（Laravel 方式）\n// headers: { \"X-CSRF-TOKEN\": document.querySelector('meta[name=\"csrf-token\"]').content }",
          language: "php",
          tip: "用 hash_equals 比较 token 而不是 == ，因为 hash_equals 是恒定时间比较不会受到时序攻击。",
        },
        {
          title: "密码安全",
          content: "存密码绝对不能存明文！也不能用 MD5 或 SHA1，这些哈希算法太快了适合 GPU 暴力破解。应该用专门为密码设计的慢速哈希算法：bcrypt（推荐 cost>=10）或 Argon2。password_hash 自动选择最安全的算法并生成随机盐，password_verify 验证密码。",
          code: "<?php\n\n// 注册时加密密码\n$password = $_POST[\"password\"];\n$hash = password_hash($password, PASSWORD_BCRYPT, [\"cost\" => 12]);\n// 存入数据库: $hash\n\n// 登录时验证\n$inputPassword = $_POST[\"password\"];\n$storedHash = $userFromDb[\"password\"];\n\nif (password_verify($inputPassword, $storedHash)) {\n    echo \"登录成功\";\n} else {\n    echo \"密码错误\";\n}\n\n// 如果使用了更旧的 bcrypt cost，检查是否需要重新哈希\nif (password_needs_rehash($storedHash, PASSWORD_BCRYPT, [\"cost\" => 12])) {\n    $newHash = password_hash($inputPassword, PASSWORD_BCRYPT, [\"cost\" => 12]);\n    // 更新数据库\n}",
          language: "php",
          warning: "绝对不要自己设计密码存储方案。password_hash 已经是目前最安全的做法。",
        },
        {
          title: "文件上传安全",
          content: "文件上传是另一个攻击入口，攻击者可以上传 PHP 文件来执行服务器端代码。防护措施：验证文件 MIME 类型不要只看 $_FILES['type']（可以伪造），用 finfo 检测真正的文件类型；限制文件大小；用随机文件名存储；存在 Web 目录之外加个代理脚本读。",
          code: "<?php\n\n$allowed = [\"image/jpeg\", \"image/png\", \"application/pdf\"];\n$maxSize = 5 * 1024 * 1024; // 5MB\n\nif ($_FILES[\"file\"][\"error\"] === UPLOAD_ERR_OK) {\n    // 检测真正的 MIME 类型\n    $finfo = new finfo(FILEINFO_MIME_TYPE);\n    $mime = $finfo->file($_FILES[\"file\"][\"tmp_name\"]);\n    \n    if (!in_array($mime, $allowed)) {\n        die(\"不允许的文件类型\");\n    }\n    \n    if ($_FILES[\"file\"][\"size\"] > $maxSize) {\n        die(\"文件太大了\");\n    }\n    \n    // 随机文件名 + 保留扩展名\n    $ext = pathinfo($_FILES[\"file\"][\"name\"], PATHINFO_EXTENSION);\n    $newName = bin2hex(random_bytes(16)) . \".\" . $ext;\n    \n    // 存到 web 目录外\n    $uploadDir = \"/var/uploads/\";\n    move_uploaded_file($_FILES[\"file\"][\"tmp_name\"], $uploadDir . $newName);\n}",
          language: "php",
          warning: "不要用 $_FILES['file']['type'] 判断文件类型，这个是客户端发的可以伪造。",
        },
      ],
      quiz: [
        {
          question: "防止 SQL 注入最可靠的方法？",
          options: ["过滤输入", "预处理 + 参数绑定", "用 mysqli", "写正则验证"],
          answer: 1,
          explanation: "预处理语句将 SQL 逻辑和用户数据分离，是防范 SQL 注入的最有效方法。",
        },
        {
          question: "PHP 中 htmlspecialchars 的作用？",
          options: ["美化 HTML", "把特殊字符转为 HTML 实体防 XSS", "压缩 HTML", "加密 HTML"],
          answer: 1,
          explanation: "htmlspecialchars 把 < > & \" 转为安全实体，阻止浏览器解析为 HTML/JS 代码。",
        },
        {
          question: "password_hash 的优势？",
          options: ["加密快", "自动使用安全的算法并生成随机盐", "密码可逆", "兼容 MD5"],
          answer: 1,
          explanation: "password_hash 自动选择 bcrypt/Argon2，内置随机盐，抵抗彩虹表和暴力破解。",
        },
        {
          question: "CSRF token 验证时用什么函数比较 token 最安全？",
          options: ["==", "strcmp", "hash_equals", "===="],
          answer: 2,
          explanation: "hash_equals 是恒定时间字符串比较，防止攻击者通过响应时间差异猜测 token。",
        },
      ],
    },
    "postgresql-intro": {
      slug: "postgresql-intro",
      sections: [
        {
          title: "PostgreSQL 跟 MySQL 有什么不一样",
          content: "PostgreSQL（简称 PG）和 MySQL 是两大开源数据库，但设计理念差别挺大。PG 追求标准和功能完备，MySQL 追求简单和速度。\n\nPG 的优势：对 SQL 标准的支持更完整；有真正的全文搜索、地理空间数据（PostGIS）、JSONB（比 MySQL 的 JSON 强太多了）；复制方式多；窗口函数和 CTE 更成熟。\n\nMySQL 的优势：读多写少的场景简单粗暴；几百万访问量的网站用 MySQL 够用；PHP 时代积累的生态太好。\n\n选型建议：新项目没有历史包袱选 PG。需要地理信息选 PG。简单 CRUD Web 应用 MySQL 足够。",
          code: "-- PG 和 MySQL 都支持标准 SQL，但细节有差异\n-- PG: SERIAL 自增，MySQL: AUTO_INCREMENT\n-- PG: TEXT 无限制，MySQL: VARCHAR/TEXT\n-- PG: 严格模式默认开启，MySQL: 需手动配置",
          language: "sql",
        },
        {
          title: "安装与 psql 客户端",
          content: "psql 是 PG 的命令行客户端，相当于 MySQL 的 mysql 命令。它比 mysql 强大不少——支持自动补全、语法高亮、反斜杠开头的元命令特别好用。\n\n装好 PG 后直接用 psql 连上：psql -U postgres -d mydb。进去后反斜杠 dt 看所有表，反斜杠 d 表名 看表结构，反斜杠 l 列所有数据库，反斜杠 du 列所有用户。\n\nPG 的用户和数据库是强绑定的——默认情况下同名用户可以免密登录同名数据库。Peer 认证（本机用操作系统用户验证）是 PG 的默认方式。",
          code: "# Ubuntu 安装\nsudo apt install postgresql postgresql-contrib\n\n# 切换到 postgres 用户\nsudo -u postgres psql\n\n# psql 元命令\n\\l          # 数据库中所有表\n\\c mydb     # 切换到 mydb\n\\dt         # 所有表\n\\d users    # users 表结构\n\\du         # 所有用户\n\\q          # 退出",
          language: "bash",
        },
        {
          title: "JSONB 数据类型",
          content: "JSONB 是 PG 的杀手级特性——在关系型数据库里给你 NoSQL 的体验。它把 JSON 数据以二进制格式存储，既能存不规则的文档数据，又能建索引快速查询。\n\n跟 MySQL 的 JSON 比：JSONB 支持 GIN 索引（查询飞快）、支持 JSONPath 查询、支持部分更新。PG 的 JSONB 比 MySQL 的 JSON 类型稳定得多。\n\n什么时候用 JSONB？配置数据（每行字段不一样）、API 返回的原始数据（先存下来再说）、用户自定义属性（不同用户有不同字段）。但不适合当主键、不适合频繁 JOIN。",
          code: "-- 建 JSONB 列\nCREATE TABLE products (\n  id SERIAL PRIMARY KEY,\n  name TEXT,\n  attributes JSONB\n);\n\n-- 插入数据\nINSERT INTO products (name, attributes)\nVALUES ('iPhone', '{\"color\": \"blue\", \"storage\": 256}');\n\n-- JSONB 查询\nSELECT * FROM products WHERE attributes->>'color' = 'blue';\nSELECT * FROM products WHERE attributes @> '{\"storage\": 256}';\n\n-- 给 JSONB 建索引\nCREATE INDEX idx_attrs ON products USING GIN (attributes);",
          language: "sql",
          tip: "GIN 索引对包含、存在键这些操作符有效。普通等于不需要 GIN，B-tree 就行。",
        },
        {
          title: "窗口函数与 CTE",
          content: "PG 的窗口函数写法跟 MySQL 一样（都是 SQL 标准），但 PG 的实现更完整。\n\nCTE（Common Table Expression，WITH 子句）是 PG 的一大亮点。它让你把一个查询定义为临时的虚拟表，后面可以在主查询里多次引用。比子查询清晰，比临时表轻量。\n\nPG 的 CTE 还能做递归查询——查组织架构树、分类树、评论回复树。语法是 WITH RECURSIVE，逐层展开。这在处理树形数据时特别实用。",
          code: "-- CTE 基本用法\nWITH dept_avg AS (\n  SELECT department, AVG(salary) AS avg_sal\n  FROM employees GROUP BY department\n)\nSELECT e.name, e.salary, d.avg_sal\nFROM employees e JOIN dept_avg d ON e.department = d.department\nWHERE e.salary > d.avg_sal;\n\n-- 递归 CTE\nWITH RECURSIVE org_tree AS (\n  SELECT id, name, manager_id, 1 AS level\n  FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.id, e.name, e.manager_id, t.level + 1\n  FROM employees e JOIN org_tree t ON e.manager_id = t.id\n)\nSELECT * FROM org_tree;",
          language: "sql",
        },
        {
          title: "PG 特有的高级特性",
          content: "PG 有一些 MySQL 没有或不如的高级特性：\n\n物化视图——把查询结果存成物理表，定期刷新。复杂报表不想每次都跑时特别好用。\n\n表继承——子表可以继承父表的列，查询父表时自动包含子表数据。做分区表和历史数据归档很实用。\n\n全文搜索——内置 tsvector 和 tsquery 类型，支持中文分词（需装扩展），不用单独搭 Elasticsearch 就能完成搜索。\n\n扩展系统——PG 有超丰富的扩展：PostGIS（地理信息）、pgcrypto（加密）、uuid-ossp（UUID 生成）、pg_stat_statements（查询统计）。装扩展就一句 CREATE EXTENSION。",
          code: "-- 物化视图\nCREATE MATERIALIZED VIEW monthly_sales AS\nSELECT DATE_TRUNC('month', created_at) AS month, SUM(amount)\nFROM orders GROUP BY month;\nREFRESH MATERIALIZED VIEW monthly_sales;\n\n-- 安装扩展\nCREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";\nCREATE EXTENSION IF NOT EXISTS \"pg_stat_statements\";",
          language: "sql",
          tip: "pg_stat_statements 是 PG 的性能分析神器——记录所有 SQL 的执行统计，相当于 MySQL 的 performance_schema。",
        },
      ],
      quiz: [
        {
          question: "PG 相比 MySQL，JSONB 的主要优势是？",
          options: ["存储更小", "支持 GIN 索引快速查询", "不需要建表", "能替代关系型存储"],
          answer: 1,
          explanation: "JSONB 支持 GIN 索引，对 JSON 内容的查询可以走索引。MySQL JSON 列也能建索引但灵活度不如 PG。",
        },
        {
          question: "psql 的反斜杠 dt 命令干什么的？",
          options: ["删除表", "列出所有表", "查看表结构", "切换数据库"],
          answer: 1,
          explanation: "反斜杠 dt 是 psql 的元命令，列出当前数据库里所有的表。",
        },
        {
          question: "CTE 和子查询最大的不同？",
          options: ["CTE 更快", "CTE 可以多次引用且支持递归", "子查询不能用在 FROM 里", "都一样"],
          answer: 1,
          explanation: "CTE 定义一次，主查询里可以多次用。CTE 还支持递归，子查询不行。",
        },
        {
          question: "物化视图和普通视图的区别？",
          options: ["没区别", "物化视图把结果存成物理表", "物化视图自动更新", "普通视图更快"],
          answer: 1,
          explanation: "普通视图只是保存 SQL 定义，每次查都重新跑。物化视图把结果固化下来，查得快但需要手动刷新。",
        },
        {
          question: "PG 的扩展怎么装？",
          options: ["下载源码编译", "CREATE EXTENSION 扩展名", "改配置文件", "需要付费"],
          answer: 1,
          explanation: "一行 CREATE EXTENSION 搞定大部分扩展，前提是该扩展已经在系统上安装了。",
        },
      ],
    },
    "react-performance": {
      slug: "react-performance",
      sections: [
        {
          title: "React 为什么会重渲染",
          content: "React 的重渲染机制：当 state 或 props 变了，组件就要重新执行得到新的虚拟 DOM，然后跟旧的虚拟 DOM 比较（reconciliation），如果有变化就更新真实 DOM。\n\n触发重渲染的三种情况：\n1. 组件自己的 state 变了——这是正常的。\n2. 父组件重渲染了——子组件哪怕 props 没变也会跟着重渲染。这是 React 的默认行为，不是 bug。\n3. 消费的 Context value 变了——所有用到这个 Context 的组件都要重渲染。\n\n性能优化的思路不是阻止渲染（渲染本身很快），而是避免不必要的渲染导致的大规模虚拟 DOM 比较。大部分情况 React 已经够快了——先测量再优化。\n\nReact DevTools 的 Profiler 能帮你看到哪个组件渲染了、花了多少毫秒。React.memo、useMemo、useCallback 是针对特定场景的工具，不是到处都撒。",
          code: "// 父组件渲染 → 子组件一定渲染（默认）\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)}>+</button>\n      <Child name=\"Alice\" />  {/* 虽然 props 没变，Parent 渲染 Child 也渲染 */}\n    </div>\n  );\n}",
          language: "jsx",
        },
        {
          title: "React.memo——跳过 props 没变的渲染",
          content: "React.memo 是一个高阶组件——它包裹你的组件，在 props 没变时跳过渲染。React 会浅比较（shallow compare）前后的 props 对象。\n\n但 React.memo 不是免费的——每次都要比较 props 也是有开销的。只在以下场景用：\n1. 组件渲染开销大（如渲染了几百个子元素）\n2. props 经常不变但父组件频繁渲染\n3. 传给 memo 组件的 props 本身需要稳定（用 useMemo/useCallback 包裹）\n\nReact.memo(MyComponent, arePropsEqual?)——可以传第二个参数自定义比较函数。返回 true 表示 props 一样不需要渲染。\n\n注意：给 memo 组件传内联对象或函数（如 { name: 'Alice' } 或 () => {}），每次都是新引用，memo 比较失效。",
          code: "const ExpensiveList = React.memo(function ExpensiveList({ items }) {\n  return (\n    <ul>\n      {items.map(item => <li key={item.id}>{item.name}</li>)}\n    </ul>\n  );\n});\n\n// 父组件里用 useMemo 确保 items 引用稳定\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  const items = useMemo(() => [{ id: 1, name: 'Alice' }], []);\n\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)}>{count}</button>\n      <ExpensiveList items={items} />\n    </div>\n  );\n}",
          language: "jsx",
          tip: "传内联对象给 memo 组件等于白 memo——每次渲染对象是新引用，浅比较永远不等。用 useMemo 稳定引用。",
        },
        {
          title: "useMemo 与 useCallback——缓存值和函数",
          content: "useMemo——缓存计算结果。如果依赖项没变，每次渲染都返回同一个缓存值。适合计算成本高的操作（大数组过滤排序、复杂数学运算）。\n\nuseCallback——缓存函数引用。它是 useMemo(fn, deps) 的语法糖——useCallback(fn, deps) 等于 useMemo(() => fn, deps)。\n\n实际使用时要注意：\n1. 不要什么值都 useMemo——简单计算（加减乘除、字符串拼接）不需要缓存。useMemo 本身有开销。\n2. useCallback 的主要用途是给 memo 子组件传稳定的回调函数。如果没有配合 React.memo，useCallback 基本没收益。\n3. 依赖项一定要写全——ESLint 的 react-hooks/exhaustive-deps 规则会提醒你。漏写 deps 可能导致 bug。",
          code: "// useMemo——缓存昂贵的过滤结果\nfunction FilteredList({ users, filterText }) {\n  const filteredUsers = useMemo(() => {\n    return users.filter(u =>\n      u.name.toLowerCase().includes(filterText.toLowerCase())\n    );\n  }, [users, filterText]);\n\n  return <ul>{filteredUsers.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}\n\n// useCallback——稳定回调给 memo 子组件\nfunction Parent() {\n  const handleClick = useCallback(() => {\n    console.log('clicked');\n  }, []); // 依赖为空，函数引用永远不变\n\n  return <MemoButton onClick={handleClick} />;\n}\n\nconst MemoButton = React.memo(function Button({ onClick }) {\n  console.log('Button rendered');\n  return <button onClick={onClick}>Click</button>;\n});",
          language: "jsx",
          tip: "useMemo 和 useCallback 不要无脑加。只有当确实有性能问题时才用。React 官方也建议「先写再测再优化」。",
        },
        {
          title: "懒加载——React.lazy 与 Suspense",
          content: "React.lazy 让组件按需加载——只在第一次被渲染时才下载对应的 JS 文件。这能大幅减少初始加载的包体积。\n\n用法：const MyComponent = React.lazy(() => import('./MyComponent'))。配合 Suspense 在加载中时显示 loading 界面。\n\n常见做法：路由级别的代码分割——每个 Route 的 element 都是一个 lazy 加载的组件。首页只加载首页的代码，用户点了其他页面才加载对应代码。\n\nSuspense 的 fallback 可以是任何 React 组件。加载快的话 flashing 问题——用 startTransition 让旧页面多留一会，用户体验更好。\n\n另外可以用 loadable-components（第三方库）做更高级的懒加载（服务端渲染友好、支持预加载）。",
          code: "import { lazy, Suspense } from 'react';\n\n// 懒加载路由组件\nconst Home = lazy(() => import('./pages/Home'));\nconst UserDetail = lazy(() => import('./pages/UserDetail'));\nconst Settings = lazy(() => import('./pages/Settings'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<div className=\"loading\">Loading...</div>}>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/users/:id\" element={<UserDetail />} />\n        <Route path=\"/settings\" element={<Settings />} />\n      </Routes>\n    </Suspense>\n  );\n}",
          language: "jsx",
          tip: "lazy 只能用在组件渲染的结果上。如果有多个兄弟组件，可以各自有自己的 Suspense，各自独立 loading。",
        },
        {
          title: "列表渲染的性能——key 与虚拟滚动",
          content: "列表渲染是 React 里最容易出性能问题的地方：\n\nkey 的重要性——React 用 key 来追踪列表里的每一项。key 应该是一个稳定唯一的 ID（如数据库 ID），千万不要用数组索引（index）。用 index 的话，列表顺序变了会导致 React 错误地匹配元素，轻则渲染不对，重则输入框内容错位。\n\n虚拟滚动——如果列表有几千上万项，不能一次性渲染全部 DOM。用虚拟滚动库（react-window、react-virtuoso）只渲染可视区域的内容。页面看着是一个长长的列表，实际 DOM 里只有几十个元素。\n\n列表里的 inline function——map 里面 onClick={() => handleClick(item.id)} 每次渲染创建新函数。虽然不是大问题，但如果列表很大且跟 React.memo 配合，考虑把 item.id 存到 DOM 的 data 属性里，统一用事件委托处理。",
          code: "// key 用 index 的坑\n// 不要在列表顺序可变时用 index\n{items.map((item, index) => (\n  <li key={index}>{item.name}</li>  // 顺序变了 key 对不上！\n))}\n\n// 正确的做法\n{items.map(item => (\n  <li key={item.id}>{item.name}</li>\n))}\n\n// 虚拟滚动\nimport { FixedSizeList } from 'react-window';\n\nfunction BigList({ items }) {\n  return (\n    <FixedSizeList\n      height={600}\n      itemCount={items.length}\n      itemSize={50}\n    >\n      {({ index, style }) => (\n        <div style={style}>{items[index].name}</div>\n      )}\n    </FixedSizeList>\n  );\n}",
          language: "jsx",
          tip: "react-window 把几千 DOM 节点缩减到几十。不仅渲染快，内存占用也小。但虚拟滚动的每个 item 都应该是定高的（或用动态高度模式）。",
        },
      ],
      quiz: [
        {
          question: "父组件渲染，子组件一定会跟着渲染吗？",
          options: ["不会——子组件自己决定", "会——默认行为！React.memo 可以拦截", "只有 props 变了才会", "只有 state 变了才会"],
          answer: 1,
          explanation: "React 默认父组件渲染时所有子组件都递归渲染。React.memo 是唯一阻止这种连带渲染的方式（前提是 props 没变）。",
        },
        {
          question: "React.memo 比较 props 的方式是？",
          options: ["深比较", "浅比较", "比较引用地址", "不比较直接跳过"],
          answer: 1,
          explanation: "React.memo 默认用浅比较——每个 prop 用 Object.is 比较。如果 props 里传了对象/函数，每次都是新引用，浅比较会发现不等。",
        },
        {
          question: "列表里 key 用数组 index 有什么问题？",
          options: ["没问题", "列表顺序变化时 React 可能错误复用组件状态", "key 会重复", "index 不是唯一的"],
          answer: 1,
          explanation: "用 index 当 key 的话，列表顺序变了 index 跟之前的元素对不上。React 会错误匹配，导致渲染不对和输入状态错位。",
        },
        {
          question: "React.lazy 配合什么组件使用？",
          options: ["ErrorBoundary", "Suspense", "Fragment", "Context"],
          answer: 1,
          explanation: "Suspense 是懒加载的搭档——组件还在下载时显示 fallback（loading 界面）。这是 React 的 Suspense 架构的基础用法。",
        },
        {
          question: "useMemo 和 useCallback 应该在什么情况下用？",
          options: ["所有变量和函数都要用", "只在真正有性能问题时用", "只在函数组件中用", "只在类组件中用"],
          answer: 1,
          explanation: "这两个 hook 不是免费的——它们自己也有开销。React 官方建议先写代码，遇到性能瓶颈再用 Profiler 测量，确认需要再优化。",
        },
      ],
    },
    "react-router": {
      slug: "react-router",
      sections: [
        {
          title: "React Router v6 的基本概念",
          content: "React Router 是 React 事实上的路由标准。v6 相比 v5 有了重大变化——API 更简洁、路由匹配更智能、全面拥抱 React Hooks。\n\n核心组件：\nBrowserRouter——包裹整个应用，提供浏览器历史记录。\nRoutes——路由表容器，里面是一堆 Route。\nRoute——定义路径和组件的映射。path 是 URL 路径，element 是渲染的组件。\nLink——导航链接，点击不刷新页面。相当于 a 标签但不会重新加载。\nOutlet——子路由的插槽。父路由组件里放一个 Outlet，子路由组件就渲染在那里。\n\nuseParams——在组件里读取 URL 参数（如 /user/:id 中的 id）。\nuseNavigate——编程式导航，跳转到指定路径。\nuseLocation——获取当前 URL 信息。",
          code: "import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to=\"/\">Home</Link>\n        <Link to=\"/users\">Users</Link>\n      </nav>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/users\" element={<UserList />} />\n        <Route path=\"/users/:id\" element={<UserDetail />} />\n        <Route path=\"*\" element={<NotFound />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n\nfunction UserDetail() {\n  const { id } = useParams();\n  return <div>User: {id}</div>;\n}",
          language: "jsx",
        },
        {
          title: "嵌套路由——Layout 布局模式",
          content: "嵌套路由是 React Router v6 最强大的特性之一。你可以在父路由里定义共享的 Layout，子路由的内容通过 Outlet 渲染在 Layout 里的某个位置。\n\n典型场景：后台管理系统——侧边栏和顶部导航是共用的，中间内容区根据路由变化。\n\n嵌套路由的写法：父 Route 不设 path（或设为共享前缀），子 Route 直接写在父 Route 里面。子路由的 path 是相对路径，自动拼接。\n\nOutlet 是子路由的占位符。Layout 组件里放一个 Outlet，子路由匹配到的组件就在这渲染。\n\nuseOutletContext——父路由可以通过 Outlet context prop 传数据给子路由。比 Context 更直接。",
          code: "// 嵌套路由——后台管理系统布局\nfunction AdminLayout() {\n  return (\n    <div className=\"admin\">\n      <Sidebar />\n      <div className=\"content\">\n        <Outlet />\n      </div>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <Routes>\n      <Route path=\"/\" element={<Home />} />\n      <Route path=\"/admin\" element={<AdminLayout />}>\n        <Route index element={<Dashboard />} />\n        <Route path=\"users\" element={<Users />} />\n        <Route path=\"users/:id\" element={<UserEdit />} />\n        <Route path=\"settings\" element={<Settings />} />\n      </Route>\n    </Routes>\n  );\n}\n// /admin → Dashboard\n// /admin/users → Users\n// /admin/users/1 → UserEdit",
          language: "jsx",
          tip: "index 路由是父路径精确匹配时渲染的默认子路由。Route index 不加 path，只在父路径完全匹配时显示。",
        },
        {
          title: "路由守卫——权限控制",
          content: "实际项目里不是所有页面都能公开访问。需要登录的页面要加路由守卫——没登录就重定向到登录页。\n\n实现方式：写一个 ProtectedRoute 组件包裹需要保护的路由。在组件里检查是否登录（从 Context/Zustand/Redux 里拿用户状态），没登录就 Navigate 到登录页。\n\nv6 的做法不是装饰器式的，而是用元素包裹：element={<ProtectedRoute><Dashboard /></ProtectedRoute>}。\n\n更灵活的方案是用一个配置数组定义路由表，每个路由项加 requiresAuth 标记。统一遍历生成路由。",
          code: "// 路由守卫组件\nfunction ProtectedRoute({ children }) {\n  const user = useAuthStore(s => s.user);\n\n  if (!user) {\n    return <Navigate to=\"/login\" replace />;\n  }\n\n  return children;\n}\n\n// 使用\n<Routes>\n  <Route path=\"/login\" element={<Login />} />\n  <Route path=\"/dashboard\" element={\n    <ProtectedRoute>\n      <Dashboard />\n    </ProtectedRoute>\n  } />\n</Routes>\n\n// 或者用布局路由统一保护\n<Route element={<ProtectedRoute />}>\n  <Route path=\"/dashboard\" element={<Dashboard />} />\n  <Route path=\"/settings\" element={<Settings />} />\n</Route>",
          language: "jsx",
        },
        {
          title: "编程式导航与参数传递",
          content: "useNavigate 返回一个 navigate 函数，可以编程跳转——表单提交后跳到成功页、按钮点击跳转。\n\n跳转方式：\nnavigate('/path')——直接跳到目标路径。\nnavigate(-1)——后退一页。\nnavigate('/path', { replace: true })——替换当前历史记录而不是新增（用户按后退不会回到当前页）。\nnavigate('/path', { state: { data } })——传递状态给目标页面。\n\n接收 state——目标页面用 useLocation() 获取 location.state。但注意：直接访问 URL（不是从导航跳转来的）时 state 是 null。\n\nURL 参数（useParams）比 state 更可靠——参数存在 URL 里，刷新后还在。state 存在浏览器的 history 里，刷新可能会丢。",
          code: "function SubmitForm() {\n  const navigate = useNavigate();\n\n  const handleSubmit = async (data) => {\n    await saveData(data);\n    navigate('/success', { state: { message: '保存成功' } });\n  };\n\n  return <form onSubmit={...}>...</form>;\n}\n\nfunction SuccessPage() {\n  const location = useLocation();\n  const message = location.state?.message || '操作成功';\n\n  return <div>{message}</div>;\n}\n\n// 后退\n// navigate(-1);",
          language: "jsx",
          tip: "URL 参数是持久化的（刷新还在），state 是临时的。需要刷新后还能继续的信息放 URL 参数而不是 state。",
        },
        {
          title: "React Router v6 的常见问题",
          content: "1. BrowserRouter vs HashRouter——BrowserRouter 需要服务器配置（所有路径返回 index.html），HashRouter 不需要但 URL 里会有 #。生产环境推荐 BrowserRouter。\n\n2. 路由不匹配——v6 的路由匹配默认精确。/users 不会匹配 /users/123，除非你在 /users 路由下写了一个相对路由。\n\n3. 404 页面——用 Route path=\"*\" 兜底，匹配所有不认识的路径。\n\n4. 相对路径 & 绝对路径——Link to=\"about\" 是相对于当前路径，Link to=\"/about\" 是绝对路径。嵌套路由里容易搞混。\n\n5. useSearchParams——获取和设置 URL 的查询参数（?key=value）。像 useState 一样用。",
          code: "// HashRouter 不需要服务端配置\nimport { HashRouter } from 'react-router-dom';\n\n// 404 兜底\n<Route path=\"*\" element={<NotFound />} />\n\n// useSearchParams\nfunction SearchPage() {\n  const [searchParams, setSearchParams] = useSearchParams();\n  const keyword = searchParams.get('q') || '';\n\n  return (\n    <input\n      value={keyword}\n      onChange={e => setSearchParams({ q: e.target.value })}\n    />\n  );\n}",
          language: "jsx",
          tip: "BrowserRouter 需要 Nginx 配 try_files $uri /index.html。不然直接访问 /users/123 会 404。HashRouter 不需要但 URL 不够干净。",
        },
      ],
      quiz: [
        {
          question: "React Router v6 的 Outlet 组件是什么？",
          options: ["导航链接", "子路由的插槽——子路由匹配的组件渲染在这", "路由参数", "HTML 标签"],
          answer: 1,
          explanation: "Outlet 是嵌套路由的占位符。父 Layout 组件里放 Outlet，当前匹配的子路由的 element 就渲染在 Outlet 的位置。",
        },
        {
          question: "useParams 和 useLocation().state 的区别？",
          options: ["一样", "useParams 从 URL 路径读参数（持久），state 从导航传参（临时）", "useParams 返回对象，state 返回字符串", "useParams 更慢"],
          answer: 1,
          explanation: "URL 参数存在 URL 路径里（如 /user/123 的 123），刷新后还在。state 在浏览器 history 里跳转时传递，直接输入 URL 访问时是 null。",
        },
        {
          question: "路由守卫（ProtectedRoute）的核心逻辑是什么？",
          options: ["检查 URL 是否正确", "检查用户是否登录，未登录重定向到登录页", "检查组件是否渲染", "检查路由参数"],
          answer: 1,
          explanation: "路由守卫组件检查认证状态。如果没登录就返回 Navigate to=\"/login\"，登录了就渲染 children。",
        },
        {
          question: "BrowserRouter 跟 HashRouter 选哪个？",
          options: ["HashRouter 功能更多", "BrowserRouter URL 干净现代但需要服务端配置，HashRouter 不需要但 URL 带 #", "两个一模一样", "BrowserRouter 已废弃"],
          answer: 1,
          explanation: "BrowserRouter 的 URL 是正常的路径形式，但需要服务器把所有路径都返回 index.html。HashRouter 的 URL 里有 #，天然不需要服务端配合。",
        },
        {
          question: "index 路由是什么意思？",
          options: ["首页路由", "父路径精确匹配时渲染的默认子路由", "第一个定义的路由", "根路由"],
          answer: 1,
          explanation: "Route index 不加 path，在父路由的路径被精确匹配时渲染。相当于目录里自动打开的 index.html。",
        },
      ],
    },
    "react-state": {
      slug: "react-state",
      sections: [
        {
          title: "状态管理怎么选——不是越复杂越好",
          content: "React 的状态管理从简单到复杂有不同方案，关键是根据实际需要选而不是追热门：\n\nuseState——组件内部的状态。最基础，适合单个组件的简单状态。\nuseReducer——useState 的升级版，用 reducer 函数管理复杂状态逻辑。多个子值相互依赖时比 useState 清晰。\nContext API——跨组件共享状态，不用一层层传 props。但性能上 Context 值变了所有消费者都重渲染。\nZustand——轻量外部状态库，API 极简没有 Provider 包裹、没有样板代码。适合中小项目。\nRedux Toolkit——完整的状态管理方案，有 DevTools、中间件、异步处理。适合大型项目和团队协作。\n\n一般来说：小项目 Zustand 够用，中项目 Context + useReducer 够用，大项目考虑 Redux Toolkit。不要上来就 Redux。",
          language: "javascript",
        },
        {
          title: "useState 与 useReducer——局”，状态管理",
          content: "useState 是最简单的状态 hook：const [value, setValue] = useState(initialValue)。setValue 触发重渲染。\n\nuseReducer 适用场景：状态逻辑复杂（多个状态相互依赖）、下一个状态依赖上一个状态。写法：const [state, dispatch] = useReducer(reducer, initialState)。reducer 是纯函数 (state, action) => newState。\n\n什么时候该用 useReducer 而不是 useState：\n1. 一个操作要同时改多个状态（如表单提交后清空成功消息和表单值）\n2. 下一个状态需要基于上一个状态计算（如计数器、分步表单）\n3. 状态更新逻辑需要被测试（reducer 是纯函数，单元测试很容易写）",
          code: "// useState\nconst [count, setCount] = useState(0);\n// 基于前一个值更新\nsetCount(prev => prev + 1);\n\n// useReducer\nconst reducer = (state, action) => {\n  switch (action.type) {\n    case 'increment':\n      return { ...state, count: state.count + 1 };\n    case 'decrement':\n      return { ...state, count: state.count - 1 };\n    case 'setName':\n      return { ...state, name: action.payload };\n    default:\n      return state;\n  }\n};\n\nconst [state, dispatch] = useReducer(reducer, {\n  count: 0,\n  name: ''\n});",
          language: "javascript",
        },
        {
          title: "Context API——跨组件共享数据",
          content: "Context 解决的是 props drilling 问题——父组件要给很深的子组件传数据，中间每一层都要转发 props。Context 让你在组件树里创建一个数据隧道。\n\n三步：createContext 建一个 context；在父组件用 Provider 提供数据；在子组件用 useContext 读取数据。\n\nContext 的局限：Provider 的值变了，所有用到这个 Context 的组件都会重新渲染——即使它们只用了 Context 里某个没变的值。解决方法：拆分 Context（把不同关注点的状态放不同 Context）；或用 useMemo 记忆传给 Context 的值。\n\nContext 不等于状态管理——它只是依赖注入机制。实际的状态管理（更新、派生）还需要 useState 或外部库。Context 负责传递，状态管理库负责存储和更新。",
          code: "// 创建 Context\nconst ThemeContext = createContext('light');\n\n// 提供数据\nfunction App() {\n  const [theme, setTheme] = useState('light');\n  const value = useMemo(() => ({ theme, setTheme }), [theme]);\n\n  return (\n    <ThemeContext.Provider value={value}>\n      <MainContent />\n    </ThemeContext.Provider>\n  );\n}\n\n// 消费数据\nfunction Button() {\n  const { theme, setTheme } = useContext(ThemeContext);\n  return (\n    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>\n      Current: {theme}\n    </button>\n  );\n}",
          language: "jsx",
          tip: "Context 的值每次渲染都是新对象的话（即使内容没变），消费者也会全部重渲染。用 useMemo 缓存 context value 对象。",
        },
        {
          title: "Zustand——轻量状态库入门",
          content: "Zustand 是当下 React 社区最受青睐的轻量状态库之一。它最吸引人的是没有 Provider 包裹、没有样板代码、API 就是调用函数。\n\n核心概念：create 函数创建一个 store，里面定义了状态和修改状态的方法。组件里直接调用 useStore(selector) 拿需要的部分。\n\nselector 的作用——只选择你需要的状态。Zustand 只在 selector 返回的值变化时才重渲染组件，避免了 Context 的全量渲染问题。\n\n异步操作也很直接——store 的方法可以是 async 函数的。直接 async set 就行，不需要中间件。\n\n对比 Redux：Zustand 不需要 reducer、dispatch、action 这些概念。定义状态和方法，直接在组件里用。代码少很多。",
          code: "// Zustand store\nimport { create } from 'zustand';\n\nconst useCounterStore = create((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n  decrement: () => set((state) => ({ count: state.count - 1 })),\n  reset: () => set({ count: 0 }),\n}));\n\n// 组件里使用\nfunction Counter() {\n  const count = useCounterStore((s) => s.count);\n  const increment = useCounterStore((s) => s.increment);\n\n  return (\n    <div>\n      <span>{count}</span>\n      <button onClick={increment}>+</button>\n    </div>\n  );\n}",
          language: "jsx",
          tip: "Zustand 的 selector 是默认浅比较的——只有你选出来的值变了才重渲染。不需要像 Context 那样手动 useMemo。",
        },
        {
          title: "什么时候需要全局状态、什么时候不需要",
          content: "不是所有状态都要拉成全局状态。很多状态放在组件内部就够了：\n\n组件内部状态——只有这一个组件需要关心的数据。比如表单输入值、展开/收起状态、弹窗的显示。用 useState。\n\n组件树共享状态——父子组件之间传 props 就行。如果只传 1~2 层，不要因为怕 prop drilling 就上全局状态。\n\n全局状态——多个完全无关的组件需要共享的数据。比如用户登录信息、主题设置、购物车。这种才放到全局状态里。\n\n服务器状态——API 返回的数据（用户列表、订单详情）。不要手动存到 Redux/Zustand 里自己管理缓存。用 React Query 或 SWR——它们自带缓存、重新获取、乐观更新。\n\n表单状态——表单的复杂状态用 React Hook Form 比手动 useReducer 好得多。它是表单领域的专项工具。",
          code: "// 服务器状态——用 React Query，不要手动管理\nimport { useQuery } from '@tanstack/react-query';\n\nfunction UserList() {\n  const { data, isLoading } = useQuery({\n    queryKey: ['users'],\n    queryFn: () => fetch('/api/users').then(r => r.json()),\n  });\n\n  if (isLoading) return <div>Loading...</div>;\n  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}",
          language: "jsx",
          tip: "React Query / SWR 这种服务器状态库让你不用操心缓存、loading、refetch 这些事。它们是全局状态库里很大一块内容的最佳替代品。",
        },
      ],
      quiz: [
        {
          question: "useState 和 useReducer 什么时候该用后者？",
          options: ["永远用 useReducer", "多个状态相互依赖或状态逻辑复杂时", "useReducer 更快", "useState 已被废弃"],
          answer: 1,
          explanation: "useReducer 适合复杂状态逻辑——一次操作改多个状态、下一状态依赖上一状态、需要单元测试状态更新。",
        },
        {
          question: "Context API 的性能问题是什么？",
          options: ["Context 不能传递函数", "Provider 值变了所有消费者都重渲染", "Context 不能嵌套", "Context 不支持 TypeScript"],
          answer: 1,
          explanation: "只要 Provider 的 value 对象变化（即使内容没变），所有 use 这个 Context 的组件都重新渲染。用 useMemo 缓存 value 或拆分 Context。",
        },
        {
          question: "Zustand 相比 Redux 最大的优势？",
          options: ["功能更多", "没有 Provider 包裹、没有样板代码、API 极简", "适合微服务", "是 React 官方的"],
          answer: 1,
          explanation: "Zustand 不需要 Provider、action/reducer 模板、中间件配置。直接 create 一个 store，组件里 use 它的方法就行。",
        },
        {
          question: "API 返回的数据（如用户列表）应该放在哪？",
          options: ["Redux", "React Query 或 SWR", "useState", "localStorage"],
          answer: 1,
          explanation: "服务器状态用 React Query/SWR——自带缓存、loading 状态管理、自动 re-fetch、乐观更新。手动用 Redux/Zustand 存是重复造轮子。",
        },
        {
          question: "什么情况下不需要全局状态？",
          options: ["所有情况都需要", "只有一个组件用、或只传 1~2 层 props 时，不需要全局状态", "永远不需要", "不确定"],
          answer: 1,
          explanation: "很多状态是局部的——表单输入、弹窗开关。只有真正跨多个无关组件共享的数据才需要全局状态。",
        },
      ],
    },
    "react-testing": {
      slug: "react-testing",
      sections: [
        {
          title: "为什么需要测试",
          content: "写代码就像搭积木，你搭好了积木要验收对不对。测试就是验收环节，帮你自动检查代码有没有按预期运行。React 组件测试跟前端自动点击页面很像，只不过是用代码来模拟用户操作。没测试的代码就像没有说明书的电器，出了毛病你都不知道从哪里修起。",
          code: "import { render, screen } from '@testing-library/react'\nimport App from './App'\n\ntest('renders hello', () => {\n  render(<App />)\n  const el = screen.getByText(/hello/i)\n  expect(el).toBeInTheDocument()\n})",
          language: "javascript",
          tip: "写测试不要追求覆盖率数字，要追求有价值的用例。",
        },
        {
          title: "安装和配置测试环境",
          content: "Create React App 自带 Jest 和 Testing Library，不需要额外装。如果是手动搭的 Vite 项目，需要自己装 vitest 或 jest。关键是要配好 jsdom 环境，因为测试是在 Node 里跑的，没有真实的浏览器 DOM，jsdom 帮我们模拟了一个浏览器环境。",
          code: "npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom\n# 或者用 jest\nnpm install -D jest @testing-library/react @testing-library/jest-dom",
          language: "bash",
          tip: "vitest 比 jest 快很多，新项目推荐用 vitest。",
        },
        {
          title: "查询 DOM 元素的各种姿势",
          content: "Testing Library 提供了一堆查询方法，按优先级排列：getByRole 最推荐，因为最贴近无障碍体验。然后是 getByLabelText、getByPlaceholderText、getByText、getByTestId。getBy 找不到元素会直接抛异常，queryBy 找不到返回 null，findBy 是异步的等待元素出现。",
          code: "const btn = screen.getByRole('button', { name: /提交/i })\nconst input = screen.getByLabelText(/用户名/i)\nconst title = screen.getByText(/欢迎回来/)\nconst list = await screen.findByRole('list')",
          language: "javascript",
          warning: "尽量少用 getByTestId，这个东西跟实现细节耦合太紧。",
        },
        {
          title: "模拟用户交互",
          content: "用 fireEvent 或 userEvent 来模拟用户操作。userEvent 比 fireEvent 更接近真实用户行为，比如 userEvent.type 会触发 keyDown、keyPress、keyUp 等一系列事件，而 fireEvent 只触发你指定的那一个。推荐优先用 userEvent。",
          code: "import userEvent from '@testing-library/user-event'\n\ntest('user can type and submit', async () => {\n  const user = userEvent.setup()\n  render(<LoginForm />)\n  await user.type(screen.getByLabelText(/邮箱/), 'test@qq.com')\n  await user.click(screen.getByRole('button', { name: /登录/ }))\n  await waitFor(() => expect(mockLogin).toHaveBeenCalled())\n})",
          language: "javascript",
        },
        {
          title: "Mock 和异步测试",
          content: "Mock 就是造假数据糊弄测试。比如你组件里调了 fetch，在测试里不可能真的发请求，就得用 jest.fn() 伪造一个假的 fetch 函数。异步测试要注意用 waitFor 或 findBy 等待断言，不然测试跑完了 Promise 还没 resolve 就炸了。",
          code: "global.fetch = jest.fn(() =>\n  Promise.resolve({ json: () => Promise.resolve({ name: '小明' }) })\n)\n\ntest('loads user name', async () => {\n  render(<UserCard id={1} />)\n  await waitFor(() => {\n    expect(screen.getByText('小明')).toBeInTheDocument()\n  })\n})",
          language: "javascript",
          warning: "Mock 用多了会让测试失去意义，尽量少 mock 核心业务逻辑。",
        },
      ],
      quiz: [
        {
          question: "React Testing Library 中最推荐的查询方法是什么？",
          options: ["getByTestId", "getByRole", "getByText", "querySelector"],
          answer: 1,
          explanation: "getByRole 最贴近无障碍语义，能保证你的组件对屏幕阅读器友好。",
        },
        {
          question: "queryBy 和 getBy 的区别是什么？",
          options: ["queryBy 更快", "getBy 找不到元素返回 null", "queryBy 找不到元素返回 null", "它们完全一样"],
          answer: 2,
          explanation: "queryBy 找不到返回 null 不抛异常，适合断言元素不存在。",
        },
        {
          question: "为什么推荐用 userEvent 而不是 fireEvent？",
          options: ["userEvent 名字更好听", "userEvent 更接近真实用户行为", "fireEvent 已被废弃", "userEvent 性能更好"],
          answer: 1,
          explanation: "userEvent 会触发更完整的事件序列，更接近真实用户操作。",
        },
        {
          question: "异步测试中等待元素出现应该用什么？",
          options: ["setTimeout", "getByRole", "findBy 或 waitFor", "直接 expect"],
          answer: 2,
          explanation: "findBy 和 waitFor 会轮询等待，直到元素出现或超时。",
        },
        {
          question: "Mock 是什么意思？",
          options: ["复制代码", "伪造假数据代替真实实现", "删除无用代码", "压缩代码体积"],
          answer: 1,
          explanation: "Mock 就是制造假数据或假函数来隔离被测代码的外部依赖。",
        },
      ],
    },
    "rust-basics": {
      slug: "rust-basics",
      sections: [
        {
          title: "Rust 的安装和 Hello World",
          content: "用 rustup 安装 Rust 是最标准的方式，它会装好编译器 rustc、包管理器 cargo、和工具链。cargo new 创建项目，cargo build 编译，cargo run 编译加运行。Rust 编译出来的二进制非常小而且没有运行时依赖，因为静态链接了所有东西。",
          code: "// 安装 Rust\n// curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh\n\n// 创建项目\n// cargo new hello_world\n// cd hello_world\n// cargo run\n\nfn main() {\n    println!(\"你好，世界！\");\n}",
          language: "rust",
          tip: "println! 是宏不是函数，感叹号是宏调用的标志。",
        },
        {
          title: "变量、不可变和所有权初探",
          content: "Rust 最大的特色就是所有权系统。变量默认不可变，想可变要加 mut。所有权规则三句话：每个值有且只有一个所有者；值在任一时刻只能有一个可变引用或多个不可变引用；引用不能比它引用的值活得久。这套规则让 Rust 不需要垃圾回收也能保证内存安全。",
          code: "fn main() {\n    // 不可变\n    let x = 5;\n    // x = 6; // 编译错误\n    \n    // 可变\n    let mut y = 10;\n    y = 20;\n    \n    // 变量遮蔽（shadowing）\n    let z = 5;\n    let z = z + 1; // 新变量，可以改类型\n    \n    // 所有权转移\n    let s1 = String::from(\"hello\");\n    let s2 = s1; // s1 所有权转移到 s2，s1 不能用了\n    // println!(\"{}\", s1); // 编译错误\n}",
          language: "rust",
          tip: "变量遮蔽（shadowing）和 mut 不同，shadowing 是新变量可以换类型。mut 是原变量改值不能换类型。",
        },
        {
          title: "基本数据类型",
          content: "Rust 是强静态类型语言，基本类型有：整数（i8/u8 到 i128/u128，默认 i32）、浮点数（f32/f64）、布尔、字符（Unicode 4字节）。还有复合类型：元组（不同类型组合）、数组（同类型固定长度，存在栈上）。字符串有两种：&str 是借用字面量，String 是堆上可变字符串。",
          code: "fn main() {\n    let a: i32 = 42;\n    let b: f64 = 3.14;\n    let c: bool = true;\n    let d: char = '中'; // 注意 char 用单引号\n    \n    // 元组\n    let tup: (i32, f64, char) = (500, 6.4, 'A');\n    let (x, y, z) = tup; // 解构\n    let first = tup.0;    // 点索引\n    \n    // 数组\n    let arr: [i32; 5] = [1, 2, 3, 4, 5];\n    let zeros = [0; 5]; // [0, 0, 0, 0, 0]\n    \n    // 字符串\n    let s: &str = \"hello\";        // 字面量，不可变引用\n    let mut owned = String::from(\"hello\"); // 可变堆字符串\n    owned.push_str(\" world\");\n}",
          language: "rust",
          tip: "数组长度是类型的一部分，[i32; 5] 和 [i32; 3] 是不同的类型。",
        },
        {
          title: "函数和控制流",
          content: "Rust 函数用 fn 声明，参数和返回值都要标注类型。最后一行不加分号就是返回值（表达式返回）。if 是表达式可以直接赋值给变量。loop 无限循环，while 条件循环，for 遍历集合。match 是超级加强版的 switch，穷尽所有可能，配合枚举威力无穷。",
          code: "fn add(x: i32, y: i32) -> i32 {\n    x + y // 不加分号，返回值\n}\n\nfn main() {\n    // if 是表达式\n    let num = if true { 5 } else { 6 };\n    \n    // match 匹配\n    let x = 3;\n    match x {\n        1 => println!(\"一\"),\n        2 | 3 => println!(\"二三\"),\n        _ => println!(\"其他\"), // _ 是通配符\n    }\n    \n    // for 遍历\n    let arr = [10, 20, 30];\n    for elem in arr {\n        println!(\"{}\", elem);\n    }\n    \n    for i in 0..5 { // 0 到 4，不含 5\n        println!(\"{}\", i);\n    }\n}",
          language: "rust",
          tip: "match 要求覆盖所有可能，编译器会检查是否有遗漏的分支，这是防止 bug 的利器。",
        },
        {
          title: "常用宏：println、vec、panic",
          content: "Rust 的宏功能非常强大，在编译时展开成代码。println! 格式化输出，format! 格式化字符串返回，vec! 快速创建动态数组 Vec。panic! 触发不可恢复错误，程序崩溃。dbg! 打印变量值和位置，调试神器。宏的名称后面都带感叹号，很容易和函数区分。",
          code: "fn main() {\n    // 打印\n    let name = \"小明\";\n    println!(\"你好, {}!\", name);\n    println!(\"{name} 今年 {age} 岁\", name = \"小明\", age = 18);\n    \n    // 格式化字符串\n    let s = format!(\"用户: {name}\");\n    \n    // 创建 Vec\n    let v = vec![1, 2, 3, 4, 5];\n    let zeros = vec![0; 10]; // 10个0\n    \n    // 调试打印\n    let x = 42;\n    let y = dbg!(x * 2); // 输出: [src/main.rs:行号] x * 2 = 84\n    \n    // panic\n    // panic!(\"出错了！\");\n    \n    // 断言\n    assert_eq!(2 + 2, 4);\n}",
          language: "rust",
          tip: "dbg! 宏会打印文件名、行号和表达式值，最后返回值的所有权，调试时比 println 方便太多。",
        },
      ],
      quiz: [
        {
          question: "Rust 中变量默认是什么特性？",
          options: ["可变", "不可变", "可空", "动态类型"],
          answer: 1,
          explanation: "Rust 变量默认不可变，需要 mut 关键字才能修改变量值。",
        },
        {
          question: "let x = 5; let x = x + 1; 这叫啥？",
          options: ["赋值", "变量遮蔽（shadowing）", "覆盖", "重写"],
          answer: 1,
          explanation: "Rust 允许同名变量遮蔽之前的变量，这是新变量可以换类型。",
        },
        {
          question: "match 表达式必须覆盖所有可能吗？",
          options: ["不需要", "编译器强制要求穷尽匹配", "运行时检查", "看情况"],
          answer: 1,
          explanation: "Rust 编译器会强制 match 覆盖所有可能分支，否则编译报错。",
        },
        {
          question: "vec! 宏的作用？",
          options: ["创建数组", "创建动态数组 Vec", "定义向量运算", "分配内存"],
          answer: 1,
          explanation: "vec! 宏便捷地创建 Vec<T> 类型的动态数组。",
        },
      ],
    },
    "rust-collections": {
      slug: "rust-collections",
      sections: [
        {
          title: "Vec：动态数组",
          content: "Vec 是 Rust 最常用的集合，在堆上分配连续内存，和 C++ 的 vector 类似。push 尾部添加，pop 尾部移除，len 获取长度。用索引 [i] 访问，越界会 panic；get(i) 返回 Option 更安全。遍历用 for in 或 iter 迭代器。可以预分配容量避免频繁扩容拷贝。",
          code: "fn main() {\n    let mut v: Vec<i32> = Vec::new();\n    v.push(1);\n    v.push(2);\n    v.push(3);\n    \n    // 宏创建\n    let v2 = vec![1, 2, 3, 4, 5];\n    \n    // 访问\n    let third = &v[2];       // panic 如果越界\n    let third = v.get(2);    // 返回 Option，安全\n    \n    // 遍历\n    for i in &v {\n        println!(\"{}\", i);\n    }\n    \n    // 可变遍历\n    for i in &mut v {\n        *i += 10;\n    }\n    \n    // 预分配\n    let mut v3 = Vec::with_capacity(100);\n}",
          language: "rust",
          tip: "访问 Vec 推荐用 get 而不是索引，它返回 Option 可以用 match 优雅处理越界。",
        },
        {
          title: "String：堆上字符串",
          content: "Rust 的 String 是 Vec<u8> 的封装，保证存储的是合法 UTF-8。push_str 追加字符串，push 追加字符，+ 号拼接（会转移左边所有权），format! 宏拼接不转移所有权最灵活。字符串索引 [i] 不能直接用因为 UTF-8 字节不固定，用 chars() 迭代字符。",
          code: "fn main() {\n    let mut s = String::from(\"你好\");\n    s.push_str(\"，世界\");     // 追加字符串\n    s.push('!');               // 追加字符\n    \n    // 拼接（多种方式）\n    let s1 = String::from(\"Hello\");\n    let s2 = String::from(\"World\");\n    \n    let s3 = s1 + \" \" + &s2; // + 号，s1 所有权转移了\n    // println!(\"{}\", s1);   // 报错！\n    \n    let s4 = format!(\"{} {}\", s2, \"Rust\"); // 推荐！不转移所有权\n    \n    // 迭代字符（不是字节）\n    for c in \"你好\".chars() {\n        println!(\"{}\", c); // 你 好\n    }\n}",
          language: "rust",
          warning: "String 不能用 s[0] 这样索引，因为 UTF-8 中一个字可能占多个字节。用 chars().nth(0)。",
        },
        {
          title: "HashMap：键值对",
          content: "HashMap 不在 prelude 里需要 use 导入。insert 插入/更新，get 返回 Option<&V>，entry 方法用于收集词频这种场景最方便（如果存在就更新，不存在就插入）。for 遍历顺序不固定因为是无序的。",
          code: "use std::collections::HashMap;\n\nfn main() {\n    let mut scores = HashMap::new();\n    scores.insert(\"Blue\", 10);\n    scores.insert(\"Red\", 50);\n    \n    // 获取\n    let blue_score = scores.get(\"Blue\"); // Some(&10)\n    \n    // entry 模式 - 词频统计\n    let text = \"hello world hello\";\n    let mut word_count = HashMap::new();\n    for word in text.split_whitespace() {\n        let count = word_count.entry(word).or_insert(0);\n        *count += 1;\n    }\n    // word_count: {\"hello\": 2, \"world\": 1}\n    \n    // 遍历\n    for (key, value) in &scores {\n        println!(\"{}: {}\", key, value);\n    }\n}",
          language: "rust",
          tip: "entry().or_insert() 是 HashMap 的招牌操作，一次查找搞定存在就更新不存在就插入。",
        },
        {
          title: "迭代器 Iterator",
          content: "Rust 的迭代器是惰性的，不调用消费方法不会执行。iter() 返回不可变引用迭代器，iter_mut() 可变引用迭代器，into_iter() 所有权转移迭代器。链式调用 map、filter、collect 等组合器非常强大，性能接近手写循环因为迭代器是零成本抽象。",
          code: "fn main() {\n    let v = vec![1, 2, 3, 4, 5];\n    \n    // 链式操作\n    let even_squares: Vec<i32> = v.iter()\n        .filter(|&x| x % 2 == 0)\n        .map(|&x| x * x)\n        .collect();\n    // [4, 16]\n    \n    // 消费方法\n    let sum: i32 = v.iter().sum();\n    let max = v.iter().max().unwrap();\n    let any_even = v.iter().any(|&x| x % 2 == 0);\n    \n    // enumerate 带索引\n    for (i, val) in v.iter().enumerate() {\n        println!(\"{}: {}\", i, val);\n    }\n    \n    // 无限迭代器\n    let fib: Vec<i32> = (0..).take(10).collect(); // [0,1,2,...,9]\n}",
          language: "rust",
          tip: "对于链式迭代器，编译器会优化成接近手写循环的效率，放心用。",
        },
        {
          title: "枚举 Option 和 Result",
          content: "Option<T> 替代了 null，有值就是 Some(T)，没有就是 None。Result<T, E> 表示可能出错的操作，Ok(T) 成功，Err(E) 失败。这两个枚举配合 match、if let、? 运算符构成了 Rust 错误处理的基石。? 运算符是语法糖：如果是 Ok 就解包，Err 就直接向上返回错误。",
          code: "fn divide(a: i32, b: i32) -> Result<f64, String> {\n    if b == 0 {\n        return Err(String::from(\"除数不能为零\"));\n    }\n    Ok(a as f64 / b as f64)\n}\n\nfn main() {\n    // Option 处理\n    let config = Some(8080);\n    match config {\n        Some(p) => println!(\"端口: {}\", p),\n        None => println!(\"使用默认\"),\n    }\n    if let Some(p) = config {\n        println!(\"端口: {}\", p);\n    }\n    \n    // Result 处理\n    match divide(10, 2) {\n        Ok(v) => println!(\"结果: {}\", v),\n        Err(e) => println!(\"错误: {}\", e),\n    }\n    \n    // ? 运算符\n    fn read_config() -> Result<String, String> {\n        let content = std::fs::read_to_string(\"config.toml\")\n            .map_err(|e| format!(\"读配置失败: {}\", e))?;\n        Ok(content)\n    }\n}",
          language: "rust",
          tip: "? 运算符是 Rust 错误处理最常用的语法，让错误传播无比简洁。只能在返回 Result 或 Option 的函数里用。",
        },
      ],
      quiz: [
        {
          question: "Vec 用索引访问和 get 访问的区别？",
          options: ["没有区别", "索引越界 panic，get 返回 Option", "get 更快", "索引返回 Option"],
          answer: 1,
          explanation: "v[i] 越界直接 panic，v.get(i) 返回 None，后者更安全。",
        },
        {
          question: "为什么 Rust 的 String 不能用 s[0] 索引？",
          options: ["Rust 不支持索引", "UTF-8 字符长度不固定", "String 不是集合类型", "性能原因"],
          answer: 1,
          explanation: "UTF-8 编码下字符占 1-4 字节不等，按字节索引可能切在字符中间。",
        },
        {
          question: "? 运算符的作用？",
          options: ["解引用", "如果是 Ok 解包，Err 就提前返回错误", "三元运算符", "错误处理"],
          answer: 1,
          explanation: "? 是语法糖，Ok 时取出值继续执行，Err 时把错误向上传播返回。",
        },
        {
          question: "into_iter() 和 iter() 的区别？",
          options: ["性能不同", "into_iter 转移所有权，iter 只借引用", "into_iter 只用于 Vec", "没有区别"],
          answer: 1,
          explanation: "into_iter 消费集合拿走所有权，iter 借用集合元素只是引用。",
        },
        {
          question: "HashMap 的 entry().or_insert() 模式最适合什么场景？",
          options: ["删除元素", "词频统计（存在就加不存在就插入）", "排序", "查找"],
          answer: 1,
          explanation: "entry API 完美解决先查后决定的模式，一次哈希查找完成操作。",
        },
      ],
    },
    "rust-error": {
      slug: "rust-error",
      sections: [
        {
          title: "panic! 和不可恢复错误",
          content: "panic! 触发不可恢复错误，程序展开栈（回退）并崩溃。Rust 分为两种 panic 策略：unwind（展开栈，清理资源）和 abort（直接退出，不清理）。开发期常用 unwrap() 和 expect()，它们遇到 None 或 Err 就 panic。产品代码应尽量用 Result 传播错误而不是 unwrap。",
          code: "fn main() {\n    // 直接 panic\n    // panic!(\"致命的错误\");\n    \n    let v = vec![1, 2, 3];\n    \n    // unwrap: 如果是 None/Err 就 panic\n    let first = v.get(0).unwrap();\n    \n    // expect: 带自定义信息的 unwrap\n    let second = v.get(1).expect(\"索引 1 不存在\");\n    \n    // 更好的写法：用 match 或 ? 传播\n    match v.get(5) {\n        Some(val) => println!(\"{}\", val),\n        None => println!(\"元素不存在\"),\n    }\n}",
          language: "rust",
          warning: "库代码里永远不要 unwrap，让调用方决定怎么处理。应用代码的 unwrap 也要考虑能否换成更好的错误处理。",
        },
        {
          title: "Result 和错误传播",
          content: "Result<T, E> 是 Rust 标准错误处理方式，定义在标准库预引入里。Ok 代表成功携带值，Err 代表失败携带错误信息。? 操作符是 Rust 错误处理的核心：Ok 时提取值，Err 时提前返回错误。注意 ? 会自动调用 From trait 转换错误类型。",
          code: "use std::fs::File;\nuse std::io::{self, Read};\n\nfn read_username_from_file() -> Result<String, io::Error> {\n    let mut f = File::open(\"hello.txt\")?;\n    let mut s = String::new();\n    f.read_to_string(&mut s)?;\n    Ok(s)\n}\n\n// ? 链式调用\nfn read_username_short() -> Result<String, io::Error> {\n    let mut s = String::new();\n    File::open(\"hello.txt\")?.read_to_string(&mut s)?;\n    Ok(s)\n}\n\n// 更短：标准库一行搞定\nfn read_username_shortest() -> Result<String, io::Error> {\n    fs::read_to_string(\"hello.txt\")\n}",
          language: "rust",
          tip: "? 运算符可以在返回 Result 或 Option 的函数中使用，而且会自动调用 into() 转换错误类型。",
        },
        {
          title: "自定义错误类型",
          content: "复杂项目需要自定义错误类型。用枚举包裹各种可能的错误，实现 Display 和 Debug trait。thiserror 库可以自动派生 Display 和 From 实现，减少模板代码。用 #[from] 属性让 ? 运算符自动转换子错误类型。",
          code: "use thiserror::Error;\n\n#[derive(Error, Debug)]\npub enum DataError {\n    #[error(\"数据库错误: {0}\")]\n    Database(#[from] sqlx::Error),\n    \n    #[error(\"未找到数据: {0}\")]\n    NotFound(String),\n    \n    #[error(\"验证失败: {field} - {message}\")]\n    Validation { field: String, message: String },\n}\n\nfn find_user(id: i32) -> Result<User, DataError> {\n    let user = db.query(\"...\")?  // sqlx::Error 自动转 DataError::Database\n        .ok_or(DataError::NotFound(format!(\"用户 {} 不存在\", id)))?;\n    Ok(user)\n}",
          language: "rust",
          tip: "thiserror 让自定义错误几乎零代码，只需要定义枚举变体和错误信息模板。",
        },
        {
          title: "anyhow 用于应用级错误处理",
          content: "anyhow 提供了一个统一的错误类型 anyhow::Error，适合应用层（不是库），不需要定义复杂的错误枚举。Context trait 给 Result 加上下文信息，with_context 添加描述，链式附加上下文。bail! 宏相当于 return Err。适合快速开发和脚本。",
          code: "use anyhow::{Context, Result, bail};\n\nfn read_config() -> Result<String> {\n    let path = \"config.toml\";\n    let content = std::fs::read_to_string(path)\n        .with_context(|| format!(\"无法读取配置文件 {}\", path))?;\n    Ok(content)\n}\n\nfn validate_age(age: i32) -> Result<()> {\n    if age < 0 {\n        bail!(\"年龄不能为负数: {}\", age);\n    }\n    if age > 150 {\n        bail!(\"年龄太大了: {}\", age);\n    }\n    Ok(())\n}\n\nfn main() -> Result<()> {\n    let config = read_config()?;\n    println!(\"{}\", config);\n    Ok(())\n}",
          language: "rust",
          tip: "库用 thiserror，应用用 anyhow，这是 Rust 社区的流行实践。",
        },
        {
          title: "Option 和 Result 的便捷方法",
          content: "Result 和 Option 提供了丰富的组合方法链式处理。ok_or 把 Option 转 Result，ok 反之。map/map_err 变换成功和失败值。and_then/or_else 链式组合。unwrap_or 提供默认值，unwrap_or_else 惰性计算默认值。这些方法让错误处理代码更函数式更简洁。",
          code: "fn main() {\n    let opt = Some(3);\n    \n    let val = opt.unwrap_or(0);                              // 3\n    let val = None.unwrap_or_else(|| expensive_default());    // 惰性\n    let doubled = opt.map(|x| x * 2);                        // Some(6)\n    let filtered = opt.filter(|&x| x > 5);                   // None\n    \n    let res: Result<i32, &str> = Ok(10);\n    \n    let val = res.unwrap_or(0);                              // 10\n    let mapped = res.map(|x| x * 2);                         // Ok(20)\n    let err_mapped = res.map_err(|e| format!(\"!{}\", e));    // Ok(10)\n    \n    // 链式处理\n    let user_id = Some(42);\n    let username = user_id\n        .and_then(|id| find_user(id))\n        .map(|u| u.name)\n        .unwrap_or_else(|| \"未知用户\".to_string());\n}",
          language: "rust",
          tip: "unwrap_or_else 比 unwrap_or 好，因为默认值只在需要时才计算，不会做无用功。",
        },
      ],
      quiz: [
        {
          question: "Rust 中 unwrap() 的作用？",
          options: ["解引用", "提取 Option/Result 的值，失败就 panic", "错误处理", "类型转换"],
          answer: 1,
          explanation: "unwrap 是快速提取值的便捷方法，但遇到 None/Err 会直接 panic。",
        },
        {
          question: "? 运算符在遇到 Err 时会做什么？",
          options: ["忽略错误", "提前从当前函数返回该错误", "panic", "打印错误继续执行"],
          answer: 1,
          explanation: "? 遇到 Err 时把错误向上传播，等同于 return Err(...) 的简写。",
        },
        {
          question: "thiserror 和 anyhow 的推荐使用场景？",
          options: ["都用 thiserror", "库用 thiserror，应用用 anyhow", "都用 anyhow", "随便选"],
          answer: 1,
          explanation: "库需要暴露明确的错误类型给调用方匹配，应用层追求方便快速用 anyhow。",
        },
        {
          question: "ok_or 方法的作用？",
          options: ["把 Result 转 Option", "把 Option 转 Result，None 时提供自定义错误", "提取值", "忽略错误"],
          answer: 1,
          explanation: "ok_or 把 Option<T> 转为 Result<T, E>，None 时变成 Err(自定义错误)。",
        },
      ],
    },
    "rust-structs": {
      slug: "rust-structs",
      sections: [
        {
          title: "结构体定义和使用",
          content: "Rust 有三种结构体：普通结构体（命名字段）、元组结构体（像有名字的元组）、单元结构体（没有字段，像标记）。普通结构体最常用，字段用冒号赋值。更新结构体可以用结构体更新语法 ..，从另一个实例复制剩余字段。",
          code: "// 普通结构体\nstruct User {\n    name: String,\n    email: String,\n    age: u32,\n    active: bool,\n}\n\nlet user1 = User {\n    name: String::from(\"小明\"),\n    email: String::from(\"xm@qq.com\"),\n    age: 18,\n    active: true,\n};\n\n// 结构体更新语法\nlet user2 = User {\n    name: String::from(\"小红\"),\n    ..user1 // 其余字段从 user1 复制\n};\n\n// 元组结构体\nstruct Point(i32, i32, i32);\nlet p = Point(0, 0, 0);\n\n// 单元结构体\nstruct AlwaysEqual;\nlet subject = AlwaysEqual;",
          language: "rust",
          warning: "结构体更新语法 ..user1 会转移 String 类型字段的所有权，user1 可能之后不能用。",
        },
        {
          title: "方法：impl 块",
          content: "Rust 的方法在 impl 块里定义，第一个参数是 &self（不可变引用）、&mut self（可变引用）或 self（所有权转移）。关联函数（静态方法）没有 self 参数，用 Type::func() 调用，常用作构造函数。每个结构体可以有多个 impl 块，分开管理不同功能。",
          code: "struct Rectangle {\n    width: u32,\n    height: u32,\n}\n\nimpl Rectangle {\n    // 关联函数（构造函数）\n    fn new(width: u32, height: u32) -> Self {\n        Self { width, height }\n    }\n    \n    // 方法：计算面积\n    fn area(&self) -> u32 {\n        self.width * self.height\n    }\n    \n    // 可变引用方法\n    fn scale(&mut self, factor: u32) {\n        self.width *= factor;\n        self.height *= factor;\n    }\n    \n    // 判断能否包含另一个矩形\n    fn can_hold(&self, other: &Rectangle) -> bool {\n        self.width > other.width && self.height > other.height\n    }\n}\n\nlet r = Rectangle::new(30, 50);\nprintln!(\"面积: {}\", r.area());",
          language: "rust",
          tip: "Rust 没有继承，但 trait 和组合提供了类似的代码复用能力。",
        },
        {
          title: "泛型结构体",
          content: "泛型让结构体可以存储不同类型的数据。在结构体名后面加 <T>，字段类型用 T。impl 块也要带泛型 <T>。多个泛型参数用逗号分隔，如 <T, U>。泛型不影响运行时性能，因为 Rust 会在编译时做单态化，为每个具体类型生成专用代码。",
          code: "struct Point<T> {\n    x: T,\n    y: T,\n}\n\nimpl<T> Point<T> {\n    fn new(x: T, y: T) -> Self {\n        Self { x, y }\n    }\n}\n\n// 只对特定类型实现方法\nimpl Point<f64> {\n    fn distance_from_origin(&self) -> f64 {\n        (self.x.powi(2) + self.y.powi(2)).sqrt()\n    }\n}\n\n// 多个泛型参数\nstruct Pair<T, U> {\n    first: T,\n    second: U,\n}\n\nlet p1 = Point { x: 5, y: 10 };\nlet p2 = Point { x: 1.5, y: 3.2 };\nlet pair = Pair { first: \"hello\", second: 42 };",
          language: "rust",
          tip: "泛型代码写一遍，编译时自动为每个使用到的具体类型生成代码，零运行时开销。",
        },
        {
          title: "生命周期标注",
          content: "生命周期是 Rust 独有的概念，当函数返回引用时，编译器需要知道这个引用能活多久。大部分时候编译器能自动推断（生命周期省略规则），推断不出来时才需要手动标注。生命周期语法是单引号加名字，如 'a，标注在引用类型前面：&'a str。标注不改变代码逻辑，只是帮助编译器做借用检查。",
          code: "// 需要生命周期标注的情况\nfn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}\n// 'a 表示返回的引用和 x、y 中较短的那个活得一样久\n\nfn main() {\n    let s1 = String::from(\"短\");\n    let s2 = String::from(\"长一点\");\n    \n    let result = longest(&s1, &s2);\n    println!(\"较长的: {}\", result);\n    \n    // 结构体中的引用必须标注生命周期\n    struct Excerpt<'a> {\n        part: &'a str,\n    }\n}",
          language: "rust",
          tip: "生命周期省略规则覆盖了大部分常见情况，真的需要手写生命周期的时候远比想象中少。",
        },
        {
          title: "常用的派生宏",
          content: "#[derive(...)] 是 Rust 最常用的属性，编译器自动帮结构体实现指定的 trait。#[derive(Debug)] 让结构体可以用 {:?} 打印调试输出。#[derive(Clone)] 实现深拷贝。#[derive(PartialEq)] 支持 == 比较。#[derive(Default)] 提供 Default::default()。大多数结构体第一行就是大长串的 derive。",
          code: "#[derive(Debug, Clone, PartialEq, Default)]\nstruct User {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let u1 = User { name: \"小明\".into(), age: 18 };\n    let u2 = u1.clone();\n    \n    // Debug 打印\n    println!(\"{:?}\", u1);       // 紧凑格式\n    println!(\"{:#?}\", u1);      // 美化格式\n    \n    // PartialEq 支持比较\n    assert_eq!(u1, u2);\n    \n    // Default\n    let u3 = User::default(); // name=\"\", age=0\n}",
          language: "rust",
          tip: "几乎所有 struct 都至少会 derive Debug，调试时不能打印结构体太折磨了。",
        },
      ],
      quiz: [
        {
          question: "Rust 中 impl 块的第一个参数 &self 表示什么？",
          options: ["结构体本身", "结构体的不可变引用", "结构体的可变引用", "结构体的所有权转移"],
          answer: 1,
          explanation: "&self 是 self: &Self 的简写，表示方法的接收者是结构体的不可变引用。",
        },
        {
          question: "Rust 中泛型的性能特点？",
          options: ["运行时动态分派", "编译时单态化，零运行时开销", "需要垃圾回收", "性能比普通代码差"],
          answer: 1,
          explanation: "Rust 泛型编译时为每个具体类型生成专用代码，没有运行时开销。",
        },
        {
          question: "生命周期标注 'a 的主要作用？",
          options: ["提高性能", "帮助编译器验证引用的有效性", "改变代码逻辑", "减少内存使用"],
          answer: 1,
          explanation: "生命周期标注告诉编译器引用之间的存活关系，确保不会出现悬垂引用。",
        },
        {
          question: "#[derive(Debug)] 的作用？",
          options: ["提高性能", "自动实现 Debug trait，可以 {:?} 打印", "加密结构体", "标记为调试模式"],
          answer: 1,
          explanation: "derive(Debug) 让结构体支持用 println!({:?}, v) 打印调试信息。",
        },
      ],
    },
    "rust-traits": {
      slug: "rust-traits",
      sections: [
        {
          title: "Trait 定义和实现",
          content: "Trait 定义共享行为，类似其他语言的接口。用 trait 关键字定义方法签名，用 impl Xxx for YourType 为你的类型实现 trait。可以在 trait 里提供默认实现，实现者可以复用或覆盖。孤儿规则：不能为外部类型实现外部 trait，防止冲突。",
          code: "trait Summary {\n    fn summarize(&self) -> String;\n    \n    // 默认实现\n    fn summarize_default(&self) -> String {\n        String::from(\"（摘要暂无）\")\n    }\n}\n\nstruct Article {\n    title: String,\n    content: String,\n}\n\nimpl Summary for Article {\n    fn summarize(&self) -> String {\n        format!(\"{} - {}\", self.title, &self.content[..20])\n    }\n}\n\nlet article = Article {\n    title: \"Rust 入门\".into(),\n    content: \"这是一篇关于 Rust...\".into(),\n};\nprintln!(\"{}\", article.summarize());",
          language: "rust",
          tip: "Rust 的 trait 类似 Go 的 interface 但需要显式实现（impl Trait for Type），编译器帮你检查。",
        },
        {
          title: "Trait 作为参数",
          content: "函数参数可以用 impl Trait 语法接受实现了指定 trait 的类型，这是语法糖，底层还是泛型。Trait Bound 用 T: Trait 约束泛型参数。+ 号组合多个 trait 条件（T: Summary + Display）。where 子句在复杂约束时让代码更可读。",
          code: "// impl Trait 语法\nfn notify(item: &impl Summary) {\n    println!(\"通知: {}\", item.summarize());\n}\n\n// 等价泛型写法\nfn notify_generic<T: Summary>(item: &T) {\n    println!(\"通知: {}\", item.summarize());\n}\n\n// 多个 trait 约束\nfn display_and_summarize<T: Summary + std::fmt::Display>(item: &T) {\n    println!(\"显示: {}  摘要: {}\", item, item.summarize());\n}\n\n// where 子句（复杂情况更清晰）\nfn complex<T, U>(t: &T, u: &U) -> String\nwhere\n    T: Summary + Clone,\n    U: Clone + std::fmt::Debug,\n{\n    format!(\"{} {:?}\", t.summarize(), u)\n}",
          language: "rust",
          tip: "函数签名简单用 impl Trait，多个参数各需不同 trait 用泛型 + where。",
        },
        {
          title: "返回实现了 Trait 的类型",
          content: "可以用 impl Trait 作为返回类型，隐藏具体类型，适合闭包和迭代器这种类型名很复杂的情况。但它只能返回单一类型，不能运行时动态选择。要运行时多态需要用 trait object：Box<dyn Trait> 或 &dyn Trait，用动态分派在运行时确定调用哪个方法。",
          code: "fn produce_summarizable() -> impl Summary {\n    Article {\n        title: \"Rust\".into(),\n        content: \"确实好\".into(),\n    }\n}\n\n// 返回不同类型？不行！\n// fn returns_result(flag: bool) -> impl Summary {\n//     if flag { Article {..} } else { Tweet {..} }\n// }\n\n// 运行时多态用 trait object\nfn returns_dyn(flag: bool) -> Box<dyn Summary> {\n    if flag {\n        Box::new(Article { title: \"A\".into(), content: \"...\".into() })\n    } else {\n        Box::new(Tweet { username: \"user\".into(), content: \"...\".into() })\n    }\n}\n\n// 使用 trait object\nlet summaries: Vec<Box<dyn Summary>> = vec![\n    Box::new(Article { title: \"...\".into(), content: \"...\".into() }),\n    Box::new(Tweet { username: \"...\".into(), content: \"...\".into() }),\n];",
          language: "rust",
          warning: "impl Trait 返回和 dyn Trait 是不同的：前者编译时单态化，后者运行时动态分派有额外开销。",
        },
        {
          title: "常用的标准库 Trait",
          content: "标准库有很多重要的 trait。Display 控制 {} 格式化（给用户看），Debug 控制 {:?}（给开发者看）。Clone 深拷贝，Copy 浅拷贝（栈上复制）。PartialEq 实现 == 比较，PartialOrd 实现排序。Drop 实现析构函数，在值离开作用域时调用，做资源清理。",
          code: "#[derive(Debug, Clone, PartialEq, PartialOrd)]\nstruct Point {\n    x: f64,\n    y: f64,\n}\n\n// 手动实现 Display\nimpl std::fmt::Display for Point {\n    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {\n        write!(f, \"({}, {})\", self.x, self.y)\n    }\n}\n\n// 手动实现 Drop\nstruct Database {\n    conn: Connection,\n}\n\nimpl Drop for Database {\n    fn drop(&mut self) {\n        println!(\"关闭数据库连接\");\n        // self.conn.close();\n    }\n}\n\nlet p = Point { x: 3.0, y: 4.0 };\nprintln!(\"{}\", p);       // Display: (3, 4)\nprintln!(\"{:?}\", p);     // Debug: Point { x: 3.0, y: 4.0 }",
          language: "rust",
          tip: "Copy 和 Clone 的区别：Copy 是栈上按位复制（简单的值类型），Clone 可以包含堆内存的深拷贝。",
        },
        {
          title: "关联类型和 supertrait",
          content: "Trait 里可以定义关联类型（associated type），用 type 关键字。实现时指定具体类型。关联类型比泛型参数更简洁，因为不需要在每处使用都写类型参数。一个 trait 可以要求另一个 trait 作为前提，这叫 supertrait：trait X: Y {}，实现 X 必须先实现 Y。",
          code: "// 关联类型\npub trait Iterator {\n    type Item;\n    fn next(&mut self) -> Option<Self::Item>;\n}\n\nstruct Counter {\n    count: u32,\n}\n\nimpl Iterator for Counter {\n    type Item = u32;\n    fn next(&mut self) -> Option<Self::Item> {\n        self.count += 1;\n        Some(self.count)\n    }\n}\n\n// supertrait\nuse std::fmt::Display;\n\ntrait Printable: Display {\n    fn print(&self) {\n        println!(\"{}\", self);\n    }\n}\n\n// 实现 Printable 必须先实现 Display\nimpl Printable for Point {}\n\n// 使用\nlet p = Point { x: 1.0, y: 2.0 };\np.print();",
          language: "rust",
          tip: "什么时候用关联类型什么时候用泛型参数？一个类型只应有一次实现就用关联类型（如 Iterator），多种实现用泛型参数。",
        },
      ],
      quiz: [
        {
          question: "Rust 中 trait 相当于其他语言的什么？",
          options: ["类", "接口/协议", "模块", "枚举"],
          answer: 1,
          explanation: "trait 定义共享行为，类似 Java 的 interface 或 Go 的 interface。",
        },
        {
          question: "impl Trait 返回和 Box<dyn Trait> 返回的本质区别？",
          options: ["没有区别", "impl Trait 编译时静态分派，dyn Trait 运行时动态分派", "dyn Trait 更快", "impl Trait 不能返回"],
          answer: 1,
          explanation: "impl Trait 是编译时单态化零开销，dyn Trait 是通过虚表运行时动态分派。",
        },
        {
          question: "Display trait 和 Debug trait 分别用于什么格式化？",
          options: ["都是调试", "Display 用于 {} 给用户看，Debug 用于 {:?} 给开发者看", "Debug 是 Display 的子集", "Display 自动实现"],
          answer: 1,
          explanation: "Display 是面向用户的格式化，Debug 是面向开发者的调试输出。",
        },
        {
          question: "Drop trait 在什么时候被调用？",
          options: ["手动调用", "值离开作用域时自动调用", "程序启动时", "每次使用后"],
          answer: 1,
          explanation: "Drop 是析构函数，值离开作用域时 Rust 自动调用用于清理资源。",
        },
      ],
    },
    "subqueries": {
      slug: "subqueries",
      sections: [
        {
          title: "子查询是什么",
          content: "子查询说白了就是查询套查询——一个 SELECT 语句嵌在另一个 SELECT 里面。你可以把内部的查询结果当成一个临时表，外层的查询再对这个临时表进行操作。\n\n打个比方：你想找班上比平均分高的同学，得先算出平均分（内层），再用每个人的分数跟平均分比（外层）。子查询就是干这事的。\n\n子查询可以出现在 SELECT、FROM、WHERE、HAVING 这些地方，用得最多的是 WHERE 子句里。",
          code: "-- 找工资比全体员工平均工资高的员工\nSELECT name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);",
          language: "sql",
        },
        {
          title: "标量子查询（返回单个值）",
          content: "标量子查询是最简单的一种——内层查询只返回一个值，就像查字典找到一个词的意思一样。通常用在 WHERE 的比较条件里（大于、小于、等于这些），或者 SELECT 的列里。\n\n常见的场景：找最大值、最小值、平均值、总数，然后拿这个值去比。但要注意如果子查询返回了空值 NULL，整个比较的结果也是 NULL，可能查不出你预期的结果。",
          code: "-- 找工资最高的人\nSELECT name, salary\nFROM employees\nWHERE salary = (SELECT MAX(salary) FROM employees);\n\n-- 每件商品后面显示全品类均价\nSELECT name, price,\n  (SELECT AVG(price) FROM products) AS avg_all\nFROM products;",
          language: "sql",
        },
        {
          title: "IN / NOT IN 子查询",
          content: "IN 子查询就是判断某个值在不在一堆值里面。内层查询返回一列值，外层看某个字段在这个集合里就选出来。\n\n典型场景：查买了某个商品的用户、查有订单的客户、查某个部门下的员工。IN 后面可以是子查询，也可以是直接写死的列表（IN (1,2,3)）。\n\nNOT IN 就是反过来，不在里面才选。但要注意：如果子查询结果里有 NULL，NOT IN 可能啥也查不出来，这是最常见的坑。改 NOT EXISTS 就没事。",
          code: "-- 查下过订单的客户\nSELECT * FROM customers\nWHERE id IN (SELECT DISTINCT customer_id FROM orders);\n\n-- 查没下过订单的客户\nSELECT * FROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id\n);",
          language: "sql",
          tip: "IN 子查询适合内层结果集不太大的场景。如果数据量很大，用 JOIN 通常比 IN 快。",
          warning: "NOT IN 时子查询结果不能含 NULL，否则整个 NOT IN 判断全返回 NULL，等于啥都没选出来。",
        },
        {
          title: "EXISTS / NOT EXISTS 子查询",
          content: "EXISTS 跟 IN 类似，但更灵活。它不关心子查询返回什么值，只关心有没有结果。只要子查询能查出至少一行，EXISTS 就认为条件成立。\n\nEXISTS 的执行逻辑是半连接——外层每查一行，就到内层去跑一次看有没有匹配。但优化器通常会把它转换成 JOIN，效率并不差。\n\nNOT EXISTS 比 NOT IN 安全，因为不怕 NULL 的问题。在判断没有关联记录的时候，NOT EXISTS 是首选。EXISTS 子查询里写 SELECT 1、SELECT 星号都一样。",
          code: "-- 查有订单的客户\nSELECT * FROM customers c\nWHERE EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id\n);\n\n-- 查没被任何人买过的商品\nSELECT * FROM products p\nWHERE NOT EXISTS (\n  SELECT 1 FROM order_items oi WHERE oi.product_id = p.id\n);",
          language: "sql",
          tip: "EXISTS 子查询里写 SELECT 1、SELECT 星号都一样，因为不管返回值，只看有没有行。",
        },
        {
          title: "关联子查询（Correlated Subquery）",
          content: "关联子查询就是内层查询引用了外层查询的列——里外有联系。普通子查询（非关联）可以先执行内层再把结果传给外层，但关联子查询必须外层每出一行、内层就重新算一次。\n\n典型场景：查每个部门工资最高的人、每个分类下销量最多的商品。外层遍历每行，内层引用外层的行 ID 去算。\n\n关联子查询性能可能差，因为内层会执行很多次。很多场景可以用窗口函数替代，性能翻几倍。比如每个分组取 Top N，用 ROW_NUMBER() OVER(PARTITION BY ...) 一次扫描搞定。",
          code: "-- 每个部门工资最高的人（关联子查询版）\nSELECT name, department, salary\nFROM employees e1\nWHERE salary = (\n  SELECT MAX(salary)\n  FROM employees e2\n  WHERE e2.department = e1.department\n);\n\n-- 窗口函数版，性能更好\nSELECT * FROM (\n  SELECT *, RANK() OVER (PARTITION BY department ORDER BY salary DESC) r\n  FROM employees\n) t WHERE r = 1;",
          language: "sql",
          tip: "关联子查询的常见优化方向就是用窗口函数或 JOIN 替代，尤其是数据量大的时候。",
        },
      ],
      quiz: [
        {
          question: "子查询和 JOIN 最大的不同是什么？",
          options: ["子查询更快", "JOIN 不能做子查询的事", "子查询可以在 WHERE 里嵌套 SELECT，JOIN 是联表", "没区别"],
          answer: 2,
          explanation: "子查询是 SELECT 套 SELECT，逻辑上先内后外。JOIN 是把两张表按条件连接成一张大表。很多场景可以互替。",
        },
        {
          question: "NOT IN 子查询最大的坑是什么？",
          options: ["性能差", "子查询有 NULL 时结果为空", "不能用在 WHERE 里", "只能查数字"],
          answer: 1,
          explanation: "NOT IN 如果子查询返回了 NULL，整个 NOT IN 求值结果也是 NULL，导致查不出任何东西。用 NOT EXISTS 就没事。",
        },
        {
          question: "关联子查询和非关联子查询的区别？",
          options: ["没区别", "关联子查询引用外层列，非关联不引用", "关联子查询一定更快", "非关联用在 FROM 里"],
          answer: 1,
          explanation: "关联子查询内层引用了外层表的列，外层每出一行内层就得重新算一次。非关联的内层独立，算一次就行。",
        },
        {
          question: "EXISTS (SELECT * FROM ...) 为什么要写成 SELECT 1？",
          options: ["SELECT 1 能返回实际数据", "只是习惯，实际上返回值不重要", "SELECT 1 只查一列更快", "SELECT 1 能避免报错"],
          answer: 1,
          explanation: "EXISTS 只看子查询有没有行返回，不关心返回什么列什么值。SELECT 1 只是约定俗成的写法。",
        },
        {
          question: "关联子查询最常见的优化方向是？",
          options: ["加索引", "改用窗口函数或 JOIN", "减小表", "增加内存"],
          answer: 1,
          explanation: "关联子查询每行都跑一遍内层，很慢。很多场景用窗口函数一次扫描搞定，性能提升明显。",
        },
      ],
    },
    "swift-async": {
      slug: "swift-async",
      sections: [
        {
          title: "async/await 入门",
          content: "Swift 5.5 引入了 async/await，让异步代码写得像同步代码一样直。async 标记函数是异步的，await 表示挂起点等待异步操作完成。之前写网络请求要用回调闭包嵌套好几层，现在一行 await 就搞定了。异步函数会跑在 Swift 的协作式线程池上。",
          code: "// 异步函数\nfunc fetchUser(id: Int) async throws -> User {\n    let url = URL(string: \"https://api.example.com/users/\\(id)\")!\n    let (data, _) = try await URLSession.shared.data(from: url)\n    return try JSONDecoder().decode(User.self, from: data)\n}\n\n// 调用异步函数\nTask {\n    do {\n        let user = try await fetchUser(id: 1)\n        print(user.name)\n    } catch {\n        print(\"获取失败: \\(error)\")\n    }\n}",
          language: "swift",
          tip: "async 函数只能从异步上下文中调用：要么在另一个 async 函数里，要么用 Task 启动。",
        },
        {
          title: "Task 和 TaskGroup",
          content: "Task 代表一个异步工作单元。Task {} 创建顶级任务，Task.detached {} 创建脱离当前上下文的任务。TaskGroup 可以并行执行多个子任务，等待所有结果返回。withTaskGroup 创建任务组，group.addTask 添加子任务，for await 循环收集结果。",
          code: "func loadAllUsers(ids: [Int]) async -> [User] {\n    await withTaskGroup(of: User.self) { group in\n        for id in ids {\n            group.addTask {\n                try? await fetchUser(id: id)\n            }\n        }\n        \n        var users: [User] = []\n        for await user in group {\n            users.append(user)\n        }\n        return users\n    }\n}\n\n// 取消任务\nlet task = Task {\n    await doLongWork()\n}\ntask.cancel()  // 请求取消\n\n// 检查取消\nfunc doLongWork() async throws {\n    try Task.checkCancellation()  // 如果已取消就抛异常\n    for i in 1...100 {\n        if Task.isCancelled { return }\n        // 做事情...\n    }\n}",
          language: "swift",
          tip: "长时间运行的任务应该定期检查 Task.isCancelled，及时响应取消请求。",
        },
        {
          title: "Actor 数据安全",
          content: "Actor 是 Swift 的并发安全类型，内部的数据一次只能被一个任务访问，不会产生数据竞争。用 actor 代替 class 就能获得线程安全保护。访问 actor 的方法和属性需要 await，因为可能在等别的任务先访问完。@MainActor 确保代码在主线程执行，适合 UI 更新。",
          code: "actor Counter {\n    private var value = 0\n    \n    func increment() -> Int {\n        value += 1\n        return value\n    }\n    \n    func reset() {\n        value = 0\n    }\n}\n\nlet counter = Counter()\nTask {\n    let v1 = await counter.increment()\n    let v2 = await counter.increment()\n    print(\"\\(v1), \\(v2)\")  // 肯定是 1, 2，不会乱了\n}\n\n// @MainActor 确保在主线\n@MainActor\nclass ViewModel: ObservableObject {\n    @Published var users: [User] = []\n    \n    func load() async {\n        do {\n            users = try await fetchUsers()\n        } catch { }\n    }\n}",
          language: "swift",
          warning: "Actor 内部的方法互相调用不需要 await，但从外部访问 actor 的任何东西都要 await。",
        },
        {
          title: "continuation 桥接回调",
          content: "很多老的 API 还是回调闭包风格的，需要桥接到 async/await 世界。withCheckedContinuation 和 withCheckedThrowingContinuation 就是做这个桥接的。函数会挂起，等你调用 continuation.resume() 返回结果或 continuation.resume(throwing:) 抛出错误。",
          code: "// 老的回调 API\nfunc oldStyleLogin(username: String, completion: @escaping (Result<String, Error>) -> Void) {\n    DispatchQueue.main.asyncAfter(deadline: .now() + 1) {\n        completion(.success(\"token-xxx\"))\n    }\n}\n\n// 桥接成 async\nfunc login(username: String) async throws -> String {\n    try await withCheckedThrowingContinuation { continuation in\n        oldStyleLogin(username: username) { result in\n            switch result {\n            case .success(let token):\n                continuation.resume(returning: token)\n            case .failure(let error):\n                continuation.resume(throwing: error)\n            }\n        }\n    }\n}\n\n// 使用\nTask {\n    let token = try await login(username: \"test\")\n    print(token)\n}",
          language: "swift",
          warning: "continuation 必须且只能 resume 一次，多了或少了一次都会导致运行时错误。",
        },
        {
          title: "Sendable 和安全数据传递",
          content: "Sendable 协议标记可以安全在并发域之间传递的类型。值类型（struct、enum）和不可变类自动是 Sendable。有可变状态的类需要手动标注 @unchecked Sendable 并自己保证线程安全。编译器会检查你跨 actor 传递的数据是否满足 Sendable。",
          code: "// 自动 Sendable\nstruct Message: Sendable {\n    let id: Int\n    let content: String\n}\n\n// 不可变类是 Sendable\nfinal class Config: Sendable {\n    let apiKey: String\n    init(apiKey: String) { self.apiKey = apiKey }\n}\n\n// 需要手动保证的\nfinal class Cache: @unchecked Sendable {\n    private let lock = NSLock()\n    private var storage: [String: Any] = [:]\n    \n    func set(_ value: Any, forKey key: String) {\n        lock.lock()\n        storage[key] = value\n        lock.unlock()\n    }\n}",
          language: "swift",
          tip: "尽量用值类型（struct/enum）来传递数据，它们天然的线程安全且自动满足 Sendable。",
        },
      ],
      quiz: [
        {
          question: "Swift async/await 的核心优势是什么？",
          options: ["更快", "异步代码写得像同步代码一样直，避免回调地狱", "不需要线程", "自动处理错误"],
          answer: 1,
          explanation: "async/await 让异步代码线性书写，不需要嵌套回调闭包。",
        },
        {
          question: "Actor 保证数据安全的方式？",
          options: ["加锁", "一次只允许一个任务访问内部状态", "复制数据", "禁止并发访问"],
          answer: 1,
          explanation: "Actor 内部状态是串行访问的，天然避免数据竞争。",
        },
        {
          question: "withCheckedContinuation 的作用？",
          options: ["创建 Task", "把回调风格 API 桥接成 async/await", "检查数据", "取消任务"],
          answer: 1,
          explanation: "Continuation 是桥接器，把基于回调的 API 包装成可以用 await 调用的异步函数。",
        },
        {
          question: "Sendable 协议标记什么含义？",
          options: ["可以序列化", "可以安全在并发域之间传递", "可以被释放", "可以发送通知"],
          answer: 1,
          explanation: "Sendable 表示该类型的数据可以安全地跨 actor 或 task 传递。",
        },
      ],
    },
    "swift-oop": {
      slug: "swift-oop",
      sections: [
        {
          title: "类和结构体的区别",
          content: "Swift 中类和结构体都能定义属性和方法，但关键区别：类是引用类型（赋值时拷贝引用），结构体是值类型（赋值时拷贝整个数据）。这意味着结构体在多线程中更安全，类是共享的。另外类支持继承，结构体不支持。苹果建议优先用结构体。",
          code: "// 结构体 - 值类型\nstruct Point {\n    var x: Double\n    var y: Double\n    \n    mutating func moveBy(x: Double, y: Double) {\n        self.x += x\n        self.y += y\n    }\n}\n\nvar p1 = Point(x: 0, y: 0)\nvar p2 = p1  // 完整拷贝\np2.x = 10\nprint(p1.x)  // 0 - p1 没变\n\n// 类 - 引用类型\nclass Person {\n    var name: String\n    init(name: String) { self.name = name }\n}\n\nvar person1 = Person(name: \"小明\")\nvar person2 = person1  // 拷贝引用\nperson2.name = \"小红\"\nprint(person1.name)    // 小红 - person1 也变了",
          language: "swift",
          tip: "Swift 中能不用类就不用类，struct + enum + protocol 的组合完全可以实现大部分需求。",
        },
        {
          title: "继承和重写",
          content: "Swift 继承用冒号语法：class Dog: Animal {}。子类可以重写父类的方法、属性和下标，用 override 关键字。final 阻止重写。super 关键字调用父类实现。override 是强制标注的，编译器会检查你真的在重写一个存在的方法，不会意外创建新方法。",
          code: "class Animal {\n    var name: String\n    \n    init(name: String) {\n        self.name = name\n    }\n    \n    func speak() -> String {\n        return \"...\"\n    }\n}\n\nclass Dog: Animal {\n    var breed: String\n    \n    init(name: String, breed: String) {\n        self.breed = breed\n        super.init(name: name)\n    }\n    \n    override func speak() -> String {\n        return super.speak() + \" 汪汪\"\n    }\n}\n\nlet dog = Dog(name: \"旺财\", breed: \"金毛\")\nprint(dog.speak())  // ... 汪汪",
          language: "swift",
          tip: "override 是编译安全检查，防止你打错方法名或父类方法改了签名导致的 bug。",
        },
        {
          title: "协议 Protocol",
          content: "Swift 的协议非常强大，类似其他语言的接口但功能更多。可以定义方法、属性（只读或读写）、甚至可选方法（@objc 协议）。一个类型可以遵循多个协议：struct MyType: ProtoA, ProtoB {}。协议扩展（extension）可以提供默认实现，这就是 Swift 的面相协议编程。",
          code: "protocol Identifiable {\n    var id: String { get set }\n    func identify() -> String\n}\n\n// 协议扩展 - 提供默认实现\nextension Identifiable {\n    func identify() -> String {\n        return \"ID: \\(id)\"\n    }\n}\n\nstruct User: Identifiable {\n    var id: String\n    var name: String\n    // identify 已经有默认实现了\n}\n\nlet user = User(id: \"001\", name: \"小明\")\nprint(user.identify())  // ID: 001\n\n// 协议作为类型\nfunc printIdentifier(_ item: Identifiable) {\n    print(item.identify())\n}",
          language: "swift",
          tip: "Swift 是面相协议编程（POP）的语言，通过协议加扩展可以实现类似多重继承的代码复用。",
        },
        {
          title: "属性观察器和懒加载",
          content: "willSet 在属性即将被修改时触发（可以拿到新值），didSet 在修改完成后触发（可以拿到旧值）。这两个观察器在初始化时不触发。lazy var 延迟初始化，第一次访问时才创建，适合创建开销大或依赖其他属性的变量。",
          code: "class Temperature {\n    var celsius: Double = 0 {\n        willSet(newTemp) {\n            print(\"即将变为 \\(newTemp)度\")\n        }\n        didSet(oldTemp) {\n            print(\"从 \\(oldTemp)度变为 \\(celsius)度\")\n            if celsius > 100 {\n                print(\"警告：温度超过100度！\")\n            }\n        }\n    }\n    \n    // 懒加载\n    lazy var fahrenheit: Double = {\n        return celsius * 9 / 5 + 32\n    }()\n}\n\nlet t = Temperature()\nt.celsius = 25  // 触发 willSet 和 didSet",
          language: "swift",
          tip: "didSet 做更新后的校验或联动刷新比手动每次都调方便得多。",
        },
        {
          title: "扩展 Extension",
          content: "扩展可以给已有的类、结构体、枚举、协议添加新功能，而且不需要访问源码。可以添加计算属性（不能加存储属性）、方法、新的构造器、让类型遵循协议等。扩展很常用来拆分功能模块、为系统类型添加便利方法。",
          code: "// 给 Double 添加扩展\nextension Double {\n    var km: Double { return self * 1000.0 }\n    var cm: Double { return self / 100.0 }\n}\n\nlet distance = 5.0.km  // 5000.0\n\n// 给 Array 添加安全访问\nextension Array {\n    subscript(safe index: Int) -> Element? {\n        return indices.contains(index) ? self[index] : nil\n    }\n}\n\nlet arr = [1, 2, 3]\nprint(arr[safe: 10] ?? \"不存在\")  // 不存在\n\n// 通过扩展遵循协议\nextension User: CustomStringConvertible {\n    var description: String {\n        return \"\\(name) (\\(id))\"\n    }\n}",
          language: "swift",
          tip: "扩展不能包含存储属性，但可以用关联对象技术绕过，不过一般没必要。",
        },
      ],
      quiz: [
        {
          question: "Swift 中结构体和类最核心的区别？",
          options: ["结构体不能有方法", "结构体是值类型，类是引用类型", "类不能有属性", "结构体不能被拷贝"],
          answer: 1,
          explanation: "结构体赋值时拷贝整个数据，类赋值时只拷贝引用指针。",
        },
        {
          question: "Swift 中 override 关键字的作用？",
          options: ["装饰代码", "强制标注重写，编译器验证父类确实有该方法", "提高性能", "允许重写"],
          answer: 1,
          explanation: "override 告诉编译器这是重写父类方法，如果父类没这个方法会报错。",
        },
        {
          question: "didSet 观察器在什么时候触发？",
          options: ["属性初始化时", "属性值被修改完成后", "读取属性时", "编译时"],
          answer: 1,
          explanation: "didSet 在属性值修改完成后触发，可以拿到旧值做后续处理。初始化时不触发。",
        },
        {
          question: "Extension 能为类型添加什么？",
          options: ["存储属性", "计算属性和方法", "继承", "泛型参数"],
          answer: 1,
          explanation: "扩展可以添加计算属性、方法、构造器、遵循协议，但不能添加存储属性。",
        },
      ],
    },
    "swiftui-basics": {
      slug: "swiftui-basics",
      sections: [
        {
          title: "声明式 UI 和 View",
          content: "SwiftUI 是声明式 UI 框架，你只需要描述 UI 长什么样，框架自动处理何时更新。View 是协议，所有视图组件都遵循它。body 是计算属性返回一个 View。每次数据变化时 body 自动重新计算，框架会高效地只更新变化的部分（diff 算法）。",
          code: "import SwiftUI\n\nstruct ContentView: View {\n    @State private var name = \"\"\n    \n    var body: some View {\n        VStack(spacing: 20) {\n            Text(\"你好, \\(name.isEmpty ? \"世界\" : name)!\")\n                .font(.largeTitle)\n            \n            TextField(\"输入你的名字\", text: $name)\n                .textFieldStyle(.roundedBorder)\n                .padding()\n            \n            Button(\"清空\") {\n                name = \"\"\n            }\n            .buttonStyle(.bordered)\n        }\n        .padding()\n    }\n}",
          language: "swift",
          tip: "SwiftUI 的 View 是值类型（struct 而不是 class），每次刷新都重新创建但开销很小。",
        },
        {
          title: "@State、@Binding、@ObservedObject",
          content: "这几个属性包装器是 SwiftUI 数据流的核心。@State 用于视图内部的简单状态。@Binding 打通父子视图的数据双向绑定，用 $ 前缀获取。@StateObject 创建并持有引用类型的 ObservableObject。@ObservedObject 观察但不持有对象。@EnvironmentObject 从环境中共享数据。",
          code: "import SwiftUI\n\n// 数据模型\nclass UserSettings: ObservableObject {\n    @Published var isDarkMode = false\n    @Published var fontSize = 14.0\n}\n\n// 子视图 - 双向绑定\nstruct ToggleView: View {\n    @Binding var isOn: Bool\n    \n    var body: some View {\n        Toggle(\"开关\", isOn: $isOn)\n    }\n}\n\n// 主视图\nstruct SettingsView: View {\n    @StateObject private var settings = UserSettings()\n    @State private var showDetail = false\n    \n    var body: some View {\n        VStack {\n            ToggleView(isOn: $showDetail)\n            \n            if showDetail {\n                Text(\"深色模式: \\(settings.isDarkMode ? \"开\" : \"关\")\")\n            }\n        }\n    }\n}",
          language: "swift",
          warning: "@StateObject 和 @ObservedObject 容易搞混：持有者用 @StateObject，使用者用 @ObservedObject。",
        },
        {
          title: "常用视图组合",
          content: "VStack 垂直排列，HStack 水平排列，ZStack 叠加排列。List 滚动列表（类似 UITableView），ForEach 遍历数据生成视图。NavigationStack 提供导航栏和页面跳转，NavigationLink 是跳转按钮。Spacer 填充剩余空间。这些组件组合在一起就能搭出复杂界面。",
          code: "struct TaskListView: View {\n    @State private var tasks = [\"买菜\", \"写代码\", \"运动\"]\n    @State private var newTask = \"\"\n    \n    var body: some View {\n        NavigationStack {\n            List {\n                ForEach(tasks, id: \\.self) { task in\n                    NavigationLink(destination: TaskDetailView(task: task)) {\n                        HStack {\n                            Image(systemName: \"circle\")\n                            Text(task)\n                        }\n                    }\n                }\n                .onDelete { indexSet in\n                    tasks.remove(atOffsets: indexSet)\n                }\n            }\n            .navigationTitle(\"任务列表\")\n            .toolbar {\n                ToolbarItem {\n                    Button(\"添加\") {\n                        tasks.append(newTask)\n                        newTask = \"\"\n                    }\n                }\n            }\n        }\n    }\n}",
          language: "swift",
          tip: "ForEach 的 id 参数很重要，SwiftUI 用这个 id 来 diff 视图，必须唯一且稳定。",
        },
        {
          title: "修饰器链",
          content: "SwiftUI 用修饰器（modifiers）来配置视图的外观和行为。每个修饰器返回一个新视图，形成链式调用。.font、.foregroundColor 设置文字样式，.padding、.frame 控制布局，.background、.cornerRadius 装饰外观，.onTapGesture、.onAppear 添加交互。",
          code: "struct CardView: View {\n    let title: String\n    let subtitle: String\n    \n    var body: some View {\n        VStack(alignment: .leading, spacing: 8) {\n            Text(title)\n                .font(.headline)\n                .foregroundColor(.primary)\n            \n            Text(subtitle)\n                .font(.subheadline)\n                .foregroundColor(.secondary)\n        }\n        .padding()\n        .frame(maxWidth: .infinity, alignment: .leading)\n        .background(Color.white)\n        .cornerRadius(12)\n        .shadow(color: .black.opacity(0.1), radius: 5)\n        .onTapGesture {\n            print(\"点击了卡片: \\(title)\")\n        }\n    }\n}",
          language: "swift",
          tip: "修饰器顺序很重要！比如先 .frame 再 .background，背景色只在 frame 范围内。",
        },
        {
          title: "动画和过渡",
          content: "SwiftUI 的动画非常简单。.animation 修饰器让任何值变化都有动画过渡。withAnimation {} 包裹状态修改，所有依赖于该状态的变化都会动起来。.transition 定义视图出现消失的方式，配合 .animation 使用。无论隐式还是显式动画，加一个修饰器的事。",
          code: "struct AnimatedView: View {\n    @State private var isExpanded = false\n    @State private var rotation = 0.0\n    \n    var body: some View {\n        VStack(spacing: 30) {\n            // 隐式动画\n            Circle()\n                .fill(isExpanded ? .blue : .red)\n                .frame(width: isExpanded ? 200 : 100, height: isExpanded ? 200 : 100)\n                .animation(.spring(response: 0.5, dampingFraction: 0.6), value: isExpanded)\n            \n            // 显式动画\n            Button(\"切换 / 旋转\") {\n                withAnimation(.easeInOut(duration: 0.5)) {\n                    isExpanded.toggle()\n                    rotation += 180\n                }\n            }\n            \n            // 过渡动画\n            if isExpanded {\n                Text(\"展开了！\")\n                    .transition(.opacity.combined(with: .slide))\n            }\n        }\n    }\n}",
          language: "swift",
          tip: "iOS 17 后的自定义动画可以用 KeyframeAnimator 或 PhaseAnimator 实现更复杂的多阶段动画。",
        },
      ],
      quiz: [
        {
          question: "SwiftUI 中 View 是什么类型？",
          options: ["class", "struct（协议）", "enum", "protocol"],
          answer: 1,
          explanation: "SwiftUI 的 View 是协议，所有视图实现该协议的 body 计算属性。",
        },
        {
          question: "@State 和 @Binding 的关系？",
          options: ["@State 存数据，@Binding 建立双向绑定通道", "没有关系", "@Binding 存数据", "@State 是 @Binding 的别名"],
          answer: 0,
          explanation: "@State 在视图内部持有状态，@Binding 是读写他人状态的通道，用 $ 传递。",
        },
        {
          question: "SwiftUI 修饰器顺序重要吗？",
          options: ["不重要", "重要！顺序影响最终渲染结果", "只看第一个和最后一个", "只有颜色相关的重要"],
          answer: 1,
          explanation: "修饰器顺序决定了各层叠加的顺序，比如先设 frame 再设背景，背景只作用于 frame 区域。",
        },
        {
          question: "withAnimation 和 .animation 的区别？",
          options: ["没有区别", "withAnimation 是显式动画，.animation 是隐式动画", ".animation 更强大", "withAnimation 已废弃"],
          answer: 1,
          explanation: "withAnimation 包裹状态修改（显式），.animation 绑定到值自动触发（隐式）。",
        },
      ],
    },
    "transactions": {
      slug: "transactions",
      sections: [
        {
          title: "事务是什么、为什么需要它",
          content: "事务就是把一组 SQL 操作打包成一个原子单位——要么全部成功，要么全部失败回滚。就像银行转账：扣 A 的钱和给 B 加钱是两个操作，但必须一起成功或一起失败，不能出现钱扣了但 B 没收到的情况。\n\n事务有四个特性（ACID）：原子性（要么全做要么全不做）、一致性（数据库从一种合法状态变到另一种）、隔离性（多个事务互不干扰）、持久性（提交了就永久保存不会丢）。\n\n没有事务的数据库就像没有保存按钮的文档编辑器——一崩数据就乱。",
          code: "-- 转账操作的正确姿势\nSTART TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n-- 确认余额没问题\nSELECT balance FROM accounts WHERE id = 1;\nCOMMIT;\n-- 出问题就 ROLLBACK;",
          language: "sql",
        },
        {
          title: "隔离级别——脏读、不可重复读、幻读",
          content: "多个事务同时跑，如果不加控制就会出问题。SQL 标准定义了三种并发问题：\n\n脏读——事务 A 改了数据还没提交，事务 B 就读到了。万一 A 回滚了，B 拿到的就是不存在的数据。\n\n不可重复读——事务 A 在一次查询中多次读同一行，中间被事务 B 改了提交了，导致 A 两次读到不同的值。\n\n幻读——事务 A 按条件查了一批行，中间事务 B 插入或删除了符合条件的新行，A 再查发现多了或少了行，像幻觉一样。\n\n为应对这些问题，数据库提供了四种隔离级别：SERIALIZABLE > REPEATABLE READ > READ COMMITTED > READ UNCOMMITTED。",
          code: "-- 查看当前隔离级别\nSELECT @@transaction_isolation;\n\n-- 设置隔离级别\nSET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;\n\n-- MySQL 默认是 REPEATABLE READ\n-- PostgreSQL 默认是 READ COMMITTED",
          language: "sql",
        },
        {
          title: "四种隔离级别详解",
          content: "READ UNCOMMITTED——事务能看到别人还没提交的修改。并发性最高但一致性最差，实际项目基本不用。\n\nREAD COMMITTED——只能看到别人已提交的数据，解决了脏读。但一个事务内两次读同一条可能不一样（不可重复读）。PostgreSQL 的默认级别，适合多数 OLTP 场景。\n\nREPEATABLE READ——同一个事务里多次读同一条记录，结果始终一样。用 MVCC 实现，读的是事务开始时的快照。MySQL InnoDB 默认用这个。InnoDB 通过间隙锁解决了幻读。\n\nSERIALIZABLE——完全串行执行，一个接一个来。并发性最低，数据完全一致，但性能极差，只适合银行核心账务这种场景。",
          code: "-- READ COMMITTED 示例\n-- 事务 A 读不到事务 B 还没提交的修改\n-- 但 B 提交后，A 再读就能看到新值\n\n-- REPEATABLE READ 示例\n-- 事务 A 整个过程中读到的都是事务开始时的快照\n-- B 提交了 A 也看不到",
          language: "sql",
          tip: "大多数 Web 应用用 READ COMMITTED 就够。金融系统、库存扣减这类要求高的才上 REPEATABLE READ 或更高。",
        },
        {
          title: "锁机制——行锁、表锁、间隙锁",
          content: "事务并发控制靠锁。MySQL InnoDB 主要用这几类锁：\n\n行锁——锁住具体几行，粒度最细，并发性最好。UPDATE、DELETE、SELECT FOR UPDATE 会自动加行锁。\n\n表锁——整张表锁住，粒度最粗。ALTER TABLE 或显式的 LOCK TABLES 会加。\n\n间隙锁——锁住索引记录之间的空隙，防止别的事务在这些空隙插入新记录（解决幻读）。只在 REPEATABLE READ 及以上级别生效。\n\n死锁——事务 A 等 B 释放锁，B 又等 A 释放锁，互相等，系统卡死。InnoDB 会自动检测死锁并回滚其中一个事务。",
          code: "-- SELECT ... FOR UPDATE（显式加排他行锁）\nSTART TRANSACTION;\nSELECT stock FROM products WHERE id = 1 FOR UPDATE;\nUPDATE products SET stock = stock - 1 WHERE id = 1;\nCOMMIT;\n\n-- 检查当前锁情况\nSHOW ENGINE INNODB STATUS;",
          language: "sql",
          warning: "SELECT FOR UPDATE 如果 WHERE 条件不走索引，会锁全表。务必确保 WHERE 列有索引。",
        },
        {
          title: "MVCC——多版本并发控制",
          content: "MVCC 是 InnoDB 实现高并发的核心机制。它不通过锁来保证一致性，而是每行数据保存多个版本。每个事务看到的是这个时刻的快照——你开始时候的数据样子，别人改了你暂时看不见。\n\n具体实现：每行有两个隐藏列——DB_TRX_ID（最后一次修改这行的事务 ID）和 DB_ROLL_PTR（指向回滚段的指针，存着旧版本）。事务启动时拿到一个 Read View，通过比对事务 ID 决定能不能看到某个版本的数据。\n\nMVCC 的好处：读不阻塞写，写不阻塞读。没有 MVCC 的话，一个长事务的 SELECT 可能把一切写操作都堵住。",
          code: "-- MVCC 的好处\n-- 事务 A: SELECT * FROM products（快照读，不锁）\n-- 事务 B: UPDATE products SET price = 99 WHERE id = 1（正常写，不等 A）\n\n-- 如果用 SELECT FOR UPDATE 就变成当前读，会锁",
          language: "sql",
          tip: "MVCC 的快照读不需要加锁，所以能实现很高的并发。但 UPDATE、DELETE 还是需要当前读加锁。",
        },
      ],
      quiz: [
        {
          question: "ACID 里的 A 代表什么？",
          options: ["Atomic 原子性", "Accurate 准确性", "Available 可用性", "Async 异步"],
          answer: 0,
          explanation: "A 是原子性——事务里的操作要么全做要么全不做，不存在做一半的情况。",
        },
        {
          question: "MySQL InnoDB 的默认隔离级别是？",
          options: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"],
          answer: 2,
          explanation: "InnoDB 默认 REPEATABLE READ，通过 MVCC 加间隙锁解决幻读问题。",
        },
        {
          question: "什么是死锁？",
          options: ["事务执行太慢", "两个事务互相等对方的锁", "锁一直不释放", "数据库崩溃"],
          answer: 1,
          explanation: "死锁是 A 等 B 的锁、B 又等 A 的锁，循环等待。InnoDB 能自动检测并回滚其中一个。",
        },
        {
          question: "MVCC 快照读和当前读的区别？",
          options: ["没区别", "快照读不加锁读历史版本，当前读加锁读最新版本", "快照读更快但不准确", "当前读不需要事务"],
          answer: 1,
          explanation: "快照读（普通 SELECT）看到的是事务开始时的数据版本，不加锁。当前读（SELECT FOR UPDATE / UPDATE）读最新数据并加锁。",
        },
        {
          question: "间隙锁解决的是什么问题？",
          options: ["脏读", "不可重复读", "幻读", "死锁"],
          answer: 2,
          explanation: "间隙锁锁住索引记录之间的空隙，防止别的事务在范围内 INSERT，从而解决幻读。",
        },
      ],
    },
    "ts-advanced": {
      slug: "ts-advanced",
      sections: [
        {
          title: "联合类型的分布式条件类型",
          content: "条件类型遇到联合类型时有特殊行为——它会自动分布到联合类型的每个成员上。这叫分布式条件类型。\n\nT extends U ? X : Y 当 T 是 A | B 时，等于 (A extends U ? X : Y) | (B extends U ? X : Y)。\n\n这个特性让 Exclude、Extract 等内置类型变得可能：type Exclude<T, U> = T extends U ? never : T。对联合类型 T 的每个成员单独判断，排除匹配 U 的。\n\n如果不想让联合类型分布，把 T 包成一个元组：[T] extends [U] ? X : Y。这样整个联合类型作为一个整体来比较，不拆分。",
          code: "// 分布式条件类型\ntype IsArray<T> = T extends any[] ? 'array' : 'not array';\ntype R1 = IsArray<string | number[]>;  // 'not array' | 'array'\n// 注意！不是 'not array'，而是每个成员分别判断\n\n// 阻止分布——包成元组\ntype IsArraySafe<T> = [T] extends [any[]] ? 'array' : 'not array';\ntype R2 = IsArraySafe<string | number[]>;  // 'not array'\n// 整个联合类型作为整体判断\n\n// Exclude 就是因为分布式才工作\ntype Status = 'active' | 'inactive' | 'deleted';\ntype WithoutDeleted = Exclude<Status, 'deleted'>;  // 'active' | 'inactive'",
          language: "typescript",
          tip: "分布式条件类型是 TypeScript 中最容易被误解的特性之一。它像 map 一样对联合类型的每个成员执行条件类型。",
        },
        {
          title: "infer——类型推导的魔法",
          content: "infer 让你在条件类型里声明一个类型变量，让 TS 去推导它。语法：T extends SomePattern<infer R> ? R : never。\n\ninfer 能做很多看似不可能的事：\n- 提取函数返回值类型（ReturnType）\n- 提取 Promise resolve 的类型（Awaited）\n- 提取数组元素类型\n- 提取函数参数类型元组（Parameters）\n- 提取类的实例类型和构造函数参数\n\ninfer 可以出现在协变位置（输出位置，如返回值）和逆变位置（输入位置，如参数），推导规则不同。\n\n多个 infer——TS 4.7+ 支持在同一个条件类型里写多个 infer 变量。",
          code: "// 提取函数参数类型\n  \ntype MyParameters<T> = T extends (...args: infer P) => any ? P : never;\ntype Fn = (name: string, age: number) => void;\ntype Params = MyParameters<Fn>;  // [string, number]\n\n// 提取数组元素\n  \ntype ArrayItem<T> = T extends Array<infer U> ? U : never;\ntype Item = ArrayItem<string[]>;  // string\n\n// 提取 Promise 值（递归解包）\ntype Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;\ntype P = Awaited<Promise<Promise<number>>>;  // number\n\n// 提取构造函数参数\ntype ConstructorParams<T> = T extends new (...args: infer P) => any ? P : never;\nclass User { constructor(name: string, age: number) {} }\ntype UserParams = ConstructorParams<typeof User>;  // [string, number]",
          language: "typescript",
        },
        {
          title: "模板字面量类型",
          content: "TS 4.1 引入了模板字面量类型——把字符串模板的能力带到类型系统里。\n\n基本语法：type Greeting = `Hello, ${string}`。这不仅能做简单的字符串拼接，还跟联合类型交叉产生笛卡尔积。\n\n事件名生成：type EventName<T extends string> = `on${Capitalize<T>}`。\n\nCSS 属性名：type CSSProp = `--${string}`。\n\n路由类型：type Route = `/${string}/${string}`。\n\n内置字符串操作类型：Uppercase<T>、Lowercase<T>、Capitalize<T>、Uncapitalize<T>。\n\n这在写库的类型定义时特别有用——比如给 DOM 事件类型精确映射。",
          code: "// 模板字面量 + 联合类型 = 笛卡尔积\ntype Event = 'click' | 'focus' | 'blur';\ntype Handler = `on${Capitalize<Event>}`;\n// 'onClick' | 'onFocus' | 'onBlur'\n\n// 路由参数提取\ntype ExtractParams<T extends string> =\n  T extends `${infer Start}/:${infer Param}/${infer Rest}`\n    ? Param | ExtractParams<`/${Rest}`>\n    : T extends `${infer Start}/:${infer Param}`\n    ? Param\n    : never;\n\ntype Params = ExtractParams<'/user/:id/post/:postId'>;\n// 'id' | 'postId'\n\n// 实际应用——API 路由类型安全\ntype API = `/api/${string}`;\n// get endpoint: API = '/api/users'; // OK\n// get endpoint: API = '/other'; // 报错",
          language: "typescript",
          tip: "模板字面量类型在写 DSL 和类型安全的路由/事件系统时特别强大。但复杂的字符串模式可能变慢——不要写过于复杂的递归模板类型。",
        },
        {
          title: "声明合并与模块扩展",
          content: "TypeScript 的声明合并让同名的 interface 或 namespace 自动合并在一起。这在扩展第三方库的类型时特别有用。\n\n全局增强——用 declare global 给全局的 Window 或者 Express 的 Request 加自定义属性。\n\n模块增强——用 declare module 给第三方库补充或覆盖类型定义。\n\n.d.ts 文件——类型声明文件，只包含类型定义不包含运行时代码。放在项目的 types/ 目录或 @types 包中。\n\n常用场景：Express 中间件给 req 加属性（如 req.user）、给 Window 加全局变量。",
          code: "// 增强 Express Request\nimport 'express';\n\ndeclare module 'express' {\n  interface Request {\n    user?: {\n      id: number;\n      role: string;\n    };\n  }\n}\n\n// 之后所有 req.user 都有类型\n\n// 全局 Window\ndeclare global {\n  interface Window {\n    __INITIAL_STATE__: Record<string, any>;\n  }\n}\n\n// 给第三方库补类型\n  \ndeclare module 'some-lib' {\n  export function newFunction(): void;\n}",
          language: "typescript",
        },
        {
          title: "严格模式与最佳实践",
          content: "strict: true 开启后包含这些子检查：\n\nnoImplicitAny——不允许推断类型为 any 的函数参数。\nstrictNullChecks——null 和 undefined 不能赋值给非空类型。\nstrictFunctionTypes——更严格的函数参数逆变检查。\nstrictBindCallApply——bind/call/apply 的参数类型检查。\nstrictPropertyInitialization——类的属性必须在构造函数里或声明时初始化。\nnoImplicitReturns——函数的所有分支必须都有返回值。\n\n生产项目强烈建议 strict: true。虽然一开始报很多错，但这些报错的地方都是潜在的 bug 入口。改完以后代码质量提升巨大。",
          code: "// strictNullChecks 保护的常见 bug\n// 即使 strict 对 null 的处理，也需要合理配合\nfunction findUser(id: number): User | undefined {\n  // 可能找不到\n  return users.find(u => u.id === id);\n}\n\n// strict 下这样写会报错\n// get user = findUser(1);\n// user.name;  // 报错！user 可能是 undefined\n\n// 必须先检查\nget user = findUser(1);\nif (user) {\n  console.log(user.name);  // 安全\n}",
          language: "typescript",
          tip: "strict: true 是一组检查的总开关。如果你不确定改哪个，直接 strict: true 全开。逐步关闭某个检查不如逐步解决所有报错。",
        },
      ],
      quiz: [
        {
          question: "分布式条件类型是什么意思？",
          options: ["条件类型在多个文件里执行", "联合类型的每个成员单独执行条件类型", "条件类型会继承", "只有一个成员参与判断"],
          answer: 1,
          explanation: "T extends U ? X : Y 当 T 是 A | B | C 时，等于对 A、B、C 分别做条件类型再把结果联合起来。这是 Exclude 等工具类型的底层原理。",
        },
        {
          question: "infer 关键字用于什么？",
          options: ["定义接口", "在条件类型里提取/推导类型变量", "声明变量", "引入模块"],
          answer: 1,
          explanation: "infer 让你在条件类型的 extends 子句里声明一个类型变量让 TS 推导。ReturnType、Parameters 等内置类型都基于 infer。",
        },
        {
          question: "declare module 用来做什么？",
          options: ["创建一个新模块", "扩展或覆盖第三方库的类型定义", "声明变量", "导出模块"],
          answer: 1,
          explanation: "declare module 让你在不改源码的情况下给第三方库补类型、扩展现有类型。Express 的 req 加自定义属性就是用的这个。",
        },
        {
          question: "strictNullChecks 开启后有什么影响？",
          options: ["null 被禁止使用", "null 和 undefined 不能赋值给非空类型，必须处理空值情况", "不允许用 ! 断言", "数组不能为空"],
          answer: 1,
          explanation: "strictNullChecks 让 null 和 undefined 成为独立类型，不再能隐式赋值给 string 等类型。所有可能为空的变量都必须显式处理。",
        },
        {
          question: "模板字面量类型的实用场景？",
          options: ["只在玩具代码里用", "类型安全的事件名、路由、CSS 变量等字符串约束", "替代所有字符串", "用于数字计算"],
          answer: 1,
          explanation: "模板字面量类型让类型系统能约束字符串格式。比如通用事件名类型生成、API 路由参数提取等。",
        },
      ],
    },
    "ts-basics": {
      slug: "ts-basics",
      sections: [
        {
          title: "TypeScript 是什么、解决了什么问题",
          content: "TypeScript 是 JavaScript 的超集——所有合法的 JS 代码都是合法的 TS 代码。它在 JS 之上加了类型系统，编译时（不是运行时）做类型检查。\n\nTypeScript 解决的问题：\n1. 类型错误提前发现——拼错属性名、传错参数类型，在写代码时 IDE 就报红，不用等到运行才发现。\n2. 更好的 IDE 体验——自动补全、参数提示、重构工具，全都基于类型信息。\n3. 自文档化——接口和类型定义就是最好的 API 文档。新同事看代码就知道这个函数要什么参数返回什么结果。\n4. 大型项目的可维护性——几万行 JS 代码改了不敢部署？TS 让你改之前编译就知道哪些地方受影响。\n\nTS 代码经过 tsc（TypeScript Compiler）编译成 JS 才能运行。类型信息在编译后全被擦除，不影响运行时性能。",
          code: "# 安装 TypeScript\nnpm install -g typescript\n\n# 初始化项目\ntsc --init  # 创建 tsconfig.json\n\n# 编译\ntsc               # 编译整个项目\ntsc --watch       # 监视模式，文件一变就编译\ntsc --noEmit      # 只检查类型，不输出 JS 文件",
          language: "bash",
        },
        {
          title: "基础类型注解",
          content: "TypeScript 的类型注解写在一个冒号后面：变量: 类型。基本类型有 string、number、boolean、null、undefined、any、unknown。\n\n类型推断——大部分情况下你不写类型注解 TS 也能根据初始值自动推断类型。let name = 'Alice' 自动推断为 string。只有初始值无法推断时（如函数参数）才必须写类型。\n\nany——任何类型，相当于关闭类型检查。别滥用——用了 any 等于放弃 TS 的保护。unknown——安全的 any，在对 unknown 类型的值做任何操作前必须先类型检查。\n\n数组写法：number[] 或 Array<number>。元组（Tuple）：[string, number] 固定长度和类型的数组。",
          code: "// 基础类型\nlet name: string = 'Alice';\nlet age: number = 36;\nlet isActive: boolean = true;\n\n// 类型推断（不需要写类型注解）\nlet city = 'Beijing';  // TS 自动推断为 string\n\n// any vs unknown\nlet data: any = 123;\ndata.toUpperCase();    // 不报错但运行时报错！\n\nlet info: unknown = 123;\n// info.toUpperCase(); // 编译报错！必须先检查类型\nif (typeof info === 'string') {\n  info.toUpperCase();  // 安全了\n}\n\n// 数组和元组\nlet list: number[] = [1, 2, 3];\nlet tuple: [string, number] = ['Alice', 36];",
          language: "typescript",
          tip: "unknown 是 any 的安全替代——对 unknown 类型的值做任何操作前都必须缩小类型范围。养成尽量不用 any 的习惯。",
        },
        {
          title: "函数类型",
          content: "函数的类型包括参数类型和返回值类型。参数类型必须写（除非有默认值），返回值类型可省略（TS 能推断）。\n\n可选参数：参数名后加 ?——表示这个参数可以不传。默认参数：参数名 = 默认值——跟 JS 一样但 TS 能自动推断类型。\n\n剩余参数：...args: number[]——跟 JS 一样但是要加类型注解。\n\n函数重载：同一个函数可以有不同的参数和返回值组合。用多个函数签名加一个实现签名。\n\nvoid 返回类型——函数没有返回值（或返回 undefined）。never——函数永远不会执行完（抛异常或死循环）。",
          code: "// 函数类型\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\n// 可选参数和默认值\nfunction greet(name: string, greeting?: string): string {\n  return `${greeting || 'Hello'}, ${name}`;\n}\n\nfunction multiply(a: number, b = 1): number {\n  return a * b;  // b 自动推断为 number\n}\n\n// 函数重载\nfunction process(x: string): string;\nfunction process(x: number): number;\nfunction process(x: string | number): string | number {\n  if (typeof x === 'string') return x.toUpperCase();\n  return x * 2;\n}",
          language: "typescript",
          tip: "函数参数的类型注解不能省略（除非有默认值可以推断）。如果参数没写类型，TS 会隐式标为 any——在 strict 模式下会报错。",
        },
        {
          title: "tsconfig.json——TypeScript 的配置文件",
          content: "tsconfig.json 是 TypeScript 项目的核心配置文件。几个最常用的选项：\n\ntarget——编译输出到哪个 JS 版本（ES5/ES6/ESNext）。现代项目一般 ESNext 或 ES2022。\nmodule——使用什么模块系统（CommonJS/ESNext）。Node.js 项目用 CommonJS，前端打包的项目用 ESNext 让打包工具处理。\nstrict——严格模式的总开关，开启后会自动启用 noImplicitAny、strictNullChecks 等所有严格检查。强烈建议开启！\noutDir——编译输出目录（如 ./dist）。\nrootDir——源代码目录（如 ./src）。\ninclude/exclude——指定包含/排除哪些文件。\n\npaths——路径别名。把 @/utils 映射到 src/utils，不用写 ../../utils。配合打包工具（Webpack/Vite）的别名一起用。",
          code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"ESNext\",\n    \"strict\": true,\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\",\n    \"esModuleInterop\": true,\n    \"skipLibCheck\": true,\n    \"paths\": {\n      \"@/*\": [\"./src/*\"]\n    }\n  },\n  \"include\": [\"src\"],\n  \"exclude\": [\"node_modules\", \"dist\"]\n}",
          language: "json",
          tip: "strict: true 一开始可能报很多错，但这些都是潜在的 bug。习惯严格模式后写出来的代码质量高一大截。",
        },
        {
          title: "枚举与 literal 类型",
          content: "枚举（enum）把一组相关常量集合在一起。TS 的 enum 编译成 JS 后会变成双向映射的对象（数字枚举）或字符串映射。\n\nconst enum——编译时内联，不生成 JS 对象。性能更好但不能运行时反向查找。\n\n有些团队不喜欢 enum（因为编译后多出 JS 代码），用 union type 代替：type Color = 'red' | 'green' | 'blue'。这叫字面量类型加联合类型——字符串枚举值，编译后零开销。\n\n选 enum 还是 union：需要反向查找（从值找键名）用 enum，只做类型约束用 union type。现代 TS 项目倾向用 union type。",
          code: "// enum\nenum Direction {\n  North = 'N',\n  South = 'S',\n  East  = 'E',\n  West  = 'W'\n}\nfunction move(dir: Direction) {}\nmove(Direction.North);\n\n// const enum（编译后无额外 JS 代码）\nconst enum Size { Small, Medium, Large }\nconst s: Size = Size.Small;\n\n// union type 替代 enum\n// type Direction = 'North' | 'South' | 'East' | 'West';\n// function move(dir: Direction) {}\n// move('North');",
          language: "typescript",
          tip: "const enum 编译后被内联替换为常量值，不留任何 enum 对象。但有些打包工具在 transpileOnly 模式下需要额外配置才能支持 const enum。",
        },
      ],
      quiz: [
        {
          question: "TypeScript 的类型检查发生在什么阶段？",
          options: ["运行时", "编译时（写代码/构建时）", "部署时", "测试时"],
          answer: 1,
          explanation: "TS 在编译阶段做类型检查，编译后的 JS 代码里所有类型信息都被擦除。运行时不检查类型。",
        },
        {
          question: "any 和 unknown 的区别？",
          options: ["没区别", "unknown 更安全——做任何操作前必须先类型检查", "any 更安全", "unknown 只能用于字符串"],
          answer: 1,
          explanation: "any 放弃所有类型检查。unknown 是顶类型——不确定类型时用它，但用之前必须收窄类型（typeof、instanceof 等）。",
        },
        {
          question: "strict: true 做什么？",
          options: ["只检查拼写错误", "开启所有严格的类型检查（noImplicitAny、strictNullChecks 等）", "不让用 any", "必须写类型注解"],
          answer: 1,
          explanation: "strict 是一组严格检查的总开关。强烈建议开启——它帮你提前发现大量潜在 bug。",
        },
        {
          question: "const enum 相比普通 enum 有什么好处？",
          options: ["性能一样", "编译时内联，不生成额外的 JS 对象", "语法更简单", "只能用于数字"],
          answer: 1,
          explanation: "const enum 在编译时直接把值替换过去，不产出运行时代码。适合小而确定的常量集合。",
        },
        {
          question: "TypeScript 真的能替代所有单元测试吗？",
          options: ["能——类型检查就够", "不能——类型检查跟业务逻辑测试是两回事", "可以替代一部分", "不确定"],
          answer: 1,
          explanation: "TS 保证你用的是正确的数据类型和函数签名，但不保证你的业务逻辑是对的。两者的覆盖范围不同，都要有。",
        },
      ],
    },
    "ts-decorators": {
      slug: "ts-decorators",
      sections: [
        {
          title: "装饰器是什么",
          content: "装饰器是一种特殊的声明，可以附加到类、方法、属性、参数上。它让你在不修改原始代码的基础上给类或方法加额外行为。\n\n装饰器本质上是个函数——接收被装饰的目标和相关信息，然后返回或修改目标。\n\n装饰器的执行时机：类定义时执行（不是实例化时）。也就是说装饰器在代码加载阶段就跑完了。\n\n注意：装饰器在 TypeScript 里还是实验特性——需要 tsconfig.json 里开启 experimentalDecorators: true。TC39 的 ES 装饰器提案跟 TS 的实验性装饰器有一定差异，未来会统一。\n\n装饰器在 NestJS（后端）、Angular（前端）、class-validator（数据校验）等框架里大量使用。",
          code: "// tsconfig.json 里\n{\n  \"compilerOptions\": {\n    \"experimentalDecorators\": true,\n    \"emitDecoratorMetadata\": true\n  }\n}",
          language: "json",
        },
        {
          title: "类装饰器",
          content: "类装饰器接收一个参数——被装饰的类的构造函数。返回一个扩展或替换原类的新构造函数（或者返回 undefined 原类不变）。\n\n常见用途：注册组件（Angular 的 @Component）、注册模块（NestJS 的 @Module）、给类加元数据、自动混入方法。\n\n类装饰器不能用箭头函数（因为箭头函数没有 prototype），需要普通函数声明。\n\n配合 reflect-metadata 库，装饰器可以给类附加元数据，然后在运行时通过反射读取。这是 NestJS 依赖注入的底层机制。",
          code: "// 类装饰器\nfunction Logger(constructor: Function) {\n  console.log(`Class ${constructor.name} is being created`);\n}\n\n@Logger\nclass UserService {\n  // 类定义时控制台输出：Class UserService is being created\n}\n\n// 返回新类（工厂模式）\nfunction WithTimestamp<T extends { new(...args: any[]): {} }>(constructor: T) {\n  return class extends constructor {\n    createdAt = new Date();\n  };\n}\n\n// @WithTimestamp\n// class Post {\n//   title: string;\n// }",
          language: "typescript",
        },
        {
          title: "方法装饰器",
          content: "方法装饰器接收三个参数：类的 prototype（实例方法）或构造函数（静态方法）、方法名、属性描述符。\n\n方法装饰器可以修改属性的行为——包装原有方法增加日志、计时、权限检查等横切关注点。这本质上是 AOP（面向切面编程）的思想。\n\n方法装饰器里可以拿到原方法并替换它——在装饰器里用 descriptor.value 拿到原函数，替换成新的包装函数。\n\n常见用途：@Log 记录方法调用、@Catch 捕获异常、@Debounce 防抖、@Throttle 节流、@Authorize 权限检查。",
          code: "// 方法装饰器——日志\nfunction Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {\n  const original = descriptor.value;\n  descriptor.value = function(...args: any[]) {\n    console.log(`Calling ${propertyKey} with`, args);\n    const result = original.apply(this, args);\n    console.log(`${propertyKey} returned`, result);\n    return result;\n  };\n}\n\nclass Calculator {\n  @Log\n  add(a: number, b: number) {\n    return a + b;\n  }\n}\n\n// const calc = new Calculator();\n// calc.add(1, 2);\n// 输出：Calling add with [1, 2]\n//       add returned 3",
          language: "typescript",
        },
        {
          title: "属性装饰器与参数装饰器",
          content: "属性装饰器接收两个参数：类的 prototype 和属性名。它没有属性描述符（因为属性还没赋值），返回值被忽略。\n\n属性装饰器不能直接修改属性值，但可以通过 Reflect.defineMetadata 给属性存入元数据。这是 class-validator 和 class-transformer 的工作原理。\n\n参数装饰器接收三个参数：类的 prototype、方法名、参数位置（从 0 开始）。主要用于依赖注入框架识别需要注入的参数。\n\n装饰器工厂——装饰器本身是函数，装饰器工厂是返回装饰器的函数。比如 @Get('/users') 的 Get 是一个工厂函数，它返回实际的装饰器。这使得装饰器可以接受配置参数。",
          code: "// 装饰器工厂\nfunction Route(path: string) {\n  return function(target: any, propertyKey: string) {\n    Reflect.defineMetadata('path', path, target, propertyKey);\n  };\n}\n\nclass UserController {\n  @Route('/users')\n  getUsers() {}\n}\n\n// 属性装饰器——存元数据\nfunction MinLength(length: number) {\n  return function(target: any, propertyKey: string) {\n    Reflect.defineMetadata('minLength', length, target, propertyKey);\n  };\n}\n\nclass User {\n  @MinLength(3)\n  name: string;\n}",
          language: "typescript",
          tip: "装饰器工厂的名字通常首字母大写(@Get、@Post)，以便跟普通装饰器区分。工厂让你给每个装饰器传不同的配置。",
        },
        {
          title: "装饰器的实际框架应用",
          content: "NestJS——把所有东西都用装饰器串联：@Module、@Controller、@Injectable、@Get、@Post、@Body、@Param、@Query。整个框架就是装饰器的集合。\n\nclass-validator——用装饰器做运行时校验：@IsString()、@IsEmail()、@Min(1)、@Max(100)。\n\nclass-transformer——用装饰器控制序列化/反序列化：@Expose()、@Exclude()、@Transform()。\n\nTypeORM——用装饰器定义数据库实体：@Entity()、@Column()、@PrimaryGeneratedColumn()、@ManyToOne()。\n\n这些框架的原理都一样——装饰器存元数据，框架在运行时读取元数据构建行为。",
          code: "// NestJS 风格示例\n@Controller('users')\nclass UserController {\n  constructor(private userService: UserService) {}\n\n  @Get(':id')\n  async findOne(@Param('id') id: string) {\n    return this.userService.findById(id);\n  }\n\n  @Post()\n  async create(@Body() data: CreateUserDto) {\n    return this.userService.create(data);\n  }\n}\n\n// class-validator 示例\nclass CreateUserDto {\n  @IsString()\n  @MinLength(3)\n  name: string;\n\n  @IsEmail()\n  email: string;\n\n  @IsInt()\n  @Min(0)\n  @Max(150)\n  age: number;\n}",
          language: "typescript",
          tip: "装饰器加 reflect-metadata 是 TypeScript 依赖注入的基石。理解它们是读懂 NestJS、Angular 源码的关键。",
        },
      ],
      quiz: [
        {
          question: "装饰器是什么时候执行的？",
          options: ["类实例化时", "类定义时（代码加载阶段）", "方法被调用时", "程序退出时"],
          answer: 1,
          explanation: "装饰器在类定义时执行——代码被加载、解析的时候。不是在 new 的时候也不是调用方法的时候。理解这点很重要。",
        },
        {
          question: "装饰器工厂和装饰器的区别？",
          options: ["一样", "装饰器工厂是返回装饰器的函数，可以传参数", "工厂只能用于类", "装饰器只能用于方法"],
          answer: 1,
          explanation: "装饰器工厂 = (...args) => 返回装饰器函数。这让装饰器可以接受配置参数，如 @Get('/path')。",
        },
        {
          question: "方法装饰器的 descriptor.value 是什么？",
          options: ["方法的返回类型", "原方法的引用可以替换为包装函数", "参数列表", "方法名"],
          answer: 1,
          explanation: "descriptor.value 是被装饰的原始函数。你可以在装饰器里保存它，然后用一个包装函数替换它实现 AOP。",
        },
        {
          question: "reflect-metadata 在装饰器生态里做什么？",
          options: ["没有实际作用", "在装饰器里存/取元数据，是 DI 和校验框架的基础", "反射代码", "加速编译"],
          answer: 1,
          explanation: "reflect-metadata 提供 Reflect.defineMetadata 和 Reflect.getMetadata，装饰器往里写元数据，框架在运行时读出来构建行为。",
        },
        {
          question: "装饰器可以用于哪些目标？",
          options: ["只能用于类", "类、方法、属性、访问器、参数", "只能用于方法", "只能用于参数"],
          answer: 1,
          explanation: "装饰器有 5 种类型：类装饰器、方法装饰器、属性装饰器、访问器装饰器（get/set）、参数装饰器。",
        },
      ],
    },
    "ts-generics": {
      slug: "ts-generics",
      sections: [
        {
          title: "泛型——类型的变量",
          content: "泛型就是把类型也当成参数——你可以写一个函数、类或接口，不指定具体的类型，而是留一个类型变量（T、U 等），使用者调用时再填具体类型。\n\n为什么需要泛型？假设你写了一个 identity 函数——传什么返回什么。不用泛型的话只能用 any，丢了类型安全。用泛型：identity<string>('hello') 返回 string，identity<number>(42) 返回 number。\n\n泛型变量通常用 T、U、V 表示，多个泛型参数逗号分隔 <T, U>。T 是 Type 的缩写，也可以用有意义的名字如 <TData, TError>。\n\n泛型不是运行时存在的——编译后会被擦除。它纯粹是编译时的类型检查工具。",
          code: "// 不用泛型——丢了类型信息\nfunction identityAny(arg: any): any {\n  return arg;\n}\nget result = identityAny('hello');  // result: any\n\n// 用泛型——保留类型信息\nfunction identity<T>(arg: T): T {\n  return arg;\n}\nget result2 = identity('hello');   // result2: string (自动推断)\nget result3 = identity<number>(42); // result3: number (显式指定)",
          language: "typescript",
          tip: "泛型参数大部分情况可以自动推断，不需要显式写 <Type>。TS 根据传入参数的类型自动推导 T。只在推断不出来或需要强制类型时才显式写。",
        },
        {
          title: "泛型约束——extends 限制类型范围",
          content: "泛型不加限制的话 T 可以是任何类型——但你如果用到了 .length 属性，不是所有类型都有 .length。这时需要泛型约束。\n\n用 extends 约束泛型：<T extends { length: number }> 表示 T 必须是有 length 属性的类型（string、Array、NodeList 等）。\n\n泛型约束的另一个常用场景——<T extends keyof SomeType> 确保 T 是某个类型的属性名：function getProperty<T, K extends keyof T>(obj: T, key: K)。\n\n多个约束可以用交叉类型：<T extends A & B>。\n\n还有个实用的泛型默认值：<T = string> 不传泛型参数时默认为 string。",
          code: "// 泛型约束——要求有 length 属性\nfunction logLength<T extends { length: number }>(item: T): T {\n  console.log(item.length);\n  return item;\n}\nlogLength('hello'); // OK——string 有 length\nlogLength([1, 2, 3]); // OK——数组有 length\n// logLength(123); // 报错——number 没有 length\n\n// 约束为某个类型的键\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\n// 泛型默认值\nfunction createList<T = string>(): T[] {\n  return [];\n}\nget list = createList();   // list: string[]\nget list2 = createList<number>(); // list2: number[]",
          language: "typescript",
        },
        {
          title: "泛型在类与接口中的使用",
          content: "泛型最经典的应用场景：\n\nRepository 模式——数据库操作封装。class Repository<T> 对任何实体都能提供 findById、save、delete 操作。T 是实体类型。\n\nResult/Option 类型——Rust 风格的错误处理。type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }。\n\nAPI 响应包装——interface ApiResponse<T> { code: number; data: T; message: string }。不同接口返回不同 data 类型。\n\nEvent Emitter——class EventEmitter<T extends Record<string, any>>。T 是事件名到参数的映射。",
          code: "// Repository 模式\nclass Repository<T extends { id: number }> {\n  private items: T[] = [];\n  \n  findById(id: number): T | undefined {\n    return this.items.find(item => item.id === id);\n  }\n  \n  save(item: T): void {\n    this.items.push(item);\n  }\n}\n\ninterface User { id: number; name: string; }\nget userRepo = new Repository<User>();\n\n// API 响应包装\ninterface ApiResponse<T> {\n  code: number;\n  data: T;\n  message: string;\n}\n\ntype UserResponse = ApiResponse<User>;\ntype ListResponse = ApiResponse<User[]>;",
          language: "typescript",
        },
        {
          title: "泛型的高级模式——条件泛型",
          content: "泛型跟条件类型结合能做很酷的事：\n\n根据泛型参数的值返回不同类型——T extends 'string' ? string : T extends 'number' ? number : never。\n\n泛型参数可以是另一个泛型——<T extends Array<infer U>> 提取数组元素的类型。\n\n模板字面量类型的泛型——TS 4.1+ 支持字符串模板作为类型：type EventName<T extends string> = `on${Capitalize<T>}`。type ChangeEvent = EventName<'change'>; // 'onChange'。\n\n这些高级泛型模式是类型体操的范畴，日常业务开发用到的少，但写通用工具库时会频繁用到。",
          code: "// 条件泛型——根据输入类型返回不同输出\ninterface StringMap { string: string; number: number; boolean: boolean; }\ntype GetType<T extends keyof StringMap> = StringMap[T];\n\ntype A = GetType<'string'>;  // string\nget B = GetType<'number'>;  // number\n\n// 提取 Promise 的值类型\ntype Unwrap<T> = T extends Promise<infer U> ? U : T;\ntype P1 = Unwrap<Promise<string>>;  // string\ntype P2 = Unwrap<number>;           // number\n\n// 模板字面量泛型\ntype EventName<T extends string> = `on${Capitalize<T>}`;\ntype ClickHandler = EventName<'click'>;  // 'onClick'",
          language: "typescript",
        },
        {
          title: "日常开发中最常用的泛型模式",
          content: "不用记所有高级泛型，日常开发 90% 就这几个模式：\n\n1. 带泛型的函数——useState<T>、Array<T>、Promise<T>。TypeScript 自带，不需要自己写。\n\n2. 泛型约束——确保传入的对象有某个属性，确保参数是对象的合法 key。\n\n3. 泛型响应包装——所有 API 调用的统一返回格式。\n\n4. 泛型工具类型——Partial、Pick、Omit、Record。四个组合能解决大部分对象类型变换。\n\n5. React 里的泛型——useState<User>()、useRef<HTMLInputElement>(null)、forwardRef<HTMLDivElement>。",
          code: "// 日常泛型模式\n\n// 1. 带泛型的 hooks\nconst [user, setUser] = useState<User | null>(null);\nconst ref = useRef<HTMLInputElement>(null);\n\n// 2. 泛型响应\nasync function fetchData<T>(url: string): Promise<ApiResponse<T>> {\n  const res = await fetch(url);\n  return res.json();\n}\n\n// 3. 泛型事件处理\nfunction handleChange<T extends HTMLInputElement>(e: React.ChangeEvent<T>) {\n  console.log(e.target.value);\n}\n\n// 4. 泛型回调\nfunction debounce<T extends (...args: any[]) => any>(\n  fn: T, delay: number\n): (...args: Parameters<T>) => void {\n  let timer: ReturnType<typeof setTimeout>;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}",
          language: "typescript",
        },
      ],
      quiz: [
        {
          question: "泛型的主要作用是什么？",
          options: ["让代码变慢", "保持类型信息同时实现代码复用", "只能用于函数", "替代接口"],
          answer: 1,
          explanation: "泛型让你写一份代码能处理多种类型，同时保留类型安全。比用 any 安全，比重载简洁。",
        },
        {
          question: "extends 在泛型约束里什么意思？",
          options: ["继承", "限制泛型参数必须满足某个类型", "扩展类型", "实现接口"],
          answer: 1,
          explanation: "extends 在泛型里是约束——T extends SomeType 表示 T 必须是 SomeType 的子类型，即具有 SomeType 的所有特性。",
        },
        {
          question: "泛型参数可以用默认值吗？",
          options: ["不可以", "可以——<T = string> 不传参数时默认为这个类型", "只有在函数里可以", "只有在类里可以"],
          answer: 1,
          explanation: "<T = DefaultType> 是泛型默认值。不传泛型参数时自动使用默认类型，跟函数参数的默认值一个道理。",
        },
        {
          question: "TypeScript 的泛型在编译成 JS 后会保留吗？",
          options: ["会", "不会——编译后类型信息全部擦除", "部分保留", "取决于配置"],
          answer: 1,
          explanation: "泛型纯粹是编译时的概念。编译成 JS 后所有泛型类型参数都会消失，不影响运行时行为。",
        },
        {
          question: "useState<User>() 里的泛型参数有什么用？",
          options: ["没什么用", "告诉 TS state 的类型是 User，后续使用时能正确推断", "让组件渲染更快", "是 React 的硬性要求"],
          answer: 1,
          explanation: "useState 从初始值能推断类型，但如果初始值是 null 就需要显式写泛型：useState<User | null>(null)。不写 TS 推断不出来。",
        },
      ],
    },
    "ts-interfaces": {
      slug: "ts-interfaces",
      sections: [
        {
          title: "interface vs type——用哪个",
          content: "interface 和 type 都能描述对象形状，大部分情况下可以互换。但在 TS 的哲学里它们有分工：\n\ninterface——用于定义对象的结构，可以被扩展（extends）、可以被同名的 interface 合并（declaration merging）。适合公开的 API 类型、第三方库的类型扩展。\n\ntype——用于类型别名，可以是任意类型（联合、交叉、函数、基本类型的别名）。不能同名的 type（报错），但可以用交叉类型 & 组合。\n\n选 interface 还是 type：\n- 需要被外部扩展（如某个库的类型让用户补字段）→ interface\n- 需要联合类型、映射类型这类复杂类型 → type\n- 只是一个普通对象类型 → 两者都可以，团队内部统一风格更重要",
          code: "// interface——对象结构\ninterface User {\n  id: number;\n  name: string;\n}\n\n// type——任何类型\ntype ID = string | number;\ntype Point = { x: number; y: number };\ntype Callback = (data: User) => void;\n\n// interface 可以被多次声明（合并）\ninterface Config {\n  url: string;\n}\ninterface Config {\n  timeout: number;  // 自动合并\n}\n// Config = { url: string; timeout: number }",
          language: "typescript",
        },
        {
          title: "interface 的继承与扩展",
          content: "interface 使用 extends 继承另一个 interface。可以被多个接口共同继承（多重继承）。\n\nextends 后面可以接多个 interface 用逗号分隔：interface Child extends Parent1, Parent2。\n\ninterface 也可以 extends 一个 type（只要这个 type 是对象类型）。同样 type 可以通过交叉类型 & 跟 interface 组合。\n\n实际项目中常见场景：基础 interface 定义核心字段，子 interface 扩展额外字段。比如 BaseEntity（id、createdAt、updatedAt）被所有实体 interface 继承。",
          code: "// 基础实体\ninterface BaseEntity {\n  id: number;\n  createdAt: Date;\n  updatedAt: Date;\n}\n\n// 继承\ninterface User extends BaseEntity {\n  name: string;\n  email: string;\n}\n\n// 多重继承\ninterface Timestamped { createdAt: Date; updatedAt: Date; }\ninterface SoftDeletable { deletedAt?: Date; }\ninterface Post extends Timestamped, SoftDeletable {\n  id: number;\n  title: string;\n}\n\n// interface extends type\ntype WithId = { id: number };\ninterface Product extends WithId {\n  name: string;\n}",
          language: "typescript",
        },
        {
          title: "可选属性、只读属性与索引签名",
          content: "可选属性——属性名后加 ?，表示这个字段可能不存在。常用于 API 的 PATCH 请求参数（只有要改的字段才传）。\n\n只读属性——readonly 前缀，初始化后不能修改。跟 const 的区别：const 用于变量，readonly 用于属性。\n\n索引签名——定义未知键名的属性类型。{ [key: string]: any } 表示这个对象可以有任意字符串键。\n\nRecord<K, V> 是索引签名的泛型版——Record<string, User> 等价于 { [key: string]: User }。\n\n泛型索引签名——{ [K in keyof T]: T[K] } 遍历 T 的所有属性创建新类型，这是映射类型的本质。",
          code: "// 可选属性\ninterface UpdateUserDTO {\n  name?: string;\n  email?: string;\n  // 只传要改的字段，不改的不用传\n}\n\n// 只读属性\ninterface Config {\n  readonly apiUrl: string;\n  readonly timeout: number;\n}\n\n// 索引签名\ninterface Dictionary<T> {\n  [key: string]: T;\n}\nget users: Dictionary<User> = {};\nusers['user-1'] = { id: 1, name: 'Alice' };",
          language: "typescript",
          tip: "索引签名配合 readonly 可以做只读字典：{ readonly [key: string]: Value }。这在做配置对象映射时很有用。",
        },
        {
          title: "函数类型与 call signature",
          content: "interface 不仅能描述对象，还能描述函数——这叫 call signature。语法：(参数列表): 返回值类型。\n\n既有属性又能调用的对象——函数本身也是对象可以有属性，用 interface 同时描述函数的调用签名和属性。\n\n函数类型还可以用 type 定义：type Fn = (x: number) => string。type 更简洁适合简单函数，interface 适合复杂函数（有重载、有属性）。",
          code: "// call signature\ninterface Greeting {\n  (name: string): string;\n}\nconst greet: Greeting = (name) => 'Hello, ' + name;\n\n// 既有属性又能调用的对象\ninterface Logger {\n  (message: string): void;\n  level: 'info' | 'warn' | 'error';\n}\n\nconst logger: Logger = (msg) => console.log(msg);\nlogger.level = 'info';\nlogger('test');   // 可以调用\n\n// 函数重载的 interface\nget OverloadedFn = {\n  (x: string): string;\n  (x: number): number;\n};",
          language: "typescript",
          tip: "函数类型用 type 更常见：type Handler = (req: Request, res: Response) => void。interface 的函数签名在需要重载或带属性时更合适。",
        },
        {
          title: "接口设计最佳实践",
          content: "1. 接口应该小而专注——Interface Segregation（接口隔离原则）。一个大接口拆成多个小接口再组合。\n2. 使用可选属性表示「可能没有」的字段而不是 null | undefined。? 比 | undefined 更清晰。\n3. 用 extends 而不是重复声明相同字段。多个接口有公共字段应该提取基接口。\n4. 对外暴露的接口和内部使用的接口分开。API 返回给前端的跟数据库实体通常不同。\n5. 接口文件名——很多项目用 .type.ts 或 .interface.ts 或直接在 entity 文件里定义。按团队约定统一。",
          code: "// 好的做法：小接口组合\ninterface HasId { id: number; }\ninterface HasTimestamps { createdAt: Date; updatedAt: Date; }\ninterface HasName { name: string; }\n\ninterface User extends HasId, HasTimestamps, HasName {\n  email: string;\n}\n\n// API 返回给前端 vs 数据库实体\ninterface UserEntity extends HasId, HasTimestamps {\n  name: string;\n  passwordHash: string;  // 数据库有\n}\n\ninterface UserResponse {\n  id: number;\n  name: string;\n  // 没有 passwordHash——不给前端\n}",
          language: "typescript",
        },
      ],
      quiz: [
        {
          question: "interface 和 type 什么时候必须用 interface？",
          options: ["任何情况", "需要 declaration merging 时", "做联合类型时", "做函数类型时"],
          answer: 1,
          explanation: "同名的 interface 会自动合并（declaration merging），type 不行。扩展第三方库类型时通常用 interface。",
        },
        {
          question: "readonly 跟 const 有什么区别？",
          options: ["一样", "readonly 用于对象属性，const 用于变量", "readonly 只能在类里用", "const 可以改值"],
          answer: 1,
          explanation: "const 声明变量不能重新赋值。readonly 标记对象/接口属性初始化后不能修改。两者保护不同的东西。",
        },
        {
          question: "索引签名 { [key: string]: T } 表示什么？",
          options: ["空对象", "对象的键可以是任意字符串，值类型为 T", "只允许数字键", "数组"],
          answer: 1,
          explanation: "索引签名定义对象的键和值的类型关系。{ [key: string]: User } 相当于字典结构——通过字符串键访问 User 对象。",
        },
        {
          question: "可选属性跟 ?: string | undefined 有什么区别？",
          options: ["完全一样", "?: 允许属性不存在，| undefined 要求属性必须存在但值可以是 undefined", "?: 只能用 string", "没区别"],
          answer: 1,
          explanation: "name?: string 表示这个属性在对象里可以不存在。name: string | undefined 表示属性必须存在，只是值可以是 undefined。",
        },
        {
          question: "API 返回给前端的接口为什么要和数据库实体接口分开？",
          options: ["没必要分开", "安全——不暴露敏感字段，解耦——数据库结构变了不影响前端", "TS 要求必须分开", "分开让代码更长"],
          answer: 1,
          explanation: "实体可能有密码哈希等敏感字段不该返回给前端。而且数据库结构可能跟前端需要的数据形状不一样，拆开更灵活。",
        },
      ],
    },
    "ts-project": {
      slug: "ts-project",
      sections: [
        {
          title: "从零搭建 TypeScript 项目",
          content: "搭建一个 TypeScript 项目不光是装个包那么简单。现代 TS 项目推荐配套：\n\n1. Node.js 项目——ts-node 或 tsx 直接运行 TS 文件，省去先编译再运行的步骤。\n2. 前端项目——Vite 或 Next.js 自带 TS 支持，创建项目时就选 TS 模板。\n3. 构建输出——tsc 编译成 JS 输出到 dist/ 目录。\n4. 类型检查——tsc --noEmit 只检查不输出，放到 CI 和 pre-commit hook 里。\n5. 格式化和 lint——Prettier + ESLint（typescript-eslint）保持代码风格一致。",
          code: "# Node.js 项目\nmkdir my-project && cd my-project\nnpm init -y\nnpm install -D typescript @types/node tsx\ntsc --init\n\n# 运行 TS 文件\nnpx tsx src/index.ts\n\n# 前端项目\nnpm create vite@latest my-app -- --template react-ts\n\n# 只检查类型\nnpx tsc --noEmit",
          language: "bash",
        },
        {
          title: "tsconfig.json 详细配置指南",
          content: "一个生产级别的 tsconfig.json：\n\ntarget——编译输出到哪个 JS 版本。Node.js 18 推荐 ES2022。\nmodule——模块系统。Node.js 用 commonjs 或 nodenext，前端打包项目用 ESNext。\nmoduleResolution——模块解析策略。node 或 bundler。\nrootDir / outDir——源码和输出分开。\nesModuleInterop——让默认导出和命名导出互操作更顺畅。\nskipLibCheck——跳过 .d.ts 文件的类型检查（快很多）。\nforceConsistentCasingInFileNames——文件名大小写一致（Windows 上区分，Mac 上不区分，不开容易出问题）。\n\ndeclaration: true——生成 .d.ts 类型声明文件（如果你要发布为 npm 包）。\nsourceMap: true——生成 source map，调试时能看到原始 TS 代码。",
          code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"NodeNext\",\n    \"moduleResolution\": \"NodeNext\",\n    \"rootDir\": \"./src\",\n    \"outDir\": \"./dist\",\n    \"strict\": true,\n    \"esModuleInterop\": true,\n    \"skipLibCheck\": true,\n    \"forceConsistentCasingInFileNames\": true,\n    \"declaration\": true,\n    \"sourceMap\": true,\n    \"resolveJsonModule\": true,\n    \"isolatedModules\": true\n  },\n  \"include\": [\"src\"],\n  \"exclude\": [\"node_modules\", \"dist\"]\n}",
          language: "json",
        },
        {
          title: "声明文件 .d.ts——给 JS 加类型",
          content: ".d.ts 文件是纯类型声明文件——不包含运行时代码，只告诉 TypeScript「这个模块/对象的类型长这样」。\n\n什么时候需要写 .d.ts：\n1. 你用了一个没有官方类型的 JS 库——写 .d.ts 文件声明模块类型。\n2. 你在项目中定义了全局类型或全局变量。\n3. 你发布 npm 包——写 .d.ts 让用户获得类型提示。\n\ndeclare module 'module-name'——给一个 JS 模块声明类型。如果只用到模块的少数几个方法，只声明你需要的就行。\n\ndeclare global——声明全局变量。例如 declare var __VERSION__: string。\n\n全局类型文件 types/*.d.ts——把常用的全局类型（如 API 响应的通用包装）放这里，不用到处 import。",
          code: "// types/global.d.ts\n// 声明一个没有类型的 JS 模块\ndeclare module 'legacy-lib' {\n  export function doSomething(input: string): number;\n}\n\n// 声明全局变量\ndeclare var __VERSION__: string;\ndeclare var __BUILD_TIME__: number;\n\n// 声明静态资源导入\n// declare module '*.svg' {\n//   const content: React.FC<React.SVGProps<SVGSVGElement>>;\n//   export default content;\n// }\n\ndeclare module '*.css' {\n  const content: Record<string, string>;\n  export default content;\n}",
          language: "typescript",
        },
        {
          title: "ESLint + Prettier 的 TS 配置",
          content: "TypeScript 的 lint 以前用 TSLint，现在已经废弃。现在都用 ESLint + @typescript-eslint。\n\n核心包：eslint、@typescript-eslint/parser、@typescript-eslint/eslint-plugin。\n\nPrettier 负责格式化（缩进、引号、分号），ESLint 负责代码质量（未使用的变量、错误的类型断言、detect async 里的 await 缺失）。两者分工明确。\n\neslint-config-prettier——关闭 ESLint 里跟 Prettier 冲突的规则。确保顺序：ESLint 先跑，Prettier 后格式化。\n\nCI 里加上 npx eslint 和 npx prettier --check，以及 npx tsc --noEmit。三道关过不了不能合并。",
          code: "# 安装\nnpm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin\nnpm install -D prettier eslint-config-prettier\n\n# .eslintrc.json\n{\n  \"parser\": \"@typescript-eslint/parser\",\n  \"plugins\": [\"@typescript-eslint\"],\n  \"extends\": [\n    \"eslint:recommended\",\n    \"plugin:@typescript-eslint/recommended\",\n    \"prettier\"\n  ]\n}\n\n# package.json 的 lint 脚本\n{\n  \"scripts\": {\n    \"lint\": \"eslint 'src/**/*.{ts,tsx}'\",\n    \"format\": \"prettier --write 'src/**/*.{ts,tsx}'\",\n    \"typecheck\": \"tsc --noEmit\"\n  }\n}",
          language: "bash",
          tip: "CI 管线里 typecheck、lint、format check 三个都跑一遍，确保代码质量。pre-commit hook 只跑 lint-staged（快），完整检查交给 CI。",
        },
        {
          title: "生产环境的 TS 最佳实践",
          content: "1. strict: true 从项目第一天就开启。后面开会有几百个报错很难改。\n2. 避免 any——用 unknown + 类型守卫替代。as any 越多 TS 的价值越低。\n3. 类型收窄——联合类型变量用 if/switch 缩窄类型范围，不要到处 as 断言。\n4. 泛型约束——extends 约束泛型参数，不要写成裸 T。\n5. 给异步函数声明返回类型——避免意外返回 Promise<void> 而是 Promise<SpecificType>。\n6. import type——只用到的类型用 import type 导入，编译后不留下 import 语句。\n7. 善用 enum 替代（union type / as const object）——不用生成额外运行时代码的方案。",
          code: "// 好的 TS 实践\n\n// 1. 避免 any\nfunction safe(data: unknown) {\n  if (typeof data === 'string') {\n    return data.toUpperCase();\n  }\n  return null;\n}\n\n// 2. import type——只导类型不导值\nimport type { User } from './types';\nimport { getUser } from './api';  // 这个是值，正常 import\n\n// 3. as const 替代 enum\n// const STATUS = {\n//   ACTIVE: 'active',\n//   INACTIVE: 'inactive'\n// } as const;\n// type Status = typeof STATUS[keyof typeof STATUS];",
          language: "typescript",
          tip: "import type 在编译后会被完全删除——不会出现在输出的 JS 里。用这能避免循环依赖和减少打包体积。",
        },
      ],
      quiz: [
        {
          question: "esModuleInterop 解决什么问题？",
          options: ["模块解析速度", "让默认导入和命名空间导入在 CommonJS 模块里正常工作", "加密模块", "异步加载"],
          answer: 1,
          explanation: "它让 import React from 'react' 这种写法在 CommonJS 模块系统中也能正常工作，不用 import * as React。",
        },
        {
          question: ".d.ts 文件里能写运行时代码吗？",
          options: ["能", "不能——只包含类型声明不包含可执行代码", "能，但有限制", "只能写函数"],
          answer: 1,
          explanation: ".d.ts 是纯类型声明文件。function 只能声明签名没有实现体。编译时类型检查用，不产生 JS 输出。",
        },
        {
          question: "tsc --noEmit 的作用？",
          options: ["不输出任何文件，只做类型检查", "不检查类型", "加密输出", "压缩输出"],
          answer: 0,
          explanation: "--noEmit 只跑类型检查不生成 JS 文件。CI 和开发阶段常用——我只想知道有没有类型错误，JS 由打包工具生成。",
        },
        {
          question: "skipLibCheck 为什么能加速编译？",
          options: ["跳过所有文件", "跳过 .d.ts 声明文件的类型检查", "跳过源代码", "多线程编译"],
          answer: 1,
          explanation: "skipLibCheck 不去检查 node_modules 里的 .d.ts 文件。大部分情况这些文件都是正确的，检查它们纯浪费时间。",
        },
        {
          question: "import type 和普通 import 的区别？",
          options: ["一样", "import type 编译后从 JS 中完全删除，只留下类型信息", "import type 运行更快", "import type 只能从 .d.ts 文件导入"],
          answer: 1,
          explanation: "import type 告诉 TS 这个导入只用于类型标注。编译后这条 import 在 JS 里不存在，避免不必要的运行时依赖。",
        },
      ],
    },
    "ts-types": {
      slug: "ts-types",
      sections: [
        {
          title: "联合类型与交叉类型",
          content: "联合类型（Union）——值可以是几种类型中的任意一种。用竖线分割：string | number | boolean。通俗说就是「可以这样也可以那样」。\n\n交叉类型（Intersection）——值同时满足多个类型的要求。用 & 连接：A & B 表示既要有 A 的所有属性也要有 B 的所有属性。通俗说就是「既要这样也要那样」。\n\n联合类型用得远多于交叉类型。典型场景：函数参数接受多种输入（number | string）、API 响应可能是多种形状。\n\n类型收窄——联合类型的变量在使用时，TS 会根据条件判断自动缩小类型范围。typeof 检查、if 判断、switch 都能收窄类型。",
          code: "// 联合类型\ntype ID = string | number;\nfunction getUser(id: ID) {}\ngetUser(123);     // OK\ngetUser('abc');   // OK\n\n// 交叉类型\ninterface Named { name: string; }\ninterface Aged { age: number; }\ntype Person = Named & Aged;\n// Person 必须有 name 和 age\n\n// 类型收窄\nfunction pad(value: string | number) {\n  if (typeof value === 'number') {\n    return value.toFixed(2);  // TS 知道这里是 number\n  }\n  return value.padStart(5);   // TS 知道这里是 string\n}",
          language: "typescript",
        },
        {
          title: "字面量类型与 keyof",
          content: "字面量类型——类型不仅可以是 string，还可以是具体的字符串值。type Status = 'active' | 'inactive' | 'pending'。\n\ntypeof——获取一个已有变量/对象的类型。const person = { name: 'Alice', age: 30 }; type Person = typeof person; // { name: string; age: number }。\n\nkeyof——获取一个类型的所有键组成的联合类型。type UserKeys = keyof User; // 'id' | 'name' | 'email'。\n\n这些跟泛型配合时威力巨大——比如写一个类型安全的 pick 函数：function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>。",
          code: "// 字面量类型\ntype Status = 'active' | 'inactive' | 'pending';\nlet current: Status = 'active';\n// current = 'deleted'; // 编译报错\n\n// typeof\nget config = { api: 'https://api.example.com', timeout: 5000 };\ntype Config = typeof config;\n// Config = { api: string; timeout: number }\n\n// keyof\nget User = { id: number; name: string; email: string };\ntype UserKey = keyof User;  // 'id' | 'name' | 'email'\n\n// keyof 泛型实战\nget getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {\n  return obj[key];\n};\nget user = { name: 'Alice', age: 30 };\nget name = getProperty(user, 'name');  // name: string\n// getProperty(user, 'email');  // 编译报错！user 没有 email",
          language: "typescript",
          tip: "keyof + 泛型是 TypeScript 类型体操的核心。学会用 keyof 能写出非常精确的类型约束，大幅减少运行时 bug。",
        },
        {
          title: "类型守卫与类型断言的正确用法",
          content: "类型守卫——在运行时检测某值的类型并自动收窄。方式：typeof（基本类型）、instanceof（类实例）、自定义类型守卫（返回值是 value is SomeType）。\n\n自定义类型守卫——函数返回类型写 value is T，返回 true 时 TS 自动收窄。适合判断复杂对象类型的场景。\n\n类型断言——你告诉 TS「我知道这个值的类型比你推断的准」。语法是 as 类型 或 <类型>值（JSX 里不能用尖括号）。\n\nas const——把变量断言为字面量类型且只读。const obj = { name: 'Alice' } as const; // type = { readonly name: 'Alice' }。",
          code: "// 自定义类型守卫\ninterface Cat { meow(): void; }\ninterface Dog { bark(): void; }\n\nfunction isCat(animal: Cat | Dog): animal is Cat {\n  return (animal as Cat).meow !== undefined;\n}\n\nfunction handleAnimal(animal: Cat | Dog) {\n  if (isCat(animal)) {\n    animal.meow();  // TS 知道是 Cat\n  } else {\n    animal.bark();  // TS 知道是 Dog\n  }\n}\n\n// 类型断言\nget canvas = document.getElementById('canvas');\n// canvas: HTMLElement | null\n// 你不知道它是 Canvas，断言一下\n  \nget myCanvas = document.getElementById('canvas') as HTMLCanvasElement;\nmyCanvas.getContext('2d');\n\n// as const\n  \nget config = { api: 'https://api.example.com', timeout: 5000 } as const;\n// config 的类型变成只读字面量类型",
          language: "typescript",
          tip: "as any 是最后手段——先把类型断言成 any 再设成你想要的。但如果频繁用这个，说明类型设计该重构了。",
        },
        {
          title: "条件类型",
          content: "条件类型——类型也能做 if-else 判断。语法：T extends U ? X : Y。如果 T 是 U 的子类型，结果就是 X，否则是 Y。\n\n常用内置条件类型：\nExclude<T, U>——从 T 里排除 U。\nExtract<T, U>——从 T 里提取 U。\nNonNullable<T>——排除 null 和 undefined。\nReturnType<T>——获取函数返回值类型。\nParameters<T>——获取函数参数类型（元组）。\nAwaited<T>——获取 Promise resolve 的类型。\n\n条件类型加 infer 能做更复杂的事情——从类型里提取一部分。比如 ReturnType 就是靠 infer 实现的。",
          code: "// 条件类型基础\ntype IsString<T> = T extends string ? 'yes' : 'no';\ntype A = IsString<string>;   // 'yes'\ntype B = IsString<number>;   // 'no'\n\n// 内置条件类型\ntype Status = 'active' | 'inactive' | 'deleted';\ntype ActiveStatus = Exclude<Status, 'deleted'>;  // 'active' | 'inactive'\n\nfunction fetchUsers(): Promise<User[]> { ... }\ntype FetchReturn = ReturnType<typeof fetchUsers>;  // Promise<User[]>\ntype Users = Awaited<FetchReturn>;  // User[]\n\n// infer——从类型中提取部分\ntype GetArrayItem<T> = T extends Array<infer U> ? U : never;\ntype Item = GetArrayItem<string[]>;  // string",
          language: "typescript",
          tip: "infer 只能在条件类型的 extends 子句里用。它把你想要推导的类型部分提取到一个新类型变量里。",
        },
        {
          title: "映射类型——基于已有类型生成新类型",
          content: "映射类型——把已有类型的每个属性做某种变换生成新类型。语法：{ [K in keyof T]: 变换 }。\n\n内置映射类型：\nPartial<T>——所有属性变可选。\nRequired<T>——所有属性变必填。\nReadonly<T>——所有属性变只读。\nPick<T, K>——从 T 里挑出 K 指定的属性。\nOmit<T, K>——从 T 里排除 K 指定的属性。\nRecord<K, V>——创建键为 K 类型、值为 V 类型的对象类型。\n\n这些映射类型是 Express、React 等框架类型定义的基础——各种配置项的可选/必选、API 参数的挑选/排除，全靠映射类型。",
          code: "interface User {\n  id: number;\n  name: string;\n  email: string;\n  password: string;\n}\n\n// 更新用户时 name 和 email 可选\ntype UpdateUser = Partial<Pick<User, 'name' | 'email'>>;\n// { name?: string; email?: string }\n\n// 返回给前端时不暴露 password\n// type PublicUser = Omit<User, 'password'>;\n// { id: number; name: string; email: string }\n\n// Record——创建字典类型\ntype Cache = Record<string, User>;\n// { [key: string]: User }\n\n// 自定义映射类型——把所有属性变为可空\ntype Nullable<T> = { [K in keyof T]: T[K] | null };\n// Nullable<User> → 所有字段可能为 null",
          language: "typescript",
          tip: "Pick 和 Omit 是项目中用得最多的两个工具类型。API 入参选几个字段用 Pick，排除敏感字段用 Omit。",
        },
      ],
      quiz: [
        {
          question: "联合类型 (string | number) 和交叉类型 ({a:1} & {b:2}) 的区别？",
          options: ["一样", "联合是或关系，交叉是且关系", "联合是且，交叉是或", "两者不能混用"],
          answer: 1,
          explanation: "联合类型——可以是这几种之一（或）。交叉类型——必须同时满足所有（且）。string | number 可传字符串或数字；A & B 必须具有两者的所有属性。",
        },
        {
          question: "keyof 有什么用？",
          options: ["获取类型的所有值的联合类型", "获取类型的所有键名的联合类型", "创建新类型", "删除类型"],
          answer: 1,
          explanation: "keyof T 返回 T 的所有键的字符串/数字/符号的联合类型。泛型中配合 extends keyof 限制参数必须是某个类型的键。",
        },
        {
          question: "as const 做了什么？",
          options: ["类型断言为 any", "把值断言为字面量类型且变为只读", "创建常量", "等同于 const 关键字"],
          answer: 1,
          explanation: "as const 把推断的类型从广义缩窄到具体字面量，同时所有属性变为 readonly。常用于配置对象和枚举替代。",
        },
        {
          question: "Partial<T> 做什么？",
          options: ["删除所有属性", "把 T 的所有属性变成可选的", "把类型拆分", "创建新类型"],
          answer: 1,
          explanation: "Partial<T> 是内置的映射类型——把 T 的每个属性前面加上 ? 变成可选。Update DTO 等场景大量使用。",
        },
        {
          question: "ReturnType<T> 是什么？",
          options: ["输出类型为 T 的函数", "获取函数类型 T 的返回值类型", "创建一个新函数", "返回参数类型"],
          answer: 1,
          explanation: "ReturnType<typeof fn> 推导出函数的返回值类型。它是用 infer 实现的条件类型：T extends (...args: any[]) => infer R ? R : never。",
        },
      ],
    },
    "vue-components": {
      slug: "vue-components",
      sections: [
        {
          title: "组件的本质",
          content: "组件就是把页面拆成一个个小积木块，每个积木块有自己独立的结构、样式和行为。Vue 组件文件以 .vue 结尾，里面分三块：template 写 HTML，script 写 JS，style 写 CSS。就像一个封装好的小盒子，对外暴露 props 接收数据，通过 emit 往外传消息。",
          code: "<template>\n  <button @click=\"handleClick\">{{ label }}</button>\n</template>\n\n<script setup>\nconst props = defineProps({ label: String })\nconst emit = defineEmits(['click'])\nfunction handleClick() { emit('click') }\n</script>\n\n<style scoped>\nbutton { padding: 8px 16px; }\n</style>",
          language: "html",
        },
        {
          title: "Props 父传子",
          content: "Props 是父组件传给子组件的数据通道，只读不能改。在子组件里用 defineProps 定义接收哪些 prop，可以指定类型、默认值、是否必填。类型检查是在运行时做的，TypeScript 项目里还可以用泛型获得编译时检查。",
          code: "// 子组件\nconst props = defineProps({\n  title: { type: String, required: true },\n  count: { type: Number, default: 0 }\n})\n\n// 父组件\n<Card title=\"我的卡片\" :count=\"10\" />",
          language: "javascript",
          tip: "Props 命名在模板里用 kebab-case，在 js 里用 camelCase。",
        },
        {
          title: "Emits 子传父",
          content: "子组件要通知父组件发生了什么事，就用 emit 发射事件。跟小孩按门铃一样，按一下门就响了，父组件听到门铃就知道该开门了。在子组件里用 defineEmits 声明可能发射的事件，然后调用 emit 函数。",
          code: "// 子组件\nconst emit = defineEmits(['delete', 'update'])\nemit('delete', itemId)\n\n// 父组件监听\n<Item @delete=\"handleDelete\" @update=\"handleUpdate\" />",
          language: "javascript",
        },
        {
          title: "插槽 Slots",
          content: "插槽就是组件里挖一个洞，让父组件往里面塞任意内容。默认插槽用一个 slot 标签占位，具名插槽用 name 区分多个洞。作用域插槽可以让子组件把数据传回给父组件使用，表格组件经常这么干，让父组件自定义每列怎么渲染。",
          code: "// 子组件 Card\n<template>\n  <div class=\"card\">\n    <slot name=\"header\" />\n    <slot />\n    <slot name=\"footer\" />\n  </div>\n</template>\n\n// 父组件使用\n<Card>\n  <template #header><h1>标题</h1></template>\n  这是内容\n  <template #footer><button>确定</button></template>\n</Card>",
          language: "html",
        },
        {
          title: "组件注册和动态组件",
          content: "组件注册有全局和局部两种。全局注册在 main.js 里 app.component 一下，任何地方都能用但打包时没法 tree-shaking。局部注册就是在哪个文件用就在哪个文件 import，推荐这种方式。动态组件用 component 标签配合 is 属性，根据条件切换显示哪个组件，配合 keep-alive 可以缓存组件状态。",
          code: "// 局部注册 - 推荐\nimport MyModal from '@/components/MyModal.vue'\n\n// 动态组件\n<component :is=\"currentTab\" />\n\n// 带缓存\n<keep-alive><component :is=\"currentTab\" /></keep-alive>",
          language: "javascript",
          tip: "keep-alive 适合 Tab 切换场景，切回来不用重新渲染。",
        },
      ],
      quiz: [
        {
          question: ".vue 文件里包含哪三部分？",
          options: ["HTML/JS/CSS", "template/script/style", "view/model/controller", "props/slots/emits"],
          answer: 1,
          explanation: "Vue 单文件组件由 template/script/style 三部分组成。",
        },
        {
          question: "子组件能直接修改 props 吗？",
          options: ["可以", "不可以，props 是只读的", "用 ref 可以", "只有父组件同意才行"],
          answer: 1,
          explanation: "Props 是单向数据流，子组件不能修改 props。",
        },
        {
          question: "插槽 slot 标签上 name 属性的作用？",
          options: ["没有作用", "区分具名插槽", "给插槽加 id", "给插槽传 props"],
          answer: 1,
          explanation: "name 属性区分多个插槽，父组件用 v-slot:name 或 #name 指定插入哪个。",
        },
        {
          question: "keep-alive 的作用？",
          options: ["延长组件生命周期", "缓存组件实例避免重复渲染", "增加组件存活时间", "让组件永久存活"],
          answer: 1,
          explanation: "keep-alive 缓存包裹的组件，切换时不销毁，保持之前的状态。",
        },
      ],
    },
    "vue-pinia": {
      slug: "vue-pinia",
      sections: [
        {
          title: "为什么需要状态管理",
          content: "组件之间传数据用 props 和 emit 在简单场景下够用，但一旦项目变大，组件层级多，兄弟组件之间传数据就变成噩梦了。Pinia 是 Vue 的官方状态管理库，相当于把所有组件共享的数据抽到一个仓库里，谁要用谁去拿。就像一个中央冰箱，大家往里面放菜拿菜，不用端来端去了。",
          code: "// stores/counter.js\nimport { defineStore } from 'pinia'\n\nexport const useCounterStore = defineStore('counter', {\n  state: () => ({ count: 0 }),\n  getters: { doubleCount: (state) => state.count * 2 },\n  actions: { increment() { this.count++ } }\n})",
          language: "javascript",
        },
        {
          title: "State、Getters 和 Actions",
          content: "State 就是数据，相当于组件里的 data。Getters 是计算属性，根据 state 推导出新的值，跟组件里的 computed 一模一样。Actions 是改数据的方法，里面可以写异步逻辑，同步异步都能处理。注意 Actions 里用 this 直接访问 state 和其他 action。",
          code: "import { useCounterStore } from '@/stores/counter'\n\nconst counterStore = useCounterStore()\ncounterStore.count        // 读取\ncounterStore.doubleCount  // 读取 getter\ncounterStore.increment()  // 调用 action",
          language: "javascript",
          tip: "直接改 store.count 也可以，但最好养成通过 action 修改的习惯。",
        },
        {
          title: "组合式 API 风格写 Store",
          content: "除了选项式写法，Pinia 还支持用组合式 API 写 store，跟写 composable 函数一样。用 setup 函数替代 state/getters/actions 分开的写法。ref 定义的就是 state，computed 就是 getters，普通函数就是 actions。这种写法更灵活，推荐用这种方式。",
          code: "export const useUserStore = defineStore('user', () => {\n  const user = ref(null)\n  const isLoggedIn = computed(() => !!user.value)\n  async function login(email, pwd) {\n    user.value = await apiLogin(email, pwd)\n  }\n  return { user, isLoggedIn, login }\n})",
          language: "javascript",
        },
        {
          title: "Store 之间的互相调用",
          content: "真实项目里 store 之间经常需要互相调用。比如购物车 store 需要访问用户 store 里的用户信息。直接在一个 store 里 import 另一个 store 用就行了。Pinia 不存在像 Vuex 里 module 那种嵌套的概念，所有 store 都是扁平的，直接交叉引用。",
          code: "export const useCartStore = defineStore('cart', () => {\n  const userStore = useUserStore()\n  async function checkout() {\n    if (!userStore.isLoggedIn) throw new Error('请先登录')\n    await apiCheckout(userStore.user.id)\n  }\n  return { checkout }\n})",
          language: "javascript",
        },
        {
          title: "Pinia 持久化和插件",
          content: "Pinia 有插件机制可以在每次 state 变化时做额外的事。最常用的场景是把 state 存到 localStorage 里，刷新页面数据不丢失。也可以自己写插件把 state 同步到后端、打日志、或者做调试。",
          code: "import { createPinia } from 'pinia'\n\nconst pinia = createPinia()\npinia.use(({ store }) => {\n  const saved = localStorage.getItem(store.$id)\n  if (saved) store.$patch(JSON.parse(saved))\n  store.$subscribe(() => {\n    localStorage.setItem(store.$id, JSON.stringify(store.$state))\n  })\n})",
          language: "javascript",
          warning: "敏感数据不要存 localStorage，任何人都能看到。",
        },
      ],
      quiz: [
        {
          question: "Pinia 中 State 对应什么？",
          options: ["计算属性", "数据本身", "修改数据的方法", "路由配置"],
          answer: 1,
          explanation: "State 就是 store 里存储的数据，相当于组件里的 data。",
        },
        {
          question: "Getters 的作用是什么？",
          options: ["修改 state", "从 state 派生出新值", "调用 API", "渲染模板"],
          answer: 1,
          explanation: "Getters 相当于 computed 属性，根据 state 计算出新值。",
        },
        {
          question: "Pinia 相比 Vuex 的主要优势？",
          options: ["更复杂", "不需要 mutations，写法更简洁", "只能用在 Vue3", "必须用 TypeScript"],
          answer: 1,
          explanation: "Pinia 去掉了 mutations 的概念，actions 直接改 state，代码量大幅减少。",
        },
        {
          question: "怎么让 Pinia 的数据刷新后不丢失？",
          options: ["自动保存", "用插件同步到 localStorage", "Pinia 默认持久化", "只能存在后端"],
          answer: 1,
          explanation: "可以自己写插件或用 pinia-plugin-persistedstate 插件把数据存到 localStorage。",
        },
      ],
    },
    "vue-router": {
      slug: "vue-router",
      sections: [
        {
          title: "前端路由是个啥",
          content: "单页应用切换页面不用刷新浏览器，靠的就是前端路由。Vue Router 是 Vue 的官方路由库，原理就是监听浏览器地址栏变化，然后根据不同的路径渲染不同的组件。就像你家里有多个房间，路由器根据你走的路径把你带到不同的房间。",
          code: "// router/index.js\nimport { createRouter, createWebHistory } from 'vue-router'\nimport Home from '@/views/Home.vue'\n\nconst routes = [{ path: '/', component: Home }]\nconst router = createRouter({\n  history: createWebHistory(),\n  routes\n})\nexport default router",
          language: "javascript",
        },
        {
          title: "嵌套路由和路由配置",
          content: "路由配置就是一个数组，每个元素有 path 和 component。嵌套路由用 children 字段，子路由的 path 前面不用加斜杠。配合 router-view 组件告诉 Vue Router 把匹配到的组件插到哪里。这就像俄罗斯套娃，外层路由的组件里还可以再放一个 router-view 来渲染子路由。",
          code: "const routes = [{\n  path: '/user',\n  component: UserLayout,\n  children: [\n    { path: 'profile', component: UserProfile },\n    { path: 'settings', component: UserSettings }\n  ]\n}]",
          language: "javascript",
          tip: "嵌套路由特别适合管理后台这种有明显层级结构的页面。",
        },
        {
          title: "动态路由和路由参数",
          content: "动态路由就是在路径里用冒号标记一个变量，比如 /user/:id。在组件里通过 route.params.id 拿到这个 id 值。页面切换时如果只是参数变了组件没变，用 watch 监听参数变化来重新请求数据。",
          code: "import { useRoute, watch } from 'vue-router'\n\nconst route = useRoute()\nwatch(() => route.params.id, (newId) => {\n  fetchUser(newId)\n})",
          language: "javascript",
          warning: "路由参数变化时组件默认不会销毁重建，需要手动监听参数变化。",
        },
        {
          title: "编程式导航和路由守卫",
          content: "编程式导航就是不用 router-link，直接在 js 里用 router.push 或 router.replace 跳转。路由守卫有点像门卫，在进入路由之前检查你有没有权限，没权限就拦住。beforeEach 是最常用的全局守卫，用来做登录验证。",
          code: "import { useRouter } from 'vue-router'\n\nconst router = useRouter()\nrouter.push({ name: 'user', params: { id: 123 } })\n\n// 全局守卫\nrouter.beforeEach((to, from) => {\n  if (to.meta.requiresAuth && !isLoggedIn()) return '/login'\n})",
          language: "javascript",
        },
        {
          title: "路由懒加载",
          content: "不做懒加载的话所有页面的 JS 代码会打包在一起，首页加载三秒都不一定能打开。路由懒加载就是用到哪个页面才加载哪个页面的代码，用动态 import 实现。Vue 自动帮你把每个懒加载的组件单独拆成一个 chunk 文件。",
          code: "const routes = [{\n  path: '/settings',\n  component: () => import('@/views/Settings.vue')\n}]",
          language: "javascript",
          tip: "所有路由组件都建议用懒加载，首页加载速度翻倍。",
        },
      ],
      quiz: [
        {
          question: "Vue Router 中用来渲染匹配组件的内置组件是什么？",
          options: ["router-link", "router-view", "router-outlet", "router-component"],
          answer: 1,
          explanation: "router-view 是占位符组件，匹配到的路由组件会渲染在里面。",
        },
        {
          question: "动态路由参数怎么定义？",
          options: ["/user/{id}", "/user/:id", "/user/*id", "/user/<id>"],
          answer: 1,
          explanation: "冒号加参数名，如 /user/:id。",
        },
        {
          question: "哪个方法用来在 JS 里跳转页面？",
          options: ["router.navigate", "router.go", "router.push", "router.redirect"],
          answer: 2,
          explanation: "router.push 添加一条历史记录并跳转。",
        },
        {
          question: "路由懒加载的语法是什么？",
          options: ["require()", "() => import()", "lazy()", "defineAsyncComponent"],
          answer: 1,
          explanation: "用箭头函数返回动态 import，Vite/Webpack 会自动代码分割。",
        },
      ],
    },
    "window-functions": {
      slug: "window-functions",
      sections: [
        {
          title: "窗口函数是干啥的",
          content: "普通聚合函数（SUM、AVG、COUNT）会把多行压成一行，分组是什么就看到什么，分组之外的信息没了。窗口函数不一样——它也是分组计算，但不会把行合在一起，原来的每一行都在，只是在旁边加一列计算结果。\n\n打个比方：一个班的学生成绩表，你想看每个人成绩外加全班平均分——普通 GROUP BY 做不到，因为每人一行、平均分只有一个值。窗口函数能轻松搞定：AVG(score) OVER() 在每行旁边补上全校平均分。\n\n窗口函数 = 聚合函数的进化版，语法是：函数名() OVER (PARTITION BY 分组 ORDER BY 排序)。OVER 是固定关键字。",
          code: "-- 每人成绩 + 全班平均分\nSELECT name, score,\n  AVG(score) OVER() AS class_avg\nFROM students;\n\n-- 每个部门里按工资排名\nSELECT name, department, salary,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank\nFROM employees;",
          language: "sql",
        },
        {
          title: "排名函数——ROW_NUMBER、RANK、DENSE_RANK、NTILE",
          content: "排名是最常用的窗口函数场景。四个排名函数各有不同：\n\nROW_NUMBER()——纯粹编号，1、2、3、4 往下排，值相同的也不会并列，按某种顺序连续编号。\n\nRANK()——奥运会排名，同分同名次，后面跳号。两人并列第一，下一个就是第三名。\n\nDENSE_RANK()——同分同名次，但不跳号。两人并列第一，下一个是第二名。\n\nNTILE(n)——把数据均匀分成 n 个桶，每行标上桶编号。做数据分片、用户分层特别好用。",
          code: "-- 按工资排名\nSELECT name, salary,\n  ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,\n  RANK() OVER (ORDER BY salary DESC) AS rank_num,\n  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_num\nFROM employees;\n\n-- 把用户按消费金额分成 4 档\nSELECT user_id, amount,\n  NTILE(4) OVER (ORDER BY amount DESC) AS tier\nFROM user_spending;",
          language: "sql",
          tip: "ROW_NUMBER 去重特别好用：PARTITION BY 重复字段 ORDER BY 某个优先级，WHERE rn=1 就只留一条。",
        },
        {
          title: "偏移函数——LAG、LEAD",
          content: "LAG 和 LEAD 是回头看和向前看的函数。LAG(col, n) 拿当前行前面第 n 行的值，LEAD(col, n) 拿后面第 n 行的值。\n\n典型场景：计算环比增长（跟前一天比）、计算相邻行的时间差、找连续登录天数。这些用普通 SQL 写得绕来绕去，用 LAG/LEAD 几行搞定。\n\n注意：LAG 和 LEAD 需要 ORDER BY 来确定前后的顺序，不然不知道哪行是前哪行是后。",
          code: "-- 每天销售额跟前一天比（日环比）\nSELECT date, revenue,\n  LAG(revenue, 1) OVER (ORDER BY date) AS prev_day,\n  revenue - LAG(revenue, 1) OVER (ORDER BY date) AS diff\nFROM daily_sales;\n\n-- 计算每笔订单和下一笔的时间间隔\nSELECT order_id, created_at,\n  LEAD(created_at, 1) OVER (ORDER BY created_at) AS next_order_time\nFROM orders WHERE user_id = 1;",
          language: "sql",
        },
        {
          title: "累积计算——SUM、AVG 做窗口",
          content: "SUM() OVER (ORDER BY ...) 能做累计求和——每一行是把前面所有行加起来。不像 GROUP BY 汇总成一行，窗口 SUM 每行都是一个到目前为止的总数。\n\n典型场景：累计销售额（每天一行，旁边显示截至当天的总销售额）、移动平均、余额计算。\n\n加上 PARTITION BY 就是分组累计——每个用户各自的消费轨迹，每个产品各自的销售趋势。用 ROWS BETWEEN 参数可以精确控制计算范围（比如只看最近 7 行）。",
          code: "-- 累计销售额\nSELECT date, daily_sales,\n  SUM(daily_sales) OVER (ORDER BY date) AS cumulative_sales\nFROM sales;\n\n-- 每个用户的累计消费\nSELECT user_id, order_id, amount,\n  SUM(amount) OVER (PARTITION BY user_id ORDER BY created_at) AS running_total\nFROM orders;\n\n-- 移动平均（近 7 天）\nSELECT date, sales,\n  AVG(sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg_7d\nFROM daily_sales;",
          language: "sql",
          tip: "ROWS BETWEEN ... AND ... 叫窗口框架，精确控制计算范围。没有它的话 ORDER BY 下默认是累加到当前行。",
        },
        {
          title: "窗口函数 vs GROUP BY",
          content: "很多人学完 GROUP BY 再学窗口函数会困惑：这不差不多吗？区别在于：\n\nGROUP BY 把多行压缩成一行，每个分组只剩一条结果。原来表的行变少了，非分组列的信息会丢失。\n\n窗口函数不改变行数，原来多少行还是多少行，只是在每行旁边加上计算结果。\n\n什么时候用哪个？想看汇总（每个部门多少人、平均工资多少）用 GROUP BY；想看明细加汇总（每个人工资排名、每个人和部门平均的差距）用窗口函数。两者也能嵌套使用。",
          code: "-- GROUP BY：每个部门一行\nSELECT department, AVG(salary) FROM employees GROUP BY department;\n\n-- 窗口函数：每个员工一行，旁边附上部门平均\nSELECT name, department, salary,\n  AVG(salary) OVER (PARTITION BY department) AS dept_avg,\n  salary - AVG(salary) OVER (PARTITION BY department) AS diff_from_avg\nFROM employees;\n\n-- 两者结合：查找各部门工资最高的员工\nSELECT * FROM (\n  SELECT *, RANK() OVER (PARTITION BY department ORDER BY salary DESC) r\n  FROM employees\n) t WHERE r = 1;",
          language: "sql",
        },
      ],
      quiz: [
        {
          question: "RANK() 和 DENSE_RANK() 的区别？",
          options: ["没区别", "RANK 同名跳号，DENSE_RANK 不跳", "DENSE_RANK 更快", "RANK 只能用于数字"],
          answer: 1,
          explanation: "同分时 RANK 会跳号（1,1,3），DENSE_RANK 不跳（1,1,2），看你们业务要不要跳。",
        },
        {
          question: "LAG(salary, 2) OVER (ORDER BY date) 是干什么的？",
          options: ["当前行的工资", "后面第 2 行的工资", "前面第 2 行的工资", "前两行工资的平均值"],
          answer: 2,
          explanation: "LAG 是往前看，2 表示往前第 2 行。LEAD 是往后看。",
        },
        {
          question: "窗口函数和 GROUP BY 最大区别？",
          options: ["窗口函数更快", "GROUP BY 保留所有行", "窗口函数保留所有行，GROUP BY 合并行", "都一样"],
          answer: 2,
          explanation: "窗口函数不改变行数，每行都在。GROUP BY 每个分组只剩一行，行数变少。",
        },
        {
          question: "PARTITION BY 在窗口函数里相当于什么？",
          options: ["ORDER BY", "WHERE", "GROUP BY（分组但不合并行）", "LIMIT"],
          answer: 2,
          explanation: "PARTITION BY 把数据分成几组，窗口函数在每组内独立计算。跟 GROUP BY 不同的是它不合并行。",
        },
        {
          question: "NTILE(4) 是干什么的？",
          options: ["排名第 4", "分成 4 组，给每组标号", "取前 4 名", "跳过前 4 行"],
          answer: 1,
          explanation: "NTILE(n) 把数据尽可能均匀分成 n 个桶，每行标上桶编号。常用于用户分层。",
        },
      ],
    },
  },

};

const categoryMap: Record<string, string> = {
  mongodb: "sql", k8s: "docker", react: "frontend", vue: "frontend",
  htmlcss: "frontend", typescript: "frontend", nodejs: "javascript",
  java: "backend", go: "backend", rust: "backend", php: "backend",
  ccpp: "languages", swift: "mobile", kotlin: "mobile", flutter: "mobile",
};

export function getTutorialContent(categoryId: string, slug: string): TutorialContent | undefined {
  const mappedCategory = categoryMap[categoryId] || categoryId;
  const result = tutorialContents[mappedCategory]?.[slug];
  if (result) return result;
  for (const section of Object.values(tutorialContents)) {
    if (section[slug]) return section[slug];
  }
  return undefined;
}

export default tutorialContents;
