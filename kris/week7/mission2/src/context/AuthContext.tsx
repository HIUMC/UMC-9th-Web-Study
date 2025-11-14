import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";
import { useMutation } from "@tanstack/react-query";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({children}: PropsWithChildren) => {
  const { getItem: getAccessTokenFromStorage, setItem: setAccessTokenInStorage, removeItem: removeAccessTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { getItem: getRefreshTokenFromStorage, setItem: setRefreshTokenInStorage, removeItem: removeRefreshTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string|null>(
    getAccessTokenFromStorage(),
  )

  const [refreshToken, setRefreshToken] = useState<string|null>(
    getRefreshTokenFromStorage()
  )

  const loginMutation = useMutation({
    mutationFn: postSignin,
    onSuccess: (data) => {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data;

      setAccessTokenInStorage(newAccessToken);
      setRefreshTokenInStorage(newRefreshToken);

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      
      alert("로그인 성공")
    },
    onError: (error) => {
      console.error("로그인 에러", error)
      alert("로그인 실패")
    }
  })

  const login = async (signinData: RequestSigninDto) => {
    await loginMutation.mutateAsync(signinData);
  };

  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      removeAccessTokenFromStorage()
      removeRefreshTokenFromStorage()
      setAccessToken(null)
      setRefreshToken(null)
      alert('로그아웃 성공')
    },
    onError: (error) => {
      console.log('로그아웃 에러', error)
      alert('로그아웃 실패')
    }
  })

  const logout = async () => {
    await logoutMutation.mutateAsync();
  }

  return (
    <AuthContext.Provider value={{accessToken, refreshToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error("AuthContext 찾을 수 없음")
  }
  return context;
}