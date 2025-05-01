import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ERP 管理系统",
  description: "企业资源管理系统",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
