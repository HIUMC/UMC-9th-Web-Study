import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo } from "../apis/auth";
import { usePostSignin } from "../hooks/mutations/usePostSignin";
import { usePostLogout } from "../hooks/mutations/usePostLogout";

interface AuthContextType {
    accessToken: String | null;
    refreshToken: string | null;
    login: (signInData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
    userName: string | null;
    userId: number | null;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
    userName: null,
    userId: null,
});

export const AuthProvider = ({children}: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
    const {
        getItem: getUserNameFromStorage,
        setItem: setUserNameInStorage,
        removeItem: removeUserNameFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.userName);
    const {
        getItem: getUserIdFromStorage,
        setItem: setUserIdInStorage,
        removeItem: removeUserIdFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.userId);
    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage(),
    );
    const [refreshToken, setRefreshToken] = useState<string | null> (
        getRefreshTokenFromStorage(),
    );
    const [ userName, setUserName] = useState<string | null>(
        getUserNameFromStorage(),
    );
    const [userId, setUserId] = useState<number | null>(
        getUserIdFromStorage(),
    );
    const { mutateAsync: signinMutateAsync } = usePostSignin();
    const { mutateAsync: logoutMutateAsync } = usePostLogout();

    const login = async(signinData: RequestSigninDto) => {
        try {
            const data = await signinMutateAsync(signinData);

            if(data) {
                const newAccessToken = data.data.accessToken
                const newRefreshToken = data.data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                const myInfo = await getMyInfo();
                setUserName(myInfo.data.name);
                setUserNameInStorage(data.data.name);
                setUserId(myInfo.data.id);
                setUserIdInStorage(data.data.id);

                alert("로그인 성공");
            }
        } catch (error) {
            console.error("로그인 오류", error);
            alert("로그인 실패");
        }
    }

    const logout = async() => {
        try {
            await logoutMutateAsync();
            
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();
            removeUserNameFromStorage();
            removeUserIdFromStorage();

            setAccessToken(null);
            setRefreshToken(null);
            setUserNameInStorage(null);
            setUserId(null);

            alert("로그아웃 성공");
        } catch (error) {
            console.log("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
    };

    

    return (
        <AuthContext.Provider value = {{accessToken, refreshToken, login, logout, userName, userId}}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }

    return context
}