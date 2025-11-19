import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  const trimmedSearch = search.trim();
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search: trimmedSearch, order }),
    queryKey: [QUERY_KEY.lps, trimmedSearch, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetInfiniteLpList;
