import { useMutation } from "@tanstack/react-query";
import { postLpComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";

function usePostLpComment(lpId: number) {
  return useMutation({
    mutationFn: (content: string) => postLpComment({lpId}, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments],
      })
    }
  })
}

export default usePostLpComment