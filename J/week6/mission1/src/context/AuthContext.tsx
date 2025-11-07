import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo, postLogout, postSignin } from "../apis/auth";


interface AuthContextType {
    accessToken: String | null;
    refreshToken: string | null;
    login: (signInData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
    userName: string | null;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
    userName: null,
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
    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage(),
    );
    const [refreshToken, setRefreshToken] = useState<string | null> (
        getRefreshTokenFromStorage(),
    );
    const [ userName, setUserName] = useState<string | null>(
        getUserNameFromStorage(),
    );

    const login = async(signinData: RequestSigninDto) => {
        try {
            const {data} = await postSignin(signinData);

            if(data) {
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                const myInfo = await getMyInfo();
                console.log("내 정보 응답:", myInfo.data);
                setUserName(myInfo.data.name);
                setUserNameInStorage(data.name);

                alert("로그인 성공");
                window.location.href = "/my";
            }
        } catch (error) {
            console.error("로그인 오류", error);
            alert("로그인 실패");
        }
    }

    const logout = async() => {
        try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();
            removeUserNameFromStorage();

            setAccessToken(null);
            setRefreshToken(null);
            setUserNameInStorage(null);

            alert("로그아웃 성공");
        } catch (error) {
            console.log("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
    };

    

    return (
        <AuthContext.Provider value = {{accessToken, refreshToken, login, logout, userName}}>
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