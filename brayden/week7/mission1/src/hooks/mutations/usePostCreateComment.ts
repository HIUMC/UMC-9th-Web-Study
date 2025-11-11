import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostCreateComment() {
  return useMutation({
    mutationFn: postComment,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, data.data.lpId],
        exact: false,
      });
    },
  });
}

export default usePostCreateComment;
