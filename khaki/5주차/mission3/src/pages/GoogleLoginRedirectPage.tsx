// <OUTH 사용 시 백엔드에서 리다이렉트되어 돌아온 '착륙 페이지'>
import { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { useAuth } from '../context/AuthContext';



const GoogleLoginRedirectPage = () => {
  // 로컬스토리지에 토큰 저장하는 훅 꺼내기
  const {setItem:setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {setItem:setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // AuthContext에서 setTokens 함수 가져오기
  const {setTokens} = useAuth();

  // 렌더링 뒤에서 일어나므로 useEffect 사용
  useEffect(() => {
    // window.location.search: URL의 쿼리스트링 부분(?뒤 커리스트링 부분)
    const urlParams = new URLSearchParams(window.location.search);
    // urlParams.get("키이름") → URL의 쿼리 파라미터 중 "키이름=값"의 값을 가져오는 내장 메서드
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    
    // 토큰이 존재하면 로컬스토리지에 저장하고, /my(마이페이지)로 리다이렉트
    try{
      if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      setTokens(accessToken, refreshToken);

      alert("로그인 성공");
      window.location.href = '/my'
    }
  }
    catch (error) {
      console.error("구글 로그인 리다이렉트 처리 중 오류 발생", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      window.location.href = '/login';
    }
  }, [setAccessToken, setRefreshToken]);

  return (
    <div>
      구글 로그인 중...
    </div>
  )
}

export default GoogleLoginRedirectPage
