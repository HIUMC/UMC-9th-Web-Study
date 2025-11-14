import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { deleteComments } from "../../apis/comments";

function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComments,

    // data: 서버에서 반환된 응답 데이터
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onSuccess: (data, variables) => {
      console.log(data, "댓글 삭제 성공");
      // invalidate comments for the specific LP
      if (variables?.lpId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments, variables.lpId] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments] });
      }
    },

    // error: 발생한 에러 객체
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onError: (error) => {
      console.log("댓글 삭제 실패:", error);
    },
  });
}

export default useDeleteComment;
