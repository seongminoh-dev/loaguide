"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();
  return (
    <div className="flex flex-col bg-gray-900 text-white">
    <div className="max-w-7xl px-4 sm:px-8 py-8 text-left">
      <h1 className="text-3xl font-bold mb-6">존재하지 않는 페이지 입니다!!</h1>
  
    </div>
  </div>
  );
}
