import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";

export function useGetLpDetail (lpid: string){
    return useQuery({
        queryKey: [QUERY_KEY.lp, lpid],
        queryFn: () => getLpDetail(lpid),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        select: (data) => data.data
    })
}