import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "ToolkitX - 运维工具平台",
  description: "容器化部署、服务器管理、数据库管理一站式运维工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <body className="h-screen overflow-hidden flex flex-col">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="flex-1 overflow-hidden flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
