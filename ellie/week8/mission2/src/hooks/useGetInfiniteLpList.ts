import { useInfiniteQuery } from "@tanstack/react-query";
import type { PAGINATION_ORDER } from "../enums/common";
import { getLpList } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

export default function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
    queryKey: [QUERY_KEY.lps, search, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
  });
}
