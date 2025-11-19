import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getUserLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";

function useGetInfiniteUserLpList(limit: number, search: string, order: PAGINATION_ORDER) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getUserLpList({cursor: pageParam, limit, search, order}),
    queryKey: [QUERY_KEY.lps, search, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    }
  }) 
}

export default useGetInfiniteUserLpList;