import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

// 구글 로그인 리다이렉트 페이지
const GoogleLoginRedirectPage = () => {
  // localStorage에 토큰 저장하는 함수(accessToken, refreshToken)
    const {setItem : setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {setItem : setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);


  // URLSearchParams를 사용하여 쿼리 파라미터에서 토큰 추출
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    // accessToken이 존재하면 localStorage에 토큰 저장
    if (accessToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        window.location.href="/my";
    }
  }, [setAccessToken, setRefreshToken]); // setAccessToken, setRefreshToken 변경될 때마다 실행
  // Q. 의존성 배열은 여기에 들어간 값이 변경될때만 useEffect가 실행되는데 함수는 변수가 아닌데 어떻게 변경되지?
  // A. React 훅의 규칙상 useEffect 내부에서 사용된 외부함수는 모두 의존성 배열에 넣어줘야함. 
  // A. 추가로 setItem은 useCallback으로 사용되는데 이 함수는 값을 메모이징 함. 즉 결과가 바뀌지 않음
  // A. 따라서 useEffect는 한번만 실행됨. -> 출처  : 제미나이
  return <div>구글 로그인 리다이렉트</div>;
};

export default GoogleLoginRedirectPage;
