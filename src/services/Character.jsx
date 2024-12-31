import { getKey } from "@/services/APIKey";

export const getCharacterData = async (nickname) => {
  const apiKey = await getKey();
  if (!apiKey) throw new Error("API 키가 없습니다.");

  const url = `https://developer-lostark.game.onstove.com/armories/characters/${encodeURIComponent(
    nickname
  )}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("캐릭터 정보를 가져오는 데 실패했습니다.");
  }

  return await response.json();
};
