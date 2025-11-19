import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  // 1. 실제 검색어가 있는지 확인 (공백만 있는 것 제외)
  const isRealSearch = search.trim() !== "";

  // 2. 초기 로드 상태인지 확인 (debouncedValue가 "" 인 경우)
  const isInitialLoad = search === "";

  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
    queryKey: [QUERY_KEY.search, search, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      //console.log(lastPage, allPages);
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 100 * 60 * 10, // 10분
    placeholderData: keepPreviousData,
    enabled: isInitialLoad || isRealSearch,
  });
}

export default useGetInfiniteLpList;
