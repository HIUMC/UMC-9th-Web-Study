import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getComment } from "../apis/comment";
import type { ResponseCommentListDto } from "../types/comment";
import type { PAGINATION_ORDER } from "../enums/common";

export default function useGetInfiniteComments(
  limit = 10,
  order: PAGINATION_ORDER
) {
  const { lpId } = useParams<{ lpId: string }>();

  return useInfiniteQuery({
    queryKey: ["comments", lpId, order],
    queryFn: async ({ pageParam = 0 }): Promise<ResponseCommentListDto> => {
      const res = await getComment({
        lpId: Number(lpId),
        cursor: pageParam,
        limit,
        order,
      } as any);
      return res;
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
  });
}
