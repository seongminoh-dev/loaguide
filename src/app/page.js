"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getKey } from "@/services/APIKey"

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkApiKey = async () => {
      setLoading(true);
      //쿠키 가져오기
      const apiKey = await getKey();
      //키 등록 여부 확인
      if (!apiKey) {
        router.replace("/auth");
      } else {
        router.replace("/main");
      }
      setLoading(false);
    };
    checkApiKey();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl font-semibold mt-4">불러오는 중...</p>
      </div>
    );
  }

  return null; // 로딩 중이 아니면 비어 있는 페이지 (리다이렉트 중)
}
