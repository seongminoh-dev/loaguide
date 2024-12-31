"use client";

import { useState } from "react";
import { getCharacterData } from "@/services/Character";
import CharacterInfoBox from "@/components/CharacterInfoBox";

export default function MyCharacterPage() {
  const [nickname, setNickname] = useState(""); // 닉네임 입력값
  const [characterData, setCharacterData] = useState(null); // 캐릭터 데이터
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await getCharacterData(nickname);
      setCharacterData(data);
    } catch (err) {
      console.error("데이터 가져오기 실패:", err);
      setError("캐릭터 정보를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">내 캐릭터 정보</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col items-center space-y-4"
      >
        <input
          type="text"
          placeholder="캐릭터 닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition"
          disabled={loading || !nickname.trim()}
        >
          {loading ? "로딩 중..." : "검색"}
        </button>
      </form>

      {loading && <p className="text-gray-400 mt-4">캐릭터 정보를 불러오는 중입니다...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {characterData && <CharacterInfoBox characterData={characterData} />}
    </div>
  );
}
