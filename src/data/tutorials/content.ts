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
    "mongodb-intro": {
      slug: "mongodb-intro",
      sections: [
        {
          title: "MongoDB 是什么——文档数据库",
          content: `MongoDB 是个 NoSQL 数据库，跟传统的 MySQL、PostgreSQL 完全不是一个路数。传统关系型数据库用「表」存数据，数据像 Excel 表格一样一行一行排列，每个字段都得提前定义好。MongoDB 用「文档」存数据——说白了就是存 JSON 对象。

啥意思呢？比如你要存一个用户信息：

关系型数据库得先建表，定义好 id 是整数、name 是字符串、email 是字符串……然后往里面插数据。MongoDB 直接扔一个 JSON 进去就行，不用提前定义结构。

这就是 NoSQL 的理念：No = Not Only，不只有 SQL。数据结构灵活，字段可以随时加，不用担心 ALTER TABLE 那种麻烦事。`,
        },
        {
          title: "文档、集合、数据库——三层结构",
          content: `MongoDB 的结构分三层，对应关系型数据库很容易理解：

- 数据库（Database）：跟 MySQL 里的 database 一回事
- 集合（Collection）：相当于 MySQL 里的「表」
- 文档（Document）：相当于 MySQL 里的「行」，但它是 JSON 格式

一个集合里可以放结构完全不同的文档，比如这个文档有 name 和 age，另一个文档有 name 和 address，完全没问题。这在关系型数据库里是不可能的。

文档用 BSON 格式存储（Binary JSON），支持 JSON 没有的数据类型，比如日期、ObjectId、二进制等。`,
          code: `// 一个用户文档长这样
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "张三",
  age: 25,
  email: "zhangsan@example.com",
  tags: ["编程", "游戏", "跑步"],
  address: {
    city: "北京",
    street: "朝阳区"
  },
  createdAt: ISODate("2026-06-28T10:00:00Z")
}`,
          language: "javascript",
          tip: "ObjectId 是 MongoDB 默认的主键，12 字节，包含时间戳、机器标识、进程 ID 和随机数，全球唯一。",
        },
        {
          title: "安装与连接",
          content: `本地开发装个 MongoDB 社区版就行。Mac 用 brew，Ubuntu 用 apt，Windows 直接下载安装包。

装好后，mongosh 是 MongoDB 的命令行客户端（新版本替代了老旧的 mongo shell）。Compass 是官方图形界面，能可视化查看数据和执行查询，新手友好。`,
          code: `# Mac 安装
brew install mongodb-community
brew services start mongodb-community

# Ubuntu 安装
sudo apt-get install mongodb-community

# 连接数据库
mongosh                    # 连接本地默认端口 27017
mongosh "mongodb://localhost:27017/mydb"  # 连接指定数据库`,
          language: "bash",
        },
        {
          title: "MongoDB vs 关系型——啥时候用啥",
          content: `不是所有场景都适合 MongoDB。理解它们各自的优势才能选对工具：

MongoDB 更适合的场景：
- 数据结构经常变化，字段不固定
- 数据之间有嵌套关系（一个订单里面嵌着商品列表）
- 需要水平扩展——数据量大到一台机器撑不住，MongoDB 的分片集群很成熟
- 快速迭代开发，不想花时间设计表结构

关系型数据库（MySQL/PostgreSQL）更适合：
- 数据之间有复杂的多表关联（JOIN）
- 需要严格的事务保证（银行转账这类）
- 数据结构稳定，不会频繁变化
- 需要复杂的聚合查询和报表`,
        },
      ],
      quiz: [
        { question: "MongoDB 里「集合」对应关系型数据库的什么？", options: ["行", "表", "数据库", "字段"], answer: 1, explanation: "集合（Collection）= 表（Table），里面装着一堆文档（Document）。" },
        { question: "MongoDB 的文档用什么格式存储？", options: ["XML", "JSON（实际是 BSON）", "CSV", "YAML"], answer: 1, explanation: "文档用 BSON（Binary JSON）存，支持更多数据类型。写查询时跟操作 JSON 一样。" },
        { question: "MongoDB 默认监听哪个端口？", options: ["3306", "5432", "27017", "6379"], answer: 2, explanation: "27017 是 MongoDB 默认端口——3306 是 MySQL，5432 是 PostgreSQL，6379 是 Redis。" },
        { question: "ObjectId 由哪些部分组成？", options: ["随机字符串", "时间戳 + 机器标识 + 进程 ID + 随机数", "自增数字", "UUID"], answer: 1, explanation: "12 字节的 ObjectId 包含这些信息，保证了分布式环境下 ID 的唯一性。" },
        { question: "什么场景更适合用 MongoDB 而非 MySQL？", options: ["银行转账", "数据结构常变、快速迭代、需要水平扩展", "纯表格数据", "固定结构的数据"], answer: 1, explanation: "MongoDB 的灵活 schema 和分片能力在快速变化和超大数据量场景下比关系型数据库有优势。" },
      ],
    },
    "mongodb-crud": {
      slug: "mongodb-crud",
      sections: [
        {
          title: "MongoDB 是啥——文档数据库",
          content: `MongoDB 跟 MySQL 完全不是一个路数。MySQL 是关系型数据库，数据存在「表」里，行列整整齐齐像 Excel 表格。MongoDB 是文档数据库，数据存在「集合」里，每条数据是个 JSON 对象——也就是文档。

说人话就是：MySQL 是填表格，每列类型固定、不能乱搞。MongoDB 是扔 JSON——字段随便加、结构随意变。现代 Web 应用最爱这种灵活性。

核心概念对照：
MySQL 的数据库 → MongoDB 还是数据库
MySQL 的表 → MongoDB 的集合（collection）
MySQL 的行 → MongoDB 的文档（document，一个 JSON 对象）
MySQL 的列 → MongoDB 的字段（field）`,
        },
        {
          title: "插入数据——insertOne / insertMany",
          content: `增删改查里先学「增」。MongoDB 插入就是往集合里丢 JSON 对象，简单粗暴：`,
          code: `// 进到某个数据库（没有就自动创建）
use my_shop

// 插入一条
db.products.insertOne({
  name: "机械键盘",
  price: 399,
  stock: 100,
  tags: ["外设", "办公"],
  created_at: new Date()
})

// 插入多条——用数组包起来
db.products.insertMany([
  { name: "鼠标", price: 99, stock: 200 },
  { name: "显示器", price: 1599, stock: 50 },
  { name: "耳机", price: 299, stock: 80 }
])

// 插入后 MongoDB 自动给每个文档加 _id，相当于主键
// _id 你不指定的话它自己生成一个 12 字节的 ObjectId`,
          language: "javascript",
          tip: "insertMany 比循环调 insertOne 快得多——批量操作是单次网络请求，减少开销。",
        },
        {
          title: "查询数据——find",
          content: `find 是 MongoDB 里用得最多的命令。第一个参数是「条件」——告诉 MongoDB 你要找啥样的文档：`,
          code: `// 查全部
db.products.find()

// 查价格等于 399 的
db.products.find({ price: 399 })

// 查价格大于 200 的——用 $gt（greater than）
db.products.find({ price: { $gt: 200 } })

// 查库存小于 100 的——$lt（less than）
db.products.find({ stock: { $lt: 100 } })

// 多条件 AND——价格大于 100 且库存大于 50
db.products.find({ price: { $gt: 100 }, stock: { $gt: 50 } })

// 查名字包含「键盘」的——正则
db.products.find({ name: /键盘/ })

// 只查一条——findOne
db.products.findOne({ name: "机械键盘" })`,
          language: "javascript",
        },
        {
          title: "更新与删除——updateOne / deleteOne",
          content: `改数据和删数据，每天必用。注意 MongoDB 的更新默认只改第一条，想改多条要加 multi 选项：`,
          code: `// 更新一条——$set 是把指定字段设成新值
db.products.updateOne(
  { name: "机械键盘" },       // 找到这条
  { $set: { price: 459 } }    // 把价格改成 459
)

// 更新多条——updateMany
db.products.updateMany(
  { stock: { $lt: 50 } },     // 找库存不足 50 的
  { $set: { status: "缺货" } }  // 全标成缺货
)

// 自增——$inc，库存加 10
db.products.updateOne(
  { name: "鼠标" },
  { $inc: { stock: 10 } }
)

// 删除一条
db.products.deleteOne({ name: "耳机" })

// 删除多条——小心，条件为空则全删！
db.products.deleteMany({ stock: { $lt: 10 } })

// 删集合里所有文档
db.products.deleteMany({})`,
          language: "javascript",
          warning: "deleteMany({}) 会把整个集合清空，条件为空等于匹配所有。操作前务必确认。",
        },
        {
          title: "数据校验——Schema 验证",
          content: `MongoDB 虽然灵活，但太自由也容易出乱子。你可以给集合加验证规则——相当于给无门槛的场子拉根警戒线：`,
          code: `// 创建集合时加验证规则
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "age"],     // 这三个字段必须有
      properties: {
        name: { bsonType: "string" },          // name 必须是字符串
        email: { bsonType: "string" },
        age: { bsonType: "int", minimum: 0, maximum: 150 }
      }
    }
  }
})

// 给已有集合加验证
db.runCommand({
  collMod: "products",
  validator: { $jsonSchema: { ... } }
})`,
          language: "javascript",
          tip: "生产环境强烈建议给集合加验证规则。灵活不等于随便——不合规的数据一开始就别让它进去。",
        },
      ],
      quiz: [
        { question: "MongoDB 里 MySQL「行」对应的概念是？", options: ["集合", "文档", "字段", "数据库"], answer: 1, explanation: "MongoDB 的行叫文档，其实就是个 JSON 对象。" },
        { question: "插入多条数据用哪个命令？", options: ["insertOne", "insertMany", "addMany", "putMany"], answer: 1, explanation: "insertMany 接受数组，一次插入多条，比逐条快得多。" },
        { question: "find({ price: { $gt: 100 } }) 查的是什么？", options: ["价格等于 100 的", "价格大于 100 的", "价格小于 100 的", "所有数据"], answer: 1, explanation: "$gt 就是 greater than，返回价格大于 100 的文档。" },
        { question: "让库存加 10 用哪个操作符？", options: ["$set", "$inc", "$add", "$update"], answer: 1, explanation: "$inc 用于自增或自减，传正数加、负数减。" },
        { question: "deleteMany({}) 会怎样？", options: ["删第一条", "删匹配的", "删除整个集合的所有文档", "报错"], answer: 2, explanation: "空对象 {} 匹配所有文档，deleteMany({}) 等于清空集合。慎用。" },
      ],
    },
    "mongodb-queries": {
      slug: "mongodb-queries",
      sections: [
        {
          title: "比较操作符——条件的十八般兵器",
          content: `查数据不可能只查等于。MongoDB 提供了一堆比较操作符，记好这几个够用一辈子：`,
          code: `// $gt 大于, $gte 大于等于, $lt 小于, $lte 小于等于, $ne 不等于
db.products.find({ price: { $gte: 100, $lte: 500 } })  // 100 到 500 之间

db.products.find({ stock: { $ne: 0 } })                // 库存不为 0 的

// $in 在某个列表里, $nin 不在
db.products.find({ category: { $in: ["外设", "数码"] } })

// $exists 这个字段存在不？
db.products.find({ description: { $exists: true } })`,
          language: "javascript",
        },
        {
          title: "逻辑操作符——OR / NOR / NOT",
          content: `有时候条件不是「并且」而是「或者」。$or、$nor、$and、$not 就是干这个的：`,
          code: `// $or——价格低于 50 或者高于 1000 的
db.products.find({
  $or: [
    { price: { $lt: 50 } },
    { price: { $gt: 1000 } }
  ]
})

// $nor——既不是 A 也不是 B（跟 $or 相反）
db.products.find({
  $nor: [
    { category: "外设" },
    { category: "数码" }
  ]
})

// $not——单个条件的取反
db.products.find({ price: { $not: { $gt: 100 } } })  // 价格不大于 100

// $and 一般不需要显式写，多个条件默认就是 AND
// 但同一个字段多次判断时不能省略
db.products.find({
  $and: [
    { price: { $gt: 100 } },
    { price: { $lt: 500 } }
  ]
})`,
          language: "javascript",
        },
        {
          title: "投影与排序——控制输出",
          content: `有时候一条文档字段太多，你只关心其中几列。投影帮你筛选字段，排序控制输出顺序：`,
          code: `// 只返回 name 和 price，_id 默认会带出来，不想要 _id 设 0
db.products.find({}, { name: 1, price: 1, _id: 0 })

// 排除某几个字段
db.products.find({}, { description: 0, supplier: 0 })

// 排序——1 升序，-1 降序
db.products.find().sort({ price: 1 })        // 按价格从低到高
db.products.find().sort({ price: -1 })        // 从高到低
db.products.find().sort({ price: -1, name: 1 }) // 先按价格降序，价格相同按名字升序

// 分页——skip 跳过, limit 限制条数
db.products.find().skip(0).limit(10)   // 第 1 页，每页 10 条
db.products.find().skip(10).limit(10)  // 第 2 页
db.products.find().skip(20).limit(10)  // 第 3 页`,
          language: "javascript",
          tip: "1 和 0 不能混着用（除了 _id）。要么都设 1（白名单），要么都设 0（黑名单），否则会报错。",
        },
        {
          title: "数组查询——匹配数组元素",
          content: `MongoDB 文档里可以存数组，查数组元素有专门的玩法：`,
          code: `// tags 数组里包含「外设」的
db.products.find({ tags: "外设" })

// tags 数组里同时包含「外设」和「办公」的——$all
db.products.find({ tags: { $all: ["外设", "办公"] } })

// 数组长度等于 2 的——$size
db.products.find({ tags: { $size: 2 } })

// 数组里某个元素满足某条件——$elemMatch
db.orders.find({
  items: { $elemMatch: { product: "键盘", qty: { $gt: 1 } } }
})`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "价格在 50 到 200 之间，查询条件怎么写？", options: ["{ price: { $gt: 50, $lt: 200 } }", "{ price: { $gte: 50, $lte: 200 } }", "{ price: { $between: [50, 200] } }", "{ price: [50, 200] }"], answer: 1, explanation: "$gte 大于等于，$lte 小于等于，组合起来就是区间查询。" },
        { question: "$or 和 $in 的区别？", options: ["没区别", "$or 是不同字段或不同条件，$in 是同一字段的值在列表中", "$or 只能两个条件", "$in 只能数字"], answer: 1, explanation: "$in 是同一字段的简写，$or 可以用在不同字段上。" },
        { question: "查第 3 页数据（每页 10 条），skip 和 limit 怎么设？", options: ["skip(30).limit(10)", "skip(20).limit(10)", "skip(10).limit(20)", "skip(3).limit(10)"], answer: 1, explanation: "第 3 页：skip 前两页的总数即 20，limit 保持每页 10 条。" },
        { question: "查 tags 数组同时包含 'A' 和 'B' 的文档，用哪个操作符？", options: ["$in", "$all", "$or", "$elemMatch"], answer: 1, explanation: "$all 要求数组包含所有指定的值，顺序无所谓。" },
      ],
    },
    "mongodb-aggregation": {
      slug: "mongodb-aggregation",
      sections: [
        {
          title: "聚合管道是啥——数据加工流水线",
          content: `聚合管道（Aggregation Pipeline）是 MongoDB 里最强大的分析工具。你可以把它想象成工厂流水线——数据从一头进去，经过多个步骤（管道阶段），每个阶段对数据做一种加工，最后从另一头出来你想要的结果。

MySQL 里 GROUP BY、HAVING、JOIN、子查询这些事，MongoDB 用一条聚合管道全能搞定。管道是一串阶段组成，每个阶段的处理结果自动传给下一个阶段。`,
        },
        {
          title: "$match 与 $group——过滤与分组",
          content: `$match 相当于 find 的条件过滤，$group 相当于 SQL 的 GROUP BY。聚合管道的铁律：$match 越靠前越好——先把数据筛掉，后面处理量就小了：`,
          code: `// 统计每个分类的商品数量
db.products.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
])

// 统计每个分类的平均价格
db.products.aggregate([
  { $group: { _id: "$category", avg_price: { $avg: "$price" } } }
])

// 先过滤再分组——统计在售商品的总库存
db.products.aggregate([
  { $match: { status: "在售" } },           // 先筛掉下架的
  { $group: { _id: "$category", total: { $sum: "$stock" } } }
])

// 聚合操作符一览：
// $sum   求和
// $avg   求平均
// $min   最小值
// $max   最大值
// $first 第一条
// $last  最后一条
// $push  拼成数组`,
          language: "javascript",
          tip: "引用字段时前面加 $——如 $price。这是告诉 MongoDB 取 price 字段的值而不是字符串 'price'。",
        },
        {
          title: "$sort 与 $limit——排序与截断",
          content: `聚合里也可以排序和分页，跟 find 的语法类似：`,
          code: `// 查平均价格最高的前 3 个分类
db.products.aggregate([
  { $group: { _id: "$category", avg_price: { $avg: "$price" } } },
  { $sort: { avg_price: -1 } },     // 按平均价格降序
  { $limit: 3 }                      // 只要前 3
])

// 每个分类最贵的商品
db.products.aggregate([
  { $sort: { price: -1 } },
  { $group: { _id: "$category", most_expensive: { $first: "$name" }, price: { $first: "$price" } } }
])`,
          language: "javascript",
        },
        {
          title: "$project 与 $lookup——字段塑造与关联查询",
          content: `$project 决定最终输出哪些字段——跟 SQL 的 SELECT 一样。$lookup 是 MongoDB 的 JOIN，让不同集合的数据能关联到一起：`,
          code: `// $project——改名、取舍、加减乘除
db.products.aggregate([
  { $project: {
      _id: 0,
      product_name: "$name",       // 把 name 字段改叫 product_name
      price_with_tax: { $multiply: ["$price", 1.13] },  // 税前价
      worth: { $multiply: ["$price", "$stock"] }         // 库存总价值
  }}
])

// $lookup——关联 orders 集合，看哪些用户买了哪些商品
db.orders.aggregate([
  { $lookup: {
      from: "users",                // 关联哪个集合
      localField: "user_id",        // 本集合的字段
      foreignField: "_id",          // 对方集合的字段
      as: "user_info"               // 结果存到这个字段里
  }},
  { $unwind: "$user_info" }        // 把数组炸开，变成每个订单带一个用户对象
])`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "聚合管道中，$match 放靠前的好处是？", options: ["语法好看", "先筛数据减少后续处理量，更快", "必须放第一个", "没区别"], answer: 1, explanation: "$match 越早筛掉的数据越多，后面 $group、$sort 处理的数据量就越小，性能更好。" },
        { question: "$group 里 _id 字段的作用是？", options: ["文档 ID", "分组依据——按哪个字段分组", "没用的字段", "自动生成的 ID"], answer: 1, explanation: "_id 在 $group 中指分组的键——按谁分组就把谁赋给 _id。_id: null 则是所有文档归一组。" },
        { question: "$lookup 相当于是什么操作？", options: ["排序", "过滤", "关联查询——SQL 的 JOIN", "去重"], answer: 2, explanation: "$lookup 实现跨集合关联，等价于 SQL 的 LEFT OUTER JOIN。" },
        { question: "聚合中想取每个分组的最大值用哪个操作符？", options: ["$sum", "$avg", "$first", "$max"], answer: 3, explanation: "$max 返回分组内某字段的最大值。" },
        { question: "$unwind 干什么用的？", options: ["排序", "把数组字段拆成多条文档", "去重", "过滤"], answer: 1, explanation: "$unwind 把包含数组的字段拆开——数组有 3 个元素就拆成 3 条文档。" },
      ],
    },
    "mongodb-indexes": {
      slug: "mongodb-indexes",
      sections: [
        {
          title: "索引——给查询加个导航",
          content: `数据量一大，全表扫描就扛不住了。索引就像书的目录——你要找某个章节，不用一页页翻，先查目录直接跳过去。

MongoDB 默认在 _id 上建了唯一索引，但你自己查询常走哪些字段，就在那些字段上建索引。一个索引能让查询从扫百万条变成扫几十条。`,
        },
        {
          title: "创建和管理索引",
          content: `createIndex 建索引。单字段索引最简单，复合索引能服务多个查询场景：`,
          code: `// 单字段索引——加速按 name 的查询
db.products.createIndex({ name: 1 })     // 1 升序，-1 降序（单字段时无所谓）

// 复合索引——加速按 category + price 的查询
db.products.createIndex({ category: 1, price: -1 })

// 唯一索引——不让重复值插入
db.users.createIndex({ email: 1 }, { unique: true })

// 文本索引——给字符串字段建立全文搜索
db.articles.createIndex({ title: "text", content: "text" })

// 查看集合上所有索引
db.products.getIndexes()

// 删索引
db.products.dropIndex("name_1")    // 按索引名删
db.products.dropIndexes()          // 删所有非 _id 索引`,
          language: "javascript",
          tip: "复合索引遵循「最左前缀」原则——索引 {a:1, b:1} 能服务 a 的单字段查询，但不能服务只有 b 的查询。字段顺序很重要。",
        },
        {
          title: "看查询有没有用索引——explain",
          content: `建了索引到底有没有用上？explain 告诉你查询的执行计划——是走索引还是全表扫描：`,
          code: `// explain 看执行计划
db.products.find({ name: "键盘" }).explain("executionStats")

// 关注这几个字段：
// winningPlan.stage: IXSCAN（走索引）还是 COLLSCAN（全表扫）
// totalDocsExamined: 扫了多少文档
// nReturned: 返回了多少文档
// 如果扫了 10 万条只返回 3 条——说明索引没建或没走对

// 看所有查询的性能
db.setProfilingLevel(2)          // 记录所有操作
db.system.profile.find().sort({ millis: -1 }).limit(5)  // 看最慢的 5 个`,
          language: "javascript",
          tip: "explain 是调试必备——document examined 远大于 returned 的话，八成是没走索引或索引选的不对。",
        },
        {
          title: "TTL 索引——自动过期删除",
          content: `有些数据不需要永久存——比如验证码、临时 token、缓存数据。TTL 索引让 MongoDB 自动帮你清理过期数据：`,
          code: `// 建 TTL 索引——30 秒后自动删除
db.sessions.createIndex(
  { created_at: 1 },
  { expireAfterSeconds: 30 }
)

// 插入时会自动算过期时间
db.sessions.insertOne({
  user: "john",
  created_at: new Date()
})
// 30 秒后这条数据自动消失

// 也可以指定具体过期时间字段
db.cache.createIndex(
  { expire_at: 1 },
  { expireAfterSeconds: 0 }   // 0 表示到了 expire_at 那一刻就删
)`,
          language: "javascript",
          tip: "TTL 索引的后台清理是每分钟跑一次，所以过期后最多延迟 60 秒才会被真正删除，不是精确到秒。",
        },
      ],
      quiz: [
        { question: "索引的主要目的是什么？", options: ["让数据更整齐", "加速查询，避免全表扫描", "压缩数据", "备份数据"], answer: 1, explanation: "索引是给查询加速的——从扫百万条变成定位几条，效果立竿见影。" },
        { question: "复合索引 {a:1, b:1} 能服务只查 b 的查询吗？", options: ["能，完美匹配", "不能，最左前缀原则要求查询从索引最左侧字段开始", "看情况", "一定能"], answer: 1, explanation: "最左前缀原则——索引像字典，a 是首字母，b 是第二个字母，你只给第二个字母没法查。" },
        { question: "explain 里 COLLSCAN 是什么意思？", options: ["走索引", "全表扫描——没走索引", "部分扫描", "索引扫描"], answer: 1, explanation: "COLLSCAN 就是 collection scan——千万要注意，数据量大时这就是慢的原因。" },
        { question: "TTL 索引的用途是？", options: ["加速查询", "自动删除过期数据", "加密数据", "备份数据"], answer: 1, explanation: "TTL 索引让 MongoDB 自动清理到了时间的文档，验证码、临时 token 这些场景必备。" },
      ],
    },
    "mongodb-replication": {
      slug: "mongodb-replication",
      sections: [
        {
          title: "副本集——备胎机制",
          content: `单台 MongoDB 跑生产？万一挂了数据就没了。副本集就是用多台服务器组一个团队：一台是「主」，负责读写；其他是「从」，时刻跟主同步数据被当备胎。

比喻：主是唱主角的歌手，从是后备——主唱倒了，从自动顶上继续唱。用户几乎感觉不到切换。

副本集最少需要 3 台（或者 2 台 + 1 个仲裁者），因为选举需要多数票。`,
        },
        {
          title: "副本集的启动",
          content: `每台 MongoDB 都带上 --replSet 参数启动，然后在任意一台执行初始化：`,
          code: `# 三台服务器分别启动
mongod --replSet rs0 --port 27017 --dbpath /data/db1 &
mongod --replSet rs0 --port 27018 --dbpath /data/db2 &
mongod --replSet rs0 --port 27019 --dbpath /data/db3 &

# 连上任意一台，初始化副本集
mongo --port 27017
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" },
    { _id: 1, host: "localhost:27018" },
    { _id: 2, host: "localhost:27019" }
  ]
})`,
          language: "bash",
        },
        {
          title: "监控与故障转移",
          content: `副本集跑起来后，rs 命令是你的监控面板。主挂了从自动顶上，全程自动：`,
          code: `// 看当前角色
rs.status()        // 详细状态——谁是主、谁是从、同步延迟
rs.isMaster()      // 只看当前这台是主还是从

// 看复制延迟——从比主慢了多少
rs.printReplicationInfo()       // oplog 信息
rs.printSlaveReplicationInfo()  // 每台从的同步情况

// 手动切换主（维护时用）
rs.stepDown()     // 当前主自愿让位，触发重新选举`,
          language: "javascript",
          tip: "副本集不是备份方案。如果有人误删了数据，主从会同步删除。真正的备份还是要定期 mongodump 导出。",
        },
      ],
      quiz: [
        { question: "副本集中从节点的作用是什么？", options: ["分担写压力", "作为数据备份——主挂了能顶上去", "计算聚合", "管理索引"], answer: 1, explanation: "从节点是主节点的实时备份，主一旦宕机，从节点参与选举成为新主，保证服务不中断。" },
        { question: "副本集最少需要几台节点？", options: ["1 台", "2 台", "3 台（或 2 台+仲裁）", "4 台"], answer: 2, explanation: "选举需要多数票，最少 2 票过关。2 台若挂一台只剩 1 票不过半，所以通常用 3 台或 2 台+1 个仲裁者。" },
        { question: "仲裁节点（Arbiter）的角色是什么？", options: ["存数据", "只参与投票不存数据", "备份数据", "处理查询"], answer: 1, explanation: "仲裁者不存数据、不干活，唯一作用就是选举时投一票。当预算有限又需要奇数节点时用它。" },
        { question: "rs.stepDown() 做什么？", options: ["删节点", "当前主节点主动让位", "加新节点", "停副本集"], answer: 1, explanation: "让主节点主动让位触发选举——维护时先把主切走再操作，优雅。" },
      ],
    },
    "mongodb-sharding": {
      slug: "mongodb-sharding",
      sections: [
        {
          title: "分片——数据太大一台装不下",
          content: `数据量大到一台服务器放不下怎么办？分片就是把数据切碎分散到多台机器上，每台管一部分。

比喻：图书馆书太多了一个书架放不下，就按类别分成几个书架——文学类一个、科技类一个。MongoDB 的分片也是这个思路，按某个字段（分片键）把数据散到各个分片上。

副本集解决高可用（挂了能顶），分片解决大数据量（一台放不下、一台扛不住）。生产环境通常是分片 + 副本集一起用。`,
        },
        {
          title: "分片架构与分片键",
          content: `分片集群由三部分组成：分片（每个存一部分数据）、配置服务器（存元数据，相当于地图）、路由（mongos，客户端连它，它知道去哪找数据）。

分片键是最重要的决策——选好了数据均匀，选坏了某个分片撑爆：`,
          code: `// 选分片键原则：
// 1. 基数高——值的种类多（如 user_id，不要 gender 只有男/女两种）
// 2. 分布均匀——别让大部分数据都落在一个分片上
// 3. 查询能带上——查数据时条件能包含分片键，否则得所有分片全扫一遍

// 启用分片
sh.enableSharding("my_database")

// 创建分片集合——按 user_id 哈希分片（最常用）
sh.shardCollection("my_database.users", { user_id: "hashed" })

// 范围分片——按创建时间
sh.shardCollection("my_database.logs", { created_at: 1 })

// 哈希分片 vs 范围分片：
// 哈希——数据均匀散开，写入压力均衡，但范围查询效率低
// 范围——相近的数据在同一个分片上，范围查询快，但写入可能倾斜`,
          language: "javascript",
          tip: "分片键一旦选定就很难改——相当于把图书馆重新按另一套规则分类，工作量极大。建之前想清楚。",
        },
        {
          title: "Chunk 分裂与迁移",
          content: `数据在分片间是以 chunk（数据块）为单位的。默认一个 chunk 64MB，超了自动分裂，分片间数据不均会自动迁移：`,
          code: `// 查看分片状态
sh.status()

// 手动分裂 chunk
sh.splitAt("my_database.users", { user_id: MinKey })

// 迁移 chunk 到指定分片
sh.moveChunk("my_database.users", { user_id: 100 }, "shard02")

// 查看数据分布
use my_database
db.users.getShardDistribution()   // 每个分片各有多少数据
db.users.stats()                   // 集合的详细统计`,
          language: "javascript",
        },
      ],
      quiz: [
        { question: "分片解决的是什么问题？", options: ["数据安全", "数据量太大单台放不下/扛不住", "查询加速", "数据备份"], answer: 1, explanation: "分片是横向扩展——把数据分散到多台机器，每台只负责一部分。" },
        { question: "选分片键最重要的原则是？", options: ["字段名短", "基数高、分布均匀、查询能覆盖", "必须是 _id", "必须是数字"], answer: 1, explanation: "基数高确保均匀分布，查询能覆盖避免广播到所有分片。" },
        { question: "mongos 的作用是什么？", options: ["存储数据", "路由——客户端连它，它根据分片键转发请求", "备份数据", "监控"], answer: 1, explanation: "mongos 是分片集群的入口，客户端连 mongos 而不是直接连分片，mongos 负责把请求路由到正确的分片上。" },
        { question: "哈希分片相比范围分片，优势是？", options: ["范围查询更快", "数据分布更均匀，写入不倾斜", "总能用索引", "不需要分片键"], answer: 1, explanation: "哈希分片把数据打散分布到各分片，写入压力均匀。但牺牲了范围查询的效率。" },
      ],
    },
    "subqueries": {
      slug: "subqueries",
      sections: [
        {
          title: "子查询是个啥",
          content: `子查询说白了就是套娃——一个 SELECT 语句里再塞一个 SELECT。外层查询把内层查询的结果当条件用。为什么不用 JOIN 呢？有些场景子查询写起来更直觉，读代码的人一眼就懂「先找出这些人，再查他们的订单」。

子查询分两大类：非关联子查询（内层不依赖外层，跑一次就行）和关联子查询（内层用了外层的列，外层每行内层都得跑一遍）。`,
        },
        {
          title: "IN 和 EXISTS 子查询",
          content: `IN 就是「在不在这个名单里」，EXISTS 就是「存不存在」。多数时候能互换，但 EXISTS 遇到大表有优势——找到第一条匹配就收手，不用生成完整列表：`,
          code: `-- IN 子查询：找有订单的用户
SELECT username FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- NOT IN：找没下过单的用户
SELECT username FROM users
WHERE id NOT IN (SELECT user_id FROM orders);

-- EXISTS：效率比 IN 高的场景
SELECT username FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- NOT EXISTS：找没下过单的用户
SELECT username FROM users u
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);`,
          language: "sql",
          tip: "如果子查询结果里可能包含 NULL，尽量用 EXISTS 代替 IN。NOT IN 遇到 NULL 会全盘返回空——这是很多人踩过的坑。",
        },
        {
          title: "关联子查询",
          content: `关联子查询的特点是内层引用了外层的列——等于外层每走一行，内层就拿这行的值去跑一遍。听起来慢，但配合 EXISTS 有时比 JOIN 还快。

ANY 和 ALL 又是啥呢？ANY 就是「比集合里任意一个大/小就行」，ALL 是「比集合里所有都大/小」：`,
          code: `-- 查工资高于本部门平均工资的员工（关联子查询）
SELECT name, salary, dept_id
FROM employees e
WHERE salary > (
  SELECT AVG(salary) FROM employees
  WHERE dept_id = e.dept_id
);

-- ANY：工资比 A 部门任意一个人高就行
SELECT name FROM employees
WHERE salary > ANY (SELECT salary FROM employees WHERE dept_id = 'A');

-- ALL：工资比 A 部门所有人都高
SELECT name FROM employees
WHERE salary > ALL (SELECT salary FROM employees WHERE dept_id = 'A');

-- 关联子查询做 UPDATE
UPDATE orders o SET status = 'vip'
WHERE amount > (SELECT AVG(amount) FROM orders WHERE user_id = o.user_id);`,
          language: "sql",
          warning: "子查询别套太深，三层的 SQL 已经很难读了。能拆成两步就用 WITH（CTE）拆，代码可维护性比炫技重要。",
        },
        {
          title: "WITH 子句（CTE）",
          content: `CTE 就是起个临时名字给子查询用——代码可读性直接起飞。还能把一个 CTE 套另一个，叫递归 CTE，树形结构的好帮手：`,
          code: `-- 普通 CTE：看起来像先定义了一个临时表
WITH high_value_users AS (
  SELECT id, username FROM users WHERE level = 'vip'
)
SELECT h.username, o.amount
FROM high_value_users h
JOIN orders o ON h.id = o.user_id
WHERE o.amount > 1000;

-- 递归 CTE：查组织结构树（从大老板往下找所有下属）
WITH RECURSIVE org_tree AS (
  SELECT id, name, manager_id, 1 AS depth
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, t.depth + 1
  FROM employees e
  JOIN org_tree t ON e.manager_id = t.id
)
SELECT * FROM org_tree ORDER BY depth, manager_id;`,
          language: "sql",
          tip: "递归 CTE 跑循环时要注意深度——MySQL 默认递归最多 1000 层，处理特别深的树结构得留意。",
        },
      ],
      quiz: [
        { question: "关联子查询和外层查询是什么关系？", options: ["没关联", "内层用外层的列，外层每行内层都执行一次", "外层用内层的列", "执行顺序相反"], answer: 1, explanation: "关联子查询的内层引用了外层的列，外层每走到一行，内层都会用这行的值重新执行。" },
        { question: "NOT IN 碰上空值会出现什么问题？", options: ["报错", "返回空结果", "忽略空值", "把空值当正常值"], answer: 1, explanation: "NOT IN 子查询结果里如果有 NULL，整个 NOT IN 就返回空，因为任何值跟 NULL 比较都是 unknown。" },
        { question: "EXISTS 和 IN 哪个更快？", options: ["IN 总是更快", "EXISTS 总是更快", "看情况：子查询大结果集时 EXISTS 更优", "完全一样"], answer: 2, explanation: "EXISTS 找到第一条就停，IN 需要先生成整个子查询结果。子查询返回行多时 EXISTS 有优势。" },
        { question: "WITH 子句（CTE）主要解决什么问题？", options: ["加速查询", "让复杂 SQL 拆成小块，可读性更好", "替代索引", "替代 JOIN"], answer: 1, explanation: "CTE 给子查询起个名字，把大 SQL 拆成几步，代码看起来清晰，也方便多次引用同一个子查询。" },
        { question: "ANY 和 ALL 的区别是什么？", options: ["没区别", "ANY 满足集合中随便一个就行，ALL 必须满足集合中所有", "ALL 只用于数字", "ANY 只用于字符串"], answer: 1, explanation: "> ANY(1,3,5) 大于 1 就行，> ALL(1,3,5) 必须大于 5。一个是部分门槛，一个是最高门槛。" },
      ],
    },
    "indexes": {
      slug: "indexes",
      sections: [
        {
          title: "索引是啥——数据库的目录页",
          content: `一本书没有目录，想找「索引」这个词得从头翻到尾。数据库也一样——没索引就叫全表扫描，几百万行数据一行行看，慢得要死。

索引本质是 B+Tree 这种数据结构，把一列或多列的值排好序存起来。查数据时先搜索引找到页码，再根据页码精确捞数据——不用扫全表。代价是占用额外磁盘空间，写操作变慢（因为索引也要同步更新）。`,
        },
        {
          title: "建索引和 EXPLAIN 分析",
          content: `EXPLAIN 是 SQL 优化的眼睛——它告诉你怎么查的：走的哪个索引、扫了多少行、有没有用到文件排序。看到 type=ALL（全表扫描）一般就得加索引了：`,
          code: `-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- 查看执行计划
EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';
-- 关注字段：type(访问类型), key(用了哪个索引), rows(预计扫描行数), Extra

EXPLAIN FORMAT=JSON SELECT * FROM users WHERE email = 'alice@example.com';
-- 更详细，能看到具体开销

-- 删除索引
DROP INDEX idx_users_email ON users;

-- 查看表上现有索引
SHOW INDEX FROM users;`,
          language: "sql",
          tip: "EXPLAIN 的 type 列是个宝：const > eq_ref > ref > range > index > ALL。出现 ALL 就是全表扫，基本必须优化。",
        },
        {
          title: "覆盖索引和回表",
          content: `覆盖索引就是查询需要的所有列都在索引里，不用额外回表拿数据——等于在索引上就把活干完了，性能顶天。

回表的意思是索引里找到主键，还得根据主键去聚簇索引里读完整数据。这就是为啥 SELECT * 比 SELECT 具体列慢——覆盖索引完全用不上。

还有最左前缀原则：联合索引 (a, b, c) 相当于免费附赠 (a) 和 (a,b) 的索引，但如果单独查 b 或 c 就用不上：`,
          code: `-- 覆盖索引示例
CREATE INDEX idx_users_cover ON users(name, age, city);

-- 这个查询走覆盖索引，不回表
SELECT name, age, city FROM users WHERE name = 'Alice';

-- 这个需要回表拿 email 和 phone
SELECT * FROM users WHERE name = 'Alice';

-- 最左前缀：联合索引 (name, age, city)
-- 能用索引：WHERE name = 'Alice'
-- 能用索引：WHERE name = 'Alice' AND age = 30
-- 能用索引：WHERE name = 'Alice' AND age = 30 AND city = 'Beijing'
-- 不能用：WHERE age = 30（跳过了 name）
-- 不能用：WHERE city = 'Beijing'（跳过了前两列）`,
          language: "sql",
          tip: "设计索引时把区分度高的列放前面，比如 (status, user_id) 不如 (user_id, status)，因为 user_id 区分度高，索引选择性更好。",
        },
        {
          title: "索引优化套路",
          content: `索引不是越多越好——每多一个索引，INSERT/UPDATE/DELETE 就多一份开销。记住几个原则就行：

1. WHERE、JOIN、ORDER BY 常用列——先加索引
2. 联合索引比多个单列索引更靠谱——MySQL 一次查询基本只能用一条索引
3. 不用在超低区分度的列上建索引（比如性别、布尔字段），优化器可能直接全表扫
4. 查询时别在索引列上套函数——WHERE DATE(created_at) = '2026-01-01' 用不上索引，写成 WHERE created_at >= '2026-01-01' AND created_at < '2026-01-02'
5. 前缀索引适合长字符串列——只索引前 20 个字符也能筛掉大部分不匹配的行`,
        },
      ],
      quiz: [
        { question: "EXPLAIN 里 type=ALL 代表什么？", options: ["用了索引", "全表扫描，得加索引优化", "覆盖索引", "唯一索引"], answer: 1, explanation: "ALL 就是一行行翻——最慢的方式，通常意味当前查询没用到合适的索引。" },
        { question: "最左前缀原则是什么意思？", options: ["只建最左边的索引", "联合索引按最左列开头才生效", "索引建在最左边", "索引只能按最左边查"], answer: 1, explanation: "联合索引 (a,b,c) 只有查询条件以 a 开头（a 或 a,b 或 a,b,c）才能发挥索引作用。" },
        { question: "覆盖索引解决了什么问题？", options: ["覆盖更多数据", "查询字段全在索引里，不用回表拿数据", "覆盖多个表", "覆盖所有索引列"], answer: 1, explanation: "需要查的列都在索引里，数据库直接在索引树上就拿到了结果，省掉根据主键再查聚簇索引的回表步骤。" },
        { question: "为什么 SELECT 具体列比 SELECT * 可能更快？", options: ["* 是全量数据", "具体列可能走覆盖索引，不用回表", "具体列更快编译", "* 需要转换类型"], answer: 1, explanation: "如果需要的列都在索引里，覆盖索引直接返回了。但 SELECT * 总有列不在索引里，必须回表。" },
        { question: "联合索引 (a,b,c) 里，WHERE a=? AND c=? 能用上索引吗？", options: ["能", "只能用到 a 列的索引，c 用不上", "完全用不了", "只用到 c 列"], answer: 1, explanation: "a 开头所以能用到索引，但中间跳了 b，c 就发挥不了 index 过滤作用——只能做条件过滤但不走索引查找。" },
      ],
    },
    "transactions": {
      slug: "transactions",
      sections: [
        {
          title: "事务是啥——打包操作",
          content: `事务就是把一组 SQL 操作打包成一个整体——要么全成功，要么全撤销。银行转账就是典型：扣 A 的钱和加 B 的钱必须同时成功，不能扣了 A 的钱 B 没收到。

事务有四个特性，简称 ACID：
- 原子性（Atomicity）：一荣俱荣一损俱损，不成功就回滚
- 一致性（Consistency）：数据从一种合法状态变到另一种合法状态
- 隔离性（Isolation）：并发事务互不干扰
- 持久性（Durability）：事务提交了的数据就丢不了`,
        },
        {
          title: "基本事务操作",
          content: `MySQL 里默认每条 SQL 自动提交。想手动控制事务得先关了自动提交或者包在 BEGIN/COMMIT 里。ROLLBACK 就是后悔药——提交之前反悔了全撤回去：`,
          code: `-- 关闭自动提交（MySQL 会话级）
SET autocommit = 0;

-- 事务基本操作
BEGIN;           -- 开始事务（也可用 START TRANSACTION）
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;          -- 提交：确认干活

-- 回滚：反悔了
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- 突然发现转错了！
ROLLBACK;        -- 回到 BEGIN 那一刻的状态

-- 设置回滚点（大事务里很实用）
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
SAVEPOINT after_debit;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- 发现后面这段有问题，只回滚到 savepoint
ROLLBACK TO SAVEPOINT after_debit;
COMMIT;`,
          language: "sql",
          tip: "大事务别一次性搞太多行——会锁表太久影响别人。拆成小批次提交，每 1000 行左右提交一次。",
        },
        {
          title: "隔离级别",
          content: `隔离级别控制并发事务之间的可见性——你能看到别人还没提交的数据吗？标准 SQL 定义了四种级别：

READ UNCOMMITTED——最松，能看到别人还没提交的内容（脏读），基本不用
READ COMMITTED——只能看别人提交了的数据，Oracle 和 PG 默认级别。问题是同一个事务里查两次可能结果不同（不可重复读）
REPEATABLE READ——事务开始后查多少次数据都一样，MySQL InnoDB 默认。但可能产生幻读（两次查询之间别人插了新行）
SERIALIZABLE——最严，事务一个个串行执行，彻底杜绝并发问题，但性能最差`,
          code: `-- 查看和设置隔离级别
SHOW VARIABLES LIKE 'transaction_isolation';

SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;`,
          language: "sql",
          warning: "别随便改隔离级别。MySQL InnoDB 的 REPEATABLE READ 已经够应付 95% 的场景了。",
        },
        {
          title: "锁——行锁和表锁",
          content: `多个事务同时改同一行数据怎么办？靠锁机制。InnoDB 默认用行锁——哪行被改就锁哪行，不锁别的行，并发性能好。

遇到死锁别慌——两个事务互相等对方的锁释放，数据库会检测到然后回滚其中一个。应用层拿到死锁异常重试就行了：`,
          code: `-- 排他锁（for update——除了我别人不能改）
BEGIN;
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;
-- 此时其他事务不能对这行加排他锁，但可以读快照
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;

-- 共享锁（lock in share mode——别人也能读但不能改）
BEGIN;
SELECT * FROM accounts WHERE id = 1 LOCK IN SHARE MODE;
COMMIT;

-- 查看当前锁争用
SHOW ENGINE INNODB STATUS;  -- 找 LATEST DETECTED DEADLOCK 段`,
          language: "sql",
          tip: "减少死锁的套路：按相同顺序更新多行（先锁 id=1 再 id=2，别倒过来）、事务尽量短、合适索引（没索引的行锁会升级成表锁）。",
        },
      ],
      quiz: [
        { question: "COMMIT 和 ROLLBACK 的区别？", options: ["一样", "COMMIT 确认保存，ROLLBACK 撤销回滚", "COMMIT 更快", "ROLLBACK 只回滚部分"], answer: 1, explanation: "COMMIT 把事务里的变更永久写进去，ROLLBACK 全撤销——后悔药。" },
        { question: "InnoDB 默认隔离级别是什么？", options: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"], answer: 2, explanation: "MySQL InnoDB 默认 REPEATABLE READ，保证了同一个事务里多次读的数据一致。" },
        { question: "什么是脏读？", options: ["读取损坏数据", "读到别的事务还没提交的数据", "读取过期数据", "读取重复数据"], answer: 1, explanation: "脏读就是事务 A 读到了事务 B 还没提交的修改——万一 B 回滚了，A 读到的就是垃圾数据。" },
        { question: "SELECT FOR UPDATE 干了什么？", options: ["加速查询", "读取时对查询行加排他锁", "更新数据", "删除数据"], answer: 1, explanation: "FOR UPDATE 在读取的同时就给这些行上排他锁，防止别人在你提交前修改——常用于扣库存这种场景。" },
        { question: "死锁是怎么产生的？", options: ["锁太多了", "两个事务互相等对方的锁释放", "数据库崩溃", "连接太多"], answer: 1, explanation: "事务 A 锁了行 1 等行 2，事务 B 锁了行 2 等行 1——互相卡死，数据库检测到后回滚其中一个。应用层收到异常重试就好。" },
      ],
    },
    "window-functions": {
      slug: "window-functions",
      sections: [
        {
          title: "窗口函数是啥",
          content: `窗口函数跟聚合函数有点像，但聚合是把一堆行压成一行，窗口函数是每行都给一个计算结果——不压缩行数。就像给每行开一扇窗，透过窗能看到周围的数据。

OVER() 就是那扇窗——它定义了你从当前行能看到哪些行（分区+排序）。窗口函数能做排名、前后对比、累计求和这些聚合做不到的事。`,
        },
        {
          title: "排名函数",
          content: `排名有三个兄弟：
ROW_NUMBER()——不管分数一样不一样，从 1 开始一路编号到底
RANK()——分数一样就并列，比如两个第一，下一个是第三
DENSE_RANK()——也是并列，但下一个接着排（两个第一，下一个是第二）`,
          code: `-- 按工资排名
SELECT name, department, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn,
  RANK() OVER (ORDER BY salary DESC) AS rk,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dr
FROM employees;
-- 结果：两个最高工资并列 80000
-- ROW_NUMBER: 1, 2, 3...
-- RANK: 1, 1, 3...
-- DENSE_RANK: 1, 1, 2...

-- 按部门内排名
SELECT name, department, salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;
-- 每个部门内部各自排名`,
          language: "sql",
          tip: "大部分时候 RANK 和 DENSE_RANK 用哪个取决于业务需求——发奖金用 RANK（并排都第一，下一个第三是合理的），选前 N 个人用 ROW_NUMBER 严格限人数。",
        },
        {
          title: "LEAD 和 LAG——前后看看",
          content: `LAG 回头看上一行，LEAD 往前看下一行。经典场景是算环比——这个月跟下个月差多少，或者找连续登录天数：`,
          code: `-- 看每个员工和工资最高的同事差多少
SELECT name, department, salary,
  LEAD(name, 1) OVER (PARTITION BY department ORDER BY salary DESC) AS next_richer,
  LAG(name, 1) OVER (PARTITION BY department ORDER BY salary DESC) AS prev_poorer,
  salary - LEAD(salary, 1) OVER (PARTITION BY department ORDER BY salary DESC) AS salary_gap
FROM employees;

-- 找连续登录天数（经典面试题）
WITH user_dates AS (
  SELECT user_id, login_date,
    LAG(login_date) OVER (PARTITION BY user_id ORDER BY login_date) AS prev_date
  FROM user_logins
)
SELECT user_id, login_date,
  CASE WHEN DATEDIFF(login_date, prev_date) = 1 THEN '连续' ELSE '断了' END AS is_consecutive
FROM user_dates;`,
          language: "sql",
        },
        {
          title: "PARTITION BY 和窗口聚合",
          content: `PARTITION BY 就是把数据分成几个小团体（部门、地区等），窗口函数在各自团体内独立运算：`,
          code: `-- 累计金额（跑流水）
SELECT order_date, amount,
  SUM(amount) OVER (ORDER BY order_date) AS running_total,
  SUM(amount) OVER (ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS weekly_roll
FROM orders;

-- 移动平均（窗口帧的含义）
-- ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING 前后各两行
-- ROWS UNBOUNDED PRECEDING 从第一行到当前
-- ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING 当前到末尾

-- 每个部门工资占比
SELECT name, department, salary,
  salary * 100.0 / SUM(salary) OVER (PARTITION BY department) AS pct_of_dept
FROM employees;`,
          language: "sql",
        },
      ],
      quiz: [
        { question: "窗口函数和 GROUP BY 聚合有什么区别？", options: ["没区别", "窗口函数每行都有结果，聚合函数多行压成一行", "窗口函数更快", "聚合函数用于排序"], answer: 1, explanation: "聚合把一堆行打包输出一行，窗口函数保留每一行同时附上窗口计算的值——不改变行数。" },
        { question: "RANK() 和 ROW_NUMBER() 的区别？", options: ["一样", "RANK 允许并列跳过后续序号，ROW_NUMBER 严格递增", "ROW_NUMBER 更快", "RANK 只在 MySQL 能用"], answer: 1, explanation: "ROW_NUMBER 不给并列——1,2,3,4；RANK 遇到并列给相同序号并跳过相应位数——1,1,3,4。" },
        { question: "LAG(column, 2) 是什么意思？", options: ["往后看两行", "往前看两行", "汇总两行", "跳过两行"], answer: 0, explanation: "LAG 是回头看上一行（往前回溯），参数 2 表示回去两行而不是一行。" },
        { question: "PARTITION BY department 在窗口函数里做啥？", options: ["按部门排序", "按部门分组——各算各的窗口", "过滤部门", "去重部门"], answer: 1, explanation: "PARTITION BY 把数据分成几个区域（部门），每个区域内独立计算窗口函数——相当于每个部门都有一块自己的小窗口。" },
        { question: "OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) 描述了什么？", options: ["前后 6 行", "当前行往前 6 行加当前行——共 7 行窗口", "未来 6 行", "全部行"], answer: 1, explanation: "6 PRECEDING 往前数 6 行，CURRENT ROW 是当前行，合起来就是包含当前行在内的最近 7 行——典型滑窗，用来算 7 日移动平均。" },
      ],
    },
    "mysql-admin": {
      slug: "mysql-admin",
      sections: [
        {
          title: "用户和权限管理",
          content: `MySQL 的用户管理说白了就是「谁能从哪儿登录、能干什么」。用户 'alice'@'localhost' 和 'alice'@'%' 是两个完全不同的用户——localhost 是本地登录，% 是任意 IP。很多人踩过这个坑——远程连不上以为是密码错了：`,
          code: `-- 创建用户
CREATE USER 'alice'@'localhost' IDENTIFIED BY 'StrongPass123!';
CREATE USER 'alice'@'%' IDENTIFIED BY 'StrongPass123!';

-- 授权（给 alice 操作 mydb 数据库的全部权限）
GRANT ALL PRIVILEGES ON mydb.* TO 'alice'@'%';
-- 只读权限
GRANT SELECT ON mydb.* TO 'bob'@'%';
-- 刷新权限表
FLUSH PRIVILEGES;

-- 查看用户权限
SHOW GRANTS FOR 'alice'@'%';

-- 撤销权限
REVOKE DELETE ON mydb.* FROM 'alice'@'%';

-- 改密码
ALTER USER 'alice'@'%' IDENTIFIED BY 'NewStrongPass456!';

-- 删用户
DROP USER 'alice'@'%';`,
          language: "sql",
          warning: "生产环境别用 GRANT ALL ON *.* TO 'root'@'%'——等于把银行金库密码贴大门上。按最小权限原则来，用啥给啥。",
        },
        {
          title: "备份与恢复——mysqldump",
          content: `备份就像数据库的存档——出了事有回档可以读。mysqldump 是最常用的备份工具，原理是把数据库结构+数据导出成一堆 SQL 语句。缺点是大表巨慢，生产库建议用 xtrabackup 这类物理备份：`,
          code: `# 备份单库
mysqldump -u root -p mydb > mydb_20260101.sql

# 备份所有库
mysqldump -u root -p --all-databases > all_dbs.sql

# 只备份表结构不要数据
mysqldump -u root -p --no-data mydb > schema.sql

# 只备份数据不要结构
mysqldump -u root -p --no-create-info mydb > data.sql

# 远程备份
mysqldump -h 192.168.1.100 -u root -p mydb > remote_backup.sql

# 恢复
mysql -u root -p mydb < mydb_20260101.sql
# 或者登录后
mysql> source /path/to/mydb_20260101.sql;`,
          language: "bash",
          tip: "mysqldump 不加 --single-transaction 会锁表导致业务中断。备份脚本一定记得加——配合 cron 每天凌晨跑就是最简单的备份方案。",
        },
        {
          title: "主从复制",
          content: `主从复制就是一台主库写，多台从库读——读多写少的业务，从库能把读请求分流，还能当备份：`,
          code: `# 主库配置 my.cnf
[mysqld]
server-id = 1
log_bin = /var/log/mysql/mysql-bin.log
binlog_format = ROW

# 创建复制用户
CREATE USER 'repl'@'%' IDENTIFIED BY 'repl_password';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';

# 查看主库状态（记下 File 和 Position）
SHOW MASTER STATUS;

# 从库配置 my.cnf
[mysqld]
server-id = 2
relay_log = /var/log/mysql/mysql-relay-bin.log
read_only = ON

# 从库执行
CHANGE MASTER TO
  MASTER_HOST='192.168.1.100',
  MASTER_USER='repl',
  MASTER_PASSWORD='repl_password',
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=107;

START SLAVE;
SHOW SLAVE STATUS\\G;  -- 看 IO 和 SQL 线程是不是 Yes`,
          language: "bash",
          tip: "从库设 read_only=ON 防止误在里面写数据——Super 用户不受限制但普通连接不行，等于给从库加了保护锁。",
        },
        {
          title: "慢查询日志",
          content: `慢查询日志就是记录跑得慢的 SQL——打开它再配合 pt-query-digest 分析，能揪出性能瓶颈。生产环境记得设合理的阈值，别一行不差记录浪费磁盘：`,
          code: `-- 启用慢查询日志
SET GLOBAL slow_query_log = ON;
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';
SET GLOBAL long_query_time = 1;   -- 超过 1 秒就算慢

-- my.cnf 永久配置
[mysqld]
slow_query_log = ON
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 1
log_queries_not_using_indexes = ON   -- 没走索引的也记录

-- 分析慢查询
mysqldumpslow -s t -t 10 /var/log/mysql/slow.log  -- 按时间排前10
pt-query-digest /var/log/mysql/slow.log           -- 更专业的工具`,
          language: "bash",
          tip: "慢不代表一定有问题——定时批量处理自然慢。重点关注频繁出现的慢查询和没走索引的查询，那是真正的性能杀手。",
        },
      ],
      quiz: [
        { question: "MySQL 里 'alice'@'localhost' 和 'alice'@'%' 是什么关系？", options: ["同一个用户", "两个独立的用户", "后者包含前者", "不能同时存在"], answer: 1, explanation: "MySQL 用户名和来源 IP 一起确定唯一用户，不同来源不同身份，权限也是分开管的。" },
        { question: "mysqldump 备份数据加上 --single-transaction 的作用？", options: ["用事务避免锁表", "单表备份", "单线程备份", "只备份数据"], answer: 0, explanation: "开启一个事务拿到一致性快照，备份不锁表，不影响业务运行。不加这个参数备份时可能会锁表。" },
        { question: "主从复制里 relay_log 是干嘛的？", options: ["错误日志", "从库用来中继主库 binlog 到本地执行", "慢查询日志", "操作审计"], answer: 1, explanation: "IO 线程把主库 binlog 拉过来存到 relay log，SQL 线程再一条条执行 relay log 里的内容，这样完成复制。" },
        { question: "slow_query_log 对生产有什么影响？", options: ["数据库变快", "占用磁盘、轻微性能消耗", "增大缓存", "减少连接数"], answer: 1, explanation: "每条慢 SQL 都写日志有磁盘 IO 开销，但比起问题排查的价值来说是值的。合理设 long_query_time，别设太低。" },
        { question: "SHOW SLAVE STATUS 里 IO 线程和 SQL 线程都显示 Yes 代表什么？", options: ["从库挂了", "复制链路正常", "主库有问题", "需要重启"], answer: 1, explanation: "IO=Yes 表示主库 relay log 正常接收，SQL=Yes 表示 relay log 里的 SQL 正常执行，双 Yes 就是一切正常。" },
      ],
    },
    "postgresql-intro": {
      slug: "postgresql-intro",
      sections: [
        {
          title: "PostgreSQL 入门——PG 跟 MySQL 啥区别",
          content: `PG 和 MySQL 是开源数据库两大王者。MySQL 好上手、生态广、互联网公司最爱；PG 更严谨——类型系统更丰富、标准 SQL 支持更彻底、复杂查询优化更强。简单说：创业赶进度用 MySQL，企业级复杂业务用 PG。GitHub 上大部分高级项目默认支持 PG 是有原因的。`,
        },
        {
          title: "基础操作",
          content: `PG 里把数据库叫 database，一个连接同一时间只能连一个数据库——不像 MySQL 可以随时 USE 切换。psql 是 PG 的命令行客户端，反斜杠开头的是元命令（不是 SQL）：`,
          code: `# 登录
psql -U postgres -d mydb

# psql 内常用命令
\\l          # 列出所有数据库（= SHOW DATABASES）
\\c mydb     # 切换到 mydb 数据库（= USE mydb）
\\dt         # 列出当前库的所有表（= SHOW TABLES）
\\d users    # 查看 users 表结构（= DESCRIBE users）
\\du         # 列出所有用户
\\q          # 退出

# 命令行执行 SQL
psql -U postgres -d mydb -c "SELECT * FROM users LIMIT 5;"`,
          language: "bash",
          tip: "PG 里用户等于角色（role），没有单独的 user 概念。CREATE ROLE 和 CREATE USER 本质上一样，区别是 USER 默认带 LOGIN 权限。",
        },
        {
          title: "JSONB——数据库里的 NoSQL",
          content: `PG 的 JSONB 是杀手锏——在关系型数据库里用文档存储，既可以灵活存 JSON，又可以建 GIN 索引加速查询，兼得两者的好处。JSONB 存的是二进制格式，查询比存纯文本的 JSON 快得多：`,
          code: `-- 建表，products 列是 JSONB 类型
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT,
  products JSONB
);

-- 插入
INSERT INTO orders (user_id, products)
VALUES (1, '[{"name": "book", "qty": 2}, {"name": "pen", "qty": 5}]');

-- 查询 JSON 内部字段
SELECT * FROM orders WHERE products @> '[{"name": "book"}]';
SELECT products->>0 AS first_product FROM orders;  -- 取第一个产品

-- 更新 JSON 里的值
UPDATE orders SET products = products || '[{"name": "eraser", "qty": 1}]';

-- 建 GIN 索引加速 JSONB 查询
CREATE INDEX idx_orders_products ON orders USING GIN (products);`,
          language: "sql",
          tip: "存 API 返回的 JSON 原样保留时用 JSONB——既能按 JSON 内部字段查询，又能保持原始结构，比拆成十几张关联表省事多了。",
        },
        {
          title: "数组和 SERIAL",
          content: `PG 还支持数组字段——一列能存多个值。这在 MySQL 里得建关联表才能实现。SERIAL 是 PG 的自增 ID 语法，本质上是个帮你自动创建 SEQUENCE 的快捷方式：`,
          code: `-- 数组类型
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  members TEXT[]    -- 数组：["alice","bob","charlie"]
);

INSERT INTO teams (name, members) VALUES ('Team A', '{alice,bob,charlie}');

-- 数组查询
SELECT * FROM teams WHERE 'alice' = ANY(members);
SELECT * FROM teams WHERE array_length(members, 1) > 2;

-- SERIAL 本质
-- CREATE TABLE users (id SERIAL PRIMARY KEY);
-- 等价于：
-- CREATE SEQUENCE users_id_seq;
-- CREATE TABLE users (id INT DEFAULT nextval('users_id_seq') PRIMARY KEY);

-- SEQUENCE 操作
SELECT currval('users_id_seq');  -- 上次生成的 ID
SELECT nextval('users_id_seq');  -- 拿下个 ID 并递增`,
          language: "sql",
          tip: "数组不是用于无限关联的替代品——适合存少量固定字段（标签、技能列表），别把全公司的员工 ID 塞数组里，那玩意就没救了。",
        },
      ],
      quiz: [
        { question: "PG 跟 MySQL 本质区别是什么？", options: ["PG 更便宜", "PG 更严谨、类型更丰富、标准 SQL 支持更好", "PG 不是关系型数据库", "MySQL 不支持 SQL"], answer: 1, explanation: "PG 对标准 SQL 的支持更完整，类型系统更丰富（JSONB、数组等），复杂查询优化器更智能。" },
        { question: "PG 里 JSONB 跟普通 JSON 类型的区别？", options: ["JSONB 存二进制更方便查询和索引", "JSONB 是纯文本", "都一样", "JSONB 不能建索引"], answer: 0, explanation: "JSONB 是二进制格式存储，支持 GIN 索引，查询更快；JSON 是存原样文本，每次查都要重新解析。" },
        { question: "PG 里怎么切换数据库？", options: ["USE dbname;", "\\c dbname", "SWITCH dbname;", "SELECT dbname;"], answer: 1, explanation: "PG 的 psql 里用 \\c + 数据库名来切换，不像 MySQL 用 USE——PG 每个连接线程只能对一个数据库。" },
        { question: "SERIAL 背后的实现是什么？", options: ["数据库自动加 1 的逻辑", "SEQUENCE 序列对象", "触发器", "存储过程"], answer: 1, explanation: "SERIAL 实际是通过 SEQUENCE 实现的——创建一个序列对象，再用 nextval 函数自动取下一个值。" },
        { question: "PG 的 TEXT[] 表示什么？", options: ["文本字段", "文本数组——一列可以存多个文本值", "多行文本", "文本索引"], answer: 1, explanation: "TEXT[] 是数组字段，一列可以存多个文本值，像标签列表这种场景正合适。" },
      ],
    },
    "views-and-sp": {
      slug: "views-and-sp",
      sections: [
        {
          title: "视图——虚拟出来的表",
          content: `视图说白了就是「给一条 SELECT 语句起个名字」。你有一长串复杂的查询、跨好几张表 JOIN 来 JOIN 去，每次都要敲一遍？太蠢了。把这条查询保存成一个视图，以后直接 SELECT FROM 视图就行，跟查普通表一模一样。

视图里不存数据——它就是一层「壳」，每次查视图，数据库都在后台帮你跑那条 SELECT 语句。所以视图也叫「虚拟表」：
- 底层数据变了，视图查出来的结果自动跟着变
- 简化复杂查询——把一长串 SQL 封装成一个简单名字
- 权限控制——只让某些人看视图，不让他们碰底层表`,
          code: `-- 创建视图：把员工信息和部门名称拼在一起
CREATE VIEW employee_view AS
SELECT e.id, e.name, e.salary, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id;

-- 查视图，跟查表一模一样
SELECT * FROM employee_view WHERE salary > 10000;

-- 查视图带排序
SELECT dept_name, COUNT(*) AS emp_count
FROM employee_view
GROUP BY dept_name
ORDER BY emp_count DESC;

-- 修改视图定义
CREATE OR REPLACE VIEW employee_view AS
SELECT e.id, e.name, e.salary, e.hire_date, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id;

-- 删视图
DROP VIEW IF EXISTS employee_view;

-- 可更新视图：简单视图也能往里面 INSERT/UPDATE（单表、无聚合函数）
CREATE VIEW active_employees AS
SELECT id, name, department FROM employees WHERE status = 'active';

-- 通过视图插数据——实际插入了原表
INSERT INTO active_employees (name, department) VALUES ('小王', '研发部');
-- 注意插完这行在视图里能看到，但 status 是 NULL 可能在视图查不出来`,
          language: "sql",
          tip: "视图本身不占存储空间（物化视图除外），它就是个「快捷方式」。但别层层嵌套视图——套了三四层查询效率会很难看，MySQL 优化器对这玩意不太聪明的样子。",
        },
        {
          title: "存储过程——数据库里写程序",
          content: `存储过程就是把一组 SQL 语句打包成一个「程序」，存在数据库里，想用的时候直接调用。跟编程语言里的函数差不多——可以接收参数、可以有变量、可以有条件判断和循环。

为什么要把逻辑写在数据库里而不是应用代码里？
- 减少网络往返——应用发一条 CALL 命令，数据库内部跑一堆操作，只把最终结果传回来
- 封装业务逻辑——比如「下单」涉及扣库存、写订单、扣积分三步，一个存储过程全包了
- 权限控制——只给用户 CALL 过程的权限，不让他们直接碰表`,
          code: `-- 最简单的存储过程：查所有员工
DELIMITER $$
CREATE PROCEDURE get_all_employees()
BEGIN
  SELECT * FROM employees;
END $$
DELIMITER ;

CALL get_all_employees();

-- 带输入参数：查某部门的员工
DELIMITER $$
CREATE PROCEDURE get_employees_by_dept(IN dept_name VARCHAR(50))
BEGIN
  SELECT e.name, e.salary
  FROM employees e
  JOIN departments d ON e.dept_id = d.id
  WHERE d.dept_name = dept_name;
END $$
DELIMITER ;

CALL get_employees_by_dept('研发部');

-- 带输出参数：统计部门人数
DELIMITER $$
CREATE PROCEDURE count_dept_employees(IN dept_name VARCHAR(50), OUT total INT)
BEGIN
  SELECT COUNT(*) INTO total
  FROM employees e
  JOIN departments d ON e.dept_id = d.id
  WHERE d.dept_name = dept_name;
END $$
DELIMITER ;

-- 调用输出参数的过程
CALL count_dept_employees('研发部', @count);
SELECT @count;   -- 输出结果

-- 带 INOUT 参数：传入传出同一个变量
DELIMITER $$
CREATE PROCEDURE double_value(INOUT num INT)
BEGIN
  SET num = num * 2;
END $$
DELIMITER ;

SET @val = 10;
CALL double_value(@val);
SELECT @val;  -- 20`,
          language: "sql",
          warning: "存储过程写多了会给数据库增加「逻辑债」——业务逻辑散落在应用代码和数据库里，团队交接、版本控制、调试都会变麻烦。能用应用代码搞定的就别往存储过程里塞。",
        },
        {
          title: "自定义函数——存进数据库的算盘",
          content: `函数跟你写的存储过程挺像的，但有几个关键区别：
- 函数必须有返回值（RETURNS 声明），过程可以没有
- 函数可以在 SELECT 里直接调用（SELECT my_func(x)），过程要用 CALL
- 函数里不能改数据（MySQL 默认禁止函数里执行 INSERT/UPDATE/DELETE）
- 函数适合做计算、格式转换、判断逻辑

说白了一句话：需要返回一个值参与查询选函数，需要做一堆操作选过程：`,
          code: `-- 最简单的函数：返回固定值
DELIMITER $$
CREATE FUNCTION say_hello() RETURNS VARCHAR(50)
DETERMINISTIC
BEGIN
  RETURN 'Hello, World!';
END $$
DELIMITER ;

SELECT say_hello();   -- Hello, World!

-- 有参数的函数：计算税后工资
DELIMITER $$
CREATE FUNCTION calc_after_tax(salary DECIMAL(10,2), tax_rate DECIMAL(3,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  DECLARE result DECIMAL(10,2);
  SET result = salary * (1 - tax_rate);
  RETURN result;
END $$
DELIMITER ;

SELECT name, salary, calc_after_tax(salary, 0.2) AS after_tax
FROM employees;

-- 用 IF 条件判断的函数：评级
DELIMITER $$
CREATE FUNCTION get_level(salary DECIMAL(10,2))
RETURNS VARCHAR(10)
DETERMINISTIC
BEGIN
  DECLARE level VARCHAR(10);
  IF salary >= 20000 THEN
    SET level = '高级';
  ELSEIF salary >= 10000 THEN
    SET level = '中级';
  ELSE
    SET level = '初级';
  END IF;
  RETURN level;
END $$
DELIMITER ;

SELECT name, salary, get_level(salary) AS level FROM employees;

-- 查看和删除
SHOW FUNCTION STATUS WHERE Db = 'mydb';
DROP FUNCTION IF EXISTS calc_after_tax;`,
          language: "sql",
          tip: "DETERMINISTIC 告诉 MySQL 这个函数「同样输入永远同样输出」，MySQL 在优化时可能缓存结果——像取当前时间这种就得用 NOT DETERMINISTIC。",
        },
        {
          title: "逻辑流控制——分支和循环",
          content: `存储过程和函数里光靠 SQL 不够——有时需要「如果这样就这么办，否则那么办」或者「把这几条记录一条条处理」。这就得靠流程控制语句了。MySQL 里提供了 IF、CASE、LOOP、WHILE、REPEAT 这些经典结构。

游标这个玩意要认真说——它就是让你在过程里「逐行遍历」查询结果。但用之前先想想能不能用一条 SQL 搞定：游标效率低、代码长的要死，SQL 里能批量处理的就别逐行搞。只有极度复杂的逐行业务逻辑才值得用游标：`,
          code: `-- IF / ELSE
DELIMITER $$
CREATE PROCEDURE adjust_salary(IN emp_id INT, IN rating CHAR(1))
BEGIN
  IF rating = 'A' THEN
    UPDATE employees SET salary = salary * 1.2 WHERE id = emp_id;
  ELSEIF rating = 'B' THEN
    UPDATE employees SET salary = salary * 1.1 WHERE id = emp_id;
  ELSE
    UPDATE employees SET salary = salary * 1.05 WHERE id = emp_id;
  END IF;
END $$
DELIMITER ;

-- CASE 语句（比 IF 更适合多分支）
DELIMITER $$
CREATE PROCEDURE set_bonus(IN emp_id INT, IN years INT)
BEGIN
  CASE
    WHEN years >= 10 THEN
      UPDATE employees SET bonus = salary * 0.5 WHERE id = emp_id;
    WHEN years >= 5 THEN
      UPDATE employees SET bonus = salary * 0.3 WHERE id = emp_id;
    WHEN years >= 3 THEN
      UPDATE employees SET bonus = salary * 0.15 WHERE id = emp_id;
    ELSE
      UPDATE employees SET bonus = salary * 0.05 WHERE id = emp_id;
  END CASE;
END $$
DELIMITER ;

-- WHILE 循环
DELIMITER $$
CREATE PROCEDURE insert_numbers(IN max_num INT)
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= max_num DO
    INSERT INTO test_numbers(num) VALUES (i);
    SET i = i + 1;
  END WHILE;
END $$
DELIMITER ;

-- 游标：逐行处理
DELIMITER $$
CREATE PROCEDURE process_high_salary()
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE emp_id INT;
  DECLARE emp_salary DECIMAL(10,2);
  -- 游标定义
  DECLARE cur CURSOR FOR SELECT id, salary FROM employees WHERE salary > 15000;
  -- 游标到头了怎么办
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur;
  read_loop: LOOP
    FETCH cur INTO emp_id, emp_salary;
    IF done = 1 THEN
      LEAVE read_loop;
    END IF;
    -- 对每行做点什么
    INSERT INTO salary_log(emp_id, old_salary, log_time) VALUES (emp_id, emp_salary, NOW());
  END LOOP;
  CLOSE cur;
END $$
DELIMITER ;`,
          language: "sql",
          warning: "游标循环会很慢——100 万行逐行循环和一条 UPDATE 语句之间差了好几个数量级。能用集合操作干的事就别用游标。",
        },
        {
          title: "什么时候用视图、过程、函数",
          content: `三样东西各有各的适用场景，用对了事半功倍，用错了团队骂你：

视图适合这些情况：
- 你有一个超复杂的查询，到处要用，每次重敲受不了
- 想对某些用户隐藏表的真实结构——让他们查视图但不能碰表
- 报表展示——把多表 JOIN 的结果封装成简单接口

存储过程适合这些情况：
- 一个操作涉及多步数据修改，用过程保证原子性（一条命令全做完或全不做）
- 定时任务——配合 MySQL EVENT 定时执行
- 批量数据迁移或修复

函数适合这些情况：
- 需要把计算结果嵌在 SELECT 里用——比如 SELECT calc_age(birth_date)
- 格式化输出——姓名脱敏、手机号加星号
- 简单的业务规则判断

一句话总结：
- 查询包装 → 视图
- 多步操作 → 存储过程
- 计算返回值 → 函数
- 能不写这三个就别写——简单的 SQL 在应用层搞定，数据库只管存和查，逻辑交给应用代码才是正道。`,
        },
      ],
      quiz: [
        { question: "视图和普通表最本质的区别是？", options: ["视图更快", "视图不存数据，只是查询的快捷方式", "视图不能查", "视图不能 JOIN"], answer: 1, explanation: "视图就是一条被保存起来的 SELECT 语句，查视图时数据库帮你执行那条 SELECT——视图本身不存数据。" },
        { question: "存储过程和函数最大的区别是？", options: ["没区别", "函数必须有返回值，过程不一定", "过程更快", "函数不能在 SQL 里调用"], answer: 1, explanation: "函数用 RETURNS 声明返回类型，必须 RETURN 一个值；过程可以没有返回值，用 OUT 参数往外传数据。" },
        { question: "DECLARE CONTINUE HANDLER FOR NOT FOUND 在游标里干什么用的？", options: ["声明变量", "当游标走到末尾时捕获异常设置退出标志", "打开游标", "关闭游标"], answer: 1, explanation: "游标 FETCH 到最后一行后会触发 NOT FOUND 条件，这个 handler 就是在这时候把 done 变量置为 1，告诉循环可以退出了。" },
        { question: "为什么说存储过程不要滥用？", options: ["性能太差", "业务逻辑散落在数据库里，维护和调试困难", "数据库不支持", "语法太难"], answer: 1, explanation: "存储过程没法用 Git 版本管理、没法做代码审查、团队交接成本高——逻辑放应用层更透明。" },
        { question: "CREATE OR REPLACE VIEW 干了什么？", options: ["先删再建同名视图", "只创建新视图", "重命名视图", "复制视图"], answer: 0, explanation: "如果视图不存在就创建，如果已经存在就替换掉旧的——相当于一次性「检查+覆盖」，改视图定义时的必用命令。" },
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
    "k8s-pods": {
      slug: "k8s-pods",
      sections: [
        {
          title: "Kubernetes 是啥——容器的指挥官",
          content: `Docker 解决了一个应用的打包和运行问题，但生产环境几十上百个容器怎么管？谁该跑在哪台机器上？挂了怎么重启？流量怎么分配？这是 K8s（Kubernetes）的活。

K8s 就是个容器编排平台——你告诉它「我要跑 3 个 Nginx、2 个 Redis」，它自己找机器、调度、监控、自动恢复。你把服务器组成一个集群，K8s 是集群的大脑。

核心概念简表：
Pod——最小调度单位，一个 Pod 里可以有一个或多个容器（通常一个）
Node——物理机或虚拟机，Pod 最终跑在 Node 上
Service——给 Pod 提供稳定的访问入口（IP 不随 Pod 重启变化）
Deployment——声明式管理 Pod 的副本数和更新策略`,
        },
        {
          title: "Pod 的生命周期",
          content: `Pod 是 K8s 里最小也是最重要的概念。它不是永生的——挂了就重建、节点坏了就调度到别处。Pod 的一生分几个阶段：`,
          code: `# Pod 生命周期状态
# Pending    → Pod 已创建，但容器还没完全跑起来（拉镜像、调度中）
# Running    → Pod 跑起来了，至少一个容器还在运行
# Succeeded  → Pod 里所有容器正常退出了（一次性任务）
# Failed     → Pod 里有容器异常退出
# Unknown     → 节点失联，K8s 不知道 Pod 啥状态

# 查看 Pod 状态
kubectl get pods
kubectl describe pod my-pod    # 详细状态——启动过程、事件日志

# 看 Pod 日志
kubectl logs my-pod
kubectl logs my-pod -c sidecar  # 多容器 Pod 指定容器
kubectl logs -f my-pod          # 实时跟踪`,
          language: "bash",
          tip: "Pod 本身不是长期存在的——它会被重建、迁移，IP 会变。所以不要直接依赖 Pod IP，用 Service 来访问。",
        },
        {
          title: "Pod 容器模式——多容器 Pod",
          content: `虽然大部分情况一个 Pod 只有一个容器，但高级玩法里一个 Pod 可以有多个容器共享网络和存储。常见模式：`,
          code: `# Sidecar 模式——主容器 + 辅助容器
# 比如：主容器跑 Nginx，Sidecar 跑日志采集器
apiVersion: v1
kind: Pod
metadata:
  name: web-app
spec:
  containers:
    - name: nginx
      image: nginx:1.25
      ports:
        - containerPort: 80
    - name: log-collector    # Sidecar 采集日志
      image: fluentd:latest
      volumeMounts:
        - name: shared-logs
          mountPath: /var/log/nginx

# Init 容器——主容器启动前先跑，做初始化工作
# 比如：等数据库就绪、下载配置文件、设置权限
spec:
  initContainers:
    - name: init-db
      image: busybox
      command: ['sh', '-c', 'until nslookup db-svc; do echo waiting; sleep 2; done']
  containers:
    - name: app
      image: my-app:1.0`,
          language: "yaml",
          tip: "Init 容器按顺序执行，前一个成功才跑下一个。主容器启动时 init 已经全部跑完了。",
        },
        {
          title: "资源限制与健康检查",
          content: `不给 Pod 设资源限制等于把车开上高速不装刹车——一个 Pod 吃光所有内存可能导致整台节点崩掉。同时要配健康检查让 K8s 知道 Pod 是不是真在干活：`,
          code: `# resources——资源请求和上限
spec:
  containers:
    - name: app
      image: my-app:1.0
      resources:
        requests:          # 调度保证——Node 至少要有这么多资源才调度过来
          memory: "64Mi"
          cpu: "100m"      # 100m = 0.1 核
        limits:            # 上限——超过就 OOMKill
          memory: "256Mi"
          cpu: "500m"

# 存活探针——Pod 还活着吗？不健康就重启
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 10    # 等 10 秒再开始查
  periodSeconds: 5           # 每 5 秒查一次

# 就绪探针——Pod 准备好接客了吗？
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  periodSeconds: 3`,
          language: "yaml",
          warning: "没有配 resources limits 的 Pod 是无底洞——内存泄露或 bug 可能让整台机器 OOM。生产环境必须给每个容器设 limits。",
        },
      ],
      quiz: [
        { question: "K8s 里最小的调度单位是什么？", options: ["容器", "Pod", "Node", "Service"], answer: 1, explanation: "Pod 是 K8s 最小调度单位——一个 Pod 可以包含多个容器，共享网络和存储。" },
        { question: "Pod 挂了 K8s 怎么做？", options: ["不管", "自动重建一个新的 Pod", "发邮件报警", "等待人工重启"], answer: 1, explanation: "Deployment 控制的 Pod 挂了会自动重建——这是 K8s 自我修复能力的核心。" },
        { question: "Init 容器的执行顺序是？", options: ["和主容器同时跑", "在主容器启动前按顺序依次跑", "在主容器之后跑", "随机跑"], answer: 1, explanation: "Init 容器按定义顺序串行执行，前一个成功才跑下一个，全部成功后才启动主容器。" },
        { question: "LivenessProbe 和 ReadinessProbe 的区别？", options: ["没区别", "Liveness 判断是否要重启，Readiness 判断是否可以接流量", "Readiness 重启容器", "Liveness 决定流量分配"], answer: 1, explanation: "活着的探针失败了就重启；就绪探针失败了只是把 Pod 从 Service 摘掉不分配流量，不重启。" },
        { question: "Pod 里所有容器共享什么？", options: ["独立网络", "网络命名空间和存储卷", "CPU 限制", "镜像"], answer: 1, explanation: "同一个 Pod 内所有容器共享 localhost 网络和挂载的卷——可以通过 localhost 互访。" },
      ],
    },
    "k8s-services": {
      slug: "k8s-services",
      sections: [
        {
          title: "Service——不变的入口",
          content: `Pod 的 IP 会变——重建就换 IP。Service 就是给一组 Pod 提供一个固定的访问入口，不管 Pod 怎么变，Service 的 IP 和 DNS 名不变。

工作原理：Service 通过标签选择器找到目标 Pod，自动维护后端列表。流量打到 Service，由 Service 转发到后端的某个 Pod 上。`,
        },
        {
          title: "ClusterIP——内部通信专用",
          content: `ClusterIP 是最常用的 Service 类型。它分配一个集群内部 IP，只能在集群内部访问——适合微服务之间互相调用：`,
          code: `apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: ClusterIP          # 默认类型，集群内部 IP
  selector:
    app: my-api            # 把流量转发到带 app=my-api 标签的 Pod
  ports:
    - protocol: TCP
      port: 80             # Service 暴露的端口
      targetPort: 8080     # 容器实际监听的端口

# 访问：
# 集群内其他 Pod 可以通过 api-service:80 访问，或者 curl http://api-service
# K8s 自动把 Service 名注册为 DNS 名`,
          language: "yaml",
        },
        {
          title: "NodePort 与 LoadBalancer——对外暴露",
          content: `ClusterIP 只有内部能访问，外部用户怎么办？NodePort 把 Service 映射到每个 Node 的固定端口上，LoadBalancer 则是云厂商提供的公网负载均衡器：`,
          code: `# NodePort——在每个 Node 上开同一个端口
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  type: NodePort
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 3000
      nodePort: 30080      # 每个 Node 上监听 30080（范围 30000-32767）

# 访问：任意 Node 的 IP:30080 → Service → Pod:3000

# LoadBalancer——云环境下自动创建负载均衡器（AWS ELB, GCP LB 等）
apiVersion: v1
kind: Service
metadata:
  name: public-api
spec:
  type: LoadBalancer
  selector:
    app: api
  ports:
    - port: 443
      targetPort: 8080`,
          language: "yaml",
          tip: "本地开发用 NodePort 够了。生产环境建议 LoadBalancer，不过要注意云厂商会为此收费。",
        },
        {
          title: "Ingress——HTTP 路由",
          content: `Service 只负责 TCP/UDP 层的流量转发。HTTP 层的路由——基于域名、路径分发流量——是 Ingress 的活。比如 /api 走后端，/ 走前端：`,
          code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
    - host: myapp.example.com     # 域名
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
                name: frontend-service
                port:
                  number: 80`,
          language: "yaml",
          tip: "Ingress 需要安装 Ingress Controller（如 Nginx Ingress）才能工作，它不是 K8s 自带的。",
        },
      ],
      quiz: [
        { question: "Service 的主要作用是什么？", options: ["存储数据", "给一组 Pod 提供固定访问入口", "管理节点", "监控"], answer: 1, explanation: "Pod IP 会变，Service 提供稳定的 IP 和 DNS 名，不管 Pod 怎么重建都通过 Service 访问。" },
        { question: "ClusterIP 类型的 Service 能从哪里访问？", options: ["公网", "任意地方", "只能集群内部", "指定国家"], answer: 2, explanation: "ClusterIP 只分配集群内部 IP，外部访问不了——专门给集群内微服务互调用。" },
        { question: "NodePort 端口范围是多少？", options: ["1-65535", "80-443", "30000-32767", "8000-9000"], answer: 2, explanation: "NodePort 默认分配 30000-32767 范围之间的端口，也可以自己指定。" },
        { question: "Ingress 和 Service 什么关系？", options: ["完全替代 Service", "Service 管 TCP/UDP，Ingress 管 HTTP 路由（域名/路径分发）", "一样的东西", "Ingress 更快"], answer: 1, explanation: "Service 是基础层——让流量打到 Pod；Ingress 在此基础上提供 HTTP 七层路由能力。" },
      ],
    },
    "k8s-config": {
      slug: "k8s-config",
      sections: [
        {
          title: "ConfigMap——配置跟代码分家",
          content: `应用代码和配置混在一起是定时炸弹——改个数据库地址就得重新构建镜像然后部署。ConfigMap 把配置从容器里抽出来，改配置不用重建镜像，Pod 重启就能生效：`,
          code: `# 从命令行创建 ConfigMap
kubectl create configmap app-config \\
  --from-literal=DB_HOST=mysql-service \\
  --from-literal=DB_PORT=3306 \\
  --from-literal=LOG_LEVEL=debug

# 从文件创建
kubectl create configmap nginx-config --from-file=nginx.conf

# YAML 方式
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-settings
data:
  APP_ENV: production
  DB_URL: "mysql://db-service:3306/myapp"
  app.json: |         # 也可以存多行配置
    {
      "max_connections": 100,
      "timeout": 30
    }`,
          language: "yaml",
        },
        {
          title: "将 ConfigMap 注入 Pod",
          content: `建好 ConfigMap 后，可以当环境变量注入容器，也可以挂载成文件：`,
          code: `# 方式一：环境变量
spec:
  containers:
    - name: app
      image: my-app:1.0
      envFrom:
        - configMapRef:
            name: app-settings     # ConfigMap 里所有 key 全变成环境变量

# 方式二：指定某个 key 为环境变量
      env:
        - name: DATABASE_URL
          valueFrom:
            configMapKeyRef:
              name: app-settings
              key: DB_URL

# 方式三：挂载为文件——适合配置文件
      volumeMounts:
        - name: config-volume
          mountPath: /etc/config
  volumes:
    - name: config-volume
      configMap:
        name: app-settings`,
          language: "yaml",
          tip: "ConfigMap 修改后不会自动更新到运行的 Pod——需要重启 Pod 或者用 reloader 工具自动触发滚动更新。",
        },
        {
          title: "Secret——敏感信息单独保管",
          content: `数据库密码、API 密钥这些敏感信息不能用 ConfigMap（那是明文）。Secret 也是键值对，但数据是 base64 编码存储的，Pod 挂载后自动解码。

注意：Secret 的 base64 只是编码不是加密——做做样子而已。生产环境建议配合加密方案：`,
          code: `# 创建 Secret
kubectl create secret generic db-secret \\
  --from-literal=username=admin \\
  --from-literal=password=S3cr3t!

# YAML——数据必须 base64 编码
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4=        # echo -n 'admin' | base64
  password: UzNjcjN0IQ==    # echo -n 'S3cr3t!' | base64

# 或者用 stringData 直接写明文（K8s 自动编码）
stringData:
  username: admin
  password: S3cr3t!

# 以环境变量注入 Pod
spec:
  containers:
    - name: app
      env:
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: username`,
          language: "yaml",
          warning: "base64 不是加密！任何能 kubectl 的人都能看到明文。生产环境建议用 Vault 或 Sealed Secrets 对 Secret 加密后再存进 Git。",
        },
      ],
      quiz: [
        { question: "ConfigMap 和 Secret 的主要区别？", options: ["没区别", "ConfigMap 存普通配置，Secret 存敏感信息", "Secret 更快", "ConfigMap 更安全"], answer: 1, explanation: "ConfigMap 明文存普通配置，Secret 存密码、密钥等敏感数据，但也要配合加密方案才真正安全。" },
        { question: "可以把 ConfigMap 以什么形式注入 Pod？", options: ["只能环境变量", "环境变量和文件挂载都可以", "只能文件挂载", "只能命令行参数"], answer: 1, explanation: "两种方式：envFrom/env 注入环境变量，或者 volume 挂载成文件——根据场景选。" },
        { question: "Secret 的数据编码方式是什么？", options: ["MD5", "base64", "AES 加密", "不编码"], answer: 1, explanation: "Secret 数据存成 base64——注意这只是编码不是加密，解码后就是明文。" },
        { question: "ConfigMap 更新后 Pod 会自动感知吗？", options: ["会，实时生效", "不会，需要重启 Pod 或用外部工具触发", "自动滚动更新", "分批更新"], answer: 1, explanation: "ConfigMap 改了不会自动推送给 Pod，要么手动重启 Pod，要么用 Reloader 等工具触发滚动更新。" },
      ],
    },
    "docker-network": {
      slug: "docker-network",
      sections: [
        {
          title: "Docker 网络基础",
          content: `Docker 网络管的就是容器之间怎么通信、容器怎么跟外面通信。默认有 3 种网络模式：
bridge——默认模式，容器在一个虚拟局域网里，通过 docker0 网桥连宿主机
host——容器直接用宿主机的网络栈，性能最好但没隔离
none——断网模式，完全不配网络，高安全场景用`,
          code: `# 查看所有网络
docker network ls

# 查看网络详情（哪些容器连上了）
docker network inspect bridge

# 创建自定义网络（重要！用容器名就能通信）
docker network create my-network

# 运行容器并指定网络
docker run -d --name web --network my-network nginx
docker run -d --name db --network my-network mysql:8

# 在 web 容器里直接 ping db 容器名就能通
docker exec web ping db`,
          language: "bash",
          tip: "自定义 bridge 网络比默认 bridge 强得多：可以用容器名互访、自带 DNS 解析、创建时能指定子网。生产环境一定要建自己的网络。",
        },
        {
          title: "网络模式详解",
          content: `host 模式相当于容器裸奔在宿主机的网络栈上——nginx 监听 80 等于宿主机 80，不看 -p 映射。性能极高但端口容易冲突。

--link 是老式容器互访方式，现在基本被自定义网络淘汰了。overlay 模式用于 Swarm 跨主机容器通信，生产多机部署才用：`,
          code: `# host 模式——直接绑定宿主机端口
docker run -d --network host nginx
# nginx 监听 80 等于宿主机 80，不需要 -p

# none 模式——彻底断网
docker run -d --network none nginx

# --link（已过时，不推荐）
docker run -d --name db mysql
docker run -d --name web --link db:my-db nginx

# overlay 网络（需要 Swarm 模式）
docker swarm init
docker network create --driver overlay my-overlay
docker service create --name web --network my-overlay nginx`,
          language: "bash",
          warning: "host 模式小心端口冲突——两个容器都监听 80 端口不可能同时用 host 模式。只有性能敏感场景（如 Node.js 服务）才考虑它。",
        },
        {
          title: "容器之间怎么通信",
          content: `在同一个自定义网络下，Docker 自带 DNS——直接用容器名当域名就能访问，比如 web 容器里 curl db:3306 就能连上 MySQL。不同网络下的容器是不能直连的，除非把一个容器挂到多个网络下：`,
          code: `# 给运行中的容器接一个新网络
docker network connect my-network existing-container

# 让容器退出某个网络
docker network disconnect my-network existing-container

# 查看容器到底接了哪些网络
docker inspect web | grep -A 20 "Networks"

# 发布端口到宿主机
docker run -d -p 8080:80 nginx   # 宿主机 8080 映射到容器 80
docker run -d -P nginx            # 随机映射所有 EXPOSE 端口`,
          language: "bash",
          tip: "如果容器没能用名字互访，先确认它们在同一个自定义网络上——默认 bridge 网络不支持自动 DNS 解析。",
        },
      ],
      quiz: [
        { question: "自定义 bridge 网络比默认 bridge 强在哪？", options: ["快很多", "能用容器名互访、自带 DNS、配置更灵活", "只能连两台容器", "启动更快"], answer: 1, explanation: "自定义网络自动 DNS 解析容器名，默认 bridge 得用 IP 还得 --link，差别很大。" },
        { question: "host 网络模式下 -p 端口映射有用吗？", options: ["有用", "没用——容器直接绑宿主机端口", "只对 80 有效", "需要额外配置"], answer: 1, explanation: "host 模式容器和宿主机共用网络栈，容器监听什么端口，宿主机就绑定什么端口——-p 根本不生效。" },
        { question: "--link 现在还用吗？", options: ["仍然是主流", "已过时，推荐用自定义网络 + DNS", "只有 Windows 能用", "必须用"], answer: 1, explanation: "--link 是早期的接入方式，现在用自定义网络，容器名自带 DNS 解析，更简单可靠。" },
        { question: "不同网络上的两个容器能直连吗？", options: ["能直接连", "不能，除非一个容器同时接两个网络", "通过宿主机中转", "不能连接"], answer: 1, explanation: "docker network connect 可以让一个容器接入多个网络，从而跨网络访问不同网络中的其他容器。" },
      ],
    },
    "docker-volume": {
      slug: "docker-volume",
      sections: [
        {
          title: "数据卷是啥——容器删了数据在",
          content: `容器是无状态的——删了就没了，所有写的文件跟着消失。数据卷就是解决这个问题的——把容器的某个目录映射到宿主机，容器删了数据还在。

Docker 有三种挂载方式：
1. volume——Docker 管理的，存在 /var/lib/docker/volumes/，推荐
2. bind mount——直接挂宿主机目录，开发调试常用
3. tmpfs——挂内存，容器停了数据也没了，适合临时文件`,
        },
        {
          title: "Volume 和 Bind Mount 实战",
          content: `volume 最推荐——Docker 帮你管目录，不用担心权限问题，也方便在不同容器间复用。bind mount 简单粗暴——直接指定宿主机路径，开发环境改代码马上生效：`,
          code: `# Volume——Docker 管理，自动创建
docker run -d -v mydata:/app/data nginx
# 不用先创建 mydata，Docker 会自动在 /var/lib/docker/volumes/ 下建

# Bind mount——直接挂主机路径
docker run -d -v /home/user/config:/etc/nginx/conf.d nginx
# 宿主机改了配置，重启容器生效（或 nginx -s reload）

# 挂当前目录到容器的 /app
docker run -d -v $(pwd):/app nginx

# 只读挂载——容器不能改
docker run -d -v /host/config:/etc/nginx/conf.d:ro nginx

# 查看所有卷
docker volume ls

# 卷详情（看存在哪儿）
docker volume inspect mydata

# 清理不用的卷
docker volume prune`,
          language: "bash",
          warning: "bind mount 路径用绝对路径——你写了 -v ./data:/data 在当前目录可能正常，但到了有些环境就不行。用 $(pwd)/data 最保险。",
        },
        {
          title: "数据共享和 tmpfs",
          content: `volume 可以随便在多个容器间共享——比如前端和后端挂同一个卷做日志采集。tmpfs 是纯内存映射，读写极快，适合不外发、不怕丢的临时文件：`,
          code: `# 多个容器共享同一个 volume
docker run -d --name web1 -v shared_logs:/var/log myapp
docker run -d --name web2 -v shared_logs:/var/log myapp
# 俩容器写同一个日志卷

# tmpfs——内存映射
docker run -d --tmpfs /tmp nginx
docker run -d --mount type=tmpfs,destination=/tmp,tmpfs-size=64m nginx

# docker-compose 里的卷配置
# volumes:
#   logs:
#     driver: local
#   db-data:
#     external: true   # 用已经存在的卷`,
          language: "bash",
          tip: "Volume 之间拷数据超简单——启动一个临时的 alpine 容器挂两个卷，cp 一下就行：docker run --rm -v src:/src -v dest:/dest alpine cp -r /src/data /dest/。",
        },
      ],
      quiz: [
        { question: "Volume 和 Bind Mount 最大区别是什么？", options: ["没区别", "Volume 由 Docker 管路径，Bind Mount 你指定宿主机路径", "Volume 更快", "Bind Mount 只能读"], answer: 1, explanation: "Volume 的物理路径在 Docker 管理目录下，你不需要关心；Bind Mount 你自己指定路径，开发场景灵活。" },
        { question: "tmpfs 挂载的数据存在哪儿？", options: ["硬盘", "内存里", "对象存储", "远程服务器"], answer: 1, explanation: "tmpfs 直接挂到内存文件系统，读写飞快，但容器停了或重启了数据就没了。适合存缓存和临时文件。" },
        { question: "docker volume prune 干什么的？", options: ["清理所有数据", "删除不被任何容器引用的卷", "删除容器", "清理日志"], answer: 1, explanation: "prune 清理孤儿卷——没容器在用的卷会慢慢累积占空间，定期 prune 清掉。" },
        { question: ":ro 在挂载里表示什么意思？", options: ["根目录", "只读——容器只能读不能改", "读写", "重启"], answer: 1, explanation: "加 :ro 后缀让挂载变成只读，容器不能往里写数据，相当于给容器加一层安全保护。" },
      ],
    },
    "docker-security": {
      slug: "docker-security",
      sections: [
        {
          title: "不用 root 跑容器",
          content: `Docker 默认容器里的进程是 root 身份——但这是容器里的 root，跟宿主机 root 不完全一样，有 namespace 隔离。不过万一突破了容器隔离，root 权限就是灾难。

最简单安全的做法：建一个非 root 用户在 Dockerfile 里切过去，或者 docker run 时指定 user：`,
          code: `# Dockerfile 里建普通用户
FROM node:20-alpine
RUN addgroup -g 1001 appuser && adduser -D -u 1001 -G appuser appuser
WORKDIR /app
COPY --chown=appuser:appuser . .
USER appuser
CMD ["node", "server.js"]

# 运行时指定用户
docker run -d --user 1000:1000 nginx

# 验证容器里跑的是谁
docker exec my-container whoami`,
          language: "dockerfile",
          tip: "生产环境的 Dockerfile 最后一行一定写 USER——别让容器里的进程以 root 身份跑，这是安全底线。",
        },
        {
          title: "只读文件系统和 Capabilities",
          content: `容器里大部分文件不需要改——把根文件系统挂成只读能防攻击注入。再加上 --cap-drop 把容器不需要的内核能力全删了，攻击面大大缩小：`,
          code: `# 只读文件系统（用 tmpfs 给必须写的地方留口）
docker run -d --read-only \\
  --tmpfs /tmp --tmpfs /run --tmpfs /var/log \\
  nginx

# 去掉所有 capabilities，只加必要的
docker run -d --cap-drop ALL --cap-add NET_BIND_SERVICE nginx
# NET_BIND_SERVICE 允许绑定 1024 以下的特权端口

# 不加 --privileged！别让容器拥有宿主机的全部特权
# --privileged 等于把 namespace 隔离全拆了，非常危险`,
          language: "bash",
          warning: "任何人让你用 --privileged 跑容器多问一句为什么。99% 的场景用 --device 或者 --cap-add 都能解决，没必要给全权。",
        },
        {
          title: "资源限制——cgroups",
          content: `没限制的容器可能吃掉整台机器的 CPU 和内存。cgroups 就是管这个的——给每个容器设上限，谁也饿不着谁：`,
          code: `# 内存限制
docker run -d --memory="512m" --memory-swap="1g" nginx
# 物理内存最多 512MB，超出可能被 OOM Killer 杀掉

# CPU 限制
docker run -d --cpus="1.5" nginx        # 最多用 1.5 个核
docker run -d --cpuset-cpus="0,1" nginx  # 只能用第 0 和第 1 个核

# 磁盘 IO 限制
docker run -d --device-read-bps /dev/sda:1mb nginx     # 每秒最多读 1MB
docker run -d --device-write-iops /dev/sda:100 nginx   # 每秒最多 100 次写操作

# 查看容器的资源使用
docker stats
docker stats --no-stream    # 一次性快照`,
          language: "bash",
          tip: "生产环境一定要设 --memory 和 --cpus，不然一个死循环或内存泄漏能把整台机器拖垮。K8s 的 requests/limits 也是同一个原理。",
        },
      ],
      quiz: [
        { question: "Dockerfile 里 USER 指令干什么的？", options: ["设置容器名", "切换容器里进程的运行用户", "设置环境变量", "设置工作目录"], answer: 1, explanation: "USER 让后续的 RUN/CMD/ENTRYPOINT 都用指定用户跑，避免容器进程以 root 身份执行。" },
        { question: "docker run --read-only 的效果？", options: ["只读端口", "容器根文件系统只读，必须配合 tmpfs 给需要写的位置", "只能读日志", "只读数据卷"], answer: 1, explanation: "只读根文件系统防止攻击者修改文件，需要写的地方（/tmp, /run）用 tmpfs 挂载解决。" },
        { question: "为什么不该用 --privileged？", options: ["太慢", "等于给容器宿主机 root 特权，隔离全没了", "占内存", "不能联网"], answer: 1, explanation: "--privileged 把内核 namespace 隔离全拆了，容器拥有宿主机的全部能力，出事了相当于宿主机被入侵。" },
        { question: "--memory=512m 限制的是什么？", options: ["磁盘", "容器的内存使用上限", "日志大小", "镜像大小"], answer: 1, explanation: "cgroups 中的内存限制——容器能不能用超过 512MB 内存，超了会被 OOM 杀掉。" },
        { question: "docker stats 能看什么？", options: ["日志", "资源使用：CPU、内存、网络 IO、磁盘 IO", "文件列表", "端口"], answer: 1, explanation: "docker stats 实时显示每个容器占了多少 CPU、内存、网络流量和磁盘 IO，排查哪个容器吃资源一目了然。" },
      ],
    },
    "docker-optimization": {
      slug: "docker-optimization",
      sections: [
        {
          title: "镜像瘦身——为什么重要",
          content: `镜像越小拉得越快、占磁盘越少、攻击面也越小。很多人上来就 FROM ubuntu 然后 apt install 一堆东西——开发当然快，但最后镜像 1GB+。优化空间巨大。记住一句：生产镜像的目标是能跑就行，不是能开发就行。`,
        },
        {
          title: "多阶段构建——终极瘦身",
          content: `多阶段构建的思路很简单：构建一个大而全的镜像用来编译，再从里面只把编译好的结果拷到最终的小镜像里放行。最终镜像里没有编译器、没有源码、没有 npm 依赖里的 devDependencies——干干净净只留下必要的运行时文件：`,
          code: `# Go 项目——最终镜像可以小到几 MB
FROM golang:1.21 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o server .

FROM alpine:3.18    # 最终镜像
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/server /usr/local/bin/
ENTRYPOINT ["server"]

# 前端项目——静态 HTML 放 nginx
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# 不需要 node、不需要 node_modules、不需要源码`,
          language: "dockerfile",
          tip: "多阶段构建能减的体积超乎你想象——Go 最终镜像可以从 900MB 减到 15MB，前端项目从 1GB 减到几十 MB。",
        },
        {
          title: ".dockerignore 和层缓存",
          content: `.dockerignore 跟 .gitignore 一样——告诉 Docker 哪些文件不要。不加的话一个 COPY . . 把 node_modules、.git、IDE 配置全拷进去了，又大又慢。

层缓存是 Docker 的加速秘密——每条 Dockerfile 指令生成一层，没变就不重建。利用好能省不少时间：`,
          code: `# .dockerignore
node_modules
.git
.gitignore
*.md
.env
.env.*
dist
coverage
.DS_Store

# Dockerfile 里利用层缓存
FROM node:20-alpine
WORKDIR /app
# 先拷贝 package 文件——代码改了但依赖没变就不用重新装
COPY package*.json ./
RUN npm ci --only=production
# 再拷贝源代码——这层才会因为代码修改而重建
COPY . .

# 别这样写——COPY . . 在前，代码一改，RUN npm ci 也跟着重建
# COPY . .
# RUN npm ci`,
          language: "dockerfile",
          tip: "Dockerfile 里变更不频繁的步放前面（装依赖），频繁变更的步放后面（拷贝源码）——充分利用缓存加速构建。",
        },
        {
          title: "小技巧汇总",
          content: `选 Alpine 当基础镜像——node:20-alpine 比 node:20 小 10 倍。包管理器装完就清理缓存——apt-get install 完加一行 rm -rf /var/lib/apt/lists/*。能合并的 RUN 合并一行——减少层数也减少体积。别装调试工具到生产镜像——vim、htop、telnet 这些调试工具用 docker exec 临时装就行。减少副本——同一镜像不同 tag 共享底层 layer，尽量用一致的基础镜像。`,
        },
      ],
      quiz: [
        { question: "多阶段构建核心思想是什么？", options: ["镜像分多次推送", "编译和运行分离，编译用的工具不留到最终镜像", "多个人同时构建", "构建多个不同镜像"], answer: 1, explanation: "第一阶段装编译工具构建产物，第二阶段拿编译结果放小镜像运行——最终镜像不包含构建依赖。" },
        { question: ".dockerignore 的主要作用？", options: ["忽略镜像大小", "排除不需要的文件送入构建上下文", "忽略容器日志", "忽略网络请求"], answer: 1, explanation: "构建前 Docker 会把上下文目录发到 Docker daemon，.dockerignore 里的文件不参与，减少传输量也防泄露。" },
        { question: "为什么 Dockerfile 里 COPY package.json 放 COPY . 前面？", options: ["顺序无所谓", "依赖层没变就用缓存，不用重新装，加速构建", "package.json 更轻", "安全要求"], answer: 1, explanation: "依赖文件不常变，先 COPY 依赖装完可以用缓存，后面 COPY 源码那层才因为代码改动重建——这叫层缓存策略。" },
        { question: "RUN apt-get install 后为什么加 rm -rf /var/lib/apt/lists/*？", options: ["释放空间，减少层大小", "加快启动", "提高安全性", "是格式要求"], answer: 0, explanation: "apt 安装完留下的包列表缓存占空间还没用，删掉能省几十 MB。" },
      ],
    },
    "k8s-basics": {
      slug: "k8s-basics",
      sections: [
        {
          title: "K8s 是啥——容器的超级管家",
          content: `Kubernetes（K8s）就是容器的调度平台——你告诉它「我要 3 个 nginx，CPU 各 0.5 核」它就自动找合适的机器跑起来。挂了自动重启，流量太大自动扩缩容，滚动更新不停机。

架构分两部分：
Control Plane（控制面）——大脑：API Server（入口）、etcd（数据库）、Scheduler（调度器）、Controller Manager（控制器）
Node（工作节点）——干活的：kubelet（节点管家）、kube-proxy（网络代理）、上面跑着若干 Pod

这一切都是声明式的——你告诉 K8s「我想要什么状态」，它自己想办法达到，你不需要操心怎么做。`,
        },
        {
          title: "Pod——最小单位",
          content: `Pod 是 K8s 里最小的调度单元——一个 Pod 里可以有一到多个容器，共享网络和存储。但大多数时候一个 Pod 只有一个主容器。Pod 是临时的，死了会在别处重生，IP 也会变——所以别记 IP，用 Service：`,
          code: `# pod.yaml ——最简单的 Pod 定义
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx
  labels:
    app: web
spec:
  containers:
    - name: nginx
      image: nginx:1.24
      ports:
        - containerPort: 80`,
          language: "yaml",
        },
        {
          title: "kubectl 基本操作",
          content: `kubectl 是你操作 K8s 的遥控器。几个高频命令背下来就够日常用了：`,
          code: `# 查看资源
kubectl get pods                    # 所有 Pod
kubectl get pods -o wide            # 更多 IP、节点信息
kubectl get pods -w                 # watch 模式，实时监测
kubectl get nodes                   # 所有节点
kubectl get services                # 所有 Service
kubectl get all                     # 全部资源

# 操作 Pod
kubectl describe pod my-pod         # 详情（看 Events 能知道为啥还起不来）
kubectl logs pod/my-pod             # 看日志
kubectl logs -f pod/my-pod          # 实时日志
kubectl exec -it pod/my-pod -- bash # 进 Pod 里操作

# 创建和删除
kubectl apply -f pod.yaml           # 声明式创建/更新
kubectl delete pod my-pod           # 删除 Pod（Deployment 管的会自动重建）
kubectl delete -f pod.yaml          # 按文件删`,
          language: "bash",
          tip: "kubectl get 加 -o wide 多显示一行关键信息，排查问题时先用它看看 Pod 在哪个节点、IP 是多少。",
        },
      ],
      quiz: [
        { question: "K8s 中声明式 API 是什么意思？", options: ["你写脚本一步步操作", "你声明想要的状态，K8s 自动调节达到目标", "必须用 YAML", "只能用 kubectl"], answer: 1, explanation: "你只需要 YAML 里写期望状态——3 个副本、2 核 CPU——K8s 调度器自己分配节点，挂了自己重启，无需人工干预。" },
        { question: "Pod 是 K8s 里最小的什么？", options: ["存储单元", "调度单元", "网络单元", "安全单元"], answer: 1, explanation: "Pod 是最小可调度单位——K8s 不调度单个容器，而是调度 Pod。Pod 里的容器共享网络和存储。" },
        { question: "etcd 在 K8s 里干什么的？", options: ["跑容器", "控制网络", "存储集群所有配置和状态数据——集群的数据库", "日志系统"], answer: 2, explanation: "etcd 是分布式键值存储，K8s 把节点信息、Pod 配置、Service 定义等等全存在 etcd 里——集群失忆了就是从 etcd 出了问题。" },
        { question: "kubectl describe 主要看什么？", options: ["只看 IP", "Event 区——能看到 Pod 为什么起不来", "只看端口", "只看镜像名"], answer: 1, explanation: "describe 里 Events 段最有价值：镜像拉不下来、资源不够、健康检查失败——全在这里记录着。" },
        { question: "kubectl logs -f 里的 -f 干嘛的？", options: ["过滤", "跟随——持续输出新日志", "格式化", "删除"], answer: 1, explanation: "和 tail -f 一样，持续跟踪输出新日志，排查实时问题必备。" },
      ],
    },
    "k8s-deployment": {
      slug: "k8s-deployment",
      sections: [
        {
          title: "Deployment——Pod 的控制器",
          content: `Deployment 是上层抽象，替你管理 Pod。你声明要几个 Pod、用什么镜像、怎么更新，Deployment 控制器自动搞定。Pod 挂了或节点宕机了它负责重建，更新镜像时按策略滚动更新——全程不需要你手动操作 Pod：`,
          code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.24
          ports:
            - containerPort: 80`,
          language: "yaml",
        },
        {
          title: "滚动更新和回滚",
          content: `K8s 默认滚动更新——一个一个替换旧 Pod，不停机更新版本。出问题了一条命令回滚到上一个版本：`,
          code: `# 更新镜像
kubectl set image deployment/web-app web=nginx:1.25
kubectl edit deployment web-app      # 手改 YAML

# 看更新进度
kubectl rollout status deployment/web-app
kubectl rollout history deployment/web-app

# 回滚
kubectl rollout undo deployment/web-app          # 回滚到上一个版本
kubectl rollout undo deployment/web-app --to-revision=2  # 回滚到指定版本

# 暂停/恢复更新
kubectl rollout pause deployment/web-app
kubectl rollout resume deployment/web-app`,
          language: "bash",
        },
        {
          title: "更新策略——绿蓝和金丝雀",
          content: `滚动更新（默认）：maxSurge（多跑几个新 Pod）、maxUnavailable（允许几个 Pod 暂时不可用）

蓝绿部署：两套环境（蓝=旧，绿=新），准备好绿环境后切 Service 指向，瞬间切换。优点是秒切回蓝环境，缺点要双倍资源

金丝雀部署：先放行一小部分流量到新版本，观察没问题再全量放开。常用 Istio 或 nginx-ingress 做流量切片`,
          code: `# 滚动更新策略定死
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1          # 更新时可以多跑的新 Pod 数
      maxUnavailable: 0    # 更新时允许几个不可用

# 蓝绿示意——两个 Deployment + Service selector 切换
# 蓝：Deployment web-v1 (labels: version: v1)
# 绿：Deployment web-v2 (labels: version: v2)
# Service selector 从 version: v1 改成 version: v2 即完成切换`,
          language: "yaml",
          tip: "滚动更新的 maxUnavailable=0 保证服务不断——但需要资源余量。公司 VPS 资源紧的话可以设 maxUnavailable=1, maxSurge=0，先杀旧再跑新（有一瞬间少 Pod 但不会全停）。",
        },
      ],
      quiz: [
        { question: "Deployment 的主要职责是什么？", options: ["管理网络", "管理 Pod 的生命周期和更新", "存储数据", "管理节点"], answer: 1, explanation: "Deployment 是 Pod 的管控器——副本数维持、滚动更新、回滚都归它管。" },
        { question: "kubectl rollout undo 是什么操作？", options: ["删除 Deployment", "回滚到上一个版本", "重新部署", "更新配置"], answer: 1, explanation: "undo 回滚到上一个 Revision，类似 git revert——上线出问题一键退回。" },
        { question: "蓝绿部署的主要代价是什么？", options: ["需要写很多代码", "需要双倍服务器资源运行两套环境", "更新慢", "不能回滚"], answer: 1, explanation: "蓝绿部署同一时间两套完整环境同时运行，资源占用翻倍——但换来极致快速的切换和回退。" },
        { question: "maxSurge 在滚动更新里控制什么？", options: ["最大不可用数量", "更新时额外允许创建的新 Pod 数量上限", "最大副本数", "最大内存"], answer: 1, explanation: "maxSurge=2 意味着更新时可以先跑到 original+2 个 Pod，多出来的是新版本——保证更新过程中服务能力不减。" },
      ],
    },
    "k8s-storage": {
      slug: "k8s-storage",
      sections: [
        {
          title: "PV 和 PVC——存储的申请制",
          content: `PersistentVolume（PV）是管理员备好的存储——一块硬盘、NFS 目录、云磁盘。PersistentVolumeClaim（PVC）是用户的申请单——我要 5GB 容量，找个匹配的 PV 给我用。解耦了存储提供者和使用者，Pod 只管挂 PVC 就行，不用关心底层是什么盘：`,
          code: `# PV——管理员创建
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce    # 只能一个节点读写
  hostPath:
    path: /mnt/data

# PVC——用户申请
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  resources:
    requests:
      storage: 5Gi
  accessModes:
    - ReadWriteOnce`,
          language: "yaml",
        },
        {
          title: "StorageClass——动态按需分配",
          content: `每个 Pod 都让管理员手动建 PV 不合适。StorageClass 允许按需自动建 PV——你申请 PVC，存储插件自动为你配一个云磁盘或 NFS 目录。这就是动态供给：`,
          code: `# StorageClass——自动提供者
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs    # AWS 云盘
parameters:
  type: gp3

# PVC 引用 StorageClass——自动创建 PV
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: auto-pvc
spec:
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 20Gi
  accessModes:
    - ReadWriteOnce

# Pod 挂载 PVC
spec:
  containers:
    - name: db
      image: mysql
      volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
  volumes:
    - name: data
      persistentVolumeClaim:
        claimName: auto-pvc`,
          language: "yaml",
          tip: "PV 的 reclaimPolicy 决定 PVC 删除后底层存储怎么处理——Retain（保留，默认）要手动清理，Delete（自动删除）最常用，StorageClass 的动态供给通常自动 Delete。",
        },
        {
          title: "常用存储类型",
          content: `hostPath——直接用节点本地路径，开发测试用。Pod 换节点了数据就没——本地数据不跨节点
NFS——网络文件存储，多节点共享，适合读多写少或共享配置
云磁盘（EBS/PD）——高性能，但只能单节点读写（RWO）
云文件（EFS/Filestore）——多节点共享类 NFS
CSI 插件——各厂商自己实现的标准接口，比如 AWS EFS CSI Driver、Ceph RBD`,
        },
      ],
      quiz: [
        { question: "PV 和 PVC 是什么关系？", options: ["一样", "PV 管理员准备存储，PVC 用户提交需求，K8s 自动匹配", "PV 是容器 PVC 是网络", "PVC 是旧版的 PV"], answer: 1, explanation: "PV 是已有的存储资源仓库，PVC 是用户的申请单——匹配逻辑自动绑定大小和访问模式最合适的那个。" },
        { question: "StorageClass 解决了什么痛点？", options: ["网络问题", "自动按需动态创建 PV——不用管理员手动操作", "容器启动问题", "日志问题"], answer: 1, explanation: "有了 StorageClass，你申请 PVC 它自动建一个云厂商的磁盘绑上来，不用等管理员手工创建 PV。" },
        { question: "hostPath 最大的问题是什么？", options: ["太慢", "Pod 漂移到其他节点数据就没了——跟节点绑定", "没权限", "不能挂两个容器"], answer: 1, explanation: "hostPath 把存储绑在节点本地，Pod 调度到别的节点就找不着数据了——只适合测试，生产不敢用。" },
        { question: "accessModes ReadWriteOnce 是什么意思？", options: ["所有节点都能读写", "只能单节点读写", "只能读不能写", "只能一个 Pod 读"], answer: 1, explanation: "RWO 限制这一个存储被且仅被一个节点的 Pod 读写，适合关系型数据库这种不能多节点同时写盘的情况。" },
      ],
    },
    "k8s-monitoring": {
      slug: "k8s-monitoring",
      sections: [
        {
          title: "Prometheus 和 Grafana",
          content: `生产监控的标配组合：Prometheus（采集并存储指标）+ Grafana（图表展示）。Prometheus 定期拉取各 Pod 曝光的 /metrics 端点，然后 Grafana 做可视化大盘。

Operator 方式安装最省心——kube-prometheus-stack 一个 Helm 全搞定，自带 Node Exporter（主机指标）和 Kube State Metrics（K8s 资源指标）。`,
          code: `# 使用 helm 装完整监控栈
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack

# 访问 Grafana（默认 admin/admin）
kubectl port-forward svc/monitoring-grafana 3000:80

# 应用暴露 metrics 给 Prometheus 采集
# 在 Deployment 上加 annotation：
metadata:
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "9090"
    prometheus.io/path: "/metrics"`,
          language: "bash",
          tip: "PromQL 是 Prometheus 的查询语言。初学记这几个：rate(http_requests_total[5m])——最近5分钟每秒请求速率；sum by(status)(rate(...))——按状态码分类汇总；histogram_quantile(0.99, rate(...))——P99 延迟。",
        },
        {
          title: "日志——EFK/ELK 方案",
          content: `EFK（Elasticsearch + Fluentd + Kibana）或 ELK（Logstash 替代 Fluentd）是 K8s 日志采集的标配。每个 Node 上跑一个 Fluentd DaemonSet 当日志收割机——收集所有容器标准输出，统一发给 Elasticsearch，Kibana 做查询和可视化：`,
          code: `# Fluentd DaemonSet——每个节点自动跑一个
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
spec:
  selector:
    matchLabels:
      name: fluentd
  template:
    spec:
      containers:
        - name: fluentd
          image: fluent/fluentd-kubernetes-daemonset:v1
          volumeMounts:
            - name: varlog
              mountPath: /var/log
            - name: dockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
      volumes:
        - name: varlog
          hostPath:
            path: /var/log
        - name: dockercontainers
          hostPath:
            path: /var/lib/docker/containers`,
          language: "yaml",
          tip: "Loki + Grafana 是比 EFK 更轻量的选择——不依赖 ES 的庞大资源开销，直接用对象存储存日志，Grafana 一个平台看指标+日志一体。小团队首选。",
        },
        {
          title: "简单告警设置",
          content: `Prometheus 的告警规则定义在 PrometheusRule 资源里，AlertManager 收到告警后发邮件、钉钉、微信或 Slack。最简单的 CPU 过高告警：`,
          code: `apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: cpu-alert
spec:
  groups:
    - name: node-alerts
      rules:
        - alert: HighCpuUsage
          expr: 100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: "节点 CPU 超过 80%"`,
          language: "yaml",
          tip: "告警要有人看才有效——别设一堆没人理的告警报警疲劳。核心指标（CPU>80%、内存>90%、Pod 重启频繁、磁盘>85%）盯好就够了。",
        },
      ],
      quiz: [
        { question: "Prometheus 默认怎么获取数据？", options: ["推模式接入", "拉模式——定时拉 Pod 的 /metrics 端点", "接收 UDP", "WebSocket"], answer: 1, explanation: "Prometheus 用 pull 模式——定期访问被监控目标的 /metrics 端点采集指标，而不是等对方往里推。" },
        { question: "EFK 里的 F 通常指什么？", options: ["Fluentd——日志采集器", "Fluentbit", "Fast", "Filter"], answer: 0, explanation: "EFK 的标准组合是 Elasticsearch（存储搜索）+ Fluentd（采集转发）+ Kibana（可视化查询界面）。" },
        { question: "DaemonSet 在日志采集里怎么用？", options: ["集中跑一个", "每个节点运行一个 Fluentd 实例收集本节点日志", "随机找一个节点", "手动挑选节点"], answer: 1, explanation: "DaemonSet 保证每个 Node 上跑一个副本，刚好满足日志采集的需求——每台机器各自收割自己的日志。" },
        { question: "Grafana 能做什么？", options: ["存储数据", "可视化——把 Prometheus 的指标数据做成图表和仪表盘", "杀 Pod", "扩容节点"], answer: 1, explanation: "Grafana 是可视化面板，连接 Prometheus 数据源后定制各种仪表盘，CPU、内存、QPS 一眼看清。" },
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
    "git-commands": {
      slug: "git-commands",
      sections: [
        {
          title: "日常高频命令",
          content: `Git 命令有两百多个，但真正天天用的就十几个。这章把核心命令串一遍——先记这些，剩下的遇到再查就行：`,
          code: `# 初始化——把一个普通文件夹变成 git 仓库
git init

# 克隆——把远程仓库搬到本地
git clone https://github.com/user/repo.git
git clone -b dev https://github.com/user/repo.git   # 克隆指定分支

# 查看状态——不管做什么，先看状态
git status
git status -s     # 简短模式，一行一个文件

# 增删改——三步走：编完 -> add -> commit -> push
git add file.txt             # 添加到暂存区
git add .                    # 全部添加
git add -p                   # 交互式挑着加，精细控制
git commit -m "fix: bug fixed"
git commit -am "fix: bug fixed"  # add + commit 一步（只对已跟踪文件）
git push                     # 推送到远程
git push -u origin main      # 首次推送 + 设上游分支

# 拉取
git pull                     # = git fetch + git merge
git fetch                    # 只拉不看（先看看有啥再决定）
git fetch --prune            # 顺带清理远程已删的分支`,
          language: "bash",
          tip: "养成 git status 当习惯——任何操作前都看一眼，避免手抖提交不该交的东西。另外 git pull --rebase 比默认 pull 好，历史清爽没多余 merge commit。",
        },
        {
          title: "日志和历史",
          content: `git log 是时光机，但不加参数很啰嗦。学会这几个参数组合，看历史效率翻倍：`,
          code: `# 基础日志
git log                          # 完整历史
git log --oneline                # 每条一行，最常用
git log --oneline --graph        # 图形式分支路径
git log --oneline --graph --all  # 所有分支一起看——全貌
git log -5                       # 只看最近 5 条

# 搜日志内容
git log --grep="bug"             # 提交信息含 bug 的提交
git log -S"functionName"         # 改了这个函数的提交

# 按条件过滤
git log --author="Alice"         # Alice 的提交
git log --since="2026-01-01"     # 新年后的提交
git log --before="2026-06-01"    # 六月前的提交`,
          language: "bash",
        },
        {
          title: "diff——看改了啥",
          content: `diff 是排 bug 利器——一眼看到底哪些代码变了：`,
          code: `# 工作区 vs 暂存区
git diff

# 暂存区 vs 最新提交
git diff --staged
git diff --cached

# 工作区 vs 最新提交
git diff HEAD

# 查看两个分支的差别
git diff main..feature-branch
git diff --name-only main..feature-branch   # 只看改了哪些文件名

# 查看单次提交的内容
git show HEAD
git show abc1234

# 查看某行代码是谁啥时候改的
git blame file.txt
git blame -L 10,30 file.txt    # 只看 10-30 行`,
          language: "bash",
          tip: "git blame 其实不是「归罪」的意思，是查谁写了哪段——但代码审查时叫 blame 确实很形象。",
        },
      ],
      quiz: [
        { question: "git fetch 和 git pull 有什么区别？", options: ["一样", "fetch 只下载不合并，pull=fetch+merge", "fetch 更快", "pull 只下载"], answer: 1, explanation: "fetch 把远程更新下载到本地但不合并，给你机会先看；pull 是 fetch + merge 一条龙。" },
        { question: "git status 报告 'nothing to commit, working tree clean' 是什么意思？", options: ["代码删光了", "工作区干净——没有待提交的改动", "Git 坏了", "远程没更新"], answer: 1, explanation: "工作区所有改动都提交了，跟最后一次 commit 完全一致——干净状态。" },
        { question: "git log --oneline 的输出格式？", options: ["完整提交详情", "每条提交一行——hash + 标题", "图形化显示", "只显示 hash"], answer: 1, explanation: "--oneline 把每条提交压成一行，紧凑排列前 7 位 hash 和标题，快速浏览历史必备。" },
        { question: "git diff --staged 看的是什么？", options: ["工作区改动", "暂存区和最后 commit 的差异", "两次 commit 的差异", "没跟踪的文件"], answer: 1, explanation: "已经 git add 进暂存区但还没 git commit 的改动——提交前最后一次确认。" },
        { question: "git push -u origin main 中 -u 做了什么？", options: ["强制推送", "设上游分支——以后 git push 不带参数就行", "更新远程", "删除远程分支"], answer: 1, explanation: "-u（set-upstream）把本地 main 和远程 origin/main 绑定，以后直接 git push/pull 就行不用每次都写全参数。" },
      ],
    },
    "git-stashing": {
      slug: "git-stashing",
      sections: [
        {
          title: "stash——临时存一下",
          content: `正写到一半，同事说有个紧急 bug 要切分支修——现在 commit 半截代码又不好看。stash 就是救星——把当前改动暂存起来，工作区恢复干净，然后放心切分支。等你回来再 stash pop 恢复：`,
          code: `# 暂存当前所有改动
git stash
git stash save "写到一半的登录功能"

# 看存了多少东西
git stash list
# stash@{0}: WIP on feature: abc1234 写到一半的登录功能

# 恢复——两种方式
git stash pop       # 恢复最近一次 stash + 删除它
git stash apply     # 恢复但不删除，保留 stash

# 恢复指定的 stash
git stash pop stash@{1}

# 删掉没用的
git stash drop stash@{0}
git stash clear     # 全清

# 部分暂存——精细控制
git stash push -m "only frontend changes" src/frontend/`,
          language: "bash",
          tip: "记得别在好几个 stash 堆了又不清理——时间长了跟回收站一样乱。pop 完删掉，用完即走。",
        },
        {
          title: "reset——后悔药",
          content: `reset 把仓库状态往回退。三种力度：
--soft：只挪 HEAD，暂存区和工作区都不动——相当于只撤销 commit 命令本身
--mixed（默认）：挪 HEAD + 清暂存区，工作区保留改动——最安全
--hard：清光一切——HEAD、暂存区、工作区全回滚到目标——最暴力、没回头路`,
          code: `# 撤销最近一次 commit——改动回到暂存区
git reset --soft HEAD~1

# 撤销 commit + 暂存区——改动回到工作区
git reset HEAD~1
git reset --mixed HEAD~1

# 完全撤销——改动的代码全没
git reset --hard HEAD~1

# 回退到某个特定提交
git reset --hard abc1234

# 把文件从暂存区拉回到工作区
git reset HEAD file.txt
git restore --staged file.txt   # Git 2.23+ 新写法`,
          language: "bash",
          warning: "git reset --hard 很危险——没提交的改动会被干掉。执行前先用 git stash 或确认干净。已经 push 过的 commit 别 reset 后 force push，会搞乱别人的仓库。",
        },
        {
          title: "revert——文明回退",
          content: `revert 不会改历史——它在现有基础上再提交一个「反操作」，把目标 commit 的改动反向置回来。对已经 push 到公共分支的代码，revert 比 reset 文明——不改历史、不害队友：`,
          code: `# 回退最近一次提交——创建一条新的 revert commit
git revert HEAD

# 回退到指定提交
git revert abc1234

# 多个连续 revert
git revert HEAD~3..HEAD

# revert 出现冲突时——解决后继续
git revert --continue
git revert --abort    # 放弃 revert`,
          language: "bash",
          tip: "已经 push 的 commit 需要回退用 revert 不要 reset + force push。revert 是添加新 commit 撤销，历史在线性延展，不会有同事的 git pull 报冲突。",
        },
      ],
      quiz: [
        { question: "git stash pop 和 git stash apply 的区别？", options: ["一样", "pop 恢复并删除 stash，apply 恢复但保留 stash", "pop 更快", "apply 只能读"], answer: 1, explanation: "pop 是取了不还，apply 是复制一份——stash 列表里还有。" },
        { question: "git reset --soft HEAD~1 做了什么？", options: ["删代码", "只撤销最近一次 commit 保留改动在暂存区", "清空仓库", "恢复文件"], answer: 1, explanation: "HEAD 回退一步，但改动保留在暂存区——等于撤销 commit 命令本身。" },
        { question: "为啥已经 push 的 commit 不建议 reset + force push？", options: ["慢", "改历史让其他人 pull 的时候冲突、分支发散", "不安全", "GitHub 不允许"], answer: 1, explanation: "别人已经基于旧 commit 工作，你改公共历史会导致他们的仓库跟远端对不上。公共分支用 revert 别用 reset + force push。" },
        { question: "git reset --hard 会丢什么？", options: ["远程代码", "没提交的工作区改动全部丢失", "分支", "标签"], answer: 1, explanation: "--hard 彻底清空暂存区和工作区——没提交的改动全部消失，找不回来除非翻了 reflog。" },
        { question: "git revert 的原理是？", options: ["删除历史", "产生新 commit 恰好是原 commit 的反操作", "重置分支", "丢弃改动"], answer: 1, explanation: "revert 不篡改历史——它新建一个 commit，内容就是把要撤销的提交的改动反着做一遍。" },
      ],
    },
    "git-remotes": {
      slug: "git-remotes",
      sections: [
        {
          title: "远程仓库管理",
          content: `远程仓库就是大家共享的那个代码仓库（GitHub/GitLab/Gitee）。git remote 是管理本地仓库和远程仓库之间映射的命令：`,
          code: `# 查看远程仓库
git remote              # 叫什么名
git remote -v            # 带 fetch/push 地址

# 添加远程仓库
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git

# 改地址 / 删仓库
git remote set-url origin git@github.com:user/new-repo.git
git remote remove upstream

# 查看远程分支
git branch -r            # 只列远程分支
git branch -a            # 本地 + 远程全列`,
          language: "bash",
          tip: "fork 工作流常见配置：origin 指向你 fork 的仓库，upstream 指向原始仓库。同步上游更新：git fetch upstream && git merge upstream/main。",
        },
        {
          title: "Fork 和 PR 流程",
          content: `开源项目协作的标准流程——你不会直接往主仓库推代码，而是：
1. Fork 一份主仓库到自己账号下（GitHub 点个按钮）
2. clone 你的 fork 到本地
3. 加原始仓库做 upstream 随时同步更新
4. 开分支写功能 -> push 到自己 fork
5. 在 GitHub 上发起 Pull Request
6. 代码 review 后合并进主仓库`,
          code: `# 典型 Fork 工作流
git clone https://github.com/yourname/repo.git
cd repo
git remote add upstream https://github.com/original/repo.git

# 同步上游更新（开新功能前先同步）
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# 开发功能
git checkout -b feature-awesome
# ... 写代码 ...
git push origin feature-awesome
# 在 GitHub 上 Create Pull Request from feature-awesome`,
          language: "bash",
        },
        {
          title: "解决合并冲突",
          content: `冲突不是世界末日——只是 Git 不知道怎么同时合并两个改动。别慌，三步走：
1. 打开冲突文件——Git 把两边冲突都标出来了
2. 决定要保留哪段或怎么写——删掉 Git 加的标记
3. git add 告诉 Git 解决好了，然后 commit`,
          code: `# pull 或 merge 之后看到冲突
git status
# Unmerged paths: both modified: file.txt

# 冲突文件长这样：
<<<<<<< HEAD           # 你当前分支的内容
const port = 3000;
=======                # 对方分支的内容
const PORT = 8080;
>>>>>>> feature-branch

# 手动选留哪一个（比如留 3000），删掉标记行，变成：
const port = 3000;

# 标记为已解决
git add file.txt
git commit -m "merge: resolve conflict"

# 放弃解决——回到 merge 前
git merge --abort`,
          language: "bash",
          tip: "经常 pull 上游更新就不容易产生大冲突——积压越久冲突越大。小步快跑，频繁同步。",
        },
      ],
      quiz: [
        { question: "Fork 工作流中 origin 和 upstream 通常指向哪？", options: ["都指向自己", "origin 指向自己 fork，upstream 指向原始仓库", "origin 指向原始仓库", "upstream 没意义"], answer: 1, explanation: "origin 是你 fork 的仓库（你有写权限），upstream 是原始仓库（你只能读，通过 PR 贡献）。" },
        { question: "Pull Request 的本质是？", options: ["合并代码", "请求原始仓库审查和合并你的改动", "拉取代码", "删除分支"], answer: 1, explanation: "PR 不是你把代码推到别人仓库——是你请求仓库维护者审查你的改动并以合法形式合并进去。" },
        { question: "git merge --abort 干什么的？", options: ["合并 git", "放弃合并——回到 merge 之前状态", "合并分支", "强制合并"], answer: 1, explanation: "merge 到一半发现冲突太乱不想继续了——--abort 撤回到 merge 前的干净状态。" },
        { question: "合并冲突时 Git 用什么符号标记冲突？", options: ["// 和 //", "<<<<<<< 和 ======= 和 >>>>>>>", "/* 和 */", "## 和 ##"], answer: 1, explanation: "<<<<<<< 是你这边的改动，>>>>>>> 是对方那边的改动，中间 ======= 隔开——删标记保留想要的内容就解决了。" },
      ],
    },
    "git-hooks": {
      slug: "git-hooks",
      sections: [
        {
          title: "Git Hooks 是啥",
          content: `Git Hooks 是在特定 Git 事件触发时自动跑的脚本——提交前检查代码格式、提交信息格式校验、push 前跑测试。hook 脚本放在 .git/hooks/ 目录，去掉 .sample 后缀就激活了。最常用的 pre-commit 在提交前跑检查——直接把问题消灭在本地，等不到 CI 环节才发现。`,
          code: `# .git/hooks/pre-commit ——提交前自动跑
#!/bin/sh
# 检查代码格式
npm run lint
if [ $? -ne 0 ]; then
  echo "Lint 不通过，提交被拦截了"
  exit 1
fi

# commit-msg ——检查提交信息格式
#!/bin/sh
# 要求提交信息格式：type: description
COMMIT_MSG=$(cat $1)
if ! echo "$COMMIT_MSG" | grep -qE "^(feat|fix|docs|chore|refactor|test): "; then
  echo "提交信息格式不对：type: description"
  exit 1
fi`,
          language: "bash",
          tip: "原生 hooks 没法直接分享给团队——.git/hooks 不在版本控制里。所以诞生了 husky 这样的工具——把 hooks 写在项目目录中，团队 clone 后自动装上。",
        },
        {
          title: "husky + lint-staged",
          content: `husky 把 hooks 声明在 .husky/ 目录里，可以提交到 git——全团队共享。lint-staged 只检查暂存区里的文件，不改动不检查的——又省时间又精准。安装：npm i -D husky lint-staged，初始化：npx husky init（创建 .husky/pre-commit）：`,
          code: `# package.json 里配 lint-staged
{
  "lint-staged": {
    "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.css": ["stylelint --fix"],
    "*.py": ["ruff format", "ruff check"]
  }
}

# .husky/pre-commit ——husky 自动生成的 hook
npx lint-staged

# .husky/commit-msg ——检查提交信息
npx --no-install commitlint --edit $1`,
          language: "json",
          tip: "lint-staged 小技巧：自动格式化完了要 git add 加回去——lint-staged 自动处理，不用手写。",
        },
        {
          title: "常用 hooks 场景",
          content: `pre-commit：检查代码格式、跑 eslint、禁止提交密码和密钥到仓库——最常用的 hook
commit-msg：检查提交信息格式——强制团队遵守 Conventional Commits（feat:, fix:, docs: 等）
pre-push：push 前跑测试，防止推送烂代码
post-commit：提交成功后通知或更新
pre-receive/update（服务端）：中心仓库的守卫——拒绝不合规的推送`,
        },
      ],
      quiz: [
        { question: "pre-commit hook 什么时候触发？", options: ["push 后", "git commit 执行时、提交前", "pull 时", "checkout 时"], answer: 1, explanation: "在你 git commit 按下回车后、真正提交之前，pre-commit 脚本跑完不出错才会继续提交。" },
        { question: "husky 解决了什么问题？", options: ["加速 Git", "让 hooks 可以提交到版本库、团队共享", "替代 Git", "图形化 Git"], answer: 1, explanation: "项目内配置 hooks，clone 后自动生效——不需要每个人自己去 .git/hooks 里手动复制脚本。" },
        { question: "lint-staged 和直接跑 lint 区别？", options: ["一样", "lint-staged 只检查暂存区文件，更快更精准", "lint-staged 更慢", "lint-staged 会失败"], answer: 1, explanation: "全量 lint 可能检查几百个文件要等几秒，lint-staged 只对即将提交的那几个文件跑检查——轻量高效。" },
        { question: "commit-msg hook 能做什么？", options: ["修改代码", "校验提交信息格式——不符合规则就拦下", "加速提交", "自动 push"], answer: 1, explanation: "commit-msg 拿到你写的提交信息文本，可以用正则匹配检查格式——强制团队写好提交备注。" },
      ],
    },
    "git-workflows": {
      slug: "git-workflows",
      sections: [
        {
          title: "Git Flow——经典流",
          content: `Git Flow 把分支分很多种角色——开发流程高度结构化，适合有固定发布周期的团队：
main：永远稳定、可发布的生产版本
develop：最新的开发状态，从 main 分出
feature/*：从 develop 分出来开发新功能，完成合回 develop
release/*：准备发布的版本，从 develop 分出修 bug
hotfix/*：紧急修线上问题，从 main 分出修完合到 main 和 develop`,
          code: `# Git Flow 命令行工具（不必装，自己建分支更灵活）
# 功能开发
git checkout -b feature/user-login develop
# ... 开发 ...
git checkout develop
git merge --no-ff feature/user-login

# 发布准备
git checkout -b release/1.0 develop
# ... 修小 bug ...
git checkout main
git merge --no-ff release/1.0
git tag -a v1.0 -m "Release 1.0"
git checkout develop
git merge --no-ff release/1.0

# 热修复
git checkout -b hotfix/bug-123 main
# ... 修 bug ...
git checkout main
git merge --no-ff hotfix/bug-123
git tag -a v1.0.1 -m "Hotfix 1.0.1"
git checkout develop
git merge --no-ff hotfix/bug-123`,
          language: "bash",
          tip: "Git Flow 有小公司用得越来越少——太繁琐了。但如果你们在做按版本发布的桌面软件或硬件产品，Git Flow 的结构感很舒服。",
        },
        {
          title: "GitHub Flow——简单流",
          content: `比 Git Flow 简化——只有一个 main 分支永远可部署（技术上），feature 分支拉完、PR 审核、合并、立刻部署。适合持续交付的 Web 应用：

1. main 分支必须始终可以部署
2. 开发从 main 拉出描述性的分支名（feature-xxx, fix-xxx）
3. 开发完发起 Pull Request——代码审查
4. 审查通过合并入 main
5. 合并后立即部署（自动化 CI/CD）

没有 develop、release、hotfix——只有 main 和无数功能分支来回——极简高效。`,
        },
        {
          title: "Trunk-Based Development 和分支命名",
          content: `Trunk-Based（干道开发）更激进——所有人往一个主干（main）直接提交或短分支，分支存活不超过一两天。全靠 feature flag 和强大的 CI/CD 搞定。Google 和大部分互联网大厂都演进成这种模式。

不管用哪种流程——分支名写清楚。推荐格式：
feature/user-login——新功能
fix/header-crash——修 bug
chore/update-deps——日常维护
release/v2.1——发版分支
docs/api-guide——文档`,
          tip: "小型团队（1-5 人）直接用 GitHub Flow——一个 main + feature/fix 分支的方法最简单，不用记复杂的分支策略。",
        },
      ],
      quiz: [
        { question: "Git Flow 里 hotfix 分支从哪分出来？", options: ["develop", "feature", "main——直接修生产问题", "release"], answer: 2, explanation: "hotfix 是紧急线上修复——从稳定的 main 分出来，修完合并回 main 和 develop，保证两边都包含这次修复。" },
        { question: "GitHub Flow 跟 Git Flow 最大区别？", options: ["GitHub Flow 更复杂", "GitHub Flow 只有一个 main 分支 + 功能分支，没有 develop/release/hotfix", "GitHub Flow 不能 merged", "没有区别"], answer: 1, explanation: "GitHub Flow 极简化——只有 main 和有描述名的功能分支，提交到 main 即部署，不需要额外分支角色。" },
        { question: "--no-ff merge 是什么意思？", options: ["快速合并", "永远产生一个合并提交保留分支印记", "不合并差异", "压缩提交"], answer: 1, explanation: "no fast-forward——即使能快进合并也额外生成一个 merge commit，保留分支存在过的证明材料。" },
        { question: "Trunk-Based Development 核心特点？", options: ["多分支并行", "所有人直接往主干提交或极短分支——持续集成极频繁", "只用 Git Flow", "不写代码"], answer: 1, explanation: "分支最晚一两天必须合回主干，通过 feature flag 隐藏进行中的功能——等于高频小步提交到主干。" },
        { question: "分支命名 fix/header-crash 里 fix 前缀的作用？", options: ["Git 强制要求", "一眼看出是修 bug 的分支", "没意义", "只能用于 hotfix"], answer: 1, explanation: "前缀给分支类型打标签——feature 是新功能，fix 是修 bug，release 是发版——团队沟通和过滤方便。" },
      ],
    },
    "git-advanced": {
      slug: "git-advanced",
      sections: [
        {
          title: "cherry-pick——挑樱桃",
          content: `cherry-pick 允许你从别的分支挑出来某个 commit 单独应用到当前分支——不需要合整个分支，只拿想要的干净提交：`,
          code: `# 从 feature 分支拿一个 commit 到 main
git checkout main
git cherry-pick abc1234

# 拿多个 commit
git cherry-pick abc1234 def5678

# 拿一个范围的 commit
git cherry-pick abc1234..def5678

# 冲突了就手动解决后继续
git cherry-pick --continue
git cherry-pick --abort    # 放弃`,
          language: "bash",
          tip: "cherry-pick 可能会产生重复提交——两个分支以后合流可能会有冲突。常用场景：修补 hotfix 时从 bugfix 分支挑补丁、重新整理历史时把后续提交挑到干净的基础提交上。",
        },
        {
          title: "rebase -i——重写历史",
          content: `rebase -i 是交互式变基——你可以把几个 commit 压缩成一个（squash）、修改提交信息（reword）、调整顺序、删除不要的 commit。上线前把分支收拾干净——把一堆"tmp"、"fix"合成有意义的提交再合主分支：`,
          code: `# 交互式变基最近 3 个 commit
git rebase -i HEAD~3

# 进入编辑器，每行是一个 commit：
pick abc1234 加登录页面
pick def5678 fix typo
pick ghi7890 又改样式

# squash——把后面的 commit 压进前面一个
pick abc1234 加登录页面
squash def5678 fix typo       # 这条压进上一个
squash ghi7890 又改样式      # 这条也压进第一个

# 保存后 Git 把三个 commit 合成一个——提交信息编辑成一个就完事`,
          language: "bash",
          warning: "不要对已经 push 到共享分支的 commit 用 rebase -i——改历史会让同事抓狂。只在本地分支独享的提交上 rebase。",
        },
        {
          title: "bisect——二分法找 bug",
          content: `程序某天突然出 bug 了，但你不知道是哪个 commit 引入的？bisect 用二分查找帮你从几十上百个 commit 中快速锁定肇事提交：`,
          code: `# 开始二分搜索
git bisect start

# 标记当前版本是坏的
git bisect bad HEAD

# 标记某个已知的好的版本
git bisect good v1.0

# Git 自动切到中间 commit——测试后标记 good 或 bad
git bisect good    # 如果是好的——bug 在更近期
git bisect bad     # 如果是坏的——bug 在更早

# 重复几轮后 Git 找到第一个引入 bad 的 commit
# 查看结果
git bisect log

# 结束二分搜索
git bisect reset`,
          language: "bash",
          tip: "bisect 可以自动化——写个脚本来判断 good/bad：git bisect run npm test。Git 自动跑完帮你找到 break 的提交，效率爆表。",
        },
        {
          title: "reflog——兜底保护",
          content: `reflog 是本地历史记录——记录你在仓库里的一切操作（commit、checkout、rebase、reset）。就算你 git reset --hard 掉了没 push 的 commit——reflog 还能找回来：`,
          code: `# 看所有操作记录
git reflog
# abc1234 HEAD@{0}: reset: moving to HEAD~1
# def5678 HEAD@{1}: commit: new feature

# 恢复到之前的 commit（不会丢失）
git checkout HEAD@{1}
# 或者建个分支指向它
git branch recover-branch HEAD@{1}

# reflog 默认保留 90 天（gc.reflogExpire 可调）`,
          language: "bash",
          tip: "reflog 是本地不可同步的操作日志——只记录你本地仓库的操作，不用 push 不会被共享，纯粹是给自己操作的防护。",
        },
      ],
      quiz: [
        { question: "cherry-pick 做了什么？", options: ["挑水果", "从其他分支单独拿某个 commit 到当前分支", "合并整个分支", "删除分支"], answer: 1, explanation: "cherry-pick 能把特定一个或几个 commit 单独应用到当前分支，不合并其他不想带的提交。" },
        { question: "rebase -i 里 squash 操作的含义？", options: ["删除 commit", "把当前 commit 压进上一个——多个 commit 合为一个", "跳过 commit", "交换顺序"], answer: 1, explanation: "squash 把后面提交的内容合并到前一个 commit 里——常用于把多个零散 commit 整理成一个干净的提交。" },
        { question: "git bisect 用的是什么算法？", options: ["遍历", "二分查找——快速定位引入 bug 的 commit", "随机尝试", "冒泡"], answer: 1, explanation: "二分查找：在好坏两个点中间换版本，每轮排除一半嫌疑——O(log n) 找到肇事提交，比从头翻快得多。" },
        { question: "reflog 和 git log 有什么区别？", options: ["一样", "reflog 记录本地仓库的一切操作；log 只记录提交历史", "log 有分支信息", "reflog 显示远程操作"], answer: 1, explanation: "reflog 是本地操作日记——reset、rebase、checkout 全在里面，即使误删了 commit 也能从 reflog 找回。" },
        { question: "rebase -i 不应该对哪种分支使用？", options: ["本地新分支", "已经 push 给共享分支的 commit——不能改历史", "短分支", "长分支"], answer: 1, explanation: "rebase -i 改提交历史——已推到远程共享的分支，别人拉过去再 reset 会乱掉双方仓库。本地独用是安全区域。" },
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
    "nginx-static": {
      slug: "nginx-static",
      sections: [
        {
          title: "静态文件服务",
          content: `Nginx 最初的成名绝技就是静态文件服务——比其他服务器快得多。一个 root 指令指定文件根目录，location 块做路由匹配，图片、CSS、JS、HTML 文件不经过后端直接返回：`,
          code: `# 基本静态文件服务
server {
    listen 80;
    server_name static.example.com;

    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    # alias——路径别名（路径不一样时用）
    location /images/ {
        alias /var/data/photos/;
    }
}`,
          language: "nginx",
        },
        {
          title: "root vs alias",
          content: `这两个指令容易被搞混：
root——拼接路径。location /img/ + root /var/www => 找 /var/www/img/xxx.jpg
alias——替换直指。location /img/ + alias /var/data/ => 找 /var/data/xxx.jpg

alias 一定要以 / 结尾，否则不工作。另外 try_files 是在 root/alias 找文件，而不是在 URL 路径找——这是静态文件服务的核心逻辑：`,
          code: `# root：路径是 $root + $uri
location /assets/ {
    root /var/www;
    # 用户访问 /assets/logo.png => Nginx 找 /var/www/assets/logo.png
}

# alias：路径是 $alias + $uri去掉匹配部分
location /assets/ {
    alias /var/data/static/;
    # 用户访问 /assets/logo.png => Nginx 找 /var/data/static/logo.png
    # 注意 alias 后的 / 不能少——少了就拼接错误
}

# try_files 用法
location / {
    try_files $uri $uri/ /index.html;  # 把 SPA 应用路径都回传给 index.html
}`,
          language: "nginx",
          tip: "单页应用（SPA：Vue/React）最常用 try_files $uri /index.html——URL 路由交给前端处理，Nginx 只管把找不到的文件全返回 index.html。",
        },
        {
          title: "静态文件缓存",
          content: `给静态资源设缓存过期时间，用户下次访问直接从浏览器缓存拿——节省带宽、减轻服务器压力、加载超快：`,
          code: `# 图片、字体、CSS、JS 缓存 30 天
location ~* \\.(jpg|jpeg|png|gif|svg|webp|ico)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}

location ~* \\.(css|js)$ {
    expires 7d;
    add_header Cache-Control "public, max-age=604800";
}

location ~* \\.(woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# expires 也可以用具体时间
expires modified +7d;    # 修改时间 +7 天
expires @23h30m;         # 当天 23:30`,
          language: "nginx",
          tip: "immutable 告诉浏览器这个文件永远不会变——文件名带 hash（main.a3d5f.js），内容变了文件名跟着变，旧缓存也不会错。所以放心设 1 年缓存。",
        },
      ],
      quiz: [
        { question: "root 和 alias 的核心区别？", options: ["没区别", "root 拼接路径，alias 直接替换前缀", "root 只能用于静态文件", "alias 更快"], answer: 1, explanation: "root 把 location 路径拼上去，alias 直接忽略匹配的部分用你用 alias 指定的路径——最重要的区别。" },
        { question: "try_files $uri $uri/ /index.html 常用于什么场景？", options: ["代理转发", "单页应用（SPA）——找不到文件返回 index.html 让前端搞定路由", "负载均衡", "API 转发"], answer: 1, explanation: "Vue/React 等 SPA 应用，页面 URL 路由由前端处理——Nginx 只返回 index.html，所有 URL 都由前端客户端渲染。" },
        { question: "Cache-Control: immutable 是什么意思？", options: ["不用缓存", "告诉浏览器这个文件永不变——不需要做二次协商", "总是向服务器确认", "每次请求新文件"], answer: 1, explanation: "immutable 表示资源不会变（因为文件名带 hash），浏览器不必发条件请求问服务器有没有更新——省掉多余的验证请求。" },
        { question: "expires 30d 做了什么？", options: ["30 天不访问", "让浏览器缓存 30 天——31 天的请求才重新下载", "限制 30 天过期", "30 天删除文件"], answer: 1, explanation: "expires 设 Cache-Control 的 max-age=30 天，浏览器 30 天内用本地缓存，到期不再请求服务器——减少请求和带宽。" },
      ],
    },
    "nginx-ssl": {
      slug: "nginx-ssl",
      sections: [
        {
          title: "HTTPS 和证书配置",
          content: `HTTPS 已是所有网站的标配——不加密的 HTTP 浏览器都打"不安全"标签。Nginx 配 SSL 基本三步：拿到证书、改配置、配置自动续期：`,
          code: `server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    ssl_certificate     /etc/nginx/ssl/example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/example.com.key;

    # 推荐安全参数
    ssl_protocols TLSv1.2 TLSv1.3;          # 只认 TLS 1.2 和 1.3
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers on;

    root /var/www/html;
}

# HTTP 自动跳转到 HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}`,
          language: "nginx",
        },
        {
          title: "Let's Encrypt 免费证书",
          content: `Let's Encrypt 提供免费 SSL 证书，用 certbot 工具全自动申请和续期。90 天有效期但能设置自动续期——一劳永逸：`,
          code: `# Ubuntu 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 自动获取并配好 Nginx（自动修改配置文件）
sudo certbot --nginx -d example.com -d www.example.com

# 只获取证书，手动配
sudo certbot certonly --webroot -w /var/www/html \\
  -d example.com -d www.example.com

# 模拟续期测试
sudo certbot renew --dry-run

# certbot 自动添加 cron/systemd timer 做续期
# 查看自动续期状态
sudo systemctl status certbot.timer`,
          language: "bash",
          tip: "certbot nginx 插件自动修改 Nginx 配置加 SSL——配合 Ubuntu 的 software-properties-common 包，一键搞定证书申请和 Nginx 配置。",
        },
        {
          title: "HSTS 和 HTTP/2",
          content: `HSTS 就是告诉浏览器"以后访问此网站只能用 HTTPS，别再试 HTTP"——防止中间人攻击里降级 HTTP。浏览器记住这个指令一段时间内再也不走 HTTP。

HTTP/2 是 HTTP 协议的进化——请求复用同一连接，减少握手次数，加速页面加载：`,
          code: `server {
    listen 443 ssl http2;

    # 开启 HSTS——6 个月有效
    add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload" always;

    # 其它安全头
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";

    # OCSP Stapling——证书吊销状态缓存到本地
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
}`,
          language: "nginx",
          warning: "HSTS includeSubDomains 会波及所有子域名——确认所有子域名都部署了 SSL 再开。开了 preload 之后浏览器直接内置你的 HTTPS 标记，回不去 HTTP 可能得不偿失。",
        },
        {
          title: "自签证书（开发用）",
          content: `开发环境用 openssl 自签一张证书——浏览器会提示不安全，但功能测试足够：`,
          code: `# 生成自签证书
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\
  -keyout /etc/nginx/ssl/server.key \\
  -out /etc/nginx/ssl/server.crt \\
  -subj "/C=CN/ST=Beijing/L=Beijing/O=Dev/CN=localhost"

# Nginx 里一样方式引用 ssl_certificate 和 ssl_certificate_key`,
          language: "bash",
          tip: "RSA 还是 ECC？ECC（ecdsa）密钥更短更安全——现代浏览器和服务都支持。openssl ecparam -genkey -name prime256v1 -out key.pem 生成的是 ECC 密钥——文件大小只有 RSA 的几分之一。",
        },
      ],
      quiz: [
        { question: "Let's Encrypt 证书有效期多久？", options: ["1 年", "90 天——需要自动续期", "30 天", "永不过期"], answer: 1, explanation: "90 天短有效期是为安全考量——certbot 自带续期定时器，90 天其实可以自动续，约等于永久免费。" },
        { question: "HSTS 头干什么的？", options: ["加密传输", "强制浏览器以后只能通过 HTTPS 访问", "速度优化", "隐藏站点"], answer: 1, explanation: "Strict Transport Security 告诉浏览器记住这个站一定走 HTTPS——防止降级 HTTPS 成 HTTP 来调包数据。" },
        { question: "certbot --nginx 参数做了什么？", options: ["安装 Nginx", "自动获取 SSL 证书并修改 Nginx 配置", "删除证书", "测试 Nginx"], answer: 1, explanation: "certbot nginx 插件自动申请证书、加载到 Nginx、配上 SSL/TLS 参数——几条命令外完全自动化。" },
        { question: "listen 443 ssl http2 里 http2 做什么？", options: ["只支持 HTTP/1", "启用 HTTP/2 协议——同连接多路复用提升性能", "HTTP/3", "自动重定向"], answer: 1, explanation: "+ http2 后 Nginx 开启 HTTP/2 支持——一个 TCP 连接里并行传多个请求/响应，省掉的连接握手时间对首屏性能改善很显著。" },
      ],
    },
    "nginx-location": {
      slug: "nginx-location",
      sections: [
        {
          title: "Location 匹配优先级",
          content: `location 指令决定哪个 URL 走哪个处理规则。几类匹配方式和优先级（从高到低）：
= 精确匹配——路径完全相同才匹配
^~ 前缀优先——匹配后不再往下查正则
~ 区分大小的正则匹配
~* 不区分大小的正则匹配
无修饰前缀匹配——普通前缀，最宽松`,
          code: `# 精确匹配——访问 / 只有跟 / 完全相同时才匹配
location = / {
    return 200 "精确命中！";
}

# ^~ 前缀优先——匹配后不检查正则
location ^~ /api/static/ {
    return 200 "API 静态路径优先！";
}

# 正则匹配——区分大小写
location ~ \\.php$ {
    fastcgi_pass php-fpm;
}

# 正则匹配——不区分大小写
location ~* \\.(jpg|png|gif)$ {
    expires 30d;
}

# 普通前缀匹配——最后兜底
location / {
    try_files $uri /index.html;
}`,
          language: "nginx",
          tip: "优先级口诀：= > ^~ > ~/~* > 普通前缀。正则按配置文件顺序匹配——第一个匹配到的就用，所以经常被访问的正则放前面。",
        },
        {
          title: "rewrite——改 URL",
          content: `rewrite 把一条 URL 改成另一条 URL 再处理。比如旧的 URL 模式换了新域名、把 http 重定向到 https、负载均衡时修改请求路径：`,
          code: `# 强制跳转 HTTPS
server {
    listen 80;
    server_name example.com;
    rewrite ^ https://$host$request_uri permanent;
    # 或者：return 301 https://$host$request_uri;
}

# 路径重写
location /old-api/ {
    rewrite ^/old-api/(.*)$ /new-api/$1 break;
    proxy_pass http://backend;
}

# 旧链接 301 永久重定向
location /blog {
    rewrite ^/blog/(.*)$ /news/$1 permanent;
}

# 根据条件重写
if ($http_user_agent ~* "bot|spider") {
    rewrite ^/(.*)$ /blocked;   # 挡住爬虫
}`,
          language: "nginx",
          tip: "能用 return 就别用 rewrite——return 性能更好、逻辑更清晰。return 用于纯重定向，rewrite 用于需要改 URI 再继续匹配的场景。",
        },
        {
          title: "常用变量",
          content: `Nginx 自带很多内置变量快速获取请求信息——不用额外模块，拿来就用：
$host——请求的域名
$server_name——匹配到的 server name
$uri——请求的 URI 路径（不含参数）
$args——查询参数（? 后面那串）
$scheme——http 还是 https
$request_method——GET/POST/PUT...
$remote_addr——客户端 IP
$http_user_agent——浏览器标识
$http_referer——从哪个页面跳来的

这些变量常用于配置日志、写条件判断、透传 header 到后端。`,
        },
      ],
      quiz: [
        { question: "location = / 和 location / 的区别？", options: ["一样", "= 精确匹配——只对根路径响应，/ 匹配所有路径", "/ 优先级更高", "= 更慢"], answer: 1, explanation: "= / 是最高优先级的精确匹配——只有访问 example.com 时匹配，/ 被访问任意未匹配到的路径都会走。" },
        { question: "location ~ 和 location ~* 的区别？", options: ["~ 区分大小写，~* 不区分", "~ 不区分，~* 区分", "~ 更快", "没区别"], answer: 0, explanation: "~ 对正则表达式区分大小写，~* 忽略大小写——形如 ~ (?!^)[a-z] 和 ~* [a-zA-Z] 的区别。" },
        { question: "rewrite 里的 permanent 参数做什么？", options: ["永久重定向——302", "永久重定向——301 浏览器缓存此跳转", "临时重定向", "不重定向"], answer: 1, explanation: "permanent=301 永久重定向，浏览器会记住这个映射，以后直接跳转到新 URL 不用再请求源站。" },
        { question: "Nginx 的 $args 变量包含什么？", options: ["URL 路径", "? 后面的查询参数串", "请求方法", "客户端 IP"], answer: 1, explanation: "$args 取的是 ? 后面的所有查询参数——比如 ?page=2&sort=name 就是 page=2&sort=name。" },
      ],
    },
    "nginx-security": {
      slug: "nginx-security",
      sections: [
        {
          title: "限流——limit_req",
          content: `限流能防止暴力刷接口或者 DDoS 攻击打垮服务器。limit_req_zone 定义一个"计数器桶"，limit_req 在 location 里对匹配的请求计数消耗，超出最大值后返回 503 或者排队等待：`,
          code: `# http 段定义限流区和速率
http {
    # 以客户端 IP 为键，内存占用 10MB，每秒限 10 个请求
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

    server {
        location /api/ {
            limit_req zone=mylimit burst=20 nodelay;
            # burst=20：突发时允许短时排 20 个
            # nodelay：有 burst 空位时立刻过来，不要等延迟排队
            proxy_pass http://backend;
        }
    }
}

# 对下载等消耗资源大的也设限
location /download/ {
    limit_req zone=mylimit burst=5;
    limit_rate 200k;   # 每个连接限速 200KB/s
}`,
          language: "nginx",
          tip: "用 limit_req_status 可以自定义返回码——设成 429 Too Many Requests 是目前 REST API 标准的限速响应码。",
        },
        {
          title: "访问控制——allow/deny",
          content: `最简单的访问控制——基于 IP 的白名单/黑名单。管理后台、内部 API、开发环境都可以设：`,
          code: `# 只允许特定 IP 段访问
location /admin/ {
    allow 10.0.0.0/8;      # 内网段
    allow 192.168.1.100;    # 允许特定 IP
    deny all;               # 其他人拒绝
}

# 拒绝指定 IP 访问
location / {
    deny 192.168.1.200;    # 黑名单
    allow all;
}

# auth_basic——密码认证（开发阶段）
location /staging/ {
    auth_basic "管理员区域";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
# 生成密码文件：htpasswd -c /etc/nginx/.htpasswd admin`,
          language: "nginx",
        },
        {
          title: "隐藏版本号和防信息泄露",
          content: `Nginx 默认错误页会显示 Nginx 版本号——攻击者据此可以利用已知 Nginx 漏洞。关掉版本信息、屏蔽代理错误细节、不透露后端信息——让错误页面干净安全：`,
          code: `http {
    # 隐藏 Nginx 版本号
    server_tokens off;

    # 关闭在 40x/50x 错误时显示 Nginx 信息
    # 自定义错误页
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
}

# 代理层单独的错误页——不让后端错误透传
location = /50x.html {
    root /usr/share/nginx/html;
    internal;    # 只有内部重定向能访问，外部直接 URL 看不到
}`,
          language: "nginx",
          tip: "proxy_intercept_errors on + error_page 可拦截后端的错误响应，返回自定义页——用户看不到后端的服务异常信息，保护内部细节。",
        },
      ],
      quiz: [
        { question: "limit_req 限流的原理是？", options: ["限制连接数", "基于 IP 令牌桶计数——达到速率后排队或拒绝", "限制带宽", "限制文件大小"], answer: 1, explanation: "limit_req_zone 给每个 IP 一个桶按指定速率漏水——请求进来消耗令牌，桶空了就排队或直接拒绝。" },
        { question: "server_tokens off 做了什么？", options: ["加速 Nginx", "隐藏 Nginx 版本号——减少信息泄露", "关闭日志", "关闭缓存"], answer: 1, explanation: "错误页面和响应头 Server 字段不再显示 Nginx 具体版本——减少攻击者利用已知漏洞的可能。" },
        { question: "allow 10.0.0.0/8; deny all; 的效果？", options: ["允许所有 IP", "只允许 10.x.x.x 内网段访问", "拒绝所有", "只允许局域网"], answer: 1, explanation: "先允许 10.x 段的所有 IP，再拒绝其他——白名单模式，管理后台典型配置。" },
        { question: "limit_req burst=20 nodelay 里 nodelay 起什么作用？", options: ["无缓冲", "burst 桶位有空直接放行不排队等待", "延迟处理", "不计速"], answer: 1, explanation: "nodelay 使请求在未达到限制前直接走 bursts 的槽位、不从排队中等待——用户不感到延迟，但突发超过 burst 时仍拒绝。" },
      ],
    },
    "nginx-performance": {
      slug: "nginx-performance",
      sections: [
        {
          title: "worker 进程调优",
          content: `Nginx 性能的关键是 worker 进程数和连接数。worker 就是干活的进程——简单原则是一个 CPU 核心用一个 worker，auto 自动辨认。worker_connections 决定每个 worker 能同时处理的多大连接数——Websocket 服务需要设大：`,
          code: `# /etc/nginx/nginx.conf 性能参数
user nginx;
worker_processes auto;          # 自动匹配 CPU 核心数
worker_rlimit_nofile 65535;     # 每个 worker 能打开的文件数

events {
    worker_connections 4096;    # 每个 worker 的并发连接数
    use epoll;                  # Linux 高性能事件模型
    multi_accept on;            # 一次接受多个新连接
}

# 最大并发数 = worker_processes * worker_connections
# 4 核 * 4096 = 16384 并发`,
          language: "nginx",
        },
        {
          title: "gzip 和发送文件优化",
          content: `gzip 压缩文本资源能省 70% 带宽——HTML/CSS/JS/JSON 都该压缩。sendfile 是 Linux 内核级别的零拷贝文件发送——静态文件直接在内核态从磁盘到网卡，不经过用户态拷贝：`,
          code: `http {
    sendfile on;          # 零拷贝——静态文件直发
    tcp_nopush on;        # 打包多个包一起发——减少 TCP 包数
    tcp_nodelay on;       # 小数据不等待立即发——keepalive 内的小请求
    keepalive_timeout 65;

    gzip on;
    gzip_vary on;                      # 让 CDN 根据 Accept-Encoding 做缓存
    gzip_comp_level 6;                 # 压缩级别（1-9, 建议 5-6）
    gzip_min_length 1000;              # 小于 1KB 不压——不值得
    gzip_proxied any;                  # 代理时也压缩
    gzip_types
      text/plain
      text/css
      text/javascript
      application/javascript
      application/json
      application/xml
      image/svg+xml;

    # 客户端缓存
    open_file_cache max=10000 inactive=30s;
    open_file_cache_valid 60s;         # 60 秒验证一次缓存是否过期
    open_file_cache_min_uses 2;
}`,
          language: "nginx",
          tip: "gzip 对已压缩的图片和视频没用还浪费 CPU——只对 text/ 和 application/ 开头 compressible MIME 类型压缩。图片、视频、PDF 本身已经压缩过不用再压。",
        },
        {
          title: "缓冲区和缓存",
          content: `Nginx 代理时可以设 buffer 吸完后端慢请求——而不是逐字节转发慢如蜗牛。也适合对大文件设大缓冲区快速交付：`,
          code: `# 代理的缓冲区配置
location /api/ {
    proxy_buffering on;
    proxy_buffer_size 4k;           # 响应头缓冲
    proxy_buffers 32 16k;           # 响应体缓冲（32 个 16KB）
    proxy_busy_buffers_size 32k;    # 缓冲忙时的缓冲大小
    proxy_max_temp_file_size 256m;  # 溢出写的临时文件大小

    proxy_pass http://backend;
}

# 开启缓存
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;
location /api/ {
    proxy_cache my_cache;
    proxy_cache_valid 200 10m;      # 成功响应缓存 10 分钟
    proxy_cache_valid 404 1m;       # 404 缓存 1 分钟
    proxy_pass http://backend;
}`,
          language: "nginx",
        },
      ],
      quiz: [
        { question: "worker_processes auto 是什么含义？", options: ["1 个进程", "自动按 CPU 核心数设 worker 进程", "随机设", "不设进程"], answer: 1, explanation: "auto 让 Nginx 自己探测机器的 CPU 逻辑核心数——一个核心跑一个 worker 最多利用性能。" },
        { question: "sendfile on 有什么性能优势？", options: ["压缩文件", "零拷贝——内核态直接发文件到网卡不占用户态", "加密传输", "日志加速"], answer: 1, explanation: "Linux 内核原生操作——文件数据不经过用户态拷贝，直接从磁盘到网卡，CPU 不参与搬运。" },
        { question: "gzip_comp_level 设成 9 为什么不好？", options: ["压缩更快", "最高压缩比但 CPU 吃起来飞起，延迟增加——不划算", "不工作了", "会报错"], answer: 1, explanation: "9 级压缩 CPU 比对 6 级多十几倍却压缩比没太大提升——投入产出极低，5-6 是性价比最高的点。" },
        { question: "worker_connections * worker_processes 等于什么？", options: ["CPU 核心数", "Nginx 能处理的理论最大并发连接数", "内存大小", "端口号"], answer: 1, explanation: "每个 worker 都能同时打开 worker_connections 个连接——总数乘以 worker 数量得出最大并发数。" },
        { question: "proxy_cache 的好处？", options: ["加速代理", "缓存后端响应——下次直接拿缓存不用再返回后端", "防火墙", "日志过滤"], answer: 1, explanation: "反向代理缓存——第一次后端给结果存起来，后续同样请求直接从缓存拿，减少后端压力和响应延迟。" },
      ],
    },
    "nginx-logging": {
      slug: "nginx-logging",
      sections: [
        {
          title: "access_log 和 error_log",
          content: `Nginx 两种日志：
access_log——记录每一次请求——谁访问了什么、状态码是什么、花了多久。位置通常 /var/log/nginx/access.log
error_log——Nginx 自己的诊断日志——配置错误、SSL 握手失败、上游连接超时。默认位置 /var/log/nginx/error.log`,
          code: `# 主配置文件设置日志
http {
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log warn;
}

# 关了某站的 access_log（减少 IO）
server {
    listen 80;
    access_log off;
    # 或者写到另一个文件
    access_log /var/log/nginx/special.log;
}

# error_log 等级：debug, info, notice, warn, error, crit
error_log /var/log/nginx/error.log error;   # 只记录 error 级别以上`,
          language: "nginx",
          tip: "高流量网站可以设 access_log off 或 access_log /dev/null 减少磁盘 IO。或者用 Buffer 日志写入：buffer=64k flush=1m。",
        },
        {
          title: "自定义日志格式",
          content: `log_format 定义日志每一行怎么排列——想要啥字段取啥字段。JSON 格式是纯结构化、便于收集到 ELK 或 Grafana 分析：`,
          code: `# 自定义日志格式
http {
    # 详细的普通格式
    log_format detailed '$remote_addr - $remote_user [$time_local] '
                        '"$request" $status $body_bytes_sent '
                        '"$http_referer" "$http_user_agent" '
                        '$request_time $upstream_response_time';

    # JSON 格式——适合发送给日志平台
    log_format json_log escape=json '{'
        '"timestamp":"$time_local",'
        '"remote_addr":"$remote_addr",'
        '"request":"$request",'
        '"status":"$status",'
        '"body_bytes_sent":"$body_bytes_sent",'
        '"request_time":$request_time,'
        '"upstream_response_time":$upstream_response_time,'
        '"http_referer":"$http_referer",'
        '"http_user_agent":"$http_user_agent"'
    '}';

    access_log /var/log/nginx/access.json json_log;
}`,
          language: "nginx",
        },
        {
          title: "日志分割和轮转",
          content: `Nginx 不会自动分割日志——每隔一段时间需要切分否则一个文件几十 GB。用 logrotate 配合 Nginx 定时分割：`,
          code: `# /etc/logrotate.d/nginx
/var/log/nginx/*.log {
    daily                    # 每天轮转
    missingok                # 日志文件不存在也不报错
    rotate 14               # 最多保留 14 份轮转
    compress                 # gzip 压缩轮转
    delaycompress            # 最新一份不压缩（便于还在读取）
    notifempty               # 空的就不转
    create 0640 nginx adm
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 $(cat /var/run/nginx.pid)
    endscript
}

# 手动测试
sudo logrotate -d /etc/logrotate.d/nginx  # dry-run
sudo logrotate -f /etc/logrotate.d/nginx  # 强制执行`,
          language: "bash",
          tip: "postrotate 段里的 kill -USR1 很重要——通知 Nginx 关闭旧日志文件、打开新文件继续写。没有这步 Nginx 继续写旧文件，轮转白干了。",
        },
        {
          title: "日志分析和查询",
          content: `普通 access.log 可以用 awk 做快速分析。JSON 日志送进 ELK/Loki 用 Kibana/Grafana 做仪表盘分析：`,
          code: `# 统计访问最多的 10 个 IP
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10

# 统计 HTTP 状态码分布
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn

# 找出响应时间最慢的 10 个请求
awk '{print $NF, $0}' /var/log/nginx/access.log | sort -rn | head -10

# 统计每分钟请求数
awk '{print $4}' /var/log/nginx/access.log | cut -d: -f1-3 | uniq -c

# 查看 5xx 错误
grep ' 5[0-9][0-9] ' /var/log/nginx/access.log | tail -20`,
          language: "bash",
          tip: "$request_time 记录了 Nginx 处理请求的总时间，$upstream_response_time 记录了后端处理时间。两者之差就是 Nginx 自身和处理传输开销——排查慢请求第一手数据。",
        },
      ],
      quiz: [
        { question: "access_log 和 error_log 区别？", options: ["一样", "access_log 记录每次请求详情，error_log 记录 Nginx 自己的异常", "access_log 存错误", "error_log 存所有请求"], answer: 1, explanation: "access 记录谁访问了什么、状态码等请求详情；error 记录 Nginx 自己的问题——配置错误、上游超时、磁盘 IO 错等。" },
        { question: "JSON 格式日志的好处？", options: ["更短", "结构化数据——直接导入日志平台分析查询", "更快", "只能用于 Nginx"], answer: 1, explanation: "JSON 是机器全可解析的格式，直接扔到 Elasticsearch/Loki 配合 Kibana/Grafana 做字段提取和数据可视化。" },
        { question: "logrotate 里 postrotate 段为什么重要？", options: ["不重要", "分割日志后通知 Nginx 关旧文件开新文件", "压缩日志", "删除旧日志"], answer: 1, explanation: "Nginx 一直往当前日志文件的文件描述符写——轮转改文件名后 Nginx 不知道，仍往老文件描述符写。postrotate 发 USR1 信号它才切换。" },
        { question: "access_log off 什么时候用？", options: ["生产永远关", "极高流量对日志无需求时降低磁盘 IO", "安全要求", "必开关"], answer: 1, explanation: "几十万 QPS 写 access_log 对磁盘 IO 影响大——如果不分析日志且合规允许就关了，否则用缓存写和延迟刷。" },
        { question: "$request_time 和 $upstream_response_time 区别？", options: ["同一个东西", "$request_time 从收到请求到发完响应的总时间，$upstream_response_time 只算后端处理时间", "一个用于 GET 一个用于 POST", "一个毫秒一个秒"], answer: 1, explanation: "request_time 是 Nginx 处理的总耗时（含读请求+后端调用+发送响应），upstream_response_time 只看后端花了多久——定位慢在 Nginx 本身还是后端。" },
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
    "nodejs-database": {
      slug: "nodejs-database",
      sections: [
        {
          title: "Node.js 操作数据库——概览",
          content: `Web 后台离不开数据库。Node.js 操作数据库有两种路子：直接用数据库驱动（原生写法），或者用 ORM（对象关系映射——把数据库表映射成 JS 对象操作）。

原生驱动更灵活性能更好，ORM 写起来更爽更不容易出错。MySQL 和 MongoDB 是两大主流，各走各的路子。`,
        },
        {
          title: "MySQL——mysql2 驱动",
          content: `mysql2 是 Node.js 操作 MySQL 最常用的库，支持 Promise 异步调用：`,
          code: `const mysql = require('mysql2/promise');

// 创建连接池——别每次请求都新连一次，用池子复用连接
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'my_app',
  waitForConnections: true,
  connectionLimit: 10
});

// 查询
async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM users WHERE age > ?', [18]);
  return rows;
}

// 插入——用 ? 占位符防 SQL 注入
async function createUser(name, email) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  return result.insertId;  // 新插入行的 ID
}

// 更新
await pool.query('UPDATE users SET name = ? WHERE id = ?', ['新名字', 1]);

// 删除
await pool.query('DELETE FROM users WHERE id = ?', [1]);

// 事务——要么全成功要么全回滚
const conn = await pool.getConnection();
try {
  await conn.beginTransaction();
  await conn.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');
  await conn.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');
  await conn.commit();
} catch (err) {
  await conn.rollback();
  throw err;
} finally {
  conn.release();
}`,
          language: "javascript",
          tip: "一定要用连接池！每次都新建连接的话，并发一上来 MySQL 就撑不住了。",
        },
        {
          title: "MongoDB——mongoose ODM",
          content: `mongoose 是 Node.js 操作 MongoDB 最主流的库。它不是 ORM 而是 ODM（Object Document Mapper）——把 MongoDB 的文档映射成 JS 对象。定义 schema 约束数据形状，数据模型一目了然：`,
          code: `const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/my_app');

// 定义 Schema——给集合套个约束
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0, max: 150 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// 创建 Model——相当于 MySQL 的表
const User = mongoose.model('User', userSchema);

// CRUD 操作
async function demo() {
  // 创建
  const newUser = await User.create({ name: '张三', email: 'zhang@test.com', age: 28 });

  // 查询
  const users = await User.find({ age: { $gt: 18 } }).sort({ name: 1 }).limit(10);

  // 更新
  await User.updateOne({ email: 'zhang@test.com' }, { $set: { age: 29 } });

  // 删除
  await User.deleteOne({ email: 'zhang@test.com' });
}

// 关联——ref 实现类似 JOIN
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  total: Number,
  items: [String]
});
const Order = mongoose.model('Order', orderSchema);

// 查订单时自动填上用户信息
const orders = await Order.find().populate('user', 'name email');`,
          language: "javascript",
          tip: "mongoose 在默认情况下会给查询加很多校验和安全检查。追求极致性能时可考虑直接用 mongodb 原生驱动。",
        },
        {
          title: "Prisma——新一代 ORM",
          content: `Prisma 是近年最火的 Node.js ORM，支持 MySQL、PostgreSQL、MongoDB、SQLite 等多种数据库。最大的优点是自动生成类型——写代码时 IDE 有智能提示，告别拼写错误：`,
          code: `// schema.prisma——定义数据模型
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  posts     Post[]   // 一对多
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

// JS 代码
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// 创建用户并同时创建帖子
const user = await prisma.user.create({
  data: {
    name: '张三',
    email: 'zhang@test.com',
    posts: {
      create: { title: '我的第一篇博客' }
    }
  },
  include: { posts: true }   // 返回时带上下级
})

// 查询
const users = await prisma.user.findMany({
  where: { name: { contains: '张' } },
  orderBy: { createdAt: 'desc' },
  take: 10
})

// 更新
await prisma.user.update({
  where: { email: 'zhang@test.com' },
  data: { name: '张三丰' }
})

// 删除
await prisma.user.delete({ where: { id: 1 } })`,
          language: "javascript",
          tip: "改完 schema.prisma 后要跑 npx prisma generate 重新生成客户端类型，否则代码里找不到新字段。",
        },
        {
          title: "怎么选——MySQL vs MongoDB vs ORM",
          content: `选型指南，大白话版：

你要存的数据结构固定、需要事务、要做复杂统计报表 → MySQL + Prisma 或 mysql2
你的数据每条的字段都不太一样、JSON 嵌套深、追求开发速度 → MongoDB + mongoose
你是个刚起步的个人项目、不想被 schema 束缚 → MongoDB，后面需要了再迁
你是个正规团队项目、数据一致性要求高 → MySQL
你不管用啥数据库都想写起来爽、有类型提示 → Prisma
你追求极致性能、特别清楚自己在写什么 SQL → mysql2 原生驱动

没有最佳方案，只有最适合你的方案。`,
        },
      ],
      quiz: [
        { question: "Node.js 里用 mysql2 为什么推荐连接池？", options: ["池子更安全", "复用连接避免频繁创建销毁，支撑高并发", "连接池更快", "MySQL 要求"], answer: 1, explanation: "每次请求都新建连接会造成大量 TCP 握手开销，连接池让多个请求共享固定数量的连接。" },
        { question: "mongoose 的 populate 方法干什么的？", options: ["填充数据", "关联查询——把 ref 引用的文档自动查出来填进字段", "删除数据", "验证数据"], answer: 1, explanation: "populate 相当于 MongoDB 的 JOIN——把 ObjectId 引用换成实际文档对象。" },
        { question: "Prisma 相比原生驱动的最大优势是？", options: ["更快", "自动生成 TypeScript 类型——智能提示和编译检查", "更小", "只支持 MySQL"], answer: 1, explanation: "Prisma 从 schema 自动生成 TS 类型，查哪个字段写错了 IDE 直接飘红，大幅减少低级 bug。" },
        { question: "SQL 注入怎么防？", options: ["用更强的密码", "用参数化查询——占位符 ? 替代字符串拼接", "加密 SQL", "关掉数据库"], answer: 1, explanation: "千万别把用户输入拼进 SQL 字符串！用 ? 或 $1 占位符让驱动自动转义，从根上杜绝注入。" },
        { question: "MySQL 事务的 ACID 是什么意思？", options: ["四种 SQL 语句", "原子性、一致性、隔离性、持久性", "四种数据库", "四个用户权限"], answer: 1, explanation: "ACID 是事务的四大特性，保证一组操作要么全做要么全不做，数据不会半拉子坏掉。" },
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
    "js-closures": {
      slug: "js-closures",
      sections: [
        {
          title: "闭包是什么——函数记住了它的出生地",
          content: `闭包就是函数加上它被申明时所处的词法作用域的总和。说得再直白一点：内部函数把外部函数的变量「锁」在了自己肚子里，即使外部函数已经执行完了，内部函数还是能访问那些变量。`,
          code: `function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3
// count 变量不在全局，外面碰不到，只有返回的函数能碰`,
          language: "javascript",
        },
        {
          title: "词法作用域——代码写在哪就决定了作用域",
          content: `JavaScript 的作用域是静态的（词法的），你在哪写的变量就决定了谁能访问它。闭包之所以工作就是因为函数定义时就「记住」了周围可用的变量——不是说运行时才去找。`,
          code: `const name = "global";

function outer() {
    const name = "outer";
    function inner() {
        console.log(name);  // "outer"——看定义位置不是调用位置
    }
    inner();
}

outer();  // outer 不是 global`,
          language: "javascript",
        },
        {
          title: "闭包实战——私有变量和模块模式",
          content: `闭包最经典的应用就是造私有变量。JS 没有 private 关键字，闭包是实现私有变量的唯一原生方式。模块模式在 ES6 前就是靠闭包搞的。`,
          code: `// 用闭包做私有变量
const user = (function() {
    let _name = "张三";  // 私有

    return {
        getName() { return _name; },
        setName(name) {
            if (name.length > 0) _name = name;
        }
    };
})();

console.log(user.getName());  // "张三"
console.log(user._name);      // undefined——碰不到`,
          language: "javascript",
        },
        {
          title: "IIFE——立即执行函数表达式",
          content: `IIFE 是立即执行函数——定义的同时就执行了。它创造一个隔离的作用域避免变量污染全局。ES6 后有 let/const 块作用域和模块，IIFE 用得少了但理解它对于理解闭包很重要。`,
          code: `// IIFE——定义 + 执行一条龙
(function() {
    const secret = "只有我知道";
    console.log(secret);  // 打印
})();

// console.log(secret);  // ReferenceError——secret 只在 IIFE 里

// IIFE 带参数
const result = (function(n) {
    let total = 1;
    for (let i = 1; i <= n; i++) total *= i;
    return total;
})(5);
console.log(result);  // 120——5 的阶乘`,
          language: "javascript",
          tip: "循环里用 var 会全指向同一个值，用 let 自带块作用域或 IIFE 创独立作用域解决这个历史坑。",
        },
      ],
      quiz: [
        { question: "闭包的「闭包」闭住了什么？", options: ["函数本身", "函数 + 它定义位置的词法作用域——内部函数锁住外部变量", "全局对象", "参数列表"], answer: 1, explanation: "闭包把函数和它声明的环境绑在一起——内部函数能「回忆」外部函数的变量和 scope 链。" },
        { question: "词法作用域和动态作用域的根本区别？", options: ["一样", "词法看代码写在哪，动态看代码从哪调起", "动态更常用", "没有区别"], answer: 1, explanation: "词法作用域在定义时就确定了查找链，动态作用域在调用时动态解析。" },
        { question: "IIFE 的全称和作用？", options: ["延迟加载", "Immediately Invoked Function Expression——立即执行隔离作用域", "延迟执行", "异步加载"], answer: 1, explanation: "IIFE 定义同时执行——常用创建独立作用域避免变量泄露绑定打包。" },
        { question: "闭包在实际开发中干嘛用的？", options: ["只有一个作用", "私有变量、模块化、回调函数、定时器、事件绑定传递参数", "只用于排序", "替代 for 循环"], answer: 1, explanation: "闭包用途极广——封装私有变量、回调中保上下文、节流防抖、模块模式等都靠它。" },
        { question: "for (var i = 0; ...) 和闭包的经典坑怎么解决？", options: ["不能用", "let 块作用域——每轮循环有独立的 i 值", "用 const", "别用循环"], answer: 1, explanation: "var 是函数作用域所以所有回调共享同一个 i；let 块作用域每轮循环独立 i 值。" },
      ],
    },
    "js-prototype": {
      slug: "js-prototype",
      sections: [
        {
          title: "prototype——所有对象的共享属性来源",
          content: `JavaScript 是靠原型链实现继承的，不是传统 class 模式。每个函数都有 prototype 属性（只有函数有），每个对象都有内部 __proto__ 链接指向它的构造函数的 prototype。`,
          code: `function Dog(name) {
    this.name = name;
}

Dog.prototype.bark = function() {
    console.log(this.name + " 汪汪！");
};

const dog1 = new Dog("旺财");
const dog2 = new Dog("Black");
dog1.bark();  // 两个实例共享同一个 bark 方法
dog2.bark();`,
          language: "javascript",
        },
        {
          title: "__proto__——对象的实际原型链",
          content: `__proto__ 是每个对象指向它原型对象的引用，prototype 只是构造函数的一个属性。new 创建对象时会自动把 __proto__ 设成构造函数的 prototype。这才有了原型链。`,
          code: `const arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype);    // true
console.log(Array.prototype.__proto__ === Object.prototype);  // true
console.log(Object.prototype.__proto__);           // null

// 属性查找沿原型链往上走
const obj = { x: 1 };
obj.toString();  // 从 Object.prototype 继承的方法`,
          language: "javascript",
        },
        {
          title: "原型链——找属性的一路追踪",
          content: `当你访问 obj.prop 时 JS 在 obj 本身找，没找到顺着 __proto__ 往上查，一直到 Object.prototype 再没找到就 undefined。这就是原型链——每一段 __proto__ 连着前一个。`,
          code: `const parent = { parentProp: "我是爸爸的" };
const child = Object.create(parent);  // child.__proto__ = parent
child.childProp = "我是孩子的";

console.log(child.childProp);  // 在 child 上
console.log(child.parentProp); // 沿原型链向上找 parent
console.log(child.toString);   // 再向上到 Object.prototype`,
          language: "javascript",
        },
        {
          title: "class 语法糖——底层还是原型",
          content: `ES6 的 class 只是原型继承的语法糖——底层还是 constructor 函数 + prototype 链。class 让代码更好看但内部机制完全一样——instanceof、extends 都基于原型链。`,
          code: `class Animal {
    constructor(name) { this.name = name; }
    speak() { console.log(this.name + " 叫了"); }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    speak() { console.log(this.name + " 汪汪!"); }
}

const d = new Dog("Buddy", "金毛");
d.speak();  // Buddy 汪汪!

// class 的本质
console.log(typeof Dog);                      // "function"
console.log(d.__proto__ === Dog.prototype);   // true`,
          language: "javascript",
          tip: "Object.getPrototypeOf(obj) 是标准方式读原型替代直接读 __proto__（非标准但有浏览器支持）。",
        },
      ],
      quiz: [
        { question: "prototype 属性只有谁有？", options: ["所有对象", "只有函数有", "null", "数组"], answer: 1, explanation: "prototype 专属于函数——直接用 {} 或 new Object() 创建的对象没有 prototype 属性。" },
        { question: "__proto__ 和 prototype 是同一个东西吗？", options: ["一样", "__proto__ 是对象内部的真实原型引用，prototype 是构造函数的静态属性", "prototype 对象内部有 __proto__", "没有区别"], answer: 1, explanation: "prototype 是属于构造函数的一个属性——new 对象时它给新对象设 __proto__。" },
        { question: "ES6 class 和原型继承的关系？", options: ["完全新机制", "class 是语法糖——底层还是构造函数 + prototype + __proto__ 链", "class 替代了原型", "class 更快"], answer: 1, explanation: "class 只是让代码看起来像传统 OOP，内部 new、super、extends 全部基于原型和原型链。" },
        { question: "Object.create(null) 创建的对象有什么特点？", options: ["一样", "没有任何原型链——连 toString 方法都没有", "更快的对象", "不能删除"], answer: 1, explanation: "Object.create(null) 的 __proto__ 为 null——一个没有任何继承方法的纯对象，适合做 map 字典。" },
        { question: "原型链的终点是什么？", options: ["undefined", "null——Object.prototype.__proto__ 为 null", "Object", "window"], answer: 1, explanation: "原型链一路从 own property 到 constructor.prototype 到 Object.prototype.__proto__ 为 null 结束。" },
      ],
    },
    "js-event-loop": {
      slug: "js-event-loop",
      sections: [
        {
          title: "事件循环——JS 运行的心跳机制",
          content: `JavaScript 是单线程的，但为什么看起来能同时干多件事？靠的就是事件循环(event loop)。JS 引擎加一个消息队列，主线程执行完同步代码后去队列里取消息执行——这就是「异步」的本质。`,
          code: `console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

Promise.resolve().then(() => {
    console.log("3");
});

console.log("4");
// 输出: 1 4 3 2
// 为什么不是 1 4 2 3？——因为微任务(task)优先于宏任务(macrotask)`,
          language: "javascript",
        },
        {
          title: "宏任务 vs 微任务——两级队列",
          content: `每次事件循环从宏任务树领一件活干，执行完所有的微任务再拿下一件。宏任务：setTimeout、setInterval、I/O、UI render。微任务：Promise.then/catch/finally、MutationObserver、queueMicrotask。微任务先跑完才轮到下一个宏任务。`,
          code: `console.log("start");

setTimeout(() => console.log("宏任务1"), 0);
setTimeout(() => console.log("宏任务2"), 0);

Promise.resolve()
    .then(() => console.log("微任务1"))
    .then(() => console.log("微任务2"));

console.log("end");

// 输出: start end 微任务1 微任务2 宏任务1 宏任务2`,
          language: "javascript",
        },
        {
          title: "渲染时机——render 也排队",
          content: `浏览器每 16.6ms（60fps）刷新一次画面。渲染发生在每一轮事件循环结束后——前提是没有微任务一直产生新任务。这就是为什么你不应该在 Promise 里递归做无限循环——会卡死渲染。`,
          code: `// 危险写法——阻塞渲染
function blockingLoop() {
    Promise.resolve().then(() => {
        // 无限产生微任务——render 永远轮不到
        blockingLoop();
    });
}

// 安全写法——requestAnimationFrame 配合微任务
requestAnimationFrame(() => {
    // 在下一帧之前执行——不会错过渲染
});`,
          language: "javascript",
          tip: "requestAnimationFrame 是为渲染同步的最佳 API——在下一个渲染帧之前执行。微任务过多会挤占宏任务直到渲染延迟。",
        },
      ],
      quiz: [
        { question: "为什么 Promise.then 的代码比 setTimeout 先执行？", options: ["Promise 更快", "微任务优先级高于宏任务——宏任务回来前微任务清空", "Promise 是异步的", "随机"], answer: 1, explanation: "微任务在每一轮宏任务执行完后立即清空——setTimeout 是下一轮宏任务。" },
        { question: "哪些是微任务？", options: ["setTimeout", "Promise.then/catch/finally + queueMicrotask", "setInterval", "I/O"], answer: 1, explanation: "Promise.then 和 queueMicrotask 是微任务。setTimeout/setInterval 属于宏任务。" },
        { question: "requestAnimationFrame 和 setTimeout 零秒哪个先跑？", options: ["setTimeout", "rAF——浏览器保证在下一帧渲染前执行", "两个同时", "随机"], answer: 1, explanation: "rAF 专门绑定渲染周期——确保在下次浏览器重绘前执行，比 setTimeout 更接近渲染自然节奏。" },
        { question: "事件循环中在下一帧前最多能执行多少个宏任务？", options: ["无限", "一个——一个宏任务后清空所有微任务然后可能 render", "两个", "三个"], answer: 1, explanation: "每轮循环拿一个宏任务执行 → 清空微任务队列 → 如果需要渲染就 render → 继续下一轮。" },
        { question: "微任务导致渲染卡死的原因？", options: ["不会", "微任务中递归创建新微任务——永远清不完，渲染轮不到", "微任务只在 node 中", "微任务是同步"], answer: 1, explanation: "微任务执行过程中新创建的微任务就在同一轮清掉——无限产生微任务会让宏任务和渲染永远等不到。" },
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
    "react-state": {
      slug: "react-state",
      sections: [
        {
          title: "React 状态管理——数据怎么存怎么传",
          content: `React 组件的数据分两种：props（别人传给你的，只读）和 state（你自己管的数据，可改）。简单页面直接在组件里 useState 就够用了。但当多个组件需要共享同一份数据时——比如用户登录信息、购物车——就需要状态管理方案。

三种主流方案从小到大：
useState + props 传参——适合组件少、数据流简单的场景
Context API + useReducer——React 自带，适合中型应用，多个组件需要访问同一数据
Zustand——第三方轻量库，写法最爽、性能最好、侵入性最低`,
        },
        {
          title: "Context API——跨组件共享数据",
          content: `Context 解决的是 props 层层传递的痛点。不用 Context 的话，爷爷要传数据给孙子，得先经过爸爸，爸爸只是当个搬运工：`,
          code: `import { createContext, useContext, useState } from 'react';

// 1. 创建 Context
const ThemeContext = createContext(null);

// 2. Provider——在外层包住需要共享数据的组件
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  );
}

// 3. 任何后代组件直接用
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <header>
      当前主题：{theme}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换
      </button>
    </header>
  );
}`,
          language: "tsx",
          tip: "Context 值一变，所有用到它的组件都重渲染。别把所有状态扔一个 Context，按业务拆分——比如分 ThemeContext 和 UserContext。",
        },
        {
          title: "useReducer——复杂状态逻辑",
          content: `useState 适合简单状态，但当状态逻辑复杂——比如多种操作、状态间相互依赖——useReducer 更好维护。它跟 Redux 一个思路但 React 自带：`,
          code: `import { useReducer } from 'react';

// Reducer——纯函数，接收旧状态 + action，返回新状态
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload], total: state.total + action.payload.price };
    case 'REMOVE_ITEM':
      const newItems = state.items.filter(item => item.id !== action.payload);
      const newTotal = newItems.reduce((sum, item) => sum + item.price, 0);
      return { ...state, items: newItems, total: newTotal };
    case 'CLEAR':
      return { items: [], total: 0 };
    default:
      return state;
  }
}

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <div>
      <p>共 {cart.items.length} 件，总价 {cart.total}</p>
      <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: { id: 1, name: '键盘', price: 299 } })}>
        添加键盘 (299)
      </button>
      <button onClick={() => dispatch({ type: 'CLEAR' })}>清空</button>
    </div>
  );
}`,
          language: "tsx",
          tip: "reducer 必须是纯函数——同样的输入一定同样的输出，不要在里面调 API、改外部变量，把副作用放在 dispatch 之前处理。",
        },
        {
          title: "Zustand——最简状态管理",
          content: `Zustand 是这几年最火的小巧状态管理库。跟 Redux 比少了一大堆模板代码，写起来跟 useState 一样顺滑。没有 Provider、没有 Action Type 常量、一个函数搞定：`,
          code: `import { create } from 'zustand';

// 一个 store 就是一个自定义 hook
const useUserStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  login: (userData) => set({ user: userData, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  updateName: (name) => set((state) => ({ user: { ...state.user, name } })),
}));

// 组件里直接用——爽
function Profile() {
  const user = useUserStore((s) => s.user);
  const login = useUserStore((s) => s.login);
  const logout = useUserStore((s) => s.logout);

  if (!user) return <button onClick={() => login({ name: '张三' })}>登录</button>;
  return (
    <div>
      <p>欢迎, {user.name}</p>
      <button onClick={logout}>退出</button>
    </div>
  );
}`,
          language: "tsx",
          tip: "Zustand 默认不用 Provider，store 是模块级单例。如果需要隔离（比如多个独立实例），用 createStore 配合 Provider 模式。",
        },
      ],
      quiz: [
        { question: "Context API 主要解决什么问题？", options: ["性能优化", "跨组件共享数据避免 props 逐层传递", "样式管理", "路由"], answer: 1, explanation: "Context 让数据跨过中间组件直接传到底，不用一层层当搬运工。" },
        { question: "useReducer 和 useState 的区别？", options: ["完全一样", "useReducer 适合复杂状态逻辑——多种操作集中管", "useReducer 更快", "useState 不能存对象"], answer: 1, explanation: "useReducer 把状态更新逻辑集中进 reducer 函数里，dispatch 触发，结构清晰适合复杂场景。" },
        { question: "Zustand 相比 Redux 的最大优点？", options: ["功能更多", "零模板代码——一个函数创建 store，直接 hook 使用", "性能更高", "只能用在 React"], answer: 1, explanation: "Zustand 没有 Provider、Action Type、Reducer 这些概念，极其简洁，新手十分钟上手。" },
        { question: "Reducer 函数为什么要纯函数？", options: ["习惯", "同样的输入必同样的输出——利于调试、测试和状态预测", "运行更快", "React 限制"], answer: 1, explanation: "纯函数保证状态变化的可预测性，加了副作用就难排查 bug 了。" },
      ],
    },
    "react-router": {
      slug: "react-router",
      sections: [
        {
          title: "React Router v6 安装与基础配置",
          content: `单页应用需要在不同「页面」之间切换，但又不重新加载整个页面。React Router 负责管理浏览器地址栏和页面内容之间的映射关系：`,
          code: `// 安装：npm install react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// 从 v6 开始，Route 必须包在 Routes 里，element 代替了 component
// BrowserRouter 用 HTML5 history API，HashRouter 用 hash（兼容老浏览器）`,
          language: "tsx",
        },
        {
          title: "导航与参数传递",
          content: `页面跳转用 Link 或 useNavigate。获取 URL 参数或查询字符串用 useParams 和 useSearchParams：`,
          code: `import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

// 声明式导航——Link
<Link to="/about">关于我们</Link>
<Link to="/user/123">用户 123</Link>

// 编程式导航——useNavigate
const navigate = useNavigate();
navigate('/login');
navigate(-1);   // 回上一页
navigate('/user/123', { replace: true });  // 替换当前历史而非追加

// 获取路径参数
// URL: /user/123 → path="/user/:id"
function UserProfile() {
  const { id } = useParams();
  return <p>用户 ID: {id}</p>;
}

// 获取查询参数
// URL: /search?q=react&page=2
function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  // 更新查询参数
  setSearchParams({ q: 'vue', page: '1' });
  return <p>搜索: {query}, 第 {page} 页</p>;
}`,
          language: "tsx",
        },
        {
          title: "嵌套路由与布局",
          content: `嵌套路由让你在不刷新整页的情况下切换局部内容——比如后台管理系统的左侧菜单不变，只换右侧内容：`,
          code: `// 定义嵌套路由
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />        {/* /dashboard */}
    <Route path="analytics" element={<Analytics />} />   {/* /dashboard/analytics */}
    <Route path="settings" element={<Settings />} />     {/* /dashboard/settings */}
  </Route>
</Routes>

// DashboardLayout——用 Outlet 渲染子路由的内容
import { Outlet, NavLink } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="dashboard">
      <nav>
        <NavLink to="." end>首页</NavLink>
        <NavLink to="analytics">数据</NavLink>
        <NavLink to="settings">设置</NavLink>
      </nav>
      <main>
        <Outlet />  {/* 子路由内容在这里渲染 */}
      </main>
    </div>
  );
}

// index 路由——当路径精确匹配父路径时渲染
// NavLink 的 end 属性——避免父路径一直处于激活状态`,
          language: "tsx",
        },
        {
          title: "路由守卫——权限控制",
          content: `实际项目里不是所有页面谁都能看——需要登录验证、角色校验。路由守卫就是这些「看门人」：`,
          code: `import { Navigate, useLocation } from 'react-router-dom';

// 要求登录的守卫
function RequireAuth({ children }) {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    // 记住当前地址，登录后跳回来
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// 使用——把要保护的页面包起来
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={
    <RequireAuth>
      <DashboardLayout />
    </RequireAuth>
  }>
    <Route index element={<DashboardHome />} />
  </Route>
</Routes>

// Login 组件登录成功后跳回
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async () => {
    // ...登录逻辑
    navigate(from, { replace: true });
  };
}`,
          language: "tsx",
          tip: "location.state 传参是 React Router 的特色——不同页面间传数据不经过 URL，适合传一些敏感或复杂数据。",
        },
      ],
      quiz: [
        { question: "React Router v6 中定义路由必须包在什么组件里？", options: ["Switch", "Routes", "RouterGroup", "RouteGroup"], answer: 1, explanation: "v6 里 Switch 被 Routes 取代了，Route 必须放在 Routes 里面。" },
        { question: "useParams 的作用是？", options: ["获取查询参数", "获取路径参数——如 /user/:id 里的 id", "修改路由", "跳转"], answer: 1, explanation: "useParams 返回路径中的动态参数，如 :id 在 URL 中的实际值。" },
        { question: "嵌套路由中，子路由的内容在哪渲染？", options: ["自动放父组件最前面", "在父组件里用 Outlet 占位——子路由内容就填那", "替换父组件", "新开页面"], answer: 1, explanation: "Outlet 是嵌套路由的渲染出口，子路由匹配到的组件自动渲染到 Outlet 的位置。" },
        { question: "路由守卫失败了怎么让用户跳到登录页？", options: ["手动改地址栏", "返回 Navigate 组件——自动重定向", "刷新页面", "报警"], answer: 1, explanation: "Navigate 组件渲染后自动跳转，传 state 还能把原始地址带过去，登录后跳回来。" },
      ],
    },
    "react-performance": {
      slug: "react-performance",
      sections: [
        {
          title: "React 性能优化——为什么组件没完没了渲染",
          content: `React 的默认行为：父组件渲染，子组件也跟着渲染——哪怕子组件的数据没变。这在小型应用里无所谓，但组件多了、数据复杂了就会卡顿。

优化的核心思路：让没变化的组件跳过渲染。React 提供了几个工具帮你做这件事。`,
        },
        {
          title: "React.memo——组件级跳过渲染",
          content: `React.memo 把组件包起来，当 props 没变时跳过纯重新渲染。相当于告诉 React：这个组件很纯，输入不变就别折腾了：`,
          code: `import { memo } from 'react';

// 普通组件——父组件每次渲染，子组件也会渲染
function ExpensiveList({ items }) {
  // 复杂的列表渲染...
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}

// memo 包裹——只有 items 引用变了才重新渲染
const ExpensiveList = memo(function ExpensiveList({ items }) {
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
});

// 自定义比较——默认浅比较，特殊需求自己写
const ExpensiveList = memo(
  function ExpensiveList({ items, filters }) {
    // ...
  },
  (prevProps, nextProps) => {
    // 返回 true 表示相同——不渲染
    return prevProps.items.length === nextProps.items.length;
  }
);`,
          language: "tsx",
          warning: "memo 不是免费的——它需要做 props 比较。给每个组件都套 memo 反而可能更慢。只给渲染昂贵的组件用。",
        },
        {
          title: "useMemo 与 useCallback——缓存值和函数",
          content: `useMemo 缓存计算结果——依赖没变就返回上次的结果，避免每次渲染都重算。useCallback 缓存函数引用——避免把新函数传给子组件导致无谓的重新渲染：`,
          code: `import { useMemo, useCallback, useState } from 'react';

function ProductList({ products, sortBy }) {
  const [filter, setFilter] = useState('');

  // 只有 products 或 sortBy 变了才重新排序——filter 变不触发重算
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return a.name.localeCompare(b.name);
    });
  }, [products, sortBy]);

  // 只有 setFilter 的调用方式变了才缓存（实际上不会变）
  // 但传给 memo 子组件时保持不变，避免子组件无谓渲染
  const handleClick = useCallback((id) => {
    setFilter(prev => prev === id ? '' : id);
  }, []);

  return (
    <ul>
      {sortedProducts.map(p => (
        <ProductItem key={p.id} product={p} onClick={handleClick} />
      ))}
    </ul>
  );
}`,
          language: "tsx",
          tip: "useMemo 和 useCallback 只应该在确实有性能问题时才用。React 的默认行为在大多数场景下足够快，过早优化是万恶之源。",
        },
        {
          title: "Lazy Loading——按需加载",
          content: `首屏加载慢的一大原因是把所有页面代码都打到一起了。React.lazy 让你按需加载——用户访问某个页面时才加载该页面的代码：`,
          code: `import { lazy, Suspense } from 'react';

// 动态导入——用到才加载
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}

// Suspense 的 fallback 是加载时的占位 UI
// 你也可以包多个 Suspense 放在不同粒度

// Vite / Webpack 打包时会把动态 import 的模块自动拆成独立文件`,
          language: "tsx",
          tip: "lazy 只对默认导出的组件生效。如果组件是命名导出的，需要在中间模块转一下。",
        },
      ],
      quiz: [
        { question: "React.memo 的作用是什么？", options: ["记住组件状态", "props 没变时跳过子组件渲染", "缓存数据", "延迟加载"], answer: 1, explanation: "memo 浅比较 props，没变化就跳过本次渲染——适合纯展示型的大列表组件。" },
        { question: "useMemo 和 useCallback 的区别？", options: ["完全一样", "useMemo 缓存计算结果，useCallback 缓存函数引用", "useCallback 缓存数据", "useMemo 缓存函数"], answer: 1, explanation: "useMemo 回缓存值——数组过滤排序结果；useCallback 回缓存函数——传函数给 memo 子组件时保持不变。" },
        { question: "React.lazy 配合什么组件使用？", options: ["ErrorBoundary", "Suspense", "Fragment", "StrictMode"], answer: 1, explanation: "lazy 组件必须用 Suspense 包着，加载时显示 fallback 内容。" },
        { question: "memo 给所有组件都套上好还是只有部分？", options: ["全套上最好", "只给确实昂贵的组件用——遍地的 memo 比较成本可能超过渲染成本", "不需要用", "看心情"], answer: 1, explanation: "memo 本身也有 props 比较开销。给轻量组件套 memo 得不偿失，优先优化渲染重的。" },
      ],
    },
    "react-testing": {
      slug: "react-testing",
      sections: [
        {
          title: "React Testing Library 入门",
          content: `React Testing Library（RTL）是 React 官方推荐的测试工具。它的核心理念是「测试行为，不测试实现」——别管组件内部怎么写的，只管用户看到什么、点了按钮有什么反应。

Jest 是测试框架（跑测试、断言），RTL 是辅助工具（渲染组件、模拟用户操作）。两者搭配使用。`,
        },
        {
          title: "渲染与查询",
          content: `RTL 用 render 把组件渲染到虚拟 DOM 里，然后用查询方法找到页面元素。查询方法按推荐的顺序：getByRole > getByLabelText > getByText > getByTestId：`,
          code: `import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('显示问候语', () => {
  render(<Greeting name="张三" />);

  // 按文本查找
  expect(screen.getByText('你好, 张三')).toBeInTheDocument();

  // 按角色查找
  const button = screen.getByRole('button', { name: '提交' });
  expect(button).toBeInTheDocument();

  // 按 label 查找表单元素
  const emailInput = screen.getByLabelText('邮箱');
  expect(emailInput).toBeInTheDocument();

  // 按 testid 查找（最后手段）
  expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
});`,
          language: "tsx",
          tip: "getByRole 是最推荐的查询方式——最接近用户实际感知，也最有利于可访问性。getByTestId 是最后的备用手段。",
        },
        {
          title: "模拟用户操作——fireEvent 与 userEvent",
          content: `找到元素后就要模拟用户操作：点击、输入、提交。userEvent 比 fireEvent 更贴近真实用户行为（比如点击前先 hover、输入时触发完整的事件序列）：`,
          code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

test('填写并提交登录表单', async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  // 模拟输入
  await userEvent.type(screen.getByLabelText('用户名'), 'admin');
  await userEvent.type(screen.getByLabelText('密码'), '123456');

  // 模拟点击
  await userEvent.click(screen.getByRole('button', { name: '登录' }));

  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'admin',
    password: '123456'
  });
});

test('空提交时显示错误', async () => {
  render(<LoginForm onSubmit={jest.fn()} />);

  await userEvent.click(screen.getByRole('button', { name: '登录' }));

  expect(screen.getByText('用户名不能为空')).toBeInTheDocument();
});`,
          language: "tsx",
        },
        {
          title: "异步操作与 Mock",
          content: `组件里调 API 是家常便饭，测试时不能真去调后端——用 jest.mock 把 API 模块替换掉：`,
          code: `import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserList from './UserList';

// Mock API 模块
jest.mock('../api', () => ({
  fetchUsers: jest.fn(() => Promise.resolve([
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
  ]))
}));

test('加载并显示用户列表', async () => {
  render(<UserList />);

  // 等待异步数据加载完成
  await waitFor(() => {
    expect(screen.getByText('张三')).toBeInTheDocument();
    expect(screen.getByText('李四')).toBeInTheDocument();
  });
});

test('加载失败时显示错误', async () => {
  const { fetchUsers } = require('../api');
  fetchUsers.mockRejectedValueOnce(new Error('网络错误'));

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText('加载失败')).toBeInTheDocument();
  });
});`,
          language: "tsx",
          tip: "waitFor 会不断重试直到断言通过或超时。处理异步渲染的利器，比写 setTimeout 优雅多了。",
        },
      ],
      quiz: [
        { question: "React Testing Library 推荐用哪种查询？", options: ["getByTestId", "getByRole", "querySelector", "直接操作 DOM"], answer: 1, explanation: "getByRole 最贴近用户实际交互方式，也是无障碍性最好的查询方式。" },
        { question: "userEvent 和 fireEvent 的区别？", options: ["完全一样", "userEvent 模拟更真实的用户操作——包含完整事件序列", "fireEvent 更强", "userEvent 更慢"], answer: 1, explanation: "userEvent 会触发完整事件链（如点击包含 hover、focus、click），比 fireEvent 更接近真实用户行为。" },
        { question: "waitFor 的作用？", options: ["等待一定时间", "不断重试直到条件满足——处理异步渲染", "阻止渲染", "暂停测试"], answer: 1, explanation: "waitFor 接受回调，反复执行直到回调不抛错或超时，是等异步 UI 更新的首选方案。" },
        { question: "测试中怎么模拟 API 调用？", options: ["真去调后端", "用 jest.mock 替换 API 模块返回假数据", "关闭网络", "跳过不测"], answer: 1, explanation: "jest.mock 把模块整体替换，返回可控的假数据——测组件逻辑而不依赖后端。" },
      ],
    },
    "vue-router": {
      slug: "vue-router",
      sections: [
        {
          title: "Vue Router 路由配置",
          content: `Vue Router 是 Vue 官方的路由库。跟 React Router 同理——管理地址栏和页面之间的映射，支持懒加载、嵌套路由、导航守卫：`,
          code: `// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),   // 懒加载
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('@/views/User.vue'),
    props: true,  // 把 params 当 props 传给组件
  },
  {
    path: '/dashboard',
    component: () => import('@/views/DashboardLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('@/views/DashboardHome.vue') },
      { path: 'analytics', name: 'analytics', component: () => import('@/views/Analytics.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;`,
          language: "javascript",
        },
        {
          title: "导航与参数获取",
          content: `Vue 里跳转页面用 router-link 或 router.push，获取参数用 useRoute。模板和逻辑两种方式：`,
          code: `<!-- 模板中声明式导航 -->
<router-link to="/about">关于我们</router-link>
<router-link :to="{ name: 'user', params: { id: 123 } }">用户 123</router-link>

<!-- 子路由的出口 -->
<router-view />

<!-- 编程式导航 -->
<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 跳转
router.push('/login');
router.push({ name: 'user', params: { id: 456 } });
router.replace({ path: '/home' });   // 替换历史
router.go(-1);  // 后退

// 获取参数
console.log(route.params.id);        // 路径参数
console.log(route.query.search);     // ?search=xxx
</script>`,
          language: "html",
        },
        {
          title: "导航守卫——权限控制",
          content: `Vue Router 的导航守卫在跳转前后执行逻辑——最常用的是全局前置守卫 beforeEach，用来检查登录状态：`,
          code: `import { createRouter } from 'vue-router';

const router = createRouter({ ... });

// 全局前置守卫——每次跳转前走一遭
router.beforeEach((to, from, next) => {
  // 登录验证
  const isLoggedIn = localStorage.getItem('token');

  if (to.meta.requiresAuth && !isLoggedIn) {
    // 没登录想去需要权限的页面——踹去登录
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (to.name === 'login' && isLoggedIn) {
    // 已登录还去登录页——直接送后台
    next({ name: 'dashboard' });
  } else {
    next();  // 放行
  }
});

// 路由定义中加元信息
const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },   // 需要登录
    children: [...]
  },
];

// 组件内部守卫——离开前确认
<script setup>
import { onBeforeRouteLeave } from 'vue-router';
onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges.value) {
    return window.confirm('有未保存的更改，确定离开吗？');
  }
});
</script>`,
          language: "javascript",
          tip: "next() 放行的时机很重要——异步操作（如验证 token）完成后再调 next，别还没验完就放行。",
        },
        {
          title: "动态路由——权限路由",
          content: `后台系统常有不同角色看到不同菜单的需求。动态路由在登录后根据用户角色动态添加路由：`,
          code: `// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 静态路由——所有人都能访问
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
  ],
});

// 动态添加路由——登录后调用
export function addDynamicRoutes(role) {
  if (role === 'admin') {
    router.addRoute({
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: 'users', component: UserManagement },
        { path: 'settings', component: SystemSettings },
      ],
    });
  }

  router.addRoute({
    path: '/profile',
    component: UserProfile,
  });
}

// 重置路由（退出时）
export function resetRouter() {
  const routes = router.getRoutes();
  routes.forEach(route => {
    if (route.name) router.removeRoute(route.name);
  });
}`,
          language: "javascript",
          tip: "退出登录后得把动态路由清掉——否则新用户可能看到上个用户的菜单。用 removeRoute 或重新创建 router 实例。",
        },
      ],
      quiz: [
        { question: "Vue Router 全局前置守卫是哪个钩子？", options: ["beforeEnter", "beforeEach", "beforeResolve", "afterEach"], answer: 1, explanation: "router.beforeEach 是全局前置守卫——每次路由跳转前都先走这。" },
        { question: "route.params 和 route.query 的区别？", options: ["一样", "params 是路径参数 /:id，query 是查询字符串 ?key=value", "query 是路径参数", "params 是 POST 数据"], answer: 1, explanation: "params 嵌在 URL 路径里（/user/123），query 跟在 ? 后面（/user?name=张三）。" },
        { question: "next() 在导航守卫中的作用？", options: ["跳到下一页", "确认导航——放行或重定向", "停止导航", "刷新页面"], answer: 1, explanation: "next 决定导航去向——next() 放行，next('/login') 重定向，next(false) 取消。" },
        { question: "router.addRoute 能做什么？", options: ["删除路由", "动态添加路由——按角色按需加载菜单页面", "修改路由", "重置路由"], answer: 1, explanation: "addRoute 根据用户权限动态注册路由，实现不同角色不同菜单。" },
      ],
    },
    "vue-pinia": {
      slug: "vue-pinia",
      sections: [
        {
          title: "Pinia——Vue 官方状态管理",
          content: `Pinia 是 Vue 3 官方推荐的状态管理库，代替了老一代的 Vuex。语法更简洁，完美支持 TypeScript，没有 mutations 的概念——直接用 actions 改状态就完事了。

Store 就是存储数据的仓库。每个 store 是一个独立的模块，按功能拆分（用户 store、购物车 store、主题 store），各管各的互不干扰。`,
        },
        {
          title: "定义和使用 Store",
          content: `setup 风格的 store 写起来最像 Composition API——ref 是状态，函数是 actions，computed 是 getters：`,
          code: `// stores/user.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  // State——用 ref
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || '');

  // Getters——用 computed
  const isLoggedIn = computed(() => !!token.value);
  const userName = computed(() => user.value?.name || '未登录');

  // Actions——普通函数，可以异步
  async function login(email, password) {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    user.value = data.user;
    token.value = data.token;
    localStorage.setItem('token', data.token);
  }

  function logout() {
    user.value = null;
    token.value = '';
    localStorage.removeItem('token');
  }

  return { user, token, isLoggedIn, userName, login, logout };
});`,
          language: "javascript",
          tip: "setup 风格是社区最爱——跟 Composition API 无缝衔接。Options 风格更接近 Vuex 老用户习惯。两种风格都能用，选自己顺手的。",
        },
        {
          title: "在组件中使用",
          content: `组件里用 store 极其简单——调 useXxxStore 拿到实例，直接访问属性和方法。响应式自动绑定：`,
          code: `<!-- UserProfile.vue -->
<script setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

// 解构时用 storeToRefs 保持响应式——直接解构会丢失响应性
const { user, isLoggedIn, userName } = storeToRefs(userStore);

// actions 可以直接解构——它们是函数，不需要响应式
const { login, logout } = userStore;

async function handleLogin() {
  await login('test@example.com', '123456');
}
</script>

<template>
  <div v-if="isLoggedIn">
    <p>欢迎, {{ userName }}</p>
    <button @click="logout">退出</button>
  </div>
  <div v-else>
    <button @click="handleLogin">登录</button>
  </div>
</template>`,
          language: "html",
          tip: "store 解构属性时记得用 storeToRefs()——它把 store 里的属性包装成 ref，避免丢掉响应式。只有 actions 可以直接解构。",
        },
        {
          title: "多 Store 互相调用",
          content: `大型应用中 store 之间需要互相调用——比如购物车 store 需要知道用户是否登录。Pinia 允许 store 引用别的 store：`,
          code: `// stores/cart.js
import { defineStore } from 'pinia';
import { useUserStore } from './user';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const userStore = useUserStore();  // 引用另一个 store

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  function addToCart(product) {
    if (!userStore.isLoggedIn) {
      throw new Error('请先登录');
    }
    items.value.push(product);
  }

  // 退出时清空购物车——监听 isLoggedIn 的变化
  watch(() => userStore.isLoggedIn, (loggedIn) => {
    if (!loggedIn) items.value = [];
  });

  return { items, totalPrice, addToCart };
});`,
          language: "javascript",
          tip: "store 之间交叉引用要注意循环依赖。如果 A 引用 B 且 B 引用 A，重构逻辑抽到第三个 store 里。",
        },
      ],
      quiz: [
        { question: "Pinia 中 state、getters、actions 分别对应什么？", options: ["数据、异步函数、计算属性", "数据（ref）、计算属性（computed）、方法（函数）", "跟 Vuex 一样", "没有区别"], answer: 1, explanation: "setup 风格里 ref 是 state，computed 是 getters，普通函数（可异步）是 actions。" },
        { question: "storeToRefs 干嘛用的？", options: ["创建 store", "解构 store 属性时保持响应式", "销毁 store", "重置 store"], answer: 1, explanation: "直接解构 store 的 state/getters 会失去响应式，storeToRefs 包装成 ref 保持响应式。" },
        { question: "Pinia 里怎么做异步请求？", options: ["单独的 mutations", "在 actions 里写 async/await", "只能同步", "用插件"], answer: 1, explanation: "Pinia 没有 mutations，异步操作直接在 actions 里 async/await，简洁明了。" },
        { question: "Pinia 和 Vuex 最大的区别？", options: ["Pinia 更快", "Pinia 没有 mutations——直接在 actions 改状态，体积更小 API 更简", "Vuex 更好", "完全一样"], answer: 1, explanation: "Pinia 移除了 mutations 概念，actions 直接操作 state，配合 Composition API 写起来非常清爽。" },
      ],
    },
    "vue-components": {
      slug: "vue-components",
      sections: [
        {
          title: "组件通信——Props 和 Emits",
          content: `Vue 组件通信的核心就两件事：父传子用 props，子传父用 emits。这是 Vue 单向数据流的体现——数据总是从父流向子，子要改数据得通知父去改。
比喻：老爸给儿子零花钱（props），儿子花完了不能说老爸钱包直接少了——得跟老爸说「我花完了」（emit），老爸自己掏钱包。`,
        },
        {
          title: "Props——父传子",
          content: `props 就像函数的参数——父组件传什么，子组件显示什么。Vue 支持类型校验和默认值：`,
          code: `<!-- 子组件 ProductCard.vue -->
<script setup>
const props = defineProps({
  product: { type: Object, required: true },
  discount: { type: Number, default: 0 },
  onSale: { type: Boolean, default: false },
});

// 模板里直接访问 props.product.name
// script 里也可以用 props.product 访问
</script>

<template>
  <div class="card" :class="{ sale: onSale }">
    <h3>{{ product.name }}</h3>
    <p>原价: ¥{{ product.price }}</p>
    <p v-if="discount > 0">折后: ¥{{ product.price - discount }}</p>
  </div>
</template>

<!-- 父组件 -->
<ProductCard
  :product="{ name: '键盘', price: 399 }"
  :discount="50"
  :on-sale="true"
/>`,
          language: "html",
        },
        {
          title: "Emits——子传父",
          content: `子组件通知父组件用 emit。就像按门铃——你按一下，里面的人听到了来决定开不开门：`,
          code: `<!-- 子组件 Counter.vue -->
<script setup>
const props = defineProps({ count: Number });
const emit = defineEmits(['update', 'reset']);

function increment() {
  emit('update', props.count + 1);
}
</script>

<template>
  <div>
    <span>{{ count }}</span>
    <button @click="increment">+1</button>
    <button @click="emit('reset')">清零</button>
  </div>
</template>

<!-- 父组件 -->
<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>

<template>
  <Counter :count="count" @update="count = $event" @reset="count = 0" />
</template>

<!-- v-model 语法糖——简化 emit update -->
<!-- 约定：prop 叫 modelValue，emit 叫 update:modelValue -->
<Counter v-model="count" />
<!-- 等于 <Counter :modelValue="count" @update:modelValue="count = $event" /> -->
`,
          language: "html",
        },
        {
          title: "Slots——内容分发",
          content: `props 能传数据，但传不了整段 HTML。想让父组件把内容「塞」进子组件的某个位置，就要用 slot——子组件留空位，父组件填内容：`,
          code: `<!-- 子组件 Modal.vue——留了多个插槽 -->
<template>
  <div class="modal">
    <header>
      <slot name="header">默认标题</slot>
    </header>
    <main>
      <slot>默认内容</slot>
    </main>
    <footer>
      <slot name="footer">
        <button @click="$emit('close')">关闭</button>
      </slot>
    </footer>
  </div>
</template>

<!-- 父组件——用 template 填充具名插槽 -->
<Modal @close="showModal = false">
  <template #header>
    <h2>确认删除</h2>
  </template>

  <p>你确定要删除这个商品吗？操作不可撤销。</p>

  <template #footer>
    <button @click="showModal = false">取消</button>
    <button class="danger" @click="handleDelete">确认删除</button>
  </template>
</Modal>`,
          language: "html",
          tip: "默认插槽（没有 name 的）直接用内容填充。具名插槽用 #slotName 简写（就是 v-slot:slotName 的语法糖）。",
        },
        {
          title: "Provide / Inject——跨层传数据",
          content: `props 一层层传太累了——爷爷传孙子得经过爸爸。provide/inject 直接从祖先提供给后代，绕过中间组件：`,
          code: `<!-- 祖先组件——提供数据 -->
<script setup>
import { provide, ref } from 'vue';

const theme = ref('light');
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

// 提供响应式数据
provide('theme', theme);
provide('toggleTheme', toggleTheme);
</script>

<!-- 孙子组件——注入数据，不用管中间隔了多少层 -->
<script setup>
import { inject } from 'vue';

const theme = inject('theme');
const toggleTheme = inject('toggleTheme');
</script>

<template>
  <p>当前主题: {{ theme }}</p>
  <button @click="toggleTheme">切换</button>
</template>`,
          language: "html",
          tip: "provide/inject 适合主题、语言、用户信息这种全局数据。不要滥用——数据流向不直观，排查问题时不好找来源。",
        },
      ],
      quiz: [
        { question: "Vue 中父传子用什么？", options: ["emit", "props", "slots", "provide"], answer: 1, explanation: "props 是父组件传给子组件的属性，子组件声明接收。" },
        { question: "子组件通知父组件数据变化用什么？", options: ["props", "emit", "直接改 props", "provide"], answer: 1, explanation: "子组件不能直接改 props，必须通过 emit 通知父组件去改——保持单向数据流。" },
        { question: "具名插槽的简写是什么？", options: ["#slotName", "v-slot:slotName → #slotName", "@slotName", ":slotName"], answer: 1, explanation: "v-slot:header 简写为 #header，代码更简洁。" },
        { question: "provide/inject 相比 props 的优缺点？", options: ["都一样", "跨层传数据方便但数据流向不直观排查困难", "props 更好用", "provide 更快"], answer: 1, explanation: "provide/inject 省去中间传递，但数据来源不明确——适合全局配置，复杂交互还是用 props/emit。" },
      ],
    },
    "css-responsive": {
      slug: "css-responsive",
      sections: [
        {
          title: "响应式设计——适配所有屏幕",
          content: `现在用户访问网站的设备五花八门——手机、平板、笔记本、大显示器。响应式设计的目标就是一个网站在各种屏幕上都能好好显示。

核心三件套：media query（媒体查询——根据不同屏幕宽度写不同样式）、相对单位（rem/vw/%，不用固定 px）、弹性布局（flex/grid 自动适应）。`,
        },
        {
          title: "Media Query——给不同屏幕写不同样式",
          content: `媒体查询就是「如果屏幕宽度满足某个条件，就用这套样式」。常见写法是移动端优先（先写手机样式，再逐步加强到大屏）：`,
          code: `/* 基础样式——移动端优先（最小的屏幕） */
.container {
  padding: 10px;
  font-size: 14px;
}

/* 平板及以上 >= 768px */
@media (min-width: 768px) {
  .container {
    padding: 20px;
    font-size: 16px;
  }
}

/* 桌面 >= 1024px */
@media (min-width: 1024px) {
  .container {
    padding: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* 常用断点：
   手机: < 768px
   平板: >= 768px
   笔记本: >= 1024px
   大屏: >= 1440px
*/

/* 也可以用 max-width——桌面端优先，逐步简化 */
@media (max-width: 767px) {
  .sidebar { display: none; }  /* 手机端隐藏侧栏 */
}`,
          language: "css",
          tip: "移动端优先写的 CSS 更精简——基础样式就是手机版，大屏再追加。反过来桌面优先的话手机得覆盖一大堆样式。",
        },
        {
          title: "rem 与 vw——告别写死 px",
          content: `固定 px 是响应式的大忌。rem 相对于根元素（html）的字体大小——改一行代码全局缩放。vw 是视口宽度的百分比，随浏览器窗口大小自动变：`,
          code: `/* rem——相对根元素字体 */
html {
  font-size: 16px;  /* 基准 */
}

.box {
  width: 10rem;     /* = 160px */
  font-size: 1.5rem; /* = 24px */
}

/* 在媒体查询中改根字体——所有 rem 单位自动缩放 */
@media (max-width: 767px) {
  html { font-size: 14px; }  /* 手机端整体缩小 */
}

/* vw/vh——视口单位的百分比 */
.hero {
  height: 60vh;  /* 占视口高度的 60% */
  width: 100vw;  /* 占视口宽度的 100% */
  font-size: clamp(1rem, 4vw, 3rem); /* 随视口缩放但限制范围 */
}

/* %——相对于父元素的百分比 */
.child { width: 50%; }  /* 父元素宽度的一半 */`,
          language: "css",
          tip: "clamp(最小值, 首选值, 最大值) 是响应式字体的神器——在小屏不会太小，大屏不会太大，中间自动缩放。",
        },
        {
          title: "移动端适配——viewport 与触摸",
          content: `移动端有自己的讲究——不仅要视觉适配，交互也得适配：`,
          code: `<!-- HTML 头部的 viewport meta 标签——别漏 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

/* 触摸友好——按钮和链接至少 44x44px */
.btn {
  min-width: 44px;
  min-height: 44px;
  padding: 10px 16px;
}

/* 媒体查询判断触摸设备 */
@media (hover: hover) {
  /* 有鼠标的设备——显示悬停效果 */
  .card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
}
@media (pointer: coarse) {
  /* 触摸屏设备——增大点击区域 */
  .nav-link { padding: 12px 16px; }
}

/*
   移动端常见坑：
   - iOS Safari 的 100vh 会包含地址栏——bottom 对齐用 100dvh
   - 输入框弹出键盘后布局走样——尽量用 position: fixed 别用 absolute
   - 图片用 max-width: 100% 避免撑破屏幕
*/
img { max-width: 100%; height: auto; }`,
          language: "css",
        },
      ],
      quiz: [
        { question: "移动端优先的响应式用 min-width 还是 max-width？", options: ["max-width", "min-width——先写最小屏幕样式再往大增强", "都用", "都不用"], answer: 1, explanation: "移动优先就是先写手机 CSS，再用 min-width 叠加平板和桌面样式。" },
        { question: "rem 单位相对于什么？", options: ["父元素字体大小", "根元素 html 的字体大小", "视口宽度", "浏览器默认"], answer: 1, explanation: "rem 相对于 html 标签的 font-size——改一个值全局缩放。" },
        { question: "clamp(1rem, 4vw, 3rem) 是什么意思？", options: ["固定 4vw", "字体在 1rem 到 3rem 之间，首选 4vw——随屏幕缩放但不超范围", "三种字体", "取平均值"], answer: 1, explanation: "clamp 设置最小值、首选值和最大值——小屏保证能看清，大屏不会太夸张。" },
        { question: "viewport meta 标签漏写了会怎样？", options: ["没事", "移动端页面不会缩放——手机上看到的是缩小版桌面网站", "页面崩溃", "只影响 CSS"], answer: 1, explanation: "缺少 viewport 标签移动浏览器会按桌面宽度渲染再缩小，文字小到看不清。" },
      ],
    },
    "css-animations": {
      slug: "css-animations",
      sections: [
        {
          title: "CSS 动画的两条路——transition 与 animation",
          content: `CSS 做动画有两大利器：
transition——过渡，从一个状态平滑变到另一个状态。触发条件是属性值变化（hover、class 变化），适合简单的交互动画。
animation——动画，用 keyframes 定义复杂得多的动画序列——可以循环、反向、暂停，适合加载动画、进入特效等。`,
        },
        {
          title: "Transition——平滑过渡",
          content: `transition 告诉浏览器：这个属性要变了，别直接跳过去，给我平滑地挪过去。可以控制哪些属性过渡、多久、什么节奏：`,
          code: `/* 基本语法：transition: 属性 时长 缓动函数 延迟 */
.button {
  background: #4a90d9;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  /* 所有属性变化都过渡 0.3s */
  transition: all 0.3s ease;
}

.button:hover {
  background: #3570b0;
  transform: translateY(-2px);  /* 向上浮 2px */
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* 单独给不同属性设不同过渡 */
.card {
  width: 200px;
  transition: width 0.4s ease, transform 0.3s ease 0.1s;
  /* width 变化 0.4 秒，transform 变化 0.3 秒但延迟 0.1 秒开始 */
}
.card:hover {
  width: 300px;
  transform: rotate(2deg);
}

/* 缓动函数速查：
   ease      慢-快-慢（默认，自然）
   ease-in    慢起步
   ease-out   慢收尾
   ease-in-out 慢-快-慢
   linear     匀速
   cubic-bezier() 自定义贝塞尔曲线 */`,
          language: "css",
          tip: "transition 写在元素的普通状态上，不要写 hover 里。放到 hover 里会出现离开时没有过渡的 bug。",
        },
        {
          title: "Animation 与 Keyframes——关键帧动画",
          content: `animation 是 transition 的加强版——能定义多个关键帧，能循环、反向、暂停，能做出复杂的动画效果：`,
          code: `/* 定义关键帧 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 使用动画 */
.fade-in {
  animation: fadeInUp 0.6s ease-out;
}

/* 带百分比的详细关键帧 */
@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* 动画属性速查 */
.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 多动画同时播放 */
.bounce-in {
  animation:
    fadeInUp 0.6s ease-out,
    pulse 2s ease-in-out 0.6s infinite;  /* 0.6s 后开始脉冲循环 */
}

/* 动画控制 */
.paused { animation-play-state: paused; }

/* 当有内容变化导致动画需要重置时：去掉再添加 animation 类
   或使用 animation: none; 然后异步重新设置 */`,
          language: "css",
          tip: "动画性能的黄金法则：只动画 transform 和 opacity。这两个属性不会触发重排，GPU 加速，60fps 稳。避开 width/height/position。",
        },
        {
          title: "实用动画案例",
          content: `日常开发中最常用的几个动画效果——骨架屏、进入动画、加载动画：`,
          code: `/* 骨架屏闪烁 */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* 列表逐个进入——用 animation-delay 错开 */
.list-item {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
}
.list-item:nth-child(1) { animation-delay: 0.1s; }
.list-item:nth-child(2) { animation-delay: 0.2s; }
.list-item:nth-child(3) { animation-delay: 0.3s; }
/* forwards 保持最终状态不弹回去 */

/* 抽屉滑入 */
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
.drawer { animation: slideInRight 0.3s ease-out; }`,
          language: "css",
        },
      ],
      quiz: [
        { question: "transition 和 animation 的区别？", options: ["一样", "transition 简单过渡（A→B），animation 支持多关键帧和循环", "animation 更简单", "transition 能做复杂动画"], answer: 1, explanation: "transition 只在属性值变化时播放一次；animation 用 keyframes 定义多个关键帧，能循环、反向、暂停。" },
        { question: "CSS 动画性能最佳的属性是？", options: ["width 和 height", "transform 和 opacity——只触发合成不触发重排", "font-size", "position"], answer: 1, explanation: "transform 和 opacity 在合成层上操作，GPU 加速，不会导致浏览器重新计算布局。" },
        { question: "animation: fadeIn 0.5s ease forwards 的 forwards 做什么？", options: ["循环播放", "动画结束后保持最终状态不跳回", "反向播放", "加速"], answer: 1, explanation: "forwards 让动画停在最后一帧，适合进入动画——元素进入后留在位置上不消失。" },
        { question: "transition 应该写在哪个状态？", options: ["hover 状态里", "元素的普通状态上", "active 状态", "写在 keyframes 里"], answer: 1, explanation: "transition 写普通状态上保证进出都有过渡。写 hover 里只有鼠标进入时过渡，离开直接跳回。" },
      ],
    },
    "html-forms": {
      slug: "html-forms",
      sections: [
        {
          title: "表单基础——你能输入的那些玩意",
          content: `HTML 表单是用户跟网站交互的最常用方式——登录、注册、搜索、支付，全是表单。核心组件包括各种 input 类型、label 标签、button 按钮和 form 容器。`,
        },
        {
          title: "Input 类型全解",
          content: `input 的 type 属性决定了它是个啥——文本框、密码、邮箱、日期等等。选对类型不光用户体验好，移动端还会弹出对应的键盘：`,
          code: `<!-- 常用 input 类型 -->
<form>
  <!-- 基础文本 -->
  <label>
    姓名
    <input type="text" name="name" placeholder="请输入姓名" required>
  </label>

  <!-- 邮箱——手机弹出带 @ 的键盘 -->
  <label>
    邮箱
    <input type="email" name="email" placeholder="example@mail.com" required>
  </label>

  <!-- 密码 -->
  <label>
    密码
    <input type="password" name="password" minlength="6" maxlength="20" required>
  </label>

  <!-- 数字——只让输数字 -->
  <label>
    年龄
    <input type="number" name="age" min="0" max="150" step="1">
  </label>

  <!-- 日期——弹出日期选择器 -->
  <label>
    生日
    <input type="date" name="birthday">
  </label>

  <!-- 滑块 -->
  <label>
    价格范围: <span id="price-val">500</span>
    <input type="range" name="maxPrice" min="0" max="10000" value="500"
           oninput="document.getElementById('price-val').textContent = this.value">
  </label>

  <!-- 复选框 -->
  <label>
    <input type="checkbox" name="agree" required> 同意用户协议
  </label>

  <!-- 单选框——同一组用相同 name -->
  <fieldset>
    <legend>性别</legend>
    <label><input type="radio" name="gender" value="male"> 男</label>
    <label><input type="radio" name="gender" value="female"> 女</label>
  </fieldset>

  <!-- 下拉选择 -->
  <label>
    城市
    <select name="city">
      <option value="">请选择</option>
      <option value="beijing">北京</option>
      <option value="shanghai">上海</option>
      <option value="shenzhen">深圳</option>
    </select>
  </label>

  <!-- 文本域 -->
  <label>
    备注
    <textarea name="note" rows="4" placeholder="选填"></textarea>
  </label>

  <button type="submit">提交</button>
</form>`,
          language: "html",
          tip: "type=email 自带浏览器校验邮箱格式，type=number 移动端连小数点都只让输一次。善用原生类型减少 JS 校验代码。",
        },
        {
          title: "表单校验——前后夹击",
          content: `前端校验给用户即时反馈，后端校验是最后防线——两者缺一不可。前端校验用 HTML5 原生属性配合 JS 自定义校验：`,
          code: `<!-- HTML5 原生校验属性 -->
<input type="text" required minlength="2" maxlength="50">
<input type="email" required>
<input type="number" min="0" max="150">
<input type="text" pattern="[A-Za-z]{3,}" title="至少 3 个字母">

<script>
// 自定义校验与提交处理
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();  // 阻止默认提交

  // HTML5 原生校验
  if (!form.checkValidity()) {
    form.reportValidity();  // 显示浏览器原生的错误气泡
    return;
  }

  // 自定义校验
  const password = form.password.value;
  const confirm = form.confirmPassword.value;
  if (password !== confirm) {
    showError('两次密码不一致');
    return;
  }

  // FormData——一行收集所有表单数据
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // 提交到后端
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message);
    } else {
      alert('注册成功！');
    }
  } catch (err) {
    showError('网络错误，请稍后重试');
  }
});
</script>

<!-- 实时校验——输入时给反馈 -->
<input type="email" id="email" oninput="validateEmail(this)">
<span id="email-error" style="color:red;display:none">邮箱格式不正确</span>`,
          language: "html",
          warning: "前端校验只是提升体验——任何人可以关掉 JS 或用 curl 绕过。后端必须再做一次严格校验。",
        },
        {
          title: "表单无障碍——每个人都能用",
          content: `表单的可访问性经常被忽略。几个关键点让表单对所有用户友好：`,
          code: `<!-- 1. 每个 input 都要有 label——用 for 关联或用 label 包裹 -->
<label for="username">用户名</label>
<input type="text" id="username">

<!-- 2. 错误信息用 aria 属性关联 -->
<input type="email" id="email" aria-describedby="email-hint email-error">
<span id="email-hint">输入你常用的邮箱地址</span>
<span id="email-error" role="alert" style="display:none">邮箱格式错误</span>

<!-- 3. 必填字段标清楚 -->
<label for="name">
  姓名 <span aria-hidden="true">*</span>
  <span class="sr-only">（必填）</span>
</label>
<input type="text" id="name" required aria-required="true">

<!-- 4. 提交按钮用 button 不要用 div -->
<button type="submit" disabled>提交中...</button>

<!-- 5. 聚焦状态要明显（别干掉 outline） -->
input:focus, button:focus {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
}

<!-- 6. 键盘导航——用 tab 能在所有表单元素间切换，别用 tabindex > 0 打乱顺序 -->`,
          language: "html",
          tip: "屏幕阅读器用户靠 label 和 aria 属性理解表单。检查方法：装个 Chrome 的屏幕阅读器插件或直接用 VoiceOver 走一遍。",
        },
      ],
      quiz: [
        { question: "input type=\"email\" 的好处是什么？", options: ["好看", "浏览器自动校验格式 + 移动端弹出含 @ 的键盘", "更快", "没区别"], answer: 1, explanation: "原生 email 类型自带格式校验，移动端键盘会包含 @ 和 . 按钮——用户体验秒杀 type=text。" },
        { question: "FormData 的作用？", options: ["创建表单", "一次性收集表单所有字段的键值对", "校验表单", "样式表单"], answer: 1, explanation: "new FormData(form) 自动读取表单里所有带 name 的元素，省去挨个取值的麻烦。" },
        { question: "前端校验够用吗？", options: ["够了", "不够——前端校验提升体验，后端必须重验，前端可被绕过", "看情况", "不用校验"], answer: 1, explanation: "前端校验任何人都能绕过去，后端校验是最后防线。两次校验不是重复而是各司其职。" },
        { question: "label 标签为什么要关联 input？", options: ["好看", "点击 label 自动聚焦关联的 input + 屏幕阅读器能读出对应关系", "性能优化", "SEO"], answer: 1, explanation: "label for 关联 input 不仅让点击范围更大，视障用户的屏幕阅读器也能正确配对字段和说明。" },
      ],
    },
    "ts-basics": {
      slug: "ts-basics",
      sections: [
        {
          title: "TypeScript 是啥——JavaScript 加个类型安全带",
          content: `TypeScript 说白了就是加了「类型标注」的 JavaScript。你写的还是 JS 那套东西，只是在变量、函数参数、返回值后面多写个冒号 + 类型名，让编译器帮你检查有没有搞错类型。

举个例子：你函数要收一个数字参数，但调用时不小心传了个字符串，JS 会默默忍着然后出 bug，TS 直接在编辑器里给你画红波浪线告诉你「喂，类型不对」。

几个关键认知：
- TS 代码 .ts 文件最后要编译成 .js 才能在浏览器或 Node 里跑，浏览器不认识 TS
- TS 的类型检查只在编译时生效，运行时就没了——不会拖慢程序
- 所有合法的 JS 都是合法的 TS（反过来不行），可以渐进式迁移`,
        },
        {
          title: "搭建环境——跑起来",
          content: `装 TS 就一行命令，然后弄个配置文件。tsconfig.json 是 TS 的大脑，控制怎么编译、检查多严格：`,
          code: `# 全局安装 TypeScript 编译器
npm install -g typescript

# 项目中安装（推荐，锁定版本）
npm install typescript --save-dev

# 初始化 tsconfig.json
tsc --init

# 编译文件
tsc index.ts          # 单文件编译
tsc                   # 按 tsconfig.json 编译整个项目

# 监听模式——改了自动编译
tsc --watch`,
          language: "bash",
          tip: "推荐把 TS 装在项目 devDependencies 里而不是全局装——不同项目可能用不同 TS 版本，全局装容易打架。",
        },
        {
          title: "基础类型——给数据贴上标签",
          content: `变量后面加冒号标类型，这就是类型注解。函数参数、返回值也一样。TS 能自动推断的就不用写，写在需要明确的地方：`,
          code: `// 基本类型注解——冒号 + 类型名
let name: string = "小明";
let age: number = 25;
let isStudent: boolean = true;

// 没有初始值时最好标注类型
let score: number;
score = 90;

// 函数——参数和返回值都标上
function add(a: number, b: number): number {
  return a + b;            // TS 知道你返回的是数字，放心用
}

function greet(name: string): void {
  console.log("你好，" + name);   // void 表示没返回值
}

// 数组——两种写法
let nums: number[] = [1, 2, 3];
let strs: Array<string> = ["a", "b"];  // 泛型写法，后面会讲

// 对象——直接写结构
let user: { name: string; age: number } = {
  name: "小红",
  age: 18,
};

// TS 能自动推断类型，能推断的就不用写
let x = 10;        // TS 推断 x 是 number
let y = "hello";   // TS 推断 y 是 string
// x = "world";    // 报错！类型推断也管用`,
          language: "typescript",
        },
        {
          title: "接口——给对象定个形状",
          content: `interface 用来描述对象的「形状」——规定它必须有哪几个属性、每个属性什么类型。就像签合同，不按规矩来就报错：`,
          code: `// 定义接口——描述一个对象长什么样
interface Person {
  name: string;
  age: number;
}

// 用接口来约束变量
const p1: Person = { name: "张三", age: 30 };  // 正确
// const p2: Person = { name: "李四" };        // 报错，少 age
// const p3: Person = { name: "王五", age: 20, gender: "男" };  // 报错，多 gender

// 函数用接口——只要符合形状的对象都能传
function printPerson(person: Person): void {
  console.log(person.name + "今年" + person.age + "岁");
}

printPerson({ name: "赵六", age: 25 });   // 正常
// printPerson({ name: "钱七" });          // 报错，缺 age`,
          language: "typescript",
          tip: "interface 在 TS 编译后就没了（JS 里不存在），纯编译时检查。运行时你没法判断一个对象是不是某个 interface。",
        },
        {
          title: "编译到 JS——.ts 怎么变 .js",
          content: `tsc 把 .ts 编译成 .js 时，会把类型注解全擦掉。箭头函数、async/await 这些新语法也可以按目标 JS 版本自动转换：`,
          code: `// tsconfig.json 核心配置
{
  "compilerOptions": {
    "target": "ES2020",           // 编译成哪个版本的 JS
    "module": "commonjs",         // 模块方案（Node 用 commonjs）
    "outDir": "./dist",           // 编译产物放哪
    "rootDir": "./src",           // 源码在哪
    "strict": true,               // 严格模式——强烈推荐打开
    "esModuleInterop": true       // 让 import 语法更宽松
  },
  "include": ["src/**/*"],        // 编译哪些文件
  "exclude": ["node_modules"]     // 忽略哪些
}

// 编译前 (index.ts)
const greet = (name: string): string => "Hello " + name;

// 编译后 (dist/index.js) —— 类型没了，箭头变普通函数
var greet = function (name) { return "Hello " + name; };`,
          language: "typescript",
          tip: "strict: true 是 TS 里最重要的配置——开启后所有严格检查全启用，虽然刚开始报错多，但长期来看帮你少写无数 bug。",
        },
      ],
      quiz: [
        { question: "TypeScript 代码能在浏览器直接跑吗？", options: ["能", "不能——得先编译成 JS", "部分能", "用特殊标签就行"], answer: 1, explanation: "TS 是 JS 的超集，浏览器不认识 .ts 文件，必须用 tsc 编译成 .js 才能跑。" },
        { question: "TS 的类型检查什么时候生效？", options: ["运行时", "编译时（写代码时）", "部署时", "从来不检查"], answer: 1, explanation: "TS 的类型系统只在开发/编译阶段起作用，编译后类型全擦掉，运行时跟 JS 一模一样。" },
        { question: "interface 编译成 JS 后还存在吗？", options: ["存在", "不存在——interface 是纯 TS 概念，编译后擦除", "变成 class", "变成注释"], answer: 1, explanation: "interface、type、泛型等 TS 专属语法编译后全部消失，产物就是纯净的 JS。" },
        { question: "tsconfig.json 里 strict: true 的作用？", options: ["没作用", "开启所有严格类型检查——强烈推荐", "提高运行速度", "生成更小的文件"], answer: 1, explanation: "strict 是一个总开关，打开后相当于把 noImplicitAny、strictNullChecks 等全开了。" },
        { question: "let x = 10; TS 知道 x 是什么类型吗？", options: ["不知道", "知道——TS 自动推断为 number", "只能手动指定", "推断为 any"], answer: 1, explanation: "TS 有强大的类型推断，有初始值时能自己猜出类型，不用处处手动写。" },
      ],
    },
    "ts-types": {
      slug: "ts-types",
      sections: [
        {
          title: "基础类型再走一遍",
          content: `TS 的类型分两大类：原始类型（string、number、boolean 这些最基础的）和对象类型（数组、对象、函数这些由基础类型拼起来的）。

把类型想成给数据贴标签——有了标签，编辑器就知道这个变量能干什么、不能干什么：`,
          code: `// 原始类型——最简单直接
let str: string = "hello";          // 字符串
let num: number = 42;               // 数字（不分 int/float）
let bool: boolean = true;           // 布尔
let big: bigint = 100n;            // 大整数
let sym: symbol = Symbol("key");    // 唯一标识

// 数组——两种写法效果一样
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];   // 泛型写法

// 元组——定长定类型的数组
let tuple: [string, number] = ["小明", 25];
// tuple = [25, "小明"];     // 报错，位置类型不对
// tuple = ["小明", 25, 30]; // 报错，多了一个

// 枚举——给一组常量起名字
enum Direction {
  Up,        // 默认 0
  Down,      // 默认 1
  Left,      // 默认 2
  Right,     // 默认 3
}
let dir: Direction = Direction.Up;

enum Status {
  Success = 200,
  NotFound = 404,
  Error = 500,
}`,
          language: "typescript",
        },
        {
          title: "any / unknown / never / void——四大特殊类型",
          content: `这几兄弟性格各不同。any 最宽容啥都让干但等于放弃类型检查；unknown 也啥都能装但要先检查类型才让用（更安全）；never 永远到不了；void 表示没返回值。`,
          code: `// any——关闭类型检查，等于回到 JS
let a: any = 10;
a = "hello";         // 不报错
a.foo();             // 也不报错（运行时可能崩）
// 尽量别用 any，除非你确实不知道类型（比如引入没类型的第三方库）

// unknown——安全的 any，用之前必须检查类型
let u: unknown = 10;
// u.toFixed(2);      // 报错，TS 不知道 u 是不是数字
if (typeof u === "number") {
  console.log(u.toFixed(2));  // 这里安全了，TS 知道 u 是 number
}

// 类型收窄后 unknown 变具体类型
function process(value: unknown): string {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "number") return value.toFixed(2);
  return String(value);
}

// never——永不发生，比如抛异常或死循环的函数
function throwError(msg: string): never {
  throw new Error(msg);   // 函数永远不会正常返回
}

function infiniteLoop(): never {
  while (true) {}          // 永远不会结束
}

// void——没有返回值（但函数实际返回 undefined）
function log(msg: string): void {
  console.log(msg);
  // 没有 return
}`,
          language: "typescript",
          tip: "遇到不认识的类型优先用 unknown 而不是 any——unknown 能接任何值但必须检查后才能用，等于加了层安全带。",
        },
        {
          title: "类型断言——你比 TS 更懂",
          content: `有时候你心里清楚一个变量是啥类型但 TS 推断不出来，就可以用类型断言「告诉」TS：「相信我，它就是这类型」。断言分两种写法——as 语法跟尖括号语法，推荐 as：`,
          code: `// as 语法——推荐，JSX/TSX 里也能用
let el = document.getElementById("app") as HTMLDivElement;
el.innerHTML = "你好";    // TS 现在知道它是 div 了

// 尖括号语法——跟 JSX 语法冲突，React 项目里别用
let el2 = <HTMLDivElement>document.getElementById("app");

// 双断言——从 any 或 unknown 桥接到目标类型
let raw: unknown = "hello";
let len = (raw as string).length;  // 告诉 TS：它就是字符串

// 常用场景：你不知道完整类型，先断言
fetch("/api/data")
  .then(res => res.json())
  .then(data => {
    const result = data as { name: string; age: number };
    console.log(result.name);
  });

// 断言 vs 类型注解：断言是「我知道」，注解是「我要求」
let s1 = "hello" as string;    // 断言：它就是字符串
let s2: string = "hello";       // 注解：它必须是字符串`,
          language: "typescript",
          warning: "类型断言不检查——你说它是啥 TS 就信你。运行时类型不对照样崩。断言 = 强行绕过检查，谨慎用。",
        },
        {
          title: "字面量类型——精确到值",
          content: `除了 string、number 这些大类，TS 还能精确到具体的值。比如变量不仅要是字符串，还必须正好是 "male" 或 "female"。这叫字面量类型，跟联合类型搭配特别好用：`,
          code: `// 字符串字面量类型
let gender: "male" | "female";
gender = "male";   // OK
// gender = "other";  // 报错，只能是那两个值之一

// 用在函数参数里——约束可选值
function setAlign(align: "left" | "center" | "right") {
  // TS 帮你保证 align 只可能是这三个之一
}
setAlign("center");  // OK
// setAlign("top");   // 报错

// 数字字面量
let dice: 1 | 2 | 3 | 4 | 5 | 6;
dice = 3;  // OK
// dice = 7;  // 报错

// 联合类型 + 字面量 = 枚举替代方案（更轻量）
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
function request(url: string, method: HttpMethod) {
  // 编译时保证 method 对，还能自动补全
}

// const 断言——把值冻结成字面量类型
const colors = ["red", "green", "blue"] as const;
// colors 的类型是 readonly ["red", "green", "blue"]，不是 string[]

const config = {
  port: 3000,
  host: "localhost",
} as const;
// config.port 的类型是 3000（字面量），不是 number`,
          language: "typescript",
          tip: "as const 是 TS 里一个小而精的语法——让数组变成只读元组、对象属性变成只读字面量类型，少了它就全是泛泛的 string/number。",
        },
      ],
      quiz: [
        { question: "unknown 和 any 的区别？", options: ["完全一样", "unknown 安全——用之前必须先检查类型；any 直接放行", "unknown 能直接调用方法", "any 更安全"], answer: 1, explanation: "unknown 让你接收任意值但不能直接操作，必须 typeof/instanceof 检查后才能用，比 any 安全得多。" },
        { question: "never 类型的函数意味着什么？", options: ["返回 undefined", "永远不会正常返回——比如抛异常或死循环", "返回 null", "返回任意值"], answer: 1, explanation: "never 表示永不到达——函数要么抛异常退出要么死循环，绝不会有 return 语句。" },
        { question: "类型断言 'hello' as string 做了什么？", options: ["类型转换", "告诉 TS 编译器这就是 string——但运行时啥也没发生", "把数字转成字符串", "编译成类型检查代码"], answer: 1, explanation: "as 断言纯编译时的声明，编译后代码跟没有 as 一样，TS 只是相信你的判断不报错。" },
        { question: "as const 对数组的影响？", options: ["没影响", "数组变只读元组——每个元素获得字面量类型", "数组扩容", "数组排序"], answer: 1, explanation: "as const 把 ['a','b'] 的类型从 string[] 变成 readonly ['a','b']，每个元素确定到值。" },
        { question: "字面量类型 'GET' | 'POST' 的好处？", options: ["好看", "编译时检查 + 编辑器自动补全——比用 string 安全一百倍", "运行更快", "没有好处"], answer: 1, explanation: "限制参数到具体几个值让 TS 在编译时就能检查出拼写错误和非法值，编辑器还能在输入时自动提示候选。" },
      ],
    },
    "ts-interfaces": {
      slug: "ts-interfaces",
      sections: [
        {
          title: "interface——给对象定合同",
          content: `interface 就是对象的「合同」——规定了对象长什么样：必须有哪几个属性、每个属性啥类型。你拿来约束参数、返回值、变量都行。不符合合同的对象 TS 直接给你报错，门都不让进：`,
          code: `// 定义接口——描述对象形状
interface User {
  name: string;
  age: number;
  email: string;
}

// 变量必须符合接口
const u1: User = {
  name: "张三",
  age: 28,
  email: "zhangsan@example.com",
};

// 函数用接口约束参数
function sendEmail(user: User): void {
  console.log("发送邮件给 " + user.name + " (" + user.email + ")");
}

// 接口做返回值——函数返回的对象也必须符合接口
function createAdmin(name: string): User {
  return { name, age: 0, email: name + "@admin.com" };
}`,
          language: "typescript",
        },
        {
          title: "可选属性与只读属性",
          content: `接口里的属性不是每个都必填。加个问号就变可选（可以有也可以没有），前面加 readonly 就只能读不能改（设一次就锁死）：`,
          code: `interface Product {
  readonly id: number;       // 只读——一旦赋值不能改
  name: string;
  price: number;
  description?: string;      // 可选——可以有也可以没有
  category?: string;         // 可选
}

const p: Product = { id: 1, name: "手机", price: 2999 };
// p.id = 2;     // 报错！readonly 属性不能改

// 可选属性——访问前得判空
function printProduct(p: Product) {
  console.log(p.name + " ¥" + p.price);
  // 可选属性用可选链访问
  console.log(p.description?.substring(0, 20) ?? "暂无描述");
}

// 函数参数也支持可选——问号放在参数名后面
function greet(name: string, title?: string): string {
  return title ? title + " " + name : name;
}
greet("小明");                // OK
greet("小明", "博士");        // OK`,
          language: "typescript",
        },
        {
          title: "索引签名——未知属性名也能约束",
          content: `有些场景你不知道属性具体叫什么名字（比如从后端拿回来的配置对象），但你知道属性名和值的类型。索引签名就是干这个的：`,
          code: `// 字符串索引签名——属性名是 string，值是 number
interface Dictionary {
  [key: string]: number;      // 任意个属性，只要值是数字就行
}

const scores: Dictionary = {
  math: 95,
  english: 88,
  chinese: 92,
};

// 更实用的例子——任何字符串键，值是任意类型
interface Config {
  [key: string]: string | number | boolean;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 3000,
  debug: true,
};

// 混合写法——已知属性 + 索引签名
interface NamedDict {
  name: string;             // 必须有的属性
  [key: string]: string;     // 其他任意属性也得是 string
}

const d: NamedDict = {
  name: "小明",
  city: "北京",
  job: "工程师",
};`,
          language: "typescript",
          tip: "索引签名让你在不牺牲类型安全的前提下接受动态键的对象，告别 any。",
        },
        {
          title: "extends——接口继承, 别重复",
          content: `interface 可以继承另一个 interface，把父接口的属性全拿过来再叠加新的。这样就不用 Ctrl+C Ctrl+V：`,
          code: `interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;          // 新增属性
  bark(): void;           // 新增方法
}

const wangwang: Dog = {
  name: "旺财",
  age: 3,
  breed: "金毛",
  bark() { console.log("汪汪！"); },
};

// 还可以多继承——从好几个接口各拿一部分
interface Swimmer { swim(): void; }
interface Flyer { fly(): void; }

interface Duck extends Swimmer, Flyer {
  name: string;
}

const donald: Duck = {
  name: "唐老鸭",
  swim() { console.log("游..."); },
  fly() { console.log("飞..."); },
};`,
          language: "typescript",
        },
        {
          title: "interface vs type——选哪个",
          content: `interface 和 type（类型别名）都能描述对象形状，大部分情况都能互换。但有几个关键区别：`,
          code: `// 两者都能做这些事
interface User1 {
  name: string;
  age: number;
}

type User2 = {
  name: string;
  age: number;
};

// 区别1：interface 能「声明合并」——同名 interface 自动合并
interface Person {
  name: string;
}
interface Person {
  age: number;
}
// Person 现在是 { name: string; age: number }
// type 同名会直接报错

// 区别2：type 能写联合类型、交叉类型
type ID = string | number;
type Admin = User2 & { role: string };

// 区别3：interface 能被 extends 扩展
interface AdminUser extends User1 {
  role: string;
}

// 习惯：
// - 描述对象形状用 interface
// - 联合/交叉/映射类型用 type
// - 第三方库对外 API 用 interface（方便用户扩展）`,
          language: "typescript",
          tip: "日常开发：优先用 interface 描述对象，type 处理联合/交叉/工具类型。如果你的接口可能被别人扩展，用 interface 没错。",
        },
      ],
      quiz: [
        { question: "interface 里的 readonly 属性意味着？", options: ["只读——赋值后不能修改", "不能定义", "运行时加密", "只有类能用"], answer: 0, explanation: "readonly 让属性在初始化后就不能再改动，编译时检查，适合 id、创建时间等字段。" },
        { question: "interface 里属性后面加 ? 表示什么？", options: ["必填", "可选——可以有也可以没有", "只读", "私有"], answer: 1, explanation: "问号表示可选属性，使用时不填也不会报错。访问时 TS 会自动推断为 类型 | undefined。" },
        { question: "interface 和 type 的核心区别？", options: ["完全一样", "interface 能声明合并（同名合并），type 能写联合/交叉类型", "type 更好用", "interface 更快"], answer: 1, explanation: "interface 的同名自动合并是独门绝技；type 能表示 string | number 这种联合类型，interface 做不到。" },
        { question: "索引签名 [key: string]: number 表示什么？", options: ["固定属性名", "属性名是字符串，值是数字——数量不限", "只有一个 key 属性", "key 是数字"], answer: 1, explanation: "索引签名说这个对象可以有任意多个属性，只要属性名是字符串、值是数字就行。" },
        { question: "extends 能继承多个 interface 吗？", options: ["不能", "能——用逗号分隔", "只能用一次", "只能继承一个"], answer: 1, explanation: "interface 支持多继承，extends A, B, C 把多个父接口的属性全合并到子接口。" },
      ],
    },
    "ts-generics": {
      slug: "ts-generics",
      sections: [
        {
          title: "泛型是啥——写了再定类型的函数",
          content: `泛型就是「类型参数」——写函数或类的时候先不固定类型，用的时候再传入具体类型。就像函数有参数一样，泛型让「类型」也能当参数传来传去。

举个最简单的例子：一个返回数组第一项的函数。不用泛型你得为每种类型写一遍，用泛型一行搞定：`,
          code: `// 不用泛型——每种类型写一遍，烦死了
function firstNumber(arr: number[]): number | undefined {
  return arr[0];
}
function firstString(arr: string[]): string | undefined {
  return arr[0];
}

// 用泛型——一招搞定所有类型
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

first([1, 2, 3]);         // T 自动推断为 number，返回 number
first(["a", "b", "c"]);   // T 自动推断为 string，返回 string
first<boolean>([true]);   // 手动指定 T 为 boolean`,
          language: "typescript",
        },
        {
          title: "泛型约束——别让 T 太自由",
          content: `光写 <T> 的话 T 可以是任何类型，有时候你得限制它。比如你要调用 .length 属性，就得约束 T 必须包含 length 属性。用 extends 给 T 加限制：`,
          code: `// 不加约束——T 可以是任何类型，没法用 length
// function getLength<T>(arg: T): number {
//   return arg.length;  // 报错！不是所有类型都有 length
// }

// 加了约束——T 必须有 length 属性
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;    // OK，TS 知道有 length
}

getLength("hello");      // string 有 length → 5
getLength([1, 2, 3]);    // array 有 length → 3
// getLength(123);        // 报错，number 没有 length

// 约束对象必须有特定属性
interface HasName {
  name: string;
}

function printName<T extends HasName>(obj: T): void {
  console.log(obj.name);
}

printName({ name: "小明", age: 20 });  // OK，有 name 就行
// printName({ age: 20 });               // 报错，没有 name

// keyof 约束——T 的键
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "张三", age: 30 };
getProperty(user, "name");  // OK
// getProperty(user, "email");  // 报错，user 没有 email 键`,
          language: "typescript",
        },
        {
          title: "泛型类与泛型接口",
          content: `泛型不光是函数能用，类和接口也能用。后端接口返回的列表、本地缓存、数据仓库这些场景，泛型让你一个类伺候所有数据类型：`,
          code: `// 泛型接口
interface Result<T> {
  data: T;
  success: boolean;
  message: string;
}

// T 可以是任何类型
const userResult: Result<{ name: string }> = {
  data: { name: "张三" },
  success: true,
  message: "ok",
};

const listResult: Result<string[]> = {
  data: ["a", "b", "c"],
  success: true,
  message: "ok",
};

// 泛型类
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
const val = numStack.pop();  // val 的类型是 number | undefined`,
          language: "typescript",
        },
        {
          title: "实用工具类型——TS 自带的泛型法宝",
          content: `TS 自带了一堆用泛型写好的工具类型，帮你少写样板代码。做的最重要的这几个：Partial 全变可选、Required 全变必填、Pick 挑几样、Omit 踢掉几样、Record 造字典。`,
          code: `interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Partial——所有属性变可选，更新数据时常用
type TodoUpdate = Partial<Todo>;
// 等价于 { id?: number; title?: string; description?: string; completed?: boolean; }

function updateTodo(id: number, fields: Partial<Todo>) {
  // 只传要改的字段
}
updateTodo(1, { completed: true });  // 只改 completed，其他不动

// Required——所有属性变必填
type RequiredTodo = Required<Todo>;  // 去掉所有 ?

// Pick——从接口里挑几个属性
type TodoBrief = Pick<Todo, "id" | "title">;
// { id: number; title: string }

// Omit——从接口里踢掉几个属性
type TodoWithoutId = Omit<Todo, "id">;
// { title: string; description: string; completed: boolean }

// Record——快速造一个字典类型
type PageRoutes = Record<string, string>;
// { [key: string]: string }
const routes: PageRoutes = { home: "/", about: "/about" };

type StatusMap = Record<"active" | "inactive" | "banned", string>;
// { active: string; inactive: string; banned: string }`,
          language: "typescript",
          tip: "Partial 是做更新接口的神器——不用为每个更新接口重新定义一遍字段全可选的类型，一行 Partial<T> 搞定。",
        },
      ],
      quiz: [
        { question: "泛型 <T> 的作用？", options: ["占位符", "类型参数——用的时候才确定具体类型", "只能是 number", "只能是 string"], answer: 1, explanation: "泛型让你写代码时不指定类型，调用时才传入或推断具体类型，一个函数伺候所有类型。" },
        { question: "<T extends { length: number }> 的 extends 啥意思？", options: ["继承类", "约束——T 必须包含 length 属性", "等于 any", "等于 string"], answer: 1, explanation: "extends 在泛型约束里表示 T 必须满足某个条件——这里是要求 T 有 length 属性才能用。" },
        { question: "Partial<T> 的作用？", options: ["复制类型", "把 T 所有属性变成可选——更新场景神器", "删除所有属性", "新增属性"], answer: 1, explanation: "Partial 借助映射类型把接口每个属性后都加个 ?，全部变可选，更新数据时只传要改的字段。" },
        { question: "Pick<T, K> 和 Omit<T, K> 的区别？", options: ["一样", "Pick 选择保留哪些；Omit 选择排除哪些——方向相反", "Pick 更快", "Omit 更安全"], answer: 1, explanation: "Pick 是「我要这几个」，Omit 是「我不要这几个」，功能互补。" },
        { question: "Record<'a'|'b', string> 出来的类型？", options: ["数组", "{ a: string; b: string }——给定键和值造对象类型", "只读数组", "undefined"], answer: 1, explanation: "Record<K, V> 创建一个以 K 为键、V 为值的对象类型，拿来定义字典/映射最方便。" },
      ],
    },
    "ts-advanced": {
      slug: "ts-advanced",
      sections: [
        {
          title: "联合类型与交叉类型——或与和",
          content: `联合类型 | 表示「要么这个要么那个」（或），交叉类型 & 表示「既要这个又要那个」（和）。这俩是组合类型的基本操作：`,
          code: `// 联合类型 |——满足其一即可
type ID = string | number;
let userId: ID = 123;     // 可以
userId = "abc-456";       // 也可以

function formatId(id: ID): string {
  // 收窄——先判断具体是哪个类型再处理
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toString();
}

// 交叉类型 &——两个都满足
interface Nameable { name: string; }
interface Ageable { age: number; }

type Person = Nameable & Ageable;  // 必须同时有 name 和 age

const p: Person = { name: "张三", age: 30 };  // 两个都得有

// 联合 vs 交叉的更多例子
type Admin = Person & { role: "admin" };        // Person + role
type Visitor = Person & { role: "visitor" };
type AppUser = Admin | Visitor;                  // 要么 Admin 要么 Visitor

function handleUser(u: AppUser) {
  console.log(u.name);      // 都能访问 name
  // console.log(u.role);   // 报错！不能确定 role 是 "admin" 还是 "visitor"
  if (u.role === "admin") {
    console.log("管理员");
  } /* else {
    console.log("访客");
  }*/
}`,
          language: "typescript",
        },
        {
          title: "条件类型——根据条件选类型",
          content: `条件类型就像三元表达式但作用于类型层面：根据某个条件判断结果，返回不同的类型。extends 在这里的意思是「是否可赋值给」：`,
          code: `// 条件类型基础——T 能赋值给 U 吗？
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<"hello">;   // "yes"
type B = IsString<number>;    // "no"

// 常用的 Exclude / Extract / NonNullable 都用条件类型实现
type T1 = Exclude<"a" | "b" | 1 | 2, string>;   // 1 | 2（排除字符串）
type T2 = Extract<"a" | "b" | 1 | 2, string>;   // "a" | "b"（提取字符串）
type T3 = NonNullable<string | null | undefined>; // string（踢掉 null/undefined）

// ReturnType——获取函数返回值类型
function fetchUser() {
  return { name: "张三", age: 30 };
}
type UserType = ReturnType<typeof fetchUser>;  // { name: string; age: number }

// Parameters——获取函数参数类型
type FetchParams = Parameters<typeof fetchUser>;  // []（没有参数）

// 分布式条件类型——联合类型自动拆开
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>;  // string[] | number[]（拆开各自处理）`,
          language: "typescript",
          tip: "Exclude 和 Extract 是联合类型的筛子——一个去掉不要的、一个只留想要的，日常过滤联合类型就靠这俩。",
        },
        {
          title: "infer——在条件类型里抓取类型",
          content: `infer 让你在条件类型里「取出」某个类型，然后用在结果里。就像在类型体操里伸手抓住一个路过的东西：`,
          code: `// 获取数组元素类型
type ArrayItem<T> = T extends (infer U)[] ? U : never;
// 如果 T 是数组，抓住 U（元素类型）；否则 never

type Item1 = ArrayItem<string[]>;     // string
type Item2 = ArrayItem<number[]>;     // number
type Item3 = ArrayItem<string>;       // never（不是数组）

// 获取 Promise 包裹的类型——极其常用
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type R1 = Unwrap<Promise<string>>;  // string
type R2 = Unwrap<number>;           // number（不是 Promise，直接返回）

// 获取函数返回值——不用 ReturnType 也能实现
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = (a: number, b: string) => boolean;
type FnReturn = MyReturnType<Fn>;  // boolean`,
          language: "typescript",
        },
        {
          title: "映射类型——遍历属性挨个改",
          content: `映射类型是一种「批量生产」类型的方式——遍历已有类型的所有属性，对每个属性做同样的操作。TS 的 Partial、Readonly、Record 背后全是映射类型：`,
          code: `// 只读映射——所有属性加 readonly
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface User {
  name: string;
  age: number;
}
type ReadonlyUser = MyReadonly<User>;
// { readonly name: string; readonly age: number }

// 可选映射——所有属性加 ?
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// 属性名重映射（TS 4.1+）——给属性名加前缀
type WithPrefix<T, Prefix extends string> = {
  [K in keyof T as \`\${Prefix}\${string & K}\`]: T[K];
};

interface Api {
  getList(): void;
  getDetail(): void;
}
type ApiWithLog = WithPrefix<Api, "log">;
// { logGetList: () => void; logGetDetail: () => void }

// 实践——给所有属性加 null
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null }`,
          language: "typescript",
        },
        {
          title: "模板字面量类型——字符串也能玩类型",
          content: `TS 4.1 开始支持用模板字符串（反引号那套）来构造类型。字符串不再是糊涂的 string，变成精确的模式：`,
          code: `// 模板字面量类型基础
type Greeting = "Hello, " + string;  // 错！
type Greeting = \`Hello, \${string}\`;  // 对

let g: Greeting = "Hello, World";    // OK
// let g2: Greeting = "Hi, World";   // 报错，必须以 "Hello, " 开头

// 实用场景——事件名类型
type EventName = \`on\${Capitalize<string>}\`;
let e: EventName = "onClick";    // OK
let e2: EventName = "onChange";  // OK
// let e3: EventName = "click";   // 报错，必须以 on 开头

// CSS 单位类型
type CSSValue = \`\${number}\${"px" | "em" | "rem" | "%"}\`;
let width: CSSValue = "100px";   // OK
let size: CSSValue = "1.5rem";   // OK
// let bad: CSSValue = "auto";    // 报错

// 结合映射类型——「给接口所有方法名加 on」模式
type EventHandlers<T> = {
  [K in keyof T as T[K] extends Function ? \`on\${Capitalize<string & K>}\` : never]: T[K];
};

interface Component {
  click(): void;
  change(): void;
  value: string;
}
type CompHandlers = EventHandlers<Component>;
// { onClick: () => void; onChange: () => void }（value 不是 Function 被过滤了）`,
          language: "typescript",
          tip: "Capitalize<X> 是 TS 自带工具，把字符串首字母变大写。还有 Uncapitalize、Uppercase、Lowercase——字符串也能玩出花。",
        },
      ],
      quiz: [
        { question: "联合类型 A | B 和交叉类型 A & B 的区别？", options: ["一样", "| 满足其一就行，& 两个都得满足", "| 是继承，& 是分开", "| 更快"], answer: 1, explanation: "联合是「或」——值只要是 A 或 B 之一就通过；交叉是「且」——值必须同时满足 A 和 B。" },
        { question: "infer 关键字在条件类型里的作用？", options: ["声明变量", "从条件类型中提取某个类型——抓住路过的东西", "等于 any", "等于 never"], answer: 1, explanation: "infer 在 T extends SomePattern<infer X> 这种写法里，从模式匹配中抓出某个类型供后续使用。" },
        { question: "映射类型 [K in keyof T]: T[K] 做了什么？", options: ["什么也没做", "遍历 T 的所有属性键，逐个处理——批量操作类型", "创建数组", "删除属性"], answer: 1, explanation: "映射类型相当于类型的 for...in 循环，对每个属性做同样操作，实现 Partial/Readonly 等工具类型。" },
        { question: "模板字面量类型 \`Hello, \${string}\` 能匹配什么？", options: ["只有 Hello", "以 Hello, 开头的任何字符串", "任何字符串", "数字"], answer: 1, explanation: "模板字面量类型能精确约束字符串模式，比如 \`\${number}px\` 只匹配以数字+px 结尾的字符串。" },
        { question: "Exclude<'a'|'b'|1|2, string> 的结果？", options: ["'a'|'b'", "1|2", "'a'|'b'|1|2", "never"], answer: 1, explanation: "Exclude 从第一个联合类型中踢掉符合第二个的类型，string 踢掉所有字符串类型，只剩数字。" },
      ],
    },
    "ts-decorators": {
      slug: "ts-decorators",
      sections: [
        {
          title: "装饰器是啥——给代码贴标签",
          content: `装饰器是一种声明式的「元编程」语法——你在类、方法、属性前面加个 @xxx，就相当于告诉编译器：「对这段代码额外做点事情」。常见场景：日志记录、权限校验、依赖注入、序列化。

装饰器本质上就是一个函数，不同的装饰器在不同的时机被调用。TS 目前还是实验性特性，需要在 tsconfig 里手动打开：`,
          code: `// tsconfig.json 中打开
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true   // 如果用了 reflect-metadata
  }
}`,
          language: "json",
        },
        {
          title: "类装饰器——管整个类",
          content: `类装饰器作用在类的构造函数上，可以修改或替换一个类。它接受一个参数——目标类的构造函数：`,
          code: `// 类装饰器——接收类的构造函数
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Dog {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// 装饰器工厂——可以传参数的装饰器
function Logger(prefix: string) {
  return function (constructor: Function) {
    console.log(prefix + " 创建了 " + constructor.name);
  };
}

@Logger("动物模块")
class Cat {
  constructor() {
    console.log("猫来了");
  }
}
// 输出：动物模块 创建了 Cat

// 传参数 + 改行为——给类加时间戳
function AddTimestamp<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    createdAt = new Date();
  };
}

@AddTimestamp
class Article {
  title: string;
  constructor(title: string) {
    this.title = title;
  }
}

const article = new Article("标题");
// article.createdAt 可以访问`,
          language: "typescript",
        },
        {
          title: "方法装饰器——管单个方法",
          content: `方法装饰器可以拦截方法的调用、修改参数、替换返回值。它接受三个参数：目标对象（实例或类）、方法名、属性描述符：`,
          code: `// 方法装饰器——记录方法调用
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("调用方法 " + propertyKey + "，参数：" + JSON.stringify(args));
    const result = original.apply(this, args);
    console.log("方法 " + propertyKey + " 返回：" + result);
    return result;
  };
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }

  @Log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const calc = new Calculator();
calc.add(2, 3);   // 输出：调用方法 add，参数：[2,3]  方法 add 返回：5

// 防抖装饰器——防止短时间内多次调用
function Debounce(delay: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    let timer: ReturnType<typeof setTimeout>;
    descriptor.value = function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => original.apply(this, args), delay);
    };
  };
}

class SearchBox {
  @Debounce(300)
  search(keyword: string) {
    console.log("搜索：" + keyword);
  }
}`,
          language: "typescript",
        },
        {
          title: "属性装饰器与参数装饰器",
          content: `属性和参数装饰器用的少一些，但在某些框架（如 Nest.js 的 @Body() @Param()）里很关键。属性装饰器能设元数据，参数装饰器能标注入参：`,
          code: `// 属性装饰器
function Required(target: any, propertyKey: string) {
  // 把必填信息存起来，后面验证时用
  const requiredKeys = Reflect.getMetadata("required", target) || [];
  requiredKeys.push(propertyKey);
  Reflect.defineMetadata("required", requiredKeys, target);
}

// 参数装饰器
function Param(name: string) {
  return function (target: any, methodName: string, paramIndex: number) {
    console.log("方法 " + methodName + " 的第 " + paramIndex + " 个参数名为 " + name);
  };
}

class UserController {
  @Required
  name: string;

  @Required
  email: string;

  greet(@Param("称呼") title: string, @Param("内容") msg: string) {
    console.log(title + ": " + msg);
  }
}

// 配合 reflect-metadata 实现依赖注入的简化版
import "reflect-metadata";

function Injectable() {
  return function (constructor: Function) {};
}

function Inject() {
  return function (target: any, key: string) {};
}

@Injectable()
class UserService {
  getUser() { return { name: "张三" }; }
}

@Injectable()
class UserController2 {
  @Inject()
  userService!: UserService;

  getProfile() {
    return this.userService.getUser();
  }
}`,
          language: "typescript",
          tip: "reflect-metadata 让装饰器能读写类型元数据，是 Nest.js、TypeORM 等框架的基石。注意 emitDecoratorMetadata 必须开启。",
        },
      ],
      quiz: [
        { question: "TS 装饰器默认能用吗？", options: ["能", "不能——需要在 tsconfig 开启 experimentalDecorators", "部分能", "不需要 TS"], answer: 1, explanation: "装饰器在 TS 中是实验性特性，必须手动在 tsconfig.json 里设置 experimentalDecorators: true。" },
        { question: "装饰器工厂和普通装饰器的区别？", options: ["一样", "工厂是返回装饰器的函数——可以传参数定制行为", "工厂更慢", "没有区别"], answer: 1, explanation: "装饰器工厂就是个高阶函数，外层收参数，内层返回真正的装饰器函数，实现可配。" },
        { question: "方法装饰器的 descriptor.value 是啥？", options: ["字符串", "原始方法函数——替换它就能拦截或修改方法行为", "数组", "布尔值"], answer: 1, explanation: "descriptor.value 就是原方法本身，装饰器可以保存原方法引用、用新函数替代、在新函数里调用原方法。" },
        { question: "reflect-metadata 的作用？", options: ["加速编译", "在运行时读写元数据——让装饰器能存储和查询类型信息", "替换类型检查", "没有作用"], answer: 1, explanation: "reflect-metadata 提供 Reflect.defineMetadata/getMetadata API，装饰器用它存类型信息供框架运行时使用。" },
        { question: "属性装饰器能像方法装饰器一样改值吗？", options: ["能", "不能直接改——拿不到 descriptor，通常用于收集元数据", "完全一样", "更强大"], answer: 1, explanation: "属性装饰器只收到 target 和 key，没有 PropertyDescriptor，不能直接拦截读写，主要用来收集标记（如必填、验证规则）。" },
      ],
    },
    "ts-project": {
      slug: "ts-project",
      sections: [
        {
          title: "tsconfig.json 配置精讲",
          content: `tsconfig.json 是 TS 项目的总控制台。每个选项都影响编译结果和检查严谨程度。关键配置分三大块：编译输出（target/module/outDir）、严格性（strict/相关的子选项）、路径和模块解析：`,
          code: `{
  "compilerOptions": {
    // 编译目标
    "target": "ES2020",        // 编译成哪个 JS 版本
    "module": "ESNext",        // 模块系统（Node 用 CommonJS，前端用 ESNext）
    "lib": ["ES2020", "DOM"],  // 包含哪些类型库（DOM 类型给前端用）

    // 输出
    "outDir": "./dist",        // 编译产物放哪
    "rootDir": "./src",        // 源码根目录（编译后保留目录结构）
    "declaration": true,       // 生成 .d.ts 声明文件
    "declarationDir": "./types", // d.ts 单独放

    // 严格性（强烈建议全开）
    "strict": true,            // 总开关——等价于下面六个全开
    // "noImplicitAny": true,  // 不准隐式 any
    // "strictNullChecks": true,// null/undefined 单独处理，不准随便赋值
    // "strictFunctionTypes": true,
    // "noImplicitReturns": true,

    // 模块解析
    "moduleResolution": "node", // 像 Node 那样找模块
    "esModuleInterop": true,   // 让 import 兼容 CommonJS
    "resolveJsonModule": true, // 能 import JSON 文件
    "baseUrl": "./",           // 路径别名起点
    "paths": {                 // 路径别名——告别 ../../../../
      "@/*": ["src/*"],
      "@utils/*": ["src/utils/*"],
      "@components/*": ["src/components/*"]
    },

    // 其他
    "skipLibCheck": true,      // 跳过 .d.ts 检查（加速）
    "forceConsistentCasingInFileNames": true  // 文件名大小写敏感
  },
  "include": ["src/**/*"],     // 编译哪些
  "exclude": ["node_modules", "dist"]  // 忽略哪些
}`,
          language: "json",
          tip: "strict 是最该开的配置——虽然开启后报错更多，但帮你提前发现 null/undefined 等隐患，比事后修 bug 强百倍。",
        },
        {
          title: "声明文件——给纯 JS 代码添加类型",
          content: `.d.ts 文件是 TS 的「类型说明书」——只写类型不写实现。当你用纯 JS 写的库或老的 npm 包时，自己写个 .d.ts 就能让 TS 认识这些代码：`,
          code: `// my-library.js（纯 JS 代码，没有类型）
function calculate(a, b, operation) {
  if (operation === "add") return a + b;
  if (operation === "subtract") return a - b;
  throw new Error("Unknown operation");
}

// my-library.d.ts（类型声明文件）
declare function calculate(
  a: number,
  b: number,
  operation: "add" | "subtract"
): number;

export { calculate };

// 声明全局变量——比如第三方脚本挂到 window 上的
declare global {
  interface Window {
    gtag: (event: string, params: Record<string, any>) => void;
  }
}

// 声明模块——让 TS 认识 .vue .svg 等非 JS 文件
declare module "*.vue" {
  import { defineComponent } from "vue";
  export default defineComponent;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

// 扩展已有类型——给 Express 的 Request 加了 user 属性
declare namespace Express {
  interface Request {
    user?: { id: number; name: string };
  }
}`,
          language: "typescript",
          tip: "第三方库如果自带 @types/xxx 直接装就行。如果没有（比如小众库），自己写个 xxx.d.ts 最省事。TypeScript 类型定义包全在 @types 命名空间下。",
        },
        {
          title: "路径别名——别再 ../../../ 了",
          content: `项目中跨目录引用常写成 ../../../utils/format，又丑又容易出错。TS 的路径别名让你用 @/utils/format 这种清爽写法。但要注意，TS 和打包工具的配置得同步：`,
          code: `// tsconfig.json 配置
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@shared/*": ["src/shared/*"],
      "@types/*": ["src/types/*"]
    }
  }
}

// 使用——告别丑陋的相对路径
// 之前：import { formatDate } from "../../../utils/format"
// 现在：import { formatDate } from "@/utils/format"

// Webpack 配合（webpack.config.js）
module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};

// Vite 配合（vite.config.ts）——更简单
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});`,
          language: "typescript",
          warning: "路径别名只是 TS 和打包工具层面的映射，编译后的 JS 代码里路径不会变。Node 直接运行编译产物时可能找不到，得用 tsconfig-paths 或 module-alias。",
        },
        {
          title: "严格模式——宁可编译时多报错",
          content: `strict 模式是 TS 的质量底线。不开严格模式等于买个保险但不锁门。几个关键子选项的作用：`,
          code: `// noImplicitAny——不准隐式 any
function fn(x) {         // strict 模式下报错：x 没有类型
  return x + 1;
}
// 必须显式：
function fn(x: number) { return x + 1; }

// strictNullChecks——null 和 undefined 不是任何类型的子类型
let name: string;
// name = null;          // strict 模式报错！
name = "hello";          // OK

let maybeName: string | null = null;  // 明确声明可以为 null
// maybeName.toUpperCase();           // 报错，可能为 null
if (maybeName !== null) {
  maybeName.toUpperCase();            // 安全
}

// 实践中的防御
function getLength(str: string | null): number {
  // return str.length;   // 报错，str 可能为 null
  return str?.length ?? 0;  // 安全处理
}

// noUncheckedIndexedAccess——数组索引可能不存在
const arr = [1, 2, 3];
// const x: number = arr[5];  // 开启后报错，arr[5] 可能是 undefined
const x: number | undefined = arr[5];  // 必须考虑 undefined`,
          language: "typescript",
          tip: "建议新项目开 strict: true，老项目可以逐步开启。strictNullChecks 是最重要的子选项——解决了十亿美元级别的空指针问题。",
        },
        {
          title: "类型定义——@types 大仓库",
          content: `npm 上有个叫 @types 的组织，专门放第三方库的类型定义。用 TS 写项目时，大部分 npm 包的类型都能在 @types 下找到。装法很简单：`,
          code: `# 安装类型定义
npm install --save-dev @types/node        # Node.js 类型
npm install --save-dev @types/react       # React 类型
npm install --save-dev @types/express     # Express 类型
npm install --save-dev @types/lodash      # lodash 类型

# 查看包是否自带类型
# 如果包的 package.json 里有 "types" 字段，说明自带
# 没有的话去 TypeSearch 搜：https://www.typescriptlang.org/dt/search

# tsconfig.json 中指定类型——只加载需要的
{
  "compilerOptions": {
    "types": ["node", "jest"]  // 只加载这两个，忽略其他的 @types
  }
}

// 使用时有类型提示
import express from "express";
// TS 知道 express() 返回什么，req 有哪些方法
const app = express();
app.get("/", (req, res) => {
  res.send("Hello");
  // req.ip, req.method 都有类型提示
});

// 没有类型定义怎么办——写个简单的 ambient 声明
declare module "some-js-lib" {
  export function doSomething(input: string): number;
}

// 或者在 src 下新建 types 目录，放入 xxx.d.ts
// src/types/some-js-lib.d.ts`,
          language: "typescript",
          tip: "安装 @types/xxx 时注意版本号跟实际包对应——@types/react@18 对应 react@18，版本不匹配可能出现奇怪的报错。",
        },
      ],
      quiz: [
        { question: "tsconfig.json 里 strict: true 等价于？", options: ["一键清空", "同时开启 noImplicitAny/strictNullChecks 等多个严格选项", "关闭所有检查", "加速编译"], answer: 1, explanation: "strict 是总开关，开启后多个严格子选项全打开，覆盖最常见的类型隐患。" },
        { question: "strictNullChecks 开启后，string 和 string|null 的区别？", options: ["没区别", "string 不能赋 null，string|null 可以——严格区分可控和不可控", "string|null 更慢", "string 报错"], answer: 1, explanation: "strictNullChecks 让 null/undefined 成为独立类型，必须显式标注才能接收，避免空指针。" },
        { question: ".d.ts 声明文件里写什么？", options: ["实现代码", "只写类型声明——函数签名、变量类型，不写实现", "配置文件", "测试"], answer: 1, explanation: "声明文件 .d.ts 是纯类型描述，declare 关键字的函数/变量只告诉 TS 类型信息，没有运行时代码。" },
        { question: "路径别名 @/utils 映射到 src/utils，需要同步哪些配置？", options: ["只需要 tsconfig", "tsconfig.json + 构建工具（Webpack/Vite）——两边都得配", "不需要配置", "只需要 Webpack"], answer: 1, explanation: "TS 的 paths 只负责编译时类型检查通过，实际模块解析得靠打包工具的别名配置，两边都得一致。" },
        { question: "没有 @types 定义的 npm 包怎么在 TS 里用？", options: ["不能", "自己写 .d.ts 声明文件或 declare module", "只能用 JS 写", "忽略就行"], answer: 1, explanation: "对没有类型声明的包，写个简单的 .d.ts 或 declare module 让 TS 认识它，哪怕只声明最简单的类型也比报错强。" },
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
    "java-oop": {
      slug: "java-oop",
      sections: [
        {
          title: "类和对象——兵工厂和生产出来的兵",
          content: `Java 里 class 就是模具，对象是从模具里倒出来的具体东西。你写个 class 定义了属性（成员变量）和方法，然后 new 一下，就产出一个对象。`,
          code: `class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void introduce() {
        System.out.println("我叫" + name + "，今年" + age + "岁");
    }
}

Student s1 = new Student("张三", 18);
s1.introduce();`,
          language: "java",
        },
        {
          title: "封装——管好自己的东西",
          content: `封装说白了就是把数据藏起来不让别人乱碰，只通过你规定的方法来操作。用 private 把字段锁起来，然后用 getter/setter 当窗口——你可以加数据校验、日志啥的。`,
          code: `class BankAccount {
    private double balance;

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("金额得是正数");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) throw new RuntimeException("余额不够");
        balance -= amount;
    }
}`,
          language: "java",
        },
        {
          title: "继承——子继父业但可以另搞一套",
          content: `extends 就是继承，子类自动获得父类的属性和方法。你可以直接用，也可以覆盖（override）父类的方法来定制自己的行为。Java 只支持单继承，一个儿子只能有一个爹，但可以通过接口实现多继承的效果。`,
          code: `class Animal {
    void speak() {
        System.out.println("动物叫了一声");
    }
}

class Dog extends Animal {
    @Override
    void speak() {
        System.out.println("汪汪！");
    }
}`,
          language: "java",
        },
        {
          title: "抽象类 vs 接口",
          content: `抽象类是有未完工方法的类，不能直接 new，得子类把抽象方法实现了才行。接口就是一纸合同——规定你「必须会什么」，但不管你怎么做。一个类可以实现多个接口，但只能继承一个抽象类。`,
          code: `abstract class Shape {
    abstract double area();
}

interface Flyable {
    void fly();
}

interface Runnable {
    void run();
}

class Bird extends Shape implements Flyable, Runnable {
    @Override double area() { return 0; }
    @Override public void fly() { System.out.println("飞了"); }
    @Override public void run() { System.out.println("跑了"); }
}`,
          language: "java",
        },
        {
          title: "重写(Override) vs 重载(Overload)",
          content: `重写是子类换个实现方式（方法签名完全一样），运行时决定调哪个。重载是同一个方法名参数不同，编译时就定好了调哪个。记住一句话：重写看对象，重载看参数。`,
          code: `class Parent {
    void say() { System.out.println("parent"); }
}

class Child extends Parent {
    @Override void say() { System.out.println("child"); }  // 重写

    void say(String msg) { System.out.println(msg); }      // 重载
}`,
          language: "java",
          warning: "重写时别忘了 @Override 注解，让编译器帮你检查是不是真重写了，避免手滑写错。",
        },
      ],
      quiz: [
        { question: "private 修饰的变量能被谁访问？", options: ["任何类", "同一个类内部", "子类", "同包的类"], answer: 1, explanation: "private 是最严格的——只能类自己的方法用，子类和外部都碰不到。" },
        { question: "Override 和 Overload 的本质区别？", options: ["没区别", "重写是运行时多态，重载是编译期确定", "重载只用于 static 方法", "重写不改变参数"], answer: 1, explanation: "重写靠对象实际类型决定调谁（运行时），重载靠参数类型匹配（编译期）。" },
        { question: "Java 一个类能继承几个父类？", options: ["不限", "一个", "两个", "三个"], answer: 1, explanation: "Java 单继承，一个类只能 extends 一个父类，但可以实现多个接口。" },
        { question: "抽象类能直接 new 吗？", options: ["能", "不能，得子类实现了抽象方法后才能 new 子类", "能但会报错", "取决于版本"], answer: 1, explanation: "抽象类本身不能实例化，必须被子类继承并实现所有抽象方法后再 new 子类。" },
        { question: "接口里能不能有具体实现的方法？", options: ["不能", "Java 8+ 可以有 default 方法", "一直都能", "只有 JDK 17 支持"], answer: 1, explanation: "从 Java 8 开始接口可以有 default 和 static 方法带方法体，但要兼容升级老代码才用，别滥用。" },
      ],
    },
    "java-collections": {
      slug: "java-collections",
      sections: [
        {
          title: "集合框架概览",
          content: `Java 集合框架就是数据结构的现成实现。两大分支：Collection（单列数据）和 Map（键值对）。常用的一只手数得过来——ArrayList、LinkedList、HashSet、HashMap。`,
          code: `List<String> list = new ArrayList<>();    // 动态数组，查快
Set<String> set = new HashSet<>();        // 不重复，去重用
Map<String, Integer> map = new HashMap<>(); // 键值对，查快
Queue<String> queue = new LinkedList<>();  // 队列，先进先出`,
          language: "java",
        },
        {
          title: "ArrayList vs LinkedList——各有所长",
          content: `ArrayList 底层是数组，按索引查飞快（O(1)），但中间插入/删除要搬动后面元素（O(n)）。LinkedList 底层是双向链表，插入删除快（O(1)），但按索引查得从头走到尾（O(n)）。实际开发里 ArrayList 用得更多。`,
          code: `// ArrayList 的扩缩容——默认初始 10，满了自动 1.5 倍扩容
List<String> list = new ArrayList<>();
list.add("a");
list.add(1, "b");         // 插到索引 1，后面全后移
list.get(0);              // O(1) 秒出
list.remove(0);           // 删了得挪位置

// LinkedList 适合当队列/栈用
LinkedList<String> linked = new LinkedList<>();
linked.addFirst("头部");
linked.addLast("尾部");
linked.removeFirst();     // O(1)`,
          language: "java",
        },
        {
          title: "HashMap——数组加链表加红黑树",
          content: `HashMap 的底层是数组 + 链表 + 红黑树。算出 key 的 hashCode，找到数组位置，撞上了就用链表/红黑树处理。JDK8 后链表超过 8 个会转红黑树提高查找效率。默认容量 16，负载因子 0.75。`,
          code: `Map<String, Integer> map = new HashMap<>();
map.put("apple", 3);
map.put("banana", 5);
map.get("apple");              // 3
map.containsKey("banana");     // true
map.getOrDefault("unknown", 0); // key 不在时返回默认值

// 遍历
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}`,
          language: "java",
        },
        {
          title: "HashSet——靠 HashMap 养活的",
          content: `HashSet 底层就是个 HashMap，只用了 key 不要 value，value 统一放一个 dummy 对象。所以它不能重复、无序、能存 null。适合去重、判断存在。`,
          code: `Set<String> set = new HashSet<>();
set.add("apple");
set.add("apple");            // 重复的加不进去
System.out.println(set.size()); // 1

// 去重列表
List<String> list = Arrays.asList("a", "b", "a", "c", "b");
Set<String> unique = new HashSet<>(list);`,
          language: "java",
          tip: "要保证 HashSet 正常工作，你的对象必须正确重写 hashCode() 和 equals()，否则「重复」的判断会出 bug。",
        },
      ],
      quiz: [
        { question: "ArrayList 查找元素的复杂度？", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], answer: 1, explanation: "底层是数组，按索引直接跳到对应位置，常数时间完成。" },
        { question: "HashMap 的底层是什么？", options: ["纯数组", "数组 + 链表/红黑树", "纯链表", "二叉树"], answer: 1, explanation: "JDK7 是数组+链表，JDK8 后链表超过 8 个转红黑树以防退化。" },
        { question: "HashSet 是怎么保证不重复的？", options: ["逐个比较", "底层是 HashMap 用 key 保证唯一", "排序后去重", "用数据库约束"], answer: 1, explanation: "HashSet 就是 HashMap 马甲——add 时看 HashMap 的 key 是不是已存在。" },
        { question: "LinkedList 什么时候好用？", options: ["按索引查", "频繁头尾插删、当队列/栈用", "大量随机查", "存储大量数据"], answer: 1, explanation: "双向链表头尾操作 O(1)，适合做队列（FIFO）和栈（LIFO）。" },
        { question: "HashMap 的负载因子 0.75 是什么意思？", options: ["容量为 75", "填到 75% 就扩容", "只能存 75 个元素", "查询成功率 75%"], answer: 1, explanation: "负载因子是填充率阈值——HashMap 装到 75% 满了就自动扩两倍容量，减少哈希冲突。" },
      ],
    },
    "java-exception": {
      slug: "java-exception",
      sections: [
        {
          title: "异常体系——出错也得分三六九等",
          content: `Java 的异常分两大类：Checked 异常（编译期逼你处理的，比如 IO 异常）和 Unchecked 异常（运行时炸的，比如空指针、数组越界）。异常类都继承自 Throwable，下面分 Error（严重问题，不用管）和 Exception。`,
          code: `// Error：太严重，程序不该处理
// Exception: 程序可以处理的问题
//   ├── RuntimeException (unchecked)：不强制 try-catch
//   └── IOException (checked)：编译期必须处理`,
          language: "java",
        },
        {
          title: "try-catch-finally——把错误兜住",
          content: `try 里放可能炸的代码，catch 负责救火，finally 无论炸不炸都执行（收尾用）。Java 7 开始支持 try-with-resources，自动关流。`,
          code: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("除以零了:" + e.getMessage());
} finally {
    System.out.println("清理资源");
}

// try-with-resources（自动关流）
try (FileReader fr = new FileReader("file.txt")) {
    // 用完后 fr 自动关，不用写 finally
}`,
          language: "java",
        },
        {
          title: "throw 和 throws 的区别",
          content: `throw 是在方法里面主动丢出异常。throws 是在方法签名上声明——告诉调用方「我这方法可能会炸，你得注意」。`,
          code: `// throws：声明这个方法可能抛出什么异常
public void readFile(String path) throws IOException {
    Files.readString(Path.of(path));
}

// throw：主动丢一个异常对象
public void checkAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("年龄不能是负数: " + age);
    }
}`,
          language: "java",
        },
        {
          title: "自定义异常——造自己的错误类型",
          content: `当你觉得 Java 自带的异常不够表达错误原因时，自己写一个。继承 Exception（checked）或 RuntimeException（unchecked）。关键是给足错误信息，让调查问题的人一眼看懂发生了什么。`,
          code: `class InsufficientBalanceException extends RuntimeException {
    private double balance;
    private double need;

    InsufficientBalanceException(double balance, double need) {
        super("余额不足！当前余额: " + balance + "，需要: " + need);
        this.balance = balance;
        this.need = need;
    }
}

public void transfer(double amount) {
    if (balance < amount) {
        throw new InsufficientBalanceException(balance, amount);
    }
}`,
          language: "java",
          tip: "业务异常带上关键数据（比如余额、订单号），不是光甩一句错误消息，这样查 bug 时能省一半时间。",
        },
      ],
      quiz: [
        { question: "Checked 和 Unchecked 异常最大的区别？", options: ["记录方式不同", "Checked 编译期必须处理，Unchecked 可选", "Unchecked 不能 catch", "Checked 只能 throw"], answer: 1, explanation: "Checked 异常编译器强制你 try-catch 或 throws 声明，Unchecked 随你处理不处理。" },
        { question: "throw 和 throws 谁是实际抛出异常？", options: ["throws", "throw", "两个都是", "两个都不是"], answer: 1, explanation: "throw 是在代码里真的把一个异常对象丢出去，throws 只是方法签名上的声明。" },
        { question: "finally 块什么时候不执行？", options: ["有异常时", "System.exit() 或 JVM 崩了", "只要 try 没异常", "只在 catch 后执行"], answer: 1, explanation: "finally 正常情况下都会执行，除非 JVM 收到 exit 信号或直接崩了。" },
        { question: "try-with-resources 比传统 try-finally 好在哪？", options: ["更快", "代码更短，自动关资源不用自己写关闭", "不抛异常", "可以不用 catch"], answer: 1, explanation: "它让实现 AutoCloseable 的资源自动关闭，代码简洁不出错，不用在 finally 手写关闭逻辑。" },
        { question: "自定义业务异常通常继承谁？", options: ["Error", "RuntimeException 或 Exception", "Throwable", "Object"], answer: 1, explanation: "通常继承 RuntimeException（非必须处理）或 Exception（必须处理），看业务需求。" },
      ],
    },
    "java-io": {
      slug: "java-io",
      sections: [
        {
          title: "字节流——拿数据当字节看",
          content: `字节流按 byte 读写，适合处理图片、视频、文件复制等二进制数据。InputStream/OutputStream 是基类，FileInputStream、BufferedInputStream 是常用子类。`,
          code: `// 字节流读文件
try (FileInputStream fis = new FileInputStream("input.txt");
     FileOutputStream fos = new FileOutputStream("output.txt")) {
    byte[] buffer = new byte[1024];
    int len;
    while ((len = fis.read(buffer)) != -1) {
        fos.write(buffer, 0, len);
    }
}`,
          language: "java",
        },
        {
          title: "字符流——处理文本专用",
          content: `字符流按 char 读写，自动处理字符编码，读文本别用字节流。Reader/Writer 是基类，FileReader、BufferedReader 是常用子类。`,
          code: `// 字符流逐行读写
try (BufferedReader br = new BufferedReader(new FileReader("input.txt"));
     BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        bw.write(line);
        bw.newLine();
    }
}`,
          language: "java",
        },
        {
          title: "缓冲流——加个中间仓库提效",
          content: `BufferedInputStream 和 BufferedReader 自带缓冲区，一次读一批数据放内存，减少真正的磁盘 IO 次数，速度提升明显。搞大文件读写强烈建议套一层缓冲。`,
          code: `// 不带缓冲 vs 带缓冲
FileInputStream fis = new FileInputStream("bigfile.bin");  // 每次 read 都打硬盘
BufferedInputStream bis = new BufferedInputStream(new FileInputStream("bigfile.bin")); // 一次读 8KB 到内存`,
          language: "java",
        },
        {
          title: "NIO 简介——非阻塞高性能",
          content: `NIO（New IO）是 Java 1.4 引入的高性能 IO 方案。核心是 Channel（通道）和 Buffer（缓冲区），支持非阻塞模式。跟老 IO 比，NIO 一个线程能管多个连接，高并发场景必备。Netty、Tomcat 底层都用了 NIO。`,
          code: `// NIO 读文件
Path path = Path.of("data.txt");
String content = Files.readString(path);  // JDK11+

// NIO Channel + Buffer 方式
FileChannel channel = FileChannel.open(Path.of("data.txt"));
ByteBuffer buffer = ByteBuffer.allocate(1024);
channel.read(buffer);`,
          language: "java",
          tip: "日常开发用 Files.readString / Files.writeString 最省事，高并发网络编程再去深入学习 NIO 和 Netty。",
        },
      ],
      quiz: [
        { question: "字节流和字符流选哪个读文本？", options: ["字节流", "字符流", "随便", "都不用"], answer: 1, explanation: "字符流自动处理编码转换读文本，字节流只认识 0 和 1，读中文可能乱码。" },
        { question: "BufferedReader 的 buffered 是什么意思？", options: ["缓冲区——减少磁盘 IO", "加了权限控制", "只能读压缩文件", "自动备份"], answer: 0, explanation: "缓冲的意思就是中间加了个缓存区，一次从磁盘多读点，后续从内存取而不是每次都打硬盘。" },
        { question: "NIO 和老 IO 最大的区别？", options: ["速度", "NIO 支持非阻塞和 Channel/Buffer 模式", "老 IO 不支持文件", "NIO 更简单"], answer: 1, explanation: "NIO 把面向 Stream 改成面向 Channel+Buffer，支持非阻塞，一个线程管多路连接。" },
        { question: "try-with-resources 里声明的资源实现了什么接口？", options: ["Serializable", "AutoCloseable", "Comparable", "Cloneable"], answer: 1, explanation: "实现 AutoCloseable（或 Closeable）接口的资源才能放在 try() 里自动关闭。" },
        { question: "FileReader 和 FileInputStream 谁适合读中文文本？", options: ["FileInputStream", "FileReader", "两个一样", "都不行"], answer: 1, explanation: "FileReader 是字符流，按 char 读能正确理解 utf-8 编码的中文；FileInputStream 按 byte 读可能把中文拆乱。" },
      ],
    },
    "java-threads": {
      slug: "java-threads",
      sections: [
        {
          title: "线程是啥——同时干多件事",
          content: `一个线程就是一条执行流水线，多线程就是多条流水线同时干活。Java 里创建线程两种方式：继承 Thread 类或者实现 Runnable 接口。推荐用 Runnable——Java 单继承，把 extends 留给更有用的类。`,
          code: `// 方式一：继承 Thread
class MyThread extends Thread {
    @Override public void run() {
        System.out.println("线程跑起来了: " + Thread.currentThread().getName());
    }
}
new MyThread().start();

// 方式二：实现 Runnable（推荐）
Thread t = new Thread(() -> {
    System.out.println("用 Lambda 更简洁");
});
t.start();`,
          language: "java",
        },
        {
          title: "线程池——重复利用别新建",
          content: `线程不是越多越好。创建和销毁线程开销不小，而且线程多了 CPU 光切换上下文就累死了。线程池预先创建一批线程，任务来了分配线程执行，用完回收不销毁。`,
          code: `// 用 Executors 创建线程池
ExecutorService pool = Executors.newFixedThreadPool(4);

for (int i = 0; i < 10; i++) {
    final int taskId = i;
    pool.submit(() -> {
        System.out.println("任务 " + taskId + " 由 " + Thread.currentThread().getName() + " 执行");
    });
}
pool.shutdown();  // 不再接新任务，把手头的干完就关`,
          language: "java",
        },
        {
          title: "synchronized——排队过独木桥",
          content: `多线程同时改同一个数据会出问题——比如两个线程同时 count++，可能只加了一次。synchronized 就是给代码块上锁，同一时刻只允许一个线程进去。`,
          code: `class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

// 同步代码块——锁的范围更灵活
synchronized (this) {
    // 只有拿到 this 锁的线程才能进来
}`,
          language: "java",
        },
        {
          title: "volatile——保证可见性但不保证原子性",
          content: `volatile 修饰的变量被一个线程改后，其他线程能立马看到新值（不会读缓存）。但它不保证原子性——count++ 这种「读-改-写」操作还得用 synchronized 或 AtomicInteger。volatile 适合做开关标记。`,
          code: `class TaskRunner {
    private volatile boolean running = true;

    public void stop() {
        running = false;  // 主线程一改，子线程立马感知
    }

    public void run() {
        while (running) {
            // 干活...
        }
    }
}`,
          language: "java",
          tip: "volatile 解决的是可见性问题，不是原子性问题。要计数器/累加器保证正确，用 AtomicInteger 或 synchronized。",
        },
      ],
      quiz: [
        { question: "start() 和 run() 的区别？", options: ["一样", "start 开新线程执行 run，直接调 run 当前线程跑", "run 开了线程", "start 没作用"], answer: 1, explanation: "start() 让 JVM 创建新线程然后在新线程里调 run()。直接调 run() 就是普通方法调用，你在当前线程里跑。" },
        { question: "线程池的好处？", options: ["跑得更快", "复用线程减少创建销毁开销，控制并发数", "代码更少", "不用多线程"], answer: 1, explanation: "线程池预先造好线程，用完不销毁，避免了频繁建线程的损耗，还能限制同时运行的线程数。" },
        { question: "synchronized 和 volatile 的核心区别？", options: ["一样", "synchronized 既保证可见性又保证原子性，volatile 只保证可见性", "volatile 更强", "synchronized 更快"], answer: 1, explanation: "synchronized 上锁后其他线程进不来，保证读写不交错。volatile 只是让变量不缓存，不改原子性问题。" },
        { question: "newFixedThreadPool 固定线程池的线程数指的是？", options: ["总任务数", "同时运行的线程数", "线程优先级", "任务队列长度"], answer: 1, explanation: "固定大小线程池同时最多跑那么多线程，多余的任务在队列里排队等空闲线程。" },
        { question: "死锁是什么？举个简单例子。", options: ["线程运行完了", "两个线程互相等对方手里的锁，都卡住了", "锁用完了", "线程被 killed"], answer: 1, explanation: "线程 A 拿着锁 1 等锁 2，线程 B 拿着锁 2 等锁 1——互相等，谁也动不了。" },
      ],
    },
    "java-jdbc": {
      slug: "java-jdbc",
      sections: [
        {
          title: "JDBC 是什么——Java 跟数据库的桥梁",
          content: `JDBC 是 Java 操作数据库的标准接口。你用同一套 API，换不同数据库只改驱动和连接串就行，代码不用大改。五步走：加载驱动、建连接、创建 Statement、执行 SQL、处理结果。`,
          code: `// 基本 JDBC 操作
String url = "jdbc:mysql://localhost:3306/mydb";
String user = "root";
String password = "123456";

try (Connection conn = DriverManager.getConnection(url, user, password);
     Statement stmt = conn.createStatement()) {

    ResultSet rs = stmt.executeQuery("SELECT * FROM users");
    while (rs.next()) {
        System.out.println(rs.getString("username"));
    }
}`,
          language: "java",
        },
        {
          title: "PreparedStatement——防 SQL 注入利器",
          content: `千万不要用字符串拼接 SQL，那是给黑客留门。PreparedStatement 用占位符 ? 代替参数，数据库会先编译 SQL 再填入值——你输入什么特殊字符都没用，数据库分得清指令和数据。`,
          code: `// PreparedStatement 防注入
String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
try (Connection conn = DriverManager.getConnection(url, user, password);
     PreparedStatement pstmt = conn.prepareStatement(sql)) {

    pstmt.setString(1, username);
    pstmt.setString(2, password);
    ResultSet rs = pstmt.executeQuery();
}`,
          language: "java",
        },
        {
          title: "事务——要么全成功要么全取消",
          content: `转账这种操作不能做一半——钱扣了但没加到对方账户上那是不行的。事务保证一组操作要么全部成功提交，要么全部回滚。JDBC 默认自动提交，要做事务先关自动提交。`,
          code: `Connection conn = null;
try {
    conn = DriverManager.getConnection(url, user, password);
    conn.setAutoCommit(false);  // 关自动提交

    // 扣张三的钱
    pstmt1.executeUpdate();
    // 给李四加钱
    pstmt2.executeUpdate();

    conn.commit();  // 都成功了一起提交
} catch (Exception e) {
    if (conn != null) conn.rollback();  // 出错了全回滚
}`,
          language: "java",
        },
        {
          title: "连接池——复用连接别每次建新的",
          content: `每次访问数据库都建个新连接开销很大（TCP 握手、数据库认证）。连接池预先创建一批连接，用完不关而是归还到池里下次复用。HikariCP 是目前的性能王者。`,
          code: `// HikariCP 连接池配置
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
config.setUsername("root");
config.setPassword("123456");
config.setMaximumPoolSize(10);

HikariDataSource ds = new HikariDataSource(config);

try (Connection conn = ds.getConnection()) {
    // 这个连接是从池里借的，用完自动归还
}`,
          language: "java",
          tip: "生产环境一定要用连接池。HikariCP、Druid 都是成熟选择，别用 DriverManager 直接连。",
        },
      ],
      quiz: [
        { question: "PreparedStatement 凭什么防 SQL 注入？", options: ["加密了", "编译 SQL 和参数分开，用户输入不会被当成 SQL 执行", "更快的速度", "自动转义"], answer: 1, explanation: "SQL 先编译好结构，参数再填入——用户输入不管写什么都不会改变 SQL 的结构。" },
        { question: "事务的 ACID 属性指什么？", options: ["四种 SQL 方法", "原子性、一致性、隔离性、持久性", "四种数据库类型", "四种锁机制"], answer: 1, explanation: "ACID 是事务四大保证：Atomicity 原子、Consistency 一致、Isolation 隔离、Durability 持久。" },
        { question: "连接池解决了什么问题？", options: ["数据多了", "连接复用——避免频繁建连的 TCP 和认证开销", "SQL 更精简", "不需要数据库了"], answer: 1, explanation: "每次建连接都要三次握手 + 数据库认证，连接池预建一批连接循环用，省时又高效。" },
        { question: "conn.setAutoCommit(false) 之后忘了 commit 会咋样？", options: ["自动提交", "数据可能丢失——连接关了事务自动回滚", "数据库崩溃", "不影响"], answer: 1, explanation: "关自动提交后不 commit 就关连接，这组操作全部回滚——改了半天等于没改。" },
        { question: "executeQuery() 和 executeUpdate() 区别？", options: ["没区别", "前者查(SELECT)返回 ResultSet，后者改(INSERT/UPDATE/DELETE)返回影响行数", "executeUpdate 更快", "executeQuery 只能查一张表"], answer: 1, explanation: "Query 是查询用返回结果集，Update 是增删改用返回影响了几行。" },
      ],
    },
    "go-structs": {
      slug: "go-structs",
      sections: [
        {
          title: "结构体定义——Go 里的「类」",
          content: `Go 没有 class，用 struct 来组织数据。结构体就是一组字段的集合，每个字段有名字和类型。字段名首字母大写表示公开（exported），小写表示私有——这就是 Go 的访问控制方式。`,
          code: `type User struct {
    Name  string // 公开字段
    age   int    // 私有字段（包外访问不到）
}

func main() {
    u1 := User{Name: "张三", age: 18}
    u2 := User{"李四", 20}         // 按顺序赋值，不推荐

    fmt.Println(u1.Name)           // 张三
    // fmt.Println(u1.age)         // 编译错误：age 在包外不可见
}`,
          language: "go",
        },
        {
          title: "方法——给 struct 加行为",
          content: `Go 的方法定义在函数名前面加一个接收者（receiver）。接收者说白了就是「这个方法属于哪个类型的」。方法的接收者可以是值类型（操作的是副本）也可以是指针类型（操作的是原数据）。`,
          code: `type Rectangle struct {
    Width, Height float64
}

// 值接收者：不会改原数据
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

// 指针接收者：会改原数据
func (r *Rectangle) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}`,
          language: "go",
        },
        {
          title: "值接收者 vs 指针接收者——什么时候用指针",
          content: `值接收者拿到的是结构体的一个拷贝，改它不影响原数据。指针接收者拿到的是原始数据的地址，你改的就是真的数据。简单记：要改数据的用指针，结构体大的用指针（避免拷贝），只读的小结构体随便。`,
          code: `func main() {
    rect := Rectangle{10, 5}

    fmt.Println(rect.Area())  // 50.0 值接收者
    rect.Scale(2)             // 指针接收者——Go 自动帮你 &rect
    fmt.Println(rect.Width)   // 20.0 真的被改了
}`,
          language: "go",
          tip: "Go 里定义一个类型时，所有方法最好统一用指针接收者或都用值接收者，混着用容易让人困惑。",
        },
      ],
      quiz: [
        { question: "Go 里怎么实现类似面向对象的封装？", options: ["用 class", "字段名首字母大写公开，小写包内私有", "全用 interface", "不能封装"], answer: 1, explanation: "Go 没有 class 和访问修饰符，靠首字母大小写控制可见性——大写 exported，小写 unexported。" },
        { question: "指针接收者和值接收者的核心区别？", options: ["没区别", "指针接收者能改原结构体值，值接收者操作的是副本", "值接收者更快", "指针接收者只能用于小结构体"], answer: 1, explanation: "值接收者传的是副本不会影响原始数据，指针接收者拿到原数据地址可以修改。" },
        { question: "Go 结构体字段名首字母小写意味着什么？", options: ["报错", "该字段包外不可访问", "自动生成 getter", "是常量"], answer: 1, explanation: "Go 用首字母大小写做访问控制——小写 = 包内可见，大写 = 公开（exported）。" },
        { question: "Go 的方法可以定义在哪些类型上？", options: ["只 struct", "本包内定义的所有类型", "任何类型包括 string int", "只 interface"], answer: 1, explanation: "Go 可以为任何本包中定义的类型声明方法，但不能给包外类型（如内置的 int、string）加方法。" },
      ],
    },
    "go-error": {
      slug: "go-error",
      sections: [
        {
          title: "Go 的错误处理——error 就是个接口",
          content: `Go 没有 try-catch，error 就是一个普通的接口，只有一个 Error() 方法返回错误消息。函数多返回值是 Go 的经典模式——最后一个返回值放 error，调用方每次都要检查它是不是 nil。`,
          code: `// error 接口的定义
type error interface {
    Error() string
}

func readFile(path string) ([]byte, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("读文件失败 %s: %w", path, err)
    }
    return data, nil
}`,
          language: "go",
        },
        {
          title: "panic 和 recover——天塌了的处理",
          content: `panic 是 Go 的「崩溃」——程序遇到无法恢复的严重错误时主动挂掉。recover 只能在 defer 中调用，用来抓住 panic 让程序不要彻底崩。普通业务错误不要用 panic，正常 return error 就够了。`,
          code: `func riskyFunc() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("抓住 panic:", r)
        }
    }()

    panic("出大事了！")  // defer 里的 recover 会抓住它
}

func main() {
    riskyFunc()
    fmt.Println("程序没崩，继续跑")  // 这行能执行
}`,
          language: "go",
        },
        {
          title: "errors 包与自定义错误",
          content: `标准库的 errors 包提供 New() 和 Join()。fmt.Errorf 配合 %w 可以给错误包上一层上下文。自定义错误就是实现 error 接口的类型。errors.Is 和 errors.As 用来判断错误类型。`,
          code: `var ErrNotFound = errors.New("没找到")

type ValidationError struct {
    Field string
    Value string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("校验失败: 字段 %s 的值 %s 不合法", e.Field, e.Value)
}`,
          language: "go",
          tip: "用 fmt.Errorf 的 %w 包装错误时，原来的错误还在链里，可以用 errors.Is/As 追溯原始错误。",
        },
      ],
      quiz: [
        { question: "Go 里 error 是什么？", options: ["特殊语法", "一个接口——只有 Error() 方法", "一个类", "关键字"], answer: 1, explanation: "error 就是一个普通的接口，实现了 Error() string 方法的类型就是 error 类型。" },
        { question: "panic 和 return error 应该用哪个？", options: ["都行", "可恢复的业务错误 return error，不可恢复的严重故障 panic", "panic 更好", "只用 panic"], answer: 1, explanation: "普通业务错误交给 error 让调用方处理，panic 是真正「没救了」的场景才用。" },
        { question: "defer 和 recover 什么关系？", options: ["没关联", "recover 只能在 defer 函数里调用才有用", "recover 要写在 panic 前面", "defer 里不能调 recover"], answer: 1, explanation: "recover 只在 defer 中有效——panic 后栈回退到 defer 处，recover 拦住不让程序继续崩。" },
        { question: "%w 包装错误有什么用？", options: ["好看", "保留原始错误链，可以用 errors.Is/As 追溯", "性能更好", "自动重试"], answer: 1, explanation: "用 %w 包装错误时原始错误不会丢，上级调用方可以用 errors.Is 判断底层是否特定错误。" },
        { question: "Go 函数多返回值 handle error 的模式叫什么？", options: ["异常处理", "comma ok/error 模式——if err != nil", "try-catch", "面向对象"], answer: 1, explanation: "Go 的惯例是函数返回 (result, error)，调用方立刻检查 err != nil，简洁显式不隐藏错误。" },
      ],
    },
    "go-web": {
      slug: "go-web",
      sections: [
        {
          title: "net/http 基础——Go 自带的 HTTP 服务",
          content: `Go 标准库的 net/http 已经能写出生产级的 HTTP 服务，路由靠 http.HandleFunc，处理写在 handler 函数里。一个最简单的 Web 服务不到十行代码。`,
          code: `func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, Go Web!")
    })

    http.HandleFunc("/user", func(w http.ResponseWriter, r *http.Request) {
        name := r.URL.Query().Get("name")
        fmt.Fprintf(w, "你好, %s", name)
    })

    http.ListenAndServe(":8080", nil)
}`,
          language: "go",
        },
        {
          title: "路由——请求来了该找谁",
          content: `标准库的路由比较基础，不支持路径参数和 RESTful 风格。实际项目通常用 gorilla/mux 或者直接上 Gin 框架。Gin 速度快、功能全，路由用 GET()/POST() 等方法很直观。`,
          code: `// 标准库路由
http.HandleFunc("/users/", usersHandler)

// Gin 框架路由
r := gin.Default()
r.GET("/ping", func(c *gin.Context) {
    c.JSON(200, gin.H{"message": "pong"})
})
r.POST("/user", createUser)
r.GET("/user/:id", getUser)`,
          language: "go",
        },
        {
          title: "中间件——请求流水线上的工位",
          content: `中间件就是请求处理流水线上的关卡——可以在这里鉴权、记日志、设 CORS 头。Gin 里中间件用 c.Next() 把请求传给下一个处理函数。`,
          code: `func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.AbortWithStatusJSON(401, gin.H{"error": "没带 token"})
            return
        }
        c.Next()
    }
}

func LoggerMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        t := time.Now()
        c.Next()
        latency := time.Since(t)
        log.Printf("%s %s %v", c.Request.Method, c.Request.URL, latency)
    }
}`,
          language: "go",
        },
        {
          title: "Gin 框架入门——十分钟上手",
          content: `Gin 是目前 Go Web 最火的框架，比标准库多了路由分组、中间件、参数绑定、JSON 验证、错误处理。`,
          code: `r := gin.Default()

// 路由分组
v1 := r.Group("/api/v1")
{
    v1.GET("/users", listUsers)
    v1.POST("/users", createUser)
}

// 参数绑定
type User struct {
    Name  string json:"name" binding:"required"
    Email string json:"email" binding:"required,email"
}

func createUser(c *gin.Context) {
    var u User
    if err := c.ShouldBindJSON(&u); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    c.JSON(201, u)
}`,
          language: "go",
        },
      ],
      quiz: [
        { question: "Go 标准库能写 Web 服务吗？", options: ["不行", "可以，net/http 足以写生产级 HTTP 服务", "只能本地测试", "得依赖第三方库"], answer: 1, explanation: "Go 标准库 net/http 功能齐全，很多公司不用框架直接用标准库照样跑生产。" },
        { question: "Gin 框架的中介（中间件）是什么概念？", options: ["数据库", "请求处理流水线上的附加处理——鉴权、日志、限流等", "路由规则", "模板引擎"], answer: 1, explanation: "中间件在请求到达 handler 之前和之后执行，适合做鉴权、日志、响应压缩等横切关注点。" },
        { question: "Gin 里 c.ShouldBindJSON(&u) 做了什么？", options: ["输出 JSON", "把请求体的 JSON 绑定到 Go 结构体上", "发送 JSON 响应", "验证 JSON 语法"], answer: 1, explanation: "ShouldBindJSON 把请求 body 的 JSON 解析到结构体指针里，还能根据 binding tag 做字段校验。" },
        { question: "r.UserGroup('/api') 的作用？", options: ["创建用户", "路由分组——同一组路由共享前缀和中间件", "启动多个服务", "版本控制"], answer: 1, explanation: "路由分组把相关接口放在一起，共享 URL 前缀和中间件，减少重复代码。" },
        { question: "Go Web 服务怎么处理路径参数 /user/:id？", options: ["标准库直接支持", "Gin 用 c.Param('id') 获取", "不支持", "只能从 Body 取"], answer: 1, explanation: "标准库没这个功能，Gin 用 :id 定义路径参数，c.Param('id') 获取值。" },
      ],
    },
    "go-database": {
      slug: "go-database",
      sections: [
        {
          title: "database/sql 标准接口",
          content: `Go 的 database/sql 包提供了一套操作数据库的标准接口，配合各个数据库的 driver 使用。这不是真正的连接池或 ORM，但给了你一个干净的底层 API。`,
          code: `import (
    "database/sql"
    _ "github.com/go-sql-driver/mysql"  // 导入驱动
)

func main() {
    db, err := sql.Open("mysql", "user:pass@tcp(127.0.0.1:3306)/mydb")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    var name string
    err = db.QueryRow("SELECT name FROM users WHERE id = ?", 1).Scan(&name)
}`,
          language: "go",
        },
        {
          title: "GORM——Go 最流行的 ORM",
          content: `GORM 是目前 Go 生态最火的 ORM。它把数据库表映射成 Go 结构体，增删改查不再写 SQL 而是用 Go 方法链。支持自动建表、关联关系、Hook、事务。`,
          code: `type User struct {
    ID   uint
    Name string gorm:"size:100;not null"
    Age  int
}

// 自动建表
db.AutoMigrate(&User{})

// 增删改查
db.Create(&User{Name: "张三", Age: 18})

var user User
db.First(&user, 1)              // SELECT * FROM users WHERE id = 1
db.Where("age > ?", 20).Find(&users)
db.Model(&user).Update("Name", "李四")
db.Delete(&user, 1)`,
          language: "go",
        },
        {
          title: "事务——几个操作绑在一起",
          content: `GORM 的事务包装很简洁。Begin() 开始，错误时 Rollback()，成功 Commit()。Transaction() 回调方式更安全——biz 函数不 panic 就自动提交，panic 就回滚。`,
          code: `// GORM 事务
db.Transaction(func(tx *gorm.DB) error {
    if err := tx.Create(&User{Name: "张三"}).Error; err != nil {
        return err  // 返回错误自动回滚
    }
    if err := tx.Create(&Order{UserID: 1}).Error; err != nil {
        return err
    }
    return nil  // 返回 nil 自动提交
})`,
          language: "go",
          tip: "GORM 的 Transaction() 方法最省心——不需要手动 Begin/Commit/Rollback，内部帮你包好。",
        },
      ],
      quiz: [
        { question: "sql.Open() 做的是连接还是只是初始化？", options: ["立即建立连接", "只是初始化好配置，真正连上数据库是第一次执行 SQL 时", "创建连接池", "不用配置"], answer: 1, explanation: "sql.Open() 不真正连数据库，只是验证参数并初始化。真正建连接在第一个 Query/Exec 调用时。" },
        { question: "GORM 的 AutoMigrate 做什么？", options: ["迁移数据库服务器", "自动根据结构体创建或更新表结构", "自动备份数据", "自动删除表"], answer: 1, explanation: "AutoMigrate 对照结构体定义自动建表、加字段、建索引——但不会删已有的列。" },
        { question: "GORM Transaction 回调返回 error 会怎么处理？", options: ["忽略", "自动回滚", "自动提交", "报错崩溃"], answer: 1, explanation: "Transaction 回调返回 error 时 GORM 自动回滚事务，返回 nil 才提交。" },
        { question: "GORM db.Where('age > ?', 20).Find(&users) 里 ? 占位符干嘛的？", options: ["通配符", "防 SQL 注入的参数占位符", "表示任意字段", "动态表名"], answer: 1, explanation: "和 JDBC 的 PreparedStatement 同理——参数跟 SQL 结构分离，用户输入不会变成 SQL 执行。" },
        { question: "Go 连接数据库必须导入带 _ 前缀的 driver 包，这叫什么模式？", options: ["匿名导入 driver", "blank import——只执行包的 init() 函数注册驱动，不直接使用包内容", "隐藏依赖", "懒加载"], answer: 1, explanation: "import _ 只触发 driver 包的 init() 函数把驱动注册进 database/sql，代码里不直接引用包名。" },
      ],
    },
    "go-testing": {
      slug: "go-testing",
      sections: [
        {
          title: "Test 函数——以 Test 开头的函数",
          content: `Go 测试就是写 _test.go 文件里的函数，函数名 Test 开头，参数是 *testing.T。一个项目跑 go test 就自动发现所有测试文件执行。无需额外框架。`,
          code: `// add.go
func Add(a, b int) int { return a + b }

// add_test.go
func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}`,
          language: "go",
        },
        {
          title: "Table-Driven Tests——用表格批量测",
          content: `这是 Go 测试的杀手锏——把多组输入输出放进一个表格（slice of struct），循环跑。看起来稍长，但新增用例只需往表里加一行，不用新写函数。`,
          code: `func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"正数相加", 2, 3, 5},
        {"包含负数", -1, 1, 0},
        {"都是零", 0, 0, 0},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := Add(tt.a, tt.b)
            if result != tt.expected {
                t.Errorf("got %d, want %d", result, tt.expected)
            }
        })
    }
}`,
          language: "go",
        },
        {
          title: "Benchmark——跑得够不够快",
          content: `Benchmark 函数名以 Benchmark 开头，参数是 *testing.B。跑 go test -bench=. 测性能。b.N 是 Go 自动算的执行次数。`,
          code: `func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}
// go test -bench=.

// go test -bench=. -benchmem 还能看内存分配`,
          language: "go",
          tip: "基准测试前用 b.ResetTimer() 排除初始化开销，让测量更准。",
        },
      ],
      quiz: [
        { question: "Go 测试函数的命名规则？", options: ["随意", "Test 开头，参数 *testing.T", "test 开头", "方法名必须 test"], answer: 1, explanation: "Go 测试必须是 TestXxx 格式，测试文件 _test.go 结尾，测试函数签名接收 *testing.T。" },
        { question: "Table-Driven Test 好在哪？", options: ["跑得更快", "一个函数测多组用例，新增用例只加一行表数据", "不用写代码", "自动生成"], answer: 1, explanation: "把所有测试用例放进一个 slice 里循环跑，测新场景不写新函数，维护成本低。" },
        { question: "Benchmark 里 b.N 是什么？", options: ["固定值 1000", "Go 自动调整的执行次数直到测量稳定", "测试用例数", "循环次数上限"], answer: 1, explanation: "Go 的 benchmark 框架自动调 b.N 的值，找到足够多次数让计时稳定。" },
        { question: "go test -v 里的 -v 干嘛？", options: ["版本号", "verbose——详细输出每个测试结果", "验证代码", "生成报告"], answer: 1, explanation: "-v 让测试输出每个测试函数的通过/失败状态，不加 v 只打印最终的 PASS/FAIL。" },
        { question: "go test 怎么跑指定包下的所有测试？", options: ["go test ./...", "go test all", "go test .", "go test -all"], answer: 0, explanation: "./... 递归当前目录下所有子包——「跑所有包的所有测试」。" },
      ],
    },
    "rust-structs": {
      slug: "rust-structs",
      sections: [
        {
          title: "struct——数据的架子",
          content: `Rust 的 struct 有三种写法：普通 struct（命名字段）、元组 struct（类似命名的元组）、单元 struct（零字段，当标记用）。用 impl 块给 struct 添加方法。`,
          code: `struct User {
    name: String,
    age: u8,
}

// 元组结构体
struct Point(i32, i32);

// 单元结构体
struct Marker;

impl User {
    fn new(name: String, age: u8) -> Self {
        User { name, age }
    }

    fn is_adult(&self) -> bool {
        self.age >= 18
    }
}`,
          language: "rust",
        },
        {
          title: "enum——带标签的联合体",
          content: `Rust 的 enum 比 C/Java 的枚举强太多——每个变体都能携带数据，配合 match 做模式匹配。Option 和 Result 就是 Rust 用 enum 实现的两个核心类型。`,
          code: `enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));`,
          language: "rust",
        },
        {
          title: "Option——可能有值也可能没有",
          content: `Rust 没有 null，用 Option<T> 表示值可能为空。有值就是 Some(T)，空就是 None。必须用 match 或 if let 检查后才能取到里面的值——编译器逼着你不遗漏 null 检查。`,
          code: `fn find_user(id: u32) -> Option<String> {
    if id == 1 {
        Some(String::from("张三"))
    } else {
        None
    }
}

match find_user(1) {
    Some(name) => println!("找到了: {}", name),
    None => println!("没找到"),
}`,
          language: "rust",
        },
        {
          title: "Result——要么成功要么报错",
          content: `Result<T, E> 是 Rust 错误处理的基础——Ok(T) 表示成功，Err(E) 表示失败。跟 Option 一样必须显式处理两种情况，编译器帮你防住忘记处理错误。`,
          code: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("除数不能为零"))
    } else {
        Ok(a / b)
    }
}

match divide(10.0, 0.0) {
    Ok(result) => println!("结果: {}", result),
    Err(e) => println!("错误: {}", e),
}`,
          language: "rust",
        },
      ],
      quiz: [
        { question: "Rust 的 Option<T> 相当于什么？", options: ["null", "可能有值(Some)或没值(None)的安全 null 替代", "空列表", "布尔"], answer: 1, explanation: "Option 是 Rust 对「可能为空」的安全编码——没有 null，编译器强迫你处理两种可能性。" },
        { question: "Result<T, E> 的 Ok 和 Err 代表什么？", options: ["真和假", "成功(Ok)和失败(Err)", "是和否", "大和小"], answer: 1, explanation: "Result 是 Rust 错误处理的官方方式——Ok 包裹正常结果，Err 包裹错误信息。" },
        { question: "Rust enum 比 C enum 强在哪里？", options: ["更快", "每个变体可以带数据，配合 match 做穷尽模式匹配", "更简单", "没有区别"], answer: 1, explanation: "Rust enum 变体可以存不同类型数据，match 时编译器检查是否所有变体都处理了。" },
        { question: "impl 块在 Rust 里做什么？", options: ["导入模块", "给类型实现方法", "定义 trait", "声明宏"], answer: 1, explanation: "impl 是为 struct 或 enum 添加方法的地方——定义函数签名然后实现。" },
        { question: "Rust 为什么不让你直接用 null？", options: ["不支持", "null 是无数 bug 的来源，Option 强制你显式处理空值", "历史原因", "内存不够"], answer: 1, explanation: "Rust 设计者认为 null 引用是「十亿美元的错误」——Option 让编译器在你可能遗漏 null 检查时报错。" },
      ],
    },
    "rust-collections": {
      slug: "rust-collections",
      sections: [
        {
          title: "Vec——动态数组",
          content: `Vec<T> 是 Rust 最常用的集合，类似 Java ArrayList。存在堆上，自动扩容。push 追加，pop 弹末尾，[index] 按索引取（越界会 panic），get(index) 安全取返回 Option。`,
          code: `let mut v: Vec<i32> = Vec::new();
v.push(1);
v.push(2);
v.push(3);

let third = &v[2];        // 越界就 panic
let third = v.get(2);     // 返回 Option<&i32>

for i in &v {
    println!("{}", i);    // 遍历
}`,
          language: "rust",
        },
        {
          title: "HashMap——键值对",
          content: `HashMap<K, V> 存储键值对，键不能重复。插入用 insert()，取出用 get() 返回 Option。entry() 方法是非常实用的模式——键存在就改值，不存在就插入。`,
          code: `use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team = String::from("Blue");
let score = scores.get(&team).copied().unwrap_or(0);

// entry 模式——有则改无则插
scores.entry(String::from("Blue")).or_insert(0);`,
          language: "rust",
        },
        {
          title: "String——别被名字骗了",
          content: `Rust 的 String 是可变的堆上 UTF-8 字符串，不是简单字符数组。&str 是字符串切片，不可变。push_str 追加，+ 运算连接，format! 宏也是最常用的组合方式。`,
          code: `let mut s = String::from("Hello");
s.push_str(", World!");
s.push('!');

let s2 = "Rust".to_string();

// 字符串拼接
let combined = format!("{} {}", s, s2);`,
          language: "rust",
        },
        {
          title: "迭代器——map/filter 流水线",
          content: `Rust 的迭代器是惰性的——你不调用消费方法（collect、sum、for）它不会干活。map、filter、take 串起来处理数据非常简洁。`,
          code: `let nums = vec![1, 2, 3, 4, 5, 6];

let squares: Vec<i32> = nums.iter()
    .map(|x| x * x)
    .filter(|x| x % 2 == 0)
    .collect();

let sum: i32 = nums.iter().sum();`,
          language: "rust",
        },
      ],
      quiz: [
        { question: "Vec.get(100) 返回什么？", options: ["直接报错", "None——Option 安全地表示索引超出", "第 100 个元素", "空 Vec"], answer: 1, explanation: "get 返回 Option，超出范围返回 None 而不是 panic——比直接索引安全。" },
        { question: "HashMap 的 entry() 方法什么用？", options: ["删除条目", "有则改无则插——一次处理存在和不存在两种情况", "遍历", "算长度"], answer: 1, explanation: "entry 返回 Entry 枚举，or_insert() 是「没有就插，有的话返回引用」的优雅写法。" },
        { question: "String 和 &str 的本质区别？", options: ["一样", "String 是可变堆上字符串有所有权，&str 是借用的切片", "String 更短", "只有 &str 能用"], answer: 1, explanation: "String 拥有堆内存，可以修改；&str 只是借用现有字符串的一部分，不能改。" },
        { question: "Rust 迭代器什么时候执行？", options: ["声明时立即执行", "惰性——调用消费方法(collect/sum/for)才执行", "编译时", "每次循环"], answer: 1, explanation: "Rust 迭代器是惰性的——map filter 链不产生中间结果，到 collect 才真正跑起流水线。" },
        { question: "format! 宏和 + 拼接字符串的区别？", options: ["没区别", "format! 不转移所有权更安全，+ 会 move 左值", "format! 更慢", "只能用 +"], answer: 1, explanation: "format! 宏借用所有参数不 move，比 + 用着更自由——不会吃完 String 后变量就不能用了。" },
      ],
    },
    "rust-error": {
      slug: "rust-error",
      sections: [
        {
          title: "Result 与 ? 运算符",
          content: `Rust 的 ? 是错误传播的语法糖——遇到 Err 就 early return，Ok 才把值拿出来继续。省去了手写 match 判断的麻烦。? 只能在返回 Result 或 Option 的函数里用。`,
          code: `fn read_user() -> Result<String, std::io::Error> {
    let content = std::fs::read_to_string("user.txt")?;
    Ok(content)
}

// 等价于手写你的
fn read_user_manual() -> Result<String, std::io::Error> {
    let content = match std::fs::read_to_string("user.txt") {
        Ok(s) => s,
        Err(e) => return Err(e),
    };
    Ok(content)
}`,
          language: "rust",
        },
        {
          title: "Option——有就做没就过",
          content: `Option 也能用 ? 做 early return。Some 取出值继续，None 直接返回。想给 Option 和 Result 的 None 加自定义错误消息可以用 ok_or()。`,
          code: `fn get_username(db: &HashMap<u32, String>, id: u32) -> Option<String> {
    let name = db.get(&id)?;
    Some(name.to_uppercase())
}

// Option 转 Result
let user = find_user(42)
    .ok_or("用户不存在")?;  // None 变 Err`,
          language: "rust",
        },
        {
          title: "thiserror——一行代码写自定义错误",
          content: `thiserror 是最舒服的自定义错误库，用 derive 宏一行搞定错误枚举。配合 #[error] 属性定制错误消息，#[from] 自动实现类型转换。`,
          code: `use thiserror::Error;

#[derive(Error, Debug)]
enum MyError {
    #[error("IO 错误: {0}")]
    Io(#[from] std::io::Error),
    #[error("用户 {0} 不存在")]
    UserNotFound(u32),
    #[error("数字转换失败")]
    ParseError,
}`,
          language: "rust",
          tip: "thiserror 用于库代码，anyhow 用于应用代码——前者自动实现 Error trait，后者自动添加上下文。",
        },
      ],
      quiz: [
        { question: "? 运算符返回什么？", options: ["布尔", "碰到 Ok 继续，碰到 Err 提前返回错误", "None", "什么都不返回"], answer: 1, explanation: "? 是早返语法——Ok 值直接拿，Err 立刻从当前函数 return Err。" },
        { question: "现在最流行的 Rust 自定义错误库是什么？", options: ["thiserror", "anyhow", "failure", "没有"], answer: 0, explanation: "thiserror 通过 derive 宏让写自定义错误极其简洁，是 Rust 社区事实标准。" },
        { question: "Option 的 ok_or() 方法干嘛的？", options: ["忽略 None", "把 Option 转 Result——None 变 Err，Some 变 Ok", "删除值", "比较数值"], answer: 1, explanation: "ok_or 让 Option 中的 None 代表错误，传入自定义错误信息，转换后可以配合 ? 传播。" },
        { question: "thiserror 里 #[from] 属性有什么用？", options: ["导入", "自动实现 From trait，让 ? 自动把被包装的错误转成自定义错误", "格式化字符串", "创建新类型"], answer: 1, explanation: "#[from] 自动生成 From trait 实现，代码中写 ? 时底层会自动转换成自定义错误类型。" },
        { question: "Result 和 Option 都能用 ? 吗？", options: ["只能 Result", "都可以——但函数返回类型得匹配", "只能 Option", "都不能"], answer: 1, explanation: "? 的返回类型跟函数签名一致就行——返回 Result 的用 Result 里 ?，返回 Option 的用 Option 里 ?。" },
      ],
    },
    "rust-traits": {
      slug: "rust-traits",
      sections: [
        {
          title: "Trait 定义与实现——定义共同行为",
          content: `Trait 就是一套行为约定——定义了什么方法必须有，但不规定怎么实现。类似 Java 接口但 Rust 的抽象能力更强。任何类型实现了这个 trait 就必须按照签名实现所有方法。`,
          code: `trait Summarizable {
    fn summarize(&self) -> String;

    // 默认实现
    fn default_summary(&self) -> String {
        String::from("(阅读更多...)")
    }
}

struct Article {
    title: String,
    content: String,
}

impl Summarizable for Article {
    fn summarize(&self) -> String {
        format!("{} - {}...", self.title, &self.content[0..50])
    }
}`,
          language: "rust",
        },
        {
          title: "泛型约束——限制泛型的范围",
          content: `泛型本身没有约束的话什么类型都能传。trait bound（trait 约束）限制了泛型参数必须实现了某些 trait 才能用这个函数。写法两种：T: Trait1 + Trait2 或者 where 从句。`,
          code: `fn notify<T: Summarizable>(item: &T) {
    println!("摘要: {}", item.summarize());
}

// where 语法——约束多了更清爽
fn complex<T, U>(t: &T, u: &U) -> String
where
    T: Summarizable + Clone,
    U: std::fmt::Display,
{
    format!("{} - {}", t.summarize(), u)
}`,
          language: "rust",
        },
        {
          title: "Trait 对象——运行时多态",
          content: `泛型是编译期确定类型（静态分发），trait 对象是用 &dyn Trait 或 Box<dyn Trait> 实现运行时多态。就像 Java 的接口引用——可以指向任何实现了这个接口的对象。`,
          code: `fn print_summary(item: &dyn Summarizable) {
    println!("{}", item.summarize());
}

let article = Article { title: "...".into(), content: "...".into() };
let tweet = Tweet { username: "...".into(), content: "...".into() };

print_summary(&article);
print_summary(&tweet);  // 不同类型都可以传`,
          language: "rust",
          tip: "泛型(static dispatch)性能好但编译多份代码，trait 对象(dynamic dispatch)运行时选但有 vtable 开销。优先泛型。",
        },
      ],
      quiz: [
        { question: "Trait 在 Rust 中相当于什么概念？", options: ["类", "接口/协议——定义一组必须实现的方法", "枚举", "模块"], answer: 1, explanation: "Trait 是行为抽象——Java 的 interface、Go 的 interface、Rust 的 trait 都是同类概念。" },
        { question: "Trait 约束（bound）的作用？", options: ["限制泛型——只有实现了特定 trait 的类型才能用", "加速编译", "自动实现方法", "隐藏类型"], answer: 0, explanation: "Trait bound 限定泛型类型 T 必须具备哪些能力，不满足约束编译器直接报错。" },
        { question: "&dyn Trait 和泛型 T: Trait 的根本区别？", options: ["没区别", "&dyn Trait 运行时多态有虚表开销，泛型编译期静态分发没有", "只能用 &dyn", "泛型更灵活"], answer: 1, explanation: "dyn 是动态分发——运行时通过 vtable 确定调哪个实现；泛型是静态分发——编译期生成具体版本的代码。" },
        { question: "Rust 的 trait 跟 Go 的 interface 像不像？", options: ["完全不像", "非常像——都是定义行为协议，类型隐式实现 trait/interface", "Rust 只有泛型", "Go 没有这个"], answer: 1, explanation: "都是声明一组方法签名，任何类型实现了这些方法就「自动」是这个 trait/interface 的实现者。" },
        { question: "impl Trait for Type 中的 for 是什么含义？", options: ["循环", "为类型 Type 实现 Trait", "替代 for 循环", "等待"], answer: 1, explanation: "impl ... for Type 是「为这个类型实现这个 trait」的固定语法。" },
      ],
    },
    "php-oop": {
      slug: "php-oop",
      sections: [
        {
          title: "类与对象——PHP 面向对象基础",
          content: `PHP 的面向对象和 Java 很像，但更灵活。用 class 定义，new 创建实例。成员变量可以加访问修饰符 public/protected/private。构造函数是 __construct()，析构是 __destruct()。`,
          code: `class User {
    private string $name;
    private int $age;

    public function __construct(string $name, int $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function isAdult(): bool {
        return $this->age >= 18;
    }
}

$u = new User("张三", 25);
echo $u->isAdult() ? "成年" : "未成年";`,
          language: "php",
        },
        {
          title: "继承与 Trait——多继承的替代方案",
          content: `PHP 和 Java 一样单继承，但多了 trait 这个法宝。trait 把可复用的方法块打包，一个类可以 use 多个 trait，相当于横向代码复用。trait 之间也能 use 别的 trait。`,
          code: `class Animal {
    public function eat() {
        echo "吃东西";
    }
}

trait Flyable {
    public function fly() { echo "飞"; }
}

trait Runnable {
    public function run() { echo "跑"; }
}

class Bird extends Animal {
    use Flyable, Runnable;
}

$bird = new Bird();
$bird->eat();   // 继承来的
$bird->fly();   // trait 带来的
$bird->run();   // trait 带来的`,
          language: "php",
        },
        {
          title: "Namespace 与自动加载",
          content: `PHP 的 namespace 解决类名冲突，和文件目录对应。use 语句导入命名空间。配合 Composer 的 autoload 机制，不用 require 文件，new 类时自动加载。`,
          code: `// App/Models/User.php
namespace App\\Models;

class User {
    public function getName() {
        return "张三";
    }
}

// 使用
use App\\Models\\User;

$u = new User();`,
          language: "php",
        },
        {
          title: "魔术方法——你不知道但系统知道的",
          content: `__ 开头的魔术方法由 PHP 引擎在特定时机自动调用。最常见的是 __construct（构造）和 __toString（echo 对象时自动调）。__get/__set 在访问不存在的属性时触发。`,
          code: `class User {
    private array $data = [];

    public function __construct(string $name) {
        $this->data["name"] = $name;
    }

    public function __get(string $key) {
        return $this->data[$key] ?? null;
    }

    public function __set(string $key, $value) {
        $this->data[$key] = $value;
    }
}`,
          language: "php",
          tip: "魔术方法很灵活但别滥用以防代码难调试。清晰的 getter/setter 比 __get/__set 更好维护。",
        },
      ],
      quiz: [
        { question: "PHP trait 和 class 的区别？", options: ["不能实化 trait", "trait 是给类横向掺代码用的不能自己 new，类可以 new", "trait 更快", "没有区别"], answer: 1, explanation: "trait 只能被 use 混入到类里，不能像类一样直接 new。解决 PHP 单继承复用的难题。" },
        { question: "PHP namespace 主要解决什么问题？", options: ["性能", "类名冲突——不同包可能有同名的类", "类型安全", "自动部署"], answer: 1, explanation: "命名空间隔离不同包中的同名类，避免引入两个第三方库时类名撞车。" },
        { question: "__construct 和普通方法的区别？", options: ["一样", "构造函数——new 类时自动执行", "更快", "只能调用一次"], answer: 1, explanation: "__construct 是类的构造方法，new 类时 PHP 自动调用，用来初始化对象的初始状态。" },
        { question: "composer autoload 做了什么？", options: ["下载文件", "按命名空间自动加载类文件，不用手动 require", "部署代码", "压缩代码"], answer: 1, explanation: "Composer 生成 autoload 文件，new 类时自动根据命名空间找到对应的 PHP 文件加载。" },
        { question: "use 语句和 require 的区别？", options: ["一样", "use 是命名空间导入(别名)，require 是把文件内容拉进来执行", "use 导入文件", "require 是别名"], answer: 1, explanation: "use 只影响命名空间的简写引用不加载文件，require/include 才真正加载执行 PHP 文件。" },
      ],
    },
    "php-mysql": {
      slug: "php-mysql",
      sections: [
        {
          title: "PDO——PHP 统一数据库抽象层",
          content: `PDO 是 PHP 操作数据库的标准接口，可以连 MySQL、PostgreSQL、SQLite 等。比 mysql_* 函数安全太多——支持预处理语句防 SQL 注入。`,
          code: `$pdo = new PDO("mysql:host=localhost;dbname=mydb;charset=utf8mb4", "root", "pass");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// 查询
$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);`,
          language: "php",
        },
        {
          title: "预处理语句——彻底防 SQL 注入",
          content: `PDO 预处理语句用 ? 或 :name 占符参数，数据跟 SQL 结构彻底分离——无论用户输入的是什么特殊字符都不可能变成 SQL 命令。这是防注入的唯一正确方式，没有之一。`,
          code: `$sql = "SELECT * FROM users WHERE name = :name AND age > :age";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    'name' => $_GET['name'],
    'age' => 18,
]);
$results = $stmt->fetchAll();

// 用 ? 占位符
$stmt = $pdo->prepare("INSERT INTO users (name, age) VALUES (?, ?)");
$stmt->execute(["张三", 25]);`,
          language: "php",
        },
        {
          title: "事务——保证数据一致性",
          content: `PDO 的事务操作很直接：beginTransaction 开始，commit 提交，出问题就 rollBack。关键操作（转账、下单扣库存）都得包在事务里。`,
          code: `try {
    $pdo->beginTransaction();
    $pdo->exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    $pdo->exec("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    echo "转账失败: " . $e->getMessage();
}`,
          language: "php",
        },
      ],
      quiz: [
        { question: "PDO 预处理语句怎么防 SQL 注入？", options: ["过滤输入字符", "SQL 结构和数据分开传输——用户输入永远不会被当 SQL 执行", "限制输入长度", "加密 input"], answer: 1, explanation: "prepare 先把 SQL 结构发给数据库编译好，execute 再传参数——参数就是纯数据，管你写什么都不会影响 SQL 语义。" },
        { question: "PDO 默认错误模式是什么？", options: ["抛异常", "静默失败——需要手动查 error", "直接报错", "写入日志"], answer: 1, explanation: "PDO 默认错误静默处理，必须显式设 ERRMODE_EXCEPTION 才能在出错时抛异常。" },
        { question: "PDO 事务回滚发生在什么情况？", options: ["提交后", "出异常或主动调 rollBack()", "连接关闭时", "从不回滚"], answer: 1, explanation: "事务未提交前抛出异常应立刻回滚，或者手动判断条件不对调 rollBack() 撤销操作。" },
        { question: "PDO 和 mysqli 怎么选？", options: ["一样", "PDO 支持多数据库更全面，mysqli 只 MySQL 但提供 MySQL 高级特性", "mysqli 更安全", "PDO 只能 MySQL"], answer: 1, explanation: "PDO 跨数据库，换数据库只用改连接串。mysqli 有 MySQL 独有功能。多数场景 PDO 更合适。" },
        { question: "fetchAll(PDO::FETCH_ASSOC) 返回什么？", options: ["对象", "关联数组——key 是列名 value 是列值", "数字索引数组", "JSON"], answer: 1, explanation: "FETCH_ASSOC 让结果行以关联数组形式返回，key 是字段名。默认 FETCH_BOTH 同时有数字和关联索引。" },
      ],
    },
    "php-laravel": {
      slug: "php-laravel",
      sections: [
        {
          title: "Laravel 路由——URL 到处理函数的映射",
          content: `Laravel 的路由把所有 HTTP 请求映射到对应的处理函数或控制器。routes/web.php 里定义，支持 GET/POST/PUT/DELETE，还有路由参数、命名路由、路由分组。`,
          code: `// routes/web.php
Route::get('/', function () {
    return view('welcome');
});

Route::get('/user/{id}', [UserController::class, 'show']);
Route::post('/user', [UserController::class, 'store']);

// 控制器
class UserController extends Controller {
    public function show($id) {
        $user = User::findOrFail($id);
        return view('user.show', compact('user'));
    }
}`,
          language: "php",
        },
        {
          title: "Blade 模板——PHP 和 HTML 的干净结合",
          content: `Blade 是 Laravel 自带的模板引擎。语法简单：{{ }} 输出变量并自动转义，@if、@foreach、@extends、@yield 等指令。还能定义组件和复用布局。`,
          code: `<!-- layout.blade.php -->
<html>
<body>
    @yield('content')
</body>
</html>

<!-- user.blade.php -->
@extends('layout')

@section('content')
    <h1>{{ $user->name }}</h1>
    <p>{{ $user->email }}</p>
    @if($user->age >= 18)
        <span>成年人</span>
    @endif
@endsection`,
          language: "blade",
        },
        {
          title: "Eloquent ORM——数据库映射成对象",
          content: `Eloquent 是 Laravel 的 Active Record ORM，每个数据库表对应一个 Model 类。不再写 SQL，用链式方法查数据。关联关系（hasOne/hasMany/belongsTo）定义直观。`,
          code: `class User extends Model {
    protected $fillable = ['name', 'email', 'password'];

    public function posts() {
        return $this->hasMany(Post::class);
    }
}

// 增删改查
User::create(['name' => '张三', 'email' => 'zhang@example.com']);
$user = User::find(1);
$users = User::where('age', '>', 18)->orderBy('name')->get();
$user->update(['name' => '李四']);
$user->delete();`,
          language: "php",
          tip: "Eloquent 会默默把蛇形表名变成驼峰类名——users 表对应 User Model，order_items 对应 OrderItem。",
        },
      ],
      quiz: [
        { question: "Laravel 路由文件在哪？", options: ["app/routes.php", "routes/web.php", "bootstrap/routes.php", "public/index.php"], answer: 1, explanation: "routes/web.php 是页面路由，routes/api.php 是 API 路由。" },
        { question: "Blade 的 {{ $var }} 和 {!! $var !!} 区别？", options: ["一样", "{{ }} 自动转义防 XSS，{!! !!} 不转义直接输出 HTML", "{!! !!} 更快", "{{ }} 不转义"], answer: 1, explanation: "{{ }} 自动 htmlspecialchars 转义防 XSS——除非你确信内容是安全的 HTML，否则永远用 {{ }}。" },
        { question: "Eloquent ORM 的表名约定是什么？", options: ["同名", "蛇形复数自动对应——User Model → users 表", "驼峰形式", "大写表名"], answer: 1, explanation: "Eloquent 会自动把 Model 类名转成蛇形复数形式作为对应表名。" },
        { question: "Laravel CSRF 保护的工作原理？", options: ["加密请求", "表单中 @csrf 生成 token，服务器验证 token 是否匹配", "限制 IP", "CAPTCHA"], answer: 1, explanation: "Laravel 给每个会话生成随机 token，表单提交时验证，防止第三方网站冒充用户请求。" },
        { question: "findOrFail(1) 和 find(1) 的区别？", options: ["一样", "findOrFail 没找到会自动抛 404 异常，find 返回 null", "findOrFail 更快", "find 不支持"], answer: 1, explanation: "findOrFail 找不到记录立刻抛出 ModelNotFoundException 返回 404，适合一定要有记录的场景。" },
      ],
    },
    "php-security": {
      slug: "php-security",
      sections: [
        {
          title: "SQL 注入——老问题新解法",
          content: `SQL 注入是 PHP 历史上最大的安全坑。防止方法只有一个：用 PDO 预处理语句或 ORM，绝不用字符串拼接 SQL。任何用户输入都当毒药看待——先消毒再下锅。`,
          code: `// 危险写法——永远别写
$sql = "SELECT * FROM users WHERE id = " . $_GET['id'];

// 安全写法——PDO 预处理
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$_GET['id']]);

// Laravel Eloquent 自动防注入
User::find($_GET['id']);
User::where('name', $_GET['name'])->get();`,
          language: "php",
        },
        {
          title: "XSS——跨站脚本攻击",
          content: `XSS 就是攻击者在你的页面上植入 JavaScript 代码，偷 cookie、模仿用户操作。防 XSS 的核心原则：所有用户输出的内容都转义。Blade 用 {{ }} 自动转义，原生 PHP 用 htmlspecialchars。`,
          code: `// 危险——用户输入直接输出
echo $_GET['username'];

// 安全——先转义
echo htmlspecialchars($_GET['username'], ENT_QUOTES, 'UTF-8');

// Blade 自动转义
{{ $username }}   // 安全的
{!! $username !!} // 不转义——慎用`,
          language: "php",
        },
        {
          title: "CSRF——伪造请求跨站攻击",
          content: `CSRF 是骗子用你已经登录的浏览器偷偷执行恶意操作。比如你在银行网站登录了，骗子页面偷偷发转账请求。防护：关键操作都要验证 token。Laravel 的 @csrf 指令就是干这个的。`,
          code: `// Laravel Blade 表单
<form method="POST" action="/transfer">
    @csrf
    <input name="amount">
    <button>转账</button>
</form>`,
          language: "blade",
        },
        {
          title: "密码与敏感数据处理",
          content: `密码绝对不能存明文，也不能用 MD5 或 SHA1。PHP 用 password_hash()（底层 bcrypt）加密，password_verify() 验证。永远用这个内置函数，别自己造轮子。`,
          code: `// 哈希密码
$hash = password_hash($plainPassword, PASSWORD_BCRYPT);

// 验证密码
if (password_verify($plainPassword, $hash)) {
    echo "密码正确";
}

// 检查是否需要重新加盐
if (password_needs_rehash($hash, PASSWORD_BCRYPT)) {
    $hash = password_hash($plainPassword, PASSWORD_BCRYPT);
}`,
          language: "php",
          warning: "不要用 md5() 或 sha1() 存密码——它们对现代 GPU 来说秒破。password_hash 才是唯一正确的选择。",
        },
      ],
      quiz: [
        { question: "防 SQL 注入最有效的方法？", options: ["过滤特殊字符", "PDO 预处理语句——数据和 SQL 分离", "限制输入长度", "加 WAF"], answer: 1, explanation: "预处理语句是治本的方案——SQL 结构先编译好，参数只当数据填入，无论写什么都不会改变 SQL 语义。" },
        { question: "XSS 攻击的原理？", options: ["偷服务器文件", "往页面注入 JavaScript 脚本执行恶意操作", "暴力破解密码", "DDoS 攻击"], answer: 1, explanation: "攻击者把 script 代码混进用户输入里，页面输出时脚本被执行——偷 cookie/劫持会话。" },
        { question: "PHP 最安全的密码处理方法？", options: ["md5", "password_hash + password_verify", "sha1", "base64 编码"], answer: 1, explanation: "password_hash 使用 bcrypt 或 argon2——自带随机盐 + 自适应成本 + 抵抗彩虹表。" },
        { question: "Laravel @csrf 做了什么？", options: ["加密数据", "生成隐藏表单字段包含 CSRF token，服务器验证匹配", "压缩请求", "跳转页面"], answer: 1, explanation: "@csrf 生成一个隐藏的 _token 字段，Laravel middleware 验证请求 token 和 session token 是否一致。" },
        { question: "htmlspecialchars 默认会转义单引号吗？", options: ["会", "不会——需要加 ENT_QUOTES 才转义单引号", "只转义双引号", "取决于 PHP 版本"], answer: 1, explanation: "默认只转义双引号，加 ENT_QUOTES 才同时转义单引号——用在属性值里很重要。" },
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
    "swift-oop": {
      slug: "swift-oop",
      sections: [
        {
          title: "类与结构体——用 class 还是 struct？",
          content: `Swift 里 class 是引用类型（改一个地方到处变），struct 是值类型（每次赋值都给一个拷贝）。大部分场景 Apple 推荐用 struct——线程安全、不会意外改数据。class 适合需要继承或者引用语义的时候。`,
          code: `struct Point {
    var x: Double
    var y: Double

    mutating func moveBy(dx: Double, dy: Double) {
        x += dx; y += dy
    }
}

class Square {
    var side: Double
    init(side: Double) { self.side = side }
    var area: Double { side * side }
}

var p1 = Point(x: 0, y: 0)
var p2 = p1           // 拷贝一个独立副本
p2.x = 10             // 不影响 p1`,
          language: "swift",
        },
        {
          title: "枚举——带原始值和关联值",
          content: `Swift 枚举两种玩法：Raw Value（每个 case 绑一个固定类型值）和 Associated Value（每个 case 可以附带不同类型的数据）。配合 switch 穷尽匹配。`,
          code: `enum Direction: String {
    case north = "北"
    case south = "南"
    case east, west
}

enum Result {
    case success(data: String)
    case error(code: Int, message: String)
}

let result = Result.success(data: "完成")
switch result {
case .success(let data): print("成功: \(data)")
case .error(let code, let msg): print("错误 \(code): \(msg)")
}`,
          language: "swift",
        },
        {
          title: "协议——类型之间的共同约定",
          content: `Swift 的 Protocol 超强——可以给 struct/class/enum 都定协议约束。还能在协议里写默认实现（protocol extension）。常见的内置协议：Equatable、Codable、Identifiable。`,
          code: `protocol Drawable {
    func draw()
}

extension Drawable {
    func printName() { print("我是可绘制的") }
}

struct Circle: Drawable {
    func draw() { print("画一个圆") }
}

let c = Circle()
c.draw()       // 画一个圆
c.printName()  // 我是可绘制的（默认实现）`,
          language: "swift",
        },
        {
          title: "扩展——给已有类型加点料",
          content: `Swift 的 extension 可以给任何类型（包括系统的）加方法、计算属性、遵循协议，但不能加存储属性。这跟 Obj-C 的 category 类似，但 Swift 的更强更安全。`,
          code: `extension Int {
    var squared: Int { self * self }
    func isMultiple(of number: Int) -> Bool { self % number == 0 }
}

let num = 5
print(num.squared)       // 25
print(num.isMultiple(of: 2)) // false`,
          language: "swift",
          tip: "继承、协议、扩展是 Swift OOP 的三大法宝——组合使用方式比 Java 多很多自由度。",
        },
      ],
      quiz: [
        { question: "Swift 用 struct 还是 class 的默认选择？", options: ["class", "struct——值类型安全，Apple 优先推荐", "随便", "enum"], answer: 1, explanation: "Swift 社区推荐默认用 struct，值类型不可变不共享，线程安全。需要继承或引用语义再用 class。" },
        { question: "extension 能添加存储属性吗？", options: ["能", "不能——只能加计算属性和方法", "取决于版本", "只能加方法"], answer: 1, explanation: "extension 只能添加计算属性、方法和协议遵循，存储属性只能在原始定义区声明。" },
        { question: "Swift Protocol 跟 Java Interface 最像的是什么？", options: ["类", "定义方法签名契约，任何类型实现就遵循协议", "枚举", "结构体"], answer: 1, explanation: "都是定义一组能力要求，符合协议的类型必须实现。Swift 还多了 protocol extension 给默认实现。" },
        { question: "struct 里 mutating 关键字的作用？", options: ["无意义", "标记方法会修改 struct 自身属性", "加速方法", "线程锁"], answer: 1, explanation: "struct 的实例默认不可变——给修改自身值的方法必须加 mutating 关键词。" },
        { question: "Swift 枚举带原始值(RawValue)和关联值最大的区别？", options: ["一样", "原始值是每个 case 的固定常量，关联值是运行时动态附带的", "原始值更灵活", "关联值只限 String"], answer: 1, explanation: "RawValue 是 enum case 的固定数据，Associated Value 是每个 case 实例不同数据。一个编译期确定，一个运行时动态附带。" },
      ],
    },
    "swift-async": {
      slug: "swift-async",
      sections: [
        {
          title: "async/await——告别回调地狱",
          content: `Swift 5.5 引入 async/await，把异步代码写成同步的感觉。async 标记函数是异步的，await 在调用点等待结果——不阻塞线程，背后是幕后的 Task 调度。`,
          code: `func fetchUser(id: Int) async throws -> User {
    let url = URL(string: "https://api.example.com/user/\(id)")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}

// 并发执行多个请求
async let user = fetchUser(id: 1)
async let posts = fetchPosts(userId: 1)
let result = try await (user, posts)`,
          language: "swift",
        },
        {
          title: "Task——异步操作的容器",
          content: `Task 是从同步世界跳到异步世界的桥梁。在同步代码中用 Task { } 启动异步任务。Task 有优先级、支持取消，是 Swift 并发框架的基本单元。`,
          code: `Task {
    do {
        let user = try await fetchUser(id: 1)
        print(user.name)
    } catch {
        print("请求失败: \(error)")
    }
}

// 取消任务
let task = Task {
    // 持续检查 Task.isCancelled
    for i in 0..<100 {
        if Task.isCancelled { break }
        // 干活...
    }
}
task.cancel()`,
          language: "swift",
        },
        {
          title: "Actor——串行执行的线程安全容器",
          content: `Actor 是类似 class 的类型，但它是顺序执行的——同一时刻只有一个调用访问 actor 内部状态，天然线程安全。用 await 调用 actor 的方法。`,
          code: `actor BankAccount {
    var balance: Double = 0

    func deposit(amount: Double) {
        balance += amount
    }

    func getBalance() -> Double {
        return balance
    }
}

let account = BankAccount()
await account.deposit(amount: 100)
let total = await account.getBalance()`,
          language: "swift",
        },
        {
          title: "MainActor——UI 更新在主线程",
          content: `MainActor 是专为 UI 设计的全局 Actor。标记 @MainActor 的函数或类自动在主线程执行。更新 SwiftUI 的 @State 或 UIKit 的 UI 组件必须上 MainActor。`,
          code: `@MainActor
class ViewModel: ObservableObject {
    @Published var users: [User] = []

    func loadUsers() async {
        let result = try await fetchUsers()
        users = result  // 自动在主线程更新 UI
    }
}`,
          language: "swift",
          tip: "SwiftUI 里 View 的 body 自动在主线程——但你网络调用回来的闭包切回主线程用 await MainActor.run {}。",
        },
      ],
      quiz: [
        { question: "Swift async/await 与 GCD 的核心区别？", options: ["一样", "async/await 是结构化并发编译器保证，GCD 是手动管理队列", "GCD 更快", "async/await 不能取消"], answer: 1, explanation: "async/await 编译器帮你管理 suspend/resume，不用手动管理队列，代码线性写。" },
        { question: "Actor 的作用是？", options: ["类", "线程安全的串行容器——同一时刻只有一个函数访问 actor 内部状态", "全局变量", "UI 组件"], answer: 1, explanation: "Actor 是并发安全的数据容器——内部状态串行访问不怕竞态，编译期帮你锁。" },
        { question: "Task { } 是做什么的？", options: ["定义枚举", "在非 async 代码里启动一个异步任务", "创建 actor", "创建 class"], answer: 1, explanation: "Task 是异步任务容器——在同步代码中启动 async 函数，就像建立异步上下文。" },
        { question: "MainActor 保证什么？", options: ["性能最快", "代码在主线程执行——安全更新 UI", "异步", "只用于网络"], answer: 1, explanation: "MainActor 标记函数跑在主线程。UI 框架严格要求 UI 更新在主线程，否则 crash。" },
        { question: "async let 和 await 的区别？", options: ["一样", "async let 启动并发子任务，await 等待结果阻塞当前", "async let 更快", "没有区别"], answer: 1, explanation: "async let 声明一个并发子任务立即执行不过等结果；await 在需要使用时等子任务完成拿值。" },
      ],
    },
    "swiftui-basics": {
      slug: "swiftui-basics",
      sections: [
        {
          title: "声明式 UI——描述界面长什么样不是怎么画",
          content: `SwiftUI 的核心思想：界面 = 状态的函数。你只管描述 UI 在不同状态下长什么样子，SwiftUI 自动算出状态变化时需要刷新视图的哪一块。不用手动管 addSubview、removeFromSuperview。`,
          code: `struct ContentView: View {
    var body: some View {
        VStack {
            Text("SwiftUI")
                .font(.largeTitle)
                .foregroundColor(.blue)
            Image(systemName: "star.fill")
        }
    }
}`,
          language: "swift",
        },
        {
          title: "@State——视图自己的状态",
          content: `@State 是 View 的私有状态源，变化时 SwiftUI 自动重绘 body。官方建议把 @State 设为 private。值类型 struct 里用 @State 必须 setter 调用时整个 View 会重新生成。`,
          code: `struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack {
            Text("Count: \(count)")
            Button("加一") { count += 1 }
        }
    }
}`,
          language: "swift",
        },
        {
          title: "@Binding——子视图借父视图的状态",
          content: `@Binding 是子视图从父视图拿到的读写引用。父视图传 $ 前缀变量，子视图用 @Binding 接收——两边共享同一份数据，子改了父也能感知。`,
          code: `struct ParentView: View {
    @State private var text = ""

    var body: some View {
        ChildView(text: $text)  // 传 $ 给子视图
    }
}

struct ChildView: View {
    @Binding var text: String

    var body: some View {
        TextField("输入", text: $text)
    }
}`,
          language: "swift",
        },
        {
          title: "布局组件——VStack/HStack/ZStack",
          content: `SwiftUI 三大布局容器：VStack 垂直排列、HStack 水平排列、ZStack 前后叠放。用 .padding()、Spacer()、.frame() 调整间距和大小，类似 Flexbox 但声明式。`,
          code: `VStack(alignment: .leading, spacing: 10) {
    HStack {
        Image(systemName: "person")
        Text("用户资料")
        Spacer()
        Button("编辑") {}
    }
    Divider()
    Text("这是内容区域")
}
.padding()`,
          language: "swift",
          tip: "SwiftUI 最多只能嵌套 10 层子视图——超过用 Group 或 ForEach 包裹就不会被编译器限制了。",
        },
      ],
      quiz: [
        { question: "声明式 UI 和命令式 UI 的核心区别？", options: ["性能不同", "声明式描述 UI 长什么样由框架更新，命令式手动逐条绘", "声明式更慢", "命令式不用代码"], answer: 1, explanation: "声明式只描述 UI=状态函数的映射关系，SwiftUI 自动跟踪状态并更新界面。" },
        { question: "@State 属性包装器起什么作用？", options: ["存储到磁盘", "标记视图私有的可变状态——改变时自动重绘 body", "只是注释", "加快编译"], answer: 1, explanation: "@State 是 View 的反应式状态引擎——只要被改了，关联视图自动刷新。" },
        { question: "VStack 和 HStack 分别排列方向？", options: ["都是垂直", "VStack 垂直，HStack 水平", "都是水平", "VStack 对角线"], answer: 1, explanation: "V=vertical 垂直排列，H=horizontal 水平排列，ZStack 前后层叠。" },
        { question: "@Binding 与 @State 的区别？", options: ["一样", "@State 是数据源(拥有)，@Binding 是借用父视图引用(不拥有)", "@Binding 性能更好", "@State 只能父视图用"], answer: 1, explanation: "@State 创建并持有状态(owner)，@Binding 只是借父视图状态的读写引用(reference)。" },
        { question: "SwiftUI 视图 body 最多嵌套多少层？", options: ["无限制", "10 层——用 Group 或 @ViewBuilder 绕开限制", "5 层", "100 层"], answer: 1, explanation: "SwiftUI 的 ViewBuilder 只支持最多 10 个直接的子视图，嵌套递归或用 Group/ForEach 突破。" },
      ],
    },
    "kotlin-android": {
      slug: "kotlin-android",
      sections: [
        {
          title: "Kotlin 与 Android——天生的拍档",
          content: `Kotlin 是 Google 官方钦定的 Android 首选语言。比 Java 简洁——不用写分号、属性自动生成 getter/setter、null 安全（编译期防止 NullPointerException）。`,
          code: `class User(
    val name: String,
    var age: Int? = null  // 可空类型
)

fun main() {
    val u = User("张三")
    println(u.name)          // 自动 getter
    println(u.age?.toString() ?: "未知")  // 安全调用 + Elvis
}`,
          language: "kotlin",
        },
        {
          title: "Activity 与生命周期",
          content: `Activity 是 Android 应用的「一页」。它有生命周期：onCreate 创建、onStart 可见、onResume 获得焦点、onPause 失去焦点、onStop 不可见、onDestroy 销毁。管理好生命周期是 Android 开发的基本功。`,
          code: `class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        textView.text = "Hello Kotlin!"
    }
}`,
          language: "kotlin",
        },
        {
          title: "Jetpack Compose——声明式 UI",
          content: `Jetpack Compose 是 Android 的 SwiftUI 等价物——也是声明式 UI。@Composable 函数画出界面，State 变化时自动重组。不再需要 XML 布局文件。`,
          code: `@Composable
fun Greeting(name: String) {
    var count by remember { mutableStateOf(0) }

    Column {
        Text("Hello, $name!")
        Button(onClick = { count++ }) {
            Text("点击次数: $count")
        }
    }
}`,
          language: "kotlin",
        },
        {
          title: "ViewModel——管数据不丢",
          content: `ViewModel 专门存 UI 相关数据并活过旋转屏幕等配置变更。LiveData 或 StateFlow 当数据容器，UI 层 observe 变化自动刷新。`,
          code: `class UserViewModel : ViewModel() {
    private val _user = MutableLiveData<User>()
    val user: LiveData<User> = _user

    fun loadUser(id: Int) {
        viewModelScope.launch {
            _user.value = api.getUser(id)
        }
    }
}`,
          language: "kotlin",
          tip: "ViewModel 不持有 Activity 的引用——旋转屏幕 Activity 被重建但 ViewModel 活得好好，数据不丢。",
        },
      ],
      quiz: [
        { question: "Kotlin 相比 Java 的优势？", options: ["完全一样", "null 安全、扩展函数、协程、简洁语法", "更慢", "不兼容 Java"], answer: 1, explanation: "Kotlin 编译期 null 检查防 NPE，内置协程支持并发，简洁语法省大量模板代码。" },
        { question: "Activity 生命周期中可见到不可见经过哪两步？", options: ["onCreate → onDestroy", "onPause → onStop——失去焦点然后完全不可见", "onStart → onStop", "onResume → onPause"], answer: 1, explanation: "Activity 从获得焦点到完全看不见经历 onPause(半透明覆盖) → onStop(全屏覆盖/离开)。" },
        { question: "Jetpack Compose 比 XML 布局好在哪里？", options: ["不依赖 Kotlin", "声明式——UI 自动跟随 State，不用手动更新视图", "更快", "不需要代码"], answer: 1, explanation: "Compose 用 @Composable 函数 define UI，状态变化时自动重组——告别 findViewById 和 setText。" },
        { question: "ViewModel 解决的核心问题？", options: ["缓存网络数据", "保留 UI 数据经历配置变更(旋转屏幕)不丢失", "加密", "下载文件"], answer: 1, explanation: "屏幕旋转导致 Activity 重建，ViewModel 不跟着死——数据还在，UI 重建后重新绑定即可。" },
        { question: "Kotlin 里 ? 和 ?: 分别是什么？", options: ["注释和赋值", "可选类型安全调用和 Elvis 操作符默认值", "三元和二元", "空指针和延迟"], answer: 1, explanation: "a?.b 只在 a 不为 null 时访问 b；a ?: default 当 a 为 null 时返回 default 值。" },
      ],
    },
    "kotlin-coroutines": {
      slug: "kotlin-coroutines",
      sections: [
        {
          title: "suspend——可暂停的函数",
          content: `Kotlin 协程最独特的就是 suspend 修饰符。suspend 函数表示可以暂停线程（不阻塞），等数据到了再恢复。挂起时线程可以去干别的事，实现了真正的轻量级并发。`,
          code: `suspend fun fetchUser(id: Int): User {
    return withContext(Dispatchers.IO) {
        // 网络请求——线程不会卡死
        api.getUser(id)
    }
}

// 启动协程
fun main() = runBlocking {
    val user = fetchUser(1)
    println(user.name)
}`,
          language: "kotlin",
        },
        {
          title: "Flow——冷数据流",
          content: `Flow 是 Kotlin 的异步数据流——相当于 RxJava 的 Observable 但更轻。冷流（调 collect 才执行数据生产），支持 map、filter、flatMap 等操作。`,
          code: `fun getUsers(): Flow<User> = flow {
    for (i in 1..10) {
        delay(100)
        emit(User(id = i, name = "用户$i"))
    }
}

getUsers()
    .filter { it.id % 2 == 0 }
    .map { it.name.uppercase() }
    .collect { println(it) }`,
          language: "kotlin",
        },
        {
          title: "Channel——热数据通道",
          content: `Channel 是协程之间的管道通信——一个协程往 channel 里发，另一个从 channel 里收。类似 Go 的 channel。适合生产者-消费者模式。`,
          code: `val channel = Channel<Int>()

launch {     // 生产者
    for (i in 1..5) {
        channel.send(i)
    }
    channel.close()
}

launch {     // 消费者
    for (i in channel) {
        println("收到: $i")
    }
}`,
          language: "kotlin",
        },
        {
          title: "协程作用域——管好协程的生命周期",
          content: `协程必须在 CoroutineScope 里运行。viewModelScope 用于 ViewModel，lifecycleScope 用于 Activity/Fragment——生命周期结束时自动取消所有协程防止泄漏。`,
          code: `// ViewModel 里的协程——ViewModel 销毁自动取消
viewModelScope.launch {
    val data = fetchData()
    _state.value = data
}

// 带异常处理
viewModelScope.launch {
    try {
        fetchData()
    } catch (e: Exception) {
        handleError(e)
    }
}`,
          language: "kotlin",
          tip: "永远别用 GlobalScope——挂靠在全局生命周期不会被自动清理，内存泄漏的罪魁祸首。",
        },
      ],
      quiz: [
        { question: "suspend 函数不阻塞线程的原理是什么？", options: ["线程暂停", "协程可以暂停/恢复——挂起时不占用线程资源", "sleep", "阻塞等待"], answer: 1, explanation: "suspend 函数在挂起点暂停协程寄存下来，底层调度器把线程派给其他协程，响应完成时再恢复。" },
        { question: "Flow 是热流还是冷流？", options: ["热——发射后消费不管", "冷——有人 collect 才开始生产数据", "两者都是", "不确定"], answer: 1, explanation: "Flow 默认冷——不收集就停。StateFlow/SharedFlow 是热流——不管有没有监听都发射数据。" },
        { question: "viewModelScope 的作用？", options: ["全局生命周期", "绑定 ViewModel 生命周期——清除时取消所有协程防泄漏", "加速协程", "去除异常"], answer: 1, explanation: "viewModelScope 绑定 ViewModel 的生命周期——ViewModel 销毁时自动 cancel 所有子协程。" },
        { question: "Kotlin Channel 和 Go channel 像不像？", options: ["不一样", "非常像——都是协程/goroutine 间的安全通信管道", "Kotlin 没有", "Go 没有"], answer: 1, explanation: "都是 CSP 并发模型的体现——不共享内存来通信，而是通过管道通信来共享数据。" },
        { question: "Dispatchers.IO 和 Dispatchers.Default 的区别？", options: ["一样", "IO 专门为阻塞 IO(网络/文件)设计，Default 为 CPU 密集计算", "Default 更多线程", "IO 不能用于网络"], answer: 1, explanation: "IO 调度器为阻塞任务动态开线程，Default 调度器跟 CPU 核心数绑定用于计算。" },
      ],
    },
    "kotlin-spring": {
      slug: "kotlin-spring",
      sections: [
        {
          title: "Kotlin 集成 Spring Boot",
          content: `Spring Boot 从 2.0 开始对 Kotlin 有一等公民支持。Kotlin 写 Spring 省掉大量模板代码——data class 替代 @Data、扩展函数、null 安全消除 NPE 风险。`,
          code: `@SpringBootApplication
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}

@RestController
@RequestMapping("/api/users")
class UserController(val service: UserService) {

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: Long): User =
        service.findById(id) ?: throw NotFoundException()
}`,
          language: "kotlin",
        },
        {
          title: "data class 替代 @Data 与构造注入",
          content: `data class 一行替代 Java 里需要 @Entity + @Data + @AllArgsConstructor 的模板。Spring 的构造器注入在 Kotlin 里优雅到极致——一行属性声明就搞定。`,
          code: `// 请求体——Kotlin 自动序列化
data class CreateUserRequest(val name: String, val email: String)

// JPA Entity
@Entity
data class User(
    @Id @GeneratedValue val id: Long = 0,
    val name: String,
    val email: String
)

// Service——构造器自动注入
@Service
class UserService(val userRepo: UserRepository) {
    fun findAll(): List<User> = userRepo.findAll()
}`,
          language: "kotlin",
        },
        {
          title: "Ktor 对比——轻量级替代",
          content: `Ktor 是 JetBrains 自己的异步 Web 框架——基于协程全异步。和 Spring 比 Ktor 轻量得多，适合微服务和 API 网关。Spring 适合重型企业架构。`,
          code: `// Ktor 应用
fun Application.module() {
    routing {
        get("/") {
            call.respondText("Hello Ktor!")
        }

        get("/user/{id}") {
            val id = call.parameters["id"]
            call.respond(findUser(id))
        }
    }
}`,
          language: "kotlin",
          tip: "小服务或团队熟悉 Kotlin 协程选 Ktor 更轻盈；企业系统复用 Spring 生态更稳妥。",
        },
      ],
      quiz: [
        { question: "Kotlin 写 Spring 最大的优势？", options: ["更快的启动", "无需 getter/setter 的 data class 和 null 安全避免 NPE", "更多功能", "完全替代 Java"], answer: 1, explanation: "Kotlin 的 data class 自动生成 equals/hashCode/copy，安全调用防 NPE，代码量削一半。" },
        { question: "Ktor 和 Spring Boot 选哪个？", options: ["只 Spring", "Ktor 轻量异步适合微服务，Spring 企业级生态完整", "只 Ktor", "两个一样"], answer: 1, explanation: "Ktor 基于协程全异步轻量级，适合 API 服务。Spring 生态庞大，适合企业大型项目。" },
        { question: "Kotlin 的 data class 做了什么？", options: ["定义一个数据库", "自动生成 eq/hash/copy/toString/componentN——一行顶 Java 二十行", "创建 XML", "管理生命周期"], answer: 1, explanation: "data class 是专门存放数据的类编译器自动生成常用方法，省掉 Java 的 @Data 注解。" },
        { question: "Spring 构造器注入在 Kotlin 里怎么简化？", options: ["手动写 constructor", "类参数直接写属性——Spring 自动把它进构造器注入依赖", "不需要注入", "用 @Inject"], answer: 1, explanation: "Kotlin 主构造器的参数既是构造函数参数又是类属性，Spring 4.3+ 单构造函数自动 @Autowired。" },
        { question: "Kotlin runApplication 函数是什么？", options: ["测试", "启动 Spring Boot 的 Kotlin 风格入口函数", "运行脚本", "编译"], answer: 1, explanation: "runApplication 是 Kotlin 的 Spring Boot 启动器——一行代码替代 SpringApplication.run。" },
      ],
    },
    "flutter-state": {
      slug: "flutter-state",
      sections: [
        {
          title: "Provider——Google 推荐的简单状态管理",
          content: `Provider 是 Google 官方推荐的最简单状态管理方案。原理是 InheritedWidget 的封装——通过 ChangeNotifier 和 Provider widget 把数据传给子组件并自动刷新。`,
          code: `class Counter extends ChangeNotifier {
    int _count = 0;
    int get count => _count;

    void increment() {
        _count++;
        notifyListeners();
    }
}

// 主入口
runApp(
    ChangeNotifierProvider(
        create: (_) => Counter(),
        child: MyApp(),
    ),
);

// 消费方——自动刷新
final counter = context.watch<Counter>();
Text('\${counter.count}');`,
          language: "dart",
        },
        {
          title: "Riverpod——Provider 的改良版",
          content: `Riverpod 是 Provider 作者改写的新方案——解决了 Provider 的 context 依赖问题，支持懒创建、同类型多实例、自动销毁、编译时安全。推荐新项目直接用 Riverpod。`,
          code: `final counterProvider = StateNotifierProvider<Counter, int>((ref) => Counter());

// 组件中
final count = ref.watch(counterProvider);
Text('$count');

// Riverpod 里改状态
ref.read(counterProvider.notifier).increment();`,
          language: "dart",
        },
        {
          title: "Bloc——更完整的状态管理模式",
          content: `Bloc 模式把 UI 分成 Event→Bloc→State 三部曲。UI 发送事件，Bloc 处理事件后送出新状态，UI 根据状态重建。职责分明、测试友好但模板代码较多。`,
          code: `// Event
abstract class CounterEvent {}
class Increment extends CounterEvent {}

// Bloc
class CounterBloc extends Bloc<CounterEvent, int> {
    CounterBloc() : super(0) {
        on<Increment>((event, emit) => emit(state + 1));
    }
}

// UI
BlocBuilder<CounterBloc, int>(
    builder: (context, count) => Text('$count'),
)`,
          language: "dart",
          tip: "小项目用 Provider 或 Riverpod，中型项目选 Riverpod，大型团队需要严格的事件/状态分离选 Bloc。",
        },
      ],
      quiz: [
        { question: "Flutter Provider 的核心是什么？", options: ["数据库", "ChangeNotifier——数据变自动通知 UI 刷新", "路由", "文件管理"], answer: 1, explanation: "Provider 基于 ChangeNotifier——改状态后调用 notifyListeners，所有 listen 它的 widget 自动重渲染。" },
        { question: "Riverpod 比 Provider 好在哪？", options: ["支持跨 context 访问—不依赖 BuildContext", "Provider 更快", "完全替代不需要", "一样"], answer: 1, explanation: "Riverpod 可以从任何地方读写状态不依赖 context，支持多个同类型 provider 共存。" },
        { question: "Bloc 模式的流程是什么？", options: ["Widget→State→Event", "UI 发 Event→Bloc 处理→Bloc 输出新 State→UI 重建", "直接改状态", "无状态"], answer: 1, explanation: "Event 进、State 出——Bloc 接收事件处理后发射新状态，UI 响应状态变化。" },
        { question: "notifyListeners() 的作用？", options: ["通知网络", "告诉所有监听者数据变了要刷新 UI", "销毁资源", "初始化变量"], answer: 1, explanation: "notifyListeners 是 ChangeNotifier 的核心——调用后所有 context.watch 的 widget 自动重绘。" },
        { question: "Flutter 三种状态管理方案各自适用场景？", options: ["都一样", "Provider 小项目，Riverpod 中大型，Bloc 大团队", "都只用于大型", "都只用于小型"], answer: 1, explanation: "Provider 简单直接，Riverpod 更安全灵活，Bloc 事件/状态分离适合大型重团队。" },
      ],
    },
    "flutter-navigation": {
      slug: "flutter-navigation",
      sections: [
        {
          title: "Navigator——推栈式路由",
          content: `Flutter 导航是推栈模式——push 进栈显示新页面，pop 出栈回到上一页。Navigator.of(context).push(route)，导航到新页面；Navigator.of(context).pop() 返回。`,
          code: `// 跳转到新页面
Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => DetailPage()),
);

// 返回
Navigator.pop(context);

// 跳到根并清除所有中间页面
Navigator.pushAndRemoveUntil(
    context,
    MaterialPageRoute(builder: (_) => HomePage()),
    (route) => false,
);`,
          language: "dart",
        },
        {
          title: "命名路由——给路由起名字",
          content: `命名路由把页面路由集中管理。MaterialApp 中配置 routes 或 onGenerateRoute，跳转时 pushNamed("routeName")。适合页面少的应用。`,
          code: `MaterialApp(
    initialRoute: '/',
    routes: {
        '/': (_) => HomePage(),
        '/detail': (_) => DetailPage(),
    },
);

// 跳转
Navigator.pushNamed(context, '/detail');

// 带参数
Navigator.pushNamed(context, '/detail', arguments: {'id': 42});
final args = ModalRoute.of(context)!.settings.arguments as Map;`,
          language: "dart",
        },
        {
          title: "GoRouter——现代路由的首选",
          content: `GoRouter 是 Flutter 社区后来居上的路由库——支持深链接、参数解析、重定向、嵌套路由。比 Navigator 更灵活和声明式。`,
          code: `final router = GoRouter(
    initialLocation: '/',
    routes: [
        GoRoute(
            path: '/',
            builder: (_, __) => HomePage(),
        ),
        GoRoute(
            path: '/user/:id',
            builder: (_, state) => UserPage(id: state.pathParameters['id']!),
        ),
    ],
);

// 使用
context.go('/');
context.go('/user/42');
context.push('/detail');`,
          language: "dart",
        },
      ],
      quiz: [
        { question: "Flutter 导航的基础模型是什么？", options: ["标签式切换", "栈——push 进栈 pop 出栈", "抽屉式", "手势滑动"], answer: 1, explanation: "Navigator 就像一堆卡片摞在一起，新页面 push 压在顶上，回退 pop 把最顶那张弹出。" },
        { question: "GoRouter 比 Navigator 强在哪？", options: ["更好看", "深链接、路径参数、重定向——支持声明式路由", "无需 context", "只能在 Web 用"], answer: 1, explanation: "GoRouter 按路径匹配路由，天然支持 URL 参数、深层导航链接、路由守卫。" },
        { question: "Navigator.pop(context) 做了什么？", options: ["打开新页面", "关闭当前页面回到上一个页面", "退出应用", "清除所有页面"], answer: 1, explanation: "pop 把栈顶那个页面弹掉——当前页面从栈里移除，露出被它盖住的上一页。" },
        { question: "How to pass arguments to named routes?", options: ["Only URL", "pushNamed(route, arguments: data)", "只能全局变量", "不能"], answer: 1, explanation: "Navigator.pushNamed 的 arguments 参数可以传任意对象到路由页面。" },
        { question: "pushAndRemoveUntil 中的 (route) => false 什么意思？", options: ["保留所有页面", "清空所有之前页面——当前页变成根", "删除当前", "随机删除"], answer: 1, explanation: "pushAndRemoveUntil 保留本页然后清空下面所有页面——新页面成了新的根。" },
      ],
    },
    "flutter-network": {
      slug: "flutter-network",
      sections: [
        {
          title: "http 包——基本的异步请求",
          content: `Flutter 的 http 包提供基本的 HTTP 请求。get、post 返回 Future<Response>。这是最轻量级的网络请求方式。`,
          code: `import 'package:http/http.dart' as http;

Future<void> fetchUsers() async {
    final response = await http.get(
        Uri.parse('https://api.example.com/users'),
        headers: {'Authorization': 'Bearer token'},
    );

    if (response.statusCode == 200) {
        print(response.body);
    } else {
        throw Exception('加载失败: \${response.statusCode}');
    }
}`,
          language: "dart",
        },
        {
          title: "Dio——http 的强力替代",
          content: `Dio 是 Flutter 社区最流行的网络库。支持拦截器、超时、文件上传、请求重试、拦截器日志等高级功能。比 http 包强大多了。`,
          code: `final dio = Dio(BaseOptions(
    baseUrl: 'https://api.example.com',
    connectTimeout: Duration(seconds: 5),
    receiveTimeout: Duration(seconds: 3),
));

// 拦截器
dio.interceptors.add(InterceptorsWrapper(
    onRequest: (options, handler) {
        options.headers['Authorization'] = 'Bearer token';
        handler.next(options);
    },
    onError: (error, handler) {
        print('请求失败: $error');
        handler.next(error);
    },
));

// 请求
final response = await dio.get('/users');
final response = await dio.post('/user', data: {'name': '张三'});`,
          language: "dart",
        },
        {
          title: "JSON 解析——fromJson/toJson 模式",
          content: `Flutter 没有反射，JSON 解析不能像 Gson 自动处理——得手动写解析代码。惯例是加 fromJson 工厂函数和 toJson 方法。用 json_serializable 包可以自动生成避免手写。`,
          code: `class User {
    final int id;
    final String name;
    final String email;

    User({required this.id, required this.name, required this.email});

    factory User.fromJson(Map<String, dynamic> json) {
        return User(
            id: json['id'],
            name: json['name'],
            email: json['email'],
        );
    }

    Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
    };
}

// 解析列表
final data = jsonDecode(response.body);
final users = (data as List).map((j) => User.fromJson(j)).toList();`,
          language: "dart",
        },
        {
          title: "异常处理——try-catch 兜底",
          content: `网络请求是异常的高发区——超时、服务器挂了、数据格式不对都是家常便饭。Dio 的 Error 携带了状态码和响应信息，要分类处理。`,
          code: `try {
    final response = await dio.get('/users');
    final users = (response.data as List)
        .map((j) => User.fromJson(j))
        .toList();
} on DioException catch (e) {
    switch (e.type) {
        case DioExceptionType.connectionTimeout:
            print('连接超时');
            break;
        case DioExceptionType.badResponse:
            print('服务器错误: \${e.response?.statusCode}');
            break;
        default:
            print('网络异常: $e');
    }
}`,
          language: "dart",
        },
      ],
      quiz: [
        { question: "Dio 比 http 包多了什么？", options: ["没区别", "拦截器、请求/响应拦截、超时、文件上传、重试", "更简单", "同样功能"], answer: 1, explanation: "Dio 基于 http 但又加了拦截器链、请求重试、文件分块上传、全局配置等生产力特性。" },
        { question: "Flutter 为什么不能像 Java 的 Gson 自动 JSON 反序列化？", options: ["性能不好", "Dart 不支持反射——没有运行时获取类的元数据的能力", "不需要", "不支持 JSON"], answer: 1, explanation: "Flutter 禁用了 dart:mirrors 反射包提高性能减小体积，所以得手动写解析。" },
        { question: "Dio 拦截器能做什么？", options: ["改变 UI", "统一加 Token、日志打印、请求重试——装饰每个请求", "路由控制", "状态管理"], answer: 1, explanation: "拦截器是一个请求/响应处理的管道——统一加 Header、打印日志、加密/解密。" },
        { question: "jsonDecode 返回什么类型？", options: ["String", "dynamic——需手动转型或判 is List / is Map", "User", "File"], answer: 1, explanation: "jsonDecode 返回 dynamic 类型——可能是 Map 也可能是 List，要根据 JSON 结构判断。" },
        { question: "DioExceptionType 有什么用？", options: ["格式化错误", "分类网络故障——超时、DNS 失败、服务器错误等区分处理", "重试请求", "记录日志"], answer: 1, explanation: "通过 DioExceptionType 判断故障类型，做出不同处理——超时重试、服务器错误报给用户。" },
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
    "c-pointers": {
      slug: "c-pointers",
      sections: [
        {
          title: "指针是什么——就是存放地址的变量",
          content: `指针其实就是存地址的变量。int x = 10; int *p = &x; ——p 里存的是 x 的内存地址，*p 是解引用取出地址里的值。懂了这句就懂了指针一半。`,
          code: `int x = 10;
int *p = &x;    // p 指向 x
printf("%d\n", *p);  // *p = 10 解引用取值
*p = 20;             // 通过指针改 x
printf("%d\n", x);   // x = 20`,
          language: "c",
        },
        {
          title: "多级指针——指针指向另一个指针",
          content: `二级指针存的是另一个指针的地址。int **pp = &p; ——pp 指向 p，p 指向 x。每多一个 * 就多一层间接访问。最多到三级，再多了你自己也晕。`,
          code: `int x = 10;
int *p = &x;     // 一级
int **pp = &p;   // 二级——存 p 的地址
int ***ppp = &pp; // 三级

printf("%d\n", ***ppp);   // 10 三层解引用
**pp = 20;                // 等于 *p = x = 20`,
          language: "c",
          tip: "多级指针主要在动态二维数组和函数传参改指针时用到一、二级。三级指针以上往往是设计问题。",
        },
        {
          title: "函数指针——把函数当参数传递",
          content: `函数名就是函数的地址——函数指针可以指向函数，然后通过指针调用。这让你可以把函数当作参数传给另一个函数（回调、排序比较函数、事件处理器）。`,
          code: `// 定义函数指针类型
typedef int (*Operation)(int, int);

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int calculate(Operation op, int x, int y) {
    return op(x, y);  // 通过指针调用函数
}

printf("%d\n", calculate(add, 5, 3));       // 8
printf("%d\n", calculate(multiply, 5, 3));  // 15`,
          language: "c",
        },
        {
          title: "void 指针——通用快递员",
          content: `void * 是个万能指针——能指向任何类型的数据，但不能直接用 * 解引用，得先强制转换成具体类型。内存分配函数 malloc 返回的就是 void *，需要你自己 cast。`,
          code: `int x = 42;
double y = 3.14;

void *vp;

vp = &x;
printf("%d\n", *(int*)vp);      // 42

vp = &y;
printf("%f\n", *(double*)vp);   // 3.14

// malloc 也是 void指针
int *arr = (int*)malloc(10 * sizeof(int));`,
          language: "c",
        },
      ],
      quiz: [
        { question: "int *p = &x 中，p 存的是什么？", options: ["x 的值", "x 的内存地址", "随机值", "p 自己"], answer: 1, explanation: "p 存的是 x 的地址——指针就是存地址的变量。" },
        { question: "二级指针 int **pp = &p 中 pp 指向了什么？", options: ["x", "一级指针 p 的地址", "随机地址", "x 的值"], answer: 1, explanation: "二级指针是存「另一个指针」的地址——pp 指向 p，p 指向 x。" },
        { question: "函数指针怎么声明？", options: ["int *func()", "int (*func)(int, int)——func 是指向函数的指针", "int func(int, int)", "int *func(int)"], answer: 1, explanation: "int (*func)(int, int) 的 * 包裹指针名后用括号定义参数和返回值类型。" },
        { question: "void 指针为什么解引用前要 cast？", options: ["更快", "编译器不知道实际类型大小——得先转成具体类型", "不需要", "自动转换"], answer: 1, explanation: "void * 擦除类型信息——只有你知道它实际是什么类型，编译器缺需要知道大小才能读写。" },
        { question: "malloc 为什么返回 void *？", options: ["设计错误", "通用——你分配的空间你要什么类型自己 cast", "漏内存", "固定大小"], answer: 1, explanation: "malloc 只管分配字节不管类型——返回 void * 让你按需转成 int*, double* 等。" },
      ],
    },
    "c-memory": {
      slug: "c-memory",
      sections: [
        {
          title: "malloc 和 free——手动管理内存",
          content: `C 不会帮你清理垃圾——你用 malloc/calloc 申请的内存，必须用 free 还回去。忘了 free 就会内存泄漏——程序占的内存越来越多直到撑爆。`,
          code: `// malloc——申请内存
int *arr = (int*)malloc(100 * sizeof(int));
if (arr == NULL) {
    printf("内存分配失败\n");
    return -1;
}

// 使用完后释放
free(arr);
arr = NULL;   // 防止悬空指针

// calloc——申请并设零
int *arr2 = (int*)calloc(100, sizeof(int));`,
          language: "c",
        },
        {
          title: "内存泄漏——吃肉忘记吐骨头",
          content: `内存泄漏的典型症状：忘了 free、循环里 malloc 不释放、错误分支跳走了忘了清理。用 valgrind 工具能帮你检测泄漏——跑的时候告诉你在哪分配了没释放的内存。`,
          code: `// 危险写法——内存泄漏
void process() {
    int *data = malloc(1000 * sizeof(int));
    if (something_wrong) {
        return;          // BUG: 没 free 就跑了！
    }
    // ... 用 data ...
    free(data);
}

// 安全写法——统一出口
void process() {
    int *data = malloc(1000 * sizeof(int));
    if (data == NULL) return;

    if (something_wrong) {
        free(data);     // 每个 return 都先 free
        return;
    }
    free(data);
}`,
          language: "c",
          warning: "每次 malloc 匹配一个 free——这是铁律。在 return 或 goto 前看看有没有遗漏的 free。",
        },
        {
          title: "valgrind——内存检测神器",
          content: `valgrind 是 C/C++ 程序的最强体检工具。能检测内存泄漏、越界访问、未初始化变量、use-after-free 等问题。Memcheck 是最常用的 valgrind 工具。`,
          code: `# 编译时加 -g 保留调试符号
gcc -g -o myapp myapp.c

# valgrind 检测内存问题
valgrind --leak-check=full ./myapp

# 输出会告诉你：
# 1. 哪个文件多少行分配了没释放的内存
# 2. 有没有 use-after-free
# 3. 有没有越界读写`,
          language: "bash",
          tip: "valgrind --leak-check=full 找出泄漏后定位到源代码行号，配合 -g 编译追踪准确。",
        },
      ],
      quiz: [
        { question: "malloc 失败时返回什么？", options: ["0", "NULL——分配失败返回空指针", "随机值", "自动退出"], answer: 1, explanation: "内存分配不够时 malloc 返回 NULL，必须检查——直接解引用 NULL 程序就炸。" },
        { question: "valgrind 主要用来检查什么？", options: ["语法错误", "内存泄漏、越界、use-after-free", "编译错误", "性能优化"], answer: 1, explanation: "valgrind Memcheck 工具是 C/C++ 内存调试的标配——抓泄漏、无效读写、未初始化变量。" },
        { question: "free(arr) 后为什么建议设 arr = NULL？", options: ["释放更多内存", "防止悬空指针——free 后指针还存着老地址不小心再读写就炸", "加快释放", "不影响"], answer: 1, explanation: "free 后指针不变但内存被回收了，这时候再用 *arr 行为未定义——置 NULL 后至少能发现。" },
        { question: "内存泄漏最可能导致什么问题？", options: ["不影响", "程序占内存持续升高——最终 OOM 崩溃", "编译慢", "速度变快"], answer: 1, explanation: "内存只申请不释放，进程常驻时内存曲线一路飙升，直到系统 OOM killer 干掉进程。" },
        { question: "calloc 比 malloc 多做了什么？", options: ["速度更快", "自动把分配的内存区域全清零", "分配更多", "不释放"], answer: 1, explanation: "calloc(count, size) 分配 count*size 个字节并初始化为 0——malloc 分配后内存是随机值。" },
      ],
    },
    "cpp-stl": {
      slug: "cpp-stl",
      sections: [
        {
          title: "vector——动态数组的最爱",
          content: `std::vector 是 C++ 使用最多的容器。底层是连续动态数组，自动扩缩容。push_back 尾部追加 emplace_back 省一次拷贝。比 C 数组安全数倍——范围越界能 check。`,
          code: `#include <vector>
#include <iostream>

std::vector<int> v = {1, 2, 3};
v.push_back(4);
v.emplace_back(5);     // 省一次拷贝构造

for (const auto& x : v) {
    std::cout << x << " ";  // range-based for
}

v.pop_back();          // 删末尾
v[2] = 10;             // 按索引读写`,
          language: "cpp",
        },
        {
          title: "map——自动键序的红黑树字典",
          content: `std::map 底层是红黑树，键自动排序（字典序）。用 [] 取值——键不存在时自动创建默认值。不想自动插入用 find() 或 at()。std::unordered_map 是哈希表版更快但无序。`,
          code: `#include <map>

std::map<std::string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;

// C++17 结构化绑定遍历
for (const auto& [name, score] : scores) {
    std::cout << name << ": " << score << "\n";
}

// find 不会自动插入
auto it = scores.find("Alice");
if (it != scores.end()) {
    std::cout << it->second;  // 95
}`,
          language: "cpp",
        },
        {
          title: "set——自动去重的集合",
          content: `std::set 是红黑树实现的有序集合，元素不能重复。insert 插入（重复的失败），find 找，erase 删。unordered_set 是哈希版本去重更快但不排序。`,
          code: `std::set<int> s = {3, 1, 2, 3, 1};
for (int x : s) std::cout << x << " ";  // 1 2 3——自动排序并去重

// 集合运算
std::set<int> a = {1, 2, 3};
std::set<int> b = {2, 3, 4};

std::set<int> inter;
std::set_intersection(a.begin(), a.end(), b.begin(), b.end(),
                      std::inserter(inter, inter.begin()));
// inter = {2, 3}`,
          language: "cpp",
        },
        {
          title: "algorithm——神仙算法包",
          content: `<algorithm> 里算法多到数不清——sort、find、lower_bound、binary_search、unique、reverse。都用迭代器操作，任何容器都能套。不会用 algorithm 就是在浪费 C++。`,
          code: `#include <algorithm>

std::vector<int> v = {5, 2, 8, 1, 9};

std::sort(v.begin(), v.end());
// v = {1, 2, 5, 8, 9}

auto it = std::find(v.begin(), v.end(), 8);
if (it != v.end()) std::cout << "找到了";

// 二分查找（容器必须有序）
bool exists = std::binary_search(v.begin(), v.end(), 5);

// unique 压缩重复元素
auto last = std::unique(v.begin(), v.end());
v.erase(last, v.end());`,
          language: "cpp",
        },
      ],
      quiz: [
        { question: "vector 和 array 的核心区别？", options: ["一样", "vector 动态大小自动扩缩容，array 编译期固定大小", "array 更快", "vector 是链表"], answer: 1, explanation: "vector 是动态数组——运行时加删改元素，array 像 C 数组定长。" },
        { question: "map 和 unordered_map 的本质区别？", options: ["一样", "map 红黑树排好序 O(log n)，unordered_map 哈希 O(1) 无序", "unordered_map 更慢", "map 是哈希表"], answer: 1, explanation: "map 底层红黑树自动按 key 排序 log n 查找；unordered_map 底层哈希桶 O(1) 但无序。" },
        { question: "std::sort 排序用的是什么算法？", options: ["冒泡", "快速排序 + 插入排序 + 堆排序混合 O(n log n)", "选择排序", "O(n²)"], answer: 1, explanation: "标准库 sort 是 introsort（快排/堆排/插入排序混合），复杂度 O(n log n)。" },
        { question: "emplace_back 和 push_back 的区别？", options: ["一样", "emplace_back 直接在容器内存构造，省一次临时对象的拷贝或移动", "push_back 更快", "只用于 map"], answer: 1, explanation: "emplace_back 转发参数在容器末尾内存原地构造——少一次临时对象的创建+移动。" },
        { question: "迭代器是什么？", options: ["指针", "STL 容器元素的统一遍历接口——增删改查无差别访问", "算法库", "数据成员"], answer: 1, explanation: "迭代器是 STL 的桥梁——统一容器遍历方式。所有 algorithm 通过迭代器操作不关心具体容器是什么。" },
      ],
    },
    "cpp-modern": {
      slug: "cpp-modern",
      sections: [
        {
          title: "auto——编译器自己推类型",
          content: `C++11 的 auto 让编译器自己推断变量类型。迭代器类型那么长不用自己写了，lambda 类型只能写 auto，函数返回也可以用 auto 特别是配合 -> 尾返回类型。`,
          code: `// auto 解绑手写类型
auto i = 42;              // int
auto s = "hello"s;        // std::string

std::vector<int> v = {1, 2, 3};
for (auto it = v.begin(); it != v.end(); ++it) {
    // 没有 auto 得写 std::vector<int>::iterator
}

// 范围 for 配合 auto 最好
for (auto& x : v) {
    x *= 2;
}`,
          language: "cpp",
        },
        {
          title: "lambda 表达式——行内函数",
          content: `lambda 是 C++11 引入的匿名函数。[捕获](参数){函数体}。捕获外部变量用 [=] 值捕获或 [&] 引用捕获。[this] 捕获类成员。配合 algorithm 做回调的最爱。`,
          code: `std::vector<int> v = {5, 2, 8};

// 自定义排序 lambda
std::sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;  // 降序
});

int threshold = 5;
auto it = std::find_if(v.begin(), v.end(), [threshold](int x) {
    return x > threshold;  // 捕获外部变量 threshold
});`,
          language: "cpp",
        },
        {
          title: "智能指针——自动释放内存",
          content: `C++11 给了三种智能指针，告别手动 delete。unique_ptr 独占所有权不能复制（move 可以）；shared_ptr 共享所有权（引用计数）；weak_ptr 旁观不参与计数打破循环引用。`,
          code: `// unique_ptr——独占
auto ptr = std::make_unique<User>("张三");
ptr->getName();
// auto p2 = ptr;  // 编译错误——unique 不能复制

// shared_ptr——共享
auto sptr1 = std::make_shared<int>(42);
auto sptr2 = sptr1;  // 两者指向同一块内存
// 最后一个 shared_ptr 析构时才真正释放

// weak_ptr——破解循环引用
std::weak_ptr<int> w = sptr1;
if (auto sp = w.lock()) {
    // weak_ptr 升级成 shared_ptr 安全访问
}`,
          language: "cpp",
        },
        {
          title: "移动语义——搬家别复制",
          content: `C++11 引入右值引用(T&&)和 std::move——把数据所有权从一个对象移到另一个对象，不用深拷贝。临时对象、函数返回值自动触发移动。如果类没有移动构造函数回退到拷贝。`,
          code: `std::vector<int> v1 = {1, 2, 3};
std::vector<int> v2 = std::move(v1);  // v1 空了，v2 拿走了所有权

// 移动构造函数
class Buffer {
    int* data;
    size_t size;
public:
    Buffer(int sz) : data(new int[sz]), size(sz) {}

    Buffer(Buffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;   // 清空源对象
    }
};`,
          language: "cpp",
          tip: "带 std::move 的不是真移移，是给编译器一个「当右值处理」的信号。移完后源对象不应再用，除了可用 reset。",
        },
      ],
      quiz: [
        { question: "auto 什么时候必用？", options: ["看习惯", "lambda 类型无法写出——只能 auto 接收", "总是", "从不"], answer: 1, explanation: "lambda 表达式的类型是编译器生成的匿名类——人没法写出类型名，只能 auto 接收。" },
        { question: "unique_ptr 为什么不能赋值给另一个 unique_ptr？", options: ["bug", "独占所有权——同一时刻只有一个 unique_ptr 持有数据", "性能", "没有重载"], answer: 1, explanation: "unique 是独占——不能复制，只能 std::move 转移所有权到另一个。" },
        { question: "std::move 实际做了什么？", options: ["移动数据", "把左值标记成右值——告诉编译器「可以转移这个」", "释放内存", "交换内存"], answer: 1, explanation: "std::move 不移动——只是 static_cast 到右值引用，实际移动操作由类的移动构造函数完成。" },
        { question: "shared_ptr 的引用计数什么时候释放内存？", options: ["离开作用域就释放", "最后一个 shared_ptr 析构时引用计数归零才 delete", "永远不会", "手动 delete"], answer: 1, explanation: "shared_ptr 内部维护引用计数——每份拷贝 +1，析构 -1，计数降到 0 才 delete。" },
        { question: "C++11 哪三个智能指针标配？", options: ["std::ptr", "unique_ptr, shared_ptr, weak_ptr", "auto_ptr", "unique_ptr, auto_ptr, scope_ptr"], answer: 1, explanation: "C++11 正式推这三个——unique 独占，shared 共享，weak 破解循环引用。" },
      ],
    },
  },
};

// Map new category IDs to old section names for backward compatibility
// When a new category is created, its tutorials are looked up from the original sections
const categoryMap: Record<string, string> = {
  mongodb: "sql",
  k8s: "docker",
  react: "frontend",
  vue: "frontend",
  htmlcss: "frontend",
  typescript: "frontend",
  nodejs: "javascript",
  java: "backend",
  go: "backend",
  rust: "backend",
  php: "backend",
  ccpp: "languages",
  swift: "mobile",
  kotlin: "mobile",
  flutter: "mobile",
};

// Slug remapping: some tutorial slugs changed when categories were split
const slugMap: Record<string, Record<string, string>> = {
  mongodb: { "mongodb-basics": "mongodb-intro" },
  htmlcss: {
    "html-basics": "html-basics",
    "css-basics": "css-basics",
    "css-flexbox": "css-flexbox",
    "css-grid": "css-grid",
    "css-responsive": "css-responsive",
    "css-animations": "css-animations",
    "html-forms": "html-forms",
    "dom-manipulation": "dom-manipulation",
    "ajax-fetch": "ajax-fetch",
    "bootstrap-basics": "bootstrap-basics",
    "tailwind-basics": "tailwind-basics",
  },
  typescript: {
    "ts-basics": "ts-basics",
    "ts-types": "ts-types",
    "ts-interfaces": "ts-interfaces",
    "ts-generics": "ts-generics",
    "ts-advanced": "ts-advanced",
    "ts-decorators": "ts-decorators",
    "ts-project": "ts-project",
  },
};

export function getTutorialContent(categoryId: string, slug: string): TutorialContent | undefined {
  const mappedCategory = categoryMap[categoryId] || categoryId;
  const mappedSlug = slugMap[categoryId]?.[slug] || slug;
  return tutorialContents[mappedCategory]?.[mappedSlug];
}

export default tutorialContents;
