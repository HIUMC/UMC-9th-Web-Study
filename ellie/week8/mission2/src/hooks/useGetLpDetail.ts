import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getLpDetail } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

export function useGetLpDetail() {
  const { lpId } = useParams<{ lpId: string }>();

  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({ lpId: Number(lpId) }),

    staleTime: 0,
  });
}
