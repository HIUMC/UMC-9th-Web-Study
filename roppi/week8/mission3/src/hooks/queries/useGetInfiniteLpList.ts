import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { PAGINATION_ORDER } from "../../enums/common";


export default function (
  limit: number,
  search: string, 
  order: PAGINATION_ORDER
) {
return useInfiniteQuery({
  queryKey: ["lps", search, order],
  queryFn: ({ pageParam }) =>
    getLpList({ cursor: pageParam, limit, search, order }),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.data.nextCursor, // 핵심
  staleTime: 0,
  gcTime: 1000 * 60 * 3,
});

}