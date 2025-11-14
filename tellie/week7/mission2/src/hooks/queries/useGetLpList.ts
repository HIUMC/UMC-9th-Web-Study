import { getLpList } from "../../apis/lp";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import type { ResponseLpListDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ search, order, limit }: Omit<PaginationDto, 'cursor'>) {
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
        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 10, // 10분
        retry: 3,
    });
}
        
export default useGetLpList;