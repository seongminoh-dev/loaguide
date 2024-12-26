"use client";

import APIKeyBox from "@/components/APIKeyBox";

export default function AuthPage() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-900 text-white">
      <APIKeyBox />
    </div>
  );
}
