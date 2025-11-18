import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { postComment } from "../../apis/lp";

function usePostComment(lpId: number, order: "asc" | "desc") {
  return useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ // 댓글 작성 후, 해당 LP의 댓글 목록 무효화
        queryKey: [QUERY_KEY.lpComments, lpId, order],
        //exact: true,
      });
      console.log("댓글 등록 성공", data);
    },
    onError: (error) => {
      console.error("댓글 등록 실패:", error);
    },
  });
}

export default usePostComment;