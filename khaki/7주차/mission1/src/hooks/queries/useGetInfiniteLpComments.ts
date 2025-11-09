import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpComments } from "../../apis/lp";
import type { PaginationDto } from "../../types/common";

function useGetInfiniteLpComments(lpId: number, limit: number, order: PaginationDto["order"]) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lpComments, lpId, order],

    queryFn: ({ pageParam }) => {
      return getLpComments({ lpId, cursor: pageParam, limit, order });
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },

    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 보관
    retry: 2, // 실패 시 2번 재시도
    enabled: Boolean(lpId), // lpId가 있을 때만 실행
  });
}

export default useGetInfiniteLpComments;
