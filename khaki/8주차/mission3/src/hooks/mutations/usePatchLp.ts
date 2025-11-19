import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { patchLp } from "../../apis/lp";

function usePatchLp() {
  return useMutation({
    mutationFn: patchLp,

    // data: 서버에서 반환된 응답 데이터
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onSuccess: (data) => {
      console.log(data, "Lp 수정 성공");
      const updatedId = (data as any)?.data?.id;
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, updatedId] });

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },

    // error: 발생한 에러 객체
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onError: (error) => {
      console.log("댓글 추가 실패:", error);
    },
  });
}

export default usePatchLp;
