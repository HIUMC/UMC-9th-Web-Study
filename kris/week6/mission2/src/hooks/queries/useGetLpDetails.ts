import { useQuery } from "@tanstack/react-query";
import { getLpDetails } from "../../apis/lp";
import type { lpDetailsType } from "../../types/common";

function useGetLpDetails({lpid}: lpDetailsType) {
  return useQuery({
    queryKey: ['lp', lpid],
    queryFn: () => getLpDetails(lpid),
    staleTime: 1000*60*5, 
    gcTime: 1000*60*10,
  })
}

export default useGetLpDetails