import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "부산 맛집",
  description: "부산의 맛집을 찾아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full bg-gray-50">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        {/* 화면이 클 때(lg)는 전체 너비의 80%를, 작을 때는 100%를 사용하도록 설정 */}
        <div className="w-full lg:w-4/5 lg:max-w-7xl lg:mx-auto h-full flex flex-col bg-white lg:shadow-xl">
          <header className="flex-shrink-0 border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                <Link href="/">부산 맛집</Link>
              </h1>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/"
                      className="text-gray-700 hover:text-black transition-colors">
                      홈
                    </Link>
                  </li>
                  <li>
                    <Link href="/region" 
                      className="text-gray-700 hover:text-black transition-colors">
                      지역
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-grow overflow-y-auto">
            <div className="container mx-auto px-4 py-8">{children}</div>
          </main>
          <footer className="flex-shrink-0 border-t border-gray-200 bg-gray-100">
            <div className="container mx-auto px-4 py-6 text-center">
              <p className="text-sm text-gray-500">
                &copy; 2024 부산 맛집. All Rights Reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
