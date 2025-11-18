import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLpComment } from '../../apis/lp';
import { QUERY_KEY } from '../../constants/key';
import { PAGINATION_ORDER } from '../../enums/common';

export const useDeleteLpCommentMutation = (lpId: string, commentOrder: PAGINATION_ORDER) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteLpComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpId, commentOrder]
      });
    },
    onError: (error: any) => {
      console.error('댓글 삭제 실패:', error);
      alert(`댓글 삭제에 실패했습니다.\n${error?.response?.data?.message || "알 수 없는 오류"}`);
    },
  });
};
