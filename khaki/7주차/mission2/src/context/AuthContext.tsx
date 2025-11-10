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
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setTokensInStorage: (accessToken: string, refreshToken: string) => void;
}

// 2. AuthContext 생성
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
  setTokens: () => {},
  setTokensInStorage: () => {},
});

// 3. Context를 실제로 감싸서 전역상태를 공급하는 Provider 컴포넌트 정의(상태+함수+value 포함)
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const setTokensInStorage = (accessToken: string, refreshToken: string) => {
    setAccessTokenInStorage(accessToken);
    setRefreshTokenInStorage(refreshToken);
  };

  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());

  const setTokens = (newAccessToken: string, newRefreshToken: string) => {
    // 상태에 토큰 저장
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    // 로컬 스토리지에도 저장하여 axios 인터셉터 등에서 사용할 수 있게 함
    setAccessTokenInStorage(newAccessToken);
    setRefreshTokenInStorage(newRefreshToken);
  };

  const login = async (signInData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signInData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        alert("로그인 성공");
        // window.location.replace("/my"); 제거
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const logout = async () => {
    try {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);

      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, setTokens, setTokensInStorage, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth는 AuthProvider 내부에서만 사용 가능합니다.");

  return context;
};
