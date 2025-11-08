import type { RequestSigninDto } from "../types/auth";
import { createContext, type PropsWithChildren, useContext, useState, useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postSignin, postLogout } from "../apis/auth";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signinData: RequestSigninDto, onSuccess?: () => void) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
    isAuthenticated: false,
});

export const AuthProvider = ({children}: PropsWithChildren) => {
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
    
    const [accessToken, setAccessToken] = useState<string|null> (
        getAccessTokenFromStorage(),
    );

    const [refreshToken, setRefreshToken] = useState<string|null> (
        getRefreshTokenFromStorage(),
    );

    // localStorage 변경을 감지하여 상태 업데이트
    useEffect(() => {
        const handleStorageChange = () => {
            const newAccessToken = getAccessTokenFromStorage();
            const newRefreshToken = getRefreshTokenFromStorage();
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
        };

        // storage 이벤트 리스너 등록 (다른 탭에서 변경된 경우)
        window.addEventListener('storage', handleStorageChange);

        // 현재 탭에서 localStorage 변경을 감지하기 위해 주기적으로 확인
        const interval = setInterval(handleStorageChange, 100);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [getAccessTokenFromStorage, getRefreshTokenFromStorage]);

    const login = async (signinData: RequestSigninDto, onSuccess?: () => void) => {
        try {
            const {data} = await postSignin(signinData);

            if(data) {
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                
                alert("로그인 성공");
                
                if (onSuccess) {
                    onSuccess();
                }
            }
        } catch (error) {
            console.error ("로그인 오류", error);
            alert("로그인 실패");
        }
    };

    const logout = async() => {
        try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);
            alert("로그아웃 성공");
            window.location.href = '/'; // 로그아웃 후 홈으로 이동
        } catch (error) {
            console.error("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
    };

    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider value={{
            accessToken,
            refreshToken,
            login,
            logout,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error ("AuthContext를 찾을 수 없습니다.");
    }
    return context;
}
