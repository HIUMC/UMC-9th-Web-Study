import { useInfiniteQuery } from "@tanstack/react-query";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import { getLpComments } from "../../apis/lp";
import type { ResponseLpCommentsDto } from "../../types/lp";

export function useGetInfiniteLpComments(lpid: string, limit: number,  order: PAGINATION_ORDER) {
    return useInfiniteQuery({
        queryFn:({pageParam}) =>
            getLpComments({lpid, cursor: pageParam, limit, order}),
        queryKey: [QUERY_KEY.lpComments, lpid, order],
        initialPageParam: 0,
        getNextPageParam: (lastPage: ResponseLpCommentsDto, _allPages: ResponseLpCommentsDto[]) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor: undefined
        }
    });

}