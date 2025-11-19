import type { RequestSigninDto } from "../types/auth";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin, postLogout } from "../apis/auth";

// 로그인을 했을 때 특정 사이트에서는 accessToken과 refreshToken을 항상 가지고 있어야 함.
// 따라서 특정 사이트들을 묶어서 하나의 Context로 관리하면 편리하게 다룰 수 있음.

// AuthContext 타입 정의
// accessToken, refreshToken, login, logout 정의
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

// AuthContext 생성
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

// AuthContext에 데이터를 제공하는 AuthProvider 정의
export const AuthProvider = ({ children }: PropsWithChildren) => {
  // AccessToken 관련 함수(getItem, setItem, removeItem) 정의
  const {
    getItem: getAccessTokenInStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  // RefreshToken 관련 함수(getItem, setItem, removeItem) 정의
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // accessToken, refreshToken 상태 관리
  // localStorage에 저장된 값을 초기 값으로 설정
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenInStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  // login 함수 정의
  const login = async (signinData: RequestSigninDto) => {
    try {
      // postSignin으로 데이터 받아오기
      const { data } = await postSignin(signinData);

      // 이때 data가 존재한다면
      if (data) {
        // data의 accessToken, refreshToken을 각각 newAccessToken, newRefreshToken 변수에 할당
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        // localStorage에 토큰 설정
        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        // 상태변수 accessToken, refreshToken을 새로운 토큰으로 설정
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        alert("로그인 성공");
        window.location.href = "/my"; // 마이 페이지로 이동
      }
    } catch (error) {
      // 에러 발생 시 에러 전달
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  // logout 함수 정의 -> logout이므로 저장할 필요 없이 기존에 있는 토큰들 제거만 해주면 됨.
  const logout = async () => {
    console.log("로그아웃 실행됨");
    try {
      await postLogout(); // logout API 호출
      // localStorage에 있는 refreshToken, accessToken 제거
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      // 상태변수의 refreshToken, accessToken null로 설정
      setAccessToken(null);
      setRefreshToken(null);

      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    // AuthContext.Provider로 감싸서 하위 컴포넌트들이 context에 접근할 수 있도록 하고 props로 넘겨줘서 사용할 수 있도록 함.
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 쉽게 사용하기 위한 커스텀 훅 useAuth 정의
export const useAuth = () => {
  // useContext로 AuthContext에 접근
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
};
