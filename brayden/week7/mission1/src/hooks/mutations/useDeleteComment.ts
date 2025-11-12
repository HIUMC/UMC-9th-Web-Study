import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments],
      });
    },
  });
}
export default useDeleteComment;
