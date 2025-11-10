import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { deleteLp } from "../../apis/lp";

function useDeleteLp() {
  return useMutation({
    mutationFn: deleteLp,

    // data: 서버에서 반환된 응답 데이터
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onSuccess: (data, variables) => {
      console.log(data, "Lp 삭제 성공");
      // If mutate was called with the lpId (number), invalidate that single LP cache
      if (typeof variables === "number") {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, variables] });
      }
      // Also invalidate LP list so the deleted item is removed from lists
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },

    // error: 발생한 에러 객체
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onError: (error) => {
      console.log("Lp 삭제 실패:", error);
    },
  });
}

export default useDeleteLp;
