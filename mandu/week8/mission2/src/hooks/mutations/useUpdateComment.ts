import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { updateComment } from "../../apis/comment";
import { queryClient } from "../../App";

function useUpdateComment(lpid: string | number) {
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      // 댓글 목록 쿼리를 무효화하여 새로고침
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, lpid],
      });
      console.log("댓글 수정 성공");
    },
    onError: (error) => {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    },
  });
}

export default useUpdateComment;
