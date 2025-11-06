import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";

type UseGetLpCommentsParams = {
  lpId: string;
  order?: PAGINATION_ORDER;
  limit?: number;
  enabled?: boolean;
};

function useGetLpComments({
  lpId,
  order,
  limit = 10,
  enabled = true,
}: UseGetLpCommentsParams) {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: async ({ pageParam }: { pageParam: number | undefined }) => {
      const params: {
        cursor?: number;
        order?: typeof order;
        limit: number;
      } = {
        limit,
        ...(order && { order }),
        ...(pageParam && { cursor: pageParam }),
      };
      const response = await getLpComments(lpId, params);
      return response;
    },
    staleTime: 0, // 항상 새로운 데이터 가져오기
    gcTime: 0, // 캐시 즉시 삭제
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    initialPageParam: undefined as number | undefined,
    enabled: !!lpId && enabled, // lpId가 있고 enabled가 true일 때만 쿼리 실행
  });
}

export default useGetLpComments;
