import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../apis/lp";

export const useEditComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lpId,
      commentId,
      content,
    }: {
      lpId: number;
      commentId: number;
      content: string;
    }) => updateComment({ lpId, commentId, content}),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", variables.lpId],
      });
    },
  });
};
