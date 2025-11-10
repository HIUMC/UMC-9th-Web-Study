import { useLocalStorage } from "../useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";

export default function useLogout() {
  const { removeItem: removeAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { removeItem: removeRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      console.log("로그아웃 성공");
      removeAccessToken();
      removeRefreshToken();
      alert("로그아웃되었습니다");
      window.location.href = "/login";
    },
    onError: (error: any) => {
      console.error("로그아웃 실패: ", error);
    },
  });
}
