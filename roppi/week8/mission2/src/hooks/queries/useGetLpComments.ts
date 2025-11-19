import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpComments } from "../../apis/lp";

export const useGetLpComments = (lpId: number, order: "asc" | "desc") => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lpComments, lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpComments({ lpId, cursor: pageParam, limit: 10, order }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
  });
};
