import type { Metadata } from "next";
import "./globals.css";
import "./learn/neon.css";
import { MigrationProvider } from "@/components/layout/migration-provider";
import { ToastProvider } from "@/hooks/use-toast";

export const metadata: Metadata = {
  title: "ToolkitX - 技术知识库 & 运维工具箱",
  description: "全方位技术知识库与运维工具平台，涵盖 Linux、SQL、Docker、Python 等 100+ 教程，配套在线练习与模拟实验",
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
      <body className="h-screen overflow-hidden flex flex-col" style={{ background: "#131313", color: "#e4e2e1" }}>
        <MigrationProvider>
          <ToastProvider>
            <div className="grain-overlay" />
            <div className="flex-1 overflow-hidden flex flex-col">{children}</div>
          </ToastProvider>
        </MigrationProvider>
      </body>
    </html>
  );
}
