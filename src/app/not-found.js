"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // 3초 후 리다이렉트
    const timer = setTimeout(() => {
      router.push("/main"); // 리다이렉트할 경로
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 제거
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">존재하지 않는 페이지 입니다!!</h1>
      <p className="mt-4">잠시후 메인 페이지로 이동합니다...</p>
    </div>
  );
}
