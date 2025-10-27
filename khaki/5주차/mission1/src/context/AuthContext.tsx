// <AuthContext: 인증 관련 전역상태 관리 컨텍스트>
import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin } from "../apis/auth";

// 1. AuthContext에서 다룰 데이터 타입 정의
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login:(signInData:RequestSigninDto)=> Promise<void>;
  logout:() => Promise<void>;
}

// 2. AuthContext 생성
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async()=>{},
  logout: async()=>{},
});

// 3. Context를 실제로 감싸서 전역상태를 공급하는 Provider 컴포넌트 정의(상태+함수+value 포함)
export const AuthProvider = ({children}:PropsWithChildren) => {
  const{
    getItem:getAccessTokenFromStorage,
    setItem:setAccessTokenInStorage,
    removeItem:removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const{
    getItem:getRefreshTokenFromStorage,
    setItem:setRefreshTokenInStorage,
    removeItem:removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // accessToken, refreshToken 상태
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage(),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage(),
  );

  // 로그인 함수: 로그인 요청 + 토큰 저장 + 상태업데이트 + 페이지 이동
  const login = async (signInData:RequestSigninDto) => {
    try
    {
      // 로그인 요청
      const {data} = await postSignin(signInData);
      
      if(data){
        // 토큰 꺼내기
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        // 로컬스토리지에 토큰 저장
        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);
        
        // 상태 업데이트
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        alert("로그인 성공");

        // 로그인 후 내정보 페이지로 이동
        window.location.replace("/my"); 
      }
    }
    catch (error) 
    {
      console.error("로그인 오류",error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    };
  };

  // 로그아웃 함수: 토큰 삭제 + 상태 초기화 + 페이지 이동
  const logout = async () => {
    try{
      // 로컬스토리지에서 토큰 삭제
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      // 상태 초기화
      setAccessToken(null);
      setRefreshToken(null);

      // 로그아웃 후 메인 페이지로 이동
      alert("로그아웃 되었습니다.");
      window.location.replace("/");
    }
    catch (error) {
      console.error("로그아웃 오류",error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AuthContext.Provider value={{accessToken, refreshToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. AuthContext를 쉽게 사용하기 위한 커스텀 훅 정의
export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context)
    throw new Error("useAuth는 AuthProvider 내부에서만 사용 가능합니다.");

  return context;
}



