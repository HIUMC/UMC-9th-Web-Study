import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLp, uploadImage } from '../../apis/lp';
import { QUERY_KEY } from '../../constants/key';

export const useUpdateLpMutation = (lpId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string; content: string; thumbnail?: string; tags: string[]; imageFile?: File | null }) => {
      let thumbnailUrl = data.thumbnail;

      if (data.imageFile) {
        const uploadResult = await uploadImage(data.imageFile);
        thumbnailUrl = uploadResult.imageUrl;
      }

      return updateLp(lpId, {
        title: data.title,
        content: data.content,
        thumbnail: thumbnailUrl,
        tags: data.tags,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, lpId]
      });
      alert('LP가 수정되었습니다.');
    },
    onError: (error: any) => {
      console.error('LP 수정 실패:', error);
      alert(`LP 수정에 실패했습니다.\n${error?.response?.data?.message || "알 수 없는 오류"}`);
    },
  });
};
