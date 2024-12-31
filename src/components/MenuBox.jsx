"use client";

import { useRouter } from "next/navigation";

export default function MenuBox({ title, description, path }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(path); // 해당 경로로 이동
  };

  return (
    <div
      className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-4 hover:bg-gray-700 transition cursor-pointer"
      onClick={handleClick} // 클릭 이벤트 추가
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <hr className="my-2 border-gray-600" />
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
