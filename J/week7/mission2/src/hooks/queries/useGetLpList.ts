import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export function useGetLpList({cursor, search, sort, limit }:PaginationDto, enabled: boolean = true) {
    return useQuery({
        queryKey:[QUERY_KEY.lps, sort],
        queryFn: () => getLpList({
            cursor,
            search,
            sort,
            limit: 24,
        }),
        staleTime: 1000 * 60 * 5,   //5분
        gcTime: 1000 * 60 * 10,  //10분
        //enabled: Boolean(search),
        //refetchInterval: 100 * 60,
        select: (data) => data.data.data,
        enabled, 
    });
}