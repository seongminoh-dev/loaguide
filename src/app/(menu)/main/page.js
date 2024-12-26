"use client";

import { useState, useEffect } from "react";
import { getKey } from "@/services/APIKey"; // getKey 함수 import

export default function MainPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const apiKey = await getKey(); // getKey로 API 키 가져오기

      const response = await fetch("https://developer-lostark.game.onstove.com/news/events", {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `bearer ${apiKey}`, // 가져온 API 키 사용
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">이벤트 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={event.Thumbnail}
              alt={event.Title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold mb-2">{event.Title}</h2>
              <p className="text-sm text-gray-400">
                {new Date(event.StartDate).toLocaleDateString()} ~{" "}
                {new Date(event.EndDate).toLocaleDateString()}
              </p>
              {event.RewardDate && (
                <p className="text-sm text-yellow-400 mt-1">
                  보상 수령: {new Date(event.RewardDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <a
              href={event.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-blue-600 text-center text-white py-2 hover:bg-blue-700"
            >
              자세히 보기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

