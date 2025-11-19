import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { postLp } from "../../apis/lp";

function usePostLp() {
  return useMutation({
    mutationFn: postLp,

    onSuccess: (data) => {
      console.log("✅ LP 생성 성공:", data);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },

    onError: (error) => {
      console.error("❌ LP 생성 실패:", error);
      alert("LP 생성 중 오류가 발생했습니다!");
    },
  });
}

export default usePostLp;
