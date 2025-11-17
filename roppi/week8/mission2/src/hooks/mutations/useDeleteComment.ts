// src/hooks/mutations/useDeleteComment.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../apis/lp";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lpId,
      commentId,
    }: {
      lpId: number;
      commentId: number;
    }) => deleteComment({ lpId, commentId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", variables.lpId],
      });
    },
  });
};
