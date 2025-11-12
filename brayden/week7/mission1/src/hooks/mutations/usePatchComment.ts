import { useMutation } from "@tanstack/react-query";
import { patchComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePatchComment() {
  return useMutation({
    mutationFn: patchComment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments],
      });
    },
  });
}

export default usePatchComment;
