import { useInfiniteQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/key"
import { getComments } from "../../apis/comment"
import type { PaginationDto } from "../../types/common"

function useGetInfiniteComment (lpId:number | undefined, limit: number, order:PaginationDto["order"]) {
    return useInfiniteQuery({
        queryKey:[QUERY_KEY.lpComments,lpId,order],
        queryFn: ({pageParam}) => getComments({
            cursor:pageParam,
            lpId:lpId!,
            limit,
            order}),
        initialPageParam: 0,
        getNextPageParam: (lastPage,allPages) => {
            console.log(lastPage,allPages)
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        },
        staleTime: 5 * 60 * 1000, 
        gcTime: 10 * 60 * 1000, 
        retry: 2, 
        enabled: Boolean(lpId), 
    })
}

export default useGetInfiniteComment
