import { useQuery } from "@tanstack/react-query";
import { getLpDetails } from "../../apis/lp";
import type { lpDetailsType } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

function useGetLpDetails({lpId}: lpDetailsType) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetails({lpId}),
    staleTime: 1000*60*5, 
    gcTime: 1000*60*10,
  })
}

export default useGetLpDetails