import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/lp";
import type { lpDetailsType } from "../../types/common";
import type { PAGINATION_ORDER } from "../../enums/common";

function useGetInfiniteLpComments(lpId: number, limit: number, order: PAGINATION_ORDER) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getLpComments(lpId, {cursor: pageParam, lpId, limit, order}),
        queryKey: ['lpcomments', lpId, order],
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
          //console.log(lastPage, allPages);
          return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        }
  })
}

export default useGetInfiniteLpComments;