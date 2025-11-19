import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const usePostLike = (lpid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postLike(lpid),

    onMutate: async (isLiked: boolean) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lp, lpid] });

      const previousData = queryClient.getQueryData([QUERY_KEY.lp, lpid]);

      queryClient.setQueryData([QUERY_KEY.lp, lpid], (old: any) => {
        if (!old) return old;

        const newLiked = !isLiked;
        const newCount =
          (old.likeCount ?? 0) + (newLiked ? 1 : -1);

        return {
          ...old,
          liked: newLiked,
          likeCount: Math.max(newCount, 0),
        };
      });

      return { previousData };
    },

    // 실패 시 rollback
    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEY.lp, lpid], context.previousData);
      }
    },

    // 성공/실패 여부 상관없이 invalidate
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, lpid] });
    }

})};
