"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthBox from "@/components/AuthBox";

const menuList = [
  { name: "홈", path: "/home" },
  { name: "오레하 공장", path: "/produce" },
  { name: "스펙업 효율 계산", path: "/calc" },
  { name: "시세 조회", path: "/market" },
  { name: "내 캐릭터", path: "/mycharacter" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 모바일 메뉴 열림 상태
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // 모달 상태
  const { isAuthenticated, apiCallsRemaining, isLoading } = useAuth(); // isLoading 추가
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navigateTo = (path) => {
    setIsMenuOpen(false); // 모바일 메뉴 닫기
    router.push(path);
  };

  const openAuthModal = () => {
    if (!isLoading) setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-900 text-white py-4 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8">
          {/* 로고 */}
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigateTo("/home")}
          >
            LoaGuide
          </h1>

          {/* 데스크탑 메뉴 및 인증 박스 */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {menuList.map((menu) => (
                <button
                  key={menu.path}
                  onClick={() => navigateTo(menu.path)}
                  className={`hover:text-gray-300 transition-colors ${
                    isActive(menu.path) ? "text-blue-400 font-semibold" : ""
                  }`}
                >
                  {menu.name}
                </button>
              ))}
            </nav>

            {/* 인증 박스 */}
            <div
              className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition ${
                isAuthenticated || isLoading
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
              onClick={openAuthModal}
            >
              {isLoading ? (
                <span>&nbsp;&nbsp;</span> // 로딩 중에는 공백 두 칸 표시
              ) : isAuthenticated ? (
                <span>남은 인증: {apiCallsRemaining}회</span>
              ) : (
                <span>인증 필요</span>
              )}
            </div>
          </div>

          {/* 모바일 메뉴 버튼 및 인증 박스 */}
          <div className="md:hidden flex items-center space-x-4">
            {/* 인증 박스 */}
            <div
              className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition ${
                isAuthenticated || isLoading
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
              onClick={openAuthModal}
            >
              {isLoading ? (
                <span>&nbsp;&nbsp;</span> // 로딩 중에는 공백 두 칸 표시
              ) : isAuthenticated ? (
                <span>남은 인증: {apiCallsRemaining}회</span>
              ) : (
                <span>인증 필요</span>
              )}
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 드롭다운 */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 text-white shadow-md z-10">
            <ul className="flex flex-col space-y-4 p-4">
              {menuList.map((menu) => (
                <li key={menu.path}>
                  <button
                    onClick={() => navigateTo(menu.path)}
                    className={`w-full text-left hover:text-gray-300 ${
                      isActive(menu.path) ? "text-blue-400 font-semibold" : ""
                    }`}
                  >
                    {menu.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* AuthBox 모달 */}
      {isAuthModalOpen && <AuthBox onClose={closeAuthModal} />}
    </>
  );
}




