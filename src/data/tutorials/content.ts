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
# root                                        ← 当前用户名

hostname         # 这台机器叫什么？
# web-server-01                               ← 主机名

uname -a         # 看看系统版本
# Linux web-server-01 5.15.0 #1 SMP x86_64 GNU/Linux  ← 内核名 主机名 内核版本 架构

pwd              # 我现在在哪个目录？
# /root                                       ← 当前工作目录路径

ls               # 这目录里有什么？
# Desktop  Documents  Downloads               ← 当前目录下的文件和文件夹

date             # 现在几点？
# Sun Jun 28 10:30:00 CST 2026                ← 星期 月 日 时分秒 时区 年

cal              # 看看日历
#  June 2026                                  ← 当前月份日历
# Su Mo Tu We Th Fr Sa                        ← 星期表头（周日到周六）
#  1  2  3  4  5  6  7
#  8  9 10 11 12 13 14
# 15 16 17 18 19 20 21
# 22 23 24 25 26 27 28
# 29 30                                       ← 当月所有日期`,
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
# /home/user/projects                         ← 当前目录的绝对路径

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

  // ============ MongoDB ============
  mongodb: {
    "mongodb-basics": {
      slug: "mongodb-basics",
      sections: [
        {
          title: "MongoDB 是啥——不是芒果数据库",
          content: `MongoDB 是一个开源的 NoSQL 文档数据库。跟传统关系型数据库（MySQL、PostgreSQL）最大的区别是：它存的是 JSON 格式的文档，没有固定的表结构。你想存什么字段就存什么字段，不用先建表定义列。

打个比方：MySQL 像一个表格——所有行必须有相同的列。MongoDB 像一叠便签纸——每张纸上写什么字段随你，灵活得很。

MongoDB 的核心概念：
- Database：数据库，跟 MySQL 的 database 一样
- Collection：集合，相当于 MySQL 的表——但不需要预先定义字段
- Document：文档，相当于 MySQL 的一行——但它是 BSON（二进制 JSON），可以嵌套
- Field：字段，文档里的键值对`,
        },
        {
          title: "安装与连接",
          content: `装好 MongoDB 后，用 mongosh（MongoDB Shell）连接：`,
          code: `# macOS
brew install mongosh mongodb-community

# Ubuntu
sudo apt-get install mongosh

# 连接本地 MongoDB
mongosh
# test>                           ← 默认连到 test 数据库

# 连接远程
mongosh "mongodb://user:pass@host:27017/mydb"

# 基本命令
show dbs                         # 列出所有数据库
# admin    100 kB
# mydb     520 kB

use shop                         # 切换到 shop 数据库（不存在就自动创建）
# switched to db shop

show collections                 # 列出当前数据库的集合
# products
# users

db                               # 当前在哪个数据库
# shop`,
          language: "bash",
        },
        {
          title: "文档长什么样",
          content: `MongoDB 的文档就是 JSON 对象，一个文档代表一条记录。每个文档都有一个 _id 字段（你不指定的话系统自动生成，保证唯一）。文档可以嵌套对象和数组——这是一个强大但容易用乱的特性。`,
          code: `// 一个产品文档
{
  "_id": ObjectId("649a2f3e8b2d4c0012ab34ef"),
  "name": "机械键盘",
  "price": 299.99,
  "brand": "Filco",
  "tags": ["键盘", "机械", "办公"],
  "specs": {
    "switch": "Cherry MX 红轴",
    "layout": "87键",
    "backlit": true
  },
  "stock": 150,
  "createdAt": ISODate("2026-06-28T10:30:00Z")
}

// _id 如果不指定，MongoDB 自动生成 ObjectId
// ObjectId 基于时间+机器+进程+计数器，能保证全局唯一`,
          language: "javascript",
          tip: "用嵌套文档还是引用？嵌套适合「包含」关系（订单里的商品）；引用适合「引用」关系（商品有独立生命周期）。后面会细讲。",
        },
        {
          title: "跟 SQL 的对比——快速切换思维",
          content: `从 MySQL 转过来，只需要做一个思维置换：表 = 集合，行 = 文档，列 = 字段。SQL 的 JOIN 换成嵌入或引用；SQL 的 WHERE 换成 MongoDB 的查询 filter。`,
          code: `# SQL                        # MongoDB
# ===================================
# Database                    Database
# Table                       Collection
# Row                         Document
# Column                      Field
# Primary Key (_id)           Primary Key (_id)
# SELECT * FROM users         db.users.find({})
# WHERE name = "Alice"        { name: "Alice" }
# ORDER BY age DESC           .sort({ age: -1 })
# LIMIT 10                    .limit(10)
# INSERT INTO users VALUES()  db.users.insertOne({...})
# UPDATE users SET...         db.users.updateOne({...})
# DELETE FROM users WHERE...  db.users.deleteOne({...})
# COUNT(*)                    db.users.countDocuments()
# GROUP BY                    db.users.aggregate()`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "MongoDB 跟 MySQL 最核心的区别？", options: ["MongoDB 更快", "MongoDB 是文档数据库，没有固定表结构——字段随便加", "MongoDB 只能存文本", "MySQL 不支持 JSON"], answer: 1, explanation: "MongoDB 的核心差异是 schema-less——文档不需要预定义字段，不同文档可以有完全不同的字段。" },
        { question: "MongoDB 的集合（Collection）相当于 SQL 的什么？", options: ["行", "表（Table）", "数据库", "索引"], answer: 1, explanation: "Collection ≈ SQL Table，是存放同类文档的容器。但不同于表，Collection 不需要预定义列。" },
        { question: "ObjectId 由哪几部分组成？", options: ["随机字符串", "时间戳 + 机器标识 + 进程 ID + 计数器", "IP 地址 + 随机数", "用户 ID + 数据库名"], answer: 1, explanation: "ObjectId 12 字节 = 4 字节时间戳 + 5 字节机器标识 + 3 字节进程 ID + 3 字节计数器，全局唯一。" },
        { question: "MongoDB 中 show dbs 命令做什么？", options: ["显示所有数据库", "显示当前数据库的集合", "删除数据库", "创建数据库"], answer: 0, explanation: "show dbs 列出所有数据库及其占用空间大小，跟 MySQL 的 SHOW DATABASES 一样。" },
        { question: "use shop 切换到不存在的数据库 shop，会报错吗？", options: ["会报错", "不会——MongoDB 延迟创建，等第一条数据写入时才真正创建", "必须手动创建", "取决于版本"], answer: 1, explanation: "MongoDB 的 use 不立即创建 DB/Collection，第一次 insert 数据时才建。提前切换到不存在的库不会报错。" },
      ],
    },
    "mongodb-crud": {
      slug: "mongodb-crud",
      sections: [
        {
          title: "Insert——往集合里塞数据",
          content: `增加数据最简单，insertOne（插一条）和 insertMany（批量插多条）。如果集合不存在，MongoDB 会自己创建——懒人友好：`,
          code: `// 插一条
db.products.insertOne({
  name: "iPhone 15",
  price: 6999,
  brand: "Apple",
  tags: ["手机", "5G"],
  stock: 200
});
// { acknowledged: true, insertedId: ObjectId("...") }

// 批量插
db.products.insertMany([
  { name: "AirPods Pro", price: 1899, stock: 500 },
  { name: "MacBook Pro", price: 14999, stock: 50 },
  { name: "iPad Air", price: 4799, stock: 120 }
]);
// { acknowledged: true, insertedIds: { '0': ..., '1': ..., '2': ... } }

// 插一条，如果 _id 已存在就报错（不会覆盖）
db.products.insertOne({ _id: "sku-001", name: "鼠标", price: 99 });

// ordered: false —— 批量插入时某一条出错不影响其他
db.products.insertMany([...], { ordered: false });`,
          language: "javascript",
          tip: "insertMany 的 ordered: false 很实用——它会让所有文档都尝试插入，某条出问题只跳过那条，不中断整个批量操作。",
        },
        {
          title: "Find——查数据，条件随便写",
          content: `find 是日常用得最多的操作。不加参数返回所有文档（危险！），加参数就像 SQL 的 WHERE。find 返回游标，可以链式调用 limit、sort、skip：`,
          code: `// 查所有（慎用，生产环境会扫全表）
db.products.find()
// 返回前 20 条（mongosh 默认），用 it 翻页

// 条件查询
db.products.find({ brand: "Apple" })
// 找 brand 是 Apple 的所有产品

// 多条件（AND 逻辑）
db.products.find({ brand: "Apple", stock: { $gt: 0 } })
// brand=Apple 并且 stock > 0

// 只返回需要的字段（投影）
db.products.find(
  { brand: "Apple" },            // 查询条件
  { name: 1, price: 1, _id: 0 }  // 只要 name 和 price，不要 _id
)

// 排序 + 分页
db.products.find()
  .sort({ price: -1 })           // 价格从高到低
  .skip(10)                      // 跳过前 10 条（第二页）
  .limit(10)                     // 只拿 10 条

// 查一条（常用）
db.products.findOne({ name: "iPhone 15" })
// 返回一个文档或者 null`,
          language: "javascript",
        },
        {
          title: "比较运算符",
          content: `MongoDB 的查询运算符以 $ 开头，学一个就懂一类：$gt 大于、$lt 小于、$gte 大于等于、$lte 小于等于、$ne 不等于、$in 在...之中、$nin 不在...之中：`,
          code: `// 价格在 1000-5000 之间的产品
db.products.find({ price: { $gte: 1000, $lte: 5000 } })

// 品牌是 Apple 或 Samsung
db.products.find({ brand: { $in: ["Apple", "Samsung"] } })

// 库存不为 0
db.products.find({ stock: { $ne: 0 } })

// 标签包含"手机"
db.products.find({ tags: "手机" })   // 数组精确匹配
db.products.find({ tags: { $in: ["手机"] } })  // 也支持

// 字段是否存在
db.products.find({ discount: { $exists: true } })  // 有 discount 字段的
db.products.find({ description: { $exists: false } })  // 没 description 的`,
          language: "javascript",
          tip: "MongoDB 没有 SQL 那样的 LIKE，但有正则表达式做模糊匹配，后面查询专题会讲。",
        },
        {
          title: "Update——改数据",
          content: `updateOne 改第一条匹配的文档，updateMany 改所有匹配的。注意：直接传普通对象会替换整个文档！要改特定字段得用 $set：`,
          code: `// 改一条（只改指定字段）
db.products.updateOne(
  { name: "iPhone 15" },           // 找哪个
  { $set: { price: 6499, stock: 180 } }  // 改什么
)

// 改多条（小心！不加条件全表更新）
db.products.updateMany(
  { brand: "Apple" },
  { $set: { currency: "CNY" } }     // 所有 Apple 产品加个 currency 字段
)

// 增减数字（不用先读再写）
db.products.updateOne(
  { name: "iPhone 15" },
  { $inc: { stock: -1, sold: 1 } }  // stock 减 1，sold 加 1
)

// 数组操作
db.products.updateOne(
  { name: "iPhone 15" },
  { $push: { tags: "新品" } }       // 往 tags 数组追加
)

db.products.updateOne(
  { name: "iPhone 15" },
  { $pull: { tags: "新品" } }       // 从 tags 数组删除
)

// upsert: 找到就更新，没找到就插入
db.products.updateOne(
  { name: "Vision Pro" },
  { $set: { price: 29999, stock: 10 } },
  { upsert: true }
)`,
          language: "javascript",
          warning: "忘写 $set 直接传 { price: 999 } 会把你整条文档替换成 { price: 999 }，其他字段全没了。养成习惯，改字段必用 $set。",
        },
        {
          title: "Delete——删数据",
          content: `deleteOne 删第一条匹配的，deleteMany 删所有匹配的。不加条件 = 清空整个集合。删操作不可逆，生产环境要小心：`,
          code: `// 删一条
db.products.deleteOne({ name: "下架商品" })
// { acknowledged: true, deletedCount: 1 }

// 删所有匹配的
db.products.deleteMany({ stock: 0 })
// { acknowledged: true, deletedCount: 5 }

// 清空集合（性能差，适合少量数据）
db.products.deleteMany({})

// 清空集合（高性能，推荐）
db.products.drop()          // 连集合带索引全删
// 再用 insertOne 会自动重建集合

// 软删除（推荐）——加个字段标记，不真删
db.products.updateMany(
  { stock: 0 },
  { $set: { deletedAt: new Date() } }
)`,
          language: "javascript",
          tip: "生产上推荐软删除——加个 deletedAt 字段。数据丢了还能找回，而且删除操作变成更新，性能更好。",
        },
      ],
      quiz: [
        { question: "忘记 $set 直接用 db.col.updateOne({}, {price: 99}) 会发生什么？", options: ["只改 price", "整条文档被替换成 {price: 99}——其他字段全丢", "报错", "不生效"], answer: 1, explanation: "不加 $set 等更新操作符，MongoDB 会用你传的对象替换整个文档，其他字段全部消失——新手常踩的坑。" },
        { question: "$inc 操作符干什么用？", options: ["设置字段值", "对数字字段做加减——原子操作，不需要先查再改", "删除字段", "改字段名"], answer: 1, explanation: "$inc 原子性地增减数值字段，比如库存减一、浏览量加一，适合高并发场景。" },
        { question: "upsert: true 的作用是？", options: ["只更新", "找到了就更新，没找到就插入——update 和 insert 二合一", "强制更新", "删除后重建"], answer: 1, explanation: "upsert = update + insert——匹配到文档就更新，匹配不到就新建。避免「先查有没有再决定插还是改」的尴尬。" },
        { question: "drop() 和 deleteMany({}) 选哪个清空集合？", options: ["deleteMany 更快", "drop() 更快，连索引一起删；deleteMany 逐条删慢", "一样快", "drop 不安全"], answer: 1, explanation: "drop 直接删集合文件和索引，O(1) 级别。deleteMany 逐条遍历删除，数据量大时很慢。" },
        { question: "find({ tags: '手机' }) 对数组字段的匹配逻辑是？", options: ["完全匹配数组", "tags 数组里只要有 '手机' 这个值就匹配", "必须数组第一个是手机", "数组必须等于 ['手机']"], answer: 1, explanation: "对数组字段直接用值匹配时，MongoDB 会检查数组里是否包含该值。这跟完全等于数组不一样。" },
      ],
    },
    "mongodb-queries": {
      slug: "mongodb-queries",
      sections: [
        {
          title: "逻辑运算符——AND / OR / NOT",
          content: `多个条件怎么组合？逗号分隔默认是 AND，用 $or 表示「或」，$not 表示「反」：`,
          code: `// AND（逗号就是 AND）
db.products.find({ brand: "Apple", price: { $lt: 5000 } })

// OR
db.products.find({
  $or: [
    { brand: "Apple" },
    { brand: "Samsung" }
  ]
})

// 组合 AND 和 OR
db.products.find({
  price: { $lt: 5000 },              // 价格 5000 以下
  $or: [
    { brand: "Apple" },               // 品牌是 Apple
    { brand: "Samsung" }              // 或者是 Samsung
  ]
})

// NOT —— 价格不低于 1000 的
db.products.find({
  price: { $not: { $lt: 1000 } }      // = price >= 1000
})

// NOR —— 既不是 Apple 也不便宜
db.products.find({
  $nor: [
    { brand: "Apple" },
    { price: { $lt: 1000 } }
  ]
})`,
          language: "javascript",
        },
        {
          title: "正则与模糊搜索",
          content: `MongoDB 支持正则表达式来做模糊匹配，虽然不如 Elasticsearch 专业，但简单的搜索需求够用了：`,
          code: `// 名字包含 "Pro" 的产品（忽略大小写）
db.products.find({
  name: { $regex: "Pro", $options: "i" }
})
// 或者简写
db.products.find({ name: /pro/i })

// 以某个字符串开头的
db.products.find({ name: /^iPhone/ })

// 以某个字符串结尾的
db.products.find({ name: /Pro$/ })

// 文本搜索（需要先建 text 索引）
db.products.createIndex({ name: "text", description: "text" })
db.products.find({ $text: { $search: "机械键盘" } })

// 按文本匹配得分排序
db.products.find(
  { $text: { $search: "机械键盘" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })`,
          language: "javascript",
          tip: "正则模糊匹配不走索引（除非是前缀匹配 ^xxx），大数据量会很慢。需要搜索功能建议用 $text 索引或接 Elasticsearch。",
        },
        {
          title: "数组查询——比 SQL 强的地方",
          content: `MongoDB 对数组的查询很强大，你可以查「数组里包含这个」「数组长度是多少」「数组里有没有同时匹配两个条件的元素」：`,
          code: `// 数组包含某个值
db.products.find({ tags: "游戏" })

// 数组包含任意一个
db.products.find({ tags: { $in: ["游戏", "办公"] } })

// 数组同时包含多个值（不关心顺序和是否有其他值）
db.products.find({ tags: { $all: ["蓝牙", "降噪"] } })

// 根据数组长度查询
db.products.find({ tags: { $size: 3 } })  // tags 正好 3 个

// $elemMatch —— 数组里有元素同时满足多个条件
// 订单中有商品数量 > 5 且价格 > 100
db.orders.find({
  items: {
    $elemMatch: { quantity: { $gt: 5 }, price: { $gt: 100 } }
  }
})

// 没有 $elemMatch，上面两个条件可能匹配不同元素！
// 这是最容易出 bug 的地方`,
          language: "javascript",
          warning: "查数组时不用 $elemMatch 的话，多条件可能分别匹配到不同数组元素。比如找「价格>100 且数量>5」的商品，可能价格匹配第 3 个元素、数量匹配第 1 个。",
        },
        {
          title: "嵌套文档查询",
          content: `MongoDB 可以存储嵌套对象，查询时可以「点进去」访问嵌套字段。这对存规格参数之类的层级数据特别方便：`,
          code: `// 直接用点号访问嵌套字段
db.products.find({ "specs.switch": "Cherry MX 红轴" })

// 查询嵌套文档的多个字段
db.products.find({
  "specs.layout": "87键",
  "specs.backlit": true
})

// 嵌套文档匹配（精确匹配整个子文档）
db.products.find({
  specs: {
    switch: "Cherry MX 红轴",
    layout: "87键",
    backlit: true
  }
})
// 注意：这种写法和上面的点号查询不同！
// 精确匹配要求子文档完全等于，不能多也不能少字段`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "数组查询中 $elemMatch 解决了什么问题？", options: ["加速查询", "保证多条件匹配同一个数组元素——不用它可能匹配不同元素", "排序", "分页"], answer: 1, explanation: "不加 $elemMatch，多个条件可能分别在数组的不同元素上匹配。$elemMatch 确保所有条件都作用于同一个数组元素。" },
        { question: "$all: ['蓝牙', '降噪'] 匹配什么样的数组？", options: ["数组必须恰好是 ['蓝牙', '降噪']", "数组里同时包含蓝牙和降噪（可以有别的值）", "数组任意一个匹配", "数组长度等于 2"], answer: 1, explanation: "$all 要求数组包含所有指定值，不关心顺序，也不在乎是否还有其他值——要有且全有。" },
        { question: "{$regex: 'Pro', $options: 'i'} 里的 'i' 表示什么？", options: ["忽略大小写", "索引查找", "全字匹配", "反向匹配"], answer: 0, explanation: "i = case-insensitive，忽略大小写。m = multiline 多行模式，s = dotall 点号匹配换行。" },
        { question: "MongoDB 的正则查询走索引吗？", options: ["总是走", "前缀匹配（^xxx）可以走索引，包含匹配不行", "不走", "取决于版本"], answer: 1, explanation: "正则以 ^ 开头（前缀匹配）可以利用索引，其他模糊匹配只能全扫——数据量大时慢得明显。" },
        { question: "find({'specs.switch': '红轴'}) 和 find({specs: {switch: '红轴'}}) 结果一样吗？", options: ["一样", "不一样——点号只匹配嵌套字段，对象匹配要整个子文档完全相等", "点号报错", "对象匹配更快"], answer: 1, explanation: "点号访问是「嵌套字段包含这个值就行」；对象匹配是「整个子文档全等」——多或少一个字段就不匹配。" },
      ],
    },
    "mongodb-aggregation": {
      slug: "mongodb-aggregation",
      sections: [
        {
          title: "聚合管道——像流水线一样处理数据",
          content: `聚合是 MongoDB 最强大的数据分析工具，相当于 SQL 的 GROUP BY，但威力远不止分组统计。聚合管道（Aggregation Pipeline）把数据处理分成一个个阶段（stage），上一个阶段的输出是下一个阶段的输入，就像工厂流水线：原料进去、过一道工序、再过一道、最终出成品。

对比 SQL：SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... 这种一条 SQL 搞定的事，在 MongoDB 中用管道一步步来，每一步对应一个 $ 操作符。`,
          code: `db.orders.aggregate([
  // 阶段1: 筛选（相当于 WHERE）
  { $match: { status: "completed" } },
  // 阶段2: 分组（相当于 GROUP BY）
  { $group: { _id: "$userId", total: { $sum: "$amount" }, count: { $count: {} } } },
  // 阶段3: 排序（相当于 ORDER BY）
  { $sort: { total: -1 } },
  // 阶段4: 分页（相当于 LIMIT）
  { $limit: 10 }
])`,
          language: "javascript",
          tip: "管道的顺序有讲究——$match 和 $limit 尽量放前面，先缩小数据量再处理，效率最高。",
        },
        {
          title: "$group——分组统计的核心",
          content: `$group 是聚合的灵魂，类似 SQL 的 GROUP BY。你可以按某个字段分组，然后对各组做计算：求和 $sum、求平均 $avg、最大 $max、最小 $min、推入数组 $push、去重推入 $addToSet：`,
          code: `// 按品牌统计：每种品牌有多少产品、平均售价
db.products.aggregate([
  { $group: {
      _id: "$brand",
      count: { $sum: 1 },               // 每个品牌几款产品
      avgPrice: { $avg: "$price" },     // 平均价格
      totalStock: { $sum: "$stock" },   // 总库存
      products: { $push: "$name" }      // 产品名列表
  }},
  { $sort: { count: -1 } }              // 按产品数量排序
])

// 按日期汇总订单金额
db.orders.aggregate([
  { $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      dailyTotal: { $sum: "$amount" },
      orderCount: { $sum: 1 }
  }}
])`,
          language: "javascript",
        },
        {
          title: "$lookup——相当于 SQL JOIN",
          content: `$lookup 让 MongoDB 也能做关联查询（注意性能！MongoDB 不支持跨集合事务保证，多集合关联查询要权衡）。基本语法：from 哪个集合，localField 我这边哪个字段，foreignField 那边哪个字段，as 结果存到哪个字段里：`,
          code: `// 查订单，把用户信息也带出来
db.orders.aggregate([
  { $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
  }},
  // user 是个数组，一般取第一个
  { $unwind: "$user" },
  // 只保留需要的字段
  { $project: {
      _id: 0,
      orderNo: 1,
      amount: 1,
      "user.name": 1,
      "user.email": 1
  }}
])

// 或者用管道版本的 $lookup（更灵活，能做子条件筛选）
db.orders.aggregate([
  { $lookup: {
      from: "users",
      let: { uid: "$userId" },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$uid"] }, status: "active" } },
        { $project: { name: 1, email: 1 } }
      ],
      as: "user"
  }}
])`,
          language: "javascript",
          warning: "$lookup 性能比 SQL JOIN 差不少，别真的在 MongoDB 里做复杂关联——那是自讨苦吃。关联多于两个集合就该考虑用嵌入式设计或换关系型数据库。",
        },
        {
          title: "$project 与 $unwind",
          content: `$project 相当于 SQL 的 SELECT——选择哪些字段要、哪些不要，还可以做计算和重命名。$unwind 把数组字段「摊平」——一个文档里数组有 3 个元素，$unwind 后变成 3 个文档：`,
          code: `// $project 选字段
db.products.aggregate([
  { $project: {
      name: 1,                          // 保留 name
      price: 1,
      inStock: { $gt: ["$stock", 0] },  // 计算字段——有没有货
      revenue: { $multiply: ["$price", "$sold"] }  // 销售额 = 单价 × 已售
  }}
])

// $unwind 摊平数组
db.orders.aggregate([
  { $unwind: "$items" },               // 每个 items 元素变成独立文档
  { $group: {
      _id: "$items.productId",
      totalSold: { $sum: "$items.quantity" },
      revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
  }},
  { $sort: { totalSold: -1 } }
])`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "聚合管道里 $match 放前面对性能有什么影响？", options: ["没影响", "先过滤减少后续阶段处理的数据量——性能提升明显", "变慢", "报错"], answer: 1, explanation: "$match 和 $limit 放管道开头，能大幅减少流到后续阶段的数据量，跟 SQL 里 WHERE 在 GROUP BY 之前一样。" },
        { question: "$lookup 相当于 SQL 的什么操作？", options: ["WHERE", "ORDER BY", "JOIN——关联另一个集合", "LIMIT"], answer: 2, explanation: "$lookup 是 MongoDB 的关联查询，相当于 SQL 的 LEFT OUTER JOIN，从另一个集合拉数据过来。" },
        { question: "$unwind 干了什么？", options: ["压缩数据", "把数组字段拆成多个文档——数组 3 个元素变 3 个独立文档", "删除数组", "排序"], answer: 1, explanation: "$unwind 是「拆数组」操作符，数组里有多少元素就输出多少个文档，适合统计数组里的项。" },
        { question: "$push 和 $addToSet 在 group 里的区别？", options: ["一样", "$push 全部收集，$addToSet 只收集不重复的值", "$push 更快", "$addToSet 不支持数组"], answer: 1, explanation: "$push 把组内每个文档的值都放进数组（可能重复），$addToSet 自动去重，类似 push 和 Set 的区别。" },
        { question: "聚合管道里 $project 的作用是？", options: ["筛选文档", "选择/重命名字段、添加计算字段", "分组统计", "排序"], answer: 1, explanation: "$project 指定输出哪些字段，可以 1=保留 0=排除，还能添加计算字段和重命名——类似 SQL 的 SELECT。" },
      ],
    },
    "mongodb-indexes": {
      slug: "mongodb-indexes",
      sections: [
        {
          title: "索引是什么——书的目录",
          content: `一本书没有目录，找「MongoDB 聚合」这个词你得从头翻到尾。有目录就翻两页的事。数据库同理——全表扫描（COLLSCAN）就是从头翻到尾，索引就是目录。

MongoDB 默认给你在 _id 字段上建好了唯一索引（保证 _id 不重复）。其他的索引需要你自己建。索引的原理是 B-Tree——你把字段放进索引，MongoDB 把它们排好序，查询时不用一条条扫，而是直接定位。`,
          code: `// 创建单字段索引
db.products.createIndex({ name: 1 })        // 1 = 升序, -1 = 降序
// name_1

// 创建复合索引（多字段索引）
db.products.createIndex({ brand: 1, price: -1 })
// brand_1_price_-1

// 唯一索引——不许重复
db.users.createIndex({ email: 1 }, { unique: true })

// 看有哪些索引
db.products.getIndexes()
// [{ v: 2, key: { _id: 1 }, name: "_id_" },
//  { v: 2, key: { name: 1 }, name: "name_1" }]

// 看某条查询会不会用索引
db.products.find({ name: "iPhone" }).explain("executionStats")
// "stage": "IXSCAN" ← 用了索引
// "stage": "COLLSCAN" ← 全表扫描，要优化`,
          language: "javascript",
          tip: "explain 是调优利器——每条慢查询都用它检查一下：走没走索引、扫描了多少文档、耗了多少时间。"},
        {
          title: "复合索引与 ESR 规则",
          content: `复合索引（多字段索引）有讲究：索引里面字段的顺序决定了哪些查询能用这个索引。经典的 ESR 规则：

- E（Equality）：精确匹配的字段放最前面
- S（Sort）：排序的字段放第二位
- R（Range）：范围查询的字段放最后

比如你经常查「某品牌的、价格在范围内的、按上架时间排序的产品」，索引应该是 { brand: 1, createdAt: -1, price: 1 }——品牌精确匹配在前，时间排序在中间，价格范围在最后。`,
          code: `// 好的索引设计（ESR 规则）
// 查询: brand = "Apple" AND stock > 0, ORDER BY createdAt DESC
db.products.createIndex({ brand: 1, createdAt: -1, stock: 1 })
// ↑ E=brand, S=createdAt, R=stock

// 前缀匹配——复合索引 (a, b, c) 支持这些查询:
// { a: ... }              ← 能用
// { a: ..., b: ... }      ← 能用
// { a: ..., b: ..., c: .. }  ← 能用
// { b: ... }              ← 不能用！（除非 a 也是等值查询）
// { a: ..., c: ... }      ← 能用但只用到 a 和 b 的索引

// 覆盖查询——需要的字段全在索引里
db.products.createIndex({ name: 1, price: 1 })
db.products.find(
  { name: /^iPhone/ },
  { name: 1, price: 1, _id: 0 }
)
// 如果所有返回字段都在索引里，MongoDB 不用回表读文档`,
          language: "javascript",
        },
        {
          title: "其他索引类型",
          content: `除了普通索引，MongoDB 还有几种特殊索引：

文本索引——做全文搜索，前面讲过
地理空间索引——存经纬度，做「附近的人」这种查询
TTL 索引——自动删除过期文档（日志、session 等）
部分索引——只索引满足条件的文档，省空间
稀疏索引——只索引有该字段的文档`,
          code: `// TTL 索引——文档 30 天后自动删除
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 2592000 }   // 30 天 = 30*24*3600 秒
)

// 部分索引——只给价格 > 1000 的建索引
db.products.createIndex(
  { brand: 1 },
  { partialFilterExpression: { price: { $gt: 1000 } } }
)

// 后台创建索引（不阻塞读写）
db.products.createIndex({ name: 1 }, { background: true })

// 删索引
db.products.dropIndex("name_1")
db.products.dropIndexes()             // 删所有（除了 _id）`,
          language: "javascript",
          tip: "TTL 索引不是精确的——文档过期后不是立刻被删，后台线程每隔 60 秒扫一次。别拿它做秒级精确过期。",
        },
        {
          title: "索引使用统计与优化",
          content: `建了索引但怕没被用到？可以看索引的使用统计：`,
          code: `// 查看索引使用统计
db.products.aggregate([{ $indexStats: {} }])
// 输出各索引的 name、accesses（被用了多少次）、since（从什么时候开始统计）

// 当前正在跑的慢查询
db.currentOp({ active: true, secs_running: { $gt: 1 } })

// 数据库级别的 profiling
db.setProfilingLevel(2, { slowms: 100 })  // 记录所有>100ms的查询
db.system.profile.find().sort({ ts: -1 }).limit(10)  // 看最近慢查询`,
          language: "javascript",
          warning: "生产环境别开 profiling level 2（记录所有查询），那会严重拖慢性能。level 1 只记录慢查询就够了。",
        },
      ],
      quiz: [
        { question: "复合索引 (a: 1, b: 1) 支持 { b: 123 } 查询吗？", options: ["支持", "不支持——复合索引有前缀限制，只用后面的字段不走索引", "部分支持", "取决于数据"], answer: 1, explanation: "复合索引遵循左前缀规则——跳过了 a，中间的 b 就用不上。除非把 a 也用等值查询带上。" },
        { question: "explain('executionStats') 看到 COLLSCAN 意味着什么？", options: ["用了索引", "全表扫描——没走索引，性能可能很差", "查询很快", "使用了唯一索引"], answer: 1, explanation: "COLLSCAN = Collection Scan = 一条条文档扫过去——数据量大时会很慢，需要考虑加索引。" },
        { question: "TTL 索引适合什么场景？", options: ["实时数据", "自动清理过期数据——日志、session、验证码等", "主键索引", "地理查询"], answer: 1, explanation: "TTL 让文档到期自动删除，适合有时间生命周期（会话 30 天过期、日志保留 7 天）这种场景。" },
        { question: "复合索引字段顺序为什么重要？", options: ["随便排", "决定哪些查询能用这个索引——遵循 ESR 规则", "只影响写入速度", "只影响排序"], answer: 1, explanation: "顺序决定了索引的「前缀」覆盖范围，等值→排序→范围（ESR）是最常见的推荐顺序。" },
        { question: "索引太多有什么坏处？", options: ["没有坏处", "写入变慢——每次 insert/update 都要更新所有索引", "查询变慢", "占用网络"], answer: 1, explanation: "索引不是免费的午餐——每个索引都会拖慢写入速度（因为要同时更新）和占用内存/磁盘。建真正用得上的索引。" },
      ],
    },
    "mongodb-replication": {
      slug: "mongodb-replication",
      sections: [
        {
          title: "副本集是什么——人多力量大",
          content: `生产环境单机跑数据库就跟把所有鸡蛋放一个篮子里一样——机器挂了数据全完。副本集（Replica Set）就是「多台 MongoDB 存同一份数据的多个副本」。

一个副本集一般是一主两从（或者一主一从一仲裁）。主节点处理所有写入，从节点复制主节点的数据。主挂了，从节点自动选一个新主顶上去——这就是高可用的基础。

打个比方：主节点是「原件」，从节点是「复印件」——原件改了什么，复印件跟着更新。原件丢了，用复印件当新原件。`,
        },
        {
          title: "配置副本集",
          content: `一般在 docker-compose 或 K8s 里搭副本集。简单演示一下在本地几台 MongoDB 之间组副本集：`,
          code: `# 启动三台 MongoDB（不同端口）
mongod --replSet rs0 --port 27017 --dbpath /data/rs0-0
mongod --replSet rs0 --port 27018 --dbpath /data/rs0-1
mongod --replSet rs0 --port 27019 --dbpath /data/rs0-2

# 连接其中一个
mongosh --port 27017

# 初始化副本集
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017", priority: 2 },
    { _id: 1, host: "localhost:27018", priority: 1 },
    { _id: 2, host: "localhost:27019", priority: 0, hidden: true }
    // hidden: true → 不参与选举，做备份/报表用
  ]
})

// 查看副本集状态
rs.status()
// 能看到谁是 PRIMARY，谁是 SECONDARY
// "stateStr": "PRIMARY" / "SECONDARY"

// 查看副本集配置
rs.conf()

// 手动降级当前主节点（触发选举）
rs.stepDown()`,
          language: "bash",
          tip: "priority 高的节点更容易被选为主。priority=0 的节点永远不会当主——适合放报表查询或备份节点。",
        },
        {
          title: "读写关注（Read/Write Concern）",
          content: `副本集引入了写入确认和读取一致性的一堆概念：

Write Concern——写入操作要多少个节点确认才算成功？{ w: 1 } 只要主确认就好（默认）；{ w: "majority" } 要多数节点确认才算数——更安全但更慢。

Read Concern——读操作从哪个节点读？{ readConcern: "local" } 读主节点（可能读到未复制到多数节点的数据）；{ readConcern: "majority" } 读已复制到多数节点的数据——不会被回滚。

Read Preference——你从主读还是从从节点读？primary（默认，只主）、primaryPreferred（优先主）、secondary（只从）、secondaryPreferred（优先从）、nearest（谁延迟低读谁）。`,
          code: `// 写入需要多数节点确认
db.orders.insertOne(
  { amount: 9999 },
  { writeConcern: { w: "majority", wtimeout: 5000 } }
)

// 从最近节点读
db.products.find().readPref("nearest")

// 连接字符串里配置
mongosh "mongodb://host1,host2,host3/mydb?w=majority&readPreference=secondaryPreferred"
// 写入要多数确认，读优先从节点`,
          language: "javascript",
        },
        {
          title: "Oplog——复制怎么工作的",
          content: `主节点上每个写操作（insert/update/delete）都会被记录到 oplog（操作日志）里。oplog 是个固定大小的集合（capped collection），像一个环形缓冲区——满了就覆盖旧的。

从节点不停地"tail"主节点的 oplog，把主上的操作在自己身上重放一遍。这个延迟就是「复制延迟」。如果从节点追不上了（oplog 已经覆盖了从节点需要的记录），就得全量同步——很慢。`,
          code: `// 查看 oplog
use local
db.oplog.rs.find().sort({ $natural: -1 }).limit(5)

// 查看 oplog 大小
db.oplog.rs.stats().maxSize

// 复制延迟
rs.printReplicationInfo()
// configured oplog size:   5GB
// oplog first event time:  2026-06-28 10:00:00
// oplog last event time:   2026-06-28 11:30:00
// time difference:         5400 seconds  ← oplog 能容纳多久的操作`,
          language: "javascript",
          tip: "oplog 要足够大以覆盖网络中断、从节点维护等场景。一般至少留几个小时的操作量。oplog 太小会导致从节点频繁全量同步。",
        },
      ],
      quiz: [
        { question: "副本集最少需要几个节点才能实现自动选举？", options: ["1", "3（或 2 数据节点+1 仲裁节点）——需要多数投票", "5", "2"], answer: 1, explanation: "选举需要多数派——3 节点副本集挂 1 个剩下 2 个还是多数，能正常选主。2 个数据节点挂 1 个就没多数了。" },
        { question: "Write Concern 'majority' 是什么意思？", options: ["只写主节点", "写操作要等多数节点确认后才算成功——更安全", "写所有节点", "异步写入"], answer: 1, explanation: "w: 'majority' 要求大多数节点确认写入——即使主挂了，新主也一定有你刚写入的数据（已被多数确认的不回滚）。" },
        { question: "从节点上能直接写数据吗？", options: ["能", "不能——写入只在主节点，从节点只读", "能但会被覆盖", "取决于配置"], answer: 1, explanation: "从节点只复制主的操作，不接受客户端写入。尝试往从节点写会报错 'not master'。" },
        { question: "oplog 满了会发生什么？", options: ["自动扩容", "旧记录被覆盖，从节点跟不上就得全量同步", "写入报错", "主节点宕机"], answer: 1, explanation: "oplog 是固定大小的环形缓冲区，满了就覆盖最旧的。从节点太滞后可能发现需要的 oplog 已经被覆盖，只能做初始同步。" },
        { question: "仲裁节点（Arbiter）的作用？", options: ["存数据", "只参与投票不存数据——帮打破选举平票的，省存储", "加速查询", "备份数据"], answer: 1, explanation: "Arbiter 不存数据，只在选举时投票。双数数据节点+1 仲裁节点组成奇数投票，打破平票局面。" },
      ],
    },
    "mongodb-sharding": {
      slug: "mongodb-sharding",
      sections: [
        {
          title: "分片是什么——一桌放不下就分桌",
          content: `数据量太大一台机器装不下怎么办？分片（Sharding）——把数据水平拆分到多台机器上。就像一个班的学生太多排不下，按学号分到不同教室。

MongoDB 分片集群有三个角色：
- mongos：路由，客户端连它，它把请求路由到正确的分片
- Config Server：存元数据——哪个分片管哪段范围的数据
- Shard：真正存数据的地方，每个分片本身又是一个副本集

分片键（Shard Key）是核心——你根据哪个字段来分片，决定了数据分布是否均匀。分片键选不好，数据全堆在一个分片上，分片就白搞了。`,
        },
        {
          title: "分片键怎么选",
          content: `分片键选得好不好，直接决定分片的成败。好的分片键要做到：
- 数据分布均匀（高基数）：不要把所有人都分到同一个分片
- 读/写分散：单个查询不要扫所有分片
- 查询包含分片键：这样 mongos 可以直接定位到目标分片

反面例子：用 gender 做分片键——只有男/女/NULL 三个值，分 10 个分片也只会用到 3 个。正面例子：用 userId 做分片键——几百上千万用户均匀分布。`,
          code: `// 范围分片（Ranged）——按分片键的值范围分
// 比如 userId: 0-100万在分片1, 100-200万在分片2
sh.shardCollection("mydb.users", { userId: 1 })

// 哈希分片（Hashed）——对分片键哈希后分
// 适合递增键（如 ObjectId），避免热点
sh.shardCollection("mydb.orders", { _id: "hashed" })

// 复合分片键——先按 zone 范围分，再按 _id 哈希分
sh.shardCollection("mydb.events", { zone: 1, _id: "hashed" })`,
          language: "javascript",
        },
        {
          title: "搭建与操作",
          content: `分片集群的配置和操作比副本集复杂不少。基本操作：`,
          code: `// 连 mongos 路由器
mongosh --port 27017

// 查看分片状态
sh.status()
// --- Sharding Status ---
// shards:
//   shard0: rs0/localhost:27018
//   shard1: rs1/localhost:27019

// 开启数据库分片
sh.enableSharding("mydb")

// 把集合分片（分片键是 userId 哈希）
sh.shardCollection("mydb.users", { userId: "hashed" })

// 查看各分片数据分布
db.users.getShardDistribution()
// Shard shard0 at rs0/localhost:27018
//   data: 512MiB docs: 1000000 chunks: 5
// Shard shard1 at rs1/localhost:27019
//   data: 490MiB docs: 980000  chunks: 5

// 手动迁移 chunk
sh.moveChunk("mydb.users", { userId: MinKey }, "shard1")

// 添加新分片
sh.addShard("rs2/localhost:27020")`,
          language: "javascript",
        },
        {
          title: "Chunk 与均衡器",
          content: `MongoDB 以 Chunk（数据块）为单位在分片间迁移数据。默认每个 Chunk 64MB，当一个分片的 Chunk 数量明显多于其他分片时，均衡器（Balancer）自动迁移 Chunk 来平衡分布。`,
          code: `// 均衡器配置
sh.getBalancerState()        // 均衡器是否开启
sh.setBalancerState(true)    // 开启均衡器
sh.startBalancer()           // 立即启动
sh.stopBalancer()            // 暂停均衡

// 设置在特定时间窗口均衡（避免影响高峰期）
use config
db.settings.updateOne(
  { _id: "balancer" },
  { $set: { activeWindow: { start: "02:00", stop: "06:00" } } },
  { upsert: true }
)`,
          language: "javascript",
          tip: "均衡器是对性能有影响的后台操作。通常配置它在半夜低峰期自动运行，白天暂停避免抢资源。",
        },
      ],
      quiz: [
        { question: "分片键选「性别」字段会有什么问题？", options: ["没问题", "基数太低——只有 2-3 个值，数据全堆在几个分片上，其他分片浪费", "查询变快", "存储变大"], answer: 1, explanation: "分片键基数低会导致数据严重倾斜——大量数据挤在少数分片上，分片的负载均衡优势荡然无存。" },
        { question: "mongos 在分片集群中扮演什么角色？", options: ["存数据", "请求路由——客户端连它，它知道哪个分片有哪个数据然后把请求转发过去", "备份", "监控"], answer: 1, explanation: "mongos 是分片集群的入口，像一个智能代理——客户端连接的是它而不是各个分片，它根据分片键路由请求。" },
        { question: "Hashed 分片相比 Ranged 分片的优势？", options: ["更快", "避免热点——递增字段被哈希后均匀分散到各分片", "更简单", "不需要分片键"], answer: 1, explanation: "递增字段（ObjectId、自增 ID）用 Ranged 分片会让新数据都写到一个分片上。Hashed 打散后写入压力均衡。" },
        { question: "分片集群中 Config Server 存储什么？", options: ["用户数据", "集群元数据——分片键范围映射、chunk 分布等", "日志", "索引"], answer: 1, explanation: "Config Server 存的是「地图」——哪段分片键范围的数据在哪个分片上，mongos 需要查它来做路由决策。" },
        { question: "什么时候该上分片？", options: ["项目一开始就分", "单机扛不住了——磁盘满了、内存不够了、CPU 撑不住了才考虑", "任何时候", "数据量超过 1GB"], answer: 1, explanation: "分片增加运维复杂度，单机能解决的问题不要分。当读写/存储确实超出单机极限，或需要地域分布时再考虑。" },
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

  // ============ Kubernetes ============
  k8s: {
    "k8s-basics": {
      slug: "k8s-basics",
      sections: [
        {
          title: "Kubernetes 是啥玩意儿",
          content: `Kubernetes（简称 K8s，因为 K 和 s 中间有 8 个字母）说白了就是个容器编排平台。你手动管几台 Docker 还行，但几十台几百台呢？K8s 就是帮你自动调度容器的「大管家」。
          
打个比方：你开个餐厅，Docker 是把每道菜打包进外卖盒。K8s 就是调度系统——哪桌点了菜、哪个厨师有空、出锅了谁去送。你不用操心某个厨师请假了怎么办，K8s 自动把活分给别的厨师。

K8s 的核心本事：
- 自动调度——容器该跑在哪台机器上，它帮你算
- 自愈能力——容器挂了自动重启，节点挂了自动迁移
- 弹性伸缩——流量大了自动加实例，少了自动缩
- 服务发现——容器之间怎么互相找到，它帮你搞定
- 滚动更新——升级不中断服务，新老版本平稳过渡`,
        },
        {
          title: "核心概念扫盲",
          content: `K8s 有几个绕不开的概念，搞清楚了就算入门了：

Pod——最小调度单元，一个 Pod 里可以装一个或多个紧密相关的容器。你可以把 Pod 理解成「一台迷你虚拟机」，同一个 Pod 里的容器共享网络和存储。不过大多数时候一个 Pod 只跑一个容器。

Node——物理机或虚拟机，就是真正跑容器的地方。有 Master 节点（控制平面）和 Worker 节点（干活的）。

Service——Pod 是临时的，重启 IP 就变了。Service 提供一个稳定的访问地址，不管后面 Pod 怎么变，Service 的 IP 和 DNS 名不变。

Deployment——声明你想要的 Pod 副本数和更新策略。你说「我要 3 个 nginx」，Deployment 就保证任何时候都有 3 个活着。`,
          code: `# 集群信息
kubectl cluster-info              # 看看集群状态
kubectl get nodes                 # 列出所有节点
# NAME           STATUS   ROLES           AGE   VERSION
# master-node    Ready    control-plane   30d   v1.28.0
# worker-01      Ready    <none>          30d   v1.28.0
# worker-02      Ready    <none>          30d   v1.28.0

# 上下文管理（多集群切换）
kubectl config get-contexts       # 有哪些集群
kubectl config use-context prod   # 切换到生产集群`,
          language: "bash",
        },
        {
          title: "第一把部署——跑个 nginx",
          content: `纸上谈兵不如动手来一发。用 kubectl 在 K8s 上跑一个 nginx：`,
          code: `# 创建一个 nginx 部署（最简单的方式）
kubectl create deployment my-nginx --image=nginx:latest
# deployment.apps/my-nginx created

# 看看部署状态
kubectl get deployments
# NAME       READY   UP-TO-DATE   AVAILABLE   AGE
# my-nginx   1/1     1            1           10s

# 看看 Pod 跑起来没
kubectl get pods
# NAME                        READY   STATUS    RESTARTS   AGE
# my-nginx-7d4b8c6f9-x2k3j   1/1     Running   0          30s

# 把服务暴露出去（临时测试用）
kubectl expose deployment my-nginx --port=80 --type=NodePort
# service/my-nginx exposed

# 看看暴露的端口
kubectl get svc my-nginx
# NAME       TYPE       CLUSTER-IP      PORT(S)        AGE
# my-nginx   NodePort   10.96.100.50    80:32456/TCP   5s

# 现在可以用 curl localhost:32456 访问了！

# 不用了就删掉
kubectl delete deployment my-nginx
kubectl delete service my-nginx`,
          language: "bash",
          tip: "create deployment 适合快速测试。生产环境还是推荐用 YAML 文件声明式管理，下面会讲。",
        },
      ],
      quiz: [
        { question: "K8s 这个名字怎么来的？", options: ["随便起的", "Kubernetes 缩略——K 和 s 中间 8 个字母", "K8 是版本号", "8 个核心组件"], answer: 1, explanation: "Kubernetes 这个单词，K 和 s 之间正好有 8 个字母（ubernete），所以简写 K8s。" },
        { question: "K8s 里最小的调度单元是？", options: ["Container 容器", "Pod", "Node 节点", "Service"], answer: 1, explanation: "Pod 是 K8s 能管理的最小单位，一个 Pod 可以装一个或多个容器。" },
        { question: "Deployment 主要管什么？", options: ["网络", "存储", "Pod 副本数和更新策略", "日志"], answer: 2, explanation: "Deployment 声明式地管理 Pod 的期望副本数、更新方式、回滚策略等。" },
        { question: "kubectl get pods 能看到什么？", options: ["集群节点列表", "当前命名空间下所有 Pod 的状态", "Service 列表", "网络策略"], answer: 1, explanation: "get pods 列出 Pod 的名称、就绪容器数、状态、重启次数和运行时长。" },
        { question: "为什么需要 Service，直接访问 Pod IP 不行吗？", options: ["Pod 没有 IP", "Pod 重启后 IP 会变——Service 提供稳定的访问地址", "Service 更快", "Pod 太多记不住"], answer: 1, explanation: "Pod 是临时性的，一旦重启或迁移 IP 就换了。Service 提供固定 DNS 名和 IP，不管你后面 Pod 怎么变。" },
      ],
    },
    "k8s-pods": {
      slug: "k8s-pods",
      sections: [
        {
          title: "Pod 到底长啥样",
          content: `Pod 是 K8s 世界里的一等公民，你可以这样理解：Pod 像一个「工位」，上面可以坐一个人（一个容器），也可以坐一个小组（多个紧密协作的容器）。同一 Pod 里的容器共享相同的网络命名空间（同一个 localhost）和存储卷，可以高效通信。

但注意——同一个 Pod 里的容器是「同生共死」的：Pod 被调度到哪个节点，里面的容器就全在那；Pod 被删了，里面所有容器一起走。`,
          code: `# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-web-app
  labels:
    app: web
    env: dev
spec:
  containers:
    - name: nginx
      image: nginx:1.25-alpine
      ports:
        - containerPort: 80
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "500m"
    - name: sidecar-logger
      image: busybox
      command: ["sh", "-c", "while true; do echo log-entry; sleep 10; done"]`,
          language: "yaml",
        },
        {
          title: "Pod 生命周期",
          content: `一个 Pod 从出生到死亡会经历这几个阶段：

Pending——刚提交，调度器在找合适的节点，或者正在拉镜像
Running——跑起来了，至少一个容器还在运行
Succeeded——所有容器都正常退出了（一次性任务）
Failed——有容器异常退出
Unknown——节点挂了，K8s 不知道 Pod 啥状态

Pod 本身是挺「脆」的——挂了不会自动活。所以生产上一般不用裸 Pod，而是用 Deployment 或 StatefulSet 管着。`,
          code: `# 查看 Pod 详细信息（包括事件，看看为什么一直 Pending）
kubectl describe pod my-web-app

# 看 Pod 日志
kubectl logs my-web-app                 # 主容器日志
kubectl logs my-web-app -c nginx         # 指定容器日志
kubectl logs -f my-web-app               # 实时跟踪

# 进 Pod 里敲命令
kubectl exec -it my-web-app -- sh

# 删 Pod（如果被 Deployment 管着，会自动重建）
kubectl delete pod my-web-app`,
          language: "bash",
          tip: "kubectl describe 是排查问题的神器——Pod 起不来？describe 告诉你为什么，是镜像拉不下来还是资源不够。",
        },
        {
          title: "Init 容器与健康检查",
          content: `Init 容器在主容器启动前运行，适合做初始化工作（比如等数据库就绪、下载配置文件）。主容器只有等所有 Init 容器跑完了才会启动。

健康检查分三种：
livenessProbe——「你还活着吗？」如果挂了就重启
readinessProbe——「你准备好接客了吗？」没准备好就不给流量
startupProbe——「你启动完成了吗？」防止启动慢的应用被 livenessProbe 误杀`,
          code: `# pod-with-checks.yaml（片段）
spec:
  initContainers:
    - name: init-db
      image: busybox
      command: ["sh", "-c", "until nc -z db-service 5432; do sleep 2; done"]
  containers:
    - name: app
      image: my-app:v1
      ports:
        - containerPort: 3000
      livenessProbe:
        httpGet:
          path: /health
          port: 3000
        initialDelaySeconds: 30
        periodSeconds: 10
      readinessProbe:
        httpGet:
          path: /ready
          port: 3000
        initialDelaySeconds: 5
        periodSeconds: 5`,
          language: "yaml",
          warning: "没有 readinessProbe，Pod 一启动就会被 Service 送流量。如果应用启动要 20 秒，前 20 秒的请求都会报错。",
        },
      ],
      quiz: [
        { question: "同一个 Pod 里的多个容器共享什么？", options: ["PID 命名空间", "网络命名空间和存储卷", "文件系统", "用户命名空间"], answer: 1, explanation: "同一 Pod 的容器共享网络（同一个 IP/localhost）和挂载的存储卷，可以高效协作。" },
        { question: "Pod 处于 Pending 状态最常见的原因？", options: ["程序写错了", "资源不够或镜像拉不下来", "网络断了", "用户密码错了"], answer: 1, explanation: "Pending 通常是因为节点资源不足、镜像拉取慢或 PVC 未绑定。用 describe 能看到具体原因。" },
        { question: "livenessProbe 和 readinessProbe 有什么区别？", options: ["一样", "liveness 决定是否重启，readiness 决定是否接收流量", "liveness 更快", "readiness 检查代码错误"], answer: 1, explanation: "liveness 探活——挂了就重启容器；readiness 探就绪——没准备好就别给流量，等准备好了再接入。" },
        { question: "Init 容器跑完之前主容器会启动吗？", options: ["会", "不会——必须等所有 Init 容器成功退出", "部分会", "取决于配置"], answer: 1, explanation: "Init 容器是串行执行的，全部成功退出后主容器才启动。适合做前置初始化工作。" },
        { question: "kubectl exec 和 docker exec 有啥不一样？", options: ["完全一样", "kubectl exec 进 Pod，docker exec 进容器——一个 Pod 可能多个容器", "kubectl exec 更快", "kubectl exec 不需要权限"], answer: 1, explanation: "一 Pod 多容器时，kubectl exec 默认进第一个容器，用 -c 指定容器名。本质是 exec 到 Pod 上的容器的操作。" },
      ],
    },
    "k8s-services": {
      slug: "k8s-services",
      sections: [
        {
          title: "Service 解决什么问题",
          content: `你的应用有好几个副本分散在不同节点上，每个 Pod 有自己的 IP，今天这个 IP，明天 Pod 重建了又换了 IP。你总不能每次重建都手动更新 DNS 吧？Service 就是来干这个的——给一组 Pod 提供一个固定的访问入口。

Service 的机制说白了就是：Service 有个固定的 Cluster IP，背后有一组 Pod。你访问 Service IP，kube-proxy 自动把流量转给其中一个健康的 Pod。Service 用标签选择器（label selector）找到属于它的 Pod。`,
          code: `# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-svc
spec:
  type: ClusterIP          # 默认类型，集群内部访问
  selector:
    app: my-app            # 找标签 app=my-app 的 Pod
  ports:
    - port: 80             # Service 对外端口
      targetPort: 3000     # Pod 上实际监听的端口
      protocol: TCP`,
          language: "yaml",
        },
        {
          title: "四种 Service 类型",
          content: `ClusterIP——默认，只在集群内部能访问。内部服务间互相调用用这个就够了。

NodePort——在每个节点上开一个端口（范围 30000-32767），把流量转给 Service。你可以用 <任意节点IP>:<NodePort> 从集群外访问。适合测试环境。

LoadBalancer——云平台提供的负载均衡器，分配一个外部 IP 给你。生产环境最常用，前提是集群跑在云上。

ExternalName——把 Service 映射到一个外部 DNS 名。比如你的数据库在集群外，想通过集群内的 Service 名访问它。`,
          code: `# NodePort 类型
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 3000
      nodePort: 30080      # 指定端口号，不指定会自动分配

# LoadBalancer 类型
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 3000

# ExternalName 类型
spec:
  type: ExternalName
  externalName: db.external.example.com  # 集群外的地址`,
          language: "yaml",
        },
        {
          title: "Service 与 Endpoint",
          content: `Service 怎么知道流量该发给谁？每个 Service 对应一个 Endpoints 对象，里面记录了所有匹配的 Pod 的 IP 和端口。kube-proxy 根据 Endpoints 来转发流量。

你可以手动看看：`,
          code: `# 看 Service 详情
kubectl describe svc my-app-svc
# Selector:  app=my-app
# Endpoints: 10.244.1.5:3000, 10.244.2.3:3000
# ← 这里列出所有匹配 Pod 的 IP

# 直接看 Endpoints
kubectl get endpoints my-app-svc
# NAME         ENDPOINTS                         AGE
# my-app-svc   10.244.1.5:3000,10.244.2.3:3000   1h

# 如果你的 Pod 没有出现在 Endpoints 里，检查：
# 1. Pod 的 labels 和 Service 的 selector 匹配吗？
# 2. Pod 的 readinessProbe 通过了吗？
# 3. Pod 的 containerPort 和 Service 的 targetPort 对上了吗？`,
          language: "bash",
          tip: "Service 不转发给 readinessProbe 没通过的 Pod——这是实现「滚动更新不丢流量」的关键。",
        },
      ],
      quiz: [
        { question: "ClusterIP 类型的 Service 能在集群外访问吗？", options: ["能，直接用 IP", "不能——只能集群内部用，外部需要 NodePort 或 LoadBalancer", "需要 VPN", "跟 NodePort 一样"], answer: 1, explanation: "ClusterIP 只在集群虚拟网络内可达，外部访问要用 NodePort、LoadBalancer 或 Ingress。" },
        { question: "Service 通过什么找到它管理的 Pod？", options: ["Pod 名称", "标签选择器 label selector", "Pod IP", "随机分配"], answer: 1, explanation: "Service 靠 selector 匹配 Pod 的 labels——标签对上了，你就是我的 Pod。" },
        { question: "Service 的 port 和 targetPort 有什么区别？", options: ["一样", "port 是 Service 的端口，targetPort 是 Pod 上容器监听的端口", "port 是 UDP，targetPort 是 TCP", "port 对外，targetPort 内部"], answer: 1, explanation: "假设 Service 在 80 端口对外，但 Pod 里应用跑在 3000——port:80, targetPort:3000。" },
        { question: "NodePort 的端口范围是多少？", options: ["1024-65535", "30000-32767", "80-443", "8000-9000"], answer: 1, explanation: "K8s 默认 NodePort 范围是 30000-32767，可以通过 kube-apiserver 的 --service-node-port-range 修改。" },
        { question: "ExternalName 类型 Service 有什么用？", options: ["暴露端口", "把集群外的服务映射到集群内的 DNS——集群内用 Service 名访问外部资源", "负载均衡", "创建外部 IP"], answer: 1, explanation: "ExternalName 不做代理，只创建一条 CNAME DNS 记录——集群内访问 my-svc.default 等于访问 external.example.com。" },
      ],
    },
    "k8s-deployment": {
      slug: "k8s-deployment",
      sections: [
        {
          title: "Deployment 是什么",
          content: `Deployment 是 K8s 里最常用的工作负载，像一个「自动控温器」——你告诉它期望的温度（几个副本），它自己开关暖气（调度 Pod）来维持。Pod 挂了自动补、版本升级零停机、出问题一键回滚。

跟裸 Pod 的区别：裸 Pod 死了就死了，没人管。Deployment 下的 Pod 死了会立刻重建一个——这是自愈能力的基本保障。`,
          code: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3                    # 我要 3 个副本
  selector:
    matchLabels:
      app: web-app
  template:                      # Pod 模板
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: app
          image: nginx:1.25-alpine
          ports:
            - containerPort: 80
          resources:
            requests:
              memory: "64Mi"
              cpu: "100m"
            limits:
              memory: "128Mi"
              cpu: "200m"`,
          language: "yaml",
        },
        {
          title: "滚动更新与回滚",
          content: `升级版本是家常便饭，K8s 的滚动更新让你在升级时服务不中断。原理是：每次只替换一部分 Pod，新 Pod 就绪了再干掉旧 Pod。如果新版本有问题，你可以随时回滚到上一个版本。

滚动更新有两个关键参数：
- maxSurge——升级时最多额外创建几个 Pod（默认 25%）
- maxUnavailable——升级时最多允许多少 Pod 不可用（默认 25%）`,
          code: `# 应用 Deployment
kubectl apply -f deployment.yaml

# 升级镜像版本
kubectl set image deployment/web-app app=nginx:1.26-alpine

# 或者直接改 YAML 然后 apply
# kubectl edit deployment web-app

# 看升级进度
kubectl rollout status deployment/web-app
# Waiting for deployment "web-app" rollout to finish: 1 out of 3 new replicas...
# deployment "web-app" successfully rolled out

# 看历史版本
kubectl rollout history deployment/web-app
# REVISION  CHANGE-CAUSE
# 1         <none>
# 2         <none>

# 回滚到上一个版本
kubectl rollout undo deployment/web-app

# 回滚到指定版本
kubectl rollout undo deployment/web-app --to-revision=1

# 暂停/恢复（方便批量操作）
kubectl rollout pause deployment/web-app
kubectl rollout resume deployment/web-app`,
          language: "bash",
          tip: "每次 apply 改 Deployment 都会创建新 ReplicaSet，回滚的本质就是切换到旧的 ReplicaSet。",
        },
        {
          title: "扩缩容",
          content: `流量上来了加 Pod，流量下去了减 Pod。可以手动调，也可以让 HPA（水平自动扩缩器）根据 CPU/内存自动调：`,
          code: `# 手动扩容
kubectl scale deployment web-app --replicas=5

# 手动缩容
kubectl scale deployment web-app --replicas=2

# 自动扩缩（HPA）
kubectl autoscale deployment web-app --cpu-percent=70 --min=2 --max=10
# 平均 CPU 超过 70% 就自动加 Pod，最多 10 个

# 查看 HPA 状态
kubectl get hpa
# NAME      REFERENCE          TARGETS   MIN   MAX   REPLICAS
# web-app   Deployment/web-app 45%/70%   2     10    3`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "Deployment 滚动更新时怎么保证不丢流量？", options: ["暂停应用", "先启新 Pod 再停旧 Pod，配合 readinessProbe", "用 LoadBalancer", "手动切换"], answer: 1, explanation: "新 Pod 先创建，通过 readinessProbe 确认就绪后才接入 Service，然后优雅停掉旧 Pod。" },
        { question: "Deployment 下 Pod 挂了会怎样？", options: ["就没了", "自动重建一个——Deployment 保证实际副本数等于期望副本数", "手动重启", "整个 Deployment 重启"], answer: 1, explanation: "Deployment 的控制器会监控 Pod 数量，发现少了就立刻创建新的，实现自愈。" },
        { question: "kubectl rollout undo 做了什么？", options: ["删除 Deployment", "回滚到之前的 Deployment 版本", "重启 Pod", "停止升级"], answer: 1, explanation: "undo 让 K8s 切回旧 ReplicaSet——Pod 会滚动替换为上一个版本的镜像，全程不中断服务。" },
        { question: "HPA 根据什么指标自动扩缩？", options: ["代码质量", "CPU 和内存使用率（默认），也可以自定义指标", "日志数量", "Pod 数量"], answer: 1, explanation: "HPA 默认看 CPU 利用率，也支持内存、请求 QPS、队列长度等自定义指标。" },
        { question: "maxSurge: 1 和 maxUnavailable: 0 配合会怎样？", options: ["不能升级", "每次只多创建 1 个新 Pod，旧的不停——零中断升级", "旧 Pod 全停", "只创建不删除"], answer: 1, explanation: "maxUnavailable=0 保证永远有足够 Pod 服务，maxSurge 允许临时多建 Pod，升级期间容量不降。" },
      ],
    },
    "k8s-config": {
      slug: "k8s-config",
      sections: [
        {
          title: "ConfigMap——配置抽出来",
          content: `把配置硬编码进镜像里是大忌——改个配置还得重新构建镜像、推送、部署，太折腾了。ConfigMap 让你把配置从代码里抽出来，以环境变量、命令行参数、或文件的形式注入 Pod。

简单说就是：代码归代码，配置归 ConfigMap，镜像不变，配置随时改。`,
          code: `# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_URL: "postgres://db-svc:5432/mydb"
  LOG_LEVEL: "debug"
  app.properties: |
    server.port=3000
    cache.ttl=3600
    max.connections=50

---
# pod 里使用 ConfigMap
spec:
  containers:
    - name: app
      image: my-app:v1
      envFrom:
        - configMapRef:
            name: app-config        # 所有 key 都变成环境变量
      # 或者只注入特定的 key
      env:
        - name: DB_URL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: DATABASE_URL`,
          language: "yaml",
        },
        {
          title: "Secret——密码别明文存",
          content: `Secret 跟 ConfigMap 很像，但它存的都是敏感信息：密码、token、证书等。Secret 的数据是 base64 编码的（不是加密！只是防止无意中看到），集群里需要额外配置才真正加密存储。

注意：base64 编码不是加密——echo cGFzc3dvcmQ= | base64 -d 就能解出来。生产环境要配合 RBAC 控制谁能读 Secret，或使用外部密钥管理服务。`,
          code: `# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4=          # echo -n "admin" | base64
  password: c2VjcmV0MTIz      # echo -n "secret123" | base64
# 也可以用 stringData 直接写明文（K8s 自动编码）
stringData:
  api-key: "sk-abc123"

---
# pod 里挂载 Secret 为文件
spec:
  containers:
    - name: app
      image: my-app:v1
      volumeMounts:
        - name: secret-vol
          mountPath: /etc/secrets
          readOnly: true
  volumes:
    - name: secret-vol
      secret:
        secretName: db-secret`,
          language: "yaml",
          warning: "Secret 默认不加密存储在 etcd 中。生产环境建议开启 etcd 加密，或使用 Sealed Secrets、Vault 等方案。",
        },
        {
          title: "Volume 挂载——把配置当文件用",
          content: `除了环境变量，你还可以把 ConfigMap/Secret 的每个 key 变成一个文件挂到 Pod 里。应用直接读文件就行，跟读本地配置文件一个感觉。ConfigMap 更新后，挂载的文件也会同步更新（有延迟）。`,
          code: `# 把 ConfigMap 的内容变成文件
spec:
  containers:
    - name: app
      volumeMounts:
        - name: config-vol
          mountPath: /app/config      # 配置文件在这里
  volumes:
    - name: config-vol
      configMap:
        name: app-config
        items:                        # 可选：只挂指定 key
          - key: app.properties
            path: application.properties

# 容器里看到的效果：
# /app/config/DATABASE_URL         → "postgres://db-svc:5432/mydb"
# /app/config/LOG_LEVEL            → "debug"
# /app/config/application.properties → "server.port=3000\\ncache.ttl=3600..."`,
          language: "yaml",
          tip: "ConfigMap 更新后 kubelet 会同步到挂载目录，但应用不会自动重载。配合 sidecar 容器或应用自身的配置 hot-reload 实现动态刷新。",
        },
      ],
      quiz: [
        { question: "ConfigMap 的主要作用是什么？", options: ["存储代码", "把配置从镜像分离出来，方便修改和复用", "加密配置", "管理 Pod 副本"], answer: 1, explanation: "ConfigMap 让配置脱离镜像——改配置不用重构建，不同环境用不同 ConfigMap 就行。" },
        { question: "Secret 的 data 字段是加密的吗？", options: ["是的", "只是 base64 编码，不是加密——需要额外方案才能真正加密", "默认为 AES256 加密", "取决于 K8s 版本"], answer: 1, explanation: "base64 只是编码防止无意看到，任何人拿到 Secret 都能轻松解码。etcd 加密需额外配置。" },
        { question: "ConfigMap 更新后 Pod 里会自动生效吗？", options: ["立刻生效", "作为卷挂载的文件会更新但应用不一定重载；环境变量不会变", "不会变", "需要重启集群"], answer: 1, explanation: "卷挂载的内容会更新，但应用需要自己检测文件变化并重载。环境变量只在 Pod 启动时注入，不变。" },
        { question: "envFrom: configMapRef 是什么效果？", options: ["挂载文件", "把 ConfigMap 里所有 key 变成容器的环境变量", "创建新 ConfigMap", "删除配置"], answer: 1, explanation: "envFrom 批量导入——ConfigMap 的 data 下每个 key/value 都变成一个环境变量，省得一个个写。" },
      ],
    },
    "k8s-networking": {
      slug: "k8s-networking",
      sections: [
        {
          title: "K8s 网络模型",
          content: `K8s 网络有几个基本要求：
- 所有 Pod 之间可以直连（不用 NAT），就像一个扁平的大局域网
- 所有 Node 可以和所有 Pod 直连
- Pod 看到的自己的 IP 跟其他 Pod 看到它的 IP 一致

这些规则是很理想化的，具体怎么实现靠 CNI（容器网络接口）插件——Flannel、Calico、Cilium 等。每个插件实现方式不一样，但对外暴露的 Pod 网络体验都一样。`,
        },
        {
          title: "Ingress——HTTP 路由",
          content: `Service 处理了内部访问，但外部 HTTP 流量怎么进集群？用 Ingress。Ingress 像一个「智能路由器」，根据域名和路径把请求转发给不同的 Service。

比如 example.com/api 转到 API Service，example.com/web 转到前端 Service。而且 Ingress 自带 TLS 终结（HTTPS），不需要每个应用自己管证书。`,
          code: `# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - api.example.com
      secretName: tls-secret
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 80
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web-service
                port:
                  number: 80`,
          language: "yaml",
        },
        {
          title: "NetworkPolicy——网络防火墙",
          content: `默认情况下，K8s 里所有 Pod 之间可以随便通信。这在安全上是灾难——一个被攻破的 Pod 能扫整个集群。NetworkPolicy 给 Pod 设防火墙规则：谁可以跟我通信、我可以跟谁通信。

注意：NetworkPolicy 需要 CNI 插件支持（Calico、Cilium 支持，Flannel 默认不支持）。`,
          code: `# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      app: database               # 这条规则作用于 database Pod
  policyTypes:
    - Ingress
    - Egress
  ingress:                         # 谁能连我
    - from:
        - podSelector:
            matchLabels:
              app: backend         # 只有 backend Pod 可以连
      ports:
        - protocol: TCP
          port: 5432
  egress:                          # 我能连谁
    - to:
        - namespaceSelector: {}    # 允许访问所有命名空间
      ports:
        - protocol: TCP
          port: 53                 # 只允许 DNS 出站`,
          language: "yaml",
          tip: "NetworkPolicy 默认是「全开放」的，一旦你创建了第一条，就只有规则允许的流量通过——变成白名单模式。",
        },
        {
          title: "DNS 解析",
          content: `K8s 集群内自带 DNS 服务（CoreDNS），会自动为每个 Service 创建 DNS 记录。格式是：<service-name>.<namespace>.svc.cluster.local。

两个 Service 通信直接用短名就行（同命名空间）。跨命名空间用 service.namespace 这种格式。`,
          code: `# Pod 内部解析
nslookup api-service
# api-service.default.svc.cluster.local

# 跨命名空间访问
curl http://payment-service.production/api/charge

# 查看 CoreDNS 配置
kubectl -n kube-system get configmap coredns -o yaml

# 排查 DNS 问题
kubectl run -it --rm debug --image=busybox -- nslookup kubernetes.default`,
          language: "bash",
        },
      ],
      quiz: [
        { question: "Ingress 跟 Service 有什么区别？", options: ["没区别", "Service 管内部，Ingress 管外部 HTTP 路由和 TLS", "Ingress 更快", "Ingress 是 Service 的替换"], answer: 1, explanation: "Service 提供稳定的内部访问方式，Ingress 处理从集群外部进入的 HTTP/HTTPS 流量。" },
        { question: "CNI 是什么的缩写，干什么用？", options: ["Container Name Interface", "Container Network Interface——提供 Pod 间网络通信的插件标准", "Cloud Native Infrastructure", "Compute Node Integration"], answer: 1, explanation: "CNI 是一套标准接口，各种网络插件（Calico、Flannel）实现它来给 Pod 分配 IP、处理跨节点通信。" },
        { question: "K8s 默认 Pod 之间能互相通信吗？", options: ["不能", "能——默认全通，直到你创建 NetworkPolicy 限制", "只有同节点能通", "需要手动配置"], answer: 1, explanation: "默认所有 Pod 之间可以随便通信，NetworkPolicy 是从全开放变白名单的机制。" },
        { question: "Service DNS 记录格式是？", options: ["service.pod.node", "service.namespace.svc.cluster.local", "service.cluster.local", "namespace.service.port"], answer: 1, explanation: "完整格式是 service-name.namespace.svc.cluster.local，同命名空间内可以直接用 service-name 访问。" },
        { question: "CoreDNS 跑在哪个命名空间？", options: ["default", "kube-system", "coredns", "kube-dns"], answer: 1, explanation: "CoreDNS 作为集群基础设施，跑在 kube-system 命名空间下，以 Deployment 形式管理。" },
      ],
    },
    "k8s-storage": {
      slug: "k8s-storage",
      sections: [
        {
          title: "存储为什么这么麻烦",
          content: `容器的文件系统是临时的——容器重启就没了。那数据库的数据怎么办？K8s 用 Volume（卷）解决这个问题。Volume 的生命周期跟 Pod 绑定，但数据可以存在 Pod 外的持久化存储上。

K8s 的存储模型分三个层次：
- PV（PersistentVolume）——管理员准备的存储，像一个「仓库」
- PVC（PersistentVolumeClaim）——用户申请存储，像「领用单」
- StorageClass——自动化配置，你提交 PVC，它自动创建 PV`,
        },
        {
          title: "PV 和 PVC",
          content: `PV 是集群管理员预先准备好的存储空间，或者通过 StorageClass 自动创建。PVC 是用户对存储的需求声明——「我要 5GB，能读写一次就行」。K8s 自动匹配合适的 PV 给 PVC。

匹配规则：PV 的容量 >= PVC 的请求，访问模式一致，selector 匹配上。`,
          code: `# persistent-volume.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce          # 只有一个节点能读写
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /data/mysql

---
# persistent-volume-claim.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi          # 申请 5G，匹配到 10G 的 PV

---
# pod 里使用 PVC
spec:
  containers:
    - name: mysql
      image: mysql:8
      volumeMounts:
        - name: mysql-data
          mountPath: /var/lib/mysql
  volumes:
    - name: mysql-data
      persistentVolumeClaim:
        claimName: mysql-pvc`,
          language: "yaml",
        },
        {
          title: "StorageClass——动态配给",
          content: `手动创建 PV 太麻了，每个 PVC 都得有对应的 PV，跟配钥匙一样麻烦。StorageClass 让存储变成「自助式」——用户提交 PVC，K8s 按 StorageClass 的定义自动创建 PV。

云环境下这几乎是标配：AWS EBS、GCE Persistent Disk、Azure Disk 都有对应的 StorageClass。`,
          code: `# storage-class.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  encrypted: "true"
reclaimPolicy: Delete         # PVC 删除后 PV 也自动删除
volumeBindingMode: WaitForFirstConsumer  # 等 Pod 要用了再创建
allowVolumeExpansion: true    # 允许在线扩容

---
# PVC 直接引用 StorageClass
kind: PersistentVolumeClaim
metadata:
  name: dynamic-pvc
spec:
  storageClassName: fast-ssd   # 指定用哪个 StorageClass
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi`,
          language: "yaml",
          tip: "WaitForFirstConsumer 避免跨可用区绑定——等到 Pod 确定调度的节点后，才在同一可用区创建 PV。",
        },
      ],
      quiz: [
        { question: "PV 和 PVC 的关系是？", options: ["PV 申请存储，PVC 提供存储", "PV 是实际存储，PVC 是使用请求——像仓库和领料单", "两者是竞争关系", "PVC 创建 PV"], answer: 1, explanation: "PV 是准备好了的存储块，PVC 是你要存储的声明，K8s 自动把合适的 PV 绑给 PVC。" },
        { question: "ReadWriteOnce 访问模式什么意思？", options: ["所有节点都能读", "只能一个节点读写", "只读", "多个节点读写"], answer: 1, explanation: "ReadWriteOnce（RWO）——这个卷同一时间只能挂给一个节点上的 Pod 使用，适合大多数数据库。" },
        { question: "StorageClass 的 reclaimPolicy: Delete 会导致什么？", options: ["PVC 删不掉", "PVC 删除时自动清理底层存储", "保留数据", "自动扩容"], answer: 1, explanation: "Delete 策略下 PVC 一删，PV 和底层云盘一起没了。如果想保留数据，用 Retain 策略。" },
        { question: "emptyDir 和 hostPath 区别？", options: ["一样", "emptyDir 随 Pod 生灭；hostPath 绑定节点路径，Pod 删了数据还在", "hostPath 更快", "emptyDir 更安全"], answer: 1, explanation: "emptyDir 在 Pod 创建时空目录，Pod 删除就没了，适合临时缓存。hostPath 把节点目录挂进去，适合 DaemonSet 场景。" },
      ],
    },
    "k8s-monitoring": {
      slug: "k8s-monitoring",
      sections: [
        {
          title: "监控看什么",
          content: `K8s 集群跑起来后你得知道它在干嘛——节点资源够不够、Pod 是不是疯狂重启、服务延迟高不高。监控不是目的，告警才是——没有人 24 小时盯着仪表盘看。

K8s 生态的监控铁三角：
- Prometheus——指标收集和存储，K8s 监控的事实标准
- Grafana——把 Prometheus 的数据变成好看的图表
- AlertManager——指标异常了发告警（邮件、钉钉、Slack）`,
        },
        {
          title: "Metrics Server——基础资源监控",
          content: `想知道 Pod 吃了多少 CPU 内存？安装 Metrics Server 后就可以用 kubectl top 看了。Metrics Server 收集每个节点和 Pod 的资源使用情况，HPA 自动扩缩也依赖它。`,
          code: `# 安装 Metrics Server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# 看节点资源使用
kubectl top nodes
# NAME         CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
# worker-01    450m         22%    3.5Gi           45%
# worker-02    320m         16%    2.8Gi           36%

# 看 Pod 资源使用
kubectl top pods -n production
# NAME                    CPU(cores)   MEMORY(bytes)
# api-7d4b8c6f9-x2k3j    120m         256Mi
# worker-5f3a2b1c-3j4k    85m          128Mi

# 按标签筛选
kubectl top pods -l app=backend`,
          language: "bash",
        },
        {
          title: "日志管理",
          content: `K8s 不帮你存日志——Pod 的 stdout/stderr 输出只是临时存在的，Pod 删了日志就没了。生产环境通常用日志收集系统（ELK/EFK/Loki）集中存储和分析日志。

基本命令已经够日常排查用了：`,
          code: `# 看最近日志
kubectl logs api-pod-xxx

# 实时看
kubectl logs -f api-pod-xxx

# 看最近 1 小时的
kubectl logs --since=1h api-pod-xxx

# 看最近 100 行
kubectl logs --tail=100 api-pod-xxx

# 看之前挂掉的容器日志
kubectl logs --previous api-pod-xxx

# 多容器 Pod 指定容器
kubectl logs api-pod-xxx -c sidecar

# 看 Deployment 所有 Pod 的日志（需要 stern 工具）
# stern deployment/api-deploy -n production`,
          language: "bash",
          tip: "kubectl logs --previous 在排查容器为什么反复崩溃时特别有用——看上一次挂掉前的最后输出。",
        },
      ],
      quiz: [
        { question: "Metrics Server 主要收集什么？", options: ["日志", "Pod 和 Node 的 CPU、内存实时数据", "网络流量", "错误率"], answer: 1, explanation: "Metrics Server 只收集资源指标（CPU/内存），不存历史数据，HPA 用它来判断要不要扩缩。" },
        { question: "kubectl top pods 的数据从哪来？", options: ["直接读 Pod", "从 Metrics Server 聚合得到", "从 Prometheus", "从 kubelet"], answer: 1, explanation: "kubectl top 依赖 Metrics Server 的后端 API，没有安装 Metrics Server 时会报错。" },
        { question: "kubectl logs --previous 看的是什么？", options: ["当前日志", "上一个崩溃了的容器实例的日志——排查一直重启很有用", "昨天的日志", "错误日志"], answer: 1, explanation: "容器反复崩溃重启时，每次重启日志就清空了。--previous 能看到上一次实例的输出，分析崩溃原因。" },
        { question: "Prometheus 在 K8s 生态中的角色？", options: ["日志查看器", "指标采集和存储——K8s 监控的事实标准", "部署工具", "网络插件"], answer: 1, explanation: "Prometheus 定期拉取每个 Pod/Node 暴露的 metrics 端点，聚合成时间序列数据，供 Grafana 可视化和 AlertManager 告警。" },
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
  },

  // ============ Node.js ============
  nodejs: {
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
    "nodejs-database": {
      slug: "nodejs-database",
      sections: [
        {
          title: "数据库连接——别每次都重连",
          content: `跟数据库打交道是后端的基本功。Node.js 连数据库有个大坑——你如果每个请求都 new 一个连接，高并发下很快就把数据库连接池耗光了。正确的做法是用连接池，一次建立、复用到地老天荒。

连接池就像一个停车场——初始化时建好固定数量的连接车位，请求来了直接停，用完了归还，不用每次现找车位。`,
          code: `// MySQL / MariaDB 连接池
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "mydb",
  waitForConnections: true,
  connectionLimit: 10,           // 最多 10 个连接
  queueLimit: 0                  // 排队不限
});

// 用连接池执行查询
async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users WHERE active = ?", [true]);
  return rows;
}

// 事务
async function transferMoney(fromId, toId, amount) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("UPDATE accounts SET balance = balance - ? WHERE id = ?", [amount, fromId]);
    await conn.query("UPDATE accounts SET balance = balance + ? WHERE id = ?", [amount, toId]);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();              // 归还连接——别忘了！
  }
}`,
          language: "javascript",
          tip: "finally 里 release 连接是铁律——即使抛异常也要释放。不然连接泄漏，池耗光后整个服务挂掉。",
        },
        {
          title: "ORM 还是裸 SQL？",
          content: `这是个千古争论——用 ORM（Object-Relational Mapping）把数据库行映射成 JS 对象，还是手写 SQL？各有各的好：

裸 SQL：你最精确地控制数据库，性能最优，复杂查询不会翻车。但拼接字符串容易出 SQL 注入漏洞，大量 CRUD 代码重复。

ORM（Prisma、TypeORM、Sequelize）：自动生成 SQL，代码更短更安全，迁移（migration）管理很方便。但对复杂查询生成的 SQL 可能不是你想要的，还有 N+1 查询的性能陷阱。

我的建议：简单 CRUD 用 ORM 提效率，复杂查询降级到原生 SQL。两者不冲突——同一项目可以混用。`,
          code: `// Prisma（现代 Node.js ORM 首选）
// schema.prisma
// model User {
//   id    Int     @id @default(autoincrement())
//   email String  @unique
//   name  String?
//   posts Post[]
// }

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 查用户及其帖子（关联查询，一条搞定）
const user = await prisma.user.findUnique({
  where: { email: "alice@example.com" },
  include: { posts: true }
});

// 创建用户
const newUser = await prisma.user.create({
  data: { email: "bob@test.com", name: "Bob" }
});

// 用原生 SQL 查复杂报表
const result = await prisma.$queryRaw\`
  SELECT DATE(createdAt) as date, COUNT(*) as count
  FROM orders
  WHERE createdAt >= \${startDate}
  GROUP BY DATE(createdAt)
\`;

// 优雅关闭
await prisma.$disconnect();`,
          language: "javascript",
        },
        {
          title: "MongoDB 连接——Mongoose",
          content: `MongoDB 在 Node.js 世界的标配是 Mongoose——它让你用 Schema 定义文档结构，多了类型约束和验证，不像原生的 MongoDB 那样字段随便写。很多人觉得 Schema 违背了 MongoDB 的灵活精神——但生产环境没有约束迟早是一团乱麻。

Mongoose 的核心是「以代码定义数据结构」——你的 User 模型有哪些字段、什么类型、哪些必填，都写在代码里。`,
          code: `import mongoose from "mongoose";

// 连接
await mongoose.connect("mongodb://localhost:27017/mydb");

// 定义 Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number, min: 0, max: 150 },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

// 创建 Model
const User = mongoose.model("User", userSchema);

// CRUD 操作
const newUser = await User.create({ name: "Alice", email: "alice@test.com" });
const users = await User.find({ age: { $gte: 18 } }).sort({ name: 1 }).limit(10);
await User.updateOne({ email: "alice@test.com" }, { age: 26 });
await User.deleteOne({ email: "alice@test.com" });

// 虚拟字段（不存到数据库，计算得到）
userSchema.virtual("profile").get(function() {
  return \`\${this.name} (\${this.email})\`;
});

// 中间件（类似数据库触发器）
userSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

// 关闭连接
await mongoose.disconnect();`,
          language: "javascript",
          tip: "Mongoose 的 pre/post 中间件可以在一大堆场景用：保存前加密密码、查询后自动格式化数据、删除后清理关联文件。",
        },
        {
          title: "查询性能——别让数据库瓶颈拖垮 Node",
          content: `Node.js 的非阻塞 I/O 在高并发下很能打，但如果数据库查询慢，Node 再能打也没用。数据库往往是系统瓶颈的元凶——几个常见坑：

N+1 查询：循环里查数据库。100 个用户，你查了 1 次用户列表+100 次各用户的帖子 = 101 次查询。用 JOIN 或 eager loading 一次查完。

没分页：SELECT * FROM users 返回 50 万行，内存直接爆。查列表必须加 LIMIT。

没索引：全表扫百万行数据，每次请求 3 秒，这服务没法用。`,
          code: `// 坏: N+1 查询
const users = await pool.query("SELECT * FROM users");
for (const user of users) {
  const posts = await pool.query("SELECT * FROM posts WHERE userId = ?", [user.id]);
  // 100 用户 = 101 次查询！
}

// 好: JOIN 一次搞定
const rows = await pool.query(\`
  SELECT u.*, p.title as postTitle
  FROM users u
  LEFT JOIN posts p ON u.id = p.userId
\`);

// 坏: 没分页
const rows = await pool.query("SELECT * FROM orders"); // 100万行...

// 好: 分页 + 只拿需要的字段
const rows = await pool.query(
  "SELECT id, amount, status FROM orders ORDER BY id DESC LIMIT ? OFFSET ?",
  [20, 0]
);

// 查询计数更快的方式
const [{ count }] = await pool.query(
  "SELECT COUNT(*) as count FROM orders WHERE status = ?", ["pending"]
);
// 不要查全表再到 JS 里 array.length！`,
          language: "javascript",
        },
        {
          title: "连接管理与优雅关闭",
          content: `生产环境中数据库连接需要妥善管理。服务重启时要让正在处理的请求完成、关闭连接池，再退出进程——这叫「优雅关闭」：`,
          code: `import { createPool } from "mysql2/promise";
import { PrismaClient } from "@prisma/client";
import mongoose from "mongoose";

const pool = createPool({ /* config */ });
const prisma = new PrismaClient();

const server = app.listen(3000);

// 优雅关闭
async function gracefulShutdown(signal) {
  console.log(\`收到 \${signal}，开始优雅关闭...\`);

  // 1. 停止接收新请求
  server.close();

  // 2. 等待现有请求处理完（给 30 秒）
  await new Promise(resolve => setTimeout(resolve, 30000));

  // 3. 关数据库连接
  await pool.end();
  await prisma.$disconnect();
  await mongoose.disconnect();

  console.log("数据库连接已关闭");
  process.exit(0);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));`,
          language: "javascript",
          tip: "K8s 发 SIGTERM 给 Pod 后会等 terminationGracePeriodSeconds（默认 30 秒），这段时间要完成优雅关闭。超时后 KILL 信号直接被强行干掉。",
        },
      ],
      quiz: [
        { question: "连接池的最大好处是什么？", options: ["简化代码", "复用数据库连接——避免频繁创建/销毁连接的开销", "自动建表", "数据加密"], answer: 1, explanation: "连接池预先创建并复用连接，避免了每次请求都花时间握手——对高并发服务的性能提升显著。" },
        { question: "N+1 查询问题是什么？", options: ["查询了 N+1 个表", "循环里查数据库——查一次父记录后又循环查 N 次子记录，总共 N+1 次", "用了 1 个索引", "查询时间 N+1 秒"], answer: 1, explanation: "N+1 就是 1 个主查询 + N 个（每条主结果的）子查询。用 JOIN 或 ORM 的 eager loading 一次解决。" },
        { question: "为什么事务里要在 finally 里 release 连接？", options: ["习惯", "不管事务成功还是失败都要归还连接——否则连接泄漏导致池耗尽", "性能更好", "MongoDB 的要求"], answer: 1, explanation: "从连接池借的连接必须还——事务抛异常了，catch 里 rollback 但 finally 里一定要 release。漏还几次池就空了。" },
        { question: "Mongoose 的 Schema 主要干什么？", options: ["加速查询", "定义文档结构和验证规则——给 MongoDB 加上类型约束", "连接数据库", "生成查询"], answer: 1, explanation: "Schema 是 Mongoose 的核心——定义了文档有哪些字段、什么类型、哪些必填、默认值是什么。给无 schema 的 MongoDB 加了约束。" },
        { question: "SIGTERM 信号处理里为什么要先 server.close() 再关数据库？", options: ["随便顺序", "先停止接收新请求，让现有请求处理完，最后才断数据库——避免请求处理到一半连不上数据库", "数据库优先", "K8s 要求的"], answer: 1, explanation: "优雅关闭的顺序：停止接受新连接→等待进行中的请求完成→关数据库→退出进程。数据库必须是最后一个关的。" },
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
};

export function getTutorialContent(categoryId: string, slug: string): TutorialContent | undefined {
  return tutorialContents[categoryId]?.[slug];
}

export default tutorialContents;
