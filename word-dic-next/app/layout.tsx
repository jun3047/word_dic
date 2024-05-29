import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "완벽한 감정 사전",
  description: "한국어로 할 수 있는 모든 감정표현",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}