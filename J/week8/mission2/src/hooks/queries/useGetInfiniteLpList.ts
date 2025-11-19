import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpListDto } from "../../types/lp";

export function useGetInfiniteLpList( limit: number,  order: PAGINATION_ORDER, search: string) {
    const trimmedSearch = search.trim();

    return useInfiniteQuery({
        queryFn:({pageParam}) =>
            getLpList({cursor: pageParam, limit, order, search: trimmedSearch}),
        queryKey: [QUERY_KEY.lps, order, trimmedSearch],
        initialPageParam: 0,
        getNextPageParam: (lastPage: ResponseLpListDto, allPages: ResponseLpListDto[]) => {
            console.log(lastPage, allPages);
            return lastPage.data.hasNext ? lastPage.data.nextCursor: undefined
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

}