import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getComments } from "../../apis/lp";

export const useGetCommentList = (lpId: number, order: "asc" | "desc") => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lpComments, lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getComments({ lpId, cursor: pageParam, limit: 10, order }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
  });
};
