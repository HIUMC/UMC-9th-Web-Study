import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { postSignin } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

function usePostSignin() {
  const { setTokens } = useAuth();

  return useMutation({
    mutationFn: postSignin,
    // data: 서버에서 반환된 응답 데이터
    // variables: mutate 함수에 전달된 변수
    // context: onMutate에서 반환된 값
    onSuccess: (data) => {
      console.log("로그인 성공:", data);
      alert("로그인 성공");

      const newAccessToken = data.data.accessToken;
      const newRefreshToken = data.data.refreshToken;

      // 전역 상태와 로컬스토리지 업데이트는 AuthContext의 setTokens에 위임
      setTokens(newAccessToken, newRefreshToken);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },

    // error: 발생한 에러 객체
    onError: (error: unknown) => {
      console.log("로그인 실패:", error);
      alert("로그인 실패. 다시 시도해주세요.");
    },
  });
}

export default usePostSignin;
