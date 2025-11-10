import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { patchComments } from "../../apis/comments";

function usePatchComment() {
  return useMutation({
    mutationFn: patchComments,

    // data: 서버에서 반환된 응답 데이터
    // variables: mutate 함수에 전달된 변수({ lpId, commentId, content })
    onSuccess: (data) => {
      console.log(data, "댓글 수정 성공");
      // Invalidate all lpComments queries so any active comment list (with different order params)
      // will be refetched and show the updated comment.
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments] });
    },

    onError: (error) => {
      console.log("댓글 수정 실패:", error);
    },
  });
}

export default usePatchComment;
