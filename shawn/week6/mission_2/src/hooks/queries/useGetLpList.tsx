import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";

type UseGetLpListParams = {
  search?: string;
  order?: PAGINATION_ORDER;
  limit?: number;
};

function useGetLpList({ search, order, limit = 20 }: UseGetLpListParams) {
  return useInfiniteQuery({
    queryKey: ["lps", order, search],
    queryFn: async ({ pageParam }: { pageParam: number | undefined }) => {
      // 첫 페이지(pageParam이 undefined)일 때는 cursor를 전달하지 않음
      const params: {
        cursor?: number;
        search?: string;
        order?: typeof order;
        limit: number;
      } = {
        limit,
        ...(search && { search }),
        ...(order && { order }),
        ...(pageParam && { cursor: pageParam }),
      };
      const response = await getLpList(params);
      return response;
    },
    //데이터가 신선하다고 간주하는 시간
    //정렬/검색 변경 시 즉시 새 데이터를 가져오도록 staleTime을 0으로 설정
    staleTime: 0,
    gcTime: 1000 * 60 * 10,
    //사용되지 않는 (비활성 상태)인 쿼리 데이터가 캐시에 남아있는 시간,
    //10분 동안 캐시된 데이터를 유지한다.
    //10분 동안 사용하지 않으면 캐시 데이터가 삭제
    getNextPageParam: (lastPage) => {
      // hasNext가 true이면 nextCursor 반환, 아니면 undefined 반환
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    initialPageParam: undefined as number | undefined, // 첫 페이지는 cursor 없이 호출
  });
}

export default useGetLpList;
