import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLpComment } from '../../apis/lp';
import { QUERY_KEY } from '../../constants/key';
import { PAGINATION_ORDER } from '../../enums/common';

export const useUpdateLpCommentMutation = (lpId: string, commentOrder: PAGINATION_ORDER) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateLpComment(lpId, commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpId, commentOrder]
      });
    },
    onError: (error: any) => {
      console.error('댓글 수정 실패:', error);
      alert(`댓글 수정에 실패했습니다.\n${error?.response?.data?.message || "알 수 없는 오류"}`);
    },
  });
};
