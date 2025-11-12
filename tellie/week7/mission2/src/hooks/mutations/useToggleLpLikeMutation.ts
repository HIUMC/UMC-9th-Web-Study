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
    // 낙관적 업데이트: 서버 응답 전에 즉시 UI 업데이트
    onMutate: async () => {
      // 진행 중인 쿼리 취소 (낙관적 업데이트를 덮어쓰지 않도록)
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lpId] });

      // 이전 데이터 백업 (에러 시 롤백용)
      const previousLp = queryClient.getQueryData<Lp>([QUERY_KEY.lps, lpId]);

      // 현재 좋아요 상태 확인
      const isLiked = userId ? previousLp?.likes?.some(like => like.userId === userId) : false;

      // 낙관적으로 좋아요 상태 업데이트
      queryClient.setQueryData<Lp>([QUERY_KEY.lps, lpId], (old) => {
        if (!old || !userId) return old;

        if (isLiked) {
          // likes 배열에서 현재 유저의 좋아요 제거(취소)
          return {
            ...old,
            likes: old.likes.filter(like => like.userId !== userId),
          };
        } else {
          // likes 배열에 새 좋아요 추가
          const newLike = {
            id: Date.now(), // 실제 ID 받아올 떄까지의 임시 ID
            userId: userId,
            lpId: parseInt(lpId),
          };
          return {
            ...old,
            likes: [...old.likes, newLike],
          };
        }
      });

      // 롤백을 위해 이전 데이터 반환
      return { previousLp };
    },
    // 성공 시 서버에서 최신 데이터 가져오기
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, lpId]
      });
    },
    // 에러 시 롤백하기
    onError: (error: any, _variables, context) => {
      if (context?.previousLp) {
        queryClient.setQueryData([QUERY_KEY.lps, lpId], context.previousLp);
      }
      console.error('좋아요 토글 실패:', error);
      alert(`좋아요 처리에 실패했습니다.\n${error?.response?.data?.message || "알 수 없는 오류"}`);
    },
  });
};
