/**
 * ========================================
 * 구글 로그인 리다이렉트 페이지 (GoogleLoginRedirectPage)
 * ========================================
 *
 * 구글 OAuth 로그인 후 리다이렉트되는 페이지입니다.
 * URL 쿼리 파라미터에서 토큰을 추출하여 localStorage에 저장하고
 * 마이페이지로 이동합니다.
 *
 * 동작 과정:
 * 1. 구글 로그인 완료 후 이 페이지로 리다이렉트됨
 * 2. URL의 쿼리 파라미터에서 accessToken과 refreshToken 추출
 * 3. 토큰들을 localStorage에 저장
 * 4. 마이페이지(/my)로 자동 이동
 */

import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

/**
 * 구글 로그인 리다이렉트 페이지 컴포넌트
 * 구글 OAuth 인증 후 토큰을 처리하는 중간 페이지
 */
export const GoogleLoginRedirectpage = () => {
  // localStorage에 accessToken 저장하는 함수
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );

  // localStorage에 refreshToken 저장하는 함수
  const { setItem: setRefresthToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  /**
   * 컴포넌트 마운트 시 실행되는 Effect
   * URL 쿼리 파라미터에서 토큰을 추출하여 localStorage에 저장
   */
  useEffect(() => {
    // URL 쿼리 파라미터 파싱
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    // accessToken이 있으면 토큰 저장 후 마이페이지로 이동
    if (accessToken) {
      setAccessToken(accessToken);
      setRefresthToken(refreshToken);
      window.location.href = "/my";
    }

    // 디버깅용 로그
    console.log(window.location.search, urlParams);
  }, [setAccessToken, setRefresthToken]);

  // 토큰 처리 중에는 빈 화면 표시 (바로 리다이렉트되므로 사용자는 볼 수 없음)
  return <div></div>;
};
