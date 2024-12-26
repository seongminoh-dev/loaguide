"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateKey } from "@/services/APIKey";

export default function APIKeyBox() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!apiKey) {
      alert("API-KEY를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await validateKey(apiKey);

      if (response) {
        alert("API-KEY가 저장되었습니다.");
        router.push("/main");
      } else {
        alert("유효하지 않은 API-KEY입니다.");
      }
    } catch (error) {
      console.error("API-KEY 검증 실패:", error);
      alert("API-KEY 검증 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-800 p-8 rounded-lg shadow-lg relative top-[-5vh]">
      <form onSubmit={handleSubmit}>
        <label
          className="block text-lg font-medium text-white mb-4"
          htmlFor="apiKey"
        >
          API-KEY 입력
        </label>
        <input
          id="apiKey"
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="API-KEY를 입력하세요"
          className="w-full px-4 py-2 border border-gray-600 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          disabled={loading}
        >
          {loading ? "검증 중..." : "확인"}
        </button>
        <a
          href="https://developer-lostark.game.onstove.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-blue-400 hover:underline text-center"
        >
          API-KEY 발급 받으러 가기
        </a>
      </form>
    </div>
  );
}