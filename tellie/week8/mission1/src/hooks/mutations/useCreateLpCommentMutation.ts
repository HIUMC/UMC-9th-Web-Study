import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLpComment } from '../../apis/lp';
import { QUERY_KEY } from '../../constants/key';
import { PAGINATION_ORDER } from '../../enums/common';

export const useCreateLpCommentMutation = (lpId: string, commentOrder: PAGINATION_ORDER) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createLpComment(lpId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpId, commentOrder]
      });
    },
    onError: (error) => {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    },
  });
};
