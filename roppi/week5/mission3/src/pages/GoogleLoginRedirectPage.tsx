import { useEffect } from "react"
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const GoogleLoginRedirectpage = () => {
  const {setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {setItem:setRefresthToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken=urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken=urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if(accessToken){
      setAccessToken(accessToken);
      setRefresthToken(refreshToken);
      window.location.href="/my";
    }
    console.log(window.location.search,urlParams);

  },[setAccessToken,setRefresthToken]);
  return (
    <div>

    </div>
  )
}