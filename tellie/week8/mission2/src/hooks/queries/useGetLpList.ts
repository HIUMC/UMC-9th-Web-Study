import { getLpList } from "../../apis/lp";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import type { ResponseLpListDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList(
    { search, order, limit }: Omit<PaginationDto, 'cursor'>,
    options?: { enabled?: boolean; staleTime?: number; gcTime?: number; }
) {
    return useInfiniteQuery<ResponseLpListDto>({
        queryKey: [QUERY_KEY.lps, search, order],
        initialPageParam: 0,
        queryFn: ({ pageParam }) => 
            getLpList({
                cursor: pageParam as number,
                search,
                order,
                limit,
            }),
        getNextPageParam: (lastPage) => 
            lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
        staleTime: options?.staleTime ?? 1000 * 60 * 5,
        gcTime: options?.gcTime ?? 1000 * 60 * 10,
        retry: 3,
        enabled: options?.enabled ?? true,
    });
}
        
export default useGetLpList;