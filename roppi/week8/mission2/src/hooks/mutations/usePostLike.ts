import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/lp";


const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpId, content }: { lpId: number; content: string }) =>
      postComment(lpId, content),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", variables.lpId],
      });
    },
  });
};
export default usePostComment;