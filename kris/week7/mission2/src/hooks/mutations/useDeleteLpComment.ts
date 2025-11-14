import { useMutation } from "@tanstack/react-query";
import { deleteLpComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLpComment(lpId: number, commentId: number) {
  return useMutation({
    mutationFn: () => deleteLpComment({ lpId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpcomments],
        refetchType: 'active',
      });
    }
  })
}

export default useDeleteLpComment;