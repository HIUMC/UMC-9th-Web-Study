import React from "react";
import { useLocalStorage } from "../useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";

export default function useLogin() {
  const { setItem: setAcessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  return useMutation({
    mutationFn: postSignin,
    onSuccess: (res) => {
      const { accessToken, refreshToken } = res.data;
      setAcessToken(accessToken);
      setRefreshToken(refreshToken);
      alert("로그인 성공");
      window.history.back();
    },
    onError: (error: any) => {
      console.error("로그인 실패: ", error);
      alert("로그인에 실패했습니다");
    },
  });
}
