import { useMutation } from "@tanstack/react-query";
import { patchComment } from "../../apis/comment";
import { queryClient } from "../../App";

export const usePatchComment = (lpId: number) => {
  return useMutation({
    mutationFn: (variables: { commentId: number; content: string }) =>
      patchComment({ lpId, ...variables }),

    onSuccess: (_, variables) => {
      console.log("댓글 수정 성공:", variables.commentId);

      queryClient.invalidateQueries({
        queryKey: ["comments"],
        exact: false,
      });
    },

    onError: (error) => {
      console.error(" 댓글 수정 실패:", error);
    },
  });
};
