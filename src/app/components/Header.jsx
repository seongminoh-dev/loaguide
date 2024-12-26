"use client";

import { useState } from "react";
import { deleteKey } from "@/services/APIKey";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleResetKey = async () => {
    try {
      await deleteKey();
      alert("인증키가 초기화되었습니다.");
      router.push("/main");
    } catch (error) {
      console.error("인증키 초기화 중 오류 발생:", error);
      alert("인증키 초기화에 실패했습니다.");
    } finally {
      setIsMenuOpen((prev) => !prev);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white px-4 py-6 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* 가운데 LoaGuide 글씨 */}
        <h1 className="text-xl font-bold text-center flex-grow text-gray-100">
          LoaGuide
        </h1>
        {/* 메뉴 아이콘 */}
        <div className="relative">
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
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <ul className="py-1 text-gray-700">
                <li>
                  <button
                    onClick={handleResetKey}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    인증키 초기화
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
