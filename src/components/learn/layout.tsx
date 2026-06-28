"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { categories, type TutorialCategory } from "@/data/tutorials";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 h-12 flex items-center gap-4">
          {/* Logo */}
          <Link href="/learn" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-[11px] font-bold">TK</span>
            </div>
            <span className="text-[15px] font-bold text-gray-800 hidden sm:block">知识库</span>
          </Link>

          {/* Category Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto">
            {categories.slice(0, 8).map(cat => (
              <Link
                key={cat.id}
                href={`/learn/${cat.id}`}
                className={`px-2.5 py-1 rounded text-[12px] whitespace-nowrap transition-colors ${
                  pathname.startsWith(`/learn/${cat.id}`)
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-[12px] text-gray-500 hover:border-blue-300 hover:text-blue-500 transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">搜索</span>
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="搜索教程..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-400"
                  onKeyDown={e => {
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="p-3 space-y-1">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/learn/${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-[13px] ${
                    pathname.startsWith(`/learn/${cat.id}`)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}

// Sidebar component for tutorial pages
export function TutorialSidebar({
  category,
  currentSlug,
}: {
  category: TutorialCategory;
  currentSlug?: string;
}) {
  return (
    <aside className="w-[240px] shrink-0 border-r border-gray-200 bg-gray-50/50 overflow-y-auto hidden lg:block">
      <div className="p-4">
        {/* Category Header */}
        <Link
          href={`/learn/${category.id}`}
          className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200"
        >
          <span className="text-[18px]">{category.icon}</span>
          <span className="text-[14px] font-semibold text-gray-800">{category.name}</span>
        </Link>

        {/* Tutorial Links */}
        <nav className="space-y-0.5">
          {category.tutorials.map((tutorial, i) => (
            <Link
              key={tutorial.slug}
              href={`/learn/${category.id}/${tutorial.slug}`}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] transition-colors ${
                tutorial.slug === currentSlug
                  ? "bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              <span className="text-[10px] text-gray-400 w-4 shrink-0">{i + 1}.</span>
              <span className="truncate">{tutorial.title}</span>
            </Link>
          ))}
        </nav>

        {/* Quiz Link */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link
            href={`/learn/${category.id}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <ChevronRight className="h-3 w-3" />
            返回 {category.name} 目录
          </Link>
        </div>
      </div>
    </aside>
  );
}

// Right sidebar with tools and info
export function RightSidebar() {
  return (
    <aside className="w-[220px] shrink-0 border-l border-gray-200 bg-gray-50/50 overflow-y-auto hidden xl:block">
      <div className="p-4 space-y-6">
        {/* Online Tools */}
        <div>
          <h4 className="text-[12px] font-semibold text-gray-700 mb-2">在线工具</h4>
          <div className="space-y-1.5">
            {[
              { name: "JSON 格式化", href: "/tools?tool=json" },
              { name: "Base64 编解码", href: "/tools?tool=encoding" },
              { name: "正则表达式测试", href: "/tools?tool=regex" },
              { name: "时间戳转换", href: "/tools?tool=timestamp" },
              { name: "密码生成器", href: "/tools?tool=password" },
              { name: "QR 码生成", href: "/tools?tool=qr" },
            ].map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block text-[12px] text-blue-600 hover:text-blue-800 hover:underline"
              >
                · {tool.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div>
          <h4 className="text-[12px] font-semibold text-gray-700 mb-2">常用参考</h4>
          <div className="space-y-1.5">
            {[
              { name: "Linux 命令大全", href: "/learn/linux" },
              { name: "SQL 语法速查", href: "/learn/sql" },
              { name: "Docker 命令参考", href: "/learn/docker" },
              { name: "Git 常用命令", href: "/learn/git" },
              { name: "Nginx 配置参考", href: "/learn/nginx" },
            ].map(ref => (
              <Link
                key={ref.href}
                href={ref.href}
                className="block text-[12px] text-blue-600 hover:text-blue-800 hover:underline"
              >
                · {ref.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Tutorials */}
        <div>
          <h4 className="text-[12px] font-semibold text-gray-700 mb-2">最近更新</h4>
          <div className="space-y-1.5">
            {categories.slice(0, 5).map(cat => (
              <Link
                key={cat.id}
                href={`/learn/${cat.id}/${cat.tutorials[0].slug}`}
                className="block text-[12px] text-blue-600 hover:text-blue-800 hover:underline"
              >
                · {cat.tutorials[0].title}
              </Link>
            ))}
          </div>
        </div>

        {/* Site Info */}
        <div className="text-[11px] text-gray-400 space-y-1">
          <p>技术支持 ToolkitX</p>
          <p>© 2026 ToolkitX</p>
        </div>
      </div>
    </aside>
  );
}
