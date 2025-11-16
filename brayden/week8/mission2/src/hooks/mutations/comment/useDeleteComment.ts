import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../../apis/comment";
import { QUERY_KEY } from "../../../constants/key";
import { queryClient } from "../../../App";

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
