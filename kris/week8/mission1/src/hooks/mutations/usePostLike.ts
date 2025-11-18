import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, LpDetails } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      })
    },
    // 요청 직전에 실행(optimistic update)
    onMutate: async (lp) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });
    
      const previousLp = queryClient.getQueryData<LpDetails>([QUERY_KEY.lps, lp.lpId]);
    
      const newLp = {...previousLp} as LpDetails;
    
      const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const userId = Number(me?.data.id);
    
      const likedIndex = previousLp?.data.likes.findIndex(like => like.userId === userId) ?? -1;
    
      if(likedIndex >= 0) {
        previousLp?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = {userId, lpId: lp.lpId} as Likes;
        previousLp?.data.likes.push(newLike);
      }
    
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLp);
    
      return {previousLp, newLp}
    
    },
    // error: 요청 실패시 발생한 에러
    // variables: mutate에 전달한 값
    // context: onMutate에서 반환한 값
    onError: (error, newLp, context) => {
      console.log(error, newLp)
      queryClient.setQueryData([QUERY_KEY.lps, newLp.lpId], context?.previousLp?.data.id);
    },
    // 요청이 끝난 후 항상 실행됨
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  })
}

export default usePostLike;