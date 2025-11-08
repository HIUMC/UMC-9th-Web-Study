import React from "react";
import { useLocalStorage } from "../useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/auth";

export default function useDeleteUser() {
  const { removeItem: removeAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { removeItem: removeRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      removeAccessToken();
      removeRefreshToken();

      window.location.href = "/login";
    },
    onError: (error: any) => {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴중 오류가 발생했습니다.");
    },
  });
}
