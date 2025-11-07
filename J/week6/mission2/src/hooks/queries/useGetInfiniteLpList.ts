import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpListDto } from "../../types/lp";

export function useGetInfiniteLpList( limit: number,  sort: PAGINATION_ORDER) {
    return useInfiniteQuery({
        queryFn:({pageParam}) =>
            getLpList({cursor: pageParam, limit, sort}),
        queryKey: [QUERY_KEY.lps, sort],
        initialPageParam: 0,
        getNextPageParam: (lastPage: ResponseLpListDto, allPages: ResponseLpListDto[]) => {
            console.log(lastPage, allPages);
            return lastPage.data.hasNext ? lastPage.data.nextCursor: undefined
        }
    });

}