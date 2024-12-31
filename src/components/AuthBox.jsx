"use client";

import { useState, useEffect } from "react";
import { validateKey, getKey, deleteKey } from "@/services/APIKey";
import { useAuth } from "@/context/AuthContext";

export default function AuthBox({ onClose }) {
  const [apiKey, setApiKey] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 최초 로딩 상태
  const [isActionInProgress, setIsActionInProgress] = useState(false); // 동작 상태 관리
  const { setAuthState } = useAuth(); // Context 업데이트 함수 가져오기
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchKey = async () => {
      const storedKey = await getKey();
      if (storedKey) {
        setApiKey(storedKey);
        setIsAuthenticated(true);
        setAuthState(true); // Context 인증 상태 업데이트
      }
      setIsLoading(false); // 로딩 완료
    };
    fetchKey();
  }, [setAuthState]);

  const handleValidate = async () => {
    setMessage("");
    setIsActionInProgress(true);
    try {
      const result = await validateKey(apiKey);
      if (result) {
        setMessage("인증되었습니다.");
        setIsAuthenticated(true);
        setAuthState(true); // Context 인증 상태 업데이트
      } else {
        setMessage("유효하지 않은 키입니다.");
        setAuthState(false); // 실패 시 Context 인증 상태 업데이트
      }
    } catch (error) {
      setMessage("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsActionInProgress(false);
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleDelete = async () => {
    setIsActionInProgress(true);
    try {
      const result = await deleteKey();
      setApiKey("");
      setIsAuthenticated(false);
      setMessage("Key가 삭제되었습니다.");
      setAuthState(false); // Context 인증 상태 업데이트
    } catch (error) {
      setMessage("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsActionInProgress(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 text-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-transform transform hover:scale-110"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">API Key 인증</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 text-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-transform transform hover:scale-110"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">API Key 인증</h2>

        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
            API Key
          </label>
          <div className="flex items-center">
            <input
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={(isAuthenticated && !isEditable) || isActionInProgress}
              className={`flex-grow px-4 py-2 rounded-lg bg-gray-700 text-white border focus:outline-none focus:ring ${{
                true: "border-gray-600 focus:ring-gray-400",
                false: "border-red-500 focus:ring-red-500",
              }} ${isAuthenticated && !isEditable ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {isAuthenticated && !isEditable && (
              <button
                onClick={handleEdit}
                className="ml-2 text-sm text-blue-400 hover:text-blue-500"
              >
                수정
              </button>
            )}
          </div>
        </div>

        {message && (
          <p
            className={`text-sm mt-2 ${
              message.includes("유효하지 않은 키") || message.includes("실패")
                ? "text-red-500"
                : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6">
          <button
            onClick={handleValidate}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            disabled={isAuthenticated && !isEditable || isActionInProgress}
          >
            {isActionInProgress ? "인증 중..." : isAuthenticated && !isEditable ? "확인됨" : "인증"}
          </button>
        </div>

        {isAuthenticated && (
          <div className="mt-4">
            <button
              onClick={handleDelete}
              className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
              disabled={isActionInProgress}
            >
              {isActionInProgress ? "삭제 중..." : "Key 삭제"}
            </button>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-400">
          KEY가 없으신가요? <a href="https://developer-lostark.game.onstove.com/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">API 발급 받기</a>
        </div>
      </div>
    </div>
  );
}
