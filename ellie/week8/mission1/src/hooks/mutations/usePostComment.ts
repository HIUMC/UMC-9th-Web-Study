import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { queryClient } from "../../App";
import type { RequestPostCommentDto } from "../../types/comment";

export const usePostComments = (lpId: number) => {
  return useMutation({
    mutationFn: (body: RequestPostCommentDto) => postComment(body, { lpId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", lpId],
        exact: false,
      });
    },
  });
};
