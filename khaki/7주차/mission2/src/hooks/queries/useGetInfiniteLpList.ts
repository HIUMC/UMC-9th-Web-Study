import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(limit: number, search: string, order: PaginationDto["order"]) {
  return useInfiniteQuery({
    // lps: "LP 목록을 가져오는 쿼리다" 라는 기본 구분자
    // search: "검색어가 무엇인지"
    // order: "정렬 순서가 무엇인지"
    queryKey: [QUERY_KEY.lps, search, order],

    // pageParam: 다음 페이지를 가져올 때 사용하는 커서 값(fetchNextPage 호출 시 getNextPageParam에서 반환한 값을 넘겨받음)
    queryFn: ({ pageParam }) => {
      return getLpList({ cursor: pageParam, limit, search, order });
    },

    // 처음에는 cursor가 0부터 시작
    initialPageParam: 0,

    // 다음에 fetchNextPage()가 호출되면 어떤 pageParam을 넘겨줄지 미리 계산
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;
