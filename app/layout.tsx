import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDF Reader",
  description: "A custom PDF reader built with Next.js to cater to all your PDF reading needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme='dark' lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
