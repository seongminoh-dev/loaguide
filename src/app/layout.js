// /app/layout.js
import '@/styles/global.css';

import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "LoaGuide",
  description: "LoaGuide",
};


export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <AuthProvider>
        <body className="bg-gray-900 text-white">
          {/* 고정 헤더 */}
          <Header />

          {/* 본문 영역 */}
          <div className="pt-16 flex min-h-screen">
            {/* 좌측 영역 */}
            <aside className="hidden lg:block w-1/10 bg-gray-900"></aside>

            {/* 메인 콘텐츠 영역 */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-8">
              {children}
            </main>

            {/* 우측 영역 */}
            <aside className="hidden lg:block w-1/10 bg-gray-900"></aside>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
