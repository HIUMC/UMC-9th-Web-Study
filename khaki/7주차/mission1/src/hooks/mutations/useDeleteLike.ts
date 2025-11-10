import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/like";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lp, data?.data.lpId],
      });
    },
  });
}

export default useDeleteLike;
