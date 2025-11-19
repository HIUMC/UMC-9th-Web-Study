import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

/**
 * useLogout
 * - 서버 로그아웃 API(postLogout)를 호출하고
 * - 성공 시 AuthContext의 logout()을 호출하여 로컬 토큰/상태를 정리
 */
export default function useLogout() {
  const auth = useAuth();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: async () => {
      await auth.logout();
      console.log("서버 로그아웃 및 로컬 상태 정리 성공");
    },
    onError: (error) => {
      console.error("서버 로그아웃 실패", error);
    },
  });
}
