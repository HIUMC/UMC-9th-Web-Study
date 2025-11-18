import { getLpComments } from "../../apis/lp";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { ResponseLpCommentsDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";
import { PAGINATION_ORDER } from "../../enums/common";

function useGetLpComments(lpId: string, order: PAGINATION_ORDER = PAGINATION_ORDER.desc) {
    return useInfiniteQuery<ResponseLpCommentsDto>({
        queryKey: [QUERY_KEY.lpComments, lpId, order],
        initialPageParam: 0,
        queryFn: ({ pageParam }) => 
            getLpComments(lpId, {
                cursor: pageParam as number,
                order,
                limit: 10,
            }),
        getNextPageParam: (lastPage) => 
            lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 3,
        enabled: !!lpId,
    });
}

export default useGetLpComments;
