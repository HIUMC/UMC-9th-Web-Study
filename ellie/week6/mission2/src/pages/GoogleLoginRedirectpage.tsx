import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useLocation, useNavigate } from "react-router-dom";

export const GoogleLoginRedirectpage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      // 1. localStorage에 저장
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // 2. Context에 반영될 수 있도록 storage 이벤트 발생
      window.dispatchEvent(new Event("storage"));

      // 3. 약간의 지연 후 이동 (Context 업데이트 시간 확보)
      setTimeout(() => {
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");

        navigate(redirectPath, { replace: true });
      }, 400); // AuthContext의 상태가 업데이트될 시간을 줌
    }
    console.log(window.location.search, urlParams);
  }, [setAccessToken, setRefreshToken]);
  return <div></div>;
};
