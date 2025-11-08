/**
 * ========================================
 * 인증 관리 Context (Authentication Context)
 * ========================================
 *
 * 애플리케이션 전역에서 사용자 인증 상태를 관리하는 Context입니다.
 * React Context API를 사용하여 어디서든 로그인/로그아웃 기능을 사용할 수 있습니다.
 *
 * 주요 기능:
 * 1. 로그인 상태 관리 (accessToken, refreshToken)
 * 2. 로그인 함수 제공
 * 3. 로그아웃 함수 제공
 * 4. localStorage와 자동 동기화
 */

import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { RequestSigninDto } from "../types/auth";
import { postLogout, postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

/**
 * AuthContext가 제공하는 값들의 타입 정의
 */
interface AuthContextType {
  accessToken: string | null; // 현재 로그인된 사용자의 액세스 토큰
  refreshToken: string | null; // 현재 로그인된 사용자의 리프레시 토큰
  login: (signinDto: RequestSigninDto) => Promise<void>; // 로그인 함수
  logout: () => void; // 로그아웃 함수
}

/**
 * AuthContext 생성
 * 기본값으로 null과 빈 함수를 제공
 */
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: () => {},
});

/**
 * AuthProvider 컴포넌트
 * 애플리케이션 최상위에서 감싸서 모든 하위 컴포넌트가 인증 상태에 접근할 수 있게 함
 *
 * @param children - 하위 컴포넌트들
 *
 * 사용 예시:
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export const AuthProvider = ({ children }: PropsWithChildren) => {
  // localStorage에서 accessToken 관련 함수들 가져오기
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  // localStorage에서 refreshToken 관련 함수들 가져오기
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // accessToken 상태 (초기값은 localStorage에서 가져옴)
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );

  // refreshToken 상태 (초기값은 localStorage에서 가져옴)
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  /**
   * 로그인 함수
   * 서버에 로그인 요청을 보내고, 받은 토큰들을 상태와 localStorage에 저장
   *
   * @param signinData - 로그인 정보 (이메일, 비밀번호)
   */
  const login = async (signinData: RequestSigninDto) => {
    const { data } = await postSignin(signinData);
    try {
      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        // 메모리 상태 업데이트
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        // localStorage에 저장 (새로고침 시에도 로그인 상태 유지)
        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        alert("로그인에 성공했습니다!");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  /**
   * 로그아웃 함수
   * 서버에 로그아웃 요청을 보내고, 토큰들을 상태와 localStorage에서 제거
   */
  const logout = async () => {
    try {
      // 서버에 로그아웃 요청
      await postLogout();

      // localStorage에서 토큰 삭제
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      // 메모리 상태 초기화
      setAccessToken(null);
      setRefreshToken(null);

      alert("로그아웃에 성공했습니다!");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // Provider를 통해 하위 컴포넌트들에게 인증 상태와 함수들 제공
  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth 커스텀 훅
 * 컴포넌트에서 AuthContext를 쉽게 사용할 수 있게 해주는 헬퍼 함수
 *
 * @returns AuthContext의 값 (accessToken, refreshToken, login, logout)
 * @throws AuthProvider 밖에서 사용하면 에러 발생
 *
 * 사용 예시:
 * ```tsx
 * function MyComponent() {
 *   const { accessToken, login, logout } = useAuth();
 *
 *   if (accessToken) {
 *     return <button onClick={logout}>로그아웃</button>;
 *   }
 *   return <button onClick={() => login({ email, password })}>로그인</button>;
 * }
 * ```
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다");
  }
  return context;
};
