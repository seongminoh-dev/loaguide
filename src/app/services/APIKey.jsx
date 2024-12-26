"use server";

import { getCookie, setCookie, deleteCookie } from "@/services/CookieService";

// 서버에 유효한 Key인지 인증 요청
export async function validateKey(apiKey) {
    const url = "https://developer-lostark.game.onstove.com/news/events";
    try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "accept": "application/json",
            "authorization": `bearer ${apiKey}`,
          },
        });
    
        if (response.ok) {
          console.log("응답 성공: HTTP 200");
          setCookie("apiKey",apiKey);
          return apiKey;
        } else {
          console.error(`응답 실패: HTTP ${response.status}`);
          return null;
        }
      } catch (error) {
        console.error("요청 중 오류 발생:", error);
        return null;
      }
}

// 쿠키에 키가 존재하는지 확인 후 존재하면 키 반환, 존재하지 않으면 null 반환
export async function getKey() {
    const apiKey = await getCookie("apiKey"); // "apiKey" 쿠키 가져오기
    return apiKey || null; // 값이 없으면 null 반환
}

// API 키 설정
export async function setKey(apiKey) {
    if (!apiKey) throw new Error("API 키가 제공되지 않았습니다.");
    await setCookie("apiKey", apiKey); // "apiKey" 쿠키 설정
}

// API 키 삭제
export async function deleteKey() {
    await deleteCookie("apiKey"); // "apiKey" 쿠키 삭제
}
