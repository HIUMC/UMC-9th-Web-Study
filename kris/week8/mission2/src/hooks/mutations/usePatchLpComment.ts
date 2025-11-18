import { useMutation } from "@tanstack/react-query";
import { patchLpComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePatchLpComment(lpId: number, commentId: number) {
  return useMutation({
    mutationFn: (content: string) => patchLpComment({ lpId, commentId }, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments],
        refetchType: 'active',
      });
    }
  })
}

export default usePatchLpComment;