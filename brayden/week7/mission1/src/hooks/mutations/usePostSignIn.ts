// hooks/mutations/usePostSignIn.ts
import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostSignIn() {
  return useMutation({
    mutationFn: postSignin,
    onSuccess: (data) => {
      // 토큰 저장
      const token = data?.data?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
      }

      // 내 정보 캐시 갱신
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default usePostSignIn;
