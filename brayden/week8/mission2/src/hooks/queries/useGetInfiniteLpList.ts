import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, order, search }),
    queryKey: [QUERY_KEY.lps, order, search],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      //   console.log(lastPage, allPages);
      return lastPage.data.nextCursor;
      //
    },
    staleTime: 1000 * 5, // 5초
    gcTime: 1000 * 60 * 3, // 3분
  });
}

export default useGetInfiniteLpList;
