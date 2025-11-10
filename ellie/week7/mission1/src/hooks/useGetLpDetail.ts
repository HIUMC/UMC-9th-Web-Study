import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getLpDetail } from "../apis/lp";

export function useGetLpDetail() {
  const { lpId } = useParams<{ lpId: string }>();

  return useQuery({
    queryKey: ["lp", lpId],
    queryFn: () => getLpDetail({ lpId: Number(lpId) }),
    enabled: !!lpId,
    select: (data) => data.data,
    staleTime: 0,
  });
}
