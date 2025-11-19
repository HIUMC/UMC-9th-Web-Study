import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { deleteComment } from "../../apis/comment";

export const useDeleteComment = (lpId: number) => {
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(lpId, commentId),

    onSuccess: async () => {
      console.log("댓글 삭제 성공!");
      await queryClient.invalidateQueries({
        queryKey: ["comments", lpId],
        exact: false,
      });
      await queryClient.refetchQueries({
        queryKey: ["comments", lpId],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("댓글 삭제 실패!!");
    },
  });
};
