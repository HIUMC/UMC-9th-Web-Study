import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLpLike, removeLpLike } from '../../apis/lp';
import { QUERY_KEY } from '../../constants/key';
import type { Lp } from '../../types/lp';

export const useToggleLpLikeMutation = (lpId: string, lp: Lp | undefined, userId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const isLiked = userId ? lp?.likes?.some(like => like.userId === userId) : false;

      if (isLiked) {
        await removeLpLike(lpId);
      } else {
        await addLpLike(lpId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, lpId]
      });
    },
    onError: (error: any) => {
      console.error('좋아요 토글 실패:', error);
      alert(`좋아요 처리에 실패했습니다.\n${error?.response?.data?.message || "알 수 없는 오류"}`);
    },
  });
};
