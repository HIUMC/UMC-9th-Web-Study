import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { postComment } from "../../apis/comment";

function usePostComment(lpid: string | number) {
  return useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, lpid],
        //exact: true,
      });
      console.log("댓글 등록 성공", data);
    },
    onError: (error) => {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록에 실패했습니다.");
    },
  });
}

export default usePostComment;
