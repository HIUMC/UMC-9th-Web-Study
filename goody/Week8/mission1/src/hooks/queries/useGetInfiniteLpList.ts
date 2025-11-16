import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(limit:number,search:string,order:PAGINATION_ORDER){
    return useInfiniteQuery({
        queryFn: ({pageParam}) => getLpList({cursor:pageParam, limit, search:search.trim(), order}),
        queryKey:[QUERY_KEY.lps,search,order],
        initialPageParam: 0,
        getNextPageParam: (lastPage,allPages) => {
            console.log(lastPage,allPages)
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        },
        enabled : search === '' || search.trim() !== '', 
        staleTime : 5 * 60 * 1000,
        gcTime : 10 * 60 * 1000,
    })
}

export default useGetInfiniteLpList