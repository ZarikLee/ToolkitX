import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";

export const metadata: Metadata = {
  title: { default: "ToolkitX - 技术知识库 & 运维工具箱", template: "%s | ToolkitX" },
  description: "ToolkitX 是免费的在线技术学习平台，覆盖 Linux、Java、Python、React、K8s 等 28 个技术栈，提供 200+ 篇大白话教程、在线工具箱和 AI 助手。",
  keywords: ["技术教程", "编程学习", "Linux", "Java", "Python", "React", "K8s", "运维工具", "在线工具"],
  openGraph: {
    title: "ToolkitX - 技术知识库 & 运维工具箱",
    description: "覆盖 28 个技术栈，200+ 篇白话教程，免费在线学习平台。",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <div className="grain-overlay" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
