import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/key"
import { getLpDetail } from "../../apis/lp"
import type { RequestLpDto } from "../../types/lp"


function useGetLpDetail ({lpid}:RequestLpDto) {
    return useQuery({
        queryKey:[QUERY_KEY.lps, lpid],
        queryFn: () => getLpDetail({lpid}),
        staleTime: 5 * 60 * 1000,
        gcTime : 10 * 60 * 1000,
        retry : 3,
        enabled: Boolean(lpid),

    })
}

export default useGetLpDetail
