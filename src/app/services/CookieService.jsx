  "use server";
  // 쿠키 관련 서비스 모듈
  import { cookies } from "next/headers";

  /**
   * 쿠키 설정
   * @param {string} name - 쿠키 이름
   * @param {string} value - 쿠키 값
   * @returns {Promise<void>}
   */
  export const setCookie = async (name, value) => {
    const oneDay = 24 * 60 * 60 * 30;
    const krTimeDiff = 9 * 60 * 60 * 1000;

    await cookies().set(name, value, {
      expires: new Date(Date.now() + oneDay + krTimeDiff), // Date 객체로 변경
      secure: true,
      httpOnly: true,
      path: "/",
      // domain: `${process.env.NEXT_PUBLIC_BE_URL}`,
    });
  };

  /**
   * 쿠키 가져오기
   * @param {string} name - 쿠키 이름
   * @returns {Promise<string | undefined>} 쿠키 값
   */
  export const getCookie = async (name) => {
    const cookie = await cookies().get(name);
    return cookie?.value;
  };

  /**
   * 모든 쿠키 가져오기
   * @returns {Promise<Set<Cookie>>} 모든 쿠키
   */
  export const getAllCookies = async () => {
    return await cookies().getAll();
  };

  /**
   * 쿠키 삭제
   * @param {string} name - 쿠키 이름
   * @returns {Promise<void>}
   */
  export const deleteCookie = async (name) => {
    await cookies().delete(name, { path: "/" });
  };
