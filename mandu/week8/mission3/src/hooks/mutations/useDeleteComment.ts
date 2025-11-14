import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import { deleteComment } from "../../apis/comment";

function useDeleteComment(lpid: string | number) {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, lpid],
      });
      console.log("댓글 삭제 성공");
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    },
  });
}

export default useDeleteComment;
