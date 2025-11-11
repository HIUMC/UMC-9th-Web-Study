import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const GoogleLoginRedirectPage = () => {
    const {setItem: setAccessToken} = useLocalStorage(
        LOCAL_STORAGE_KEY.accessToken,
    );
    const {setItem: setRefreshToken} = useLocalStorage(
        LOCAL_STORAGE_KEY.refreshToken,
    );
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);
        const from = urlParams.get('from') || '/';

        if (accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken || "");
            
            // localStorage 업데이트 후 React Router로 이동
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 50);
        }
    }, [setAccessToken, setRefreshToken, navigate]);

    return (
        <div>구글 로그인 리다이렉 화면</div>
    );
};

export default GoogleLoginRedirectPage;